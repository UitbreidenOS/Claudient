/**
 * resume-engine.js
 *
 * Smart resume logic for interrupted or failed runs:
 * - Detects execution state (success, failed, interrupted)
 * - Implements resumption strategies
 * - Verifies goal consistency and detects conflicting changes
 * - Routes to appropriate recovery handler
 */

const fs = require('fs');
const path = require('path');

const RESUME_METADATA_FILE = path.join(process.cwd(), '.claude', 'resume-metadata.json');
const CLAUDE_DIR = path.join(process.cwd(), '.claude');

/**
 * Execution state constants
 */
const ExecutionState = {
  SUCCESS: 'success',
  FAILED: 'failed',
  INTERRUPTED: 'interrupted',
  UNKNOWN: 'unknown'
};

/**
 * Recovery strategy types
 */
const RecoveryStrategy = {
  RESUME_FROM_CHECKPOINT: 'resume_from_checkpoint',
  RETRY_LAST_TASK: 'retry_last_task',
  RETRY_WITH_FALLBACK: 'retry_with_fallback',
  SKIP_AND_CONTINUE: 'skip_and_continue',
  RESTART_FRESH: 'restart_fresh',
  MANUAL_INTERVENTION: 'manual_intervention'
};

/**
 * Ensure .claude directory exists
 */
function ensureClaudeDir() {
  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }
}

/**
 * Save resume metadata (execution state, last task, goal snapshot)
 * @param {Object} metadata - Metadata to persist
 * @throws {Error} If write fails
 */
function saveResumeMetadata(metadata) {
  ensureClaudeDir();

  const metadataToSave = {
    ...metadata,
    savedAt: new Date().toISOString()
  };

  try {
    fs.writeFileSync(
      RESUME_METADATA_FILE,
      JSON.stringify(metadataToSave, null, 2),
      'utf8'
    );
  } catch (error) {
    throw new Error(`Failed to save resume metadata: ${error.message}`);
  }
}

/**
 * Load resume metadata from previous run
 * @returns {Object|null} Loaded metadata or null if doesn't exist
 * @throws {Error} If file is corrupted
 */
