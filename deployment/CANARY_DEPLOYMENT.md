# Canary Deployment Workflow

Incremental rollout strategy: deploy to 10% of users, monitor health metrics for 15 minutes, auto-promote to full production if stable, or auto-rollback if issues detected.

---

## When to use this workflow

Use canary deployments for:
- Backend service updates affecting production traffic
- Database schema changes (backward-compatible only)
- Critical infrastructure changes with rollback requirements
- Changes where blast radius must be limited (payment processing, auth, APIs)
- Deployments where monitoring confidence is high and auto-promotion is safe

**Do NOT use canary for:**
- UI-only changes (use feature flags or blue-green instead)
- One-off hotfixes (use direct promotion or manual rollout)
- When you lack monitoring infrastructure for health decisions
- Breaking changes requiring coordinated deployments

---

## Phase 1: Pre-deployment validation (10 minutes)

### 1.1 Readiness checklist

```
❏ All tests pass locally and in CI/CD
❏ Deployment targets staging environment first (verify full flow)
❏ Health check endpoints are functional and monitored
❏ Rollback procedure is documented and tested
❏ Team is aware of deployment window and on standby
❏ Monitoring dashboards are open and ready
```

### 1.2 Establish baseline metrics

Before canary starts, record healthy baseline values for:
- Request latency (p50, p95, p99)
- Error rate (4xx, 5xx, timeouts)
- Database query duration (if applicable)
- Service-specific metrics (payment success rate, auth latency, etc.)
- Infrastructure metrics (CPU, memory, disk)

**Record baseline:**
```bash
# Example: capture baseline metrics 5 minutes before deployment
./scripts/metrics/baseline.sh > /tmp/baseline-$(date +%s).json
```

### 1.3 Define promotion criteria

Establish explicit thresholds for auto-promotion:

```
Metric                 | Baseline | Threshold | Action
Error rate 5xx         | < 0.1%   | < 0.3%    | If exceeded: ROLLBACK
Request latency p95    | 200ms    | < 300ms   | If exceeded: ROLLBACK
Payment success rate   | 99.8%    | > 99.5%   | If below: ROLLBACK
Database connections   | 45/50    | < 48/50   | If exceeded: ROLLBACK
```

### 1.4 Verify canary infrastructure

```bash
# Verify load balancer supports traffic splitting
kubectl get ingress -n production -o yaml | grep -i weight

# Verify monitoring scrape targets include canary replicas
kubectl get pods -n production --selector=version=canary

# Test canary health endpoint in staging
curl -X GET https://staging.example.com/health
```

---

## Phase 2: Deploy to canary (5% → 10% of traffic)

### 2.1 Deploy canary replica set

```bash
# Deploy new version to canary environment
# Kubernetes example:
kubectl set image deployment/api api=myregistry/api:v1.2.0 \
  --selector=version=canary \
  --namespace=production

# Verify deployment
kubectl rollout status deployment/api -n production --selector=version=canary
```

### 2.2 Route 10% traffic to canary

Use load balancer to split traffic:

```yaml
# Istio VirtualService example
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api
spec:
  hosts:
  - api.example.com
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        host: api
        subset: stable
      weight: 90
    - destination:
        host: api
        subset: canary
      weight: 10
    timeout: 10s
```

### 2.3 Verify traffic flow

```bash
# Confirm canary is receiving traffic
kubectl logs -n production deployment/api --selector=version=canary -f

# Check canary metrics appear in monitoring system
curl https://monitoring.example.com/api/query?query=canary_requests_total
```

---

## Phase 3: Monitor canary (15 minutes)

### 3.1 Active monitoring dashboard

Open and watch during the entire 15-minute window:

1. **Request health:**
   - Request rate (expected: ~10% of stable traffic)
   - Error rate 4xx (should match stable baseline)
   - Error rate 5xx (should be < threshold)
   - HTTP status distribution

2. **Performance:**
   - Request latency p50/p95/p99
   - Database query latency
   - Cache hit rate (if applicable)

3. **Business metrics (if monitored):**
   - Payment success rate
   - Authentication success rate
   - Feature-specific metrics

4. **Infrastructure:**
   - CPU usage per canary pod
   - Memory usage trend
   - Disk I/O if relevant
   - Database connection pool usage

### 3.2 Comparison logic (automated or manual)

**Automated comparison (preferred):**

