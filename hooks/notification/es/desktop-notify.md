# Hook: Notificación de Escritorio

Muestra una notificación nativa del SO cuando Claude Code espera tu entrada. Funciona en macOS, Linux (libnotify) y Windows (PowerShell).

## Qué hace

- Se activa en el evento `Notification` (cuando Claude necesita permiso o ha estado inactivo más de 60 segundos)
- Muestra una notificación nativa del sistema con el mensaje
- Sin servicios de terceros — utiliza solo las herramientas integradas del SO

## Entrada en settings.json

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/desktop-notify.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: desktop-notify.sh

```bash
#!/usr/bin/env bash
# Notification hook: native OS desktop notification
set -euo pipefail

INPUT=$(cat)
TITLE=$(echo "$INPUT" | jq -r '.title // "Claude Code"')
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Waiting for your input"')

if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"Ping\""

elif command -v notify-send &>/dev/null; then
  # Linux (requires libnotify-bin)
  notify-send "$TITLE" "$MESSAGE" --icon=dialog-information --urgency=normal

elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "cygwin"* ]]; then
  # Windows (Git Bash or WSL)
  powershell.exe -Command "
    Add-Type -AssemblyName System.Windows.Forms
    \$notify = New-Object System.Windows.Forms.NotifyIcon
    \$notify.Icon = [System.Drawing.SystemIcons]::Information
    \$notify.BalloonTipTitle = '$TITLE'
    \$notify.BalloonTipText = '$MESSAGE'
    \$notify.Visible = \$true
    \$notify.ShowBalloonTip(5000)
  " 2>/dev/null
fi

exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp desktop-notify.sh ~/.claude/hooks/desktop-notify.sh
chmod +x ~/.claude/hooks/desktop-notify.sh

# macOS — no requiere instalación

# Linux
sudo apt install libnotify-bin    # Ubuntu/Debian
sudo dnf install libnotify        # Fedora
```

## Combinar hooks

Apila con ntfy-push para alertas de escritorio y móvil:
```json
{
  "hooks": {
    "Notification": [
      { "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/desktop-notify.sh" }] },
      { "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/ntfy-push.sh" }] }
    ]
  }
}
```
