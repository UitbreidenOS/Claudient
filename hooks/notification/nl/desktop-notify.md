# Hook: Desktopmelding

Geeft een native OS-melding weer wanneer Claude Code op uw invoer wacht. Werkt op macOS, Linux (libnotify) en Windows (PowerShell).

## Wat het doet

- Wordt geactiveerd bij het `Notification`-event (wanneer Claude toestemming nodig heeft of langer dan 60 seconden inactief is)
- Toont een native systeemmelding met het bericht
- Geen externe services — gebruikt alleen OS-ingebouwde tools

## settings.json-invoer

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

## Hookscript: desktop-notify.sh

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

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp desktop-notify.sh ~/.claude/hooks/desktop-notify.sh
chmod +x ~/.claude/hooks/desktop-notify.sh

# macOS — geen installatie nodig

# Linux
sudo apt install libnotify-bin    # Ubuntu/Debian
sudo dnf install libnotify        # Fedora
```

## Hooks combineren

Stapel met ntfy-push voor zowel desktop- als mobiele waarschuwingen:
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
