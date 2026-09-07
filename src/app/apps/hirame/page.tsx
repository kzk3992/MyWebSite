import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { hirame } from "@/config/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame",
  description: "制約下で考えることを繰り返し、発想力そのものを鍛えるiOS向けアイデアトレーニングアプリ。",
  alternates: { canonical: "/apps/hirame/" },
  openGraph: {
    title: "Hirame | Mika Spark Studio",
    description: "制約が、ひらめきを生む。自分で考えることを通じて発想力を鍛えるiOSアプリ。",
    url: "/apps/hirame/",
  },
};

const features = [
  {
    title: "Idea Note",
    description: "制約の中で考えたアイデアを、文章・画像・手書きと一緒に記録。",
  },
  {
    title: "強制発想法",
    description: "ランダムな言葉やテーマという条件を使い、普段とは異なる視点を引き出すトレーニング。",
  },
  {
    title: "連想ゲーム",
    description: "離れた概念同士を連想でつなぎ、ゴールまでの経路を考えるゲーム。",
  },
  {
    title: "継続記録",
    description: "日々のトレーニング履歴を振り返り、考える反復を積み重ねる。",
  },
];

const screenshots = [
  { src: "/brand/hirame/screens/01-concept.png", label: "CONCEPT", alt: "制約がひらめきを生むというコンセプトとHirameのホーム画面" },
  { src: "/brand/hirame/screens/02-note.png", label: "IDEA NOTE", alt: "ひらめきをそのまま残すアイデアノート画面" },
  { src: "/brand/hirame/screens/03-with-ai.png", label: "WITH AI", alt: "Apple Intelligenceを使った発想支援とレビュー画面" },
  { src: "/brand/hirame/screens/04-random-fusion.png", label: "RANDOM FUSION", alt: "組み合わせから発想する発想法の選択画面" },
  { src: "/brand/hirame/screens/05-library.png", label: "LIBRARY", alt: "蓄積したアイデアを検索できるライブラリ画面" },
  { src: "/brand/hirame/screens/06-association.png", label: "ASSOCIATION", alt: "言葉をつないで考える連想ゲーム画面" },
] as const;

export default function HiramePage() {
  return (
    <>
      <section className={styles.hirameHero} aria-labelledby="hirame-title">
        <Container className={styles.hirameHeroInner}>
          <div className={styles.hirameCopy}>
            <p className="eyebrow">Idea training / iOS</p>
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
              <span className={styles.platformNote}>Designed for iPhone · 公開準備中</span>
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
        intro="Hirameは、ランダムな組み合わせ、離れた概念の接続、限られた条件や時間をあえて設け、自分で考えることを繰り返す発想トレーニングアプリです。AIに答えを考えてもらうのではなく、自分で考える。ひらめきを待つのではなく、ひらめきを起こすために、考えるアプリです。"
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
