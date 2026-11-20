"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/site";
import type { CarouselItem } from "./worksCarouselItems";
import styles from "./WorksCarousel.module.css";

/*
 * 仮想リング：作品数に関係なく、カードは試作（6枚）と同じ60°間隔に並べる。
 * 4作品だと後ろが空くので、各カードの位置を「正面からの相対番号」で -N/2〜N/2 に折り返す。
 * 折り返しが起きるのは ±120° 付近＝裏向きで描画されない範囲なので、付け替えは見えない。
 */
const SLOT_DEG = 60;
const HIDDEN_FROM_DEG = 100;
const HUB_LAYERS = 13;
const IDLE_BEFORE_DRIFT_MS = 3500;
const DRIFT_PER_SECOND = 0.045; // 作品単位（= 2.7°/秒）
const DRAG_DEG_PER_PX = 0.28;
const WHEEL_DEG_PER_PX = 0.055;
const BASE_TILT_X = 3.2;

const text = {
  ja: {
    carousel: "作品カードのカルーセル",
    controls: "カルーセルの操作",
    previous: "前の作品",
    next: "次の作品",
    bringFront: (title: string) => `${title} を前面に表示`,
    show: (title: string) => `${title} を表示`,
    slide: (index: number, total: number) => `${total}件中${index}件目`,
    hint: "カードが回ります",
    indexTitle: "作品一覧",
  },
  en: {
    carousel: "Carousel of works",
    controls: "Carousel controls",
    previous: "Previous work",
    next: "Next work",
    bringFront: (title: string) => `Bring ${title} to the front`,
    show: (title: string) => `Show ${title}`,
    slide: (index: number, total: number) => `${index} of ${total}`,
    hint: "Rotate the cards",
    indexTitle: "All works",
  },
} as const;

// SSR とクライアントで同じ値になるよう、ほこりの位置は固定値で持つ。
const dust = [
  [8, 22, 4.2, 7.1, -1.2, 0.3], [17, 68, 3.4, 9.4, -4.8, 0.22], [26, 12, 5.8, 6.2, -2.4, 0.18], [34, 84, 3.1, 10.2, -6.1, 0.3],
  [47, 30, 4.6, 8.3, -0.6, 0.2], [55, 74, 3.6, 5.6, -3.3, 0.26], [63, 18, 6.2, 9.8, -7.2, 0.16], [71, 58, 3.3, 7.7, -1.9, 0.3],
  [79, 36, 4.9, 6.8, -5.4, 0.2], [86, 80, 3.8, 10.6, -2.8, 0.24], [92, 14, 5.1, 8.9, -4.1, 0.18], [12, 46, 3.2, 6.6, -6.7, 0.28],
] as const;

function relativeSlot(index: number, position: number, total: number) {
  const half = total / 2;
  return ((((index - position) % total) + total + half) % total) - half;
}

function depthStyle(angle: number) {
  const diff = Math.min(Math.abs(angle), 180);
  const t = Math.pow(Math.min(diff, 105) / 105, 1.35);
  return {
    hidden: diff > HIDDEN_FROM_DEG,
    blur: Math.round(t * 24) / 10,
    opacity: Math.round((1 - t * 0.34) * 50) / 50,
    shade: Math.pow(diff / 180, 1.4) * 0.52,
    filter: `blur(${Math.round(t * 24) / 10}px) brightness(${(1 + t * 0.07).toFixed(3)}) saturate(${(1 - t * 0.28).toFixed(3)})`,
  };
}

