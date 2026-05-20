# Hook: Lint-Überprüfung vor dem Schreiben

Führt den Projekt-Linter auf Dateien aus, bevor Claude sie schreibt. Zeigt Lint-Fehler sofort an, damit Claude sie in derselben Operation beheben kann, anstatt sie später zu entdecken.

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
            "command": "bash ~/.claude/hooks/lint-check.sh"
          }
        ]
      }
    ]
  }
}
```

Hinweis: Dies wird NACH der Tool-Verwendung ausgeführt (nach dem Schreiben), um Probleme zu erfassen, die Claude eingeführt hat.

## Hook-Skript: lint-check.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp lint-check.sh ~/.claude/hooks/lint-check.sh
chmod +x ~/.claude/hooks/lint-check.sh
```

## Verhalten

- Nachdem Claude eine TypeScript/JavaScript-Datei bearbeitet → führt ESLint aus
- Nachdem Claude eine Python-Datei bearbeitet → führt Ruff aus
- Lint-Fehler werden an Claude Code zurückgegeben → Claude sieht sie und kann sie beheben
- Ignoriert Markdown-, JSON-, YAML-Dateien (kein Linting erforderlich)
- Ignoriert, wenn keine Linter-Konfiguration im Projekt erkannt wird

## Vorübergehend deaktivieren

```bash
# Setzen Sie in Ihrer Shell, bevor Sie Claude Code starten
CLAUDE_SKIP_LINT=1 claude "schnelle Reparatur"
```

Zum Hook-Skript hinzufügen:
```bash
if [[ "${CLAUDE_SKIP_LINT:-false}" == "1" ]]; then exit 0; fi
```
