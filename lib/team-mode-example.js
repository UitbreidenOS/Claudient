/**
 * TeamMode - Complete Workflow Example
 * Demonstrates multi-user collaboration, approval workflows, and real-time dashboards
 */

const TeamMode = require('./team-mode');

async function runTeamModeExample() {
  console.log('=== TeamMode Multi-User Collaboration Example ===\n');

  // Initialize TeamMode with notification channels
  const teamMode = new TeamMode({
    notificationChannels: {
      slack: {
        webhook:
          'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
        channel: '#deployments',
      },
      discord: {
        webhook:
          'https://discord.com/api/webhooks/YOUR/WEBHOOK/URL',
        channel: 'approvals',
      },
    },
    autoApprovalThreshold: 0.7,
    requireApprovalFor: ['infrastructure', 'security', 'database', 'payment', 'user-data'],
  });

  // ============================================================================
  // STEP 1: Register Team Members
  // ============================================================================
  console.log('STEP 1: Registering Team Members');
  console.log('-'.repeat(50));

  teamMode.registerCollaborator('alice_owner', 'Alice Johnson', 'alice@company.com', 'owner');
  teamMode.registerCollaborator(
    'bob_lead_approver',
    'Bob Smith',
    'bob@company.com',
    'approver'
  );
  teamMode.registerCollaborator('charlie_tech_lead', 'Charlie Brown', 'charlie@company.com', 'approver');
  teamMode.registerCollaborator(
    'diana_contributor',
    'Diana Prince',
    'diana@company.com',
    'contributor'
  );
  teamMode.registerCollaborator('eve_contributor', 'Eve Wilson', 'eve@company.com', 'contributor');

  console.log('✓ Registered 5 team members\n');

  // ============================================================================
  // STEP 2: Owner Submits Goal
  // ============================================================================
  console.log('STEP 2: Owner Submits Goal with Task Breakdown');
  console.log('-'.repeat(50));

  const goalId = teamMode.submitGoal(
    'alice_owner',
    'Migrate to Kubernetes',
    'Move all services from VMs to Kubernetes cluster',
    [
      { title: 'Inventory current services', complexity: 'simple' },
      { title: 'Create Dockerfile templates', complexity: 'medium' },
      { title: 'Set up Kubernetes cluster', complexity: 'complex' },
      { title: 'Write deployment manifests', complexity: 'medium' },
      { title: 'Configure CI/CD pipeline', complexity: 'complex' },
      { title: 'Run load tests', complexity: 'medium' },
      { title: 'Migrate production traffic', complexity: 'complex' },
    ]
  );

  console.log(`✓ Goal submitted: "${teamMode.goals.get(goalId).title}"`);
  console.log(`  Goal ID: ${goalId}`);
  console.log(`  Tasks: 7 (1 simple, 3 medium, 3 complex)`);
  console.log(`  Status: pending_review\n`);

  // ============================================================================
  // STEP 3: Display Initial Dashboard
  // ============================================================================
  console.log('STEP 3: Initial Dashboard - Awaiting Approvals');
  console.log('-'.repeat(50));

  let dashboard = teamMode.getDashboard(goalId);
  console.log(`Goal: ${dashboard.title}`);
  console.log(`Owner: ${dashboard.owner}`);
  console.log(`Status: ${dashboard.status}`);
  console.log(`Progress: ${dashboard.progress.percentComplete}% (${dashboard.progress.completed}/${dashboard.progress.totalTasks})`);
  console.log('\nTask Breakdown:');
  dashboard.tasks.forEach((task, idx) => {
    console.log(
      `  ${idx + 1}. ${task.title} [${task.complexity}] - ${task.status}`
    );
  });
  console.log();

  // ============================================================================
  // STEP 4: Approvers Review and Approve Goal
  // ============================================================================
  console.log('STEP 4: Approvers Review and Approve Goal');
  console.log('-'.repeat(50));

  teamMode.updateGoalStatus(goalId, 'approved', 'bob_lead_approver');
  console.log('✓ Goal approved by Bob (Lead Approver)');
  console.log('✓ Auto-executing simple tasks...');
  console.log('✓ Complex/medium tasks await individual approvals\n');

  // ============================================================================
  // STEP 5: Assign Tasks and Start Execution
  // ============================================================================
  console.log('STEP 5: Assign Tasks to Team Members');
  console.log('-'.repeat(50));

  const goal = teamMode.getGoal(goalId);
  const tasks = goal.taskDetails;

  // Assign tasks
  const assignments = [
    { taskIdx: 0, assignee: 'diana_contributor' }, // Inventory (simple)
    { taskIdx: 1, assignee: 'diana_contributor' }, // Dockerfile (medium)
    { taskIdx: 2, assignee: 'eve_contributor' }, // K8s cluster (complex)
    { taskIdx: 3, assignee: 'eve_contributor' }, // Manifests (medium)
    { taskIdx: 4, assignee: 'charlie_tech_lead' }, // CI/CD (complex)
    { taskIdx: 5, assignee: 'diana_contributor' }, // Load tests (medium)
    { taskIdx: 6, assignee: 'eve_contributor' }, // Production (complex)
  ];

  assignments.forEach(({ taskIdx, assignee }) => {
    const task = goal.tasks[taskIdx];
    teamMode.assignTask(task, assignee);
    console.log(`✓ Assigned: "${tasks[taskIdx].title}" → ${assignee}`);
  });
  console.log();

  // ============================================================================
  // STEP 6: Simple Task Auto-Executes
  // ============================================================================
  console.log('STEP 6: Simple Task Auto-Executes');
  console.log('-'.repeat(50));

  const simpleTaskId = goal.tasks[0];
  let task = teamMode.getTask(simpleTaskId);
  console.log(`Task: ${task.title} (${task.complexity})`);
  console.log(`Status: ${task.status} → executing (auto)`);

  teamMode.updateTaskStatus(simpleTaskId, 'executing', 'system');
  teamMode.updateTaskStatus(simpleTaskId, 'completed', 'diana_contributor');

  task = teamMode.getTask(simpleTaskId);
  console.log(`✓ Completed at ${task.completedAt}\n`);

  // ============================================================================
  // STEP 7: Complex Task Enters Approval Workflow
  // ============================================================================
  console.log('STEP 7: Complex Task Requires Approval');
  console.log('-'.repeat(50));

  const complexTaskId = goal.tasks[2]; // K8s cluster setup
  task = teamMode.getTask(complexTaskId);

  console.log(`Task: "${task.title}"`);
  console.log(`Assigned to: ${task.assignee}`);
  console.log(`Complexity: ${task.complexity}`);
  console.log(`Status: pending → awaiting_approval`);

  teamMode.updateTaskStatus(complexTaskId, 'awaiting_approval', 'eve_contributor');

  task = teamMode.getTask(complexTaskId);
  console.log(`\nApprovers needed: ${task.approvalsData.length}`);
  task.approvalsData.forEach((approval, idx) => {
    console.log(`  ${idx + 1}. ${approval.approver} - ${approval.status}`);
  });
  console.log();

  // ============================================================================
  // STEP 8: Team Collaboration - Add Comments
  // ============================================================================
  console.log('STEP 8: Team Collaboration - Comments & Discussion');
  console.log('-'.repeat(50));

  const comment1 = teamMode.addComment(
    complexTaskId,
    'eve_contributor',
    'Cluster is set up. Using managed Kubernetes on AWS. High availability enabled with 3 availability zones.'
  );
  console.log(`✓ Eve commented: "${comment1.text}"`);

  const comment2 = teamMode.addComment(
    complexTaskId,
    'charlie_tech_lead',
    'Looks good, but please double-check the security group rules.'
  );
  console.log(`✓ Charlie commented: "${comment2.text}"`);

  teamMode.addReaction(comment1.id, '👍', 'bob_lead_approver');
  teamMode.addReaction(comment2.id, '👍', 'eve_contributor');
  teamMode.addReaction(comment1.id, '✨', 'alice_owner');

  console.log(
    `✓ Reactions added: 👍 from Bob/Eve, ✨ from Alice\n`
  );

  // ============================================================================
  // STEP 9: Approvers Sign Off
  // ============================================================================
  console.log('STEP 9: Approvers Sign Off');
  console.log('-'.repeat(50));

  task = teamMode.getTask(complexTaskId);
  task.approvalsData.forEach((approval) => {
    const sign = approval.approver === 'security_lead' ? false : true;
    const decision = sign ? 'APPROVED' : 'REJECTED';
    teamMode.approveTask(complexTaskId, approval.approver, sign, `${decision} - reviewed`);
    console.log(
      `✓ ${approval.approver}: ${decision} (Reviewed security and architecture)`
    );
  });

  task = teamMode.getTask(complexTaskId);
  console.log(`\nTask status: ${task.status}\n`);

  // ============================================================================
  // STEP 10: Update Progress Dashboard
  // ============================================================================
  console.log('STEP 10: Real-Time Progress Dashboard Update');
  console.log('-'.repeat(50));

  // Complete more tasks
  [1, 3, 4, 5].forEach((idx) => {
    const taskId = goal.tasks[idx];
    teamMode.updateTaskStatus(taskId, 'executing', 'system');
    teamMode.updateTaskStatus(taskId, 'completed', 'system');
  });

  dashboard = teamMode.getDashboard(goalId);
  console.log(`Goal: ${dashboard.title}`);
  console.log(`Progress: ${dashboard.progress.percentComplete}% (${dashboard.progress.completed}/${dashboard.progress.totalTasks})`);
  console.log(`\nTask Status Breakdown:`);
  console.log(
    `  ✓ Completed: ${dashboard.progress.completed}`
  );
  console.log(
    `  ⚙️  Executing: ${dashboard.progress.executing}`
  );
  console.log(
    `  ⏳ Awaiting: ${dashboard.progress.awaiting}`
  );
  console.log(
    `  🚫 Blocked: ${dashboard.progress.blocked}`
  );
  console.log(
    `  ❌ Failed: ${dashboard.progress.failed}`
  );

  if (dashboard.progress.bottlenecks.length > 0) {
    console.log(`\nBottlenecks:`);
    dashboard.progress.bottlenecks.forEach((bottleneck) => {
      console.log(`  - ${bottleneck.type}: "${bottleneck.title}"`);
    });
  }
  console.log();

  // ============================================================================
  // STEP 11: Notifications Log
  // ============================================================================
  console.log('STEP 11: Notification Audit Log');
  console.log('-'.repeat(50));

  const notifications = teamMode.getNotifications({});
  console.log(`Total notifications sent: ${notifications.length}`);
  console.log('\nRecent notifications:');
  notifications.slice(-5).forEach((notif) => {
    console.log(
      `  - [${notif.event}] ${notif.timestamp.split('T')[1].split('.')[0]}`
    );
  });
  console.log();

  // ============================================================================
  // STEP 12: Export Report
  // ============================================================================
  console.log('STEP 12: Export Goal Report');
  console.log('-'.repeat(50));

  const report = teamMode.exportGoalReport(goalId);
  console.log(`Report Generated: ${report.exportedAt}`);
  console.log(`  Goal: ${report.goal.title}`);
  console.log(`  Owner: ${report.goal.owner}`);
  console.log(`  Status: ${report.goal.status}`);
  console.log(`  Progress: ${report.goal.progress.percentComplete}%`);
  console.log(`  Tasks in report: ${report.tasks.length}`);
  console.log(`  Total notifications: ${report.notifications.length}`);

  // Show task summary
  console.log('\nTask Summary:');
  report.tasks.forEach((task) => {
    console.log(`  - ${task.title}: ${task.status}`);
    if (task.comments.length > 0) {
      console.log(`    (${task.comments.length} comments)`);
    }
    if (task.approvals.length > 0) {
      const approved = task.approvals.filter((a) => a.status === 'approved').length;
      console.log(`    (${approved}/${task.approvals.length} approvals)`);
    }
  });
  console.log();

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('=== SUMMARY ===');
  console.log('-'.repeat(50));
  console.log(`✓ Multi-user goal: ${teamMode.goals.size} goal(s)`);
  console.log(`✓ Team members: ${teamMode.collaborators.size}`);
  console.log(`✓ Tasks tracked: ${teamMode.tasks.size}`);
  console.log(`✓ Approvals recorded: ${teamMode.approvals.size}`);
  console.log(`✓ Comments & reactions: ${teamMode.comments.size}`);
  console.log(`✓ Notifications sent: ${teamMode.notifications.length}`);
  console.log();
  console.log('Features demonstrated:');
  console.log('  ✓ Goal submission with task breakdown');
  console.log('  ✓ Approval workflow (simple auto-execute, complex needs sign-off)');
  console.log('  ✓ Task assignment and execution');
  console.log('  ✓ Comments with emoji reactions');
  console.log('  ✓ Real-time progress dashboard');
  console.log('  ✓ Bottleneck identification');
  console.log('  ✓ Notification events (Slack/Discord ready)');
  console.log('  ✓ Comprehensive reporting & export');
}

// Run the example
runTeamModeExample().catch(console.error);
