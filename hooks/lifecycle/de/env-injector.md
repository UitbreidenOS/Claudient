# Hook: Umgebungs-Injektor (Setup)

Injiziert projektspezifische Umgebungsvariablen und zusätzlichen Kontext automatisch in jede Claude Code-Session. Definieren Sie einmal, laden Sie überall — ohne Ihr Shell-Profil zu verschmutzen.

## Was es tut

- Wird beim `Setup`-Event ausgelöst (wenn eine Session in einem Verzeichnis startet)
- Liest aus `.claude/env` im Projektstamm (gitignoriert)
- Exportiert Variablen in die Sitzungsumgebung
- Injiziert optional zusätzlichen Kontexttext in Claudes anfänglichen Kontext

## settings.json-Eintrag

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

## Hook-Skript: env-injector.sh

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

## Projektdateiformat .claude/env

```bash
# .claude/env — projektspezifische Umgebungsvariablen (gitignore diese Datei)
DATABASE_URL=postgresql://localhost/myapp_dev
STRIPE_SECRET_KEY=sk_test_...
API_BASE_URL=http://localhost:3000

# Claude-Modell für dieses Projekt überschreiben
ANTHROPIC_MODEL=claude-opus-4-7
```

## Einrichtung

```bash
# Installieren Sie den Hook
mkdir -p ~/.claude/hooks
cp env-injector.sh ~/.claude/hooks/env-injector.sh
chmod +x ~/.claude/hooks/env-injector.sh

# Erstellen Sie die Projektumgebungsdatei (gitignore sie!)
mkdir -p .claude
touch .claude/env
echo ".claude/env" >> .gitignore
```

## Gitignore-Regel

Immer `.claude/env` gitignore — es enthält Geheimnisse:
```gitignore
.claude/env
.claude/*.env
```
