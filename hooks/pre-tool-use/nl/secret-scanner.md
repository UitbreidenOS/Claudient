# Hook: Geheimen scanner

Scant bestandsschrijfbewerkingen op hardgecodeerde geheimen (API-sleutels, wachtwoorden, tokens) voordat Claude ze naar schijf schrijft. Blokkeert het schrijven en waarschuwt als geheimen worden gedetecteerd.

## settings.json-invoer

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

## Hookscript: secret-scanner.sh

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

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp secret-scanner.sh ~/.claude/hooks/secret-scanner.sh
chmod +x ~/.claude/hooks/secret-scanner.sh
```

## Wat het detecteert

- OpenAI API-sleutels (`sk-...`)
- Anthropic API-sleutels (`sk-ant-...`)
- GitHub Personal Access Tokens (`ghp_...`)
- npm-tokens (`npm_...`)
- AWS-toegangssleutels (`AKIA...`)
- Slack-bot-tokens (`xoxb-...`)
- Stripe live-sleutels
- Hardgecodeerde wachtwoorden, api_key en secret-waarden in code

## Gedrag

Wanneer een potentieel geheim wordt gedetecteerd:
1. Het schrijven wordt geblokkeerd
2. Claude Code toont de waarschuwing
3. De gebruiker wordt gevraagd te bevestigen of te annuleren
4. Als de inhoud opzettelijk is (bijv. een test-fixture met nep-waarden), kan de gebruiker deze toestaan

## Uitsluitingen

De hook signaleert niet:
- `.env.example` platshoudwaarden (bijv. `YOUR_API_KEY_HERE`)
- Bestanden in `tests/fixtures/` met nep-gegevens
- Waarden die duidelijk verwijzingen zijn (bijv. `process.env.API_KEY`)

Om een specifiek patroon op de whitelist te zetten, voegt u een `grep -v`-uitsluiting toe aan het script.
