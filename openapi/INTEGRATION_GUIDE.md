# Swarm Sandbox API Integration Guide

Quick reference for integrating with the Swarm Sandbox API.

## Quick Start

### 1. Create a Job

```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "agent_name": "query-agent",
    "input": {"query": "What is Claude?"},
    "timeout_ms": 30000
  }'
```

Response:
```json
{
  "job_id": "job-f7c3b2d1",
  "status": "queued",
  "created_at": "2026-06-22T14:30:00Z",
  "queue_position": 0
}
```

### 2. Poll Job Status

```bash
curl http://localhost:3001/api/jobs/job-f7c3b2d1 \
  -H "X-API-Key: your-api-key"
```

Response:
```json
{
  "job_id": "job-f7c3b2d1",
  "agent_name": "query-agent",
  "status": "completed",
  "created_at": "2026-06-22T14:30:00Z",
  "started_at": "2026-06-22T14:30:01Z",
  "completed_at": "2026-06-22T14:30:05Z",
  "progress": {
    "workers_total": 1,
    "workers_active": 0,
    "workers_completed": 1,
    "workers_failed": 0,
    "percent_complete": 100
  },
  "result": {
    "response": "Claude is an AI assistant made by Anthropic...",
    "confidence": 0.98
  },
  "resource_usage": {
    "cpu_percent": 12.5,
    "memory_mb": 256,
    "duration_ms": 4500,
    "worker_count": 1
  }
}
```

### 3. Register Webhook

```bash
curl -X POST http://localhost:3001/api/webhooks \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "url": "https://your-domain.com/webhooks/jobs",
    "events": ["completed", "failed"],
    "headers": {
      "Authorization": "Bearer your-token"
    }
  }'
```

Response:
```json
{
  "webhook_id": "wh-abc123",
  "url": "https://your-domain.com/webhooks/jobs",
  "events": ["completed", "failed"],
  "created_at": "2026-06-22T14:30:00Z",
  "delivery_count": 0,
  "failure_count": 0
}
```

### 4. Submit Job with Webhook

```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "agent_name": "query-agent",
    "input": {"query": "Latest AI trends"},
    "timeout_ms": 60000,
    "webhook_url": "https://your-domain.com/webhooks/jobs",
    "webhook_events": ["completed", "failed"]
  }'
```

When the job completes, your webhook receives:
```json
{
  "event_type": "job_completed",
  "job_id": "job-xyz789",
  "timestamp": "2026-06-22T14:35:00Z",
  "data": {
    "status": "completed",
    "result": {
      "response": "AI trends include..."
    },
    "resource_usage": {
      "cpu_percent": 18.2,
      "memory_mb": 384,
      "duration_ms": 8200
    }
  }
}
```

## Common Patterns

### Pattern 1: Async Job with Polling

```javascript
async function runJobWithPolling() {
  // Create job
  const createRes = await fetch('http://localhost:3001/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY
    },
    body: JSON.stringify({
      agent_name: 'processor',
      input: {data: [1, 2, 3]},
      timeout_ms: 30000
    })
  });

  const {job_id} = await createRes.json();

  // Poll until complete
  let status = 'queued';
  while (['queued', 'running', 'paused'].includes(status)) {
    await new Promise(r => setTimeout(r, 500)); // Wait 500ms
    
    const statusRes = await fetch(
      `http://localhost:3001/api/jobs/${job_id}`,
      {headers: {'X-API-Key': process.env.API_KEY}}
    );
    
    const job = await statusRes.json();
    status = job.status;
    console.log(`Job status: ${status} (${job.progress.percent_complete}%)`);
  }

  const finalRes = await fetch(
    `http://localhost:3001/api/jobs/${job_id}`,
    {headers: {'X-API-Key': process.env.API_KEY}}
  );
  
  const finalJob = await finalRes.json();
  
  if (finalJob.status === 'completed') {
    return finalJob.result;
  } else {
    throw new Error(`Job failed: ${finalJob.error.message}`);
  }
}
```

### Pattern 2: Async Job with Webhooks

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Start job
app.post('/api/process', async (req, res) => {
  const createRes = await fetch('http://localhost:3001/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY
    },
    body: JSON.stringify({
      agent_name: 'processor',
      input: req.body.input,
      timeout_ms: 60000,
      webhook_url: `${process.env.WEBHOOK_URL}/webhooks/job-complete`,
      webhook_events: ['completed', 'failed']
    })
  });

  const {job_id} = await createRes.json();
  
  // Immediately return job ID; results come via webhook
  res.json({job_id});
});

// Handle webhook callback
app.post('/webhooks/job-complete', async (req, res) => {
  const {event_type, job_id, data} = req.body;

  if (event_type === 'job_completed') {
    console.log(`Job ${job_id} completed:`, data.result);
    // Update database, send email, etc.
  } else if (event_type === 'job_failed') {
    console.error(`Job ${job_id} failed:`, data.error);
    // Handle error, notify user
  }

  res.sendStatus(200); // Acknowledge receipt
});

app.listen(3000);
```

