# Hub d'inférence AI backend

Un backend AI de qualité production pour l'inférence LLM à haute concurrence, le routage multi-agent et la monétisation SaaS. Conçu pour les équipes construisant des applications alimentées par l'IA avec des exigences strictes de latence, de coût et de gouvernance.

---

## Structure des répertoires

```
ai-backend-inference-hub/
├── api-gateway-and-routes/
│   ├── __init__.py
│   ├── main.py                    # Point d'entrée de l'application FastAPI
│   ├── routes.py                  # Points de terminaison d'API principaux (inférence, agents, statut)
│   ├── middleware.py              # Auth, limitation de débit, gestion des erreurs
│   ├── schemas.py                 # Modèles Pydantic (requête/réponse)
│   └── exceptions.py              # Exceptions personnalisées
├── agents/
│   ├── __init__.py
│   ├── router.py                  # Répartiteur d'agents (routage vers l'agent approprié)
│   ├── registry.py                # Catalogue et métadonnées d'agents
│   ├── base.py                    # Classe abstraite BaseAgent
│   ├── chat_agent.py              # Agent conversationnel
│   ├── reasoning_agent.py         # Raisonnement en chaîne de pensée
│   ├── code_interpreter.py        # Exécution de code en sandbox
│   └── search_agent.py            # Intégration de recherche Web/connaissance
├── tasks/
│   ├── __init__.py
│   ├── celery_app.py              # Application Celery, connexion Redis
│   ├── inference_task.py          # Travail d'inférence asynchrone
│   ├── batch_processor.py         # Orchestration de travaux par lot
│   └── health_monitor.py          # Surveillance des battements de cœur et profondeur de file
├── inference/
│   ├── __init__.py
│   ├── bedrock_client.py          # Wrapper AWS Bedrock (Claude, Llama)
│   ├── streaming_handler.py       # Flux des jetons vers le client
│   ├── token_counter.py           # Estimation et comptage des jetons
│   └── prompt_cache.py            # Couche de mise en cache des invites (Redis)
├── billing/
│   ├── __init__.py
│   ├── stripe_integration.py      # Wrapper du SDK Stripe
│   ├── metering.py                # Suivi de l'utilisation (jetons, requêtes)
│   ├── quota_enforcer.py          # Limites de débit, contrôles de quota
│   └── webhook_handlers.py        # Événements Stripe
├── database/
│   ├── __init__.py
│   ├── models.py                  # ORM SQLAlchemy (User, Inference Log, Batch Job)
│   ├── connection.py              # Usine de session PostgreSQL
│   ├── migrations/
│   │   └── alembic/               # Migrations de base de données (Alembic)
│   │       ├── env.py
│   │       ├── versions/
│   │       │   ├── 001_initial.py
│   │       │   ├── 002_add_usage_snapshots.py
│   │       │   └── 003_add_batch_jobs.py
│   │       └── script.py.mako
│   └── repositories.py            # Couche d'accès aux données
├── config/
│   ├── __init__.py
│   ├── settings.py                # Pydantic BaseSettings (variables d'environnement)
│   ├── agents.yaml                # Définitions d'agents et règles de routage
│   ├── models.yaml                # Configurations de modèles LLM (alias Bedrock)
│   └── rate_limits.yaml           # Niveaux de limite de débit (gratuit/pro/entreprise)
├── kubernetes/
│   ├── base/
│   │   ├── deployment.yaml        # Spec Deployment
│   │   ├── service.yaml           # Service LoadBalancer
│   │   ├── configmap.yaml         # agents.yaml, models.yaml
│   │   ├── secret.yaml            # Identifiants AWS, clé Stripe (kustomize)
│   │   ├── hpa.yaml               # Mise à l'échelle horizontale des pods (CPU/mémoire)
│   │   ├── ingress.yaml           # Ingress avec terminaison SSL
│   │   └── kustomization.yaml
│   ├── overlays/
│   │   ├── staging/
│   │   │   ├── kustomization.yaml # Remplace replicas, ressources, env
│   │   │   └── ingress-patch.yaml
│   │   └── production/
│   │       ├── kustomization.yaml
│   │       ├── ingress-patch.yaml
│   │       └── hpa-patch.yaml     # Limites de replica plus élevées
│   └── README.md                  # Guide de déploiement (kustomize, ArgoCD)
├── terraform/
│   ├── main.tf                    # Config du fournisseur et backend
│   ├── eks.tf                     # Cluster EKS, groupes de nœuds
│   ├── rds.tf                     # Base de données PostgreSQL
│   ├── elasticache.tf             # Redis pour mise en cache, broker Celery
│   ├── ecr.tf                     # Dépôt ECR pour images Docker
│   ├── iam.tf                     # Rôles IAM (Bedrock, Stripe, journalisation)
│   ├── outputs.tf
│   ├── variables.tf
│   └── terraform.tfvars.example
├── tests/
│   ├── conftest.py                # Fixtures Pytest (Bedrock, Stripe simulés)
│   ├── test_api.py                # Tests des points de terminaison API
│   ├── test_agents.py             # Logique de routage d'agents
│   ├── test_inference.py          # Comptage des jetons, mise en cache
│   ├── test_billing.py            # Application des quotas, comptage
│   ├── integration_test.py        # Flux de bout en bout
│   └── fixtures/
│       ├── sample_requests.json
│       └── sample_responses.json
├── docker/
│   ├── Dockerfile                 # Build multi-étapes (Python 3.12)
│   ├── docker-compose.yml         # Dev local (FastAPI, Celery, Redis, PostgreSQL)
│   └── .dockerignore
├── scripts/
│   ├── setup.sh                   # Installation Poetry, upgrade alembic
│   ├── scaffold.py                # Générer un projet à partir d'un modèle
│   ├── run_worker.sh              # Démarrer le worker Celery
│   └── seed_config.py             # Charger agents.yaml → base de données
├── pyproject.toml                 # Dépendances, config de build
├── README.md                      # Configuration, déploiement, lien docs API
├── CLAUDE.md                      # Développement d'agents, versions de prompts, observabilité
└── .env.example                   # Modèle (AWS_ACCESS_KEY, STRIPE_API_KEY, etc.)
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `src/api/main.py` | Usine d'application FastAPI : enregistre les routes, middlewares (auth, limitation de débit, ID de requête), config CORS, durée de vie (init client Bedrock, pool Redis, connexion Celery) |
| `src/inference/client.py` | Singleton `BedrockClient` utilisant boto3 ; enveloppe `invoke_model` et `invoke_model_with_response_stream` ; injecte l'invite `system` avec blocs cache_control pour optimisation des coûts |
| `src/agents/router.py` | Classe `AgentRouter` : étant donné les métadonnées d'entrée (user_id, intent, complexity), sélectionne le type d'agent du registre ; retourne la configuration de l'agent + décision de routage (sync vs async via Celery) |
| `src/tasks/inference_task.py` | Celery `@shared_task` : reçoit agent_id + entrée, invoque AgentRouter, exécute l'agent, enregistre l'utilisation des jetons dans Redis + PostgreSQL, déclenche un événement de comptage Stripe |
| `src/billing/metering.py` | Classe `UsageMeter` : suit les jetons consommés par utilisateur par jour ; au-delà du seuil, émet `stripe.billing.meter_event` via l'API Stripe ; idempotent sur meter_event_id |
| `src/billing/quota.py` | Classe `QuotaManager` : applique les limites par utilisateur (jetons/mois, coût/mois) ; bloque l'inférence si le quota est dépassé ; retourne une erreur d'épuisement du quota avec en-tête retry-after |
| `src/cache/session.py` | Classe `SessionCache` : état de conversation multi-tour soutenu par Redis ; éviction à fenêtre glissante par horodatage ; TTL = durée de session (config, ex. 24h) |
| `src/db/schema.py` | ORM SQLAlchemy : tables `User`, `ApiKey`, `InferenceLog`, `BatchJob`, `UsageSnapshot` ; toutes colonnes d'audit (created_at, updated_at, deleted_at pour suppressions logicielles) |
| `migrations/versions/` | Scripts de migration Alembic ; exécutés au démarrage via événement lifespan FastAPI ou CLI manuel ; version du schéma stockée dans table alembic_version |
| `infra/terraform/modules/eks/` | Module Terraform EKS : création de cluster, groupes de nœuds avec auto-scaling, rôles IAM pour accès Bedrock + RDS, groupes de sécurité pour ingress/egress |
| `infra/kubernetes/base/celery-deployment.yaml` | Déploiement worker Celery : tire d'ECR, monte les configs (agents.yaml, rate_limits.yaml), variables d'env (CELERY_BROKER_URL=redis://...), replicas configurable |

## Échafaudage rapide

```bash
# Prérequis : Python 3.12+, poetry, Docker, kubectl
PROJECT=ai-backend-inference-hub
mkdir -p $PROJECT && cd $PROJECT

