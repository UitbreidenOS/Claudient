# 📂 Autonomous Coder Workspace
> Der kanonische Arbeitsplatz für die Ausführung eines autonomen Codieragenten über Nacht in einer streng isolierten Ausführungsumgebung.

📄 `project-brief.md`      # Kanonisches Briefing: Aktuelle Sprint-Tickets und Overnight-PR-Ziele
🧠 `memory.md`             # Sitzungsspeicher: Dynamischer Kontext für die aktive Coding-Sitzung
🤖 `CLAUDE.md`             # Betriebsregeln: Strikte Anweisungen für den Overnight-Run (YOLO-Modus innerhalb der Sandbox erlaubt)

## 📁 .docker-sandbox/ (5 Skills - Isolation & Sicherheit)
📄 `sandbox-config.yaml`   # MicroVM-Definition • CPU/RAM-Grenzen für den Container
📄 `network-policy.md`     # Egress-Regeln • explizite Allowliste für Package Manager (npm, pip)
📄 `credential-proxy.md`   # Secret-Injektion • MITM-Proxy, um Host-Keys aus der Agent-VM zu halten
📄 `mounts.yaml`           # Volume-Bindungen • streng begrenzt auf den `target-repo/`-Pfad
📄 `lifecycle-hooks.sh`    # Ephemerer Abbau • Container bei Fehler automatisch zerstören

## 📁 target-repo/ (Die Ziel-Codebasis)
📄 `docker-compose.yml`    # Die Anwendungsumgebung, die der Agent verwendet, um seinen eigenen Code zu testen
📄 `package.json`          # Agent darf Abhängigkeiten über seinen isolierten Daemon verwalten

## 📁 validation-suite/ (4 Skills - Unbeaufsichtigtes Testen)
📄 `matrix-runner.md`      # E2E-Test-Ausführungsanweisungen
📄 `lint-fixer.md`         # Auto-Formatierungsregeln vor dem Committen
📄 `coverage-check.sh`     # Minimale Coverage-Schwellwerte (z.B. 80%) erforderlich für PR-Genehmigung
📄 `sandbox-tests.md`      # Validiert, dass der Agent den Container während der Ausführung nicht verlassen kann

## 📁 ops-automation/ (4 Skills - CI/CD & Handoff)
📄 `git-manager.md`        # Scoped-Credential-Git-Pushes über sicheren Proxy
📄 `commit-validator.md`   # Semantic-Commit-Erzwingung (feat:, fix:, chore:)
📄 `pr-generator.md`       # Automatisierte GitHub-PR-Beschreibungserstellung
📄 `slack-webhook.md`      # Morgens zusammenfassende Benachrichtigung über Pipeline-Erfolg oder -Fehler

## 📁 audit-logs/ (Unveränderliche Aufzeichnungen)
📄 `shell-history.log`     # Unveränderliche Aufzeichnung jedes Bash-Befehls, den der Agent ausgeführt hat
📄 `network-events.log`    # Alle externen API-Aufrufe, die vom Proxy abgefangen wurden

---
**Konfigurationsdateien**
⚙️ `Makefile`              # `make run-overnight` (triggert Sandbox-Build und Agent-Kickoff)
📦 `agent-config.toml`     # LLM-Routing und Token-Limit-Konfigurationen

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
