# Data Analyst Workspace — Project Structure

> For data analysts doing SQL querying, Python-based exploratory analysis, dashboard maintenance, and stakeholder reporting against BigQuery or Snowflake, with dbt for transformations and Looker or Metabase for BI.

## Stack

- **Data warehouse:** BigQuery or Snowflake
- **Transformations:** dbt Core (or dbt Cloud)
- **BI / dashboards:** Looker or Metabase
- **Analysis:** Python 3.11+, pandas 2.x / polars 0.20+, Jupyter Lab 4.x
- **Notebooks:** JupyterLab, nbconvert (for HTML exports)
- **Version control:** Git + GitHub
- **Communication:** Slack
- **Package management:** uv (Python), pip-tools for pinned requirements
- **Data quality:** Great Expectations or custom SQL assertion scripts
- **Scheduling:** dbt Cloud jobs, or cron + Makefile locally

## Directory tree

```
my-analytics-workspace/
├── .claude/
│   ├── commands/                     # slash commands available in this project
│   │   ├── analyze.md                # /analyze — explore a dataset or question end-to-end
│   │   ├── sql-query.md              # /sql-query — write, optimise, and explain SQL
│   │   ├── dashboard-update.md       # /dashboard-update — refresh dashboard logic or SQL
│   │   ├── data-quality-check.md     # /data-quality-check — run assertions, find anomalies
│   │   ├── stakeholder-report.md     # /stakeholder-report — turn metrics into narrative
│   │   └── explore.md                # /explore — open-ended EDA on a table or dataset
│   ├── settings.json                 # hooks, MCP server refs, permissions
│   └── mcp.json                      # MCP server configs (BigQuery, Slack)
├── queries/                          # saved, version-controlled SQL by domain
│   ├── product/
│   │   ├── dau-wau-mau.sql           # active user metrics query
│   │   ├── retention-cohorts.sql     # weekly retention by signup cohort
│   │   └── funnel-conversion.sql     # step-by-step funnel with drop-off rates
│   ├── revenue/
│   │   ├── mrr-breakdown.sql         # MRR by plan, expansion, churn
│   │   ├── ltv-by-segment.sql        # customer LTV segmented by acquisition channel
│   │   └── ar-aging.sql              # accounts receivable aging report
│   ├── marketing/
│   │   ├── campaign-attribution.sql  # last-touch and linear attribution by channel
│   │   ├── cac-by-channel.sql        # customer acquisition cost per channel
│   │   └── email-engagement.sql      # open/click rates by campaign and segment
│   ├── operations/
│   │   ├── support-ticket-volume.sql # ticket volume, SLA breach rate, CSAT
│   │   └── eng-deploy-frequency.sql  # deployment cadence and rollback rate
│   └── _shared/
│       ├── date-spine.sql            # reusable date dimension CTE
│       └── user-spine.sql            # reusable user dimension CTE
├── notebooks/                        # Jupyter analysis notebooks
│   ├── 2026-05-product-drop-rca.ipynb        # root cause analysis, product drop May 2026
│   ├── 2026-04-ltv-model-v2.ipynb            # LTV model iteration and validation
│   ├── 2026-03-churn-predictors.ipynb        # churn feature exploration
│   ├── templates/
│   │   ├── eda-template.ipynb        # standard EDA notebook scaffold
│   │   └── ab-test-analysis.ipynb    # A/B test results template with significance tests
│   └── exports/                      # nbconvert HTML exports for sharing
│       └── 2026-05-product-drop-rca.html
├── dashboards/                       # dashboard specs and the SQL powering them
│   ├── executive-weekly/
│   │   ├── spec.md                   # what the dashboard shows, audience, refresh cadence
│   │   ├── headline-metrics.sql      # top-level KPI query
│   │   └── wow-trend.sql             # week-over-week trend with annotations
│   ├── product-health/
│   │   ├── spec.md
│   │   ├── activation-funnel.sql
│   │   ├── feature-adoption.sql
│   │   └── nps-over-time.sql
│   └── marketing-performance/
│       ├── spec.md
│       ├── paid-overview.sql
│       └── organic-vs-paid.sql
├── reports/                          # stakeholder deliverables — exported or written
│   ├── weekly/
│   │   ├── 2026-W22-business-review.md       # weekly business review narrative
│   │   └── 2026-W21-business-review.md
│   ├── monthly/
│   │   ├── 2026-05-monthly-review.md
│   │   └── 2026-04-monthly-review.md
│   └── ad-hoc/
│       ├── 2026-05-15-pricing-impact-analysis.md
│       └── 2026-04-20-q1-board-data-pack.md
├── data-quality/                     # quality checks and anomaly logs
│   ├── checks/
│   │   ├── orders-freshness.sql      # assert orders loaded within 4 hours of close-of-day
│   │   ├── revenue-nulls.sql         # assert no null revenue on completed orders
│   │   ├── user-id-referential.sql   # assert FK integrity between users and orders
│   │   └── duplicate-event-ids.sql   # assert event_id uniqueness in events table
│   ├── anomaly-log.md                # running log of anomalies found and resolution status
│   └── runbook.md                    # what to do when a check fails — escalation path
├── transforms/                       # dbt models managed from this workspace
│   ├── dbt_project.yml               # project name, model paths, materialisation defaults
│   ├── profiles.yml                  # dbt connection profiles (BigQuery / Snowflake)
│   ├── models/
│   │   ├── staging/
│   │   │   ├── stg_orders.sql        # clean, typed orders from raw
│   │   │   ├── stg_users.sql         # clean users with deduplication
│   │   │   └── stg_events.sql        # clean product events with parsed properties
│   │   ├── intermediate/
│   │   │   ├── int_user_sessions.sql # session construction from events
│   │   │   └── int_order_items.sql   # order line items joined to product catalog
│   │   └── marts/
│   │       ├── fct_orders.sql        # order fact table for reporting
│   │       ├── fct_events.sql        # event fact table for product analytics
│   │       ├── dim_users.sql         # user dimension with segments and LTV bands
│   │       └── dim_dates.sql         # date dimension for all time intelligence
│   ├── tests/
│   │   ├── generic/                  # dbt generic test overrides
│   │   └── singular/
│   │       └── assert_revenue_positive.sql
│   └── macros/
│       ├── date_trunc_safe.sql       # null-safe date_trunc macro
│       └── fiscal_quarter.sql        # company fiscal quarter from calendar date
├── docs/                             # data dictionary and metric definitions
│   ├── metric-definitions.md         # canonical definitions for all reported metrics
│   ├── data-dictionary.md            # table and column descriptions for key datasets
│   ├── schema-changelog.md           # record of upstream schema changes and impact
│   └── onboarding.md                 # how a new analyst gets up to speed on this workspace
├── requirements.txt                  # pinned Python dependencies
├── pyproject.toml                    # project metadata and tool config (ruff, black)
├── Makefile                          # common tasks: dbt run, quality checks, notebook export
├── .env.example                      # env var template — never commit .env
└── CLAUDE.md                         # project instructions for Claude Code
```

