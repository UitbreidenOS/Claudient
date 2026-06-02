# 📂 Hiërarchisch Agent Team
> De canonieke werkruimte voor een Supervisor-Worker agent architectuur, waarbij een manager LLM sub-taken delegeert aan gespecialiseerde worker nodes en hun outputs samenvat.

📄 `team-charter-brief.md`    # Canonieke brief: Overkoepelend doel van het team en definitie van afronding
🧠 `global-memory.md`         # Sessie geheugen: Gedeeld whiteboard voor de supervisor om algehele voortgang bij te houden
🤖 `CLAUDE.md`                # Bedrijfsregels: Strikte instructies voor de supervisor om het werk zelf niet uit te voeren

## 📁 supervisor-node/ (5 skills - De Manager)
📄 `task-decomposer.md`       # Breekt complexe gebruikersaanvragen af in atomaire, onafhankelijke sub-taken
📄 `worker-router.md`         # Koppelt sub-taken aan de juiste gespecialiseerde worker persona
📄 `dependency-grapher.md`    # Bepaalt uitvoervolgorde (bijv. Data Analyst moet klaar zijn voordat Report Writer start)
📄 `quality-reviewer.md`      # Evalueert worker outputs op basis van de initiële prompt criteria
📄 `synthesis-engine.md`      # Combineert goedgekeurde worker outputs in een enkele coherente eindresponse

## 📁 specialized-workers/ (4 agent personas - Het Team)
📄 `researcher-agent.md`      # Diepe zoekfunctie • web scraping en RAG querying
📄 `analyst-agent.md`         # Gegevensverwerking • Python/Pandas uitvoeringsandbox
📄 `writer-agent.md`          # Opmaak van inhoud • handhaaaft toon en merkrichtlijnen
📄 `qa-tester-agent.md`       # Code of logica validatie • probeert de outputs van andere workers te breken

## 📁 communication-bus/ (3 skills - Berichtdoorgifte)
📄 `message-broker.md`        # Verwerkt asynchrone JSON payloads tussen supervisor en workers
📄 `context-culling.md`       # Voorkomt dat het volledige globale geheugen naar een worker wordt verzonden • verzendt alleen relevant bereik
📄 `escalation-protocol.md`   # Hoe een worker de supervisor signaleert als een taak onmogelijk of geblokkeerd is

## 📁 state-management/ (3 skills - Controlepunten)
📄 `redis-task-queue.md`      # Volgt hangende, lopende en voltooide sub-taken
📄 `dead-letter-queue.md`     # Legt mislukte worker uitvoeringen vast voor menselijke beoordeling of supervisor retry
📄 `github-final-sync.md`     # Automatische commits van de eindgestelde output naar Github final repos

## 📁 team-evals/ (3 skills - Prestatiemetrieken)
📄 `delegation-accuracy.md`   # Koos de supervisor de juiste worker voor de taak?
📄 `worker-latency.md`        # Volgt hoelang elke persona nodig heeft om een payload terug te geven
📄 `token-spend-tracker.md`   # Aggregeert LLM API-kosten in de hele hiërarchie

---
**Configuratiebestanden**
⚙️ `langgraph-config.yaml`    # Graph state definitie die de nodes (supervisor) en edges (workers) toewijst
📦 `pyproject.toml`           # Python afhankelijkheden en buildvereisten

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
