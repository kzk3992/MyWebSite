import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { siteConfig } from "@/config/site";
import { englishAlternates } from "@/i18n/site";
import styles from "../../../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame: Idea Trainer Support",
  description: englishContent.hirameSupport.description,
  alternates: englishAlternates("/apps/hirame/support/", "/en/apps/hirame/support/"),
  openGraph: {
    title: "Hirame: Idea Trainer Support | Mika Spark Studio",
    description: englishContent.hirameSupport.lead,
    url: "/en/apps/hirame/support/",
  },
};

export default function EnglishHirameSupportPage() {
  const subject = encodeURIComponent("Hirame: Idea Trainer support inquiry");
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Hirame: Idea Trainer / Help center</p>
            <h1>Hirame: Idea Trainer Support</h1>
            <p className={styles.pageHeroLead}>{englishContent.hirameSupport.lead}</p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="Hirame support details">
            <dl>
              <div><dt>Platform</dt><dd>iPhone / iPad</dd></div>
              <div><dt>Account</dt><dd>Not required</dd></div>
              <div><dt>Storage</dt><dd>Device / iCloud</dd></div>
            </dl>
          </aside>
        </Container>
      </section>

      <Section eyebrow="FAQ" title="Frequently asked questions">
        <div className={styles.faqList}>
          {englishContent.hirameSupport.faqs.map((faq) => (
            <article className={styles.faqItem} key={faq.question}>
              <p className={styles.faqQuestion}><span>Q.</span>{faq.question}</p>
              <p className={styles.faqAnswer}><span>A.</span>{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Troubleshooting" title="Bugs and issues" intro={englishContent.hirameSupport.troubleshooting}>
        <div className={styles.contactBox}>
          <p>{englishContent.hirameSupport.contactDetails}</p>
          <Button href={`mailto:${siteConfig.supportEmail}?subject=${subject}`}>Contact support</Button>
          <p className={styles.notice}>Email: {siteConfig.supportEmail}. A reply may take some time.</p>
        </div>
      </Section>

      <Section eyebrow="Data & privacy" title="Data and privacy">
        <nav className={styles.legalLinks} aria-label="Hirame data and privacy">
          <a href="/en/apps/hirame/privacy/">Privacy Policy</a>
          <a href="/en/apps/hirame/terms/">Terms of Use</a>
          <a href="/en/apps/hirame/">Hirame: Idea Trainer Overview</a>
        </nav>
      </Section>
    </>
  );
}
