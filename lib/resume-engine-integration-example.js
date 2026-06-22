/**
 * resume-engine-integration-example.js
 *
 * Real-world integration example showing how to use resume-engine
 * with task executor and state manager in a workflow
 */

const ResumeEngine = require('./resume-engine');
const StateManager = require('./state-manager');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Full workflow with resume capability
 * 1. Check for previous run state
 * 2. Determine recovery strategy
 * 3. Execute with checkpoint management
 * 4. Handle interruptions gracefully
 */
class ResumableWorkflow {
  constructor(options = {}) {
    this.options = {
      goal: options.goal,
      tasks: options.tasks || [],
      checkpointInterval: options.checkpointInterval || 5,
      verbose: options.verbose || false,
      ...options
    };

    this.state = null;
    this.resumeSession = null;
    this.executionMetrics = {
      startTime: null,
      endTime: null,
      signal: null,
      exitCode: null
    };
  }

  /**
   * Initialize workflow with resume detection
   */
  async initialize() {
    this.log('Initializing workflow...');

    // Try to load existing state
    const existingState = StateManager.resume();
    const resumeMetadata = ResumeEngine.loadResumeMetadata();

    if (existingState && resumeMetadata) {
      this.log('Found previous run state, attempting resume...');
      return await this.handleResume(existingState, resumeMetadata);
    }

    // Start fresh
    this.log('Starting fresh workflow');
    this.state = StateManager.initializeState(this.options.goal);
    StateManager.saveState(this.state);
    return { mode: 'fresh', state: this.state };
  }

  /**
   * Handle resume scenario: detect state, verify consistency, apply strategy
   */
  async handleResume(previousState, resumeMetadata) {
    this.log('=== RESUME HANDLER ===');

    // 1. Detect execution state
    const executionState = ResumeEngine.detectExecutionState({
      previousExitCode: resumeMetadata.exitCode,
      previousSignal: resumeMetadata.signal,
      hasCheckpoint: StateManager.checkpointExists(),
      errorLog: previousState.errorLog,
      completedTasks: previousState.completedTasks.length,
      totalTasks: this.options.tasks.length
    });

    this.log(`Execution state: ${executionState.state}`);
    this.log(`  Reason: ${executionState.reason}`);

    // 2. Verify goal hasn't changed
    const goalCheck = ResumeEngine.verifyGoalConsistency(
      previousState.goal,
      this.options.goal
    );

    if (!goalCheck.consistent) {
      this.log('WARNING: Goal has changed!');
      goalCheck.changes.forEach(change => this.log(`  - ${change}`));
    }

    // 3. Detect repo conflicts
    const repoConflicts = ResumeEngine.detectConflictingChanges({
      uncommittedChanges: [], // Would fetch via git
      workingDirectoryDirty: await this.isWorkingDirectoryDirty(),
      recentCommits: [], // Would fetch via git
      previousBranch: resumeMetadata.branch,
      currentBranch: await this.getCurrentBranch()
    });

    if (repoConflicts.hasConflicts) {
      this.log(`Repository conflicts detected (${repoConflicts.severity}):`);
      repoConflicts.conflicts.forEach(c => this.log(`  - ${c}`));
    }

    // 4. Determine recovery strategy
    const recoveryStrategy = ResumeEngine.determineRecoveryStrategy(
      executionState,
      goalCheck,
      repoConflicts
    );

    this.log(`Recovery strategy: ${recoveryStrategy.strategy}`);
    this.log(`  Reason: ${recoveryStrategy.reason}`);
    this.log(`  Priority: ${recoveryStrategy.priority}/10`);

    // 5. Validate safety
    const safety = ResumeEngine.validateResumeSafety(
      executionState,
      repoConflicts
    );

    this.log(`Resume safety: ${safety.safe ? 'SAFE' : 'UNSAFE'}`);
    safety.recommendations.forEach(r => this.log(`  * ${r}`));

    // 6. Apply strategy
    const resumeSession = ResumeEngine.createResumeSession({
      goal: this.options.goal,
      lastTaskId: previousState.currentTask?.id,
      lastTaskName: previousState.currentTask?.name,
      checkpointPath: StateManager.getCheckpointPath(),
      recoveryStrategy: recoveryStrategy.strategy,
      errorContext: previousState.errorLog.slice(-3)
    });

    this.resumeSession = resumeSession;

    switch (recoveryStrategy.strategy) {
      case ResumeEngine.RecoveryStrategy.RESUME_FROM_CHECKPOINT:
        this.log('Resuming from checkpoint...');
        this.state = previousState;
        return {
          mode: 'resume_from_checkpoint',
          state: this.state,
          resumeSession
        };

      case ResumeEngine.RecoveryStrategy.RETRY_LAST_TASK:
        this.log('Retrying last task...');
        this.state = previousState;
        return {
          mode: 'retry_last_task',
          state: this.state,
          resumeSession
        };

      case ResumeEngine.RecoveryStrategy.SKIP_AND_CONTINUE:
        this.log('Skipping failed task and continuing...');
        // Mark last task as skipped
        this.state = StateManager.addCompletedTask(previousState, {
          ...previousState.currentTask,
          status: 'skipped',
          reason: 'Skipped during resume due to conflicts'
        });
        return {
          mode: 'skip_and_continue',
          state: this.state,
          resumeSession
        };

      case ResumeEngine.RecoveryStrategy.RESTART_FRESH:
        this.log('Restarting workflow from beginning...');
        ResumeEngine.clearResumeMetadata();
        this.state = StateManager.initializeState(this.options.goal);
        return {
          mode: 'restart_fresh',
          state: this.state,
          resumeSession: null
        };

      case ResumeEngine.RecoveryStrategy.MANUAL_INTERVENTION:
        this.log('Manual intervention required!');
        this.logResumeReport(executionState, goalCheck, repoConflicts, recoveryStrategy);
        throw new Error(
          `Resume requires manual intervention: ${recoveryStrategy.reason}`
        );

      default:
        throw new Error(`Unknown recovery strategy: ${recoveryStrategy.strategy}`);
    }
  }

