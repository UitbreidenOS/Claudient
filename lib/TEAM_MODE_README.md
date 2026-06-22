# TeamMode - Multi-User Collaborative Task Management

TeamMode enables real-time multi-user collaboration on complex goals with automated task execution, human approval workflows, live dashboards, and integrated notifications.

## Core Features

### 1. Goal & Task Management
- **Owner Submission**: Goals with title, description, and suggested tasks
- **Task Breakdown**: Automatic task creation from suggestion list
- **Complexity Classification**: simple | medium | complex (drives approval logic)
- **Status Tracking**: pending → approved → in_progress → completed
- **Task Dependencies**: Support for task sequencing and blocking

### 2. Approval Workflow
- **Automatic Execution**: Simple tasks (complexity: simple) execute immediately
- **Approval Gates**: Complex and medium tasks require human sign-off before execution
- **Flexible Approvers**: Assigned based on task complexity and sensitive keywords
- **Multi-Approver Support**: Tasks can require multiple approvals
- **Rejection Handling**: Tasks rejected by any approver move to revision state
- **Approval Tracking**: Full audit trail of who approved/rejected and when

### 3. Real-Time Collaboration
- **Comments**: Add text/file comments to any task
- **Edit Comments**: Authors can update their comments with edit timestamp
- **Emoji Reactions**: React to comments with emojis (👍 ❤️ ✨ etc.)
- **Mentions**: @-mention team members in comments
- **Threads**: Nested comment replies for focused discussions

### 4. Live Progress Dashboard
- **Real-Time Metrics**:
  - Overall completion percentage
  - Task breakdown by status (completed, executing, awaiting, blocked, failed)
  - Estimated time remaining
  - Task count by complexity
- **Bottleneck Detection**:
  - Identifies blocked tasks
  - Shows pending approvals
  - Flags delayed tasks
- **Progress Caching**: 5-second cache for performance
- **Task View**: Each task shows status, assignee, complexity, comments, approvals

### 5. Notifications (Slack/Discord)
- **Event Types**:
  - `goal_submitted` → sent to approvers
  - `goal_approved` → sent to team
  - `approval_required` → sent to approvers
  - `task_assigned` → sent to assignee
  - `task_approved` → sent to assignee
  - `task_rejected` → sent to assignee
  - `comment_added` → sent to task collaborators
- **Channels**: Slack and Discord webhooks
- **Formatting**: Custom message templates per event
- **Delivery**: Asynchronous, with event emissions for tracking

## API Reference

### TeamMode Class

```javascript
const TeamMode = require('./team-mode');

const teamMode = new TeamMode({
  notificationChannels: {
    slack: { webhook: 'https://hooks.slack.com/...' },
    discord: { webhook: 'https://discord.com/api/webhooks/...' }
  },
  autoApprovalThreshold: 0.7,
  requireApprovalFor: ['infrastructure', 'security', 'database', 'payment']
});
```

### Goal Management

#### `submitGoal(owner, title, description, suggestedTasks)`
Submit a new goal with optional task breakdown.

```javascript
const goalId = teamMode.submitGoal(
  'alice_owner',
  'Migrate to Kubernetes',
  'Move services from VMs to K8s',
  [
    { title: 'Inventory services', complexity: 'simple' },
    { title: 'Set up cluster', complexity: 'complex' },
    { title: 'Deploy services', complexity: 'medium' }
  ]
);
```

**Returns**: `goalId` (string)

#### `getGoal(goalId)`
Get goal with full details including tasks, progress, and approvals.

```javascript
const goal = teamMode.getGoal(goalId);
// {
//   id, owner, title, description, status,
//   tasks: [taskIds],
//   taskDetails: [taskObjects],
//   progress: { percentComplete, bottlenecks, ... },
//   approvalStatus: { ... }
// }
```

#### `updateGoalStatus(goalId, newStatus, actor)`
Update goal status (pending_review → approved → in_progress → completed).

```javascript
teamMode.updateGoalStatus(goalId, 'approved', 'bob_approver');
// Auto-executes simple tasks, requests approvals for complex ones
```

### Task Management

#### `assignTask(taskId, assignee)`
Assign a task to a team member.

```javascript
teamMode.assignTask(taskId, 'diana_contributor');
// Sends notification to assignee
```

#### `updateTaskStatus(taskId, newStatus, actor)`
Update task status and trigger approval workflow if needed.

```javascript
teamMode.updateTaskStatus(taskId, 'executing', 'diana_contributor');
// Tracks startedAt timestamp, moves to approval workflow if complex
```

### Approval Workflow

#### `approveTask(taskId, approver, approved, reason)`
Record approver decision on a task.

```javascript
teamMode.approveTask(taskId, 'bob_lead_approver', true, 'Looks good');
// If all approvals received: moves task to executing
// If any rejection: moves task to rejected
```

### Collaboration

