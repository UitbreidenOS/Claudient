# 📂 Multi-Agent SaaS Core
> De canonieke multi-tenant hiërarchie voor het hosten van gelijktijdige, geïsoleerde AI agent-instanties als schaalbare ondernemingsmedewerkers.

📄 `saas-architecture-brief.md` # Canoniek overzicht: Multi-tenant tenant-kaarten, routerregels en grensoverschrijdende grenzen
🧠 `tenant-state-memory.md`    # Sessigeheugen: Dynamische contexttracking voor de actieve tenant worker pool
🤖 `CLAUDE.md`                 # Bedrijfsregels: Strikte instructies voor het handhaven van tenant veiligheidsgrenzen

## 📁 tenant-router/ (6 skills - Gateway & Context Control)
📄 `tenant-authenticator.md`   # Decodeert JWT-tokens • wijst inkomende verzoeken toe aan geïsoleerde tenant-ID's
📄 `quota-guardrail.md`        # Real-time token tracking • API rate limit controles per tier
📄 `dynamic-context-loader.md` # Injecteert tenant-specifieke bedrijfsregels dynamisch in de agent prompt
📄 `isolation-verifier.md`     # Beveiligingslaag • zorgt ervoor dat er geen kruisbesmetting van multi-agent geheugenpadden optreedt
📄 `billing-hook-router.md`    # Stripe gebruiksgebeurtenissen • pauseert worker processen als abonnement verloopt
📄 `model-tier-allocator.md`   # Routeert gratis-tier naar Claude 3.5 Haiku en enterprise-tier naar Claude 3.5 Sonnet

## 📁 agent-marketplace/ (Core Employee Archetypes)
📄 `hr-onboarding-agent.md`   # Automatische workflows voor tenant medewerker setup
📄 `finance-auditor-agent.md`  # Transactiecontrole en ledger verificatie
📄 `support-dispatcher.md`     # Customer ticketing triage en resolution routing

## 📁 shared-state-engine/ (4 skills - Multi-Agent Coordination)
📄 `state-store-sync.md`       # Redis-backed distributed state locker om race conditions te voorkomen
📄 `message-bus.md`            # Pub/Sub laag die agents in staat stelt gestructureerde berichten aan elkaar door te geven
📄 `human-approval-gate.md`    # Interrupt mechanics • halveert agent workflow in afwachting van tenant dashboard bevestiging
📄 `event-history-logger.md`   # Onveranderbare audit trail van agent beslissingen weergegeven in tenant UI

## 📁 enterprise-connectors/ (3 skills - Data Integration)
📄 `stripe-webhook.md`         # Luistert naar directe abonnementsverhogingen, downgrades en annuleringen
📄 `database-pool-manager.md`  # Rij-niveau beveiligingsgegevens (RLS) PostgreSQL mapping voor multi-tenant isolatie
📄 `external-crm-bridge.md`    # Dynamisch verbindingsbeheer voor tenant-eigendom Salesforce/HubSpot instanties

## 📁 telemetry-evals/ (3 skills - Nightly Usage Metrics)
📄 `tenant-cost-analyzer.md]   # Aggregeert precieze dagelijkse LLM-token kosten per individuele tenant workspace
📄 `efficiency-tracker.md`     # Monitort staptellingen en uitvoeringslatencies over actieve agent cohorten
📄 `security-compliance.md]    # Geautomatiseerde scanning naar PII-lekken over tenant worker grenzen

---
**Configuratiebestanden**
⚙️ `pnpm-workspace.yaml`       # Monorepo architectuur manager (Next.js dashboard + FastAPI agent core)
⚙️ `prisma.schema`              # Databaseschema dat strikte TenantId relaties forceert
📦 `poetry.lock`                # Snelle, deterministische Python afhankelijkheden lockfile

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
