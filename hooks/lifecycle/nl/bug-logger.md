# Hook: Bug-logger (Stop)

Voegt een gedateerde vermelding toe aan `bugs.md` in uw projectroot telkens wanneer Claude Code een fout of uitzondering tegenkomt tijdens een sessie. Bouwt een doorzoekbare geschiedenis van bugs, hoofdoorzaken en fixes.

## Wat het doet

- Wordt geactiveerd bij het `Stop`-event
- Leest fehlersignalen uit sessieinvoer
- Voegt een gestructureerde vermelding toe aan `bugs.md` in de projectmap
- Maakt het bestand aan als het niet bestaat

## settings.json-invoer

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

## Hookscript: bug-logger.sh

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

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp bug-logger.sh ~/.claude/hooks/bug-logger.sh
chmod +x ~/.claude/hooks/bug-logger.sh
```

## Bug-status bijwerken

Wanneer een bug is opgelost, update `bugs.md` handmatig:
```markdown
**Status:** ✅ Fixed in commit abc1234 — root cause: missing null check
```

## Bug-logboek doorzoeken

```bash
# Alle onopgeloste bugs zoeken
grep -A3 "🔴 Unfixed" bugs.md

# Een specifieke fout zoeken
grep -n "TypeError\|undefined" bugs.md
```
