---
name: sdr-agent
description: "AI SDR agent patterns: prospect research, personalised outreach, multi-step sequences, reply handling, meeting booking — with safety limits"
---

> 🇳🇱 Nederlandse versie. [Engelse versie](../sdr-agent.md).

# SDR-agent-vaardigheid

## Wanneer activeren
- Een AI-aangedreven sales development-workflow bouwen
- Prospectonderzoek en het genereren van outreach-berichten automatiseren
- Multi-touch e-mail/LinkedIn-sequenties instellen met Claude
- Outreach op schaal personaliseren (geen simpele sjabloonvervanging — echte context)
- Veiligheidslimieten en menselijke goedkeuringspoorten toevoegen aan outreach-automatisering

## Wanneer NIET gebruiken
- Spamcampagnes — volume zonder personalisering schaadt de deliverability en reputatie
- LinkedIn-automatisering zonder begrip van verbindingslimieten (100-200/week max)
- Vervanging van menselijke relatieopbouw bij strategische accounts
- Gereguleerde sectoren met strikte communicatie-compliancevereisten

## Instructies

### De SDR-agentlus

```
Stap 1: ONDERZOEK       — bedrijfs-/contactcontext verzamelen
Stap 2: KWALIFICATIE    — scoren tegen ICP (Ideaal Klantprofiel)
Stap 3: PERSONALISATIE  — bericht genereren met authentieke context
Stap 4: MENSELIJKE POORT — concept tonen, goedkeuring krijgen (voor eerste outreach)
Stap 5: VERZENDEN       — leveren via e-mail/LinkedIn
Stap 6: BIJHOUDEN       — activiteit vastleggen, antwoorden verwerken
Stap 7: OPVOLGEN        — sequentie volgende contact als geen antwoord
```

### Prospectonderzoek (voordat een enkel woord wordt geschreven)

```typescript
interface ProspectContext {
  name: string
  title: string
  company: string
  recentNews: string[]       // financiering, productlanceringen, nieuwe directieleden
  linkedInActivity: string[] // recente berichten, reacties
  techStack: string[]        // van BuiltWith, LinkedIn-vacatures
  painPoints: string[]       // afgeleid uit context
  icpScore: number           // 0-100
}

async function researchProspect(email: string): Promise<ProspectContext> {
  const [contact, company, news] = await Promise.all([
    enrichContactFromEmail(email),          // Clearbit/Apollo/Hunter
    enrichCompanyFromDomain(getDomain(email)),
    searchRecentNews(company.name),         // financiering, aanwervingen, productnieuws
  ])

  const icpScore = scoreICP(contact, company)
  const painPoints = await inferPainPoints(company, contact.title)

  return { ...contact, ...company, recentNews: news, icpScore, painPoints }
}
```

### ICP-scoring

```typescript
interface ICPCriteria {
  companySize: [number, number]  // [min, max] medewerkers
  industries: string[]
  titles: string[]               // besluitvormersrollen
  techStack: string[]            // tools die ze gebruiken
  geographies: string[]
}

function scoreICP(contact: Contact, company: Company, criteria: ICPCriteria): number {
  let score = 0

  // Bedrijfsgrootte (30 punten)
  const [min, max] = criteria.companySize
  if (company.employees >= min && company.employees <= max) score += 30

  // Branche-overeenkomst (25 punten)
  if (criteria.industries.some(i => company.industry.toLowerCase().includes(i))) score += 25

  // Titel/senioriteit (25 punten)
  if (criteria.titles.some(t => contact.title.toLowerCase().includes(t))) score += 25

  // Tech-stack-overlap (20 punten)
  const overlap = criteria.techStack.filter(t => company.techStack.includes(t))
  score += Math.min(20, overlap.length * 5)

  return score
}
```

### Gepersonaliseerde berichtgeneratie

Het belangrijkste verschil tussen AI-spam en echte personalisering is **specificiteit**. Claude genereert berichten die precies verwijzen naar wat deze prospect op dit moment relevant maakt.

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

### Multi-stap sequentieontwerp

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
    message: 'Korte notitie met verwijzing naar de e-mail — max. 2 zinnen',
    waitForReply: true,
  },
  {
    day: 7,
    channel: 'email',
    type: 'followup_1',
    subject: 'Re: {{original_subject}}',
    message: 'Nieuwe waarde toevoegen — casestudy, relevant datapunt',
    waitForReply: true,
  },
  {
    day: 14,
    channel: 'email',
    type: 'breakup',
    subject: 'De lus sluiten',
    message: 'Erkennen dat ze het druk hebben. Deur open laten. Geen schuldgevoel.',
    waitForReply: false,
  },
]
```

### Veiligheidslimieten en naleving

```typescript
const SAFETY_LIMITS = {
  linkedInConnectionsPerWeek: 100,    // LinkedIns zachte limiet (SSI-score-afhankelijk)
  emailsPerDay: 50,                   // per domein, om spammarkering te vermijden
  minDelayBetweenMessages: 30_000,    // 30 seconden minimum
  maxFollowUps: 3,                    // nooit meer dan 4 totale contacten
  blacklistDomains: [                 // nooit contact opnemen
    'competitor.com',
    'investor.com',
  ],
  requireHumanApproval: true,         // concept tonen vóór eerste verzending
}

function checkSafetyLimits(prospect: ProspectContext): SafetyResult {
  if (SAFETY_LIMITS.blacklistDomains.includes(getDomain(prospect.email))) {
    return { allowed: false, reason: 'Domain blacklisted' }
  }
  // Dagelijks verzendaantal, wekelijks LinkedIn-aantal etc. controleren
  return { allowed: true }
}
```

### Menselijke goedkeuringspoort

```typescript
async function requestApproval(draft: OutreachDraft): Promise<boolean> {
  console.log('\n=== OUTREACH DRAFT FOR APPROVAL ===')
  console.log(`To:      ${draft.prospect.name} <${draft.prospect.email}>`)
  console.log(`Company: ${draft.prospect.company}`)
  console.log(`Score:   ${draft.prospect.icpScore}/100`)
  console.log(`\nSubject: ${draft.subject}`)
  console.log(`\n${draft.body}`)
  console.log('\nApprove? (y/n/edit): ')

  // In een CLI-context de gebruiker vragen
  // In een webapp tonen in een reviewdashboard
  const response = await getUserInput()
  return response.toLowerCase() === 'y'
}
```

### Antwoordverwerking

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

## Voorbeeld

**Gebruiker:** Bouw een SDR-agent die een lijst van startup-oprichters (naam + LinkedIn-URL) neemt, elk onderzoekt, een gepersonaliseerde koude e-mail genereert over ons product (een B2B-analysetool), en mij de concepten toont ter goedkeuring voordat ze worden verzonden.

**Verwachte uitvoer:**
- `src/sdr/research.ts` — `researchProspect()` haalt op van LinkedIn, Clearbit
- `src/sdr/qualify.ts` — `scoreICP()` tegen startup-oprichtercriteria
- `src/sdr/generate.ts` — `generateOutreachEmail()` met Claude, verwijzend naar recente activiteit
- `src/sdr/approve.ts` — CLI-goedkeuringslus met concept + prospectcontext
- `src/sdr/send.ts` — verzendt via SendGrid/Resend bij goedkeuring, logt in HubSpot
- Veiligheid: controleert blacklist, respecteert 50/dag e-maillimiet, vereist goedkeuring

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
