---
name: contract-review
description: "AI contract review: risk flagging (GREEN/YELLOW/RED), NDA triage, vendor contract checks, indemnity and limitation analysis — Claude Legal Plugin patterns"
---

> 🇳🇱 Nederlandse versie. [Engelse versie](../contract-review.md).

# Contractbeoordelingsvaardigheid

## Wanneer activeren
- Een leverancierscontract, SaaS-overeenkomst of NDA beoordelen op rode vlaggen
- Ontbrekende clausules identificeren die in een contract zouden moeten staan
- Contractvoorwaarden vergelijken met een reeks aanvaardbare posities
- Een batch NDAs sorteren om te identificeren welke juridische aandacht nodig hebben
- Begrijpen wat een specifieke clausule in gewone taal betekent

## Wanneer NIET gebruiken
- Jurisdictiespecifiek juridisch advies — Claude identificeert problemen, een advocaat adviseert
- Gerechtelijke stukken, processtukken of regelgevende ingedieningen
- Realtime juridische beslissingen — Claude ondersteunt menselijke beoordeling, vervangt die niet

## BELANGRIJK: AI-beperkingen bij contracten

Claude kan patronen identificeren, problemen markeren en clausules uitleggen. Het kan niet: juridisch advies geven, jurisdictiespecifiek recht interpreteren of garanderen dat elk probleem is gevonden. Laat contracten met hoge waarde altijd door een advocaat beoordelen.

## Instructies

### Het beoordelingskader (GROEN / GEEL / ROOD)

```typescript
type RiskLevel = 'GREEN' | 'YELLOW' | 'RED'

interface ContractIssue {
  clause:       string        // De specifieke clausuletekst
  section:      string        // Waar in het document (bijv. "Artikel 8.2")
  risk:         RiskLevel
  issue:        string        // Wat het probleem is
  impact:       string        // Wat er zou kunnen gebeuren
  suggestion:   string        // Hoe het op te lossen
}

// ROOD   = blokkerend — moet worden opgelost vóór ondertekening
// GEEL   = onderhandelen — terugduwen maar geen dealbreaker
// GROEN  = aanvaardbaar — standaard marktvoorwaarden
```

### Een contract beoordelen met Claude

```typescript
import { generateObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import fs from 'fs'

const IssueSchema = z.object({
  section:    z.string(),
  clause:     z.string(),
  risk:       z.enum(['RED', 'YELLOW', 'GREEN']),
  issue:      z.string(),
  impact:     z.string(),
  suggestion: z.string(),
})

const ReviewSchema = z.object({
  summary:          z.string(),
  overallRisk:      z.enum(['HIGH', 'MEDIUM', 'LOW']),
  issues:           z.array(IssueSchema),
  missingClauses:   z.array(z.string()),
  recommendation:   z.string(),
})

async function reviewContract(contractPath: string, context: ReviewContext) {
  const contractText = fs.readFileSync(contractPath, 'utf-8')

  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: ReviewSchema,
    system: `You are a contract review assistant. Your job is to identify risks, flag problematic clauses, and note missing protections. Be specific and cite exact clause language. Focus on practical business impact, not legal technicalities.`,
    prompt: `Review this ${context.contractType} contract from a ${context.ourRole} perspective.

Our key concerns: ${context.concerns.join(', ')}
Our position: ${context.companySize}, ${context.industry}

CONTRACT:
${contractText}

Flag all issues with GREEN/YELLOW/RED risk ratings. RED = blocking/unacceptable, YELLOW = negotiate, GREEN = acceptable.`,
  })

  return object
}
```

### NDA-triage

```typescript
async function triageNDA(ndaText: string): Promise<NDATriage> {
  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: z.object({
      ndaType:            z.enum(['mutual', 'one_way_us', 'one_way_them']),
      term:               z.string(),          // "2 jaar", "onbepaald"
      scopeIssues:        z.array(z.string()), // te brede definities
      exclusions:         z.array(z.string()), // wat is uitgesloten van vertrouwelijkheid
      redFlags:           z.array(z.string()),
      requiresLawyerReview: z.boolean(),
      summary:            z.string(),
    }),
    prompt: `Triage this NDA. Identify: type (mutual/one-way), term, any overly broad scope definitions, missing standard exclusions (public info, prior knowledge, independent development), and any unusual restrictions on disclosure.

NDA TEXT:
${ndaText}`,
  })

  return object
}
```

### Veelvoorkomende rode vlaggen om te controleren

