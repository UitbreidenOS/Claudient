# TaskSplitter — Break Complex Tasks Into Parallel Sub-Tasks

A utility library for decomposing large tasks into independent sub-tasks, executing them in parallel with automatic retry and failure recovery.

## Features

### 1. Task Complexity Analysis
Analyze task complexity and estimate execution time based on:
- Description keywords (network, database, file I/O, etc.)
- Number of sub-tasks and files
- Concurrency indicators

Returns complexity level (`low`, `medium`, `high`) and estimated time in minutes.

```javascript
const splitter = new TaskSplitter()
const analysis = splitter.analyzeTask({
  description: 'Migrate 50k records with parallel transactions',
  subtasks: [/* ... */],
  files: [/* ... */]
})
// { complexity: 'high', estimatedMinutes: 44, reason: '...' }
```

### 2. Smart Split Suggestions
For tasks exceeding 30 minutes, get suggestions on how to split them:
- By items (process each item separately)
- By batch (group into smaller batches)
- By sequence (staged dependencies)
- By type (group by category)

```javascript
const suggestions = splitter.suggestSplits(largeTask)
// {
//   shouldSplit: true,
//   suggestions: [
//     'Split by batch: group 15 tasks into 3 batches',
//     'Split by sequence: create staged sub-tasks'
//   ],
//   rationale: 'Task estimated at 35min (threshold: 30min). Factors: ...'
// }
```

### 3. Auto-Split & Parallel Execution
Automatically decompose tasks and execute sub-tasks in parallel:

```javascript
const splitter = new TaskSplitter({ concurrency: 4 })

// Auto-split task
const split = splitter.autoSplit(largeTask)
// { subtasks: [...], strategy: 'batch', parallelizable: 12 }

// Execute in parallel
const result = await splitter.executeParallel(split.subtasks, executor)
// { completed: 12, failed: 0, results: Map, failures: [] }
```

### 4. Automatic Retry on Failure
Execute with built-in retry and auto-split on failure:

```javascript
const result = await splitter.executeWithRetry(task, executor)
// Attempts original task
// On failure: auto-splits and retries components independently
// On component failure: retries individual tasks
// Returns: { success, results, failures, retried }
```

### 5. Dependency Analysis
Identify independent vs. dependent tasks to maximize parallelization:

```javascript
const analysis = splitter.analyzeDependencies(tasks)
// {
//   independent: [task1, task2],
//   dependent: [task3, task4, task5],
//   graph: Map of task dependencies
// }
```

## API Reference

### Constructor

```javascript
new TaskSplitter(options)
```

**Options:**
- `timeoutMs` (number): Task timeout in milliseconds. Default: `30 * 60 * 1000` (30 min)
- `maxRetries` (number): Maximum retry attempts. Default: `3`
- `concurrency` (number): Parallel execution concurrency limit. Default: `4`
- `verbose` (boolean): Enable verbose logging. Default: `false`

### Methods

#### `analyzeTask(task) -> AnalysisResult`

Analyze task complexity and estimate execution time.

**Returns:**
```javascript
{
  complexity: 'low' | 'medium' | 'high',
  estimatedMinutes: number,
  reason: string
}
```

#### `suggestSplits(task) -> SplitSuggestion`

Get suggestions for splitting large tasks.

**Returns:**
```javascript
{
  shouldSplit: boolean,
  suggestions: string[],
  rationale: string
}
```

#### `autoSplit(task) -> SplitResult`

Automatically decompose task into sub-tasks.

**Returns:**
```javascript
{
  subtasks: Task[],
  strategy: 'items' | 'batch' | 'sequence' | 'type' | 'subtasks',
  parallelizable: number
}
```

#### `executeParallel(subtasks, executor) -> ExecutionResult`

Execute sub-tasks in parallel with concurrency control.

**Parameters:**
- `subtasks` (Task[]): Array of tasks to execute
- `executor` (async function): Function that executes a single task

**Returns:**
```javascript
{
  completed: number,
  failed: number,
  results: Map<taskId, result>,
  failures: Array<{task, error}>
}
```

#### `executeWithRetry(task, executor) -> RetryResult`

Execute task with automatic retry and split on failure.

**Returns:**
```javascript
{
  success: boolean,
  results: any[],
  failures: Error[],
  retried: number
}
```

#### `analyzeDependencies(tasks) -> DependencyAnalysis`

Analyze task dependencies to identify parallelizable tasks.

**Returns:**
```javascript
{
  independent: Task[],
  dependent: Task[],
  graph: Map<taskId, {task, deps}>
}
```

### Events

The TaskSplitter extends EventEmitter. Listen for:

```javascript
splitter.on('log', msg => console.log(msg))
```

## Task Schema

Tasks should follow this structure:

```javascript
{
  // Required
  id: string,
  name: string,
  
  // Optional
  description: string,
  parent: string,                    // Parent task ID for hierarchical tasks
  type: string,                      // Task type for grouping
  order: number,                     // Sequence order
  subtasks: Task[],                  // Child tasks
  dependencies: string[],            // Task IDs this depends on
  dependsOn: string[],               // Alternative dependency field
  files: string[],                   // Associated files
  status: 'pending' | 'completed' | 'failed'
}
```

