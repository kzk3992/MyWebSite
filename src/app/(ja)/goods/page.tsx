import type { Metadata } from "next";
import { GoodsPage } from "@/components/GoodsPage";
import { localizedAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Goods",
  description: "Mika Spark Studioのグッズ。ウズメちゃんLINEスタンプ（全16種・¥120）など。",
  alternates: localizedAlternates("/goods/", "/en/goods/"),
  openGraph: { title: "Goods | Mika Spark Studio", description: "ウズメちゃんLINEスタンプ（全16種）など、Mika Spark Studioのグッズ。", url: "/goods/" },
};

export default function Page() {
  return <GoodsPage locale="ja" />;
}
