---
name: contract-review
description: "AI contract review: risk flagging (GREEN/YELLOW/RED), NDA triage, vendor contract checks, indemnity and limitation analysis — Claude Legal Plugin patterns"
---

> 🇩🇪 Deutsche Version. [Englische Version](../contract-review.md).

# Vertragsüberprüfungs-Kompetenz

## Wann aktivieren
- Einen Lieferantenvertrag, SaaS-Vereinbarung oder NDA auf rote Fahnen prüfen
- Fehlende Klauseln identifizieren, die in einem Vertrag enthalten sein sollten
- Vertragsbedingungen mit einem Satz akzeptabler Positionen vergleichen
- Einen Stapel NDAs sortieren, um zu identifizieren, welche anwaltliche Aufmerksamkeit benötigen
- Verstehen, was eine bestimmte Klausel in einfacher Sprache bedeutet

## Wann NICHT verwenden
- Jurisdiktionsspezifische Rechtsberatung — Claude identifiziert Probleme, ein Anwalt berät
- Gerichtseinreichungen, Streitdokumente oder behördliche Einreichungen
- Echtzeit-Rechtsentscheidungen — Claude unterstützt die menschliche Überprüfung, ersetzt sie nicht

## WICHTIG: KI-Grenzen bei Verträgen

Claude kann Muster erkennen, Probleme kennzeichnen und Klauseln erläutern. Er kann nicht: Rechtsberatung geben, jurisdiktionsspezifisches Recht interpretieren oder garantieren, dass er jedes Problem gefunden hat. Lassen Sie hochwertige Verträge immer von einem Anwalt prüfen.

## Anweisungen

### Das Überprüfungsrahmenwerk (GRÜN / GELB / ROT)

```typescript
type RiskLevel = 'GREEN' | 'YELLOW' | 'RED'

interface ContractIssue {
  clause:       string        // Der spezifische Klauseltext
  section:      string        // Position im Dokument (z.B. "Abschnitt 8.2")
  risk:         RiskLevel
  issue:        string        // Was das Problem ist
  impact:       string        // Was passieren könnte
  suggestion:   string        // Wie es zu beheben ist
}

// ROT    = blockierend — muss vor Unterzeichnung behoben werden
// GELB   = verhandeln — zurückdrängen, aber kein Dealbreaker
// GRÜN   = akzeptabel — Standard-Marktbedingungen
```

### Einen Vertrag mit Claude überprüfen

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

### NDA-Triage

```typescript
async function triageNDA(ndaText: string): Promise<NDATriage> {
  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: z.object({
      ndaType:            z.enum(['mutual', 'one_way_us', 'one_way_them']),
      term:               z.string(),          // "2 Jahre", "unbegrenzt"
      scopeIssues:        z.array(z.string()), // zu breite Definitionen
      exclusions:         z.array(z.string()), // was von der Vertraulichkeit ausgenommen ist
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

### Häufige rote Fahnen zu überprüfen

```typescript
const RED_FLAG_PATTERNS = [
  {
    name: 'Unbegrenzte Freistellung',
    check: (text: string) => /indemnif.*without.*limit|unlimited.*indemnif/i.test(text),
    impact: 'Unbegrenzte finanzielle Exposition — Sie könnten weit mehr als den Vertragswert schulden',
  },
  {
    name: 'Keine Haftungsbeschränkung',
    check: (text: string) => !/(limitation|limit).*liability/i.test(text),
    impact: 'Kein Haftungsdeckel — jeder Vertragsbruch könnte zu unbegrenzter Haftung führen',
  },
  {
    name: 'Automatische Verlängerung ohne Benachrichtigung',
    check: (text: string) => /auto.*renew.*without.*notice|renew.*unless.*cancel/i.test(text),
    impact: 'Könnte unbewusst für eine weitere Laufzeit gebunden sein',
  },
  {
    name: 'IP-Eigentum an Ihren Beiträgen',
    check: (text: string) => /intellectual property.*all.*work|assign.*all.*ip/i.test(text),
    impact: 'Sie könnten das Eigentum an von Ihnen erstellten Materialien verlieren',
  },
  {
    name: 'Einseitige Änderung',
    check: (text: string) => /reserves.*right.*modify|may.*change.*terms.*without.*notice/i.test(text),
    impact: 'Anbieter kann Bedingungen ohne Ihre Zustimmung ändern',
  },
  {
    name: 'Geltendes Recht in ungünstiger Jurisdiktion',
    check: (text: string, ourJurisdiction: string) => {
      const match = text.match(/governed by.*law.*of ([\w\s]+)/i)
      return match ? !match[1].includes(ourJurisdiction) : false
    },
    impact: 'Streitigkeiten müssen nach ausländischem Recht beigelegt werden — teuer und unpraktisch',
  },
]
```

### Stapelverarbeitung von Verträgen

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

  // Nach Risiko sortieren — Anwalt prüft höchste Risiken zuerst
  return {
    results: results.sort((a, b) => a.risk === 'HIGH' ? -1 : 1),
    highRiskCount: results.filter(r => r.risk === 'HIGH').length,
  }
}
```

### Klauselerläuterung (in einfacher Sprache)

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

## Beispiel

**Benutzer:** Einen Anbieter-SaaS-Vertrag (PDF/Text) überprüfen, alle ROTEN Probleme, die behoben werden müssen, GELBE Probleme zur Verhandlung kennzeichnen und zusammenfassen, was fehlt — Ausgabe als strukturierter Bericht.

**Erwartetes Ergebnis:**
```
VERTRAGSÜBERPRÜFUNGSBERICHT
Gesamtrisiko: HOCH

🔴 ROT (3 Probleme — vor Unterzeichnung beheben)
  Abschnitt 12.1 — Unbegrenzte Freistellung
  Klausel: "Customer shall indemnify Vendor for all claims, losses, and expenses..."
  Problem: Kein Freistellungsdeckel — unbegrenzte finanzielle Exposition
  Behebung: Hinzufügen "not to exceed the fees paid in the 12 months preceding the claim"

🟡 GELB (2 Probleme — verhandeln)
  Abschnitt 8.3 — Automatische Verlängerung mit 60-Tage-Kündigungsfrist
  ...

🟢 GRÜN (8 Klauseln — akzeptable Standardbedingungen)

FEHLENDE KLAUSELN:
  - Kein Auftragsverarbeitungsvertrag (unter DSGVO erforderlich)
  - Keine SLA für Uptime-Garantien
  - Keine Datenlöschklausel bei Kündigung

EMPFEHLUNG: Nicht unterzeichnen, bis ROTE Probleme behoben sind. Mit Änderungen zurücksenden.
```

---

> **Arbeiten Sie mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte und B2B-Lösungen mit Entwickler-Communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
