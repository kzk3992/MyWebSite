import type { Metadata } from "next";
import { BrandIcon } from "@/components/BrandIcon";
import { Container } from "@/components/Container";
import { GoodsSection } from "@/components/GoodsSection";
import { PerspectiveRoom } from "@/components/PerspectiveRoom";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/i18n/site";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Mika Spark Studio | Independent Apps & Games" },
  description: "小さなアイデアを、使えるプロダクトへ。Mika Spark Studioの公式サイトです。",
  alternates: localizedAlternates("/", "/en/"),
  openGraph: {
    title: "Mika Spark Studio | Independent Apps & Games",
    description: "小さなアイデアを、使えるプロダクトへ。",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className={styles.depthHome}>
      {/* 背景：パースの線の部屋（画面に固定）。スクロールした分だけ奥へ進み、立体ロゴに近づく */}
      <PerspectiveRoom mode="scroll" logo view={{ horizon: 0.5, vanishX: 0.68, logoZ: 11 }} viewMobile={{ horizon: 0.7, vanishX: 0.5, logoZ: 8 }} className={styles.roomLayer} />
      <section className={styles.hero} aria-labelledby="hero-title">
        <Container className={styles.heroInner}>
          <div className={styles.heroCopyBlock}>
            <div className={styles.heroSignal}><span>Signal 001</span><i /></div>
            <p className={styles.heroKicker}>Independent development studio</p>
            <h1 id="hero-title">
              <span>Mika Spark</span>
              <span>Studio</span>
            </h1>
            <div className={styles.heroCopy}>
              <BrandIcon name="spark" size={38} />
              <div>
                <p className={styles.heroLead}>小さなアイデアを、使えるプロダクトへ。</p>
                <p className={styles.heroTagline}>{siteConfig.tagline}</p>
              </div>
            </div>
          </div>
          <div className={styles.heroRail}>
            <span className={styles.heroRailTicks} aria-hidden="true" />
            <a className={styles.heroAside} href="#works"><BrandIcon name="paw" size={30} />Explore works<i aria-hidden="true" /></a>
          </div>
        </Container>
      </section>

      <Section
        id="works"
        eyebrow="01 / Selected work"
        title="Ideas in motion."
        intro="日々の小さな着想を、手触りのあるアプリやゲームへ。Mika Spark Studioが公開しているプロダクトです。"
      >
        <div className={styles.worksList}>
          {["hirame", "uzmera", "mahou"].map((slug, index) => (
            <ProductCard key={slug} product={siteConfig.products.find((product) => product.slug === slug)!} index={index + 1} />
          ))}
        </div>
        <a className={styles.worksMore} href="/works/">すべての作品を見る →</a>
      </Section>

      <Section tone="muted" eyebrow="02 / ABOUT" title="Built independently.">
        <div className={styles.aboutGrid} data-reveal>
          <div className={styles.aboutCopy}>
            <p>
              Mika Spark Studioは、個人でアプリやゲームを企画・開発・公開するインディーデベロップメントスタジオです。
            </p>
            <p>
              新しいアイデア、便利な仕組み、遊び心のある体験を、小さく作って公開していきます。
            </p>
            <a className={styles.aboutLink} href="/about/">
              スタジオについて →
            </a>
          </div>
          <div className={styles.aboutFields} aria-label="制作領域">
            {['Apps', 'Games', 'Tools', 'Experiments'].map((field, index) => (
              <p key={field}><span>0{index + 1}</span>{field}</p>
            ))}
          </div>
        </div>
      </Section>

      <GoodsSection locale="ja" />
    </div>
  );
}
