# AI Backend Inference Hub

Ein produktionsreifer KI-Backend für hochgradig parallelisierte LLM-Inferenz, Multi-Agent-Routing und SaaS-Monetarisierung. Konzipiert für Teams, die KI-gestützte Anwendungen mit strikten Anforderungen an Latenz, Kosten und Governance entwickeln.

---

## Verzeichnisstruktur

```
ai-backend-inference-hub/
├── api-gateway-and-routes/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app entry point
│   ├── routes.py                  # Core API endpoints (inference, agents, status)
│   ├── middleware.py              # Auth, rate limiting, error handling
│   ├── schemas.py                 # Pydantic models (request/response)
│   └── exceptions.py              # Custom exceptions
├── agents/
│   ├── __init__.py
│   ├── router.py                  # Agent dispatcher (route to correct agent)
│   ├── registry.py                # Agent catalog and metadata
│   ├── base.py                    # BaseAgent abstract class
│   ├── chat_agent.py              # Conversational agent
│   ├── reasoning_agent.py         # Chain-of-thought reasoning
│   ├── code_interpreter.py        # Sandboxed code execution
│   └── search_agent.py            # Web/knowledge search integration
├── tasks/
│   ├── __init__.py
│   ├── celery_app.py              # Celery app, Redis connection
│   ├── inference_task.py          # Async inference job
│   ├── batch_processor.py         # Batch job orchestration
│   └── health_monitor.py          # Heartbeat, queue depth monitoring
├── inference/
│   ├── __init__.py
│   ├── bedrock_client.py          # AWS Bedrock wrapper (Claude, Llama)
│   ├── streaming_handler.py       # Stream tokens to client
│   ├── token_counter.py           # Estimate + count tokens
│   └── prompt_cache.py            # Prompt caching layer (Redis)
├── billing/
│   ├── __init__.py
│   ├── stripe_integration.py      # Stripe SDK wrapper
│   ├── metering.py                # Usage tracking (tokens, requests)
│   ├── quota_enforcer.py          # Rate limits, quota checks
│   └── webhook_handlers.py        # Stripe events
├── database/
│   ├── __init__.py
│   ├── models.py                  # SQLAlchemy ORM (User, Inference Log, Batch Job)
│   ├── connection.py              # PostgreSQL session factory
│   ├── migrations/
│   │   └── alembic/               # Database migrations (Alembic)
│   │       ├── env.py
│   │       ├── versions/
│   │       │   ├── 001_initial.py
│   │       │   ├── 002_add_usage_snapshots.py
│   │       │   └── 003_add_batch_jobs.py
│   │       └── script.py.mako
│   └── repositories.py            # Data access layer
├── config/
│   ├── __init__.py
│   ├── settings.py                # Pydantic BaseSettings (env vars)
│   ├── agents.yaml                # Agent definitions and routing rules
│   ├── models.yaml                # LLM model configs (Bedrock aliases)
│   └── rate_limits.yaml           # Rate limit tiers (free/pro/enterprise)
├── kubernetes/
│   ├── base/
│   │   ├── deployment.yaml        # Deployment spec
│   │   ├── service.yaml           # LoadBalancer service
│   │   ├── configmap.yaml         # agents.yaml, models.yaml
│   │   ├── secret.yaml            # AWS credentials, Stripe key (kustomize)
│   │   ├── hpa.yaml               # Horizontal Pod Autoscaling (CPU/memory)
│   │   ├── ingress.yaml           # Ingress with SSL termination
│   │   └── kustomization.yaml
│   ├── overlays/
│   │   ├── staging/
│   │   │   ├── kustomization.yaml # Override replicas, resources, env
│   │   │   └── ingress-patch.yaml
│   │   └── production/
│   │       ├── kustomization.yaml
│   │       ├── ingress-patch.yaml
│   │       └── hpa-patch.yaml     # Higher replica limits
│   └── README.md                  # Deployment guide (kustomize, ArgoCD)
├── terraform/
│   ├── main.tf                    # Provider, backend config
│   ├── eks.tf                     # EKS cluster, node groups
│   ├── rds.tf                     # PostgreSQL database
│   ├── elasticache.tf             # Redis for caching, Celery broker
│   ├── ecr.tf                     # ECR repository for Docker images
│   ├── iam.tf                     # IAM roles (Bedrock, Stripe, logging)
│   ├── outputs.tf
│   ├── variables.tf
│   └── terraform.tfvars.example
├── tests/
│   ├── conftest.py                # Pytest fixtures (mocked Bedrock, Stripe)
│   ├── test_api.py                # API endpoint tests
│   ├── test_agents.py             # Agent routing logic
│   ├── test_inference.py          # Token counting, caching
│   ├── test_billing.py            # Quota enforcement, metering
│   ├── integration_test.py        # End-to-end flow
│   └── fixtures/
│       ├── sample_requests.json
│       └── sample_responses.json
├── docker/
│   ├── Dockerfile                 # Multi-stage build (Python 3.12)
│   ├── docker-compose.yml         # Local dev (FastAPI, Celery, Redis, PostgreSQL)
│   └── .dockerignore
├── scripts/
│   ├── setup.sh                   # Poetry install, alembic upgrade
│   ├── scaffold.py                # Generate project from template
│   ├── run_worker.sh              # Start Celery worker
│   └── seed_config.py             # Load agents.yaml → database
├── pyproject.toml                 # Dependencies, build config
├── README.md                      # Setup, deployment, API docs link
├── CLAUDE.md                      # Agent development, prompt versions, observability
└── .env.example                   # Template (AWS_ACCESS_KEY, STRIPE_API_KEY, etc.)
```

