# 📂 Núcleo SaaS Multi-Agente
> La jerarquía multi-inquilino canónica para alojar instancias de agentes de IA aisladas y concurrentes como empleados empresariales escalables.

📄 `saas-architecture-brief.md` # Descripción canónica: mapas de inquilinos multi-inquilino, reglas de enrutamiento y límites entre cuentas
🧠 `tenant-state-memory.md`    # Memoria de sesión: seguimiento dinámico de contexto para el grupo de trabajadores de inquilino activo
🤖 `CLAUDE.md`                 # Reglas operativas: instrucciones estrictas para mantener los límites de seguridad de inquilinos

## 📁 tenant-router/ (6 skills - Control de Puerta y Contexto)
📄 `tenant-authenticator.md`   # Decodifica tokens JWT • mapea solicitudes entrantes a IDs de inquilino aislados
📄 `quota-guardrail.md`        # Seguimiento de tokens en tiempo real • comprobaciones de límite de velocidad de API por nivel
📄 `dynamic-context-loader.md` # Inyecta reglas de negocio específicas del inquilino dinámicamente en el aviso del agente
📄 `isolation-verifier.md`     # Capa de seguridad • asegura que no haya contaminación cruzada de rutas de memoria de agentes múltiples
📄 `billing-hook-router.md`    # Eventos de uso de Stripe • pausa procesos de trabajadores si expira la suscripción
📄 `model-tier-allocator.md`   # Enruta nivel gratuito a Claude 3.5 Haiku y nivel empresarial a Claude 3.5 Sonnet

## 📁 agent-marketplace/ (Arquetipos de Empleados Principales)
📄 `hr-onboarding-agent.md`   # Flujos de trabajo automatizados para la configuración de empleados de inquilinos
📄 `finance-auditor-agent.md`  # Verificación de transacciones y verificación de contabilidad
📄 `support-dispatcher.md`     # Clasificación de incidencias de atención al cliente y enrutamiento de resolución

## 📁 shared-state-engine/ (4 skills - Coordinación de Agentes Múltiples)
📄 `state-store-sync.md`       # Cerradura de estado distribuida respaldada por Redis para prevenir condiciones de carrera
📄 `message-bus.md`            # Capa de Pub/Sub que permite a los agentes pasarse mensajes estructurados entre sí
📄 `human-approval-gate.md`    # Mecánica de interrupción • detiene el flujo de trabajo del agente en espera de confirmación del panel de inquilino
📄 `event-history-logger.md`   # Pista de auditoría inmutable de decisiones de agentes representadas en la interfaz de usuario del inquilino

## 📁 enterprise-connectors/ (3 skills - Integración de Datos)
📄 `stripe-webhook.md`         # Escucha actualizaciones directas de suscripción, degradaciones y cancelaciones
📄 `database-pool-manager.md`  # Seguridad a nivel de fila (RLS) mapeo de PostgreSQL para aislamiento multi-inquilino
📄 `external-crm-bridge.md`    # Gestión dinámica de conexiones para instancias de Salesforce/HubSpot propiedad del inquilino

## 📁 telemetry-evals/ (3 skills - Métricas de Uso Nocturno)
📄 `tenant-cost-analyzer.md]   # Agrega costos precisos de tokens LLM diarios por espacio de trabajo de inquilino individual
📄 `efficiency-tracker.md`     # Supervisa recuentos de pasos y latencias de ejecución en cohortes de agentes activos
📄 `security-compliance.md]    # Escaneo automatizado para fugas de PII en límites de trabajadores de inquilino

---
**Archivos de Configuración**
⚙️ `pnpm-workspace.yaml`       # Gestor de arquitectura monorepo (panel de Next.js + núcleo de agente FastAPI)
⚙️ `prisma.schema`              # Esquema de base de datos que refuerza relaciones estrictas de TenantId
📦 `poetry.lock`                # Archivo de bloqueo de dependencias de Python rápido y determinista

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
