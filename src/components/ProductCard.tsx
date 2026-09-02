import type { Product } from "@/config/site";
import Image from "next/image";
import { Button } from "./Button";
import styles from "./components.module.css";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 1 }: ProductCardProps) {
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
        <Button href={product.href}>詳しく見る</Button>
      </div>
      <div className={styles.productVisual}>
        <Image className={styles.productScreenshot} src="/brand/hirame/home.jpg" width={360} height={780} alt="Hirame ホーム画面" />
        <Image className={styles.productMascot} src="/brand/hirame/mascot.png" width={170} height={170} alt="" aria-hidden="true" />
      </div>
    </article>
  );
}
