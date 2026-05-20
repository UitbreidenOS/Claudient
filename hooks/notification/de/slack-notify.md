# Hook: Slack-Benachrichtigung

Postet eine Nachricht in einem Slack-Kanal, wenn Claude Code Ihre Eingabe benötigt. Ideal für Team-Umgebungen oder wenn Sie über mehrere Bildschirme mit offenen Slack arbeiten.

## Was es tut

- Wird beim `Notification`-Event ausgelöst
- Postet an einen Slack-Kanal oder DM über Webhook
- Enthält die Nachricht und einen Zeitstempel
- Laut fehlgeschlagenes Versagen, wenn Slack unerreichbar ist (bricht Ihren Workflow nicht)

## settings.json-Eintrag

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

## Hook-Skript: slack-notify.sh

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

## Einrichtung

```bash
# 1. Erstellen Sie einen Slack-Webhook
#    Slack → Apps → Incoming Webhooks → Zu Slack hinzufügen → Webhook-URL kopieren

# 2. Installieren Sie den Hook
mkdir -p ~/.claude/hooks
cp slack-notify.sh ~/.claude/hooks/slack-notify.sh
chmod +x ~/.claude/hooks/slack-notify.sh

# 3. Fügen Sie die Webhook-URL zu Ihrer Shell-Konfiguration hinzu
echo 'export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"' >> ~/.zshrc
```
