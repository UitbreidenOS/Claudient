# 📂 Espacio de Trabajo Multi-Agente SaaS

> El espacio de trabajo canónico para un Arquitecto de Plataforma de IA, diseñado para construir, escalar y monetizar una plataforma SaaS donde agentes de IA autónomos funcionan como empleados virtuales.

📄 `platform-architecture-brief.md` # Breve canónica: Define las personas del agente "empleado", la estrategia de monetización principal y el aislamiento de datos multi-tenant
🧠 `active-workforce-memory.md`     # Memoria de sesión: Seguimiento de contexto dinámico para colas de tareas de agentes actuales y registros de comunicación entre agentes
🤖 `CLAUDE.md`                      # Reglas operativas: Instrucciones estrictas para aplicar el enrutamiento determinista de herramientas y evitar bucles de agentes infinitos

## 📁 agent-workforce/ (4 habilidades - Empleados Virtuales)
📄 `employee-persona-router.md`     # El nodo supervisor que clasifica intenciones del usuario y delega tareas a agentes departamentales especializados (p. ej., Agente de Ventas, Agente de Soporte)
📄 `zaltaclaw-autonomous-loop.md`   # Motor de ejecución central para ejecutar operaciones de agentes autónomos continuas durante la noche sin intervención humana
📄 `inter-agent-protocols.md`       # Estándares de paso de mensajes que permiten que el "Agente de Marketing" entregue contexto sin problemas al "Agente de Ventas"
📄 `hallucination-guardrails.md`    # Comprobaciones heurísticas previas al vuelo que bloquean entradas adversariales o acciones de agentes fuera de los límites

## 📁 infrastructure-and-compute/ (4 habilidades - Escala y Costo)
📄 `aws-bedrock-allocator.md`       # Scripts de Terraform que aprovisionan modelos de fundación seguros y escalables y bases de conocimiento a través de AWS Bedrock
📄 `local-compute-fallback.md`      # Lógica de enrutamiento para descargar tareas de inferencia pesadas y no sensibles al tiempo en una Mac mini dedicada para ahorrar costos en la nube
📄 `context-window-manager.md`      # Resume y trunca recuperaciones masivas de canalizaciones de RAG para evitar bloqueos de límite de tokens
📄 `model-agnostic-wrapper.md`      # Permite que la plataforma cambie sin problemas entre Claude 3, GPT-4 y modelos locales según la dificultad de la tarea

## 📁 monetization-and-billing/ (3 habilidades - Ingresos)
📄 `rapid-monetization-model.md`    # Estructuras de facturación de Stripe optimizadas para niveles de suscripción "pago por tarea" o "asiento de agente"
📄 `token-spend-tracker.md`         # Agrega costos de API por inquilino en tiempo real, aplicando límites estrictos para evitar facturas en la nube sin control
📄 `freemium-feature-flags.md`      # Asigna herramientas autónomas específicas y capacidades de memoria al nivel de facturación activo del usuario

## 📁 deployment-pipeline/ (3 habilidades - CI/CD)
📄 `agent-eval-framework.md`        # Scripts automatizados de LLM-como-juez que prueban los empleados virtuales contra un conjunto dorado de respuestas perfectas
📄 `prompt-drift-detector.md`       # Alerta al equipo si un mensaje del sistema recién implementado degrada la tasa de éxito de los agentes de codificación autónomos
📄 `github-final-sync.md`           # Flujos de trabajo de CI/CD para fusionar de manera limpia los comportamientos de agentes aprobados y las actualizaciones de plataforma directamente en repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `bedrock-agent-schema.json`      # Infraestructura como código que define los grupos de acciones y esquemas OpenAPI para agentes de AWS Bedrock
📦 `redis-memory-cache.yaml`        # Configuración para recuperación rápida de memoria a corto plazo en todo el clúster de agentes
