# Agentic Production Runbook

Operational playbook for monitoring, alerting, and recovering multi-agent workflows in production — defines SLOs, incident response, rollback procedures, and escalation paths.

---

## When to use

- Running multi-agent workflows in production handling live user requests or critical batch jobs
- Workflows with SLO requirements (response time, availability, cost)
- Systems that must maintain consistency under partial failures
- Deployments requiring automated recovery or manual escalation procedures

Do not use for experimental or development-only workflows, or single-shot batch jobs with no real-time constraints.

---

## SLOs and Error Budgets

Define availability and performance targets for the multi-agent workflow:

```json
{
  "workflow": "research_and_synthesize",
  "slo_version": "2026-06",
  "slos": [
    {
      "slo_id": "slo_availability",
      "metric": "workflow_success_rate",
      "target": "99.5%",
      "window": "30_days",
      "error_budget_pct": 0.5,
      "alert_threshold": "95%"
    },
    {
      "slo_id": "slo_latency_p99",
      "metric": "workflow_latency_ms",
      "target": 300000,
      "percentile": 99,
      "window": "7_days",
      "alert_threshold": 250000
    },
    {
      "slo_id": "slo_cost",
      "metric": "cost_per_workflow_cents",
      "target": 150,
      "window": "30_days",
      "alert_threshold": 130,
      "direction": "lower_is_better"
    }
  ],
  "error_budget_tracking": {
    "budget_available_pct": 0.42,
    "budget_consumed_pct": 0.08,
    "budget_remaining_days": 28,
    "burn_rate_pct_per_day": 0.0027
  }
}
```

**SLO rules:**
- Availability: percentage of workflows that complete successfully
- Latency: response time from request to final output (p99 is typical)
- Cost: average tokens/API calls per workflow
- Error budget: how much failure is acceptable before paging on-call

---

## Monitoring and Alerting

Real-time metrics collected from `.claude/workflow-metrics.jsonl`:

```json
{
  "metric_id": "metric_xyz789",
  "workflow": "research_and_synthesize",
  "timestamp": "2026-06-15T14:20:00Z",
  "execution_id": "exec_abc123",
  "metrics": {
    "workflow_status": "completed",
    "success": true,
    "latency_ms": 897000,
    "total_tokens": 24200,
    "cost_cents": 145,
    "agent_calls": 3,
    "retries": 0,
    "errors": 0,
    "timeout_count": 0
  },
  "agent_metrics": [
    {
      "agent": "researcher",
      "status": "completed",
      "latency_ms": 929000,
      "input_tokens": 2400,
      "output_tokens": 1850,
      "cost_cents": 78,
      "tool_calls": 5
    },
    {
      "agent": "analyst",
      "status": "completed",
      "latency_ms": 390000,
      "input_tokens": 3100,
      "output_tokens": 1200,
      "cost_cents": 48,
      "tool_calls": 1
    },
    {
      "agent": "writer",
      "status": "completed",
      "latency_ms": 78000,
      "input_tokens": 1800,
      "output_tokens": 890,
      "cost_cents": 19,
      "tool_calls": 0
    }
  ]
}
```

**Alert rules (fire immediately):**

```json
{
  "alerts": [
    {
      "alert_id": "alert_workflow_failure",
      "condition": "success == false",
      "severity": "page",
      "throttle_seconds": 300,
      "action": "page_on_call"
    },
    {
      "alert_id": "alert_latency_spike",
      "condition": "latency_ms > 600000",
      "severity": "warning",
      "throttle_seconds": 600,
      "action": "log_to_slack"
    },
    {
      "alert_id": "alert_cost_spike",
      "condition": "cost_cents > 200",
      "severity": "warning",
      "throttle_seconds": 600,
      "action": "log_to_slack"
    },
    {
      "alert_id": "alert_agent_timeout",
      "condition": "any(agent_metrics.latency_ms > 300000)",
      "severity": "page",
      "action": "page_on_call"
    },
    {
      "alert_id": "alert_error_budget_exceeded",
      "condition": "burn_rate_pct_per_day > 0.01",
      "severity": "critical",
      "action": "page_engineering"
    }
  ]
}
```

