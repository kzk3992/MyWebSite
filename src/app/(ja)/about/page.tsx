import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/i18n/site";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "個人開発ブランドMika Spark Studioについて。アプリ、ゲーム、ツール、実験的なプロダクトを制作しています。",
  alternates: localizedAlternates("/about/", "/en/about/"),
  openGraph: {
    title: "About | Mika Spark Studio",
    description: "Mika Spark Studioは、個人でアプリ・ゲームを開発・公開するインディーデベロップメントスタジオです。",
    url: "/about/",
  },
};

const directions = ["Apps", "Games", "Tools", "Experiments"];

const worksList = [
  { number: "01", name: "Uzmera", note: "音と動きで、練習を楽しく。（公開準備中）", href: "/works/uzmera/" },
  { number: "02", name: "Hirame", note: "制約が、ひらめきを生む。（公開中）", href: "/works/hirame/" },
  { number: "03", name: "まほうのある暮らし", note: "魔法使いの一生を、静かに生きる。（公開中）", href: "/works/mahou/" },
  { number: "04", name: "ウズメちゃん LINEスタンプ", note: "ピクセルアートのLINEスタンプ（販売中）", href: "/works/uzume-stamps/" },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <Container className={styles.pageHeroInner}>
          <div>
            <p className="eyebrow">About / Mika Spark Studio</p>
            <h1>Small studio.<br />Bright ideas.</h1>
            <p className={styles.pageHeroLead}>
              Mika Spark Studioは、個人でアプリ・ゲームを開発・公開するインディーデベロップメントスタジオです。
            </p>
          </div>
          <aside className={styles.pageHeroSide} aria-label="スタジオ情報">
            <dl>
              <div><dt>Type</dt><dd>Independent</dd></div>
              <div><dt>Focus</dt><dd>Apps & Games</dd></div>
              <div><dt>Based</dt><dd>Japan</dd></div>
            </dl>
          </aside>
        </Container>
      </section>

      <Section>
        <div className={styles.proseGrid}>
          <p className={styles.proseAside}>What we make</p>
          <div className={styles.proseBody}>
            <h2>好奇心を、動くかたちに。</h2>
            <p>
              Mika Spark Studioは、長野県を拠点とする個人開発スタジオです。iOSアプリとゲームを企画・実装・公開・運営まで一人で手がけています。代表作は、音楽練習アプリ「Uzmera」（公開準備中）、アイデアトレーニングアプリ「Hirame」（公開中）、ブラウザゲーム「まほうのある暮らし」（公開中）です。
            </p>
            <p>
              新しいアイデア、便利な仕組み、遊び心のある体験を、ひとつずつ丁寧に形にして公開していきます。規模を追うよりも、使う人の日常に小さな変化を生むプロダクトを目指しています。
            </p>
            <div className={styles.directionGrid}>
              {directions.map((direction, index) => (
                <article className={styles.directionItem} key={direction}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{direction}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Works" title="作っているもの">
        <nav className={styles.policyList} aria-label="作品詳細">
          {worksList.map((work) => (
            <a href={work.href} key={work.href}>
              <span className={styles.policyNumber}>{work.number}</span>
              <span><b>{work.name}</b><small>{work.note}</small></span>
              <span className={styles.policyArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </Section>

      <Section eyebrow="Operator" title="運営者">
        <div className={styles.proseGrid}>
          <p className={styles.proseAside}>Contact</p>
          <div className={styles.proseBody}>
            <p>屋号: Mika Spark Studio</p>
            <p>所在地: 長野県（詳細はお問い合わせ時にお知らせします）</p>
            <div className={styles.contactBox}>
              <p>アプリやゲームへのご意見・ご感想、不具合のご報告は下記メールアドレスまでお願いします。</p>
              <Button href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
