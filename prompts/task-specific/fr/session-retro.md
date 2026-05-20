# Prompt: Rétrospective de session

Utilisez à la fin d'une session Claude Code pour capturer les apprentissages et les transformer en améliorations durables — mettant à jour CLAUDE.md, créant de nouvelles règles, identifiant les opportunités de compétences et écrivant des ADR.

## Prompt système

```
Vous faites une rétrospective de session. Examinez l'historique de conversation de cette session et catégorisez chaque apprentissage dans le bon format de sortie.

Catégories à vérifier (inclure seulement les catégories avec du contenu réel):

**1. MISES À JOUR CLAUDE.md** — contexte de projet persistant qui devrait survivre à cette session
Format: "Ajouter à CLAUDE.md: [texte exact à ajouter]"
Inclure: nouvelles commandes découvertes, informations sur l'architecture, conventions établies, choses que Claude devrait toujours connaître

**2. NOUVELLES RÈGLES** — normes de codage ou modèles qui méritent d'être formalisés
Format: "Ajouter à rules/[catégorie].md: [énoncé de la règle]"
Inclure: conventions établies, modèles qui doivent toujours être suivis, choses qui ne doivent jamais être faites

**3. IDÉES DE COMPÉTENCES** — flux de travail répétitifs qui méritent une /compétence
Format: "Créer compétence: /[nom] — [ce qu'elle fait en une phrase]"
Inclure: tout flux de travail tapé 3+ fois, processus multi-étapes avec un modèle cohérent

**4. ADR** — décisions architecturales avec des compromis significatifs
Format: "Écrire ADR: [titre court] — Décision: [ce qui a été décidé]"
Inclure: choix de technologie, sélections d'approches, tout ce que les futurs ingénieurs doivent comprendre

**5. BUGS NON CORRIGÉS** — problèmes rencontrés qui ne sont pas encore résolus
Format: "Bug: [description] — Localisation: [fichier ou domaine] — Impact: [qui/quoi cela affecte]"

**6. TODO SESSION SUIVANTE** — tâches concrètes à commencer la prochaine fois
Format: "Suivant: [tâche spécifique]"

Soyez spécifique et actionnable. Ne pas inclure les observations vagues. Si une catégorie n'a rien qui vaut la peine d'être capturé, omettez-la complètement.
```

## Utilisation

À la fin de toute session significative, exécutez:

```
"Faites une rétrospective de session sur tout ce sur quoi nous avons travaillé aujourd'hui. 
Catégorisez tous les apprentissages en utilisant le format rétrospectif."
```

## Automatisation avec le hook session-retro

Le hook `session-retro` crée un fichier `.claude/retro-pending.md` automatiquement à la fin de la session. Au début de la session suivante, collez le prompt rétrospectif et traitez le fichier.

## Agir sur la sortie

Pour chaque sortie:

| Catégorie | Action |
|---|---|
| Mise à jour CLAUDE.md | Modifier CLAUDE.md directement |
| Nouvelle règle | Créer ou ajouter à `rules/common/[sujet].md` |
| Idée de compétence | Ajouter au backlog de développement |
| ADR | Déléguer à l'agent `adr-writer` |
| Bug | Ajouter à `bugs.md` ou créer un problème GitHub |
| Session suivante | Commencer la session suivante avec ces tâches |

## Exemple de sortie

```
## Rétrospective de session — 20 mai 2026

**MISES À JOUR CLAUDE.md:**
- Ajouter à CLAUDE.md: "Utiliser `npx drizzle-kit generate` avant toute migration de base de données — toujours afficher un aperçu du SQL de migration avant d'exécuter"
- Ajouter à CLAUDE.md: "Le service des paiements utilise des clés d'idempotence sur tous les appels Stripe — passer `idempotencyKey: requestId` sur chaque charge"

**NOUVELLES RÈGLES:**
- Ajouter à rules/common/error-handling.md: "Tous les gestionnaires de webhook Stripe doivent vérifier la signature avant de traiter — utiliser `stripe.webhooks.constructEvent()`"

**IDÉES DE COMPÉTENCES:**
- Créer compétence: /stripe-webhook — Configurer un gestionnaire de webhook Stripe complet avec vérification de signature, routage d'événements et idempotence

**ADRS:**
- Écrire ADR: "Utiliser Stripe Connect au lieu de frais directs pour les paiements de marketplace" — Décision: Stripe Connect choisi pour gérer les paiements multi-partis sans construire de logique de grand livre personnalisée

**BUGS NON CORRIGÉS:**
- Bug: L'email de confirmation de paiement est envoyé deux fois à la relance — Localisation: `src/webhooks/stripe.ts:87` — Impact: Certains utilisateurs reçoivent des emails de confirmation dupliqués

**SESSION SUIVANTE:**
- Suivant: Corriger le bug d'email dupliqué dans le gestionnaire de webhook de paiement
- Suivant: Écrire la compétence de webhook Stripe basée sur les modèles établis aujourd'hui
```
