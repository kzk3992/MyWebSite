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

// 長い作品名を不自然な位置で折り返さないための区切り位置（表示文字列は変えない）。
const nameSegments: Record<string, readonly string[]> = {
  "まほうのある暮らし": ["まほうのある", "暮らし"],
};

function ProductName({ name }: { name: string }) {
  const segments = nameSegments[name];
  if (!segments) return <>{name}</>;
  return (
    <>
      {segments.map((segment, position) => (
        <span key={segment}>
          {position > 0 && <wbr />}
          {segment}
        </span>
      ))}
    </>
  );
}

export function ProductCard({ product, index = 1, locale = "ja" }: ProductCardProps) {
  const isJapanese = locale === "ja";
  const theme = product.slug === "uzmera" ? styles.themeUzmera : product.slug === "mahou" ? styles.themeMahou : styles.themeHirame;
  const nameSize = [...product.name].length > 7 ? styles.productNameLong : "";
  const linkProps = product.internal ? {} : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <article className={`${styles.productCard} ${theme}`} data-reveal>
      <p className={styles.productIndex}><span>{String(index).padStart(2, "0")}</span></p>
      <div className={styles.productContent}>
        <div className={styles.productMeta}><span>{product.category}</span><span>{product.platform}</span></div>
        <h3 className={nameSize}><ProductName name={product.name} /></h3>
        <p className={styles.productTagline}>{product.tagline}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <Button href={product.href} external={!product.internal}>{isJapanese ? "詳しく見る" : "View product"}</Button>
      </div>
      {product.slug === "uzmera" ? (
        <a className={`${styles.productVisual} ${styles.uzmeraVisual}`} href={product.href} {...linkProps} aria-label={isJapanese ? "Uzmera website を開く" : "Open the Uzmera website"}>
          <Image className={styles.uzmeraGarden} src="/brand/uzmera/kemari_garden.png" width={320} height={180} alt="" aria-hidden="true" />
          <Image className={styles.uzmeraAppIcon} src="/brand/uzmera/app-icon.png" width={1024} height={1024} sizes="140px" alt={isJapanese ? "Uzmera アプリアイコン" : "Uzmera app icon"} />
          <span className={styles.uzmeraWordmark}>UZMERA<span>音楽練習を、もっと自由に。</span></span>
          <Image className={styles.uzmeraMascot} src="/brand/uzmera/kemari_girl_idle.png" width={64} height={96} alt="" aria-hidden="true" />
          <Image className={styles.uzmeraBall} src="/brand/uzmera/kemari_ball.png" width={20} height={20} alt="" aria-hidden="true" />
        </a>
      ) : product.slug === "mahou" ? (
        <a className={`${styles.productVisual} ${styles.mahouVisual}`} href={product.href} {...linkProps} aria-label={isJapanese ? "まほうのある暮らし を開く" : "Open Mahou no Aru Kurashi"}>
          <span className={styles.mahouStars} aria-hidden="true" />
          <span className={styles.mahouLogo} aria-hidden="true">
            <span>まほう</span><span>のある</span><span>暮らし</span><i>✦</i><i>✧</i>
          </span>
          <span className={styles.mahouTag}>{isJapanese ? "魔法使いの人生シミュレーション" : "A wizard life simulation"}</span>
          <span className={styles.mahouScene} aria-hidden="true">
            <Image className={styles.mahouSkyline} src="/brand/mahou/skyline.svg" width={32} height={10} alt="" />
            <Image className={styles.mahouGhost} src="/brand/mahou/ghost.svg" width={16} height={18} alt="" />
            <Image className={styles.mahouElder} src="/brand/mahou/elder.svg" width={16} height={18} alt="" />
            <Image className={styles.mahouWizard} src="/brand/mahou/wizard.svg" width={16} height={18} alt="" />
            <Image className={styles.mahouBooks} src="/brand/mahou/books.svg" width={16} height={18} alt="" />
            <Image className={styles.mahouSlime} src="/brand/mahou/slime.svg" width={16} height={18} alt="" />
            <span className={styles.mahouGround} />
          </span>
        </a>
      ) : (
        <a className={`${styles.productVisual} ${styles.hirameVisual}`} href={product.href} {...linkProps} >
          <Image className={styles.productScreenshot} src={isJapanese ? "/brand/hirame/screens/01-concept.png" : "/brand/hirame/screens/en/01-concept.png"} width={1284} height={2778} sizes="(max-width: 840px) 64vw, 350px" alt={isJapanese ? "Hirameのコンセプトとホーム画面" : "Hirame's concept and Home screen"} />
          <Image className={styles.productMascot} src="/brand/hirame/mascot.png" width={170} height={170} alt="" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}
