# Hook : Mise en scène Git automatique

Exécute automatiquement `git add` sur les fichiers après que Claude Code les édite. Garde votre zone de staging à jour sans besoin de `git add` manuel entre les éditions.

## Ce qu'il fait

- S'active sur `PostToolUse` après les opérations `Write` ou `Edit`
- Évalue automatiquement le fichier modifié avec `git add`
- Ignore gracieusement les répertoires non-git
- Ne met en stage que les fichiers déjà suivis ou nouveaux — ne met jamais en stage `.env` ou les fichiers gitignorés

## Entrée settings.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/auto-git-stage.sh"
          }
        ]
      }
    ]
  }
}
```

## Script de hook : auto-git-stage.sh

```bash
#!/usr/bin/env bash
# PostToolUse hook: auto-stage files after Claude edits them
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Skip if not in a git repo
if ! git -C "$(dirname "$FILE_PATH")" rev-parse --git-dir &>/dev/null; then
  exit 0
fi

# Skip gitignored files (won't stage .env, node_modules, etc.)
if git -C "$(dirname "$FILE_PATH")" check-ignore -q "$FILE_PATH" 2>/dev/null; then
  exit 0
fi

git add "$FILE_PATH"
echo "✅ Staged: $FILE_PATH" >&2

exit 0
```

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp auto-git-stage.sh ~/.claude/hooks/auto-git-stage.sh
chmod +x ~/.claude/hooks/auto-git-stage.sh
```

## Flux de travail avec mise en scène automatique

Avec ce hook actif, votre flux de travail typique devient :
```
1. Demandez à Claude d'implémenter une fonctionnalité
2. Claude édite plusieurs fichiers → tous automatiquement mis en scène
3. Examinez le diff : git diff --staged
4. Validez : git commit -m "feat: ..."
```

Aucune étape `git add` nécessaire entre les éditions de Claude.

## Désactiver temporairement

```bash
CLAUDE_SKIP_AUTOSTAGE=1 claude "édition rapide"
```

Ajoutez au script : `[[ "${CLAUDE_SKIP_AUTOSTAGE:-false}" == "1" ]] && exit 0`
