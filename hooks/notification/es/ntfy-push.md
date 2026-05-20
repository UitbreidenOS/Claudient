# Hook: Notificaciones Push Móvil ntfy

Envía notificaciones push instantáneas a tu teléfono cuando Claude Code necesita permiso o está inactivo. Nunca te pierdas una solicitud durante sesiones largas en segundo plano.

## Qué hace

- Envía notificaciones push a tu teléfono a través de [ntfy.sh](https://ntfy.sh) (gratuito, código abierto)
- Se activa en el evento `Notification` — cuando Claude necesita tu permiso o está esperando
- Funciona en iOS, Android y escritorio a través de la aplicación ntfy o el navegador
- Sin cuenta requerida — simplemente elige un nombre de tema único

## Entrada en settings.json

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

## Script del hook: ntfy-push.sh

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

## Configuración (5 minutos)

```bash
# 1. Instala la aplicación ntfy en tu teléfono
#    iOS: https://apps.apple.com/app/ntfy/id1625396347
#    Android: https://play.google.com/store/apps/details?id=io.heckel.ntfy

# 2. Suscríbete a tu tema en la aplicación
#    Abre ntfy → Añadir suscripción → introduce "your-claude-topic"

# 3. Instala el hook
mkdir -p ~/.claude/hooks
cat > ~/.claude/hooks/ntfy-push.sh << 'EOF'
[pega el script anterior]
EOF
chmod +x ~/.claude/hooks/ntfy-push.sh

# 4. Establece tu tema (añade a ~/.zshrc o ~/.bashrc)
export NTFY_TOPIC="your-name-claude-$(whoami)"
```

## ntfy auto-hospedado (opcional, para privacidad)

```bash
# Ejecuta tu propio servidor ntfy con Docker
docker run -p 80:80 -v /var/cache/ntfy:/var/cache/ntfy binwiederhier/ntfy serve

# Actualiza la URL en el script:
# "https://your-server.com/$NTFY_TOPIC"
```

## Consejos

- Elige un nombre de tema único — cualquiera que conozca tu tema puede enviarte mensajes
- Usa `ntfy.sh` para uso personal; auto-hospeda para sesiones de equipo o sensibles
- Añade `"Tags: rotating_light"` para alertas urgentes, `"Tags: white_check_mark"` para finalizaciones
- Combina con el hook `daily-summary` para un sistema completo de conciencia de sesiones
