---
name: lead-enrichment
description: "Lead enrichment pipelines: web scraping to structured prospect profiles, company intelligence signals, CRM population — Firecrawl, Clearbit, Apollo patterns"
---

> 🇩🇪 Deutsche Version. [Englische Version](../lead-enrichment.md).

# Lead-Anreicherungs-Kompetenz

## Wann aktivieren
- Aufbau einer Pipeline, die eine rohe E-Mail/URL-Liste in umfangreiche Prospect-Profile umwandelt
- Scrapen von Unternehmenswebsites und LinkedIn für firmografische Daten
- Befüllung von HubSpot/Salesforce-Datensätzen aus externen Recherchen
- Generierung von ICP-Scores basierend auf angereicherten Unternehmensdaten
- Überwachung von Signalen (Finanzierungsrunden, Einstellungsschübe, Führungswechsel) für Account-Trigger

## Wann NICHT verwenden
- Einzelne Ad-hoc-Suchen — direkt Browser oder LinkedIn verwenden
- Bulk-B2C-Konsumentendaten — andere Vorschriften und Datenquellen
- Wenn verifizierte Daten bereits in Ihrem CRM sind — nicht unnötig re-anreichern

## Anweisungen

### Die Anreicherungspipeline

```
Roheingabe (E-Mail / Domain / LinkedIn-URL)
    ↓
Schritt 1: IDENTIFIZIEREN  — E-Mail zu Person + Unternehmen auflösen
Schritt 2: ANREICHERN      — Firmografische Daten abrufen (Unternehmen, Tech-Stack, Mitarbeiteranzahl)
Schritt 3: SIGNALPRÜFUNG   — Aktuelle Neuigkeiten, Finanzierungen, Einstellungen, Führungswechsel
Schritt 4: BEWERTEN        — ICP-Passungsscore
Schritt 5: SPEICHERN       — Upsert ins CRM mit angereicherten Feldern
```

### E-Mail → Personenauflösung

```typescript
// Verwendung der Hunter.io API
async function resolveEmailToPerson(email: string): Promise<PersonData | null> {
  const res = await fetch(
    `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_API_KEY}`
  )
  const data = await res.json()
  if (data.data.status !== 'valid') return null
  return {
    email,
    firstName: data.data.first_name,
    lastName: data.data.last_name,
    company: data.data.organization,
    domain: getDomain(email),
  }
}

// Verwendung von Apollo.io (reichhaltigere Daten)
async function enrichFromApollo(email: string) {
  const res = await fetch('https://api.apollo.io/v1/people/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.APOLLO_API_KEY! },
    body: JSON.stringify({ email }),
  })
  return res.json()
}
```

### Unternehmensanreicherung via Web-Scraping (Firecrawl)

