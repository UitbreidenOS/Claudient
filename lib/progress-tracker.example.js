/**
 * Progress Tracker Examples
 *
 * Demonstrates all capabilities:
 * - Terminal UI with real-time updates
 * - JSON output for machine consumption
 * - Watch mode for continuous monitoring
 * - Task lifecycle management
 * - Metrics calculation and formatting
 */

const { ProgressTracker, TASK_STATUS } = require('./progress-tracker');

/**
 * Example 1: Basic terminal UI with real-time updates
 */
function example1BasicTerminalUI() {
  console.log('=== Example 1: Basic Terminal UI ===\n');

  const tracker = new ProgressTracker({
    outputFormat: 'terminal',
    watchMode: true,
    refreshInterval: 2000
  });

  // Initialize with goal and tasks
  const tasks = [
    { id: 'task-1', name: 'Parse goal statement' },
    { id: 'task-2', name: 'Split into subtasks' },
    { id: 'task-3', name: 'Validate task structure' },
    { id: 'task-4', name: 'Execute tasks' },
    { id: 'task-5', name: 'Generate summary' }
  ];

  tracker.initialize('Build a real-time progress tracker system', tasks);

  // Simulate task execution
  (async () => {
    tracker.startTask(0);
    await new Promise(resolve => setTimeout(resolve, 2000));
    tracker.completeTask(0, 150);

    tracker.startTask(1);
    await new Promise(resolve => setTimeout(resolve, 2000));
    tracker.completeTask(1, 200);

    tracker.startTask(2);
    await new Promise(resolve => setTimeout(resolve, 1500));
    tracker.completeTask(2, 120);

    tracker.render();
    setTimeout(() => tracker.destroy(), 3000);
  })();
}

/**
 * Example 2: JSON output for machine consumption
 */
function example2JSONOutput() {
  console.log('=== Example 2: JSON Output ===\n');

  const tracker = new ProgressTracker({
    outputFormat: 'json'
  });

  const tasks = [
    { id: 'parse', name: 'Parse goal' },
    { id: 'split', name: 'Split tasks' },
    { id: 'execute', name: 'Execute' },
    { id: 'summarize', name: 'Summarize' }
  ];

  tracker.initialize('Process workflow', tasks);

  // Simulate progression
  tracker.startTask(0);
  tracker.completeTask(0, 100);

  tracker.startTask(1);
  tracker.completeTask(1, 150);

  tracker.startTask(2);
  tracker.addTokens(200);

  // Render JSON output
  tracker.render();
}

/**
 * Example 3: Watch mode with continuous updates
 */
function example3WatchMode() {
  console.log('=== Example 3: Watch Mode ===\n');

  const tracker = new ProgressTracker({
    outputFormat: 'terminal',
    watchMode: true,
    refreshInterval: 1000
  });

  const tasks = Array.from({ length: 8 }, (_, i) => ({
    id: `task-${i}`,
    name: `Process item ${i + 1}`
  }));

  tracker.initialize('Batch processing workflow', tasks);

  let taskIndex = 0;

  // Simulate continuous task processing
  const processInterval = setInterval(() => {
    if (taskIndex >= tasks.length) {
      clearInterval(processInterval);
      tracker.stopWatchMode();
      console.log('\nProcessing complete!');
      console.log(JSON.stringify(tracker.getSummary(), null, 2));
      tracker.destroy();
      return;
    }

    tracker.startTask(taskIndex);
    setTimeout(() => {
      const tokens = Math.floor(Math.random() * 300) + 50;
      tracker.completeTask(taskIndex, tokens);
      taskIndex++;
    }, 1000);
  }, 1500);
}

/**
 * Example 4: Error handling with failed tasks
 */
function example4ErrorHandling() {
  console.log('=== Example 4: Error Handling ===\n');

  const tracker = new ProgressTracker({
    outputFormat: 'terminal'
  });

  const tasks = [
    { id: 'validate', name: 'Validate inputs' },
    { id: 'process', name: 'Process data' },
    { id: 'save', name: 'Save results' },
    { id: 'cleanup', name: 'Cleanup' }
  ];

  tracker.initialize('Data pipeline', tasks);

  // Simulate task execution with error
  tracker.startTask(0);
  tracker.completeTask(0, 100);

  tracker.startTask(1);
  tracker.completeTask(1, 200);

  tracker.startTask(2);
  setTimeout(() => {
    const error = new Error('Failed to write to database: Connection timeout');
    tracker.failTask(2, error, 150);

    tracker.startTask(3);
    tracker.completeTask(3, 75);

    // Display final state
    tracker.render();
    console.log('\nFailed tasks:');
    tracker.getTasks(TASK_STATUS.FAILED).forEach(task => {
      console.log(`  - ${task.name}: ${task.error}`);
    });

    tracker.destroy();
  }, 500);
}

