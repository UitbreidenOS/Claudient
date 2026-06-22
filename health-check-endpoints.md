# SVG Inspector Health Check Endpoints

**Document Version:** 1.0  
**Last Updated:** 2026-06-22  
**Status:** Production-Ready

---

## Overview

This document defines the health check, monitoring, and performance verification endpoints for the SVG Inspector service. These endpoints provide real-time visibility into:

- **Service availability** — HTTP status, uptime, readiness
- **Rendering performance** — JSON→SVG conversion latency, throughput
- **Pan/zoom responsiveness** — Viewport transformation speed
- **Memory efficiency** — Heap usage, RSS footprint, allocation patterns
- **Error rates** — Validation failures, malformed requests

---

## Health Check Endpoints

### 1. Basic Health Status

**Endpoint:** `GET /health`

**Description:** Quick liveness probe. Returns immediately with service status.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-06-22T10:30:45.123Z",
  "uptime": 3600,
  "version": "1.0.0",
  "service": "svg-inspector"
}
```

**Response (503 Service Unavailable):**
```json
{
  "status": "unhealthy",
  "timestamp": "2026-06-22T10:30:45.123Z",
  "reason": "Memory threshold exceeded",
  "uptime": 1200
}
```

**SLO:** < 5ms response time (p99)

**Monitoring:** Prometheus, CloudWatch, Datadog can scrape this every 10 seconds.

---

### 2. Ready Probe

**Endpoint:** `GET /ready`

**Description:** Readiness probe. Confirms service is ready to accept render requests.

**Response (200 OK):**
```json
{
  "ready": true,
  "dependencies": {
    "file_system": "ok",
    "memory": "ok",
    "svg_parser": "ok"
  },
  "queue_depth": 2,
  "max_queue_size": 100
}
```

**Response (503 Service Unavailable):**
```json
{
  "ready": false,
  "reason": "Queue full (100/100 jobs)",
  "queue_depth": 100,
  "estimated_wait_ms": 45000
}
```

**SLO:** < 10ms response time (p99)

---

### 3. Detailed Status

**Endpoint:** `GET /status`

**Description:** Comprehensive health status with performance metrics.

**Response (200 OK):**
```json
{
  "service": {
    "name": "svg-inspector",
    "version": "1.0.0",
    "uptime_seconds": 86400,
    "start_time": "2026-06-21T10:30:00.000Z"
  },
  "endpoints": {
    "/health": { "status": "ok", "latency_ms": 2.4 },
    "/api/meta": { "status": "ok", "latency_ms": 4.1 },
    "/map.svg": { "status": "ok", "latency_ms": 18.5 },
    "/api/data": { "status": "ok", "latency_ms": 3.2 }
  },
  "performance": {
    "render_time_1k_nodes_ms": 0.28,
    "render_time_10k_nodes_ms": 4.22,
    "render_time_100k_nodes_ms": 103.78,
    "pan_zoom_latency_us": 0.001,
    "click_detection_ms": 0.04
  },
  "memory": {
    "heap_used_mb": 45.2,
    "heap_total_mb": 256,
    "external_mb": 12.1,
    "rss_mb": 320.4,
    "gc_count": 42
  },
  "requests": {
    "total": 15234,
    "success": 15210,
    "errors": 24,
    "rate_per_sec": 12.3,
    "avg_latency_ms": 24.5,
    "p50_latency_ms": 18.2,
    "p95_latency_ms": 68.4,
    "p99_latency_ms": 124.2
  },
  "rendering_queue": {
    "pending_jobs": 3,
    "completed_jobs": 14825,
    "failed_jobs": 9,
    "avg_job_duration_ms": 35.6
  }
}
```

**SLO:** < 50ms response time (p99)

---

## Performance Verification Endpoints

### 4. Rendering Performance Benchmark

**Endpoint:** `GET /metrics/rendering?nodes=1000&runs=5`

**Query Parameters:**
- `nodes` (optional, default: 1000) — number of SVG elements (1K, 10K, 100K)
- `runs` (optional, default: 3) — number of benchmark runs
- `warm_up` (optional, default: true) — run warm-up iterations

**Response (200 OK):**
```json
{
  "benchmark": "rendering",
  "node_count": 10000,
  "runs": 5,
  "results": {
    "mean_ms": 4.22,
    "median_ms": 5.66,
    "min_ms": 2.18,
    "max_ms": 8.94,
    "stdev_ms": 2.41,
    "p50_ms": 5.66,
    "p95_ms": 8.21,
    "p99_ms": 8.94
  },
  "throughput": {
    "nodes_per_ms": 2369.2,
    "nodes_per_sec": 2369200
  },
  "slo": {
    "target_ms": 10.0,
    "actual_ms": 4.22,
    "status": "pass",
    "margin_ms": 5.78
  },
  "timestamp": "2026-06-22T10:30:45.123Z"
}
```

**SLOs:**
| Node Count | Target | P99 Target |
|-----------|--------|-----------|
| 1K | 1.0ms | 2.5ms |
| 10K | 10.0ms | 25.0ms |
| 100K | 150.0ms | 300.0ms |

---

### 5. Pan/Zoom Performance

**Endpoint:** `GET /metrics/pan-zoom?nodes=10000&operations=100`

**Query Parameters:**
- `nodes` (optional) — SVG size (1K, 10K, 100K)
- `operations` (optional) — number of pan/zoom ops to simulate

**Response (200 OK):**
```json
{
  "benchmark": "pan_zoom",
  "node_count": 10000,
  "operations": 100,
  "results": {
    "total_time_ms": 0.012,
    "mean_per_op_us": 0.12,
    "ops_per_second": 8333333,
    "p99_per_op_us": 0.18
  },
  "slo": {
    "target_us": 1.0,
    "actual_us": 0.12,
    "status": "pass",
    "margin_us": 0.88
  },
  "responsiveness": "real-time",
  "timestamp": "2026-06-22T10:30:45.123Z"
}
```

**SLO:** < 1.0 microsecond per operation (p99)

---

### 6. Memory Usage Metrics

**Endpoint:** `GET /metrics/memory?scale=100k`

**Query Parameters:**
- `scale` (optional) — 1k, 10k, or 100k nodes

**Response (200 OK):**
```json
{
  "benchmark": "memory",
  "node_scale": 100000,
  "timestamp": "2026-06-22T10:30:45.123Z",
  "memory": {
    "heap_used_mb": 127.15,
    "heap_total_mb": 256.0,
    "external_mb": 8.4,
    "rss_mb": 342.1,
    "resident_mb": 310.2
  },
  "data_structures": {
    "json_map_kb": 17863.89,
    "svg_markup_kb": 11503.60,
    "compression_ratio": 1.55,
    "parsing_overhead_kb": 1248.5
  },
  "gc": {
    "gc_count": 3,
    "gc_pause_ms": 12.4,
    "collection_timestamp": "2026-06-22T10:29:15.000Z"
  },
  "slo": {
    "heap_target_mb": 200.0,
    "actual_mb": 127.15,
    "status": "pass",
    "margin_mb": 72.85
  }
}
```

**SLOs:**
| Scale | Heap Target | RSS Target |
|-------|------------|-----------|
| 1K | 50 MB | 150 MB |
| 10K | 100 MB | 250 MB |
| 100K | 200 MB | 400 MB |

---

### 7. Click Detection Latency

**Endpoint:** `GET /metrics/click-detection?nodes=10000&clicks=100`

**Query Parameters:**
- `nodes` (optional) — SVG size
- `clicks` (optional) — number of simulated clicks

**Response (200 OK):**
```json
{
  "benchmark": "click_detection",
  "node_count": 10000,
  "click_count": 100,
  "results": {
    "total_time_ms": 0.413,
    "mean_per_click_ms": 0.00413,
    "p50_per_click_ms": 0.00405,
    "p95_per_click_ms": 0.00521,
    "p99_per_click_ms": 0.00634
  },
  "throughput": {
    "clicks_per_second": 242000,
    "clicks_per_ms": 242
  },
  "slo": {
    "target_ms": 0.01,
    "actual_ms": 0.00413,
    "status": "pass",
    "margin_ms": 0.00587
  },
  "timestamp": "2026-06-22T10:30:45.123Z"
}
```

**SLO:** < 0.01ms per click (p99) — < 10μs

---

## Error Rate Monitoring

### 8. Error Tracking Endpoint

**Endpoint:** `GET /metrics/errors?time_window=3600`

**Query Parameters:**
- `time_window` (optional, seconds) — default 3600 (1 hour)

**Response (200 OK):**
```json
{
  "error_metrics": {
    "time_window_seconds": 3600,
    "period": {
      "start": "2026-06-22T09:30:45.123Z",
      "end": "2026-06-22T10:30:45.123Z"
    },
    "total_errors": 24,
    "error_rate": 0.0016,
    "errors_per_minute": 0.4
  },
  "by_type": {
    "validation_errors": {
      "count": 8,
      "percentage": 33.3,
      "status_code": 400,
      "examples": [
        "Missing viewBox attribute",
        "Invalid element type"
      ]
    },
    "timeout_errors": {
      "count": 4,
      "percentage": 16.7,
      "status_code": 504,
      "avg_wait_ms": 30000
    },
    "server_errors": {
      "count": 3,
      "percentage": 12.5,
      "status_code": 500,
      "examples": [
        "Out of memory",
        "File system error"
      ]
    },
    "other_errors": {
      "count": 9,
      "percentage": 37.5
    }
  },
  "slo": {
    "target_error_rate": 0.005,
    "actual_error_rate": 0.0016,
    "status": "pass",
    "margin": 0.0034
  }
}
```

**SLO:** Error rate < 0.5% (p99)

---

## Availability SLOs

### 9. Uptime Verification

**Endpoint:** `GET /metrics/uptime?days=7`

**Query Parameters:**
- `days` (optional) — historical window (1, 7, 30)

**Response (200 OK):**
```json
{
  "uptime_metrics": {
    "period": "7d",
    "start": "2026-06-15T10:30:45.123Z",
    "end": "2026-06-22T10:30:45.123Z"
  },
  "availability": {
    "uptime_percentage": 99.87,
    "downtime_minutes": 18.3,
    "incidents": 2
  },
  "by_endpoint": {
    "/health": { "uptime": 100.0, "downtime_min": 0 },
    "/map.svg": { "uptime": 99.9, "downtime_min": 6.1 },
    "/api/meta": { "uptime": 99.75, "downtime_min": 3.6 },
    "/api/data": { "uptime": 99.8, "downtime_min": 8.6 }
  },
  "slo": {
    "target": 99.9,
    "actual": 99.87,
    "status": "at_risk",
    "margin": -0.03
  },
  "incidents": [
    {
      "start": "2026-06-19T14:22:00.000Z",
      "end": "2026-06-19T14:28:30.000Z",
      "duration_minutes": 6.5,
      "cause": "Memory spike during bulk rendering",
      "resolution": "Auto-restart triggered"
    },
    {
      "start": "2026-06-21T03:15:00.000Z",
      "end": "2026-06-21T03:21:54.000Z",
      "duration_minutes": 6.9,
      "cause": "Scheduled garbage collection pause",
      "resolution": "Completed normally"
    }
  ]
}
```

**Service-Level Agreements:**
| Metric | Target | Threshold |
|--------|--------|-----------|
| Uptime | 99.9% | < 43.2 min/month downtime |
| Latency (p99) | 100ms | max 100ms per request |
| Error Rate | < 0.5% | max 5 errors per 1000 requests |

---

## Availability Probe Configuration

### Kubernetes Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

### Kubernetes Readiness Probe

```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 2
```

### Docker Health Check

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```

