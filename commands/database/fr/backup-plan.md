---
description: Générer un plan de sauvegarde et de récupération de base de données adapté à la pile technologique du projet et aux exigences RTO/RPO
argument-hint: "[type de base de données, environnement d'hébergement, ou exigences RTO/RPO]"
---
Générer un plan de sauvegarde et de récupération de base de données pour : $ARGUMENTS

Si $ARGUMENTS spécifie un type de base de données et/ou un environnement, utilisez-le. Sinon, détectez le moteur de base de données et le contexte d'hébergement à partir des fichiers de configuration du projet (docker-compose, .env, database.yml, etc.).

Produire un plan de sauvegarde complet couvrant :

1. Stratégie de sauvegarde :
   - Fréquence et calendrier des sauvegardes complètes (expression cron).
   - Sauvegarde incrémentale ou continue basée sur WAL si le moteur la supporte (archivage WAL PostgreSQL, binlog MySQL, expédition de journaux de transactions MSSQL).
   - Compromis entre sauvegarde logique et physique pour ce moteur et cette taille d'ensemble de données.
   - Outils recommandés : pg_dump / pg_basebackup, mysqldump / Percona XtraBackup, mongodump, sqlite3 .backup, snapshots natifs du cloud (RDS, Cloud SQL, Azure Database).

2. Politique de rétention :
   - Sauvegardes quotidiennes conservées pendant N jours, hebdomadaires pendant N semaines, mensuelles pendant N mois — fournissez une recommandation concrète en fonction des besoins de conformité implicites.
   - Estimation des coûts de stockage (rapport entre la taille de la sauvegarde compressée et la taille de la base de données brute).

3. Stockage et sécurité :
   - Exigence de stockage hors site ou inter-régions.
   - Chiffrement au repos (les fichiers de sauvegarde doivent être chiffrés — fournissez l'indicateur/la configuration pour l'outil choisi).
   - Contrôle d'accès : les identifiants de sauvegarde doivent être séparés des identifiants d'application.

4. Procédures de récupération :
   - Commandes de restauration étape par étape pour l'outil recommandé.
   - Instructions de récupération à un moment précis (PITR) si l'archivage WAL/binlog est configuré.
   - RTO estimé en fonction de la taille de la sauvegarde et de la méthode de restauration.

5. Validation de la sauvegarde :
   - Procédure hebdomadaire de test de restauration vers un environnement intermédiaire.
   - Étape de vérification par somme de contrôle ou décompte de lignes après la restauration.
   - Alertes : ce qu'il faut surveiller (code de sortie du travail de sauvegarde, âge de la sauvegarde, anomalie de taille de sauvegarde).

6. Modèle de carnet d'incidents :
   - Un court carnet d'incidents : « La base de données a disparu — que dois-je faire dans les 15 prochaines minutes ? »

Sortie des commandes concrètes, pas des conseils génériques. Toutes les commandes doivent être exécutables telles quelles ou avec une substitution de variable minimale.
