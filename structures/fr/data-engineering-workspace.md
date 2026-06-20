# 📂 Espace de travail Ingénieur Données

> L'espace de travail canonique pour un Ingénieur Données, conçu pour construire des pipelines idempotents, orchestrer des Graphiques Acycliques Dirigés (DAGs) complexes, et appliquer des contrôles stricts de qualité des données à l'échelle.

📄 `pipeline-architecture-brief.md` # Mémoire canonique : Définit l'entrepôt de données cible (Snowflake/BigQuery), les SLA de latence (batch vs. streaming), et les conventions de nommage
🧠 `active-backfills.md`            # Mémoire de session : Suivi du contexte dynamique pour les remplissages de données historiques en cours et la récupération de DAG cassés
🤖 `CLAUDE.md`                      # Règles opérationnelles : Instructions strictes pour appliquer l'idempotence—garantissant qu'un pipeline peut s'exécuter plusieurs fois sans dupliquer les données

## 📁 ingestion-and-extract/ (4 compétences - Déplacement des données)
📄 `api-paginator.md`               # Scripts pour extraire de manière fiable les données des APIs REST paginées de tiers avec backoff exponentiel
📄 `cdc-configurator.md`            # Configurations Change Data Capture (Debezium/Kafka) pour diffuser les modifications de lignes de bases de données en temps réel
📄 `batch-job-scheduler.md`         # Logique pour les tâches cron nocturnes raclant des CSV massifs depuis les serveurs SFTP ou les buckets S3
📄 `local-ingest-sandbox.md`        # Configurations pour exécuter des exécutions de test d'extraction lourdes localement sur un Mac mini dédié avant d'envoyer vers le cloud

## 📁 transformation-dbt/ (4 compétences - Modélisation)
📄 `dbt-model-generator.md`         # Génère des modèles SQL de couche staging, intermédiaire et mart suivant la méthodologie Kimball
📄 `incremental-load-logic.md`      # Macros Jinja complexes pour traiter uniquement les nouveaux enregistrements, réduisant drastiquement les coûts de calcul
📄 `dag-optimizer.md`               # Analyse le graphique de dépendance pour identifier les goulots d'étranglement et paralléliser les transformations indépendantes
📄 `slow-query-refactor.md`         # Suggestions automatisées pour remplacer les `JOIN`s lourds ou les fonctions de fenêtre par des clés de clustering plus efficaces

## 📁 orchestration-airflow/ (3 compétences - Planification)
📄 `dag-scaffolder.md`              # Génère des DAGs Apache Airflow (ou flux Prefect/Dagster) avec logique de relance standardisée
📄 `sensor-and-hook-config.md`      # Attend les événements en amont (par ex., « fichier S3 arrivé ») avant de déclencher le traitement en aval
📄 `sla-miss-alerter.md`            # Logique de routage PagerDuty pour quand un pipeline de tableau de bord critique manque sa fenêtre de livraison à 8h00

## 📁 data-quality-and-ops/ (3 compétences - Confiance)
📄 `great-expectations-suite.md`    # Génère des tests rigoureux affirmant l'unicité des colonnes, les contraintes non-nulles, et les types de données attendus
📄 `dead-letter-queue-handler.md`   # Achemine de manière sûre les charges utiles JSON mal formées vers une zone de quarantaine pour inspection plutôt que de faire crasher le pipeline
📄 `anomaly-detector.md`            # Contrôles statistiques pour signaler si la somme des revenus d'aujourd'hui s'écarte considérablement de la moyenne mobile sur 30 jours

## 📁 infrastructure-and-sync/ (3 compétences - Déploiement)
📄 `warehouse-sizer.md`             # Logique Terraform pour redimensionner dynamiquement les entrepôts de calcul Snowflake pendant les heures ELT lourdes et les suspendre après
📄 `role-based-access.md`           # Scripts pour provisionner les vues masquées, garantissant que les PII (comme les e-mails) sont masqués par rapport aux rôles d'analyste standard
📄 `github-final-sync.md`           # Action CI/CD automatisée pour tester les modifications de pipeline dans la staging et synchroniser le code approuvé vers les dépôts Github finaux

---
**Fichiers de configuration**
⚙️ `dbt_project.yml`                # Définit les matérialisations de modèle (table vs. view) et les regroupements de tags
📦 `airflow.cfg`                    # Configurations du planificateur principal et limites de concurrence des workers
