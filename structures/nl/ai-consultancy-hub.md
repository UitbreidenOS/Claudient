# AI Consultancy Hub

Een uitgebreide Claude Code werkruimtestructuur voor een AI Architect die een globale AI-consultancy beheert met multi-region deployments, complexe proposal workflows en enterprise client management.

---

## Werkruimte Overzicht

Deze structuur ondersteunt:
- Multi-client projectleverantie met SLA-tracking
- Proposal generering en deal management via Notion CRM
- Infrastructure-as-code provisioning (AWS/GCP multi-region)
- Knowledge base voor solution reuse en lessons learned
- Thought leadership content generering en webinar operations
- Compliance monitoring (SOC 2, GDPR, ISO 27001)

---

## Directory Structuur

```
ai-consultancy-hub/
├── client-delivery/
│   ├── proposal-generation.md
│   ├── deployment-orchestration.md
│   ├── client-onboarding.md
│   ├── sla-monitoring.md
│   └── config/
│       ├── sla-matrix.json
│       └── client-taxonomy.json
│
├── deployment-infrastructure/
│   ├── terraform-provisioning.md
│   ├── cicd-orchestration.md
│   ├── observability-stack.md
│   ├── compliance-automation.md
│   └── config/
│       ├── terraform/
│       │   ├── aws-multi-region.tf
│       │   ├── gcp-multi-region.tf
│       │   └── modules/
│       │       ├── vpc.tf
│       │       ├── k8s-cluster.tf
│       │       ├── rds-postgres.tf
│       │       └── redis-cache.tf
│       └── secrets-rotation.json
│
├── proposal-engine/
│   ├── scope-analysis.md
│   ├── cost-calculation.md
│   ├── deal-tracking-notion.md
│   └── config/
│       ├── pricing-matrix.json
│       ├── service-catalog.json
│       └── stripe-integration.json
│
├── knowledge-management/
│   ├── client-context-persistence.md
│   ├── solution-library.md
│   ├── tech-debt-ledger.md
│   ├── retrospectives.md
│   └── kb/
│       ├── reference-architectures/
│       ├── case-studies/
│       ├── lessons-learned/
│       └── solution-templates/
│
├── content-and-growth/
│   ├── thought-leadership.md
│   ├── webinar-operations.md
│   ├── referral-engine.md
│   └── config/
│       ├── content-calendar.json
│       └── speaker-schedule.json
│
├── integrations/
│   ├── notion-crm.json
│   ├── slack-webhooks.json
│   ├── stripe-api.json
│   └── github-sync.json
│
└── README.md
```

---

## Skill Definities

### Client Delivery (4 skills)

#### 1. Proposal Generation
**Trigger**: Bij het starten van een nieuwe client engagement of response op RFP
**Output**: Notion document met scope, architecture diagram, timeline en cost breakdown
- Parse client requirements uit email/Slack
- Genereer SOW met milestones
- Creëer resource allocation plan
- Schat delivery timeline in
- Bereken kosten met behulp van pricing matrix
- Exporteer naar Notion CRM voor deal tracking
- Genereer PDF voor client review

**Config**: `config/sla-matrix.json`, `config/client-taxonomy.json`

#### 2. Deployment Orchestration
**Trigger**: Client approval van proposal en go-live datum
**Output**: Volledig provisioned multi-region infrastructure met monitoring dashboards
- Selecteer cloud provider (AWS/GCP) en regio's op basis van client geografie
- Voer Terraform provisioning uit via CI/CD pipeline
- Configureer DNS failover en load balancing
- Stel observability in (DataDog/New Relic)
- Creëer runbooks en incident escalation procedures
- Notificeer Slack #deployments kanaal met access details

**Config**: `deployment-infrastructure/config/terraform/`

#### 3. Client Onboarding
**Trigger**: Na infrastructure deployment
**Output**: Knowledge base wiki, access credentials, training schedule
- Creëer client documentation site (Docusaurus/Sphinx)
- Schedule onboarding calls en training
- Deel architecture diagrams en runbooks
- Provision API keys en webhook endpoints
- Stel monitoring dashboards in voor client teams
- Creëer Slack bridge voor 24/7 support escalation

**Config**: `integrations/slack-webhooks.json`

#### 4. SLA Monitoring
**Trigger**: Continu gedurende client engagement
**Output**: Wekelijkse SLA compliance report; alerts op breaches
- Track uptime metrics over regio's
- Monitor API latency en error rates
- Bereken maandelijkse availability percentage
- Genereer SLA dashboard in Grafana
- Alert op threshold breaches (Slack, PagerDuty)
- Prepare maandelijkse compliance reports
- Reconcilieer credits/penalties via Stripe

