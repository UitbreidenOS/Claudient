# Hook: Inyector de entorno (Setup)

Inyecta automáticamente variables de entorno específicas del proyecto y contexto adicional en cada sesión de Claude Code. Configura una vez, carga en todas partes — sin contaminar tu perfil shell.

## Qué hace

- Se activa en el evento `Setup` (cuando una sesión comienza en un directorio)
- Lee desde `.claude/env` en la raíz del proyecto (gitignorredado)
- Exporta variables al entorno de la sesión
- Opcionalmente inyecta texto de contexto adicional en el contexto inicial de Claude

## Entrada en settings.json

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

## Script del hook: env-injector.sh

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

## Formato de archivo .claude/env del proyecto

```bash
# .claude/env — variables de entorno específicas del proyecto (gitignore este archivo)
DATABASE_URL=postgresql://localhost/myapp_dev
STRIPE_SECRET_KEY=sk_test_...
API_BASE_URL=http://localhost:3000

# Anular modelo Claude para este proyecto
ANTHROPIC_MODEL=claude-opus-4-7
```

## Configuración

```bash
# Instala el hook
mkdir -p ~/.claude/hooks
cp env-injector.sh ~/.claude/hooks/env-injector.sh
chmod +x ~/.claude/hooks/env-injector.sh

# Crea archivo de entorno del proyecto (gitignore!)
mkdir -p .claude
touch .claude/env
echo ".claude/env" >> .gitignore
```

## Regla gitignore

Siempre gitignore `.claude/env` — contiene secretos:
```gitignore
.claude/env
.claude/*.env
```
