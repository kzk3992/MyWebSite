export type ProductCategory = "App" | "Game" | "Tool" | "Experiment" | "Sticker";

export type Product = {
  slug: string;
  internal: boolean;
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
  socials: [
    {
      label: "Instagram",
      handle: "@mika_spark_studio",
      href: "https://www.instagram.com/mika_spark_studio/",
    },
    {
      label: "X",
      handle: "@MIKA_StReIn",
      href: "https://x.com/MIKA_StReIn",
    },
  ],
  supportEmail: "support@mikaspark.com",
  copyrightYear: 2026,
  products: [
    {
      slug: "hirame",
      internal: true,
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
    {
      slug: "uzmera",
      internal: false,
      name: "Uzmera",
      category: "App",
      platform: "iPhone / iPad",
      tagline: "音と動きで、練習を楽しく。",
      description:
        "録音、メトロノーム、チューナー、楽譜の読み取りをひとつに。毎日の音楽練習を支えるアプリ。",
      href: "https://uzmera.mikaspark.com/",
      appStoreUrl: null,
      screenshots: [],
    },
  ] satisfies readonly Product[],
} as const;

export const hirame = siteConfig.products[0];

export const hirameEnglish: Product = {
  ...hirame,
  internal: true,
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

export const uzmeraEnglish: Product = {
  ...siteConfig.products[1],
  tagline: "Make practice move with music.",
  description:
    "Recording, metronome, tuner, and score reading in one place—tools to support your everyday music practice.",
};

export const lineStickers: Product = {
  slug: "line-stickers",
  internal: false,
  name: "ウズメちゃん LINEスタンプ",
  category: "Sticker",
  platform: "LINE",
  tagline: "ドット絵で、練習も連絡も。",
  description:
    "篠笛を吹く着物の女の子「ウズメちゃん」のドット絵スタンプ16種。あいさつなどの日常使いから、「練習する！」「練習しなさい！」といった音楽の練習あるあるまで。LINEスタンプショップで近日公開（審査中）。",
  // LINEスタンプショップのURLは販売開始後に発行される。発行されたらここに入れるだけで導線が有効になる。
  href: "",
  appStoreUrl: null,
  screenshots: [],
};

export const lineStickersEnglish: Product = {
  ...lineStickers,
  name: "Uzume-chan LINE Stickers",
  tagline: "Pixel art for practice and everyday chats.",
  description:
    "Sixteen pixel-art stickers of Uzume-chan, a kimono girl who plays the shinobue flute. Everyday greetings plus music-practice moments like \"I'll practice!\" and \"Practice!\". Coming soon to the LINE Sticker Shop (in review).",
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
