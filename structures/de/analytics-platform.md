# Analytics Platform — Projektstruktur

> Für ein Data-Engineering- und Analytics-Team, das den gesamten Lebenszyklus von der Rohdatenerfassung bis zur gesteuerten BI-Auslieferung verwaltet, mit Fokus auf Pipeline-Zuverlässigkeit, Metrikkonsistenz und schnellen Erkenntnisgewinn.

## Stack

- **Ingestion:** Fivetran (verwaltete Konnektoren) oder Airbyte 0.50+ (selbst gehostet, Open-Source-Konnektoren)
- **Data Warehouse:** BigQuery (Google Cloud) oder Snowflake (Enterprise / Business Critical)
- **Transformationen:** dbt Core 1.8+ mit dbt-bigquery- oder dbt-snowflake-Adapter
- **Dokumentation + Tests:** dbt docs, integrierte generische dbt-Tests + dbt-expectations, dbt-utils
- **Metriklayer:** dbt Semantic Layer (MetricFlow 0.200+) mit JDBC/ADBC-Exposition
- **Datenqualität:** Soda Core 3.x (Checks-as-Code) oder Great Expectations 0.18+ (GX Cloud)
- **BI / Dashboards:** Looker (LookML) oder Metabase 0.49+ (Open-Source)
- **Datenobservabilität:** Monte Carlo oder Bigeye (SaaS; verbindet sich mit Warehouse + dbt-Manifest)
- **Orchestrierung:** dbt Cloud Jobs oder Apache Airflow 2.9+ (selbst gehostet) oder Dagster 1.7+
- **Versionskontrolle:** GitHub (dbt-Projekt, dbt-Profile-Template, CI-Workflows)
- **Infrastruktur:** Terraform 1.8+ (BigQuery-Datasets, Snowflake-Warehouses, IAM, Fivetran-Konnektoren)
- **Alerting:** Slack (Webhook-basierte Alerts von Soda, Monte Carlo, dbt Cloud)
- **Secrets:** Google Secret Manager oder AWS Secrets Manager; referenziert in Terraform + dbt-Profilen

## Verzeichnisstruktur

