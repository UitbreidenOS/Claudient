/**
 * Progress Tracker Integration Examples
 *
 * Shows how to integrate ProgressTracker with:
 * - TaskExecutor for task execution tracking
 * - StateManager for checkpoint/resume
 * - CLI tools for real-time monitoring
 * - API servers for external progress queries
 */

const { ProgressTracker, TASK_STATUS } = require('./progress-tracker');

/**
 * Example 1: Integrate with TaskExecutor (hypothetical)
 *
 * Shows how to wire ProgressTracker with task execution pipeline.
 */
function example1TaskExecutorIntegration() {
  console.log('=== Example 1: TaskExecutor Integration ===\n');

  // Mock TaskExecutor
  const TaskExecutor = class extends require('events') {
    execute(task) {
      this.emit('taskStart', task);
      setTimeout(() => {
        if (Math.random() > 0.2) {
          this.emit('taskComplete', task, { tokens: 150, time: 1000 });
        } else {
          this.emit('taskFailed', task, new Error('Timeout'), { tokens: 75 });
        }
      }, Math.random() * 500);
    }
  };

  const executor = new TaskExecutor();
  const tracker = new ProgressTracker({ outputFormat: 'terminal' });

  const tasks = [
    { id: '1', name: 'Fetch data' },
    { id: '2', name: 'Process data' },
    { id: '3', name: 'Save results' }
  ];

  tracker.initialize('ETL Pipeline', tasks);

  // Wire executor events to tracker
  executor.on('taskStart', (execTask) => {
    const trackerTask = tracker.getTasks().find(t => t.name === execTask.name);
    if (trackerTask) {
      tracker.startTask(tracker.tasks.indexOf(trackerTask));
    }
  });

  executor.on('taskComplete', (execTask, metrics) => {
    const trackerTask = tracker.getTasks().find(t => t.name === execTask.name);
    if (trackerTask) {
      const idx = tracker.tasks.indexOf(trackerTask);
      tracker.completeTask(idx, metrics.tokens, { duration: metrics.time });
    }
  });

  executor.on('taskFailed', (execTask, error, metrics) => {
    const trackerTask = tracker.getTasks().find(t => t.name === execTask.name);
    if (trackerTask) {
      const idx = tracker.tasks.indexOf(trackerTask);
      tracker.failTask(idx, error, metrics.tokens);
    }
  });

  // Execute tasks
  tasks.forEach((task, idx) => {
    executor.execute(task);
  });

  // Show progress after execution
  setTimeout(() => {
    const summary = tracker.getSummary();
    console.log('Pipeline Summary:');
    console.log(JSON.stringify(summary, null, 2));
    tracker.destroy();
  }, 2000);
}

/**
 * Example 2: Checkpoint and Resume (with StateManager concept)
 *
 * Shows how to integrate with persistent state management.
 */
function example2CheckpointResume() {
  console.log('\n=== Example 2: Checkpoint & Resume ===\n');

  const fs = require('fs');
  const CHECKPOINT_FILE = '/tmp/workflow-checkpoint.json';

  // Session 1: Execute and checkpoint
  console.log('--- Session 1: Execute and checkpoint ---');
  const tracker1 = new ProgressTracker();

  const tasks = Array.from({ length: 5 }, (_, i) => ({
    id: `task-${i}`,
    name: `Processing step ${i + 1}`
  }));

  tracker1.initialize('Long-running workflow', tasks);

  // Execute first 3 tasks
  for (let i = 0; i < 3; i++) {
    tracker1.startTask(i);
    tracker1.completeTask(i, 100 + i * 50);
  }

  console.log('Completed 3 of 5 tasks');

  // Checkpoint state
  const state = tracker1.exportState();
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(state, null, 2));
  console.log(`Checkpoint saved to ${CHECKPOINT_FILE}`);

  tracker1.destroy();

  // Session 2: Resume from checkpoint
  console.log('\n--- Session 2: Resume from checkpoint ---');
  const tracker2 = new ProgressTracker();

  const savedState = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
  tracker2.importState(savedState);

  console.log(`Resumed with ${tracker2.completedCount} completed tasks`);

  // Continue execution
  tracker2.startTask(3);
  tracker2.completeTask(3, 150);
  tracker2.startTask(4);
  tracker2.completeTask(4, 200);

  console.log('\nFinal Summary:');
  console.log(JSON.stringify(tracker2.getSummary(), null, 2));

  // Cleanup
  fs.unlinkSync(CHECKPOINT_FILE);
  tracker2.destroy();
}

