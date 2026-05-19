---
name: crm-hygiene
description: "CRM data hygiene: detect stale records, merge duplicates, fill missing fields, reassign ownership, run scheduled cleanup — HubSpot and Salesforce patterns"
---

> 🇩🇪 Deutsche Version. [Englische Version](../crm-hygiene.md).

# Skill: CRM-Datenhygiene

## Wann aktivieren
- Ihr CRM enthält Kontakte, die seit Monaten/Jahren nicht mehr berührt wurden
- Doppelte Einträge verschmutzen Berichte und Outreach-Listen
- Schlüsselfelder (Telefon, Unternehmen, Berufsbezeichnung) fehlen bei vielen Datensätzen
- Vorbereitung einer Kampagne, bei der Datenqualität wichtig ist
- Durchführung einer vierteljährlichen oder jährlichen CRM-Bereinigung

## Wann NICHT verwenden
- Echtzeit-Datenvalidierung (diese lieber in Ihre Eingabeformulare integrieren)
- DSGVO/Datenlöschungsanfragen — separat mit Rechtsberatung bearbeiten
- Migration zwischen CRM-Plattformen — ein dediziertes Migrationstool verwenden

## Anweisungen

### Veraltete Kontakte finden

```typescript
// HubSpot API — Kontakte ohne Aktivität seit 90 Tagen
const staleContacts = await hubspot.crm.contacts.searchApi.doSearch({
  filterGroups: [{
    filters: [
      {
        propertyName: 'hs_last_sales_activity_date',
        operator: 'LT',
        value: String(Date.now() - 90 * 86400000),
      },
      {
        propertyName: 'lifecyclestage',
        operator: 'EQ',
        value: 'lead',
      },
    ],
  }],
  properties: ['email', 'firstname', 'lastname', 'company', 'hs_last_sales_activity_date'],
  limit: 100,
})

// Entscheidung pro veralteten Kontakt:
// < 180 Tage: Reaktivierungssequenz
// 180–365 Tage: in Lebenszyklusphase 'kalt' verschieben
// > 365 Tage: archivieren oder löschen (mit DSGVO-Prüfung)
```

### Duplikate erkennen und zusammenführen

```typescript
// Wahrscheinliche Duplikate nach E-Mail-Domäne + Namensähnlichkeit finden
async function findDuplicates(contacts: Contact[]): Promise<DuplicatePair[]> {
  const pairs: DuplicatePair[] = []
  const emailMap = new Map<string, Contact[]>()

  // Nach E-Mail gruppieren (exakt)
  for (const c of contacts) {
    const key = c.email.toLowerCase()
    emailMap.set(key, [...(emailMap.get(key) ?? []), c])
  }

  // Exakte E-Mail-Duplikate markieren
  for (const [email, dupes] of emailMap) {
    if (dupes.length > 1) {
      pairs.push({ type: 'exact_email', contacts: dupes, email })
    }
  }

  // Auch prüfen: gleicher Name + gleiches Unternehmen (fuzzy)
  // ... Namensähnlichkeitslogik ...

  return pairs
}

// HubSpot-Zusammenführung (Datensatz mit meisten Aktivitäten behalten)
async function mergeContacts(primaryId: string, secondaryId: string) {
  await hubspot.crm.contacts.mergeApi.merge({
    primaryObjectId: primaryId,
    objectIdToMerge: secondaryId,
  })
}
```

### Fehlende Felder durch Anreicherung füllen

```typescript
async function fillMissingFields(contactId: string, email: string) {
  const contact = await hubspot.crm.contacts.basicApi.getById(contactId, ['company', 'jobtitle', 'phone'])

  const missingFields = []
  if (!contact.properties.company) missingFields.push('company')
  if (!contact.properties.jobtitle) missingFields.push('jobtitle')

  if (missingFields.length === 0) return

  // Von externer Quelle anreichern
  const enriched = await clearbit.enrichment.find({ email })

  const updates: Record<string, string> = {}
  if (!contact.properties.company && enriched?.company?.name) {
    updates.company = enriched.company.name
  }
  if (!contact.properties.jobtitle && enriched?.person?.employment?.title) {
    updates.jobtitle = enriched.person.employment.title
  }

  if (Object.keys(updates).length > 0) {
    await hubspot.crm.contacts.basicApi.update(contactId, { properties: updates })
  }
}
```