```
analytics-platform/                          # Monorepo-Wurzel — versionskontrolliert in GitHub
├── .claude/
│   ├── CLAUDE.md                            # Repo-weite Anweisungen für Claude Code
│   ├── settings.json                        # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── new-model.md                     # /new-model — Staging-/Mart-dbt-Modell + Tests generieren
│       ├── run-quality.md                   # /run-quality — Soda-Checks gegen ein Dataset ausführen
│       ├── publish-dashboard.md             # /publish-dashboard — Looker-LookML- oder Metabase-Workflow
│       ├── data-incident.md                 # /data-incident — Incident-Triage-Runbook-Prompt
│       └── seed-refresh.md                  # /seed-refresh — dbt-Seeds aus Quell-CSVs neu laden
├── .github/
│   └── workflows/
│       ├── ci.yml                           # dbt compile + test bei PR gegen CI-Target
│       ├── slim-ci.yml                      # dbt build --select state:modified+ (Slim CI)
│       └── deploy.yml                       # Produktions-dbt-Run wird bei Merge auf main ausgelöst
├── terraform/                               # Infrastructure as Code
│   ├── environments/
│   │   ├── prod/
│   │   │   ├── main.tf                      # BigQuery / Snowflake Produktions-Ressourcen
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars.example     # Beispiel-Variablenwerte — echte tfvars werden per Git ignoriert
│   │   └── dev/
│   │       ├── main.tf                      # Dev-/Staging-Warehouse-Ressourcen
│   │       └── variables.tf
│   ├── modules/
│   │   ├── bigquery/
│   │   │   ├── datasets.tf                  # Raw-, Staging-, Marts-, Metrics-Datasets + IAM
│   │   │   └── service_accounts.tf          # Service-Accounts für dbt-Runner, Fivetran, Looker
│   │   ├── snowflake/
│   │   │   ├── warehouses.tf                # Virtuelle Warehouses nach Workload (ETL, BI, Ad-hoc)
│   │   │   ├── databases.tf                 # RAW-, DEV-, PROD-Datenbanken + Rollen
│   │   │   └── grants.tf                    # Rollenbasierte Grants: transformer, reporter, loader
│   │   ├── fivetran/
│   │   │   └── connectors.tf                # Fivetran-Konnektor-Ressourcen (Provider: fivetran/fivetran)
│   │   └── iam/
│   │       └── roles.tf                     # IAM-Bindungen nach dem Prinzip der minimalen Rechtevergabe
│   └── README.md                            # Terraform-Nutzung + State-Backend-Einrichtung
├── dbt/                                     # dbt Core Projektwurzel
│   ├── dbt_project.yml                      # Projektname, Version, Modellpfade, Variablenstandardwerte
│   ├── profiles.yml.template                # Profil-Template — das echte profiles.yml wird per Git ignoriert
│   ├── packages.yml                         # dbt-utils, dbt-expectations, dbt-date, codegen
│   ├── selectors.yml                        # Benannte Selektoren: nightly, finance, marketing
│   ├── seeds/
│   │   ├── country_codes.csv                # Statische Referenz: ISO-Ländercodes
│   │   ├── currency_rates.csv               # Monatliche Wechselkurse zur Finanznormalisierung
│   │   └── product_taxonomy.csv             # Internes Produkt-/SKU-Taxonomie-Mapping
│   ├── macros/
│   │   ├── generate_schema_name.sql         # Benutzerdefiniertes Schema-Routing nach Umgebung + Target
│   │   ├── cents_to_dollars.sql             # Makro zur Währungseinheitenkonvertierung
│   │   ├── surrogate_key.sql                # Kapselt dbt_utils.generate_surrogate_key
│   │   ├── not_null_proportion.sql          # Benutzerdefinierter Test: Null-Rate einer Spalte < Schwellenwert
│   │   └── freshness_check.sql              # Makro zum Prüfen des maximalen Zeilenalters in Stunden
│   ├── models/
│   │   ├── staging/                         # 1:1 mit Quelltabellen — nur leichte Bereinigung
│   │   │   ├── stripe/
│   │   │   │   ├── _stripe__sources.yml     # Source-Definitionen + Frische-Schwellenwerte
│   │   │   │   ├── _stripe__models.yml      # Spaltenebene-Docs + generische Tests für alle Staging-Modelle
│   │   │   │   ├── stg_stripe__customers.sql
│   │   │   │   ├── stg_stripe__subscriptions.sql
│   │   │   │   ├── stg_stripe__invoices.sql
│   │   │   │   └── stg_stripe__events.sql
│   │   │   ├── salesforce/
│   │   │   │   ├── _salesforce__sources.yml
│   │   │   │   ├── _salesforce__models.yml
│   │   │   │   ├── stg_salesforce__accounts.sql
│   │   │   │   ├── stg_salesforce__opportunities.sql
│   │   │   │   └── stg_salesforce__contacts.sql
│   │   │   ├── hubspot/
│   │   │   │   ├── _hubspot__sources.yml
│   │   │   │   ├── _hubspot__models.yml
│   │   │   │   ├── stg_hubspot__contacts.sql
│   │   │   │   └── stg_hubspot__deals.sql
│   │   │   └── app_db/                      # Produktionsdatenbank-Replikat (via Fivetran/Airbyte)
│   │   │       ├── _app_db__sources.yml
│   │   │       ├── _app_db__models.yml
│   │   │       ├── stg_app_db__users.sql
│   │   │       ├── stg_app_db__events.sql
│   │   │       └── stg_app_db__orders.sql
│   │   ├── intermediate/                    # Business-Logic-Joins — nicht direkt an BI exponiert
│   │   │   ├── int_customer_subscriptions.sql   # Verbundener Kunden- + Abonnementverlauf
│   │   │   ├── int_revenue_recognized.sql        # ASC 606 Umsatzrealisierungs-Zeitplan-Berechnung
│   │   │   └── int_user_sessions.sql             # Sessionierter Ereignisstrom
│   │   └── marts/                           # Finale analysebereite Modelle, an BI exponiert
│   │       ├── core/
│   │       │   ├── _core__models.yml        # Docs + Tests für alle Core-Mart-Modelle
│   │       │   ├── dim_customers.sql        # Kundendimension mit Attributen + Segmenten
│   │       │   ├── dim_products.sql         # Produkthierarchie aus Taxonomie-Seed
│   │       │   ├── fct_orders.sql           # Bestellungsfaktentabelle mit allen Fremdschlüsseln + Metriken
│   │       │   └── fct_subscriptions.sql    # Abonnement-Lebenszyklus-Ereignisse
│   │       ├── finance/
│   │       │   ├── _finance__models.yml
│   │       │   ├── fct_mrr.sql              # Monatlich wiederkehrender Umsatz nach Konto
│   │       │   ├── fct_arr_movements.sql    # ARR-Wasserfall: Neu, Expansion, Churn, Kontraktion
│   │       │   └── fct_invoices.sql         # Umsatz auf Rechnungsebene mit Realisierungszeitplan
│   │       └── marketing/
│   │           ├── _marketing__models.yml
│   │           ├── fct_campaigns.sql        # Kampagnen-Performance: Ausgaben, Conversions, CAC
│   │           └── fct_attribution.sql      # Multi-Touch-Attributionsmodell
│   ├── metrics/                             # dbt Semantic Layer MetricFlow-Definitionen
│   │   ├── mrr.yml                          # MRR-Metrik: Messgröße, Dimensionen, Zeitgranularitäten
│   │   ├── arr.yml                          # ARR-Metrik mit Filtern
│   │   ├── customer_count.yml               # Anzahl aktiver Kunden nach Segment
│   │   └── cac.yml                          # Kundenakquisitionskosten-Metrik
│   ├── analyses/                            # Ad-hoc-SQL als dbt-Analysen gespeichert (nicht materialisiert)
│   │   └── churn_cohort_analysis.sql        # Kohorten-Retentionsanalyse für Quartalsreviews
│   └── tests/                               # Singuläre Datentests (komplexe Logik, nicht generisch)
│       ├── assert_mrr_nonnegative.sql       # MRR darf auf Kontoebene nie negativ sein
│       └── assert_no_duplicate_orders.sql   # Bestell-IDs müssen quellübergreifend eindeutig sein
├── quality/                                 # Datenqualitätsprüfungen (Soda oder Great Expectations)
│   ├── soda/
│   │   ├── configuration.yml                # Soda Cloud-Verbindung + Warehouse-Zugangsdaten
│   │   ├── checks/
│   │   │   ├── staging/
│   │   │   │   ├── stripe_customers.yml     # Frische-, Vollständigkeits- und Format-Checks
│   │   │   │   └── salesforce_accounts.yml
│   │   │   └── marts/
│   │   │       ├── fct_mrr.yml              # Umsatzgenauigkeits-Checks gegenüber der Quelle
│   │   │       └── dim_customers.yml        # PK-Eindeutigkeit, referentielle Integrität
│   │   └── scan.sh                          # Einstiegspunkt: soda scan -d warehouse -c config
│   └── great_expectations/                  # Alternative: GX Cloud-Konfiguration
│       ├── great_expectations.yml           # Datasource: BigQuery- oder Snowflake-Verbindung
│       └── expectations/
│           ├── fct_orders_suite.json        # Expectation Suite für die Bestellungsfaktentabelle
│           └── dim_customers_suite.json
├── observability/                           # Monte Carlo / Bigeye-Konfiguration + Alert-Routing
│   ├── monte_carlo/
│   │   └── monitors.yml                     # Frische- + Volumen-Monitore auf Tabellenebene
│   └── alerts/
│       └── slack_routing.yml                # Alert-Schweregrad → Slack-Kanal-Zuordnung
├── docs/                                    # Ergänzende Dokumentation
│   ├── data-dictionary.md                   # Fachglossar: kanonische Metrikdefinitionen
│   ├── lineage.md                           # Quell-zu-BI-Lineage-Karte für Schlüsseltabellen
│   ├── incident-response.md                 # Runbook zur Datenqualitäts-Incident-Reaktion
│   └── onboarding.md                        # Onboarding-Leitfaden für neue Data Engineers
├── scripts/
│   ├── bootstrap_dev.sh                     # Lokales dbt-Profil + Warehouse-Dev-Schema einrichten
│   └── validate_manifest.py                 # dbt manifest.json parsen und Abdeckungsschwellenwerte prüfen
├── .env.example                             # Alle erforderlichen Umgebungsvariablen mit Kommentaren dokumentiert
└── .gitignore                               # profiles.yml, target/, dbt_packages/, *.tfvars
```

