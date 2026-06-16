# JIT Context Injector Hook

This hook dynamically discovers downstream dependencies of a file you are about to edit and injects their signatures into your context, preventing you from accidentally breaking files that rely on the code you are changing.

## When it fires
Event: `PreToolUse`
Triggers right before Claude Code executes the `Replace` or `WriteFile` tools.

## What it does
1. Parses the target filename (e.g., `UserService.ts`).
2. Uses `grep` to find all other files in the project that import or reference `UserService.ts`.
3. If dependencies are found, it extracts a brief snippet (or just the filenames) and prints them to the terminal.
4. Claude Code ingests this terminal output *before* it makes the edit, allowing it to realize: "Ah, `AuthController.ts` depends on this function I'm about to rename. I need to update `AuthController.ts` as well."

## `settings.json` Configuration
Add this to your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "command": "bash .claude/hooks/jit-context.sh \"$TOOL_NAME\" \"$TOOL_ARGS\"",
        "description": "Inject downstream dependencies"
      }
    ]
  }
}
```

## Setup Instructions
1. Copy the `jit-context.sh` script to `.claude/hooks/jit-context.sh`.
2. Make it executable: `chmod +x .claude/hooks/jit-context.sh`.
3. Update your `.claude/settings.json` as shown above.