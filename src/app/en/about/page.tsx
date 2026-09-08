import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { englishAlternates } from "@/i18n/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "About",
  description: englishContent.about.description,
  alternates: englishAlternates("/about/", "/en/about/"),
  openGraph: {
    title: "About | Mika Spark Studio",
    description: englishContent.about.lead,
    url: "/en/about/",
  },
};

const directions = ["Apps", "Games", "Tools", "Experiments"];

export default function EnglishAboutPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">About / Mika Spark Studio</p>
            <h1>Small studio.<br />Bright ideas.</h1>
            <p className={styles.pageHeroLead}>{englishContent.about.lead}</p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="Studio information">
            <dl>
              <div><dt>Type</dt><dd>Independent</dd></div>
              <div><dt>Focus</dt><dd>Apps &amp; Games</dd></div>
              <div><dt>Based</dt><dd>Japan</dd></div>
            </dl>
          </aside>
        </Container>
      </section>
      <Section>
        <div className={styles.proseGrid}>
          <p className={styles.proseAside}>What I make</p>
          <div className={styles.proseBody}>
            <h2>{englishContent.about.heading}</h2>
            <p>{englishContent.about.body}</p>
            <div className={styles.directionGrid}>
              {directions.map((direction, index) => (
                <article className={styles.directionItem} key={direction}>
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{direction}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
