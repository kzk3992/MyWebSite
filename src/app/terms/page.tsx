import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Mika Spark Studioが提供するアプリ・ゲームの利用規約一覧です。",
  alternates: { canonical: "/terms/" },
  openGraph: {
    title: "Terms of Use | Mika Spark Studio",
    description: "プロダクト別の利用規約をご案内します。",
    url: "/terms/",
  },
};

export default function TermsIndexPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Legal / Products</p>
            <h1>Terms of Use</h1>
            <p className={styles.pageHeroLead}>プロダクトごとの利用規約をご確認いただけます。</p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="利用規約情報">
            <dl><div><dt>Products</dt><dd>{siteConfig.products.length}</dd></div><div><dt>Language</dt><dd>日本語</dd></div></dl>
          </aside>
        </Container>
      </section>
      <Section eyebrow="Choose a product" title="利用規約一覧">
        <nav className={styles.policyList} aria-label="プロダクト別利用規約">
          {siteConfig.products.map((product, index) => (
            <a href={`${product.href}terms/`} key={product.slug}>
              <span className={styles.policyNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span><b>{product.name}</b><small>{product.platform} · Terms of Use</small></span>
              <span className={styles.policyArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </Section>
    </>
  );
}
