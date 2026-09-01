import type { Metadata } from "next";
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
    title: "BRIDGE",
    description: "離れた概念同士を連想でつなぐ思考トレーニング。",
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

export default function HiramePage() {
  return (
    <>
      <section className={styles.hirameHero} aria-labelledby="hirame-title">
        <Container className={styles.hirameHeroInner}>
          <p className="eyebrow">Idea training / iOS</p>
          <h1 id="hirame-title">{hirame.name}</h1>
          <p className={styles.hirameTagline}>{hirame.tagline}</p>
          <p className={styles.hirameDescription}>{hirame.description}</p>
          <div className={styles.heroActions}>
            <Button
              href={hirame.appStoreUrl ?? undefined}
              external={Boolean(hirame.appStoreUrl)}
              disabled={!hirame.appStoreUrl}
            >
              {hirame.appStoreUrl ? "App Storeで見る" : "Coming Soon"}
            </Button>
            <span className={styles.platformNote}>Designed for iPhone · 公開準備中</span>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Core features / 04"
        title="ひらめくための、小さな習慣。"
        intro="考える、つなぐ、残す、振り返る。Hirameは発想の反復をシンプルに支えます。"
      >
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <article className={styles.featureCard} key={feature.title}>
              <p className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</p>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Preview"
        title="Screenshots"
        intro="アプリ画面は公開準備が整い次第、こちらで紹介します。"
      >
        {hirame.screenshots.length > 0 ? (
          <div aria-label="Hirameのスクリーンショット">
            {hirame.screenshots.map((screenshot) => (
              // eslint-disable-next-line @next/next/no-img-element -- Static export friendly and user-managed assets.
              <img key={screenshot} src={screenshot} alt="Hirame アプリ画面" />
            ))}
          </div>
        ) : (
          <div className={styles.screenshotPlaceholder}>
            <p>Screenshots coming soon</p>
          </div>
        )}
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
