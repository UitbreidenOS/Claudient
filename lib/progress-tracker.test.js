/**
 * Progress Tracker Tests
 *
 * Test coverage:
 * - Initialization and task management
 * - Task lifecycle (pending → current → completed/failed)
 * - Metrics calculation (elapsed time, ETA, tokens)
 * - Pause/resume functionality
 * - Output formatting (terminal UI, JSON)
 * - Event emission
 * - State export/import
 */

const { ProgressTracker, TASK_STATUS } = require('./progress-tracker');
const assert = require('assert');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Test: Initialization
 */
async function testInitialization() {
  console.log('Testing: Initialization');

  const tracker = new ProgressTracker();
  const tasks = [
    { id: 'task-1', name: 'First task' },
    { id: 'task-2', name: 'Second task' },
    { id: 'task-3', name: 'Third task' }
  ];

  tracker.initialize('Test goal', tasks);

  assert.strictEqual(tracker.goal, 'Test goal', 'Goal should be set');
  assert.strictEqual(tracker.tasks.length, 3, 'Should have 3 tasks');
  assert.strictEqual(tracker.tasks[0].status, TASK_STATUS.PENDING, 'Initial status should be pending');
  assert.strictEqual(tracker.completedCount, 0, 'Completed count should be 0');
  assert.notStrictEqual(tracker.startTime, null, 'Start time should be set');

  tracker.destroy();
  console.log('✓ Initialization test passed\n');
}

/**
 * Test: Task transitions
 */
async function testTaskTransitions() {
  console.log('Testing: Task transitions');

  const tracker = new ProgressTracker();
  tracker.initialize('Test', [
    { id: 'task-1', name: 'Task 1' },
    { id: 'task-2', name: 'Task 2' }
  ]);

  // Start task
  tracker.startTask(0);
  assert.strictEqual(tracker.tasks[0].status, TASK_STATUS.CURRENT, 'Task should be current');
  assert.notStrictEqual(tracker.tasks[0].startTime, null, 'Start time should be set');

  // Complete task
  await sleep(100);
  tracker.completeTask(0, 150);
  assert.strictEqual(tracker.tasks[0].status, TASK_STATUS.COMPLETED, 'Task should be completed');
  assert.strictEqual(tracker.tasks[0].tokens, 150, 'Tokens should be recorded');
  assert.strictEqual(tracker.completedCount, 1, 'Completed count should increment');
  assert(tracker.tasks[0].duration > 0, 'Duration should be recorded');

  tracker.destroy();
  console.log('✓ Task transitions test passed\n');
}

/**
 * Test: Failed tasks
 */
async function testFailedTasks() {
  console.log('Testing: Failed tasks');

  const tracker = new ProgressTracker();
  tracker.initialize('Test', [
    { id: 'task-1', name: 'Task 1' }
  ]);

  tracker.startTask(0);
  await sleep(50);
  tracker.failTask(0, new Error('Test error'), 100);

  assert.strictEqual(tracker.tasks[0].status, TASK_STATUS.FAILED, 'Task should be failed');
  assert.strictEqual(tracker.tasks[0].error, 'Test error', 'Error message should be stored');
  assert.strictEqual(tracker.failedCount, 1, 'Failed count should increment');
  assert.strictEqual(tracker.completedCount, 0, 'Completed count should not increment');

  tracker.destroy();
  console.log('✓ Failed tasks test passed\n');
}

/**
 * Test: Token counting
 */
async function testTokenCounting() {
  console.log('Testing: Token counting');

  const tracker = new ProgressTracker();
  tracker.initialize('Test', [
    { id: 'task-1', name: 'Task 1' },
    { id: 'task-2', name: 'Task 2' }
  ]);

  assert.strictEqual(tracker.tokenCount, 0, 'Initial token count should be 0');

  tracker.startTask(0);
  tracker.completeTask(0, 150);
  assert.strictEqual(tracker.tokenCount, 150, 'Token count should be 150');

  tracker.startTask(1);
  tracker.completeTask(1, 250);
  assert.strictEqual(tracker.tokenCount, 400, 'Token count should be 400');

  tracker.addTokens(50);
  assert.strictEqual(tracker.tokenCount, 450, 'Token count should increment with addTokens');

  tracker.destroy();
  console.log('✓ Token counting test passed\n');
}

