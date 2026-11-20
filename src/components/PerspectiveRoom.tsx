"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./PerspectiveRoom.module.css";

/*
 * パースの線だけで描く「部屋」。
 *
 * 3D の面（大きな div を rotate したもの）は iPhone でメモリを食いすぎてページが落ちたため、
 * 画面サイズのキャンバス1枚に、透視投影で計算した線（地平線・床・壁）を引く方式にした。
 * 描くのはカメラかマウスが動いたときだけ。キャンバスの解像度は最大2倍に抑える。
 *
 * - mode="scroll": ページのスクロール量だけカメラが奥へ進む（トップページ）
 * - mode="static": カメラは動かず、マウスで視点が少し動くだけ（Works ページ）
 * - logo: 立体ロゴ（13層の押し出し）を床の上に立たせる。カメラが近づくと大きくなり、通り過ぎると消える
 */

type View = {
  /** 地平線の高さ（キャンバスの高さに対する割合） */
  horizon: number;
  /** 消失点の横位置（キャンバスの幅に対する割合） */
  vanishX: number;
  /** ロゴまでの距離（小さいほど近くて大きい） */
  logoZ?: number;
};

type PerspectiveRoomProps = {
  mode: "scroll" | "static";
  view?: View;
  /** 760px 以下の画面での view */
  viewMobile?: View;
  logo?: boolean;
  className?: string;
};

const EYE = 1.5; // 目の高さ
const HALF = 4.2; // 廊下の半幅
const WALL = 3.6; // 壁の高さ
const CELL = 1.2; // グリッドの間隔
const NEAR = 0.6;
const FAR = 90;
const LOGO_Z = 12; // ロゴの奥行き（最初の画面での距離）
const LOGO_WIDTH = 2.6; // ロゴの幅（世界の単位）
const SCROLL_PER_UNIT = 150; // 何 px スクロールで 1 単位進むか
const LAYERS = 13;
const INK = "#12140f";

function fade(z: number) {
  const far = 1 - Math.min(1, z / FAR);
  const near = Math.min(1, (z - NEAR) / 1.2);
  return Math.max(0, far * far * near);
}