/**
 * Example 5: Pause and resume
 */
function example5PauseResume() {
  console.log('=== Example 5: Pause and Resume ===\n');

  const tracker = new ProgressTracker({
    outputFormat: 'terminal'
  });

  const tasks = [
    { id: 'step-1', name: 'Initialize system' },
    { id: 'step-2', name: 'Load configuration' },
    { id: 'step-3', name: 'Run core logic' },
    { id: 'step-4', name: 'Generate report' }
  ];

  tracker.initialize('Multi-step process', tasks);

  (async () => {
    // Execute first task
    tracker.startTask(0);
    await new Promise(resolve => setTimeout(resolve, 800));
    tracker.completeTask(0, 100);

    // Execute second task
    tracker.startTask(1);
    await new Promise(resolve => setTimeout(resolve, 800));
    tracker.completeTask(1, 150);

    // Start third task then pause
    tracker.startTask(2);
    await new Promise(resolve => setTimeout(resolve, 500));
    tracker.pause();

    console.log('Paused at:', new Date().toLocaleTimeString());
    tracker.render();

    // Resume after delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    tracker.resume();
    console.log('Resumed at:', new Date().toLocaleTimeString());

    await new Promise(resolve => setTimeout(resolve, 800));
    tracker.completeTask(2, 200);

    // Final task
    tracker.startTask(3);
    await new Promise(resolve => setTimeout(resolve, 600));
    tracker.completeTask(3, 120);

    tracker.render();
    console.log('\nFinal Metrics:');
    console.log(JSON.stringify(tracker.getMetrics(), null, 2));

    tracker.destroy();
  })();
}

/**
 * Example 6: Output to file (JSON)
 */
function example6FileOutput() {
  console.log('=== Example 6: File Output ===\n');

  const tracker = new ProgressTracker({
    outputFormat: 'json',
    outputFile: '/tmp/progress-tracker-output.json'
  });

  const tasks = [
    { id: 'fetch', name: 'Fetch data' },
    { id: 'transform', name: 'Transform' },
    { id: 'load', name: 'Load to DB' }
  ];

  tracker.initialize('ETL Pipeline', tasks);

  tracker.startTask(0);
  tracker.completeTask(0, 180);

  tracker.startTask(1);
  tracker.completeTask(1, 250);

  tracker.startTask(2);
  tracker.completeTask(2, 200);

  tracker.render();

  console.log('Output written to: /tmp/progress-tracker-output.json');
  try {
    const content = require('fs').readFileSync('/tmp/progress-tracker-output.json', 'utf8');
    console.log('\nFile content:');
    console.log(content);
  } catch (error) {
    console.log('File not found or could not be read');
  }

  tracker.destroy();
}

/**
 * Example 7: State export and import (for resume)
 */
function example7StateManagement() {
  console.log('=== Example 7: State Management ===\n');

  // First session: execute some tasks
  console.log('--- Session 1: Execute tasks ---');
  const tracker1 = new ProgressTracker();

  const tasks = [
    { id: 'download', name: 'Download files' },
    { id: 'verify', name: 'Verify checksums' },
    { id: 'extract', name: 'Extract archive' },
    { id: 'process', name: 'Process data' }
  ];

  tracker1.initialize('Large download workflow', tasks);

  tracker1.startTask(0);
  tracker1.completeTask(0, 500);
  tracker1.startTask(1);
  tracker1.completeTask(1, 300);

  const exportedState = tracker1.exportState();
  console.log('Exported state after 2 tasks:');
  console.log(JSON.stringify(exportedState, null, 2));

  // Second session: resume from checkpoint
  console.log('\n--- Session 2: Resume from checkpoint ---');
  const tracker2 = new ProgressTracker();
  tracker2.importState(exportedState);

  tracker2.startTask(2);
  tracker2.completeTask(2, 350);
  tracker2.startTask(3);
  tracker2.completeTask(3, 400);

  console.log('\nFinal summary after resume:');
  console.log(JSON.stringify(tracker2.getSummary(), null, 2));

  tracker1.destroy();
  tracker2.destroy();
}

/**
 * Example 8: Advanced metrics and ETA
 */
