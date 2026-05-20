# Hook: Auto Git Stage

Ejecuta automáticamente `git add` en archivos después de que Claude Code los edita. Mantén tu área de staging actualizada sin necesidad de `git add` manual entre ediciones.

## Qué hace

- Se activa en `PostToolUse` después de operaciones `Write` o `Edit`
- Realiza automáticamente el stage del archivo modificado con `git add`
- Ignora elegantemente directorios no-git
- Solo hace stage de archivos ya rastreados o nuevos — nunca hace stage de `.env` o archivos gitignore

## Entrada en settings.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/auto-git-stage.sh"
          }
        ]
      }
    ]
  }
}
```

## Script del hook: auto-git-stage.sh

```bash
#!/usr/bin/env bash
# PostToolUse hook: auto-stage files after Claude edits them
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Skip if not in a git repo
if ! git -C "$(dirname "$FILE_PATH")" rev-parse --git-dir &>/dev/null; then
  exit 0
fi

# Skip gitignored files (won't stage .env, node_modules, etc.)
if git -C "$(dirname "$FILE_PATH")" check-ignore -q "$FILE_PATH" 2>/dev/null; then
  exit 0
fi

git add "$FILE_PATH"
echo "✅ Staged: $FILE_PATH" >&2

exit 0
```

## Configuración

```bash
mkdir -p ~/.claude/hooks
cp auto-git-stage.sh ~/.claude/hooks/auto-git-stage.sh
chmod +x ~/.claude/hooks/auto-git-stage.sh
```

## Flujo de trabajo con auto-staging

Con este hook activo, tu flujo de trabajo típico se convierte en:
```
1. Pide a Claude que implemente una función
2. Claude edita múltiples archivos → todos son staged automáticamente
3. Revisa el diff: git diff --staged
4. Commit: git commit -m "feat: ..."
```

No se necesitan pasos de `git add` entre ediciones de Claude.

## Deshabilitar temporalmente

```bash
CLAUDE_SKIP_AUTOSTAGE=1 claude "edición rápida"
```

Añade al script: `[[ "${CLAUDE_SKIP_AUTOSTAGE:-false}" == "1" ]] && exit 0`
