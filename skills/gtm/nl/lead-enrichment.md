---
name: lead-enrichment
description: "Lead enrichment pipelines: web scraping to structured prospect profiles, company intelligence signals, CRM population — Firecrawl, Clearbit, Apollo patterns"
---

> 🇳🇱 Nederlandse versie. [Engelse versie](../lead-enrichment.md).

# Lead-verrijkingsvaardigheid

## Wanneer activeren
- Een pipeline bouwen die een ruwe e-mail/URL-lijst omzet in rijke prospectprofielen
- Bedrijfswebsites en LinkedIn schrapen voor firmografische gegevens
- HubSpot/Salesforce-records vullen vanuit extern onderzoek
- ICP-scores genereren op basis van verrijkte bedrijfsgegevens
- Signalen bewaken (financieringsrondes, aanwervingsgolven, directiewisselingen) voor accounttriggers

## Wanneer NIET gebruiken
- Enkelvoudige ad-hoc-zoekopdrachten — gebruik rechtstreeks een browser of LinkedIn
- Bulk-B2C-consumentengegevens — andere regelgeving en gegevensbronnen
- Wanneer geverifieerde gegevens al in uw CRM staan — niet onnodig opnieuw verrijken

## Instructies

### De verrijkingspipeline

```
Ruwe invoer (e-mail / domein / LinkedIn-URL)
    ↓
Stap 1: IDENTIFICEREN  — e-mail omzetten naar persoon + bedrijf
Stap 2: VERRIJKEN      — firmografische gegevens ophalen (bedrijf, tech stack, personeelsbestand)
Stap 3: SIGNAALCHECK   — recent nieuws, financiering, aanwervingen, directiewisselingen
Stap 4: SCOREN         — ICP-geschiktheidsscore
Stap 5: OPSLAAN        — upsert naar CRM met verrijkte velden
```

### E-mail → persoonsresolutie

```typescript
// De Hunter.io API gebruiken
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

// Apollo.io gebruiken (rijkere gegevens)
async function enrichFromApollo(email: string) {
  const res = await fetch('https://api.apollo.io/v1/people/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.APOLLO_API_KEY! },
    body: JSON.stringify({ email }),
  })
  return res.json()
}
```

### Bedrijfsverrijking via web scraping (Firecrawl)

```typescript
import FirecrawlApp from '@mendable/firecrawl-js'

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

async function enrichCompanyFromWebsite(domain: string): Promise<CompanyData> {
  // De bedrijfswebsite scrapen met gestructureerde extractie
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

### Signaaldetectie (triggergebaseerde outreach)

```typescript
async function detectTriggerSignals(company: string): Promise<TriggerSignal[]> {
  const signals: TriggerSignal[] = []

  // Financieringssignalen — TechCrunch, Crunchbase controleren
  const fundingNews = await searchRecentNews(`${company} funding round 2026`)
  if (fundingNews.length > 0) {
    signals.push({ type: 'funding', relevance: 0.9, context: fundingNews[0].title })
  }

  // Aanwervingssignalen — technische aanwervingen suggereren groei/nieuwe projecten
  const hiringData = await checkLinkedInJobs(company)
  if (hiringData.engineeringJobCount > 10) {
    signals.push({ type: 'hiring_surge', relevance: 0.7, context: `${hiringData.engineeringJobCount} open technische functies` })
  }

  // Tech-stack-wijzigingen — nieuwe tools = nieuwe behoeften
  const techChanges = await checkBuiltWithHistory(getDomain(company))
  if (techChanges.recentAdditions.length > 0) {
    signals.push({ type: 'tech_adoption', relevance: 0.6, context: `Toegevoegd: ${techChanges.recentAdditions.join(', ')}` })
  }

  return signals.sort((a, b) => b.relevance - a.relevance)
}
```

### Claude-aangedreven profielsynthese

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

### Volledige pipeline

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

      // Upsert naar HubSpot
      await upsertHubSpotContact(email, profile)

      results.push({ email, status: 'enriched', profile })

      // Snelheidslimitering
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      results.push({ email, status: 'error', error: err.message })
    }
  }

  return results
}
```

## Voorbeeld

**Gebruiker:** Bouw een pipeline die 50 bedrijfsdomeinen uit een CSV neemt, elke website scrapt voor bedrijfsgegevens, financierings- en aanwervingssignalen detecteert, ICP-geschiktheid scoort en resultaten naar HubSpot pusht.

**Verwachte uitvoer:**
- `scripts/enrich-pipeline.ts` — leest domains.csv, voert verrijking uit, schrijft results.json
- `enrichCompanyFromWebsite(domain)` — gestructureerde Firecrawl-extractie
- `detectTriggerSignals(company)` — financierings- + aanwervings- + techsignalen
- `scoreICP(company, criteria)` — score 0-100
- `upsertHubSpotContact(email, enrichedData)` — maakt/bijwerkt CRM-records
- Voortgangsloggen, foutregistratie in `failed-enrichments.csv`

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
