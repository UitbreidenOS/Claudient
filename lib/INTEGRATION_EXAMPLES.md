# Task Optimizer - Integration Examples

Practical code examples for integrating TaskOptimizer into workflows.

## Basic Workflow Manager

```javascript
const TaskOptimizer = require('./lib/task-optimizer');

class WorkflowManager {
  constructor() {
    this.optimizer = new TaskOptimizer();
    this.tasks = new Map();
  }

  defineTask(taskId, definition) {
    this.tasks.set(taskId, definition);
    this.optimizer.registerTask(taskId, {
      name: definition.name,
      category: definition.category,
      approaches: definition.approaches || ['default'],
      estimatedDuration: definition.duration,
    });
  }

  async executeTask(taskId, options = {}) {
    const def = this.tasks.get(taskId);
    const approach = options.approach || 'default';
    const start = Date.now();

    try {
      const result = await def.execute(approach);
      const duration = Date.now() - start;

      this.optimizer.recordResult(taskId, {
        success: true,
        duration,
        approach,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - start;

      this.optimizer.recordResult(taskId, {
        success: false,
        duration,
        approach,
        error: error.message,
      });

      throw error;
    }
  }

  async executeWorkflow(taskIds, options = {}) {
    const sequence = this.optimizer.getOptimalSequence(taskIds);
    const completion = this.optimizer.estimateCompletion(taskIds);

    console.log(`\nWorkflow: ${taskIds.join(' → ')}`);
    console.log(`Estimated: ${(completion.sequential / 1000 / 60).toFixed(1)}m`);
    console.log(`Confidence: ${(completion.avgConfidence * 100).toFixed(0)}%\n`);

    const results = {};

    for (const task of sequence) {
      try {
        console.log(`[${task.name}] Starting...`);
        results[task.id] = await this.executeTask(task.id, options);
        console.log(`[${task.name}] ✓ Complete\n`);
      } catch (error) {
        console.error(`[${task.name}] ✗ Failed: ${error.message}`);

        if (options.failFast) throw error;
      }
    }

    return results;
  }
}
```

## Adaptive Retry Strategy

```javascript
class AdaptiveRetry {
  constructor(optimizer, maxRetries = 3) {
    this.optimizer = optimizer;
    this.maxRetries = maxRetries;
  }

  async execute(taskId, fn) {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const start = Date.now();
        const result = await fn({ attempt });
        const duration = Date.now() - start;

        this.optimizer.recordResult(taskId, {
          success: true,
          duration,
          approach: 'default',
        });

        return result;
      } catch (error) {
        lastError = error;

        this.optimizer.recordResult(taskId, {
          success: false,
          duration: Date.now() - start,
          approach: 'default',
          error: error.message,
        });

        if (attempt < this.maxRetries) {
          const backoff = this._getAdaptiveBackoff(taskId, attempt);
          console.log(`  Attempt ${attempt} failed. Waiting ${backoff}ms before retry...`);
          await this._sleep(backoff);
        }
      }
    }

    throw lastError;
  }

  _getAdaptiveBackoff(taskId, attempt) {
    // Exponential backoff with jitter
    const baseDelay = 1000;
    const exponential = Math.pow(2, attempt - 1) * baseDelay;
    const jitter = Math.random() * 500;

    // Reduce backoff if task has high success rate
    const confidence = this.optimizer.calculateConfidenceScore(taskId);
    const delayFactor = Math.max(0.5, 1 - confidence);

    return (exponential + jitter) * delayFactor;
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Circuit Breaker Pattern

```javascript
class CircuitBreaker {
  constructor(optimizer, taskId, confidenceThreshold = 0.3, resetTimeout = 60000) {
    this.optimizer = optimizer;
    this.taskId = taskId;
    this.threshold = confidenceThreshold;
    this.resetTimeout = resetTimeout;
    this.state = 'CLOSED';
    this.lastFailureTime = null;
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error(`Circuit breaker OPEN for ${this.taskId}`);
      }
    }

    try {
      const start = Date.now();
      const result = await fn();
      const duration = Date.now() - start;

      this.optimizer.recordResult(this.taskId, {
        success: true,
        duration,
      });

      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
      }

      return result;
    } catch (error) {
      this.lastFailureTime = Date.now();

      const confidence = this.optimizer.calculateConfidenceScore(this.taskId);
      if (confidence < this.threshold) {
        this.state = 'OPEN';
      }

      this.optimizer.recordResult(this.taskId, {
        success: false,
        duration: Date.now() - start,
        error: error.message,
      });

      throw error;
    }
  }
}
```

## Fallback Executor

```javascript
class FallbackExecutor {
  constructor(optimizer) {
    this.optimizer = optimizer;
  }

  async execute(taskId, strategies = []) {
    for (const strategy of strategies) {
      try {
        console.log(`Trying ${strategy.name}...`);
        const start = Date.now();
        const result = await strategy.execute();
        const duration = Date.now() - start;

        this.optimizer.recordResult(taskId, {
          success: true,
          duration,
          approach: strategy.name,
        });

        return result;
      } catch (error) {
        this.optimizer.recordResult(taskId, {
          success: false,
          duration: Date.now() - start,
          approach: strategy.name,
          error: error.message,
        });

        console.error(`${strategy.name} failed: ${error.message}`);
      }
    }

    throw new Error(`All ${strategies.length} strategies failed for ${taskId}`);
  }
}

// Usage example
const executor = new FallbackExecutor(optimizer);

await executor.execute('deploy', [
  { name: 'rolling', execute: deployRolling },
  { name: 'blue-green', execute: deployBlueGreen },
  { name: 'canary', execute: deployCanary },
]);
```

## Dashboard Metrics Export

```javascript
class TaskDashboard {
  constructor(optimizer) {
    this.optimizer = optimizer;
  }

