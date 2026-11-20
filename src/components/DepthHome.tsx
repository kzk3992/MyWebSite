"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Locale } from "@/i18n/site";
import { CardVisual } from "./WorksCarousel";
import type { CarouselItem } from "./worksCarouselItems";
import styles from "./DepthHome.module.css";

/*
 * トップページ：スクロールで部屋（廊下）の奥へ進む。
 *
 * - 廊下（床・左右の壁・突き当たりの壁）は CSS 3D の独立レイヤー。床と壁は動かさず、
 *   グリッド模様だけをカメラ位置に合わせて流すので、巨大な面を描かずに「前進」して見える。
 * - パネル（ヒーロー・作品・About・Goods）は CSS 3D に入れず、透視投影を JS で計算して
 *   2D の translate/scale と z-index で並べる。iOS Safari の3D前後判定の不具合（Works ページで
 *   中央ロゴがカードを貫通した件）を避けるため。
 * - JS なし・「視差効果を減らす」設定では、ふつうの縦並びページとして表示する
 *   （html[data-depth="on"] のときだけ3D表示。先頭のインラインスクリプトが描画前に付ける）。
 */

const PERSPECTIVE = 1000; // px。廊下レイヤーの CSS perspective と同じ値
const STOP_GAP = 1500; // 停留所どうしの奥行き（px）
const BACK_WALL_BEYOND = 1800; // 最後の停留所のさらに奥にある突き当たりの壁

type Placement = { stop: number; z?: number; x: number; y: number; xMobile: number; yMobile: number };

export type DepthHomeContent = {
  locale: Locale;
  hero: { kicker: string; titleTop: string; titleBottom: string; lead: string; tagline: string; explore: string };
  works: { eyebrow: string; title: string; intro: string; moreLabel: string; moreHref: string };
  products: CarouselItem[];
  about: { eyebrow: string; title: string; paragraphs: readonly string[]; linkLabel: string; linkHref: string; fields: readonly string[]; fieldsLabel: string };
  goods: { eyebrow: string; title: string; items: { id: string; image: string; label: string; href: string }[] };
  rail: { label: string; stops: readonly string[] };
};

const enableScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.depth="on"}catch(e){}`;

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** 停留所 i の手前で止まって見えるよう、区間の前後20%を「待ち」にしてから滑らかに進める */
function cameraStop(progress: number, last: number) {
  const clamped = Math.min(last, Math.max(0, progress));
  const index = Math.min(last - 1, Math.floor(clamped));
  if (clamped >= last) return last;
  const fraction = clamped - index;
  return index + smoothstep((fraction - 0.2) / 0.6);
}

type Projection = { s: number; opacity: number; zIndex: number; active: boolean };

/**
 * zRelative: カメラから見た奥行き（0 で等倍、マイナスほど奥）
 * stopRelative: そのオブジェクトの「停留所」までの奥行き。遠さの霧はこちらで決める
 * （ヒーローの奥にある立体ロゴは、ヒーローと同じ停留所なので霧をかけない）
 */
function project(zRelative: number, stopRelative: number): Projection {
  const z = Math.min(zRelative, PERSPECTIVE * 0.9);
  const s = PERSPECTIVE / (PERSPECTIVE - z);
  // 手前に来すぎたら消す
  const near = 1 - smoothstep((zRelative - PERSPECTIVE * 0.15) / (PERSPECTIVE * 0.45));
  // いまの停留所は不透明、次の停留所はうっすら（14%）、その先は見えない
  const ahead = -stopRelative / STOP_GAP;
  const far = ahead <= 0.35 ? 1 : ahead <= 0.9 ? 1 - smoothstep((ahead - 0.35) / 0.55) * 0.86 : 0.14 * (1 - smoothstep((ahead - 0.9) / 0.8));
  const opacity = Math.max(0, Math.min(near, far));
  return { s, opacity, zIndex: Math.round(5000 + zRelative), active: opacity > 0.6 && zRelative > -400 };
}

function initialStyle(placement: Placement): CSSProperties {
  const z = placement.z ?? -placement.stop * STOP_GAP;
  const { s, opacity, zIndex } = project(z, -placement.stop * STOP_GAP);
  return {
    "--px": (placement.x * 100 * s).toFixed(3),
    "--py": (placement.y * 100 * s).toFixed(3),
    "--s": s.toFixed(4),
    opacity: Number(opacity.toFixed(3)),
    zIndex,
  } as CSSProperties;
}

function ArrowIcon({ external }: { external: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      {external
        ? <path d="M2 10L10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M1.5 6h9M7 2.5 10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function Cta({ href, external, children, secondary = false }: { href: string; external: boolean; children: ReactNode; secondary?: boolean }) {
  return (
    <a className={`${styles.cta} ${secondary ? styles.ctaSecondary : ""}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}<ArrowIcon external={external} />
    </a>
  );
}

