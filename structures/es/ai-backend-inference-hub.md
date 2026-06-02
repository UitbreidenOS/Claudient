# Centro de Inferencia de Backend de IA

Un backend de IA de nivel de producción para inferencia de LLM de alto nivel de concurrencia, enrutamiento multiagente y monetización de SaaS. Diseñado para equipos que construyen aplicaciones impulsadas por IA con requisitos estrictos de latencia, costo y gobernanza.

---

## Estructura de Directorios

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

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `src/api/main.py` | Fábrica de aplicación FastAPI: registrar rutas, middleware (auth, límite de velocidad, ID de solicitud), configuración CORS, lifespan (inicializar cliente Bedrock, grupo de conexión Redis, conexión Celery) |
| `src/inference/client.py` | Singleton `BedrockClient` usando boto3; envuelve `invoke_model` e `invoke_model_with_response_stream`; inyecta solicitud `system` con bloques cache_control para optimización de costos |
| `src/agents/router.py` | Clase `AgentRouter`: dados metadatos de entrada (user_id, intent, complexity), selecciona tipo de agente del registro; devuelve configuración de agente + decisión de enrutamiento (sync vs async vía Celery) |
| `src/tasks/inference_task.py` | Celery `@shared_task`: recibe agent_id + input, invoca AgentRouter, ejecuta agente, registra uso de tokens en Redis + PostgreSQL, desencadena evento de medición Stripe |
| `src/billing/metering.py` | Clase `UsageMeter`: rastrea tokens consumidos por usuario por día; al alcanzar umbral, emite `stripe.billing.meter_event` vía API Stripe; idempotente en meter_event_id |
| `src/billing/quota.py` | Clase `QuotaManager`: aplica límites por usuario (tokens/mes, costo/mes); bloquea inferencia si se excede cuota; devuelve error de agotamiento de cuota con encabezado retry-after |
| `src/cache/session.py` | Clase `SessionCache`: estado de conversación de múltiples turnos respaldado por Redis; evicción de ventana deslizante por marca de tiempo; TTL = duración de la sesión (controlada por configuración, p. ej., 24h) |
| `src/db/schema.py` | ORM SQLAlchemy: tablas `User`, `ApiKey`, `InferenceLog`, `BatchJob`, `UsageSnapshot`; todas las columnas de auditoría (created_at, updated_at, deleted_at para eliminaciones suaves) |
| `migrations/versions/` | Scripts de migración Alembic; se ejecutan al iniciar vía evento lifespan FastAPI o CLI manual; versión de esquema almacenada en tabla alembic_version |
| `infra/terraform/modules/eks/` | Módulo EKS de Terraform: creación de clúster, grupos de nodos con auto-escalado, roles IAM para acceso a Bedrock + RDS, grupos de seguridad para ingress/egress |
| `infra/kubernetes/base/celery-deployment.yaml` | Implementación del trabajador Celery: extrae de ECR, monta configuración (agents.yaml, rate_limits.yaml), variables de entorno (CELERY_BROKER_URL=redis://...), réplicas configurables |

## Andamiaje rápido

```bash
# Requisitos previos: Python 3.12+, poetry, Docker, kubectl
PROJECT=ai-backend-inference-hub
mkdir -p $PROJECT && cd $PROJECT

# Inicializar proyecto Python con Poetry
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

# Estructura de directorios
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

# Tocar archivos fuente
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

# secciones de pyproject.toml (fusionar manualmente o usar CLI interactivo de poetry)
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

# docker-compose.yml para desarrollo local
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

## Plantilla CLAUDE.md

```markdown
# Centro de Inferencia de Backend de IA

Backend de IA de producción para inferencia de LLM de alto nivel de concurrencia, enrutamiento dinámico de tareas multiagente y monetización de SaaS.
Toda la lógica de inferencia está en src/inference/. Enrutamiento de agentes en src/agents/. Facturación en src/billing/.

## Stack

- FastAPI 0.115+ — API HTTP asincrónica en src/api/; streaming vía SSE en POST /v1/inference?stream=true
- AWS Bedrock — Claude 3.5 Sonnet y Haiku vía boto3; almacenamiento en caché de solicitudes habilitado para optimización de costos
- Celery 5.4+ — cola de tareas asincrónicas para inferencia de larga duración; agente Redis para enrutamiento
- PostgreSQL 16 — cuentas de usuario, registros de inferencia, instantáneas de uso, seguimiento de trabajos por lotes
- Redis 7+ — caché de sesión (estado de múltiples turnos), buckets de límite de velocidad, cola Celery
- Stripe 13+ — facturación basada en uso, gestión de suscripciones, procesamiento de eventos webhook
- Kubernetes 1.28+ (EKS) — pods de API sin estado, trabajadores Celery escalables horizontalmente

## Agregar un nuevo tipo de agente

1. **Definir esquema** — actualizar `config/agents.yaml`:
   ```yaml
   agents:
     my_agent:
       model: "anthropic.claude-3-5-sonnet-20241022-v2:0"
       max_tokens: 4096
       token_budget: 50000
       tools: ["web_search", "code_execution"]
   ```

2. **Crear clase de agente** — `src/agents/agents/my_agent.py`:
   ```python
   from src.agents.base import BaseAgent
   from src.agents.types import AgentInput, AgentResult

   class MyAgent(BaseAgent):
       async def run(self, input: AgentInput) -> AgentResult:
           # Agent logic here
           pass
   ```

3. **Registrar agente** — actualizar `src/agents/registry.py`:
   - Importar clase de agente
   - Agregar a `AGENT_REGISTRY = { "my_agent": MyAgent, ... }`

4. **Actualizar enrutador** — en `src/agents/router.py`:
   - Agregar regla de enrutamiento: `if intent == "my_intent": return AgentConfig(type="my_agent", ...)`

5. **Prueba** — crear `tests/unit/test_agents/test_my_agent.py`:
   - Respuestas de Bedrock simuladas
   - Probar ruta feliz, manejo de errores, cumplimiento del presupuesto de tokens

## Flujo de inferencia (de un solo turno, sin herramientas)

1. Cliente: `POST /v1/inference`
   ```json
   {
     "user_id": "user_123",
     "model": "claude-3-5-sonnet",
     "messages": [{"role": "user", "content": "Hello"}],
     "stream": false
   }
   ```

2. El middleware de autenticación verifica la clave API vía Stripe (búsqueda de cliente).

3. RateLimitMiddleware comprueba Redis para el recuento de solicitudes por usuario; incrementa la ventana deslizante.

4. El controlador de rutas llama a `src.inference.client.BedrockClient.invoke_model()`.

5. Bedrock devuelve objeto de mensaje completo; el controlador registra en PostgreSQL (tabla inference_logs).

6. Medición de Stripe: el controlador llama a `UsageMeter.record(user_id, tokens_used)`.

7. Verificación de cuota: QuotaManager comprueba si el usuario está en el límite; devuelve 429 si se excede el umbral.

8. Respuesta: `{ "id": "msg_...", "content": [...], "usage": { "input_tokens": 100, "output_tokens": 50 } }`

## Flujo de inferencia (enrutamiento multiagente)

1. Cliente: `POST /v1/agents/route` con entrada + metadatos.

2. AgentRouter analiza entrada; selecciona tipo de agente basado en intención/complejidad.

3. Si el agente es asincrónico (ejecución de código, búsqueda web): distribuir tarea Celery `inference_task.py`.
   - La tarea ejecuta el agente vía BaseAgent.run(); registra uso; emite evento de medición Stripe.
   - Devuelve job_id + URL de sondeo.

4. Si el agente es sincrónico (chat): ejecutar directamente en el trabajador FastAPI; devolver respuesta.

5. Sondeo largo o devolución de llamada webhook notifica al cliente del resultado.

## Niveles de límite de velocidad

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

Cumplimiento: `src/billing/quota.py` lee nivel de suscripción Stripe + comprueba contadores Redis.

## Facturación y medición

1. El usuario realiza inferencia → registra el recuento de tokens en PostgreSQL.

2. Cada hora (o bajo demanda): `UsageMeter.sync_stripe()` agrega el uso diario.

3. Stripe recibe `stripe.billing.meter_event` con `quantity=tokens_used`.

4. Stripe aplica cargo basado en uso a la factura al final del mes.

5. El controlador webhook procesa `invoice.payment_succeeded` → otorga cuota fresca.

Monitor: `GET /v1/usage/tokens?period=month` devuelve total en ejecución + porcentaje de cuota.

## Versionado y almacenamiento en caché de solicitudes

Solicitudes activas en `src/agents/prompt_templates/`. Caché de solicitudes Bedrock habilitado vía:
```python
system=[
    {
        "type": "text",
        "text": system_prompt,
        "cache_control": {"type": "ephemeral"}
    }
]
```

Esto almacena en caché la solicitud del sistema en todas las solicitudes dentro de una ventana de 5 minutos → reducción de costo ~10x en agentes repetidos.

## Ejecutar localmente

```bash
docker compose -f infra/docker/docker-compose.yml up
poetry run python scripts/seed_db.py
poetry run uvicorn src.api.main:app --reload
# En otra terminal:
poetry run celery -A src.tasks.celery_app worker --loglevel=info
```

## Implementación en EKS

```bash
# Compilar e impulsar imagen
docker build -f infra/docker/Dockerfile -t 123456789.dkr.ecr.us-east-1.amazonaws.com/inference-hub:latest .
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/inference-hub:latest

# Implementar vía Kustomize
kubectl apply -k infra/kubernetes/overlays/production

# Monitorear implementación
kubectl rollout status deployment/inference-api -n default
```

## Qué no hacer

- No realice llamadas directas a la API de Bedrock fuera de `src/inference/client.py` — siempre enrute a través del singleton.
- No omita el conteo de tokens — registre cada inferencia en PostgreSQL para la precisión de facturación.
- No almacene sesiones de usuario más de 24h — rote tokens de sesión semanalmente por seguridad.
- No implemente sin webhooks de Stripe configurados — la facturación no se sincronizará.
- No omita la configuración de almacenamiento en caché del modelo Bedrock — inflará los costos de inferencia 10x.
- No use pods de API de réplica única en producción — siempre ejecute >=3 réplicas con PDB.
```

## Archivos de configuración

**config/agents.yaml** — Registro de agentes con modelo, presupuesto de tokens, herramientas por tipo de agente.

**config/models.yaml** — Modelos Bedrock disponibles, estado de disponibilidad, metadatos de precios.

**config/rate_limits.yaml** — Niveles de límite de velocidad (starter/pro/enterprise) con cuotas de tokens.

**infra/kubernetes/overlays/production/kustomization.yaml** — Configuración específica de prod: conteos de réplica, límites de recursos, configuración de ingreso.

**infra/terraform/environments/production/main.tf** — EKS multi-AZ, réplicas de lectura RDS, clúster Redis, ALB con WAF.

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
