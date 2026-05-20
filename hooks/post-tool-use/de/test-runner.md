# Hook: Auto Test-Läufer

Führt automatisch die relevante Testdatei aus, nachdem Claude eine Quelldatei bearbeitet. Zeigt Fehler sofort an, ohne dass ein manueller Test-Lauf erforderlich ist.

## settings.json-Eintrag

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

## Hook-Skript: test-runner.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp test-runner.sh ~/.claude/hooks/test-runner.sh
chmod +x ~/.claude/hooks/test-runner.sh
```

## Verhalten

- Nachdem Claude `src/users.ts` bearbeitet → führt automatisch `users.test.ts` aus
- Nachdem Claude eine Python-Datei bearbeitet → führt zugehörige pytest-Tests aus
- Wenn Tests fehlschlagen, sieht Claude Code das Fehlergebnis und kann das Problem beheben
- Ignoriert Testdateien selbst (keine Endlosschleife)
- Ignoriert Config- und JSON-Dateien

## Anpassung

Setzen Sie `AUTO_TEST=false` in Ihrer Umgebung, um vorübergehend zu deaktivieren:
```bash
AUTO_TEST=false claude "Benutzermodul umgestalten"
```

Fügen Sie zum Skip-List im Skript für Dateien hinzu, die Sie nicht automatisch testen möchten:
```bash
if [[ "$FILE_PATH" == *"migrations"* ]]; then exit 0; fi
```
