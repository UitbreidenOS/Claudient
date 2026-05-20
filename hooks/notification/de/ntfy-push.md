# Hook: ntfy Mobile Push-Benachrichtigungen

Senden Sie sofortige Push-Benachrichtigungen an Ihr Telefon, wenn Claude Code eine Berechtigung benötigt oder untätig ist. Verpassen Sie keine Anfrage bei langen Hintergrund-Sessions.

## Was es tut

- Sendet Push-Benachrichtigungen an Ihr Telefon über [ntfy.sh](https://ntfy.sh) (kostenlos, Open Source)
- Wird beim `Notification`-Event ausgelöst — wenn Claude Ihre Berechtigung benötigt oder wartet
- Funktioniert auf iOS, Android und Desktop über die ntfy-App oder den Browser
- Kein Konto erforderlich — wählen Sie einfach einen eindeutigen Thema-Namen

## settings.json-Eintrag

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/ntfy-push.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook-Skript: ntfy-push.sh

```bash
#!/usr/bin/env bash
# Notification hook: send mobile push via ntfy.sh when Claude needs attention
set -euo pipefail

INPUT=$(cat)
TITLE=$(echo "$INPUT" | jq -r '.title // "Claude Code"')
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Claude needs your attention"')

# Your ntfy topic — change this to something unique (e.g. your-name-claude-123)
NTFY_TOPIC="${NTFY_TOPIC:-your-claude-topic}"

# Send push notification
curl -s \
  -H "Title: $TITLE" \
  -H "Priority: high" \
  -H "Tags: robot" \
  -d "$MESSAGE" \
  "https://ntfy.sh/$NTFY_TOPIC" \
  > /dev/null

exit 0
```

## Einrichtung (5 Minuten)

```bash
# 1. Installieren Sie die ntfy-App auf Ihrem Telefon
#    iOS: https://apps.apple.com/app/ntfy/id1625396347
#    Android: https://play.google.com/store/apps/details?id=io.heckel.ntfy

# 2. Abonnieren Sie Ihr Thema in der App
#    Öffnen Sie ntfy → Abonnement hinzufügen → geben Sie "your-claude-topic" ein

# 3. Installieren Sie den Hook
mkdir -p ~/.claude/hooks
cat > ~/.claude/hooks/ntfy-push.sh << 'EOF'
[fügen Sie das obige Skript ein]
EOF
chmod +x ~/.claude/hooks/ntfy-push.sh

# 4. Setzen Sie Ihr Thema (hinzufügen zu ~/.zshrc oder ~/.bashrc)
export NTFY_TOPIC="your-name-claude-$(whoami)"
```

## Selbstgehostetes ntfy (optional, für Datenschutz)

```bash
# Führen Sie Ihren eigenen ntfy-Server mit Docker aus
docker run -p 80:80 -v /var/cache/ntfy:/var/cache/ntfy binwiederhier/ntfy serve

# Aktualisieren Sie die URL im Skript:
# "https://your-server.com/$NTFY_TOPIC"
```

## Tipps

- Wählen Sie einen eindeutigen Thema-Namen — jeder, der Ihr Thema kennt, kann Ihnen Nachrichten senden
- Verwenden Sie `ntfy.sh` für persönliche Nutzung; hosten Sie selbst für Team- oder vertrauliche Sessions
- Fügen Sie `"Tags: rotating_light"` für dringende Warnungen hinzu, `"Tags: white_check_mark"` für Abschlüsse
- Kombinieren Sie mit dem `daily-summary`-Hook für ein komplettes Session-Awareness-System
