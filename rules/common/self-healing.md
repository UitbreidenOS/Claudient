---
name: self-healing
description: Blocks execution on tool failure and injects stderr to force the agent to fix the error.
---

# Self-Healing Protocol

1. When running bash commands (like tests, builds, or scripts), if a command fails, the `self-healing` hook will intercept the failure and block execution.
2. The hook will inject a snippet of the output/stderr directly back into the context.
3. You MUST read this injected error snippet.
4. You MUST NOT hallucinate that the command succeeded.
5. You MUST analyze the error and formulate a plan to fix it before re-running the command.
6. Only once the command succeeds with an exit code of 0 are you allowed to continue your broader plan.
