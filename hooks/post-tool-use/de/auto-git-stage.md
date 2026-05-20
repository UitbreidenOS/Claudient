# Hook: Auto Git-Staging

Führt automatisch `git add` auf Dateien aus, nachdem Claude Code sie bearbeitet. Halten Sie Ihren Staging-Bereich aktuell, ohne dass manuelle `git add`-Befehle zwischen Änderungen erforderlich sind.

## Was es tut

- Wird auf `PostToolUse` nach `Write` oder `Edit` Operationen ausgelöst
- Stuft die geänderte Datei automatisch mit `git add` ein
- Ignoriert nicht-git-Verzeichnisse elegant
- Inszeniert nur bereits nachverfolgte oder neue Dateien — inszeniert niemals `.env` oder gitignorierte Dateien

## settings.json-Eintrag

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

## Hook-Skript: auto-git-stage.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp auto-git-stage.sh ~/.claude/hooks/auto-git-stage.sh
chmod +x ~/.claude/hooks/auto-git-stage.sh
```

## Workflow mit Auto-Staging

Mit diesem Hook aktiv, wird Ihr typischer Workflow zu:
```
1. Fragen Sie Claude, eine Funktion zu implementieren
2. Claude bearbeitet mehrere Dateien → alle werden automatisch inszeniert
3. Überprüfen Sie den Diff: git diff --staged
4. Committen Sie: git commit -m "feat: ..."
```

Keine `git add`-Schritte nötig zwischen Claudes Bearbeitungen.

## Vorübergehend deaktivieren

```bash
CLAUDE_SKIP_AUTOSTAGE=1 claude "schnelle Bearbeitung"
```

Zum Skript hinzufügen: `[[ "${CLAUDE_SKIP_AUTOSTAGE:-false}" == "1" ]] && exit 0`
