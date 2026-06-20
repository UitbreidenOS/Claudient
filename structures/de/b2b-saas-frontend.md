# 📂 B2B SaaS Frontend Boilerplate
> Der kanonische Workspace für ein produktives B2B SaaS Frontend (Next.js / React), konzipiert zur Bewältigung komplexer State-Management, rollenbasierter Zugriffskontrolle (RBAC) und hochperformanten Datentabellen.

📄 `frontend-architecture-brief.md` # Kanonische Übersicht: Rendering-Strategien (SSR vs SSG), Komponentenbibliotheks-Auswahlmöglichkeiten und Routing-Paradigmen
🧠 `active-ui-bugs.md`              # Session-Speicher: Dynamische Kontextverfolgung für aktuelle State-Mismatches und Responsive-Layout-Probleme
🤖 `CLAUDE.md`                      # Betriebsregeln: Strikte Anweisungen zur Mandatierung von Server-Komponenten standardmäßig und Vermeidung von clientseitigen Waterfalls

## 📁 state-and-data/ (4 Skills - Das Client-Gehirn)
📄 `auth-session-store.md`          # Zustand/Redux-Logik zur Verwaltung von JWTs, Refresh-Tokens und aktuellen Benutzerberechtigungen
📄 `health-api-query-client.md`     # TanStack/React Query-Setup für Caching, Deduping und Synchronisierung von Anfragen zu Ihrer Core-Backend-Health-API
📄 `optimistic-ui-updates.md`       # Mutations-Logik, die die Benutzeroberfläche sofort aktualisiert, bevor der Server antwortet, um die App blitzschnell zu machen
📄 `websocket-listeners.md`         # Abonnements für Echtzeit-Dashboard-Benachrichtigungen und aktive Benutzer-Präsenz

## 📁 ui-components/ (3 Skills - Die Ansicht)
📄 `design-system-tokens.md`        # Die einzige verlässliche Quelle für Abstände, Typografie und Markenfarben (Tailwind/CSS Modules)
📄 `complex-data-tables.md`         # Virtualisierte Grid-Komponenten, die 10.000+ Zeilen mit Sortierung und Paginierung ohne Verzögerung rendern können
📄 `rbac-visibility-wrappers.md`    # Utility-Komponenten, die automatisch Schaltflächen oder Registerkarten ausblenden, wenn dem Benutzer die spezifische IAM-Berechtigung fehlt

## 📁 routing-and-middleware/ (3 Skills - Navigation)
📄 `tenant-subdomain-router.md`     # Logik zur Handhabung von Multi-Tenant-URLs (z.B. `clientA.health-ui.com` vs `clientB.health-ui.com`)
📄 `edge-auth-guards.md`            # Next.js-Middleware, die unauthentifizierte Anfragen am Edge abfängt und auf `/login` umleitet
📄 `dynamic-breadcrumbs.md`         # Generiert automatisch Navigationspfade basierend auf der aktuellen Deep-Link-URL-Struktur

## 📁 testing-and-qa/ (3 Skills - Stabilität)
📄 `component-storybook.md`         # Isolierter Spielplatz zum visuellen Testen von UI-States vor der Integration in Hauptseiten
📄 `accessibility-auditor.md`       # Axe-Core-Integrationen, die sicherstellen, dass alle Formulare und Modals für Bildschirmleser zugänglich sind (WCAG)
📄 `e2e-critical-paths.md`          # Playwright-Skripte zum Testen der Core-User-Journey (z.B. Anmeldung, Erstellung einer Organisation und Abrechnung)

## 📁 build-and-deploy/ (3 Skills - CI/CD)
📄 `bundle-size-analyzer.md`        # Schlägt den Build fehl, wenn ein PR versehentlich massive Bibliotheken importiert (wie lodash), die die initiale Ladezeit aufblähen
📄 `env-variable-validator.md`      # Zod-Schema, das den Build sofort zum Absturz bringt, wenn ein erforderlicher API-Schlüssel in der Umgebung fehlt
📄 `github-final-sync.md`           # Automatisierte GitHub Actions zum Pushen des finalisierten, minimierten Frontend-Builds zu Ihren Github Final Repos

---
**Konfigurationsdateien**
⚙️ `next.config.mjs` / `vite.config.ts` # Core-Bundler-Konfigurationen, Strict-Mode-Erzwingung und Image-Domain-Whitelists
📦 `tailwind.config.ts`                 # Utility-Class-Definitionen, die direkt Figma-Design-Tokens zuordnen
