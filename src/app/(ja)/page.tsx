import type { Metadata } from "next";
import { DepthHome, type DepthHomeContent } from "@/components/DepthHome";
import { buildCarouselItems } from "@/components/worksCarouselItems";
import { goodsItems, siteConfig } from "@/config/site";
import { localizedAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: { absolute: "Mika Spark Studio | Independent Apps & Games" },
  description: "小さなアイデアを、使えるプロダクトへ。Mika Spark Studioの公式サイトです。",
  alternates: localizedAlternates("/", "/en/"),
  openGraph: {
    title: "Mika Spark Studio | Independent Apps & Games",
    description: "小さなアイデアを、使えるプロダクトへ。",
    url: "/",
  },
};

// トップの作品は従来どおり Hirame → Uzmera → まほう の順（Works ページは Uzmera 始まり）
const homeOrder = ["hirame", "uzmera", "mahou"];

const content: DepthHomeContent = {
  locale: "ja",
  hero: {
    kicker: "Independent development studio",
    titleTop: "Mika Spark",
    titleBottom: "Studio",
    lead: "小さなアイデアを、使えるプロダクトへ。",
    tagline: siteConfig.tagline,
    explore: "Explore works",
  },
  works: {
    eyebrow: "01 / Selected work",
    title: "Ideas in motion.",
    intro: "日々の小さな着想を、手触りのあるアプリやゲームへ。Mika Spark Studioが公開しているプロダクトです。",
    moreLabel: "すべての作品を見る",
    moreHref: "/works/",
  },
  products: homeOrder.map((slug) => buildCarouselItems("ja").find((item) => item.id === slug)!),
  about: {
    eyebrow: "02 / About",
    title: "Built independently.",
    paragraphs: [
      "Mika Spark Studioは、個人でアプリやゲームを企画・開発・公開するインディーデベロップメントスタジオです。",
      "新しいアイデア、便利な仕組み、遊び心のある体験を、小さく作って公開していきます。",
    ],
    linkLabel: "スタジオについて",
    linkHref: "/about/",
    fields: ["Apps", "Games", "Tools", "Experiments"],
    fieldsLabel: "制作領域",
  },
  goods: {
    eyebrow: "03 / Goods",
    title: "グッズ",
    items: goodsItems.map((item) => ({ id: item.id, image: item.image, label: item.ja, href: item.href })),
  },
  rail: { label: "ページ内の現在地", stops: ["Top", "Works", "Hirame", "Uzmera", "まほう", "About", "Goods"] },
};

export default function Home() {
  return <DepthHome content={content} />;
}
