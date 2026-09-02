import type { Metadata } from "next";
import Image from "next/image";
import { BrandIcon } from "@/components/BrandIcon";
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
          <div className={styles.heroArtwork} aria-hidden="true">
            <Image src="/brand/hero-wolf.jpg" width={943} height={793} alt="" priority sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <a className={styles.heroAside} href="#works"><BrandIcon name="paw" size={30} />Explore works</a>
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

      <Section tone="muted" eyebrow="02 / ABOUT" title="Built independently.">
        <div className={styles.aboutGrid}>
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
    </>
  );
}
