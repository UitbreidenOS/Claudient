# Platform Engineering

## Wanneer activeren
Bouwen van internal developer platforms (IDPs), creëren van golden path service templates die organizational standards encoderen, instellen van Backstage service catalog of scaffolder templates, ontwerpen van self-service infrastructure provisioning, bouwen van Kubernetes abstractions om developer cognitive load te reduceren, of verbeteren van DORA metrics door standaardiseren hoe teams software shippene.

## Wanneer NIET gebruiken
One-off infrastructure werk voor één team. Algemene Kubernetes cluster administration. Feature werk in product service. Build platform voordat pain points zijn.

## Instructies

### The Golden Path Principle

Golden path is opinionated, fully integrated service template die pre-wires alles een team nodig om van "new service" naar "running in production" te gaan zonder architectural decisions te maken.

Complete golden path include:
- `Dockerfile` — multi-stage, non-root user, health check
- Kubernetes manifests — `Deployment`, `Service`, `HPA`, `PDB`
- GitHub Actions CI workflow — lint, test, build, push, deploy
- Observability — Prometheus metrics, structured logs, Grafana dashboard
- Backstage catalog entry — `catalog-info.yaml` pre-populated
- Service secrets wiring — external-secrets operator
- README scaffold — architecture decision record template

### Backstage Catalog Entry

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payment-service
  title: Payment Service
  description: Handles checkout, refunds, and subscription billing
  annotations:
    github.com/project-slug: acme/payment-service
    prometheus.io/scrape: "true"
  tags:
    - python
    - fastapi
    - payments
spec:
  type: service
  lifecycle: production
  owner: team-payments
  system: checkout
  dependsOn:
    - component:order-service
    - resource:payments-postgres
```

### Kubernetes CRD Abstraction

Expose high-level `WebService` CRD die lower-level resources genereren:

```yaml
apiVersion: platform.acme.io/v1
kind: WebService
metadata:
  name: payment-service
spec:
  image: acme/payment-service:v1.4.0
  port: 8080
  replicas:
    min: 2
    max: 10
    targetCPU: 70
  resources:
    cpu: "500m"
    memory: "512Mi"
```

Platform operator generaatDeploy: `Deployment` + `Service` + `HPA` + `PDB` + `ServiceMonitor` + `NetworkPolicy`.

### Platform Contract

Document wat platform garanteert vs wat teams own:

| Platform Guarantees | Team Owns |
|---|---|
| Base image patching | Business logic |
| Cluster uptime SLA | Data schema migrations |
| Log aggregation | Application error handling |
| Secret rotation | API contracts |
| HPA + autoscaling | Service-level SLOs |

### DORA Metrics as Platform Health KPIs

Platform investment moet DORA metrics bewegen:
- Deployment Frequency
- Lead Time for Changes
- Change Failure Rate
- Mean Time to Restore

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
