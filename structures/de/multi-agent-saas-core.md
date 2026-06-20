# 📂 Multi-Agent-SaaS-Kern
> Die kanonische Multi-Tenant-Hierarchie zum Hosten von gleichzeitigen, isolierten KI-Agent-Instanzen als skalierbare Unternehmensangestellte.

📄 `saas-architecture-brief.md` # Kanonischer Brief: Multi-Tenant-Maps, Router-Regeln und Cross-Account-Grenzen
🧠 `tenant-state-memory.md`    # Sitzungsspeicher: Dynamische Kontextverfolgung für den aktiven Tenant-Worker-Pool
🤖 `CLAUDE.md`                 # Betriebsregeln: Strenge Anweisungen zur Aufrechterhaltung von Tenant-Sicherheitsgrenzen

## 📁 tenant-router/ (6 Skills - Gateway & Kontextsteuerung)
📄 `tenant-authenticator.md`   # Dekodiert JWT-Token • ordnet eingehende Anfragen isolierten Tenant-IDs zu
📄 `quota-guardrail.md`        # Echtzeittoken-Verfolgung • API-Rate-Limit-Prüfungen pro Tier
📄 `dynamic-context-loader.md` # Injiziert Tenant-spezifische Geschäftsregeln dynamisch in den Agent-Prompt
📄 `isolation-verifier.md`     # Sicherheitsschicht • gewährleistet keine Kreuzkontamination von Multi-Agent-Speicherpfaden
📄 `billing-hook-router.md`    # Stripe-Nutzungsereignisse • pausiert Worker-Prozesse bei Abonnement-Ablauf
📄 `model-tier-allocator.md`   # Routet kostenlos-Tier zu Claude 3.5 Haiku und Enterprise-Tier zu Claude 3.5 Sonnet

## 📁 agent-marketplace/ (Kern-Employee-Archetypen)
📄 `hr-onboarding-agent.md`   # Automatisierte Workflows für Tenant-Mitarbeiter-Setup
📄 `finance-auditor-agent.md`  # Transaktionsprüfung und Ledger-Verifizierung
📄 `support-dispatcher.md`     # Customer-Ticketing-Triage und Routing zur Auflösung

## 📁 shared-state-engine/ (4 Skills - Multi-Agent-Koordination)
📄 `state-store-sync.md`       # Redis-gestützter verteilter State-Locker zur Vermeidung von Race Conditions
📄 `message-bus.md`            # Pub/Sub-Schicht, die es Agents ermöglicht, strukturierte Nachrichten aneinander zu übergeben
📄 `human-approval-gate.md`    # Interrupt-Mechanik • stoppt Agent-Workflow bei Tenant-Dashboard-Bestätigung
📄 `event-history-logger.md`   # Unveränderliches Audit-Trail von Agent-Entscheidungen im Tenant-UI

## 📁 enterprise-connectors/ (3 Skills - Datenintegration)
📄 `stripe-webhook.md`         # Horcht auf direkte Abonnement-Upgrades, Downgrades und Kündigungen
📄 `database-pool-manager.md`  # Row-Level-Security (RLS) PostgreSQL-Mapping für Multi-Tenant-Isolation
📄 `external-crm-bridge.md`    # Dynamische Verbindungsverwaltung für Tenant-eigene Salesforce/HubSpot-Instanzen

## 📁 telemetry-evals/ (3 Skills - Nächtliche Nutzungsmetriken)
📄 `tenant-cost-analyzer.md`   # Aggregiert präzise tägliche LLM-Token-Kosten pro einzelnem Tenant-Workspace
📄 `efficiency-tracker.md`     # Überwacht Schrittanzahlen und Ausführungsvarianzen über aktive Agent-Gruppen
📄 `security-compliance.md`    # Automatisierte Überprüfung auf PII-Lecks über Tenant-Worker-Grenzen

---
**Konfigurationsdateien**
⚙️ `pnpm-workspace.yaml`       # Monorepo-Architektur-Manager (Next.js-Dashboard + FastAPI-Agent-Kern)
⚙️ `prisma.schema`              # Datenbankschema mit strikten TenantId-Relationen
📦 `poetry.lock`                # Schnelle, deterministische Python-Abhängigkeitssperrdatei