/**
 * Example 3: CLI Tool Integration
 *
 * Shows how to use ProgressTracker in CLI tools with flags.
 */
function example3CLIIntegration() {
  console.log('\n=== Example 3: CLI Tool Integration ===\n');

  // Mock CLI arguments
  const args = {
    watch: true,
    json: false,
    verbose: false,
    outputFile: null
  };

  // Create tracker based on CLI options
  const tracker = new ProgressTracker({
    outputFormat: args.json ? 'json' : 'terminal',
    watchMode: args.watch,
    verbose: args.verbose,
    outputFile: args.outputFile,
    refreshInterval: 1000
  });

  tracker.initialize('Build & Deploy', [
    { id: 'build', name: 'Build application' },
    { id: 'test', name: 'Run tests' },
    { id: 'deploy', name: 'Deploy to production' }
  ]);

  if (args.watch) {
    tracker.startWatchMode();
  }

  // Simulate execution
  (async () => {
    await new Promise(r => setTimeout(r, 500));
    tracker.startTask(0);
    await new Promise(r => setTimeout(r, 800));
    tracker.completeTask(0, 200);

    tracker.startTask(1);
    await new Promise(r => setTimeout(r, 1000));
    tracker.completeTask(1, 300);

    tracker.startTask(2);
    await new Promise(r => setTimeout(r, 600));
    tracker.completeTask(2, 250);

    // Output final progress
    if (args.json) {
      console.log('\n--- JSON Output ---');
      console.log(tracker.renderJSON());
    } else {
      console.log('\n--- Terminal Output ---');
      tracker.render();
    }

    tracker.stopWatchMode();
    tracker.destroy();
  })();
}

/**
 * Example 4: HTTP Server Progress Endpoint
 *
 * Shows how to expose progress as an HTTP endpoint for external monitoring.
 */
function example4HTTPEndpoint() {
  console.log('\n=== Example 4: HTTP Endpoint ===\n');

  // Mock HTTP server setup
  const tracker = new ProgressTracker();

  const tasks = Array.from({ length: 10 }, (_, i) => ({
    id: `item-${i}`,
    name: `Process item ${i + 1}`
  }));

  tracker.initialize('Batch Processing', tasks);

  // Simulated HTTP endpoints
  const endpoints = {
    'GET /progress': () => {
      return tracker.getMetrics();
    },

    'GET /progress.json': () => {
      return tracker.renderJSON();
    },

    'GET /progress/summary': () => {
      return tracker.getSummary();
    },

    'GET /progress/tasks': () => {
      return {
        completed: tracker.getTasks(TASK_STATUS.COMPLETED),
        current: tracker.getTasks(TASK_STATUS.CURRENT),
        pending: tracker.getTasks(TASK_STATUS.PENDING),
        failed: tracker.getTasks(TASK_STATUS.FAILED)
      };
    },

    'POST /progress/pause': () => {
      tracker.pause();
      return { status: 'paused' };
    },

    'POST /progress/resume': () => {
      tracker.resume();
      return { status: 'resumed' };
    }
  };

  // Simulate requests
  console.log('GET /progress');
  console.log(JSON.stringify(endpoints['GET /progress'](), null, 2));

  console.log('\nGET /progress/summary');
  console.log(JSON.stringify(endpoints['GET /progress/summary'](), null, 2));

  tracker.destroy();
}

/**
 * Example 5: Multi-Tracker Aggregation
 *
 * Show how to track multiple parallel workflows and aggregate progress.
 */
