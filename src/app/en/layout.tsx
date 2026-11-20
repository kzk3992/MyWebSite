import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { siteConfig } from "@/config/site";
import { englishAlternates, shellText } from "@/i18n/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "Mika Spark Studio | Independent Apps & Games",
    template: `%s | ${siteConfig.brandName}`,
  },
  description: "Mika Spark Studio is an independent studio creating apps and games.",
  applicationName: siteConfig.brandName,
  alternates: englishAlternates("/", "/en/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/",
    title: "Mika Spark Studio | Independent Apps & Games",
    description: "Mika Spark Studio is an independent studio creating apps and games.",
    siteName: siteConfig.brandName,
    images: [{ url: "/brand/header-mono.jpg", width: 1983, height: 793, alt: "Mika Spark Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mika Spark Studio | Independent Apps & Games",
    description: "Mika Spark Studio is an independent studio creating apps and games.",
    images: ["/brand/header-mono.jpg"],
  },
  icons: { icon: "/brand/logo-mono.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">{shellText.en.skipToContent}</a>
        <Header locale="en" />
        <main id="main-content">{children}</main>
        <Footer locale="en" />
        <RevealObserver />
      </body>
    </html>
  );
}
