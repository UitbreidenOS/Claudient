# Hook: Lint-controle voor schrijven

Voert de project-linter uit op bestanden voordat Claude ze schrijft. Oppervlakte lint-fouten onmiddellijk zodat Claude ze in dezelfde bewerking kan repareren in plaats van ze later te ontdekken.

## settings.json-invoer

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

Opmerking: Dit wordt AFTER tool-gebruik uitgevoerd (na het schrijven) om problemen op te vangen die Claude heeft veroorzaakt.

## Hookscript: lint-check.sh

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

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp lint-check.sh ~/.claude/hooks/lint-check.sh
chmod +x ~/.claude/hooks/lint-check.sh
```

## Gedrag

- Nadat Claude een TypeScript/JavaScript-bestand bewerkt → voert ESLint uit
- Nadat Claude een Python-bestand bewerkt → voert Ruff uit
- Lint-fouten worden teruggegeven aan Claude Code → Claude ziet ze en kan ze repareren
- Slaat markdown-, JSON-, YAML-bestanden over (geen linting nodig)
- Slaat over als geen linter-configuratie in het project wordt gedetecteerd

## Tijdelijk uitschakelen

```bash
# Stel in uw shell in voordat u Claude Code start
CLAUDE_SKIP_LINT=1 claude "snelle reparatie"
```

Toevoegen aan het hook-script:
```bash
if [[ "${CLAUDE_SKIP_LINT:-false}" == "1" ]]; then exit 0; fi
```
