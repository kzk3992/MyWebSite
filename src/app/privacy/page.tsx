import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Privacy Policies",
  description: "Mika Spark Studioが提供するアプリ・ゲームのプライバシーポリシー一覧です。",
  alternates: { canonical: "/privacy/" },
  openGraph: {
    title: "Privacy Policies | Mika Spark Studio",
    description: "プロダクト別のプライバシーポリシーをご案内します。",
    url: "/privacy/",
  },
};

export default function PrivacyIndexPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Legal / Products</p>
            <h1>Privacy Policies</h1>
            <p className={styles.pageHeroLead}>プロダクトごとのプライバシーポリシーをご確認いただけます。</p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="ポリシー情報">
            <dl><div><dt>Products</dt><dd>{siteConfig.products.length}</dd></div><div><dt>Language</dt><dd>日本語</dd></div></dl>
          </aside>
        </Container>
      </section>
      <Section eyebrow="Choose a product" title="プライバシーポリシー一覧">
        <nav className={styles.policyList} aria-label="プロダクト別プライバシーポリシー">
          {siteConfig.products.map((product, index) => (
            <a href={`${product.href}privacy/`} key={product.slug}>
              <span className={styles.policyNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span><b>{product.name}</b><small>{product.platform} · Privacy Policy</small></span>
              <span className={styles.policyArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </Section>
    </>
  );
}
