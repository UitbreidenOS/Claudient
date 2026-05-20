# Hook : Notification Slack

Publie un message dans un canal Slack lorsque Claude Code a besoin de votre entrée. Idéal pour les environnements d'équipe ou lorsque vous travaillez sur plusieurs écrans avec Slack ouvert.

## Ce qu'il fait

- S'active sur l'événement `Notification`
- Publie sur un canal Slack ou un DM via webhook
- Inclut le message et un horodatage
- L'échec est silencieux si Slack est inaccessible (ne cassera pas votre flux de travail)

## Entrée settings.json

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/slack-notify.sh"
          }
        ]
      }
    ]
  }
}
```

## Script de hook : slack-notify.sh

```bash
#!/usr/bin/env bash
# Notification hook: post to Slack when Claude needs attention
set -euo pipefail

INPUT=$(cat)
TITLE=$(echo "$INPUT" | jq -r '.title // "Claude Code"')
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Waiting for your input"')
TIMESTAMP=$(date '+%H:%M:%S')

# Set SLACK_WEBHOOK_URL in your environment
WEBHOOK="${SLACK_WEBHOOK_URL:-}"
if [[ -z "$WEBHOOK" ]]; then
  exit 0  # Not configured — skip silently
fi

PAYLOAD=$(jq -n \
  --arg title "$TITLE" \
  --arg msg "$MESSAGE" \
  --arg ts "$TIMESTAMP" \
  '{
    "text": "*\($title)* — \($msg)",
    "attachments": [{
      "color": "#f97316",
      "footer": "Claude Code · \($ts)"
    }]
  }')

curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "$WEBHOOK" \
  > /dev/null

exit 0
```

## Configuration

```bash
# 1. Créez un webhook Slack
#    Slack → Applications → Webhooks entrants → Ajouter à Slack → Copiez l'URL du webhook

# 2. Installez le hook
mkdir -p ~/.claude/hooks
cp slack-notify.sh ~/.claude/hooks/slack-notify.sh
chmod +x ~/.claude/hooks/slack-notify.sh

# 3. Ajoutez l'URL du webhook à votre configuration de shell
echo 'export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"' >> ~/.zshrc
```
