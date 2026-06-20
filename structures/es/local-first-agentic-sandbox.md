# 📂 Sandbox Agéntico Local-Primero

> El espacio de trabajo canónico para ejecutar un agente autónomo completamente desconectado, aislado de la red, utilizando modelos de pesos abiertos locales (Ollama/Qwen/Llama 3).

📄 `offline-brief.md`         # Resumen canónico: Arquitectura del sistema para ejecución de latencia cero, solo local
🧠 `memory.md`                # Memoria de sesión: Seguimiento dinámico del contexto para la sesión activa del agente local
🤖 `CLAUDE.md`                # Reglas operativas: Instrucciones estrictas para eludir respaldos de API externas

## 📁 model-orchestration/ (4 habilidades - Motor LLM Local)
📄 `ollama-router.md`         # Multiplexor de modelos • enruta lógica compleja a Qwen-72B y tareas simples a Llama-3-8B
📄 `modelfile-manager.md`     # Inyección dinámica de indicación del sistema para modelos GGUF locales
📄 `vram-allocator.md`        # Monitoreo de memoria GPU • evita bloqueos por falta de memoria (OOM) en hardware local
📄 `fallback-handler.md`      # Degradaciones de cuantificación de modelos (p. ej., Q8 a Q4) si hay picos de memoria

## 📁 local-tools/ (5 habilidades - Ejecución Desconectada)
📄 `file-system-editor.md`    # Operaciones CRUD con alcance para directorios locales
📄 `local-bash-runner.md`     # Motor de ejecución de shell aislado dentro del SO anfitrión
📄 `sqlite-manager.md`        # Consultas directas a bases de datos locales ligeras sin sobrecarga de red
📄 `offline-linter.md`        # Validación de código usando herramientas de análisis estático puramente locales
📄 `local-rag-search.md`      # Búsqueda de palabras clave BM25 + búsqueda de vectores densos locales

## 📁 memory-store/ (3 habilidades - Estado Persistente)
📄 `chromadb-manager.md`      # Almacenamiento de vectores efímero y persistente ejecutándose estrictamente en localhost
📄 `sqlite-state-tracker.md`  # Registro transaccional de todos los pasos del agente para capacidades de pausa/reanudación
📄 `context-pruner.md`        # Gestión de ventana deslizante de tokens adaptada a límites de modelos locales (p. ej., contexto de 8k)

## 📁 security-boundaries/ (3 habilidades - Protección del Anfitrión)
📄 `chroot-jail.md`           # Confinamiento de directorios garantizando que el agente no pueda acceder a `~/.ssh` o raíces del sistema
📄 `network-blocker.md`       # Reglas de firewall imponiendo políticas estrictas de salida cero
📄 `resource-limits.md`       # Configuración de Cgroups para limitar el uso máximo de CPU/RAM por el proceso del agente

## 📁 evals/ (3 habilidades - Evaluación Comparativa Local)
📄 `inference-speed.md`       # Rastrea tokens por segundo (TPS) en hardware local
📄 `tool-accuracy.md`         # Comparación de verdad fundamental para salidas locales de bash y SQLite
📄 `hardware-thermals.md`     # Monitorea temperaturas del sistema para pausar la inferencia si el hardware se sobrecalienta

---
**Archivos de Configuración**
⚙️ `Modelfile`                # Instrucciones personalizadas de Ollama y configuración de parámetros (temperatura, top_k)
⚙️ `docker-compose.local.yml` # Pila local independiente para ChromaDB, UI y servicio de modelos
