# 📂 Agent Vocal en Temps Réel
> L'espace de travail de production canonique pour un agent vocal bidirectionnel avec une latence inférieure à 300 ms, utilisant LiveKit WebRTC et un pipeline de streaming actif.

📄 `voice-persona-brief.md`  # Brief canonique : ton de l'agent, comportement de secours et chemins d'escalade
🧠 `memory-context.md`       # Mémoire de session : contexte dynamique transmis pendant l'appel téléphonique actif
🤖 `CLAUDE.md`               # Règles de fonctionnement : instructions strictes pour maintenir les réponses en moins de 2 phrases pour un flux naturel

## 📁 livekit-orchestrator/ (5 compétences - Pipeline Temps Réel)
📄 `room-dispatcher.md`      # Gestion des salles WebRTC • dispatch automatique de l'agent à la connexion de l'utilisateur
📄 `audio-buffer.md`         # Gestionnaire de flux PCM int16 • protocoles de chunking audio 20 ms
📄 `turn-detector.md`        # Détection de tours sémantique • différencie les « euh » de la fin de pensée
📄 `barge-in-handler.md`     # Logique d'interruption • réglage de VAD acoustique (Silero)
📄 `telephony-bridge.md`     # Intégration de trunk SIP • connexion de vrais numéros de téléphone à WebRTC

## 📁 streaming-pipeline/ (3 compétences - Stack Sub-300ms)
📄 `stt-transcriber.md`      # Intégration Deepgram Nova-3 • connexion WebSocket persistante
📄 `llm-reasoner.md`         # Raisonnement en streaming • génération de tokens OpenAI/Anthropic via vLLM
📄 `tts-synthesizer.md`      # Intégration ElevenLabs Turbo v2.5 • chunks audio en streaming au fur et à mesure de la génération

## 📁 tool-execution/ (4 compétences - Actions de l'Agent)
📄 `tool-registry.md`        # Balises XML et spécifications d'appels de fonction pour l'exécution en mid-tour
📄 `crm-sync.md`             # Extractions de données Salesforce/HubSpot en temps réel pendant la conversation
📄 `calendar-booker.md`      # Vérification de disponibilité en direct et planification d'appointments
📄 `timeout-fallback.md`     # Verbalisations gracieuses « système indisponible » si les outils échouent

## 📁 telemetry-evals/ (3 compétences - Qualité et Latence)
📄 `latency-monitor.md`      # Suivi du temps jusqu'à premier audio (TTFA) • alertes si > 500 ms
📄 `conversation-logger.md`  # Conformité à la loi de l'UE sur l'IA • logs et transcriptions immuables et exécution des outils
📄 `escalation-trigger.md`   # Transfert en boucle fermée quand le sentiment baisse ou les boucles logiques persistent

---
**Fichiers de Configuration**
⚙️ `docker-compose.yml`      # Déploiement local SFU et mapping des workers
📦 `requirements.txt`        # LiveKit Agents SDK, Pipecat et dépendances VAD
