import type { Metadata } from "next";
import { WorkDetail } from "../detail";
import { workData } from "@/content/works/mahou";

export const metadata: Metadata = {
  title: "まほうのある暮らし",
  description:
    "「まほうのある暮らし」は、魔法使いとして生まれてからの一生を静かに生きるブラウザゲームです。インストール不要で、スマートフォンやPCのブラウザからそのまま遊べます。",
  alternates: { canonical: "/works/mahou/" },
  openGraph: {
    title: "まほうのある暮らし | Mika Spark Studio",
    description: "魔法使いの一生を、静かに生きる。ブラウザゲーム（公開中）。",
    url: "/works/mahou/",
  },
};


export default function MahouDetailPage() {
  return <WorkDetail data={workData} />;
}