/**
 * Test: Elapsed time calculation
 */
async function testElapsedTime() {
  console.log('Testing: Elapsed time calculation');

  const tracker = new ProgressTracker();
  tracker.initialize('Test', [{ id: 'task-1', name: 'Task 1' }]);

  assert.strictEqual(tracker.getElapsedTime(), 0, 'Initial elapsed time should be near 0');

  await sleep(200);
  const elapsed = tracker.getElapsedTime();
  assert(elapsed >= 200 && elapsed < 300, `Elapsed time should be ~200ms, got ${elapsed}ms`);

  tracker.destroy();
  console.log('✓ Elapsed time test passed\n');
}

/**
 * Test: Pause and resume
 */
async function testPauseResume() {
  console.log('Testing: Pause and resume');

  const tracker = new ProgressTracker();
  tracker.initialize('Test', [{ id: 'task-1', name: 'Task 1' }]);

  tracker.startTask(0);
  await sleep(100);
  const elapsedBefore = tracker.getElapsedTime();

  tracker.pause();
  assert.strictEqual(tracker.paused, true, 'Should be paused');
  await sleep(100);
  const elapsedAfterPause = tracker.getElapsedTime();

  tracker.resume();
  assert.strictEqual(tracker.paused, false, 'Should be resumed');
  await sleep(50);
  const elapsedAfterResume = tracker.getElapsedTime();

  assert(elapsedAfterPause === elapsedBefore, 'Elapsed time should not change while paused');
  assert(elapsedAfterResume > elapsedAfterPause, 'Elapsed time should continue after resume');

  tracker.destroy();
  console.log('✓ Pause and resume test passed\n');
}

/**
 * Test: ETA calculation
 */
async function testETACalculation() {
  console.log('Testing: ETA calculation');

  const tracker = new ProgressTracker();
  const tasks = Array.from({ length: 5 }, (_, i) => ({
    id: `task-${i}`,
    name: `Task ${i}`
  }));

  tracker.initialize('Test', tasks);

  // No ETA before any completion
  assert.strictEqual(tracker.getETA(), null, 'ETA should be null before any completion');

  // Complete one task
  tracker.startTask(0);
  await sleep(100);
  tracker.completeTask(0, 100);

  const eta = tracker.getETA();
  assert(eta !== null && eta > 0, 'ETA should be calculated after first completion');

  tracker.destroy();
  console.log('✓ ETA calculation test passed\n');
}

/**
 * Test: Metrics generation
 */
async function testMetricsGeneration() {
  console.log('Testing: Metrics generation');

  const tracker = new ProgressTracker();
  tracker.initialize('Test goal', [
    { id: 'task-1', name: 'Task 1' },
    { id: 'task-2', name: 'Task 2' }
  ]);

  tracker.startTask(0);
  tracker.completeTask(0, 100);
  tracker.startTask(1);

  const metrics = tracker.getMetrics();

  assert.strictEqual(metrics.goal, 'Test goal', 'Goal should be in metrics');
  assert.strictEqual(metrics.completed, 1, 'Completed count should be 1');
  assert.strictEqual(metrics.pending, 1, 'Pending count should be 1');
  assert.strictEqual(metrics.total, 2, 'Total should be 2');
  assert.strictEqual(metrics.tokens_used, 100, 'Token count should be 100');
  assert.strictEqual(metrics.current_task, 'Task 2', 'Current task should be Task 2');
  assert(metrics.progress_percent >= 50, 'Progress should be >= 50%');

  tracker.destroy();
  console.log('✓ Metrics generation test passed\n');
}

/**
 * Test: Duration formatting
 */
