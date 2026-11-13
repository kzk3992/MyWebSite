"use client";

import { useEffect } from "react";

/**
 * スクロール連動の控えめな出現モーション。
 * - JSが動いた時だけ `reveal-ready` を付けるので、JSなしでも内容は常に表示される
 * - 読み込み時点で画面内にある要素は隠さない（ちらつき防止）
 * - prefers-reduced-motion では何もしない
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const viewportHeight = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (element.getBoundingClientRect().top < viewportHeight * 0.92) {
        element.dataset.revealed = "true";
      } else {
        pending.push(element);
      }
    }
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((element) => observer.observe(element));

    // 末尾へのジャンプなどで通り過ぎた要素を取りこぼさない（上に抜けた要素は表示済みにする）
    let frame = 0;
    const sweep = () => {
      frame = 0;
      for (const element of pending) {
        if (element.dataset.revealed !== "true" && element.getBoundingClientRect().top < 0) {
          element.dataset.revealed = "true";
          observer.unobserve(element);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
