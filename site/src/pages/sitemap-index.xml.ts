import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  urlForEntry,
  parseLocaleFromId,
  localesForPath,
  localePrefix,
  SUPPORTED_LOCALES,
} from "../lib/content";
import type { Locale } from "../lib/content";

const SITE_URL = "https://claudient.tools";

const COLLECTIONS = [
  "skills",
  "agents",
  "hooks",
  "mcp",
  "workflows",
  "guides",
  "prompts",
  "rules",
] as const;

/** Static pages — no hreflang alternates (English-only) */
const STATIC_PATHS = [
  "/",
  "/skills/",
  "/agents/",
  "/hooks/",
  "/mcp/",
  "/workflows/",
  "/guides/",
  "/prompts/",
  "/rules/",
  "/install/",
  "/about/",
];

function hreflangUrl(canonicalPath: string, locale: Locale): string {
  return `${SITE_URL}${localePrefix(locale)}/${canonicalPath}/`;
}

function buildAlternates(
  canonicalPath: string,
  availableLocales: Locale[],
): string {
  const lines: string[] = [];
  for (const locale of availableLocales) {
    const href = hreflangUrl(canonicalPath, locale);
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`,
    );
  }
  // x-default points to English (no prefix)
  lines.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${canonicalPath}/"/>`,
  );
  return lines.join("\n");
}

export const GET: APIRoute = async () => {
  // ---- Static pages (no alternates) ----
  const staticUrlTags = STATIC_PATHS.map(
    (p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`,
  ).join("\n");

  // ---- Dynamic content entries ----
  // Gather all entries across every collection, keyed by collection name.
  type CollectionName = (typeof COLLECTIONS)[number];

  interface EntryInfo {
    collection: CollectionName;
    canonicalPath: string;
    locale: Locale;
    url: string;
  }

  const allEntryInfos: EntryInfo[] = [];

  for (const col of COLLECTIONS) {
    const entries = await getCollection(col, ({ data }) => !data.draft);
    for (const entry of entries) {
      const { locale, cleanPath } = parseLocaleFromId(entry.id);
      const url = `${SITE_URL}${urlForEntry(col, entry)}`;
      allEntryInfos.push({ collection: col, canonicalPath: cleanPath, locale, url });
    }
  }

  // Build a map: collection+canonicalPath → set of locales that have a translation
  const pathLocaleMap = new Map<string, Set<Locale>>();
  for (const info of allEntryInfos) {
    const key = `${info.collection}::${info.canonicalPath}`;
    const set = pathLocaleMap.get(key) ?? new Set<Locale>();
    set.add(info.locale);
    pathLocaleMap.set(key, set);
  }

  // Emit one <url> per (collection, canonicalPath, locale) with full hreflang siblings
  const dynamicUrlTags: string[] = [];

  for (const info of allEntryInfos) {
    const key = `${info.collection}::${info.canonicalPath}`;
    const availableLocales = [...(pathLocaleMap.get(key) ?? new Set<Locale>())];

    // Sort locales in SUPPORTED_LOCALES order for determinism
    availableLocales.sort(
      (a, b) =>
        SUPPORTED_LOCALES.indexOf(a) - SUPPORTED_LOCALES.indexOf(b),
    );

    let urlBlock: string;
    if (availableLocales.length > 1) {
      const alternates = buildAlternates(
        `${info.collection}/${info.canonicalPath}`,
        availableLocales,
      );
      urlBlock = `  <url>\n    <loc>${info.url}</loc>\n${alternates}\n  </url>`;
    } else {
      urlBlock = `  <url>\n    <loc>${info.url}</loc>\n  </url>`;
    }

    dynamicUrlTags.push(urlBlock);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticUrlTags}
${dynamicUrlTags.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