## Schlüsseldateien erklärt

| Pfad | Zweck |
|---|---|
| `dbt/dbt_project.yml` | Projektkonfiguration: Standard-Materialisierungen nach Ordner (staging → view, marts → table), Variablenstandards für umgebungsspezifische Logik, Zielpfad |
| `dbt/macros/generate_schema_name.sql` | Überschreibt dbt's Standard-Schema-Benennung, damit Dev-Runs in einem benutzerspezifischen Schema landen (z.B. `dbt_alice`) anstatt gemeinsame Schemas zu überschreiben |
| `dbt/models/staging/stripe/_stripe__sources.yml` | Deklariert die rohen Stripe-Tabellen als dbt-Sources mit Frische-Schwellenwerten; Source-Frische-Fehler blockieren nachgelagerte Runs in der CI |
| `dbt/metrics/mrr.yml` | MetricFlow Semantic Model-Definition: referenziert `fct_mrr`, definiert die `mrr`-Messgröße, unterstützte Dimensionen (customer_segment, plan) und Zeitgranularitäten (Tag, Monat, Quartal) |
| `quality/soda/checks/marts/fct_mrr.yml` | Soda-Checks nach dbt: prüft, dass die MRR-Summe der erwarteten Toleranz zum Vortag entspricht, keine Nullwerte in Schlüsselspalten, keine negativen Werte — sendet bei Fehler Slack-Alert |
| `terraform/modules/bigquery/datasets.tf` | Erstellt `raw`-, `staging`-, `marts`- und `metrics`-BigQuery-Datasets mit korrektem IAM: Fivetran Writer → nur raw; dbt-Service-Account → staging + marts; Looker → marts + metrics schreibgeschützt |
| `dbt/selectors.yml` | Benannte Selektoren ermöglichen `dbt build --selector nightly` für den vollständigen DAG und `--selector finance` für ausschließlich Finance-Mart-Modelle + ihre vorgelagerten Abhängigkeiten |
| `.github/workflows/slim-ci.yml` | Verwendet dbt's Slim CI: vergleicht das `manifest.json` des PRs mit dem Produktions-Manifest-Artefakt und erstellt nur die im PR geänderten Modelle, was die CI-Laufzeit um 60–80 % reduziert |
| `observability/alerts/slack_routing.yml` | Ordnet Alert-Schweregrade Slack-Kanälen zu: critical → #data-incidents, warning → #data-quality, info → #data-observability; verhindert Alert-Fatigue |
| `docs/data-dictionary.md` | Kanonische Definitionen für alle Geschäftsmetriken: MRR, ARR, CAC, Churn — referenziert in dbt-Modellbeschreibungen und Looker-LookML-Labels zur Konsistenzsicherung |