---

## Monitoring Integration

### Prometheus Metrics Endpoint

**Endpoint:** `GET /metrics/prometheus`

**Response Format (Prometheus Text Format):**
```
# HELP svg_inspector_render_time_ms SVG rendering latency
# TYPE svg_inspector_render_time_ms histogram
svg_inspector_render_time_ms_bucket{nodes="1000",le="1"} 1245
svg_inspector_render_time_ms_bucket{nodes="1000",le="5"} 1248
svg_inspector_render_time_ms_bucket{nodes="10000",le="10"} 892
svg_inspector_render_time_ms_bucket{nodes="100000",le="100"} 45

# HELP svg_inspector_request_total Total HTTP requests
# TYPE svg_inspector_request_total counter
svg_inspector_request_total{endpoint="/api/meta",status="200"} 12453
svg_inspector_request_total{endpoint="/map.svg",status="200"} 2198
svg_inspector_request_total{endpoint="/api/meta",status="400"} 8

# HELP svg_inspector_memory_heap_mb Heap memory used
# TYPE svg_inspector_memory_heap_mb gauge
svg_inspector_memory_heap_mb 45.2

# HELP svg_inspector_pan_zoom_ops_per_sec Pan/zoom operations per second
# TYPE svg_inspector_pan_zoom_ops_per_sec gauge
svg_inspector_pan_zoom_ops_per_sec 8333333
```

