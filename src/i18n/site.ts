export type Locale = "ja" | "en";

export const localeRoutes = {
  "/": "/en/",
  "/apps/hirame/": "/en/apps/hirame/",
  "/apps/hirame/privacy/": "/en/apps/hirame/privacy/",
  "/apps/hirame/terms/": "/en/apps/hirame/terms/",
  "/apps/hirame/support/": "/en/apps/hirame/support/",
  "/about/": "/en/about/",
  "/support/": "/en/support/",
  "/privacy/": "/en/apps/hirame/privacy/",
  "/terms/": "/en/apps/hirame/terms/",
} as const;

const englishToJapanese = Object.entries(localeRoutes).reduce<Record<string, string>>(
  (paths, [japanese, english]) => {
    paths[english] ??= japanese;
    return paths;
  },
  {},
);

function withTrailingSlash(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function languageSwitchPath(pathname: string, locale: Locale) {
  const normalized = withTrailingSlash(pathname);
  if (locale === "ja") {
    return localeRoutes[normalized as keyof typeof localeRoutes] ?? "/en/";
  }
  return englishToJapanese[normalized] ?? "/";
}

export function localizedAlternates(japanese: string, english: string) {
  return {
    canonical: japanese,
    languages: { ja: japanese, en: english, "x-default": japanese },
  };
}

export function englishAlternates(japanese: string, english: string) {
  return {
    canonical: english,
    languages: { ja: japanese, en: english, "x-default": japanese },
  };
}

export const navigation = {
  ja: [
    { label: "Works", href: "/#works" },
    { label: "About", href: "/about/" },
    { label: "Support", href: "/support/" },
  ],
  en: [
    { label: "Works", href: "/en/#works" },
    { label: "About", href: "/en/about/" },
    { label: "Support", href: "/en/support/" },
  ],
} as const;

export const footerLinks = {
  ja: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ],
  en: [
    { label: "Privacy", href: "/en/apps/hirame/privacy/" },
    { label: "Terms", href: "/en/apps/hirame/terms/" },
    { label: "Support", href: "/en/support/" },
    { label: "About", href: "/en/about/" },
  ],
} as const;

export const shellText = {
  ja: {
    brandHome: "Mika Spark Studio ホーム",
    mainNavigation: "メインナビゲーション",
    mobileNavigation: "モバイルナビゲーション",
    openMenu: "メニューを開く",
    switchLanguage: "英語に切り替える",
    footerNavigation: "フッターナビゲーション",
    backToTop: "ページ上部へ戻る",
    skipToContent: "本文へ移動",
  },
  en: {
    brandHome: "Mika Spark Studio home",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open menu",
    switchLanguage: "Switch to Japanese",
    footerNavigation: "Footer navigation",
    backToTop: "Back to top",
    skipToContent: "Skip to content",
  },
} as const;