## Key files explained

| Path | Purpose |
|---|---|
| `.claude/commands/analyze.md` | Slash command that takes a dataset name and question, runs EDA, and returns a structured finding with SQL and interpretation |
| `.claude/commands/stakeholder-report.md` | Generates a business narrative from raw metric numbers — headline, drivers, anomalies, recommendations |
| `.claude/settings.json` | Configures hooks (auto-stage SQL on Write, audit log), and references the BigQuery and Slack MCP servers |
| `queries/_shared/date-spine.sql` | Shared date dimension CTE referenced across all time-series queries — editing this propagates everywhere |
| `transforms/models/marts/fct_orders.sql` | Central orders fact table — the source of truth for revenue, transaction counts, and AOV |
| `docs/metric-definitions.md` | Canonical definitions so Claude (and humans) use the same business logic for every metric |
| `data-quality/anomaly-log.md` | Running log of data issues — Claude appends to this when /data-quality-check finds anomalies |
| `dashboards/executive-weekly/spec.md` | Dashboard specification including audience, refresh schedule, KPI owners, and known limitations |

## Quick scaffold

```bash
# Create the workspace directory and enter it
mkdir my-analytics-workspace && cd my-analytics-workspace
git init

# Create Claude Code config directories and command files
mkdir -p .claude/commands .claude/logs

# Core workspace directories
mkdir -p queries/{product,revenue,marketing,operations,_shared}
mkdir -p notebooks/{templates,exports}
mkdir -p dashboards/{executive-weekly,product-health,marketing-performance}
mkdir -p reports/{weekly,monthly,ad-hoc}
mkdir -p data-quality/checks
mkdir -p transforms/models/{staging,intermediate,marts}
mkdir -p transforms/{tests/singular,tests/generic,macros}
mkdir -p docs

# Touch placeholder files so directories track in git
touch queries/product/dau-wau-mau.sql
touch queries/revenue/mrr-breakdown.sql
touch queries/_shared/{date-spine.sql,user-spine.sql}
touch data-quality/anomaly-log.md data-quality/runbook.md
touch docs/{metric-definitions.md,data-dictionary.md,schema-changelog.md}

# Python environment
python3 -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install pandas polars jupyterlab nbconvert great-expectations dbt-bigquery sqlfluff ruff black

# Freeze requirements
pip freeze > requirements.txt

# dbt project init (choose bigquery or snowflake)
dbt init transforms

# Create .env.example
cat > .env.example <<'EOF'
BIGQUERY_PROJECT=your-gcp-project-id
BIGQUERY_DATASET=analytics
SNOWFLAKE_ACCOUNT=your-account.region
SNOWFLAKE_USER=analyst@company.com
SNOWFLAKE_DATABASE=ANALYTICS
SNOWFLAKE_SCHEMA=PUBLIC
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_TEAM_ID=T0XXXXXXXXX
EOF

# .gitignore
cat > .gitignore <<'EOF'
.env
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
notebooks/exports/*.html
transforms/target/
transforms/dbt_packages/
transforms/logs/
.DS_Store
EOF

# Install Claude Code skills
npx claudient add skill data-ml/sql
npx claudient add skill data-ml/pandas-polars
npx claudient add skill data-ml/dashboard-narrator
npx claudient add skill data-ml/data-quality-checker
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill data-ml/dbt-data-pipelines
npx claudient add skill data-ml/synthetic-data

git add .
git commit -m "chore: initial data analyst workspace scaffold"
```