## Schnelles Scaffolding

```bash
# Voraussetzungen: Python 3.11+, pip oder pipx, Terraform 1.8+, GitHub CLI

# Projektwurzel erstellen und wechseln
mkdir analytics-platform && cd analytics-platform
git init

# Python-Virtual-Environment für dbt einrichten
python -m venv .venv && source .venv/bin/activate

# dbt Core mit Ihrem Warehouse-Adapter installieren
pip install dbt-core==1.8.* dbt-bigquery==1.8.*
# ODER für Snowflake:
# pip install dbt-core==1.8.* dbt-snowflake==1.8.*

# Soda Core installieren
pip install soda-core-bigquery==3.*
# ODER für Snowflake: pip install soda-core-snowflake==3.*

# Abhängigkeiten speichern
pip freeze > requirements.txt

# dbt-Projekt initialisieren
dbt init dbt --skip-profile-setup
cd dbt

# dbt-Pakete installieren
cat > packages.yml <<'EOF'
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]
  - package: calogica/dbt_expectations
    version: [">=0.10.0", "<1.0.0"]
  - package: dbt-labs/codegen
    version: [">=0.12.0", "<1.0.0"]
  - package: calogica/dbt_date
    version: [">=0.10.0", "<1.0.0"]
EOF
dbt deps
cd ..

# Verzeichnisstruktur erstellen
mkdir -p dbt/models/staging/{stripe,salesforce,hubspot,app_db}
mkdir -p dbt/models/intermediate
mkdir -p dbt/models/marts/{core,finance,marketing}
mkdir -p dbt/metrics dbt/analyses dbt/tests dbt/seeds dbt/macros
mkdir -p quality/soda/checks/{staging,marts}
mkdir -p quality/great_expectations/expectations
mkdir -p observability/{monte_carlo,alerts}
mkdir -p terraform/environments/{prod,dev}
mkdir -p terraform/modules/{bigquery,snowflake,fivetran,iam}
mkdir -p docs scripts
mkdir -p .github/workflows
mkdir -p .claude/commands

# Terraform initialisieren
cd terraform && terraform init && cd ..

# .env.example erstellen
cat > .env.example <<'EOF'
# BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
BQ_PROJECT=your-gcp-project-id
BQ_DATASET_RAW=raw
BQ_DATASET_STAGING=staging
BQ_DATASET_MARTS=marts

# Snowflake (Alternative)
SNOWFLAKE_ACCOUNT=yourorg-youraccountname
SNOWFLAKE_USER=dbt_runner
SNOWFLAKE_PRIVATE_KEY_PATH=/path/to/rsa_key.p8
SNOWFLAKE_DATABASE=PROD
SNOWFLAKE_WAREHOUSE=TRANSFORMING

# dbt
DBT_TARGET=dev
DBT_PROFILES_DIR=~/.dbt

# Soda
SODA_API_KEY_ID=your-soda-api-key-id
SODA_API_KEY_SECRET=your-soda-api-key-secret

# Slack-Alerting
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
SLACK_CHANNEL_INCIDENTS=#data-incidents

# Monte Carlo
MONTECARLO_API_KEY_ID=your-mc-key-id
MONTECARLO_API_TOKEN=your-mc-token

# Terraform-State
TF_STATE_BUCKET=your-terraform-state-bucket
EOF

# .gitignore erstellen
cat > .gitignore <<'EOF'
.venv/
dbt/target/
dbt/dbt_packages/
dbt/logs/
profiles.yml
*.tfvars
!*.tfvars.example
.env
*.credentials.json
__pycache__/
.DS_Store
EOF

# Claude Code konfigurieren
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-model.md
touch .claude/commands/run-quality.md
touch .claude/commands/publish-dashboard.md
touch .claude/commands/data-incident.md

# Claudient-Skills installieren
npx claudient add skill data-ml/sql
npx claudient add skill data-ml/dbt-data-pipelines
npx claudient add skill data-ml/data-quality-checker
npx claudient add skill data-ml/dashboard-narrator
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/cicd

echo "Analytics-Plattform wurde eingerichtet. Nächste Schritte: profiles.yml konfigurieren, Terraform-Backend einrichten, dann ausführen: dbt debug"
```

