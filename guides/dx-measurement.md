# Developer Experience Measurement Guide

Measuring developer experience (DX) in Claude Code adoption requires systematic collection, aggregation, and analysis of skill usage, session patterns, and feature effectiveness. This guide defines the DX metrics framework and instrumentation patterns.

---

## Why Measure DX

- **Adoption validation**: Are users actually discovering and invoking published skills?
- **Feature ROI**: Which skills save time, reduce errors, or unblock workflows?
- **Bottleneck detection**: Identify friction points (slow skills, confusing docs, missing integrations)
- **Iterative improvement**: Quantify impact of skill updates, new guides, or workflow changes
- **Business case support**: Demonstrate value of Claude Code investment to stakeholders

---

## Metrics Schema

### Core Metrics

| Metric | Definition | Unit | Collection |
|---|---|---|---|
| `invocations` | Number of times a skill was called in a session/period | count | PostToolUse hook |
| `success_rate` | % of skill invocations that completed without error | % (0–100) | PostToolUse + tool exit code |
| `avg_duration_sec` | Average execution time per skill invocation | seconds | PostToolUse timestamp pair |
| `time_saved_min` | Estimated time saved vs. manual execution (user-reported or inferred) | minutes | Session metadata + heuristics |
| `error_rate` | % of invocations resulting in error, timeout, or user retry | % (0–100) | PostToolUse exit status |
| `user_count` | Distinct users invoking the skill | count | Session ID aggregation |
| `adoption_tier` | Classification: `abandoned` (<5 invocations), `low` (5–50), `active` (50–500), `core` (>500) | category | Aggregated invocations |

### Derived Metrics

| Metric | Formula | Interpretation |
|---|---|---|
| **DX Score** | `(success_rate * 0.4) + (adoption_tier_score * 0.3) + (time_saved_relevance * 0.3)` | 0–100: overall health |
| **Productivity Multiplier** | `total_time_saved_per_user / avg_session_duration` | Hours saved per hour of Claude Code use |
| **Friction Index** | `error_rate + (100 - success_rate)` | 0–200: lower is better |

### Session-Level Attributes

Track in `.claude/session-log.md` (created at session start, appended with summary at end):

```markdown
## Session Summary — 2026-06-15T14:30:00Z

**User**: alice@company.com
**Duration**: 47 minutes
**Skills Invoked**: code-review, simplify, deep-research
**Total Tool Calls**: 18
**Errors**: 1 (deep-research timeout on 3rd attempt, retried successfully)
**Time Saved**: ~60 minutes (code-review + simplify auto-fixes saved manual refactor)
**Blocker**: None
**Feedback**: "deep-research should cache search results across retries"
```

---

## Instrumentation Patterns

### 1. PostToolUse Hook (Real-time Logging)

Every tool invocation logs to `.claude/usage-log.jsonl`:

```json
{
  "timestamp": "2026-06-15T14:32:15.234Z",
  "session_id": "sess_7f8a9b2c",
  "user_id": "alice@company.com",
  "skill_name": "code-review",
  "tool_called": "Bash",
  "invocation_num": 3,
  "duration_ms": 2847,
  "exit_code": 0,
  "success": true,
  "tool_output_length": 1247,
  "retry_count": 0
}
```

See `hooks/usage-tracker.md` for implementation.

### 2. Session Log (End-of-Session Summary)

Create `.claude/session-log.md` at session start, append summary at end:

```bash
# Initialize at session start
cat >> .claude/session-log.md << EOF
## Session Summary — $(date -u +"%Y-%m-%dT%H:%M:%SZ")

**User**: $USER
**Skills**: [will update at end]
**Duration**: [will calculate]
**Errors**: [will count]

---
EOF
```

At session end, parse `usage-log.jsonl` to aggregate and append:

```json
{
  "session_id": "sess_7f8a9b2c",
  "user_id": "alice@company.com",
  "start_time": "2026-06-15T13:45:00Z",
  "end_time": "2026-06-15T14:32:47Z",
  "duration_minutes": 47,
  "skills_invoked": ["code-review", "simplify", "deep-research"],
  "total_invocations": 18,
  "total_errors": 1,
  "estimated_time_saved_min": 60,
  "sentiment": "positive"
}
```

### 3. Weekly/Monthly Aggregation

Run `/dx-metrics aggregate` (or `dx-analyst` agent) to produce `.claude/dx-scorecard.json`:

