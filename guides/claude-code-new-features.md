# Claude Code New Features Guide (2026)

A practical guide to the latest Claude Code capabilities — parallel sessions, /goal command, Agent View, Managed Agents, voice input, and the redesigned desktop.

## What's new (May 2026)

| Feature | What it does | How to use |
|---|---|---|
| **Agent View** | Dashboard for all parallel sessions | `claude --agent-view` |
| **/goal command** | Claude works autonomously until a condition is met | `/goal [condition]` |
| **Parallel Sessions** | Multiple agents from one window | Run multiple `claude` sessions |
| **Managed Agents** | Build agents in Claude-managed runtime | Claude Platform API |
| **Voice Input** | Speak your prompt natively | Voice toggle in desktop app |
| **Auto-Archive** | Sessions archive when PR merged | Automatic |
| **Effort Slider** | Control intelligence vs. token spend | Model settings in desktop |
| **Claude Opus 4.7** | Default for Max/Team Premium users | `/model` command |

---

## Agent View — Managing Parallel Sessions

Agent View (launched May 11, 2026) is a CLI dashboard that shows all running Claude Code sessions at a glance — which are waiting for input, which are running, and what each is working on.

```bash
# Start Claude Code with Agent View
claude --agent-view

# Or toggle agent view within a session
/agent-view
```

**What you see in Agent View:**
- All active sessions and their current task
- Sessions waiting for your input (flagged prominently)
- Session costs in real-time
- The ability to reply to any session without switching windows

**Best practices for parallel work:**
```bash
# Terminal 1: Main feature work
claude "implement user authentication"

# Terminal 2: Related bug fix
claude "fix the payment timeout bug in src/payments/"

# Terminal 3: Documentation
claude "write API docs for the new endpoints"

# Agent View shows all three — jump between them as needed
claude --agent-view
```

**Using git worktrees with parallel sessions:**
```bash
# Create isolated directories for each agent
git worktree add ../project-feature-auth feature/auth
git worktree add ../project-fix-payments fix/payment-timeout

# Run Claude in each worktree — agents can't interfere with each other
cd ../project-feature-auth && claude "implement user auth"
cd ../project-fix-payments && claude "fix payment timeout"
```

---

## /goal Command — Autonomous Task Completion

The `/goal` command sets a completion condition. Claude works autonomously — writing code, running tests, fixing errors — until the condition is met or it hits a dead end.

```bash
# Set a goal with a measurable completion condition
/goal all tests pass for the auth module

# Or a more specific goal
/goal the /api/users endpoint returns 201 with valid data and 422 with invalid email

# Claude will:
# 1. Understand the current state
# 2. Write/fix code toward the goal
# 3. Run tests to check progress
# 4. Fix errors and retry
# 5. Stop when the goal is achieved
```

**Good goals (specific, testable):**
```
/goal npm test passes with zero failures
/goal the lighthouse score for the homepage is above 90
/goal the docker container builds and runs without errors
/goal all TypeScript errors are resolved in src/
```

**Bad goals (too vague):**
```
/goal make the app better    ← not testable
/goal fix all bugs           ← too open-ended
```

**Goal with a time budget:**
```
/goal all API tests pass — budget: 20 minutes
```

---

## Managed Agents — Claude-Native Agent Infrastructure

Claude Managed Agents (launched April 8, 2026) lets you build agents in Claude's managed runtime instead of managing your own agent loop.

```typescript
// Instead of building your own agent loop:
while (!done) {
  const response = await claude.generate(prompt)
  const toolResults = await executeTools(response.tool_calls)
  // ... manage state, retries, context...
}

// Use the Managed Agent API:
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

// Create an agent
const agent = await client.beta.agents.create({
  name: 'code-reviewer',
  model: 'claude-sonnet-4-6',
  instructions: 'You are a senior code reviewer. Review PRs for security and quality.',
  tools: [
    { type: 'computer_use' },
    { type: 'bash' },
  ],
})

// Run the agent on a task
const run = await client.beta.agents.runs.create(agent.id, {
  messages: [{ role: 'user', content: 'Review this PR: github.com/org/repo/pull/123' }],
})

// Poll for completion
while (run.status === 'running') {
  await new Promise(r => setTimeout(r, 1000))
  const updated = await client.beta.agents.runs.retrieve(agent.id, run.id)
  console.log(updated.status)
}
```

