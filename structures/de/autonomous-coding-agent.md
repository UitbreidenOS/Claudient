# 📂 Workspace für autonome Coding-Agenten
> Der kanonische Workspace für die Bereitstellung und Verwaltung produktionsgerechter autonomer Coding-Agenten, entworfen für kontinuierliche Nachtentwicklungsschleifen und nahtlose Übertragung validierter Code in deine finalen Repositories.

📄 `agent-architecture-brief.md` # Kanonisches Briefing: Definiert die Agentenpermissionen, genehmigte Tech-Stack und Human-in-the-Loop (HITL) Interventionsschwellen
🧠 `active-nightly-builds.md`    # Session-Memory: Dynamische Kontextverfolgung für aktuelle nächtliche Refactoring-Aufgaben und ungelöste Kompilierungsfehler
🤖 `CLAUDE.md`                   # Betriebsregeln: Strikte Anweisungen zur Vermeidung unendlicher Ausführungsschleifen und Mandatierung deterministischen API-Routings

## 📁 agent-orchestration/ (4 Skills - Das Gehirn)
📄 `zaltaclaw-execution-loop.md` # Das Kern-Automatisierungsmodul, das es dem ZaltaClaw-Agenten ermöglicht, Code nachts ohne menschliche Intervention zu schreiben, zu testen und zu debuggen
📄 `claude-managed-agents.md`    # Integrationskonfigurationen zur Nutzung von Claudes öffentlichen Beta Managed Agents für spezialisierte Reasoning-Aufgaben
📄 `claude-code-integration.md`  # CLI-Wrapper, die es dem Agenten ermöglichen, Shell-Befehle auszuführen und lokale Dateien sicher zu modifizieren
📄 `multi-agent-coordinator.md`  # Supervisor-Logik zur Weiterleitung komplexer Aufgaben über Multi-Agent-Systeme, gehostet auf AWS Bedrock

## 📁 compute-and-infrastructure/ (3 Skills - Ausführungsumgebung)
📄 `mac-mini-host-config.md`     # Setupscripte zur Bereitstellung der primären Automatisierungsschleife auf einem dedizierten Mac mini zur Minimierung von Cloud-Inference-Kosten
📄 `aws-bedrock-allocator.md`    # Terraform-Konfigurationen zum Starten skalierbarer, bedarfsgesteuerter Agent-Cluster für schwere RAG-Pipelines
📄 `sandbox-container-rules.md`  # Docker-Konfigurationen, die sicherstellen, dass der Agent während einer Halluzination nicht versehentlich lokale Systemdateien löscht

## 📁 target-repositories/ (3 Skills - Code-Ausgabe)
📄 `health-api-backend.md`       # Standardbetriebsverfahren für den Agenten bei der Mitarbeit im Backend Python/Node Repository
📄 `health-ui-frontend.md`       # Komponenten-Strukturen und Styling-Richtlinien für den Agenten bei der Aktualisierung des Frontend Next.js/React Repositories
📄 `github-final-sync.md`        # Automatisierte CI/CD-Trigger, die die nächtliche Arbeit des Agenten validieren und sauber in die finalen Github-Repos zusammenführen

## 📁 frontend-asset-pipeline/ (3 Skills - UI- und Design-Schutzmaßnahmen)
📄 `texture-and-color-guardrails.md` # Strikte Regeln zur Interception der Bildgenerierungstools des Agenten: müssen unbedingt die ursprünglichen Malerfarben während Website-Bildverbesserungen beibehalten und hyper-realistische Texturen erzwingen (z.B. Matching einer natürlichen grünen Kokosnuss), während unerwünschte Third-Party-Monster-Logos entfernt werden
📄 `responsive-layout-tester.md` # Playwright-Skripte, die der Agent ausführt, um zu überprüfen, dass CSS-Gitter auf mobilen Viewports nicht brechen
📄 `component-storyboarder.md`   # Auto-generiert Storybook-Einträge für alle neuen UI-Elemente, die der Agent erstellt

## 📁 evals-and-telemetry/ (3 Skills - Qualitätskontrolle)
📄 `compile-success-tracker.md`  # Überwacht das Verhältnis erfolgreicher nächtlicher Builds vs. Syntaxfehler, die vom Agenten generiert werden
📄 `token-burn-alerter.md`       # Harte Grenzen, die die ZaltaClaw-Schleife sofort unterbrechen, wenn die API-Token-Nutzung abnormal ansteigt
📄 `code-review-llm.md`          # Ein sekundärer, isolierter Agent, der ausschließlich die Pull Requests des primären Agenten kritisiert und bewertet

---
**Konfigurationsdateien**
⚙️ `agent-permissions.json`      # Whitelist-CLI-Befehle (z.B. `npm run build`, `git commit`), die der Agent rechtlich ausführen darf
📦 `bedrock-models.yaml`         # Versions-Pinning für spezifische AWS Bedrock Foundation Models zur Vermeidung von Prompt-Drift