### Pattern 3: Topology-Based Pipeline

```bash
# 1. Load pipeline topology
curl -X POST http://localhost:3001/api/topologies \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "topology_type": "sequential",
    "topology_name": "etl-pipeline",
    "agents": [
      {"name": "extractor", "template": "data-extractor", "count": 2},
      {"name": "transformer", "template": "data-transformer", "count": 3},
      {"name": "loader", "template": "data-loader", "count": 1}
    ],
    "flow": [
      {"from": "extractor", "to": "transformer", "on": "success"},
      {"from": "transformer", "to": "loader", "on": "success"}
    ]
  }'

# 2. Submit job to topology
curl -X POST http://localhost:3001/api/jobs \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "topology_name": "etl-pipeline",
    "input": {"source": "database", "target": "warehouse"},
    "timeout_ms": 300000,
    "priority": "high"
  }'
```

### Pattern 4: Fan-Out/Fan-In Research Swarm

```bash
# Load research swarm topology
curl -X POST http://localhost:3001/api/topologies \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "topology_type": "fanout-fanin",
    "topology_name": "research-swarm",
    "coordinator": "research-coordinator",
    "agents": [
      {"name": "web-search", "template": "search-agent", "count": 3},
      {"name": "doc-analyzer", "template": "analyzer", "count": 2},
      {"name": "summarizer", "template": "summary-agent", "count": 2}
    ]
  }'

# Submit research job
curl -X POST http://localhost:3001/api/jobs \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "topology_name": "research-swarm",
    "input": {"topic": "Claude API improvements 2026"},
    "timeout_ms": 120000,
    "labels": {"env": "prod", "project": "research"}
  }'
```

### Pattern 5: Error Handling and Retries

```python
import requests
import time

def run_job_with_retry(agent_name, input_data, max_retries=3):
    for attempt in range(max_retries):
        try:
            # Create job
            create_res = requests.post(
                'http://localhost:3001/api/jobs',
                headers={'X-API-Key': os.environ['API_KEY']},
                json={
                    'agent_name': agent_name,
                    'input': input_data,
                    'timeout_ms': 30000,
                    'max_retries': 1  # Server-side retry
                }
            )
            create_res.raise_for_status()
            job_id = create_res.json()['job_id']

            # Poll for completion
            while True:
                status_res = requests.get(
                    f'http://localhost:3001/api/jobs/{job_id}',
                    headers={'X-API-Key': os.environ['API_KEY']}
                )
                status_res.raise_for_status()
                
                job = status_res.json()
                if job['status'] == 'completed':
                    return job['result']
                elif job['status'] == 'failed':
                    error = job['error']
                    if error['code'] in ['TIMEOUT', 'NETWORK_ERROR']:
                        # Retryable error
                        break
                    else:
                        # Non-retryable error
                        raise Exception(f"Job failed: {error['message']}")
                
                time.sleep(0.5)
        
        except requests.RequestException as e:
            print(f"Attempt {attempt+1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise

    raise Exception(f"Job failed after {max_retries} attempts")
```

## Monitoring

### Get Sandbox Status

```bash
curl http://localhost:3001/api/status \
  -H "X-API-Key: your-api-key"
```

