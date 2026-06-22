/**
 * resume-engine.test.js
 *
 * Unit tests for resume-engine.js
 * Tests: state detection, goal verification, conflict detection, recovery strategy selection
 */

const ResumeEngine = require('./resume-engine');
const fs = require('fs');
const path = require('path');

describe('ResumeEngine', () => {
  describe('detectExecutionState()', () => {
    it('should detect success from exit code 0', () => {
      const result = ResumeEngine.detectExecutionState({
        previousExitCode: 0,
        hasCheckpoint: true,
        completedTasks: 5,
        totalTasks: 5
      });

      expect(result.state).toBe(ResumeEngine.ExecutionState.SUCCESS);
      expect(result.reason).toContain('successfully');
    });

    it('should detect interrupted state from signal', () => {
      const result = ResumeEngine.detectExecutionState({
        previousSignal: 'SIGTERM',
        hasCheckpoint: true,
        completedTasks: 2,
        totalTasks: 5
      });

      expect(result.state).toBe(ResumeEngine.ExecutionState.INTERRUPTED);
      expect(result.reason).toContain('signal');
    });

    it('should detect failed state from non-zero exit code', () => {
      const result = ResumeEngine.detectExecutionState({
        previousExitCode: 1,
        hasCheckpoint: false,
        errorLog: [{ message: 'Connection timeout' }]
      });

      expect(result.state).toBe(ResumeEngine.ExecutionState.FAILED);
      expect(result.reason).toContain('exit code: 1');
      expect(result.details.lastError).toBeDefined();
    });

    it('should detect interrupted from incomplete checkpoint', () => {
      const result = ResumeEngine.detectExecutionState({
        hasCheckpoint: true,
        completedTasks: 3,
        totalTasks: 10
      });

      expect(result.state).toBe(ResumeEngine.ExecutionState.INTERRUPTED);
      expect(result.reason).toContain('incomplete');
    });

    it('should mark unknown state when unable to determine', () => {
      const result = ResumeEngine.detectExecutionState({});

      expect(result.state).toBe(ResumeEngine.ExecutionState.UNKNOWN);
      expect(result.reason).toContain('Unable to determine');
    });
  });

  describe('verifyGoalConsistency()', () => {
    it('should detect identical goals as consistent', () => {
      const goal = 'Fix authentication bug in login flow';
      const result = ResumeEngine.verifyGoalConsistency(goal, goal);

      expect(result.consistent).toBe(true);
      expect(result.changes).toHaveLength(0);
    });

    it('should detect goal changes', () => {
      const prev = 'Fix authentication bug in login flow';
      const curr = 'Implement new payment gateway integration';
      const result = ResumeEngine.verifyGoalConsistency(prev, curr);

      expect(result.consistent).toBe(false);
      expect(result.changes.length).toBeGreaterThan(0);
      expect(result.warning).toBeDefined();
    });

    it('should handle missing goals', () => {
      const result = ResumeEngine.verifyGoalConsistency(null, 'New goal');

      expect(result.warning).toBeDefined();
    });

    it('should detect keyword changes', () => {
      const prev = 'Fix bug in authentication system';
      const curr = 'Fix bug in payment system';
      const result = ResumeEngine.verifyGoalConsistency(prev, curr);

      expect(result.consistent).toBe(false);
      expect(result.changes.some(c => c.includes('authentication'))).toBe(true);
      expect(result.changes.some(c => c.includes('payment'))).toBe(true);
    });

    it('should detect length changes', () => {
      const prev = 'Short goal';
      const curr = 'Much longer goal with additional details and context';
      const result = ResumeEngine.verifyGoalConsistency(prev, curr);

      expect(result.consistent).toBe(false);
      expect(result.changes.some(c => c.includes('Length'))).toBe(true);
    });
  });

  describe('detectConflictingChanges()', () => {
    it('should detect no conflicts in clean state', () => {
      const result = ResumeEngine.detectConflictingChanges({
        uncommittedChanges: [],
        recentCommits: [],
        workingDirectoryDirty: false
      });

      expect(result.hasConflicts).toBe(false);
      expect(result.conflicts).toHaveLength(0);
    });

    it('should detect branch switch conflict', () => {
      const result = ResumeEngine.detectConflictingChanges({
        previousBranch: 'main',
        currentBranch: 'feature/new-auth',
        workingDirectoryDirty: false
      });

      expect(result.hasConflicts).toBe(true);
      expect(result.severity).toBe('high');
      expect(result.conflicts.some(c => c.includes('Branch'))).toBe(true);
    });

    it('should detect uncommitted changes', () => {
      const result = ResumeEngine.detectConflictingChanges({
        uncommittedChanges: ['src/auth.js', 'src/login.tsx'],
        workingDirectoryDirty: true
      });

      expect(result.hasConflicts).toBe(true);
      expect(result.severity).toBe('medium');
      expect(result.conflicts.some(c => c.includes('dirty'))).toBe(true);
    });

    it('should detect recent commits', () => {
      const result = ResumeEngine.detectConflictingChanges({
        recentCommits: [
          { hash: 'abc123', message: 'Fix bug' },
          { hash: 'def456', message: 'Add feature' }
        ]
      });

      expect(result.hasConflicts).toBe(true);
      expect(result.severity).toBe('medium');
      expect(result.conflicts.some(c => c.includes('commits'))).toBe(true);
    });

    it('should escalate severity with multiple conflicts', () => {
      const result = ResumeEngine.detectConflictingChanges({
        previousBranch: 'main',
        currentBranch: 'develop',
        uncommittedChanges: ['file.js'],
        workingDirectoryDirty: true,
        recentCommits: [{ hash: 'abc' }]
      });

      expect(result.severity).toBe('high');
      expect(result.conflicts.length).toBeGreaterThan(1);
    });
  });

  describe('determineRecoveryStrategy()', () => {
    it('should restart on goal change', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.INTERRUPTED,
        reason: 'Test'
      };
      const goalCheck = {
        consistent: false,
        changes: ['Keywords added']
      };
      const repoConflicts = { hasConflicts: false };

      const result = ResumeEngine.determineRecoveryStrategy(
        executionState,
        goalCheck,
        repoConflicts
      );

      expect(result.strategy).toBe(ResumeEngine.RecoveryStrategy.RESTART_FRESH);
      expect(result.reason).toContain('Goal');
      expect(result.priority).toBeGreaterThanOrEqual(9);
    });

    it('should require manual intervention on high-severity conflicts', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.FAILED,
        reason: 'Test'
      };
      const goalCheck = { consistent: true, changes: [] };
      const repoConflicts = {
        hasConflicts: true,
        severity: 'high',
        conflicts: ['Branch switched']
      };

      const result = ResumeEngine.determineRecoveryStrategy(
        executionState,
        goalCheck,
        repoConflicts
      );

      expect(result.strategy).toBe(
        ResumeEngine.RecoveryStrategy.MANUAL_INTERVENTION
      );
      expect(result.priority).toBeGreaterThanOrEqual(8);
    });

    it('should resume from checkpoint on clean interruption', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.INTERRUPTED,
        reason: 'Test'
      };
      const goalCheck = { consistent: true, changes: [] };
      const repoConflicts = { hasConflicts: false };

      const result = ResumeEngine.determineRecoveryStrategy(
        executionState,
        goalCheck,
        repoConflicts
      );

      expect(result.strategy).toBe(
        ResumeEngine.RecoveryStrategy.RESUME_FROM_CHECKPOINT
      );
      expect(result.priority).toBeGreaterThanOrEqual(6);
    });

    it('should retry with fallback on failed state', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.FAILED,
        reason: 'Test'
      };
      const goalCheck = { consistent: true, changes: [] };
      const repoConflicts = { hasConflicts: false };

      const result = ResumeEngine.determineRecoveryStrategy(
        executionState,
        goalCheck,
        repoConflicts
      );

      expect(result.strategy).toBe(
        ResumeEngine.RecoveryStrategy.RETRY_WITH_FALLBACK
      );
    });

    it('should skip and continue on interrupted with medium conflicts', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.INTERRUPTED,
        reason: 'Test'
      };
      const goalCheck = { consistent: true, changes: [] };
      const repoConflicts = {
        hasConflicts: true,
        severity: 'medium',
        conflicts: ['Uncommitted changes']
      };

      const result = ResumeEngine.determineRecoveryStrategy(
        executionState,
        goalCheck,
        repoConflicts
      );

      expect(result.strategy).toBe(
        ResumeEngine.RecoveryStrategy.SKIP_AND_CONTINUE
      );
    });
  });

  describe('validateResumeSafety()', () => {
    it('should confirm safety for interrupted + clean state', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.INTERRUPTED
      };
      const repoConflicts = { hasConflicts: false };

      const result = ResumeEngine.validateResumeSafety(
        executionState,
        repoConflicts
      );

      expect(result.safe).toBe(true);
    });

    it('should flag unsafe resumed on failed + conflicts', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.FAILED
      };
      const repoConflicts = {
        hasConflicts: true,
        conflicts: ['Branch switched']
      };

      const result = ResumeEngine.validateResumeSafety(
        executionState,
        repoConflicts
      );

      expect(result.safe).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });

    it('should mark unknown state as unsafe', () => {
      const executionState = {
        state: ResumeEngine.ExecutionState.UNKNOWN
      };
      const repoConflicts = { hasConflicts: false };

      const result = ResumeEngine.validateResumeSafety(
        executionState,
        repoConflicts
      );

      expect(result.safe).toBe(false);
      expect(result.issues.some(i => i.includes('Cannot determine'))).toBe(true);
    });
  });

  describe('createResumeSession()', () => {
    it('should create valid resume session', () => {
      const session = ResumeEngine.createResumeSession({
        goal: 'Fix login bug',
        lastTaskId: 'task-123',
        lastTaskName: 'Implement email validation',
        recoveryStrategy: ResumeEngine.RecoveryStrategy.RESUME_FROM_CHECKPOINT
      });

      expect(session.id).toMatch(/^resume-/);
      expect(session.goal).toBe('Fix login bug');
      expect(session.lastTaskId).toBe('task-123');
      expect(session.recoveryStrategy).toBeDefined();
      expect(session.createdAt).toBeDefined();
    });
  });

  describe('generateResumeReport()', () => {
    it('should generate formatted report', () => {
      const report = ResumeEngine.generateResumeReport({
        executionState: {
          state: ResumeEngine.ExecutionState.INTERRUPTED,
          reason: 'Process killed'
        },
        goalCheck: {
          consistent: true,
          changes: []
        },
        repoConflicts: {
          hasConflicts: false,
          severity: 'low'
        },
        recoveryStrategy: {
          strategy:
            ResumeEngine.RecoveryStrategy.RESUME_FROM_CHECKPOINT,
          reason: 'Clean interruption'
        }
      });

      expect(report).toContain('RESUME ENGINE REPORT');
      expect(report).toContain('EXECUTION STATE');
      expect(report).toContain('INTERRUPTED');
      expect(report).toContain('RECOVERY STRATEGY');
      expect(report).toContain('RESUME_FROM_CHECKPOINT');
    });
  });

  describe('Metadata persistence', () => {
    const testDir = path.join(__dirname, '.test-resume-metadata');

    beforeEach(() => {
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
      }
    });

    afterEach(() => {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    });

    it('should save and load resume metadata', () => {
      const metadata = {
        executionState: ResumeEngine.ExecutionState.INTERRUPTED,
        lastTaskId: 'task-456',
        goal: 'Complete feature X'
      };

      ResumeEngine.saveResumeMetadata(metadata);
      const loaded = ResumeEngine.loadResumeMetadata();

      expect(loaded).toBeDefined();
      expect(loaded.executionState).toBe(
        ResumeEngine.ExecutionState.INTERRUPTED
      );
      expect(loaded.lastTaskId).toBe('task-456');
    });
  });
});