```python
# Example: compare canary vs stable metrics
import requests

def compare_metrics(canary_metrics, stable_baseline, thresholds):
    issues = []
    
    for metric_name, value in canary_metrics.items():
        if metric_name == "error_rate_5xx":
            if value > thresholds["error_rate_5xx"]:
                issues.append(f"5xx error rate {value}% exceeds {thresholds['error_rate_5xx']}%")
        
        elif metric_name == "latency_p95":
            if value > thresholds["latency_p95"]:
                issues.append(f"p95 latency {value}ms exceeds {thresholds['latency_p95']}ms")
        
        elif metric_name == "payment_success_rate":
            if value < thresholds["payment_success_min"]:
                issues.append(f"Payment success {value}% below minimum {thresholds['payment_success_min']}%")
    
    return issues  # Empty list = healthy

def decide_promotion(issues):
    if not issues:
        return "PROMOTE"  # All metrics healthy
    else:
        return "ROLLBACK"  # Issues detected
```

**Manual monitoring checklist (if automated not available):**

- Every 3 minutes: eyeball error rates and latency
- At 7.5 minutes: compare canary against stable side-by-side
- At 15 minutes: make final promotion/rollback decision

### 3.3 Early warning signs (rollback triggers)

Stop waiting 15 minutes and rollback immediately if:

```
❌ 5xx error rate jumps > 0.5% (vs baseline < 0.1%)
❌ Request latency p95 > 2x baseline (e.g., 200ms → 400ms+)
❌ Database queries taking > 5s (vs baseline < 500ms)
❌ Connection pool exhausted (all connections in use)
❌ Canary pods OOMKilled or crashing repeatedly
❌ Payment processing failures spike
❌ Authentication/session issues reported
❌ Customer-facing errors in logs or alerts
```

---

## Phase 4: Auto-promote or rollback (at 15 minutes)

### 4.1 Promotion decision logic

After 15 minutes, evaluate metrics:

```
IF all metrics within thresholds:
  → PROMOTE to 100% (proceed to 4.2)
  
ELSE IF metrics degraded but not critical:
  → EXTEND MONITORING (5 more minutes)
  → If still unhealthy after 20min total: ROLLBACK
  
ELSE (critical issues detected):
  → ROLLBACK immediately (proceed to 4.3)
```

### 4.2 Auto-promote to 100% (if healthy)

```bash
# Gradually increase traffic to canary from 10% → 100%

# Option A: Istio VirtualService gradual shift
kubectl patch vs api --type merge \
  -p '{
    "spec": {
      "http": [{
        "route": [
          {"destination": {"host": "api", "subset": "stable"}, "weight": 0},
          {"destination": {"host": "api", "subset": "canary"}, "weight": 100}
        ]
      }]
    }
  }'

# Option B: Kubernetes rolling update (if no traffic management)
kubectl set image deployment/api api=myregistry/api:v1.2.0 \
  --namespace=production \
  --record

# Option C: Blue-green flip (if infrastructure supports)
kubectl patch service api -p '{"spec":{"selector":{"version":"canary"}}}'
```

### 4.3 Immediate rollback (if issues detected)

```bash
# Revert load balancer: shift 100% traffic back to stable
kubectl patch vs api --type merge \
  -p '{
    "spec": {
      "http": [{
        "route": [
          {"destination": {"host": "api", "subset": "stable"}, "weight": 100},
          {"destination": {"host": "api", "subset": "canary"}, "weight": 0}
        ]
      }]
    }
  }'

# Delete canary deployment
kubectl delete deployment api --selector=version=canary -n production

# Verify stable traffic restored
kubectl logs -n production deployment/api --selector=version=stable -f
```

**Notify stakeholders immediately:**
```bash
# Post incident/rollback notification
./scripts/notify.sh --channel=#incidents \
  "Deployment v1.2.0 rolled back at 15min mark. Issues: [list]. Investigating."
```

---

## Phase 5: Post-deployment validation

### 5.1 If promoted

```bash
# Confirm 100% of traffic on new version
kubectl get pods -n production --selector=app=api -o wide

# Verify no errors in application logs
kubectl logs -n production deployment/api --since=15m | grep -i error | head -20

# Run smoke tests against production
./scripts/tests/smoke.sh --env=production
```

### 5.2 If rolled back

```bash
# Document root cause
# Example: create incident ticket
./scripts/create-incident.sh \
  --title="Canary rollback: v1.2.0 latency regression" \
  --severity=high \
  --assignee=oncall

# Run post-mortem analysis
# - Why was latency issue not caught in staging?
# - What metric would have caught this earlier?
# - Should threshold be lowered?
```

