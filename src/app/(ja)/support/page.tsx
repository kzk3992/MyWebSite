import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/i18n/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Support",
  description: "Mika Spark Studioのアプリ・ゲームに関するサポート窓口です。",
  alternates: localizedAlternates("/support/", "/en/support/"),
  openGraph: {
    title: "Support | Mika Spark Studio",
    description: "Mika Spark Studioの各プロダクトのサポート情報をご案内します。",
    url: "/support/",
  },
};

// 個別サポートページがある作品（Hirame / Uzmera）は直接そこへ。ブラウザゲーム（まほうのある暮らし）はメール窓口へ。
function supportHref(product: { slug: string; name: string; href: string; internal: boolean }) {
  if (product.internal || product.slug === "hirame" || product.slug === "uzmera") {
    return `${product.href}support/`;
  }
  const subject = encodeURIComponent(`${product.name} サポートへの問い合わせ`);
  return `mailto:${siteConfig.supportEmail}?subject=${subject}`;
}

function supportDescription(product: { slug: string; tagline: string; platform: string }) {
  if (product.slug === "mahou") {
    return `${product.tagline} — ブラウザゲームに関するお問い合わせ（メール）`;
  }
  return `${product.tagline} — ${product.platform}アプリのサポート情報`;
}

export default function SupportPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Product support</p>
            <h1>Support</h1>
            <p className={styles.pageHeroLead}>
              ご利用中のプロダクトを選択してください。よくある質問やお問い合わせ方法をご案内します。
            </p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="サポート情報">
            <dl>
              <div><dt>Products</dt><dd>{siteConfig.products.length}</dd></div>
              <div><dt>Language</dt><dd>日本語</dd></div>
            </dl>
          </aside>
        </Container>
      </section>

      <Section eyebrow="Choose a product" title="プロダクト別サポート">
        <div className={styles.supportList}>
          {siteConfig.products.map((product) => {
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
