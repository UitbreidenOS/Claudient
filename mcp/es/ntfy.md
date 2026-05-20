# MCP: Notificaciones ntfy

Envía notificaciones push desde flujos de agentes de Claude Code. En lugar de simplemente notificar cuando Claude necesita entrada, activa notificaciones en hitos específicos de tu automatización.

## Por qué lo necesitas

El hook ntfy se activa cuando Claude está inactivo. Este servidor MCP permite a Claude desencadenar notificaciones programáticamente:
- "Notifícame cuando se complete la migración de la base de datos"
- "Envía una alerta de estilo Slack si fallan las pruebas"
- "Pincha mi teléfono cuando se complete la compilación"

## Configuración

```json
{
  "mcpServers": {
    "ntfy": {
      "command": "npx",
      "args": ["-y", "ntfy-mcp-server"],
      "env": {
        "NTFY_TOPIC": "your-claude-topic",
        "NTFY_SERVER": "https://ntfy.sh"
      }
    }
  }
}
```

## Cómo usar

```
# Notificación de hito
"Run the database migration, then notify me on ntfy when it completes"

# Alertas de error
"Run all tests. If any fail, send a high-priority ntfy alert with the test name"

# Progreso de tareas largas
"Process these 500 files and send me an ntfy update every 100 files"
```

## En flujos de agentes

```python
# Claude puede llamar a ntfy como herramienta dentro de un flujo de agente
# Ejemplo: Claude notifica autónomamente al completarse

await run_migration()
await ntfy.send(
    topic="your-claude-topic",
    message="Migration complete: 847 rows updated",
    priority="high",
    tags=["white_check_mark"]
)
```

## Prioridades de notificación

| Prioridad | Caso de uso |
|---|---|
| `min` | Información de fondo |
| `low` | Actualizaciones no urgentes |
| `default` | Actualizaciones de progreso normales |
| `high` | Tarea completa, necesita revisión |
| `urgent` | Error, requiere atención inmediata |

## Combina con el hook ntfy-push

- **Hook ntfy-push** — Claude te notifica cuando está esperando permiso
- **MCP ntfy** — Claude te notifica cuando se completa un paso de tarea

Juntos: conciencia completa de flujos de trabajo agentivos de larga duración.

## ntfy auto-hospedado

```json
{
  "env": {
    "NTFY_SERVER": "https://your-server.com",
    "NTFY_TOPIC": "private-topic",
    "NTFY_TOKEN": "your-access-token"
  }
}
```
