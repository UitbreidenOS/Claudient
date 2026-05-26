# Claudient Website — Development Strategy

> This is the single planning document for the Claudient web property. It is not code. It is a working brief another engineer (or future-you) can execute against. The goal is to build something modeled on [openalternative.co](https://openalternative.co/) — a fast, content-heavy, SEO-first directory — but adapted to Claudient's specific shape: the repo is already the content database, and the runway is "as cheap as possible while staying excellent."

Status: planning. No code written yet. Current `web/` (Next.js scaffolding from May 2026) is queued for deletion after a single asset rescue.

---

## 1. Executive Summary

**Goal.** Ship `claudient.tools` (working name; final domain TBD) — a public-facing directory of every skill, agent, hook, MCP config, workflow, guide, and prompt in this repo. Built for two audiences in equal measure:

1. **Developers and operators** who land on a Google/Perplexity/Claude-search result for "Claude for [X]" and need an answer in 2 seconds and an install command in 10.
2. **Contributors** who want to see their submission live, indexed, and discoverable inside 24 hours of a merged PR.

**Constraints.**
- Operating cost target: **under $20/month** all-in (excluding the domain itself). Stretch: $0/month on free tiers indefinitely.
- Build cost: this is a side-of-desk project. The first usable version ships in a working week, not a quarter.
- The repo's existing markdown content (~280 skills, ~95 agents, ~30 hooks, ~30 MCP configs, ~55 guides, ~25 workflows, ~15 prompts, all in 5 languages) must rebuild the site on every merge, with zero manual content sync.

**Non-goals (for v1).**
- No user accounts, no login, no comments, no submissions through the site itself (those happen via GitHub PR — the canonical author experience for this repo).
- No backend database. The repo is the database.
- No paid tier or featured-placement product. Defer monetization to v2 if it ever becomes relevant.

**The bet.** A static-first stack ingesting markdown at build time will outperform openalternative.co's own Next.js+Postgres stack on cost, speed, and operational simplicity — while serving a deeper content tail (Claudient already has ~500 indexable pages worth of content; openalternative.co has roughly 1,200 tools). The structural pattern is identical; the implementation can be 10x cheaper because we don't need the database.

---

## 2. Why openalternative.co as the Reference

openalternative.co is the cleanest reference in this category because it solved the same structural problems we face:

| Problem they solved | How they solved it | What we adopt |
|---|---|---|
| Discoverable directory of many items | Categorized landing pages + search + clean detail pages | Same pattern, applied to skills/agents/hooks |
| Per-item SEO | Each item has its own page with structured data | Same — every `.md` file becomes a page with `SoftwareApplication` schema |
| Live data (GitHub stars) | Background sync from GitHub API | Same — show npm download counts and GitHub stars per item |
| Trust signal | Open source on GitHub, MIT licensed | Same — site code lives in this repo, fully open |
| Discovery surface | Newsletter, RSS, sitemap | Same — Buttondown newsletter, RSS feed, sitemap.xml |
| Submission flow | Web form → review queue | Different — PR-based, since our content already lives in git |

What we do **better** than openalternative.co:
- **Deeper per-page content.** Each Claudient skill is 150-400 lines of rich operator-grade markdown. openalternative.co listings are 1-3 paragraphs. The per-page content gives us long-tail SEO advantages they can't match.
- **5-language native.** openalternative.co is English-only. Claudient ships in EN/FR/DE/NL/ES already, so the site should ship in 5 languages from day one.
- **Direct install integration.** Every page has a copy-able `npx claudient add ...` command. The site converts traffic to package installs without leaving the page.
- **AI-native.** A built-in "Ask Claude which skill to use" surface (Phase 3) turns the directory itself into a discovery agent. openalternative.co doesn't do this.

What we explicitly do **not** copy:
- The Postgres + Prisma backend. Overkill for our shape.
- The paid placement / boosted listings product. Misaligned with our community positioning.
- The Vercel deployment. We use Cloudflare Pages instead (cheaper, faster edge).

---

## 3. Scope: What the Site Is and Isn't

**What the site IS in v1:**
- A static directory of every skill, agent, hook, MCP config, workflow, guide, and prompt
- 5-language native (EN/FR/DE/NL/ES) via subdirectory routing
- SEO-first: every page indexable, every page with structured data, every page in the sitemap
- Search across all content (static, no API)
- Vertical landing pages ("Claude for solopreneurs", "Claude for ecommerce", etc.) re-rendering the existing guide content
- Newsletter signup
- RSS feeds (per category + global)
- llms.txt for AI-search engine consumption
- Auto-deploys on every push to `main`

**What the site IS NOT in v1:**
- A web app. No interactivity beyond search and copy buttons.
- A login/account surface. No user state on the server.
- A submission portal. Submissions remain PR-based.
- A blog. Defer to v2 if it earns its place.
- A monetization surface. No featured listings, no ads, no paid tier.

**What v2 might add (after measurement, not before):**
- An AI chat interface ("Which skill do I need?") backed by Claude API with prompt caching
- A community showcase ("Built with Claudient") for users to submit
- A blog or essay surface for distribution content
- Comparison pages (`/compare/[skill-a]-vs-[skill-b]`) — SEO gold for vendor-vs-vendor queries

---

## 4. Stack Decision Matrix

This is the most consequential call in the plan. Three credible stacks, evaluated honestly.

### Option A — Astro + Cloudflare Pages (recommended)

**Stack.**
- [Astro 5+](https://astro.build/) with Content Collections (markdown ingestion native)
- Tailwind CSS 4 (utility-first, zero runtime cost)
- MDX for content (embed React/Svelte components inside markdown when needed)
- [Pagefind](https://pagefind.app/) for static-site search (zero infra)
- [Cloudflare Pages](https://pages.cloudflare.com/) for hosting (unlimited bandwidth on free tier)
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (privacy-friendly, free)
- [Buttondown](https://buttondown.com/) for newsletter (free up to 100 subscribers, $9/month thereafter)
- Custom domain via Cloudflare DNS (no SSL fee)

**Pros.**
- Astro generates pure static HTML by default. Pages load in <100ms cold.
- Content Collections API was literally built for markdown-driven directory sites. Type-safe schemas on the frontmatter.
- Islands architecture: ship JS only for components that need it (search box, copy button), zero JS everywhere else.
- Cloudflare Pages free tier is honestly free: unlimited bandwidth, unlimited requests, 500 builds/month, 100 deployments per project. Vercel's free tier caps bandwidth at 100GB and serverless function invocations at 100K — Cloudflare doesn't cap either.
- Builds are fast (Astro compiles ~500 markdown files in 20-40 seconds).
- The community is large enough that hiring help later is feasible.

**Cons.**
- Astro is younger than Next.js. Some patterns (advanced i18n) require more glue.
- No server-side dynamic features without adding a Cloudflare Worker (which is fine, but adds complexity).
- Hot reload is slower than Vite-pure setups on very large content trees.

**Cost.**
- $0/month at our scale, indefinitely. The free tier covers far more traffic than we'll generate in year one.

### Option B — Next.js + Vercel (the openalternative.co stack)

**Stack.**
- Next.js 15+ (App Router, SSG mode)
- Same Tailwind/MDX/etc.
- Vercel hosting
- Same analytics/newsletter/etc.

**Pros.**
- The largest ecosystem. Every plugin, every component library, every help-StackOverflow answer.
- React-native. If we ever need a real web app (Phase 5+), the path is smooth.
- ISR (Incremental Static Regeneration) if we ever want server-rendered dynamic pages.
- The reference site (openalternative.co) is built with this exact stack, so we can study its open-source code directly.

**Cons.**
- More JavaScript shipped to the client than Astro for the same UI. Lighthouse scores will be lower by default.
- Vercel free tier is generous but capped (100GB bandwidth, 100K serverless invocations). Hit those caps and you're at $20/month minimum.
- Build times grow faster than Astro at large content volumes.
- Heavier framework — more concept overhead for a fundamentally simple static directory.

**Cost.**
- $0/month at low traffic. Could become $20+/month at moderate traffic if any function-driven feature ships.

### Option C — Hugo + Cloudflare Pages

**Stack.**
- [Hugo](https://gohugo.io/) — Go-based static site generator
- Tailwind CSS via PostCSS
- Cloudflare Pages

**Pros.**
- The fastest static site generator on the planet. Builds 1000+ pages in 1-2 seconds.
- Zero JavaScript by default. Maximum performance.
- Very small mental model.
- Battle-tested at enormous scale (Smashing Magazine, Linux Foundation use it).

**Cons.**
- Go template syntax is more constrained than JSX/MDX. Complex components are harder.
- Less idiomatic for modern interactive features.
- Fewer engineers in the Claudient target audience know it.
- Theme ecosystem is dated compared to Astro/Next.

**Cost.**
- $0/month.

### Decision

**Astro + Cloudflare Pages.** It's the best fit for what Claudient actually is:
- Content-heavy (Astro is built for this)
- Mostly static with islands of interactivity (Astro's exact sweet spot)
- 5 languages (Astro 5's i18n support is mature)
- Cost-constrained (Cloudflare Pages is honestly free)
- Future-flexible (if we ever need server-side, Astro deploys to Cloudflare Workers natively)

Next.js loses on cost-at-scale and JS payload. Hugo loses on component flexibility and contributor familiarity. Astro is the right tradeoff.

**If the user disagrees:** Next.js is the safe second choice. Hugo is the right choice if absolute performance trumps everything else.

---

## 5. Information Architecture

The URL structure is the SEO architecture. Get this right and the rest is downstream.

```
/                                          Home — hero, top categories, search, install CTA
/skills/                                   All skills index (15 category filter)
/skills/[category]/                        Category landing (e.g. /skills/small-business/)
/skills/[category]/[slug]/                 Skill detail page
/agents/                                   All agents index
/agents/[type]/                            Agent type landing (roles, advisors, specialists)
/agents/[type]/[slug]/                     Agent detail page
/hooks/                                    All hooks index
/hooks/[event]/[slug]/                     Hook detail page
/mcp/                                      MCP directory
/mcp/[slug]/                               MCP config detail
/workflows/                                Workflows index
/workflows/[slug]/                         Workflow detail
/prompts/                                  Prompts index
/prompts/[slug]/                           Prompt detail
/guides/                                   Guides index
/guides/[slug]/                            Guide reader (long-form)
/claude-for/                               Vertical landing hub
/claude-for/[vertical]/                    e.g. /claude-for/solopreneurs/, /claude-for/ecommerce/
/install/                                  Installation guide (npm setup)
/contribute/                               Contributing guide (PR flow)
/about/                                    About + Uitbreiden
/changelog/                                Auto-generated from git tags
/search/                                   Search results page
/sitemap.xml                               Auto-generated
/sitemap-fr.xml, sitemap-de.xml, etc.     Per-language sitemaps
/llms.txt                                  AI-search index
/rss.xml                                   Global RSS
/rss-[category].xml                        Per-category RSS

/fr/...                                    French mirror of entire site
/de/...                                    German mirror
/nl/...                                    Dutch mirror
/es/...                                    Spanish mirror
```

**URL conventions.**
- All URLs lowercase, kebab-case
- Trailing slash on all directory URLs (consistent, Cloudflare-friendly)
- `?ref=` and UTM params stripped from canonical URLs
- Translations use subdirectory pattern (not subdomain, not domain-per-language) — best for SEO consolidation

**Internal link graph.**
- Every skill links to: parent category, the pillar guide for its vertical, 3-5 "related skills"
- Every category page links to: all skills in category + the pillar guide
- Every pillar guide links to: every skill it mentions + the master product guide
- Home links to: top 8 categories + 3 hero skills + 5 vertical landing pages
- Footer on every page links to: about, contribute, install, GitHub, npm, Reddit

---

## 6. Content Pipeline (the .md → page flow)

This is the most important engineering decision. The repo already has the content. The pipeline just makes it browsable.

### Source of truth

The `.md` files in this repo are the canonical content. No CMS, no admin panel, no database. Edit a file in the repo → site rebuilds → page updates. That's the entire authoring loop.

### Frontmatter schema

Every `.md` file needs a frontmatter block. Most existing files don't have one — backfilling is part of Phase 1. Standard schema:

```yaml
---
title: "Invoice Chaser"
description: "Automated AR reminders and payment escalation for small businesses. Reads QuickBooks AR aging and drafts follow-up emails by aging bucket."
category: "small-business"
type: "skill"                 # skill | agent | hook | mcp | workflow | guide | prompt
slug: "invoice-chaser"         # auto-derived from filename if omitted
tools:                         # third-party tools this skill integrates with — drives "Works with" badges
  - QuickBooks
  - Stripe
keywords:                      # secondary SEO terms (primary is the title)
  - "claude for invoicing"
  - "ai invoice follow-up"
  - "automated AR reminders"
languages: ["en", "fr", "de", "nl", "es"]   # which translations exist
updatedAt: 2026-05-19
author: "tushar2704"
related:                       # internal links surfaced as "related skills"
  - small-business/cash-flow-forecast
  - small-business/quickbooks-workflow
draft: false                   # if true, page not generated
---
```

### Ingestion at build time

Astro's Content Collections API reads every `.md` under `skills/`, `agents/`, `hooks/`, `mcp/`, `workflows/`, `guides/`, `prompts/`, validates frontmatter against a Zod schema, and generates typed objects. Pages are then generated by `getStaticPaths` for each type:

```
skills/small-business/invoice-chaser.md
   ↓ (build-time ingestion)
/skills/small-business/invoice-chaser/ (route)
   ↓ (render)
A page with: title, description, body content, related items, install command, share buttons
```

For translations:
```
skills/small-business/fr/invoice-chaser.md
   ↓
/fr/skills/small-business/invoice-chaser/
```

### Live data overlay

A small set of dynamic values are read at build time from external APIs:
- npm download counts (npm registry API, cached for 24h)
- GitHub stars (GitHub API, cached for 24h)
- Last commit timestamp per file (git CLI during build)

These are baked into the static page. No client-side fetching. If we want to update them more often, a daily Cloudflare cron triggers a rebuild via the Cloudflare Pages deploy hook.

### Rebuild triggers

- Push to `main` → automatic Cloudflare Pages rebuild (default behavior)
- Daily cron (Cloudflare Workers) → rebuild for refreshed npm/GitHub stats
- Manual rebuild via the Cloudflare dashboard

Build time target: under 90 seconds for a full ~500-page rebuild. Achievable with Astro at this content volume.

---

## 7. SEO Architecture

This is where the directory model pays. Treat SEO as a first-class engineering surface, not a marketing afterthought.

### Per-page essentials

Every generated page must have:
- `<title>` — `{Title} | Claudient` for content pages, custom for home and category pages
- `<meta name="description">` — pulled from frontmatter `description`, ~155 characters max
- `<link rel="canonical">` — points to the English version for translations
- `<link rel="alternate" hreflang="...">` for every language variant
- Open Graph tags: og:title, og:description, og:url, og:image, og:type, og:site_name
- Twitter Card tags
- JSON-LD structured data (see schemas below)
- Breadcrumb markup
- `<link rel="prev/next">` on paginated lists

### Structured data schemas

| Page type | Schema |
|---|---|
| Home | `Organization` + `WebSite` with `SearchAction` |
| Category landing | `CollectionPage` |
| Skill detail | `SoftwareApplication` + `HowTo` |
| Agent detail | `SoftwareApplication` |
| Hook detail | `SoftwareApplication` |
| Guide | `Article` + `BreadcrumbList` |
| Pillar guide (Claude for X) | `Article` + `FAQPage` |
| Install page | `HowTo` |
| Compare page (v2) | `Article` with comparison facets |

### Sitemap strategy

- One root `sitemap.xml` indexing all sub-sitemaps
- Sub-sitemap per language (`sitemap-en.xml`, `sitemap-fr.xml`, etc.)
- Sub-sitemap per content type if any single one exceeds 50K URLs (we won't, but the pattern is correct)
- `lastmod` per URL pulled from git commit timestamp
- `priority` and `changefreq` set deliberately: home and category pages = high, detail pages = medium, deep tail = low

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://claudient.tools/sitemap.xml

# Prevent indexing of search results and internal redirects
Disallow: /search/
Disallow: /*?*
```

### llms.txt (the AI-search index)

Top-level `/llms.txt` following the [llms.txt standard](https://llmstxt.org/). Concise, semantically structured, designed for Perplexity/Claude/ChatGPT consumption rather than Google ranking. Sample:

```
# Claudient — Claude Code Knowledge Base

> The community knowledge base for Claude Code. 277+ skills, 95+ agents, 30+ hooks, 30+ MCP configs.

## Documentation
- [Getting Started](https://claudient.tools/install/): Install via npx claudient
- [Skill Catalog](https://claudient.tools/skills/): Browse all skills by category
- [Agents](https://claudient.tools/agents/): All specialist agents
- [MCP Servers](https://claudient.tools/mcp/): Top 100 MCP integrations

## Claude for Small Business
- [Solopreneurs](https://claudient.tools/claude-for/solopreneurs/)
- [Ecommerce](https://claudient.tools/claude-for/ecommerce/)
- [Local Services](https://claudient.tools/claude-for/local-services/)
...
```

Auto-generated at build from the same frontmatter.

### Open Graph image generation

Per-page OG images are critical for social distribution. Generate them at build time using:
- [@vercel/og](https://vercel.com/docs/functions/og-image-generation) (works in Astro via the Edge Functions adapter)
- Or static templates: one OG image per category, dynamically composited with skill title overlay using Satori (Astro plugin)

Target: every page has a unique OG image showing its title, category badge, and Claudient branding. Resolution: 1200×630.

### Performance as SEO

Core Web Vitals are ranking signals. Targets per page (Lighthouse mobile):
- LCP < 1.5s
- INP < 200ms
- CLS < 0.05
- Total page weight < 100KB on category pages, < 200KB on detail pages
- Zero render-blocking JS (Astro defaults give us this)

Achievable because the stack is static + Astro + minimal JS islands.

---

## 8. Multi-Language Strategy

Claudient already ships content in 5 languages. The site must honor that or we'd be regressing.

### URL pattern

Subdirectory routing: `claudient.tools/` (EN), `claudient.tools/fr/`, `claudient.tools/de/`, `claudient.tools/nl/`, `claudient.tools/es/`.

Not subdomain (worse for SEO consolidation) and not cookie-driven (worse for crawlers and shareability).

### Language detection

- First visit: detect `Accept-Language` header server-side at the edge (Cloudflare Worker), redirect to the matching language subdirectory if non-English
- Manual switch: language picker in the header, sets a `lang` preference cookie that overrides automatic detection
- Crawlers: never redirected. They see whichever URL they request.

### hreflang correctness

Every page emits hreflang links for every language version that exists. If a French translation hasn't been written for a particular skill, no French hreflang for that page (don't link to a 404). The frontmatter `languages: [...]` array drives this.

### UI translation

Not just content — every interface string (nav labels, button copy, search placeholder, footer) is translated. Centralized in `i18n/{lang}.json` files. Astro's i18n module handles routing and string lookup.

### Translation maintenance

The existing Haiku translation workflow (per the workflow rule in memory) continues to drive content translations. The site rebuilds when translations land — no manual sync.

For new UI strings introduced by the site itself, the same workflow translates them in a dedicated PR before the feature ships in v2 production.

---

## 9. Search Architecture

The single most-used feature on a directory site after the home page.

### v1 — Pagefind (static, free, perfect)

[Pagefind](https://pagefind.app/) is a static-site search built specifically for our use case. It:
- Indexes the rendered HTML at build time
- Outputs a compressed index served as static files
- Loads the index lazily in the browser when the user starts typing
- No server. No API. No cost.
- Per-language indexes shipped alongside the per-language sitemaps.

Tradeoffs:
- Index size grows with content. Should stay under 5MB at our scale; acceptable.
- No fuzzy matching out of the box (workable for our content).
- No analytics on search queries (can be added via Cloudflare Web Analytics events).

### v2 — Algolia (if needed)

If search becomes a primary discovery surface (>20% of sessions use it) and Pagefind hits limits, migrate to [Algolia](https://www.algolia.com/). Free tier covers 10K searches/month. The migration cost is one engineer-week.

Don't pre-optimize. Pagefind ships in v1.

---

## 10. Performance Budget

Documented targets, measured on every build via Lighthouse CI:

| Metric | Home | Category | Detail | Guide (long) |
|---|---|---|---|---|
| Total weight (KB) | <80 | <90 | <120 | <180 |
| JS payload (KB) | <30 | <20 | <30 | <30 |
| Largest Contentful Paint (mobile, 4G) | <1.2s | <1.4s | <1.5s | <1.8s |
| Cumulative Layout Shift | <0.02 | <0.02 | <0.02 | <0.05 |
| Interaction to Next Paint | <100ms | <100ms | <100ms | <150ms |

Enforced by Lighthouse CI as a build gate. Builds that regress beyond budget fail and don't deploy.

---

## 11. Cost Analysis (the low-cost angle)

Year-one operating cost broken down by line item. Everything below assumes Cloudflare Pages + Astro stack.

| Line item | Service | Cost |
|---|---|---|
| Hosting | Cloudflare Pages free tier | **$0** |
| Bandwidth | Cloudflare unlimited free | **$0** |
| Build minutes | Cloudflare 500/month free | **$0** |
| Domain | Cloudflare Registrar (at-cost) | **~$10/year** |
| SSL | Cloudflare (free) | **$0** |
| Analytics | Cloudflare Web Analytics (free) | **$0** |
| Search | Pagefind (free, static) | **$0** |
| Newsletter | Buttondown free <100 subs | **$0** |
| Email forwarding | Cloudflare Email Routing | **$0** |
| OG image generation | @vercel/og + Satori (build-time) | **$0** |
| GitHub Actions for CI | GitHub free tier | **$0** |
| **Annual total** | | **~$10** |

When traffic grows or features expand, the realistic next steps:
- Buttondown $9/month at 100+ subscribers
- Algolia $0 → still free up to 10K searches/month
- Cloudflare Workers Paid plan ($5/month) if we add AI features in v2

Worst-case year-two cost: **~$25/month** at meaningful scale.

For comparison: openalternative.co's stack (Vercel + Postgres + various) costs roughly **$50-80/month** to operate at similar scale based on publicly known pricing. Our stack is 2-4x cheaper at parity.

---

## 12. Hosting and Deployment

### Cloudflare Pages setup

1. Connect the Claudient GitHub repo to a new Cloudflare Pages project
2. Build command: `npm run build`
3. Build output directory: `dist/`
4. Environment variables:
   - `NODE_VERSION=20`
   - `PUBLIC_SITE_URL=https://claudient.tools`
   - (No secrets needed in v1 — purely static)
5. Custom domain: bind to `claudient.tools` (or final domain). Cloudflare auto-provisions SSL.
6. Preview deploys: every PR automatically gets a `*.pages.dev` preview URL.

### Deployment cadence

- Every push to `main` deploys to production.
- Every PR gets a preview URL for review.
- Daily 03:00 UTC rebuild via Cloudflare cron (refreshes npm download counts, GitHub stars).
- Emergency rollback: previous deployment is one-click revert in Cloudflare dashboard.

### Domain DNS

Recommended setup:
- `claudient.tools` → Cloudflare Pages (apex via CNAME flattening, www → apex 301)
- `tools.uitbreiden.com` (optional secondary) → 301 to claudient.tools
- Email: `hello@claudient.tools` and `submit@claudient.tools` via Cloudflare Email Routing forwarding to your real inbox

### Backup posture

The repo IS the backup. Every page is regenerable from the markdown files at any time. No content lives in a database that can be lost. The Cloudflare Pages deploy itself is reproducible from any commit.

---

## 13. Open Source Strategy

**Yes, the website code is MIT licensed and lives in this repo.**

Three reasons:
1. **Trust.** A community-powered content site whose UI is closed-source is a trust mismatch.
2. **Contribution.** Engineers in the community can fix bugs, add features, propose redesigns via PR.
3. **Discovery.** Open-source projects show up in GitHub search for "claude code directory", "claude skills website", etc. — additional discovery surface.

**Where in the repo.** The new website code lives in `site/` at the repo root (renamed from the deleted `web/`). The naming change signals the architectural shift (Next.js app → Astro site).

**License.** MIT, same as the rest of the repo. No CLA required.

**Contribution.** PRs welcomed. The contribution guide gets a new section: "Contributing to the website" covering local dev setup, content authoring conventions, and where to find the design system.

---

## 14. Community Submission Flow

This is a deliberately constrained part of v1, with room to grow.

### v1 — PR-based (the only flow)

Adding a new skill, agent, or hook = open a PR adding a `.md` file in the right directory with valid frontmatter. The site rebuilds and the new content appears.

Why this is the right v1 flow:
- The content already lives in markdown. Submission via PR matches authorship.
- No moderation infrastructure needed. PR review IS moderation.
- Contributors get attribution via git history.
- No spam surface.

The contribution page (`/contribute/`) walks a contributor through:
1. Fork the repo
2. Create the `.md` file in the right place
3. Fill the frontmatter
4. Open a PR
5. Get merged → live on site within 90 seconds of merge.

### v2 — Web form (only if PR friction is a blocker)

Track in analytics how many people land on `/contribute/` vs how many PRs get opened. If the ratio is bad (lots of intent, no follow-through), add a web form that:
- Accepts the skill content in a form
- On submit, opens a GitHub PR via the GitHub App on the user's behalf (requires GitHub OAuth)
- Routes the PR to the maintainer for review

Cost: one Cloudflare Worker handling the GitHub API call. Estimated build: 2 days. Don't build it until the data justifies it.

---

## 15. AI Features and Claude Integration

The site is about Claude. It would be weird not to use Claude.

### v1 — Not built (deferred deliberately)

Resist the temptation. Ship the static directory first. The directory ITSELF is the discovery surface for v1. AI features that don't move metrics are a distraction.

### v2 — "Ask Claude which skill to use"

Concept: a chat interface on the site that takes a free-form description of the user's problem and recommends the right Claudient skills, with links to install.

Architecture:
- Cloudflare Worker handles the request
- Prompt: system prompt describes the Claudient catalog (entire `llms.txt` + filtered skill index) + user message
- Claude API (Haiku-3 for speed, ~$0.25 per 1M tokens) responds
- Aggressive prompt caching (24-hour TTL) for the system prompt — most queries reuse it
- Rate limit per IP: 10 requests/hour on the free tier, unlimited if signed in (v3)

Cost estimate:
- Average prompt: 8K tokens cached system prompt + 200 token user query + 600 token response
- Cached system prompt: $0.00075 per request (effectively free)
- Uncached user/response: ~$0.0002 per request
- 10K queries/month → roughly $2-3/month in Claude API costs

Distribution effect: the chat surface is something other directory sites don't have. It becomes a natural reason for AI-search engines (Claude itself, Perplexity) to cite the site.

### v3 — Per-skill AI summary

Each skill page shows a one-paragraph AI-generated summary tuned to the visitor's apparent intent. Detected via referrer (came from "claude for invoicing" vs "ai for small business" produces different summary emphasis). Requires Cloudflare Workers and Claude API. Cost: negligible at expected traffic.

---

## 16. Analytics and Measurement

### What we track

- Page views per page, per language, per traffic source
- Search queries (which terms succeed, which return zero results — the latter is a content gap signal)
- Install command copy events (`npx claudient add ...` clicks)
- Outbound clicks to GitHub, npm, related external resources
- Newsletter signups
- Time on page (rough engagement signal)

### What we don't track

- No user fingerprinting
- No cross-site tracking
- No third-party advertising pixels
- No session recording

### Tools

- **Cloudflare Web Analytics** for traffic and pageview data. Privacy-friendly, no cookies, free, accurate.
- **Plausible** as a secondary option if more sophisticated funnel analysis is needed (paid, $9/month for 10K pageviews).
- **Custom events** via Cloudflare Web Analytics' built-in event API for install-copy clicks and search queries.

### Dashboards

A single internal `/admin` page (basic-auth protected) shows:
- Top 20 most-viewed pages this month
- Search queries that returned 0 results (content gap list)
- Install copy events per skill (which skills convert traffic to installs)
- Top traffic sources
- Newsletter conversion rate per landing page

Updated nightly. Built as a Cloudflare Worker pulling from the Analytics API.

### Success criteria for the website

Documented up front so we can tell whether v1 worked:

| Metric | 30 days | 90 days | 180 days |
|---|---|---|---|
| Unique visitors / month | 1,500 | 6,000 | 15,000 |
| Sessions from organic search | 60% | 70% | 75% |
| Newsletter subscribers | 50 | 250 | 800 |
| `npx claudient add ...` events / month | 200 | 1,000 | 3,000 |
| Average Core Web Vitals score | 95+ | 95+ | 95+ |
| GitHub stars attributable to site traffic | +50 | +200 | +600 |

If we hit 50% of the 90-day targets, the site has earned its keep. If we hit under 25%, something is structurally wrong and we revisit the strategy.

---

## 17. Comparison: claudient.tools vs openalternative.co

| Dimension | openalternative.co | claudient.tools (planned) |
|---|---|---|
| Stack | Next.js + Postgres + Vercel | Astro + Markdown + Cloudflare Pages |
| Operating cost | ~$50-80/month | ~$0-25/month |
| Content source | Database with admin panel | Git repo (markdown files) |
| Content depth per page | 1-3 paragraphs | 150-400 lines per skill |
| Languages | English only | EN/FR/DE/NL/ES native |
| Submission flow | Web form → moderation | GitHub PR |
| Search | Algolia (paid tier) | Pagefind (static, free) |
| AI features | None | "Ask Claude" chat (v2) |
| Open source | Yes | Yes (same repo as content) |
| Build time per deploy | 30-90s | 30-60s |
| Domain authority needed | High to compete | Long-tail niche play |

The two sites occupy adjacent but distinct positioning. openalternative.co is "find an OSS tool to replace a SaaS product." claudient.tools is "find a Claude Code drop-in for a problem you have."

---

## 18. What We Delete From `web/`

Current contents queued for deletion:

```
web/
├── .claude/                    DELETE
├── .gitignore                  DELETE
├── .next/                      DELETE (build artifact, gitignored anyway)
├── AGENTS.md                   DELETE (Next.js scaffolding doc)
├── CLAUDE.md                   DELETE (11 bytes — empty placeholder)
├── README.md                   DELETE
├── components.json             DELETE (shadcn/ui config)
├── eslint.config.mjs           DELETE
├── next-env.d.ts               DELETE
├── next.config.ts              DELETE
├── node_modules/               DELETE (build artifact)
├── package-lock.json           DELETE
├── package.json                DELETE
├── postcss.config.mjs          DELETE
├── public/
│   ├── file.svg                DELETE
│   ├── globe.svg               DELETE
│   ├── next.svg                DELETE
│   ├── social-preview.png      ⚠️ RESCUE — referenced from main README
│   ├── social-preview.svg      ⚠️ RESCUE — companion to .png
│   ├── vercel.svg              DELETE
│   └── window.svg              DELETE
├── src/                        DELETE entire tree (Next.js scaffolding)
├── tsconfig.json               DELETE
└── vercel.json                 DELETE
```

### Rescue plan before delete

1. Move `web/public/social-preview.png` → `assets/social-preview.png`
2. Move `web/public/social-preview.svg` → `assets/social-preview.svg`
3. Update the README's image reference from `web/public/social-preview.png` → `assets/social-preview.png`
4. Then delete the entire `web/` directory in a single commit
5. New site will recreate its own `public/` folder under `site/` once v1 work begins

### What replaces it

A new `site/` directory at repo root, initialized as an Astro 5 project, with the structure laid out in section 6 (content collections + frontmatter ingesting the existing markdown).

---

## 19. Build Phases

Realistic week-by-week breakdown. Built side-of-desk; can be compressed if focused.

### Phase 0 — Cleanup (Day 1, ~1 hour)
- Rescue `web/public/social-preview.*` to `assets/`
- Update README image reference
- Delete `web/` entirely
- Commit as `chore: remove legacy Next.js scaffold, prep for site/ rewrite`

### Phase 1 — Astro skeleton (Week 1)
- Initialize Astro in `site/`
- Configure Tailwind 4
- Set up Content Collections schemas for each content type
- Backfill frontmatter on existing markdown (Haiku agent can do this batch — most files already have implicit metadata in their structure)
- Generate first batch of pages: home, all categories, skill detail
- Set up Cloudflare Pages, deploy to a `.pages.dev` URL for review
- Lock in the visual design system (Tailwind config, typography, color palette — borrow heavily from openalternative.co's clean aesthetic)

### Phase 2 — Multi-language and SEO (Week 2)
- Astro i18n setup
- Per-language routing
- hreflang and canonical implementation
- Structured data on every page type
- Sitemap auto-generation
- llms.txt generation
- OG image generation at build time
- Lighthouse CI gates

### Phase 3 — Discovery and engagement (Week 3)
- Pagefind search integration
- Newsletter signup form (Buttondown embed)
- Related items component on detail pages
- Install command copy buttons
- Vertical landing page templates (Claude for X) wired to existing pillar guides
- RSS feeds per category

### Phase 4 — Polish and launch prep (Week 4)
- Custom domain DNS configuration
- Cloudflare Web Analytics live
- Internal `/admin` dashboard for traffic and search-gap monitoring
- Full content audit: ensure every markdown file has valid frontmatter
- 5-language UI string completeness check
- Public launch — Reddit (r/ClaudeAI, r/Entrepreneur), HackerNews ("Show HN"), Twitter/X

### Phase 5+ — Compound (post-launch, ongoing)
- AI chat ("Ask Claude") if metrics earn it
- Blog or essay surface if distribution metrics earn it
- Comparison pages if specific competitor queries earn it
- Submission web form if PR-flow friction earns it

---

## 20. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Astro learning curve slows delivery | Medium | Medium | Fall back to Next.js if Phase 1 stretches past 2 weeks |
| Cloudflare Pages free-tier limits hit | Low | Low | Upgrade is $5/month; non-blocking |
| Frontmatter backfill across 500 files is tedious | High | Low | Delegate to Haiku agent (per existing workflow rule) |
| 5-language UI string maintenance gets out of sync | Medium | Medium | Centralize all strings in `i18n/*.json` from day one |
| SEO doesn't materialize (low rankings at 90 days) | Medium | High | The strategy assumes long-tail wins, not head-term competition; track per-page and double down on what ranks |
| Search index size grows unmanageable | Low | Medium | Pagefind is sharded; Algolia is the v2 fallback |
| AI chat feature blows the budget | Low | Low | Aggressive prompt caching + rate limits keep it under $10/month even with significant usage |
| Site becomes outdated because rebuilds are forgotten | Medium | Medium | Daily Cloudflare cron rebuild handles this automatically |
| Content licensing / attribution conflicts | Low | High | Everything in the repo is MIT/CC0/sole-author; verify on import for any future third-party content |
| The repo's CLAUDE.md says "no application code" | Certain | Low | Update CLAUDE.md to allow `site/` as an exception; document the rationale in an ADR |

---

## 21. Decisions Required Before Phase 1 Starts

These need a yes/no from the user before any code lands. Listing them explicitly so nothing slips through.

1. **Domain.** Is `claudient.tools` available and the preferred TLD? Alternatives: `claudient.dev`, `claudient.co`, `claudient.app`, `claudient.com` (likely taken). Cloudflare Registrar pricing varies by TLD.
2. **Stack confirmation.** Astro is recommended. Confirm or override (Next.js / Hugo).
3. **Open-source posture.** Site code under MIT in this repo? Confirm.
4. **Newsletter platform.** Buttondown ($0 / $9 after 100 subs)? Or use the existing email setup at Uitbreiden?
5. **AI chat in v1 or v2?** Recommendation: v2. Confirm or override.
6. **CLAUDE.md update.** Allow `site/` as the documented exception to the "no application code" rule. Confirm.
7. **`web/` deletion.** Explicit go-ahead after the social-preview rescue. Confirm.

---

## 22. Success Criteria for This Plan

This document succeeds if:
- A new engineer (or future-you) can read it once and start Phase 1 the next day with no clarification needed
- The trade-offs in stack selection are explicit enough that an alternative pick can be argued (not just imposed)
- The cost model holds up at 10x the projected traffic
- The phase plan is achievable side-of-desk and survives one week of slippage without changing the destination
- The SEO architecture is detailed enough that no single page launches without structured data, hreflang, and canonical correctness

---

## Appendix A — Reference Reading

Resources the implementer should skim before Phase 1:

- [Astro 5 docs](https://docs.astro.build/) — especially Content Collections and i18n
- [openalternative.co repo](https://github.com/piotrkulpinski/openalternative) — the structural reference
- [Cloudflare Pages docs](https://developers.cloudflare.com/pages/) — deploy patterns
- [Pagefind docs](https://pagefind.app/docs/) — search integration
- [llms.txt standard](https://llmstxt.org/) — AI-search index format
- [hreflang sitemap patterns](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — multilingual SEO
- [Web.dev Core Web Vitals](https://web.dev/articles/vitals) — performance targets

---

## Appendix B — File and Folder Conventions in `site/`

```
site/
├── astro.config.mjs                 Astro config
├── tailwind.config.mjs              Tailwind 4 config
├── tsconfig.json
├── package.json
├── public/                          Static assets served as-is
│   ├── favicon.svg
│   ├── og-default.png
│   └── robots.txt
├── src/
│   ├── content/                     Astro Content Collections
│   │   └── config.ts                Zod schemas per content type
│   ├── pages/                       Route definitions
│   │   ├── index.astro              /
│   │   ├── [...lang]/
│   │   │   ├── skills/
│   │   │   │   ├── index.astro
│   │   │   │   ├── [category]/
│   │   │   │   │   ├── index.astro
│   │   │   │   │   └── [slug].astro
│   │   │   └── ...
│   │   └── sitemap.xml.ts
│   ├── components/                  Reusable UI components
│   │   ├── ItemCard.astro
│   │   ├── CategoryNav.astro
│   │   ├── InstallCommand.astro
│   │   └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── DocLayout.astro
│   ├── i18n/
│   │   ├── en.json
│   │   ├── fr.json
│   │   ├── de.json
│   │   ├── nl.json
│   │   └── es.json
│   ├── styles/
│   │   └── global.css
│   └── lib/                         Build-time utilities
│       ├── content-loader.ts        Reads markdown from repo root
│       ├── seo.ts                   Per-page meta + JSON-LD helpers
│       └── og.ts                    OG image generator
└── README.md                        Local dev instructions
```

Content lives outside `site/` — in the existing `skills/`, `agents/`, `hooks/`, `mcp/`, `workflows/`, `guides/`, `prompts/` directories at the repo root. The site reads from those at build time via the content loader. This is the architectural commitment: content authors don't touch the site, site authors don't touch the content. Two separable concerns.

---

> **Claudient** is backed by [Uitbreiden](https://uitbreiden.com/) — building AI products and B2B solutions with developer communities.
