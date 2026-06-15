# DX Review Workflow — Monthly Cycle

A repeatable workflow for collecting usage metrics, identifying bottlenecks, and proposing improvements to Claude Code skill adoption and effectiveness.

---

## Overview

**Purpose**: Measure and improve developer experience across Claude Code skills and workflows.

**Cadence**: Monthly (first business day of the month)

**Owner**: DX team lead or delegated agent (`dx-analyst`)

**Time**: 45–90 minutes

**Outputs**: 
- Updated `.claude/dx-scorecard.json`
- Bottleneck report
- Improvement proposals
- Team summary email

---

## Phase 1: Data Collection (10 minutes)

### 1.1 Aggregate Usage Logs

Run (or delegate to agent):

```bash
# Aggregate the past month's usage-log.jsonl entries
jq -s 'group_by(.skill_name) | map({
  skill: .[0].skill_name,
  invocations: length,
  success_rate: (map(select(.success == true) | 1) | length / length * 100),
  avg_duration_sec: (map(.duration_ms) | add / length / 1000),
  error_rate: (map(select(.success == false) | 1) | length / length * 100),
  user_count: (map(.user_id) | unique | length),
  last_invoked: max_by(.timestamp).timestamp
})' \
  .claude/usage-log.jsonl > /tmp/usage-agg.json
```

### 1.2 Collect Session Summaries

Parse all `.claude/session-log.md` files from the past month:

```bash
# Extract session metadata
find .claude/session-logs -name "*.md" -mtime -30 -exec \
  jq '.session_id, .user_id, .duration_minutes, .estimated_time_saved_min' {} \; | \
  jq -s '.' > /tmp/session-summary.json
```

### 1.3 Check for Skill Documentation Updates

Review `skills/*/` for any recent additions or changes:

```bash
# List skills added/modified in past month
git log --name-only --since="1 month ago" --pretty=format: skills/ | \
  sort | uniq | grep ".md$"
```

---

## Phase 2: Metrics Analysis (20 minutes)

### 2.1 Calculate Core Metrics

For each skill, compute:

```json
{
  "skill_name": "code-review",
  "period": "2026-06-01/2026-06-30",
  "invocations": 127,
  "unique_users": 18,
  "success_rate": 96.9,
  "avg_duration_sec": 14.2,
  "error_rate": 3.1,
  "adoption_tier": "active",
  "time_saved_min": 1589,
  "friction_index": 3.1,
  "trend_vs_last_month": "+12%",
  "usage_concentration": 0.42,
  "comments": "Steady growth, 96% success rate suggests good documentation"
}
```

**Adoption Tier Formula**:

```python
def adoption_tier(invocations):
  if invocations < 5: return "abandoned"
  if invocations < 50: return "low"
  if invocations < 500: return "active"
  return "core"
```

### 2.2 Identify Anomalies

Flag skills for investigation:

```python
anomalies = []

for skill in metrics:
    # High error rate
    if skill['error_rate'] > 15:
        anomalies.append(f"HIGH_ERROR: {skill['name']} ({skill['error_rate']}%)")
    
    # Sudden drop in usage
    if skill['trend_vs_last_month'] < -25:
        anomalies.append(f"ADOPTION_DROP: {skill['name']} (-{abs(skill['trend'])}%)")
    
    # No recent invocations
    if not skill['last_invoked'] or \
       (now - skill['last_invoked']).days > 30:
        anomalies.append(f"ABANDONED: {skill['name']}")
    
    # Very long average duration (may indicate timeout/retry loop)
    if skill['avg_duration_sec'] > 120:
        anomalies.append(f"SLOW: {skill['name']} ({skill['avg_duration_sec']}s avg)")
```

### 2.3 Calculate Organization-Level Scores

```python
org_metrics = {
    'total_users': len(set(usage.user_id)),
    'total_time_saved_hours': sum(metrics.time_saved_min) / 60,
    'avg_dx_score': weighted_average([
        (m['success_rate'] * 0.4) +
        (adoption_score(m['adoption_tier']) * 0.3) +
        (time_saved_score(m['time_saved_min']) * 0.3)
        for m in metrics
    ]),
    'friction_index': weighted_average([m['friction_index'] for m in metrics]),
    'skills_with_issues': len(anomalies)
}
```

---

## Phase 3: Bottleneck Identification (15 minutes)

### 3.1 Classify Issues

| Category | Threshold | Example | Action |
|---|---|---|---|
| **Critical** | error_rate > 20% OR adoption_drop > 40% | deep-research 25% errors | Fix within 1 week |
| **High** | error_rate 10–20% OR adoption_drop 25–40% | api-generator 12% errors | Plan fix for next sprint |
| **Medium** | error_rate 5–10% OR adoption_drop 10–25% | summarize-docs 7% errors | Add to backlog |
| **Low** | error_rate < 5% AND usage > 50 invocations | All green skills | Monitor |

### 3.2 User Feedback Integration

If available, collect from team:

```bash
# Example: Slack poll question
"Which Claude Code skill would you most like to see improved? 
(A) code-review (B) deep-research (C) simplify (D) other"
```

### 3.3 Build Bottleneck Report

Template:

```markdown
## DX Bottleneck Report — June 2026

### Critical Issues (Fix This Week)

1. **deep-research — 25% error rate**
   - Root cause: Timeout on 3rd API call, no retry backoff
   - Impact: 8 users affected, ~180 min wasted on retries
   - Fix: Implement exponential backoff + max 5 retries
   - ETA: June 21, 2026

### High-Priority Issues (Next Sprint)

1. **api-generator — Adoption drop 35% YoM**
   - Root cause: New async/await patterns in Node 20 not documented
   - Impact: Junior devs avoiding skill, going manual
   - Fix: Update skill doc with 4 examples for async patterns
   - ETA: June 28, 2026

### Positive Trends

- **code-review**: +12% MoM, 97% success, saved 1,589 min (26.5 hours!)
- **simplify**: Consistent 100% success, high satisfaction
- **productivity/verify**: New skill, 18 invocations already
```

