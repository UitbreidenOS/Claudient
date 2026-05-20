# Hook : Notifications Push Mobile ntfy

Envoyez des notifications instantanées sur votre téléphone lorsque Claude Code a besoin de permission ou est inactif. Ne manquez jamais une invite lors de sessions longues en arrière-plan.

## Ce qu'il fait

- Envoie une notification push sur votre téléphone via [ntfy.sh](https://ntfy.sh) (gratuit, open source)
- S'active sur l'événement `Notification` — lorsque Claude a besoin de votre permission ou attend
- Fonctionne sur iOS, Android et desktop via l'application ntfy ou le navigateur
- Aucun compte requis — il suffit de choisir un nom de sujet

## Entrée settings.json

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

## Script de hook : ntfy-push.sh

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

## Configuration (5 minutes)

```bash
# 1. Installez l'application ntfy sur votre téléphone
#    iOS : https://apps.apple.com/app/ntfy/id1625396347
#    Android : https://play.google.com/store/apps/details?id=io.heckel.ntfy

# 2. Abonnez-vous à votre sujet dans l'application
#    Ouvrez ntfy → Ajouter un abonnement → entrez "your-claude-topic"

# 3. Installez le hook
mkdir -p ~/.claude/hooks
cat > ~/.claude/hooks/ntfy-push.sh << 'EOF'
[collez le script ci-dessus]
EOF
chmod +x ~/.claude/hooks/ntfy-push.sh

# 4. Définissez votre sujet (ajoutez à ~/.zshrc ou ~/.bashrc)
export NTFY_TOPIC="your-name-claude-$(whoami)"
```

## ntfy auto-hébergé (optionnel, pour la confidentialité)

```bash
# Exécutez votre propre serveur ntfy avec Docker
docker run -p 80:80 -v /var/cache/ntfy:/var/cache/ntfy binwiederhier/ntfy serve

# Mettez à jour l'URL dans le script :
# "https://your-server.com/$NTFY_TOPIC"
```

## Conseils

- Définissez un nom de sujet unique — quiconque connaît votre sujet peut vous envoyer des messages
- Utilisez `ntfy.sh` pour un usage personnel ; auto-hébergez pour les sessions d'équipe ou sensibles
- Ajoutez `"Tags: rotating_light"` pour les alertes urgentes, `"Tags: white_check_mark"` pour les complétions
- Associez au hook `daily-summary` pour un système complet de sensibilisation aux sessions