**Config**: `config/sla-matrix.json`

---

### Deployment Infrastructure (4 skills)

#### 1. Terraform Provisioning
**Trigger**: Voor client go-live of infrastructure update
**Output**: Deployed VPCs, Kubernetes clusters, databases over meerdere regio's
- Parse requirements uit Notion proposal
- Selecteer geschikte AWS/GCP regio's voor latency/compliance
- Provision VPCs, subnets, NAT gateways
- Deploy managed Kubernetes (EKS/GKE)
- Configureer RDS multi-AZ of Cloud SQL
- Stel Redis in voor caching
- Enable encryption at rest en in transit
- Plan en apply Terraform met approval gates

**Config**: `deployment-infrastructure/config/terraform/aws-multi-region.tf`, `gcp-multi-region.tf`

#### 2. CI/CD Orchestration
**Trigger**: Code push naar GitHub; client deployment request
**Output**: Automated build, test en deployment pipeline
- Definieer GitHub Actions / GitLab CI workflows
- Build Docker images en push naar ECR/GCR
- Voer security scans uit (SAST, DAST, container scanning)
- Voer automated tests uit (unit, integration, load)
- Deploy naar staging environment voor QA
- Vereisen approval voor production deployment
- Voer canary/blue-green deployments uit
- Rollback op health check failures

**Config**: `.github/workflows/` of `.gitlab-ci.yml`

#### 3. Observability Stack
**Trigger**: Na infrastructure deployment; ongoing monitoring
**Output**: Geïntegreerde monitoring, logging, tracing en alerting
- Deploy Prometheus + Grafana voor metrics
- Stel centralized logging in (ELK stack, Cloud Logging)
- Configureer distributed tracing (Jaeger, DataDog)
- Creëer dashboards voor client visibility
- Definieer alerting rules (high error rates, latency spikes)
- Stel on-call rotation en escalation policies in
- Genereer SLO reports en trends

**Config**: Prometheus scrape configs, Grafana dashboards JSON

#### 4. Compliance Automation
**Trigger**: Quarterly of op nieuwe feature release
**Output**: Compliance scan results, audit trail, remediation tasks
- Scan infrastructure voor security misconfigurations (Prowler, Cloud Asset Inventory)
- Verifieer encryption status (TLS, at-rest encryption)
- Check IAM policies voor least-privilege violations
- Valideer GDPR data residency requirements
- Genereer SOC 2 audit logs en attestation
- Track compliance debt in Notion
- Schedule remediation tasks met owners

**Config**: `config/secrets-rotation.json`

---

### Proposal Engine (3 skills)

#### 1. Scope Analysis
**Trigger**: Nieuwe client inquiry of RFP ontvangen
**Output**: Structured scope document met acceptance criteria en deliverables
- Extract requirements uit client brief of RFP
- Identificeer technical constraints en risks
- Map requirements naar service offerings
- Definieer success metrics en acceptance criteria
- Flag scope creep risks
- Schat effort in story points
- Creëer dependency matrix met andere services

**Config**: `config/service-catalog.json`

#### 2. Cost Calculation
**Trigger**: Na scope analysis is goedgekeurd
**Output**: Detailed cost breakdown, pricing options, ROI analysis
- Schat compute, storage en data transfer kosten in
- Look up pricing van AWS/GCP pricing API
- Bereken team effort (engineering, architecture, ops)
- Pas margin en contingency toe
- Genereer cost comparison table (cloud vs on-prem)
- Bied flexible pricing options (monthly, annual, usage-based)
- Bereken payback period voor client
- Exporteer naar Stripe voor invoicing setup

**Config**: `config/pricing-matrix.json`, `integrations/stripe-api.json`

#### 3. Deal Tracking (Notion CRM)
**Trigger**: Na proposal verzonden; ongoing deal management
**Output**: Notion database entries gesynchroniseerd over sales, delivery en finance teams
- Creëer Notion database record met alle proposal details
- Voeg client contact info, budget en decision date toe
- Link naar relevante reference architectures en case studies
- Track deal stages (Discovery → Proposal → Negotiation → Signed)
- Bereken win probability en revenue pipeline
- Trigger alerts voor at-risk deals
- Sync met Stripe voor invoice generation op signature
- Archive closed deals voor retrospective analysis

**Config**: `integrations/notion-crm.json`

---

### Knowledge Management (4 skills)

