import type { Metadata } from "next";
import { WorkDetail, type WorkDetailData } from "../detail";

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

const data: WorkDetailData = {
  index: "03",
  name: "まほうのある暮らし",
  lead: "魔法使いの一生を、静かに生きる。インストール不要で、スマートフォンやPCのブラウザからそのまま遊べるブラウザゲームです（公開中）。",
  meta: [
    ["Category", "ゲーム"],
    ["Platform", "Webブラウザ"],
    ["Status", "公開中"],
  ],
  overviewTitle: "一生を、静かに生きる",
  overview: [
    "「まほうのある暮らし」は、魔法使いとして生まれてからの一生を静かに生きるブラウザゲームです。派手な戦闘や競争ではなく、日々の選択と時間の流れそのものを味わう設計にしています。インストール不要で、スマートフォンやPCのブラウザからそのまま遊べます。",
  ],
  extras: [
    {
      aside: "How to play",
      title: "遊び方",
      paragraphs: [
        "キャラクターを作り、学び、働き、人と関わりながら、魔法のある世界で一生を過ごします。選んだ行動によって日々が少しずつ変わっていく様子を眺める、ゆったりした進行のゲームです。続きはブラウザでそのまま再開できます。",
      ],
    },
    {
      aside: "Development",
      title: "開発について",
      paragraphs: [
        "個人開発のゲームとして、Mika Spark Studioが企画・実装・運営まで一人で担当しています。アップデートは小さく継続的に行っています。",
      ],
    },
  ],
  links: [
    { label: "今すぐ遊ぶ", description: "まほうのある暮らし（mahou.mikaspark.com）", href: "https://mahou.mikaspark.com/", external: true },
  ],
};

export default function MahouDetailPage() {
  return <WorkDetail data={data} />;
}
