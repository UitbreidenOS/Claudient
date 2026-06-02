# 📂 B2B SaaS Frontend Boilerplate
> De canonieke werkplek voor een productie-grade B2B SaaS Frontend (Next.js / React), ontworpen om complexe state, Role-Based Access Control (RBAC), en hoogperformante gegevenstabellen aan te kunnen.

📄 `frontend-architecture-brief.md` # Canoniek kort overzicht: Render-strategieën (SSR vs SSG), keuzes voor componentenbibliotheken en routing-paradigma's
🧠 `active-ui-bugs.md`              # Sessiegeheugen: Dynamische contexttracking voor huidige state-mismatchs en responsive layout-problemen
🤖 `CLAUDE.md`                      # Bedrijfsregels: Strikte instructies om servercomponenten standaard verplicht te stellen en client-side waterfalls te vermijden

## 📁 state-and-data/ (4 skills - Het Client Brain)
📄 `auth-session-store.md`          # Zustand/Redux logica voor het beheren van JWT's, refresh tokens en huidige gebruikersmachtigingen
📄 `health-api-query-client.md`     # TanStack/React Query setup voor caching, deduplicering en synchronisatie van verzoeken naar uw core backend health-api
📄 `optimistic-ui-updates.md`       # Mutatie-logica die de UI onmiddellijk bijwerkt voordat de server reageert om de app bliksemnel aan te voelen
📄 `websocket-listeners.md`         # Abonnementen voor realtime dashboard-meldingen en actieve gebruikersaanwezigheid

## 📁 ui-components/ (3 skills - The View)
📄 `design-system-tokens.md`        # De enige bron van waarheid voor spatiëring, typografie en merkkleunen (Tailwind/CSS Modules)
📄 `complex-data-tables.md`         # Gevirtualiseerde rastercomponenten die 10.000+ rijen kunnen renderen met sortering en paginering zonder vertraging
📄 `rbac-visibility-wrappers.md`    # Hulpprogrammacomponenten die automatisch knoppen of tabbladen verbergen als de gebruiker de specifieke IAM-toestemming mist

## 📁 routing-and-middleware/ (3 skills - Navigatie)
📄 `tenant-subdomain-router.md`     # Logica voor het verwerken van multi-tenant-URL's (b.v. `clientA.health-ui.com` vs `clientB.health-ui.com`)
📄 `edge-auth-guards.md`            # Next.js-middleware dat niet-geverifieerde verzoeken onderschept aan de edge en omleid naar `/login`
📄 `dynamic-breadcrumbs.md`         # Genereert automatisch navigatiepaden op basis van de huidige diepe URL-structuur

## 📁 testing-and-qa/ (3 skills - Stabiliteit)
📄 `component-storybook.md`         # Geïsoleerde speeltuin voor het visueel testen van UI-toestanden voordat deze in hoofdpagina's worden geïntegreerd
📄 `accessibility-auditor.md`       # Axe-core-integraties die ervoor zorgen dat alle formulieren en modalen schermlezer-compatibel zijn (WCAG)
📄 `e2e-critical-paths.md`          # Playwright-scripts die de kerngebruikersreis testen (b.v. registratie, organisatie aanmaken en facturering)

## 📁 build-and-deploy/ (3 skills - CI/CD)
📄 `bundle-size-analyzer.md`        # Laat de build mislukken als een PR per ongeluk enorme bibliotheken importeert (zoals lodash) die de initiële laadtijd opblazen
📄 `env-variable-validator.md`      # Zod-schema dat de build onmiddellijk laat crashen als een vereiste API-sleutel ontbreekt in de omgeving
📄 `github-final-sync.md`           # Geautomatiseerde GitHub Actions om de gefinaliseerde, geminificeerde frontend-build naar uw Github final-repo's te duwen

---
**Configuratiebestanden**
⚙️ `next.config.mjs` / `vite.config.ts` # Kernbundler-configuraties, strict mode-handhaving en whitelisting van afbeeldingsdomeinen
📦 `tailwind.config.ts`                 # Utility class-definities die rechtstreeks worden toegewezen aan Figma-designtokens

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
