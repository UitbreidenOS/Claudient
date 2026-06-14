---
description: Détecter les patterns de requêtes N+1 dans le code ORM et produire des corrections par chargement par lots
argument-hint: "[chemin de fichier, répertoire, ou nom de route/contrôleur]"
---
Scanner les patterns de requêtes N+1 dans: $ARGUMENTS

Si $ARGUMENTS est un chemin de fichier, le lire. Si c'est un répertoire, scanner tous les fichiers source pertinents qu'il contient. Si c'est un nom de contrôleur ou de route, localiser les fichiers de code correspondants.

Approche de détection:

1. Identifier l'ORM ou la bibliothèque de requêtes utilisée (ActiveRecord, SQLAlchemy, Django ORM, TypeORM, Prisma, Sequelize, GORM, Hibernate, etc.).

2. Scanner les patterns N+1:
   - Les boucles (for, forEach, map, each, .all.map, etc.) qui contiennent des appels ORM dans le corps de la boucle.
   - Les associations chargées paresseusement accédées dans une boucle (par exemple, `post.comments` appelé par post dans une itération).
   - Les sérialiseurs ou modèles de vue qui déclenchent des chargements d'associations par enregistrement.
   - Les appels `.find()` ou `.get()` à l'intérieur des boucles qui pourraient être regroupés par lots.
   - Les directives de chargement rapide manquantes (includes, eager_load, preload, joinedload, selectinload, with, include).

3. Pour chaque N+1 trouvé, afficher:
   - Le chemin du fichier et le(s) numéro(s) de ligne du code offensant.
   - La requête qui s'exécute N fois.
   - La correction: le code exact montrant comment regrouper par lots/charger rapidement l'association.
   - La méthode spécifique à l'ORM à utiliser (par exemple, `includes(:comments)` pour ActiveRecord, `options(selectinload(Post.comments))` pour SQLAlchemy, `include: { comments: true }` pour Prisma).

4. Aussi signaler:
   - Les champs `select` manquants causant des chargements de lignes complètes alors que seul un sous-ensemble est nécessaire.
   - Les `.distinct` manquants sur les comptes d'associations qui causent des résultats gonflés.
   - Les requêtes identiques répétées dans le même cycle de requête qui devraient être mémorisées ou mises en cache.

5. Si la base de code a une journalisation des requêtes ou un pattern d'assertion de nombre de requêtes (par exemple, `assert_queries`, bibliothèque `nplusone`), suggérer d'ajouter des gardes pour prévenir les régressions.

Afficher les résultats sous forme de liste priorisée — HIGH (dans un chemin chaud ou une boucle sur des collections non bornées), MEDIUM, LOW — avec la correction de code exacte pour chaque.