## CLAUDE.md template

```markdown
# Data Analyst Workspace

This is a data analyst workspace for exploratory analysis, dashboard maintenance,
ad-hoc requests, and stakeholder reporting. The source of truth for all metrics
is in the BigQuery/Snowflake data warehouse. dbt manages transformations.
Looker/Metabase is the BI layer. Do not modify mart-layer dbt models without
understanding downstream dashboard dependencies.

---

## Stack

- Data warehouse: BigQuery (project: `your-gcp-project`) or Snowflake
- Transformations: dbt Core, models in `transforms/`
- BI: Looker / Metabase (dashboard specs in `dashboards/`)
- Analysis: Python 3.11, pandas 2.x / polars 0.20, JupyterLab 4
- Version control: Git + GitHub

---

## Metric definitions

All metric definitions are canonical in `docs/metric-definitions.md`.
Never compute a metric differently from what is defined there.
If a stakeholder asks for a number that conflicts with these definitions, flag it.

---

## Common tasks and exact commands

| Task | Command |
|---|---|
| Explore a dataset or answer a question | `/analyze <table_or_dataset> — <question>` |
| Write or debug a SQL query | `/sql-query <describe what you need>` |
| Update a dashboard's underlying SQL | `/dashboard-update <dashboard-name>` |
| Run data quality checks on a table | `/data-quality-check <table_name>` |
| Write a stakeholder report from metrics | `/stakeholder-report <context or paste metrics>` |
| Open-ended EDA on a new table | `/explore <table_name>` |

---

## SQL conventions

- All queries use CTEs — no subquery nesting beyond two levels
- Date filters always use `DATE_TRUNC` with explicit grain (day, week, month)
- BigQuery: use backtick identifiers — `` `project.dataset.table` ``
- Snowflake: use double-quote identifiers where schema is case-sensitive
- Window functions preferred over self-joins for running totals and rankings
- Every query saved to `queries/` must have a comment block: purpose, grain, owner

---

## dbt conventions

- Staging models: `stg_<source>_<entity>.sql` — clean and type-cast only
- Intermediate models: `int_<description>.sql` — joins and sessionisation
- Mart models: `fct_<entity>.sql` and `dim_<entity>.sql` — reporting-ready
- All mart models must have dbt tests: `not_null`, `unique` on primary keys
- Do not change mart column names without updating `docs/metric-definitions.md`

---

## Notebook conventions

- Filename format: `YYYY-MM-<slug>.ipynb` (e.g., `2026-05-ltv-deep-dive.ipynb`)
- First cell: markdown — purpose, owner, date, key questions answered
- Last cell: markdown — findings summary and recommended actions
- Export to HTML before sharing: `jupyter nbconvert --to html <notebook>`

---

## Data quality

- All anomalies found must be appended to `data-quality/anomaly-log.md`
- Format: date, table, issue description, impact, resolution status
- If a check fails in `data-quality/checks/`, follow `data-quality/runbook.md`

---

## Do not

- Do not commit `.env` — use `.env.example` only
- Do not modify `docs/metric-definitions.md` without team review
- Do not create notebooks outside `notebooks/` — exports go to `notebooks/exports/`
- Do not run destructive SQL (DELETE, TRUNCATE, DROP) without a second confirmation
```

