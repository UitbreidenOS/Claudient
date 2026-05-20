# Hook: Copia de seguridad de transcripción (PreCompact)

Guarda la transcripción de conversación completa en un archivo local antes de que Claude Code comprima la ventana de contexto. Nunca pierdas decisiones importantes, fragmentos de código o razonamiento de una sesión larga.

## Qué hace

- Se activa en el evento `PreCompact` (justo antes de la compresión de contexto)
- Guarda la conversación completa en `~/.claude/transcripts/YYYY-MM-DD-HH-MM.md`
- Crea un archivo buscable de todas tus sesiones de Claude Code
- Se ejecuta silenciosamente — nunca bloquea o retrasa la compresión

## Entrada en settings.json

```json
{
  "hooks": {
    "PreCompact": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/transcript-backup.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: transcript-backup.sh

```bash
#!/usr/bin/env bash
# PreCompact hook: save conversation transcript before context compression
set -euo pipefail

INPUT=$(cat)
TIMESTAMP=$(date '+%Y-%m-%d-%H-%M-%S')
CWD=$(echo "$INPUT" | jq -r '.cwd // "unknown"')
PROJECT=$(basename "$CWD")

TRANSCRIPT_DIR="$HOME/.claude/transcripts"
mkdir -p "$TRANSCRIPT_DIR"

OUTPUT_FILE="$TRANSCRIPT_DIR/${TIMESTAMP}-${PROJECT}.md"

# Write transcript header
cat > "$OUTPUT_FILE" << EOF
# Transcript: ${PROJECT}
Date: $(date '+%Y-%m-%d %H:%M:%S')
Working directory: ${CWD}

---

EOF

# Append conversation if available
CONVERSATION=$(echo "$INPUT" | jq -r '.conversation // empty' 2>/dev/null)
if [[ -n "$CONVERSATION" ]]; then
  echo "$CONVERSATION" >> "$OUTPUT_FILE"
else
  # Fallback: save the raw input for inspection
  echo "$INPUT" | jq '.' >> "$OUTPUT_FILE"
fi

echo "📄 Transcript saved: $OUTPUT_FILE" >&2
exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks ~/.claude/transcripts
cp transcript-backup.sh ~/.claude/hooks/transcript-backup.sh
chmod +x ~/.claude/hooks/transcript-backup.sh
```

## Búsqueda de transcripciones

```bash
# Encuentra todas las transcripciones de un proyecto
ls ~/.claude/transcripts/ | grep "my-project"

# Busca en todas las transcripciones una decisión específica
grep -r "decision\|chose\|architecture" ~/.claude/transcripts/

# Ver la transcripción más reciente
ls -t ~/.claude/transcripts/ | head -1 | xargs -I{} cat ~/.claude/transcripts/{}
```

## Espacio en disco

Cada transcripción es típicamente 20-200 KB de texto. A 10 sesiones/día, espera ~500 MB/año.
Añade un cron de limpieza para retener solo los últimos 90 días:
```bash
# Añade a crontab (crontab -e)
0 0 * * 0 find ~/.claude/transcripts -mtime +90 -delete
```
