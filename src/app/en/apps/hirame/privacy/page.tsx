import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { LegalSections } from "@/components/LegalSections";
import { privacySections } from "@/content/en";
import { englishAlternates } from "@/i18n/site";

export const metadata: Metadata = {
  title: "Hirame Privacy Policy",
  description: "The Hirame Privacy Policy explains how the app handles storage, iCloud, AI assistance, analytics, advertising, purchases, and deletion.",
  alternates: englishAlternates("/apps/hirame/privacy/", "/en/apps/hirame/privacy/"),
  openGraph: {
    title: "Hirame Privacy Policy | Mika Spark Studio",
    description: "How information is handled in the Hirame app for iPhone and iPad.",
    url: "/en/apps/hirame/privacy/",
  },
};

export default function EnglishHiramePrivacyPage() {
  return (
    <LegalLayout
      locale="en"
      label="Hirame / Legal"
      title="Privacy Policy"
      intro='Mika Spark Studio (the “Operator”) establishes this Privacy Policy for the handling of user information in Hirame (the “App”), an app for iPhone and iPad.'
    >
      <LegalSections sections={privacySections} />
    </LegalLayout>
  );
}
