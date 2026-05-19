---
name: sdr-agent
description: "AI SDR agent patterns: prospect research, personalised outreach, multi-step sequences, reply handling, meeting booking — with safety limits"
---

> 🇪🇸 Versión en español. [Versión en inglés](../sdr-agent.md).

# Habilidad Agente SDR

## Cuándo activar
- Construir un flujo de trabajo de desarrollo de ventas impulsado por IA
- Automatizar la investigación de prospectos y la generación de mensajes de contacto
- Configurar secuencias multi-toque de correo electrónico/LinkedIn con Claude
- Personalizar el contacto a escala (no simple intercambio de plantillas — contexto real)
- Agregar límites de seguridad y puertas de aprobación humana a la automatización de contacto

## Cuándo NO usar
- Campañas de spam — el volumen sin personalización daña la entregabilidad y la reputación
- Automatización de LinkedIn sin entender los límites de conexión (100-200/semana máx.)
- Reemplazar la construcción de relaciones humanas en cuentas estratégicas
- Industrias reguladas con estrictos requisitos de cumplimiento de comunicaciones

## Instrucciones

### El bucle del agente SDR

```
Paso 1: INVESTIGACIÓN    — recopilar contexto de empresa/contacto
Paso 2: CALIFICACIÓN     — puntuar contra ICP (Perfil de Cliente Ideal)
Paso 3: PERSONALIZACIÓN  — generar mensaje con contexto genuino
Paso 4: PUERTA HUMANA    — mostrar borrador, obtener aprobación (para primer contacto)
Paso 5: ENVÍO            — entregar por correo electrónico/LinkedIn
Paso 6: SEGUIMIENTO      — registrar actividad, manejar respuestas
Paso 7: CONTINUACIÓN     — secuenciar siguiente contacto si no hay respuesta
```

### Investigación de prospectos (antes de escribir una sola palabra)

```typescript
interface ProspectContext {
  name: string
  title: string
  company: string
  recentNews: string[]       // financiamiento, lanzamientos de productos, nuevas contrataciones ejecutivas
  linkedInActivity: string[] // publicaciones recientes, comentarios
  techStack: string[]        // desde BuiltWith, publicaciones de empleo en LinkedIn
  painPoints: string[]       // inferidos del contexto
  icpScore: number           // 0-100
}

async function researchProspect(email: string): Promise<ProspectContext> {
  const [contact, company, news] = await Promise.all([
    enrichContactFromEmail(email),          // Clearbit/Apollo/Hunter
    enrichCompanyFromDomain(getDomain(email)),
    searchRecentNews(company.name),         // financiamiento, contrataciones, noticias de productos
  ])

  const icpScore = scoreICP(contact, company)
  const painPoints = await inferPainPoints(company, contact.title)

  return { ...contact, ...company, recentNews: news, icpScore, painPoints }
}
```

### Puntuación ICP

```typescript
interface ICPCriteria {
  companySize: [number, number]  // [min, max] empleados
  industries: string[]
  titles: string[]               // roles de toma de decisiones
  techStack: string[]            // herramientas que usan
  geographies: string[]
}

function scoreICP(contact: Contact, company: Company, criteria: ICPCriteria): number {
  let score = 0

  // Tamaño de empresa (30 puntos)
  const [min, max] = criteria.companySize
  if (company.employees >= min && company.employees <= max) score += 30

  // Coincidencia de industria (25 puntos)
  if (criteria.industries.some(i => company.industry.toLowerCase().includes(i))) score += 25

  // Título/antigüedad (25 puntos)
  if (criteria.titles.some(t => contact.title.toLowerCase().includes(t))) score += 25

  // Superposición de tech stack (20 puntos)
  const overlap = criteria.techStack.filter(t => company.techStack.includes(t))
  score += Math.min(20, overlap.length * 5)

  return score
}
```

### Generación de mensajes personalizados

La diferencia clave entre el spam de IA y la personalización genuina es la **especificidad**. Claude genera mensajes que hacen referencia exactamente a lo que hace relevante a este prospecto ahora mismo.

```typescript
async function generateOutreachMessage(
  prospect: ProspectContext,
  sender: SenderContext,
  template: MessageTemplate
): Promise<string> {
  const prompt = `Write a cold outreach email from ${sender.name} at ${sender.company} to ${prospect.name}.

Context about ${prospect.name}:
- Title: ${prospect.title} at ${prospect.company}
- Recent company news: ${prospect.recentNews.slice(0, 2).join('; ')}
- Their likely pain points: ${prospect.painPoints.join(', ')}
- Why we're relevant: ${template.valueProposition}

Rules:
- Reference ONE specific recent event or achievement (not generic flattery)
- State the value in 1 sentence — what specific outcome we deliver
- Clear, low-friction CTA: "15-minute call this week?" not "I'd love to connect"
- Total length: 5-7 sentences MAX
- No buzzwords: no "synergies", "leverage", "circle back", "reach out"
- First line must NOT start with "I" or "My name is"
- Do not mention competitors

