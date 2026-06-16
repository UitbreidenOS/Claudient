#!/bin/bash

# constitution-guard.sh
# Enforces GitHub Spec Kit CONSTITUTION.md rules.

TOOL_NAME="$1"
TOOL_ARGS="$2"
CONST_FILE="CONSTITUTION.md"

if [ ! -f "$CONST_FILE" ]; then
  exit 0
fi

# We only check tools that modify the codebase
if [[ "$TOOL_NAME" != "Replace" && "$TOOL_NAME" != "WriteFile" && "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

VIOLATION=""

# 1. Check for Language Constraints (e.g., MUST USE TYPESCRIPT)
if grep -qi "TypeScript" "$CONST_FILE"; then
  if echo "$TOOL_ARGS" | grep -q '"file_path": *"[^"]*\.js"' ; then
    VIOLATION="Constitutional Violation: This project requires TypeScript (.ts/.tsx). You attempted to write a JavaScript (.js) file."
  fi
fi

# 2. Check for Library Constraints (e.g., NO LODASH)
if grep -qi "No Lodash" "$CONST_FILE" || grep -qi "Avoid Lodash" "$CONST_FILE"; then
  if echo "$TOOL_ARGS" | grep -qi "lodash"; then
    VIOLATION="Constitutional Violation: Lodash is forbidden in this project. Use native array/object methods."
  fi
fi

# 3. Check for Styling Constraints (e.g., TAILWIND ONLY)
if grep -qi "Tailwind" "$CONST_FILE"; then
  if echo "$TOOL_ARGS" | grep -qi "\.css" | grep -qv "globals.css"; then
    VIOLATION="Constitutional Violation: Use Tailwind utility classes. Direct CSS file creation is restricted."
  fi
fi

if [[ -n "$VIOLATION" ]]; then
  echo "📜 CONSTITUTIONAL GUARDRAIL ACTIVE 📜"
  echo "$VIOLATION"
  echo "Claude: Abort immediately. Your action violates the GitHub Spec Kit CONSTITUTION.md. Propose an alternative that follows the rules."
  exit 1
fi

exit 0