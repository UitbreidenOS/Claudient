# Multi-Agent Systems: Architecture Patterns

Comprehensive guide to common architectures for multi-agent AI systems, their tradeoffs, and when to use each pattern.

---

## Pattern Selection Matrix

| Pattern | Agents | Complexity | Latency | Fault Tolerance | Use Case |
|---------|--------|-----------|---------|-----------------|----------|
| Sequential Pipeline | 2-5 | Low | N/A (sequential) | None | Linear workflows, no parallelization |
| Parallel Fan-Out | 3-10 | Medium | Reduced | Some | Independent subtasks, merge results |
| DAG Orchestration | 5-100+ | High | Optimized | Good | Complex dependencies, parallelization |
| Blackboard Pattern | 3-20 | Medium | N/A | Moderate | Shared state, collaborative agents |
| Saga Pattern | 3-10 | Medium | N/A | Excellent | Distributed transactions, rollback |
| Supervisor + Subagents | 5-50 | High | Optimized | Excellent | Large teams, clear hierarchy |

---

## Sequential Pipeline

Agents execute one after another, each using the previous output.

```
Input → Agent A → Output A → Agent B → Output B → Agent C → Final Output
```

**When to use:**
- Workflows with strict ordering (cannot parallelize)
- Each agent depends entirely on the previous output
- < 3 agents (simple enough to not need orchestration)

**Implementation:**
```python
result_a = agent_a(user_input)
result_b = agent_b(result_a)
result_c = agent_c(result_b)
return result_c
```

**Tradeoffs:**
- ✓ Simplest to implement and debug
- ✗ Cannot parallelize; total latency = sum of all latencies
- ✗ No fault tolerance (first failure halts everything)

---

## Parallel Fan-Out + Merge

One orchestrator task splits into independent subtasks, then merges results.

```
                ┌─→ Agent A ─┐
Input → Split →├─→ Agent B ─┤→ Merge → Output
                └─→ Agent C ─┘
```

**When to use:**
- Multiple independent subtasks (e.g., research from 3 sources)
- Subtasks can complete in parallel
- Results are mergeable (no complex dependencies)

**Implementation:**
```python
import asyncio

results = await asyncio.gather(
    agent_a(input),
    agent_b(input),
    agent_c(input)
)

merged = merge_results(*results)
return merged
```

**Tradeoffs:**
- ✓ Parallelization reduces latency
- ✓ One agent failure doesn't block others
- ✗ Cannot express partial dependencies (Agent D depends on A and B, but not C)
- ✗ Merge logic can be complex if results conflict

---

## DAG Orchestration

Agents are represented as nodes, dependencies as edges. Execute tasks in topological order.

```
       validate
        /     \
    check    verify
       |       |
    reserve   (merged)
       \     /
       charge → send
```

**When to use:**
- 5+ agents with complex dependencies
- Need to parallelize while respecting partial dependencies
- Want automatic deadlock detection and crash recovery

**Implementation:**
Use topological sort to compute execution lanes (sets of tasks that can run in parallel):

```python
lanes = topological_sort(dag)
# lanes[0] = [validate]
# lanes[1] = [check, verify]
# lanes[2] = [reserve]
# lanes[3] = [charge]
# lanes[4] = [send]

for lane in lanes:
    results = await run_lane_parallel(lane)
    save_state(results)
```

**Tradeoffs:**
- ✓ Optimal parallelization
- ✓ Automatic deadlock detection
- ✓ Can resume from any point (state persistence)
- ✗ More complex to implement
- ✗ Requires formal dependency specification

---

## Blackboard Pattern

Agents read/write a shared data structure (blackboard), coordinating through shared state rather than direct handoffs.

```
                ┌─────────────────┐
                │   Blackboard    │
                │ ┌─────────────┐ │
                │ │ research    │ │
                │ │ analysis    │ │
                │ │ synthesis   │ │
                │ └─────────────┘ │
                └────────┬────────┘
                 ╱      ╲      ╲
        Agent A ───    Agent B   Agent C
```

**When to use:**
- Agents need to coordinate through shared state
- Multiple agents read the same data
- Agents may work on data in non-linear order
- Version consistency and conflict resolution matter

**Implementation:**
```python
# Researcher writes to blackboard
write_phase('research', sources=[...], summary='...')

# Analyst reads from blackboard
research_data = read_phase('research')

# Analyst writes analysis
write_phase('analysis', themes=[...])

# Writer reads both
research = read_phase('research')
analysis = read_phase('analysis')
```

