import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { pathToParts, SUPPORTED_LOCALES } from "../../../../lib/content";

const COLLECTIONS = ["skills", "agents", "hooks", "mcp", "workflows", "guides", "prompts", "rules"] as const;
const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter((l) => l !== "en");

export async function getStaticPaths() {
  const paths = [];
  for (const col of COLLECTIONS) {
    const entries = await getCollection(col as Parameters<typeof getCollection>[0]);
    for (const entry of entries) {
      const { locale, path } = pathToParts(entry.id);
      if (!NON_DEFAULT_LOCALES.includes(locale)) continue;
      paths.push({
        params: { lang: locale, collection: col, slug: path },
        props: { body: (entry as { body?: string }).body ?? "", slug: path.split("/").pop() ?? "content" },
      });
    }
  }
  return paths;
}

export const GET: APIRoute = ({ props }) => {
  return new Response(props.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${props.slug}.md"`,
    },
  });
};
