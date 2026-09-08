import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const localizedRoutes = [
  ["/", "/en/"],
  ["/apps/hirame/", "/en/apps/hirame/"],
  ["/apps/hirame/privacy/", "/en/apps/hirame/privacy/"],
  ["/apps/hirame/terms/", "/en/apps/hirame/terms/"],
  ["/apps/hirame/support/", "/en/apps/hirame/support/"],
  ["/about/", "/en/about/"],
  ["/support/", "/en/support/"],
] as const;

const japaneseOnlyRoutes = ["/privacy/", "/terms/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedEntries = localizedRoutes.flatMap(([japanese, english]) => {
    const languages = {
      ja: new URL(japanese, siteConfig.baseUrl).toString(),
      en: new URL(english, siteConfig.baseUrl).toString(),
      "x-default": new URL(japanese, siteConfig.baseUrl).toString(),
    };
    return [japanese, english].map((route) => ({
      url: new URL(route, siteConfig.baseUrl).toString(),
      lastModified: new Date("2026-09-08"),
      changeFrequency: route === "/" || route === "/en/" ? "monthly" as const : "yearly" as const,
      priority: route === "/" ? 1 : route === "/en/" ? 0.9 : route.endsWith("/apps/hirame/") ? 0.9 : 0.6,
      alternates: { languages },
    }));
  });

  return [
    ...localizedEntries,
    ...japaneseOnlyRoutes.map((route) => ({
      url: new URL(route, siteConfig.baseUrl).toString(),
      lastModified: new Date("2026-09-08"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
