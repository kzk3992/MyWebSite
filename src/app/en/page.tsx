import type { Metadata } from "next";
import { GoodsSection } from "@/components/GoodsSection";
import { ProductCard } from "@/components/ProductCard";
import { RoomHero, type RoomHeroContent } from "@/components/RoomHero";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { hirameEnglish, mahouEnglish, uzmeraEnglish } from "@/config/site";
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

const room: RoomHeroContent = {
  title: "Mika Spark Studio",
  lead: englishContent.home.heroLead,
  hint: "SCROLL ↓",
  navLabel: "Pages",
  about: { href: "/en/about/", label: "About" },
  works: { href: "/en/works/", label: "Works" },
  support: { href: "/en/support/", label: "Support" },
  privacy: { href: "https://hirame.mikaspark.com/en/privacy/", label: "Privacy" },
};

export default function EnglishHomePage() {
  return (
    <>
      {/* 最初の画面：パースの線の部屋。自動で奥へ歩き、About・Works・Support・Privacy が近づいてくる */}
      <RoomHero content={room} />

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
    </>
  );
}
