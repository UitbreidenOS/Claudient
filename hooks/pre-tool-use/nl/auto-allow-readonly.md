# Hook: Auto-goedkeuring voor leesbewerkingen

Keurt automatisch werkstukoproepen goed die alleen lezen (Read, Glob, Grep, LS) zonder gebruikerstoestemming. Elimineert de constante herrie van toestemmingen wanneer Claude Code uw codebasis verkent.

## Wat het doet

- Onderschept `PreToolUse`-events voor lees-only tools
- Keurt ze automatisch goed zonder gebruikersinvoering
- Vraagt nog steeds toestemming voor alle schrijf-, verwijder- en shell-bewerkingen
- Configureerbaar — breid de goedkeuringingslijst uit voor uw teams veilige bewerkingen

## settings.json-invoer

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

## Hookscript: auto-allow-readonly.sh

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

## Installatie

```bash
mkdir -p ~/.claude/hooks
cp auto-allow-readonly.sh ~/.claude/hooks/auto-allow-readonly.sh
chmod +x ~/.claude/hooks/auto-allow-readonly.sh
```

## Goedkeuringingslijst aanpassen

Voeg tools toe aan het patroon `READONLY_TOOLS` waarvan u vertrouwt:
```bash
READONLY_TOOLS="Read|Glob|Grep|LS|TodoRead|WebSearch|WebFetch|GitStatus"
```

## Beveiligingsnota

Deze hook reduceert wrijving bij codebasis-verkenning. Het keurt NIET automatisch goed:
- `Write`, `Edit`, `MultiEdit` — bestandswijzigingen
- `Bash` — shell-uitvoering
- `Delete` — bestandsverwijdering
- Alle tools niet in de expliciete goedkeuringingslijst

Voeg nooit `Bash` toe aan de goedkeuringingslijst zonder een filter op opdrachtsniveau.
