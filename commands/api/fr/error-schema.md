---
description: Définir et appliquer un schéma de réponse d'erreur cohérent sur tous les points de terminaison API
argument-hint: "[portée : fichier, routeur, ou 'all']"
---
Auditer et appliquer un schéma de réponse d'erreur cohérent pour : $ARGUMENTS

La portée par défaut est l'API entière si $ARGUMENTS est vide ou "all".

Schéma d'erreur cible (RFC 9457 / Détails des problèmes pour les API HTTP) :
```json
{
  "type": "https://example.com/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The 'email' field must be a valid email address.",
  "instance": "/requests/abc-123",
  "trace_id": "3f2e1d..."
}
```

Utilisez ce schéma sauf si le projet dispose déjà d'un format d'erreur établi — le cas échéant, standardisez plutôt celui-ci.

Étapes :
1. Analyser tous les chemins de code renvoyant des erreurs : exceptions levées, middleware d'erreurs, blocs catch, gestionnaires de validation
2. Identifier les incohérences : chaînes simples, clés incohérentes (`message` vs `error` vs `detail`), codes d'état manquants, formes mélangées
3. Définir un type d'erreur/interface/classe unique à la racine du projet (`ApiError` ou équivalent)
4. Remplacer chaque réponse d'erreur ad-hoc par une construction structurée de ce type
5. Centraliser toute la sérialisation d'erreurs en un seul endroit (middleware d'erreur / gestionnaire d'exception) — pas dispersée dans les contrôleurs
6. Assurer que les erreurs de validation énumèrent les erreurs par champ :
   ```json
   "errors": [{ "field": "email", "message": "Invalid format" }]
   ```
7. Supprimer les traces de pile des réponses de production — les enregistrer côté serveur, ne jamais envoyer au client
8. Mapper les types d'erreur internes aux codes de statut HTTP dans une seule table de consultation — aucun littéral de code de statut en dehors de cette table
9. Ajouter un `trace_id` corrélé avec votre système de journalisation si un est en utilisation

Sortie :
- La définition du type d'erreur
- Le gestionnaire d'erreurs centralisé
- Liste de tous les fichiers modifiés
- Toutes les réponses d'erreur qui n'ont pas pu être standardisées (avec raison)
