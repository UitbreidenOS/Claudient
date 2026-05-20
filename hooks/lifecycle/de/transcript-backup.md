# Hook: Transkript-Sicherung (PreCompact)

Speichert das vollständige Konversations-Transkript in einer lokalen Datei, bevor Claude Code das Kontextfenster komprimiert. Verlieren Sie niemals wichtige Entscheidungen, Code-Snippets oder Überlegungen aus einer langen Session.

## Was es tut

- Wird beim `PreCompact`-Event ausgelöst (kurz vor der Kontext-Komprimierung)
- Speichert die vollständige Konversation in `~/.claude/transcripts/YYYY-MM-DD-HH-MM.md`
- Erstellt ein durchsuchbares Archiv aller Ihrer Claude Code-Sessions
- Läuft geräuschlos — blockiert oder verzögert die Komprimierung niemals

## settings.json-Eintrag

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

## Hook-Skript: transcript-backup.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks ~/.claude/transcripts
cp transcript-backup.sh ~/.claude/hooks/transcript-backup.sh
chmod +x ~/.claude/hooks/transcript-backup.sh
```

## Transkripte durchsuchen

```bash
# Alle Transkripte für ein Projekt finden
ls ~/.claude/transcripts/ | grep "my-project"

# Alle Transkripte nach einer bestimmten Entscheidung durchsuchen
grep -r "decision\|chose\|architecture" ~/.claude/transcripts/

# Das neueste Transkript anzeigen
ls -t ~/.claude/transcripts/ | head -1 | xargs -I{} cat ~/.claude/transcripts/{}
```

## Speicherplatz

Jedes Transkript ist typischerweise 20-200 KB Text. Bei 10 Sessions/Tag erwarten Sie ~500 MB/Jahr.
Fügen Sie einen Cleanup-Cron hinzu, um nur die letzten 90 Tage zu behalten:
```bash
# Zu crontab hinzufügen (crontab -e)
0 0 * * 0 find ~/.claude/transcripts -mtime +90 -delete
```
