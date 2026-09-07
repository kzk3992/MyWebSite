import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { hirame } from "@/config/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame",
  description: "言葉の組み合わせや連想などの制約から、発想する力を鍛えるiPhone・iPad向けアイデアトレーニングアプリ。",
  alternates: { canonical: "/apps/hirame/" },
  openGraph: {
    title: "Hirame | Mika Spark Studio",
    description: "制約が、ひらめきを生む。自分で考えることを通じて発想力を鍛えるiPhone・iPadアプリ。",
    url: "/apps/hirame/",
  },
};

const features = [
  {
    title: "Idea Note",
    description: "思いつきを文章で整理し、画像や手書きも添えて記録。ライブラリ検索やお気に入り、カレンダーから振り返れます。",
  },
  {
    title: "Random Fusion",
    description: "Random Fusion、SCAMPER、逆転発想、制約発想、類推発想。5つの発想法で普段とは異なる視点を引き出します。",
  },
  {
    title: "BRIDGE",
    description: "離れた概念を言葉の連想でつなぎ、ゴールまでの思考経路を組み立てる。",
  },
  {
    title: "AI Assist",
    description: "対応端末のApple Intelligenceと一緒に、視点を広げ、レビューや問い、次の一歩を考える。",
  },
];

const screenshots = [
  { src: "/brand/hirame/screens/01-concept.png", label: "CONCEPT", alt: "制約がひらめきを生むというコンセプトとHirameのホーム画面" },
  { src: "/brand/hirame/screens/02-note.png", label: "IDEA NOTE", alt: "ひらめきをそのまま残すアイデアノート画面" },
  { src: "/brand/hirame/screens/03-with-ai.png", label: "WITH AI", alt: "Apple Intelligenceを使った発想支援とレビュー画面" },
  { src: "/brand/hirame/screens/04-random-fusion.png", label: "RANDOM FUSION", alt: "組み合わせから発想する発想法の選択画面" },
  { src: "/brand/hirame/screens/05-library.png", label: "LIBRARY", alt: "蓄積したアイデアを検索できるライブラリ画面" },
  { src: "/brand/hirame/screens/06-association.png", label: "BRIDGE", alt: "言葉をつないで考えるBRIDGE（連想ゲーム）画面" },
] as const;

export default function HiramePage() {
  return (
    <>
      <section className={styles.hirameHero} aria-labelledby="hirame-title">
        <Container className={styles.hirameHeroInner}>
          <div className={styles.hirameCopy}>
            <p className="eyebrow">Idea training / iPhone + iPad</p>
            <div className={styles.hirameTitleRow}>
              <Image src="/brand/hirame/app-icon.jpg" width={72} height={72} alt="Hirame アプリアイコン" />
              <h1 id="hirame-title">{hirame.name}</h1>
            </div>
            <p className={styles.hirameTagline}>{hirame.tagline}</p>
            <p className={styles.hirameDescription}>{hirame.description}</p>
            <div className={styles.heroActions}>
              <Button href={hirame.appStoreUrl ?? undefined} external={Boolean(hirame.appStoreUrl)} disabled={!hirame.appStoreUrl}>
                {hirame.appStoreUrl ? "App Storeで見る" : "Coming Soon"}
              </Button>
              <span className={styles.platformNote}>Designed for iPhone &amp; iPad · 公開準備中</span>
            </div>
          </div>
          <div className={styles.hiramePreview}>
            <Image className={styles.hirameScreen} src="/brand/hirame/screens/01-concept.png" width={1284} height={2778} alt="制約がひらめきを生むというコンセプトとHirameのホーム画面" priority />
            <Image className={styles.hirameMascot} src="/brand/hirame/mascot.png" width={210} height={210} alt="" aria-hidden="true" />
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Core features / 04"
        title="制約を、思考のきっかけに。"
        intro="Hirameは、言葉の組み合わせ、テーマ、連想といった適度な制約の中で考えることを繰り返し、発想する力を日常的に鍛えるアプリです。アイデアを自分で生み出す体験を中心に、必要なときはApple Intelligenceが視点、問い、レビュー、次の一歩を補助します。"
      >
        <div className={styles.featureTimeline}>
          {features.map((feature, index) => (
            <article className={styles.featureItem} key={feature.title}>
              <p className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</p>
              <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Preview"
        title="Screenshots"
        intro="Hirameのコンセプトと主な機能を、実際の画面とともにご覧いただけます。"
      >
        <div className={styles.screenshotGallery} aria-label="Hirame アプリ画面">
          {screenshots.map((screenshot, index) => (
            <figure className={styles.screenshotExhibit} key={screenshot.src}>
              <Image src={screenshot.src} width={1284} height={2778} alt={screenshot.alt} />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{screenshot.label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section eyebrow="Information" title="Legal & support">
        <nav className={styles.legalLinks} aria-label="Hirame 法務・サポート">
          <a href="/apps/hirame/privacy/">Privacy Policy</a>
          <a href="/apps/hirame/terms/">Terms of Use</a>
          <a href="/apps/hirame/support/">Support</a>
        </nav>
      </Section>
    </>
  );
}
