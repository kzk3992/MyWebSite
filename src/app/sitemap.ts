import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/apps/hirame/",
  "/apps/hirame/privacy/",
  "/apps/hirame/terms/",
  "/apps/hirame/support/",
  "/about/",
  "/support/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route || "/", siteConfig.baseUrl).toString(),
    lastModified: new Date("2026-09-01"),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/apps/hirame/" ? 0.9 : 0.6,
  }));
}
