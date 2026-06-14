---
description: Générer un fichier de migration de base de données à partir d'une description ou d'une différence de changement de schéma
argument-hint: "[description du changement de schéma]"
---
Vous générez une migration de base de données. L'utilisateur a fourni : $ARGUMENTS

Déduisez le framework de migration cible du projet (Alembic, Flyway, Liquibase, migrations Django, Rails ActiveRecord, Prisma, Knex, TypeORM, Sequelize, ou SQL brut). Si ambigü, vérifiez les fichiers de configuration ou les fichiers de migration existants dans le dépôt avant de demander.

Étapes :
1. Examinez les migrations existantes pour déterminer la convention de nommage, le format d'horodatage et la structure des fichiers.
2. Identifiez l'état actuel du schéma à partir des migrations existantes ou des fichiers de schéma.
3. Générez la migration avec :
   - Un chemin `up` (migration directe) qui est idempotent si possible (utilisez les gardes IF NOT EXISTS, IF EXISTS).
   - Un chemin `down` (annulation) qui inverse complètement le chemin `up`.
   - Des limites de transaction explicites si le framework supporte le DDL transactionnel.
   - Des contraintes de colonne (NOT NULL, DEFAULT, CHECK) qui correspondent à ce qui a été demandé.
   - Création d'index aux côtés de toute nouvelle clé étrangère.
4. Si le changement implique le renommage d'une colonne ou d'une table, générez une migration en deux phases : ajouter nouveau, remplir, supprimer ancien — sauf si l'utilisateur demande explicitement un renommage en une seule phase.
5. Signalez toute opération destructive (DROP COLUMN, DROP TABLE, rétrécissement de type) avec un bloc de commentaire commençant par `-- DESTRUCTIVE:` et recommandez une stratégie de déploiement correspondante (feature flag, double écriture, etc.).
6. Affichez le contenu du fichier de migration avec le nom de fichier correct suivant les conventions existantes.
7. Pour les tables volumineuses, signalez les opérations qui nécessitent des verrous ACCESS EXCLUSIVE (ALTER TABLE sur PostgreSQL) et suggérez les alternatives CONCURRENTLY si disponibles.

Ne générez pas de changements de modèle ORM sauf si demandé. Concentrez-vous uniquement sur l'artefact de migration.
