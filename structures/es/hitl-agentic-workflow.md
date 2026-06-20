# 📂 Flujo de Trabajo Agentico HITL

> El espacio de trabajo canónico para un motor de orquestación con Bucle Humano (HITL), diseñado para pausar la ejecución autónoma en demanda de aprobación manual en acciones de alto riesgo.

📄 `workflow-brief.md`        # Resumen canónico: Define qué acciones específicas requieren aprobación humana (ej: pagos, correos salientes)
🧠 `memory.md`                # Memoria de sesión: Contexto dinámico del flujo de trabajo hasta el estado de pausa
🤖 `CLAUDE.md`                # Reglas de operación: Instrucciones estrictas sobre cómo formatear cargas para revisión humana

## 📁 workflow-orchestrator/ (4 skills - Motor de Ejecución)
📄 `task-router.md`           # Rutas de ejecución autónoma estándar
📄 `pause-handler.md`         # Lógica de puntos de control • suspende el estado del agente de forma segura sin perder datos
📄 `resume-trigger.md`        # Gancho de reactivación • despierta el agente una vez recibida la aprobación del webhook humano
📄 `timeout-abort.md`         # Degradación elegante si el humano no responde en 24 horas

## 📁 human-approval-gateway/ (3 skills - La Interfaz)
📄 `approval-queue.md`        # Gestiona la lista de tareas pendientes para el operador humano
📄 `payload-formatter.md`     # Resume la acción prevista del agente en un diff limpio y legible para el humano
📄 `override-protocols.md`    # Permite al humano editar la acción propuesta del agente antes de aprobar

## 📁 notification-engine/ (3 skills - Alertas)
📄 `slack-alerts.md`          # Notifica un canal dedicado #agent-approvals con un bloque de kit interactivo
📄 `websocket-broadcaster.md` # Envía alertas en tiempo real a un panel de control Next.js/React
📄 `escalation-router.md`     # Notifica operadores secundarios si el humano principal está desconectado

## 📁 state-resumption/ (3 skills - Sincronización de Memoria)
📄 `memory-rehydration.md`    # Recarga el contexto del agente perfectamente al reactivarse
📄 `redis-state-lock.md`      # Bloqueo distribuido que evita aprobaciones duplicadas en la misma tarea
📄 `context-pruner.md`        # Limpia tokens innecesarios antes de reiniciar la ejecución

## 📁 audit-logs/ (Registros Inmutables)
📄 `decision-ledger.log`      # Rastrea exactamente qué humano aprobó qué acción del agente y cuándo
📄 `rejection-analyzer.md`    # Recopila datos sobre *por qué* los humanos rechazan acciones para mejorar el agente después

---
**Archivos de Configuración**
⚙️ `temporal-config.yaml`     # Configuración para Temporal.io o motores de flujo de trabajo con estado similar
📦 `package.json`             # Oyentes de webhook y dependencias de Slack SDK
