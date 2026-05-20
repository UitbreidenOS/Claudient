# Hook: TTS-Sprach-Ansager

Claude spricht die abschließende Nachricht laut aus, wenn eine Session endet. Sie müssen das Terminal nicht mehr beobachten — hören Sie einfach auf das Audio-Signal.

## Was es tut

- Wird beim `Stop`-Event ausgelöst (wenn Claude eine Aufgabe abschließt)
- Liest Claudes letzte Nachricht laut vor, indem sie das System-Text-zu-Sprache nutzt
- Fallback-Unterstützung: macOS `say` → Linux `espeak` → Python `pyttsx3`
- Datenschutz-orientiert: standardmäßig für den Nachrichtentext deaktiviert, kündet Completion immer an

## settings.json-Eintrag

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

## Hook-Skript: tts-announcer.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp tts-announcer.sh ~/.claude/hooks/tts-announcer.sh
chmod +x ~/.claude/hooks/tts-announcer.sh

# macOS — keine zusätzliche Installation erforderlich (nutzt das integrierte `say`)

# Linux — espeak installieren
sudo apt install espeak    # Ubuntu/Debian
sudo dnf install espeak    # Fedora

# Python-Fallback (jede Plattform)
pip install pyttsx3
```

## Konfiguration

```bash
# Spreche die eigentliche letzte Nachricht (nicht nur Status) — zu ~/.zshrc hinzufügen
export CLAUDE_TTS_FULL=true

# Vorübergehend für eine Session deaktivieren
CLAUDE_TTS_FULL=false claude "..."
```

## Kombiniert mit ntfy

Verwenden Sie TTS für nahe Warnungen und ntfy für Telefon-Warnungen, wenn Sie weg sind — sie sind kompatibel.
