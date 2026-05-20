# Hook : Sauvegarde des transcriptions (PreCompact)

Enregistre la transcription de conversation complète dans un fichier local avant que Claude Code compresse la fenêtre de contexte. Ne perdez jamais les décisions importantes, les extraits de code ou le raisonnement d'une longue session.

## Ce qu'il fait

- S'active sur l'événement `PreCompact` (juste avant la compression du contexte)
- Enregistre la conversation complète dans `~/.claude/transcripts/YYYY-MM-DD-HH-MM.md`
- Crée une archive consultable de toutes vos sessions Claude Code
- S'exécute silencieusement — ne bloque jamais ou ne retarde la compaction

## Entrée settings.json

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

## Script de hook : transcript-backup.sh

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

## Configuration

```bash
mkdir -p ~/.claude/hooks ~/.claude/transcripts
cp transcript-backup.sh ~/.claude/hooks/transcript-backup.sh
chmod +x ~/.claude/hooks/transcript-backup.sh
```

## Recherche de transcriptions

```bash
# Trouver toutes les transcriptions pour un projet
ls ~/.claude/transcripts/ | grep "my-project"

# Rechercher dans toutes les transcriptions une décision spécifique
grep -r "decision\|chose\|architecture" ~/.claude/transcripts/

# Afficher la transcription la plus récente
ls -t ~/.claude/transcripts/ | head -1 | xargs -I{} cat ~/.claude/transcripts/{}
```

## Espace disque

Chaque transcription fait généralement 20-200 KB de texte. À 10 sessions/jour, attendez-vous à ~500 Mo/an.
Ajoutez un nettoyage cron pour conserver uniquement les 90 derniers jours :
```bash
# Ajouter à crontab (crontab -e)
0 0 * * 0 find ~/.claude/transcripts -mtime +90 -delete
```
