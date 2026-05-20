# Hook: Auto-Genehmigung Schreibgeschützter Operationen

Genehmigt automatisch schreibgeschützte Tool-Aufrufe (Read, Glob, Grep, LS) ohne Benutzer-Aufforderung. Eliminiert das konstante Rauschen bei Genehmigungen, wenn Claude Code Ihre Codebasis durchsucht.

## Was es tut

- Fängt `PreToolUse`-Events für schreibgeschützte Tools ab
- Genehmigt sie automatisch ohne Benutzer-Aufforderung
- Fordert weiterhin Genehmigung für alle Schreib-, Lösch- und Shell-Operationen an
- Konfigurierbar — erweitern Sie die Genehmigungsliste für die sicheren Operationen Ihres Teams

## settings.json-Eintrag

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Glob|Grep|LS|TodoRead",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/auto-allow-readonly.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook-Skript: auto-allow-readonly.sh

```bash
#!/usr/bin/env bash
# PreToolUse hook: auto-approve safe read-only operations
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Tools that are always safe to auto-allow
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch"

if echo "$TOOL_NAME" | grep -qE "^($READONLY_TOOLS)$"; then
  # Return approval signal — Claude proceeds without prompting
  echo '{"decision":"approve","reason":"Read-only operation auto-approved"}'
  exit 0
fi

# All other tools: let Claude Code handle normally (prompt user)
exit 0
```

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp auto-allow-readonly.sh ~/.claude/hooks/auto-allow-readonly.sh
chmod +x ~/.claude/hooks/auto-allow-readonly.sh
```

## Genehmigungsliste anpassen

Fügen Sie Tools, denen Sie vertrauen, zum Muster `READONLY_TOOLS` hinzu:
```bash
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch|GitStatus"
```

## Sicherheitshinweis

Dieser Hook reduziert Reibungen bei der Codebasis-Durchsuchung. Er genehmigt NICHT automatisch:
- `Write`, `Edit`, `MultiEdit` — Dateiänderungen
- `Bash` — Shell-Ausführung
- `Delete` — Dateilöschung
- Alle Tools nicht in der expliziten Genehmigungsliste

Fügen Sie `Bash` niemals zur Genehmigungsliste hinzu, ohne einen Filter auf Befehlsebene zu verwenden.