async function testDurationFormatting() {
  console.log('Testing: Duration formatting');

  const tracker = new ProgressTracker();

  assert.strictEqual(tracker.formatDuration(500), '0s', 'Sub-second should be 0s');
  assert.strictEqual(tracker.formatDuration(1500), '1s', '1.5 seconds should be 1s');
  assert.strictEqual(tracker.formatDuration(65000), '1m 5s', '65 seconds should be 1m 5s');
  assert.strictEqual(tracker.formatDuration(3661000), '1h 1m 1s', '1h 1m 1s should format correctly');

  tracker.destroy();
  console.log('✓ Duration formatting test passed\n');
}

/**
 * Test: Byte formatting
 */
async function testByteFormatting() {
  console.log('Testing: Byte formatting');

  const tracker = new ProgressTracker();

  const formatted512 = tracker.formatBytes(512);
  assert(formatted512.includes('B'), '512 bytes should include B');

  const formatted1MB = tracker.formatBytes(1048576);
  assert(formatted1MB.includes('MB'), '1MB should include MB');

  const formatted1GB = tracker.formatBytes(1073741824);
  assert(formatted1GB.includes('GB'), '1GB should include GB');

  tracker.destroy();
  console.log('✓ Byte formatting test passed\n');
}

/**
 * Test: JSON output
 */
async function testJSONOutput() {
  console.log('Testing: JSON output');

  const tracker = new ProgressTracker({ outputFormat: 'json' });
  tracker.initialize('Test', [
    { id: 'task-1', name: 'Task 1' }
  ]);

  tracker.startTask(0);
  tracker.completeTask(0, 100);

  const jsonOutput = tracker.renderJSON();
  const parsed = JSON.parse(jsonOutput);

  assert(parsed.timestamp, 'Should have timestamp');
  assert(parsed.metrics, 'Should have metrics');
  assert(parsed.tasks, 'Should have tasks');
  assert.strictEqual(parsed.tasks.length, 1, 'Should have 1 task');
  assert.strictEqual(parsed.tasks[0].status, TASK_STATUS.COMPLETED, 'Task should be completed');

  tracker.destroy();
  console.log('✓ JSON output test passed\n');
}

/**
 * Test: Event emission
 */
async function testEventEmission() {
  console.log('Testing: Event emission');

  const tracker = new ProgressTracker();
  let eventsEmitted = {
    initialized: false,
    taskStart: false,
    taskComplete: false
  };

  tracker.on('initialized', () => { eventsEmitted.initialized = true; });
  tracker.on('taskStart', () => { eventsEmitted.taskStart = true; });
  tracker.on('taskComplete', () => { eventsEmitted.taskComplete = true; });

  tracker.initialize('Test', [{ id: 'task-1', name: 'Task 1' }]);
  tracker.startTask(0);
  tracker.completeTask(0, 100);

  assert(eventsEmitted.initialized, 'Should emit initialized event');
  assert(eventsEmitted.taskStart, 'Should emit taskStart event');
  assert(eventsEmitted.taskComplete, 'Should emit taskComplete event');

  tracker.destroy();
  console.log('✓ Event emission test passed\n');
}

/**
 * Test: State export and import
 */
async function testStateExportImport() {
  console.log('Testing: State export and import');

  // Create first tracker, execute some tasks
  const tracker1 = new ProgressTracker();
  tracker1.initialize('Test goal', [
    { id: 'task-1', name: 'Task 1' },
    { id: 'task-2', name: 'Task 2' },
    { id: 'task-3', name: 'Task 3' }
  ]);

  tracker1.startTask(0);
  await sleep(50);
  tracker1.completeTask(0, 100);

  tracker1.startTask(1);
  await sleep(50);
  tracker1.completeTask(1, 150);

  // Export state
  const exportedState = tracker1.exportState();

  // Create second tracker and import state
  const tracker2 = new ProgressTracker();
  tracker2.importState(exportedState);

  assert.strictEqual(tracker2.goal, 'Test goal', 'Goal should be imported');
  assert.strictEqual(tracker2.tasks.length, 3, 'Tasks should be imported');
  assert.strictEqual(tracker2.completedCount, 2, 'Completed count should be imported');
  assert.strictEqual(tracker2.tokenCount, 250, 'Token count should be imported');

  tracker1.destroy();
  tracker2.destroy();
  console.log('✓ State export/import test passed\n');
}

