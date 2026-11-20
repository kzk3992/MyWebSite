import type { Metadata } from "next";
import { GoodsSection } from "@/components/GoodsSection";
import { ProductCard } from "@/components/ProductCard";
import { RoomHero, type RoomHeroContent } from "@/components/RoomHero";
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

const room: RoomHeroContent = {
  title: "Mika Spark Studio",
  lead: "小さなアイデアを、使えるプロダクトへ。",
  hint: "SCROLL ↓",
  navLabel: "ページ",
  about: { href: "/about/", label: "About" },
  works: { href: "/works/", label: "Works" },
  support: { href: "/support/", label: "Support" },
  privacy: { href: "/privacy/", label: "Privacy" },
};

export default function Home() {
  return (
    <>
      {/* 最初の画面：パースの線の部屋。自動で奥へ歩き、About・Works・Support・Privacy が近づいてくる */}
      <RoomHero content={room} />

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
    </>
  );
}
