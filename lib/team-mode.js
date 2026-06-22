/**
 * TeamMode - Multi-user Collaborative Task Management
 * Enables owner-submitted goals, approver review workflow, real-time progress,
 * task comments, and notification system (Slack/Discord).
 */

const EventEmitter = require('events');
const crypto = require('crypto');

class TeamMode extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = {
      notificationChannels: config.notificationChannels || {}, // { slack: {...}, discord: {...} }
      autoApprovalThreshold: config.autoApprovalThreshold || 0.7, // auto-approve simple tasks
      requireApprovalFor: config.requireApprovalFor || [
        'infrastructure',
        'security',
        'database',
        'payment',
        'user-data',
      ], // complex task keywords
      ...config,
    };

    this.goals = new Map(); // id -> { owner, title, description, createdAt, status, tasks, approvals }
    this.tasks = new Map(); // id -> { goalId, title, complexity, status, assignee, approvals, comments }
    this.comments = new Map(); // id -> { taskId, author, text, timestamp, reactions }
    this.approvals = new Map(); // id -> { taskId, approver, status, timestamp, reason }
    this.notifications = []; // log of sent notifications
    this.collaborators = new Map(); // userId -> { name, email, role, permissions }
    this.progressCache = new Map(); // goalId -> cached progress data
  }

  // ============================================================================
  // GOAL MANAGEMENT
  // ============================================================================

  /**
   * Owner submits a goal with title, description, and initial task breakdown
   */
  submitGoal(owner, title, description, suggestedTasks = []) {
    const goalId = this._generateId('goal');
    const goal = {
      id: goalId,
      owner,
      title,
      description,
      createdAt: new Date().toISOString(),
      status: 'pending_review', // pending_review -> approved -> in_progress -> completed
      tasks: [],
      approvals: {}, // approver -> { status, timestamp, feedback }
      metadata: {
        estimatedComplexity: 'medium',
        priority: 'normal',
        targetDate: null,
        tags: [],
      },
    };

    this.goals.set(goalId, goal);

    // Auto-create suggested tasks
    if (suggestedTasks.length > 0) {
      suggestedTasks.forEach((taskDef, idx) => {
        const taskId = this._createTask(goalId, taskDef.title, taskDef.complexity || 'medium');
        goal.tasks.push(taskId);
      });
    }

    this.emit('goal:submitted', { goalId, owner, title });
    this._notifyApprovers('goal_submitted', {
      goalId,
      owner,
      title,
      taskCount: goal.tasks.length,
    });

    return goalId;
  }

  /**
   * Get goal with full task and approval details
   */
  getGoal(goalId) {
    const goal = this.goals.get(goalId);
    if (!goal) return null;

    return {
      ...goal,
      taskDetails: goal.tasks.map((taskId) => this.getTask(taskId)),
      approvalStatus: this._calculateApprovalStatus(goal.approvals),
      progress: this._calculateProgress(goalId),
    };
  }

  /**
   * Update goal status (by owner or approver)
   */
  updateGoalStatus(goalId, newStatus, actor) {
    const goal = this.goals.get(goalId);
    if (!goal) throw new Error(`Goal ${goalId} not found`);

    const validStatuses = [
      'pending_review',
      'approved',
      'rejected',
      'in_progress',
      'completed',
      'paused',
    ];
    if (!validStatuses.includes(newStatus))
      throw new Error(`Invalid status: ${newStatus}`);

    goal.status = newStatus;
    this.emit('goal:status_changed', { goalId, newStatus, actor });

    if (newStatus === 'approved') {
      this._notifyApprovers('goal_approved', { goalId, actor });
      // Auto-start simple tasks
      goal.tasks.forEach((taskId) => {
        const task = this.tasks.get(taskId);
        if (task.complexity === 'simple' && task.status === 'pending') {
          this.updateTaskStatus(taskId, 'auto_executing', 'system');
        }
      });
    }

    return goal;
  }

  // ============================================================================
  // TASK MANAGEMENT & APPROVAL WORKFLOW
  // ============================================================================

  /**
   * Create a task within a goal
   */
  _createTask(goalId, title, complexity = 'medium') {
    const taskId = this._generateId('task');
    const requiresApproval = this._isComplexTask(complexity);

    const task = {
      id: taskId,
      goalId,
      title,
      description: '',
      complexity, // simple | medium | complex
      status: 'pending', // pending -> awaiting_approval -> executing -> completed
      requiresApproval,
      assignee: null,
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      approvals: [], // Array of approval records
      comments: [],
      estimatedHours: 1,
      actualHours: 0,
      dependencies: [],
      attachments: [],
    };

    this.tasks.set(taskId, task);
    this.emit('task:created', { taskId, goalId, title, complexity });

    return taskId;
  }

  /**
   * Get task with comments and approval details
   */
  getTask(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) return null;

    return {
      ...task,
      commentsData: task.comments.map((commentId) => this.comments.get(commentId)),
      approvalsData: task.approvals.map((approvalId) => this.approvals.get(approvalId)),
      approvalStatus: this._getTaskApprovalStatus(task),
    };
  }

  /**
   * Assign task to a team member
   */
  assignTask(taskId, assignee) {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);

    task.assignee = assignee;
    this.emit('task:assigned', { taskId, assignee });
    this._notifyUser(assignee, 'task_assigned', { taskId, title: task.title });

    return task;
  }

  /**
   * Update task status with approval workflow
   */
  updateTaskStatus(taskId, newStatus, actor) {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);

    const validStatuses = [
      'pending',
      'awaiting_approval',
      'executing',
      'blocked',
      'completed',
      'failed',
      'auto_executing',
    ];
    if (!validStatuses.includes(newStatus))
      throw new Error(`Invalid status: ${newStatus}`);

    const oldStatus = task.status;
    task.status = newStatus;

    // If complex task, move to approval workflow
    if (task.requiresApproval && newStatus === 'awaiting_approval') {
      this._requestApprovals(taskId);
    }

    // Track execution time
    if (newStatus === 'executing' && !task.startedAt) {
      task.startedAt = new Date().toISOString();
    }
    if (newStatus === 'completed') {
      task.completedAt = new Date().toISOString();
    }

    this.emit('task:status_changed', { taskId, oldStatus, newStatus, actor });
    this._invalidateProgressCache(task.goalId);

    return task;
  }

  /**
   * Check if task should require approval
   */
  _isComplexTask(complexity) {
    return complexity === 'complex' || complexity === 'medium';
  }

  /**
   * Request approvals for a complex task
   */
  _requestApprovals(taskId) {
    const task = this.tasks.get(taskId);
    const goal = this.goals.get(task.goalId);

    const approverList = this._getApproversForTask(task);
    approverList.forEach((approver) => {
      const approvalId = this._generateId('approval');
      const approval = {
        id: approvalId,
        taskId,
        approver,
        status: 'pending', // pending -> approved -> rejected
        timestamp: new Date().toISOString(),
        reason: '',
        signOffRequired: true,
      };

      this.approvals.set(approvalId, approval);
      task.approvals.push(approvalId);

      this.emit('approval:requested', { taskId, approver });
      this._notifyApprover(approver, 'approval_required', {
        taskId,
        taskTitle: task.title,
        goalId: task.goalId,
        complexity: task.complexity,
      });
    });
  }

  /**
   * Approver signs off on a task
   */
  approveTask(taskId, approver, approved = true, reason = '') {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);

    const approvalRecord = task.approvals.find((apprId) => {
      const apr = this.approvals.get(apprId);
      return apr.approver === approver && apr.status === 'pending';
    });

    if (!approvalRecord) {
      throw new Error(`No pending approval for ${approver} on task ${taskId}`);
    }

    const approval = this.approvals.get(approvalRecord);
    approval.status = approved ? 'approved' : 'rejected';
    approval.reason = reason;

    this.emit('approval:recorded', {
      taskId,
      approver,
      approved,
      reason,
    });

    // Check if all approvals are complete
    const allApproved = task.approvals.every((apprId) => {
      const apr = this.approvals.get(apprId);
      return apr.status !== 'pending';
    });

    if (allApproved) {
      const anyRejected = task.approvals.some((apprId) => {
        const apr = this.approvals.get(apprId);
        return apr.status === 'rejected';
      });

      if (anyRejected) {
        this.updateTaskStatus(taskId, 'rejected', approver);
        this._notifyUser(task.assignee, 'task_rejected', {
          taskId,
          title: task.title,
        });
      } else {
        this.updateTaskStatus(taskId, 'executing', approver);
        this._notifyUser(task.assignee, 'task_approved', {
          taskId,
          title: task.title,
        });
      }
    }

    return approval;
  }

  /**
   * Get approvers for a task based on complexity and keywords
   */
  _getApproversForTask(task) {
    // For MVP: return hardcoded approver list
    // In production: would query RBAC system
    const goal = this.goals.get(task.goalId);

    // Check if task title/description matches sensitive keywords
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    const isSensitive = this.config.requireApprovalFor.some((keyword) =>
      taskText.includes(keyword)
    );

    if (isSensitive || task.complexity === 'complex') {
      return ['lead_approver', 'security_lead'];
    }
    if (task.complexity === 'medium') {
      return ['tech_lead'];
    }
    return [];
  }

  /**
   * Get approval status for a task
   */
  _getTaskApprovalStatus(task) {
    const approvals = task.approvals.map((apprId) => this.approvals.get(apprId));

    return {
      pending: approvals.filter((a) => a.status === 'pending').length,
      approved: approvals.filter((a) => a.status === 'approved').length,
      rejected: approvals.filter((a) => a.status === 'rejected').length,
      isComplete: approvals.length > 0 && !approvals.some((a) => a.status === 'pending'),
      allApproved: approvals.length > 0 && approvals.every((a) => a.status === 'approved'),
    };
  }

  // ============================================================================
  // COLLABORATION: COMMENTS & REACTIONS
  // ============================================================================

  /**
   * Add comment to a task
   */
  addComment(taskId, author, text, attachments = []) {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);

    const commentId = this._generateId('comment');
    const comment = {
      id: commentId,
      taskId,
      author,
      text,
      timestamp: new Date().toISOString(),
      attachments,
      reactions: {}, // { emoji -> [users] }
      edited: false,
      editedAt: null,
    };

    this.comments.set(commentId, comment);
    task.comments.push(commentId);

    this.emit('comment:added', { commentId, taskId, author });

    // Notify other collaborators
    this._notifyCollaborators(taskId, 'comment_added', {
      taskId,
      commentAuthor: author,
      preview: text.substring(0, 100),
    });

    return comment;
  }

  /**
   * Edit comment
   */
  editComment(commentId, newText, editor) {
    const comment = this.comments.get(commentId);
    if (!comment) throw new Error(`Comment ${commentId} not found`);
    if (comment.author !== editor) {
      throw new Error('Only comment author can edit');
    }

    comment.text = newText;
    comment.edited = true;
    comment.editedAt = new Date().toISOString();

    this.emit('comment:edited', { commentId, editor });
    return comment;
  }

  /**
   * Add reaction to comment (emoji)
   */
  addReaction(commentId, emoji, user) {
    const comment = this.comments.get(commentId);
    if (!comment) throw new Error(`Comment ${commentId} not found`);

    if (!comment.reactions[emoji]) {
      comment.reactions[emoji] = [];
    }
    if (!comment.reactions[emoji].includes(user)) {
      comment.reactions[emoji].push(user);
    }

    return comment.reactions;
  }

  // ============================================================================
  // REAL-TIME PROGRESS DASHBOARD
  // ============================================================================

  /**
   * Calculate progress for a goal
   */
  _calculateProgress(goalId) {
    const cached = this.progressCache.get(goalId);
    if (cached && Date.now() - cached.timestamp < 5000) {
      return cached.data;
    }

    const goal = this.goals.get(goalId);
    const tasks = goal.tasks.map((taskId) => this.tasks.get(taskId));

    const progress = {
      totalTasks: tasks.length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      executing: tasks.filter((t) => t.status === 'executing').length,
      awaiting: tasks.filter(
        (t) => t.status === 'awaiting_approval' || t.status === 'pending'
      ).length,
      blocked: tasks.filter((t) => t.status === 'blocked').length,
      failed: tasks.filter((t) => t.status === 'failed').length,
      percentComplete:
        tasks.length > 0
          ? Math.round(
              (tasks.filter((t) => t.status === 'completed').length /
                tasks.length) *
                100
            )
          : 0,
      estimatedTimeRemaining: this._estimateTimeRemaining(tasks),
      bottlenecks: this._identifyBottlenecks(tasks),
      timestamp: Date.now(),
    };

    this.progressCache.set(goalId, { data: progress, timestamp: Date.now() });
    return progress;
  }

  /**
   * Estimate remaining time
   */
  _estimateTimeRemaining(tasks) {
    const remaining = tasks
      .filter((t) => t.status !== 'completed')
      .reduce((sum, t) => sum + (t.estimatedHours || 1), 0);
    return remaining;
  }

  /**
   * Identify bottlenecks (blocked tasks, pending approvals)
   */
  _identifyBottlenecks(tasks) {
    const bottlenecks = [];

    tasks.forEach((task) => {
      if (task.status === 'blocked') {
        bottlenecks.push({
          type: 'blocked',
          taskId: task.id,
          title: task.title,
        });
      }
      if (task.status === 'awaiting_approval') {
        const pending = task.approvals.filter(
          (apprId) => this.approvals.get(apprId).status === 'pending'
        );
        if (pending.length > 0) {
          bottlenecks.push({
            type: 'approval_pending',
            taskId: task.id,
            title: task.title,
            pendingApprovalsCount: pending.length,
          });
        }
      }
    });

    return bottlenecks;
  }

  /**
   * Get real-time dashboard data for a goal
   */
  getDashboard(goalId) {
    const goal = this.goals.get(goalId);
    if (!goal) return null;

    const progress = this._calculateProgress(goalId);
    const tasks = goal.tasks.map((taskId) => {
      const task = this.tasks.get(taskId);
      return {
        id: task.id,
        title: task.title,
        status: task.status,
        assignee: task.assignee,
        complexity: task.complexity,
        commentCount: task.comments.length,
        approvalStatus: this._getTaskApprovalStatus(task),
      };
    });

    return {
      goalId,
      title: goal.title,
      owner: goal.owner,
      status: goal.status,
      progress,
      tasks,
      approvalSummary: this._getGoalApprovalSummary(goal),
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get approval summary for entire goal
   */
  _getGoalApprovalSummary(goal) {
    const allApprovalsNeeded = goal.tasks
      .map((taskId) => this.tasks.get(taskId))
      .filter((t) => t.requiresApproval);

    const allApprovals = allApprovalsNeeded.flatMap((t) =>
      t.approvals.map((apprId) => this.approvals.get(apprId))
    );

    return {
      totalNeeded: allApprovals.length,
      approved: allApprovals.filter((a) => a.status === 'approved').length,
      pending: allApprovals.filter((a) => a.status === 'pending').length,
      rejected: allApprovals.filter((a) => a.status === 'rejected').length,
    };
  }

  /**
   * Invalidate progress cache for a goal
   */
  _invalidateProgressCache(goalId) {
    this.progressCache.delete(goalId);
  }

  // ============================================================================
  // NOTIFICATIONS (Slack/Discord)
  // ============================================================================

  /**
   * Send notification to approvers
   */
  _notifyApprovers(event, data) {
    this._sendNotification(event, data, {
      channels: ['slack', 'discord'],
      recipients: ['lead_approver', 'security_lead', 'tech_lead'],
    });
  }

  /**
   * Send notification to specific approver
   */
  _notifyApprover(approver, event, data) {
    this._sendNotification(event, data, {
      channels: ['slack', 'discord'],
      recipients: [approver],
    });
  }

  /**
   * Send notification to specific user
   */
  _notifyUser(user, event, data) {
    if (!user) return;
    this._sendNotification(event, data, {
      channels: ['slack', 'discord'],
      recipients: [user],
    });
  }

  /**
   * Notify other collaborators on a task
   */
  _notifyCollaborators(taskId, event, data) {
    const task = this.tasks.get(taskId);
    const commentAuthors = task.comments.map((cId) => this.comments.get(cId).author);
    const uniqueUsers = [...new Set([task.assignee, ...commentAuthors])].filter(
      Boolean
    );

    this._sendNotification(event, data, {
      channels: ['slack', 'discord'],
      recipients: uniqueUsers,
    });
  }

  /**
   * Send notification to channels
   */
  _sendNotification(event, data, options) {
    const notification = {
      id: this._generateId('notif'),
      event,
      data,
      timestamp: new Date().toISOString(),
      channels: options.channels || [],
      recipients: options.recipients || [],
      status: 'sent',
    };

    this.notifications.push(notification);
    this.emit('notification:sent', notification);

    // Actually send to configured channels
    options.channels.forEach((channel) => {
      if (this.config.notificationChannels[channel]) {
        this._sendToChannel(channel, event, data, options.recipients);
      }
    });

    return notification;
  }

  /**
   * Send to specific notification channel
   */
  _sendToChannel(channel, event, data, recipients) {
    const channelConfig = this.config.notificationChannels[channel];
    if (!channelConfig) return;

    // Format message based on event type
    const message = this._formatNotificationMessage(event, data, channel);

    if (channel === 'slack' && channelConfig.webhook) {
      this._sendSlackNotification(channelConfig.webhook, message);
    } else if (channel === 'discord' && channelConfig.webhook) {
      this._sendDiscordNotification(channelConfig.webhook, message);
    }

    this.emit(`notification:${channel}`, { event, data, message });
  }

  /**
   * Format notification message
   */
  _formatNotificationMessage(event, data, channel) {
    const templates = {
      goal_submitted: () =>
        `New goal submitted: "${data.title}" by ${data.owner} (${data.taskCount} tasks)`,
      goal_approved: () => `Goal approved by ${data.actor}`,
      approval_required: () =>
        `Review needed: Task "${data.taskTitle}" (${data.complexity}) in goal ${data.goalId}`,
      approval_recorded: () =>
        `${data.approved ? 'Approved' : 'Rejected'} by ${data.approver}: ${data.reason}`,
      task_assigned: () => `New task assigned: "${data.title}"`,
      task_rejected: () => `Task rejected: "${data.title}" - needs revision`,
      task_approved: () => `Task approved: "${data.title}" - ready to execute`,
      comment_added: () =>
        `New comment on task by ${data.commentAuthor}: "${data.preview}..."`,
    };

    return templates[event] ? templates[event]() : `Event: ${event}`;
  }

  /**
   * Send Slack notification (mock)
   */
  async _sendSlackNotification(webhook, message) {
    try {
      // In production, would call actual Slack API
      // await fetch(webhook, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text: message })
      // });
      this.emit('slack:sent', { message, webhook });
    } catch (err) {
      this.emit('slack:error', { error: err.message });
    }
  }

  /**
   * Send Discord notification (mock)
   */
  async _sendDiscordNotification(webhook, message) {
    try {
      // In production, would call actual Discord API
      // await fetch(webhook, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content: message })
      // });
      this.emit('discord:sent', { message, webhook });
    } catch (err) {
      this.emit('discord:error', { error: err.message });
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Register a collaborator
   */
  registerCollaborator(userId, name, email, role = 'contributor') {
    this.collaborators.set(userId, {
      userId,
      name,
      email,
      role,
      joinedAt: new Date().toISOString(),
    });
    return this.collaborators.get(userId);
  }

  /**
   * Calculate approval status
   */
  _calculateApprovalStatus(approvals) {
    if (Object.keys(approvals).length === 0) {
      return { status: 'no_approvals_needed' };
    }

    const statuses = Object.values(approvals).map((a) => a.status);
    const allApproved = statuses.every((s) => s === 'approved');
    const anyRejected = statuses.some((s) => s === 'rejected');

    return {
      status: anyRejected ? 'rejected' : allApproved ? 'approved' : 'pending',
      approved: statuses.filter((s) => s === 'approved').length,
      rejected: statuses.filter((s) => s === 'rejected').length,
      pending: statuses.filter((s) => s === 'pending').length,
    };
  }

  /**
   * Generate unique ID
   */
  _generateId(prefix) {
    return `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
  }

  /**
   * Get all notifications (optionally filtered)
   */
  getNotifications(filters = {}) {
    let result = this.notifications;

    if (filters.channel) {
      result = result.filter((n) => n.channels.includes(filters.channel));
    }
    if (filters.event) {
      result = result.filter((n) => n.event === filters.event);
    }
    if (filters.since) {
      result = result.filter(
        (n) => new Date(n.timestamp) > new Date(filters.since)
      );
    }

    return result;
  }

  /**
   * Export goal data for reporting
   */
  exportGoalReport(goalId) {
    const goal = this.goals.get(goalId);
    if (!goal) return null;

    const tasks = goal.tasks.map((taskId) => {
      const task = this.tasks.get(taskId);
      return {
        ...task,
        comments: task.comments.map((cId) => this.comments.get(cId)),
        approvals: task.approvals.map((aId) => this.approvals.get(aId)),
      };
    });

    return {
      goal: {
        ...goal,
        progress: this._calculateProgress(goalId),
        approvalSummary: this._getGoalApprovalSummary(goal),
      },
      tasks,
      notifications: this.getNotifications({ event: /task|approval/i }),
      exportedAt: new Date().toISOString(),
    };
  }
}

module.exports = TeamMode;
