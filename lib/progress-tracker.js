/**
 * Progress Tracker — Real-time progress display with terminal UI
 *
 * Manages:
 * - Goal statement display
 * - Task lifecycle (completed/current/pending/failed)
 * - Live metrics: elapsed_time, tokens_used, ETA
 * - Terminal UI rendering (2s refresh)
 * - JSON output for machine consumption
 * - Watch mode for continuous updates
 */

const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');

/**
 * Color codes for terminal output
 */
const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

/**
 * Task status constants
 */
const TASK_STATUS = {
  PENDING: 'pending',
  CURRENT: 'current',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

/**
 * ProgressTracker class
 */
class ProgressTracker extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      refreshInterval: options.refreshInterval || 2000,
      outputFormat: options.outputFormat || 'terminal', // 'terminal' | 'json'
      watchMode: options.watchMode || false,
      verbose: options.verbose || false,
      noColor: options.noColor || false,
      outputFile: options.outputFile || null,
      ...options
    };

    this.goal = null;
    this.tasks = [];
    this.currentTaskIndex = -1;
    this.startTime = null;
    this.pausedTime = 0;
    this.lastPauseTime = null;
    this.tokenCount = 0;
    this.completedCount = 0;
    this.failedCount = 0;
    this.refreshTimer = null;
    this.paused = false;
  }

  /**
   * Initialize tracker with goal and task list
   * @param {string} goal - Goal statement
   * @param {Array<Object>} tasks - Array of task objects
   */
  initialize(goal, tasks = []) {
    this.goal = goal;
    this.tasks = tasks.map((task, index) => ({
      id: task.id || `task-${index}`,
      name: task.name || task.subject || `Task ${index + 1}`,
      description: task.description || '',
      status: TASK_STATUS.PENDING,
      startTime: null,
      endTime: null,
      duration: 0,
      tokens: 0,
      output: null,
      error: null
    }));
    this.startTime = Date.now();
    this.emit('initialized', { goal, taskCount: this.tasks.length });
  }

  /**
   * Start task by index
   * @param {number|string} taskId - Task index or ID
   */
  startTask(taskId) {
    const index = typeof taskId === 'number' ? taskId : this.tasks.findIndex(t => t.id === taskId);
    if (index < 0 || index >= this.tasks.length) {
      throw new Error(`Invalid task ID or index: ${taskId}`);
    }

    if (this.currentTaskIndex >= 0 && this.currentTaskIndex !== index) {
      this.completeTask(this.currentTaskIndex);
    }

    this.currentTaskIndex = index;
    this.tasks[index].status = TASK_STATUS.CURRENT;
    this.tasks[index].startTime = Date.now();
    this.emit('taskStart', this.tasks[index]);

    if (this.options.watchMode) {
      this.render();
    }
  }

  /**
   * Complete current task
   * @param {number} tokens - Tokens used for this task
   * @param {any} output - Task output (optional)
   */
  completeTask(index, tokens = 0, output = null) {
    if (index < 0 || index >= this.tasks.length) {
      index = this.currentTaskIndex;
    }

    if (index < 0) return;

    const task = this.tasks[index];
    task.endTime = Date.now();
    task.duration = task.endTime - (task.startTime || task.endTime);
    task.status = TASK_STATUS.COMPLETED;
    task.tokens = tokens;
    task.output = output;
    this.tokenCount += tokens;
    this.completedCount += 1;

    this.emit('taskComplete', task);

    if (this.currentTaskIndex === index) {
      this.currentTaskIndex = -1;
    }

    if (this.options.watchMode) {
      this.render();
    }
  }

  /**
   * Fail current task
   * @param {Error|string} error - Error object or message
   * @param {number} tokens - Tokens used before failure
   */
  failTask(index, error, tokens = 0) {
    if (index < 0 || index >= this.tasks.length) {
      index = this.currentTaskIndex;
    }

    if (index < 0) return;

    const task = this.tasks[index];
    task.endTime = Date.now();
    task.duration = task.endTime - (task.startTime || task.endTime);
    task.status = TASK_STATUS.FAILED;
    task.error = error instanceof Error ? error.message : String(error);
    task.tokens = tokens;
    this.tokenCount += tokens;
    this.failedCount += 1;

    this.emit('taskFailed', task);

    if (this.currentTaskIndex === index) {
      this.currentTaskIndex = -1;
    }

    if (this.options.watchMode) {
      this.render();
    }
  }

  /**
   * Add tokens (incremental)
   * @param {number} tokens - Number of tokens to add
   */
  addTokens(tokens) {
    this.tokenCount += tokens;
    this.emit('tokensAdded', tokens);
  }

  /**
   * Pause tracker
   */
  pause() {
    if (!this.paused && this.startTime) {
      this.paused = true;
      this.lastPauseTime = Date.now();
      this.emit('paused');
      this.render();
    }
  }

  /**
   * Resume tracker
   */
  resume() {
    if (this.paused && this.lastPauseTime) {
      this.pausedTime += Date.now() - this.lastPauseTime;
      this.paused = false;
      this.lastPauseTime = null;
      this.emit('resumed');
      this.render();
    }
  }

  /**
   * Calculate elapsed time (accounting for pauses)
   * @returns {number} Milliseconds
   */
  getElapsedTime() {
    if (!this.startTime) return 0;
    const current = this.paused ? this.lastPauseTime : Date.now();
    return current - this.startTime - this.pausedTime;
  }

  /**
   * Estimate time remaining
   * @returns {number|null} Milliseconds or null if cannot estimate
   */
  getETA() {
    if (this.completedCount === 0) return null;

    const avgTimePerTask = this.getElapsedTime() / this.completedCount;
    const remainingTasks = this.tasks.length - this.completedCount - this.failedCount;

    if (remainingTasks <= 0) return null;
    return avgTimePerTask * remainingTasks;
  }

  /**
   * Get progress metrics
   * @returns {Object} Metrics snapshot
   */
  getMetrics() {
    const elapsedTime = this.getElapsedTime();
    const eta = this.getETA();
    const currentTask = this.currentTaskIndex >= 0 ? this.tasks[this.currentTaskIndex] : null;

    return {
      goal: this.goal,
      status: this.paused ? 'paused' : 'running',
      current_task: currentTask ? currentTask.name : null,
      elapsed_time_ms: elapsedTime,
      elapsed_time: this.formatDuration(elapsedTime),
      tokens_used: this.tokenCount,
      eta_ms: eta,
      eta: eta ? this.formatDuration(eta) : null,
      completed: this.completedCount,
      failed: this.failedCount,
      pending: this.tasks.length - this.completedCount - this.failedCount,
      total: this.tasks.length,
      progress_percent: Math.round((this.completedCount / this.tasks.length) * 100)
    };
  }

  /**
   * Format duration in ms to human-readable string
   * @param {number} ms - Milliseconds
   * @returns {string} Formatted duration
   */
  formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  /**
   * Format bytes to human-readable string
   * @param {number} bytes - Number of bytes
   * @returns {string} Formatted bytes
   */
  formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  /**
   * Color text if not noColor
   * @param {string} text - Text to color
   * @param {string} color - Color code
   * @returns {string} Colored or plain text
   */
  colorize(text, color) {
    if (this.options.noColor) return text;
    return `${color}${text}${COLORS.reset}`;
  }

  /**
   * Render terminal UI
   */
  renderTerminalUI() {
    if (!process.stdout.isTTY) return;

    const metrics = this.getMetrics();
    let output = '\n';

    // Goal
    output += this.colorize('━━━ PROGRESS TRACKER ━━━\n', COLORS.cyan);
    output += `${this.colorize('Goal:', COLORS.bright)} ${this.goal || 'N/A'}\n\n`;

    // Summary bar
    const progressBar = this.renderProgressBar(metrics.progress_percent);
    output += `${progressBar} ${metrics.progress_percent}% (${metrics.completed}/${metrics.total})\n`;
    output += `${this.colorize('Status:', COLORS.bright)} ${this.colorize(metrics.status.toUpperCase(), metrics.status === 'running' ? COLORS.green : COLORS.yellow)}\n\n`;

    // Metrics
    output += this.colorize('Metrics:', COLORS.bright) + '\n';
    output += `  ${this.colorize('Elapsed:', COLORS.dim)} ${metrics.elapsed_time}\n`;
    output += `  ${this.colorize('ETA:', COLORS.dim)} ${metrics.eta || 'N/A'}\n`;
    output += `  ${this.colorize('Tokens:', COLORS.dim)} ${metrics.tokens_used}\n`;
    if (metrics.current_task) {
      output += `  ${this.colorize('Current:', COLORS.dim)} ${metrics.current_task}\n`;
    }
    output += '\n';

    // Task list
    output += this.colorize('Tasks:', COLORS.bright) + '\n';
    this.tasks.slice(0, 10).forEach((task, idx) => {
      output += this.renderTaskLine(task, idx);
    });

    if (this.tasks.length > 10) {
      output += this.colorize(`  ... and ${this.tasks.length - 10} more\n`, COLORS.dim);
    }

    output += '\n' + this.colorize('━━━━━━━━━━━━━━━━━━━━━━━━\n', COLORS.cyan);

    // Clear screen and print
    if (process.stdout.isTTY) {
      process.stdout.write('\x1Bc'); // Clear screen
    }
    process.stdout.write(output);
  }

  /**
   * Render progress bar
   * @param {number} percent - Progress percentage (0-100)
   * @returns {string} Progress bar
   */
  renderProgressBar(percent) {
    const width = 30;
    const filled = Math.round((width * percent) / 100);
    const empty = width - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return this.colorize(`[${bar}]`, COLORS.cyan);
  }

  /**
   * Render single task line
   * @param {Object} task - Task object
   * @param {number} index - Task index
   * @returns {string} Formatted task line
   */
  renderTaskLine(task, index) {
    let icon = '  ';
    let color = COLORS.gray;

    switch (task.status) {
      case TASK_STATUS.COMPLETED:
        icon = this.colorize('✓', COLORS.green);
        break;
      case TASK_STATUS.CURRENT:
        icon = this.colorize('▶', COLORS.blue);
        break;
      case TASK_STATUS.FAILED:
        icon = this.colorize('✗', COLORS.red);
        break;
      case TASK_STATUS.PENDING:
        icon = this.colorize('○', COLORS.gray);
        break;
    }

    let details = ` ${task.name}`;
    if (task.duration) {
      details += this.colorize(` (${this.formatDuration(task.duration)})`, COLORS.dim);
    }
    if (task.tokens > 0) {
      details += this.colorize(` [${task.tokens} tokens]`, COLORS.dim);
    }
    if (task.error) {
      details += this.colorize(` - ${task.error}`, COLORS.red);
    }

    return `${icon}${details}\n`;
  }

  /**
   * Render JSON output
   * @returns {string} JSON representation
   */
  renderJSON() {
    const metrics = this.getMetrics();
    return JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        metrics,
        tasks: this.tasks.map(task => ({
          id: task.id,
          name: task.name,
          status: task.status,
          duration_ms: task.duration,
          duration: this.formatDuration(task.duration),
          tokens: task.tokens,
          error: task.error || null,
          output: task.output
        }))
      },
      null,
      2
    );
  }

  /**
   * Render output based on format option
   */
  render() {
    const output =
      this.options.outputFormat === 'json' ? this.renderJSON() : this.renderTerminalUI();

    if (this.options.outputFile) {
      this.writeToFile(output);
    } else if (this.options.outputFormat === 'json') {
      console.log(output);
    }
  }

  /**
   * Write output to file
   * @param {string} content - Content to write
   */
  writeToFile(content) {
    try {
      fs.writeFileSync(this.options.outputFile, content, 'utf8');
    } catch (error) {
      this.emit('error', new Error(`Failed to write to ${this.options.outputFile}: ${error.message}`));
    }
  }

  /**
   * Start watch mode (auto-refresh)
   */
  startWatchMode() {
    if (this.refreshTimer) return;

    this.options.watchMode = true;
    this.refreshTimer = setInterval(() => {
      this.render();
    }, this.options.refreshInterval);

    this.emit('watchStarted');
  }

  /**
   * Stop watch mode
   */
  stopWatchMode() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.options.watchMode = false;
    this.emit('watchStopped');
  }

  /**
   * Export complete state
   * @returns {Object} Full state snapshot
   */
  exportState() {
    return {
      goal: this.goal,
      tasks: this.tasks,
      metrics: this.getMetrics(),
      startTime: this.startTime,
      pausedTime: this.pausedTime,
      tokenCount: this.tokenCount
    };
  }

  /**
   * Import state (for resuming)
   * @param {Object} state - State object to import
   */
  importState(state) {
    if (!state) return;
    this.goal = state.goal;
    this.tasks = state.tasks || [];
    this.startTime = state.startTime;
    this.pausedTime = state.pausedTime || 0;
    this.tokenCount = state.tokenCount || 0;
    this.completedCount = this.tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length;
    this.failedCount = this.tasks.filter(t => t.status === TASK_STATUS.FAILED).length;
    this.emit('stateImported');
  }

  /**
   * Get task by ID
   * @param {string|number} taskId - Task ID or index
   * @returns {Object|null}
   */
  getTask(taskId) {
    const index = typeof taskId === 'number' ? taskId : this.tasks.findIndex(t => t.id === taskId);
    return index >= 0 ? this.tasks[index] : null;
  }

  /**
   * Get all tasks with status filter
   * @param {string} status - TASK_STATUS value (optional)
   * @returns {Array<Object>}
   */
  getTasks(status = null) {
    if (!status) return this.tasks;
    return this.tasks.filter(t => t.status === status);
  }

  /**
   * Get summary
   * @returns {Object}
   */
  getSummary() {
    return {
      goal: this.goal,
      total: this.tasks.length,
      completed: this.completedCount,
      failed: this.failedCount,
      pending: this.tasks.length - this.completedCount - this.failedCount,
      tokens: this.tokenCount,
      elapsed: this.formatDuration(this.getElapsedTime()),
      eta: this.getETA() ? this.formatDuration(this.getETA()) : null
    };
  }

  /**
   * Destroy tracker and cleanup
   */
  destroy() {
    this.stopWatchMode();
    this.removeAllListeners();
  }
}

module.exports = {
  ProgressTracker,
  TASK_STATUS,
  COLORS
};
