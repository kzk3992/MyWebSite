/**
 * AI・検索エンジン向けの構造化データ（JSON-LD）の正本。
 * 値はすべて実データのみ。評価・レビュー数などの推測値は入れない。
 * sameAs は siteConfig.socials（フッター表示）と一致させること。
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mika Spark Studio",
  url: "https://mikaspark.com/",
  email: "support@mikaspark.com",
  slogan: "小さなアイデアを、使えるプロダクトへ。",
  founder: { "@type": "Person", name: "MiKa" },
  address: { "@type": "PostalAddress", addressRegion: "Nagano", addressCountry: "JP" },
  sameAs: [
    "https://www.youtube.com/@FluteAndCo",
    "https://www.instagram.com/mika_spark_studio",
    "https://www.threads.com/@mika_spark_studio",
    "https://zenn.dev/mikartmis",
    "https://github.com/kzk3992",
  ],
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mika Spark Studio",
  url: "https://mikaspark.com/",
  publisher: { "@type": "Organization", name: "Mika Spark Studio", url: "https://mikaspark.com/" },
} as const;
