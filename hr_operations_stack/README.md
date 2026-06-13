# HR Operations Stack

> The complete Claude Code workspace for autonomous people operations — talent acquisition, employee engagement, performance management, compensation strategy, compliance, and organizational development. Build and scale high-performing teams while maintaining legal compliance and a thriving culture.

---

## Quick Start

1. **Copy this folder** into your Claude Code workspace or project.
2. **Configure HRIS/ATS integration** — Link to your HR systems (Workday, Greenhouse, BambooHR, etc.) in `settings.json` using Merge and Connections MCPs.
3. **Set your HR strategy** — Open `CLAUDE.md`, customize the HR Compliance Matrix, and define your culture priorities.
4. **Run `/hire [job-title]`** — Get complete hiring strategy: JD, sourcing plan, interview structure, candidate rubric, and 30-60-90 onboarding.
5. **Run `/review-employee [name]`** — Execute annual performance review: goal achievement, 360-feedback, rating calibration, merit increase, and development plan.
6. **Run `/audit-compliance [action]`** — Score any people decision against legal matrix; flag risks; escalate to counsel if needed.

---

## What's Inside

| File/Folder | Type | Purpose |
|---|---|---|
| `CLAUDE.md` | Config | HR Operations framework, compliance matrix, skills, hooks, tone guidelines, persona, and SOP. **Start here.** |
| `session-log.md` | Log | Auto-updated with every action: hires, reviews, audits, terminations, approvals, legal escalations. Searchable audit trail. |
| `skills/` | Directory | 8 reusable skills for talent, engagement, performance, compensation, compliance, offboarding, succession planning, and culture. |
| `commands/` | Directory | 3 commands: `/hire`, `/review-employee`, `/audit-compliance`. Launch complete workflows with human approval gates. |
| `hooks/` | Directory | 4 safety hooks: compliance gatekeeper, confidentiality enforcer, bias detector, session audit log. |
| `mcp/` | Directory | HRIS/ATS integration configs (Merge, Connections) for live data access and bulk import. |

---

## Skills (8)

| Skill | Trigger | Tools Used | Purpose |
|---|---|---|---|
| `talent-acquisition-strategist` | `/hire [job-title]` | Read, Write | Design job description, sourcing channels, interview plan, candidate rubric, offer strategy, 30-60-90 onboarding |
| `onboarding-optimizer` | New hire start date confirmed | Read, Write | Build seamless 30-60-90 timeline with milestones, mentor assignment, and success metrics |
| `engagement-pulse` | Quarterly survey or exit interview | Read, Write | Design pulse survey, synthesize feedback, identify flight risks, recommend interventions |
| `performance-reviewer` | Annual/mid-year review cycle | Read, Write | Structure performance review, set SMART goals, synthesize 360-feedback, ensure rating consistency |
| `compensation-strategist` | Merit cycle, market study, equity refresh | Read, Write | Analyze market competitiveness, design merit increases, model equity refreshes, validate pay equity |
| `compliance-auditor` | Before any people decision | Read, Write | Score decision against compliance matrix (4 dimensions, 12 pts max), flag risks, escalate to counsel |
| `offboarding-conductor` | Resignation, termination, retirement | Read, Write | Build exit checklist, coordinate knowledge transfer, manage legal holds, process final payroll |
| `succession-planner` | Annual planning cycle, key role vacancy | Read, Write | Map critical roles, identify bench strength (ready-now, ready-soon, high-potential), build development plans |

---

## Commands (3)

| Command | What It Does |
|---|---|
| `/hire [job-title]` | Launch talent acquisition workflow. Define role rationale, sourcing strategy, interview process, candidate scoring, offer strategy, and 30-60-90 onboarding. Saves hiring plan for approval before posting. |
| `/review-employee [name]` | Run performance review workflow. Compile goal achievement, synthesize 360-feedback, calibrate rating, recommend merit increase, and build development plan. Ensures consistency and flags bias. |
| `/audit-compliance [action-type]` | Score people decision against compliance matrix. Flags legal risks, recommends mitigation, escalates to counsel if score <9. Accepts: hire, termination, compensation change, policy update. |

---

## Hooks (4)

| Hook | Event | What It Protects Against |
|---|---|---|
| `compliance-gatekeeper` | PostToolUse (Write) | Blocks terminations, compensation changes, policy updates if compliance score <6; requires legal review |
| `confidentiality-enforcer` | PostToolUse (Write) | Scans outputs for exposed PII (SSN, DOB, medical data, salary); redacts or flags for secure handling |
| `bias-detector` | PostToolUse (Write) | Analyzes job descriptions and performance feedback for discriminatory language; recommends inclusive alternatives |
| `session-audit-log` | Stop | Auto-logs to `session-log.md` at session end: hires, reviews, audits, terminations, approvals, legal escalations |

