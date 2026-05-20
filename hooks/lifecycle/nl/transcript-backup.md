# Hook: Transkriptback-up (PreCompact)

Slaat het volledige gespreksuitwerp op in een lokaal bestand voordat Claude Code het contextvenster comprimeert. Verlies nooit belangrijke besluiten, code-fragmenten of redenering uit een lange sessie.

## Wat het doet

- Wordt geactiveerd bij het `PreCompact`-event (net voor context-compressie)
- Slaat het volledige gesprek op in `~/.claude/transcripts/YYYY-MM-DD-HH-MM.md`
- Maakt een doorzoekbaar archief van al uw Claude Code-sessies
- Draait stiekem — blokkeert of vertraagt de compressie nooit

## settings.json-invoer

```json
{
  "hooks": {
    "PreCompact": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/transcript-backup.sh"
          }
        ]
      }
    ]
  }
}
```

## Hookscript: transcript-backup.sh

```bash
#!/usr/bin/env bash
# PreCompact hook: save conversation transcript before context compression
set -euo pipefail

INPUT=$(cat)
TIMESTAMP=$(date '+%Y-%m-%d-%H-%M-%S')
CWD=$(echo "$INPUT" | jq -r '.cwd // "unknown"')
PROJECT=$(basename "$CWD")

TRANSCRIPT_DIR="$HOME/.claude/transcripts"
mkdir -p "$TRANSCRIPT_DIR"

OUTPUT_FILE="$TRANSCRIPT_DIR/${TIMESTAMP}-${PROJECT}.md"

# Write transcript header
cat > "$OUTPUT_FILE" << EOF
# Transcript: ${PROJECT}
Date: $(date '+%Y-%m-%d %H:%M:%S')
Working directory: ${CWD}

---

EOF

# Append conversation if available
CONVERSATION=$(echo "$INPUT" | jq -r '.conversation // empty' 2>/dev/null)
if [[ -n "$CONVERSATION" ]]; then
  echo "$CONVERSATION" >> "$OUTPUT_FILE"
else
  # Fallback: save the raw input for inspection
  echo "$INPUT" | jq '.' >> "$OUTPUT_FILE"
fi

echo "📄 Transcript saved: $OUTPUT_FILE" >&2
exit 0
```

## Installatie

```bash
mkdir -p ~/.claude/hooks ~/.claude/transcripts
cp transcript-backup.sh ~/.claude/hooks/transcript-backup.sh
chmod +x ~/.claude/hooks/transcript-backup.sh
```

## Transcripten doorzoeken

```bash
# Alle transcripten voor een project zoeken
ls ~/.claude/transcripts/ | grep "my-project"

# Alle transcripten voor een specifiek besluit doorzoeken
grep -r "decision\|chose\|architecture" ~/.claude/transcripts/

# Het meest recente transcript weergeven
ls -t ~/.claude/transcripts/ | head -1 | xargs -I{} cat ~/.claude/transcripts/{}
```

## Schijfruimte

Elk transcript is meestal 20-200 KB tekst. Bij 10 sessies/dag, verwacht ~500 MB/jaar.
Voeg een cleanup-cron toe om alleen de laatste 90 dagen te houden:
```bash
# Toevoegen aan crontab (crontab -e)
0 0 * * 0 find ~/.claude/transcripts -mtime +90 -delete
```
