# Hook: Desktop-Benachrichtigung

Zeigt eine native OS-Benachrichtigung an, wenn Claude Code auf Ihre Eingabe wartet. Funktioniert auf macOS, Linux (libnotify) und Windows (PowerShell).

## Was es tut

- Wird beim `Notification`-Event ausgelöst (wenn Claude eine Berechtigung benötigt oder über 60+ Sekunden untätig ist)
- Zeigt eine native System-Benachrichtigung mit der Nachricht an
- Keine Drittanbieter-Services — nutzt nur OS-integrierte Tools

## settings.json-Eintrag

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

## Hook-Skript: desktop-notify.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp desktop-notify.sh ~/.claude/hooks/desktop-notify.sh
chmod +x ~/.claude/hooks/desktop-notify.sh

# macOS — keine Installation erforderlich

# Linux
sudo apt install libnotify-bin    # Ubuntu/Debian
sudo dnf install libnotify        # Fedora
```

## Hooks kombinieren

Stapeln Sie mit ntfy-push für Desktop- und Mobil-Warnungen:
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
