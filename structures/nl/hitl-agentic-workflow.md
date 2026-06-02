# 📂 HITL Agentic Workflow

> De canonieke werkruimte voor een Human-in-the-Loop (HITL) orkestratie-engine, ontworpen om autonome uitvoering te pauzeren voor handmatige menselijke goedkeuring van kritieke acties.

📄 `workflow-brief.md`        # Canonieke briefing: definieert welke specifieke acties menselijke goedkeuring vereisen (bijv. betalingen, uitgaande e-mails)
🧠 `memory.md`                # Sessiegeheugen: dynamische context van de werkstroom voorafgaand aan de pauzestatus
🤖 `CLAUDE.md`                # Bedrijfsregels: strikte instructies over hoe je payloads voor menselijke beoordeling formatteert

## 📁 workflow-orchestrator/ (4 skills - Execution Engine)
📄 `task-router.md`           # Standaard autonome executiepaden
📄 `pause-handler.md`         # Checkpointing logica • pauzeert veilig de agent-status zonder gegevens kwijt te raken
📄 `resume-trigger.md`        # Reactivatie hook • herstart de agent zodra de goedkeuringshook van de mens wordt ontvangen
📄 `timeout-abort.md`         # Gracieuze degradatie als de mens niet binnen 24 uur reageert

## 📁 human-approval-gateway/ (3 skills - The Interface)
📄 `approval-queue.md`        # Beheert de lijst met hangende taken voor de menselijke operator
📄 `payload-formatter.md`     # Vat de beoogde actie van de agent samen in een duidelijk, leesbare diff voor de mens
📄 `override-protocols.md`    # Stelt de mens in staat de voorgestelde actie van de agent te bewerken voordat deze wordt goedgekeurd

## 📁 notification-engine/ (3 skills - Alerts)
📄 `slack-alerts.md`          # Stuurt een ping naar een speciaal #agent-approvals-kanaal met een interactief Block Kit
📄 `websocket-broadcaster.md` # Duwt real-time meldingen naar een Next.js/React frontend-dashboard
📄 `escalation-router.md`     # Stuurt een ping naar secundaire operators als de primaire mens offline is

## 📁 state-resumption/ (3 skills - Memory Sync)
📄 `memory-rehydration.md`    # Herstelt de contextvenster van de agent perfect na heractivering
📄 `redis-state-lock.md`      # Gedistribueerde vergrendeling die dubbele goedkeuringen op dezelfde taak voorkomt
📄 `context-pruner.md`        # Schoon onnodige tokens op voordat de run opnieuw start

## 📁 audit-logs/ (Immutable Records)
📄 `decision-ledger.log`      # Traceert precies welke mens welke agent-actie en wanneer heeft goedgekeurd
📄 `rejection-analyzer.md`    # Verzamelt gegevens over *waarom* mensen acties afkeuren om de agent later te verbeteren

---
**Configuration Files**
⚙️ `temporal-config.yaml`     # Configuratie voor Temporal.io of vergelijkbare stateful workflow engines
📦 `package.json`             # Webhook-listeners en Slack SDK-afhankelijkheden

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
