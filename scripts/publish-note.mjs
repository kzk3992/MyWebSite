#!/usr/bin/env node
/**
 * 開発ノートの公開スクリプト（Mac上のリポジトリ clone で実行する）。
 *
 * 使い方:
 *   node scripts/publish-note.mjs <下書き.md のパス>
 *
 * 前提:
 * - カレントブランチが redesign（本番ブランチ）であること
 * - 下書きのファイル名がそのままスラッグになる（例: 2026-11-26-nagano-station-angle.md）
 * - front matter に title / date / description があること
 * - 画像は先に public/notes/<スラッグ>/ へ置いておくこと
 *
 * 処理:
 *   検証 → src/content/notes/ へ配置 → npm run check → commit → push →
 *   https://mikaspark.com/notes/<スラッグ>/ が 200 でタイトルを含むまで確認
 *
 * 注意: 承認なしに実行しないこと。公開フロー全体は docs/notes-pipeline.md を参照。
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const draftPath = process.argv[2];
if (!draftPath) {
  console.error("usage: node scripts/publish-note.mjs <draft.md>");
  process.exit(1);
}

const branch = execFileSync("git", ["branch", "--show-current"], {
  encoding: "utf8",
}).trim();
if (branch !== "redesign") {
  console.error(`本番ブランチ redesign で実行してください（現在: ${branch}）`);
  process.exit(1);
}

const raw = readFileSync(draftPath, "utf8");
const frontMatter = raw.match(/^---\n([\s\S]*?)\n---/);
if (!frontMatter) {
  console.error("front matter（--- で囲んだ title/date/description）がありません");
  process.exit(1);
}
for (const key of ["title", "date", "description"]) {
  if (!new RegExp(`^${key}:`, "m").test(frontMatter[1])) {
    console.error(`front matter に ${key} がありません`);
    process.exit(1);
  }
}
const title = frontMatter[1].match(/^title:\s*(.+)$/m)[1].trim();

const slug = basename(draftPath).replace(/\.md$/, "");
const destination = join(process.cwd(), "src", "content", "notes", `${slug}.md`);
if (existsSync(destination)) {
  console.error(`既に存在します: ${destination}（上書きはしません）`);
  process.exit(1);
}
copyFileSync(draftPath, destination);
console.log(`配置: ${destination}`);

const run = (command, args) =>
  execFileSync(command, args, { stdio: "inherit" });

run("npm", ["run", "check"]);
run("git", ["add", destination]);
run("git", ["commit", "-m", `Add note: ${title}`]);
run("git", ["push", "origin", "redesign"]);

const url = `https://mikaspark.com/notes/${slug}/`;
console.log(`公開確認中: ${url}`);
for (let attempt = 0; attempt < 20; attempt += 1) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    if (response.ok && body.includes(title)) {
      console.log("公開確認 PASS");
      process.exit(0);
    }
  } catch {
    // デプロイ中は接続できないことがある。そのまま再試行する。
  }
  await new Promise((resolve) => setTimeout(resolve, 15000));
}
console.error("公開確認がタイムアウトしました。手動で確認してください。");
process.exit(1);
