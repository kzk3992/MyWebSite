"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { CardVisual } from "./WorksCarousel";
import { buildCarouselItems } from "./worksCarouselItems";
import type { Locale } from "@/i18n/site";
import styles from "./RoomHero.module.css";

/*
 * トップページの最初の画面：パースの線で描いた部屋（床・壁・天井）を自動で歩いて進む。
 *
 * - 部屋は canvas 1枚に線を引くだけ（3D の大きな面は iPhone でメモリ不足になったため使わない）。
 * - 中央の立体ロゴは固定。看板・About・Works・Support・Privacy は奥から等間隔に近づき、通り過ぎると奥へ戻る（ループ）。
 * - オブジェクトは JS で透視投影して 2D の translate/scale と z-index で重ねる（Safari の3D前後判定に頼らない）。
 * - トップページはこの部屋だけの独立した画面。ホイール・スワイプ・矢印キーで前後に進む（ページはスクロールしない）。
 * - 画面に見えている間だけ描画する。視差効果を減らす設定では止まった状態で表示する。
 */

export type RoomLink = { href: string; label: string };

export type RoomHeroContent = {
  locale: Locale;
  title: string;
  lead: string;
  hint: string;
  navLabel: string;
  about: RoomLink;
  works: RoomLink;
  support: RoomLink;
  privacy: RoomLink;
  goods: RoomLink;
  /** 部屋の外に出る小さなリンク（フッターの代わり） */
  terms: RoomLink;
  socials: readonly { label: string; href: string }[];
};

const EYE = 1.5;
const WALL = 3.6;
const CELL = 1.2;
const NEAR = 0.6;
const FAR = 90;
const LOOP = 48; // 6つのオブジェクトを 8 ずつ等間隔に置く
const AUTO_SPEED = 0.9; // 何もしなくても進む速さ（単位／秒）
const BASE = 120; // 1 単位 = 120px で各オブジェクトを組み、投影で拡大縮小する
const LAYERS = 13;
const INK = "#12140f";

type Spot = { key: "sign" | "about" | "works" | "support" | "privacy" | "goods"; y: number; z0: number; pc: [number, number]; phone: [number, number] };

// 並び：看板（左上）→ About（右）→ Works（左）→ Support（右）→ Privacy（左）→ Goods（右）。[x, 幅]
const spots: Spot[] = [
  { key: "sign", y: 2.35, z0: 4, pc: [-2.5, 2.4], phone: [-1.55, 1.7] },
  { key: "about", y: 0, z0: 12, pc: [2.6, 2.3], phone: [1.7, 1.7] },
  { key: "works", y: 0, z0: 20, pc: [-2.6, 2.6], phone: [-1.75, 1.9] },
  { key: "support", y: 0.5, z0: 28, pc: [2.5, 3.0], phone: [1.6, 2.1] },
  { key: "privacy", y: 0, z0: 36, pc: [-2.6, 2.6], phone: [-1.75, 1.9] },
  { key: "goods", y: 0, z0: 44, pc: [2.6, 2.4], phone: [1.7, 1.8] },
];