  /**
   * Execute tasks with checkpoint management
   */
  async execute() {
    this.log('\n=== WORKFLOW EXECUTION ===\n');
    this.executionMetrics.startTime = Date.now();

    try {
      const completedBefore = this.state.completedTasks.length;
      const tasksToRun = this.options.tasks.slice(completedBefore);

      this.log(`Running ${tasksToRun.length} tasks (${completedBefore} already completed)`);

      for (let i = 0; i < tasksToRun.length; i++) {
        const task = tasksToRun[i];

        // Update state with current task
        this.state = StateManager.setCurrentTask(this.state, task);

        try {
          this.log(`\n[${i + 1}/${tasksToRun.length}] ${task.name}`);

          // Execute task
          const result = await this.executeTask(task);

          // Mark as completed
          this.state = StateManager.addCompletedTask(this.state, {
            ...task,
            status: 'completed',
            result
          });

          this.log(`✓ Completed in ${result.duration}ms`);

          // Checkpoint after N tasks
          if ((i + 1) % this.options.checkpointInterval === 0) {
            this.checkpoint();
          }
        } catch (error) {
          // Log error to state
          this.state = StateManager.logError(
            this.state,
            error,
            `Task execution: ${task.name}`
          );

          this.log(`✗ Failed: ${error.message}`);

          // Re-throw to allow caller to decide on retry
          throw error;
        }
      }

      this.log('\n=== WORKFLOW COMPLETED ===\n');
      this.executionMetrics.exitCode = 0;

      // Cleanup after successful completion
      this.checkpoint();
      ResumeEngine.clearResumeMetadata();

      return {
        success: true,
        completedTasks: this.state.completedTasks.length,
        totalTasks: this.options.tasks.length
      };
    } catch (error) {
      this.log(`\n✗ Execution failed: ${error.message}\n`);
      this.executionMetrics.exitCode = 1;

      // Save state for resume
      this.checkpoint();
      this.saveResumeMetadata();

      throw error;
    }
  }

  /**
   * Execute individual task
   */
  async executeTask(task) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const timeout = setTimeout(() => {
        reject(new Error(`Task timeout after ${this.options.timeout || 30000}ms`));
      }, this.options.timeout || 30000);

      try {
        // Simulate task execution
        if (task.simulate === 'fail') {
          throw new Error('Simulated task failure');
        }

        clearTimeout(timeout);
        resolve({
          duration: Date.now() - startTime,
          output: `Completed: ${task.name}`
        });
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  /**
   * Checkpoint: save state to disk
   */
  checkpoint() {
    this.log('  [checkpoint]');
    StateManager.saveState(this.state);
  }

  /**
   * Save resume metadata for potential re-entry
   */
  saveResumeMetadata() {
    ResumeEngine.saveResumeMetadata({
      exitCode: this.executionMetrics.exitCode,
      signal: this.executionMetrics.signal,
      branch: this.options.branch,
      lastTaskId: this.state.currentTask?.id,
      goal: this.options.goal,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Utilities
   */
  async isWorkingDirectoryDirty() {
    return new Promise((resolve, reject) => {
      exec('git status --porcelain', (error, stdout) => {
        if (error) {
          resolve(false); // Not a git repo or error
        } else {
          resolve(stdout.trim().length > 0);
        }
      });
    });
  }

  async getCurrentBranch() {
    return new Promise((resolve, reject) => {
      exec('git rev-parse --abbrev-ref HEAD', (error, stdout) => {
        if (error) {
          resolve('unknown');
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }

  logResumeReport(executionState, goalCheck, repoConflicts, recoveryStrategy) {
    const report = ResumeEngine.generateResumeReport({
      executionState,
      goalCheck,
      repoConflicts,
      recoveryStrategy,
      resumeSession: this.resumeSession
    });

    console.log(report);
  }

  log(message) {
    if (this.options.verbose) {
      console.log(`[ResumableWorkflow] ${message}`);
    }
  }
}

/**
 * Example usage
 */
async function exampleUsage() {
  const workflow = new ResumableWorkflow({
    goal: 'Implement authentication feature',
    tasks: [
      { id: 'task-1', name: 'Design API', simulate: null },
      { id: 'task-2', name: 'Implement endpoints', simulate: null },
      { id: 'task-3', name: 'Add tests', simulate: null },
      { id: 'task-4', name: 'Document API', simulate: null },
      { id: 'task-5', name: 'Deploy to staging', simulate: null }
    ],
    checkpointInterval: 2,
    verbose: true
  });

  try {
    // Initialize (will detect/resume if needed)
    const initResult = await workflow.initialize();
    console.log(`\nInitialization mode: ${initResult.mode}\n`);

    // Execute workflow
    const result = await workflow.execute();
    console.log(`\nWorkflow result:`, result);
  } catch (error) {
    console.error('Workflow error:', error.message);
    process.exit(1);
  }
}

module.exports = {
  ResumableWorkflow,
  exampleUsage
};

// Uncomment to run example:
// if (require.main === module) {
//   exampleUsage().catch(console.error);
// }
