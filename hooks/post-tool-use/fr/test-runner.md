# Hook : Exécuteur de tests automatique

Exécute automatiquement le fichier de test pertinent après que Claude édite un fichier source. Surface les défaillances immédiatement sans nécessiter une exécution de test manuelle.

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
            "command": "bash ~/.claude/hooks/test-runner.sh"
          }
        ]
      }
    ]
  }
}
```

## Script de hook : test-runner.sh

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

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp test-runner.sh ~/.claude/hooks/test-runner.sh
chmod +x ~/.claude/hooks/test-runner.sh
```

## Comportement

- Après que Claude édite `src/users.ts` → exécute automatiquement `users.test.ts`
- Après que Claude édite un fichier Python → exécute les tests pytest associés
- Si les tests échouent, Claude Code voit l'échec et peut corriger le problème
- Ignore les fichiers de test eux-mêmes (pas de boucle infinie)
- Ignore les fichiers config et JSON

## Personnalisation

Définissez `AUTO_TEST=false` dans votre environnement pour désactiver temporairement :
```bash
AUTO_TEST=false claude "refactoriser le module utilisateurs"
```

Ajoutez à la liste de saut dans le script pour les fichiers que vous ne voulez pas tester automatiquement :
```bash
if [[ "$FILE_PATH" == *"migrations"* ]]; then exit 0; fi
```
