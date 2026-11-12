import Image from "next/image";
import { lineStickerItems, lineStickersStoreUrl, lineStickersThumbnail } from "@/config/site";
import type { Locale } from "@/i18n/site";
import { Button } from "./Button";
import { Section } from "./Section";
import styles from "./components.module.css";

export function GoodsSection({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  return (
    <Section
      id="goods"
      eyebrow="03 / GOODS"
      title={ja ? "ウズメちゃん、LINEスタンプになりました。" : "Uzume-chan is now a LINE sticker set."}
      intro={ja
        ? "Uzmeraの案内役・ウズメちゃんがドット絵スタンプに。毎日の連絡にも、音楽の練習の連絡にもどうぞ。"
        : "Uzume-chan, the guide of Uzmera, is now a pixel-art sticker set — for everyday chats and music practice talk."}
    >
      <div className={styles.goodsLayout}>
        <figure className={styles.goodsThumb}>
          <Image
            src={lineStickersThumbnail.src}
            width={370}
            height={320}
            alt={ja ? "ウズメちゃんスタンプ「練習しなさい！」" : "Uzume-chan sticker: Practice!"}
          />
          <span className={styles.goodsThumbBadge}>¥120 / 16{ja ? "種" : " stickers"}</span>
          <figcaption>{ja ? "イチオシは、笛をビシッと突きつける「練習しなさい！」" : "Our pick: “Practice!” — flute pointed right at you."}</figcaption>
        </figure>
        <div className={styles.goodsCopy}>
          <p>
            {ja
              ? "篠笛を吹く着物の女の子「ウズメちゃん」のドット絵スタンプです。あいさつ・感謝・おつかれさまといった毎日の連絡に使えるものから、「練習する！」「音はずした…」「あと1回！」まで、音楽の練習あるあるを揃えました。"
              : "Pixel-art stickers of Uzume-chan, a kimono girl who plays the shinobue flute. Everyday greetings and thanks, plus music-practice moments like “I'll practice!”, “Missed that note...” and “One more time!”."}
          </p>
          <ul className={styles.goodsPoints}>
            <li>{ja ? "全16種" : "16 stickers"}</li>
            <li>{ja ? "日常のあいさつ＋音楽ネタ" : "Everyday greetings + music talk"}</li>
            <li>{ja ? "吹奏楽・和楽器・音楽教室の連絡に" : "For band, lessons and practice chats"}</li>
          </ul>
          <Button href={lineStickersStoreUrl || undefined} external>
            {lineStickersStoreUrl
              ? (ja ? "LINEスタンプショップで見る" : "View in the LINE Sticker Shop")
              : (ja ? "近日公開（審査中）" : "Coming soon (in review)")}
          </Button>
        </div>
      </div>
      <div className={styles.goodsCarousel} role="list" aria-label={ja ? "スタンプ一覧" : "Sticker lineup"}>
        {lineStickerItems.map((item) => (
          <figure key={item.src} className={styles.goodsSlide} role="listitem">
            <Image src={item.src} width={370} height={320} alt={`${ja ? "ウズメちゃんスタンプ" : "Uzume-chan sticker"}: ${ja ? item.ja : item.en}`} />
            <figcaption>{ja ? item.ja : item.en}</figcaption>
          </figure>
        ))}
      </div>
      <p className={styles.goodsHint}>{ja ? "← 横にスクロールで全16種 →" : "← Scroll to see all 16 →"}</p>
    </Section>
  );
}
