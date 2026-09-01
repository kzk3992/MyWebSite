import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Support",
  description: "Mika Spark Studioのアプリ・ゲームに関するサポート窓口です。",
  alternates: { canonical: "/support/" },
  openGraph: {
    title: "Support | Mika Spark Studio",
    description: "Mika Spark Studioの各プロダクトのサポート情報をご案内します。",
    url: "/support/",
  },
};

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
          {siteConfig.products.map((product) => (
            <a className={styles.supportCard} href={`${product.href}support/`} key={product.slug}>
              <div>
                <h3>{product.name} Support</h3>
                <p>{product.tagline} — {product.platform}アプリのサポート情報</p>
              </div>
              <span className={styles.supportCardArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
