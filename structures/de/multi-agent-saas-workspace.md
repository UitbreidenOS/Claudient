# 📂 Multi-Agent-SaaS-Arbeitsbereich

> Der kanonische Arbeitsbereich für einen KI-Plattformarchitekten, konzipiert zum Aufbau, zur Skalierung und Monetarisierung einer SaaS-Plattform, auf der autonome KI-Agenten als virtuelle Arbeitnehmer tätig sind.

📄 `platform-architecture-brief.md` # Kanonische Kurzfassung: Definiert die Agent-"Mitarbeiter"-Personas, die Kern-Monetarisierungsstrategie und die Multi-Tenant-Datenisolation
🧠 `active-workforce-memory.md`     # Sitzungsspeicher: Dynamische Kontextverfolgung für aktuelle Agent-Task-Warteschlangen und Inter-Agent-Kommunikationsprotokolle
🤖 `CLAUDE.md`                      # Betriebsregeln: Strenge Anweisungen zur Durchsetzung deterministischer Tool-Routing und zur Vermeidung unendlicher Agent-Schleifen

## 📁 agent-workforce/ (4 Skills - Virtuelle Mitarbeiter)
📄 `employee-persona-router.md`     # Der Supervisor-Knoten, der Benutzerabsichten klassifiziert und Aufgaben an spezialisierte Abteilungsagenten delegiert (z.B. Sales Agent, Support Agent)
📄 `zaltaclaw-autonomous-loop.md`   # Kern-Ausführungs-Engine für kontinuierliche, nächtliche autonome Agent-Operationen ohne menschliche Eingriffe
📄 `inter-agent-protocols.md`       # Message-Passing-Standards, die es dem "Marketing Agent" ermöglichen, den Kontext nahtlos an den "Sales Agent" zu übergeben
📄 `hallucination-guardrails.md`    # Pre-Flight-Heuristik-Checks, die adversarische Eingaben oder nicht zulässige Agent-Aktionen blockieren

## 📁 infrastructure-and-compute/ (4 Skills - Skalierung und Kosten)
📄 `aws-bedrock-allocator.md`       # Terraform-Skripte zur Bereitstellung sicherer, skalierbarer Foundation Models und Knowledge Bases über AWS Bedrock
📄 `local-compute-fallback.md`      # Routing-Logik zum Offloading schwerer, zeitzunkritischer Inferenz-Aufgaben auf einen dedizierten Mac mini zur Einsparung von Cloud-Kosten
📄 `context-window-manager.md`      # Fasst riesige RAG-Pipeline-Abrufe zusammen und truncated sie, um Token-Limit-Abstürze zu verhindern
📄 `model-agnostic-wrapper.md`      # Ermöglicht der Plattform, nahtlos zwischen Claude 3, GPT-4 und lokalen Modellen je nach Task-Schwierigkeit zu wechseln

## 📁 monetization-and-billing/ (3 Skills - Umsatzerlöse)
📄 `rapid-monetization-model.md`    # Stripe-Abrechnungsstrukturen optimiert für "Pay-per-Task"- oder "Agent-Seat"-Abonnement-Tiers
📄 `token-spend-tracker.md`         # Aggregiert API-Kosten pro Tenant in Echtzeit und erzwingt harte Limits zur Vermeidung galoppierender Cloud-Rechnungen
📄 `freemium-feature-flags.md`      # Mappt spezifische autonome Tools und Speicherkapazitäten auf die aktive Abos-Stufe des Benutzers

## 📁 deployment-pipeline/ (3 Skills - CI/CD)
📄 `agent-eval-framework.md`        # Automatisierte LLM-as-a-Judge-Skripte, die die virtuellen Mitarbeiter gegen einen golden Dataset perfekter Antworten testen
📄 `prompt-drift-detector.md`       # Warnt das Team, wenn ein neu bereitgestelltes System-Prompt die Erfolgsrate der autonomen Coding-Agenten verschlechtert
📄 `github-final-sync.md`           # CI/CD-Workflows zum sauberen Zusammenführen genehmigter Agent-Verhaltensweisen und Plattform-Updates direkt zu Github-Endrepos

---
**Konfigurationsdateien**
⚙️ `bedrock-agent-schema.json`      # Infrastructure-as-Code definiert die Action Groups und OpenAPI-Schemas für AWS Bedrock-Agenten
📦 `redis-memory-cache.yaml`        # Konfiguration für schnellen, kurzfristigen Speicherabruf über den Agent-Cluster
