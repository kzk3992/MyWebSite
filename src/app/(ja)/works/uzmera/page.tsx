import type { Metadata } from "next";
import { WorkDetail } from "../detail";
import { workData } from "@/content/works/uzmera";

export const metadata: Metadata = {
  title: "Uzmera",
  description:
    "Uzmeraは、吹奏楽や管楽器の個人練習を記録し、聴き比べるための練習支援アプリです。録る・重ねる・比べるを基本に、チューナーとメトロノーム、楽譜の下書き作成までをひとつに。",
  alternates: { canonical: "/works/uzmera/" },
  openGraph: {
    title: "Uzmera | Mika Spark Studio",
    description: "音と動きで、練習を楽しく。iPhone / iPad向け音楽練習アプリ（公開準備中）。",
    url: "/works/uzmera/",
  },
};


export default function UzmeraDetailPage() {
  return <WorkDetail data={workData} />;
}
