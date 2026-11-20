import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");

const routes = [
  "/",
  "/works/",
  "/goods/",
  "/privacy/",
  "/terms/",
  "/about/",
  "/support/",
  "/en/",
  "/en/works/",
  "/en/goods/",
  "/en/about/",
  "/en/support/",
];

const localizedRoutePairs = [
  ["/", "/en/"],
  ["/works/", "/en/works/"],
  ["/goods/", "/en/goods/"],
  ["/about/", "/en/about/"],
  ["/support/", "/en/support/"],
];

const routeFile = (route) =>
  route === "/"
    ? join(outputDirectory, "index.html")
    : join(outputDirectory, ...route.split("/").filter(Boolean), "index.html");

const failures = [];

for (const route of routes) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    failures.push(`${route}: 静的HTMLがありません`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  if (!html.includes("<title>")) failures.push(`${route}: title metadataがありません`);
  if (!html.includes('name="description"')) failures.push(`${route}: description metadataがありません`);
  if (!html.includes('property="og:title"')) failures.push(`${route}: OGP metadataがありません`);
}

for (const [japaneseRoute, englishRoute] of localizedRoutePairs) {
  const japaneseHtml = readFileSync(routeFile(japaneseRoute), "utf8");
  const englishHtml = readFileSync(routeFile(englishRoute), "utf8");
  const japaneseUrl = `https://mikaspark.com${japaneseRoute}`;
  const englishUrl = `https://mikaspark.com${englishRoute}`;

  if (!japaneseHtml.includes('<html lang="ja">')) failures.push(`${japaneseRoute}: html langがjaではありません`);
  if (!englishHtml.includes('<html lang="en">')) failures.push(`${englishRoute}: html langがenではありません`);
  if (!japaneseHtml.includes(`rel="canonical" href="${japaneseUrl}"`)) failures.push(`${japaneseRoute}: canonicalが正しくありません`);
  if (!englishHtml.includes(`rel="canonical" href="${englishUrl}"`)) failures.push(`${englishRoute}: canonicalが正しくありません`);

  for (const html of [japaneseHtml, englishHtml]) {
    if (!html.includes(`hrefLang="ja" href="${japaneseUrl}"`)) failures.push(`${japaneseRoute} / ${englishRoute}: ja hreflangがありません`);
    if (!html.includes(`hrefLang="en" href="${englishUrl}"`)) failures.push(`${japaneseRoute} / ${englishRoute}: en hreflangがありません`);
    if (!html.includes(`hrefLang="x-default" href="${japaneseUrl}"`)) failures.push(`${japaneseRoute} / ${englishRoute}: x-defaultがありません`);
  }

  if (!japaneseHtml.includes(`href="${englishRoute}" hrefLang="en"`)) failures.push(`${japaneseRoute}: 対応英語ページへの切替がありません`);
  if (!englishHtml.includes(`href="${japaneseRoute}" hrefLang="ja"`)) failures.push(`${englishRoute}: 対応日本語ページへの切替がありません`);
}

for (const requiredFile of ["404.html", "robots.txt", "sitemap.xml", "app-ads.txt", "apps/hirame/app-ads.txt"]) {
  if (!existsSync(join(outputDirectory, requiredFile))) {
    failures.push(`${requiredFile}: 出力されていません`);
  }
}

const brandFiles = [
  "brand/header.jpg",
  "brand/hero-wolf.jpg",
  "brand/logo.png",
  "brand/logo-white.png",
  "brand/logo-mark.png",
  "brand/logo-mark-small.png",
  "brand/logo-mono.png",
  "brand/hero-mono.jpg",
  "brand/header-mono.jpg",
  "brand/icons/wolf.png",
  "brand/icons/spark.png",
  "brand/icons/paw.png",
  "brand/icons/power.png",
  "brand/icons/arrow-left.png",
  "brand/icons/arrow-right.png",
  "brand/hirame/app-icon.jpg",
  "brand/hirame/screens/home.jpg",
  "brand/hirame/screens/association.jpg",
  "brand/hirame/screens/association-clear.jpg",
  "brand/hirame/screens/association-game.jpg",
  "brand/hirame/screens/methods.jpg",
  "brand/hirame/screens/random.jpg",
  "brand/hirame/screens/random-note.jpg",
  "brand/hirame/screens/note.jpg",
  "brand/hirame/screens/en/01-concept.png",
  "brand/hirame/screens/en/02-note.png",
  "brand/hirame/screens/en/03-with-ai.png",
  "brand/hirame/screens/en/04-random-fusion.png",
  "brand/hirame/screens/en/05-library.png",
  "brand/hirame/screens/en/06-bridge.png",
  "brand/hirame/mascot.png",
];

for (const file of brandFiles) {
  if (!existsSync(join(outputDirectory, file))) failures.push(`${file}: ブランド画像が出力されていません`);
}

const htmlFiles = [];
function collectHtml(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(absolutePath);
    if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(absolutePath);
  }
}
collectHtml(outputDirectory);

