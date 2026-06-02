# 📂 Equipo de Agentes Jerárquico
> El espacio de trabajo canónico para una arquitectura de agentes Supervisor-Trabajador, donde un gestor LLM delega sub-tareas a nodos trabajadores especializados y sintetiza sus salidas.

📄 `team-charter-brief.md`    # Breve canónico: Objetivo general del equipo y definición de hecho
🧠 `global-memory.md`         # Memoria de sesión: Pizarra compartida para que el supervisor rastree el progreso general
🤖 `CLAUDE.md`                # Reglas operativas: Instrucciones estrictas para que el supervisor evite hacer el trabajo él mismo

## 📁 supervisor-node/ (5 habilidades - El Gestor)
📄 `task-decomposer.md`       # Desglosa solicitudes complejas del usuario en sub-tareas atómicas e independientes
📄 `worker-router.md`         # Asigna sub-tareas a la persona trabajadora especializada correcta
📄 `dependency-grapher.md`    # Determina el orden de ejecución (p. ej., Analista de Datos debe terminar antes de que comience el Redactor de Informes)
📄 `quality-reviewer.md`      # Evalúa las salidas de los trabajadores contra los criterios de la solicitud inicial
📄 `synthesis-engine.md`      # Combina las salidas de los trabajadores aprobadas en una única respuesta final coherente

## 📁 specialized-workers/ (4 personas agentes - El Equipo)
📄 `researcher-agent.md`      # Capacidad de búsqueda profunda • raspado web y consultas RAG
📄 `analyst-agent.md`         # Procesamiento de datos • sandbox de ejecución Python/Pandas
📄 `writer-agent.md`          # Formato de contenido • aplica directrices de tono y marca
📄 `qa-tester-agent.md`       # Validación de código o lógica • intenta romper las salidas de otros trabajadores

## 📁 communication-bus/ (3 habilidades - Paso de Mensajes)
📄 `message-broker.md`        # Maneja cargas JSON asincrónicas entre supervisor y trabajadores
📄 `context-culling.md`       # Evita enviar toda la memoria global a un trabajador • envía solo el alcance relevante
📄 `escalation-protocol.md`   # Cómo un trabajador marca al supervisor si una tarea es imposible o está bloqueada

## 📁 state-management/ (3 habilidades - Puntos de Control)
📄 `redis-task-queue.md`      # Rastrea sub-tareas pendientes, en progreso y completadas
📄 `dead-letter-queue.md`     # Captura ejecuciones de trabajadores fallidas para revisión humana o reintento del supervisor
📄 `github-final-sync.md`     # Confirmaciones automatizadas de la salida sintetizada final en repositorios finales de Github

## 📁 team-evals/ (3 habilidades - Métricas de Rendimiento)
📄 `delegation-accuracy.md`   # ¿Eligió el supervisor al trabajador correcto para el trabajo?
📄 `worker-latency.md`        # Rastrea cuánto tiempo tarda cada persona en devolver una carga
📄 `token-spend-tracker.md`   # Agrega los costos de la API LLM en toda la jerarquía

---
**Archivos de Configuración**
⚙️ `langgraph-config.yaml`    # Definición del estado del gráfico asignando los nodos (supervisor) y aristas (trabajadores)
📦 `pyproject.toml`           # Dependencias de Python y requisitos de compilación

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