function ArrowIcon({ external = true }: { external?: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      {external
        ? <path d="M2 10L10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M1.5 6h9M7 2.5 10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function CardVisual({ item, eager }: { item: CarouselItem; eager: boolean }) {
  const visual = item.visual;
  if (visual.kind === "mahou") {
    return (
      <span className={styles.mahou} aria-hidden="true">
        <span className={styles.mahouStars} />
        <span className={styles.mahouLogo}><span>まほう</span><span>のある</span><span>暮らし</span><i>✦</i></span>
        <span className={styles.mahouScene}>
          <Image className={styles.mahouWizard} src="/brand/mahou/wizard.svg" width={16} height={18} alt="" />
          <Image className={styles.mahouBooks} src="/brand/mahou/books.svg" width={16} height={18} alt="" />
          <Image className={styles.mahouSlime} src="/brand/mahou/slime.svg" width={16} height={18} alt="" />
          <Image className={styles.mahouGhost} src="/brand/mahou/ghost.svg" width={16} height={18} alt="" />
          <span className={styles.mahouGround} />
        </span>
      </span>
    );
  }
  return (
    <span className={`${styles.artImage} ${visual.fit === "contain" ? styles.artContain : ""} ${visual.appIcon ? styles.artIcon : ""}`} style={{ background: visual.background }}>
      <span className={styles.artFrame}>
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 560px) 160px, 300px"
          loading={eager ? "eager" : "lazy"}
          style={{ objectFit: visual.fit, objectPosition: visual.position, imageRendering: visual.pixelated ? "pixelated" : undefined }}
        />
      </span>
    </span>
  );
}

type Controller = { step: (direction: 1 | -1) => void; goTo: (index: number) => void };

export function WorksCarousel({ items, locale }: { items: CarouselItem[]; locale: Locale }) {
  const copy = text[locale];
  const total = items.length;
  const [front, setFront] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // 奥のカードの「透け」は opacity ではなく白い霧で表す。カードを半透明にすると中央のロゴが透けて見え、
  // iOS Safari では opacity/filter 付きの要素の前後判定が崩れてロゴが手前に描かれることがあるため。
  const fogRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const controller = useRef<Controller | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const detail = detailRef.current;
    if (!root || !stage || !tilt || !detail) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let position = 0; // 正面にある作品の番号（連続値）
    let target = 0;
    let frontIndex = 0;
    let lastInput = -Infinity;
    let userMoved = false;
    let snapTimer: number | undefined;
    let hovering = false;
    let focused = false;
    let tiltX = BASE_TILT_X, tiltY = 0, tiltTargetX = BASE_TILT_X, tiltTargetY = 0;
    const depthKeys: string[] = [];
    const hiddenFlags: (boolean | null)[] = items.map(() => null);

    // 入力が途切れて170ms後に最寄りのカードへ吸着する。
    // マウスの横ホイールは1ノッチが小さい（約0.1枚分）ので、単純な四捨五入だと元のカードへ戻ってしまう。
    // そこで入力開始位置を覚えておき、一定以上動いていれば動いた向きに最低1枚は進める。
    let dragging = false, captured = false, startX = 0, startTarget = 0, lastX = 0, lastT = 0, velocity = 0, pointerId = -1;
    let gestureStart: number | null = null;
    const begin = () => { if (gestureStart === null) gestureStart = target; };
    const snap = () => {
      if (dragging) return;
      const from = gestureStart ?? target;
      const moved = target - from;
      let snapped = Math.round(target);
      if (moved > 0.08) snapped = Math.max(snapped, Math.round(from) + 1);
      if (moved < -0.08) snapped = Math.min(snapped, Math.round(from) - 1);
      target = snapped;
      gestureStart = null;
    };
    const poke = () => {
      lastInput = performance.now();
      userMoved = true;
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snap, 170);
    };
    const step = (direction: 1 | -1) => { gestureStart = null; target = Math.round(target) + direction; poke(); };
    const goTo = (index: number) => { gestureStart = null; target = index + Math.round((target - index) / total) * total; poke(); };
    controller.current = { step, goTo };

    // 横ホイール（トラックパッドの横スワイプ）だけで回す。縦スクロールはページに任せる。
    const onWheel = (event: WheelEvent) => {
      let dx = event.deltaX;
      const dy = event.deltaY;
      if (Math.abs(dx) <= Math.abs(dy) || dx === 0) return;
      event.preventDefault();
      begin();
      if (event.deltaMode === 1) dx *= 16;
      target += (dx * WHEEL_DEG_PER_PX) / SLOT_DEG;
      poke();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging = true; captured = false; pointerId = event.pointerId;
      startX = lastX = event.clientX; startTarget = target; lastT = performance.now(); velocity = 0;
      suppressClick.current = false;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      if (now > lastT) velocity = velocity * 0.7 + (dx / (now - lastT)) * 0.3;
      lastX = event.clientX; lastT = now;
      const moved = event.clientX - startX;
      // 少し動くまではキャプチャしない（カードのクリックを生かすため）
      if (!captured && Math.abs(moved) > 6) {
        captured = true; suppressClick.current = true;
        begin();
        stage.setPointerCapture(event.pointerId);
        stage.dataset.dragging = "true";
      }
      if (!captured) return;
      target = startTarget - (moved * DRAG_DEG_PER_PX) / SLOT_DEG;
      poke();
    };
    const endDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      delete stage.dataset.dragging;
      if (captured) { target -= (velocity * 90) / SLOT_DEG; poke(); }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const element = event.target as HTMLElement | null;
      if (element && (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName))) return;
      if (event.key === "ArrowRight") { step(1); }
      if (event.key === "ArrowLeft") { step(-1); }
    };

    const onMouseMove = (event: MouseEvent) => {
      tiltTargetY = (event.clientX / window.innerWidth - 0.5) * 5;
      tiltTargetX = BASE_TILT_X - (event.clientY / window.innerHeight - 0.5) * 4;
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };
    const onFocusIn = () => { focused = true; };
    const onFocusOut = (event: FocusEvent) => { if (!root.contains(event.relatedTarget as Node | null)) focused = false; };

    // カード内の画像をつかむとブラウザ標準の画像ドラッグが始まり、pointer が途切れるので止める
    const onDragStart = (event: DragEvent) => event.preventDefault();
    stage.addEventListener("dragstart", onDragStart);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    window.addEventListener("keydown", onKey);
    if (!reduced && fine) window.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    let previous = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - previous, 64);
      previous = now;
      const paused = hovering || focused || dragging;
      if (!reduced && !paused && now - lastInput > IDLE_BEFORE_DRIFT_MS) {
        target += (DRIFT_PER_SECOND * dt) / 1000;
        userMoved = false;
      }
      if (reduced) {
        position = target;
      } else {
        position += (target - position) * (1 - Math.pow(1 - 0.085, dt / 16.67));
        if (Math.abs(target - position) < 0.00002) position = target;
        tiltX += (tiltTargetX - tiltX) * 0.05;
        tiltY += (tiltTargetY - tiltY) * 0.05;
        tilt.style.transform = `rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg)`;
      }

      for (let index = 0; index < total; index += 1) {
        const wrap = wrapRefs.current[index];
        const card = cardRefs.current[index];
        const shade = shadeRefs.current[index];
        if (!wrap || !card || !shade) continue;
        const angle = relativeSlot(index, position, total) * SLOT_DEG;
        wrap.style.setProperty("--a", angle.toFixed(3));
        const depth = depthStyle(angle);
        shade.style.opacity = depth.shade.toFixed(3);
        const key = `${depth.blur}|${depth.opacity}`;
        if (key !== depthKeys[index]) {
          depthKeys[index] = key;
          card.style.filter = depth.filter;
          const fog = fogRefs.current[index];
          if (fog) fog.style.opacity = (1 - depth.opacity).toFixed(2);
        }
        // 裏向きのカードはタップ・タブ順・支援技術から外す
        if (depth.hidden !== hiddenFlags[index]) {
          hiddenFlags[index] = depth.hidden;
          wrap.style.visibility = depth.hidden ? "hidden" : "";
          card.tabIndex = depth.hidden ? -1 : 0;
          if (depth.hidden) wrap.setAttribute("aria-hidden", "true");
          else wrap.removeAttribute("aria-hidden");
        }
      }

      const nextFront = ((Math.round(position) % total) + total) % total;
      if (nextFront !== frontIndex) {
        frontIndex = nextFront;
        // 自動回転中は読み上げない（WAI-ARIA のカルーセル指針）
        detail.setAttribute("aria-live", userMoved ? "polite" : "off");
        setFront(nextFront);
      }
      raf = window.requestAnimationFrame(frame);
    };
    raf = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(snapTimer);
      controller.current = null;
      stage.removeEventListener("dragstart", onDragStart);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [items, total]);

  const current = items[front];
  const counter = (value: number) => String(value).padStart(2, "0");

  return (
    <>
      <section ref={rootRef} className={styles.root} role="region" aria-roledescription="carousel" aria-label={copy.carousel}>
        <div className={styles.dust} aria-hidden="true">
          {dust.map(([left, top, size, duration, delay, opacity], index) => (
            <i key={index} style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s`, opacity, filter: size > 5.6 ? "blur(1.3px)" : undefined }} />
          ))}
        </div>

        <header className={styles.topbar}>
          <h1 className={styles.heading}><span>Mika Spark Studio ／ </span>Works</h1>
          <p className={styles.counter} aria-hidden="true"><b>{counter(front + 1)}</b> / {counter(total)}</p>
        </header>

        <div ref={stageRef} className={styles.stage}>
          <div ref={tiltRef} className={styles.tilt}>
            <div className={styles.wall} aria-hidden="true" />
            <div className={`${styles.wallSide} ${styles.wallSideLeft}`} aria-hidden="true" />
            <div className={`${styles.wallSide} ${styles.wallSideRight}`} aria-hidden="true" />
            <div className={styles.floor} aria-hidden="true" />
            <div className={styles.ground} aria-hidden="true" />
            <div className={styles.hub} aria-hidden="true">
              <div className={styles.hubBob}>
                <div className={styles.hubModel}>
                  {Array.from({ length: HUB_LAYERS }, (_, layer) => (
                    <Image
                      key={layer}
                      className={layer === HUB_LAYERS - 1 ? "" : layer === 0 ? styles.hubBack : styles.hubSide}
                      src="/brand/logo-mark.png"
                      width={640}
                      height={573}
                      alt=""
                      style={{ transform: `translateZ(${((layer - (HUB_LAYERS - 1) / 2) * 1.55).toFixed(2)}px)` }}
                    />
                  ))}
                </div>
                <div className={styles.hubDisc} />
              </div>
            </div>

            {/* 中央モデルはカードより先に置く：前後判定が崩れても DOM 順でカードの後ろに描かれる */}
            <div className={styles.ring}>
              {items.map((item, index) => {
                const angle = relativeSlot(index, 0, total) * SLOT_DEG;
                const depth = depthStyle(angle);
                const eager = Math.abs(angle) <= SLOT_DEG;
                return (
                  <div
                    key={item.id}
                    ref={(element) => { wrapRefs.current[index] = element; }}
                    className={styles.wrap}
                    style={{ "--a": angle, visibility: depth.hidden ? "hidden" : undefined } as CSSProperties}
                    aria-hidden={depth.hidden || undefined}
                    role="group"
                    aria-roledescription={locale === "ja" ? "スライド" : "slide"}
                    aria-label={copy.slide(index + 1, total)}
                  >
                    <div className={styles.bob} style={{ animationDuration: `${5.4 + (index % 3) * 0.4}s`, animationDelay: `${-1.3 * index}s` }}>
                      <button
                        ref={(element) => { cardRefs.current[index] = element; }}
                        type="button"
                        className={styles.card}
                        style={{ "--ac": item.accent, filter: depth.filter } as CSSProperties}
                        tabIndex={depth.hidden ? -1 : 0}
                        aria-label={copy.bringFront(item.title)}
                        onClick={() => {
                          if (suppressClick.current) { suppressClick.current = false; return; }
                          controller.current?.goTo(index);
                        }}
                      >
                        <span className={styles.art}>
                          <CardVisual item={item} eager={eager} />
                          <span ref={(element) => { shadeRefs.current[index] = element; }} className={styles.shade} style={{ opacity: depth.shade }} />
                        </span>
                        <span className={styles.body}>
                          <span className={styles.meta}><span className={styles.dot} />{counter(index + 1)} ・ {item.label}</span>
                          <span className={styles.cardTitle}>{item.title}</span>
                          <span className={styles.summary}>{item.summary}</span>
                        </span>
                        <span ref={(element) => { fogRefs.current[index] = element; }} className={styles.fog} style={{ opacity: 1 - depth.opacity }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        <div ref={detailRef} className={styles.detail} aria-live="polite" aria-atomic="true">
          <div key={current.id} className={styles.swap}>
            <h2 className={styles.detailTitle}>{current.title}</h2>
            <p className={styles.catch}>{current.catchCopy}</p>
            <div className={styles.row}>
              <span className={`${styles.chip} ${styles.status}`} style={{ "--ac": current.accent } as CSSProperties}>{current.status}</span>
              <span className={styles.chip}>{current.kind}</span>
              <span className={styles.actions}>
                <a className={styles.cta} href={current.href} {...(current.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {current.ctaLabel}<ArrowIcon external={current.external} />
                </a>
                {current.storeUrl && (
                  <a className={`${styles.cta} ${styles.ctaStore}`} href={current.storeUrl} target="_blank" rel="noopener noreferrer">
                    {current.storeLabel}<ArrowIcon />
                  </a>
                )}
              </span>
            </div>
          </div>
        </div>

        <nav className={styles.controls} aria-label={copy.controls}>
          <div className={styles.navRow}>
            <button type="button" className={styles.navButton} aria-label={copy.previous} onClick={() => controller.current?.step(-1)}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M11.5 3L6 9l5.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className={styles.dots}>
              {items.map((item, index) => (
                <button key={item.id} type="button" className={index === front ? styles.dotOn : undefined} aria-label={copy.show(item.title)} aria-current={index === front || undefined} onClick={() => controller.current?.goTo(index)}>
                  <i />
                </button>
              ))}
            </div>
            <button type="button" className={styles.navButton} aria-label={copy.next} onClick={() => controller.current?.step(1)}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M6.5 3L12 9l-5.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <p className={styles.hint} aria-hidden="true">SCROLL ／ DRAG <span className={styles.hintArrow}>→</span> {copy.hint}</p>
        </nav>
      </section>

      {/* 検索・支援技術・JSなし環境向けの作品一覧（全作品へのリンクを静的HTMLに含める） */}
      <section className={styles.index} aria-labelledby="works-index-title">
        <h2 id="works-index-title" className={styles.indexTitle}>{copy.indexTitle}</h2>
        <ol className={styles.indexList}>
          {items.map((item, index) => (
            <li key={item.id}>
              <span className={styles.indexNumber}>{counter(index + 1)}</span>
              <span className={styles.indexName}>{item.title}</span>
              <span className={styles.indexKind}>{item.kind} ・ {item.status}</span>
              <span className={styles.indexLinks}>
                <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{item.ctaLabel} →</a>
                {item.storeUrl && <a href={item.storeUrl} target="_blank" rel="noopener noreferrer">{item.storeLabel} →</a>}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
