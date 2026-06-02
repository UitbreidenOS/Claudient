# 📂 Hierarchisches Agent-Team
> Der kanonische Arbeitsbereich für eine Supervisor-Worker-Agent-Architektur, bei der ein Manager-LLM Teilaufgaben an spezialisierte Worker-Knoten delegiert und deren Ausgaben synthetisiert.

📄 `team-charter-brief.md`    # Kanonisches Briefing: Übergeordnetes Ziel des Teams und Definition von Done
🧠 `global-memory.md`         # Sitzungsspeicher: Gemeinsames Whiteboard für den Supervisor zur Verfolgung des Gesamtfortschritts
🤖 `CLAUDE.md`                # Betriebsregeln: Strikte Anweisungen für den Supervisor, um zu vermeiden, dass er die Arbeit selbst macht

## 📁 supervisor-node/ (5 Skills - Der Manager)
📄 `task-decomposer.md`       # Zerlegt komplexe Benutzeranfragen in atomare, unabhängige Teilaufgaben
📄 `worker-router.md`         # Ordnet Teilaufgaben der korrekten spezialisierten Worker-Persona zu
📄 `dependency-grapher.md`    # Bestimmt die Ausführungsreihenfolge (z. B. Datenanalyst muss fertig sein, bevor Report Writer startet)
📄 `quality-reviewer.md`      # Bewertet Worker-Ausgaben gegen die ursprünglichen Prompt-Kriterien
📄 `synthesis-engine.md`      # Kombiniert genehmigte Worker-Ausgaben in eine einzige, kohärente Entweder

## 📁 specialized-workers/ (4 Agent-Personas - Das Team)
📄 `researcher-agent.md`      # Deep-Search-Fähigkeit • Web-Scraping und RAG-Abfragen
📄 `analyst-agent.md`         # Datenverarbeitung • Python/Pandas-Ausführungssandbox
📄 `writer-agent.md`          # Inhaltsformatierung • Erzwingt Ton und Brand-Richtlinien
📄 `qa-tester-agent.md`       # Code- oder Logikvalidierung • Versucht, die Ausgaben anderer Worker zu brechen

## 📁 communication-bus/ (3 Skills - Nachrichtenübertragung)
📄 `message-broker.md`        # Verarbeitet asynchrone JSON-Payloads zwischen Supervisor und Workers
📄 `context-culling.md`       # Verhindert, dass der gesamte globale Speicher an einen Worker gesendet wird • sendet nur relevanten Umfang
📄 `escalation-protocol.md`   # Wie ein Worker den Supervisor flaggt, wenn eine Aufgabe unmöglich oder blockiert ist

## 📁 state-management/ (3 Skills - Checkpointing)
📄 `redis-task-queue.md`      # Verfolgt ausstehende, laufende und abgeschlossene Teilaufgaben
📄 `dead-letter-queue.md`     # Erfasst fehlgeschlagene Worker-Ausführungen zur Überprüfung durch den Menschen oder Supervisor-Wiederholung
📄 `github-final-sync.md`     # Automatisierte Commits der endgültigen synthetisierten Ausgabe an GitHub-Final-Repos

## 📁 team-evals/ (3 Skills - Leistungsmetriken)
📄 `delegation-accuracy.md`   # Hat der Supervisor den richtigen Worker für den Job ausgewählt?
📄 `worker-latency.md`        # Verfolgt, wie lange jede Persona braucht, um eine Payload zurückzugeben
📄 `token-spend-tracker.md`   # Aggregiert LLM-API-Kosten in der gesamten Hierarchie

---
**Konfigurationsdateien**
⚙️ `langgraph-config.yaml`    # Graph-State-Definition, die die Knoten (Supervisor) und Kanten (Workers) abbildet
📦 `pyproject.toml`           # Python-Abhängigkeiten und Build-Anforderungen

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