---

## Phase 4: Improvement Proposals (20 minutes)

### 4.1 Prioritize Fixes

Use impact × ease matrix:

```
HIGH IMPACT / EASY:
  - Add retry logic to deep-research (2 hrs, fixes 25% error)
  - Document async patterns for api-generator (1 hr, recovers 35% adoption)

HIGH IMPACT / HARD:
  - Redesign verify skill for faster feedback loop (8 hrs, 40% speedup)

LOW IMPACT / EASY:
  - Fix typo in code-review docs (0.5 hr)
```

### 4.2 Template Improvement Proposal

```markdown
## Proposal: Fix deep-research Timeout

**Problem**: Error rate 25%, blocking 8 users monthly

**Solution**: 
- Implement exponential backoff (1s, 2s, 4s, 8s, 16s)
- Add max-retries limit (5)
- Log retry attempts for debugging

**Effort**: 2–3 hours development + testing

**Expected Impact**:
- Error rate reduction: 25% → 5% (80% improvement)
- Time saved: ~180 min / month (10% faster for heavy users)
- Adoption recovery: low → active tier

**Owner**: [Name]
**Target Date**: 2026-06-21
```

### 4.3 Documentation Improvements

Flag docs needing updates:

```bash
# Skills with low adoption + new features
echo "update-guide skills/productivity/api-generator.md \
  —section 'async patterns' (Node 18+)"
```

---

## Phase 5: Reporting & Communication (10 minutes)

### 5.1 Update `.claude/dx-scorecard.json`

Write results from phase 2:

```bash
cat > .claude/dx-scorecard.json << EOF
{
  "period": "2026-06-01/2026-06-30",
  "generated_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "metrics": $(cat /tmp/usage-agg.json),
  "summary": {
    "total_users": ...,
    "avg_dx_score": ...,
    "total_time_saved_hours": ...,
    "friction_index": ...,
    "top_skill": "code-review",
    "lowest_adoption": "deep-research",
    "critical_issues": 1,
    "recommended_actions": [...]
  }
}
EOF
```

### 5.2 Archive History

Append to time-series log for trend analysis:

```bash
echo "$(cat .claude/dx-scorecard.json)" >> .claude/dx-scorecard-history.jsonl
```

### 5.3 Team Summary Email

Template:

```
Subject: Claude Code DX Review — June 2026

Hi team,

Here's this month's Developer Experience snapshot:

📊 Key Metrics:
  • 22 unique users across 47 skill invocations
  • 96% average success rate (↑2% from May)
  • 28.2 hours saved this month (↑15% from May)
  • Friction index: 12.3 / 200 (good)

🏆 Top Skills:
  1. code-review — 127 invocations, 97% success, 26.5 hrs saved
  2. simplify — 84 invocations, 100% success, 14.1 hrs saved
  3. deep-research — 18 invocations, 75% success, 3.0 hrs saved

⚠️ Bottleneck:
  • deep-research has 25% error rate (retries needed)
  • Fix proposed for June 21

💡 Coming Next:
  • Async/await pattern docs for api-generator (recovers adoption)
  • Session-log best practices guide

Questions? Discuss at July 1 standup.

—DX Team
```

### 5.4 Create GitHub Issues (Optional)

Auto-create from `recommended_actions`:

```bash
jq '.summary.recommended_actions[]' .claude/dx-scorecard.json | \
while read action; do
  gh issue create --title "DX Action: $action" \
    --label "dx" --label "process"
done
```

---

## Phase 6: Follow-Up (Async)

### 6.1 Weekly Check-ins

Every Monday, briefly scan for new errors:

```bash
# Check if any new errors since Friday
jq 'select(.timestamp > "2026-06-14T00:00:00Z" and .success == false)' \
  .claude/usage-log.jsonl | wc -l
```

If > 5 errors, escalate.

### 6.2 Two-Week Review

After fixes are merged, measure impact:

```bash
# Compare error rate before/after
jq '.metrics["deep-research"].error_rate' \
  .claude/dx-scorecard-history.jsonl | tail -2
# Expected: [25.0, 5.0]
```

---

## Automation & Delegation

### Delegate to dx-analyst Agent

This entire workflow can be run automatically:

```bash
/spawn dx-analyst --period "2026-06-01/2026-06-30" --generate-report
```

See `agents/roles/dx-analyst.md`.

### Schedule Recurring

Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "day-of-week == 1 && hour == 9",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Monthly DX review due today. Run: /spawn dx-analyst --period last-month'"
          }
        ]
      }
    ]
  }
}
```

---

## Metrics Glossary

- **adoption_tier**: engagement level (abandoned, low, active, core)
- **friction_index**: error_rate + (100 - success_rate); lower is better
- **time_saved_min**: estimated user time recovered via skill automation
- **trend_vs_last_month**: % change in invocations YoY
- **usage_concentration**: Herfindahl index (0–1); closer to 0 = evenly distributed use

---

## Checklist

- [ ] Run aggregation script (or spawn dx-analyst agent)
- [ ] Identify anomalies and classify by severity
- [ ] Write bottleneck report (copy template)
- [ ] Propose 3–5 concrete improvements
- [ ] Update `.claude/dx-scorecard.json`
- [ ] Append to history for trend analysis
- [ ] Send team summary email
- [ ] Create GitHub issues for critical fixes
- [ ] Schedule follow-up for 2 weeks post-fix

---

