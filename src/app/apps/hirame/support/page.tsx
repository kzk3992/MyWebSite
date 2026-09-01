import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import styles from "../../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame Support",
  description: "iOSアプリHirameのよくある質問、不具合、データ、プライバシー、お問い合わせについてご案内します。",
  alternates: { canonical: "/apps/hirame/support/" },
  openGraph: {
    title: "Hirame Support | Mika Spark Studio",
    description: "iOSアプリHirameのサポート情報です。",
    url: "/apps/hirame/support/",
  },
};

const faqs = [
  {
    question: "アカウント登録は必要ですか？",
    answer: "現在のHirameでは、アカウント登録は必要ありません。",
  },
  {
    question: "データはどこに保存されますか？",
    answer: "現在、アイデアノートやトレーニング履歴等のデータは端末内に保存され、運営者のサーバーへ送信されません。将来iCloud同期を導入する場合は、アプリ内およびプライバシーポリシーでご案内します。",
  },
  {
    question: "アプリを削除するとデータはどうなりますか？",
    answer: "アプリを端末から削除すると、通常、端末内に保存されたHirameのデータも削除されます。OSのバックアップに残る場合は、Appleまたは端末の設定に従います。大切な内容は削除前に必要に応じて控えてください。",
  },
  {
    question: "機種変更時にデータを移行できますか？",
    answer: "現在、Hirame独自のデータ移行・クラウド同期機能は提供していません。端末全体の移行やバックアップによる復元可否は、iOSの仕様や設定により異なります。",
  },
];

export default function HirameSupportPage() {
  const subject = encodeURIComponent("Hirame サポートへの問い合わせ");

  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">Hirame / Help center</p>
            <h1>Hirame Support</h1>
            <p className={styles.pageHeroLead}>
              よくある質問、データの取扱い、不具合の連絡方法をご案内します。
            </p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="関連情報">
            <dl>
              <div><dt>Platform</dt><dd>iOS</dd></div>
              <div><dt>Account</dt><dd>不要</dd></div>
              <div><dt>Storage</dt><dd>端末内</dd></div>
            </dl>
          </aside>
        </Container>
      </section>

      <Section eyebrow="FAQ" title="よくある質問">
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <article className={styles.faqItem} key={faq.question}>
              <p className={styles.faqQuestion}><span>Q.</span>{faq.question}</p>
              <p className={styles.faqAnswer}><span>A.</span>{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Troubleshooting"
        title="不具合について"
        intro="問題が発生した場合は、アプリとiOSを最新の状態にし、端末の再起動をお試しください。改善しない場合は、下記の情報を添えてご連絡ください。"
      >
        <div className={styles.contactBox}>
          <p>
            端末の機種、iOSのバージョン、Hirameのバージョン、発生した操作、表示された内容をお知らせいただけると、確認がスムーズです。アイデアノートの本文など、不要な個人情報は送らないでください。
          </p>
          <Button href={`mailto:${siteConfig.supportEmail}?subject=${subject}`}>
            メールで問い合わせる
          </Button>
          <p className={styles.notice}>宛先: {siteConfig.supportEmail}。返信までお時間をいただく場合があります。</p>
        </div>
      </Section>

      <Section eyebrow="Data & privacy" title="データとプライバシー">
        <nav className={styles.legalLinks} aria-label="Hirame データとプライバシー">
          <a href="/apps/hirame/privacy/">Privacy Policy</a>
          <a href="/apps/hirame/terms/">Terms of Use</a>
          <a href="/apps/hirame/">Hirame Overview</a>
        </nav>
      </Section>
    </>
  );
}
