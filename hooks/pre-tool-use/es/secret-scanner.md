# Hook: Escáner de secretos

Escanea operaciones de escritura de archivos en busca de secretos codificados (claves API, contraseñas, tokens) antes de que Claude los escriba en disco. Bloquea la escritura y alerta si se detectan secretos.

## Entrada en settings.json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/secret-scanner.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: secret-scanner.sh

```bash
#!/usr/bin/env bash
# Pre-tool-use hook: scan file writes for hardcoded secrets
# Reads the tool input from stdin as JSON

set -euo pipefail

# Read tool input
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // empty')

# Only check Write and Edit tools
if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

# Skip if no content to check
if [[ -z "$CONTENT" ]]; then
  exit 0
fi

# Patterns that indicate hardcoded secrets
PATTERNS=(
  'sk-[a-zA-Z0-9]{20,}'           # OpenAI key
  'sk-ant-[a-zA-Z0-9\-]{20,}'     # Anthropic key  
  'ghp_[a-zA-Z0-9]{36}'           # GitHub PAT
  'npm_[a-zA-Z0-9]{36}'           # npm token
  'AKIA[A-Z0-9]{16}'              # AWS access key
  'xoxb-[0-9\-a-zA-Z]{50,}'       # Slack bot token
  'stripe\.com.*sk_live_'         # Stripe live key
  'password\s*=\s*["\x27][^\x27"]{8,}' # password = "..."
  'api_key\s*=\s*["\x27][a-zA-Z0-9]{20,}' # api_key = "..."
  'secret\s*=\s*["\x27][a-zA-Z0-9]{16,}' # secret = "..."
)

FOUND=false
for PATTERN in "${PATTERNS[@]}"; do
  if echo "$CONTENT" | grep -qP "$PATTERN" 2>/dev/null || \
     echo "$CONTENT" | grep -qE "$PATTERN" 2>/dev/null; then
    FOUND=true
    echo "⚠️  POTENTIAL SECRET DETECTED in $FILE_PATH" >&2
    echo "   Pattern matched: $PATTERN" >&2
    echo "   If this is intentional (e.g., .env.example with placeholder values), confirm to proceed." >&2
  fi
done

if [[ "$FOUND" == "true" ]]; then
  # Exit with non-zero to block and prompt user for confirmation
  # Claude Code will show the error and ask the user whether to proceed
  exit 1
fi

exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp secret-scanner.sh ~/.claude/hooks/secret-scanner.sh
chmod +x ~/.claude/hooks/secret-scanner.sh
```

## Qué detecta

- Claves API de OpenAI (`sk-...`)
- Claves API de Anthropic (`sk-ant-...`)
- Tokens de acceso personal de GitHub (`ghp_...`)
- Tokens de npm (`npm_...`)
- Claves de acceso de AWS (`AKIA...`)
- Tokens de bot de Slack (`xoxb-...`)
- Claves Stripe live
- Contraseñas, api_key y valores secret codificados en código

## Comportamiento

Cuando se detecta un secreto potencial:
1. La escritura se bloquea
2. Claude Code muestra la advertencia
3. Se solicita al usuario que confirme o cancele
4. Si el contenido es intencional (por ejemplo, una fixture de prueba con valores falsos), el usuario puede permitirlo

## Exclusiones

El hook no marca:
- Valores de marcador de posición de `.env.example` (por ejemplo, `YOUR_API_KEY_HERE`)
- Archivos en `tests/fixtures/` con datos falsos
- Valores que son claramente referencias (por ejemplo, `process.env.API_KEY`)

Para incluir en la lista blanca un patrón específico, añade una exclusión `grep -v` al script.
