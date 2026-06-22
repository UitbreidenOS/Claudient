# Task Optimizer Library - Complete Index

ML-based adaptive task sequencing with confidence scoring, duration estimation, and failure pattern analysis.

## Files Overview

### Core Library

| File | Purpose |
|------|---------|
| `task-optimizer.js` | Main library (600+ lines) |
| `task-optimizer.d.ts` | TypeScript type definitions |
| `task-optimizer.test.js` | Unit + integration tests (40+ tests) |
| `task-optimizer.example.js` | 8 detailed usage examples |

### Documentation

| File | Purpose |
|------|---------|
| `TASK_OPTIMIZER_README.md` | Complete API reference & guide |
| `INTEGRATION_EXAMPLES.md` | 10+ practical integration patterns |
| `INDEX.md` | This file |

## Quick Links

### For First-Time Users
1. Start with [TASK_OPTIMIZER_README.md](./TASK_OPTIMIZER_README.md) - Quick Start section
2. Run examples: `node lib/task-optimizer.example.js`
3. Run tests: `node lib/task-optimizer.test.js`

### For Integration
1. Review [INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md) for your use case
2. Copy the appropriate pattern to your codebase
3. Adapt to your task definitions and execution logic

### For Deep Dive
1. Read [TASK_OPTIMIZER_README.md](./TASK_OPTIMIZER_README.md) - API Reference section
2. Review source code comments in `task-optimizer.js`
3. Study type definitions in `task-optimizer.d.ts`

## Core Concepts

### Confidence Score (0-1)
Success likelihood for a task based on:
- Historical success rate
- Number of attempts (minimum threshold)
- Recency (exponential decay)

Higher confidence → attempt first

### Duration Estimate
Task completion prediction:
- Average of historical durations
- Confidence in estimate increases with sample size
- Used for completion forecasting

### Failure Patterns
Error tracking and grouping:
- Tracks which errors occur most frequently
- Associates errors with specific execution approaches
- Enables smart error recovery

### Approach Suggestions
Recommends alternative execution strategies:
- Compares success rates across approaches
- Prioritizes by impact (success rate or duration improvement)
- Provides reasoning for each suggestion

## Core Methods

### Registration & Recording
```
registerTask(taskId, metadata)    - Define task with metadata
recordResult(taskId, result)      - Log execution outcome
```

### Analysis
```
calculateConfidenceScore(taskId)  - Get confidence (0-1)
estimateDuration(taskId)          - Predict task duration
predictSuccess(taskId)            - Forecast success probability
getTaskAnalytics(taskId)          - Complete task metrics
```

### Sequencing & Forecasting
```
getOptimalSequence(taskIds)       - Order tasks by confidence
estimateCompletion(taskIds)       - Forecast total workflow time
```

### Recovery & Suggestions
```
suggestAlternativeApproach()      - Recommend fallback strategies
getFailurePatterns(taskId)        - Get error history
```

### Persistence
```
save()                            - Persist to localStorage
load()                            - Restore from localStorage
exportModel()                     - Export for analysis
```

## Usage Patterns

### Pattern 1: Basic Workflow
```javascript
optimizer.registerTask('build');
await runBuild();
optimizer.recordResult('build', { success: true, duration: 1000 });
```

### Pattern 2: Adaptive Sequencing
```javascript
const sequence = optimizer.getOptimalSequence(taskIds);
for (const task of sequence) {
  await executeTask(task.id);
}
```

### Pattern 3: Failure Recovery
```javascript
try {
  await runTask();
} catch (error) {
  optimizer.recordResult(taskId, { success: false, error: error.message });
  const alternatives = optimizer.suggestAlternativeApproach(taskId);
  if (alternatives.length > 0) {
    await retryWithApproach(alternatives[0].approach);
  }
}
```

### Pattern 4: Predictive Scheduling
```javascript
const completion = optimizer.estimateCompletion(taskIds, parallelism);
console.log(`ETA: ${completion.parallel}ms with ${(completion.avgConfidence * 100).toFixed(0)}% confidence`);
```

### Pattern 5: Monitoring
```javascript
const analytics = optimizer.getTaskAnalytics(taskId);
if (analytics.confidence < 0.5) {
  alert(`Task confidence dropped: ${analytics.failurePatterns.map(p => p.error)}`);
}
```

## Configuration Options

```javascript
new TaskOptimizer({
  storageKey: 'my-tasks',           // localStorage key
  confidenceThreshold: 0.6,         // confidence cutoff
  decayFactor: 0.95,                // age decay rate
  minSamples: 3,                    // min attempts for scoring
})
```

## Performance Metrics

- **Memory**: O(n) where n = total history records
- **Scoring**: O(1) per task
- **Sequencing**: O(n log n) for sorting
- **Default storage**: localStorage (browser) or custom backend

## Integrations Included

- ✓ GitHub Actions CI/CD
- ✓ Docker multi-stage builds
- ✓ Node.js workflow managers
- ✓ Express.js dashboards
- ✓ Prometheus metrics export
- ✓ Circuit breaker pattern
- ✓ Adaptive retry strategies
- ✓ Distributed execution
- ✓ SLA monitoring
- ✓ Alert systems

## Test Coverage

45+ tests covering:
- Registration & result recording
- Confidence score calculation
- Duration estimation
- Sequencing algorithms
- Completion forecasting
- Failure pattern tracking
- Approach suggestions
- Success prediction
- Analytics aggregation
- Data persistence

Run tests: `node lib/task-optimizer.test.js`

## Examples Included

8 detailed examples:
1. Basic task tracking
2. Optimal sequencing
3. Learning from failures
4. Completion estimation
5. Success prediction
6. Task analytics
7. Real-world workflow scenario
8. Model export & analysis

Run examples: `node lib/task-optimizer.example.js`

## Key Algorithms

### Confidence Calculation
```
if attempts < minSamples:
  confidence = min(0.3, attempts / minSamples)
else:
  successRate = successes / attempts
  recencyDecay = decayFactor ^ ageInDays
  confidence = successRate * recencyDecay
```

### Completion Estimation
```
sequential = sum(avgDuration for each task)
parallel = sequential / parallelism
avgConfidence = sum(confidence) / taskCount
```

### Suggestion Ranking
```
For each alternative approach:
  score = successRate / currentSuccessRate
  if success rates similar:
    score = currentDuration / altDuration
  Return sorted by score descending
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Confidence not improving | Ensure minSamples threshold met, check task success/failure |
| Duration estimates inaccurate | Collect more samples (10+), check for outliers |
| No suggestions appear | Verify approaches registered, ensure 2+ attempts per approach |
| Data not persisting | Check localStorage enabled, provide custom storage backend |

## Related Documentation

- `TASK_OPTIMIZER_README.md` - API reference & detailed guide
- `INTEGRATION_EXAMPLES.md` - Practical integration patterns
- `task-optimizer.d.ts` - TypeScript type definitions
- `task-optimizer.test.js` - Working test examples
- `task-optimizer.example.js` - Usage examples

## Future Enhancements

Potential additions:
- Database backend for history storage
- Advanced ML models (regression, clustering)
- Task dependency graphs
- Resource allocation optimization
- Cost tracking (cloud execution costs)
- Multi-tenant support
- Web dashboard
- REST API wrapper

## License

MIT
