/**
 * TeamMode Tests
 * Unit tests for multi-user collaboration, approval workflows, and notifications
 */

const TeamMode = require('./team-mode');

describe('TeamMode', () => {
  let teamMode;

  beforeEach(() => {
    teamMode = new TeamMode({
      notificationChannels: {
        slack: { webhook: 'https://hooks.slack.com/test' },
        discord: { webhook: 'https://discord.com/api/webhooks/test' },
      },
    });

    // Register team members
    teamMode.registerCollaborator('alice', 'Alice Johnson', 'alice@company.com', 'owner');
    teamMode.registerCollaborator('bob', 'Bob Smith', 'bob@company.com', 'approver');
    teamMode.registerCollaborator('charlie', 'Charlie Brown', 'charlie@company.com', 'contributor');
  });

  // ============================================================================
  // GOAL SUBMISSION & MANAGEMENT
  // ============================================================================

  describe('Goal Management', () => {
    test('should submit a goal with suggested tasks', () => {
      const goalId = teamMode.submitGoal('alice', 'Migrate Database', 'Move from PostgreSQL to MySQL', [
        { title: 'Backup current database', complexity: 'simple' },
        { title: 'Set up MySQL cluster', complexity: 'complex' },
        { title: 'Test migration script', complexity: 'medium' },
      ]);

      expect(goalId).toMatch(/^goal_/);

      const goal = teamMode.getGoal(goalId);
      expect(goal.title).toBe('Migrate Database');
      expect(goal.owner).toBe('alice');
      expect(goal.status).toBe('pending_review');
      expect(goal.tasks.length).toBe(3);
    });

    test('should get goal with full details', () => {
      const goalId = teamMode.submitGoal('alice', 'Deploy Feature', 'Release new payment system', [
        { title: 'Code review', complexity: 'medium' },
      ]);

      const goal = teamMode.getGoal(goalId);
      expect(goal.approvalStatus).toBeDefined();
      expect(goal.progress).toBeDefined();
      expect(goal.taskDetails).toBeDefined();
      expect(goal.taskDetails[0].title).toBe('Code review');
    });

    test('should update goal status', () => {
      const goalId = teamMode.submitGoal('alice', 'Test Goal', 'Test');
      teamMode.updateGoalStatus(goalId, 'approved', 'bob');

      const goal = teamMode.getGoal(goalId);
      expect(goal.status).toBe('approved');
    });

    test('should reject invalid status', () => {
      const goalId = teamMode.submitGoal('alice', 'Test Goal', 'Test');
      expect(() => {
        teamMode.updateGoalStatus(goalId, 'invalid_status', 'bob');
      }).toThrow('Invalid status');
    });

    test('should emit goal:submitted event', (done) => {
      teamMode.on('goal:submitted', ({ goalId, owner, title }) => {
        expect(owner).toBe('alice');
        expect(title).toBe('New Feature');
        done();
      });

      teamMode.submitGoal('alice', 'New Feature', 'Test');
    });
  });

  // ============================================================================
  // TASK MANAGEMENT
  // ============================================================================

  describe('Task Management', () => {
    let goalId;

    beforeEach(() => {
      goalId = teamMode.submitGoal('alice', 'Platform Upgrade', 'Upgrade infrastructure', [
        { title: 'Update packages', complexity: 'simple' },
        { title: 'Run security audit', complexity: 'complex' },
      ]);
    });

    test('should get task details', () => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      const task = teamMode.getTask(taskId);
      expect(task.goalId).toBe(goalId);
      expect(task.title).toBe('Update packages');
      expect(task.complexity).toBe('simple');
      expect(task.status).toBe('pending');
    });

    test('should assign task to team member', () => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      teamMode.assignTask(taskId, 'charlie');

      const task = teamMode.getTask(taskId);
      expect(task.assignee).toBe('charlie');
    });

    test('should update task status', () => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      teamMode.updateTaskStatus(taskId, 'executing', 'charlie');

      const task = teamMode.getTask(taskId);
      expect(task.status).toBe('executing');
      expect(task.startedAt).not.toBeNull();
    });

    test('should track completion time', () => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      teamMode.updateTaskStatus(taskId, 'executing', 'charlie');
      const taskBefore = teamMode.getTask(taskId);
      expect(taskBefore.startedAt).not.toBeNull();
      expect(taskBefore.completedAt).toBeNull();

      teamMode.updateTaskStatus(taskId, 'completed', 'charlie');
      const taskAfter = teamMode.getTask(taskId);
      expect(taskAfter.completedAt).not.toBeNull();
    });

    test('should emit task:assigned event', (done) => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      teamMode.on('task:assigned', ({ taskId: tId, assignee }) => {
        expect(assignee).toBe('charlie');
        done();
      });

      teamMode.assignTask(taskId, 'charlie');
    });
  });

  // ============================================================================
  // APPROVAL WORKFLOW
  // ============================================================================

  describe('Approval Workflow', () => {
    let goalId, complexTaskId;

    beforeEach(() => {
      goalId = teamMode.submitGoal('alice', 'Security Upgrade', 'Update security infrastructure', [
        { title: 'Rotate encryption keys', complexity: 'complex' },
        { title: 'Update SSL certificates', complexity: 'medium' },
      ]);

      const goal = teamMode.getGoal(goalId);
      complexTaskId = goal.tasks[0];
    });

    test('should mark complex tasks as requiring approval', () => {
      const task = teamMode.getTask(complexTaskId);
      expect(task.requiresApproval).toBe(true);
    });

    test('should request approvals when task enters awaiting_approval status', () => {
      teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'alice');

      const task = teamMode.getTask(complexTaskId);
      expect(task.approvals.length).toBeGreaterThan(0);
    });

    test('should track approval records', () => {
      teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'alice');

      const task = teamMode.getTask(complexTaskId);
      const approval = teamMode.approvals.get(task.approvalsData[0].id);

      expect(approval.status).toBe('pending');
      expect(approval.taskId).toBe(complexTaskId);
    });

    test('should record approver sign-off', () => {
      teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'alice');

      const task = teamMode.getTask(complexTaskId);
      const approvalId = task.approvals[0];

      teamMode.approveTask(complexTaskId, 'lead_approver', true, 'Looks good');

      const approval = teamMode.approvals.get(approvalId);
      expect(approval.status).toBe('approved');
      expect(approval.reason).toBe('Looks good');
    });

    test('should move task to executing after all approvals', () => {
      teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'alice');

      const task = teamMode.getTask(complexTaskId);
      const approvalCount = task.approvals.length;

      // Approve all
      task.approvals.forEach((apprId) => {
        const approval = teamMode.approvals.get(apprId);
        teamMode.approveTask(complexTaskId, approval.approver, true);
      });

      const updatedTask = teamMode.getTask(complexTaskId);
      expect(updatedTask.status).toBe('executing');
    });

    test('should reject task if any approver rejects', () => {
      teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'alice');

      const task = teamMode.getTask(complexTaskId);
      const firstApprovalId = task.approvals[0];
      const firstApprover = teamMode.approvals.get(firstApprovalId).approver;

      teamMode.approveTask(complexTaskId, firstApprover, false, 'Needs revision');

      // Approve remaining
      task.approvals.forEach((apprId) => {
        const approval = teamMode.approvals.get(apprId);
        if (approval.status === 'pending') {
          teamMode.approveTask(complexTaskId, approval.approver, true);
        }
      });

      const updatedTask = teamMode.getTask(complexTaskId);
      expect(updatedTask.status).toBe('rejected');
    });

    test('should emit approval:recorded event', (done) => {
      teamMode.on('approval:recorded', ({ taskId, approver, approved }) => {
        expect(approved).toBe(true);
        done();
      });

      teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'alice');
      const task = teamMode.getTask(complexTaskId);
      const approval = teamMode.approvals.get(task.approvals[0]);

      teamMode.approveTask(complexTaskId, approval.approver, true);
    });
  });

  // ============================================================================
  // COLLABORATION: COMMENTS
  // ============================================================================

  describe('Comments & Reactions', () => {
    let goalId, taskId;

    beforeEach(() => {
      goalId = teamMode.submitGoal('alice', 'API Development', 'Build REST API');
      const goal = teamMode.getGoal(goalId);
      taskId = goal.tasks[0] || goalId; // Fallback if no tasks created
    });

    test('should add comment to task', () => {
      teamMode.addComment(taskId, 'charlie', 'I can take this task', []);

      const task = teamMode.getTask(taskId);
      expect(task.commentsData.length).toBe(1);
      expect(task.commentsData[0].text).toBe('I can take this task');
      expect(task.commentsData[0].author).toBe('charlie');
    });

    test('should edit comment by author', () => {
      const comment = teamMode.addComment(taskId, 'charlie', 'Original text', []);

      teamMode.editComment(comment.id, 'Updated text', 'charlie');

      const updated = teamMode.comments.get(comment.id);
      expect(updated.text).toBe('Updated text');
      expect(updated.edited).toBe(true);
      expect(updated.editedAt).not.toBeNull();
    });

    test('should prevent non-author from editing comment', () => {
      const comment = teamMode.addComment(taskId, 'charlie', 'Original text', []);

      expect(() => {
        teamMode.editComment(comment.id, 'Hacked text', 'bob');
      }).toThrow('Only comment author can edit');
    });

    test('should add emoji reaction to comment', () => {
      const comment = teamMode.addComment(taskId, 'charlie', 'Great idea!', []);

      teamMode.addReaction(comment.id, '👍', 'alice');
      teamMode.addReaction(comment.id, '👍', 'bob');
      teamMode.addReaction(comment.id, '❤️', 'alice');

      const reactions = comment.reactions;
      expect(reactions['👍']).toContain('alice');
      expect(reactions['👍']).toContain('bob');
      expect(reactions['❤️']).toContain('alice');
      expect(reactions['👍'].length).toBe(2);
    });

    test('should emit comment:added event', (done) => {
      teamMode.on('comment:added', ({ taskId: tId, author }) => {
        expect(author).toBe('charlie');
        done();
      });

      teamMode.addComment(taskId, 'charlie', 'Test comment', []);
    });
  });

  // ============================================================================
  // REAL-TIME PROGRESS DASHBOARD
  // ============================================================================

  describe('Progress Dashboard', () => {
    let goalId;

    beforeEach(() => {
      goalId = teamMode.submitGoal('alice', 'Product Launch', 'Launch MVP', [
        { title: 'Frontend development', complexity: 'medium' },
        { title: 'Backend development', complexity: 'complex' },
        { title: 'Testing', complexity: 'medium' },
        { title: 'Deployment', complexity: 'complex' },
      ]);
    });

    test('should calculate progress', () => {
      const goal = teamMode.getGoal(goalId);
      const progress = goal.progress;

      expect(progress.totalTasks).toBe(4);
      expect(progress.completed).toBe(0);
      expect(progress.percentComplete).toBe(0);
      expect(progress.estimatedTimeRemaining).toBeGreaterThan(0);
    });

    test('should update progress as tasks complete', () => {
      const goal = teamMode.getGoal(goalId);
      const tasks = goal.tasks;

      // Complete first task
      teamMode.updateTaskStatus(tasks[0], 'executing', 'charlie');
      teamMode.updateTaskStatus(tasks[0], 'completed', 'charlie');

      const progress = teamMode._calculateProgress(goalId);
      expect(progress.completed).toBe(1);
      expect(progress.percentComplete).toBe(25);
    });

    test('should identify bottlenecks', () => {
      const goal = teamMode.getGoal(goalId);
      const tasks = goal.tasks;

      // Block a task
      teamMode.updateTaskStatus(tasks[1], 'blocked', 'system');

      // Request approval for another
      teamMode.updateTaskStatus(tasks[2], 'awaiting_approval', 'alice');

      const dashboard = teamMode.getDashboard(goalId);
      const bottlenecks = dashboard.progress.bottlenecks;

      expect(bottlenecks.some((b) => b.type === 'blocked')).toBe(true);
      expect(bottlenecks.some((b) => b.type === 'approval_pending')).toBe(true);
    });

    test('should cache progress data', () => {
      const progress1 = teamMode._calculateProgress(goalId);
      const progress2 = teamMode._calculateProgress(goalId);

      expect(progress1).toEqual(progress2);
      expect(teamMode.progressCache.has(goalId)).toBe(true);
    });

    test('should invalidate cache on task update', () => {
      teamMode._calculateProgress(goalId);
      expect(teamMode.progressCache.has(goalId)).toBe(true);

      const goal = teamMode.getGoal(goalId);
      teamMode.updateTaskStatus(goal.tasks[0], 'executing', 'charlie');

      expect(teamMode.progressCache.has(goalId)).toBe(false);
    });

    test('should get full dashboard', () => {
      const dashboard = teamMode.getDashboard(goalId);

      expect(dashboard.goalId).toBe(goalId);
      expect(dashboard.title).toBe('Product Launch');
      expect(dashboard.progress).toBeDefined();
      expect(dashboard.tasks).toBeDefined();
      expect(dashboard.tasks.length).toBe(4);
      expect(dashboard.approvalSummary).toBeDefined();
      expect(dashboard.lastUpdated).toBeDefined();
    });
  });

  // ============================================================================
  // NOTIFICATIONS
  // ============================================================================

  describe('Notifications', () => {
    test('should send notification on goal submission', (done) => {
      teamMode.on('notification:sent', (notif) => {
        expect(notif.event).toBe('goal_submitted');
        done();
      });

      teamMode.submitGoal('alice', 'Test Goal', 'Test');
    });

    test('should format notification messages', () => {
      const msg = teamMode._formatNotificationMessage('goal_submitted', {
        title: 'Deploy API',
        owner: 'alice',
        taskCount: 5,
      });

      expect(msg).toContain('Deploy API');
      expect(msg).toContain('alice');
      expect(msg).toContain('5 tasks');
    });

    test('should get notifications by filter', () => {
      teamMode.submitGoal('alice', 'Goal 1', 'Test');
      teamMode.submitGoal('bob', 'Goal 2', 'Test');

      const notifications = teamMode.getNotifications({ event: 'goal_submitted' });
      expect(notifications.length).toBe(2);
      expect(notifications[0].event).toBe('goal_submitted');
    });

    test('should track notification sending', () => {
      const before = teamMode.notifications.length;
      teamMode.submitGoal('alice', 'New Goal', 'Test');
      const after = teamMode.notifications.length;

      expect(after).toBeGreaterThan(before);
    });
  });

  // ============================================================================
  // REPORTING & EXPORT
  // ============================================================================

  describe('Reporting', () => {
    let goalId;

    beforeEach(() => {
      goalId = teamMode.submitGoal('alice', 'Full Workflow Test', 'Test all features', [
        { title: 'Task 1', complexity: 'simple' },
        { title: 'Task 2', complexity: 'complex' },
      ]);
    });

    test('should export goal report', () => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      teamMode.addComment(taskId, 'charlie', 'Test comment');
      teamMode.updateTaskStatus(taskId, 'completed', 'charlie');

      const report = teamMode.exportGoalReport(goalId);

      expect(report.goal).toBeDefined();
      expect(report.goal.id).toBe(goalId);
      expect(report.tasks).toBeDefined();
      expect(report.tasks.length).toBe(2);
      expect(report.exportedAt).toBeDefined();
    });

    test('should include all task details in report', () => {
      const goal = teamMode.getGoal(goalId);
      const taskId = goal.tasks[0];

      teamMode.addComment(taskId, 'charlie', 'Comment 1');
      teamMode.addComment(taskId, 'alice', 'Comment 2');

      const report = teamMode.exportGoalReport(goalId);
      const taskInReport = report.tasks[0];

      expect(taskInReport.comments.length).toBe(2);
      expect(taskInReport.approvals).toBeDefined();
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe('Edge Cases', () => {
    test('should handle non-existent goal', () => {
      const goal = teamMode.getGoal('goal_nonexistent');
      expect(goal).toBeNull();
    });

    test('should handle non-existent task', () => {
      const task = teamMode.getTask('task_nonexistent');
      expect(task).toBeNull();
    });

    test('should prevent duplicate reactions', () => {
      const goalId = teamMode.submitGoal('alice', 'Test', 'Test');
      const goal = teamMode.getGoal(goalId);
      const comment = teamMode.addComment(goal.tasks[0], 'alice', 'Test');

      teamMode.addReaction(comment.id, '👍', 'alice');
      teamMode.addReaction(comment.id, '👍', 'alice');

      const reactions = comment.reactions;
      expect(reactions['👍'].filter((u) => u === 'alice').length).toBe(1);
    });

    test('should handle empty goal task list', () => {
      const goalId = teamMode.submitGoal('alice', 'Empty Goal', 'No tasks');
      const progress = teamMode._calculateProgress(goalId);

      expect(progress.totalTasks).toBe(0);
      expect(progress.percentComplete).toBe(0);
    });
  });
});