function example8MetricsAndETA() {
  console.log('=== Example 8: Metrics and ETA ===\n');

  const tracker = new ProgressTracker();

  const tasks = Array.from({ length: 10 }, (_, i) => ({
    id: `item-${i}`,
    name: `Process item ${i + 1}`
  }));

  tracker.initialize('Analytics batch job', tasks);

  let index = 0;

  const processInterval = setInterval(() => {
    if (index >= tasks.length) {
      clearInterval(processInterval);

      console.log('\nFinal Metrics:');
      const metrics = tracker.getMetrics();
      console.log(`  Total time: ${metrics.elapsed_time}`);
      console.log(`  Tasks completed: ${metrics.completed}/${metrics.total}`);
      console.log(`  Total tokens: ${metrics.tokens_used}`);

      tracker.destroy();
      return;
    }

    tracker.startTask(index);
    setTimeout(() => {
      const tokens = Math.floor(Math.random() * 200) + 100;
      tracker.completeTask(index, tokens);

      const metrics = tracker.getMetrics();
      console.log(`Task ${index + 1} complete | ETA: ${metrics.eta || 'calculating...'}  | Progress: ${metrics.progress_percent}%`);

      index++;
    }, 800);
  }, 1000);
}

/**
 * Example 9: Real-time event monitoring
 */
function example9EventMonitoring() {
  console.log('=== Example 9: Event Monitoring ===\n');

  const tracker = new ProgressTracker();

  // Listen to events
  tracker.on('initialized', data => {
    console.log(`✓ Initialized with ${data.taskCount} tasks`);
  });

  tracker.on('taskStart', task => {
    console.log(`▶ Started: ${task.name}`);
  });

  tracker.on('taskComplete', task => {
    console.log(`✓ Completed: ${task.name} (${task.tokens} tokens, ${tracker.formatDuration(task.duration)})`);
  });

  tracker.on('taskFailed', task => {
    console.log(`✗ Failed: ${task.name} - ${task.error}`);
  });

  tracker.on('paused', () => {
    console.log('⏸  Paused');
  });

  tracker.on('resumed', () => {
    console.log('▶ Resumed');
  });

  const tasks = [
    { id: 'a', name: 'Step A' },
    { id: 'b', name: 'Step B' },
    { id: 'c', name: 'Step C' }
  ];

  tracker.initialize('Event-driven workflow', tasks);

  (async () => {
    tracker.startTask(0);
    await new Promise(r => setTimeout(r, 500));
    tracker.completeTask(0, 100);

    tracker.startTask(1);
    await new Promise(r => setTimeout(r, 500));
    tracker.completeTask(1, 150);

    tracker.pause();
    await new Promise(r => setTimeout(r, 1000));
    tracker.resume();

    tracker.startTask(2);
    await new Promise(r => setTimeout(r, 500));
    tracker.completeTask(2, 120);

    tracker.destroy();
  })();
}

/**
 * Example 10: Formatting utilities
 */
function example10FormattingUtilities() {
  console.log('=== Example 10: Formatting Utilities ===\n');

  const tracker = new ProgressTracker();

  // Duration formatting
  console.log('Duration formatting:');
  console.log(`  500ms → ${tracker.formatDuration(500)}`);
  console.log(`  3500ms → ${tracker.formatDuration(3500)}`);
  console.log(`  125000ms → ${tracker.formatDuration(125000)}`);
  console.log(`  3661000ms → ${tracker.formatDuration(3661000)}`);

  // Byte formatting
  console.log('\nByte formatting:');
  console.log(`  512 bytes → ${tracker.formatBytes(512)}`);
  console.log(`  1024 bytes → ${tracker.formatBytes(1024)}`);
  console.log(`  1048576 bytes → ${tracker.formatBytes(1048576)}`);
  console.log(`  1073741824 bytes → ${tracker.formatBytes(1073741824)}`);

  tracker.destroy();
}

// Export examples
module.exports = {
  example1BasicTerminalUI,
  example2JSONOutput,
  example3WatchMode,
  example4ErrorHandling,
  example5PauseResume,
  example6FileOutput,
  example7StateManagement,
  example8MetricsAndETA,
  example9EventMonitoring,
  example10FormattingUtilities
};

// Run a specific example if this file is executed directly
if (require.main === module) {
  const exampleNum = process.argv[2] || '1';
  const examples = {
    '1': example1BasicTerminalUI,
    '2': example2JSONOutput,
    '3': example3WatchMode,
    '4': example4ErrorHandling,
    '5': example5PauseResume,
    '6': example6FileOutput,
    '7': example7StateManagement,
    '8': example8MetricsAndETA,
    '9': example9EventMonitoring,
    '10': example10FormattingUtilities
  };

  const example = examples[exampleNum];
  if (example) {
    example();
  } else {
    console.log('Usage: node progress-tracker.example.js [1-10]');
    console.log('\nAvailable examples:');
    Object.entries(examples).forEach(([num, fn]) => {
      console.log(`  ${num} - ${fn.name.replace('example', '').replace(/([A-Z])/g, ' $1').trim()}`);
    });
  }
}
