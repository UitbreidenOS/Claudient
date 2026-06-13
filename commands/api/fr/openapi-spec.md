---
description: Générer ou mettre à jour une spécification OpenAPI 3.1 à partir de routes existantes ou d'une description
argument-hint: "[fichier-source-ou-description]"
---
Générer ou mettre à jour une spécification OpenAPI 3.1 basée sur : $ARGUMENTS

Si $ARGUMENTS est un chemin de fichier, lisez les définitions de routes à partir de ce fichier. S'il s'agit d'une description, créez une spécification à partir de zéro. Si vide, scannez la base de code pour tous les définitions de routes et générez une spécification complète.

Exigences :
- Utiliser OpenAPI 3.1.0 (pas 3.0.x — utiliser `type: "null"` et non `nullable: true`)
- Chaque chemin doit avoir : summary, operationId (camelCase, unique), tags, parameters, requestBody (le cas échéant), et responses
- Définir tous les schémas sous `components/schemas` — les schémas en ligne dans les éléments de chemins sont interdits
- Utiliser `$ref` pour tout schéma référencé plus d'une fois
- Documenter chaque code de statut de réponse possible que le code retourne réellement — ne pas en inventer de supplémentaires
- Les champs obligatoires doivent être dans les tableaux `required` — pas de champs optionnels silencieux
- Les valeurs d'énumération doivent correspondre à ce que le code applique
- Inclure les définitions de schéma de sécurité si l'API utilise l'authentification (Bearer JWT, clé API, OAuth2, etc.)
- Ajouter des champs `description` sur toutes les propriétés non évidentes
- Marquer les points de terminaison dépréciés avec `deprecated: true` s'ils sont trouvés

Règles de formatage :
- Sortie YAML, indentation de 2 espaces
- Garder `paths` triés alphabétiquement par route
- Garder `components/schemas` triés alphabétiquement

Produire le fichier `openapi.yaml` complet. Si vous mettez à jour une spécification existante, afficher uniquement les sections modifiées avec suffisamment de contexte pour les placer, puis écrire le fichier complet mis à jour.

Si la source de route est ambiguë ou si les décorateurs spécifiques au framework ne sont pas reconnus, lister les routes qui ont été ignorées et pourquoi.