---

## MCP Setup

### Merge (Bulk Data Integration)

Get your API key at [merge.dev](https://merge.dev/). Add to `settings.json`:

```json
{
  "mcpServers": {
    "merge": {
      "command": "npx",
      "args": ["@merge/mcp"],
      "env": {
        "MERGE_API_KEY": "your-merge-api-key"
      }
    }
  }
}
```

Use for: Headcount import, compensation benchmarking, termination analysis, performance history.

### Connections (HRIS & ATS Integration)

Get API keys from your HRIS/ATS admin portal. Add to `settings.json`:

```json
{
  "mcpServers": {
    "connections": {
      "command": "npx",
      "args": ["@hris-ats/mcp"],
      "env": {
        "HRIS_API_KEY": "your-hris-key",
        "ATS_API_KEY": "your-ats-key",
        "HRIS_PROVIDER": "workday|successfactors|bamboohr|lattice",
        "ATS_PROVIDER": "greenhouse|lever|ashby|workable"
      }
    }
  }
}
```

Use for: Live headcount queries, hiring pipeline, compensation review, performance data, retention tracking.

---

## How It Works

### 1. Talent Acquisition Strategy
Every job opening gets comprehensive planning: business rationale, sourcing channels, interview process, candidate rubric, offer strategy, and onboarding timeline. No posting without strategy approval.

### 2. Structured Performance Reviews
Annual/mid-year reviews include goal achievement measurement, 360-feedback synthesis, rating calibration against peers, merit recommendation, and development planning. Prevents bias, ensures consistency.

### 3. Compliance Scoring
Every people decision (hire, termination, compensation change, policy) is scored against 4 compliance dimensions (legal, privacy, regulatory, record retention). Low scores escalate to legal counsel. All decisions documented for audit trail.

### 4. Safeguards & Approval Gates
- **Compliance gatekeeper:** Blocks high-risk decisions without legal review
- **Confidentiality enforcer:** Prevents accidental PII exposure
- **Bias detector:** Flags discriminatory language in job descriptions and feedback
- **Session audit log:** Records all actions for searchable audit trail

### 5. Session Logging
All HR actions logged to `session-log.md`: hires, reviews, audits, terminations, approvals, legal escalations. Build searchable history of all people decisions.

---

## HR Compliance Matrix

Score every people decision against 4 dimensions:

| Dimension | High Risk (1 pt) | Medium Risk (2 pts) | Low Risk (3 pts) |
|---|---|---|---|
| **Legal Exposure** | Discrimination risk, missing documentation, wage/hour violation | Inconsistent policy, incomplete records | Compliant, documented, legal review done |
| **Privacy/Confidentiality** | PII exposed, no access controls | Unencrypted internal comms only | Encrypted, role-based access, consent tracked |
| **Regulatory Adherence** | Non-compliant with EEOC/DOL/state law | Partial compliance, gaps in docs | Fully compliant, audits current, proactive updates |
| **Record Retention** | Missing termination/discipline docs | Incomplete files, informal docs | Complete files, signed acknowledgments, retention schedule |

**Decision Rule:**
- **PROCEED (≥10 pts):** Safe to implement
- **REVIEW (6–9 pts):** Escalate to employment counsel before action
- **HOLD (≤5 pts):** Do not proceed without legal sign-off and risk mitigation

---

## Tone & Output Rules

- **Voice:** Professional, empathetic, solutions-oriented. Respect confidentiality.
- **Data-driven:** Ground all recommendations in metrics and benchmarks.
- **Inclusive:** Gender-neutral language, culturally aware, EEOC-compliant.
- **Compliance-first:** Flag legal concerns immediately; escalate to counsel without delay.
- **Transparent:** Be clear about trade-offs, constraints, and risks.
- **Banned Phrases (12):** "circle back," "synergy," "move the needle," "touch base," "reach out," "low-hanging fruit," "bandwidth," "on the same page," "per my last email," "just checking in," "leverage."

---

## Human Approval Gate

**All people decisions require explicit documented approval.**

- Claude drafts all hiring strategies, job descriptions, performance reviews, compensation plans, and termination letters.
- HR leadership (Director+) reviews and approves or requests changes.
- Legal counsel signs off on any decision flagged as medium or high compliance risk.
- Approval is logged with date, approver name, and business justification.
- **Approval log entry example:** `[APPROVED] Senior PM hiring plan — CFO approval 2026-06-12 09:15 — Legal review waived`

---

## Standard Operating Procedures

1. **Every hiring decision passes the talent acquisition workflow.** Document job rationale, sourcing plan, interview criteria. No posting without strategy approval.
2. **Before any people decision (hire, fire, compensation change, policy), run `/audit-compliance`.** If score <9, escalate to counsel.
3. **Automatically log all people actions to `session-log.md`.** Include hires, reviews, audits, terminations, legal escalations, approvals.
4. **Maintain confidentiality of all employee data.** Use role-based access, encrypt PII, respect GDPR/CCPA/state privacy laws.
5. **Review job descriptions and interview plans for bias before posting.** Use bias-detector; recommend inclusive language; ensure EEOC compliance.
6. **Build succession plans for all critical roles.** Identify ready-now, ready-soon, and high-potential bench; update quarterly.

---

## Success Metrics

Track and report on:

**Talent Acquisition:**
- Time-to-hire (target: 8–12 weeks for mid-level roles)
- Quality-of-hire (6-month retention >95%)
- Offer acceptance rate (target: 85%+)
- Diversity in interview slates (target: 30%+ women, 20%+ underrepresented minorities)

**Employee Retention:**
- Voluntary turnover rate (target: <15% annually)
- Retention by cohort (track regrettable vs. non-regrettable departures)
- Flight risk identification and mitigation success

**Performance Management:**
- Review completion rate (target: 100%)
- Rating distribution (identify inflation; ensure bell curve or near-flat distribution)
- Merit increase accuracy (within compensation band, justified by performance)

**Compensation:**
- Market competitiveness percentile (target: 50th–65th)
- Pay equity gap (target: <5% within role/level/location)
- Equity utilization rate (monitor option pool depletion)

**Compliance:**
- Audit findings (target: 0)
- Legal claims (track and resolve)
- Policy acknowledgment rate (target: 100%)
- Documentation completeness (100% audit trail)

**Organizational Health:**
- eNPS score (target: >40)
- Engagement survey response rate (target: >60%)
- Bench readiness (% of critical roles with ready-now successors; target: 100%)
- Succession plan coverage (target: 100% for Tier 1, 80% for Tier 2, 50% for Tier 3)

---

## Key Constraints

- **Legal/Compliance:** Never advise on employment law without counsel review. Flag any termination, discrimination concern, wage dispute, or FMLA/ADA request immediately.
- **Confidentiality:** All employee data is strictly confidential. Use encryption, role-based access, respect privacy regulations.
- **Data Privacy:** GDPR, CCPA, and local privacy laws apply. Maintain consent records, honor data subject requests, limit retention.
- **Bias Prevention:** Use inclusive language; never discriminate based on protected characteristics. Validate job descriptions, interview questions, and feedback for bias.
- **Documentation:** Maintain complete records of all hiring, performance, and termination decisions. Assume all decisions may be subject to legal discovery.

---

## Guardrails & Escalations

- **Terminations:** Require HR Director+ approval, legal review, documented cause. Always provide notice per employment agreement and local law.
- **Discrimination/Harassment:** Escalate immediately to HR leadership and legal counsel. Document all reports and investigations.
- **Wage/Hour Disputes:** Escalate to legal counsel. Do not make unilateral decisions on back pay.
- **FMLA, ADA, or Accommodation Requests:** Route to accommodation manager; involve legal counsel if complex.
- **Investigations:** All misconduct investigations must be documented, impartial, and tracked with legal guidance.
- **Mass Layoffs or Restructuring:** Escalate to CEO, CFO, legal counsel. Coordinate with WARN Act and local notice requirements.

---

## Stats

**8 skills** · **3 commands** · **4 hooks** · **2 MCP servers** (Merge + Connections) · **Full audit trail** via session logging

---

## Workspace Structure

```
hr_operations_stack/
├── CLAUDE.md                           (HR strategy, compliance matrix, SOP, brand persona)
├── README.md                           (this file)
├── session-log.md                      (auto-updated audit trail of all HR actions)
├── skills/
│   ├── talent-acquisition-strategist/SKILL.md
│   ├── onboarding-optimizer/SKILL.md
│   ├── engagement-pulse/SKILL.md
│   ├── performance-reviewer/SKILL.md
│   ├── compensation-strategist/SKILL.md
│   ├── compliance-auditor/SKILL.md
│   ├── offboarding-conductor/SKILL.md
│   └── succession-planner/SKILL.md
├── commands/
│   ├── hire.md
│   ├── review-employee.md
│   └── audit-compliance.md
├── hooks/
│   ├── compliance-gatekeeper.md
│   ├── confidentiality-enforcer.md
│   ├── bias-detector.md
│   └── session-audit-log.md
└── mcp/
    ├── merge.md
    └── connections.md
```

---

## Getting Help

Refer to `CLAUDE.md` for:
- HR Operations Framework and core pillars
- Compliance Matrix scoring rules
- Detailed skill descriptions
- Command usage and output formats
- Hook setup instructions
- Standard Operating Procedures
- Success metrics and guardrails

---

Built by [tushar2704](https://github.com/tushar2704) · [Claudient](https://github.com/Claudient/Claudient) · [Claude Code](https://claude.com/claude-code)