export function PerspectiveRoom({ mode, view, viewMobile, logo = false, className = "" }: PerspectiveRoomProps) {
  // effect の依存に数値だけを渡す（オブジェクトは描画のたびに作り直されるため）
  const horizonRatio = view?.horizon ?? 0.46;
  const vanishRatio = view?.vanishX ?? 0.5;
  const horizonRatioMobile = viewMobile?.horizon ?? horizonRatio;
  const vanishRatioMobile = viewMobile?.vanishX ?? vanishRatio;
  const logoZ = view?.logoZ ?? LOGO_Z;
  const logoZMobile = viewMobile?.logoZ ?? logoZ;
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;
    const ctx = context;
    const mark = logoRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 760px)");

    let width = 0, height = 0, focal = 600, horizon = 0, vanishX = 0;
    let camera = 0, cameraTarget = 0, aimX = 0, aimY = 0, offsetX = 0, offsetY = 0;
    let raf = 0;

    const screenX = (x: number, z: number) => vanishX + (focal * (x - offsetX)) / z;
    const screenY = (y: number, z: number) => horizon - (focal * (y - EYE)) / z;

    const line = (x1: number, y1: number, x2: number, y2: number, alpha: number, lineWidth = 1) => {
      if (alpha <= 0.003) return;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    // 奥行き方向の線は、遠くほど薄くなるよう区切って引く
    const depthLine = (x: number, y: number, alpha: number, lineWidth = 1, steps = 20) => {
      for (let step = 0; step < steps; step += 1) {
        const z1 = NEAR + (FAR - NEAR) * Math.pow(step / steps, 2.2);
        const z2 = NEAR + (FAR - NEAR) * Math.pow((step + 1) / steps, 2.2);
        line(screenX(x, z1), screenY(y, z1), screenX(x, z2), screenY(y, z2), alpha * fade((z1 + z2) / 2), lineWidth);
      }
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = root.clientWidth;
      height = root.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      focal = Math.max(width, height) * 0.62;
      request();
    };

    const draw = () => {
      const mobile = mobileQuery.matches;
      ctx.clearRect(0, 0, width, height);
      horizon = height * (mobile ? horizonRatioMobile : horizonRatio) + offsetY;
      vanishX = width * (mobile ? vanishRatioMobile : vanishRatio);
      ctx.strokeStyle = INK;

      // 地平線（廊下の外まで、端はぼかす）
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(18,20,15,0)");
      gradient.addColorStop(0.5, "rgba(18,20,15,1)");
      gradient.addColorStop(1, "rgba(18,20,15,0)");
      ctx.strokeStyle = gradient;
      line(0, horizon, width, horizon, 0.32);
      ctx.strokeStyle = INK;

      // 床：消失点へ集まる線
      for (let x = -HALF; x <= HALF + 0.001; x += CELL) depthLine(x, 0, 0.16);
      // 床の横線と壁の縦線：カメラが進むと手前へ流れる
      const first = Math.ceil((camera + NEAR) / CELL) * CELL;
      for (let worldZ = first; worldZ - camera < FAR; worldZ += CELL) {
        const z = worldZ - camera;
        const alpha = fade(z);
        line(screenX(-HALF, z), screenY(0, z), screenX(HALF, z), screenY(0, z), 0.2 * alpha);
        line(screenX(-HALF, z), screenY(0, z), screenX(-HALF, z), screenY(WALL, z), 0.13 * alpha);
        line(screenX(HALF, z), screenY(0, z), screenX(HALF, z), screenY(WALL, z), 0.13 * alpha);
      }
      // 壁の横線と、壁と床の境目の濃い線
      [0, 1.2, 2.4, WALL].forEach((y, index) => {
        const base = index === 0;
        depthLine(-HALF, y, base ? 0.42 : 0.12, base ? 1.4 : 1, 16);
        depthLine(HALF, y, base ? 0.42 : 0.12, base ? 1.4 : 1, 16);
      });

      if (mark) {
        const distance = (mobile ? logoZMobile : logoZ) - camera;
        const visible = distance > 1.2;
        const d = Math.max(1.2, distance);
        const size = (focal * LOGO_WIDTH) / d;
        const footX = screenX(0, d);
        const footY = screenY(0, d);
        mark.style.width = `${size.toFixed(1)}px`;
        mark.style.transform = `translate(${(footX - size / 2).toFixed(1)}px, ${(footY - size * (573 / 640) - size * 0.06).toFixed(1)}px)`;
        // 近づきすぎたら（足元が画面の下に抜けるあたりで）消す
        // 最初の画面を過ぎたら消す（固定の背景なので、残すと下の文章に重なる）
        const leave = mode === "scroll" ? 1 - Math.min(1, Math.max(0, (window.scrollY - height * 0.08) / (height * 0.3))) : 1;
        mark.style.opacity = visible ? (Math.min(1, (distance - 1.2) / 1.6) * leave).toFixed(3) : "0";
        mark.dataset.ready = "true";
      }
    };

    const tick = () => {
      raf = 0;
      if (mode === "scroll") cameraTarget = reduced ? 0 : window.scrollY / SCROLL_PER_UNIT;
      camera += (cameraTarget - camera) * (reduced ? 1 : 0.2);
      offsetX += (aimX - offsetX) * 0.08;
      offsetY += (aimY - offsetY) * 0.08;
      draw();
      if (Math.abs(cameraTarget - camera) > 0.0005 || Math.abs(aimX - offsetX) > 0.001 || Math.abs(aimY - offsetY) > 0.05) request();
    };
    function request() {
      if (!raf) raf = window.requestAnimationFrame(tick);
    }

    // PC はマウスの位置で視点を少しずらす（奥行きが出る）
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (event: PointerEvent) => {
      aimX = (event.clientX / window.innerWidth - 0.5) * 1.2;
      aimY = (event.clientY / window.innerHeight - 0.5) * -40;
      request();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    mobileQuery.addEventListener("change", request);
    if (mode === "scroll") window.addEventListener("scroll", request, { passive: true });
    if (fine && !reduced) window.addEventListener("pointermove", onPointerMove);
    resize();
    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      mobileQuery.removeEventListener("change", request);
      window.removeEventListener("scroll", request);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [mode, horizonRatio, vanishRatio, horizonRatioMobile, vanishRatioMobile, logoZ, logoZMobile]);

  return (
    <div ref={rootRef} className={`${styles.room} ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      {logo && (
        <div ref={logoRef} className={styles.logo}>
          <div className={styles.model}>
            {Array.from({ length: LAYERS }, (_, layer) => (
              <Image
                key={layer}
                className={layer === LAYERS - 1 ? "" : layer === 0 ? styles.back : styles.side}
                src="/brand/logo-mark.png"
                width={640}
                height={573}
                alt=""
                priority={layer === LAYERS - 1}
                style={{ "--z": `${((layer - (LAYERS - 1) / 2) * 2.2).toFixed(2)}px` } as CSSProperties}
              />
            ))}
          </div>
          <div className={styles.shadow} />
        </div>
      )}
    </div>
  );
}