# Init projet Python avec Poetry
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

# Structure des répertoires
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

# Créer les fichiers source
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

# Sections pyproject.toml (fusionner manuellement ou utiliser CLI interactif de poetry)
cat > pyproject.toml << 'EOF'
[tool.poetry]
name = "ai-backend-inference-hub"
version = "0.1.0"
description = "Backend AI de qualité production pour inférence LLM haute-concurrence et routage multi-agent"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.12"
# (ajouter ici la sortie de poetry add)

[tool.poetry.group.dev.dependencies]
# (ajouter les dépendances dev ici)

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

# docker-compose.yml pour dev local
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

echo "Échafaudage terminé. Prochaine étape : poetry install && docker compose -f infra/docker/docker-compose.yml up"
```

## Modèle CLAUDE.md

```markdown
# Hub d'inférence AI backend

Backend AI de qualité production pour inférence LLM haute-concurrence, routage de tâches multi-agent dynamique et monétisation SaaS.
Toute la logique d'inférence est dans src/inference/. Routage des agents dans src/agents/. Facturation dans src/billing/.

## Stack

- FastAPI 0.115+ — API HTTP asynchrone dans src/api/ ; streaming via SSE sur POST /v1/inference?stream=true
- AWS Bedrock — Claude 3.5 Sonnet et Haiku via boto3 ; cache des invites activé pour optimisation des coûts
- Celery 5.4+ — file d'attente des tâches asynchrones pour inférence longue durée ; broker Redis pour routage
- PostgreSQL 16 — comptes utilisateurs, journaux d'inférence, instantanés d'utilisation, suivi des travaux par lot
- Redis 7+ — cache de session (état multi-tour), buckets de limitation de débit, file d'attente Celery
- Stripe 13+ — facturation basée sur l'utilisation, gestion des abonnements, traitement des événements webhook
- Kubernetes 1.28+ (EKS) — pods d'API sans état, workers Celery horizontalement scalables

