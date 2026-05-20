# Hook: Notificación Slack

Publica un mensaje en un canal de Slack cuando Claude Code necesita tu entrada. Ideal para entornos de equipo o cuando trabajas en múltiples pantallas con Slack abierto.

## Qué hace

- Se activa en el evento `Notification`
- Publica en un canal de Slack o DM a través de webhook
- Incluye el mensaje y una marca de tiempo
- Fallos silenciosos si Slack es inaccesible (no rompe tu flujo de trabajo)

## Entrada en settings.json

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

## Script del hook: slack-notify.sh

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

## Configuración

```bash
# 1. Crea un webhook de Slack
#    Slack → Apps → Webhooks entrantes → Añadir a Slack → Copia la URL del webhook

# 2. Instala el hook
mkdir -p ~/.claude/hooks
cp slack-notify.sh ~/.claude/hooks/slack-notify.sh
chmod +x ~/.claude/hooks/slack-notify.sh

# 3. Añade la URL del webhook a tu configuración de shell
echo 'export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"' >> ~/.zshrc
```