## CLAUDE.md-Template

```markdown
# Analytics Platform

Data-Engineering-Monorepo für den vollständigen Analytics-Stack: Fivetran/Airbyte für die Ingestion,
BigQuery oder Snowflake als Warehouse, dbt Core 1.8 für Transformationen und Metriken,
Soda für Datenqualitätsprüfungen und Looker oder Metabase für die BI-Auslieferung.
Monte Carlo oder Bigeye stellt die Observabilität sicher. Die gesamte Infrastruktur wird mit Terraform verwaltet.

## Stack

- dbt Core 1.8 + dbt-bigquery- oder dbt-snowflake-Adapter
- Warehouse: BigQuery (Google Cloud) oder Snowflake
- Ingestion: Fivetran (verwaltet) oder Airbyte (selbst gehostet)
- Datenqualität: Soda Core 3.x (Checks-as-Code YAML)
- Metriken: dbt Semantic Layer mit MetricFlow
- Observabilität: Monte Carlo oder Bigeye
- BI: Looker (LookML) oder Metabase
- Orchestrierung: dbt Cloud Jobs oder Airflow 2.9+ oder Dagster 1.7
- Infrastruktur: Terraform 1.8
- Alerting: Slack-Webhooks
- CI/CD: GitHub Actions (Slim CI bei PR, vollständiger Run bei Merge auf main)

## Projektstruktur

- `dbt/models/staging/` — 1:1 mit rohen Quelltabellen; nur umbenennen, casten, coalescen — keine Joins
- `dbt/models/intermediate/` — Business-Logic-Joins; nicht an BI exponiert
- `dbt/models/marts/` — finale verbraucherorientierte Tabellen; an Looker / Metabase exponiert
- `dbt/metrics/` — MetricFlow Semantic Model-Definitionen
- `dbt/macros/` — wiederverwendbare Jinja-Makros; Eingaben und Ausgaben immer dokumentieren
- `dbt/seeds/` — statische Referenz-CSVs; nur für sich langsam ändernde Lookup-Daten
- `quality/soda/` — Soda-Checks nach dbt gegen Mart-Tabellen
- `terraform/` — gesamte Infrastruktur hier definiert; keine manuellen Konsolenänderungen
- `observability/` — Monte Carlo Monitor-Konfigurationen und Slack-Alert-Routing

## Neues dbt-Modell hinzufügen — genaue Schritte

1. Die richtige Schicht bestimmen: staging (raw 1:1), intermediate (verknüpfte Business-Logik) oder mart (BI-bereit)
2. Für staging: `dbt run-operation codegen.generate_source` ausführen, um das Source-YAML zu generieren
3. Die SQL-Datei im richtigen Unterverzeichnis nach der Namenskonvention erstellen:
   - Staging: `stg_{source}__{entity}.sql`
   - Intermediate: `int_{description}.sql`
   - Mart: `fct_{fact_name}.sql` oder `dim_{dimension_name}.sql`
4. Das Modell zur entsprechenden `_models.yml`-Datei mit Beschreibung und spaltenbasierter Dokumentation hinzufügen
5. Mindestens hinzufügen: `not_null`- + `unique`-Tests auf dem Primärschlüssel; `accepted_values` auf Enum-Spalten
6. Für Marts: eine entsprechende Soda-Check-Datei in `quality/soda/checks/marts/` hinzufügen
7. Lokal ausführen: `dbt build --select +your_model_name+ --target dev`
8. Verifizieren mit: `dbt test --select your_model_name`
9. Den Slash-Befehl `/new-model` verwenden, um SQL + YAML-Boilerplate zu generieren

## Datenqualitätsprüfungen ausführen

```bash
# Soda-Checks für ein bestimmtes Dataset ausführen
cd quality/soda
soda scan -d bigquery -c configuration.yml checks/marts/fct_mrr.yml

