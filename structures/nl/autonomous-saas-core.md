# 📂 Autonomous SaaS Core
> De canonieke werkruimte voor een productie multi-agent SaaS routeringsengine op AWS Bedrock.

📄 `router-brief.md`      # Canonieke samenvatting: Systeemarchitectuur en regels voor tenant isolatie
🧠 `memory.md`            # Sessiegeheugen: Dynamische context voor de actieve routeringssessie
🤖 `CLAUDE.md`            # Bedrijfsregels: Strikte instructies voor de routeringsagent

## 📁 core-routing/ (7 skills - Supervisor Logica)
📄 `tenant-isolation.md`  # Gegevensgrenzen • strikte suppressie tussen tenants
📄 `task-analyzer.md`     # Intentie-extractie • vereiste capaciteitsmapping
📄 `worker-handoff.md`    # Payload structurering • async event triggers
📄 `state-manager.md`     # Checkpointing • menselijke tussenkomst pausestaten
📄 `fallback-handler.md`  # API timeout-protocollen • graceful degradation
📄 `context-pruner.md`    # Tokenbeheer • semantische compressie
📄 `bedrock-selector.md`  # Dynamische modelrouting gebaseerd op taakcomplexiteit

## 📁 worker-nodes/ (4 agent persona's - De "Werknemers")
📄 `coder-agent.md`       # Autonome repo-uitvoering • overnachtbeleid
📄 `qa-agent.md`          # Testgeneratie • matrix validatie
📄 `data-analyst.md`      # SQL-generatie • schema-verkenning
📄 `ops-agent.md`         # Infrastructuur controles • logparsing

## 📁 memory-sync/ (3 skills - Persistente Status)
📄 `redis-caching.md`     # Korte-termijn sessieophaling
📄 `vector-commit.md`     # Lange-termijn pgvector opslagmapping
📄 `memory-cleanup.md`    # GDPR compliance • PII scrubbing vóór opslag

## 📁 infrastructure/ (4 skills - AWS Bedrock & Deploy)
📄 `bedrock-auth.md`      # IAM rolveronderstelling • cross-account toegang
📄 `api-gateway.md`       # Rate limiting • tenant API quota tracking
📄 `docker-sandbox.md`    # Geïsoleerde uitvoeringsomgevingen voor code workers
📄 `deployment-sync.md`   # CI/CD handoff • staging vs productieregels

## 📁 evals/ (3 skills - Nachtelijke Benchmarks)
📄 `routing-accuracy.md`  # Heeft de supervisor de juiste worker gekozen?
📄 `cost-analyzer.md`     # Token-uitgaven per tenant • waarschuwingsdrempels
📄 `hallucination-check.md` # Uitvoergrounding • feitelijke consistentie

---
**Configuratiebestanden**
⚙️ `config.yaml`          # Globale omgevingsvariabelen en modelendpoints
📦 `pyproject.toml`       # Python-afhankelijkheden (LangGraph, Boto3, etc.)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