#### `addComment(taskId, author, text, attachments)`
Add comment to task.

```javascript
const comment = teamMode.addComment(
  taskId,
  'eve_contributor',
  'Cluster setup complete. 3 AZs, HA enabled.',
  [] // Optional: attachment URLs
);
```

#### `editComment(commentId, newText, editor)`
Edit comment (author-only).

```javascript
teamMode.editComment(comment.id, 'Updated text', 'eve_contributor');
```

#### `addReaction(commentId, emoji, user)`
React to comment with emoji.

```javascript
teamMode.addReaction(comment.id, '👍', 'bob_lead_approver');
teamMode.addReaction(comment.id, '❤️', 'alice_owner');
```

### Dashboard & Reporting

#### `getDashboard(goalId)`
Get real-time progress dashboard.

```javascript
const dashboard = teamMode.getDashboard(goalId);
// {
//   goalId, title, owner, status,
//   progress: { percentComplete, completed, executing, awaiting, bottlenecks },
//   tasks: [{ id, title, status, assignee, commentCount, approvalStatus }],
//   approvalSummary: { totalNeeded, approved, pending, rejected },
//   lastUpdated
// }
```

#### `exportGoalReport(goalId)`
Export complete goal report for documentation.

```javascript
const report = teamMode.exportGoalReport(goalId);
// {
//   goal: { ... full goal data with progress },
//   tasks: [{ ... full task data with comments, approvals }],
//   notifications: [ ... all related notifications ],
//   exportedAt
// }
```

### Notifications

#### `getNotifications(filters)`
Get notification log with optional filtering.

```javascript
const recents = teamMode.getNotifications({
  event: 'approval_required',
  channel: 'slack',
  since: '2024-06-20T00:00:00Z'
});
```

### Collaborators

#### `registerCollaborator(userId, name, email, role)`
Register team member.

```javascript
teamMode.registerCollaborator('alice', 'Alice Johnson', 'alice@company.com', 'owner');
teamMode.registerCollaborator('bob', 'Bob Smith', 'bob@company.com', 'approver');
```

## Workflow: Complete Example

### 1. Goal Submission
```javascript
const goalId = teamMode.submitGoal(
  'alice_owner',
  'Deploy API to Production',
  'Release new payment service',
  [
    { title: 'Code review', complexity: 'medium' },
    { title: 'Security audit', complexity: 'complex' },
    { title: 'Load testing', complexity: 'medium' },
    { title: 'Cutover', complexity: 'complex' }
  ]
);
// Notifications sent to approvers
```

### 2. Goal Review & Approval
```javascript
// Approvers review goal
const goal = teamMode.getGoal(goalId);
console.log(`${goal.tasks.length} tasks need review`);

// Approver approves goal
teamMode.updateGoalStatus(goalId, 'approved', 'bob_lead_approver');
// Simple tasks auto-execute, complex tasks await individual approval
```

### 3. Task Assignment
```javascript
const goal = teamMode.getGoal(goalId);
teamMode.assignTask(goal.tasks[0], 'diana_contributor'); // Code review
teamMode.assignTask(goal.tasks[1], 'eve_contributor');    // Security audit
teamMode.assignTask(goal.tasks[2], 'diana_contributor'); // Load test
teamMode.assignTask(goal.tasks[3], 'eve_contributor');    // Cutover
```

### 4. Execution with Collaboration
```javascript
// Diana completes code review (medium complexity - may need approval)
const codeReviewTask = teamMode.getTask(goal.tasks[0]);
teamMode.updateTaskStatus(codeReviewTask.id, 'executing', 'diana_contributor');

// Team comments
teamMode.addComment(
  codeReviewTask.id,
  'diana_contributor',
  'Code review complete. All checks pass. Ready for audit.'
);

// Approver reacts
const comment = codeReviewTask.commentsData[0];
teamMode.addReaction(comment.id, '✅', 'charlie_tech_lead');
```

### 5. Complex Task Approval
```javascript
// Eve starts security audit (complex - requires approval)
const auditTask = teamMode.getTask(goal.tasks[1]);
teamMode.updateTaskStatus(auditTask.id, 'awaiting_approval', 'eve_contributor');

// Approvers review and sign off
const audit = teamMode.getTask(auditTask.id);
audit.approvalsData.forEach(approval => {
  teamMode.approveTask(auditTask.id, approval.approver, true, 'Security OK');
});
// Task auto-moves to executing

teamMode.updateTaskStatus(auditTask.id, 'completed', 'eve_contributor');
```

### 6. Real-Time Dashboard
```javascript
const dashboard = teamMode.getDashboard(goalId);
console.log(`Progress: ${dashboard.progress.percentComplete}%`);
console.log(`Completed: ${dashboard.progress.completed}/${dashboard.progress.totalTasks}`);

if (dashboard.progress.bottlenecks.length > 0) {
  console.log('Bottlenecks:');
  dashboard.progress.bottlenecks.forEach(b => {
    console.log(`  - ${b.type}: ${b.taskTitle}`);
  });
}
```

