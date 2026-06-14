---
description: Recommander des index pour une table ou une charge de requêtes basée sur le schéma et les modèles d'accès
argument-hint: "[nom de table, requête, ou fichier de schéma]"
---
Analysez le schéma de base de données et les modèles d'accès pour : $ARGUMENTS

Si $ARGUMENTS est un nom de table, localisez son schéma dans les migrations, les modèles ORM ou les fichiers de schéma. Si c'est une requête, analysez les modèles d'accès de cette requête. Si c'est un chemin de fichier, lisez-le.

Effectuez cette analyse :

1. Mappez les index actuels :
   - Listez tous les index existants (clé primaire, unique, composite, partiel, basé sur une expression).
   - Identifiez les index redondants (couverts par un préfixe d'un autre index).
   - Identifiez les index inutilisés ou à faible sélectivité (p. ex., colonnes booléennes, énumérations de faible cardinalité).

2. Analysez la charge de requêtes :
   - Si des requêtes sont fournies ou détectables dans la base de code (appels de requête ORM, SQL brut), extrayez leurs modèles WHERE, JOIN, ORDER BY et GROUP BY.
   - Identifiez les colonnes qui apparaissent à plusieurs reprises dans les prédicats de filtre.
   - Notez les requêtes de plage qui bénéficient des index B-tree par rapport aux requêtes d'égalité uniquement.

3. Recommandez de nouveaux index :
   - Pour chaque recommandation, indiquez :
     a. L'instruction CREATE INDEX exacte (utilisez CONCURRENTLY pour PostgreSQL si approprié).
     b. Quelles requêtes ou modèles d'accès il couvre.
     c. Impact estimé de sélectivité (cardinalité haute/moyenne/basse).
     d. Coût de surcharge d'écriture — les index qui ralentissent le débit INSERT/UPDATE doivent être signalés.
   - Préférez les index composites aux index simple-colonne multiples lorsque le modèle de requête le justifie.
   - Considérez les index partiels (clause WHERE) pour les conditions clairsemées (p. ex., modèles de suppression logicielle, filtres de statut avec des valeurs null/inactives dominantes).
   - Considérez les index couvrants (colonnes INCLUDE) pour éliminer les accès au tas de la table pour les chemins de lecture actifs.

4. Signallez les index à supprimer :
   - Index dupliqués.
   - Index sur des colonnes jamais utilisées dans les filtres ou les jointures.
   - Index qui sont remplacés par un index composite.

5. Sortie d'un plan d'action priorisé : ÉLEVÉ (gain immédiat, risque faible) / MOYEN (utile, surcharge d'écriture mineure) / BAS (marginal, évaluer en charge).

Précisez le moteur de base de données supposé à partir du contexte de syntaxe ou de configuration.
