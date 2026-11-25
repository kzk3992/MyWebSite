import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RoomHero, type RoomHeroContent } from "@/components/RoomHero";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/config/structured-data";
import { englishContent } from "@/content/en";
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

const room: RoomHeroContent = {
  locale: "en",
  title: "Mika Spark Studio",
  lead: englishContent.home.heroLead,
  hint: "SCROLL ／ SWIPE",
  navLabel: "Pages",
  about: { href: "/en/about/", label: "About" },
  works: { href: "/en/works/", label: "Works" },
  support: { href: "/en/support/", label: "Support" },
  privacy: { href: "https://hirame.mikaspark.com/en/privacy/", label: "Privacy" },
  goods: { href: "/en/goods/", label: "Goods" },
  terms: { href: "https://hirame.mikaspark.com/en/terms/", label: "Terms" },
  socials: siteConfig.socials,
};

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      {/* 最初の画面：パースの線の部屋。自動で奥へ歩き、About・Works・Support・Privacy が近づいてくる */}
      <RoomHero content={room} />
    </>
  );
}
