import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { hirame } from "@/config/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Hirame",
  description: "ひらめきを習慣に。発想力をゲーム感覚で鍛えるiOS向けアイデアトレーニングアプリ。",
  alternates: { canonical: "/apps/hirame/" },
  openGraph: {
    title: "Hirame | Mika Spark Studio",
    description: "ひらめきを習慣に。発想力をゲーム感覚で鍛えるアイデアトレーニングアプリ。",
    url: "/apps/hirame/",
  },
};

const features = [
  {
    title: "発想トレーニング",
    description: "ランダムな言葉やテーマから、新しいアイデアを考えるトレーニング。",
  },
  {
    title: "連想ゲーム",
    description: "離れた概念同士を連想でつなぎ、ゴールまでの経路を考えるゲーム。",
  },
  {
    title: "Idea Note",
    description: "思いついたアイデアをその場で記録。",
  },
  {
    title: "継続記録",
    description: "日々のトレーニング履歴を確認。",
  },
];

const screenshots = [
  { src: "/brand/hirame/screens/home.jpg", label: "HOME", alt: "Hirameのホーム画面" },
  { src: "/brand/hirame/screens/association.jpg", label: "ASSOCIATION", alt: "連想ゲームの難易度選択画面" },
  { src: "/brand/hirame/screens/association-game.jpg", label: "PLAY", alt: "連想ゲームのプレイ画面" },
  { src: "/brand/hirame/screens/association-clear.jpg", label: "CLEAR", alt: "連想ゲームのクリア画面" },
  { src: "/brand/hirame/screens/methods.jpg", label: "METHODS", alt: "発想法の選択画面" },
  { src: "/brand/hirame/screens/random.jpg", label: "RANDOM FUSION", alt: "Random Fusionの生成画面" },
  { src: "/brand/hirame/screens/random-note.jpg", label: "PROMPT NOTE", alt: "発想ワードから作るアイデアノート画面" },
  { src: "/brand/hirame/screens/note.jpg", label: "IDEA NOTE", alt: "手書き添付を含むアイデアノート画面" },
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
            <Image className={styles.hirameScreen} src="/brand/hirame/screens/home.jpg" width={738} height={1600} alt="Hirameのホーム画面。連想ゲーム、発想法、アイデアノートへ移動できます。" priority />
            <Image className={styles.hirameMascot} src="/brand/hirame/mascot.png" width={210} height={210} alt="" aria-hidden="true" />
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Core features / 04"
        title="ひらめくための、小さな習慣。"
        intro="考える、つなぐ、残す、振り返る。Hirameは発想の反復をシンプルに支えます。"
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
        intro="開発中の実際の画面です。連想ゲーム、発想法、アイデアノートの流れをご覧いただけます。"
      >
        <div className={styles.screenshotGallery} aria-label="Hirame アプリ画面">
          {screenshots.map((screenshot, index) => (
            <figure className={styles.screenshotExhibit} key={screenshot.src}>
              <Image src={screenshot.src} width={738} height={1600} alt={screenshot.alt} />
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