---

## Incident Response

When an alert fires, follow this playbook:

### SEV1: Workflow Failure

Complete service outage (success_rate < 90% or latency > 10m).

```
1. DECLARE INCIDENT
   ├─ Page on-call engineer
   ├─ Create #incidents thread
   └─ Assign IC (incident commander)

2. ASSESS IMPACT (5 min)
   ├─ How many workflows failed? (% of traffic)
   ├─ Which agents are failing? (all or specific agent?)
   ├─ How long has this been happening?
   └─ Is it affecting users? (revenue impact?)

3. INVESTIGATE (5-15 min)
   ├─ Check agent logs (last 30 agent calls)
   ├─ Check blackboard state (is state coherent?)
   ├─ Check infrastructure (storage, API rate limits)
   ├─ Check agent model (is model available?)
   └─ Check upstream dependencies (APIs we call, are they down?)

4. MITIGATE (shortest path to user impact reduction)
   ├─ Option A: Disable workflow (feature flag)
   ├─ Option B: Rollback to last known-good agent version
   ├─ Option C: Scale up resources (if capacity issue)
   └─ Option D: Apply emergency hotfix (if simple fix)

5. RESOLVE (after mitigation)
   ├─ Fix root cause (code, config, infrastructure)
   ├─ Deploy fix
   ├─ Verify metrics return to normal
   └─ Schedule post-mortem

6. COMMUNICATE (ongoing)
   ├─ Internal updates every 30 min
   └─ Customer status page updates
```

### SEV2: Agent Timeout or Degradation

One agent consistently slow (latency > 5m) but overall success rate > 90%.

```
1. INVESTIGATE (10 min)
   ├─ Which agent is slow? (check agent_metrics.latency_ms)
   ├─ Is it consistently slow or intermittent?
   ├─ What changed? (new model? new system prompt? new tools?)
   └─ Is it blocking other agents? (is writer waiting for analyst?)

2. MITIGATE
   ├─ Option A: Swap to faster model (Sonnet instead of Opus)
   ├─ Option B: Reduce input size (e.g., fewer sources to analyze)
   ├─ Option C: Add timeout and implement fallback agent
   └─ Option D: Disable the workflow temporarily

3. RESOLVE
   ├─ Root cause analysis
   ├─ Deploy fix
   └─ Test before re-enabling
```

### SEV3: Cost Spike

Workflow cost increased > 50% (cost_cents > 150 for slo_cost=100).

```
1. INVESTIGATE (5 min)
   ├─ Did token count increase? (input_tokens, output_tokens)
   ├─ Did retry count increase? (retries field)
   ├─ Did model change? (e.g., Haiku → Opus)
   └─ Did tool call count increase?

2. MITIGATE
   ├─ Option A: Reduce input context (fewer sources passed to analyst)
   ├─ Option B: Switch to cheaper model (if accuracy acceptable)
   ├─ Option C: Add caching layer (cache research results by topic)
   └─ Option D: Implement token budget (abort if > max_tokens)

3. RESOLVE
   ├─ Optimize system prompts (remove verbose preamble)
   ├─ Optimize input formatting (remove redundant data)
   └─ Add explicit token limit to agent calls
```

---

## Rollback Procedures

### Agent Version Rollback

If a new agent version causes failures:

```bash
# Current production agents
agents/roles/researcher.md@HEAD
agents/roles/analyst.md@HEAD
agents/roles/writer.md@HEAD

# Previous stable version (known to work)
agents/roles/researcher.md@v1.2.3
agents/roles/analyst.md@v1.2.3
agents/roles/writer.md@v1.2.3

# Rollback
git checkout v1.2.3 -- agents/roles/
# Verify in staging
# Deploy to production
```

### Workflow Configuration Rollback

If a blackboard schema or coordination contract change breaks workflows:

```bash
# Current config
workflows/agent-team-kickoff.md@HEAD

# Previous stable config
workflows/agent-team-kickoff.md@v1.1.0

# Rollback
git checkout v1.1.0 -- workflows/agent-team-kickoff.md
# Verify in staging
# Deploy to production
```

