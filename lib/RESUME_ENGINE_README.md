# Resume Engine

Smart resume logic for interrupted or failed runs. Detects execution state, verifies consistency, and routes to appropriate recovery handlers.

## Overview

Resume Engine provides a sophisticated framework for handling three execution scenarios:

1. **Successful completion** → Start fresh run
2. **Failed execution** → Retry with fallback strategy or manual intervention
3. **Interrupted execution** → Resume from exact checkpoint (if safe)

## Core Concepts

### Execution States

Four possible states detected from previous runs:

```javascript
ExecutionState.SUCCESS      // Exited cleanly (code 0)
ExecutionState.FAILED       // Non-zero exit code
ExecutionState.INTERRUPTED  // Killed by signal or incomplete checkpoint
ExecutionState.UNKNOWN      // Cannot determine state
```

### Recovery Strategies

Six recovery approaches:

```javascript
RecoveryStrategy.RESUME_FROM_CHECKPOINT   // Continue from saved checkpoint
RecoveryStrategy.RETRY_LAST_TASK          // Re-execute last failed task
RecoveryStrategy.RETRY_WITH_FALLBACK      // Retry with different approach
RecoveryStrategy.SKIP_AND_CONTINUE        // Skip failed task, move to next
RecoveryStrategy.RESTART_FRESH            // Start workflow from beginning
RecoveryStrategy.MANUAL_INTERVENTION      // Requires human review
```

### Safety Checks

Resume Engine performs three critical verifications before resuming:

1. **Goal Consistency** → Ensures original goal hasn't changed
2. **Repository State** → Detects branch switches, uncommitted changes
3. **Conflict Detection** → Identifies high-risk resume scenarios

## API Reference

### State Detection

#### `detectExecutionState(options)`

Analyzes previous run and determines what happened.

```javascript
const state = ResumeEngine.detectExecutionState({
  previousExitCode: 1,           // Exit code from last run
  previousSignal: 'SIGTERM',     // If killed by signal
  hasCheckpoint: true,           // State file exists
  errorLog: [...],               // Error entries
  completedTasks: 3,             // Tasks completed
  totalTasks: 10                 // Total tasks to do
});

// Output:
// {
//   state: 'interrupted',
//   reason: 'Process terminated by signal: SIGTERM',
//   details: { ... }
// }
```

**Parameters:**
- `previousExitCode` (number|null) - Exit code from previous process
- `previousSignal` (string|null) - Signal that killed process (SIGTERM, SIGINT, etc.)
- `hasCheckpoint` (boolean) - Whether checkpoint file exists
- `errorLog` (array) - Previous error log entries
- `completedTasks` (number) - Tasks already completed
- `totalTasks` (number) - Total tasks in workflow

**Returns:** `{ state, reason, details }`

---

#### `verifyGoalConsistency(previousGoal, currentGoal)`

Ensures goal hasn't fundamentally changed between runs.

```javascript
const check = ResumeEngine.verifyGoalConsistency(
  'Fix authentication bug in login flow',
  'Implement new payment gateway'
);

// Output:
// {
//   consistent: false,
//   changes: [
//     'Length changed: 45 → 37 characters',
//     'Removed keywords: authentication, login',
//     'Added keywords: payment, gateway'
//   ],
//   warning: 'Goal has changed. Previous: "Fix auth..." → Current: "Implement..."'
// }
```

**Returns:** `{ consistent, changes[], warning }`

---

#### `detectConflictingChanges(options)`

Scans repo for changes that might conflict with resume.

```javascript
const conflicts = ResumeEngine.detectConflictingChanges({
  uncommittedChanges: ['src/auth.js', 'src/login.tsx'],
  recentCommits: [
    { hash: 'abc123', message: 'Fix bug' },
    { hash: 'def456', message: 'Add feature' }
  ],
  previousBranch: 'main',
  currentBranch: 'feature/new-auth',
  workingDirectoryDirty: true
});

// Output:
// {
//   hasConflicts: true,
//   severity: 'high',
//   conflicts: [
//     'Branch changed: main → feature/new-auth',
//     'Working directory dirty: 2 files modified',
//     'Recent commits detected: 2 commits made'
//   ]
// }
```

**Parameters:**
- `uncommittedChanges` (array) - List of modified files
- `recentCommits` (array) - Recent commits (with hash/message)
- `previousBranch` (string) - Branch from previous run
- `currentBranch` (string) - Current branch
- `workingDirectoryDirty` (boolean) - Has uncommitted changes

**Returns:** `{ hasConflicts, conflicts[], severity }`

---

### Recovery Planning

#### `determineRecoveryStrategy(executionState, goalCheck, repoConflicts)`

Routes to optimal recovery strategy based on state analysis.