---

## Testing the Endpoints

### cURL Examples

```bash
# Check basic health
curl http://localhost:8080/health

# Check readiness
curl http://localhost:8080/ready

# Full status report
curl http://localhost:8080/status

# Rendering performance (10K nodes, 5 runs)
curl http://localhost:8080/metrics/rendering?nodes=10000&runs=5

# Pan/zoom performance
curl http://localhost:8080/metrics/pan-zoom?nodes=10000&operations=100

# Memory metrics
curl http://localhost:8080/metrics/memory?scale=100k

# Click detection latency
curl http://localhost:8080/metrics/click-detection?nodes=10000&clicks=100

# Error rates (last hour)
curl http://localhost:8080/metrics/errors?time_window=3600

# Uptime last 7 days
curl http://localhost:8080/metrics/uptime?days=7

# Prometheus format
curl http://localhost:8080/metrics/prometheus
```

### Bash Health Check Script

```bash
#!/bin/bash
# health-check.sh — Verify SVG Inspector health

HOST=${1:-"localhost"}
PORT=${2:-"8080"}
BASE_URL="http://$HOST:$PORT"

echo "Checking SVG Inspector Health..."
echo "================================="

# Test basic health
HEALTH=$(curl -s "$BASE_URL/health")
HEALTH_STATUS=$(echo $HEALTH | jq -r '.status')
echo "[1/3] Health: $HEALTH_STATUS"

# Test readiness
READY=$(curl -s "$BASE_URL/ready")
READY_STATUS=$(echo $READY | jq -r '.ready')
echo "[2/3] Ready: $READY_STATUS"

# Test performance
PERF=$(curl -s "$BASE_URL/metrics/rendering?nodes=1000&runs=3")
RENDER_TIME=$(echo $PERF | jq -r '.results.mean_ms')
echo "[3/3] Render 1K nodes: ${RENDER_TIME}ms"

# Summary
if [[ "$HEALTH_STATUS" == "healthy" ]] && [[ "$READY_STATUS" == "true" ]]; then
  echo "================================="
  echo "✓ SVG Inspector is healthy"
  exit 0
else
  echo "================================="
  echo "✗ SVG Inspector is unhealthy"
  exit 1
fi
```

