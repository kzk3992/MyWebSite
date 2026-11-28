import type { Metadata } from "next";
import { WorkDetail } from "../detail";
import { workData } from "@/content/works/uzume-stamps";

export const metadata: Metadata = {
  title: "ウズメちゃん LINEスタンプ",
  description:
    "音楽練習アプリ「Uzmera」のマスコット、ウズメちゃんのLINEスタンプです。全16種類、ピクセルアートで1つずつ描き起こしました。",
  alternates: { canonical: "/works/uzume-stamps/" },
  openGraph: {
    title: "ウズメちゃん LINEスタンプ | Mika Spark Studio",
    description: "ピクセルアートのLINEスタンプ（販売中）。",
    url: "/works/uzume-stamps/",
  },
};


export default function UzumeStampsDetailPage() {
  return <WorkDetail data={workData} />;
}
