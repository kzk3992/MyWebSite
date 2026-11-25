import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import styles from "../../content.module.css";

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
  const legalProducts = siteConfig.products.filter((product) => product.category === "App");
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
            <dl><div><dt>Products</dt><dd>{legalProducts.length}</dd></div><div><dt>Language</dt><dd>日本語</dd></div></dl>
          </aside>
        </Container>
      </section>
      <Section eyebrow="Website" title="本ウェブサイトのプライバシーポリシー">
        <div className={styles.proseGrid}>
          <p className={styles.proseAside}>mikaspark.com</p>
          <div className={styles.proseBody}>
            <p>
              Mika Spark Studio（以下「当スタジオ」）は、本ウェブサイト（mikaspark.com およびそのサブドメイン、以下「本サイト」）における利用者の情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>
            <h3>取得する情報と利用目的</h3>
            <p>
              本サイトでは、サイトの利用状況を把握し改善するため、アクセス解析ツールを使用する場合があります。これにより、閲覧したページ、利用環境（ブラウザやOSの種類）、アクセス日時などの情報が、Cookie等を通じて収集されることがあります。これらの情報は個人を特定するものではなく、サイト運営の改善目的でのみ使用します。
            </p>
            <h3>広告について</h3>
            <p>
              本サイトでは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。広告配信事業者は、利用者の興味に応じた広告を表示するため、Cookieを使用して本サイトや他のサイトへのアクセス情報に基づく広告を配信することがあります。Cookieを無効にする方法や、Googleによる広告Cookieの取り扱いについては、Googleの「ポリシーと規約」をご確認ください。パーソナライズ広告は、Googleの広告設定から無効にできます。
            </p>
            <h3>お問い合わせで取得する情報</h3>
            <p>
              メールでお問い合わせいただいた場合、返信のためにメールアドレスとお問い合わせ内容を使用します。これらを本人の同意なく第三者に提供することはありません。
            </p>
            <h3>免責事項</h3>
            <p>
              本サイトからリンクされた外部サイトにおける情報の取り扱いについては、当スタジオは責任を負いかねます。各サイトのプライバシーポリシーをご確認ください。
            </p>
            <h3>改定</h3>
            <p>
              本ポリシーは、必要に応じて改定することがあります。改定後の内容は本ページに掲載した時点で効力を生じます。
            </p>
            <p className={styles.notice}>制定日: 2026年11月25日／お問い合わせ: {siteConfig.supportEmail}</p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Choose a product" title="プライバシーポリシー一覧">
        <nav className={styles.policyList} aria-label="プロダクト別プライバシーポリシー">
          {legalProducts.map((product, index) => (
            <a href={`${product.href}privacy/`} key={product.slug} target="_blank" rel="noopener noreferrer">
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
