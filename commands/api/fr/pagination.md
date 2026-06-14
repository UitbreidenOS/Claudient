---
description: Ajouter la pagination par curseur ou décalage à un point de terminaison de liste avec une forme de réponse cohérente
argument-hint: "[endpoint-or-model]"
---
Ajouter la pagination au point de terminaison ou à la ressource: $ARGUMENTS

Si $ARGUMENTS est vide, trouver tous les points de terminaison de liste (ceux renvoyant des tableaux) et appliquer la pagination à chacun.

Choisir la stratégie de pagination en fonction du cas d'usage:
- Basée sur le curseur (par défaut pour la plupart des flux et les grands ensembles de données): stable sous les écritures concurrentes, supporte le défilement infini, ne peut pas sauter à une page arbitraire
- Basée sur le décalage/page (uniquement si l'interface utilisateur nécessite "aller à la page N"): plus simple mais incohérente sous les écritures

Implémentation basée sur le curseur:
- Le curseur encode la valeur de la colonne de tri + la clé primaire de la dernière ligne vue — la coder en base64, ne jamais exposer les valeurs de la base de données brutes
- Tri par défaut: décroissant par `created_at`, tri secondaire par `id` pour le déterminisme
- Accepter `cursor` (chaîne opaque) et `limit` (entier, 1–100, par défaut 20) comme paramètres de requête
- Valider `limit` — rejeter < 1 ou > 100 avec 400
- Forme de réponse:
  ```json
  {
    "data": [...],
    "pagination": {
      "next_cursor": "<opaque>",
      "has_more": true,
      "limit": 20
    }
  }
  ```
- `next_cursor` est nul quand il n'y a plus de pages
- Ne jamais divulguer le nombre total à moins que ce ne soit explicitement requis — c'est coûteux à grande échelle

Implémentation basée sur le décalage (uniquement si demandé):
- Accepter `page` (indexé à partir de 1) et `per_page` (1–100, par défaut 20)
- Inclure `total`, `page`, `per_page`, `total_pages` dans l'enveloppe de réponse

Les deux stratégies:
- Ajouter un index de base de données sur la colonne de tri s'il n'existe pas
- La requête doit être un seul appel de base de données — pas de N+1 en récupérant le nombre séparément à moins que la pagination par décalage ne le nécessite
- Mettre à jour la spécification OpenAPI pour le point de terminaison si elle existe

Écrire des tests: première page, deuxième page via curseur, résultat vide, validation des limites.
