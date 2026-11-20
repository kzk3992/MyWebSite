import type { Metadata } from "next";
import { GoodsSection } from "@/components/GoodsSection";
import { localizedAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Goods",
  description: "Mika Spark Studioのグッズ。ウズメちゃんLINEスタンプなど。",
  alternates: localizedAlternates("/goods/", "/en/goods/"),
  openGraph: { title: "Goods | Mika Spark Studio", description: "Mika Spark Studioのグッズ。", url: "/goods/" },
};

export default function GoodsPage() {
  return <GoodsSection locale="ja" />;
}
