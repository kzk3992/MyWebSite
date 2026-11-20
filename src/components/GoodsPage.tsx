import Image from "next/image";
import { lineStickersStoreUrl } from "@/config/site";
import type { Locale } from "@/i18n/site";
import { Container } from "./Container";
import { Section } from "./Section";
import styles from "./GoodsPage.module.css";

// ウズメちゃん LINE スタンプ全16種（ファイル名と、スタンプに書かれた言葉）
const stickers = [
  ["01_ohayou", "おはよう", "Good morning"],
  ["02_arigatou", "ありがとう", "Thank you"],
  ["03_otsukaresama", "おつかれさま", "Good work today"],
  ["04_ryoukai", "りょうかい！", "Got it!"],
  ["05_gomenne", "ごめんね", "Sorry"],
  ["06_yatta", "やったー！", "Yay!"],
  ["07_eh", "えっ!?", "Huh!?"],
  ["08_oyasumi", "おやすみ", "Good night"],
  ["09_sugoi", "すごい！", "Amazing!"],
  ["10_ganbaru", "がんばる！", "I'll do my best!"],
  ["11_onegai", "おねがい", "Please"],
  ["12_matte", "まってー", "Wait for me!"],
  ["13_renshuu", "練習する！", "Time to practice!"],
  ["14_renshuushinasai", "練習しなさい！", "Go practice!"],
  ["15_otohazushita", "音はずした…", "Missed a note…"],
  ["16_ato1kai", "あと1回！", "One more time!"],
] as const;

const text = {
  ja: {
    eyebrow: "Goods / Mika Spark Studio",
    title: "Goods",
    lead: "Mika Spark Studio の作品から生まれたグッズです。",
    sideLabel: "グッズ情報",
    items: "Items",
    store: "Store",
    productEyebrow: "LINE STICKERS",
    productTitle: "ウズメちゃん LINEスタンプ",
    productLead: "音楽練習アプリ「Uzmera」の案内役、篠笛を吹くウズメちゃんのドット絵スタンプ。毎日のあいさつから、練習中のひとことまで。",
    specs: [["種類", "全16種"], ["価格", "¥120"], ["販売", "LINE STORE"]],
    cta: "LINE STOREで見る",
    galleryTitle: "全16種",
    galleryLead: "スタンプはすべて LINE STORE で購入できます。",
  },
  en: {
    eyebrow: "Goods / Mika Spark Studio",
    title: "Goods",
    lead: "Goods born from Mika Spark Studio's works.",
    sideLabel: "Goods information",
    items: "Items",
    store: "Store",
    productEyebrow: "LINE STICKERS",
    productTitle: "Uzume-chan LINE Stickers",
    productLead: "Pixel-art stickers of Uzume-chan, the shinobue-playing guide of the music practice app Uzmera. From daily greetings to a quick word mid-practice.",
    specs: [["Stickers", "16"], ["Price", "¥120"], ["Sold on", "LINE STORE"]],
    cta: "View in LINE STORE",
    galleryTitle: "All 16 stickers",
    galleryLead: "All stickers are available on the LINE STORE.",
  },
} as const;

export function GoodsPage({ locale }: { locale: Locale }) {
  const t = text[locale];
  const ja = locale === "ja";
  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className={styles.lead}>{t.lead}</p>
          </div>
          <aside className={styles.side} aria-label={t.sideLabel}>
            <dl>
              <div><dt>{t.items}</dt><dd>1</dd></div>
              <div><dt>{t.store}</dt><dd>LINE STORE</dd></div>
            </dl>
          </aside>
        </Container>
      </section>

      <Section>
        <article className={styles.product}>
          <div className={styles.productVisual}>
            <Image src="/brand/line-stickers/14_renshuushinasai.svg" width={370} height={320} alt={ja ? "練習しなさい！と篠笛を構えるウズメちゃんのスタンプ" : "Uzume-chan pointing her flute: “Go practice!”"} priority />
          </div>
          <div className={styles.productBody}>
            <p className="eyebrow">{t.productEyebrow}</p>
            <h2 className={styles.productTitle}>{t.productTitle}</h2>
            <p className={styles.productLead}>{t.productLead}</p>
            <dl className={styles.specs}>
              {t.specs.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
            <a className={styles.cta} href={lineStickersStoreUrl} target="_blank" rel="noopener noreferrer">
              {t.cta}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </Section>

      <Section tone="muted" eyebrow="Uzume-chan" title={t.galleryTitle} intro={t.galleryLead}>
        <ul className={styles.gallery}>
          {stickers.map(([file, jaLabel, enLabel], index) => {
            const label = ja ? jaLabel : enLabel;
            return (
              <li key={file}>
                <figure>
                  <span className={styles.stickerImage}>
                    <Image src={`/brand/line-stickers/${file}.svg`} width={370} height={320} alt={ja ? `ウズメちゃんスタンプ「${jaLabel}」` : `Uzume-chan sticker: “${enLabel}”`} />
                  </span>
                  <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{label}</figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