```typescript
const RED_FLAG_PATTERNS = [
  {
    name: 'Ongelimiteerde vrijwaring',
    check: (text: string) => /indemnif.*without.*limit|unlimited.*indemnif/i.test(text),
    impact: 'Onbeperkte financiële blootstelling — u kunt veel meer verschuldigd zijn dan de contractwaarde',
  },
  {
    name: 'Geen aansprakelijkheidsbeperking',
    check: (text: string) => !/(limitation|limit).*liability/i.test(text),
    impact: 'Geen maximumbedrag voor schade — elke contractbreuk kan leiden tot onbeperkte aansprakelijkheid',
  },
  {
    name: 'Automatische verlenging zonder kennisgeving',
    check: (text: string) => /auto.*renew.*without.*notice|renew.*unless.*cancel/i.test(text),
    impact: 'Kan zonder het te merken gebonden zijn aan een andere termijn',
  },
  {
    name: 'IP-eigendom over uw bijdragen',
    check: (text: string) => /intellectual property.*all.*work|assign.*all.*ip/i.test(text),
    impact: 'U kunt het eigendom verliezen van materialen die u maakt',
  },
  {
    name: 'Eenzijdige wijziging',
    check: (text: string) => /reserves.*right.*modify|may.*change.*terms.*without.*notice/i.test(text),
    impact: 'Leverancier kan voorwaarden wijzigen zonder uw toestemming',
  },
  {
    name: 'Toepasselijk recht in ongunstige jurisdictie',
    check: (text: string, ourJurisdiction: string) => {
      const match = text.match(/governed by.*law.*of ([\w\s]+)/i)
      return match ? !match[1].includes(ourJurisdiction) : false
    },
    impact: 'Geschillen moeten worden beslecht onder buitenlands recht — duur en onpraktisch',
  },
]
```

### Batchverwerking van contracten

```typescript
async function processContractBatch(contracts: ContractFile[]): Promise<BatchReport> {
  const results = []

  for (const contract of contracts) {
    console.log(`Reviewing: ${contract.name}`)

    const review = await reviewContract(contract.path, {
      contractType: contract.type,
      ourRole: 'customer',
      concerns: ['IP ownership', 'data protection', 'liability', 'termination'],
      companySize: 'startup',
      industry: 'SaaS',
    })

    results.push({
      contract: contract.name,
      risk:     review.overallRisk,
      redCount: review.issues.filter(i => i.risk === 'RED').length,
      summary:  review.summary,
      requiresLawyer: review.overallRisk === 'HIGH',
    })
  }

  // Sorteren op risico — advocaat beoordeelt hoogste risico's eerst
  return {
    results: results.sort((a, b) => a.risk === 'HIGH' ? -1 : 1),
    highRiskCount: results.filter(r => r.risk === 'HIGH').length,
  }
}
```

### Clausule-uitleg (in gewone taal)

```typescript
async function explainClause(clauseText: string): Promise<string> {
  const { text } = await generateText({
    model: anthropic('claude-opus-4-7'),
    prompt: `Explain this contract clause in plain language. What does it mean for a non-lawyer? What are the practical implications?

CLAUSE: "${clauseText}"

Explain in 2-3 sentences as if speaking to a business owner, not a lawyer.`,
  })
  return text
}
```

## Voorbeeld

**Gebruiker:** Een leveranciers-SaaS-overeenkomst (PDF/tekst) beoordelen, alle RODE problemen die moeten worden opgelost markeren, GELE problemen om over te onderhandelen, en samenvatten wat ontbreekt — uitvoer als gestructureerd rapport.

**Verwachte uitvoer:**
```
CONTRACTBEOORDELINGSRAPPORT
Algeheel risico: HOOG

🔴 ROOD (3 problemen — oplossen vóór ondertekening)
  Artikel 12.1 — Ongelimiteerde vrijwaring
  Clausule: "Customer shall indemnify Vendor for all claims, losses, and expenses..."
  Probleem: Geen vrijwaringsplafond — onbeperkte financiële blootstelling
  Oplossing: Toevoegen "not to exceed the fees paid in the 12 months preceding the claim"

🟡 GEEL (2 problemen — onderhandelen)
  Artikel 8.3 — Automatische verlenging met 60 dagen opzegtermijn
  ...

🟢 GROEN (8 clausules — aanvaardbare standaardvoorwaarden)

ONTBREKENDE CLAUSULES:
  - Geen gegevensverwerkingsovereenkomst (vereist onder AVG)
  - Geen SLA voor beschikbaarheidsgaranties
  - Geen clausule voor gegevensverwijdering bij beëindiging

AANBEVELING: Niet ondertekenen totdat RODE problemen zijn opgelost. Terugsturen met wijzigingen.
```

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
