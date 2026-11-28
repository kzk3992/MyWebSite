import type { Metadata } from "next";
import { WorkDetail } from "../detail";
import { workData } from "@/content/works/hirame";

export const metadata: Metadata = {
  title: "Hirame",
  description:
    "Hirameは、言葉の組み合わせや連想といった「制約」から発想する力を日常的に鍛えるアイデアトレーニングアプリです。思いつきの記録と、発想法によるトレーニングを1つのアプリにまとめました。",
  alternates: { canonical: "/works/hirame/" },
  openGraph: {
    title: "Hirame | Mika Spark Studio",
    description: "制約が、ひらめきを生む。iPhone / iPad向けアイデアトレーニングアプリ（公開中）。",
    url: "/works/hirame/",
  },
};


export default function HirameDetailPage() {
  return <WorkDetail data={workData} />;
}
