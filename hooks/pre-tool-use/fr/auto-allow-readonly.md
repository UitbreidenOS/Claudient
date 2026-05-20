# Hook : Approbation automatique des opérations en lecture seule

Approuve automatiquement les appels d'outils en lecture seule (Read, Glob, Grep, LS) sans demander la permission. Élimine le bruit constant des permissions lorsque Claude Code explore votre base de code.

## Ce qu'il fait

- Intercepte les événements `PreToolUse` pour les outils en lecture seule
- Les approuve automatiquement sans demander à l'utilisateur
- Demande toujours l'approbation pour les opérations d'écriture, suppression et shell
- Configurable — étendez la liste d'approbation pour les opérations sûres de votre équipe

## Entrée settings.json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Glob|Grep|LS|TodoRead",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/auto-allow-readonly.sh"
          }
        ]
      }
    ]
  }
}
```

## Script de hook : auto-allow-readonly.sh

```bash
#!/usr/bin/env bash
# PreToolUse hook: auto-approve safe read-only operations
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Tools that are always safe to auto-allow
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch"

if echo "$TOOL_NAME" | grep -qE "^($READONLY_TOOLS)$"; then
  # Return approval signal — Claude proceeds without prompting
  echo '{"decision":"approve","reason":"Read-only operation auto-approved"}'
  exit 0
fi

# All other tools: let Claude Code handle normally (prompt user)
exit 0
```

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp auto-allow-readonly.sh ~/.claude/hooks/auto-allow-readonly.sh
chmod +x ~/.claude/hooks/auto-allow-readonly.sh
```

## Personnaliser la liste d'approbation

Ajoutez les outils en lesquels vous avez confiance au modèle `READONLY_TOOLS` :
```bash
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch|GitStatus"
```

## Note de sécurité

Ce hook réduit les frictions lors de l'exploration de la base de code. Il n'approuve PAS automatiquement :
- `Write`, `Edit`, `MultiEdit` — modifications de fichiers
- `Bash` — exécution de shell
- `Delete` — suppression de fichiers
- Tout outil non dans la liste d'approbation explicite

N'ajoutez jamais `Bash` à la liste d'approbation sans un filtre au niveau des commandes.