## Ajouter un nouveau type d'agent

1. **Définir le schéma** — mettre à jour `config/agents.yaml` :
   ```yaml
   agents:
     my_agent:
       model: "anthropic.claude-3-5-sonnet-20241022-v2:0"
       max_tokens: 4096
       token_budget: 50000
       tools: ["web_search", "code_execution"]
   ```

2. **Créer la classe d'agent** — `src/agents/agents/my_agent.py` :
   ```python
   from src.agents.base import BaseAgent
   from src.agents.types import AgentInput, AgentResult

   class MyAgent(BaseAgent):
       async def run(self, input: AgentInput) -> AgentResult:
           # Logique de l'agent ici
           pass
   ```

3. **Enregistrer l'agent** — mettre à jour `src/agents/registry.py` :
   - Importer votre classe d'agent
   - Ajouter à `AGENT_REGISTRY = { "my_agent": MyAgent, ... }`

4. **Mettre à jour le routeur** — dans `src/agents/router.py` :
   - Ajouter une règle de routage : `if intent == "my_intent": return AgentConfig(type="my_agent", ...)`

5. **Tester** — créer `tests/unit/test_agents/test_my_agent.py` :
   - Simuler les réponses Bedrock
   - Tester le chemin heureux, gestion d'erreur, application du budget de jetons

## Flux d'inférence (mono-tour, sans outils)

1. Client : `POST /v1/inference`
   ```json
   {
     "user_id": "user_123",
     "model": "claude-3-5-sonnet",
     "messages": [{"role": "user", "content": "Hello"}],
     "stream": false
   }
   ```

2. Le middleware d'auth vérifie la clé API via Stripe (recherche client).

3. RateLimitMiddleware vérifie Redis pour le décompte des requêtes par utilisateur ; incrémente la fenêtre glissante.

4. Le gestionnaire de route appelle `src.inference.client.BedrockClient.invoke_model()`.

5. Bedrock retourne l'objet Message complet ; le gestionnaire enregistre dans PostgreSQL (table inference_logs).

6. Comptage Stripe : le gestionnaire appelle `UsageMeter.record(user_id, tokens_used)`.

7. Contrôle des quotas : QuotaManager vérifie si l'utilisateur atteint la limite ; retourne 429 si dépassement.

