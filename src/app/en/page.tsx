import type { Metadata } from "next";
import Image from "next/image";
import { BrandIcon } from "@/components/BrandIcon";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { hirameEnglish, siteConfig } from "@/config/site";
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
    <>
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
          <div className={styles.heroArtwork} aria-hidden="true">
            <Image src="/brand/hero-wolf.jpg" width={943} height={793} alt="" priority sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <a className={styles.heroAside} href="#works"><BrandIcon name="paw" size={30} />Explore works</a>
        </Container>
      </section>

      <Section id="works" eyebrow="Selected work / 01" title="Ideas in motion." intro={englishContent.home.worksIntro}>
        <ProductCard product={hirameEnglish} locale="en" />
      </Section>

      <Section tone="muted" eyebrow="02 / ABOUT" title="Built independently.">
        <div className={styles.aboutGrid}>
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
    </>
  );
}
