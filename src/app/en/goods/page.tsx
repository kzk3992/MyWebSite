import type { Metadata } from "next";
import { GoodsPage } from "@/components/GoodsPage";
import { englishAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Goods",
  description: "Goods from Mika Spark Studio, including the Uzume-chan LINE stickers (16 stickers, ¥120).",
  alternates: englishAlternates("/goods/", "/en/goods/"),
  openGraph: { title: "Goods | Mika Spark Studio", description: "Uzume-chan LINE stickers and more from Mika Spark Studio.", url: "/en/goods/" },
};

export default function Page() {
  return <GoodsPage locale="en" />;
}
