import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  urlForEntry,
  titleFromEntry,
  descriptionFromEntry,
  groupByLocale,
  SUPPORTED_LOCALES,
} from "../lib/content";
import type { Locale } from "../lib/content";

const SITE_URL = "https://claudient.tools";

const MAX_PER_BUCKET = 100;

const SECTIONS: Array<{
  key: string;
  label: string;
}> = [
  { key: "skills", label: "Skills" },
  { key: "agents", label: "Agents" },
  { key: "hooks", label: "Hooks" },
  { key: "mcp", label: "MCP Servers" },
  { key: "workflows", label: "Workflows" },
  { key: "guides", label: "Guides" },
  { key: "prompts", label: "Prompts" },
  { key: "rules", label: "Rules" },
];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  nl: "Nederlands",
  es: "Español",
};

export const GET: APIRoute = async () => {
  const lines: string[] = [
    "# Claudient — Claude Code Knowledge Base",
    "",
    "> The Claude Code knowledge base — skills, agents, hooks, MCP configs, workflows, guides, and prompts. Open source, free to use.",
    "",
    `> ${SITE_URL}`,
    "",
  ];

  // Pre-fetch all collections grouped by locale
  const sectionData: Array<{
    key: string;
    label: string;
    byLocale: Map<Locale, ReturnType<typeof titleFromEntry>[]>;
    entriesByLocale: Map<Locale, Array<{ title: string; url: string; desc: string }>>;
  }> = [];

  for (const section of SECTIONS) {
    const entries = await getCollection(
      section.key as Parameters<typeof getCollection>[0],
      ({ data }) => !data.draft,
    );

    const localeMap = groupByLocale(entries);
    const entriesByLocale = new Map<Locale, Array<{ title: string; url: string; desc: string }>>();

    for (const locale of SUPPORTED_LOCALES) {
      const localeEntries = localeMap.get(locale) ?? [];
      const sorted = [...localeEntries].sort((a, b) =>
        titleFromEntry(a).localeCompare(titleFromEntry(b)),
      );
      const truncated = sorted.slice(0, MAX_PER_BUCKET);
      const mapped = truncated.map((entry) => {
        const title = titleFromEntry(entry);
        const rawDesc = descriptionFromEntry(entry, 120);
        const desc = rawDesc
          ? rawDesc.slice(0, 100) + (rawDesc.length > 100 ? "…" : "")
          : "";
        const url = `${SITE_URL}${urlForEntry(section.key, entry)}`;
        return { title, url, desc };
      });
      if (mapped.length > 0) {
        entriesByLocale.set(locale, mapped);
      }
    }

    sectionData.push({
      key: section.key,
      label: section.label,
      byLocale: new Map(),
      entriesByLocale,
    });
  }

  // Emit per-locale sections in SUPPORTED_LOCALES order
  for (const locale of SUPPORTED_LOCALES) {
    const localeLabel = LOCALE_LABELS[locale];
    let localeHasContent = false;

    // Check if any section has content for this locale
    for (const sd of sectionData) {
      if ((sd.entriesByLocale.get(locale) ?? []).length > 0) {
        localeHasContent = true;
        break;
      }
    }

    if (!localeHasContent) continue;

    lines.push(`## ${localeLabel}`);
    lines.push("");

    for (const sd of sectionData) {
      const entries = sd.entriesByLocale.get(locale) ?? [];
      if (entries.length === 0) continue;

      lines.push(`### ${sd.label}`);
      lines.push("");

      for (const { title, url, desc } of entries) {
        const suffix = desc ? `: ${desc}` : "";
        lines.push(`- [${title}](${url})${suffix}`);
      }

      lines.push("");
    }
  }

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
