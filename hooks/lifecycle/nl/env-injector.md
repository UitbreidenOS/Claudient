# Hook: Omgevings-injector (Setup)

Injecteert project-specifieke omgevingsvariabelen en aanvullende context automatisch in elke Claude Code-sessie. Definieer eenmaal, laad overal — zonder uw shell-profiel te vervuilen.

## Wat het doet

- Wordt geactiveerd bij het `Setup`-event (wanneer een sessie in een directory begint)
- Leest van `.claude/env` in de projectroot (gitignoreerd)
- Exporteert variabelen naar de sessieomgeving
- Injecteert optioneel extra context-text in Claudes initiële context

## settings.json-invoer

```json
{
  "hooks": {
    "Setup": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/env-injector.sh"
          }
        ]
      }
    ]
  }
}
```

## Hookscript: env-injector.sh

```bash
#!/usr/bin/env bash
# Setup hook: inject project env vars and context at session start
set -euo pipefail

INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')

# Load project-level env file (.claude/env — gitignored)
ENV_FILE="$CWD/.claude/env"
if [[ -f "$ENV_FILE" ]]; then
  while IFS='=' read -r key value; do
    # Skip comments and blank lines
    [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
    export "$key=$value"
    echo "  ✓ Loaded: $key" >&2
  done < "$ENV_FILE"
  echo "📦 Environment loaded from $ENV_FILE" >&2
fi

# Load global Claude env file (~/.claude/env — personal, non-project)
GLOBAL_ENV="$HOME/.claude/env"
if [[ -f "$GLOBAL_ENV" ]]; then
  while IFS='=' read -r key value; do
    [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
    # Don't override project-level vars
    [[ -v "$key" ]] && continue
    export "$key=$value"
  done < "$GLOBAL_ENV"
fi

exit 0
```

## Project .claude/env bestandsindeling

```bash
# .claude/env — project-specifieke omgevingsvariabelen (gitignore dit bestand)
DATABASE_URL=postgresql://localhost/myapp_dev
STRIPE_SECRET_KEY=sk_test_...
API_BASE_URL=http://localhost:3000

# Claude-model voor dit project overschrijven
ANTHROPIC_MODEL=claude-opus-4-7
```

## Installatie

```bash
# Installeer de hook
mkdir -p ~/.claude/hooks
cp env-injector.sh ~/.claude/hooks/env-injector.sh
chmod +x ~/.claude/hooks/env-injector.sh

# Maak project env-bestand (gitignore het!)
mkdir -p .claude
touch .claude/env
echo ".claude/env" >> .gitignore
```

## Gitignore-regel

Altijd `.claude/env` gitignore — het bevat geheimen:
```gitignore
.claude/env
.claude/*.env
```