### Eigentümer-Neuzuweisung

```typescript
// Kontakte von ausgeschiedenen Teammitgliedern neu zuweisen
async function reassignContacts(fromOwnerId: string, toOwnerId: string) {
  const orphanedContacts = await hubspot.crm.contacts.searchApi.doSearch({
    filterGroups: [{
      filters: [{ propertyName: 'hubspot_owner_id', operator: 'EQ', value: fromOwnerId }],
    }],
    properties: ['email', 'firstname', 'lastname'],
    limit: 100,
  })

  for (const contact of orphanedContacts.results) {
    await hubspot.crm.contacts.basicApi.update(contact.id, {
      properties: { hubspot_owner_id: toOwnerId },
    })
    await new Promise(r => setTimeout(r, 100)) // Rate-Limit
  }

  console.log(`Reassigned ${orphanedContacts.results.length} contacts`)
}
```

### Geplanter Hygiene-Lauf (Cron-Muster)

```typescript
// Wöchentlich ausführen — Sonntagabend
// 1. Veraltete Kontakte finden und markieren
// 2. Exakte E-Mail-Duplikate finden
// 3. Die 3 häufigsten fehlenden Felder füllen
// 4. Zusammenfassung an Slack senden

async function weeklyHygieneRun() {
  const report = {
    staleContacts: 0,
    duplicatesFound: 0,
    fieldsFilled: 0,
    errors: [] as string[],
  }

  // Schritt 1: Veraltete Kontakte
  const stale = await findStaleContacts(90)
  report.staleContacts = stale.length
  await tagContactsForReview(stale, 'needs-review-stale')

  // Schritt 2: Duplikate
  const allContacts = await getAllContacts()
  const dupes = await findDuplicates(allContacts)
  report.duplicatesFound = dupes.length
  await tagDuplicatesForReview(dupes)

  // Schritt 3: Häufigste fehlende Felder anreichern
  const incomplete = await getContactsMissingFields(['company', 'jobtitle'])
  for (const c of incomplete.slice(0, 50)) { // max 50/Lauf
    await fillMissingFields(c.id, c.properties.email)
    report.fieldsFilled++
  }

  // An Slack senden
  await postSlackSummary(report)
}
```

### CRM-Gesundheitsscore

```typescript
// CRM-Datenqualität von 0-100 bewerten
function calculateCRMHealthScore(contacts: Contact[]): number {
  const scores = contacts.map(c => {
    let score = 0
    if (c.email) score += 20
    if (c.company) score += 15
    if (c.jobtitle) score += 15
    if (c.phone) score += 10
    if (c.lifecyclestage) score += 15
    if (c.hubspot_owner_id) score += 10
    if (c.hs_last_sales_activity_date) score += 15
    return score
  })

  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}
```

## Beispiel

**Benutzer:** Führen Sie eine monatliche Hygiene-Runde in unserem HubSpot CRM durch — veraltete Leads finden, Duplikate markieren und jeden ersten Montag einen Bericht an Slack senden.

**Erwartete Ausgabe:**
- `scripts/crm-hygiene.ts` — findet veraltete Kontakte (90 Tage), exakte E-Mail-Duplikate, reichert die 50 häufigsten fehlenden Unternehmensfelder an
- `scheduleHygieneRun()` — cron: `0 9 1 * 1` (erster Montag um 9 Uhr)
- Slack-Bericht: "🧹 CRM-Hygiene: 47 veraltete Leads markiert, 12 Duplikate gefunden, 38 Unternehmensfelder befüllt"

---

> **Arbeiten Sie mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte und B2B-Lösungen mit Entwicklergemeinschaften.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
