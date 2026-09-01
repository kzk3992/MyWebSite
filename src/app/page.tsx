import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Mika Spark Studio | Independent Apps & Games" },
  description: "小さなアイデアを、使えるプロダクトへ。Mika Spark Studioの公式サイトです。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mika Spark Studio | Independent Apps & Games",
    description: "小さなアイデアを、使えるプロダクトへ。",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <Container className={styles.heroInner}>
          <p className={styles.heroKicker}>Independent development studio</p>
          <h1 id="hero-title">
            <span className={styles.heroTitlePrimary}>Mika Spark</span>
            <span className={styles.heroTitleOutline}>Studio</span>
          </h1>
          <div className={styles.heroCopy}>
            <span className={styles.heroNumber}>001</span>
            <div>
              <p className={styles.heroLead}>小さなアイデアを、使えるプロダクトへ。</p>
              <p className={styles.heroTagline}>{siteConfig.tagline}</p>
            </div>
          </div>
          <p className={styles.heroAside}>Scroll to discover</p>
        </Container>
      </section>

      <Section
        id="works"
        eyebrow="Selected work / 01"
        title="Ideas in motion."
        intro="日々の小さな着想を、手触りのあるアプリやゲームへ。現在公開準備中のプロダクトです。"
      >
        {siteConfig.products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index + 1} />
        ))}
      </Section>

      <Section tone="muted">
        <div className={styles.aboutGrid}>
          <p className={styles.aboutLabel}>About the studio</p>
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
        </div>
      </Section>
    </>
  );
}
