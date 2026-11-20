import type { Metadata } from "next";
import { BrandIcon } from "@/components/BrandIcon";
import { Container } from "@/components/Container";
import { GoodsSection } from "@/components/GoodsSection";
import { PerspectiveRoom } from "@/components/PerspectiveRoom";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { hirameEnglish, mahouEnglish, siteConfig, uzmeraEnglish } from "@/config/site";
import { englishAlternates } from "@/i18n/site";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Mika Spark Studio | Independent Apps & Games" },
  description: englishContent.home.description,
  alternates: englishAlternates("/", "/en/"),
  openGraph: {
    title: "Mika Spark Studio | Independent Apps & Games",
    description: englishContent.home.heroLead,
    url: "/en/",
  },
};

export default function EnglishHomePage() {
  return (
    <div className={styles.depthHome}>
      {/* 背景：パースの線の部屋（画面に固定）。スクロールした分だけ奥へ進み、立体ロゴに近づく */}
      <PerspectiveRoom mode="scroll" logo view={{ horizon: 0.5, vanishX: 0.68, logoZ: 11 }} viewMobile={{ horizon: 0.7, vanishX: 0.5, logoZ: 8 }} className={styles.roomLayer} />
      <section className={styles.hero} aria-labelledby="hero-title">
        <Container className={styles.heroInner}>
          <div className={styles.heroCopyBlock}>
            <div className={styles.heroSignal}><span>Signal 001</span><i /></div>
            <p className={styles.heroKicker}>Independent development studio</p>
            <h1 id="hero-title"><span>Mika Spark</span><span>Studio</span></h1>
            <div className={styles.heroCopy}>
              <BrandIcon name="spark" size={38} />
              <div>
                <p className={styles.heroLead}>{englishContent.home.heroLead}</p>
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

      <Section id="works" eyebrow="01 / Selected work" title="Ideas in motion." intro={englishContent.home.worksIntro}>
        <div className={styles.worksList}>
          <ProductCard product={hirameEnglish} locale="en" />
          <ProductCard product={uzmeraEnglish} locale="en" index={2} />
          <ProductCard product={mahouEnglish} locale="en" index={3} />
        </div>
        <a className={styles.worksMore} href="/en/works/">Explore all works →</a>
      </Section>

      <Section tone="muted" eyebrow="02 / ABOUT" title="Built independently.">
        <div className={styles.aboutGrid} data-reveal>
          <div className={styles.aboutCopy}>
            {englishContent.home.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a className={styles.aboutLink} href="/en/about/">{englishContent.home.aboutLink} →</a>
          </div>
          <div className={styles.aboutFields} aria-label="What Mika Spark Studio makes">
            {["Apps", "Games", "Tools", "Experiments"].map((field, index) => (
              <p key={field}><span>0{index + 1}</span>{field}</p>
            ))}
          </div>
        </div>
      </Section>

      <GoodsSection locale="en" />
    </div>
  );
}