**Tradeoffs:**
- ✓ Flexible coordination (agents don't need to know about each other)
- ✓ Centralized state makes debugging easier
- ✗ Concurrent writes require conflict detection
- ✗ Version management overhead
- ✗ Not suitable for streaming/event-driven workloads

---

## Saga Pattern

Distributed transaction pattern: execute steps forward, and if any step fails, compensate backward.

```
Step 1 → Step 2 → Step 3 (fails) ← Compensate 2 ← Compensate 1
  ✓        ✓        ✗               ✓              ✓
```

**When to use:**
- Each step mutates external state (DB writes, API calls)
- Must be atomic (all steps succeed, or all roll back)
- Cannot use two-phase commit (no distributed locks)
- Steps are idempotent and reversible

**Implementation:**
```python
for step in saga_steps:
    result = run_step(step)
    context[step.output_key] = result
    if result.error:
        # Rollback: run compensations in reverse
        for step in reversed(completed_steps):
            run_compensation(step, context)
        return 'FAILED_AND_ROLLED_BACK'
```

**Tradeoffs:**
- ✓ Handles distributed state mutations
- ✓ Strong rollback guarantees
- ✗ Transient inconsistency (state partially committed)
- ✗ Compensation logic must be written manually
- ✗ Not suitable for workflows with no reversible operations

---

## Supervisor + Subagents

Strict hierarchy: supervisor decomposes tasks and delegates to specialized subagents.

```
             Supervisor
           /    |     \
        Agent A Agent B Agent C
```

**When to use:**
- Clear hierarchical structure (one orchestrator, many specialized agents)
- Need centralized resource enforcement (budgets, timeouts)
- Need quality gates and validation between steps
- Agents should not communicate directly with each other

**Implementation:**
```python
class Supervisor:
    def decompose(self, request):
        return [task_1, task_2, task_3]
    
    def delegate(self, task):
        result = spawn_agent(task.agent, task.input)
        self.validate(result)
        return result
    
    def orchestrate(self, request):
        tasks = self.decompose(request)
        results = []
        for task in tasks:
            result = self.delegate(task)
            results.append(result)
        return self.assemble(results)
```

**Tradeoffs:**
- ✓ Clear role boundaries
- ✓ Centralized resource enforcement
- ✓ Supervisor can validate and retry
- ✗ Supervisor becomes a bottleneck
- ✗ Less flexible (agents cannot communicate directly)

---

## Comparison: Real-World Example

**Task:** Process an e-commerce order (validate, check inventory, process payment, send confirmation)

### Sequential Pipeline
```python
validate_order(order)
check_inventory(order)
process_payment(order)
send_confirmation(order)
# Total latency: T_v + T_i + T_p + T_c
```

### Parallel Fan-Out
```python
# Impossible: validate must come first, then check/payment in parallel
```

### DAG Orchestration
```
validate (5s) → check (10s), payment (8s) → charge (5s) → send (3s)
# Total latency: 5 + max(10, 8) + 5 + 3 = 23s
# Speedup vs sequential: (5+10+8+5+3) / 23 = 1.7x
```

### Saga Pattern
```
1. Validate order          → success
2. Check inventory         → success, reserve items
3. Process payment         → FAIL (card declined)
   └─ Compensate: release inventory
   └─ Compensate: mark order as cancelled
# Result: Order cancelled, inventory released, no payment
```

### Supervisor + Subagents
```
Supervisor decomposes: [validate, check&pay (parallel), charge, send]
Supervisor delegates to agents, validates outputs
On any failure, retries (up to 2 times) then escalates
```

---

## Anti-Patterns to Avoid

### Fully Connected Mesh

Every agent communicates with every other agent. Leads to unpredictable communication patterns and emergent bugs.

❌ **Bad:**
```
A ←→ B ←→ C ←→ D
↑         ↑
└─────────┘
```

✓ **Good:** Use hierarchy or DAG with explicit dependencies.

### Circular Dependencies

Agent A waits for Agent B, which waits for Agent A. Deadlock.

❌ **Bad:**
```
A → B → A (cycle)
```

✓ **Good:** Use topological sort to detect and reject cycles before execution.

### Silent Failures

Agent fails but orchestrator doesn't know, proceeds with stale data.

❌ **Bad:**
```python
result = agent_call(...)
# No error handling, assume success
return result
```

✓ **Good:**
```python
result = agent_call(...)
if result.status == 'error':
    raise AgentFailure(result.error)
    # or retry, or escalate
```

### Unbounded Retries

Agent fails in a loop, retry forever, never complete.

❌ **Bad:**
```python
while True:
    try:
        return agent_call(...)
    except:
        pass  # Retry forever
```

✓ **Good:**
```python
for attempt in range(max_retries):
    try:
        return agent_call(...)
    except Exception as e:
        if attempt == max_retries - 1:
            escalate(e)
```

---

## Decision Tree

**How many agents?**
- 1-2: Single agent with loops, no orchestration needed
- 3-5: Sequential pipeline or parallel fan-out
- 5-20: DAG orchestration or blackboard pattern
- 20+: Supervisor + subagents with resource enforcement

**Do agents work on shared state?**
- Yes: Blackboard pattern
- No: DAG, saga, or supervisor

**Must preserve atomic transactions?**
- Yes: Saga pattern
- No: DAG or blackboard

**Need automatic parallelization?**
- Yes: DAG orchestration
- No: Sequential or fan-out

**Need strict role boundaries?**
- Yes: Supervisor + subagents
- No: DAG or blackboard

---
