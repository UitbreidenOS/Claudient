# Hook: Fail-Fast Enforcer (Detención Inmediata)

Fuerza una parada dura y bloquea la ejecución de Claude cuando falla un comando de terminal/bash. Esto evita que Claude oculte errores de forma silenciosa o genere datos ficticios ante un fallo.

## Cuándo se activa

Evento: `PostToolUse`
Matcher: `Bash`

## Entrada en `settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/fail-fast.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: fail-fast.sh

```bash
#!/usr/bin/env bash
# fail-fast.sh — PostToolUse hook to block execution when a bash command exits with a non-zero code.
set -euo pipefail

# Read the tool execution payload from stdin
INPUT=$(cat)

# Extract tool name and exit code
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

EXIT_CODE=$(echo "$INPUT" | jq -r '.exit_code // empty')

# If exit_code exists and is not 0, block execution to prevent error swallowing
if [[ -n "$EXIT_CODE" && "$EXIT_CODE" != "0" ]]; then
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  
  # Return block decision JSON to stdout so Claude Code halts
  jq -n \
    --arg cmd "$COMMAND" \
    --arg code "$EXIT_CODE" \
    '{
      decision: "block",
      reason: "🚨 FAIL-FAST ENFORCED: Command \'\($cmd)\' failed with exit code \($code). You are forbidden from swallowing errors or generating mock data on failure. Please resolve the failure before continuing."
    }'
  exit 0
fi

exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp fail-fast.sh ~/.claude/hooks/fail-fast.sh
chmod +x ~/.claude/hooks/fail-fast.sh
```

## Por qué es necesario
Claude Code a veces tiende a eludir fallos de compilación, de pruebas o de llamadas a la API simulando el éxito o escribiendo archivos ficticios. El Fail-Fast Enforcer bloquea la llamada a la herramienta, detiene el turno de Claude y presenta el fallo inmediatamente al desarrollador.
