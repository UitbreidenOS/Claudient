---
name: lead-enrichment
description: "Lead enrichment pipelines: web scraping to structured prospect profiles, company intelligence signals, CRM population — Firecrawl, Clearbit, Apollo patterns"
---

> 🇪🇸 Versión en español. [Versión en inglés](../lead-enrichment.md).

# Habilidad de Enriquecimiento de Leads

## Cuándo activar
- Construir un pipeline que convierte una lista bruta de correos electrónicos/URL en perfiles de prospectos enriquecidos
- Extraer datos de sitios web de empresas y LinkedIn para datos firmográficos
- Poblar registros de HubSpot/Salesforce a partir de investigación externa
- Generar puntuaciones ICP basadas en datos de empresa enriquecidos
- Monitorear señales (rondas de financiamiento, oleadas de contratación, cambios ejecutivos) para disparadores de cuentas

## Cuándo NO usar
- Búsquedas puntuales ad-hoc — usar directamente un navegador o LinkedIn
- Datos masivos de consumidores B2C — regulaciones y fuentes de datos diferentes
- Cuando datos verificados ya están en su CRM — no re-enriquecer innecesariamente

## Instrucciones

### El pipeline de enriquecimiento

```
Entrada bruta (correo electrónico / dominio / URL de LinkedIn)
    ↓
Paso 1: IDENTIFICAR    — resolver correo electrónico a persona + empresa
Paso 2: ENRIQUECER     — obtener datos firmográficos (empresa, tech stack, plantilla)
Paso 3: VERIFICAR SEÑALES — noticias recientes, financiamiento, contrataciones, cambios ejecutivos
Paso 4: PUNTUAR        — puntuación de ajuste ICP
Paso 5: ALMACENAR      — upsert al CRM con campos enriquecidos
```

### Correo electrónico → resolución de persona

```typescript
// Usando la API de Hunter.io
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

// Usando Apollo.io (datos más ricos)
async function enrichFromApollo(email: string) {
  const res = await fetch('https://api.apollo.io/v1/people/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.APOLLO_API_KEY! },
    body: JSON.stringify({ email }),
  })
  return res.json()
}
```

### Enriquecimiento de empresa mediante web scraping (Firecrawl)

```typescript
import FirecrawlApp from '@mendable/firecrawl-js'

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

async function enrichCompanyFromWebsite(domain: string): Promise<CompanyData> {
  // Extraer el sitio web de la empresa con extracción estructurada
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

### Detección de señales (contacto basado en disparadores)

```typescript
async function detectTriggerSignals(company: string): Promise<TriggerSignal[]> {
  const signals: TriggerSignal[] = []

  // Señales de financiamiento — verificar TechCrunch, Crunchbase
  const fundingNews = await searchRecentNews(`${company} funding round 2026`)
  if (fundingNews.length > 0) {
    signals.push({ type: 'funding', relevance: 0.9, context: fundingNews[0].title })
  }

  // Señales de contratación — las contrataciones de ingeniería sugieren crecimiento/nuevos proyectos
  const hiringData = await checkLinkedInJobs(company)
  if (hiringData.engineeringJobCount > 10) {
    signals.push({ type: 'hiring_surge', relevance: 0.7, context: `${hiringData.engineeringJobCount} puestos de ingeniería abiertos` })
  }

  // Cambios en tech stack — nuevas herramientas = nuevas necesidades
  const techChanges = await checkBuiltWithHistory(getDomain(company))
  if (techChanges.recentAdditions.length > 0) {
    signals.push({ type: 'tech_adoption', relevance: 0.6, context: `Agregado: ${techChanges.recentAdditions.join(', ')}` })
  }

  return signals.sort((a, b) => b.relevance - a.relevance)
}
```

### Síntesis de perfil de prospecto con Claude

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

### Pipeline completo

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

      // Upsert a HubSpot
      await upsertHubSpotContact(email, profile)

      results.push({ email, status: 'enriched', profile })

      // Limitación de velocidad
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      results.push({ email, status: 'error', error: err.message })
    }
  }

  return results
}
```

## Ejemplo

**Usuario:** Construir un pipeline que tome 50 dominios de empresa de un CSV, extraiga cada sitio web para datos de empresa, detecte señales de financiamiento y contratación, puntúe el ajuste ICP y envíe los resultados a HubSpot.

**Resultado esperado:**
- `scripts/enrich-pipeline.ts` — lee domains.csv, ejecuta enriquecimiento, escribe results.json
- `enrichCompanyFromWebsite(domain)` — extracción estructurada de Firecrawl
- `detectTriggerSignals(company)` — señales de financiamiento + contratación + tecnología
- `scoreICP(company, criteria)` — puntuación 0-100
- `upsertHubSpotContact(email, enrichedData)` — crea/actualiza registros del CRM
- Registro de progreso, captura de errores en `failed-enrichments.csv`

---

> **Trabaje con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
