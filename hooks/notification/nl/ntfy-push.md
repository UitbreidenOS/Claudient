# Hook: ntfy Mobile Push-meldingen

Stuur directe push-meldingen naar uw telefoon wanneer Claude Code toestemming nodig heeft of inactief is. Mis nooit een prompt bij lange achtergrondsessies.

## Wat het doet

- Stuurt push-meldingen naar uw telefoon via [ntfy.sh](https://ntfy.sh) (gratis, open source)
- Wordt geactiveerd bij het `Notification`-event — wanneer Claude uw toestemming nodig heeft of wacht
- Werkt op iOS, Android en desktop via de ntfy-app of browser
- Geen account vereist — kies gewoon een unieke onderwerpnaam

## settings.json-invoer

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

## Hookscript: ntfy-push.sh

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

## Installatie (5 minuten)

```bash
# 1. Installeer de ntfy-app op uw telefoon
#    iOS: https://apps.apple.com/app/ntfy/id1625396347
#    Android: https://play.google.com/store/apps/details?id=io.heckel.ntfy

# 2. Abonneer op uw onderwerp in de app
#    Open ntfy → Abonnement toevoegen → voer "your-claude-topic" in

# 3. Installeer de hook
mkdir -p ~/.claude/hooks
cat > ~/.claude/hooks/ntfy-push.sh << 'EOF'
[plak het bovenstaande script]
EOF
chmod +x ~/.claude/hooks/ntfy-push.sh

# 4. Stel uw onderwerp in (voeg toe aan ~/.zshrc of ~/.bashrc)
export NTFY_TOPIC="your-name-claude-$(whoami)"
```

## Zelf-gehoste ntfy (optioneel, voor privacy)

```bash
# Voer uw eigen ntfy-server uit met Docker
docker run -p 80:80 -v /var/cache/ntfy:/var/cache/ntfy binwiederhier/ntfy serve

# Werk de URL in het script bij:
# "https://your-server.com/$NTFY_TOPIC"
```

## Tips

- Kies een unieke onderwerpnaam — iedereen die uw onderwerp kent kan u berichten sturen
- Gebruik `ntfy.sh` voor persoonlijk gebruik; zelf-host voor team- of gevoelige sessies
- Voeg `"Tags: rotating_light"` toe voor urgente waarschuwingen, `"Tags: white_check_mark"` voor voltooiingen
- Combineer met de `daily-summary`-hook voor een volledig session-awareness-systeem
