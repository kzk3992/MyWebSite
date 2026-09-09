import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { LegalSections } from "@/components/LegalSections";
import { termsSections } from "@/content/en";
import { englishAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Hirame: Idea Trainer Terms of Use",
  description: "The Hirame: Idea Trainer Terms of Use cover use conditions, user-created content, data, AI assistance, advertising, and in-app purchases.",
  alternates: englishAlternates("/apps/hirame/terms/", "/en/apps/hirame/terms/"),
  openGraph: {
    title: "Hirame: Idea Trainer Terms of Use | Mika Spark Studio",
    description: "Terms governing the use of the Hirame: Idea Trainer app for iPhone and iPad.",
    url: "/en/apps/hirame/terms/",
  },
};

export default function EnglishHirameTermsPage() {
  return (
    <LegalLayout
      locale="en"
      label="Hirame: Idea Trainer / Legal"
      title="Terms of Use"
      intro='These Terms of Use (the “Terms”) govern the use of Hirame: Idea Trainer (“Hirame” or the “App”), an app for iPhone and iPad provided by Mika Spark Studio (the “Operator”).'
    >
      <LegalSections sections={termsSections} />
    </LegalLayout>
  );
}
