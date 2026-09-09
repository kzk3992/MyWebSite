import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");

const routes = [
  "/",
  "/apps/hirame/",
  "/apps/hirame/privacy/",
  "/apps/hirame/terms/",
  "/apps/hirame/support/",
  "/privacy/",
  "/terms/",
  "/about/",
  "/support/",
  "/en/",
  "/en/apps/hirame/",
  "/en/apps/hirame/privacy/",
  "/en/apps/hirame/terms/",
  "/en/apps/hirame/support/",
  "/en/about/",
  "/en/support/",
];

const localizedRoutePairs = [
  ["/", "/en/"],
  ["/apps/hirame/", "/en/apps/hirame/"],
  ["/apps/hirame/privacy/", "/en/apps/hirame/privacy/"],
  ["/apps/hirame/terms/", "/en/apps/hirame/terms/"],
  ["/apps/hirame/support/", "/en/apps/hirame/support/"],
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

for (const requiredFile of ["404.html", "robots.txt", "sitemap.xml"]) {
  if (!existsSync(join(outputDirectory, requiredFile))) {
    failures.push(`${requiredFile}: 出力されていません`);
  }
}

const brandFiles = [
  "brand/header.jpg",
  "brand/hero-wolf.jpg",
  "brand/logo.png",
  "brand/logo-white.png",
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
if (!rootHtml.includes('href="/#works"')) failures.push("Header: Worksリンクがありません");
if (!rootHtml.includes('href="/privacy/"')) failures.push("Footer: Privacy一覧リンクがありません");
if (!rootHtml.includes('href="/terms/"')) failures.push("Footer: Terms一覧リンクがありません");

const englishRootHtml = readFileSync(routeFile("/en/"), "utf8");
if (!englishRootHtml.includes("Small ideas, built into useful products.")) failures.push("English Home: ブランドコピーがありません");
if (!englishRootHtml.includes('href="/en/#works"')) failures.push("English Header: Worksリンクがありません");
if (!englishRootHtml.includes('href="/en/apps/hirame/privacy/"')) failures.push("English Footer: Privacyリンクがありません");
if (!englishRootHtml.includes('href="/en/apps/hirame/terms/"')) failures.push("English Footer: Termsリンクがありません");

const hirameHtml = readFileSync(routeFile("/apps/hirame/"), "utf8");
for (const href of ["/apps/hirame/privacy/", "/apps/hirame/terms/", "/apps/hirame/support/"]) {
  if (!hirameHtml.includes(`href="${href}"`)) failures.push(`Hirame: ${href} へのリンクがありません`);
}
if (!hirameHtml.includes("BRIDGE")) failures.push("Hirame: BRIDGEの表記がありません");
if (!hirameHtml.includes("Random Fusion")) failures.push("Hirame: Random Fusionの表記がありません");
if (!hirameHtml.includes("AI Assist")) failures.push("Hirame: AI Assistの表記がありません");
if (!hirameHtml.includes("制約が、ひらめきを生む。")) failures.push("Hirame: 新しいメインコピーがありません");
if (!hirameHtml.includes("発想する力を日常的に鍛える")) failures.push("Hirame: 発想トレーニングの説明がありません");
if (!hirameHtml.includes("アイデアを自分で生み出す体験を中心に")) failures.push("Hirame: 自分で考えるという説明がありません");
if (!hirameHtml.includes("Apple Intelligence")) failures.push("Hirame: AI支援の説明がありません");
if (hirameHtml.includes("ひらめきを、習慣に。")) failures.push("Hirame: 旧メインコピーが残っています");

const privacyHtml = readFileSync(routeFile("/apps/hirame/privacy/"), "utf8");
for (const text of ["CloudKitプライベートデータベース", "Foundation Models", "Firebase Analytics", "Google Mobile Ads SDK", "Google User Messaging Platform", "端末ID", "トラッキング", "プライバシー設定", "買い切り型の「Ad-Free」"]) {
  if (!privacyHtml.includes(text)) failures.push(`Hirame Privacy: ${text} の説明がありません`);
}

const termsHtml = readFileSync(routeFile("/apps/hirame/terms/"), "utf8");
for (const text of ["AI支援機能", "買い切り型の「Ad-Free」", "Google AdMob"] ) {
  if (!termsHtml.includes(text)) failures.push(`Hirame Terms: ${text} の説明がありません`);
}

const hirameSupportHtml = readFileSync(routeFile("/apps/hirame/support/"), "utf8");
for (const text of ["iCloud同期を使わずに利用できますか？", "AI機能はどのように動作しますか？", "購入状態はどのように管理されますか？"]) {
  if (!hirameSupportHtml.includes(text)) failures.push(`Hirame Support: ${text} がありません`);
}

const hirameScreenshots = [
  "/brand/hirame/screens/01-concept.png",
  "/brand/hirame/screens/02-note.png",
  "/brand/hirame/screens/03-with-ai.png",
  "/brand/hirame/screens/04-random-fusion.png",
  "/brand/hirame/screens/05-library.png",
  "/brand/hirame/screens/06-association.png",
];
let previousScreenshotIndex = hirameHtml.indexOf('aria-label="Hirame アプリ画面"');
if (previousScreenshotIndex === -1) failures.push("Hirame: スクリーンショット一覧がありません");
for (const screenshot of hirameScreenshots) {
  const screenshotIndex = hirameHtml.indexOf(`src="${screenshot}"`, previousScreenshotIndex + 1);
  if (screenshotIndex === -1) {
    failures.push(`Hirame: スクリーンショット ${screenshot} が番号順に表示されていません`);
    break;
  }
  previousScreenshotIndex = screenshotIndex;
}

const englishHirameHtml = readFileSync(routeFile("/en/apps/hirame/"), "utf8");
if (!englishHirameHtml.includes("Hirame: Idea Trainer")) failures.push("English Hirame: 新しい英語アプリ名がありません");
for (const text of ["Turn constraints into ideas.", "Idea Note", "Random Fusion", "BRIDGE", "Think with AI", "Reverse Thinking", "Constraint Ideation", "Analogy Thinking"]) {
  if (!englishHirameHtml.includes(text)) failures.push(`English Hirame: ${text} がありません`);
}
for (const href of ["/en/apps/hirame/privacy/", "/en/apps/hirame/terms/", "/en/apps/hirame/support/"]) {
  if (!englishHirameHtml.includes(`href="${href}"`)) failures.push(`English Hirame: ${href} へのリンクがありません`);
}

const englishHirameScreenshots = [
  "/brand/hirame/screens/en/01-concept.png",
  "/brand/hirame/screens/en/02-note.png",
  "/brand/hirame/screens/en/03-with-ai.png",
  "/brand/hirame/screens/en/04-random-fusion.png",
  "/brand/hirame/screens/en/05-library.png",
  "/brand/hirame/screens/en/06-bridge.png",
];
let previousEnglishScreenshotIndex = englishHirameHtml.indexOf('aria-label="Hirame app screens"');
if (previousEnglishScreenshotIndex === -1) failures.push("English Hirame: スクリーンショット一覧がありません");
for (const screenshot of englishHirameScreenshots) {
  const screenshotIndex = englishHirameHtml.indexOf(`src="${screenshot}"`, previousEnglishScreenshotIndex + 1);
  if (screenshotIndex === -1) {
    failures.push(`English Hirame: スクリーンショット ${screenshot} が対応順に表示されていません`);
    break;
  }
  previousEnglishScreenshotIndex = screenshotIndex;
}

const englishPrivacyHtml = readFileSync(routeFile("/en/apps/hirame/privacy/"), "utf8");
for (const text of ["Information Not Collected", "Firebase Analytics", "Google Mobile Ads SDK", "Google User Messaging Platform", "device ID", "tracking", "Privacy Choices", "CloudKit private database", "Foundation Models", "Data Retention", "Data Deletion", "Responsible Operator", "support@mikaspark.com"]) {
  if (!englishPrivacyHtml.includes(text)) failures.push(`English Privacy: ${text} がありません`);
}

const englishTermsHtml = readFileSync(routeFile("/en/apps/hirame/terms/"), "utf8");
for (const text of ["Prohibited Conduct", "User-Created Content", "AI Assistance", "In-App Purchases", "Advertising", "Governing Law and Jurisdiction", "Responsible Operator", "support@mikaspark.com"]) {
  if (!englishTermsHtml.includes(text)) failures.push(`English Terms: ${text} がありません`);
}

const englishSupportHtml = readFileSync(routeFile("/en/apps/hirame/support/"), "utf8");
for (const text of ["Frequently asked questions", "Do I need to create an account?", "How do the AI features work?", "Contact support", "support@mikaspark.com"]) {
  if (!englishSupportHtml.includes(text)) failures.push(`English Hirame Support: ${text} がありません`);
}

const sitemapXml = readFileSync(join(outputDirectory, "sitemap.xml"), "utf8");
for (const [, englishRoute] of localizedRoutePairs) {
  if (!sitemapXml.includes(`<loc>https://mikaspark.com${englishRoute}</loc>`)) failures.push(`sitemap: ${englishRoute} がありません`);
}
if (!sitemapXml.includes('hreflang="en"')) failures.push("sitemap: en hreflangがありません");

const configSource = readFileSync(join(process.cwd(), "src", "config", "site.ts"), "utf8");
const supportMatch = configSource.match(/supportEmail:\s*"([^"]+)"/);
if (!supportMatch) {
  failures.push("site.ts: supportEmailが設定されていません");
} else {
  const supportHtml = readFileSync(routeFile("/apps/hirame/support/"), "utf8");
  if (!supportHtml.includes(supportMatch[1])) {
    failures.push("Hirame Support: 設定ファイルのsupportEmailが使われていません");
  }
}

if (failures.length > 0) {
  console.error("静的出力の検証に失敗しました:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`静的出力を検証しました: ${routes.length}ルート、${htmlFiles.length} HTML、リンク切れなし`);