const HUB_LAYERS = 13;

export function DepthHome({ content }: { content: DepthHomeContent }) {
  const { hero, works, products, about, goods, rail, locale } = content;
  const stopCount = 4 + products.length; // hero, works sign, products..., about, goods
  const lastStop = stopCount - 1;

  // 各オブジェクトの置き場所（x は画面幅、y は画面高さに対する割合。mobile は 760px 以下）
  const placements: Placement[] = [
    { stop: 0, z: -720, x: 0.2, y: -0.02, xMobile: 0, yMobile: -0.34 }, // 立体ロゴ（ヒーローの奥）
    { stop: 0, x: -0.13, y: 0, xMobile: 0, yMobile: 0.17 }, // ヒーローの文字
    { stop: 1, x: 0, y: -0.04, xMobile: 0, yMobile: -0.02 }, // Works の看板
    ...products.map((_, index) => ({ stop: 2 + index, x: index % 2 === 0 ? -0.09 : 0.09, y: -0.03, xMobile: index % 2 === 0 ? -0.05 : 0.05, yMobile: -0.02 })),
    { stop: 2 + products.length, x: 0.08, y: -0.03, xMobile: 0.04, yMobile: -0.02 }, // About
    { stop: 3 + products.length, x: 0, y: -0.04, xMobile: 0, yMobile: -0.02 }, // Goods
  ];
  const cameraX = Array.from({ length: stopCount }, (_, stop) => (stop === 0 ? 0 : placements.find((placement) => placement.stop === stop && placement.z === undefined)?.x ?? 0));
  const cameraXMobile = Array.from({ length: stopCount }, (_, stop) => (stop === 0 ? 0 : placements.find((placement) => placement.stop === stop && placement.z === undefined)?.xMobile ?? 0));

  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const objectRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || root.dataset.depth !== "on") return;

    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const fine = window.matchMedia("(pointer: fine)").matches;
    let raf = 0;
    let mouseX = 0, mouseY = 0, parallaxX = 0, parallaxY = 0;
    let lastStopShown = -1;

    const segment = () => (track.offsetHeight - stage.offsetHeight) / lastStop;
    // ステージはヘッダーの下に貼り付く（sticky）ので、その高さ分だけ早く始まる
    const trackTop = () => track.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(stage).top) || 0);

    const render = () => {
      raf = 0;
      const progress = (window.scrollY - trackTop()) / Math.max(1, segment());
      const position = cameraStop(progress, lastStop);
      const camera = position * STOP_GAP;
      const mobile = mobileQuery.matches;
      const index = Math.min(lastStop - 1, Math.floor(position));
      const fraction = position - index;
      const camX = (mobile ? cameraXMobile : cameraX);
      const cx = camX[index] + (camX[Math.min(lastStop, index + 1)] - camX[index]) * fraction;
      parallaxX += (mouseX - parallaxX) * 0.08;
      parallaxY += (mouseY - parallaxY) * 0.08;

      stage.style.setProperty("--cam", camera.toFixed(1));
      // 突き当たりの壁は終点が近づいてから現れる（途中で遠くに浮いた四角に見えないように）
      const wallDistance = camera - (lastStop * STOP_GAP + BACK_WALL_BEYOND);
      stage.style.setProperty("--back-opacity", smoothstep((wallDistance + 4200) / 1800).toFixed(3));
      stage.style.setProperty("--mx", parallaxX.toFixed(2));
      stage.style.setProperty("--my", parallaxY.toFixed(2));

      placements.forEach((placement, objectIndex) => {
        const element = objectRefs.current[objectIndex];
        if (!element) return;
        const z = placement.z ?? -placement.stop * STOP_GAP;
        const { s, opacity, zIndex, active } = project(z + camera, -placement.stop * STOP_GAP + camera);
        const x = mobile ? placement.xMobile : placement.x;
        const y = mobile ? placement.yMobile : placement.y;
        element.style.setProperty("--px", ((x - cx) * 100 * s).toFixed(3));
        element.style.setProperty("--py", (y * 100 * s).toFixed(3));
        element.style.setProperty("--s", s.toFixed(4));
        // 奥のものほど視差でずれる（透視の中心がマウスと一緒に動いたときと同じ量）
        element.style.setProperty("--shift-x", (parallaxX * (1 - s)).toFixed(2));
        element.style.setProperty("--shift-y", (parallaxY * (1 - s)).toFixed(2));
        element.style.opacity = opacity.toFixed(3);
        element.style.zIndex = String(zIndex);
        element.dataset.active = active ? "true" : "false";
      });

      const nearest = Math.round(position);
      if (nearest !== lastStopShown) {
        lastStopShown = nearest;
        setCurrent(nearest);
      }
      if (Math.abs(mouseX - parallaxX) > 0.05 || Math.abs(mouseY - parallaxY) > 0.05) schedule();
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(render); };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * -60;
      mouseY = (event.clientY / window.innerHeight - 0.5) * -36;
      schedule();
    };
    // キーボードで奥のパネルのリンクにフォーカスしたら、その停留所まで進んで見えるようにする
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const object = target.closest<HTMLElement>("[data-stop]");
      if (!object) return;
      const stop = Number(object.dataset.stop);
      const top = trackTop() + stop * segment();
      if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: "instant" });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobileQuery.addEventListener("change", schedule);
    track.addEventListener("focusin", onFocusIn);
    if (fine) window.addEventListener("mousemove", onMouseMove);
    schedule();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobileQuery.removeEventListener("change", schedule);
      track.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("mousemove", onMouseMove);
    };
    // placements / cameraX は props から毎回同じ値で作られるので依存に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastStop]);

  const counter = (value: number) => String(value).padStart(2, "0");
  const productLabel = locale === "ja" ? "作品" : "Work";

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: enableScript }} />
      <div ref={trackRef} className={styles.track} style={{ "--stops": stopCount } as CSSProperties}>
        {/* 停留所ごとのスクロール位置（スナップとページ内リンク用） */}
        {Array.from({ length: stopCount }, (_, stop) => (
          <span key={stop} id={stop === 1 ? "works" : stop === 2 + products.length ? "about" : stop === 3 + products.length ? "goods" : undefined} className={styles.anchor} style={{ "--stop": stop } as CSSProperties} aria-hidden="true" />
        ))}

        <div ref={stageRef} className={styles.stage}>
          <div className={styles.room} aria-hidden="true">
            <div className={styles.floor} />
            <div className={`${styles.wall} ${styles.wallLeft}`} />
            <div className={`${styles.wall} ${styles.wallRight}`} />
            <div className={styles.backWall} style={{ "--end": lastStop * STOP_GAP + BACK_WALL_BEYOND } as CSSProperties} />
            <div className={styles.horizon} />
          </div>

          <div className={styles.objects}>
            {/* 0: 立体ロゴ */}
            <div className={`${styles.object} ${styles.logoObject}`} ref={(element) => { objectRefs.current[0] = element; }} data-stop={placements[0].stop} style={initialStyle(placements[0])} aria-hidden="true">
              <div className={styles.logoModel}>
                {Array.from({ length: HUB_LAYERS }, (_, layer) => (
                  <Image
                    key={layer}
                    className={layer === HUB_LAYERS - 1 ? "" : layer === 0 ? styles.logoBack : styles.logoSide}
                    src="/brand/logo-mark.png"
                    width={640}
                    height={573}
                    alt=""
                    priority={layer === HUB_LAYERS - 1}
                    style={{ "--z": `${((layer - (HUB_LAYERS - 1) / 2) * 2.2).toFixed(2)}px` } as CSSProperties}
                  />
                ))}
              </div>
              <div className={styles.logoDisc} />
            </div>

            {/* 1: ヒーロー */}
            <section className={`${styles.object} ${styles.heroObject}`} ref={(element) => { objectRefs.current[1] = element; }} data-stop={placements[1].stop} style={initialStyle(placements[1])} aria-labelledby="hero-title">
              <p className={styles.kicker}>{hero.kicker}</p>
              <h1 id="hero-title" className={styles.heroTitle}><span>{hero.titleTop}</span><span>{hero.titleBottom}</span></h1>
              <p className={styles.heroLead}>{hero.lead}</p>
              <p className={styles.heroTagline}>{hero.tagline}</p>
              <a className={styles.scrollCue} href="#works">{hero.explore}<i aria-hidden="true" /></a>
            </section>

            {/* 2: Works の看板 */}
            <section className={`${styles.object} ${styles.signObject}`} ref={(element) => { objectRefs.current[2] = element; }} data-stop={placements[2].stop} style={initialStyle(placements[2])} aria-labelledby="works-title">
              <p className={styles.eyebrow}>{works.eyebrow}</p>
              <h2 id="works-title" className={styles.signTitle}>{works.title}</h2>
              <p className={styles.signIntro}>{works.intro}</p>
              <Cta href={works.moreHref} external={false} secondary>{works.moreLabel}</Cta>
            </section>

            {/* 作品 */}
            {products.map((item, index) => (
              <article key={item.id} className={`${styles.object} ${styles.panel} ${styles.productPanel}`} ref={(element) => { objectRefs.current[3 + index] = element; }} data-stop={placements[3 + index].stop} aria-labelledby={`work-${item.id}`} style={{ ...initialStyle(placements[3 + index]), "--ac": item.accent } as CSSProperties}>
                <div className={styles.productVisual}>
                  <CardVisual item={item} eager={index === 0} />
                </div>
                <div className={styles.productBody}>
                  <p className={styles.productMeta}><span className={styles.dot} />{productLabel} {counter(index + 1)} ・ {item.label}</p>
                  <h3 id={`work-${item.id}`} className={styles.productTitle}>{item.title}</h3>
                  <p className={styles.productCatch}>{item.catchCopy}</p>
                  <p className={styles.productSummary}>{item.summary}</p>
                  <p className={styles.chips}><span className={`${styles.chip} ${styles.status}`}>{item.status}</span><span className={styles.chip}>{item.kind}</span></p>
                  <div className={styles.actions}>
                    <Cta href={item.href} external={item.external}>{item.ctaLabel}</Cta>
                    {item.storeUrl && <Cta href={item.storeUrl} external secondary>{item.storeLabel}</Cta>}
                  </div>
                </div>
              </article>
            ))}

            {/* About */}
            <section className={`${styles.object} ${styles.panel} ${styles.aboutPanel}`} ref={(element) => { objectRefs.current[3 + products.length] = element; }} data-stop={placements[3 + products.length].stop} style={initialStyle(placements[3 + products.length])} aria-labelledby="about-title">
              <div>
                <p className={styles.eyebrow}>{about.eyebrow}</p>
                <h2 id="about-title" className={styles.panelTitle}>{about.title}</h2>
                {about.paragraphs.map((paragraph) => <p key={paragraph} className={styles.aboutText}>{paragraph}</p>)}
                <a className={styles.textLink} href={about.linkHref}>{about.linkLabel} →</a>
              </div>
              <ul className={styles.fields} aria-label={about.fieldsLabel}>
                {about.fields.map((field, index) => <li key={field}><span>{counter(index + 1)}</span>{field}</li>)}
              </ul>
            </section>

            {/* Goods */}
            <section className={`${styles.object} ${styles.panel} ${styles.goodsPanel}`} ref={(element) => { objectRefs.current[4 + products.length] = element; }} data-stop={placements[4 + products.length].stop} style={initialStyle(placements[4 + products.length])} aria-labelledby="goods-title">
              <div>
                <p className={styles.eyebrow}>{goods.eyebrow}</p>
                <h2 id="goods-title" className={styles.panelTitle}>{goods.title}</h2>
              </div>
              <ul className={styles.goodsList}>
                {goods.items.map((item) => (
                  <li key={item.id}>
                    <a className={styles.goodsCard} href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className={styles.goodsImage}><Image src={item.image} width={370} height={320} alt={item.label} /></span>
                      <span className={styles.goodsText}>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 停留所の目次（現在地の表示とジャンプ） */}
          <nav className={styles.rail} aria-label={rail.label}>
            <ol>
              {rail.stops.map((label, stop) => (
                <li key={label}>
                  <button
                    type="button"
                    aria-current={stop === current ? "step" : undefined}
                    onClick={() => {
                      const track = trackRef.current;
                      const stage = stageRef.current;
                      if (!track || !stage) return;
                      const start = track.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(stage).top) || 0);
                      const top = start + stop * ((track.offsetHeight - stage.offsetHeight) / lastStop);
                      window.scrollTo({ top, behavior: "smooth" });
                    }}
                  >
                    <span>{counter(stop + 1)}</span><b>{label}</b>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
}
