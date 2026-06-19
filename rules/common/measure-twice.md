# Measure Twice (Plan-First) Rules

Rule enforcing that a concrete plan must be written, reviewed, and approved before making any edits or executing commands.

## Core principles

- **Plan Before Action**: You must present a clear, step-by-step plan before using any tool that modifies files or runs command-line instructions.
- **Plan File**: Plans must be written to `.claude/plan.md` with `Status: Pending` before you attempt to edit code or run scripts.
- **User Approval**: A `PreToolUse` hook blocks modifications until `.claude/plan.md` contains `Status: Approved`. You must wait for the user to approve the plan.
- **Scope Alignment**: Keep your plans small, incremental, and focused. Do not propose broad, sweeping changes without explicit confirmation.

## Incorrect vs. Correct Behavior

❌ **Bad (Incorrect)**:
Starting to write files or compile code immediately upon receiving a high-level request, without verifying constraints or presenting a step-by-step roadmap.

🚀 **Good (Correct)**:
1. "Here is my proposed design and roadmap..."
2. Writing the plan to `.claude/plan.md` with `Status: Pending`.
3. "I have drafted the plan in `.claude/plan.md`. Please review and mark it as `Status: Approved` so I can proceed."
4. Once the user edits the plan status, proceeding to run commands/writes.

## Standard Plan Format
Write plans using this format in `.claude/plan.md`:

```markdown
# Implementation Plan

## Proposed Changes
1. [Change details]
2. [Change details]

## Verification Plan
1. [How changes will be tested]

## Status
Status: Pending (Change to 'Status: Approved' to unlock tools)
```
