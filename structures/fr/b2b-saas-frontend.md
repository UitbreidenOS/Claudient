# 📂 Modèle B2B SaaS Frontend
> L'espace de travail canonique pour un Frontend B2B SaaS de qualité production (Next.js / React), conçu pour gérer les états complexes, le contrôle d'accès basé sur les rôles (RBAC), et les tableaux de données haute performance.

📄 `frontend-architecture-brief.md` # Mémento canonique : stratégies de rendu (SSR vs SSG), choix de bibliothèques de composants et paradigmes de routage
🧠 `active-ui-bugs.md`              # Mémoire de session : suivi dynamique du contexte pour les incompatibilités d'état actuelles et les problèmes de mise en page réactive
🤖 `CLAUDE.md`                      # Règles de fonctionnement : instructions strictes pour exiger les composants serveur par défaut et éviter les cascades côté client

## 📁 state-and-data/ (4 compétences - Le cerveau client)
📄 `auth-session-store.md`          # Logique Zustand/Redux pour gérer les JWT, jetons de rafraîchissement, et les permissions utilisateur actuelles
📄 `health-api-query-client.md`     # Configuration TanStack/React Query pour la mise en cache, la déduplication, et la synchronisation des requêtes vers votre health-api principal
📄 `optimistic-ui-updates.md`       # Logique de mutation qui met à jour instantanément l'interface utilisateur avant la réponse du serveur pour que l'application se sente ultra rapide
📄 `websocket-listeners.md`         # Abonnements aux notifications du tableau de bord en temps réel et à la présence des utilisateurs actifs

## 📁 ui-components/ (3 compétences - La vue)
📄 `design-system-tokens.md`        # La source unique de vérité pour l'espacement, la typographie, et les couleurs de marque (Tailwind/CSS Modules)
📄 `complex-data-tables.md`         # Composants de grille virtualisés capables de rendre 10 000+ lignes avec tri et pagination sans ralentissement
📄 `rbac-visibility-wrappers.md`    # Composants utilitaires qui masquent automatiquement les boutons ou onglets si l'utilisateur manque de la permission IAM spécifique

## 📁 routing-and-middleware/ (3 compétences - Navigation)
📄 `tenant-subdomain-router.md`     # Logique pour gérer les URL multi-locataires (par ex. `clientA.health-ui.com` vs `clientB.health-ui.com`)
📄 `edge-auth-guards.md`            # Middleware Next.js qui intercepte les requêtes non authentifiées à la périphérie et redirige vers `/login`
📄 `dynamic-breadcrumbs.md`         # Génère automatiquement les chemins de navigation basés sur la structure URL actuellement deep-linkée

## 📁 testing-and-qa/ (3 compétences - Stabilité)
📄 `component-storybook.md`         # Terrain de jeu isolé pour tester visuellement les états d'interface utilisateur avant de les intégrer dans les pages principales
📄 `accessibility-auditor.md`       # Intégrations Axe-core garantissant que tous les formulaires et modaux sont conformes aux lecteurs d'écran (WCAG)
📄 `e2e-critical-paths.md`          # Scripts Playwright testant le parcours utilisateur principal (par ex. s'inscrire, créer une organisation, et facturation)

## 📁 build-and-deploy/ (3 compétences - CI/CD)
📄 `bundle-size-analyzer.md`        # Échoue la build si une PR importe accidentellement des bibliothèques massives (comme lodash) qui gonflent le temps de chargement initial
📄 `env-variable-validator.md`      # Schéma Zod qui fait crasher la build immédiatement si une clé API requise manque dans l'environnement
📄 `github-final-sync.md`           # Actions GitHub automatisées pour pousser la build frontend finalisée et minifiée vers vos dépôts finaux Github

---
**Fichiers de configuration**
⚙️ `next.config.mjs` / `vite.config.ts` # Configurations principales du bundler, application du mode strict, et listes blanches des domaines d'image
📦 `tailwind.config.ts`                 # Définitions des classes utilitaires mappant directement aux jetons de conception Figma
