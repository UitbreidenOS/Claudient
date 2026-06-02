# 📂 AI 3D E-Commerce-Schaufenster

> Der kanonische Arbeitsbereich für eine produktionsreife KI-Backend-Architektur, entwickelt zur Verarbeitung von hochgradig parallelen LLM-Inferenzen, dynamischem Multi-Agent-Task-Routing und schneller SaaS-Monetarisierung.

📄 `backend-architecture-brief.md` # Kanonische Dokumentation: Definiert die Kern-API-Grenzen, Token-Latenz-SLAs und das übergeordnete Multi-Agent-Geschäftsmodell
🧠 `active-agent-sessions.md`      # Sitzungsspeicher: Dynamische Kontextverfolgung für aktuelle Virtual-Employee-Workloads und aktive Datenbankverbindungen
🤖 `CLAUDE.md`                     # Betriebsregeln: Strikte Anweisungen zur Durchsetzung von API-Ratenbegrenzungen und Mandatierung statusloser Serverkonfigurationen

## 📁 api-gateway-and-routes/ (4 Skills - Die Haustür)
📄 `health-api-core.md`            # Der zentrale FastAPI/Node-Server, der alle eingehenden Client-Anfragen für das Core-Health-API-Repository verarbeitet
📄 `streaming-response-handler.md` # Server-Sent Events (SSE)-Logik zum sofortigen Streaming von Multi-Agent-Gedankenprozessen zurück zur Benutzeroberfläche
📄 `rate-limit-and-auth.md`        # Redis-gestützte Middleware, die sicherstellt, dass Benutzer die teuren Inferenzendpunkte nicht überlasten können
📄 `rapid-monetization-webhooks.md`# Stripe-Integrationen perfekt auf Tokennutzung abgestimmt, um die SaaS schnell und sauber zu monetarisieren

## 📁 multi-agent-orchestration/ (3 Skills - Virtuelle Mitarbeiter)
📄 `saas-employee-router.md`       # Die Supervisor-Zustandsmaschine, die Benutzerintentionen klassifiziert und Aufgaben an spezialisierte KI-Agent-"Mitarbeiter" delegiert
📄 `inter-agent-pubsub.md`         # Kafka- oder Redis-Pub/Sub-Kanäle, die dem "Research Agent" ermöglichen, strukturierte Daten asynchron an den "Coding Agent" zu übergeben
📄 `hallucination-firewall.md`     # Pydantic-Schema-Validatoren, die Agent-Outputs, die die erwartete JSON-Struktur brechen, automatisch ablehnen und erneut versuchen

## 📁 compute-load-balancer/ (4 Skills - Kosten & Skalierung)
📄 `bedrock-primary-allocator.md`  # Terraform-Konfigurationen zur Weiterleitung schwerer Multi-Agent-Systeme und RAG-Pipelines direkt zu AWS Bedrock
📄 `mac-mini-fallback.md`          # Dynamische Routing-Logik, die nicht-dringende Hintergrundaufgaben erkennt und sie an einen dedizierten Mac mini übermittelt, um Cloud-Kosten drastisch zu senken
📄 `dgx-spark-ml-runner.md`        # Benutzerdefinierte Endpunkte zum Auslagern von Deep-Learning-Aufgaben und lokaler Modellfeinjustierung auf schwere Nvidia DGX-Hardware
📄 `token-budget-enforcer.md`      # Schutzschalter, die die Ausführungsschleife eines KI-Mitarbeiters automatisch unterbrechen, wenn er sein zugeordnetes API-Ausgabenbudget überschreitet

## 📁 memory-and-context/ (3 Skills - Zustandsverwaltung)
📄 `vector-db-connector.md`        # Verbindungspools und semantische Caching-Schichten für Pinecone/pgvector
📄 `short-term-redis-memory.md`    # Verwaltet das aktive Gesprächsfenster und fasst automatisch ältere Nachrichten zusammen, um Token-Überfluss zu vermeiden
📄 `long-term-s3-archives.md`      # Kaltspeicher für finalisierte Agent-Outputs und Systemprotokolle

## 📁 ci-cd-and-deployment/ (3 Skills - Versand)
📄 `container-optimization.md`     # Mehrstufige Dockerfiles, die schwere ML-Abhängigkeiten vollständig aus dem Produktions-Build entfernen
📄 `load-test-simulator.md`        # k6-Skripte, die 1.000 gleichzeitige Agent-API-Aufrufe simulieren, um System-Engpässe zu testen
📄 `github-final-sync.md`          # Automatisierte Actions zum Linting, Testen und direkten Übertragen des produktionsreifen Backend-Codes zu Ihren Github-Final-Repos

---
**Konfigurationsdateien**
⚙️ `openapi-schema.yaml`           # Die alleinige Quelle der Wahrheit für Health-API-Verträge, um sicherzustellen, dass das Frontend nie bricht
📦 `celery-worker.conf`            # Konfiguration für die asynchrone Aufgabenwarteschlangen, die nächtliche Agent-Jobs verwalten

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