### 5.3 Cleanup

```bash
# Remove canary infrastructure (if not auto-deleted)
kubectl delete vs/api --selector=version=canary -n production

# Archive canary metrics for analysis
./scripts/metrics/export.sh --start=-20m --format=json > /tmp/canary-run-20240601.json
```

---

## Example: Complete canary deployment

```bash
#!/bin/bash
set -e

# Step 1: Baseline metrics (Phase 1.2)
echo "Recording baseline metrics..."
BASELINE=$(curl -s https://metrics.example.com/api/query?query=api_requests_total)
echo "Baseline 5xx rate: $(echo $BASELINE | jq '.data | .[0]' 2>/dev/null || echo 'N/A')"

# Step 2: Deploy canary (Phase 2)
echo "Deploying v1.2.0 to canary (10% traffic)..."
kubectl set image deployment/api api=myregistry/api:v1.2.0 --selector=version=canary -n production
sleep 30  # Wait for rollout

# Step 3: Monitor for 15 minutes (Phase 3)
echo "Monitoring canary for 15 minutes..."
for i in {1..15}; do
  echo "Minute $i: Checking metrics..."
  
  CANARY_ERRORS=$(curl -s "https://metrics.example.com/api/query?query=canary_5xx_rate" | jq '.data | .[0].value')
  CANARY_LATENCY=$(curl -s "https://metrics.example.com/api/query?query=canary_latency_p95" | jq '.data | .[0].value')
  
  echo "  5xx rate: $CANARY_ERRORS%, p95 latency: ${CANARY_LATENCY}ms"
  
  # Check early warning signs
  if (( $(echo "$CANARY_ERRORS > 0.5" | bc -l) )); then
    echo "ERROR RATE TOO HIGH - ROLLING BACK"
    kubectl patch vs api -p '{"spec":{"http":[{"route":[{"destination":{"host":"api","subset":"stable"},"weight":100},{"destination":{"host":"api","subset":"canary"},"weight":0}]}]}}'
    exit 1
  fi
  
  sleep 60
done

# Step 4: Promote if healthy (Phase 4)
echo "15 minutes complete - promoting to 100%..."
kubectl patch vs api -p '{"spec":{"http":[{"route":[{"destination":{"host":"api","subset":"canary"},"weight":100}]}]}}'

# Step 5: Verify promotion (Phase 5)
echo "Verifying promotion..."
kubectl rollout status deployment/api -n production
./scripts/tests/smoke.sh --env=production

echo "✓ Deployment v1.2.0 complete"
```

---

## Rollback procedure (quick reference)

If canary shows problems at any point:

```bash
# 1. Immediately revert traffic to stable
kubectl patch vs api -p '{"spec":{"http":[{"route":[{"destination":{"host":"api","subset":"stable"},"weight":100},{"destination":{"host":"api","subset":"canary"},"weight":0}]}]}}'

# 2. Delete canary pods
kubectl delete pods -n production --selector=version=canary

# 3. Verify stable is healthy
kubectl logs -n production deployment/api --selector=version=stable --tail=50

# 4. Document and investigate
# - What metric triggered the rollback?
# - Was it a load-dependent issue or always-broken?
# - What should have caught this before production?
```

---

## Troubleshooting

| Symptom | Diagnosis | Fix |
|---------|-----------|-----|
| Canary metrics don't appear | Scrape config missing canary labels | Add `--selector=version=canary` to scrape targets |
| Traffic not split 90/10 | Load balancer routing rule wrong | Verify VirtualService or Ingress controller weights |
| Canary pod stuck in CrashLoopBackOff | Application startup failure | Check pod logs: `kubectl logs -n production <pod>` |
| Metrics show healthy but requests failing | Metric delay or incorrect thresholds | Check actual error logs, not just aggregated metrics |
| Rollback doesn't stop traffic to canary | Load balancer not respecting updates | Force full deployment rollout: `kubectl rollout undo deployment/api` |

---

## Related workflows

- [Blue-Green Deployment](BLUE_GREEN_DEPLOYMENT.md) — for zero-downtime full swaps
- [Feature Flags](../workflows/feature-flags.md) — for gradual UI rollouts
- [Incident Response](../workflows/incident-response.md) — when deployment causes production incident

---
