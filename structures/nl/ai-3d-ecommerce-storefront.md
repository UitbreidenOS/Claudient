# 📂 AI 3D E-commerce Storefront

> De canonieke workspace voor een productie-grade AI backend-architectuur, ontworpen voor het verwerken van high-concurrency LLM-inferentie, dynamische multi-agent taskroutering en snelle SaaS-monetisatie.

📄 `backend-architecture-brief.md` # Canonieke brief: Definieert de core API-grenzen, token latency SLA's en het overkoepelende multi-agent businessmodel
🧠 `active-agent-sessions.md`      # Sessie-geheugen: Dynamische contexttracking voor huidige workloads van virtuele werknemers en actieve databaseverbindingen
🤖 `CLAUDE.md`                     # Bedrijfsregels: Strikte instructies voor het afdwingen van API-tarieflimitering en het mandaat voor stateless-serverconfiguraties

## 📁 api-gateway-and-routes/ (4 skills - De Voordeur)
📄 `health-api-core.md`            # De centrale FastAPI/Node-server die alle inkomende clientverzoeken voor de core health-api repository verwerkt
📄 `streaming-response-handler.md` # Server-Sent Events (SSE) logica om direct multi-agent denkprocessen naar de UI te streamen
📄 `rate-limit-and-auth.md`        # Middleware met Redis-backend die zorgt dat gebruikers de dure inferentie-eindpunten niet kunnen DDoS'en
📄 `rapid-monetization-webhooks.md`# Stripe-integraties perfect gemapped naar tokengebruik voor snelle en schone SaaS-monetisatie

## 📁 multi-agent-orchestration/ (3 skills - Virtuele Werknemers)
📄 `saas-employee-router.md`       # De supervisor state machine die gebruikersintentie classificeert en taken overdraagt aan gespecialiseerde AI agent "werknemers"
📄 `inter-agent-pubsub.md`         # Kafka of Redis Pub/Sub kanalen waarmee de "Research Agent" gestructureerde data asynchrone kan doorgeven aan de "Coding Agent"
📄 `hallucination-firewall.md`     # Pydantic-schemavalidators die automatisch agent-outputs rejetten en herproberen die de verwachte JSON-structuur breken

## 📁 compute-load-balancer/ (4 skills - Kosten & Schaal)
📄 `bedrock-primary-allocator.md`  # Terraform-configuraties voor routing van zware, multi-agent systemen en RAG-pipelines direct naar AWS Bedrock
📄 `mac-mini-fallback.md`          # Dynamische routeringslogica die niet-urgente achtergrondtaken detecteert en naar een dedicated Mac mini pushed om cloudkosten drastisch te verlagen
📄 `dgx-spark-ml-runner.md`        # Custom eindpunten voor offloading van deep-learning taken en lokale modelfine-tuning naar zware Nvidia DGX hardware
📄 `token-budget-enforcer.md`      # Circuit breakers die automatisch de execution loop van een AI werknemer pauzeren als deze zijn toegewezen API-budget overschrijdt

## 📁 memory-and-context/ (3 skills - Statusbeheer)
📄 `vector-db-connector.md`        # Connectionpools en semantische caching-lagen voor Pinecone/pgvector
📄 `short-term-redis-memory.md`    # Beheert het actieve gespreksvenster, vatten oudere berichten automatisch samen om tokenoverbloating te voorkomen
📄 `long-term-s3-archives.md`      # Koude opslag voor afgeronde agent-outputs en systeemlogboeken

## 📁 ci-cd-and-deployment/ (3 skills - Verzenden)
📄 `container-optimization.md`     # Multi-stage Dockerfiles die zware ML-afhankelijkheden volledig uit de productie-build verwijderen
📄 `load-test-simulator.md`        # k6-scripts die 1.000 gelijktijdige agent API-aanroepen nabootsen om systeemknelpunten te testen
📄 `github-final-sync.md`          # Geautomatiseerde acties om de productie-klare backend-code direct naar uw Github-eindrepo's te laten linten, testen en pushen

---
**Configuratiebestanden**
⚙️ `openapi-schema.yaml`           # De enkele bron van waarheid voor de health-api contracten, zodat het frontend nooit breekt
📦 `celery-worker.conf`            # Configuratie voor de asynchrone taakwachtrijen die nachtelijke agent-jobs beheren
