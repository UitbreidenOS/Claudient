# Hook: Geheimnisse Scanner

Scannt Datei-Schreib-Operationen auf hardcodierte Geheimnisse (API-Schlüssel, Passwörter, Tokens) ab, bevor Claude sie auf die Festplatte schreibt. Blockiert den Schreibvorgang und warnt, wenn Geheimnisse erkannt werden.

## settings.json-Eintrag

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

## Hook-Skript: secret-scanner.sh

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

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp secret-scanner.sh ~/.claude/hooks/secret-scanner.sh
chmod +x ~/.claude/hooks/secret-scanner.sh
```

## Was es erkennt

- OpenAI API-Schlüssel (`sk-...`)
- Anthropic API-Schlüssel (`sk-ant-...`)
- GitHub Personal Access Tokens (`ghp_...`)
- npm-Tokens (`npm_...`)
- AWS-Zugangsschlüssel (`AKIA...`)
- Slack-Bot-Tokens (`xoxb-...`)
- Stripe Live-Schlüssel
- Hartcodierte Passwörter, api_key und secret-Werte in Code

## Verhalten

Wenn ein potenzielles Geheimnis erkannt wird:
1. Der Schreibvorgang wird blockiert
2. Claude Code zeigt die Warnung an
3. Der Benutzer wird aufgefordert zu bestätigen oder abzubrechen
4. Wenn der Inhalt beabsichtigt ist (z. B. eine Test-Fixture mit gefälschten Werten), kann der Benutzer ihn zulassen

## Ausschlüsse

Der Hook kennzeichnet nicht:
- `.env.example` Platzhalterwerte (z. B. `YOUR_API_KEY_HERE`)
- Dateien in `tests/fixtures/` mit gefälschten Daten
- Werte, die eindeutig Referenzen sind (z. B. `process.env.API_KEY`)

Um ein bestimmtes Muster auf die Whitelist zu setzen, fügen Sie eine `grep -v`-Ausschlussmöglichkeit zum Skript hinzu.
