# 📂 Local-First Agentic Sandbox

> De canonieke werkruimte voor het uitvoeren van een volledig offline, geïsoleerde autonome agent met behulp van lokale open-weights modellen (Ollama/Qwen/Llama 3).

📄 `offline-brief.md`         # Canonieke briefing: Systeemarchitectuur voor nul-latency, alleen lokale uitvoering
🧠 `memory.md`                # Sessiegeheugen: Dynamische contexttracking voor de actieve lokale agentsessie
🤖 `CLAUDE.md`                # Bedrijfsregels: Strikte instructies om externe API-fallbacks te omzeilen

## 📁 model-orchestration/ (4 skills - Lokale LLM-motor)
📄 `ollama-router.md`         # Modelmultiplexer • routeert complexe logica naar Qwen-72B en eenvoudige taken naar Llama-3-8B
📄 `modelfile-manager.md`     # Dynamische systeemprompt-injectie voor lokale GGUF-modellen
📄 `vram-allocator.md`        # GPU-geheugencontrole • voorkomt out-of-memory (OOM) crashes op lokale hardware
📄 `fallback-handler.md`      # Modelkwantiseringsdowngrades (bijv. Q8 naar Q4) bij geheugenpieken

## 📁 local-tools/ (5 skills - Offline uitvoering)
📄 `file-system-editor.md`    # Scoped CRUD-bewerkingen voor lokale mappen
📄 `local-bash-runner.md`     # Shell-uitvoeringsmotor geïsoleerd binnen het hostbesturingssysteem
📄 `sqlite-manager.md`        # Directe query's naar lokale lichtgewicht databases zonder netwerkoverhead
📄 `offline-linter.md`        # Codevalidatie met puur lokale statische analysehulpmiddelen
📄 `local-rag-search.md`      # BM25 trefwoord + lokale dichte vectorzoeking

## 📁 memory-store/ (3 skills - Persistente status)
📄 `chromadb-manager.md`      # Kortstondige en persistente vectoropslag die strikt op localhost werkt
📄 `sqlite-state-tracker.md`  # Transactioneel logboek van alle agentstappen voor pauze/hervatting mogelijkheden
📄 `context-pruner.md`        # Sliding window tokenbeheer aangepast aan lokale modellimites (bijv. 8k context)

## 📁 security-boundaries/ (3 skills - Hostbeveiliging)
📄 `chroot-jail.md`           # Directory-beperking garandeerde dat de agent geen toegang heeft tot `~/.ssh` of systeemwortels
📄 `network-blocker.md`       # Firewallregels die strikte beleid voor nul-uitgang afdwingen
📄 `resource-limits.md`       # Cgroups-configuratie om maximaal CPU/RAM-gebruik door het agentproces te beperken

## 📁 evals/ (3 skills - Lokale benchmarking)
📄 `inference-speed.md`       # Volgt tokens-per-seconde (TPS) op lokale hardware
📄 `tool-accuracy.md`         # Grondwaarheid-vergelijking voor lokale bash en SQLite-outputs
📄 `hardware-thermals.md`     # Monitort systeemtemperaturen om gevolgtrekking te pauzeren als hardware oververhit wordt

---
**Configuratiebestanden**
⚙️ `Modelfile`                # Aangepaste Ollama-instructies en parameterinstellingen (temperatuur, top_k)
⚙️ `docker-compose.local.yml` # Zelfstandige lokale stack voor ChromaDB, UI en modelservering

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
