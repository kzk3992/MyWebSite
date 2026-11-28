import { renderWorkMarkdown, worksBySlug } from "@/lib/works";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderWorkMarkdown("uzume-stamps", worksBySlug["uzume-stamps"]), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
