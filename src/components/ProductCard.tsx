import type { Product } from "@/config/site";
import type { Locale } from "@/i18n/site";
import Image from "next/image";
import { Button } from "./Button";
import styles from "./components.module.css";

type ProductCardProps = {
  product: Product;
  index?: number;
  locale?: Locale;
};

export function ProductCard({ product, index = 1, locale = "ja" }: ProductCardProps) {
  const isUzmera = product.slug === "uzmera";
  const isLineStickers = product.slug === "line-stickers";
  const buttonLabel = isLineStickers && !product.href
    ? (locale === "ja" ? "近日公開" : "Coming soon")
    : (locale === "ja" ? "詳しく見る" : "View product");
  return (
    <article className={styles.productCard}>
      <p className={styles.productIndex}>{String(index).padStart(2, "0")}</p>
      <div className={styles.productContent}>
        <div className={styles.productMeta}><span>{product.category}</span><span>{product.platform}</span></div>
        <h3>{product.name}</h3>
        <p className={styles.productTagline}>{product.tagline}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <Button href={product.href || undefined} external={!product.internal}>{buttonLabel}</Button>
      </div>
      {isUzmera ? (
        <a className={`${styles.productVisual} ${styles.uzmeraVisual}`} href={product.href} target="_blank" rel="noopener noreferrer" aria-label="Uzmera website を開く">
          <Image className={styles.uzmeraAppIcon} src="/brand/uzmera/app-icon.png" width={1024} height={1024} alt="Uzmera アプリアイコン" />
          <span className={styles.uzmeraWordmark}>UZMERA<span>音楽練習を、もっと自由に。</span></span>
          <Image className={styles.uzmeraMascot} src="/brand/uzmera/kemari_girl_idle.png" width={64} height={96} alt="" aria-hidden="true" />
          <span className={styles.uzmeraPixelBall} aria-hidden="true">◆</span>
        </a>
      ) : isLineStickers ? (
        <div className={`${styles.productVisual} ${styles.lineStickersVisual}`}>
          <span className={styles.lineStickersWordmark}>UZUME-CHAN<span>{locale === "ja" ? "ドット絵LINEスタンプ" : "PIXEL LINE STICKERS"}</span></span>
          <Image className={styles.lineStickersMascot} src="/brand/uzmera/kemari_girl_idle.png" width={64} height={96} alt="" aria-hidden="true" />
          <span className={styles.lineStickersPhrases} aria-hidden="true">
            {(locale === "ja" ? ["おはよう", "ありがとう", "練習する！", "練習しなさい！", "あと1回！"] : ["Hello", "Thank you", "I'll practice!", "Practice!", "One more time!"]).map((phrase) => (
              <span key={phrase}>{phrase}</span>
            ))}
          </span>
        </div>
      ) : (
        <div className={styles.productVisual}>
          <Image className={styles.productScreenshot} src={locale === "ja" ? "/brand/hirame/screens/01-concept.png" : "/brand/hirame/screens/en/01-concept.png"} width={1284} height={2778} alt={locale === "ja" ? "Hirameのコンセプトとホーム画面" : "Hirame's concept and Home screen"} />
          <Image className={styles.productMascot} src="/brand/hirame/mascot.png" width={170} height={170} alt="" aria-hidden="true" />
        </div>
      )}
    </article>
  );
}
