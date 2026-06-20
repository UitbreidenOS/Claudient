# 📂 Escaparate de Comercio Electrónico AI 3D

> El espacio de trabajo canónico para una arquitectura de backend de calidad producción, diseñado para manejar inferencia LLM de alta concurrencia, enrutamiento dinámico de tareas multiagente y monetización rápida de SaaS.

📄 `backend-architecture-brief.md` # Resumen canónico: Define los límites de API principales, SLAs de latencia de tokens y el modelo de negocio multiagente general
🧠 `active-agent-sessions.md`      # Memoria de sesión: Seguimiento dinámico del contexto para cargas de trabajo actuales de empleados virtuales y conexiones de bases de datos activas
🤖 `CLAUDE.md`                     # Reglas operacionales: Instrucciones estrictas para aplicar limitación de velocidad de API y configuraciones de servidor sin estado obligatorias

## 📁 api-gateway-and-routes/ (4 habilidades - La Puerta Principal)
📄 `health-api-core.md`            # El servidor central FastAPI/Node que maneja todas las solicitudes de clientes entrantes para el repositorio core health-api
📄 `streaming-response-handler.md` # Lógica de eventos enviados por servidor (SSE) para transmitir al instante procesos de pensamiento multiagente a la interfaz de usuario
📄 `rate-limit-and-auth.md`        # Middleware respaldado por Redis que garantiza que los usuarios no puedan hacer DDoS en los costosos puntos finales de inferencia
📄 `rapid-monetization-webhooks.md`# Integraciones de Stripe perfectamente mapeadas al uso de tokens para garantizar que monetices el SaaS rápida y limpiamente

## 📁 multi-agent-orchestration/ (3 habilidades - Empleados Virtuales)
📄 `saas-employee-router.md`       # La máquina de estado supervisora que clasifica intenciones de usuario y entrega tareas a agentes IA especializados "empleados"
📄 `inter-agent-pubsub.md`         # Canales Kafka o Redis Pub/Sub que permiten al "Agente de Investigación" pasar datos estructurados al "Agente de Codificación" de forma asincrónica
📄 `hallucination-firewall.md`     # Validadores de esquema Pydantic que rechazan y reintentan automáticamente salidas de agentes que rompen la estructura JSON esperada

## 📁 compute-load-balancer/ (4 habilidades - Costo y Escala)
📄 `bedrock-primary-allocator.md`  # Configuraciones de Terraform para enrutar sistemas multiagente pesados y canalizaciones RAG directamente a AWS Bedrock
📄 `mac-mini-fallback.md`          # Lógica de enrutamiento dinámico que detecta tareas de fondo no urgentes y las envía a una Mac mini dedicada para reducir drásticamente los costos de la nube
📄 `dgx-spark-ml-runner.md`        # Puntos finales personalizados para descargar tareas de aprendizaje profundo y ajuste fino de modelos locales en hardware Nvidia DGX pesado
📄 `token-budget-enforcer.md`      # Cortacircuitos que pausan automáticamente el bucle de ejecución de un empleado de IA si excede su gasto de API asignado

## 📁 memory-and-context/ (3 habilidades - Gestión de Estado)
📄 `vector-db-connector.md`        # Grupos de conexiones y capas de almacenamiento en caché semántico para Pinecone/pgvector
📄 `short-term-redis-memory.md`    # Gestiona la ventana de conversación activa, resumiendo automáticamente mensajes más antiguos para prevenir inflación de tokens
📄 `long-term-s3-archives.md`      # Almacenamiento en frío para salidas de agentes finalizadas y registros del sistema

## 📁 ci-cd-and-deployment/ (3 habilidades - Envío)
📄 `container-optimization.md`     # Dockerfiles multietapa que eliminan completamente dependencias pesadas de ML para la compilación de producción
📄 `load-test-simulator.md`        # Scripts k6 que simulan 1,000 llamadas de API de agente concurrentes para probar cuellos de botella del sistema
📄 `github-final-sync.md`          # Acciones automatizadas para lint, prueba y envío del código backend listo para producción directamente a tus repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `openapi-schema.yaml`           # La única fuente de verdad para los contratos health-api, asegurando que la interfaz principal nunca se rompa
📦 `celery-worker.conf`            # Configuración para colas de tareas asincrónicas que gestionan trabajos de agentes nocturnos
