import type { Metadata } from "next";
import { WorkDetail, type WorkDetailData } from "../detail";

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

const data: WorkDetailData = {
  index: "01",
  name: "Uzmera",
  lead: "音と動きで、練習を楽しく。吹奏楽や管楽器の個人練習を記録し、聴き比べるための、iPhone / iPad向け練習支援アプリです（公開準備中）。",
  meta: [
    ["Category", "アプリ"],
    ["Platform", "iPhone / iPad"],
    ["Status", "公開準備中"],
  ],
  overviewTitle: "録る・重ねる・比べる",
  overview: [
    "Uzmeraは、吹奏楽や管楽器の個人練習を記録し、聴き比べるための練習支援アプリです。「録る・重ねる・比べる」を基本の流れに、録音したテイクを重ねてハーモニーを確認したり、過去の自分の演奏と今日の演奏を比べたりできます。チューナーとメトロノームも1つの画面にまとまっており、レッスンや部活、個人練習の現場でそのまま使える道具を目指しています。",
  ],
  features: [
    { name: "テイク録音と比較", text: "練習の録音をテイクとして管理し、気になる箇所を聴き比べられます" },
    { name: "多重録音", text: "自分の演奏に自分の演奏を重ねて録音でき、デュエットやハーモニーの確認に使えます" },
    { name: "チューナー＆メトロノーム", text: "一体のツール画面は横向き表示。外部マイクを接続してもケーブルが横に出るので、譜面台に置いたまま使えます" },
    { name: "楽譜の下書き作成", text: "楽譜の写真から、編集できる下書きを作成する補助機能があります（自動判定のあとに自分で確認・修正する設計です）" },
    { name: "楽器の消耗品情報", text: "リードや弦など、自分の楽器で使う消耗品の情報を確認できます" },
  ],
  extras: [
    {
      aside: "Pricing",
      title: "料金",
      paragraphs: [
        "基本無料。買い切りの「Uzmera Plus」（490円）で、録音数とトラック数の上限解除、高音質録音、WAV書き出し、詳しい比較、広告なしが有効になります。",
      ],
    },
    {
      aside: "Development",
      title: "開発について",
      paragraphs: [
        "開発はMika Spark Studio（個人開発）。開発者自身が中学から10年以上フルートを演奏してきた経験から、「練習の記録が続かない」「重ねて聴く手段がない」という自分の課題を解くために作り始めました。",
      ],
    },
  ],
  links: [
    { label: "ティザーサイト", description: "Uzmera ティザーサイト（uzmera.mikaspark.com）", href: "https://uzmera.mikaspark.com/", external: true },
  ],
};

export default function UzmeraDetailPage() {
  return <WorkDetail data={data} />;
}
