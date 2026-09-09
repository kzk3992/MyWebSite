import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { hirameEnglish } from "@/config/site";
import { englishAlternates } from "@/i18n/site";
import styles from "../../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame: Idea Trainer",
  description: englishContent.hirame.description,
  alternates: englishAlternates("/apps/hirame/", "/en/apps/hirame/"),
  openGraph: {
    title: "Hirame: Idea Trainer | Mika Spark Studio",
    description: `${englishContent.hirame.tagline} Practice creative thinking through manageable constraints.`,
    url: "/en/apps/hirame/",
  },
};

export default function EnglishHiramePage() {
  return (
    <>
      <section className={`${styles.hirameHero} ${styles.hirameHeroEnglish}`} aria-labelledby="hirame-title">
        <Container className={styles.hirameHeroInner}>
          <div className={styles.hirameCopy}>
            <p className="eyebrow">Idea training / iPhone + iPad</p>
            <div className={styles.hirameTitleRow}>
              <Image src="/brand/hirame/app-icon.jpg" width={72} height={72} alt="Hirame: Idea Trainer app icon" />
              <h1 id="hirame-title">{hirameEnglish.name}</h1>
            </div>
            <p className={styles.hirameTagline}>{englishContent.hirame.tagline}</p>
            <p className={styles.hirameDescription}>{englishContent.hirame.description}</p>
            <div className={styles.heroActions}>
              <Button href={hirameEnglish.appStoreUrl ?? undefined} external={Boolean(hirameEnglish.appStoreUrl)} disabled={!hirameEnglish.appStoreUrl}>
                {hirameEnglish.appStoreUrl ? "View on the App Store" : "Coming Soon"}
              </Button>
              <span className={styles.platformNote}>Designed for iPhone &amp; iPad · In development</span>
            </div>
          </div>
          <div className={styles.hiramePreview}>
            <Image className={styles.hirameScreen} src="/brand/hirame/screens/en/01-concept.png" width={1284} height={2778} alt="Hirame's constraint-driven concept and Home screen" priority />
            <Image className={styles.hirameMascot} src="/brand/hirame/mascot.png" width={210} height={210} alt="" aria-hidden="true" />
          </div>
        </Container>
      </section>

      <Section eyebrow="Core features / 04" title={englishContent.hirame.coreTitle} intro={englishContent.hirame.coreIntro}>
        <div className={styles.featureTimeline}>
          {englishContent.hirame.features.map((feature, index) => (
            <article className={styles.featureItem} key={feature.title}>
              <p className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</p>
              <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Preview" title="Screenshots" intro={englishContent.hirame.screenshotsIntro}>
        <div className={styles.screenshotGallery} aria-label="Hirame app screens">
          {englishContent.hirame.screenshots.map((screenshot, index) => (
            <figure className={styles.screenshotExhibit} key={screenshot.src}>
              <Image src={screenshot.src} width={1284} height={2778} alt={screenshot.alt} />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{screenshot.label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section eyebrow="Information" title="Legal & support">
        <nav className={styles.legalLinks} aria-label="Hirame legal and support information">
          <a href="/en/apps/hirame/privacy/">Privacy Policy</a>
          <a href="/en/apps/hirame/terms/">Terms of Use</a>
          <a href="/en/apps/hirame/support/">Support</a>
        </nav>
      </Section>
    </>
  );
}