function example5AggregatedProgress() {
  console.log('\n=== Example 5: Aggregated Multi-Workflow Progress ===\n');

  // Create trackers for parallel workflows
  const workflows = {
    api: new ProgressTracker(),
    frontend: new ProgressTracker(),
    infra: new ProgressTracker()
  };

  workflows.api.initialize('Backend API', [
    { id: 'schema', name: 'Design schema' },
    { id: 'endpoints', name: 'Implement endpoints' },
    { id: 'tests', name: 'Add tests' }
  ]);

  workflows.frontend.initialize('Web UI', [
    { id: 'design', name: 'Design UI' },
    { id: 'components', name: 'Build components' },
    { id: 'integration', name: 'Integrate with API' }
  ]);

  workflows.infra.initialize('Infrastructure', [
    { id: 'containers', name: 'Setup containers' },
    { id: 'k8s', name: 'Configure Kubernetes' }
  ]);

  // Simulate progress
  workflows.api.startTask(0);
  workflows.api.completeTask(0, 150);
  workflows.api.startTask(1);
  workflows.api.completeTask(1, 250);

  workflows.frontend.startTask(0);
  workflows.frontend.completeTask(0, 100);
  workflows.frontend.startTask(1);

  workflows.infra.startTask(0);
  workflows.infra.completeTask(0, 120);

  // Aggregate metrics
  const allMetrics = Object.entries(workflows).map(([name, tracker]) => ({
    workflow: name,
    ...tracker.getMetrics()
  }));

  const totalMetrics = {
    total_workflows: Object.keys(workflows).length,
    total_tasks: allMetrics.reduce((sum, m) => sum + m.total, 0),
    total_completed: allMetrics.reduce((sum, m) => sum + m.completed, 0),
    total_tokens: allMetrics.reduce((sum, m) => sum + m.tokens_used, 0),
    overall_progress: Math.round(
      allMetrics.reduce((sum, m) => sum + m.progress_percent, 0) /
      Object.keys(workflows).length
    )
  };

  console.log('Workflow Progress:');
  allMetrics.forEach(m => {
    console.log(`  ${m.workflow}: ${m.completed}/${m.total} (${m.progress_percent}%) [${m.tokens_used} tokens]`);
  });

  console.log('\nAggregate Progress:');
  console.log(JSON.stringify(totalMetrics, null, 2));

  // Cleanup
  Object.values(workflows).forEach(tracker => tracker.destroy());
}

/**
 * Example 6: Error Recovery with Progress Tracking
 *
 * Shows how to track and recover from failures.
 */
function example6ErrorRecovery() {
  console.log('\n=== Example 6: Error Recovery ===\n');

  const tracker = new ProgressTracker({ verbose: true });

  const tasks = [
    { id: '1', name: 'Connect to database' },
    { id: '2', name: 'Load configuration' },
    { id: '3', name: 'Run migrations' },
    { id: '4', name: 'Seed data' },
    { id: '5', name: 'Verify integrity' }
  ];

  tracker.initialize('Database Setup', tasks);

  // Event listeners for error recovery
  tracker.on('taskFailed', (task) => {
    console.log(`\n⚠ Task failed: ${task.name}`);
    console.log(`Error: ${task.error}`);

    // Could implement retry logic here
    const failedCount = tracker.getTasks(TASK_STATUS.FAILED).length;
    console.log(`Total failures: ${failedCount}`);
  });

  // Simulate execution with failure
  tracker.startTask(0);
  tracker.completeTask(0, 100);
  console.log('✓ Task 1 complete\n');

  tracker.startTask(1);
  tracker.completeTask(1, 80);
  console.log('✓ Task 2 complete\n');

  tracker.startTask(2);
  tracker.failTask(2, new Error('Connection timeout'), 50);
  console.log('Failed to run migrations\n');

  // Skip failed task and continue
  tracker.startTask(3);
  tracker.completeTask(3, 120);
  console.log('✓ Task 4 complete\n');

  // Check data integrity despite failure
  tracker.startTask(4);
  tracker.completeTask(4, 150);
  console.log('✓ Task 5 complete\n');

  // Generate report
  const summary = tracker.getSummary();
  console.log('Summary:');
  console.log(JSON.stringify(summary, null, 2));

  console.log('\nFailed Tasks:');
  tracker.getTasks(TASK_STATUS.FAILED).forEach(task => {
    console.log(`  - ${task.name}: ${task.error}`);
  });

  tracker.destroy();
}

// Export all examples
module.exports = {
  example1TaskExecutorIntegration,
  example2CheckpointResume,
  example3CLIIntegration,
  example4HTTPEndpoint,
  example5AggregatedProgress,
  example6ErrorRecovery
};

// Run a specific example if executed directly
if (require.main === module) {
  const examples = {
    '1': example1TaskExecutorIntegration,
    '2': example2CheckpointResume,
    '3': example3CLIIntegration,
    '4': example4HTTPEndpoint,
    '5': example5AggregatedProgress,
    '6': example6ErrorRecovery
  };

  const exampleNum = process.argv[2] || '1';
  const example = examples[exampleNum];

  if (example) {
    example();
  } else {
    console.log('Usage: node progress-tracker-integration.example.js [1-6]');
    console.log('\nAvailable examples:');
    Object.entries(examples).forEach(([num, fn]) => {
      console.log(`  ${num} - ${fn.name.replace('example', '').replace(/([A-Z])/g, ' $1').trim()}`);
    });
  }
}
