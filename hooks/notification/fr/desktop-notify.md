# Hook : Notification de Bureau

Affiche une notification système native lorsque Claude Code attend votre entrée. Fonctionne sur macOS, Linux (libnotify) et Windows (PowerShell).

## Ce qu'il fait

- S'active sur l'événement `Notification` (lorsque Claude a besoin de permission ou est inactif depuis 60+ secondes)
- Affiche une notification système native avec le message
- Aucun service tiers — utilise uniquement les outils du système d'exploitation

## Entrée settings.json

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

## Script de hook : desktop-notify.sh

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

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp desktop-notify.sh ~/.claude/hooks/desktop-notify.sh
chmod +x ~/.claude/hooks/desktop-notify.sh

# macOS — aucune installation requise

# Linux
sudo apt install libnotify-bin    # Ubuntu/Debian
sudo dnf install libnotify        # Fedora
```

## Combinaison des hooks

Empilez avec ntfy-push pour des alertes bureau + téléphone :
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
