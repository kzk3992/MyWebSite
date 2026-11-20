import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RoomHero, type RoomHeroContent } from "@/components/RoomHero";
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

const room: RoomHeroContent = {
  locale: "ja",
  title: "Mika Spark Studio",
  lead: "小さなアイデアを、使えるプロダクトへ。",
  hint: "SCROLL ／ SWIPE",
  navLabel: "ページ",
  about: { href: "/about/", label: "About" },
  works: { href: "/works/", label: "Works" },
  support: { href: "/support/", label: "Support" },
  privacy: { href: "/privacy/", label: "Privacy" },
  goods: { href: "/goods/", label: "Goods" },
  terms: { href: "/terms/", label: "Terms" },
  socials: siteConfig.socials,
};

export default function Home() {
  return (
    <>
      {/* 最初の画面：パースの線の部屋。自動で奥へ歩き、About・Works・Support・Privacy が近づいてくる */}
      <RoomHero content={room} />
    </>
  );
}