/**
 * Test: Task retrieval
 */
async function testTaskRetrieval() {
  console.log('Testing: Task retrieval');

  const tracker = new ProgressTracker();
  tracker.initialize('Test', [
    { id: 'task-1', name: 'Task 1' },
    { id: 'task-2', name: 'Task 2' }
  ]);

  // Get by index
  let task = tracker.getTask(0);
  assert.strictEqual(task.id, 'task-1', 'Should get task by index');

  // Get by ID
  task = tracker.getTask('task-2');
  assert.strictEqual(task.name, 'Task 2', 'Should get task by ID');

  // Get all pending
  tracker.startTask(0);
  tracker.completeTask(0, 100);

  const pendingTasks = tracker.getTasks(TASK_STATUS.PENDING);
  assert.strictEqual(pendingTasks.length, 1, 'Should have 1 pending task');

  const completedTasks = tracker.getTasks(TASK_STATUS.COMPLETED);
  assert.strictEqual(completedTasks.length, 1, 'Should have 1 completed task');

  tracker.destroy();
  console.log('✓ Task retrieval test passed\n');
}

/**
 * Test: Summary generation
 */
async function testSummaryGeneration() {
  console.log('Testing: Summary generation');

  const tracker = new ProgressTracker();
  tracker.initialize('Test goal', [
    { id: 'task-1', name: 'Task 1' },
    { id: 'task-2', name: 'Task 2' },
    { id: 'task-3', name: 'Task 3' }
  ]);

  tracker.startTask(0);
  tracker.completeTask(0, 100);
  tracker.startTask(1);
  tracker.failTask(1, new Error('Test error'), 50);

  const summary = tracker.getSummary();

  assert.strictEqual(summary.goal, 'Test goal', 'Goal should be in summary');
  assert.strictEqual(summary.total, 3, 'Total should be 3');
  assert.strictEqual(summary.completed, 1, 'Completed should be 1');
  assert.strictEqual(summary.failed, 1, 'Failed should be 1');
  assert.strictEqual(summary.pending, 1, 'Pending should be 1');
  assert.strictEqual(summary.tokens, 150, 'Tokens should be 150');

  tracker.destroy();
  console.log('✓ Summary generation test passed\n');
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     Progress Tracker Test Suite            ║');
  console.log('╚════════════════════════════════════════════╝\n');

  const tests = [
    testInitialization,
    testTaskTransitions,
    testFailedTasks,
    testTokenCounting,
    testElapsedTime,
    testPauseResume,
    testETACalculation,
    testMetricsGeneration,
    testDurationFormatting,
    testByteFormatting,
    testJSONOutput,
    testEventEmission,
    testStateExportImport,
    testTaskRetrieval,
    testSummaryGeneration
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      await test();
      passed++;
    } catch (error) {
      console.error(`✗ ${test.name} failed:`, error.message, '\n');
      failed++;
    }
  }

  console.log('╔════════════════════════════════════════════╗');
  console.log(`║ Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}${' '.repeat(17 - String(failed).length)}║`);
  console.log('╚════════════════════════════════════════════╝\n');

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests if executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('Test suite error:', error);
    process.exit(1);
  });
}

module.exports = {
  testInitialization,
  testTaskTransitions,
  testFailedTasks,
  testTokenCounting,
  testElapsedTime,
  testPauseResume,
  testETACalculation,
  testMetricsGeneration,
  testDurationFormatting,
  testByteFormatting,
  testJSONOutput,
  testEventEmission,
  testStateExportImport,
  testTaskRetrieval,
  testSummaryGeneration
};