  generateMetrics() {
    const tasks = Array.from(this.optimizer.tasks.values());

    return {
      timestamp: Date.now(),
      summary: {
        totalTasks: tasks.length,
        avgConfidence: tasks.length > 0
          ? tasks.reduce((sum, t) => sum + this.optimizer.calculateConfidenceScore(t.id), 0) / tasks.length
          : 0,
        totalAttempts: tasks.reduce((sum, t) => sum + t.attempts, 0),
        totalSuccesses: tasks.reduce((sum, t) => sum + t.successes, 0),
      },
      tasks: tasks.map(task => ({
        id: task.id,
        name: task.name,
        category: task.category,
        confidence: this.optimizer.calculateConfidenceScore(task.id),
        successRate: task.attempts > 0 ? task.successes / task.attempts : null,
        avgDuration: task.attempts > 0 ? task.totalDuration / task.attempts : null,
        failureCount: task.failures,
        topErrors: this.optimizer.getFailurePatterns(task.id).slice(0, 3),
      })),
    };
  }

  exportPrometheus() {
    const metrics = this.generateMetrics();
    const lines = [];

    lines.push('# HELP task_confidence Task confidence scores');
    lines.push('# TYPE task_confidence gauge');
    metrics.tasks.forEach(task => {
      lines.push(`task_confidence{task="${task.id}"} ${task.confidence}`);
    });

    lines.push('# HELP task_success_rate Task success rates');
    lines.push('# TYPE task_success_rate gauge');
    metrics.tasks.forEach(task => {
      if (task.successRate !== null) {
        lines.push(`task_success_rate{task="${task.id}"} ${task.successRate}`);
      }
    });

    return lines.join('\n');
  }
}
```

## SLA Monitoring

```javascript
class SLAMonitor {
  constructor(optimizer, slas = {}) {
    this.optimizer = optimizer;
    this.slas = slas;
  }

  checkSLA(taskId) {
    const estimate = this.optimizer.estimateDuration(taskId);
    const sla = this.slas[taskId];

    if (!sla) return { compliant: true };

    return {
      compliant: estimate.estimate <= sla,
      taskId,
      estimate: estimate.estimate,
      sla,
      buffer: sla - (estimate.estimate || 0),
    };
  }

  recommendOptimizations() {
    const violations = [];

    for (const [taskId, sla] of Object.entries(this.slas)) {
      const check = this.checkSLA(taskId);
      if (!check.compliant) {
        const suggestions = this.optimizer.suggestAlternativeApproach(taskId);
        if (suggestions.length > 0) {
          const fastest = suggestions[0];
          violations.push({
            taskId,
            currentDuration: check.estimate,
            suggestedApproach: fastest.approach,
            potentialSavings: check.estimate - fastest.avgDuration,
          });
        }
      }
    }

    return violations;
  }
}
```

## Alerting System

```javascript
class AlertingSystem {
  constructor(optimizer) {
    this.optimizer = optimizer;
  }

  checkAlerts() {
    const alerts = [];
    const tasks = Array.from(this.optimizer.tasks.values());

    tasks.forEach(task => {
      const confidence = this.optimizer.calculateConfidenceScore(task.id);
      const analytics = this.optimizer.getTaskAnalytics(task.id);

      // Low confidence warning
      if (confidence < 0.5) {
        alerts.push({
          severity: 'warning',
          task: task.id,
          message: `Confidence: ${(confidence * 100).toFixed(0)}%`,
        });
      }

      // High failure rate
      if (analytics && analytics.statistics.successRate < 0.5) {
        alerts.push({
          severity: 'critical',
          task: task.id,
          message: `Success rate: ${(analytics.statistics.successRate * 100).toFixed(0)}%`,
          errors: analytics.failurePatterns.slice(0, 2).map(p => p.error),
        });
      }

      // Recent degradation
      const recent = analytics.recentAttempts.slice(-5);
      const recentSuccess = recent.filter(a => a.success).length / recent.length;
      if (recentSuccess < 0.4) {
        alerts.push({
          severity: 'high',
          task: task.id,
          message: `Recent degradation: ${(recentSuccess * 100).toFixed(0)}%`,
        });
      }
    });

    return alerts;
  }
}
```

## Multi-Worker Execution

```javascript
class DistributedExecutor {
  constructor(optimizer, numWorkers = 4) {
    this.optimizer = optimizer;
    this.numWorkers = numWorkers;
  }

  async executeWorkflow(taskIds) {
    const sequence = this.optimizer.getOptimalSequence(taskIds);
    const groups = this._groupByConfidence(sequence);

    for (const group of groups) {
      const promises = group.map(task => this._executeTask(task.id));
      await Promise.all(promises);
    }
  }

  _groupByConfidence(sequence) {
    const groups = [];
    let currentGroup = [];
    let lastConfidence = 1;

    for (const task of sequence) {
      if (Math.abs(task.confidence - lastConfidence) > 0.1 && currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(task);
      lastConfidence = task.confidence;
    }

    if (currentGroup.length > 0) groups.push(currentGroup);
    return groups;
  }

  async _executeTask(taskId) {
    // Task execution logic
  }
}
```

## Best Practices Summary

1. **Always record results** - Success or failure
2. **Use multiple approaches** - Enable fallback strategies
3. **Monitor confidence scores** - Alert when dropping
4. **Persist data** - Save state between runs
5. **Analyze failure patterns** - Learn from errors
6. **Export metrics** - Integration with monitoring systems
7. **Implement circuit breakers** - Prevent cascading failures
8. **Track SLAs** - Validate performance targets