#### 1. Client Context Persistence
**Trigger**: Gedurende ongoing engagement; voor support tickets
**Output**: Searchable knowledge base met client-specifieke informatie
- Documenteer client's business context en goals
- Onderhoud architecture diagrams (Miro, Figma)
- Sla API documentation en integration points op
- Houd runbooks voor common troubleshooting scenarios
- Track custom configurations en deviations van standaard
- Log support tickets en resolutions
- Creëer client-specifieke checklists en procedures
- Version control alle documentation

**Config**: `kb/` directory structure

#### 2. Solution Library
**Trigger**: Gedurende proposal generation; na delivery completion
**Output**: Herbruikbare solution templates en reference architectures
- Catalogeer proven architecture patterns (microservices, event-driven, data pipeline)
- Documenteer technology stacks en trade-offs
- Creëer Terraform modules voor rapid deployment
- Onderhoud Docker base images geoptimaliseerd voor common workloads
- Sla API gateway configurations en middleware patterns op
- Bouw library van Lambda functions / Cloud Functions
- Track deployment times en resource usage per pattern
- Deel over team en clients (met access controls)

**Config**: `kb/reference-architectures/`, `kb/solution-templates/`

#### 3. Tech Debt Ledger
**Trigger**: Post-deployment retrospectives; quarterly reviews
**Output**: Prioritized backlog van technical improvements
- Log bekende issues en limitations in production systems
- Schat remediation effort en business impact in
- Track dependency updates en security patch backlog
- Documenteer architectural improvements nodig
- Schedule tech debt sprints tussen client projects
- Monitor vulnerabilities (CVEs, dependency scanning)
- Bereken tech debt interest (cost van delaying fixes)
- Present options aan client voor addressing debt

**Config**: `kb/tech-debt-ledger/`

#### 4. Retrospectives
**Trigger**: End van engagement phase of quarterly
**Output**: Lessons learned document met action items
- Voer post-mortem uit op successen en failures
- Documenteer wat goed ging en wat beter kon
- Capture cost overruns en timeline deviations
- Verzamel team en client feedback
- Update solution library met nieuwe patterns
- Genereer training material uit lessons learned
- Deel insights in thought leadership content
- Update SLA matrix gebaseerd op actual performance

**Config**: `kb/lessons-learned/`

---

### Content and Growth (3 skills)

#### 1. Thought Leadership
**Trigger**: Quarterly content planning; na significant engagement
**Output**: Blog posts, whitepapers, case studies voor marketing en brand-building
- Identificeer trending topics in AI/cloud consulting
- Schrijf technical deep-dives op architecture patterns
- Ontwikkel case studies van succesvolle client engagements (anoniem)
- Creëer comparison guides (cloud providers, architectures, tools)
- Genereer slide decks voor conference talks
- Produce video content summaries
- Publiceer op company blog, LinkedIn, Medium
- Track engagement metrics en optimaliseer topics
- Bouw thought leadership portfolio voor team

**Config**: `config/content-calendar.json`

#### 2. Webinar Operations
**Trigger**: Monthly of quarterly; rond product launches
**Output**: Scheduled webinars met promotion, slides en follow-up campaigns
- Plan webinar topics en identificeer internal speakers
- Schedule speakers en technical rehearsals
- Creëer presentation decks en live demos
- Promote via email, LinkedIn en Slack
- Manage registrations en attendee tracking
- Record webinars en creëer highlight clips
- Genereer webinar recap blog post
- Track conversions van webinar naar sales pipeline
- Onderhoud speaker schedule en rotation

**Config**: `config/speaker-schedule.json`

#### 3. Referral Engine
**Trigger**: Na succesvolle client engagement of bij genereren van nieuwe leads
**Output**: Referral campaign met tracking en rewards
- Identificeer satisfied clients en partners voor referrals
- Creëer referral incentive program (discounts, credits, rewards)
- Genereer unique referral links en codes
- Track referral attribution in Notion CRM
- Stuur thank-you en commission payments via Stripe
- Nurture referral partners met educational content
- Analyseer referral ROI en optimaliseer targeting
- Scale meest succesvolle referral channels

**Config**: `integrations/stripe-api.json`

---

## Integratiegepunten

### Notion CRM
- **File**: `integrations/notion-crm.json`
- **Use**: Deal tracking, proposal history, client records
- **Sync**: Triggered door proposal generation en SLA reports

### Slack Webhooks
- **File**: `integrations/slack-webhooks.json`
- **Use**: Incident escalation, deployment notifications, SLA alerts
- **Channels**: #deployments, #incidents, #sales, #support

