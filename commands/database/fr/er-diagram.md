---
description: Générer un diagramme ER en Mermaid ou PlantUML à partir du schéma de base de données du projet
argument-hint: "[fichier de schéma, noms de tables ou répertoire]"
---
Générer un diagramme entité-relation pour : $ARGUMENTS

Si $ARGUMENTS est un chemin de fichier, le lire. S'il s'agit d'un nom de table ou d'une liste séparée par des virgules, localiser leurs définitions dans les migrations, les modèles ORM ou les fichiers de schéma. S'il s'agit d'un répertoire, scanner toutes les définitions de schéma qu'il contient.

Étapes :

1. Extraire les informations de schéma :
   - Noms des tables et leurs colonnes (nom, type, nullabilité, valeur par défaut).
   - Clés primaires (simples et composites).
   - Clés étrangères et les relations qu'elles représentent (un-à-un, un-à-plusieurs, plusieurs-à-plusieurs via tables de jonction).
   - Contraintes uniques qui impliquent la cardinalité.

2. Détecter la préférence de format de diagramme :
   - Si le projet contient déjà des fichiers `.mmd`, `mermaid` ou PlantUML, faire correspondre ce format.
   - Par défaut, utiliser la syntaxe Mermaid `erDiagram` (s'affiche sur GitHub, Notion, la plupart des outils de documentation).
   - Si l'utilisateur a spécifié PlantUML, utiliser `@startuml` / `@enduml` avec des blocs d'entités.

3. Produire le diagramme :
   - Inclure toutes les colonnes avec leurs types dans les blocs d'entités.
   - Afficher les lignes de relation avec la notation de cardinalité correcte de Mermaid :
     - `||--o{` un-à-plusieurs
     - `||--||` un-à-un
     - `}o--o{` plusieurs-à-plusieurs
   - Étiquer chaque ligne de relation avec le nom de la clé étrangère ou un libellé sémantique court.
   - Grouper les tables de jonction/association visuellement distinctes si possible via des commentaires.

4. Si le schéma est volumineux (>15 tables), produire deux diagrammes :
   - Un aperçu de haut niveau montrant uniquement les tables et les relations (pas de détails de colonnes).
   - Un diagramme détaillé pour le sous-ensemble de tables dans $ARGUMENTS ou les tables du domaine principal.

5. Après le diagramme, afficher :
   - Une brève légende expliquant les abréviations non évidentes utilisées dans les types de colonnes.
   - Une liste de toute relation implicite trouvée dans le code mais non déclarée comme contrainte FK.
   - Toutes les tables de jonction qui représentent des concepts de domaine qui méritent d'être renommées pour plus de clarté.

Afficher le diagramme dans un bloc de code clôturé avec la balise de langage correcte (`mermaid` ou `plantuml`).
