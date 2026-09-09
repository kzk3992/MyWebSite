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
  return (
    <article className={styles.productCard}>
      <p className={styles.productIndex}>{String(index).padStart(2, "0")}</p>
      <div className={styles.productContent}>
        <div className={styles.productMeta}>
          <span>{product.category}</span>
          <span>{product.platform}</span>
        </div>
        <h3>{product.name}</h3>
        <p className={styles.productTagline}>{product.tagline}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <Button href={product.href}>{locale === "ja" ? "詳しく見る" : "View product"}</Button>
      </div>
      <div className={styles.productVisual}>
        <Image className={styles.productScreenshot} src={locale === "ja" ? "/brand/hirame/screens/01-concept.png" : "/brand/hirame/screens/en/01-concept.png"} width={1284} height={2778} alt={locale === "ja" ? "Hirameのコンセプトとホーム画面" : "Hirame's concept and Home screen"} />
        <Image className={styles.productMascot} src="/brand/hirame/mascot.png" width={170} height={170} alt="" aria-hidden="true" />
      </div>
    </article>
  );
}