---

## Alerting Rules

### Alert Conditions

#### 1. Service Down
```yaml
- alert: SVGInspectorDown
  expr: up{job="svg-inspector"} == 0
  for: 2m
  annotations:
    summary: "SVG Inspector is down"
    severity: critical
```

#### 2. High Error Rate
```yaml
- alert: HighErrorRate
  expr: (svg_inspector_request_total{status=~"5.."} / svg_inspector_request_total) > 0.005
  for: 5m
  annotations:
    summary: "Error rate > 0.5%"
    severity: warning
```

#### 3. Slow Rendering
```yaml
- alert: SlowRendering
  expr: svg_inspector_render_time_ms{quantile="0.99"} > 150
  for: 10m
  annotations:
    summary: "Rendering p99 latency > 150ms"
    severity: warning
```

#### 4. High Memory Usage
```yaml
- alert: HighMemory
  expr: svg_inspector_memory_heap_mb > 200
  for: 5m
  annotations:
    summary: "Heap memory > 200MB"
    severity: warning
```

#### 5. Queue Backlog
```yaml
- alert: QueueFull
  expr: svg_inspector_queue_depth >= 80
  for: 2m
  annotations:
    summary: "Rendering queue at {{ $value }}%"
    severity: warning
```

---

## Implementation Checklist

- [ ] Implement GET /health endpoint (< 5ms SLO)
- [ ] Implement GET /ready endpoint (< 10ms SLO)
- [ ] Implement GET /status endpoint (< 50ms SLO)
- [ ] Implement GET /metrics/rendering (benchmark suite)
- [ ] Implement GET /metrics/pan-zoom (pan/zoom latency)
- [ ] Implement GET /metrics/memory (heap & RSS tracking)
- [ ] Implement GET /metrics/click-detection (click latency)
- [ ] Implement GET /metrics/errors (error rate tracking)
- [ ] Implement GET /metrics/uptime (SLA tracking)
- [ ] Implement GET /metrics/prometheus (Prometheus scrape)
- [ ] Add request logging & latency tracking
- [ ] Add error aggregation & classification
- [ ] Configure Kubernetes probes
- [ ] Add Docker health checks
- [ ] Set up monitoring dashboards
- [ ] Configure alerting rules
- [ ] Document SLOs in runbooks
- [ ] Add historical metrics storage

---

## Related Documentation

- **Benchmarks:** `/benchmarks/SVG_INSPECTOR_PERFORMANCE_REPORT.md`
- **MCP Configuration:** `/mcp/svg-map-inspector.md`
- **CLI Tool:** `/scripts/claudient-svg-inspector.js`
- **Testing Guide:** `/test/svg-map-inspector.test.js`