const hrefPattern = /href="(\/[^"]*)"/g;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(image[0])) failures.push(`${file}: alt属性のない画像があります`);
  }
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (href.startsWith("/_next/") || href.startsWith("//")) continue;
    const pathname = href.split("#")[0].split("?")[0];
    if (!pathname) continue;
    const target = routeFile(pathname.endsWith("/") ? pathname : `${pathname}/`);
    const directTarget = join(outputDirectory, ...pathname.split("/").filter(Boolean));
    if (!existsSync(target) && !existsSync(directTarget)) {
      failures.push(`${file.replace(`${outputDirectory}\\`, "")}: リンク先 ${href} がありません`);
    }
  }
}

const rootHtml = readFileSync(routeFile("/"), "utf8");
if (!rootHtml.includes("<details")) failures.push("Header: モバイルメニューがありません");
// 2026-11 刷新：ヘッダーの Works はトップ内アンカー（/#works）から Works ページ（/works/）へ付け替えた
if (!rootHtml.includes('href="/works/"')) failures.push("Header: Works ページへのリンクがありません");
if (!rootHtml.includes('href="/privacy/"')) failures.push("Footer: Privacy一覧リンクがありません");
if (!rootHtml.includes('href="/terms/"')) failures.push("Footer: Terms一覧リンクがありません");

const englishRootHtml = readFileSync(routeFile("/en/"), "utf8");
if (!englishRootHtml.includes("Small ideas, built into useful products.")) failures.push("English Home: ブランドコピーがありません");
if (!englishRootHtml.includes('href="/en/works/"')) failures.push("English Header: Works ページへのリンクがありません");
if (!englishRootHtml.includes('href="https://hirame.mikaspark.com/en/privacy/"')) failures.push("English Footer: Privacyリンクがありません");
if (!englishRootHtml.includes('href="https://hirame.mikaspark.com/en/terms/"')) failures.push("English Footer: Termsリンクがありません");

// Works ページ：初期表示（Uzmera が正面）が静的HTMLに含まれ、4作品すべてへのリンクがあること
const worksPages = [
  ["/works/", "Uzmera", ["https://uzmera.mikaspark.com/", "https://hirame.mikaspark.com/", "https://apps.apple.com/jp/app/hirame/id6808982302", "https://mahou.mikaspark.com/", "https://line.me/S/sticker/37956024"], "ウズメちゃん"],
  ["/en/works/", "Uzmera", ["https://uzmera.mikaspark.com/", "https://hirame.mikaspark.com/en/", "https://apps.apple.com/jp/app/hirame/id6808982302", "https://mahou.mikaspark.com/", "https://line.me/S/sticker/37956024"], "Uzume-chan"],
];
for (const [route, firstWork, links, stickerName] of worksPages) {
  const worksHtml = readFileSync(routeFile(route), "utf8");
  if (!worksHtml.includes("<title>Works | Mika Spark Studio</title>")) failures.push(`${route}: タイトルがありません`);
  if (!worksHtml.includes('aria-roledescription="carousel"')) failures.push(`${route}: カルーセルがありません`);
  const detailTitle = worksHtml.match(/<h2 class="[^"]*detailTitle[^"]*">([^<]+)<\/h2>/);
  if (!detailTitle || detailTitle[1] !== firstWork) failures.push(`${route}: 初期表示の作品が ${firstWork} ではありません`);
  for (const href of links) if (!worksHtml.includes(`href="${href}"`)) failures.push(`${route}: ${href} へのリンクがありません`);
  if (!worksHtml.includes(stickerName)) failures.push(`${route}: LINEスタンプがありません`);
  if (!worksHtml.includes("/brand/logo-mark.png")) failures.push(`${route}: 中央モデルのロゴがありません`);
  for (const excluded of ["NeCosmos", "necosmos", "Revane"]) if (worksHtml.includes(excluded)) failures.push(`${route}: 掲載対象外の ${excluded} が含まれています`);
}
if (!rootHtml.includes('href="/works/"') || !englishRootHtml.includes('href="/en/works/"')) failures.push("Home: Works ページへの導線がありません");

