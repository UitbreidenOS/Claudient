# Hook: Locutor de voz TTS

Claude pronuncia en voz alta el mensaje final cuando termina una sesión. No necesitas ver la terminal — simplemente escucha la señal de audio.

## Qué hace

- Se activa en el evento `Stop` (cuando Claude termina una tarea)
- Lee el último mensaje de Claude en voz alta usando síntesis de voz del sistema
- Fallback elegante: macOS `say` → Linux `espeak` → Python `pyttsx3`
- Respeto a la privacidad: desactivado por defecto para el texto del mensaje, siempre anuncia la finalización

## Entrada en settings.json

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

## Script del hook: tts-announcer.sh

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

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp tts-announcer.sh ~/.claude/hooks/tts-announcer.sh
chmod +x ~/.claude/hooks/tts-announcer.sh

# macOS — no se requiere instalación adicional (utiliza el `say` integrado)

# Linux — instala espeak
sudo apt install espeak    # Ubuntu/Debian
sudo dnf install espeak    # Fedora

# Fallback de Python (cualquier plataforma)
pip install pyttsx3
```

## Configuración

```bash
# Pronuncia el mensaje final real (no solo el estado) — añade a ~/.zshrc
export CLAUDE_TTS_FULL=true

# Desactiva temporalmente para una sesión
CLAUDE_TTS_FULL=false claude "..."
```

## Combinado con ntfy

Usa TTS para alertas cercanas y ntfy para alertas telefónicas cuando te alejas — no entran en conflicto.
