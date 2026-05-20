# Hook: Slack-melding

Plaatst een bericht in een Slack-kanaal wanneer Claude Code uw invoer nodig heeft. Ideaal voor teamomgevingen of wanneer u over meerdere schermen werkt met Slack open.

## Wat het doet

- Wordt geactiveerd bij het `Notification`-event
- Postet naar een Slack-kanaal of DM via webhook
- Bevat het bericht en een timestamp
- Stille fout als Slack onbereikbaar is (breekt uw workflow niet)

## settings.json-invoer

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

## Hookscript: slack-notify.sh

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

## Installatie

```bash
# 1. Maak een Slack-webhook
#    Slack → Apps → Inkomende webhooks → Toevoegen aan Slack → Webhook-URL kopiëren

# 2. Installeer de hook
mkdir -p ~/.claude/hooks
cp slack-notify.sh ~/.claude/hooks/slack-notify.sh
chmod +x ~/.claude/hooks/slack-notify.sh

# 3. Voeg de webhook-URL toe aan uw shell-configuratie
echo 'export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"' >> ~/.zshrc
```
