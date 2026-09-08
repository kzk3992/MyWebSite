import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/i18n/site";
import styles from "../../../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame Support",
  description: "iPhone・iPadアプリHirameのよくある質問、不具合、データ、プライバシー、お問い合わせについてご案内します。",
  alternates: localizedAlternates("/apps/hirame/support/", "/en/apps/hirame/support/"),
  openGraph: {
    title: "Hirame Support | Mika Spark Studio",
    description: "iPhone・iPadアプリHirameのサポート情報です。",
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
    answer: "アイデアノート、画像・手書き、発想トレーニングの履歴等は端末内に保存されます。iCloudが利用できる環境では、CloudKitのプライベートデータベースを通じて同じApple Accountの端末間で同期されます。運営者独自のサーバーへノート内容を送信する機能はありません。",
  },
  {
    question: "iCloud同期を使わずに利用できますか？",
    answer: "iCloudにサインインしていない場合やCloudKitを利用できない場合も、端末内保存に切り替えて利用できます。Hirame内に同期専用のオン／オフ設定はありません。iCloudの利用設定は端末の「設定」で管理してください。",
  },
  {
    question: "アプリを削除するとデータはどうなりますか？",
    answer: "アプリを端末から削除すると、端末内のデータは通常削除されます。iCloudへ同期済みのデータはiCloud側に残り、再インストール後に同じApple Accountで同期される場合があります。アプリ内のデータ削除機能を使うと、同期中は削除もiCloudへ反映されます。",
  },
  {
    question: "機種変更時にデータを移行できますか？",
    answer: "同じApple AccountでiCloudを有効にしている場合、データが同期されることがあります。端末全体の移行やバックアップによる復元可否は、iOSおよびiCloudの状態により異なります。",
  },
  {
    question: "AI機能はどのように動作しますか？",
    answer: "対応端末では、AppleのFoundation Models frameworkと端末上のApple Intelligenceモデルを使い、発想の展開、レビュー、問い、次の一歩、BRIDGEのヒントや振り返りを生成します。処理対象は入力したノートの文章、選択範囲、画像・手書きから抽出した文字、ゲームの進行情報等です。画像・手書きのバイナリデータ自体は言語モデルへ渡しません。運営者独自のAIサーバーや外部LLM APIは使用していません。",
  },
  {
    question: "購入状態はどのように管理されますか？",
    answer: "Ad-Freeは買い切り型のアプリ内課金です。購入と復元はAppleのStoreKitで処理され、アプリはAppleが確認した購入権利を参照します。確認済みの状態は端末内にも一時保存されます。価格は購入画面でご確認ください。",
  },
  {
    question: "広告は表示されますか？",
    answer: "無料版では、文章量の上限拡張や画像・手書きの追加を一時的に解放するとき、選択に応じてリワード広告が表示されます。Ad-Freeを購入すると広告は表示されません。",
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
              <div><dt>Platform</dt><dd>iPhone / iPad</dd></div>
              <div><dt>Account</dt><dd>不要</dd></div>
              <div><dt>Storage</dt><dd>端末内 / iCloud</dd></div>
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
