# Hook: Comprobación Lint antes de escribir

Ejecuta el linter del proyecto en archivos antes de que Claude los escriba. Expone errores de lint inmediatamente para que Claude pueda repararlos en la misma operación en lugar de descubrirlos más tarde.

## Entrada en settings.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/lint-check.sh"
          }
        ]
      }
    ]
  }
}
```

Nota: Esto se ejecuta DESPUÉS de usar la herramienta (después de escribir) para capturar problemas que Claude introdujo.

## Script del hook: lint-check.sh

```bash
#!/usr/bin/env bash
# Post-tool-use hook: run linter on edited files
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check Edit and Write operations
if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" ]]; then
  exit 0
fi

# Skip non-source files
if [[ "$FILE_PATH" == *".md" || "$FILE_PATH" == *".json" || "$FILE_PATH" == *".yaml" || "$FILE_PATH" == *".yml" ]]; then
  exit 0
fi

# Skip if no file path
if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Detect linter based on file type and project config
EXT="${FILE_PATH##*.}"

if [[ "$EXT" == "ts" || "$EXT" == "tsx" || "$EXT" == "js" || "$EXT" == "jsx" ]]; then
  if command -v npx &>/dev/null && [[ -f ".eslintrc*" || -f "eslint.config*" ]]; then
    echo "🔍 Linting $FILE_PATH..." >&2
    if ! npx eslint "$FILE_PATH" --max-warnings=0 2>&1; then
      echo "⚠️  Lint errors found in $FILE_PATH — Claude Code will see these" >&2
      exit 1
    fi
    echo "✅ Lint passed" >&2
  fi
elif [[ "$EXT" == "py" ]]; then
  if command -v ruff &>/dev/null; then
    echo "🔍 Linting $FILE_PATH..." >&2
    if ! ruff check "$FILE_PATH" 2>&1; then
      echo "⚠️  Lint errors found" >&2
      exit 1
    fi
    echo "✅ Lint passed" >&2
  fi
fi

exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp lint-check.sh ~/.claude/hooks/lint-check.sh
chmod +x ~/.claude/hooks/lint-check.sh
```

## Comportamiento

- Después de que Claude edita un archivo TypeScript/JavaScript → ejecuta ESLint
- Después de que Claude edita un archivo Python → ejecuta Ruff
- Los errores de lint se devuelven a Claude Code → Claude los ve y puede repararlos
- Salta archivos markdown, JSON, YAML (no se necesita lint)
- Salta si no se detecta configuración de linter en el proyecto

## Deshabilitar temporalmente

```bash
# Establece en tu shell antes de iniciar Claude Code
CLAUDE_SKIP_LINT=1 claude "reparación rápida"
```

Añade al script del hook:
```bash
if [[ "${CLAUDE_SKIP_LINT:-false}" == "1" ]]; then exit 0; fi
```
