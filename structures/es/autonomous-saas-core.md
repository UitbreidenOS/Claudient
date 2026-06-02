# 📂 Autonomous SaaS Core
> El espacio de trabajo canónico para un motor de enrutamiento SaaS multi-agente de producción en AWS Bedrock.

📄 `router-brief.md`      # Brief canónico: Arquitectura del sistema y reglas de aislamiento de inquilinos
🧠 `memory.md`            # Memoria de sesión: Contexto dinámico para la sesión de enrutamiento activa
🤖 `CLAUDE.md`            # Reglas de operación: Instrucciones estrictas para el agente de enrutamiento

## 📁 core-routing/ (7 skills - Lógica del Supervisor)
📄 `tenant-isolation.md`  # Límites de datos • supresión estricta entre inquilinos
📄 `task-analyzer.md`     # Extracción de intención • mapeo de capacidades requeridas
📄 `worker-handoff.md`    # Estructuración de carga útil • activadores de eventos asincronizados
📄 `state-manager.md`     # Puntos de control • estados de pausa con intervención humana
📄 `fallback-handler.md`  # Protocolos de tiempo de espera de API • degradación elegante
📄 `context-pruner.md`    # Gestión de tokens • compresión semántica
📄 `bedrock-selector.md`  # Enrutamiento dinámico de modelos basado en complejidad de tareas

## 📁 worker-nodes/ (4 agent personas - Los "Empleados")
📄 `coder-agent.md`       # Ejecución autónoma del repositorio • políticas de ejecución nocturna
📄 `qa-agent.md`          # Generación de pruebas • validación de matriz
📄 `data-analyst.md`      # Generación de SQL • exploración de esquemas
📄 `ops-agent.md`         # Verificaciones de infraestructura • análisis de registros

## 📁 memory-sync/ (3 skills - Estado Persistente)
📄 `redis-caching.md`     # Recuperación de sesión a corto plazo
📄 `vector-commit.md`     # Mapeo de almacenamiento pgvector a largo plazo
📄 `memory-cleanup.md`    # Cumplimiento GDPR • limpieza de PII antes del almacenamiento

## 📁 infrastructure/ (4 skills - AWS Bedrock e Implementación)
📄 `bedrock-auth.md`      # Asunción de rol IAM • acceso entre cuentas
📄 `api-gateway.md`       # Limitación de velocidad • seguimiento de cuota de API de inquilinos
📄 `docker-sandbox.md`    # Entornos de ejecución aislados para trabajadores de código
📄 `deployment-sync.md`   # Entrega de CI/CD • reglas de staging vs producción

## 📁 evals/ (3 skills - Benchmarks Nocturnos)
📄 `routing-accuracy.md`  # ¿Eligió el supervisor al trabajador correcto?
📄 `cost-analyzer.md`     # Gasto de tokens por inquilino • umbrales de alerta
📄 `hallucination-check.md` # Fundamento de salida • consistencia factual

---
**Archivos de Configuración**
⚙️ `config.yaml`          # Variables de entorno globales y puntos finales de modelos
📦 `pyproject.toml`       # Dependencias de Python (LangGraph, Boto3, etc.)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