Output: just the email body, no subject line.`

  const { text } = await generateText({ model: anthropic('claude-opus-4-7'), prompt })
  return text
}
```

### Diseño de secuencias multi-paso

```typescript
const SEQUENCE: SequenceStep[] = [
  {
    day: 0,
    channel: 'email',
    type: 'initial',
    subject: '{{personalised_hook}}',
    waitForReply: true,
  },
  {
    day: 3,
    channel: 'linkedin',
    type: 'connection',
    message: 'Nota corta haciendo referencia al correo — 2 oraciones máximo',
    waitForReply: true,
  },
  {
    day: 7,
    channel: 'email',
    type: 'followup_1',
    subject: 'Re: {{original_subject}}',
    message: 'Agregar un nuevo elemento de valor — caso de estudio, punto de datos relevante',
    waitForReply: true,
  },
  {
    day: 14,
    channel: 'email',
    type: 'breakup',
    subject: 'Cerrando el ciclo',
    message: 'Reconocer que están ocupados. Dejar la puerta abierta. Sin culpa.',
    waitForReply: false,
  },
]
```

### Límites de seguridad y cumplimiento

```typescript
const SAFETY_LIMITS = {
  linkedInConnectionsPerWeek: 100,    // Límite suave de LinkedIn (dependiente del puntaje SSI)
  emailsPerDay: 50,                   // por dominio, para evitar marcación como spam
  minDelayBetweenMessages: 30_000,    // 30 segundos mínimo
  maxFollowUps: 3,                    // nunca más de 4 contactos totales
  blacklistDomains: [                 // nunca contactar
    'competitor.com',
    'investor.com',
  ],
  requireHumanApproval: true,         // mostrar borrador antes del primer envío
}

function checkSafetyLimits(prospect: ProspectContext): SafetyResult {
  if (SAFETY_LIMITS.blacklistDomains.includes(getDomain(prospect.email))) {
    return { allowed: false, reason: 'Domain blacklisted' }
  }
  // Verificar recuento de envíos diarios, recuento semanal de LinkedIn, etc.
  return { allowed: true }
}
```

### Puerta de aprobación humana

```typescript
async function requestApproval(draft: OutreachDraft): Promise<boolean> {
  console.log('\n=== OUTREACH DRAFT FOR APPROVAL ===')
  console.log(`To:      ${draft.prospect.name} <${draft.prospect.email}>`)
  console.log(`Company: ${draft.prospect.company}`)
  console.log(`Score:   ${draft.prospect.icpScore}/100`)
  console.log(`\nSubject: ${draft.subject}`)
  console.log(`\n${draft.body}`)
  console.log('\nApprove? (y/n/edit): ')

  // En un contexto CLI, solicitar al usuario
  // En una aplicación web, mostrar en un panel de revisión
  const response = await getUserInput()
  return response.toLowerCase() === 'y'
}
```

### Manejo de respuestas

```typescript
async function handleReply(reply: EmailReply): Promise<void> {
  const intent = await classifyReply(reply.body)

  switch (intent) {
    case 'interested':
      await bookMeeting(reply.from, reply.threadId)
      await updateCRM(reply.from, { status: 'meeting_booked' })
      break
    case 'not_now':
      await scheduleFutureFollowUp(reply.from, days: 90)
      break
    case 'not_interested':
      await markAsOptedOut(reply.from)
      break
    case 'referral':
      const referredContact = await extractReferral(reply.body)
      await addToSequence(referredContact)
      break
  }
}

async function classifyReply(body: string): Promise<ReplyIntent> {
  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: z.object({ intent: z.enum(['interested', 'not_now', 'not_interested', 'referral', 'question', 'other']) }),
    prompt: `Classify this email reply intent: "${body}"`,
  })
  return object.intent
}
```

## Ejemplo

**Usuario:** Construir un agente SDR que tome una lista de fundadores de startups (nombre + URL de LinkedIn), investigue a cada uno, genere un correo electrónico frío personalizado sobre nuestro producto (una herramienta de análisis B2B), y me muestre los borradores para aprobación antes de enviar.

**Resultado esperado:**
- `src/sdr/research.ts` — `researchProspect()` obteniendo de LinkedIn, Clearbit
- `src/sdr/qualify.ts` — `scoreICP()` contra criterios de fundadores de startups
- `src/sdr/generate.ts` — `generateOutreachEmail()` con Claude, haciendo referencia a actividad reciente
- `src/sdr/approve.ts` — bucle de aprobación CLI mostrando borrador + contexto del prospecto
- `src/sdr/send.ts` — envía a través de SendGrid/Resend al aprobar, registra en HubSpot
- Seguridad: verifica lista negra, respeta límite de 50/día de correo electrónico, requiere aprobación

---

> **Trabaje con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
