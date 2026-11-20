import type { Metadata } from "next";
import { WorksCarousel } from "@/components/WorksCarousel";
import { buildCarouselItems } from "@/components/worksCarouselItems";
import { englishAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Works",
  description: "Works by Mika Spark Studio: Uzmera, Hirame, Mahou no Aru Kurashi, and the Uzume-chan LINE stickers.",
  alternates: englishAlternates("/works/", "/en/works/"),
  openGraph: {
    title: "Works | Mika Spark Studio",
    description: "Apps, games, and LINE stickers made by Mika Spark Studio.",
    url: "/en/works/",
  },
};

export default function EnglishWorksPage() {
  return <WorksCarousel items={buildCarouselItems("en")} locale="en" />;
}
