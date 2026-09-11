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
      platform: "iPhone / iPad",
      tagline: "制約が、ひらめきを生む。",
      description:
        "言葉の組み合わせや連想などの制約から、発想する力を日常的に鍛えるアイデアトレーニングアプリ。",
      href: "/apps/hirame/",
      appStoreUrl: "https://apps.apple.com/jp/app/hirame/id6808982302",
      screenshots: [
        "/brand/hirame/screens/01-concept.png",
        "/brand/hirame/screens/02-note.png",
        "/brand/hirame/screens/03-with-ai.png",
        "/brand/hirame/screens/04-random-fusion.png",
        "/brand/hirame/screens/05-library.png",
        "/brand/hirame/screens/06-association.png",
      ],
    },
  ] satisfies readonly Product[],
} as const;

export const hirame = siteConfig.products[0];

export const hirameEnglish: Product = {
  ...hirame,
  name: "Hirame: Idea Trainer",
  href: "/en/apps/hirame/",
  tagline: "Turn constraints into ideas.",
  description:
    "An idea-training app that uses word combinations, associations, and other constraints to help you practice creative thinking.",
  screenshots: [
    "/brand/hirame/screens/en/01-concept.png",
    "/brand/hirame/screens/en/02-note.png",
    "/brand/hirame/screens/en/03-with-ai.png",
    "/brand/hirame/screens/en/04-random-fusion.png",
    "/brand/hirame/screens/en/05-library.png",
    "/brand/hirame/screens/en/06-bridge.png",
  ],
};

export const legalOperator = {
  name: siteConfig.brandName,
  responsiblePerson: "Miyashita Kazuki",
  email: siteConfig.supportEmail,
} as const;

export const legalDates = {
  established: "2026年9月1日",
  updated: "2026年9月10日",
  establishedEnglish: "September 1, 2026",
  updatedEnglish: "September 10, 2026",
} as const;