## Event System

TeamMode extends EventEmitter. Listen to events:

```javascript
// Goal events
teamMode.on('goal:submitted', ({ goalId, owner, title }) => { ... });
teamMode.on('goal:status_changed', ({ goalId, newStatus, actor }) => { ... });

// Task events
teamMode.on('task:created', ({ taskId, goalId, title }) => { ... });
teamMode.on('task:assigned', ({ taskId, assignee }) => { ... });
teamMode.on('task:status_changed', ({ taskId, oldStatus, newStatus }) => { ... });

// Approval events
teamMode.on('approval:requested', ({ taskId, approver }) => { ... });
teamMode.on('approval:recorded', ({ taskId, approver, approved, reason }) => { ... });

// Comment events
teamMode.on('comment:added', ({ commentId, taskId, author }) => { ... });
teamMode.on('comment:edited', ({ commentId, editor }) => { ... });

// Notification events
teamMode.on('notification:sent', (notification) => { ... });
teamMode.on('slack:sent', ({ message, webhook }) => { ... });
teamMode.on('discord:sent', ({ message, webhook }) => { ... });
```

## Configuration

```javascript
new TeamMode({
  // Notification channels
  notificationChannels: {
    slack: { webhook: 'https://hooks.slack.com/...' },
    discord: { webhook: 'https://discord.com/api/webhooks/...' }
  },

  // Auto-approval threshold for simple/low-complexity tasks
  autoApprovalThreshold: 0.7,

  // Keywords/domains that require approval
  requireApprovalFor: [
    'infrastructure',
    'security',
    'database',
    'payment',
    'user-data'
  ]
});
```

## Complexity & Approval Rules

| Complexity | Requires Approval | Approvers | Auto-Execute |
|---|---|---|---|
| simple | No | N/A | ✓ |
| medium | Yes | tech_lead | On approval |
| complex | Yes | lead_approver, security_lead | On all approval |

### Sensitive Keywords
If task title/description contains: infrastructure, security, database, payment, user-data → escalates to highest approver level regardless of complexity.

## Performance Notes

- **Progress caching**: 5-second TTL to avoid recalculation
- **Event emission**: Async, doesn't block main execution
- **Notification delivery**: Fire-and-forget (failures logged but not thrown)
- **Task count**: No built-in limits; suitable for goals with 50-500 tasks

## Error Handling

```javascript
try {
  teamMode.updateTaskStatus(taskId, 'invalid_status', 'user');
} catch (err) {
  console.error('Invalid status:', err.message);
}

try {
  teamMode.editComment(commentId, 'new text', 'wrong_author');
} catch (err) {
  console.error('Only author can edit:', err.message);
}

try {
  teamMode.approveTask(taskId, 'approver', true);
} catch (err) {
  console.error('No pending approval for approver:', err.message);
}
```

## Testing

Run tests:

```bash
npm test -- lib/team-mode.test.js
```

Key test areas:
- Goal submission and lifecycle
- Task management and assignment
- Approval workflow (multi-approver, rejection)
- Comments and reactions
- Progress dashboard and caching
- Notification events
- Export/reporting
- Edge cases and error handling

## Integration Examples

### With Task Executor
```javascript
const TaskExecutor = require('./task-executor');
const executor = new TaskExecutor();

teamMode.on('task:status_changed', ({ taskId, newStatus }) => {
  if (newStatus === 'executing') {
    const task = teamMode.getTask(taskId);
    executor.execute(task.title, task.description);
  }
});
```

### With State Manager
```javascript
const StateManager = require('./state-manager');
const stateManager = new StateManager();

teamMode.on('goal:submitted', ({ goalId }) => {
  stateManager.saveState('goal', goalId, teamMode.getGoal(goalId));
});
```

### With Resume Engine
```javascript
const ResumeEngine = require('./resume-engine');
const resume = new ResumeEngine();

const report = teamMode.exportGoalReport(goalId);
resume.addToResume('project', {
  title: report.goal.title,
  description: report.goal.description,
  tasks: report.tasks.length,
  status: report.goal.status,
  progress: report.goal.progress.percentComplete
});
```

## Limitations & Future

### Current Limitations
- Approvers hardcoded; would need RBAC system for production
- Notifications mock; requires actual Slack/Discord API setup
- No persistence; runs in-memory only
- Single-instance; no clustering/multi-process support

### Future Enhancements
- Database persistence (MongoDB, PostgreSQL)
- Real RBAC/permissions system
- Subtasks and hierarchical dependencies
- Time tracking and cost estimation
- Integration with CI/CD pipelines
- Webhooks for external systems
- Audit logging with immutable trail
- Real-time WebSocket updates