# Alle Staging-Checks ausführen
soda scan -d bigquery -c configuration.yml checks/staging/

# Alle Mart-Checks ausführen (typischerweise nach Abschluss von dbt build)
soda scan -d bigquery -c configuration.yml checks/marts/

# Den Slash-Befehl /run-quality für von Claude geführte Check-Ausführung verwenden
```

Die Soda-Konfiguration erwartet `SODA_API_KEY_ID` und `SODA_API_KEY_SECRET` in der Umgebung.
Fehlgeschlagene Checks senden Slack-Alerts über den in `observability/alerts/slack_routing.yml` konfigurierten Webhook.

## Looker-Dashboard veröffentlichen

1. LookML-View-Dateien, die das Mart-Modell referenzieren, hinzufügen oder aktualisieren
2. Explores in der Modelldatei mit geeigneten Joins und Zugriffsfiltern definieren
3. Die Dashboard-LookML-Datei in `looker/dashboards/` erstellen oder aktualisieren
4. `lookml-linter` lokal vor dem Push ausführen
5. Auf main mergen — Looker zieht automatisch vom verbundenen GitHub-Branch
6. Im Looker IDE validieren: Content Validator muss ohne Fehler bestehen
7. Für Metabase: direkt mit der Mart-Tabelle verbinden, Frage erstellen, in Sammlung speichern
8. Den Slash-Befehl `/publish-dashboard` für geführtes LookML-Scaffolding verwenden

## dbt Semantic Layer / MetricFlow

- Metrikdefinitionen befinden sich in `dbt/metrics/*.yml` — nicht in Modell-YAML-Dateien
- Jede Metrik muss ein Semantic Model referenzieren (die zugrundeliegende Mart-Tabelle)
- Unterstützte Zeitgranularitäten: `day`, `week`, `month`, `quarter`, `year`
- Metriken lokal testen: `dbt sl query --metrics mrr --group-by metric_time__month`
- Metriken über die dbt Semantic Layer JDBC-Verbindung an Looker exponiert; nicht in LookML duplizieren
- Metrik hinzufügen: in YAML definieren, `dbt sl validate` ausführen, dann `dbt sl generate-metrics-docs`

## Konventionen für Umgebungsvariablen

| Variable | Zweck | Wo konfigurieren |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Pfad zum BigQuery-Service-Account-JSON | Lokal ~/.zshrc, CI-Secret |
| `SNOWFLAKE_PRIVATE_KEY_PATH` | Pfad zum RSA-Schlüssel für Snowflake-Auth | Lokal ~/.zshrc, CI-Secret |
| `DBT_TARGET` | Aktives dbt-Target: `dev`, `ci` oder `prod` | Pro Aufruf oder in CI-Umgebung gesetzt |
| `SODA_API_KEY_ID` / `SODA_API_KEY_SECRET` | Soda Cloud-Authentifizierung | CI-Secret, lokale .env |
| `SLACK_WEBHOOK_URL` | Slack-Incoming-Webhook für Qualitäts-Alerts | CI-Secret, lokale .env |
| `MONTECARLO_API_KEY_ID` / `MONTECARLO_API_TOKEN` | Monte Carlo API-Zugriff | CI-Secret |
| `TF_STATE_BUCKET` | GCS- oder S3-Bucket für Terraform-Remote-State | CI-Secret |

Niemals `.env`-, `profiles.yml`- oder `*.tfvars`-Dateien mit echten Zugangsdaten committen.
Alle Variablen müssen vor dem Merge in `.env.example` dokumentiert werden.

## Zugriffskontrollmodell

- **Raw-Schicht:** Fivetran-Service-Account hat Schreibzugriff; keine menschlichen Benutzer
- **Staging + Marts:** dbt-Runner-Service-Account hat Schreibzugriff; Looker / Metabase Service-Accounts haben Lesezugriff
- **Dev-Schemas:** Jeder Engineer hat sein eigenes Schema (`dbt_<username>`); isoliert über die `generate_schema_name`-Makro
- **Produktions-Schemas:** Nur der dbt Cloud / CI-Runner darf schreiben; durchgesetzt via IAM / Snowflake Grants
- **Terraform:** Infrastrukturänderungen erfordern PR-Review; `terraform apply` läuft nur in der CI bei Merge auf main
- **Looker:** Content-Zugriff über Looker-Gruppen gesteuert, die auf Data-Team-Rollen gemappt sind

## Incident Response bei Datenqualitätsfehlern

1. **Alert ausgelöst** (Soda Check oder Monte Carlo): erscheint im Slack-Kanal #data-incidents
2. **Triage** (< 15 Min.): den Slash-Befehl `/data-incident` verwenden, um den geführten Triage-Prompt auszuführen
3. **Umfang identifizieren**: dbt-Manifest-Lineage prüfen, um alle betroffenen nachgelagerten Modelle + Dashboards zu finden
4. **Quarantäne**: Bei falschen Produktionsdaten einen `where false`-Filter zum betroffenen Mart-Modell hinzufügen und redeployen, damit BI-Konsumenten keine schlechten Daten sehen
5. **Ursachenanalyse**: Source-Frische prüfen (`dbt source freshness`), Zeilenanzahlen in Rohtabellen, Fivetran-Konnektor-Status
6. **Beheben**: Das upstream-Source-Problem oder die dbt-Logik korrigieren; `dbt build --select +affected_model+` ausführen
7. **Qualitätsprüfungen erneut ausführen**: `soda scan` gegen betroffene Tabellen, bevor die Quarantäne aufgehoben wird
8. **Postmortem**: In `docs/incident-response.md` mit Zeitlinie, Ursache und Präventionsmaßnahmen dokumentieren
9. **Stakeholder informieren**: Den `/stakeholder-report`-Skill verwenden, um eine Incident-Zusammenfassung zu erstellen

## Terraform-Workflow

```bash
# Änderungen planen (immer vor dem Apply)
cd terraform/environments/prod
terraform init -backend-config="bucket=${TF_STATE_BUCKET}"
terraform plan -out=tfplan

# Anwenden (CI nur für Produktion; lokale Dev-Umgebung ist in Ordnung)
terraform apply tfplan

# Niemals terraform apply ohne Plan-Datei in der Produktion verwenden
```

## dbt-Modell-Materialisierungsstrategie

- `staging/` → `view` (günstig, immer frisch, keine Speicherkosten)
- `intermediate/` → `ephemeral` oder `view` (je nach Abfragekomplexität)
- `marts/core/` → `table` (bei jedem Run aktualisiert; kleine Tabellen unter 10M Zeilen)
- `marts/finance/`, `marts/marketing/` → `incremental` für große Faktentabellen (> 10M Zeilen)
- `metrics/` → von MetricFlow verwaltet; Materialisierung nicht manuell festlegen

## Was nicht zu tun ist

- Keine Joins zwischen Staging-Modellen — Joins gehören in die Intermediate- oder Mart-Schicht
- Keine hartcodierten Warehouse- oder Dataset-Namen im SQL — `{{ target.schema }}` und `{{ ref() }}` verwenden
- Kein `dbt run` in der Produktion ohne unmittelbar anschließendes `dbt test`
- `dbt/target/manifest.json` nicht manuell ändern — es ist ein generiertes Artefakt
- Keine Terraform-Änderungen in der Produktion ohne PR-genehmigten Plan
- Keinen Raw-Layer-Zugriff für BI-Tools gewähren — Looker und Metabase dürfen nur aus Marts lesen
- Keine Metrik in Looker LookML hinzufügen, wenn sie bereits im dbt Semantic Layer definiert ist
```

## MCP-Server

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/analytics-platform"
      ]
    },
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "${GOOGLE_APPLICATION_CREDENTIALS}",
        "BIGQUERY_PROJECT": "${BQ_PROJECT}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_CONNECTION_STRING}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
      }
    }
  }
}
```

## Empfohlene Hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */dbt/models/*.sql ]]; then echo \"[HOOK] dbt model written — run: dbt compile --select $(basename $f .sql) to verify Jinja renders\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */dbt/metrics/*.yml ]]; then echo \"[HOOK] MetricFlow metric written — validate with: dbt sl validate\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */terraform/*.tf ]]; then echo \"[HOOK] Terraform file changed — run: terraform validate && terraform plan\" >&2; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"dbt run|dbt build\" && echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qv \"\\-\\-target dev\"; then echo \"[HOOK] WARNING: running dbt without --target dev — confirm this is intentional\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"terraform apply\" && echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qv \"tfplan\"; then echo \"[HOOK] BLOCKED: always run terraform plan first and apply with a plan file\" >&2; exit 1; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx claudient add skill data-ml/sql
npx claudient add skill data-ml/dbt-data-pipelines
npx claudient add skill data-ml/data-quality-checker
npx claudient add skill data-ml/dashboard-narrator
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/cicd
npx claudient add skill productivity/stakeholder-comms
```

## Verwandte Ressourcen

- [dbt Data Pipelines Guide](../guides/dbt-data-pipelines.md)
- [Datenqualitäts-Workflow](../workflows/data-quality-pipeline.md)
- [Stakeholder-Report-Workflow](../workflows/stakeholder-reporting.md)
- [Infrastructure as Code Struktur](./infrastructure-as-code.md)
- [Datenpipeline-Struktur](./data-pipeline.md)
