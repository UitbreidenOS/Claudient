# Référence CLI Claude Code

Référence complète pour tous les drapeaux CLI Claude Code, les commandes de démarrage, la gestion des sessions, les commandes slash et les variables d'environnement.

---

## Démarrage de Claude Code

```bash
claude                          # interactive session
claude "do X"                   # non-interactive, single prompt
claude -p "do X"                # print mode (no interactive fallback)
claude -p "do X" --bare         # skip CLAUDE.md + MCP discovery (10x faster SDK startup)
claude --add-dir ../other-repo  # give Claude access to another directory
claude -r <session-id>          # resume a previous session
claude --resume <id> --fork-session  # fork at current point, keep original intact
```

`--bare` est le drapeau le plus important pour les cas d'utilisation SDK. Il contourne le chargement CLAUDE.md, la découverte des paramètres et la connexion MCP — réduisant la latence de démarrage d'un ordre de magnitude quand vous n'avez pas besoin de contexte de projet.

---

## Commandes de gestion des sessions

```bash
claude agents                   # list all running sessions
claude agents --json            # machine-readable JSON array
claude agents --cwd .           # filter sessions by current directory
claude rm <session-id>          # remove session from agent view
claude respawn <session-id>     # restart session with history intact
claude respawn --all            # restart all running sessions
claude daemon status            # show supervisor process state
```

Les ID de session sont des UUID affichés dans la liste d'agent. Passez-les à `--resume` ou `--fork-session` pour continuer ou brancher du travail.

---

## Commandes du projet

```bash
claude project purge            # delete all local state for this project
claude plugin details <name>    # show plugin component inventory + token cost
```

`project purge` efface les données de session en cache, l'état du plugin et les paramètres locaux stockés sous `.claude/`. Il ne touche pas à `.claude/settings.json` ou à aucun fichier commis.

---

## Commandes slash clés (en session)

| Commande | Description | Ajouté |
|---|---|---|
| `/goal` | Définir ou afficher l'objectif de la session actuelle — épingle l'intention en haut du contexte | 2024 |
| `/btw` | Ajouter une note de fond au contexte sans déclencher de réponse | 2024 |
| `/voice` | Activer/désactiver le mode dictée vocale | 2025 |
| `/compact` | Déclencher manuellement la compaction du contexte | 2024 |
| `/rewind` | Revenir à un tour précédent dans la session actuelle | 2025 |
| `/branch` | Créer un nouvel embranchement de session à partir de l'état actuel | 2025 |
| `/diff` | Afficher une différence unifiée de tous les changements apportés dans la session | 2024 |
| `/code-review` | Lancer la compétence d'examen du code intégrée | 2024 |
| `/focus` | Affiner l'attention de Claude à un fichier ou répertoire spécifique | 2025 |
| `/batch` | Exécuter une liste de tâches en parallèle sur les sous-agents | 2025 |
| `/teleport` | Sauter à un répertoire différent sans terminer la session | 2025 |
| `/remote-control` | Activer le contrôle externe de la session via API | 2025 |
| `/loop` | Exécuter une invite ou une commande sur un intervalle récurrent | 2025 |
| `/powerup` | Augmenter temporairement le niveau du modèle pour une seule réponse | 2025 |
| `/fast` | Basculer la session actuelle vers Haiku pour la vitesse | 2025 |
| `/effort` | Définir le niveau d'effort pour la session (`low` / `medium` / `high` / `xhigh`) | 2025 |
| `/cost` | Afficher l'utilisation des tokens et le coût estimé pour la session | 2024 |
| `/extra-usage` | Afficher la décomposition de la consommation de tokens d'appels d'outils | 2025 |
| `/scroll-speed` | Ajuster la vitesse de diffusion de sortie dans le terminal | 2025 |
| `/recap` | Générer un résumé structuré de la session jusqu'à présent | 2025 |
| `/team-onboarding` | Générer un guide d'intégration pour un nouveau membre de l'équipe à partir du contexte du projet | 2025 |

---

## Variables d'environnement

| Variable | Objet |
|---|---|
| `ANTHROPIC_API_KEY` | Clé API — requise pour tous les utilisations non-interactives |
| `ANTHROPIC_BASE_URL` | Remplacer le point de terminaison API (proxies personnalisés, passerelles internes) |
| `CLAUDE_CODE_TASK_LIST_ID` | ID de liste de tâches partagé — active la coordination des tâches entre sessions |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Définissez à `1` pour activer la fonctionnalité des équipes d'agent |
| `ENABLE_PROMPT_CACHING_1H` | Définissez à `1` pour utiliser le niveau TTL du cache 1 heure |
| `ENABLE_TOOL_SEARCH` | Seuil auquel la charge d'outil différée s'active |
| `CLAUDE_EFFORT` | Niveau d'effort par défaut pour les nouvelles sessions (`low` / `medium` / `high` / `xhigh`) |
| `CLAUDE_AGENT_NAME` | Chaîne d'identité pour cet agent — utilisée dans les variables d'environnement hook |
| `OUTPUT_SIZE_WARN_THRESHOLD` | Seuil de bytes qui déclenche les avertissements de taille de sortie du hook |

Les variables définies dans le shell remplacent les paramètres du projet. Les variables définies dans `.env` à la racine du projet sont chargées automatiquement.

---

## Paramètre `additionalDirectories`

Alternative persistante à `--add-dir`. Configuré dans `.claude/settings.json` ou `~/.claude/settings.json`:

```json
{
  "additionalDirectories": ["../shared-lib", "../design-system"]
}
```

Les chemins sont résolus par rapport à la racine du projet. Utilisez ceci quand plusieurs repos collaborent sur un seul produit et Claude a besoin d'accès en lecture entre repos dans chaque session sans répéter le drapeau.

---

## Résumé de la référence des drapeaux

| Drapeau | Court | Description |
|---|---|---|
| `--print` | `-p` | Mode impression non-interactif |
| `--bare` | | Ignorer CLAUDE.md, les paramètres et la découverte MCP |
| `--add-dir <path>` | | Ajouter un répertoire à l'ensemble de travail de Claude |
| `--resume <id>` | `-r` | Reprendre une session précédente par ID |
| `--fork-session` | | Fourcher au lieu de reprendre quand utilisé avec `--resume` |
| `--json` | | Sortie de la liste de session en tant que JSON (utilisé avec `agents`) |
| `--cwd <path>` | | Filtrer les agents par répertoire de travail |
| `--all` | | Appliquer la commande à toutes les sessions (utilisé avec `respawn`) |

---

> **Travaillez avec nous:** Claudient est soutenu par [Uitbreiden](https://uitbreiden.com/) — nous construisons des produits IA et des solutions B2B avec les communautés de développeurs.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
