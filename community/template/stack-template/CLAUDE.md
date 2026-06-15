# [EDIT ME: Stack Name] — CLAUDE.md

[EDIT ME: 1-2 sentence introduction describing the stack's purpose and who it's for. Example: "This stack equips security engineers with threat analysis, incident response, and compliance automation tools for defending cloud infrastructure."]

---

## Identity & Domain

**Role:** [EDIT ME: The specific role or persona this stack is designed for. Example: "Security Engineer — Defender of cloud infrastructure and incident responder."]

**Domain:** [EDIT ME: List the specific domain areas this stack covers. Example: "Cloud security, incident response, threat analysis, compliance automation."]

**Core Competencies:**
- [EDIT ME: Core skill or area of expertise #1]
- [EDIT ME: Core skill or area of expertise #2]
- [EDIT ME: Core skill or area of expertise #3]

---

## Persona

[EDIT ME: Write 2-3 sentences describing the person who uses this stack. What perspectives do they bring? What problems do they solve? What constraints do they face?

Example: "A security engineer operates at the intersection of threat intelligence, infrastructure-as-code, and incident response. They balance shifting left (preventing threats earlier) with rapid response (containing active incidents). They think in terms of attack vectors, risk severity, and blast radius."]

---

## Architecture Overview

```
[EDIT ME: Copy your actual directory structure here. Example:]

your_stack_name/
├── CLAUDE.md                          # This file
├── README.md                          # Quick start & glossary
├── skills/                            # Domain-specific skills
│   ├── [skill-name]/SKILL.md
│   ├── [skill-name]/SKILL.md
│   └── [skill-name]/SKILL.md
├── commands/                          # CLI-like workflows (optional)
│   ├── [command-name].sh
│   └── [command-name].py
├── hooks/                             # Event-triggered automations (optional)
│   └── [hook-name].sh
└── mcp/                               # Model connections (optional)
    └── [connection-name].md
```

---

## Skills Table

[EDIT ME: List all skills in your stack. Update columns as needed. Example:]

| Skill | Purpose | When to Use | Output | Time |
|-------|---------|------------|--------|------|
| **[Skill Name 1]** | [Brief purpose] | [When to activate] | [What you get back] | [1-2h] |
| **[Skill Name 2]** | [Brief purpose] | [When to activate] | [What you get back] | [2-3h] |
| **[Skill Name 3]** | [Brief purpose] | [When to activate] | [What you get back] | [1h] |

---

## Commands

[EDIT ME: If your stack includes executable workflows, document them here. Example:]

### 1. `[command-name].sh`
```bash
./commands/[command-name].sh --[flag1] "[value]" --[flag2] "[value]"
```
[Brief description of what the command does.]

**Output:**
```
[Sample output or description of output]
```

### 2. `[command-name].py`
```bash
python commands/[command-name].py --[flag] "[value]"
```
[Brief description of what the command does.]

[Remove this section if you don't have commands.]

---

## Hooks

[EDIT ME: If your stack includes event-triggered automations, document them here. Example:]

### `[hook-name].sh`
- **When:** [Trigger condition. Example: "Weekly on Monday 9 AM"]
- **Action:** [What the hook does]
- **Output:** [Where the output goes]
- **Config:** `settings.json` → `hooks.[path]`

[Remove this section if you don't have hooks.]

---

## Domain Framework

[EDIT ME: Explain a key mental model, decision framework, or process your stack uses. Example:

"### Incident Response Lifecycle"

Include ASCII diagrams, tables, or flowcharts where helpful. This should be substantive—at least 5-10 sentences and 1 visual.]

---

## Decision Frameworks & Best Practices

[EDIT ME: List 2-3 best practices or decision frameworks that practitioners in this domain follow. Example:

### Threat Severity Triage
- P1 (Critical): Active breach, data exfiltration, customer impact
- P2 (High): Unauthorized access, configuration drift, but contained
- P3 (Medium): Failed login attempts, misconfiguration, low blast radius

### Incident Response Checklist
- [ ] Detect and alert
- [ ] Isolate affected systems
- [ ] Preserve evidence
- [ ] Root cause analysis
- [ ] Remediation
- [ ] Post-incident review]

---

## Integration with Claude Code

[EDIT ME: Show how this stack integrates with Claude Code. Include examples of slash commands and hook triggers. Example:

### /slash-command Activation

```
/sec-threat-analysis [--target="system-name"] [--severity="p1"]
→ Activates Threat Analysis skill, returns risk assessment

/sec-incident-response [--incident-id="INC-123"]
→ Activates Incident Response skill, generates playbook
```

### Hook Triggers

```json
{
  "hooks": {
    "security": {
      "threat-monitoring": {
        "enabled": true,
        "schedule": "0 9 * * 1",
        "command": "./hooks/threat-monitoring.sh"
      }
    }
  }
}
```]

---

## Metrics & KPIs

[EDIT ME: What success looks like for practitioners using this stack. Example:

**Incident Response:**
- MTTD (Mean Time to Detect): Target <1 hour
- MTTR (Mean Time to Resolve): Target <4 hours
- Post-incident review completion rate: 100%

**Threat Intelligence:**
- Detection accuracy (true positives vs. false alarms): >90%
- Threat assessment currency (data age): <24 hours]

---

## Example Session Flow

[EDIT ME: Walk through a realistic scenario showing how someone would use this stack end-to-end. Example:

```
1. [First step - what happens or what the user does]
2. [Second step - which skill gets activated and why]
3. [Third step - what output they get]
4. [Fourth step - next action or decision]
5. [Fifth step - final outcome or deliverable]
```

Keep to 5-7 steps. Make it concrete and realistic.]

---

## Glossary & Definitions

[EDIT ME: Define domain-specific terms used in this stack. Example:

- **MTTD (Mean Time to Detect):** Average time from when an incident occurs to when it's detected by monitoring or alerts
- **MTTR (Mean Time to Resolve):** Average time from incident detection to full remediation and return to normal operations
- **Blast Radius:** Number of systems or users affected by a security incident]

---

## Further Reading

[EDIT ME: Suggest resources for learning more in this domain. Example:

- [Author/Title] — [Link or citation]
- [Course Name] — [Provider/Link]
- [Paper/Book] — [Citation]]

---

**Last updated:** [EDIT ME: Date] | **Maintainer:** [EDIT ME: Your Name] | **Status:** [EDIT ME: Development/Production]
