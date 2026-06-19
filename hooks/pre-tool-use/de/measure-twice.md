# Hook: Measure Twice (Plan-First)

Erzwingt, dass ein Plan vorgelegt, in `.claude/plan.md` geschrieben und vom Benutzer genehmigt wird, bevor Claude Terminalbefehle ausführen oder Dateien bearbeiten darf.

## Wann er ausgelöst wird

Ereignis: `PreToolUse`
Matcher: `Bash|Write|WriteFile|Edit|Replace`

## Eintrag in `settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Write|WriteFile|Edit|Replace",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/measure-twice.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook-Skript: measure-twice.sh

```bash
#!/usr/bin/env bash
# measure-twice.sh — PreToolUse hook to enforce Plan-First mode.
set -euo pipefail

# Read the tool execution payload from stdin
INPUT=$(cat)

# Extract tool name
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only enforce on tools that run commands or edit files
if [[ "$TOOL_NAME" != "Bash" && "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "WriteFile" && "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Replace" ]]; then
  exit 0
fi

# Always allow writing/editing plan and config files under .claude
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
if [[ "$FILE_PATH" == *".claude/plan.md" || "$FILE_PATH" == *".claude/settings.json" ]]; then
  exit 0
fi

PLAN_FILE=".claude/plan.md"
APPROVED=false

if [[ -f "$PLAN_FILE" ]]; then
  # Check if plan contains "Status: Approved" (case-insensitive)
  if grep -qi "Status: Approved" "$PLAN_FILE"; then
    APPROVED=true
  fi
fi

if [[ "$APPROVED" = false ]]; then
  # Return block decision JSON to stdout so Claude Code halts
  jq -n \
    '{
      decision: "block",
      reason: "🚨 MEASURE TWICE GUARD: Plan-First Mode active. You must present a plan and obtain user approval before executing commands or modifying files. Propose a plan to the user, write it to .claude/plan.md, and have the user mark it as \'Status: Approved\'."
    }'
  exit 0
fi

exit 0
```

## Einrichtung

```bash
mkdir -p ~/.claude/hooks
cp measure-twice.sh ~/.claude/hooks/measure-twice.sh
chmod +x ~/.claude/hooks/measure-twice.sh
```

## Verwendung
1. Wenn eine neue Aufgabe empfangen wird, ist Claude Code für Aktionen blockiert.
2. Claude schreibt einen vorgeschlagenen Plan mit `Status: Pending` in `.claude/plan.md`.
3. Der Benutzer bearbeitet `.claude/plan.md` und ändert den Status in `Status: Approved`.
4. Claudes nachfolgende Aktionen umgehen die Schutzvorrichtung und werden erfolgreich ausgeführt.
