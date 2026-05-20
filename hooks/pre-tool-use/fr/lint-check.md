# Hook : Vérification Lint avant écriture

Exécute le linter du projet sur les fichiers avant que Claude les écrive. Surface les erreurs de lint immédiatement pour que Claude puisse les corriger lors de la même opération plutôt que de les découvrir plus tard.

## Entrée settings.json

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

Note : Cela s'exécute APRÈS l'utilisation de l'outil (après l'écriture) pour capturer les problèmes que Claude a introduits.

## Script de hook : lint-check.sh

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

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp lint-check.sh ~/.claude/hooks/lint-check.sh
chmod +x ~/.claude/hooks/lint-check.sh
```

## Comportement

- Après que Claude édite un fichier TypeScript/JavaScript → exécute ESLint
- Après que Claude édite un fichier Python → exécute Ruff
- Les erreurs de lint sont renvoyées à Claude Code → Claude les voit et peut les corriger
- Ignore les fichiers markdown, JSON, YAML (pas besoin de lint)
- Ignore si aucune configuration de linter n'est détectée dans le projet

## Désactiver temporairement

```bash
# Définissez dans votre shell avant de démarrer Claude Code
CLAUDE_SKIP_LINT=1 claude "correction rapide"
```

Ajoutez au script du hook :
```bash
if [[ "${CLAUDE_SKIP_LINT:-false}" == "1" ]]; then exit 0; fi
```
