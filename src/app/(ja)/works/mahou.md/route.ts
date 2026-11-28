import { renderWorkMarkdown, worksBySlug } from "@/lib/works";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderWorkMarkdown("mahou", worksBySlug["mahou"]), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