function loadResumeMetadata() {
  if (!fs.existsSync(RESUME_METADATA_FILE)) {
    return null;
  }

  try {
    const content = fs.readFileSync(RESUME_METADATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to load resume metadata: ${error.message}`);
  }
}

/**
 * Detect execution state from previous run
 * Analyzes: exit code, signal, checkpoint existence, error logs
 * @param {Object} options - Detection options
 * @returns {Object} { state: ExecutionState, reason: string, details: Object }
 */
function detectExecutionState(options = {}) {
  const {
    previousExitCode = null,
    previousSignal = null,
    hasCheckpoint = false,
    errorLog = [],
    lastTaskStatus = null,
    completedTasks = 0,
    totalTasks = 0
  } = options;

  const result = {
    state: ExecutionState.UNKNOWN,
    reason: '',
    details: {
      exitCode: previousExitCode,
      signal: previousSignal,
      hasCheckpoint,
      errorCount: errorLog.length,
      completedTasks,
      totalTasks
    }
  };

  // Interrupted: killed by signal (SIGTERM, SIGINT, etc.)
  if (previousSignal) {
    result.state = ExecutionState.INTERRUPTED;
    result.reason = `Process terminated by signal: ${previousSignal}`;
    return result;
  }

  // Success: zero exit code
  if (previousExitCode === 0) {
    result.state = ExecutionState.SUCCESS;
    result.reason = 'Previous run exited successfully (exit code 0)';
    return result;
  }

  // Failed: non-zero exit code
  if (typeof previousExitCode === 'number' && previousExitCode !== 0) {
    result.state = ExecutionState.FAILED;
    result.reason = `Process failed with exit code: ${previousExitCode}`;
    if (errorLog.length > 0) {
      result.details.lastError = errorLog[errorLog.length - 1];
    }
    return result;
  }

  // Interrupted: has checkpoint but incomplete tasks
  if (hasCheckpoint && completedTasks < totalTasks) {
    result.state = ExecutionState.INTERRUPTED;
    result.reason = `Checkpoint found with incomplete tasks (${completedTasks}/${totalTasks})`;
    return result;
  }

  // Unknown: cannot determine
  result.state = ExecutionState.UNKNOWN;
  result.reason = 'Unable to determine previous execution state';
  return result;
}

/**
 * Verify goal hasn't changed between runs
 * @param {string} previousGoal - Goal from last run
 * @param {string} currentGoal - Goal for current run
 * @returns {Object} { consistent: boolean, changes: string[], warning: string }
 */
function verifyGoalConsistency(previousGoal, currentGoal) {
  const result = {
    consistent: true,
    changes: [],
    warning: null
  };

  if (!previousGoal || !currentGoal) {
    result.warning = 'Missing goal in comparison';
    return result;
  }

  // Exact match
  if (previousGoal === currentGoal) {
    return result;
  }

  result.consistent = false;

  // Detect type of change
  const prevLength = previousGoal.length;
  const currLength = currentGoal.length;

  if (prevLength !== currLength) {
    result.changes.push(
      `Length changed: ${prevLength} → ${currLength} characters`
    );
  }

  // Simple heuristic: check for major keyword shifts
  const prevWords = new Set(previousGoal.toLowerCase().split(/\s+/));
  const currWords = new Set(currentGoal.toLowerCase().split(/\s+/));

  const removed = [...prevWords].filter(w => !currWords.has(w)).slice(0, 3);
  const added = [...currWords].filter(w => !prevWords.has(w)).slice(0, 3);

  if (removed.length > 0) {
    result.changes.push(`Removed keywords: ${removed.join(', ')}`);
  }
  if (added.length > 0) {
    result.changes.push(`Added keywords: ${added.join(', ')}`);
  }

  result.warning = `Goal has changed. Previous: "${previousGoal.slice(0, 50)}..." → Current: "${currentGoal.slice(0, 50)}..."`;

  return result;
}

/**
 * Detect conflicting changes in repository
 * Checks for uncommitted changes, branch switches, recent commits
 * @param {Object} options - Repository state options
 * @returns {Object} { hasConflicts: boolean, conflicts: string[], severity: 'low'|'medium'|'high' }
 */
function detectConflictingChanges(options = {}) {
  const {
    uncommittedChanges = [],
    recentCommits = [],
    currentBranch = null,
    previousBranch = null,
    workingDirectoryDirty = false
  } = options;

  const result = {
    hasConflicts: false,
    conflicts: [],
    severity: 'low'
  };

  // Branch switch
  if (previousBranch && currentBranch && previousBranch !== currentBranch) {
    result.conflicts.push(
      `Branch changed: ${previousBranch} → ${currentBranch}`
    );
    result.hasConflicts = true;
    result.severity = 'high';
  }

  // Uncommitted changes (working directory dirty)
  if (workingDirectoryDirty || uncommittedChanges.length > 0) {
    result.conflicts.push(
      `Working directory dirty: ${uncommittedChanges.length} files modified`
    );
    result.hasConflicts = true;
    result.severity = result.severity === 'high' ? 'high' : 'medium';
  }

  // Recent commits made during expected run
  if (recentCommits.length > 0) {
    result.conflicts.push(
      `Recent commits detected: ${recentCommits.length} commits made`
    );
    result.hasConflicts = true;
    result.severity = result.severity === 'high' ? 'high' : 'medium';
  }

  return result;
}

/**
 * Determine optimal recovery strategy
 * @param {Object} executionState - State from detectExecutionState()
 * @param {Object} goalCheck - Consistency check from verifyGoalConsistency()
 * @param {Object} repoConflicts - Conflicts from detectConflictingChanges()
 * @returns {Object} { strategy: RecoveryStrategy, reason: string, priority: number }
 */
function determineRecoveryStrategy(executionState, goalCheck, repoConflicts) {
  const result = {
    strategy: RecoveryStrategy.RESTART_FRESH,
    reason: '',
    priority: 0
  };

  // Goal changed: force restart
  if (!goalCheck.consistent) {
    result.strategy = RecoveryStrategy.RESTART_FRESH;
    result.reason = 'Goal has changed; cannot safely resume';
    result.priority = 10;
    return result;
  }

  // High-severity conflicts: require manual intervention
  if (repoConflicts.hasConflicts && repoConflicts.severity === 'high') {
    result.strategy = RecoveryStrategy.MANUAL_INTERVENTION;
    result.reason = `High-severity conflicts detected: ${repoConflicts.conflicts[0]}`;
    result.priority = 9;
    return result;
  }

  // Handle execution states
  switch (executionState.state) {
    case ExecutionState.SUCCESS:
      result.strategy = RecoveryStrategy.RESTART_FRESH;
      result.reason = 'Previous run succeeded; starting fresh';
      result.priority = 1;
      break;

    case ExecutionState.INTERRUPTED:
      // Medium conflicts: skip and continue
      if (repoConflicts.hasConflicts) {
        result.strategy = RecoveryStrategy.SKIP_AND_CONTINUE;
        result.reason = 'Interrupted but medium-severity conflicts; skipping failed task';
        result.priority = 6;
      } else {
        // No conflicts: resume from checkpoint
        result.strategy = RecoveryStrategy.RESUME_FROM_CHECKPOINT;
        result.reason = 'Clean interruption; resuming from checkpoint';
        result.priority = 7;
      }
      break;

    case ExecutionState.FAILED:
      // Retry with fallback strategy
      result.strategy = RecoveryStrategy.RETRY_WITH_FALLBACK;
      result.reason = 'Previous attempt failed; retrying with fallback approach';
      result.priority = 5;
      break;

    case ExecutionState.UNKNOWN:
      // Default: manual intervention for unknown states
      result.strategy = RecoveryStrategy.MANUAL_INTERVENTION;
      result.reason = 'Unable to determine previous state; manual review needed';
      result.priority = 8;
      break;
  }

  return result;
}

/**
 * Create resume session with metadata
 * @param {Object} options - Session options
 * @returns {Object} Resume session descriptor
 */
function createResumeSession(options = {}) {
  const {
    goal,
    lastTaskId = null,
    lastTaskName = null,
    checkpointPath = null,
    recoveryStrategy,
    errorContext = null
  } = options;

  return {
    id: `resume-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    goal,
    lastTaskId,
    lastTaskName,
    checkpointPath,
    recoveryStrategy,
    errorContext,
    createdAt: new Date().toISOString(),
    metadata: {
      agent: process.env.CLAUDE_AGENT || 'unknown',
      model: process.env.CLAUDE_MODEL || 'unknown'
    }
  };
}

/**
 * Validate resume safety
 * Checks if resuming is safe given state and conflicts
 * @param {Object} executionState - From detectExecutionState()
 * @param {Object} repoConflicts - From detectConflictingChanges()
 * @returns {Object} { safe: boolean, issues: string[], recommendations: string[] }
 */
function validateResumeSafety(executionState, repoConflicts) {
  const result = {
    safe: true,
    issues: [],
    recommendations: []
  };

  // Interrupted + no conflicts = safe to resume
  if (executionState.state === ExecutionState.INTERRUPTED && !repoConflicts.hasConflicts) {
    result.safe = true;
    result.recommendations.push('Safe to resume from checkpoint');
    return result;
  }

  // Failed state
  if (executionState.state === ExecutionState.FAILED) {
    result.issues.push('Previous run failed');
    result.recommendations.push('Review error log before retrying');
    if (repoConflicts.hasConflicts) {
      result.safe = false;
      result.issues.push(`Repository conflicts: ${repoConflicts.conflicts[0]}`);
      result.recommendations.push('Resolve conflicts before retry');
    }
  }

  // Success state
  if (executionState.state === ExecutionState.SUCCESS) {
    result.recommendations.push('Previous run completed successfully');
    result.recommendations.push('Starting fresh run');
  }

  // Unknown state
  if (executionState.state === ExecutionState.UNKNOWN) {
    result.safe = false;
    result.issues.push('Cannot determine previous execution state');
    result.recommendations.push('Manual review required');
  }

  return result;
}

/**
 * Generate resume report
 * @param {Object} options - Report options
 * @returns {string} Formatted report
 */
function generateResumeReport(options = {}) {
  const {
    executionState,
    goalCheck,
    repoConflicts,
    recoveryStrategy,
    resumeSession
  } = options;

  let report = '=== RESUME ENGINE REPORT ===\n\n';

  if (executionState) {
    report += `EXECUTION STATE: ${executionState.state}\n`;
    report += `  Reason: ${executionState.reason}\n`;
    report += `  Details: ${JSON.stringify(executionState.details)}\n\n`;
  }

  if (goalCheck) {
    report += `GOAL CONSISTENCY: ${goalCheck.consistent ? 'CONSISTENT' : 'CHANGED'}\n`;
    if (!goalCheck.consistent) {
      report += `  Changes:\n`;
      goalCheck.changes.forEach(change => {
        report += `    - ${change}\n`;
      });
    }
    report += '\n';
  }

  if (repoConflicts) {
    report += `REPOSITORY CONFLICTS: ${repoConflicts.hasConflicts ? 'DETECTED' : 'NONE'}\n`;
    report += `  Severity: ${repoConflicts.severity}\n`;
    if (repoConflicts.conflicts.length > 0) {
      report += `  Conflicts:\n`;
      repoConflicts.conflicts.forEach(conflict => {
        report += `    - ${conflict}\n`;
      });
    }
    report += '\n';
  }

  if (recoveryStrategy) {
    report += `RECOVERY STRATEGY: ${recoveryStrategy.strategy}\n`;
    report += `  Reason: ${recoveryStrategy.reason}\n`;
    report += `  Priority: ${recoveryStrategy.priority}/10\n\n`;
  }

  if (resumeSession) {
    report += `RESUME SESSION: ${resumeSession.id}\n`;
    report += `  Strategy: ${resumeSession.recoveryStrategy}\n`;
    if (resumeSession.lastTaskName) {
      report += `  Last Task: ${resumeSession.lastTaskName}\n`;
    }
    report += `  Created: ${resumeSession.createdAt}\n`;
  }

  return report;
}

/**
 * Clear resume metadata (cleanup after successful completion)
 */
function clearResumeMetadata() {
  try {
    if (fs.existsSync(RESUME_METADATA_FILE)) {
      fs.unlinkSync(RESUME_METADATA_FILE);
    }
  } catch (error) {
    console.warn(`Failed to clear resume metadata: ${error.message}`);
  }
}

/**
 * Get resume metadata file path
 * @returns {string} Full path
 */
function getResumeMetadataPath() {
  return RESUME_METADATA_FILE;
}

/**
 * Check if resume metadata exists
 * @returns {boolean}
 */
function resumeMetadataExists() {
  return fs.existsSync(RESUME_METADATA_FILE);
}

module.exports = {
  // State detection
  detectExecutionState,
  verifyGoalConsistency,
  detectConflictingChanges,

  // Recovery planning
  determineRecoveryStrategy,
  validateResumeSafety,

  // Session management
  createResumeSession,
  saveResumeMetadata,
  loadResumeMetadata,

  // Utilities
  generateResumeReport,
  clearResumeMetadata,
  getResumeMetadataPath,
  resumeMetadataExists,
  ensureClaudeDir,

  // Constants
  ExecutionState,
  RecoveryStrategy,
  RESUME_METADATA_FILE
};
