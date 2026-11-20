import type { Metadata } from "next";
import { WorksCarousel } from "@/components/WorksCarousel";
import { buildCarouselItems } from "@/components/worksCarouselItems";
import { localizedAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Works",
  description: "Mika Spark Studioの作品一覧。Uzmera、Hirame、まほうのある暮らし、ウズメちゃんLINEスタンプを紹介します。",
  alternates: localizedAlternates("/works/", "/en/works/"),
  openGraph: {
    title: "Works | Mika Spark Studio",
    description: "Mika Spark Studioが作ったアプリ・ゲーム・LINEスタンプ。",
    url: "/works/",
  },
};

export default function WorksPage() {
  return <WorksCarousel items={buildCarouselItems("ja")} locale="ja" />;
}
