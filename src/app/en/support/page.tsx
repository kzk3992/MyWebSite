import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { hirameEnglish } from "@/config/site";
import { englishAlternates } from "@/i18n/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Support",
  description: englishContent.support.description,
  alternates: englishAlternates("/support/", "/en/support/"),
  openGraph: {
    title: "Support | Mika Spark Studio",
    description: englishContent.support.lead,
    url: "/en/support/",
  },
};

export default function EnglishSupportPage() {
  const products = [hirameEnglish];
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Product support</p>
            <h1>Support</h1>
            <p className={styles.pageHeroLead}>{englishContent.support.lead}</p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="Support information">
            <dl>
              <div><dt>Products</dt><dd>{products.length}</dd></div>
              <div><dt>Language</dt><dd>English</dd></div>
            </dl>
          </aside>
        </Container>
      </section>
      <Section eyebrow="Choose a product" title={englishContent.support.heading}>
        <div className={styles.supportList}>
          {products.map((product) => (
            <a className={styles.supportCard} href={`${product.href}support/`} key={product.slug}>
              <div>
                <h3>{product.name} Support</h3>
                <p>{product.tagline} — {englishContent.support.productDescription.replace("{platform}", product.platform)}</p>
              </div>
              <span className={styles.supportCardArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