Response:
```json
{
  "health": "healthy",
  "uptime_ms": 3600000,
  "jobs": {
    "total": 250,
    "queued": 5,
    "running": 12,
    "completed": 220,
    "failed": 13
  },
  "workers": {
    "total": 47,
    "active": 12
  },
  "queue": {
    "depth": 5,
    "max_capacity": 1000
  },
  "resources": {
    "cpu_percent": 42.3,
    "memory_mb": 2048,
    "memory_limit_mb": 8192,
    "disk_usage_mb": 512
  }
}
```

### List Recent Jobs

```bash
curl "http://localhost:3001/api/status/jobs?status=failed&limit=10" \
  -H "X-API-Key: your-api-key"
```

### Stream Job Logs

```bash
curl "http://localhost:3001/api/jobs/job-abc123/logs" \
  -H "X-API-Key: your-api-key" | jq '.'
```

Output (JSONL):
```json
{"timestamp":"2026-06-22T14:30:01Z","worker_id":"w1","level":"info","message":"Starting job processing"}
{"timestamp":"2026-06-22T14:30:02Z","worker_id":"w1","level":"info","message":"Processing input","context":{"items":3}}
{"timestamp":"2026-06-22T14:30:05Z","worker_id":"w1","level":"info","message":"Job completed"}
```

### Subscribe to Job Events (SSE)

```javascript
const eventSource = new EventSource(
  'http://localhost:3001/api/jobs/job-abc123/events',
  {headers: {'X-API-Key': 'your-api-key'}}
);

eventSource.on('job_queued', (e) => {
  console.log('Job queued:', e.data);
});

eventSource.on('job_started', (e) => {
  console.log('Job started:', e.data);
});

eventSource.on('progress_update', (e) => {
  const {workers_total, workers_completed, percent_complete} = JSON.parse(e.data);
  console.log(`Progress: ${percent_complete}% (${workers_completed}/${workers_total})`);
});

eventSource.on('job_completed', (e) => {
  console.log('Job completed:', JSON.parse(e.data));
  eventSource.close();
});

eventSource.on('job_failed', (e) => {
  console.error('Job failed:', JSON.parse(e.data));
  eventSource.close();
});
```

## Best Practices

1. **Use idempotency keys** for critical operations:
   ```json
   {"agent_name": "payment", "input": {...}, "idempotency_key": "txn-12345"}
   ```

2. **Set appropriate timeouts** based on expected duration:
   - Simple agent call: 10–30 seconds
   - Pipeline (3+ agents): 60–120 seconds
   - Large swarms (10+ workers): 120–300 seconds

3. **Use webhooks** for long-running jobs instead of polling:
   - Polling: Create new HTTP connection every N seconds
   - Webhooks: Single connection; callback when done

4. **Add labels** for tracking and filtering:
   ```json
   {"labels": {"env": "prod", "customer": "acme", "flow": "billing"}}
   ```

5. **Monitor sandbox health** regularly:
   - Check queue depth (alert if > 500)
   - Watch resource usage (alert if CPU > 80%)
   - Track error rates by code (alert if > 5%)

6. **Implement graceful degradation**:
   - Increase timeout if queue is deep
   - Fall back to lower-priority jobs if queue full
   - Cache results to avoid re-running jobs

7. **Use job control for long operations**:
   - Pause jobs during maintenance windows
   - Resume when ready
   - Stop jobs that are stuck/outdated

## Error Codes

| Code | Meaning | Retry? |
|------|---------|--------|
| TIMEOUT | Job exceeded time limit | Yes (with longer timeout) |
| RESOURCE_LIMIT | CPU/memory/disk limit | Yes (smaller input) |
| AGENT_CRASHED | Worker crashed | Yes |
| NETWORK_ERROR | Network connectivity issue | Yes |
| VALIDATION_ERROR | Invalid input/config | No |
| SANDBOX_ERROR | Internal sandbox error | Yes (with backoff) |

## Rate Limiting

- Default: 1000 requests/minute per API key
- Job creation: 100 jobs/minute per API key
- Webhook deliveries: 10,000/minute per endpoint

Headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1687437600
```

When rate limited, wait before retrying:
```python
import time

retry_after = int(response.headers.get('X-RateLimit-Reset', 60))
time.sleep(retry_after)
```
