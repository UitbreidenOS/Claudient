# Hook: Ejecutor automático de pruebas

Ejecuta automáticamente el archivo de prueba relevante después de que Claude edita un archivo fuente. Expone fallos inmediatamente sin requerir una ejecución de prueba manual.

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
            "command": "bash ~/.claude/hooks/test-runner.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: test-runner.sh

```bash
#!/usr/bin/env bash
# Post-tool-use hook: run tests for the edited file
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only fire on file edits
if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" ]]; then
  exit 0
fi

# Skip test files themselves (avoid infinite loop)
if [[ "$FILE_PATH" == *".test."* || "$FILE_PATH" == *".spec."* ]]; then
  exit 0
fi

# Skip config files
if [[ "$FILE_PATH" == *"config"* || "$FILE_PATH" == *".json" ]]; then
  exit 0
fi

# Detect test runner
if [[ -f "package.json" ]]; then
  if grep -q '"vitest"' package.json; then
    TEST_CMD="npx vitest run --reporter=verbose"
    # Try to find a related test file
    BASE=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
    TEST_FILE=$(find . -name "${BASE}.test.*" -o -name "${BASE}.spec.*" 2>/dev/null | head -1)
    if [[ -n "$TEST_FILE" ]]; then
      TEST_CMD="npx vitest run $TEST_FILE --reporter=verbose"
    fi
  elif grep -q '"jest"' package.json; then
    BASE=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
    TEST_CMD="npx jest --testPathPattern=${BASE} --verbose"
  else
    exit 0
  fi
elif [[ -f "pyproject.toml" ]] || [[ -f "requirements.txt" ]]; then
  BASE=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
  TEST_CMD="python -m pytest -v -k ${BASE} 2>/dev/null || python -m pytest -v"
else
  exit 0
fi

echo "🧪 Running tests for $FILE_PATH..." >&2
if $TEST_CMD 2>&1; then
  echo "✅ Tests passed" >&2
else
  echo "❌ Tests failed — Claude Code will see these results" >&2
  exit 1
fi
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp test-runner.sh ~/.claude/hooks/test-runner.sh
chmod +x ~/.claude/hooks/test-runner.sh
```

## Comportamiento

- Después de que Claude edita `src/users.ts` → ejecuta automáticamente `users.test.ts`
- Después de que Claude edita un archivo Python → ejecuta las pruebas pytest relacionadas
- Si las pruebas fallan, Claude Code ve el fallo y puede corregir el problema
- Ignora archivos de prueba en sí (sin bucle infinito)
- Ignora archivos config y JSON

## Personalización

Establece `AUTO_TEST=false` en tu entorno para deshabilitar temporalmente:
```bash
AUTO_TEST=false claude "refactorizar módulo de usuarios"
```

Añade a la lista de omisión en el script para archivos que no desees probar automáticamente:
```bash
if [[ "$FILE_PATH" == *"migrations"* ]]; then exit 0; fi
```
