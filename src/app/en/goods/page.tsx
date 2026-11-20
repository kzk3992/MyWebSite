import type { Metadata } from "next";
import { GoodsSection } from "@/components/GoodsSection";
import { englishAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Goods",
  description: "Goods from Mika Spark Studio, including the Uzume-chan LINE stickers.",
  alternates: englishAlternates("/goods/", "/en/goods/"),
  openGraph: { title: "Goods | Mika Spark Studio", description: "Goods from Mika Spark Studio.", url: "/en/goods/" },
};

export default function EnglishGoodsPage() {
  return <GoodsSection locale="en" />;
}
