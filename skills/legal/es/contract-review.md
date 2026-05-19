---
name: contract-review
description: "AI contract review: risk flagging (GREEN/YELLOW/RED), NDA triage, vendor contract checks, indemnity and limitation analysis — Claude Legal Plugin patterns"
---

> 🇪🇸 Versión en español. [Versión en inglés](../contract-review.md).

# Habilidad de Revisión de Contratos

## Cuándo activar
- Revisar un contrato de proveedor, acuerdo SaaS o NDA en busca de señales de alerta
- Identificar cláusulas faltantes que deberían estar en un contrato
- Comparar términos del contrato contra un conjunto de posiciones aceptables
- Clasificar un lote de NDAs para identificar cuáles necesitan atención legal
- Entender qué significa una cláusula específica en lenguaje simple

## Cuándo NO usar
- Asesoramiento legal específico de jurisdicción — Claude identifica problemas, un abogado asesora
- Presentaciones judiciales, documentos de litigación o presentaciones regulatorias
- Decisiones legales en tiempo real — Claude asiste la revisión humana, no la reemplaza

## IMPORTANTE: Limitaciones de la IA en contratos

Claude puede identificar patrones, marcar problemas y explicar cláusulas. No puede: dar asesoramiento legal, interpretar el derecho específico de una jurisdicción, o garantizar que ha detectado todos los problemas. Siempre haga que un abogado revise los contratos de alto valor.

## Instrucciones

### El marco de revisión (VERDE / AMARILLO / ROJO)

```typescript
type RiskLevel = 'GREEN' | 'YELLOW' | 'RED'

interface ContractIssue {
  clause:       string        // El texto específico de la cláusula
  section:      string        // Dónde en el documento (ej. "Sección 8.2")
  risk:         RiskLevel
  issue:        string        // Cuál es el problema
  impact:       string        // Qué podría ocurrir
  suggestion:   string        // Cómo solucionarlo
}

// ROJO    = bloqueante — debe solucionarse antes de firmar
// AMARILLO = negociar — presionar pero no es un factor decisivo
// VERDE   = aceptable — términos estándar del mercado
```

### Revisar un contrato con Claude

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

### Clasificación de NDA

```typescript
async function triageNDA(ndaText: string): Promise<NDATriage> {
  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: z.object({
      ndaType:            z.enum(['mutual', 'one_way_us', 'one_way_them']),
      term:               z.string(),          // "2 años", "indefinido"
      scopeIssues:        z.array(z.string()), // definiciones demasiado amplias
      exclusions:         z.array(z.string()), // qué está excluido de la confidencialidad
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

### Señales de alerta comunes a verificar

```typescript
const RED_FLAG_PATTERNS = [
  {
    name: 'Indemnización sin límite',
    check: (text: string) => /indemnif.*without.*limit|unlimited.*indemnif/i.test(text),
    impact: 'Exposición financiera ilimitada — podría deber mucho más que el valor del contrato',
  },
  {
    name: 'Sin limitación de responsabilidad',
    check: (text: string) => !/(limitation|limit).*liability/i.test(text),
    impact: 'Sin límite en daños — cualquier incumplimiento podría resultar en responsabilidad ilimitada',
  },
  {
    name: 'Renovación automática sin aviso',
    check: (text: string) => /auto.*renew.*without.*notice|renew.*unless.*cancel/i.test(text),
    impact: 'Podría quedar comprometido por otro período sin darse cuenta',
  },
  {
    name: 'Propiedad de IP sobre sus aportes',
    check: (text: string) => /intellectual property.*all.*work|assign.*all.*ip/i.test(text),
    impact: 'Puede perder la propiedad de materiales que crea',
  },
  {
    name: 'Modificación unilateral',
    check: (text: string) => /reserves.*right.*modify|may.*change.*terms.*without.*notice/i.test(text),
    impact: 'El proveedor puede cambiar términos sin su consentimiento',
  },
  {
    name: 'Ley aplicable en jurisdicción desfavorable',
    check: (text: string, ourJurisdiction: string) => {
      const match = text.match(/governed by.*law.*of ([\w\s]+)/i)
      return match ? !match[1].includes(ourJurisdiction) : false
    },
    impact: 'Las disputas deben resolverse bajo ley extranjera — costoso e inconveniente',
  },
]
```

### Procesamiento por lotes de contratos

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

  // Ordenar por riesgo — el abogado revisa los de mayor riesgo primero
  return {
    results: results.sort((a, b) => a.risk === 'HIGH' ? -1 : 1),
    highRiskCount: results.filter(r => r.risk === 'HIGH').length,
  }
}
```

### Explicación de cláusula (en lenguaje simple)

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

## Ejemplo

**Usuario:** Revisar un acuerdo SaaS de proveedor (PDF/texto), marcar todos los problemas ROJOS que deben solucionarse, problemas AMARILLOS para negociar, y resumir qué falta — salida como informe estructurado.

**Resultado esperado:**
```
INFORME DE REVISIÓN DE CONTRATO
Riesgo general: ALTO

🔴 ROJO (3 problemas — solucionar antes de firmar)
  Sección 12.1 — Indemnización sin límite
  Cláusula: "Customer shall indemnify Vendor for all claims, losses, and expenses..."
  Problema: Sin límite de indemnización — exposición financiera ilimitada
  Solución: Agregar "not to exceed the fees paid in the 12 months preceding the claim"

🟡 AMARILLO (2 problemas — negociar)
  Sección 8.3 — Renovación automática con requisito de aviso de 60 días
  ...

🟢 VERDE (8 cláusulas — términos estándar aceptables)

CLÁUSULAS FALTANTES:
  - Sin acuerdo de procesamiento de datos (requerido bajo GDPR)
  - Sin SLA para garantías de tiempo de actividad
  - Sin cláusula de eliminación de datos al terminar

RECOMENDACIÓN: No firmar hasta que se resuelvan los problemas ROJOS. Devolver con modificaciones resaltadas.
```

---

> **Trabaje con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
