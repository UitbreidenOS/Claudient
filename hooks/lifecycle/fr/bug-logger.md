# Hook : Enregistreur de bugs (Stop)

Ajoute une entrée datée à `bugs.md` dans la racine de votre projet chaque fois que Claude Code rencontre une erreur ou une exception lors d'une session. Construisez un historique consultable des bugs, des causes racines et des correctifs.

## Ce qu'il fait

- S'active sur l'événement `Stop`
- Lit les signaux d'erreur de l'entrée de session
- Ajoute une entrée structurée à `bugs.md` dans le répertoire du projet
- Crée le fichier s'il n'existe pas

## Entrée settings.json

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/bug-logger.sh"
          }
        ]
      }
    ]
  }
}
```

## Script de hook : bug-logger.sh

```bash
#!/usr/bin/env bash
# Stop hook: append session errors to bugs.md
set -euo pipefail

INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd // "."')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
STOP_REASON=$(echo "$INPUT" | jq -r '.stop_reason // "normal"')

BUGS_FILE="$CWD/bugs.md"

# Initialise bugs.md if it doesn't exist
if [[ ! -f "$BUGS_FILE" ]]; then
  cat > "$BUGS_FILE" << 'EOF'
# Bug Log

Running log of bugs encountered during development sessions.
Format: Date | Error | Root cause | Status

---

EOF
fi

# Extract any errors from the session (adapt based on what's available in your input)
ERROR_COUNT=$(echo "$INPUT" | jq -r '.error_count // 0')
LAST_ERROR=$(echo "$INPUT" | jq -r '.last_error // ""')

# Only log if there were errors
if [[ "$ERROR_COUNT" -gt 0 ]] || [[ -n "$LAST_ERROR" ]]; then
  cat >> "$BUGS_FILE" << EOF

## ${TIMESTAMP}
**Session errors:** ${ERROR_COUNT}
**Last error:** ${LAST_ERROR:-"(see session transcript)"}
**Status:** 🔴 Unfixed — needs investigation
**Files affected:** $(git -C "$CWD" diff --name-only HEAD 2>/dev/null | head -5 | tr '\n' ', ' || echo "unknown")

EOF
  echo "🐛 Bug entry added to $BUGS_FILE" >&2
fi

exit 0
```

## Configuration

```bash
mkdir -p ~/.claude/hooks
cp bug-logger.sh ~/.claude/hooks/bug-logger.sh
chmod +x ~/.claude/hooks/bug-logger.sh
```

## Mise à jour du statut du bug

Lorsqu'un bug est corrigé, mettez à jour manuellement `bugs.md` :
```markdown
**Status:** ✅ Fixed in commit abc1234 — root cause: missing null check
```

## Recherche dans le journal des bugs

```bash
# Trouver tous les bugs non corrigés
grep -A3 "🔴 Unfixed" bugs.md

# Rechercher une erreur spécifique
grep -n "TypeError\|undefined" bugs.md
```
