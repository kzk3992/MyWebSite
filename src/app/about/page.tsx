import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "個人開発ブランドMika Spark Studioについて。アプリ、ゲーム、ツール、実験的なプロダクトを制作しています。",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About | Mika Spark Studio",
    description: "Mika Spark Studioは、個人でアプリ・ゲームを開発・公開するインディーデベロップメントスタジオです。",
    url: "/about/",
  },
};

const directions = ["Apps", "Games", "Tools", "Experiments"];

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
    </>
  );
}