**Claude manages for you:**
- Agent loop execution
- Tool call orchestration
- State persistence across turns
- Retry logic and error recovery
- Sandbox container lifecycle

**Use Managed Agents when:**
- You want to deploy agents without managing server infrastructure
- The agent needs to run long tasks (hours) without babysitting
- You want to share agents across team members
- You're building a product that embeds Claude agents

**Use Claude Code directly (not Managed Agents) when:**
- Local development and coding tasks
- You need full control over the agent loop
- Tasks are short-lived and interactive

---

## Voice Input

Native voice mode in Claude Code Desktop — speak your prompts without third-party transcription.

```bash
# Toggle voice mode (Desktop app)
# Keyboard shortcut: shown in Desktop Settings → Keybindings → Voice

# Or via CLI flag (experimental)
claude --voice
```

**Best practices for voice prompts:**
- Speak clearly and include context: "In the users route file, add rate limiting to the login endpoint"
- Use natural language: "Can you explain why the test is failing?"
- Voice works best for short prompts; type long code specifications

---

## Desktop Redesign — Parallel Workflows

The new Claude Code Desktop is built for running multiple workflows simultaneously.

**Key capabilities:**
- **Side chats**: open a parallel conversation without losing main thread context
- **Drag-and-drop panels**: arrange your layout for your workflow
- **HTML/PDF previewer**: view generated files inline
- **Built-in diff viewer**: review changes without switching to another tool
- **File editor**: edit files directly in the app
- **Auto-archive**: sessions archive automatically when their PR is merged

**Recommended layouts:**
```
Layout 1: Code + Chat side-by-side
  Left panel: current file/diff
  Right panel: Claude conversation

Layout 2: Multi-agent monitoring
  Main panel: Agent View dashboard
  Side panel: Active session output

Layout 3: Research + Build
  Left: Claude conversation (ask questions)
  Right: Code editor (implement answers)
```

---

## Effort Slider — Intelligence vs. Cost

Claude Opus 4.7 (default for Max/Team Premium) includes an effort slider — dial up intelligence for complex tasks, dial down for simple ones.

```
Low effort (fastest, cheapest):
  - Code formatting, variable renaming, simple completions
  - Tab suggestions
  - Quick explanations

Medium effort (default):
  - Standard code generation
  - Debugging common errors
  - Writing tests

High effort (most thorough, highest cost):
  - Complex architecture decisions
  - Multi-file refactors
  - Security audits
  - Debugging subtle race conditions or memory leaks
```

**In Claude Code:**
```bash
# Set effort level for a session
/model --effort high    # thorough, best for complex tasks
/model --effort low     # fast, for simple tasks
```

---

## Cloud Code Review

Dispatches a fleet of cloud agents to review your code for bugs, security issues, and quality problems. Results land directly in your CLI.

```bash
# Trigger a cloud code review on the current branch
/review --cloud

# Review a specific PR
/review --pr 123 --cloud

# Review with specific focus
/review --cloud --focus security
/review --cloud --focus performance
```

**What the fleet checks:**
- Security vulnerabilities (OWASP Top 10, injection, auth bypass)
- Logic errors and edge cases
- Performance bottlenecks
- Test coverage gaps
- Breaking changes to public APIs

**Different from local review:** Cloud review runs many agents in parallel examining different aspects simultaneously — faster and broader than a single-agent sequential review.

---

## Tips for Getting the Most from New Features

**Parallel sessions + git worktrees = the power combo:**
```bash
# Never stash again — use worktrees for complete isolation
git worktree add ../myapp-feature feature/new-dashboard
cd ../myapp-feature
claude "/goal all tests pass for the new dashboard component"
# Go back to main work — Claude is running autonomously
cd ../myapp
```

**Goal command + hooks = fully autonomous pipelines:**
```bash
# /goal for the task + hooks for notifications
# When Claude finishes, ntfy hook pings your phone
/goal migrate the database schema and verify all existing tests still pass
```

**Agent View + session-retro hook:**
Use Agent View to monitor multiple sessions, and the `session-retro` hook to automatically capture learnings when each session ends.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
