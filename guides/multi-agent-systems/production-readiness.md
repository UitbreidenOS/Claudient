# Multi-Agent Systems: Production Readiness Checklist

Comprehensive checklist to ensure a multi-agent system is production-ready — covering observability, reliability, cost control, and incident response.

---

## Pre-Deployment Checklist

### Architecture

- [ ] Agents have non-overlapping roles (no domain overlap)
- [ ] Tool access is least-privilege (each agent has only needed tools)
- [ ] Orchestration topology is documented (DAG, blackboard, supervisor, etc.)
- [ ] Circular dependencies detected and rejected
- [ ] Timeout and retry policies defined for all agents
- [ ] Failure recovery strategy defined (retry, escalate, compensate)

### Testing

- [ ] Unit tests for each agent (mocked tools)
- [ ] Integration tests for agent handoffs (with real inter-agent communication)
- [ ] End-to-end tests for full workflows (50+ test cases)
- [ ] Chaos testing: inject agent failures, network delays, timeouts
- [ ] Load testing: verify performance with concurrent requests
- [ ] Cost simulation: estimate tokens/cost for typical workflows

### State Management

- [ ] Blackboard schema defined and validated
- [ ] State persistence mechanism (file, DB) tested
- [ ] Version tracking and conflict resolution tested
- [ ] Lock mechanism prevents concurrent writes
- [ ] Recovery from partial failures tested

### Observability

- [ ] Trace correlation ID propagated through all agent calls
- [ ] Logging covers all critical paths (success, retry, failure, escalation)
- [ ] Metrics collected for latency, tokens, cost
- [ ] Agent call telemetry exported (Datadog, Prometheus, etc.)
- [ ] Sampling strategy defined (100% trace or sample?). If sample, what rate?

### Reliability

- [ ] Timeouts set for all agent calls (with monitoring alerts)
- [ ] Retry logic with exponential backoff (max 3 attempts)
- [ ] Dead letter queue for unrecoverable failures
- [ ] SLO defined for availability and latency
- [ ] Error budget calculated and monitored
- [ ] Escalation paths defined (email, Slack, PagerDuty)

### Cost Control

