# Shadow Compiler Hook

This hook provides real-time, zero-hallucination type safety. When Claude Code edits a file, this hook silently runs the project's compiler or linter in the background. If Claude made a syntax error, imported a missing module, or violated a type constraint, the hook catches it and feeds the error back to Claude before the task is marked complete.

## When it fires
Event: `PostToolUse`
Triggers after Claude Code executes the `Replace` or `WriteFile` tools.

## What it does
1. Checks the extension of the file just modified.
2. Runs the appropriate fast-check tool:
   - TypeScript: `npx tsc --noEmit`
   - Rust: `cargo check`
   - Python: `ruff check` or `flake8`
   - Go: `go build`
3. If the compiler returns a non-zero exit code (an error), the hook prints the compiler output and exits.
4. Claude Code automatically reads the hook's output, sees the compiler error, and initiates a self-correction loop.

## `settings.json` Configuration
Add this to your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "command": "bash .claude/hooks/shadow-compiler.sh \"$TOOL_NAME\" \"$TOOL_ARGS\"",
        "description": "Real-time type checking"
      }
    ]
  }
}
```

## Setup Instructions
1. Copy the `shadow-compiler.sh` script to `.claude/hooks/shadow-compiler.sh`.
2. Make it executable: `chmod +x .claude/hooks/shadow-compiler.sh`.
3. Update your `.claude/settings.json` as shown above.