import Image from "next/image";
import { goodsItems, type GoodsItem } from "@/config/site";
import type { Locale } from "@/i18n/site";
import { Section } from "./Section";
import styles from "./components.module.css";

function GoodsCard({ item, locale }: { item: GoodsItem; locale: Locale }) {
  const ja = locale === "ja";
  const label = ja ? item.ja : item.en;
  const content = (
    <>
      <span className={styles.goodsCardImage}>
        <Image src={item.image} width={370} height={320} alt={label} />
        {!item.href && <span className={styles.goodsCardBadge}>{ja ? "近日公開" : "Coming soon"}</span>}
      </span>
      <span className={styles.goodsCardText}>{label}</span>
    </>
  );
  if (item.href) {
    return (
      <a className={styles.goodsCard} href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <div className={styles.goodsCard}>{content}</div>;
}

export function GoodsSection({ locale }: { locale: Locale }) {
  return (
    <Section id="goods" eyebrow="03 / GOODS" title={locale === "ja" ? "グッズ" : "Goods"}>
      <ul className={styles.goodsGrid}>
        {goodsItems.map((item) => (
          <li key={item.id}>
            <GoodsCard item={item} locale={locale} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