- [ ] Token budget defined per agent and total
- [ ] Cost alerts set (warn if > 80% of budget, error if > 100%)
- [ ] Model selection optimized (use Haiku where possible, Opus only when needed)
- [ ] Caching strategy defined (reuse results for same inputs)
- [ ] Input tokenization audit (don't pass unnecessary context)

### Documentation

- [ ] README explains orchestration flow with diagram
- [ ] Agent roles documented (purpose, domain, tools, SLA)
- [ ] Troubleshooting guide for common failures
- [ ] Runbook for incident response and escalation
- [ ] Developer guide for adding new agents or workflows

---

## Monitoring and Alerting

### Key Metrics

**Availability:**
```
success_rate = (successful_runs / total_runs) × 100%
Target: 99.5% (0.5% error budget)
Alert threshold: < 95%
```

**Latency:**
```
p50_latency_ms = 50th percentile of run duration
p99_latency_ms = 99th percentile of run duration
Target: p99 < 5 minutes
Alert threshold: p99 > 4 minutes
```

**Cost:**
```
cost_per_run_cents = total_tokens × cost_per_token
Target: < $1.00 per run
Alert threshold: > $0.80 per run
```

**Agent-specific:**
```
For each agent:
├─ call_count (total calls made)
├─ success_rate (% successful)
├─ avg_latency_ms
├─ p99_latency_ms
├─ avg_tokens
└─ cost_cents
```

### Alert Rules

```json
{
  "alerts": [
    {
      "name": "success_rate_low",
      "condition": "success_rate < 95%",
      "severity": "page",
      "window": "5 minutes"
    },
    {
      "name": "latency_spike",
      "condition": "p99_latency_ms > 4 minutes",
      "severity": "warning",
      "window": "5 minutes"
    },
    {
      "name": "cost_spike",
      "condition": "cost_per_run_cents > 80",
      "severity": "warning",
      "window": "1 hour"
    },
    {
      "name": "agent_timeout",
      "condition": "agent.latency_ms > timeout_ms × 0.9",
      "severity": "warning",
      "window": "5 minutes"
    },
    {
      "name": "error_budget_depleted",
      "condition": "error_budget_remaining < 0.1%",
      "severity": "critical",
      "window": "1 day"
    }
  ]
}
```

---

## Incident Response

### Incident Severity Definitions

**SEV1: Complete Outage**
- Success rate < 90% OR latency > 10 minutes
- Impact: Users cannot complete workflows
- Response time: < 5 minutes
- Escalation: Page all on-call engineers

**SEV2: Significant Degradation**
- Success rate 90-95% OR latency > 5 minutes
- Impact: Some users affected, partial functionality
- Response time: < 15 minutes
- Escalation: Page on-call engineer

**SEV3: Minor Issues**
- Success rate > 95% AND latency < 5 minutes
- Cost spike (> 50% above baseline)
- Impact: Minor, workaround available
- Response time: < 1 hour
- Escalation: Log to Slack, handle in business hours

### Runbook: SEV1 Response

```
1. DECLARE INCIDENT (1 min)
   └─ Page on-call engineer
   └─ Create #incidents thread
   └─ Assign incident commander (IC)

2. ASSESS IMPACT (5 min)
   └─ Which workflows failing? (% affected)
   └─ Which agents failing?
   └─ How long has this been happening?
   └─ Revenue impact?

3. INVESTIGATE (5-15 min)
   ├─ Check agent logs (recent calls)
   ├─ Check blackboard state (coherent?)
   ├─ Check infrastructure (uptime, latency)
   ├─ Check dependencies (APIs we call)
   └─ Check model availability (is Anthropic API up?)

4. MITIGATE (5-30 min, choose fastest)
   ├─ Option A: Feature flag disable (instant)
   ├─ Option B: Rollback agent (rollback from main)
   ├─ Option C: Scale up resources (if capacity issue)
   └─ Option D: Hotfix (if simple code fix)

5. VERIFY RECOVERY (5 min)
   ├─ Monitor metrics for 30 minutes
   ├─ When success_rate > 99%, declare recovered
   └─ If still failing, loop back to INVESTIGATE

6. COMMUNICATE
   ├─ Internal updates every 30 minutes
   └─ Customer status page update
```

### Common Causes and Fixes

**Agent timeout (single agent slow):**
```
Root cause: System prompt too verbose, or model slow
Fix:
  1. Check model/temperature settings
  2. Trim system prompt (remove verbose preamble)
  3. Reduce input size (fewer context tokens)
  4. Lower timeout threshold and fail fast
```

**State inconsistency (blackboard corrupted):**
```
Root cause: Concurrent write conflict not detected
Fix:
  1. Read last consistent blackboard snapshot
  2. Roll back to known-good version
  3. Replay pending tasks from snapshot
  4. Investigate conflict detection logic
```

**Cost spike (tokens exceeded budget):**
```
Root cause: Longer inputs, retry storms, or model change
Fix:
  1. Add input size limit (truncate context)
  2. Add token budget enforcement (fail fast if > 80%)
  3. Switch to cheaper model (Haiku instead of Opus)
  4. Implement caching (reuse results for same inputs)
```

**Orchestration deadlock (agents waiting forever):**
```
Root cause: Circular dependency or agent not proceeding
Fix:
  1. Check orchestration DAG for cycles
  2. Check agent logs (is it hung or just slow?)
  3. Force timeout and escalate
  4. Review dependency graph and remove cycles
```

---

## Deployment Strategy

### Canary Deployment

```
Phase 1: Deploy to canary (5% traffic)
├─ Monitor success rate, latency, cost
├─ Target: 1 hour
└─ If metrics stable → proceed to phase 2

Phase 2: Deploy to 25% traffic
├─ Monitor for 1 hour
└─ If metrics stable → proceed to phase 3

Phase 3: Deploy to 100% traffic
├─ Monitor for 4 hours
└─ If metrics stable → mark as GA
```

### Rollback Plan

```
If metrics degrade during canary:
├─ Revert to previous agent version
├─ Revert to previous orchestration config
└─ If revert succeeds, declare safe

Keep last 5 agent versions in production (rollback-ready).
```

---

## Cost Optimization

### Model Selection by Agent

| Agent Type | Purpose | Recommended Model | Reason |
|-----------|---------|-------------------|--------|
| Classifier | Tag or categorize input | Haiku | Fast, cheap, low reasoning |
| Summarizer | Condense text | Sonnet | Balanced speed/quality |
| Reasoner | Complex analysis | Opus | Reasoning, synthesis |
| Retriever | Search/lookup | Haiku | Low reasoning |

### Token Reduction Strategies

1. **Truncate context:** Pass only the last N tokens (not full history)
2. **Summarize history:** Instead of full context, pass summary + last 3 turns
3. **Cache results:** Reuse agent outputs for identical inputs
4. **Batch processing:** Process multiple requests together (amortize overhead)

### Example: Cost Optimization

```
Before:
├─ Average tokens per run: 12,000
├─ Cost per run: $1.20
├─ Cost for 10,000 runs/month: $12,000

Optimizations:
├─ Switch researcher from Opus to Sonnet: -30% tokens
├─ Implement caching (80% cache hit rate): -80% calls
├─ Truncate context to 500 tokens max: -50% tokens

After:
├─ Average tokens per run: 2,400 (80% saved on 80% of calls)
├─ Cost per run: $0.24
├─ Cost for 10,000 runs/month: $2,400
└─ Savings: $9,600/month (80% cost reduction)
```

---

## Compliance and Governance

### Audit Logging

All agent decisions and state mutations must be logged:

```json
{
  "timestamp": "2026-06-15T14:20:00Z",
  "request_id": "req_abc123",
  "agent": "decision_agent",
  "action": "approve_order",
  "input": {"order_id": "o_789", "amount": 299.99},
  "output": {"approved": true, "reason": "..."},
  "model": "claude-opus-4-20250514",
  "tokens_used": 450,
  "cost_cents": 12
}
```

Location: `.claude/audit-log.jsonl` (append-only, tamper-evident hashing).

### Data Privacy

- [ ] Agent prompts do not include PII without masking
- [ ] Agent outputs do not leak user data
- [ ] Conversation history encrypted at rest
- [ ] Access logs for who queried what and when
- [ ] Retention policy (delete old traces after 90 days)

### Safety Constraints

- [ ] Agent output validated against safety guardrails
- [ ] Dangerous actions (delete, modify) require explicit approval
- [ ] Jailbreak attempts detected and logged
- [ ] Rate limiting prevents abuse (max N requests per user per hour)

---

## Long-Term Operations

### Continuous Improvement

1. **Weekly reviews:**
   - Check error rate, latency, cost trends
   - Review top 10 errors and failures
   - Plan optimizations for next week

2. **Monthly reviews:**
   - Analyze error budget burn rate
   - Review agent performance (which agent contributes most to latency/cost?)
   - Plan architectural improvements

3. **Quarterly reviews:**
   - Compare metrics to SLO targets
   - Plan model upgrades (new Claude versions)
   - Evaluate new agents or workflows

### Runbook Updates

After every SEV1 or SEV2 incident:
1. Document root cause in RCA
2. Update runbook with prevention/recovery steps
3. Train team on new procedures
4. Add regression test case

---