```json
{
  "period": "2026-06-08T00:00:00Z/2026-06-15T00:00:00Z",
  "metrics": {
    "code-review": {
      "invocations": 47,
      "success_rate": 97.9,
      "avg_duration_sec": 18.3,
      "error_rate": 2.1,
      "user_count": 12,
      "adoption_tier": "active",
      "time_saved_min": 891
    },
    "simplify": {
      "invocations": 31,
      "success_rate": 100,
      "avg_duration_sec": 12.1,
      "error_rate": 0,
      "user_count": 9,
      "adoption_tier": "active",
      "time_saved_min": 403
    },
    "deep-research": {
      "invocations": 8,
      "success_rate": 75.0,
      "avg_duration_sec": 45.7,
      "error_rate": 25.0,
      "user_count": 4,
      "adoption_tier": "low",
      "time_saved_min": 180
    }
  },
  "summary": {
    "total_users": 22,
    "avg_dx_score": 81.4,
    "total_time_saved_hours": 28.2,
    "friction_index": 12.3,
    "top_skill": "code-review",
    "lowest_adoption": "deep-research",
    "recommended_actions": [
      "Improve deep-research retry/caching to reduce 25% error rate",
      "Add session-log best practices guide (only 40% of sessions documented)"
    ]
  }
}
```

---

## Data Collection Architecture

### Files Generated

| File | Purpose | Frequency | Retention |
|---|---|---|---|
| `.claude/usage-log.jsonl` | Raw hook logs (append-only) | Per tool call | 90 days |
| `.claude/session-log.md` | User-visible summary (one per session) | Per session | 30 days (rolled up) |
| `.claude/dx-scorecard.json` | Aggregated metrics snapshot | Weekly/monthly | Indefinite |
| `.claude/dx-scorecard-history.jsonl` | Time series of scorecards | Weekly/monthly | 2 years |

### Collection Flow

```
[Tool invocation] 
    ↓
[PostToolUse hook fires]
    ↓
[usage-tracker.sh appends to usage-log.jsonl]
    ↓
[Session ends]
    ↓
[Session-log summary generated]
    ↓
[Weekly: dx-analyst aggregates into dx-scorecard.json]
    ↓
[Monthly: trends analyzed, improvements proposed]
```

---

## Best Practices

### For Users (Session Logging)

1. **Enable usage tracking** in your project `.claude/settings.json`:
   ```json
   {
     "hooks": {
       "PostToolUse": [{"type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/usage-tracker.sh"}]
     }
   }
   ```

2. **Append session feedback** at the end of each session:
   ```markdown
   ## Feedback

   - **What worked**: code-review found 3 critical bugs in login flow
   - **What was slow**: deep-research timeout on 3rd search (needs retry-limit heuristic)
   - **Missing**: No skill for validating SQL query performance
   - **Time saved**: ~2 hours on refactoring vs. manual code review
   ```

3. **Use consistent skill names** in queries (check `/help` for exact names)

### For Skill Authors

1. **Name skills for introspection**: Use clear, single-purpose names (e.g., `code-review`, not `code-quality-plus`)
2. **Include timing hints in output**: "Analyzed 412 lines in 2.3 seconds"
3. **Report success/failure explicitly**: Exit code 0 = success; non-zero = error (hook captures this)
4. **Document expected duration**: "Typical run time: 30–120 seconds" helps users estimate ROI

### For Org DX Leads

1. **Monthly review cadence**: Aggregate metrics on the first Monday of each month
2. **User feedback loops**: Survey skill users quarterly on friction points
3. **Publish metrics**: Share `.claude/dx-scorecard.json` in team dashboard or wiki
4. **Act on bottlenecks**: If error_rate > 10%, investigate and propose fix within 2 weeks
5. **Celebrate wins**: Share time-saved totals and adoption growth in team syncs

---

## Privacy & Data Governance

- **User anonymization**: Option to aggregate by role/team instead of individual email
- **Retention policy**: Delete raw logs after 90 days; keep aggregated metrics indefinitely
- **Opt-out**: Users can set `DX_TRACKING_DISABLED=1` to skip hook logging
- **Local-only by default**: `.claude/usage-log.jsonl` and `.claude/session-log.md` live in project directory, never uploaded unless explicitly configured

---

## Integration Examples

### Slack Notification (Weekly Digest)

Hook in `.claude/settings.json` to post scorecard to Slack:

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL -d @.claude/dx-scorecard.json"
          }
        ]
      }
    ]
  }
}
```

### GitHub Issues (Bottleneck Tracking)

Auto-create GitHub issues for skills with error_rate > 15%:

```bash
jq '.metrics[] | select(.error_rate > 15)' .claude/dx-scorecard.json | \
  while read skill; do
    gh issue create --title "High error rate: $(echo $skill | jq .name)" \
      --label "dx-bottleneck" \
      --body "Error rate: $(echo $skill | jq .error_rate)%"
  done
```

### Grafana Dashboard

Export time-series metrics to Prometheus for visualization:

```bash
jq '.metrics | to_entries[] | {name: .key, value: .value.success_rate}' \
  .claude/dx-scorecard-history.jsonl | prometheus_remote_write
```

---

## Measurement Checklist

- [ ] Enable `usage-tracker` hook in `.claude/settings.json`
- [ ] Create `.claude/session-log.md` template
- [ ] Schedule weekly DX review (or delegate to `dx-analyst` agent)
- [ ] Document skill names and expected durations in team wiki
- [ ] Set error_rate and adoption_tier thresholds for escalation
- [ ] Share monthly scorecard with team
- [ ] Iterate: adjust metrics based on feedback

---