```typescript
import FirecrawlApp from '@mendable/firecrawl-js'

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

async function enrichCompanyFromWebsite(domain: string): Promise<CompanyData> {
  // Unternehmenswebsite mit strukturierter Extraktion scrapen
  const result = await firecrawl.scrapeUrl(`https://${domain}`, {
    formats: ['extract'],
    extract: {
      schema: {
        type: 'object',
        properties: {
          companyName:    { type: 'string' },
          description:    { type: 'string' },
          industry:       { type: 'string' },
          products:       { type: 'array', items: { type: 'string' } },
          techStack:      { type: 'array', items: { type: 'string' } },
          teamSize:       { type: 'string' },
          founded:        { type: 'number' },
          headquarters:   { type: 'string' },
        },
      },
    },
  })

  return result.extract as CompanyData
}
```

### Signalerkennung (triggerbasiertes Outreach)

```typescript
async function detectTriggerSignals(company: string): Promise<TriggerSignal[]> {
  const signals: TriggerSignal[] = []

  // Finanzierungssignale — TechCrunch, Crunchbase prüfen
  const fundingNews = await searchRecentNews(`${company} funding round 2026`)
  if (fundingNews.length > 0) {
    signals.push({ type: 'funding', relevance: 0.9, context: fundingNews[0].title })
  }

  // Einstellungssignale — Engineering-Einstellungen deuten auf Wachstum/neue Projekte hin
  const hiringData = await checkLinkedInJobs(company)
  if (hiringData.engineeringJobCount > 10) {
    signals.push({ type: 'hiring_surge', relevance: 0.7, context: `${hiringData.engineeringJobCount} offene Engineering-Stellen` })
  }

  // Tech-Stack-Änderungen — neue Tools = neue Anforderungen
  const techChanges = await checkBuiltWithHistory(getDomain(company))
  if (techChanges.recentAdditions.length > 0) {
    signals.push({ type: 'tech_adoption', relevance: 0.6, context: `Hinzugefügt: ${techChanges.recentAdditions.join(', ')}` })
  }

  return signals.sort((a, b) => b.relevance - a.relevance)
}
```

### Claude-gestützte Profil-Synthese

```typescript
async function synthesiseProspectProfile(
  person: PersonData,
  company: CompanyData,
  signals: TriggerSignal[]
): Promise<ProspectProfile> {
  const { object } = await generateObject({
    model: anthropic('claude-opus-4-7'),
    schema: z.object({
      icpScore:         z.number().min(0).max(100),
      painPoints:       z.array(z.string()),
      outreachAngle:    z.string(),
      bestChannel:      z.enum(['email', 'linkedin', 'cold_call']),
      bestTiming:       z.string(),
      notAGoodFit:      z.boolean(),
      notAGoodFitReason: z.string().optional(),
    }),
    prompt: `Analyse this prospect for a ${process.env.OUR_PRODUCT_DESCRIPTION}.

Person: ${person.firstName} ${person.lastName}, ${person.jobTitle} at ${company.companyName}
Company: ${company.description}. ${company.teamSize} employees. ${company.industry}.
Tech stack: ${company.techStack.join(', ')}
Recent signals: ${signals.map(s => s.context).join('; ')}

Score their ICP fit, identify pain points we can solve, and suggest the best outreach angle.`,
  })

  return { ...person, ...company, signals, ...object }
}
```

### Vollständige Pipeline

```typescript
async function enrichLeadList(emails: string[]): Promise<EnrichedLead[]> {
  const results: EnrichedLead[] = []

  for (const email of emails) {
    try {
      console.log(`Enriching ${email}...`)

      const [person, company] = await Promise.all([
        resolveEmailToPerson(email),
        enrichCompanyFromWebsite(getDomain(email)),
      ])

      if (!person || !company) {
        results.push({ email, status: 'not_found' })
        continue
      }

      const signals = await detectTriggerSignals(company.companyName)
      const profile = await synthesiseProspectProfile(person, company, signals)

      // Upsert zu HubSpot
      await upsertHubSpotContact(email, profile)

      results.push({ email, status: 'enriched', profile })

      // Ratenlimitierung
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      results.push({ email, status: 'error', error: err.message })
    }
  }

  return results
}
```

## Beispiel

**Benutzer:** Pipeline aufbauen, die 50 Unternehmensdomains aus einer CSV nimmt, jede Website nach Unternehmensdaten scrapt, Finanzierungs- und Einstellungssignale erkennt, ICP-Passung bewertet und Ergebnisse zu HubSpot schiebt.

**Erwartetes Ergebnis:**
- `scripts/enrich-pipeline.ts` — liest domains.csv, führt Anreicherung durch, schreibt results.json
- `enrichCompanyFromWebsite(domain)` — strukturierte Firecrawl-Extraktion
- `detectTriggerSignals(company)` — Finanzierungs- + Einstellungs- + Tech-Signale
- `scoreICP(company, criteria)` — Score 0-100
- `upsertHubSpotContact(email, enrichedData)` — erstellt/aktualisiert CRM-Datensätze
- Fortschrittsprotokollierung, Fehlererfassung in `failed-enrichments.csv`

---

> **Arbeiten Sie mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte und B2B-Lösungen mit Entwickler-Communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
