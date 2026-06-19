# Crochet (Hook) : Fail-Fast Enforcer (Arrêt immédiat)

Force un arrêt immédiat et bloque l'exécution de Claude lorsqu'une commande terminal/bash échoue. Cela empêche Claude de masquer les erreurs ou de générer de fausses réussites avec des données fictives.

## Quand se déclenche-t-il

Événement : `PostToolUse`
Filtre (Matcher) : `Bash`

## Entrée dans `settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/fail-fast.sh"
          }
        ]
      }
    ]
  }
}
```

## Script du crochet : fail-fast.sh

```bash
#!/usr/bin/env bash
# fail-fast.sh — PostToolUse hook to block execution when a bash command exits with a non-zero code.
set -euo pipefail

# Read the tool execution payload from stdin
INPUT=$(cat)

# Extract tool name and exit code
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

EXIT_CODE=$(echo "$INPUT" | jq -r '.exit_code // empty')

# If exit_code exists and is not 0, block execution to prevent error swallowing
if [[ -n "$EXIT_CODE" && "$EXIT_CODE" != "0" ]]; then
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  
  # Return block decision JSON to stdout so Claude Code halts
  jq -n \
    --arg cmd "$COMMAND" \
    --arg code "$EXIT_CODE" \
    '{
      decision: "block",
      reason: "🚨 FAIL-FAST ENFORCED: Command \'\($cmd)\' failed with exit code \($code). You are forbidden from swallowing errors or generating mock data on failure. Please resolve the failure before continuing."
    }'
  exit 0
fi

exit 0
```

## Installation

```bash
mkdir -p ~/.claude/hooks
cp fail-fast.sh ~/.claude/hooks/fail-fast.sh
chmod +x ~/.claude/hooks/fail-fast.sh
```

## Pourquoi est-ce nécessaire ?
Claude Code a parfois tendance à contourner les échecs de compilation, de test ou d'appel d'API en simulant une réussite ou en écrivant des fichiers fictifs. Le Fail-Fast Enforcer bloque l'appel de l'outil, interrompt le tour de Claude et affiche immédiatement l'échec au développeur.
