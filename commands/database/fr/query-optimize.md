---
description: Analyser une requête SQL lente ou problématique et produire une version optimisée avec explication
argument-hint: "[Requête SQL ou chemin d'accès au fichier]"
---
Vous êtes un expert en optimisation de requêtes de base de données. Analysez et optimisez la requête suivante : $ARGUMENTS

Si $ARGUMENTS est un chemin d'accès à un fichier, lisez le fichier. S'il s'agit de SQL brut, utilisez-le directement.

Effectuez l'analyse suivante :

1. Analysez la structure de la requête :
   - Identifiez toutes les tables, jointures, sous-requêtes, CTE et fonctions de fenêtrage.
   - Mappez les clauses WHERE, GROUP BY, ORDER BY, HAVING.
   - Notez toute coercition de type implicite ou appels de fonction sur des colonnes indexées qui empêcheraient l'utilisation d'index.

2. Identifiez les problèmes de performance :
   - Analyses séquentielles complètes (index manquant ou non utilisé en raison d'un encapsulage de fonction).
   - Produits cartésiens ou jointures croisées non intentionnelles.
   - Motifs N+1 exprimés sous forme de sous-requêtes corrélées.
   - Sous-requêtes redondantes qui peuvent être remontées à des CTE ou des JOIN.
   - Agrégations sur de grands ensembles non filtrés.
   - SELECT * alors que des colonnes spécifiques suffisent.
   - Prédicats non-sargables (par exemple, `WHERE YEAR(created_at) = 2024` au lieu d'une plage).

3. Produisez une requête optimisée :
   - Réécrivez pour être sargable où les prédicats ne le sont actuellement pas.
   - Remplacez les sous-requêtes corrélées par des JOIN ou des fonctions de fenêtrage le cas échéant.
   - Poussez les filtres aussi tôt que possible (predicate pushdown).
   - Utilisez les indications d'index couvrant dans les commentaires où un index éliminerait une extraction de table.
   - Préservez la sémantique exacte — l'ensemble de résultats doit être identique.

4. Montrez une différence entre les versions originale et optimisée.

5. Expliquez chaque modification dans une liste à puces, y compris l'impact attendu (par exemple, « élimine le scan séquentiel sur les commandes, réduction estimée de 10 à 100 fois du nombre de lignes examinées »).

6. Énumérez tous les index qui devraient être créés pour supporter la requête optimisée, avec l'instruction CREATE INDEX exacte.

Indiquez le moteur de base de données supposé (PostgreSQL, MySQL, SQLite, MSSQL, etc.) en fonction de la syntaxe détectée. Ajustez les recommandations en conséquence.
