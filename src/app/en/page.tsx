import type { Metadata } from "next";
import { RoomHero, type RoomHeroContent } from "@/components/RoomHero";
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
};

export default function EnglishHomePage() {
  return (
    <>
      {/* 最初の画面：パースの線の部屋。自動で奥へ歩き、About・Works・Support・Privacy が近づいてくる */}
      <RoomHero content={room} />
    </>
  );
}
