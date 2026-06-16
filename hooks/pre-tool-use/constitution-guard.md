# Constitution Guardrail Hook

This hook enforces the "rules of the road" defined in the GitHub Spec Kit `CONSTITUTION.md`. It scans every file modification and shell command before execution to ensure they adhere to your project's core invariants.

## When it fires
Event: `PreToolUse`
Triggers before `Replace`, `WriteFile`, or `Bash`.

## What it does
1. Searches for `CONSTITUTION.md` in the project root.
2. Extracts "Invariants" or "Rules" (e.g., "Must use TypeScript", "No inline styles").
3. Performs a fast grep/regex scan of the proposed code or command.
4. If a violation is detected (e.g., trying to write a `.js` file when the constitution requires `.ts`), it blocks the tool and returns a constitutional warning to Claude.

## `settings.json` Configuration
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "command": "bash .claude/hooks/constitution-guard.sh \"$TOOL_NAME\" \"$TOOL_ARGS\"",
        "description": "Enforce Spec Kit Constitution"
      }
    ]
  }
}
```