### Stripe API
- **File**: `integrations/stripe-api.json`
- **Use**: Invoice generation, cost tracking, referral payouts
- **Workflow**: Triggered na contract signature en maandelijks voor SLA credits

### GitHub Sync
- **File**: `integrations/github-sync.json`
- **Use**: Infrastructure-as-code version control, CI/CD workflows
- **Branches**: `main` (production), `staging`, `dev` per client

---

## Configuratiebestanden

### SLA Matrix
**File**: `config/sla-matrix.json`
```json
{
  "service_levels": {
    "premium": {
      "uptime_slo": 99.99,
      "response_time_p99": 100,
      "support_hours": "24/7",
      "incident_resolution": "4h",
      "price_per_hour": 500
    },
    "standard": {
      "uptime_slo": 99.9,
      "response_time_p99": 500,
      "support_hours": "business",
      "incident_resolution": "8h",
      "price_per_hour": 250
    }
  }
}
```

### Pricing Matrix
**File**: `config/pricing-matrix.json`
- Per-region deployment costs (data transfer, compute, storage)
- Engineering hourly rates by seniority level
- Architecture en design time allocation
- Operational support (on-call, SLA credits)
- Managed services premium

### Service Catalog
**File**: `config/service-catalog.json`
- Available service tiers (small, medium, enterprise)
- Technology stack options (compute, database, messaging)
- Add-on services (monitoring, compliance, training)
- Delivery timeline estimates per service

### Client Taxonomy
**File**: `config/client-taxonomy.json`
- Industry classifications (fintech, healthtech, e-commerce, etc.)
- Company size categories (startup, SMB, enterprise)
- Deployment preferences (AWS, GCP, hybrid, on-prem)
- Compliance requirements (HIPAA, PCI-DSS, SOC 2, GDPR)

---

## Secrets Management

**File**: `config/secrets-rotation.json`

Alle credentials (API keys, database passwords, TLS certificates) zijn:
- Opgeslagen in AWS Secrets Manager / GCP Secret Manager per regio
- Automatisch geroteerd op schedule
- Accessed via IAM roles (nooit committed naar Git)
- Logged voor audit trails
- Gesynchroniseerd naar client environments veilig

---

## Maandelijkse Workflows

1. **SLA Compliance Report**: Genereer uptime, error rates en cost summary
2. **Tech Debt Review**: Prioritiseer en schedule remediation
3. **Content Calendar Planning**: Plan thought leadership en webinars
4. **Referral Pipeline Analysis**: Track attribution en ROI
5. **Cost Optimization**: Review cloud spend en adjust reserved capacity
6. **Team Retrospective**: Lessons learned en process improvements

---

## Hoe Deze Structuur Aan Te Passen

### Voor kleinere consultancies:
- Combineer `client-delivery/` en `deployment-infrastructure/` in enkele `operations/` folder
- Merge `proposal-engine/` met `knowledge-management/`
- Reduceer naar 1-2 thought leadership initiatives per kwartaal

### Voor product-focused consultancies:
- Voeg `product-development/` folder toe met version control en release management
- Emphasis op herbruikbare components en IP licensing
- Aparte `solution-marketplace/` voor packaged offerings

### Voor managed services providers:
- Expandeer `observability-stack/` met 24/7 incident management
- Voeg `customer-success/` folder toe voor onboarding en retention
- Emphasis op SLA compliance en uptime metrics

---

## Aan de Slag

1. Clone de workspace template in uw Claude Code project
2. Update `config/` files met uw pricing, regio's en team structure
3. Configureer Notion integration door API key toe te voegen aan `integrations/notion-crm.json`
4. Stel Slack webhooks in voor incident en deployment channels
5. Creëer AWS/GCP service accounts en sla credentials op in Secrets Manager
6. Customiseer Terraform modules voor uw standard infrastructure patterns
7. Voeg uw reference architectures en case studies toe aan `kb/`
8. Schedule maandelijkse retrospectives en tech debt reviews
9. Bouw uw thought leadership content calendar
10. Enable GitHub Actions workflows voor CI/CD automation

---

## References

- [AWS Best Practices](https://docs.aws.amazon.com/whitepapers/)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
- [Terraform Best Practices](https://terraform.io/docs/configuration/best-practices.html)
- [Kubernetes Hardening Guide](https://kubernetes.io/docs/concepts/security/)
- [SOC 2 Compliance Checklist](https://www.aicpa.org/soc2)
