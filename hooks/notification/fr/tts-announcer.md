# Hook : Annonceur vocal TTS

Claude prononce le message final à haute voix lorsqu'une session se termine. Ne regardez plus le terminal — écoutez simplement le signal audio.

## Ce qu'il fait

- S'active sur l'événement `Stop` (lorsque Claude termine une tâche)
- Prononce le dernier message de Claude à haute voix en utilisant la synthèse vocale système
- Bascule facilement : macOS `say` → Linux `espeak` → Python `pyttsx3`
- Respectueux de la vie privée : désactivé par défaut pour le texte du message, annonce toujours la fin

## Entrée settings.json

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

## Script de hook : tts-announcer.sh

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

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp tts-announcer.sh ~/.claude/hooks/tts-announcer.sh
chmod +x ~/.claude/hooks/tts-announcer.sh

# macOS — aucune installation supplémentaire requise (utilise `say` intégré)

# Linux — installez espeak
sudo apt install espeak    # Ubuntu/Debian
sudo dnf install espeak    # Fedora

# Alternative Python (toute plateforme)
pip install pyttsx3
```

## Configuration

```bash
# Prononcez le dernier message réel (pas seulement l'état) — ajoutez à ~/.zshrc
export CLAUDE_TTS_FULL=true

# Désactivez temporairement pour une session
CLAUDE_TTS_FULL=false claude "..."
```

## Combinaison avec ntfy

Utilisez TTS pour les alertes à proximité et ntfy pour les alertes téléphoniques lorsque vous vous éloignez — ils ne se heurtent pas.
