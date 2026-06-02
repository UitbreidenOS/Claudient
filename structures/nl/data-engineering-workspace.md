# 📂 Data Engineering Workspace

> De canonieke werkruimte voor een Data Engineer, ontworpen om idempotente pijpleidingen te bouwen, complexe Directed Acyclic Graphs (DAGs) in te schakelen en strikte gegevenschecks op schaal af te dwingen.

📄 `pipeline-architecture-brief.md` # Canonieke brief: Definieert het doeldatawarehouse (Snowflake/BigQuery), latency SLA's (batch vs. streaming) en naamgevingsconventies
🧠 `active-backfills.md`            # Sessiememorie: Dynamische contexttracking voor momenteel lopende historische dataterugvullingen en gebroken DAG-herstel
🤖 `CLAUDE.md`                      # Bedrijfsregels: Strikte instructies om idempotentie af te dwingen—zorgde ervoor dat een pijpleiding meerdere keren kan worden uitgevoerd zonder gegevens te dupliceren

## 📁 ingestion-and-extract/ (4 skills - Gegevens verplaatsen)
📄 `api-paginator.md`               # Scripts om betrouwbaar gegevens uit gepagineerde derde REST API's op te halen met exponentiële terugkeer
📄 `cdc-configurator.md`            # Change Data Capture (Debezium/Kafka) setups om rijgewijzigingen in real-time in databases te streamen
📄 `batch-job-scheduler.md`         # Logica voor nachtelijke cronjobs die grote CSV's van SFTP-servers of S3-buckets scrapen
📄 `local-ingest-sandbox.md`        # Configuraties voor het lokaal uitvoeren van zware extractietestuitvoeringen op een speciale Mac mini voordat u naar de cloud gaat

## 📁 transformation-dbt/ (4 skills - Modellering)
📄 `dbt-model-generator.md`         # Schaffendt staging-, tussenlaag- en martlaag SQL-modellen volgens Kimball-methodologie
📄 `incremental-load-logic.md`      # Complexe Jinja-macros om alleen nieuwe records te verwerken, wat de rekenkosten drastisch reduceert
📄 `dag-optimizer.md`               # Analyzeert de afhankelijkheidsgrafiek om knelpunten te identificeren en onafhankelijke transformaties parallel uit te voeren
📄 `slow-query-refactor.md`         # Geautomatiseerde suggesties om zware `JOIN`s of vensterfuncties te vervangen door efficiëntere geclusterde sleutels

## 📁 orchestration-airflow/ (3 skills - Planning)
📄 `dag-scaffolder.md`              # Genereert Apache Airflow DAGs (of Prefect/Dagster flows) met gestandaardiseerde retry-logica
📄 `sensor-and-hook-config.md`      # Wacht op upstream-gebeurtenissen (bijv. "S3-bestand geland") voordat downstreamverwerking wordt geactiveerd
📄 `sla-miss-alerter.md`            # PagerDuty-routeringslogica voor wanneer een kritieke dashboardpijpleiding het leveringsvenster van 8:00 uur mist

## 📁 data-quality-and-ops/ (3 skills - Vertrouwen)
📄 `great-expectations-suite.md`    # Genereert strikte tests die kolomuniqueness, non-null-beperkingen en verwachte gegevenstypen stellen
📄 `dead-letter-queue-handler.md`   # Routes malformed JSON payloads veilig naar een quarantainezone voor inspectie in plaats van de pijpleiding te crashen
📄 `anomaly-detector.md`            # Statistische controles om vlag in te stellen als inkomsten van vandaag ver buiten de grenzen liggen in vergelijking met het 30-daags voortschrijdend gemiddelde

## 📁 infrastructure-and-sync/ (3 skills - Implementatie)
📄 `warehouse-sizer.md`             # Terraform-logica voor dynamische schaalvergroting van Snowflake-rekenpakhuis tijdens zware ELT-uren en schorsing daarna
📄 `role-based-access.md`           # Scripts om gemaskeerde weergaven in te richten, ervoor zorgde dat PII (zoals e-mails) verborgen is voor standaardanalistrollen
📄 `github-final-sync.md`           # Geautomatiseerde CI/CD-actie om pijpleidingswijzigingen in staging te testen en goedgekeurd code naar definitieve Github-repo's te synchroniseren

---
**Configuratiebestanden**
⚙️ `dbt_project.yml`                # Definieert model-materialisaties (table vs. view) en taggroeperingen
📦 `airflow.cfg`                    # Kernplanner configuraties en worker gelijktijdigheidslimieten

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
