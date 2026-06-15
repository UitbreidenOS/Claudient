# Hook: Usage Tracker

Logs every Claude Code tool invocation to `.claude/usage-log.jsonl` for DX metrics collection, adoption tracking, and skill effectiveness measurement.

## Event

`PostToolUse` — fires immediately after any tool call completes (Bash, Read, Write, WebSearch, API calls, etc.)

## settings.json entry

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/usage-tracker.sh",
            "async": true
          }
        ]
      }
    ]
  },
  "dx": {
    "tracking_enabled": true,
    "usage_log_file": "${CLAUDE_PROJECT_DIR}/.claude/usage-log.jsonl",
    "rotation_size_mb": 50,
    "retention_days": 90
  }
}
```

## What it does

Appends one JSON line to `.claude/usage-log.jsonl` for every tool call, capturing:

- **Timestamp** (ISO 8601 UTC)
- **Session ID** and user
- **Skill name** (parsed from context, if available)
- **Tool called** (Bash, Read, Write, WebSearch, etc.)
- **Duration** (milliseconds)
- **Success** (exit code 0 = true)
- **Tool-specific metadata** (command, file path, query, etc.)

Example record:

```json
{
  "timestamp": "2026-06-15T14:32:15.234Z",
  "session_id": "sess_abc123",
  "user_id": "alice@company.com",
  "skill_name": "code-review",
  "tool_called": "Bash",
  "tool_input_summary": "git diff --name-only",
  "duration_ms": 2847,
  "exit_code": 0,
  "success": true,
  "invocation_num": 3,
  "retry_count": 0,
  "metadata": {
    "project_dir": "/Users/alice/myapp",
    "git_branch": "feature/auth",
    "model": "haiku-4.5"
  }
}
```

## Features

- **Lightweight**: Async logging doesn't block Claude Code execution
- **Privacy-respecting**: Logs command summaries, not full sensitive input
- **Adoption tracking**: Links tool calls to skills for /dx-metrics analysis
- **Minimal overhead**: ~10ms per log entry, batched writes
- **Automatic rotation**: Moves old logs to `.jsonl.1`, `.jsonl.2` when > 50MB
- **Retention policy**: Auto-deletes logs older than 90 days
- **Session tracking**: All calls in a session share a session_id for correlation
- **Retry detection**: Counts repeated calls to same tool within 30 seconds

## Setup

```bash
# Copy hook script to project
cp hooks/usage-tracker.sh .claude/hooks/
chmod +x .claude/hooks/usage-tracker.sh

# Create log directory
mkdir -p .claude
touch .claude/usage-log.jsonl

# Add to .gitignore (usage logs contain metadata, not secrets)
echo ".claude/usage-log.jsonl*" >> .gitignore
echo ".claude/dx-scorecard*.json" >> .gitignore
echo ".claude/session-log*.md" >> .gitignore

# Verify in settings.json (add above hooks entry)
cat >> .claude/settings.json << 'EOF'
  "dx": {
    "tracking_enabled": true,
    "usage_log_file": "${CLAUDE_PROJECT_DIR}/.claude/usage-log.jsonl",
    "rotation_size_mb": 50,
    "retention_days": 90
  }
EOF
```

## Query Examples

**List all tool calls in a session**:
```bash
jq 'select(.session_id == "sess_abc123")' .claude/usage-log.jsonl
```

**Count skill invocations (for /dx-metrics)**:
```bash
jq -s 'group_by(.skill_name) | map({skill: .[0].skill_name, count: length})' \
  .claude/usage-log.jsonl
```

**Find errors**:
```bash
jq 'select(.success == false)' .claude/usage-log.jsonl | jq -s 'length'
```

**Calculate average duration per tool**:
```bash
jq -s 'group_by(.tool_called) | map({tool: .[0].tool_called, avg_ms: (map(.duration_ms) | add / length)})' \
  .claude/usage-log.jsonl
```

**Find slow operations** (> 30 seconds):
```bash
jq 'select(.duration_ms > 30000) | {timestamp, tool_called, duration_ms}' \
  .claude/usage-log.jsonl | head -10
```

**Detect retry loops** (same tool called 3+ times in 60 seconds):
```bash
jq -s '[.[] | select(.retry_count > 0)]' .claude/usage-log.jsonl
```

## Integration with /dx-metrics

The usage-tracker hook feeds raw data to `/dx-metrics`, which aggregates for DX scoring:

```
[Tool invocation] 
  ↓
[PostToolUse hook]
  ↓
[usage-tracker.sh appends to .claude/usage-log.jsonl]
  ↓
[/dx-metrics reads usage-log.jsonl]
  ↓
[Generates .claude/dx-scorecard.json (invocations, success_rate, time_saved, etc.)]
```

## Skill Name Detection

The hook attempts to infer `skill_name` from context:

1. Check `CLAUDE_ACTIVE_SKILL` environment variable (set if running inside a skill)
2. Parse session metadata for running `/skill-name` command
3. Infer from tool sequence (e.g., if Bash + Read + Write in sequence, likely a code-review-type skill)
4. Fallback: `skill_name = "manual"` (user running tools directly)

For best results, skills should set `CLAUDE_ACTIVE_SKILL` when invoked:

```bash
# Inside a skill (e.g., skills/productivity/code-review.md)
export CLAUDE_ACTIVE_SKILL="code-review"
# ... skill instructions follow
```

## Performance Tuning

If logging impacts responsiveness:

1. **Increase rotation size** to batch fewer log rotations:
   ```json
   "rotation_size_mb": 100
   ```

2. **Decrease retention** to reduce disk usage:
   ```json
   "retention_days": 30
   ```

3. **Disable temporarily** (during heavy computation):
   ```bash
   export DX_TRACKING_DISABLED=1
   ```

4. **Sample logs** (log every Nth call) — edit usage-tracker.sh:
   ```bash
   SAMPLE_RATE=10  # Log 1 in 10 calls
   [ $((RANDOM % SAMPLE_RATE)) -ne 0 ] && exit 0
   ```

## Data Governance

- **Ownership**: Project team / DX lead
- **Access**: Users can query `.claude/usage-log.jsonl` locally; no upload to cloud
- **Anonymization**: Remove user_id before sharing reports (optional):
  ```bash
  jq 'del(.user_id)' .claude/usage-log.jsonl > usage-log-anon.jsonl
  ```
- **Retention**: Auto-delete after 90 days (configurable)
- **Opt-out**: Set `DX_TRACKING_DISABLED=1` to skip logging

## Troubleshooting

**No logs being written**:
- Verify hook is enabled in `.claude/settings.json`
- Check `.claude/usage-log.jsonl` file permissions: `ls -la .claude/`
- Run test: `echo '{"test": 1}' | bash .claude/hooks/usage-tracker.sh`

**Logs growing too fast**:
- Increase `rotation_size_mb` or decrease `retention_days`
- Verify hook is actually async (should not block Claude Code)

**Missing skill_name**:
- Wrap skill code with `export CLAUDE_ACTIVE_SKILL="skill-name"`
- Or add skill name to `.claude/settings.json` context

---

