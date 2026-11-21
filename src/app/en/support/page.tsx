import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { englishContent } from "@/content/en";
import { hirameEnglish, mahouEnglish, siteConfig, uzmeraEnglish } from "@/config/site";
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

// Link directly to dedicated support pages (Hirame / Uzmera); route browser game inquiries to support email.
function supportHref(product: { slug: string; name: string; href: string; internal: boolean }) {
  if (product.internal || product.slug === "hirame" || product.slug === "uzmera") {
    return `${product.href}support/`;
  }
  const subject = encodeURIComponent(`${product.name} Support Inquiry`);
  return `mailto:${siteConfig.supportEmail}?subject=${subject}`;
}

function supportDescription(product: { slug: string; tagline: string; platform: string }) {
  if (product.slug === "mahou") {
    return `${product.tagline} — Contact support by email`;
  }
  return `${product.tagline} — ${englishContent.support.productDescription.replace("{platform}", product.platform)}`;
}

export default function EnglishSupportPage() {
  const products = [hirameEnglish, uzmeraEnglish, mahouEnglish];
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
          {products.map((product) => {
            const href = supportHref(product);
            const isExternalHttp = href.startsWith("http");
            return (
              <a className={styles.supportCard} href={href} key={product.slug} target={isExternalHttp ? "_blank" : undefined} rel={isExternalHttp ? "noopener noreferrer" : undefined}>
                <div>
                  <h3>{product.name} Support</h3>
                  <p>{supportDescription(product)}</p>
                </div>
                <span className={styles.supportCardArrow} aria-hidden="true">→</span>
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}
