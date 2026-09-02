import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");

const routes = [
  "/",
  "/apps/hirame/",
  "/apps/hirame/privacy/",
  "/apps/hirame/terms/",
  "/apps/hirame/support/",
  "/about/",
  "/support/",
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

for (const requiredFile of ["404.html", "robots.txt", "sitemap.xml"]) {
  if (!existsSync(join(outputDirectory, requiredFile))) {
    failures.push(`${requiredFile}: 出力されていません`);
  }
}

const brandFiles = [
  "brand/header.jpg",
  "brand/logo.png",
  "brand/logo-white.png",
  "brand/icons/wolf.png",
  "brand/icons/spark.png",
  "brand/icons/paw.png",
  "brand/icons/power.png",
  "brand/icons/arrow-left.png",
  "brand/icons/arrow-right.png",
  "brand/hirame/app-icon.jpg",
  "brand/hirame/home.jpg",
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

const hirameHtml = readFileSync(routeFile("/apps/hirame/"), "utf8");
for (const href of ["/apps/hirame/privacy/", "/apps/hirame/terms/", "/apps/hirame/support/"]) {
  if (!hirameHtml.includes(`href="${href}"`)) failures.push(`Hirame: ${href} へのリンクがありません`);
}

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
