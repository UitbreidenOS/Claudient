---
name: sdr-agent
description: "AI SDR agent patterns: prospect research, personalised outreach, multi-step sequences, reply handling, meeting booking — with safety limits"
---

> 🇩🇪 Deutsche Version. [Englische Version](../sdr-agent.md).

# SDR-Agent-Kompetenz

## Wann aktivieren
- Aufbau eines KI-gestützten Sales-Development-Workflows
- Automatisierung von Prospect-Recherche und Outreach-Nachrichtengenerierung
- Einrichtung von Multi-Touch-E-Mail/LinkedIn-Sequenzen mit Claude
- Personalisierung von Outreach im großen Maßstab (kein einfaches Template-Tauschen — echter Kontext)
- Hinzufügen von Sicherheitslimits und menschlichen Genehmigungsschleusen zur Outreach-Automatisierung

## Wann NICHT verwenden
- Spam-Kampagnen — Volumen ohne Personalisierung schadet der Zustellbarkeit und dem Ruf
- LinkedIn-Automatisierung ohne Verständnis der Verbindungslimits (100-200/Woche max)
- Ersatz für menschlichen Beziehungsaufbau bei strategischen Accounts
- Regulierte Branchen mit strengen Kommunikations-Compliance-Anforderungen

## Anweisungen

### Die SDR-Agent-Schleife

```
Schritt 1: RECHERCHE      — Unternehmens-/Kontextdaten sammeln
Schritt 2: QUALIFIZIERUNG — Gegen ICP (Ideal Customer Profile) bewerten
Schritt 3: PERSONALISIERUNG — Nachricht mit echtem Kontext generieren
Schritt 4: MENSCH-SCHLEUSE — Entwurf zeigen, Genehmigung einholen (für erste Kontaktaufnahme)
Schritt 5: SENDEN         — Per E-Mail/LinkedIn zustellen
Schritt 6: TRACKING       — Aktivität protokollieren, Antworten bearbeiten
Schritt 7: FOLLOW-UP      — Sequenz nächsten Kontakt bei keiner Antwort
```

### Prospect-Recherche (bevor ein einziges Wort geschrieben wird)

```typescript
interface ProspectContext {
  name: string
  title: string
  company: string
  recentNews: string[]       // Finanzierungen, Produktstarts, Führungskräfteeinstellungen
  linkedInActivity: string[] // Aktuelle Posts, Kommentare
  techStack: string[]        // von BuiltWith, LinkedIn-Stellenanzeigen
  painPoints: string[]       // aus Kontext abgeleitet
  icpScore: number           // 0-100
}

async function researchProspect(email: string): Promise<ProspectContext> {
  const [contact, company, news] = await Promise.all([
    enrichContactFromEmail(email),          // Clearbit/Apollo/Hunter
    enrichCompanyFromDomain(getDomain(email)),
    searchRecentNews(company.name),         // Finanzierungen, Einstellungen, Produktneuigkeiten
  ])

  const icpScore = scoreICP(contact, company)
  const painPoints = await inferPainPoints(company, contact.title)

  return { ...contact, ...company, recentNews: news, icpScore, painPoints }
}
```

### ICP-Bewertung

```typescript
interface ICPCriteria {
  companySize: [number, number]  // [min, max] Mitarbeiter
  industries: string[]
  titles: string[]               // Entscheidungsträger-Rollen
  techStack: string[]            // verwendete Tools
  geographies: string[]
}

function scoreICP(contact: Contact, company: Company, criteria: ICPCriteria): number {
  let score = 0

  // Unternehmensgröße (30 Punkte)
  const [min, max] = criteria.companySize
  if (company.employees >= min && company.employees <= max) score += 30

  // Branchen-Übereinstimmung (25 Punkte)
  if (criteria.industries.some(i => company.industry.toLowerCase().includes(i))) score += 25

  // Titel/Seniorität (25 Punkte)
  if (criteria.titles.some(t => contact.title.toLowerCase().includes(t))) score += 25

  // Tech-Stack-Überschneidung (20 Punkte)
  const overlap = criteria.techStack.filter(t => company.techStack.includes(t))
  score += Math.min(20, overlap.length * 5)

  return score
}
```

