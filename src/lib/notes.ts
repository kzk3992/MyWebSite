import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * 開発ノート（コラム）の正本は src/content/notes/*.md。
 * ファイル名（拡張子なし）がそのままスラッグ＝URLになる。
 * front matter: title / date (YYYY-MM-DD) / description の3つが必須。
 * 投稿フローは docs/notes-pipeline.md を参照。
 */
export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

const notesDirectory = join(process.cwd(), "src", "content", "notes");

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): string {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    '<img src="$2" alt="$1" loading="lazy" />',
  );
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return html;
}

/**
 * コラム用の最小Markdownレンダラ（依存追加なし）。
 * 対応: ##〜#### 見出し / 段落 / - ・ 1. リスト / > 引用 / ``` コード / --- 罫線 /
 * 画像（単独行は段落で包む）/ **太字** / `コード` / [リンク](url) / ![画像](url)。
 * HTMLは必ずエスケープしてから変換するので、生HTMLは書けない。
 */
export function renderMarkdown(markdown: string): string {
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let code: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      const tag = list.ordered ? "ol" : "ul";
      blocks.push(
        `<${tag}>${list.items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</${tag}>`,
      );
      list = null;
    }
  };

  for (const line of markdown.split("\n")) {
    if (code !== null) {
      if (line.startsWith("```")) {
        blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = null;
      } else {
        code.push(line);
      }
      continue;
    }
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      code = [];
      continue;
    }
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = trimmed.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push("<hr />");
      continue;
    }
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push(`<blockquote><p>${renderInline(trimmed.slice(2))}</p></blockquote>`);
      continue;
    }
    const unordered = trimmed.match(/^[-*]\s+(.*)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.*)$/);
    if (unordered || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) {
        flushList();
        list = { ordered: isOrdered, items: [] };
      }
      list?.items.push((unordered ?? ordered)?.[1] ?? "");
      continue;
    }
    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      blocks.push(
        `<p><img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}" loading="lazy" /></p>`,
      );
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  if (code !== null) {
    blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
  }
  return blocks.join("\n");
}

export function getAllNotes(): NoteMeta[] {
  return readdirSync(notesDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "");
      const { meta } = parseFrontMatter(
        readFileSync(join(notesDirectory, name), "utf8"),
      );
      return {
        slug,
        title: meta.title ?? slug,
        date: meta.date ?? "",
        description: meta.description ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getNote(slug: string): { meta: NoteMeta; html: string } | null {
  const meta = getAllNotes().find((note) => note.slug === slug);
  if (!meta) return null;
  const raw = readFileSync(join(notesDirectory, `${slug}.md`), "utf8");
  const { body } = parseFrontMatter(raw);
  return { meta, html: renderMarkdown(body) };
}
