# Resume Engine — Quick Reference

## One-Minute Overview

Resume Engine detects why a previous run stopped and chooses the best recovery action:

```
Previous Run Failed/Stopped?
│
├─ Detect State ──→ Success | Failed | Interrupted | Unknown
│
├─ Verify Goal ──→ Changed? | Consistent?
│
├─ Check Repo ──→ Branch switch? | Uncommitted files? | Recent commits?
│
└─ Choose Strategy ──→ Resume | Retry | Skip | Restart | Manual
```

## Common Imports

```javascript
const ResumeEngine = require('./resume-engine');

// Constants
const { ExecutionState, RecoveryStrategy } = ResumeEngine;

// Detection functions
const { detectExecutionState, verifyGoalConsistency, detectConflictingChanges } = ResumeEngine;

// Strategy functions
const { determineRecoveryStrategy, validateResumeSafety } = ResumeEngine;

// Session management
const { createResumeSession, saveResumeMetadata, loadResumeMetadata } = ResumeEngine;

// Utilities
const { generateResumeReport, clearResumeMetadata } = ResumeEngine;
```

## Quick Snippets

### Detect What Happened

```javascript
// Minimal detection
const state = ResumeEngine.detectExecutionState({
  previousExitCode: process.exitCode,
  hasCheckpoint: StateManager.checkpointExists()
});

console.log(state.state);    // 'success' | 'failed' | 'interrupted' | 'unknown'
console.log(state.reason);   // Human-readable explanation
```

### Verify Goal Unchanged

```javascript
const check = ResumeEngine.verifyGoalConsistency(
  previousGoal,
  currentGoal
);

if (!check.consistent) {
  console.log('Goal changed:', check.changes);
  console.log('Cannot resume safely');
  process.exit(1);
}
```

### Check Repository State

```javascript
const conflicts = ResumeEngine.detectConflictingChanges({
  previousBranch: 'main',
  currentBranch: 'main',
  workingDirectoryDirty: false
});

if (conflicts.hasConflicts) {
  console.log(`Conflicts (${conflicts.severity}):`, conflicts.conflicts);
}
```

### Decide Recovery Path

```javascript
const strategy = ResumeEngine.determineRecoveryStrategy(
  executionState,
  goalCheck,
  repoConflicts
);

// strategy.strategy = one of:
// 'resume_from_checkpoint'
// 'retry_last_task'
// 'retry_with_fallback'
// 'skip_and_continue'
// 'restart_fresh'
// 'manual_intervention'

switch (strategy.strategy) {
  case 'resume_from_checkpoint':
    // Continue from saved checkpoint
    const state = StateManager.resume();
    break;

  case 'restart_fresh':
    // Start over
    ResumeEngine.clearResumeMetadata();
    const fresh = StateManager.initializeState(goal);
    break;

  case 'manual_intervention':
    // Show diagnostic report
    console.log(ResumeEngine.generateResumeReport({
      executionState,
      goalCheck,
      repoConflicts,
      strategy
    }));
    throw new Error('Manual review needed');
}
```

### Save Resume State

```javascript
// On failure/interruption, save metadata for next run
ResumeEngine.saveResumeMetadata({
  exitCode: 1,
  signal: null,
  branch: 'main',
  goal: 'Complete feature X',
  timestamp: new Date().toISOString()
});
```

### Load Previous State

```javascript
const metadata = ResumeEngine.loadResumeMetadata();
if (metadata) {
  console.log('Previous goal:', metadata.goal);
  console.log('Exit code:', metadata.exitCode);
}
```

### Cleanup After Success

```javascript
// After successful workflow completion
ResumeEngine.clearResumeMetadata();
```

## Decision Tree

```
┌─ What stopped the previous run?
│
├─ Exit code 0
│  └─> State: SUCCESS → Start fresh
│
├─ Non-zero exit code
│  └─> State: FAILED
│      ├─ Goal unchanged? YES
│      │  └─> Goal: CONSISTENT → Retry with fallback
│      │  └─> Goal: CHANGED → Restart fresh
│      │
│      └─ Goal unchanged? NO
│         └─> Restart fresh
│
├─ Killed by signal (SIGTERM, SIGINT)
│  └─> State: INTERRUPTED
│      ├─ Goal unchanged? YES
│      │  ├─ Repo conflicts? NO
│      │  │  └─> Resume from checkpoint
│      │  │
│      │  └─ Repo conflicts? YES
│      │     ├─ Severity HIGH? YES
│      │     │  └─> Manual intervention
│      │     │
│      │     └─ Severity HIGH? NO
│      │        └─> Skip failed task, continue
│      │
│      └─ Goal unchanged? NO
│         └─> Restart fresh
│
└─ Cannot determine
   └─> State: UNKNOWN → Manual intervention
```

