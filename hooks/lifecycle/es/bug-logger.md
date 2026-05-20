# Hook: Registrador de bugs (Stop)

Añade una entrada fechada a `bugs.md` en la raíz de tu proyecto cada vez que Claude Code encuentra un error o excepción durante una sesión. Construye un historial buscable de bugs, causas raíz y soluciones.

## Qué hace

- Se activa en el evento `Stop`
- Lee las señales de error de la entrada de sesión
- Añade una entrada estructurada a `bugs.md` en el directorio del proyecto
- Crea el archivo si no existe

## Entrada en settings.json

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/bug-logger.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: bug-logger.sh

```bash
#!/usr/bin/env bash
# Stop hook: append session errors to bugs.md
set -euo pipefail

INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
STOP_REASON=$(echo "$INPUT" | jq -r '.stop_reason // "normal"')

BUGS_FILE="$CWD/bugs.md"

# Initialise bugs.md if it doesn't exist
if [[ ! -f "$BUGS_FILE" ]]; then
  cat > "$BUGS_FILE" << 'EOF'
# Bug Log

Running log of bugs encountered during development sessions.
Format: Date | Error | Root cause | Status

---

EOF
fi

# Extract any errors from the session (adapt based on what's available in your input)
ERROR_COUNT=$(echo "$INPUT" | jq -r '.error_count // 0')
LAST_ERROR=$(echo "$INPUT" | jq -r '.last_error // ""')

# Only log if there were errors
if [[ "$ERROR_COUNT" -gt 0 ]] || [[ -n "$LAST_ERROR" ]]; then
  cat >> "$BUGS_FILE" << EOF

## ${TIMESTAMP}
**Session errors:** ${ERROR_COUNT}
**Last error:** ${LAST_ERROR:-"(see session transcript)"}
**Status:** 🔴 Unfixed — needs investigation
**Files affected:** $(git -C "$CWD" diff --name-only HEAD 2>/dev/null | head -5 | tr '\n' ', ' || echo "unknown")

EOF
  echo "🐛 Bug entry added to $BUGS_FILE" >&2
fi

exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp bug-logger.sh ~/.claude/hooks/bug-logger.sh
chmod +x ~/.claude/hooks/bug-logger.sh
```

## Actualizar estado del bug

Cuando se soluciona un bug, actualiza `bugs.md` manualmente:
```markdown
**Status:** ✅ Fixed in commit abc1234 — root cause: missing null check
```

## Buscar en el registro de bugs

```bash
# Encuentra todos los bugs no solucionados
grep -A3 "🔴 Unfixed" bugs.md

# Busca un error específico
grep -n "TypeError\|undefined" bugs.md
```
