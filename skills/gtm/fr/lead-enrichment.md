---
name: lead-enrichment
description: "Lead enrichment pipelines: web scraping to structured prospect profiles, company intelligence signals, CRM population — Firecrawl, Clearbit, Apollo patterns"
---

> 🇫🇷 Version française. [English version](../lead-enrichment.md).

# Compétence Enrichissement de Leads

## Quand activer
- Construire un pipeline qui transforme une liste brute d'e-mails/URL en profils de prospects enrichis
- Scraper des sites web d'entreprises et LinkedIn pour des données firmographiques
- Remplir des enregistrements HubSpot/Salesforce à partir de recherches externes
- Générer des scores ICP basés sur des données d'entreprise enrichies
- Surveiller des signaux (tours de financement, pics de recrutement, changements de direction) pour des déclencheurs de comptes

## Quand NE PAS utiliser
- Recherches ponctuelles ad-hoc — utiliser directement un navigateur ou LinkedIn
- Données B2C grand public en masse — réglementations et sources de données différentes
- Quand des données vérifiées sont déjà dans votre CRM — ne pas ré-enrichir inutilement

## Instructions

### Le pipeline d'enrichissement

```
Entrée brute (e-mail / domaine / URL LinkedIn)
    ↓
Étape 1 : IDENTIFICATION  — résoudre l'e-mail en personne + entreprise
Étape 2 : ENRICHISSEMENT  — récupérer des données firmographiques (entreprise, tech stack, effectif)
Étape 3 : VÉRIFICATION SIGNAUX — actualités récentes, financement, recrutement, changements de direction
Étape 4 : NOTATION        — score d'adéquation ICP
Étape 5 : STOCKAGE        — upsert vers le CRM avec les champs enrichis
```

### E-mail → résolution de personne

```typescript
// Utilisation de l'API Hunter.io
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

// Utilisation d'Apollo.io (données plus riches)
async function enrichFromApollo(email: string) {
  const res = await fetch('https://api.apollo.io/v1/people/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.APOLLO_API_KEY! },
    body: JSON.stringify({ email }),
  })
  return res.json()
}
```

### Enrichissement d'entreprise via scraping web (Firecrawl)

```typescript
import FirecrawlApp from '@mendable/firecrawl-js'

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

async function enrichCompanyFromWebsite(domain: string): Promise<CompanyData> {
  // Scraper le site web de l'entreprise avec extraction structurée
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

### Détection de signaux (prospection basée sur les déclencheurs)

```typescript
async function detectTriggerSignals(company: string): Promise<TriggerSignal[]> {
  const signals: TriggerSignal[] = []

  // Signaux de financement — vérifier TechCrunch, Crunchbase
  const fundingNews = await searchRecentNews(`${company} funding round 2026`)
  if (fundingNews.length > 0) {
    signals.push({ type: 'funding', relevance: 0.9, context: fundingNews[0].title })
  }

  // Signaux de recrutement — les embauches en ingénierie suggèrent croissance/nouveaux projets
  const hiringData = await checkLinkedInJobs(company)
  if (hiringData.engineeringJobCount > 10) {
    signals.push({ type: 'hiring_surge', relevance: 0.7, context: `${hiringData.engineeringJobCount} postes d'ingénierie ouverts` })
  }

  // Changements de tech stack — nouveaux outils = nouveaux besoins
  const techChanges = await checkBuiltWithHistory(getDomain(company))
  if (techChanges.recentAdditions.length > 0) {
    signals.push({ type: 'tech_adoption', relevance: 0.6, context: `Ajouté : ${techChanges.recentAdditions.join(', ')}` })
  }

  return signals.sort((a, b) => b.relevance - a.relevance)
}
```

### Synthèse de profil de prospect par Claude

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

### Pipeline complet

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

      // Upsert vers HubSpot
      await upsertHubSpotContact(email, profile)

      results.push({ email, status: 'enriched', profile })

      // Limitation de débit
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      results.push({ email, status: 'error', error: err.message })
    }
  }

  return results
}
```

## Exemple

**Utilisateur :** Construire un pipeline qui prend 50 domaines d'entreprises depuis un CSV, scrape chaque site web pour les données d'entreprise, détecte les signaux de financement et de recrutement, note l'adéquation ICP, et pousse les résultats vers HubSpot.

**Résultat attendu :**
- `scripts/enrich-pipeline.ts` — lit domains.csv, exécute l'enrichissement, écrit results.json
- `enrichCompanyFromWebsite(domain)` — extraction structurée Firecrawl
- `detectTriggerSignals(company)` — signaux de financement + recrutement + technologie
- `scoreICP(company, criteria)` — score 0-100
- `upsertHubSpotContact(email, enrichedData)` — crée/met à jour les enregistrements CRM
- Journal de progression, capture d'erreurs dans `failed-enrichments.csv`

---

> **Travaillez avec nous :** Claudient est soutenu par [Uitbreiden](https://uitbreiden.com/) — nous créons des produits IA et des solutions B2B avec des communautés de développeurs.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
