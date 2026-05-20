# Hook: Bug-Protokoll (Stop)

Fügt einen datierten Eintrag zu `bugs.md` in Ihrem Projektstammverzeichnis hinzu, wenn Claude Code während einer Session auf einen Fehler oder eine Ausnahme trifft. Erstellt ein durchsuchbares Protokoll von Bugs, Grundursachen und Fixes.

## Was es tut

- Wird beim `Stop`-Event ausgelöst
- Liest Fehlersignale aus der Sitzungseingabe
- Fügt einen strukturierten Eintrag zu `bugs.md` im Projektverzeichnis hinzu
- Erstellt die Datei, falls sie nicht existiert

## settings.json-Eintrag

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/bug-logger.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook-Skript: bug-logger.sh

```bash
#!/usr/bin/env bash
# Stop hook: append session errors to bugs.md
set -euo pipefail

INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
STOP_REASON=$(echo "$INPUT" | jq -r '.stop_reason // "normal"')

BUGS_FILE="$CWD/bugs.md"

# Initialise bugs.md if it doesn't exist
if [[ ! -f "$BUGS_FILE" ]]; then
  cat > "$BUGS_FILE" << 'EOF'
# Bug Log

Running log of bugs encountered during development sessions.
Format: Date | Error | Root cause | Status

---

EOF
fi

# Extract any errors from the session (adapt based on what's available in your input)
ERROR_COUNT=$(echo "$INPUT" | jq -r '.error_count // 0')
LAST_ERROR=$(echo "$INPUT" | jq -r '.last_error // ""')

# Only log if there were errors
if [[ "$ERROR_COUNT" -gt 0 ]] || [[ -n "$LAST_ERROR" ]]; then
  cat >> "$BUGS_FILE" << EOF

## ${TIMESTAMP}
**Session errors:** ${ERROR_COUNT}
**Last error:** ${LAST_ERROR:-"(see session transcript)"}
**Status:** 🔴 Unfixed — needs investigation
**Files affected:** $(git -C "$CWD" diff --name-only HEAD 2>/dev/null | head -5 | tr '\n' ', ' || echo "unknown")

EOF
  echo "🐛 Bug entry added to $BUGS_FILE" >&2
fi

exit 0
```

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp bug-logger.sh ~/.claude/hooks/bug-logger.sh
chmod +x ~/.claude/hooks/bug-logger.sh
```

## Bug-Status aktualisieren

Wenn ein Bug behoben ist, aktualisieren Sie `bugs.md` manuell:
```markdown
**Status:** ✅ Fixed in commit abc1234 — root cause: missing null check
```

## Bug-Protokoll durchsuchen

```bash
# Alle unbehobenen Bugs finden
grep -A3 "🔴 Unfixed" bugs.md

# Ein bestimmten Fehler suchen
grep -n "TypeError\|undefined" bugs.md
```