8. Réponse : `{ "id": "msg_...", "content": [...], "usage": { "input_tokens": 100, "output_tokens": 50 } }`

## Flux d'inférence (routage multi-agent)

1. Client : `POST /v1/agents/route` avec entrée + métadonnées.

2. AgentRouter analyse l'entrée ; sélectionne le type d'agent basé sur intent/complexity.

3. Si l'agent est asynchrone (exécution de code, recherche Web) : envoyer une tâche Celery `inference_task.py`.
   - La tâche exécute l'agent via BaseAgent.run() ; enregistre l'utilisation ; émet un événement de comptage Stripe.
   - Retourne job_id + URL de polling.

4. Si l'agent est synchrone (chat) : exécuter directement dans le worker FastAPI ; retourner la réponse.

5. Long-poll ou callback webhook notifie le client du résultat.

## Niveaux de limitation de débit

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

Application : `src/billing/quota.py` lit le niveau depuis l'abonnement Stripe + vérifie les compteurs Redis.

## Facturation et comptage

1. L'utilisateur effectue une inférence → enregistre le nombre de jetons dans PostgreSQL.

2. Chaque heure (ou à la demande) : `UsageMeter.sync_stripe()` agrège l'utilisation quotidienne.

3. Stripe reçoit `stripe.billing.meter_event` avec `quantity=tokens_used`.

4. Stripe applique les frais d'utilisation à la facture à fin de mois.

5. Le gestionnaire de webhook traite `invoice.payment_succeeded` → accorde un nouveau quota.

Surveillance : `GET /v1/usage/tokens?period=month` retourne le total courant + pourcentage du quota.

## Versionnage des invites et mise en cache

Invites actives dans `src/agents/prompt_templates/`. Cache des invites Bedrock activé via :
```python
system=[
    {
        "type": "text",
        "text": system_prompt,
        "cache_control": {"type": "ephemeral"}
    }
]
```

Cela met en cache l'invite système sur les requêtes dans une fenêtre de 5 minutes → ~10x réduction des coûts sur agents répétés.

## Exécution en local

```bash
docker compose -f infra/docker/docker-compose.yml up
poetry run python scripts/seed_db.py
poetry run uvicorn src.api.main:app --reload
# Dans un autre terminal :
poetry run celery -A src.tasks.celery_app worker --loglevel=info
```

## Déploiement vers EKS

```bash
# Construire et pousser l'image
docker build -f infra/docker/Dockerfile -t 123456789.dkr.ecr.us-east-1.amazonaws.com/inference-hub:latest .
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/inference-hub:latest

# Déployer via Kustomize
kubectl apply -k infra/kubernetes/overlays/production

# Surveiller le déploiement
kubectl rollout status deployment/inference-api -n default
```

## À ne pas faire

- Ne pas effectuer d'appels d'API Bedrock directs en dehors de `src/inference/client.py` — toujours router via singleton.
- Ne pas ignorer le comptage des jetons — enregistrer chaque inférence dans PostgreSQL pour la précision de la facturation.
- Ne pas mettre en cache les sessions utilisateurs plus de 24h — faire tourner les tokens de session hebdomadaires pour la sécurité.
- Ne pas déployer sans webhooks Stripe configurés — la facturation ne synchronisera pas.
- Ne pas ignorer la configuration du cache de modèle Bedrock — cela gonflera les coûts d'inférence 10x.
- Ne pas utiliser des pods d'API à réplica unique en production — toujours lancer >=3 réplicas avec PDB.
```

## Fichiers de configuration

**config/agents.yaml** — Registre d'agents avec modèle, budget de jetons, outils par type d'agent.

**config/models.yaml** — Modèles Bedrock disponibles, statut de disponibilité, métadonnées de tarification.

**config/rate_limits.yaml** — Niveaux de limitation de débit (starter/pro/enterprise) avec quotas de jetons.

**infra/kubernetes/overlays/production/kustomization.yaml** — Comptages de replicas spécifiques à prod, limites de ressources, config d'ingress.

**infra/terraform/environments/production/main.tf** — EKS multi-AZ, répliques en lecture RDS, cluster Redis, ALB avec WAF.

---

🔗 **[Uitbreiden — construction de produits IA et outils B2B avec les communautés de développeurs.](https://uitbreiden.com/)**
📺 **[Abonnez-vous à notre chaîne YouTube pour plus de plongées approfondies](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
