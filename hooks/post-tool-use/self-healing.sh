#!/usr/bin/env bash
# self-healing.sh — PostToolUse hook to block execution and force self-healing on failure.
set -euo pipefail

# Read the tool execution payload from stdin
INPUT=$(cat)

# Extract tool name and exit code
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

EXIT_CODE=$(echo "$INPUT" | jq -r '.exit_code // empty')

# If exit_code exists and is not 0, block execution and inject the error for self-healing
if [[ -n "$EXIT_CODE" && "$EXIT_CODE" != "0" ]]; then
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  OUTPUT=$(echo "$INPUT" | jq -r '.output // empty' | head -c 1000) # limit to 1000 chars to avoid massive context
  
  # Return block decision JSON to stdout so Claude Code halts
  jq -n \
    --arg cmd "$COMMAND" \
    --arg code "$EXIT_CODE" \
    --arg out "$OUTPUT" \
    '{
      decision: "block",
      reason: "🚨 SELF-HEALING ENFORCED: Command \'\($cmd)\' failed with exit code \($code).\n\nOutput snippet:\n\($out)\n\nYou MUST NOT hallucinate success or ignore this failure. You MUST write a fix for this exact error before proceeding with your plan."
    }'
  exit 0
fi

exit 0
