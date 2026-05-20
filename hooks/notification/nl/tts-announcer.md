# Hook: TTS Stem-aankondiging

Claude spreekt het uiteindelijke bericht hardop uit wanneer een sessie eindigt. U hoeft het terminalvenster niet meer in de gaten te houden — luister gewoon naar het audio-signaal.

## Wat het doet

- Wordt geactiveerd bij het `Stop`-event (wanneer Claude een taak absluit)
- Leest Claudes laatste bericht hardop voor met behulp van system-tekst-naar-spraak
- Fallback-ondersteuning: macOS `say` → Linux `espeak` → Python `pyttsx3`
- Privacy-gericht: standaard uitgeschakeld voor berichttekst, kondigt altijd completion aan

## settings.json-invoer

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/tts-announcer.sh"
          }
        ]
      }
    ]
  }
}
```

## Hookscript: tts-announcer.sh

```bash
#!/usr/bin/env bash
# Stop hook: speak Claude's completion status aloud
set -euo pipefail

INPUT=$(cat)
STOP_REASON=$(echo "$INPUT" | jq -r '.stop_reason // "completed"')

# Build the announcement
case "$STOP_REASON" in
  "end_turn")    MSG="Claude has finished." ;;
  "tool_use")    MSG="Claude is waiting for your input." ;;
  "max_tokens")  MSG="Claude reached the token limit." ;;
  *)             MSG="Claude session ended." ;;
esac

# Optionally read the last message (set CLAUDE_TTS_FULL=true to enable)
if [[ "${CLAUDE_TTS_FULL:-false}" == "true" ]]; then
  LAST_MSG=$(echo "$INPUT" | jq -r '.last_message // ""' | head -c 200)
  [[ -n "$LAST_MSG" ]] && MSG="$LAST_MSG"
fi

# Speak using best available TTS
if command -v say &>/dev/null; then
  say "$MSG"                          # macOS
elif command -v espeak &>/dev/null; then
  espeak "$MSG" 2>/dev/null           # Linux
elif python3 -c "import pyttsx3" 2>/dev/null; then
  python3 -c "import pyttsx3; e=pyttsx3.init(); e.say('$MSG'); e.runAndWait()"
fi

exit 0
```

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp tts-announcer.sh ~/.claude/hooks/tts-announcer.sh
chmod +x ~/.claude/hooks/tts-announcer.sh

# macOS — geen extra installatie nodig (gebruikt ingebouwde `say`)

# Linux — installeer espeak
sudo apt install espeak    # Ubuntu/Debian
sudo dnf install espeak    # Fedora

# Python-fallback (elk platform)
pip install pyttsx3
```

## Configuratie

```bash
# Spreek het werkelijke laatste bericht uit (niet alleen status) — voeg toe aan ~/.zshrc
export CLAUDE_TTS_FULL=true

# Schakel tijdelijk uit voor een sessie
CLAUDE_TTS_FULL=false claude "..."
```

## Gecombineerd met ntfy

Gebruik TTS voor meldingen in de buurt en ntfy voor telefonwaarschuwingen wanneer u weg bent — ze conflicteren niet.