```javascript
const strategy = ResumeEngine.determineRecoveryStrategy(
  executionState,  // From detectExecutionState()
  goalCheck,       // From verifyGoalConsistency()
  repoConflicts    // From detectConflictingChanges()
);

// Output:
// {
//   strategy: 'resume_from_checkpoint',
//   reason: 'Clean interruption; resuming from checkpoint',
//   priority: 7
// }
```

**Decision Logic:**
```
If goal changed
  → RESTART_FRESH (priority 10)

If high-severity repo conflicts
  → MANUAL_INTERVENTION (priority 9)

If interrupted + no conflicts
  → RESUME_FROM_CHECKPOINT (priority 7)

If interrupted + medium conflicts
  → SKIP_AND_CONTINUE (priority 6)

If failed
  → RETRY_WITH_FALLBACK (priority 5)

If unknown state
  → MANUAL_INTERVENTION (priority 8)
```

---

#### `validateResumeSafety(executionState, repoConflicts)`

Checks if resuming is safe given current conditions.

```javascript
const safety = ResumeEngine.validateResumeSafety(
  executionState,
  repoConflicts
);

// Output:
// {
//   safe: true,
//   issues: [],
//   recommendations: [
//     'Safe to resume from checkpoint',
//     'Previous run created checkpoint at 15:32 UTC'
//   ]
// }
```

**Returns:** `{ safe, issues[], recommendations[] }`

---

### Session Management

#### `createResumeSession(options)`

Creates a resume session descriptor for audit trail.

```javascript
const session = ResumeEngine.createResumeSession({
  goal: 'Fix authentication bug',
  lastTaskId: 'task-123',
  lastTaskName: 'Implement email validation',
  checkpointPath: '/project/.claude/dont-stop-state.json',
  recoveryStrategy: 'resume_from_checkpoint',
  errorContext: [{ timestamp: '...', message: 'Connection timeout' }]
});

// Output:
// {
//   id: 'resume-1718988845123-a1b2c3d',
//   goal: 'Fix authentication bug',
//   lastTaskId: 'task-123',
//   lastTaskName: 'Implement email validation',
//   recoveryStrategy: 'resume_from_checkpoint',
//   createdAt: '2024-06-22T15:32:45.123Z',
//   metadata: { agent: 'claude-code', model: 'claude-opus' }
// }
```

---

#### `saveResumeMetadata(metadata)`

Persists resume metadata to `.claude/resume-metadata.json`.

```javascript
ResumeEngine.saveResumeMetadata({
  exitCode: 1,
  signal: null,
  branch: 'main',
  lastTaskId: 'task-123',
  goal: 'Fix bug',
  timestamp: new Date().toISOString()
});
```

---

#### `loadResumeMetadata()`

Loads resume metadata from disk (if exists).

```javascript
const metadata = ResumeEngine.loadResumeMetadata();
if (metadata) {
  console.log(`Last run: ${metadata.goal}`);
  console.log(`Exit code: ${metadata.exitCode}`);
}
```

---

### Reporting

#### `generateResumeReport(options)`

Produces formatted report for logging/debugging.

```javascript
const report = ResumeEngine.generateResumeReport({
  executionState,
  goalCheck,
  repoConflicts,
  recoveryStrategy,
  resumeSession
});

console.log(report);
// Output:
// === RESUME ENGINE REPORT ===
//
// EXECUTION STATE: interrupted
//   Reason: Process terminated by signal: SIGTERM
//   Details: {...}
//
// GOAL CONSISTENCY: CONSISTENT
//
// REPOSITORY CONFLICTS: NONE
//
// RECOVERY STRATEGY: resume_from_checkpoint
//   Reason: Clean interruption; resuming from checkpoint
//   Priority: 7/10
//
// RESUME SESSION: resume-1718988845123-a1b2c3d
//   Strategy: resume_from_checkpoint
//   Last Task: Implement email validation
//   Created: 2024-06-22T15:32:45.123Z
```

---

#### `clearResumeMetadata()`

Cleans up after successful completion (removes resume file).

```javascript
ResumeEngine.clearResumeMetadata();
```

---

## Integration Pattern

Typical workflow using Resume Engine:

```javascript
const ResumeEngine = require('./resume-engine');
const StateManager = require('./state-manager');

async function robustWorkflow() {
  // 1. Detect previous state
  const executionState = ResumeEngine.detectExecutionState({
    previousExitCode: 1,
    hasCheckpoint: true,
    completedTasks: 3,
    totalTasks: 10
  });

  // 2. Verify safety
  const goalCheck = ResumeEngine.verifyGoalConsistency(
    'Complete feature X',
    'Complete feature X'  // Same goal
  );

  const conflicts = ResumeEngine.detectConflictingChanges({
    uncommittedChanges: [],
    recentCommits: [],
    previousBranch: 'main',
    currentBranch: 'main',
    workingDirectoryDirty: false
  });

  // 3. Determine recovery
  const strategy = ResumeEngine.determineRecoveryStrategy(
    executionState,
    goalCheck,
    conflicts
  );

  console.log(`Recovery: ${strategy.strategy}`);
  console.log(`Reason: ${strategy.reason}`);

  // 4. Apply strategy
  switch (strategy.strategy) {
    case ResumeEngine.RecoveryStrategy.RESUME_FROM_CHECKPOINT: {
      // Resume from saved state
      const state = StateManager.resume();
      // Continue from state.currentTask
      break;
    }

    case ResumeEngine.RecoveryStrategy.RETRY_WITH_FALLBACK: {
      // Retry last task with different approach
      const state = StateManager.resume();
      // Re-execute last task with modified params
      break;
    }

    case ResumeEngine.RecoveryStrategy.RESTART_FRESH: {
      // Start over
      ResumeEngine.clearResumeMetadata();
      const state = StateManager.initializeState('Complete feature X');
      break;
    }

    case ResumeEngine.RecoveryStrategy.MANUAL_INTERVENTION: {
      // Show report and exit
      console.log(ResumeEngine.generateResumeReport({
        executionState,
        goalCheck,
        conflicts,
        strategy
      }));
      throw new Error('Resume requires manual review');
    }
  }

  // 5. Execute workflow...
  // 6. On success: ResumeEngine.clearResumeMetadata()
  // 7. On failure: ResumeEngine.saveResumeMetadata({ ... })
}
```

## Common Scenarios

### Scenario 1: Clean Interruption (SIGTERM)

**Situation:** Workflow interrupted by kill signal, no repo changes.

```javascript
const state = detectExecutionState({
  previousSignal: 'SIGTERM',      // ← Signal detected
  hasCheckpoint: true,
  completedTasks: 5,
  totalTasks: 10
});

const check = verifyGoalConsistency('goal', 'goal');
const conflicts = detectConflictingChanges({
  uncommittedChanges: [],
  recentCommits: [],
  currentBranch: 'main',
  previousBranch: 'main'
});

const strategy = determineRecoveryStrategy(state, check, conflicts);
// → strategy.strategy === 'resume_from_checkpoint'
// → Continue from task #6
```

### Scenario 2: Failed with Goal Change

**Situation:** Workflow failed, goal was changed.

```javascript
const state = detectExecutionState({
  previousExitCode: 1,             // ← Failed
  hasCheckpoint: false
});

const check = verifyGoalConsistency(
  'Fix auth bug',
  'Implement payment gateway'      // ← Changed goal
);
// check.consistent === false

const strategy = determineRecoveryStrategy(state, check, {});
// → strategy.strategy === 'restart_fresh'
// → Discard previous work, restart
```

### Scenario 3: High-Risk Conflicts

**Situation:** Interrupted but significant repo changes detected.

```javascript
const state = detectExecutionState({
  previousSignal: 'SIGTERM',
  hasCheckpoint: true
});

const conflicts = detectConflictingChanges({
  previousBranch: 'main',
  currentBranch: 'feature/breaking-change',  // ← Branch switched
  uncommittedChanges: ['package.json']       // ← Critical file
});
// conflicts.severity === 'high'

const strategy = determineRecoveryStrategy(state, {}, conflicts);
// → strategy.strategy === 'manual_intervention'
// → Requires human review before resume
```

## Testing

Run test suite:

```bash
npm test -- lib/resume-engine.test.js
```

Run integration example:

```bash
node -e "const { exampleUsage } = require('./lib/resume-engine-integration-example'); exampleUsage();"
```

## Constants

All exported constants:

```javascript
ExecutionState.SUCCESS
ExecutionState.FAILED
ExecutionState.INTERRUPTED
ExecutionState.UNKNOWN

RecoveryStrategy.RESUME_FROM_CHECKPOINT
RecoveryStrategy.RETRY_LAST_TASK
RecoveryStrategy.RETRY_WITH_FALLBACK
RecoveryStrategy.SKIP_AND_CONTINUE
RecoveryStrategy.RESTART_FRESH
RecoveryStrategy.MANUAL_INTERVENTION

RESUME_METADATA_FILE  // Path to .claude/resume-metadata.json
```

## Implementation Notes

- **Goal verification:** Uses keyword-based heuristic (simple but effective)
- **Conflict detection:** Assumes git repo available; falls back gracefully
- **Priority scoring:** Higher priority = stronger recommendation to use strategy
- **State file format:** JSON, human-readable for debugging
- **Thread-safe:** All operations are file-based, safe for concurrent reads

## See Also

- `state-manager.js` — Checkpoint/state persistence
- `task-executor.js` — Execute and track individual tasks
- `failure-learner.js` — Learn from failures and suggest strategies