## Exit Codes (Convention)

```
0   = Success, normal completion
1   = Task failure, may retry
2   = Goal changed, must restart
128 = Interrupted (caught SIGINT/SIGTERM)
255 = Unknown error, manual review needed
```

## Execution State Constants

```javascript
ExecutionState.SUCCESS      // Code 0, all tasks done
ExecutionState.FAILED       // Code ≠ 0, error occurred
ExecutionState.INTERRUPTED  // Signal caught or checkpoint incomplete
ExecutionState.UNKNOWN      // Cannot determine
```

## Recovery Strategy Constants

| Strategy | Meaning | Use When |
|----------|---------|----------|
| `RESUME_FROM_CHECKPOINT` | Continue from exact point | Interrupted, no conflicts |
| `RETRY_LAST_TASK` | Re-execute last failed task | Failed, same approach |
| `RETRY_WITH_FALLBACK` | Retry with modified params | Failed, try different method |
| `SKIP_AND_CONTINUE` | Skip failed, move to next | Interrupted + medium conflicts |
| `RESTART_FRESH` | Discard all, start over | Goal changed or high risk |
| `MANUAL_INTERVENTION` | Requires human review | High-severity conflicts |

## Conflict Severity

```javascript
severity: 'low'       // Warnings only, safe to proceed
severity: 'medium'    // Some risk, may continue with caution
severity: 'high'      // High risk, human review needed
```

## Priority Scoring (0-10)

Higher = stronger recommendation:

```
10 = CRITICAL: Must follow this strategy (goal changed)
9  = VERY HIGH: Strong recommendation (high-risk conflicts)
8  = HIGH: Recommend manual review (unknown state)
7  = MEDIUM-HIGH: Default for interrupted+clean (resume)
6  = MEDIUM: Acceptable compromise (skip+continue)
5  = MEDIUM: Fallback for failures (retry)
1  = LOW: Normal next step (success → fresh)
```

## File Locations

```
.claude/dont-stop-state.json      ← State Manager checkpoint
.claude/resume-metadata.json      ← Resume Engine metadata
```

## Error Handling

### Safe to Resume?

```javascript
const safety = ResumeEngine.validateResumeSafety(
  executionState,
  repoConflicts
);

if (!safety.safe) {
  console.log('Issues:', safety.issues);
  console.log('Recommendations:', safety.recommendations);
  process.exit(1);
}
```

### Generate Diagnostic Report

```javascript
const report = ResumeEngine.generateResumeReport({
  executionState,
  goalCheck,
  repoConflicts,
  recoveryStrategy,
  resumeSession
});

console.log(report);  // Shows full analysis
```

## Integration Checklist

```javascript
// 1. On startup, detect previous state
const executionState = ResumeEngine.detectExecutionState({...});

// 2. Verify goal consistency
const goalCheck = ResumeEngine.verifyGoalConsistency(...);

// 3. Check repository state
const conflicts = ResumeEngine.detectConflictingChanges({...});

// 4. Determine strategy
const strategy = ResumeEngine.determineRecoveryStrategy(
  executionState,
  goalCheck,
  conflicts
);

// 5. Validate safety before proceeding
const safety = ResumeEngine.validateResumeSafety(
  executionState,
  conflicts
);
if (!safety.safe) throw new Error('Unsafe to resume');

// 6. Apply recovery strategy
// ... execute based on strategy.strategy ...

// 7. On failure: save metadata for next run
ResumeEngine.saveResumeMetadata({...});

// 8. On success: cleanup
ResumeEngine.clearResumeMetadata();
```

## Debugging

### Check if resume is possible

```javascript
const metadata = ResumeEngine.loadResumeMetadata();
const state = StateManager.resume();

if (metadata && state) {
  console.log('Resume data exists');
  console.log('Last goal:', metadata.goal);
  console.log('Exit code:', metadata.exitCode);
  console.log('Last task:', state.currentTask?.name);
}
```

### See full diagnostic report

```javascript
// Before deciding on strategy
const report = ResumeEngine.generateResumeReport({
  executionState,
  goalCheck,
  repoConflicts,
  recoveryStrategy
});

fs.writeFileSync('resume-report.txt', report);
console.log('Report written to resume-report.txt');
```

### Clear all resume state

```javascript
// Completely reset (careful!)
ResumeEngine.clearResumeMetadata();
StateManager.clearCheckpoint();
```

## See Also

- Full docs: `RESUME_ENGINE_README.md`
- Integration example: `resume-engine-integration-example.js`
- Tests: `resume-engine.test.js`
- State manager: `state-manager.js`
