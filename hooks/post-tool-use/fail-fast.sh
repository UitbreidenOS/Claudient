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