### Personalisierte Nachrichtengenerierung

Der entscheidende Unterschied zwischen KI-Spam und echter Personalisierung ist **Spezifität**. Claude generiert Nachrichten, die genau darauf verweisen, was diesen Prospect gerade jetzt relevant macht.

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

### Multi-Schritt-Sequenzdesign

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
    message: 'Kurze Notiz mit Bezug auf die E-Mail — max. 2 Sätze',
    waitForReply: true,
  },
  {
    day: 7,
    channel: 'email',
    type: 'followup_1',
    subject: 'Re: {{original_subject}}',
    message: 'Neuen Mehrwert hinzufügen — Fallstudie, relevanter Datenpunkt',
    waitForReply: true,
  },
  {
    day: 14,
    channel: 'email',
    type: 'breakup',
    subject: 'Abschluss der Schleife',
    message: 'Anerkennen, dass sie beschäftigt sind. Tür offen lassen. Kein Schuldgefühl.',
    waitForReply: false,
  },
]
```

### Sicherheitslimits und Compliance

```typescript
const SAFETY_LIMITS = {
  linkedInConnectionsPerWeek: 100,    // LinkedIns Soft-Limit (SSI-Score-abhängig)
  emailsPerDay: 50,                   // pro Domain, um Spam-Markierung zu vermeiden
  minDelayBetweenMessages: 30_000,    // 30 Sekunden Minimum
  maxFollowUps: 3,                    // nie mehr als 4 Gesamtkontakte
  blacklistDomains: [                 // niemals kontaktieren
    'competitor.com',
    'investor.com',
  ],
  requireHumanApproval: true,         // Entwurf vor erstem Senden zeigen
}

function checkSafetyLimits(prospect: ProspectContext): SafetyResult {
  if (SAFETY_LIMITS.blacklistDomains.includes(getDomain(prospect.email))) {
    return { allowed: false, reason: 'Domain blacklisted' }
  }
  // Tägliche Sendeanzahl, wöchentliche LinkedIn-Anzahl usw. prüfen
  return { allowed: true }
}
```

### Menschliche Genehmigungsschleuse

```typescript
async function requestApproval(draft: OutreachDraft): Promise<boolean> {
  console.log('\n=== OUTREACH DRAFT FOR APPROVAL ===')
  console.log(`To:      ${draft.prospect.name} <${draft.prospect.email}>`)
  console.log(`Company: ${draft.prospect.company}`)
  console.log(`Score:   ${draft.prospect.icpScore}/100`)
  console.log(`\nSubject: ${draft.subject}`)
  console.log(`\n${draft.body}`)
  console.log('\nApprove? (y/n/edit): ')

  // Im CLI-Kontext den Benutzer auffordern
  // In einer Web-App im Review-Dashboard anzeigen
  const response = await getUserInput()
  return response.toLowerCase() === 'y'
}
```

### Antwortbearbeitung

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

## Beispiel

**Benutzer:** SDR-Agent aufbauen, der eine Liste von Startup-Gründern (Name + LinkedIn-URL) nimmt, jeden recherchiert, eine personalisierte Cold-E-Mail über unser Produkt (ein B2B-Analysetool) generiert und mir die Entwürfe zur Genehmigung zeigt, bevor sie gesendet werden.

**Erwartetes Ergebnis:**
- `src/sdr/research.ts` — `researchProspect()` von LinkedIn, Clearbit abrufend
- `src/sdr/qualify.ts` — `scoreICP()` gegen Startup-Gründer-Kriterien
- `src/sdr/generate.ts` — `generateOutreachEmail()` mit Claude, Bezug auf aktuelle Aktivitäten
- `src/sdr/approve.ts` — CLI-Genehmigungsschleife mit Entwurf + Prospect-Kontext
- `src/sdr/send.ts` — sendet über SendGrid/Resend bei Genehmigung, protokolliert in HubSpot
- Sicherheit: prüft Blacklist, respektiert 50/Tag-E-Mail-Limit, erfordert Genehmigung

---

> **Arbeiten Sie mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte und B2B-Lösungen mit Entwickler-Communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