function smooth(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function Wordmark({ text, size }: { text: string; size?: number }) {
  const lines = text.split("\n").length;
  // 背景が賑やかでも読めるよう、黒い文字を白い縁で囲む（縁は text-shadow の輪）
  return (
    <span className={styles.wordmark} style={{ "--lines": lines, ...(size ? { "--fs": `${size}px` } : {}) } as CSSProperties} aria-hidden="true">
      <span className={styles.outline}>{text}</span>
      <span className={styles.fill}>{text}</span>
    </span>
  );
}

function Mark({ src }: { src: string }) {
  return (
    <span className={styles.model}>
      {Array.from({ length: LAYERS }, (_, layer) => (
        <Image
          key={layer}
          className={layer === LAYERS - 1 ? "" : layer === 0 ? styles.back : styles.side}
          src={src}
          width={640}
          height={573}
          alt=""
          priority={layer === LAYERS - 1 && src === "/brand/logo-mark.png"}
          style={{ "--z": `${((layer - (LAYERS - 1) / 2) * 2.2).toFixed(2)}px` } as CSSProperties}
        />
      ))}
    </span>
  );
}

export function RoomHero({ content }: { content: RoomHeroContent }) {
  const workItems = buildCarouselItems(content.locale);
  const sceneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const objectRefs = useRef<Partial<Record<Spot["key"], HTMLElement | null>>>({});

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const markElement = markRef.current;
    if (!scene || !canvas || !context || !markElement) return;
    const ctx = context;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0, height = 0, focal = 600, horizon = 0, vanishX = 0, half = 4.2, narrow = false, markZ = 7, markWidth = 2.2;
    // 最初は看板が中くらいの距離に見える位置から歩き始める（いきなり目の前に来ないように）
    let walked = -6, camera = -6, aimX = 0, aimY = 0, offsetX = 0, offsetY = 0;
    let visible = true, raf = 0, previous = performance.now();
    const heights = new Map<HTMLElement, number>();

    const screenX = (x: number, z: number) => vanishX + (focal * (x - offsetX)) / z;
    const screenY = (y: number, z: number) => horizon - (focal * (y - EYE)) / z;
    const fade = (z: number) => {
      const far = 1 - Math.min(1, z / FAR);
      const near = Math.min(1, (z - NEAR) / 1.2);
      return Math.max(0, far * far * near);
    };
    const line = (x1: number, y1: number, x2: number, y2: number, alpha: number, lineWidth = 1) => {
      if (alpha <= 0.003) return;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    const depthLine = (x: number, y: number, alpha: number, lineWidth = 1, steps = 18) => {
      for (let step = 0; step < steps; step += 1) {
        const z1 = NEAR + (FAR - NEAR) * Math.pow(step / steps, 2.2);
        const z2 = NEAR + (FAR - NEAR) * Math.pow((step + 1) / steps, 2.2);
        line(screenX(x, z1), screenY(y, z1), screenX(x, z2), screenY(y, z2), alpha * fade((z1 + z2) / 2), lineWidth);
      }
    };

    // オブジェの文字の中心が、上から何割の位置にあるか（拡大縮小しても変わらないので幅が変わるまで使い回す）
    const textRatios = new Map<HTMLElement, number | null>();
    const textRatio = (element: HTMLElement) => {
      if (textRatios.has(element)) return textRatios.get(element)!;
      let ratio: number | null = null;
      const fixed = element.dataset.textRatio;
      const mark = element.querySelector<HTMLElement>(`.${styles.wordmark}`);
      if (fixed) ratio = Number(fixed);
      else if (mark) {
        const box = element.getBoundingClientRect();
        const text = mark.getBoundingClientRect();
        if (box.height > 0) ratio = (text.top + text.height / 2 - box.top) / box.height;
      }
      textRatios.set(element, ratio);
      return ratio;
    };

    const place = (element: HTMLElement, x: number, yBottom: number | "text", widthUnits: number, z: number, alpha: number) => {
      const scale = focal / z / BASE;
      const baseWidth = widthUnits * BASE;
      if (element.style.width !== `${baseWidth}px`) {
        element.style.width = `${baseWidth}px`;
        heights.delete(element);
        textRatios.delete(element);
      }
      let elementHeight = heights.get(element);
      if (elementHeight === undefined) {
        elementHeight = element.offsetHeight;
        heights.set(element, elementHeight);
      }
      // "text"：文字の中心を目の高さ（＝消失点・地平線の高さ）に置く。どの距離でも文字は地平線の上を流れてくる
      let bottom = 0;
      if (yBottom === "text") {
        const ratio = textRatio(element);
        bottom = ratio === null ? 0 : EYE - ((1 - ratio) * elementHeight) / BASE;
      } else bottom = yBottom;
      element.style.transform = `translate(${(screenX(x, z) - baseWidth / 2).toFixed(1)}px, ${(screenY(bottom, z) - elementHeight).toFixed(1)}px) scale(${scale.toFixed(4)})`;
      element.style.zIndex = String(Math.round(4000 - z * 40));
      element.style.opacity = alpha.toFixed(3);
      element.style.pointerEvents = alpha > 0.6 ? "" : "none";
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = scene.clientWidth;
      height = scene.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      narrow = width / height < 0.8;
      focal = Math.max(width, height) * (narrow ? 0.8 : 0.62);
      half = narrow ? 3 : 4.2;
      markZ = (narrow ? 5.4 : 7) + CELL * 2; // 床の線2本分だけ奥に置く
      markWidth = narrow ? 1.7 : 2.2;
      heights.clear();
      textRatios.clear();
      request();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = INK;
      horizon = height * (narrow ? 0.5 : 0.48) + offsetY;
      vanishX = width / 2;

      for (let x = -half; x <= half + 0.001; x += CELL) {
        depthLine(x, 0, 0.16);
        depthLine(x, WALL, 0.1);
      }
      const first = Math.ceil((camera + NEAR) / CELL) * CELL;
      for (let worldZ = first; worldZ - camera < FAR; worldZ += CELL) {
        const z = worldZ - camera;
        const alpha = fade(z);
        line(screenX(-half, z), screenY(0, z), screenX(half, z), screenY(0, z), 0.2 * alpha);
        line(screenX(-half, z), screenY(WALL, z), screenX(half, z), screenY(WALL, z), 0.12 * alpha);
        line(screenX(-half, z), screenY(0, z), screenX(-half, z), screenY(WALL, z), 0.13 * alpha);
        line(screenX(half, z), screenY(0, z), screenX(half, z), screenY(WALL, z), 0.13 * alpha);
      }
      [0, 1.2, 2.4, WALL].forEach((y, index) => {
        const edge = index === 0 || index === 3;
        depthLine(-half, y, edge ? 0.42 : 0.12, edge ? 1.4 : 1, 16);
        depthLine(half, y, edge ? 0.42 : 0.12, edge ? 1.4 : 1, 16);
      });

      place(markElement, 0, 0, markWidth, markZ, 1);
      spots.forEach((spot) => {
        const element = objectRefs.current[spot.key];
        if (!element) return;
        const [x, widthUnits] = narrow ? spot.phone : spot.pc;
        const z = (((spot.z0 - camera) % LOOP) + LOOP) % LOOP;
        const alpha = smooth((z - 1.3) / 1.4) * (1 - smooth((z - (LOOP - 7)) / 6));
        place(element, x, spot.key === "sign" ? spot.y : "text", widthUnits, Math.max(0.9, z), alpha);
      });
      scene.dataset.ready = "true";
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - previous);
      previous = now;
      if (!reduced && !dragging) walked += (AUTO_SPEED * dt) / 1000;
      if (!reduced && !dragging) {
        walked += velocity * dt; // 指を離した後の惰性
        velocity *= Math.pow(0.94, dt / 16.7);
      }
      camera += (walked - camera) * (reduced ? 1 : 0.12);
      offsetX += (aimX - offsetX) * 0.08;
      offsetY += (aimY - offsetY) * 0.08;
      draw();
      if (visible && (!reduced || Math.abs(walked - camera) > 0.001)) request();
    };
    function request() {
      if (!raf) raf = window.requestAnimationFrame(tick);
    }

    // ホイール・スワイプ・矢印キーで前後に進む
    let dragging = false, lastY = 0, lastT = 0, velocity = 0, moved = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      let delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (event.deltaMode === 1) delta *= 16;
      walked += delta * 0.012;
      request();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true; lastY = event.clientY; lastT = performance.now(); velocity = 0; moved = 0;
    };
    const onDrag = (event: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dy = event.clientY - lastY;
      moved += Math.abs(dy);
      if (now > lastT) velocity = velocity * 0.7 + ((-dy * 0.02) / (now - lastT)) * 0.3;
      lastY = event.clientY; lastT = now;
      walked += -dy * 0.02;
      request();
    };
    const onPointerUp = () => { dragging = false; request(); };
    // スワイプ中にリンクが開かないように
    const onClick = (event: MouseEvent) => { if (moved > 8) { event.preventDefault(); moved = 0; } };
    const onKey = (event: KeyboardEvent) => {
      const forward = ["ArrowDown", "PageDown", " "].includes(event.key);
      const back = ["ArrowUp", "PageUp"].includes(event.key);
      if (!forward && !back) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      walked += forward ? 2.4 : -2.4;
      request();
    };

    const onPointerMove = (event: PointerEvent) => {
      onDrag(event);
      if (event.pointerType !== "mouse") return;
      const rect = scene.getBoundingClientRect();
      aimX = ((event.clientX - rect.left) / rect.width - 0.5) * 1.2;
      aimY = ((event.clientY - rect.top) / rect.height - 0.5) * -40;
      request();
    };
    const onPointerLeave = () => { aimX = 0; aimY = 0; request(); };

    // 画面外・タブ非表示のときは描かない
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible";
      if (visible) { previous = performance.now(); request(); }
    });
    observer.observe(scene);
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) { previous = performance.now(); request(); }
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(scene);
    // 画像の読み込みなどでオブジェの高さが変わったら、測り直す（古い高さのままだと文字の高さがずれる）
    const objectObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        heights.delete(entry.target as HTMLElement);
        textRatios.delete(entry.target as HTMLElement);
      }
      request();
    });
    [markElement, ...Object.values(objectRefs.current)].forEach((element) => { if (element) objectObserver.observe(element); });
    document.addEventListener("visibilitychange", onVisibility);
    scene.addEventListener("wheel", onWheel, { passive: false });
    scene.addEventListener("pointerdown", onPointerDown);
    scene.addEventListener("pointerup", onPointerUp);
    scene.addEventListener("pointercancel", onPointerUp);
    scene.addEventListener("click", onClick, true);
    window.addEventListener("keydown", onKey);
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", onPointerLeave);
    resize();
    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      objectObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene.removeEventListener("wheel", onWheel);
      scene.removeEventListener("pointerdown", onPointerDown);
      scene.removeEventListener("pointerup", onPointerUp);
      scene.removeEventListener("pointercancel", onPointerUp);
      scene.removeEventListener("click", onClick, true);
      window.removeEventListener("keydown", onKey);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section ref={sceneRef} className={styles.scene} aria-labelledby="room-title">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.copy}>
        <h1 id="room-title" className={styles.title}>{content.title}</h1>
        <p className={styles.lead}>{content.lead}</p>
      </div>

      {/* 中央の立体ロゴ（固定） */}
      <div ref={markRef} className={`${styles.obj} ${styles.mark}`} aria-hidden="true">
        <Mark src="/brand/logo-mark.png" />
        <span className={styles.shadow} />
      </div>

      {/* 奥から近づいてくるオブジェクト。タブ移動と読み上げは下の nav のリンクで行う */}
      <div ref={(element) => { objectRefs.current.sign = element; }} className={`${styles.obj} ${styles.sign}`} aria-hidden="true">
        <span className={styles.signInner}>
          <Image src="/brand/room/sign.png" width={1000} height={516} alt="" priority />
          <span className={styles.board}><b>Mika Spark</b><span>Studio</span></span>
          {/* 「ジジ…」：ときどき一瞬だけ、揺れ・ノイズ・横線・文字のちらつきが走る */}
          <span className={styles.noise} />
          <span className={styles.glitchBar} />
          {/* 緑のビリビリ：灰色のジジ…とは別の周期（3.7秒）で、本数の違う電撃が一瞬ずつ走る */}
          <svg className={styles.zaps} viewBox="0 0 288 150" aria-hidden="true">
          <g className={styles.zapA}><path d="M2 62 L20 52 L15 68 L38 58 L32 76 L58 66 L50 86 L78 78" /><path d="M38 58 L52 46 L48 56" /><path d="M32 76 L24 92 L36 88" /></g>
          <g className={styles.zapB}><path d="M286 120 L264 130 L268 112 L246 122 L252 102 L228 112 L238 94" /><path d="M246 122 L232 134 L240 130" /><path d="M252 102 L270 92 L262 100" /></g>
          <g className={styles.zapC}><path d="M64 10 L73 24 L61 28 L72 44 L65 54" /><path d="M217 2 L209 20 L222 26 L211 44 L218 54" /><path d="M130 146 L144 136 L140 148 L166 138 L160 150 L186 140" /></g>
          </svg>
        </span>
      </div>
      <a ref={(element) => { objectRefs.current.about = element; }} className={`${styles.obj} ${styles.about}`} href={content.about.href} tabIndex={-1} aria-hidden="true">
        <Mark src="/brand/logo-mark-green.png" />
        <span className={styles.overMark}><Wordmark text={"ABOUT\nMIKA"} size={58} /></span>
      </a>
      <a ref={(element) => { objectRefs.current.works = element; }} className={`${styles.obj} ${styles.works}`} href={content.works.href} tabIndex={-1} aria-hidden="true">
        <Image className={styles.worksBg} src="/brand/room/works-bg.png" width={711} height={800} alt="" />
        <Wordmark text="WORKS" />
        <span className={styles.fan}>
          {/* Works ページのカードと同じ絵（文字なし）。6枠に4作品を順に並べる */}
          <span className={styles.spin}>
            {Array.from({ length: 6 }, (_, slot) => {
              const item = workItems[slot % workItems.length];
              return <span key={slot} className={styles.spinCard}><CardVisual item={item} eager={false} /></span>;
            })}
          </span>
        </span>
      </a>
      <a ref={(element) => { objectRefs.current.support = element; }} className={`${styles.obj} ${styles.support}`} href={content.support.href} tabIndex={-1} aria-hidden="true" data-text-ratio="0.43">
        <Image src="/brand/room/support-hands.png" width={720} height={339} alt="" />
      </a>
      <a ref={(element) => { objectRefs.current.privacy = element; }} className={`${styles.obj} ${styles.privacy}`} href={content.privacy.href} tabIndex={-1} aria-hidden="true">
        <Image className={styles.shield} src="/brand/room/privacy-shield.png" width={663} height={800} alt="" />
        <span className={styles.overShield}><Wordmark text="PRIVACY" size={58} /></span>
      </a>

      <a ref={(element) => { objectRefs.current.goods = element; }} className={`${styles.obj} ${styles.goods}`} href={content.goods.href} tabIndex={-1} aria-hidden="true">
        <Image src="/brand/room/goods-box.png" width={720} height={658} alt="" />
        <span className={styles.overBox}><Wordmark text="GOODS" size={64} /></span>
      </a>

      <nav className={styles.nav} aria-label={content.navLabel}>
        {[content.about, content.works, content.support, content.privacy, content.goods].map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
        <a className={styles.minor} href={content.terms.href}>{content.terms.label}</a>
        {content.socials.map((social) => (
          <a key={social.href} className={styles.minor} href={social.href} target="_blank" rel="noopener noreferrer">{social.label} ↗</a>
        ))}
      </nav>
      <p className={styles.hint} aria-hidden="true">{content.hint}</p>
    </section>
  );
}
