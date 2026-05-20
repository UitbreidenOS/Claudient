# Hook: Auto Git-staging

Voert automatisch `git add` uit op bestanden nadat Claude Code ze bewerkt. Houd uw staging-gebied actueel zonder handmatige `git add` tussen bewerkingen.

## Wat het doet

- Wordt geactiveerd op `PostToolUse` na `Write` of `Edit` bewerkingen
- Faseer automatisch het gewijzigde bestand in met `git add`
- Negeert niet-git-mappen elegant
- Stage alleen al bijgehouden of nieuwe bestanden — stage nooit `.env` of gitignoreerde bestanden

## settings.json-invoer

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

## Hookscript: auto-git-stage.sh

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

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp auto-git-stage.sh ~/.claude/hooks/auto-git-stage.sh
chmod +x ~/.claude/hooks/auto-git-stage.sh
```

## Workflow met auto-staging

Met deze hook actief wordt uw typische workflow:
```
1. Vraag Claude een functie te implementeren
2. Claude bewerkt meerdere bestanden → alle worden automatisch gefaseerd
3. Controleer de diff: git diff --staged
4. Commit: git commit -m "feat: ..."
```

Geen `git add`-stappen nodig tussen Claudes bewerkingen.

## Tijdelijk uitschakelen

```bash
CLAUDE_SKIP_AUTOSTAGE=1 claude "snelle bewerking"
```

Voeg toe aan het script: `[[ "${CLAUDE_SKIP_AUTOSTAGE:-false}" == "1" ]] && exit 0`
