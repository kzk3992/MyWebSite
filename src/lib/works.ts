import type { WorkDetailData } from "@/app/(ja)/works/detail";
import { siteConfig } from "@/config/site";
import { workData as hirame } from "@/content/works/hirame";
import { workData as mahou } from "@/content/works/mahou";
import { workData as uzmera } from "@/content/works/uzmera";
import { workData as uzumeStamps } from "@/content/works/uzume-stamps";

/** Works詳細ページのデータ正本は src/content/works/<slug>.ts。ページとMarkdown版で共用する。 */
export const worksBySlug: Record<string, WorkDetailData> = {
  uzmera,
  hirame,
  mahou,
  "uzume-stamps": uzumeStamps,
};

/** Works詳細ページのMarkdown版（/works/<slug>.md 用）をデータから生成する。 */
export function renderWorkMarkdown(slug: string, data: WorkDetailData): string {
  const lines: string[] = [
    `# ${data.name}`,
    "",
    data.lead,
    "",
    ...data.meta.map(([term, value]) => `- ${term}: ${value}`),
    "",
    `## ${data.overviewTitle}`,
    "",
  ];
  if (data.fact) lines.push(data.fact, "");
  for (const paragraph of data.overview) lines.push(paragraph, "");
  if (data.features?.length) {
    lines.push("## 特徴", "");
    for (const feature of data.features) {
      lines.push(`- **${feature.name}**: ${feature.text}`);
    }
    lines.push("");
  }
  for (const extra of data.extras ?? []) {
    lines.push(`## ${extra.title}`, "");
    for (const paragraph of extra.paragraphs) lines.push(paragraph, "");
  }
  lines.push("## リンク", "");
  for (const link of data.links) {
    lines.push(`- [${link.label}](${link.href}): ${link.description}`);
  }
  lines.push("", `元ページ: ${siteConfig.baseUrl}/works/${slug}/`, "");
  return lines.join("\n");
}
