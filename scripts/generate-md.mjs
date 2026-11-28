// ビルド後に out/notes/<slug>.md として記事のMarkdown版を書き出す（AI向け）。
// 正本は src/content/notes/*.md。front matterを除き、タイトル・公開日・元ページURLのヘッダを付ける。
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const baseUrl = "https://mikaspark.com";
const notesDirectory = join(process.cwd(), "src", "content", "notes");
const outDirectory = join(process.cwd(), "out", "notes");
mkdirSync(outDirectory, { recursive: true });

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index > 0) {
      meta[line.slice(0, index).trim()] = line
        .slice(index + 1)
        .trim()
        .replace(/^"|"$/g, "");
    }
  }
  return { meta, body: raw.slice(match[0].length) };
}

for (const name of readdirSync(notesDirectory)) {
  if (!name.endsWith(".md")) continue;
  const slug = name.replace(/\.md$/, "");
  const { meta, body } = parseFrontMatter(
    readFileSync(join(notesDirectory, name), "utf8"),
  );
  const markdown = [
    `# ${meta.title ?? slug}`,
    "",
    `- 公開日: ${meta.date ?? ""}`,
    `- 元ページ: ${baseUrl}/notes/${slug}/`,
    "",
    body.trim(),
    "",
  ].join("\n");
  writeFileSync(join(outDirectory, `${slug}.md`), markdown);
  console.log(`generate-md: out/notes/${slug}.md`);
}