## MCP servers

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account-key.json",
        "BIGQUERY_PROJECT": "your-gcp-project-id",
        "BIGQUERY_DATASET": "analytics"
      }
    },
    "snowflake": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-snowflake"],
      "env": {
        "SNOWFLAKE_ACCOUNT": "your-account.region",
        "SNOWFLAKE_USER": "analyst@company.com",
        "SNOWFLAKE_PASSWORD": "your-password",
        "SNOWFLAKE_DATABASE": "ANALYTICS",
        "SNOWFLAKE_SCHEMA": "PUBLIC",
        "SNOWFLAKE_WAREHOUSE": "COMPUTE_WH"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token-here",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
    }
  }
}
```

## Recommended hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == *.sql ]]; then sqlfluff fix --dialect bigquery \"$CLAUDE_TOOL_INPUT_FILE_PATH\" --quiet; fi'",
            "async": true
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == */data-quality/anomaly-log.md ]]; then git add \"$CLAUDE_TOOL_INPUT_FILE_PATH\"; fi'",
            "async": true
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qiE \"(DELETE|TRUNCATE|DROP TABLE|DROP VIEW)\"; then echo \"DESTRUCTIVE SQL DETECTED — confirm intent before proceeding\" >&2; exit 1; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills to install

```bash
npx claudient add skill data-ml/sql
npx claudient add skill data-ml/pandas-polars
npx claudient add skill data-ml/dashboard-narrator
npx claudient add skill data-ml/data-quality-checker
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill data-ml/dbt-data-pipelines
npx claudient add skill data-ml/synthetic-data
```

## Related

- [Guide: Claude for Data Analysts](../guides/for-data-analyst.md)
- [Workflow: Data Reporting](../workflows/data-reporting.md)
