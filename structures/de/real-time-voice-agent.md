# 📂 Real-Time Voice Agent
> Der kanonische Produktionsarbeitsbereich für einen Voice-to-Voice-Agenten mit einer Latenz unter 300 ms, unter Verwendung von LiveKit WebRTC und einer aktiven Streaming-Pipeline.

📄 `voice-persona-brief.md`  # Kanonische Kurzbeschreibung: Agent-Ton, Fallback-Verhalten und Eskalationswege
🧠 `memory-context.md`       # Sitzungsgedächtnis: Dynamischer Kontext, der während des aktiven Telefonanrufs übergeben wird
🤖 `CLAUDE.md`               # Betriebsregeln: Strikte Anweisungen, um Antworten unter 2 Sätzen für natürliche Kommunikation zu halten

## 📁 livekit-orchestrator/ (5 Fähigkeiten - Real-Time Pipeline)
📄 `room-dispatcher.md`      # WebRTC-Raum-Verwaltung • automatisierte Agent-Dispatch bei Benutzereintritt
📄 `audio-buffer.md`         # PCM int16 Stream-Handler • 20ms Audio-Chunking-Protokolle
📄 `turn-detector.md`        # Semantische Turn-Erkennung • unterscheidet "äh" von End-of-Thought
📄 `barge-in-handler.md`     # Unterbrechungslogik • akustische VAD (Silero) Abstimmung
📄 `telephony-bridge.md`     # SIP-Trunk-Integration • Verbindung echter Telefonnummern mit WebRTC

## 📁 streaming-pipeline/ (3 Fähigkeiten - Sub-300ms Stack)
📄 `stt-transcriber.md`      # Deepgram Nova-3 Integration • persistente WebSocket-Verbindung
📄 `llm-reasoner.md`         # Streaming-Reasoning • OpenAI/Anthropic Token-Generierung via vLLM
📄 `tts-synthesizer.md`      # ElevenLabs Turbo v2.5 Integration • Streaming-Audio-Chunks während der Generierung

## 📁 tool-execution/ (4 Fähigkeiten - Agent-Aktionen)
📄 `tool-registry.md`        # XML-Tags und Function-Calling-Specs für Mid-Turn-Ausführung
📄 `crm-sync.md`             # Echtzeit Salesforce/HubSpot Datenabrufe während des Gesprächs
📄 `calendar-booker.md`      # Live-Verfügbarkeitsprüfung und Terminplanung
📄 `timeout-fallback.md`     # Elegante "System nicht verfügbar" Verbalisierungen bei Tool-Fehlern

## 📁 telemetry-evals/ (3 Fähigkeiten - Qualität & Latenz)
📄 `latency-monitor.md`      # Time-to-First-Audio (TTFA) Verfolgung • Warnungen wenn > 500ms
📄 `conversation-logger.md`  # EU AI Act Konformität • unveränderliche Transkripte und Tool-Ausführungsprotokolle
📄 `escalation-trigger.md`   # Human-in-the-Loop Übergabe bei Sentiment-Rückgang oder Logik-Schleifen

---
**Konfigurationsdateien**
⚙️ `docker-compose.yml`      # Lokale SFU und Worker-Deployment-Zuordnung
📦 `requirements.txt`        # LiveKit Agents SDK, Pipecat und VAD-Abhängigkeiten

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
