# Hook: Auto-aprobación de operaciones de solo lectura

Aprueba automáticamente llamadas de herramientas de solo lectura (Read, Glob, Grep, LS) sin solicitar permiso. Elimina el ruido constante de permisos cuando Claude Code explora tu base de código.

## Qué hace

- Intercepta eventos `PreToolUse` para herramientas de solo lectura
- Las aprueba automáticamente sin solicitar al usuario
- Sigue solicitando aprobación para todas las operaciones de escritura, eliminación y shell
- Configurable — amplía la lista de aprobación para las operaciones seguras de tu equipo

## Entrada en settings.json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Glob|Grep|LS|TodoRead",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/auto-allow-readonly.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: auto-allow-readonly.sh

```bash
#!/usr/bin/env bash
# PreToolUse hook: auto-approve safe read-only operations
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Tools that are always safe to auto-allow
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch"

if echo "$TOOL_NAME" | grep -qE "^($READONLY_TOOLS)$"; then
  # Return approval signal — Claude proceeds without prompting
  echo '{"decision":"approve","reason":"Read-only operation auto-approved"}'
  exit 0
fi

# All other tools: let Claude Code handle normally (prompt user)
exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp auto-allow-readonly.sh ~/.claude/hooks/auto-allow-readonly.sh
chmod +x ~/.claude/hooks/auto-allow-readonly.sh
```

## Personalizar lista de aprobación

Añade herramientas en las que confíes al patrón `READONLY_TOOLS`:
```bash
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch|GitStatus"
```

## Nota de seguridad

Este hook reduce fricciones en la exploración de bases de código. NO aprueba automáticamente:
- `Write`, `Edit`, `MultiEdit` — modificaciones de archivos
- `Bash` — ejecución de shell
- `Delete` — eliminación de archivos
- Ninguna herramienta que no esté en la lista de aprobación explícita

Nunca añadas `Bash` a la lista de aprobación sin un filtro a nivel de comando.
