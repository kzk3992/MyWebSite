export type ProductCategory = "App" | "Game" | "Tool" | "Experiment";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  platform: string;
  tagline: string;
  description: string;
  href: string;
  appStoreUrl: string | null;
  screenshots: readonly string[];
};

export const siteConfig = {
  siteName: "Mika Spark Studio | Independent Apps & Games",
  brandName: "Mika Spark Studio",
  tagline: "Independent apps & games.",
  description:
    "Mika Spark Studioは、個人でアプリやゲームを企画・開発・公開するインディーデベロップメントスタジオです。",
  baseUrl: "https://mikaspark.com",
  supportEmail: "support@mikaspark.com",
  copyrightYear: 2026,
  products: [
    {
      slug: "hirame",
      name: "Hirame",
      category: "App",
      platform: "iOS",
      tagline: "制約が、ひらめきを生む。",
      description:
        "制約下で考えることで、発想力を鍛えるアイデアトレーニングアプリ。",
      href: "/apps/hirame/",
      appStoreUrl: null,
      screenshots: [],
    },
  ] satisfies readonly Product[],
} as const;

export const hirame = siteConfig.products[0];

export const legalOperator = {
  name: siteConfig.brandName,
  responsiblePerson: "Miyashita Kazuki",
  email: siteConfig.supportEmail,
} as const;

export const legalDates = {
  established: "2026年9月1日",
  updated: "2026年9月2日",
} as const;
