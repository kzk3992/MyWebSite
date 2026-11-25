import type { Metadata } from "next";
import { WorkDetail, type WorkDetailData } from "../detail";

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

const data: WorkDetailData = {
  index: "02",
  name: "Hirame",
  lead: "制約が、ひらめきを生む。言葉の組み合わせや連想といった「制約」から発想する力を鍛える、iPhone / iPad向けアイデアトレーニングアプリです（公開中）。",
  fact: "Hirameは、制約から発想力を鍛えるiOS向けアイデアトレーニングアプリです。App Storeで公開中です。",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hirame",
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS",
    author: { "@type": "Organization", name: "Mika Spark Studio", url: "https://mikaspark.com/" },
    url: "https://apps.apple.com/jp/app/hirame/id6808982302",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  },
  meta: [
    ["Category", "アプリ"],
    ["Platform", "iPhone / iPad"],
    ["Status", "公開中"],
  ],
  overviewTitle: "制約が、思考を動かす",
  overview: [
    "Hirameは、言葉の組み合わせや連想といった「制約」から発想する力を日常的に鍛えるアイデアトレーニングアプリです。自由に考えようとするほど手が止まる、という逆説に対して、あえて条件を与えることで思考を動かします。思いつきの記録と、発想法によるトレーニングを1つのアプリにまとめました。",
  ],
  features: [
    { name: "Idea Note", text: "思いつきを文章で整理し、画像や手書きも添えて記録。ライブラリ検索やお気に入り、カレンダーから振り返れます" },
    { name: "Random Fusion", text: "Random Fusion、SCAMPER、逆転発想、制約発想、類推発想。5つの発想法で普段とは異なる視点を引き出します" },
    { name: "BRIDGE", text: "離れた概念を言葉の連想でつなぎ、ゴールまでの思考経路を組み立てます" },
    { name: "AI Assist", text: "対応端末ではApple Intelligenceと一緒に、視点を広げ、レビューや問い、次の一歩を考えられます" },
  ],
  extras: [
    {
      aside: "For you",
      title: "こんな方に",
      paragraphs: [
        "企画や制作の仕事で発想力を日常的に使いたい人、個人開発や創作のネタ出しを習慣にしたい人に向いています。",
      ],
    },
  ],
  links: [
    { label: "App Store", description: "Hirame を App Store で見る", href: "https://apps.apple.com/jp/app/hirame/id6808982302", external: true },
    { label: "機能紹介", description: "Hirame 機能紹介サイト（hirame.mikaspark.com）", href: "https://hirame.mikaspark.com/", external: true },
  ],
};

export default function HirameDetailPage() {
  return <WorkDetail data={data} />;
}