**Rollback checklist:**
- [ ] Identify which component is broken
- [ ] Identify previous stable version
- [ ] Verify fix in staging environment (replay 10 recent executions)
- [ ] Perform rollback
- [ ] Monitor metrics for 30 minutes
- [ ] If metrics normal, declare recovered
- [ ] If still failing, escalate to engineering team

---

## Escalation Paths

```
User reports error
       ↓
Alert fires (SEV3: warning)
       ↓
Log to #ops-alerts Slack
       ↓
Wait 10 min for auto-recovery
       ↓
       ├─ Recovered? → Close ticket, schedule RCA
       │
       └─ Still failing?
              ↓
         Alert fires (SEV2: page)
              ↓
         Page on-call engineer
              ↓
         Acknowledge in 5 min?
              ↓
         ├─ YES → Begin mitigation
         │
         └─ NO → Escalate to backup on-call
                ↓
         Page backup engineer
                ↓
         Acknowledge in 5 min?
                ↓
         ├─ YES → Begin mitigation
         │
         └─ NO → Page engineering manager
                ↓
         Declare SEV1
                ↓
         All-hands incident response
```

---

## Post-Incident Review

After every SEV1 or SEV2 incident, schedule a RCA (post-mortem):

```json
{
  "rca_id": "rca_2026_06_15_001",
  "incident_id": "inc_abc123",
  "workflow": "research_and_synthesize",
  "date": "2026-06-15",
  "severity": "SEV1",
  "duration_minutes": 18,
  "impact": {
    "workflows_failed": 847,
    "revenue_lost": 12340
  },
  "timeline": [
    {"time": "14:02", "event": "Alert fired: success_rate < 90%"},
    {"time": "14:05", "event": "On-call paged"},
    {"time": "14:08", "event": "Identified analyst timeout"},
    {"time": "14:15", "event": "Rolled back analyst to v1.2.3"},
    {"time": "14:20", "event": "Metrics recovered"}
  ],
  "root_cause": "Analyst agent system prompt was too verbose, causing token overflow and timeout",
  "contributing_factors": [
    "No token budget enforced at agent level",
    "Analyst timeout not caught by circuit breaker"
  ],
  "action_items": [
    {
      "action": "Add token budget to agent calls (max 5000 tokens)",
      "assigned_to": "alice@example.com",
      "due_date": "2026-06-20"
    },
    {
      "action": "Implement circuit breaker (fail fast after 3 timeouts)",
      "assigned_to": "bob@example.com",
      "due_date": "2026-06-25"
    },
    {
      "action": "Add agent latency SLI to monitoring dashboard",
      "assigned_to": "charlie@example.com",
      "due_date": "2026-06-18"
    }
  ]
}
```

---

## Example: Incident Response

**Incident:** Workflow failure spike on 2026-06-15 at 14:02 UTC.

```
14:02 → Alert fires: "research_and_synthesize success_rate = 85% (target 99.5%)"
14:02 → On-call paged
14:05 → IC (Alice) joins war room
14:05 → IC assess impact: ~800 workflows failed in last 3 minutes
14:07 → IC checks metrics: analyst agent latency spiked to 15 minutes (normal: 6 min)
14:09 → IC checks logs: analyst model API rate limited (hitting OpenAI quota? no, we use Anthropic)
14:10 → IC hypothesis: Analyst system prompt changed in last deploy
14:11 → IC checks git: Analyst prompt was updated 45 min ago
14:12 → IC reviews change: Added extensive reasoning preamble (200 tokens)
14:13 → IC rolls back: git revert HEAD~1 -- agents/roles/analyst.md
14:14 → IC deploys to production
14:15 → IC monitors: latency decreasing, success_rate recovering
14:20 → Metrics normal: latency = 6m, success_rate = 99.6%
14:22 → IC closes incident
14:30 → RCA scheduled for 2026-06-16

Action items:
- Add token budget enforcement (max 5000 input tokens per agent)
- Implement circuit breaker (fail after 3 consecutive timeouts)
- Add pre-deploy validation (max system prompt size 1000 tokens)
```

---