## Usage Examples

### Example 1: Analyze and Suggest Splits

```javascript
const { TaskSplitter } = require('./task-splitter')

const splitter = new TaskSplitter()

const task = {
  id: 'batch-1',
  name: 'Process Orders',
  description: 'Process 100 orders with validation and email confirmation',
  subtasks: Array(100).fill(null).map((_, i) => ({
    id: `order-${i}`,
    status: 'pending'
  }))
}

const analysis = splitter.analyzeTask(task)
console.log(`Complexity: ${analysis.complexity}, ETA: ${analysis.estimatedMinutes}min`)

if (analysis.estimatedMinutes > 30) {
  const suggestions = splitter.suggestSplits(task)
  console.log('Split suggestions:')
  suggestions.suggestions.forEach(s => console.log(`  - ${s}`))
}
```

### Example 2: Auto-Split and Execute

```javascript
const splitter = new TaskSplitter({ 
  concurrency: 4,
  verbose: true 
})

const largeTask = {
  id: 'batch-load',
  name: 'Load Data',
  subtasks: [
    { id: 'csv-1', file: 'users.csv' },
    { id: 'csv-2', file: 'orders.csv' },
    { id: 'csv-3', file: 'products.csv' }
  ]
}

// Split task
const split = splitter.autoSplit(largeTask)
console.log(`Split into ${split.subtasks.length} parallel tasks`)

// Execute in parallel
const executor = async (task) => {
  // Implement task execution logic
  return processFile(task.file)
}

const result = await splitter.executeParallel(split.subtasks, executor)
console.log(`Completed: ${result.completed}, Failed: ${result.failed}`)
```

### Example 3: Execute with Automatic Retry

```javascript
const splitter = new TaskSplitter({ 
  maxRetries: 3,
  timeoutMs: 10000 
})

const task = {
  id: 'api-sync',
  name: 'Sync Data',
  description: 'Sync data from 20 API endpoints with retry logic'
}

const executor = async (t) => {
  // May throw on network errors
  return await fetchFromAPI(t.id)
}

const result = await splitter.executeWithRetry(task, executor)
if (result.success) {
  console.log(`Completed with ${result.retried} retries`)
} else {
  console.log(`Failed after ${result.retried} attempts`)
  result.failures.forEach(f => console.error(f))
}
```

### Example 4: Analyze Dependencies

```javascript
const splitter = new TaskSplitter()

const tasks = [
  { id: 'setup', name: 'Setup', dependencies: [] },
  { id: 'migrate', name: 'Migrate', dependencies: ['setup'] },
  { id: 'seed-1', name: 'Seed Users', dependencies: ['migrate'] },
  { id: 'seed-2', name: 'Seed Products', dependencies: ['migrate'] },
  { id: 'validate', name: 'Validate', dependencies: ['seed-1', 'seed-2'] }
]

const analysis = splitter.analyzeDependencies(tasks)
console.log(`Independent: ${analysis.independent.length}`)
console.log(`Dependent: ${analysis.dependent.length}`)

// Execute independent tasks first
for (const task of analysis.independent) {
  await executor(task)
}
```

## Performance Characteristics

### Time Complexity
- Task analysis: O(description length + number of subtasks)
- Auto-split: O(n) where n = number of subtasks
- Parallel execution: O(n/concurrency) wall-clock time for n tasks

### Memory Usage
- Dependency graph: O(n) where n = number of tasks
- Execution results: O(n * result size)

### Concurrency Model
- Default concurrency: 4 tasks
- Adjustable via constructor options
- Honors task dependencies when analyzing

## Error Handling

TaskSplitter includes automatic error recovery:

1. **Task Timeout**: Tasks exceeding `timeoutMs` are rejected
2. **Execution Failure**: Failed tasks are logged; execution continues
3. **Max Retries**: After `maxRetries` attempts, task is marked failed
4. **Partial Failure**: Parallel execution doesn't block on individual failures

Access failures via:
```javascript
const result = await splitter.executeParallel(tasks, executor)
result.failures.forEach(f => {
  console.error(`Task ${f.task} failed: ${f.error.message}`)
})
```

## Integration with Workflow Systems

TaskSplitter integrates with workflow orchestrators:

```javascript
// In workflow executor
const splitter = new TaskSplitter({ 
  concurrency: workflow.parallelism,
  timeoutMs: workflow.taskTimeout 
})

// Get insights before execution
const split = splitter.autoSplit(workflowTask)
const analysis = splitter.analyzeDependencies(workflowTask.subtasks)

// Execute with built-in parallelization
const result = await splitter.executeParallel(
  split.subtasks,
  (task) => workflow.executeTask(task)
)

// Track results
workflow.recordResult(result)
```

## Files

- `lib/task-splitter.js` — Main implementation
- `lib/task-splitter.example.js` — Usage examples
- `lib/TASK_SPLITTER.md` — This documentation
