# 📂 Agente de Voz en Tiempo Real
> El espacio de trabajo de producción canónico para un agente de voz a voz con latencia inferior a 300ms, utilizando WebRTC de LiveKit y un pipeline de transmisión activa.

📄 `voice-persona-brief.md`  # Resumen canónico: Tono del agente, comportamiento de fallback y rutas de escalada
🧠 `memory-context.md`       # Memoria de sesión: Contexto dinámico pasado durante la llamada telefónica activa
🤖 `CLAUDE.md`               # Reglas de operación: Instrucciones estrictas para mantener respuestas bajo 2 oraciones para un flujo natural

## 📁 livekit-orchestrator/ (5 skills - Pipeline en Tiempo Real)
📄 `room-dispatcher.md`      # Gestión de salas WebRTC • envío automatizado de agentes al unirse el usuario
📄 `audio-buffer.md`         # Controlador de flujo PCM int16 • protocolos de fragmentación de audio de 20ms
📄 `turn-detector.md`        # Detección semántica de turnos • diferencia "umm" de fin de pensamiento
📄 `barge-in-handler.md`     # Lógica de interrupción • sintonización de VAD acústico (Silero)
📄 `telephony-bridge.md`     # Integración de troncal SIP • conectando números telefónicos reales a WebRTC

## 📁 streaming-pipeline/ (3 skills - Stack Sub-300ms)
📄 `stt-transcriber.md`      # Integración de Deepgram Nova-3 • conexión WebSocket persistente
📄 `llm-reasoner.md`         # Razonamiento en streaming • generación de tokens OpenAI/Anthropic vía vLLM
📄 `tts-synthesizer.md`      # Integración de ElevenLabs Turbo v2.5 • fragmentos de audio de transmisión a medida que se generan

## 📁 tool-execution/ (4 skills - Acciones del Agente)
📄 `tool-registry.md`        # Etiquetas XML y especificaciones de llamada de función para ejecución a mitad de turno
📄 `crm-sync.md`             # Extracciones de datos de Salesforce/HubSpot en tiempo real durante la conversación
📄 `calendar-booker.md`      # Verificación de disponibilidad en directo y programación de citas
📄 `timeout-fallback.md`     # Verbalización graceful "sistema no disponible" si las herramientas fallan

## 📁 telemetry-evals/ (3 skills - Calidad y Latencia)
📄 `latency-monitor.md`      # Seguimiento de tiempo hasta el primer audio (TTFA) • alertas si > 500ms
📄 `conversation-logger.md`  # Cumplimiento de la Ley de IA de la UE • transcripciones inmutables y registros de ejecución de herramientas
📄 `escalation-trigger.md`   # Transferencia de bucle humano-en-bucle cuando el sentimiento disminuye o la lógica se repite

---
**Archivos de Configuración**
⚙️ `docker-compose.yml`      # Mapeo de implementación local de SFU y worker
📦 `requirements.txt`        # SDK de LiveKit Agents, Pipecat y dependencias de VAD
