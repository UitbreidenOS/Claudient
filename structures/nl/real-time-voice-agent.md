# 📂 Real-Time Voice Agent
> De canonieke productieomgeving voor een voice-to-voice agent met sub-300ms latency, gebruikmakend van LiveKit WebRTC en een actieve streaming pipeline.

📄 `voice-persona-brief.md`  # Canonieke brief: Agent toon, fallback-gedrag en escalatietrajecten
🧠 `memory-context.md`       # Sessigeheugen: Dynamische context doorgegeven tijdens het actieve telefoongesprek
🤖 `CLAUDE.md`               # Bedrijfsregels: Strikte instructies voor reacties onder 2 zinnen voor natuurlijke flow

## 📁 livekit-orchestrator/ (5 skills - Real-Time Pipeline)
📄 `room-dispatcher.md`      # WebRTC-ruimtebeheer • geautomatiseerde agentafzending bij gebruiker join
📄 `audio-buffer.md`         # PCM int16 stream handler • 20ms audio chunking protocollen
📄 `turn-detector.md`        # Semantische turn detectie • onderscheidt "umm" van einde-van-gedachte
📄 `barge-in-handler.md`     # Onderbreking logica • akoestische VAD (Silero) tuning
📄 `telephony-bridge.md`     # SIP trunk integratie • verbinding van echte telefoonnummers met WebRTC

## 📁 streaming-pipeline/ (3 skills - Sub-300ms Stack)
📄 `stt-transcriber.md`      # Deepgram Nova-3 integratie • aanhoudende WebSocket-verbinding
📄 `llm-reasoner.md`         # Streaming reasoning • OpenAI/Anthropic token generatie via vLLM
📄 `tts-synthesizer.md`      # ElevenLabs Turbo v2.5 integratie • streaming audio chunks gegenereerd

## 📁 tool-execution/ (4 skills - Agent Actions)
📄 `tool-registry.md`        # XML-tags en functie-oproep specs voor mid-turn uitvoering
📄 `crm-sync.md`             # Real-time Salesforce/HubSpot data pulls tijdens gesprek
📄 `calendar-booker.md`      # Live beschikbaarheid controleren en afspraken inplannen
📄 `timeout-fallback.md`     # Graceful "systeem niet beschikbaar" verbalisaties als tools mislukken

## 📁 telemetry-evals/ (3 skills - Quality & Latency)
📄 `latency-monitor.md`      # Time-to-first-audio (TTFA) tracking • waarschuwingen bij > 500ms
📄 `conversation-logger.md`  # EU AI Act compliance • onveranderbare transcripten en tool execution logs
📄 `escalation-trigger.md`   # Human-in-the-loop handoff wanneer sentiment daalt of logic loops

---
**Configuration Files**
⚙️ `docker-compose.yml`      # Lokale SFU en worker deployment mapping
📦 `requirements.txt`        # LiveKit Agents SDK, Pipecat, en VAD dependencies

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
