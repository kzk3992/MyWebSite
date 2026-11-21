import { goodsItems, hirameEnglish, mahouEnglish, siteConfig, uzmeraEnglish, type GoodsItem, type Product } from "@/config/site";
import type { Locale } from "@/i18n/site";

// Works ページのカルーセル専用の共通型。siteConfig の型は変えず、products と goodsItems をここで変換する。
export type CarouselVisual =
  | { kind: "image"; src: string; width: number; height: number; alt: string; fit: "cover" | "contain"; position: string; background: string; pixelated?: boolean; appIcon?: boolean; squareIcon?: boolean }
  | { kind: "mahou" };

export type CarouselItem = {
  id: string;
  title: string;
  /** カード下部の短い説明 */
  summary: string;
  /** 詳細パネルのキャッチコピー */
  catchCopy: string;
  /** カード上部の小見出し（例: APP） */
  label: string;
  status: string;
  kind: string;
  /** 状態チップとカードの点の色（作品の色。サイトのアクセントではない） */
  accent: string;
  href: string;
  external: boolean;
  ctaLabel: string;
  storeUrl: string | null;
  storeLabel: string;
  visual: CarouselVisual;
};

type Copy = { ja: string; en: string };

// products / goodsItems に項目がない表示用の文言だけを slug ごとに持つ。
const presentation: Record<string, { accent: string; status?: Copy; cta: Copy; label: Copy }> = {
  uzmera: { accent: "#e58aa5", status: { ja: "公開準備中", en: "Coming soon" }, cta: { ja: "ティザーサイトを見る", en: "Visit teaser site" }, label: { ja: "iOS APP", en: "iOS APP" } },
  hirame: { accent: "#e8b64c", cta: { ja: "機能を見る", en: "View features" }, label: { ja: "iOS APP", en: "iOS APP" } },
  mahou: { accent: "#8b7fd6", status: { ja: "公開中", en: "Available" }, cta: { ja: "ブラウザで今すぐ遊ぶ", en: "Play in browser" }, label: { ja: "BROWSER GAME", en: "BROWSER GAME" } },
};

const categoryLabel: Record<Product["category"], Copy> = {
  App: { ja: "アプリ", en: "App" },
  Game: { ja: "ゲーム", en: "Game" },
  Tool: { ja: "ツール", en: "Tool" },
  Experiment: { ja: "実験", en: "Experiment" },
};

function productVisual(product: Product, locale: Locale): CarouselVisual {
  const ja = locale === "ja";
  if (product.slug === "mahou") return { kind: "mahou" };
  if (product.slug === "uzmera") {
    return { kind: "image", src: "/brand/uzmera/app-icon.png", width: 1254, height: 1254, alt: ja ? "Uzmera アプリアイコン" : "Uzmera app icon", fit: "contain", position: "50% 50%", background: "linear-gradient(180deg, #2c1e2b 0%, #4a2f3f 52%, #774452 100%)", appIcon: true, squareIcon: true };
  }
  // Hirame：Uzmera と同じくアプリアイコンを表示する（背景はアイコンの紺に合わせる）
  return { kind: "image", src: "/brand/hirame/app-icon.jpg", width: 1254, height: 1254, alt: ja ? "Hirame アプリアイコン" : "Hirame app icon", fit: "contain", position: "50% 50%", background: "linear-gradient(180deg, #0b2a6b 0%, #031f55 55%, #02163d 100%)", appIcon: true };
}

function fromProduct(product: Product, locale: Locale): CarouselItem {
  const ja = locale === "ja";
  const view = presentation[product.slug];
  const status = product.appStoreUrl ? { ja: "公開中", en: "Available" } : view.status ?? { ja: "公開中", en: "Available" };
  const category = categoryLabel[product.category];
  return {
    id: product.slug,
    title: product.name,
    summary: product.description,
    catchCopy: product.tagline,
    label: ja ? view.label.ja : view.label.en,
    status: ja ? status.ja : status.en,
    kind: `${ja ? category.ja : category.en} ・ ${product.platform}`,
    accent: view.accent,
    href: product.href,
    external: !product.internal,
    ctaLabel: ja ? view.cta.ja : view.cta.en,
    storeUrl: product.appStoreUrl,
    storeLabel: ja ? "App Storeで見る" : "View on the App Store",
    visual: productVisual(product, locale),
  };
}

function fromGoods(item: GoodsItem, locale: Locale): CarouselItem {
  const ja = locale === "ja";
  return {
    id: item.id,
    title: ja ? "ウズメちゃん" : "Uzume-chan",
    summary: ja ? item.ja : item.en,
    catchCopy: ja ? "篠笛と一緒に、毎日のトークへ。全16種。" : "Sixteen stickers for every chat, flute in hand.",
    label: "LINE STICKERS",
    status: ja ? "販売中" : "On sale",
    kind: ja ? "LINEスタンプ" : "LINE stickers",
    accent: "#06c755",
    href: item.href,
    external: true,
    ctaLabel: ja ? "LINEストアで見る" : "View in LINE Store",
    storeUrl: null,
    storeLabel: "",
    visual: { kind: "image", src: item.image, width: 370, height: 320, alt: ja ? item.ja : item.en, fit: "contain", position: "50% 60%", background: "linear-gradient(165deg, #ffffff, #f1f1ed)", pixelated: true },
  };
}

/** 並び順：Uzmera → Hirame → まほうのある暮らし → LINEスタンプ（2026-11-20 決定） */
export function buildCarouselItems(locale: Locale): CarouselItem[] {
  const ja = locale === "ja";
  const bySlug = (slug: string) => siteConfig.products.find((product) => product.slug === slug)!;
  const uzmera = ja ? bySlug("uzmera") : uzmeraEnglish;
  const hirame = ja ? bySlug("hirame") : hirameEnglish;
  const mahou = ja ? bySlug("mahou") : mahouEnglish;
  const stickers = goodsItems.find((item) => item.id === "uzume-line-stickers");
  return [
    fromProduct(uzmera, locale),
    fromProduct(hirame, locale),
    fromProduct(mahou, locale),
    ...(stickers ? [fromGoods(stickers, locale)] : []),
  ];
}
