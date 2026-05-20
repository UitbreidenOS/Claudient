# Prompt: Planificateur progressif des tâches

Force Claude Code à travailler étape par étape avec des portes d'examen obligatoires. Prévient l'expansion du scope, réduit la saturation du contexte et vous garde en contrôle des implémentations longues.

## Prompt système

```
Vous implémentez une fonctionnalité en utilisant une approche progressive, étape par étape avec des portes d'examen obligatoires.

Règles pour cette session:
1. Avant d'écrire du code: décrivez exactement ce que vous prévoyez de faire dans l'étape suivante uniquement (pas la fonctionnalité entière)
2. Implémentez SEULEMENT cette étape — rien de plus
3. Arrêtez et dites: "Étape [N] complète. Voici ce que j'ai fait: [résumé bref]. Prêt pour l'étape [N+1]? [décrivez-la]"
4. Attendez l'approbation explicite avant de passer à l'étape suivante
5. Si vous découvrez un changement de scope en cours d'étape, arrêtez et demandez avant de l'inclure

N'implémentez jamais plus d'une étape sans approbation explicite.
N'assumez jamais que l'étape suivante est approuvée parce que la précédente l'était.
Si le plan global change, ré-énoncez le plan restant complet et obtenez l'approbation.
```

## Modèle de requête

```
[Décrivez la fonctionnalité à implémenter]

Utilisez l'implémentation progressive:
1. Commencez par énumérer toutes les étapes que vous prévoyez de prendre (n'implémentez pas encore)
2. J'approuverai le plan
3. Implémentez une étape à la fois, en arrêtant pour ma révision après chaque
```

## Quand l'utiliser

- Les fonctionnalités complexes qui touchent plusieurs fichiers
- Tout changement à l'authentification, aux paiements ou l'accès aux données
- Les refactorisations qui pourraient aller dans des directions inattendues
- Quand les sessions précédentes ont entraîné Claude à en faire trop à la fois
- Travailler avec un nouvel ingénieur ou contributeur junior

## Exemple de flux de session

```
Vous: Implémentez la modification du profil utilisateur avec téléchargement d'image.
Utilisez l'implémentation progressive.

Claude: Voici mon plan (6 étapes):
1. Ajouter un point de terminaison API de modification du profil (PATCH /api/users/me)
2. Ajouter un schéma de validation Zod pour les champs de profil
3. Ajouter un point de terminaison de téléchargement d'image utilisant Multer
4. Stocker l'image dans S3/Cloudflare R2
5. Mettre à jour le schéma de base de données avec la colonne profileImageUrl
6. Construire le composant de formulaire frontal

Dois-je commencer par l'étape 1?

Vous: Oui, vas-y

Claude: [implémente l'étape 1 — point de terminaison API uniquement]
Étape 1 complète. J'ai ajouté PATCH /api/users/me avec les champs de nom et bio.
Pas de gestion d'image encore — c'est l'étape 3.
Prêt pour l'étape 2 (schéma de validation Zod)?

Vous: Oui

Claude: [implémente seulement l'étape 2]
...
```

## Avantages

- Vous pouvez rediriger à n'importe quelle étape sans perdre les travaux antérieurs
- Chaque étape est vérifiable et testable indépendamment
- Claude ne s'égare pas dans une refactorisation sans rapport
- Vous comprenez exactement ce qui a changé à chaque point
