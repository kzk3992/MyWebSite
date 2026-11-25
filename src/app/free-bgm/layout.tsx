import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mikaspark.com"),
  title: "Free Jazz Flute BGM — FLUTE & CO.",
  description:
    "Download free jazz flute background music for your videos, live streams and podcasts. Ten tracks by FLUTE & CO., free to use with credit — including monetized content.",
  keywords: [
    "free bgm",
    "jazz flute",
    "flute jazz",
    "free background music",
    "bossa nova flute",
    "jazz for work",
    "jazz for study",
    "royalty free jazz",
  ],
  alternates: { canonical: "/free-bgm/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/free-bgm/",
    title: "Free Jazz Flute BGM — FLUTE & CO.",
    description:
      "Jazz led by the flute, free to use as background music in your videos, streams and podcasts — with credit. Download the full Vol. 1 set or individual tracks.",
    siteName: "FLUTE & CO.",
  },
  twitter: {
    card: "summary",
    title: "Free Jazz Flute BGM — FLUTE & CO.",
    description:
      "Jazz led by the flute, free to use as background music in your videos, streams and podcasts — with credit.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function FreeBgmRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
