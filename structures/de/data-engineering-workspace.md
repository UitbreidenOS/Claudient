# 📂 Data Engineering Workspace

> Der kanonische Arbeitsbereich für einen Data Engineer, der zum Erstellen idempotenter Pipelines, zum Orchestrieren komplexer Directed Acyclic Graphs (DAGs) und zum Durchsetzen strenger Datenqualitätsprüfungen im großen Maßstab konzipiert ist.

📄 `pipeline-architecture-brief.md` # Kanonische Übersicht: Definiert das Ziel-Data-Warehouse (Snowflake/BigQuery), Latenz-SLAs (Batch vs. Streaming) und Namenskonventionen
🧠 `active-backfills.md`            # Sitzungsspeicher: Dynamische Kontextverfolgung für derzeit ausgeführte historische Daten-Backfills und DAG-Wiederherstellung
🤖 `CLAUDE.md`                      # Betriebsregeln: Strikte Anweisungen zur Durchsetzung von Idempotenz – es wird sichergestellt, dass eine Pipeline mehrmals ausgeführt werden kann, ohne Daten zu duplizieren

## 📁 ingestion-and-extract/ (4 Skills - Daten verschieben)
📄 `api-paginator.md`               # Skripte zum zuverlässigen Extrahieren von Daten aus paginierten Drittanbieter-REST-APIs mit exponentiellem Backoff
📄 `cdc-configurator.md`            # Change Data Capture (Debezium/Kafka)-Einrichtungen zum Streamen von Zeilenänderungen auf Datenbankebene in Echtzeit
📄 `batch-job-scheduler.md`         # Logik für nächtliche Cron-Jobs, die massive CSVs von SFTP-Servern oder S3-Buckets scrapen
📄 `local-ingest-sandbox.md`        # Konfigurationen zum Ausführen schwerer Extraktions-Testläufe lokal auf einem dedizierten Mac mini vor dem Push in die Cloud

## 📁 transformation-dbt/ (4 Skills - Modellierung)
📄 `dbt-model-generator.md`         # Gerüstet für Staging-, Intermediate- und Mart-Layer-SQL-Modelle nach Kimball-Methodik
📄 `incremental-load-logic.md`      # Komplexe Jinja-Makros, um nur neue Datensätze zu verarbeiten und die Rechenkosten drastisch zu senken
📄 `dag-optimizer.md`               # Analysiert den Abhängigkeitsgraph, um Engpässe zu identifizieren und unabhängige Transformationen zu parallelisieren
📄 `slow-query-refactor.md`         # Automatisierte Vorschläge zum Ersetzen von schweren `JOIN`s oder Window-Funktionen durch effizientere Clustered-Keys

## 📁 orchestration-airflow/ (3 Skills - Planung)
📄 `dag-scaffolder.md`              # Generiert Apache Airflow DAGs (oder Prefect/Dagster Flows) mit standardisierter Wiederholungslogik
📄 `sensor-and-hook-config.md`      # Wartet auf Upstream-Events (z. B. „S3-Datei gelandet"), bevor die nachgelagerte Verarbeitung ausgelöst wird
📄 `sla-miss-alerter.md`            # PagerDuty-Routing-Logik für den Fall, dass eine kritische Dashboard-Pipeline ihr Lieferfenster von 8:00 Uhr morgens verfehlt

## 📁 data-quality-and-ops/ (3 Skills - Vertrauen)
📄 `great-expectations-suite.md`    # Generiert strenge Tests zur Überprüfung von Spalteneinzigartigkeit, Nicht-Null-Constraints und erwarteten Datentypen
📄 `dead-letter-queue-handler.md`   # Leitet fehlerhafte JSON-Payloads sicher in eine Quarantänezone zur Überprüfung weiter, anstatt die Pipeline zum Absturz zu bringen
📄 `anomaly-detector.md`            # Statistische Prüfungen, um zu kennzeichnen, ob die heutige Umsatzsumme im Vergleich zum gleitenden 30-Tage-Durchschnitt stark abweicht

## 📁 infrastructure-and-sync/ (3 Skills - Bereitstellung)
📄 `warehouse-sizer.md`             # Terraform-Logik zum dynamischen Hochfahren von Snowflake-Compute-Warehouses während schwerer ELT-Stunden und zum anschließenden Aussetzen
📄 `role-based-access.md`           # Skripte zur Bereitstellung maskierter Ansichten, um sicherzustellen, dass PII (wie E-Mails) vor Standard-Analyst-Rollen verborgen bleibt
📄 `github-final-sync.md`           # Automatisierte CI/CD-Aktion zum Testen von Pipeline-Änderungen in der Staging-Umgebung und zum Synchronisieren genehmigten Codes mit Github Final Repos

---
**Konfigurationsdateien**
⚙️ `dbt_project.yml`                # Definiert Modellmaterialisierungen (Tabelle vs. Ansicht) und Tag-Gruppierungen
📦 `airflow.cfg`                    # Kern-Planer-Konfigurationen und Worker-Parallelitätsgrenzen

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
