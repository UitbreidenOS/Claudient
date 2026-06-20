# 📂 HITL Agentic Workflow

> Der kanonische Arbeitsbereich für ein Human-in-the-Loop (HITL) Orchestrierungsmodul, das autonome Ausführung für manuelle Genehmigung durch Menschen bei hochriskanten Aktionen unterbricht.

📄 `workflow-brief.md`        # Kanonische Übersicht: Definiert, welche spezifischen Aktionen eine menschliche Genehmigung erfordern (z.B. Zahlungen, ausgehende E-Mails)
🧠 `memory.md`                # Sitzungsgedächtnis: Dynamischer Kontext des Workflows bis zum Pausenzustand
🤖 `CLAUDE.md`                # Betriebsregeln: Strikte Anweisungen zur Formatierung von Nutzlasten zur Überprüfung durch Menschen

## 📁 workflow-orchestrator/ (4 Fähigkeiten - Ausführungsmodul)
📄 `task-router.md`           # Standardmäßige autonome Ausführungspfade
📄 `pause-handler.md`         # Checkpointing-Logik • sperrt Agentzustand sicher, ohne Daten zu verlieren
📄 `resume-trigger.md`        # Reaktivierungshook • weckt den Agenten auf, sobald der Webhook zur Genehmigung durch Menschen empfangen wird
📄 `timeout-abort.md`         # Sanfte Verschlechterung, wenn der Mensch nicht innerhalb von 24 Stunden antwortet

## 📁 human-approval-gateway/ (3 Fähigkeiten - Die Schnittstelle)
📄 `approval-queue.md`        # Verwaltet die Liste der ausstehenden Aufgaben für den menschlichen Bediener
📄 `payload-formatter.md`     # Fasst die beabsichtigte Aktion des Agenten in einem sauberen, lesbaren Diff für den Menschen zusammen
📄 `override-protocols.md`    # Ermöglicht es dem Menschen, die vorgeschlagene Aktion des Agenten vor der Genehmigung zu bearbeiten

## 📁 notification-engine/ (3 Fähigkeiten - Benachrichtigungen)
📄 `slack-alerts.md`          # Benachrichtigt einen dedizierten #agent-approvals-Kanal mit interaktivem Block Kit
📄 `websocket-broadcaster.md` # Sendet Echtzeitbenachrichtigungen an ein Next.js/React-Frontend-Dashboard
📄 `escalation-router.md`     # Benachrichtigt sekundäre Bediener, wenn der primäre Mensch offline ist

## 📁 state-resumption/ (3 Fähigkeiten - Speichersynchronisierung)
📄 `memory-rehydration.md`    # Lädt den Kontextfenster des Agenten bei Reaktivierung perfekt nach
📄 `redis-state-lock.md`      # Verteiltes Sperren, das doppelte Genehmigungen für die gleiche Aufgabe verhindert
📄 `context-pruner.md`        # Räumt unnötige Token vor dem Neustart auf

## 📁 audit-logs/ (Unveränderliche Aufzeichnungen)
📄 `decision-ledger.log`      # Verfolgt genau, welcher Mensch welche Aktion des Agenten und wann genehmigt hat
📄 `rejection-analyzer.md`    # Erfasst Daten darüber, *warum* Menschen Aktionen ablehnen, um den Agenten später zu verbessern

---
**Konfigurationsdateien**
⚙️ `temporal-config.yaml`     # Konfiguration für Temporal.io oder ähnliche Stateful-Workflow-Engines
📦 `package.json`             # Webhook-Listener und Slack-SDK-Abhängigkeiten
