# Hook : Injecteur d'environnement (Setup)

Injecte les variables d'environnement spécifiques au projet et le contexte supplémentaire dans chaque session Claude Code automatiquement. Définissez une fois, chargez partout — sans polluer votre profil shell.

## Ce qu'il fait

- S'active sur l'événement `Setup` (lorsqu'une session démarre dans un répertoire)
- Lit depuis `.claude/env` dans la racine du projet (gitignorée)
- Exporte les variables dans l'environnement de la session
- Injecte optionnellement du texte de contexte supplémentaire dans le contexte initial de Claude

## Entrée settings.json

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

## Script de hook : env-injector.sh

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

## Format du fichier .claude/env du projet

```bash
# .claude/env — variables d'environnement spécifiques au projet (gitignore ce fichier)
DATABASE_URL=postgresql://localhost/myapp_dev
STRIPE_SECRET_KEY=sk_test_...
API_BASE_URL=http://localhost:3000

# Remplacez le modèle Claude pour ce projet
ANTHROPIC_MODEL=claude-opus-4-7
```

## Configuration

```bash
# Installez le hook
mkdir -p ~/.claude/hooks
cp env-injector.sh ~/.claude/hooks/env-injector.sh
chmod +x ~/.claude/hooks/env-injector.sh

# Créez le fichier d'environnement du projet (gitignore-le !)
mkdir -p .claude
touch .claude/env
echo ".claude/env" >> .gitignore
```

## Règle gitignore

Toujours gitignore `.claude/env` — il contient des secrets :
```gitignore
.claude/env
.claude/*.env
```