## Wichtigste Dateien erklärt

| Pfad | Zweck |
|---|---|
| `src/api/main.py` | FastAPI App-Factory: Registriert Routes, Middleware (Auth, Rate Limiting, Request ID), CORS-Config, Lifespan (Init Bedrock Client, Redis Pool, Celery Connection) |
| `src/inference/client.py` | Singleton `BedrockClient` mit boto3; umhüllt `invoke_model` und `invoke_model_with_response_stream`; injiziert `system` Prompt mit Cache-Control-Blöcken für Kostenoptimierung |
| `src/agents/router.py` | `AgentRouter` Klasse: Wählt Agent-Typ aus Registry basierend auf Eingabe-Metadaten (user_id, intent, complexity); gibt Agent-Config + Routing-Entscheidung zurück (sync vs async über Celery) |
| `src/tasks/inference_task.py` | Celery `@shared_task`: Empfängt agent_id + input, ruft AgentRouter auf, führt Agent aus, protokolliert Token-Nutzung in Redis + PostgreSQL, triggert Stripe Metering Event |
| `src/billing/metering.py` | `UsageMeter` Klasse: Verfolgt verbrauchte Tokens pro Benutzer pro Tag; bei Schwellwert, sendet `stripe.billing.meter_event` über Stripe API; idempotent auf meter_event_id |
| `src/billing/quota.py` | `QuotaManager` Klasse: Erzwingt Pro-Benutzer-Limits (tokens/month, cost/month); blockiert Inferenz, wenn Quote überschritten; gibt Quota-Erschöpfungs-Fehler mit Retry-After-Header zurück |
| `src/cache/session.py` | `SessionCache` Klasse: Redis-gestützter Multi-Turn-Konversationszustand; Sliding-Window-Eviction nach Zeitstempel; TTL = Sitzungsdauer (Config-gesteuert, z.B. 24h) |
| `src/db/schema.py` | SQLAlchemy ORM: `User`, `ApiKey`, `InferenceLog`, `BatchJob`, `UsageSnapshot` Tabellen; alle Audit-Spalten (created_at, updated_at, deleted_at für Soft Deletes) |
| `migrations/versions/` | Alembic Migration Scripts; laufen beim Startup über FastAPI Lifespan Event oder manueller CLI; Schema-Version in alembic_version Tabelle gespeichert |
| `infra/terraform/modules/eks/` | Terraform EKS Modul: Cluster-Erstellung, Node Groups mit Auto-Scaling, IAM Rollen für Bedrock + RDS Zugriff, Security Groups für Ingress/Egress |
| `infra/kubernetes/base/celery-deployment.yaml` | Celery Worker Deployment: zieht von ECR, mounted Config (agents.yaml, rate_limits.yaml), Env Vars (CELERY_BROKER_URL=redis://...), Replikas konfigurierbar |

## Schnelles Scaffold

```bash
# Voraussetzungen: Python 3.12+, poetry, Docker, kubectl
PROJECT=ai-backend-inference-hub
mkdir -p $PROJECT && cd $PROJECT

# Init Python project with Poetry
poetry init --name $PROJECT --no-interaction
poetry add fastapi uvicorn pydantic pydantic-settings \
  bedrock-runtime boto3 \
  celery redis kombu \
  sqlalchemy alembic psycopg[binary] asyncpg \
  stripe \
  prometheus-client opentelemetry-api opentelemetry-sdk \
  opentelemetry-exporter-prometheus opentelemetry-instrumentation-fastapi \
  opentelemetry-instrumentation-sqlalchemy \
  sentry-sdk \
  python-dotenv

poetry add -G dev pytest pytest-asyncio pytest-cov \
  ruff black mypy \
  httpx \
  fakeredis \
  sqlalchemy[mypy]

# Directory structure
mkdir -p .github/workflows
mkdir -p infra/kubernetes/{base,overlays/{staging,production/patches}}
mkdir -p infra/terraform/environments/{staging,production}
mkdir -p infra/terraform/modules/{eks,rds,elasticache,ecr,iam}
mkdir -p infra/docker
mkdir -p src/{api/{routes,middleware},agents/agents,tasks,inference,billing,db,cache,observability,utils}
mkdir -p src/agents/prompt_templates
mkdir -p tests/{unit/test_api,unit/test_inference,unit/test_billing,unit/test_tasks,integration,fixtures}
mkdir -p migrations/versions
mkdir -p config
mkdir -p scripts
mkdir -p .claude/commands

# Touch source files
touch src/__init__.py
touch src/api/{__init__.py,main.py,schemas.py}
touch src/api/{routes,middleware}/__init__.py
touch src/api/routes/{inference,batch,agents,models,usage,webhooks,health}.py
touch src/api/middleware/{auth,rate_limit,request_id,error_handler}.py
touch src/agents/{__init__.py,router.py,registry.py,types.py,base.py}
touch src/agents/agents/__init__.py
touch src/agents/agents/{chat_agent,reasoning_agent,code_interpreter_agent,search_agent}.py
touch src/agents/prompt_templates/{chat,reasoning,code_interpreter}.md
touch src/tasks/{__init__.py,celery_app.py,inference_task.py,batch_task.py,monitor_task.py}
touch src/inference/{__init__.py,client.py,streaming.py,token_counter.py,cache.py}
touch src/billing/{__init__.py,stripe_client.py,metering.py,quota.py,webhook_handler.py}
touch src/db/{__init__.py,client.py,schema.py,queries.py}
touch src/cache/{__init__.py,redis_client.py,session.py,rate_limit.py,model_cache.py}
touch src/observability/{__init__.py,logging.py,metrics.py,tracing.py,sentry_config.py}
touch src/utils/{__init__.py,config.py,crypto.py,time_utils.py,decorators.py}
touch tests/{conftest.py,README.md}
touch tests/unit/test_api/{test_inference,test_agents,test_auth,test_webhooks}.py
touch tests/unit/test_inference/{test_client,test_streaming,test_token_counter}.py
touch tests/unit/test_billing/{test_metering,test_quota,test_stripe_client}.py
touch tests/unit/test_tasks/{test_inference_task,test_batch_task}.py
touch tests/integration/{test_inference_e2e,test_batch_e2e,test_agent_routing,test_billing_e2e}.py
touch tests/fixtures/{__init__.py,bedrock.py,stripe.py,db.py,redis.py}
touch migrations/{alembic.ini,env.py,script.py.mako}
touch migrations/versions/{0001_create_users_table,0002_create_inference_logs,0003_create_batch_jobs,0004_create_usage_snapshots}.py
touch config/{agents.yaml,models.yaml,rate_limits.yaml}
touch scripts/{seed_db.py,migrate_stripe_customers.py,health_check.py}
touch .env.example .env.test
touch infra/docker/{Dockerfile,.dockerignore,docker-compose.yml}
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/{add-agent,add-model,load-test,metering-report,incident-response}.md

# pyproject.toml sections (merge manually or use poetry's interactive CLI)
cat > pyproject.toml << 'EOF'
[tool.poetry]
name = "ai-backend-inference-hub"
version = "0.1.0"
description = "Production-grade AI backend for high-concurrency LLM inference and multi-agent routing"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.12"
# (append your poetry add output here)

[tool.poetry.group.dev.dependencies]
# (append your dev deps here)

[tool.poetry.scripts]
seed-db = "scripts.seed_db:main"
health-check = "scripts.health_check:main"

[tool.ruff]
line-length = 100
target-version = "py312"
select = ["E", "F", "W", "I", "N", "UP"]

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
addopts = "-v --cov=src --cov-report=term-min=80 --cov-report=html"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
EOF

# .env.example
cat > .env.example << 'EOF'
# AWS Bedrock
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0

# Stripe
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/inference_hub

# Redis
REDIS_URL=redis://localhost:6379/0

# Celery
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/2

# API
API_HOST=0.0.0.0
API_PORT=8000
LOG_LEVEL=INFO

# Observability
SENTRY_DSN=https://...@sentry.io/...
PROMETHEUS_PORT=9090
EOF

# docker-compose.yml for local dev
cat > infra/docker/docker-compose.yml << 'EOF'
version: "3.9"
services:
  api:
    build:
      context: ../..
      dockerfile: infra/docker/Dockerfile
      target: development
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:pass@postgres:5432/inference_hub
      REDIS_URL: redis://redis:6379/0
      CELERY_BROKER_URL: redis://redis:6379/1
    depends_on:
      - postgres
      - redis
    volumes:
      - ../../src:/app/src

  celery_worker:
    build:
      context: ../..
      dockerfile: infra/docker/Dockerfile
      target: development
    command: celery -A src.tasks.celery_app worker --loglevel=info
    environment:
      DATABASE_URL: postgresql://user:pass@postgres:5432/inference_hub
      CELERY_BROKER_URL: redis://redis:6379/1
    depends_on:
      - postgres
      - redis
    volumes:
      - ../../src:/app/src

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: inference_hub
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  postgres_data:
EOF

# Dockerfile
cat > infra/docker/Dockerfile << 'EOF'
FROM python:3.12-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir poetry

FROM base AS development
COPY pyproject.toml poetry.lock ./
RUN poetry install --with dev
COPY . .
CMD ["poetry", "run", "uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

FROM base AS runtime
COPY pyproject.toml poetry.lock ./
RUN poetry install --only main
COPY src ./src
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser
CMD ["poetry", "run", "uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

echo "Scaffold complete. Next: poetry install && docker compose -f infra/docker/docker-compose.yml up"
```

## CLAUDE.md Vorlage

```markdown
# AI Backend Inference Hub

Produktionsreifer KI-Backend für hochgradig parallelisierte LLM-Inferenz, dynamisches Multi-Agent-Task-Routing und SaaS-Monetarisierung.
Gesamte Inferenzlogik in src/inference/. Agent Routing in src/agents/. Billing in src/billing/.

## Stack

- FastAPI 0.115+ — async HTTP API in src/api/; streaming über SSE auf POST /v1/inference?stream=true
- AWS Bedrock — Claude 3.5 Sonnet und Haiku über boto3; Prompt Caching für Kostenoptimierung aktiviert
- Celery 5.4+ — async Task Queue für langläufige Inferenzen; Redis Broker für Routing
- PostgreSQL 16 — Benutzerkonten, Inferenz-Logs, Usage Snapshots, Batch Job Tracking
- Redis 7+ — Session Cache (Multi-Turn State), Rate Limit Buckets, Celery Queue
- Stripe 13+ — Usage-basierte Abrechnung, Abonnement-Verwaltung, Webhook Event Verarbeitung
- Kubernetes 1.28+ (EKS) — stateless API Pods, horizontal skalierbare Celery Worker

## Hinzufügen eines neuen Agent-Typs

1. **Schema definieren** — aktualisieren Sie `config/agents.yaml`:
   ```yaml
   agents:
     my_agent:
       model: "anthropic.claude-3-5-sonnet-20241022-v2:0"
       max_tokens: 4096
       token_budget: 50000
       tools: ["web_search", "code_execution"]
   ```

2. **Agent Klasse erstellen** — `src/agents/agents/my_agent.py`:
   ```python
   from src.agents.base import BaseAgent
   from src.agents.types import AgentInput, AgentResult

   class MyAgent(BaseAgent):
       async def run(self, input: AgentInput) -> AgentResult:
           # Agent logic here
           pass
   ```

3. **Agent registrieren** — aktualisieren Sie `src/agents/registry.py`:
   - Importieren Sie Ihre Agent Klasse
   - Fügen Sie zu `AGENT_REGISTRY = { "my_agent": MyAgent, ... }` hinzu

4. **Router aktualisieren** — in `src/agents/router.py`:
   - Routing Regel hinzufügen: `if intent == "my_intent": return AgentConfig(type="my_agent", ...)`

5. **Test** — erstellen Sie `tests/unit/test_agents/test_my_agent.py`:
   - Mock Bedrock Responses
   - Testen Sie Happy Path, Error Handling, Token Budget Enforcement

## Inferenz Flow (Single-Turn, kein Tools)

1. Client: `POST /v1/inference`
   ```json
   {
     "user_id": "user_123",
     "model": "claude-3-5-sonnet",
     "messages": [{"role": "user", "content": "Hello"}],
     "stream": false
   }
   ```

2. Auth Middleware verifiziert API Key über Stripe (Customer Lookup).

3. RateLimitMiddleware prüft Redis auf Pro-Benutzer Request Count; erhöht Sliding Window.

4. Route Handler ruft `src.inference.client.BedrockClient.invoke_model()` auf.

5. Bedrock gibt volles Message Objekt zurück; Handler protokolliert zu PostgreSQL (inference_logs Tabelle).

6. Stripe Metering: Handler ruft `UsageMeter.record(user_id, tokens_used)` auf.

7. Quota Check: QuotaManager prüft, ob Benutzer an Limit ist; gibt 429 zurück, wenn über Schwellwert.

8. Response: `{ "id": "msg_...", "content": [...], "usage": { "input_tokens": 100, "output_tokens": 50 } }`

## Inferenz Flow (Multi-Agent Routing)

1. Client: `POST /v1/agents/route` mit input + metadata.

2. AgentRouter analysiert input; wählt Agent-Typ basierend auf intent/complexity.

3. Wenn Agent async ist (Code Execution, Web Search): Dispatche Celery Task `inference_task.py`.
   - Task führt Agent über BaseAgent.run() aus; protokolliert Nutzung; sendet Stripe Metering Event.
   - Gibt job_id + Polling URL zurück.

4. Wenn Agent sync ist (Chat): Führen Sie direkt im FastAPI Worker aus; geben Sie Response zurück.

5. Long-Poll oder Webhook Callback benachrichtigt Client über Ergebnis.

## Rate Limiting Tiers

```yaml
rate_limits:
  starter:
    requests_per_minute: 10
    tokens_per_day: 1000000
  pro:
    requests_per_minute: 100
    tokens_per_day: 10000000
  enterprise:
    requests_per_minute: 1000
    tokens_per_day: unlimited
```

Enforcement: `src/billing/quota.py` liest Tier aus Stripe Subscription + prüft Redis Counters.

## Abrechnung & Metering

1. Benutzer führt Inferenz aus → protokolliert Token Count zu PostgreSQL.

2. Stündlich (oder On-Demand): `UsageMeter.sync_stripe()` aggregiert tägliche Nutzung.

3. Stripe erhält `stripe.billing.meter_event` mit `quantity=tokens_used`.

4. Stripe wendet Usage-basierte Gebühr auf Rechnung am Monatsende an.

5. Webhook Handler verarbeitet `invoice.payment_succeeded` → erteilt frische Quote.

Monitor: `GET /v1/usage/tokens?period=month` gibt laufenden Gesamt + Prozentsatz der Quote zurück.

## Prompt Versionierung & Caching

Aktive Prompts in `src/agents/prompt_templates/`. Bedrock Prompt Cache aktiviert über:
```python
system=[
    {
        "type": "text",
        "text": system_prompt,
        "cache_control": {"type": "ephemeral"}
    }
]
```

Dies cachted den System Prompt über Anfragen in einem 5-Minuten-Fenster → ~10x Kostenreduktion auf wiederholten Agents.

## Lokal ausführen

```bash
docker compose -f infra/docker/docker-compose.yml up
poetry run python scripts/seed_db.py
poetry run uvicorn src.api.main:app --reload
# In einem anderen Terminal:
poetry run celery -A src.tasks.celery_app worker --loglevel=info
```

## Deployment zu EKS

```bash
# Build & push image
docker build -f infra/docker/Dockerfile -t 123456789.dkr.ecr.us-east-1.amazonaws.com/inference-hub:latest .
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/inference-hub:latest

# Deploy via Kustomize
kubectl apply -k infra/kubernetes/overlays/production

# Monitor rollout
kubectl rollout status deployment/inference-api -n default
```

## Was man nicht tun sollte

- Keine direkten Bedrock API Aufrufe außerhalb von `src/inference/client.py` — immer über Singleton routen.
- Token Counting nicht überspringen — jeden Inferenz zu PostgreSQL für Abrechnungsgenauigkeit protokollieren.
- Benutzer Sessions nicht länger als 24h cachen — Session Tokens wöchentlich rotieren für Sicherheit.
- Nicht ohne konfigurierte Stripe Webhooks deployen — Abrechnung wird nicht synchronisiert.
- Bedrock Model Caching Setup nicht überspringen — es wird Inferenzkosten 10x aufblähen.
- Keine Single-Replica API Pods in Produktion verwenden — immer >=3 Replicas mit PDB ausführen.
```

## Konfigurationsdateien

**config/agents.yaml** — Agent Registry mit Modell, Token Budget, Tools pro Agent-Typ.

**config/models.yaml** — Verfügbare Bedrock Modelle, Verfügbarkeitsstatus, Pricing-Metadaten.

**config/rate_limits.yaml** — Rate Limit Tiers (starter/pro/enterprise) mit Token Quotas.

**infra/kubernetes/overlays/production/kustomization.yaml** — Prod-spezifische Replikat Counts, Ressourcen-Limits, Ingress Config.

**infra/terraform/environments/production/main.tf** — Multi-AZ EKS, RDS Read Replicas, Redis Cluster, ALB mit WAF.
