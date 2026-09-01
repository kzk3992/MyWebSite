import type { Product } from "@/config/site";
import { Button } from "./Button";
import styles from "./components.module.css";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 1 }: ProductCardProps) {
  return (
    <article className={styles.productCard}>
      <div className={styles.productVisual} aria-hidden="true">
        <span className={styles.productIndex}>{String(index).padStart(2, "0")}</span>
        <span className={styles.productGlyph}>H</span>
        <span className={styles.productOrbit} />
      </div>
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
    </article>
  );
}
