# 📂 Local-First Agentic Sandbox

> Der kanonische Arbeitsbereich für die Ausführung eines vollständig offline, luftgestützten autonomen Agenten mit lokalen Open-Weights-Modellen (Ollama/Qwen/Llama 3).

📄 `offline-brief.md`         # Kanonische Beschreibung: Systemarchitektur für Null-Latenz-Ausführung nur lokal
🧠 `memory.md`                # Sitzungsspeicher: Dynamisches Kontextverfolgung für die aktive lokale Agentensitzung
🤖 `CLAUDE.md`                # Betriebsregeln: Strikte Anweisungen zum Umgehen externer API-Fallbacks

## 📁 model-orchestration/ (4 Skills - Lokale LLM-Engine)
📄 `ollama-router.md`         # Modell-Multiplexer • leitet komplexe Logik an Qwen-72B und einfache Aufgaben an Llama-3-8B
📄 `modelfile-manager.md`     # Dynamische Systemaufforderungs-Injection für lokale GGUF-Modelle
📄 `vram-allocator.md`        # GPU-Speicherüberwachung • verhindert Out-of-Memory (OOM) Abstürze auf lokaler Hardware
📄 `fallback-handler.md`      # Modellquantisierungsdowngrades (z.B. Q8 zu Q4), falls Speicher ausspitzelt

## 📁 local-tools/ (5 Skills - Offline-Ausführung)
📄 `file-system-editor.md`    # Begrenzte CRUD-Operationen für lokale Verzeichnisse
📄 `local-bash-runner.md`     # Shell-Ausführungs-Engine isoliert innerhalb des Host-Betriebssystems
📄 `sqlite-manager.md`        # Direkte Abfragen an lokale leichte Datenbanken ohne Netzwerk-Overhead
📄 `offline-linter.md`        # Code-Validierung mittels rein lokaler statischer Analysewerkzeuge
📄 `local-rag-search.md`      # BM25 Schlüsselwort + lokale dichte Vektorsuche

## 📁 memory-store/ (3 Skills - Persistenter Zustand)
📄 `chromadb-manager.md`      # Ephemere und persistente Vektorspeicherung, streng auf localhost ausgeführt
📄 `sqlite-state-tracker.md`  # Transaktionsprotokoll aller Agentenschritte für Pause/Wiederaufnahme-Funktionen
📄 `context-pruner.md`        # Gleitfenster-Token-Management angepasst an lokale Modellgrenzen (z.B. 8k Kontext)

## 📁 security-boundaries/ (3 Skills - Host-Schutz)
📄 `chroot-jail.md`           # Verzeichniskonfinement, das sicherstellt, dass der Agent nicht auf `~/.ssh` oder Systemstämme zugreifen kann
📄 `network-blocker.md`       # Firewall-Regeln, die strikte Null-Egress-Richtlinien durchsetzen
📄 `resource-limits.md`       # Cgroups-Konfiguration, um maximale CPU-/RAM-Nutzung durch den Agentenprozess zu drosseln

## 📁 evals/ (3 Skills - Lokales Benchmarking)
📄 `inference-speed.md`       # Verfolgt Tokens-pro-Sekunde (TPS) auf lokaler Hardware
📄 `tool-accuracy.md`         # Ground-Truth-Vergleich für lokale Bash- und SQLite-Ausgaben
📄 `hardware-thermals.md`     # Überwacht Systemtemperaturen, um Inferenz zu pausieren, falls Hardware überhitzt

---
**Konfigurationsdateien**
⚙️ `Modelfile`                # Benutzerdefinierte Ollama-Anweisungen und Parametereinstellungen (Temperatur, top_k)
⚙️ `docker-compose.local.yml` # Eigenständiger lokaler Stack für ChromaDB, UI und Modell-Serving
