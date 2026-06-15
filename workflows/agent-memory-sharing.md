# Agent Memory Sharing Workflow

Implements blackboard pattern for shared state among multiple agents — defines handoff protocols, memory schemas, and consistency guarantees for collaborative multi-agent workflows.

---

## When to use

- Multi-agent workflows where agents must reference or modify shared state (not just sequential handoff)
- Complex systems where agents have overlapping domains requiring visibility into each other's work
- Workflows where one agent's output must be immediately visible to multiple agents
- Scenarios requiring memory reconciliation or conflict resolution among agents

Do not use for purely sequential workflows, single-agent systems, or workflows where agents never access shared state.

---

## Blackboard Pattern

The blackboard is a shared, mutable data structure accessible to all agents. It serves as the single source of truth for task state:

```json
{
  "session_id": "sess_xyz789",
  "blackboard": {
    "task_id": "research_and_synthesize",
    "status": "running",
    "created_at": "2026-06-15T14:00:00Z",
    "agents_participating": ["researcher", "analyst", "writer"],
    "shared_state": {
      "research_phase": {
        "topic": "Quantum Computing in 2026",
        "started_by": "researcher",
        "status": "completed",
        "sources": [
          {"title": "...", "url": "...", "agent_notes": "credible"}
        ],
        "research_summary": "...",
        "completed_at": "2026-06-15T14:15:00Z"
      },
      "analysis_phase": {
        "started_by": "analyst",
        "status": "in_progress",
        "analysis_findings": [
          {"topic": "Hardware", "finding": "..."},
          {"topic": "Software", "finding": "..."}
        ],
        "current_agent": "analyst"
      },
      "synthesis_phase": {
        "status": "pending",
        "estimated_start": "2026-06-15T14:30:00Z"
      },
      "metadata": {
        "iteration": 1,
        "conflicts_resolved": 0,
        "last_modified_by": "analyst",
        "last_modified_at": "2026-06-15T14:20:15Z"
      }
    }
  }
}
```

**Blackboard responsibilities:**
- One source of truth for multi-agent workflows
- Agent reads happen *before* writes (check current state, then update)
- Timestamped writes for audit trail
- Owner field tracks which agent made the last write to each section
- Agents never assume consistency — always read before acting

---

## Handoff Protocol

When an agent hands off to another, it must:

1. **Finalize its work:**
   ```json
   {
     "agent": "researcher",
     "action": "finalize_phase",
     "phase": "research_phase",
     "data": {
       "sources": [...],
       "summary": "...",
       "status": "completed"
     },
     "next_agent": "analyst",
     "handoff_timestamp": "2026-06-15T14:15:30Z"
   }
   ```

2. **Write to blackboard with conflict check:**
   - Read current blackboard state
   - Detect conflicts (did another agent modify this section since I started?)
   - If conflict: escalate to supervisor, do not overwrite
   - If no conflict: write with timestamp and agent name

3. **Signal readiness:**
   ```json
   {
     "phase_name": "research_phase",
     "status": "completed",
     "ready_for": "analyst",
     "blocking_issues": []
   }
   ```

4. **Receive acknowledgment:**
   Wait for next agent to read the handoff before exiting. Timeout after 30 seconds.

---

## State Schema

The blackboard uses a strict schema for each phase:

```typescript
interface PhaseState {
  name: string;           // phase identifier
  status: "pending" | "in_progress" | "completed" | "failed";
  started_by: string;     // agent name
  started_at: ISO8601;
  completed_at?: ISO8601;
  owner: string;          // current owner agent
  data: object;           // phase-specific payload
  version: number;        // increment on each write
  conflicts?: Conflict[]; // unresolved conflicts
}

interface Conflict {
  detected_at: ISO8601;
  type: "write_conflict" | "data_inconsistency" | "state_mismatch";
  details: string;
  resolver_agent?: string;
  resolution?: string;
}
```

**Rules:**
- Every write increments `version`
- Agents must check version before writing (compare to version read at start)
- If version has changed, re-read before writing
- Conflicts are never silently overwritten

---

## Memory Reconciliation

When agents disagree on shared state:

1. **Detect:** Agent detects version mismatch or data inconsistency
   ```
   I read sources = [A, B, C] at version 5
   Current version is 7 (analyst added [D, E])
   ```

2. **Report to supervisor:**
   ```json
   {
     "conflict_type": "write_conflict",
     "phase": "research_phase",
     "agent_view": {"sources": [A, B, C], "version": 5},
     "blackboard_view": {"sources": [A, B, C, D, E], "version": 7},
     "resolution": "merge_sources"
   }
   ```

3. **Supervisor decides:**
   - Accept blackboard version (ignore local changes)
   - Merge changes (add new sources to my list)
   - Escalate (human review required)
   - Rollback (revert blackboard to previous version)

4. **Update memory:**
   ```json
   {
     "conflict_id": "conf_123",
     "resolution_type": "merge_sources",
     "merged_sources": [A, B, C, D, E],
     "resolver_agent": "supervisor",
     "resolved_at": "2026-06-15T14:22:00Z"
   }
   ```

---

## Handoff Packet Schema

When an agent passes work to another:

```json
{
  "handoff_id": "hof_abc789",
  "from_agent": "researcher",
  "to_agent": "analyst",
  "phase": "research_phase",
  "timestamp": "2026-06-15T14:15:30Z",
  "work_summary": "Collected 12 sources on quantum computing. Organized by topic.",
  "deliverables": {
    "sources": [...],
    "summary": "...",
    "open_questions": ["Q1", "Q2"]
  },
  "constraints_for_next_agent": [
    "Do not contradict findings from sources A, B, C",
    "Budget 15 minutes for analysis phase"
  ],
  "prerequisite_status": {
    "complete": true,
    "blockers": [],
    "assumptions": ["Internet connectivity available"]
  }
}
```

**Acknowledgment from next agent:**
```json
{
  "handoff_id": "hof_abc789",
  "acknowledged_by": "analyst",
  "timestamp": "2026-06-15T14:15:45Z",
  "ready_to_proceed": true
}
```

---

## Consistency Guarantees

The blackboard provides **eventual consistency**:

- **Within a phase:** All reads see the latest write by the current phase owner
- **Cross-phase:** Agent reading another agent's phase data sees the last finalized version
- **Conflict resolution:** All agents eventually agree on the merged state (no silent overwrites)
- **No dirty reads:** Agents never read in-progress work from other agents (only completed phases)

To achieve this:
1. Finalize every phase before handing off
2. Use version numbers to detect stale reads
3. Escalate conflicts to a supervisor
4. Log all reads/writes to audit trail (`.claude/blackboard-audit.jsonl`)

---

## Example

**Research + Analysis + Synthesis workflow:**

```
Researcher              Analyst               Writer
   |                      |                      |
   |-- read blackboard     |                      |
   |   (empty)             |                      |
   |                       |                      |
   |-- research sources    |                      |
   |                       |                      |
   |-- write to            |                      |
   |   blackboard:         |                      |
   |   sources[1..12]      |                      |
   |   status: completed   |                      |
   |                       |                      |
   |-- signal done ------> |                      |
   |                       |                      |
   |                       |-- read blackboard    |
   |                       |   (sources present)  |
   |                       |                      |
   |                       |-- analyze findings  |
   |                       |                      |
   |                       |-- write to          |
   |                       |   blackboard:       |
   |                       |   analysis[A,B,C]  |
   |                       |   status: completed|
   |                       |                      |
   |                       |-- signal done ----> |
   |                       |                      |
   |                       |                      |-- read blackboard
   |                       |                      |   (sources + analysis)
   |                       |                      |
   |                       |                      |-- synthesize report
   |                       |                      |
   |                       |                      |-- write to blackboard:
   |                       |                      |   report, status: done
```

**Conflict scenario:** Analyst adds new sources while Researcher is still adding sources.

```
Researcher:  version=5, sources=[A,B,C]
Analyst:     version=7, sources=[A,B,C,D,E]

Researcher detects mismatch.
Escalates to Supervisor.

Supervisor decides: MERGE
Result: sources=[A,B,C,D,E] (Analyst's additions preserved)
```

---
