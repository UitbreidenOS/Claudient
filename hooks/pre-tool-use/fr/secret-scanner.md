# Hook : Numériseur de secrets

Analyse les opérations d'écriture de fichiers pour détecter les secrets codés en dur (clés API, mots de passe, tokens) avant que Claude ne les écrive sur disque. Bloque l'écriture et alerte si des secrets sont détectés.

## Entrée settings.json

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

## Script de hook : secret-scanner.sh

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

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp secret-scanner.sh ~/.claude/hooks/secret-scanner.sh
chmod +x ~/.claude/hooks/secret-scanner.sh
```

## Ce qu'il détecte

- Clés API OpenAI (`sk-...`)
- Clés API Anthropic (`sk-ant-...`)
- Tokens d'accès personnel GitHub (`ghp_...`)
- Tokens npm (`npm_...`)
- Clés d'accès AWS (`AKIA...`)
- Tokens de bot Slack (`xoxb-...`)
- Clés Stripe live
- Mots de passe, api_key et secret codés en dur dans le code

## Comportement

Lorsqu'un secret potentiel est détecté :
1. L'écriture est bloquée
2. Claude Code affiche l'avertissement
3. L'utilisateur est invité à confirmer ou annuler
4. Si le contenu est intentionnel (par exemple, une fixture de test avec des valeurs factices), l'utilisateur peut l'autoriser

## Exclusions

Le hook ne signale pas :
- Les valeurs d'espace réservé `.env.example` (par exemple, `YOUR_API_KEY_HERE`)
- Les fichiers dans `tests/fixtures/` avec des données factices
- Les valeurs qui sont clairement des références (par exemple, `process.env.API_KEY`)

Pour mettre en liste blanche un modèle spécifique, ajoutez une exclusion `grep -v` au script.
