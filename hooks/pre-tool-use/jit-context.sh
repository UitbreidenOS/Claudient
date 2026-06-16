#!/bin/bash

# jit-context.sh
# Finds files that depend on the file Claude is about to edit.

TOOL_NAME="$1"
TOOL_ARGS="$2"

# Only care about file modification tools
if [[ "$TOOL_NAME" != "Replace" && "$TOOL_NAME" != "WriteFile" ]]; then
  exit 0
fi

# Extract the file path
FILE_PATH=$(echo "$TOOL_ARGS" | grep -o '"file_path": *"[^"]*"' | cut -d'"' -f4)

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Get just the base name without extension (e.g., Button.tsx -> Button)
BASE_NAME=$(basename "$FILE_PATH")
BASE_NAME_NO_EXT="${BASE_NAME%.*}"

echo "🔍 JIT Context: Searching for files depending on $BASE_NAME_NO_EXT..."

# Search for the base name in imports across common source directories
# Limiting to 5 matches to avoid blowing up context
DEPENDENCIES=$(grep -rl --include=\*.{ts,tsx,js,jsx,py,go,rs} "$BASE_NAME_NO_EXT" src/ lib/ app/ 2>/dev/null | grep -v "$FILE_PATH" | head -n 5)

if [[ -n "$DEPENDENCIES" ]]; then
  echo "⚠️  WARNING: Downstream Dependencies Detected ⚠️"
  echo "The following files reference the file you are about to edit:"
  echo "$DEPENDENCIES"
  echo "Claude: Please ensure your changes do not break these files, or update them in a subsequent step."
else
  echo "No immediate downstream dependencies found."
fi

# Exit 0 so the hook passes and Claude continues with the tool use
exit 0
