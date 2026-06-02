# 📂 Autonomous SaaS Core
> Der kanonische Arbeitsbereich für eine produktive Multi-Agent-SaaS-Routing-Engine auf AWS Bedrock.

📄 `router-brief.md`      # Kanonische Kurzbeschreibung: Systemarchitektur und Mandanten-Isolationsregeln
🧠 `memory.md`            # Sitzungsspeicher: Dynamischer Kontext für die aktive Routing-Sitzung
🤖 `CLAUDE.md`            # Betriebsregeln: Strikte Anweisungen für den Routing-Agent

## 📁 core-routing/ (7 Fähigkeiten - Supervisor-Logik)
📄 `tenant-isolation.md`  # Datengrenzen • strikte Unterdrückung über Mandanten hinweg
📄 `task-analyzer.md`     # Absichtsextraktion • erforderliche Fähigkeitszuordnung
📄 `worker-handoff.md`    # Payload-Strukturierung • asynchrone Event-Trigger
📄 `state-manager.md`     # Checkpointing • Pause-Zustände mit menschlicher Beteiligung
📄 `fallback-handler.md`  # API-Timeout-Protokolle • elegante Verschlechterung
📄 `context-pruner.md`    # Token-Management • semantische Kompression
📄 `bedrock-selector.md`  # Dynamisches Modell-Routing basierend auf Aufgabenkomplexität

## 📁 worker-nodes/ (4 Agent-Personas - Die "Mitarbeiter")
📄 `coder-agent.md`       # Autonome Repo-Ausführung • Richtlinien für Übernachtläufe
📄 `qa-agent.md`          # Testgenerierung • Matrix-Validierung
📄 `data-analyst.md`      # SQL-Generierung • Schema-Erkundung
📄 `ops-agent.md`         # Infrastruktur-Checks • Log-Parsing

## 📁 memory-sync/ (3 Fähigkeiten - Persistenter Zustand)
📄 `redis-caching.md`     # Kurzfristige Sitzungsabrufung
📄 `vector-commit.md`     # Langfristige pgvector-Speicherzuordnung
📄 `memory-cleanup.md`    # DSGVO-Konformität • PII-Bereinigung vor der Speicherung

## 📁 infrastructure/ (4 Fähigkeiten - AWS Bedrock & Deploy)
📄 `bedrock-auth.md`      # IAM-Rollenübernahme • Zugriff über mehrere Konten hinweg
📄 `api-gateway.md`       # Rate Limiting • Tracking des Mandanten-API-Kontingents
📄 `docker-sandbox.md`    # Isolierte Ausführungsumgebungen für Code-Worker
📄 `deployment-sync.md`   # CI/CD-Übergabe • Staging- vs. Produktionsregeln

## 📁 evals/ (3 Fähigkeiten - Nächtliche Benchmarks)
📄 `routing-accuracy.md`  # Hat der Supervisor den richtigen Worker ausgewählt?
📄 `cost-analyzer.md`     # Token-Ausgaben pro Mandant • Alert-Schwellwerte
📄 `hallucination-check.md` # Ausgabe-Verankerung • Faktische Konsistenz

---
**Konfigurationsdateien**
⚙️ `config.yaml`          # Globale Umgebungsvariablen und Modell-Endpoints
📦 `pyproject.toml`       # Python-Abhängigkeiten (LangGraph, Boto3, usw.)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
