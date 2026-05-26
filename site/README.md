# Claudient Site

The public-facing directory for the Claudient knowledge base — built with Astro, Tailwind 4, and deployed to Cloudflare Pages.

Strategy and architecture live in `../website-development.md` at the repo root. Read that before changing anything structural.

## Local development

```bash
cd site
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs static HTML to `site/dist/`.

## Stack

- [Astro 5](https://astro.build/) — static site generation, content collections, islands architecture
- [Tailwind 4](https://tailwindcss.com/) — utility-first CSS via the Vite plugin
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting (free tier, unlimited bandwidth)

## Conventions

- Aesthetic modeled on [openalternative.co](https://openalternative.co/): warm neutrals (stone palette), generous whitespace, single accent color (orange-500).
- Lightweight by default — no React unless interactivity demands it, no UI component library, no Google Fonts download in v1.
- Content lives outside this directory in `../skills/`, `../agents/`, `../hooks/`, `../mcp/`, `../workflows/`, `../guides/`, `../prompts/`. The site reads markdown from those paths at build time.