// Hirame のページは Hirame-site（hirame.mikaspark.com）へ移転。内容の検証はそちらの verify-static で行う。
// ここでは旧URLからの 301 転送と、各ページからの導線を確認する。
const redirects = readFileSync(join(outputDirectory, "_redirects"), "utf8");
for (const [from, to] of [
  ["/apps/hirame/", "https://hirame.mikaspark.com/"],
  ["/apps/hirame/privacy/", "https://hirame.mikaspark.com/privacy/"],
  ["/apps/hirame/terms/", "https://hirame.mikaspark.com/terms/"],
  ["/apps/hirame/support/", "https://hirame.mikaspark.com/support/"],
  ["/en/apps/hirame/", "https://hirame.mikaspark.com/en/"],
  ["/en/apps/hirame/privacy/", "https://hirame.mikaspark.com/en/privacy/"],
  ["/en/apps/hirame/terms/", "https://hirame.mikaspark.com/en/terms/"],
  ["/en/apps/hirame/support/", "https://hirame.mikaspark.com/en/support/"],
]) {
  for (const source of [from, from.slice(0, -1)]) {
    if (!new RegExp(`^${source.replace(/[/.]/g, "\\$&")}\\s+${to.replace(/[/.]/g, "\\$&")}\\s+301$`, "m").test(redirects)) failures.push(`_redirects: ${source} → ${to} の301がありません`);
  }
}
if (/^\/apps\/hirame\/\*/m.test(redirects)) failures.push("_redirects: /apps/hirame/* のワイルドカードは app-ads.txt まで転送するので使わないこと");
if (!existsSync(join(outputDirectory, "apps", "hirame", "app-ads.txt"))) failures.push("apps/hirame/app-ads.txt: 出力されていません");
for (const route of ["/", "/en/"]) {
  const homeHtml = readFileSync(routeFile(route === "/" ? "/works/" : "/en/works/"), "utf8");
  const hirameUrl = route === "/" ? "https://hirame.mikaspark.com/" : "https://hirame.mikaspark.com/en/";
  if (!homeHtml.includes(`href="${hirameUrl}"`)) failures.push(`${route}: Hirame サイトへのリンクがありません`);
  if (homeHtml.includes("/apps/hirame/")) failures.push(`${route}: 旧 Hirame URL へのリンクが残っています`);
}
for (const [route, href] of [["/privacy/", "https://hirame.mikaspark.com/privacy/"], ["/terms/", "https://hirame.mikaspark.com/terms/"], ["/support/", "https://hirame.mikaspark.com/support/"], ["/en/support/", "https://hirame.mikaspark.com/en/support/"]]) {
  if (!readFileSync(routeFile(route), "utf8").includes(`href="${href}"`)) failures.push(`${route}: ${href} へのリンクがありません`);
}

for (const route of ["/", "/en/"]) {
  const homeHtml = readFileSync(routeFile(route), "utf8");
  if (homeHtml.includes("https://necosmos.mikaspark.com/")) failures.push(`${route}: NeCosmosへの導線が残っています`);
  // 2026-11: トップは部屋だけになり、グッズは /goods/ へ移した
  const goodsHtml = readFileSync(routeFile(route === "/" ? "/goods/" : "/en/goods/"), "utf8");
  if (!goodsHtml.includes("/brand/line-stickers/14_renshuushinasai.svg")) failures.push(`${route}goods/: グッズ（LINEスタンプ）がありません`);
  if (!goodsHtml.includes(route === "/" ? "ウズメちゃん LINEスタンプ" : "Uzume-chan LINE Stickers") || !goodsHtml.includes("¥120")) failures.push(`${route}goods/: グッズの商品名・価格がありません`);
  if (!goodsHtml.includes('href="https://line.me/S/sticker/37956024"')) failures.push(`${route}goods/: LINE STORE へのリンクがありません`);
  if (!goodsHtml.includes("/brand/line-stickers/16_ato1kai.svg")) failures.push(`${route}goods/: スタンプ全16種の一覧がありません`);
  if (!homeHtml.includes("https://www.instagram.com/mika_spark_studio/")) failures.push(`${route}: Instagramへの導線がありません`);
  if (!homeHtml.includes("https://x.com/MIKA_StReIn")) failures.push(`${route}: Xへの導線がありません`);
}

// トップの部屋（RoomHero）：About・Works・Support・Privacy へのリンクと、オブジェクト用の画像
for (const [route, links] of [["/", ["/about/", "/works/", "/support/", "/privacy/", "/goods/"]], ["/en/", ["/en/about/", "/en/works/", "/en/support/", "https://hirame.mikaspark.com/en/privacy/", "/en/goods/"]]]) {
  const homeHtml = readFileSync(routeFile(route), "utf8");
  if (!homeHtml.includes('aria-labelledby="room-title"')) failures.push(`${route}: トップの部屋がありません`);
  for (const href of links) if (!homeHtml.includes(`href="${href}"`)) failures.push(`${route}: 部屋から ${href} へのリンクがありません`);
  for (const image of ["/brand/logo-mark.png", "/brand/logo-mark-green.png", "/brand/room/support-hands.png"]) {
    if (!homeHtml.includes(image)) failures.push(`${route}: 部屋の画像 ${image} がありません`);
  }
}

const sitemapXml = readFileSync(join(outputDirectory, "sitemap.xml"), "utf8");
for (const [, englishRoute] of localizedRoutePairs) {
  if (!sitemapXml.includes(`<loc>https://mikaspark.com${englishRoute}</loc>`)) failures.push(`sitemap: ${englishRoute} がありません`);
}
if (!sitemapXml.includes('hreflang="en"')) failures.push("sitemap: en hreflangがありません");

if (failures.length > 0) {
  console.error("静的出力の検証に失敗しました:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`静的出力を検証しました: ${routes.length}ルート、${htmlFiles.length} HTML、リンク切れなし`);
