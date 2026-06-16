#!/bin/bash

# shadow-compiler.sh
# Silently compiles/lints code after Claude edits it, feeding errors back to context.

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

CMD=""
MSG=""

# Determine the compiler based on ecosystem
if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.tsx ]]; then
  if [ -f "tsconfig.json" ]; then
    CMD="npx tsc --noEmit"
    MSG="TypeScript"
  fi
elif [[ "$FILE_PATH" == *.rs ]]; then
  if [ -f "Cargo.toml" ]; then
    CMD="cargo check --quiet"
    MSG="Rust"
  fi
elif [[ "$FILE_PATH" == *.go ]]; then
  if [ -f "go.mod" ]; then
    CMD="go build ./..."
    MSG="Go"
  fi
elif [[ "$FILE_PATH" == *.py ]]; then
  if command -v ruff &> /dev/null; then
    CMD="ruff check $FILE_PATH"
    MSG="Python (Ruff)"
  elif command -v flake8 &> /dev/null; then
    CMD="flake8 $FILE_PATH"
    MSG="Python (Flake8)"
  fi
fi

if [[ -n "$CMD" ]]; then
  echo "🔍 Shadow Compiler checking $MSG syntax..."
  
  # Run the command and capture output
  OUTPUT=$($CMD 2>&1)
  EXIT_CODE=$?
  
  if [ $EXIT_CODE -ne 0 ]; then
    echo "🚨 COMPILER ERROR DETECTED 🚨"
    echo "$OUTPUT"
    echo "Claude: The code you just wrote fails to compile. Please fix the errors above before continuing."
    # We exit 0 here so the hook completes normally and Claude Code receives the stdout as part of the tool result
    exit 0
  else
    echo "✅ Compilation passed."
  fi
fi

exit 0
