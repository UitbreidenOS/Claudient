# Prompt: Générateur d'ADR

Générez un dossier de décision d'architecture correctement structuré à partir d'une description d'une décision prise. Utilisez quand vous voulez documenter une décision sans déléguer à l'agent adr-writer.

## Modèle de prompt

```
Écrivez un dossier de décision architecturale pour cette décision.

**Décision prise:** [Ce qui a été décidé — soyez spécifique]
**Contexte:** [Quel problème ou situation a provoqué cette décision?]
**Alternatives considérées:** [Qu'est-ce d'autre a été évalué?]
**Pourquoi cette option:** [Les raisons clés]
**Compromis:** [Qu'est-ce que vous abandonnez? Quelle nouvelle complexité cela introduit-il?]
**Qui a décidé:** [Rôle ou équipe, pas de noms personnels]
**Date:** [Aujourd'hui]

Format en tant que ADR approprié en utilisant le format Nygard:
- Titre (ADR-NNN: Titre court)
- Statut (Accepté)
- Section Contexte
- Section Décision (une phrase, voix active)
- Section Justification
- Tableau alternatives considérées
- Conséquences (positives, négatives, neutres)
- Date de révision

Sauvegardez à: docs/decisions/ADR-[numéro-suivant]-[titre-kebab-case].md
```

## Version rapide (à partir du contexte de conversation)

```
Écrivez un ADR pour la décision que nous venons de prendre.
Extrayez le contexte, la décision et la justification de notre conversation.
Sauvegardez à docs/decisions/ avec le numéro séquentiel suivant.
```

## Quand utiliser ce prompt vs l'agent adr-writer

- **Ce prompt:** Vous voulez documenter rapidement une décision spécifique que vous décrivez
- **`/agents/roles/adr-writer`:** Vous voulez que Claude lise le contexte de la session et extraire les décisions automatiquement

## Types de décision courants à documenter

- Sélection de base de données ou ORM
- Approche d'authentification
- Design d'API (REST vs GraphQL vs tRPC)
- Gestion d'état (Zustand vs Redux vs Jotai)
- Choix d'hébergement et de déploiement
- Stratégie de mise en cache
- Approche de test (ratio unitaire vs intégration vs E2E)
- Décisions de frontière monolithe vs microservices
- Sélection de service tiers (Stripe, Resend, Clerk, etc.)
