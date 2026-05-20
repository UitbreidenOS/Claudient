# Hook : Résumé des sessions quotidiennes

Écrit automatiquement un résumé de ce que Claude a réalisé dans la session dans un fichier journal local lorsque la session se termine. Utile pour suivre le travail assisté par IA sans journalisation manuelle.

## Entrée settings.json

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/daily-summary.sh"
          }
        ]
      }
    ]
  }
}
```

## Script de hook : daily-summary.sh

```bash
#!/usr/bin/env bash
# Lifecycle hook: append session summary to daily log on session end
set -euo pipefail

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
STOP_REASON=$(echo "$INPUT" | jq -r '.stop_reason // "normal"')
TOTAL_COST=$(echo "$INPUT" | jq -r '.total_cost_usd // 0')
WORKING_DIR=$(echo "$INPUT" | jq -r '.cwd // "unknown"')

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)
LOG_FILE="$HOME/.claude/sessions/${DATE}.md"

mkdir -p "$(dirname "$LOG_FILE")"

# Write session entry
cat >> "$LOG_FILE" << EOF

## Session — ${TIME}
- **Directory:** ${WORKING_DIR}
- **Session ID:** ${SESSION_ID}
- **End reason:** ${STOP_REASON}
- **Cost:** \$${TOTAL_COST}

EOF

echo "📝 Session logged to $LOG_FILE" >&2
```

## Configuration

```bash
mkdir -p ~/.claude/hooks ~/.claude/sessions
cp daily-summary.sh ~/.claude/hooks/daily-summary.sh
chmod +x ~/.claude/hooks/daily-summary.sh
```

## Sortie

Crée `~/.claude/sessions/2026-05-20.md` avec des entrées comme :

```markdown
## Session — 14:32:10
- **Directory:** /Users/tushar/Desktop/my-project
- **Session ID:** abc123
- **End reason:** normal
- **Cost:** $0.42
```

## Version étendue (avec résumé des différences git)

```bash
# Ajouter au hook après l'entrée de base :
BRANCH=$(git -C "$WORKING_DIR" branch --show-current 2>/dev/null || echo "none")
CHANGED=$(git -C "$WORKING_DIR" diff --stat HEAD 2>/dev/null | tail -1 || echo "no changes")

cat >> "$LOG_FILE" << EOF
- **Branch:** ${BRANCH}
- **Changes:** ${CHANGED}
EOF
```
