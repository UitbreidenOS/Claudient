# Hook: Fail-Fast Enforcer

Forces a hard stop and blocks Claude's execution when a terminal/bash command fails. This prevents Claude from swallowing errors or generating mock data on failure.

## When it fires

Event: `PostToolUse`
Matcher: `Bash`

## settings.json entry

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

## Hook script: fail-fast.sh

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

## Setup

```bash
mkdir -p ~/.claude/hooks
cp fail-fast.sh ~/.claude/hooks/fail-fast.sh
chmod +x ~/.claude/hooks/fail-fast.sh
```

## Why this is necessary
Claude Code has a tendency to sometimes bypass compilation, test, or API call failures by simulating success or writing mock files. The Fail-Fast Enforcer blocks the tool call, halts Claude's turn, and surfaces the failure immediately to the developer.
