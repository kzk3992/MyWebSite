import type { Metadata } from "next";
import { WorkDetail, type WorkDetailData } from "../detail";

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

const data: WorkDetailData = {
  index: "04",
  name: "ウズメちゃん LINEスタンプ",
  lead: "音楽練習アプリ「Uzmera」のマスコット、ウズメちゃんのピクセルアートLINEスタンプです（全16種・販売中）。",
  meta: [
    ["Category", "グッズ"],
    ["Platform", "LINE"],
    ["Status", "販売中"],
  ],
  overviewTitle: "ピクセルアートのスタンプ",
  overview: [
    "音楽練習アプリ「Uzmera」のマスコット、ウズメちゃんのLINEスタンプです。全16種類、ピクセルアートで1つずつ描き起こしました。手に持っているのは黒い篠笛（金色の帯付き）で、音楽と演奏の場面で使いやすい表情とポーズをそろえています。",
  ],
  extras: [
    {
      aside: "Character",
      title: "ウズメちゃんについて",
      paragraphs: [
        "ウズメちゃんは、芸能の女神アメノウズメをモチーフにしたMika Spark Studioのマスコットキャラクターです。Uzmeraのアプリ内ガイド役としても登場します。",
      ],
    },
  ],
  links: [
    { label: "LINEストア", description: "ウズメちゃん LINEスタンプを LINEストアで見る", href: "https://line.me/S/sticker/37956024", external: true },
  ],
};

export default function UzumeStampsDetailPage() {
  return <WorkDetail data={data} />;
}
