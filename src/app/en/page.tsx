import type { Metadata } from "next";
import { DepthHome, type DepthHomeContent } from "@/components/DepthHome";
import { buildCarouselItems } from "@/components/worksCarouselItems";
import { englishContent } from "@/content/en";
import { goodsItems, siteConfig } from "@/config/site";
import { englishAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: { absolute: "Mika Spark Studio | Independent Apps & Games" },
  description: englishContent.home.description,
  alternates: englishAlternates("/", "/en/"),
  openGraph: {
    title: "Mika Spark Studio | Independent Apps & Games",
    description: englishContent.home.heroLead,
    url: "/en/",
  },
};

const homeOrder = ["hirame", "uzmera", "mahou"];

const content: DepthHomeContent = {
  locale: "en",
  hero: {
    kicker: "Independent development studio",
    titleTop: "Mika Spark",
    titleBottom: "Studio",
    lead: englishContent.home.heroLead,
    tagline: siteConfig.tagline,
    explore: "Explore works",
  },
  works: {
    eyebrow: "01 / Selected work",
    title: "Ideas in motion.",
    intro: englishContent.home.worksIntro,
    moreLabel: "Explore all works",
    moreHref: "/en/works/",
  },
  products: homeOrder.map((slug) => buildCarouselItems("en").find((item) => item.id === slug)!),
  about: {
    eyebrow: "02 / About",
    title: "Built independently.",
    paragraphs: englishContent.home.aboutParagraphs,
    linkLabel: englishContent.home.aboutLink,
    linkHref: "/en/about/",
    fields: ["Apps", "Games", "Tools", "Experiments"],
    fieldsLabel: "What Mika Spark Studio makes",
  },
  goods: {
    eyebrow: "03 / Goods",
    title: "Goods",
    items: goodsItems.map((item) => ({ id: item.id, image: item.image, label: item.en, href: item.href })),
  },
  rail: { label: "Where you are on this page", stops: ["Top", "Works", "Hirame", "Uzmera", "Mahou", "About", "Goods"] },
};

export default function EnglishHomePage() {
  return <DepthHome content={content} />;
}
