---
name: crm-hygiene
description: "CRM data hygiene: detect stale records, merge duplicates, fill missing fields, reassign ownership, run scheduled cleanup — HubSpot and Salesforce patterns"
---

> 🇫🇷 Version française. [English version](../crm-hygiene.md).

# Compétence Hygiène CRM

## Quand activer
- Votre CRM contient des contacts qui n'ont pas été touchés depuis des mois/années
- Les doublons polluent les rapports et les listes de prospection
- Les champs clés (téléphone, entreprise, intitulé de poste) sont manquants dans de nombreux enregistrements
- Préparation d'une campagne où la qualité des données est importante
- Exécution d'un nettoyage trimestriel ou annuel du CRM

## Quand NE PAS utiliser
- Validation des données en temps réel (intégrez-la plutôt dans vos formulaires d'entrée)
- Demandes de suppression RGPD — à traiter séparément avec des conseils juridiques
- Migration entre plateformes CRM — utilisez un outil de migration dédié

## Instructions

### Trouver les contacts obsolètes

```typescript
// API HubSpot — contacts sans activité depuis 90 jours
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

// Décision par contact obsolète :
// < 180 jours : séquence de réengagement
// 180–365 jours : passer au statut de cycle de vie 'froid'
// > 365 jours : archiver ou supprimer (avec vérification RGPD)
```

### Détecter et fusionner les doublons

```typescript
// Trouver les doublons probables par domaine d'e-mail + similarité de nom
async function findDuplicates(contacts: Contact[]): Promise<DuplicatePair[]> {
  const pairs: DuplicatePair[] = []
  const emailMap = new Map<string, Contact[]>()

  // Grouper par e-mail (exact)
  for (const c of contacts) {
    const key = c.email.toLowerCase()
    emailMap.set(key, [...(emailMap.get(key) ?? []), c])
  }

  // Signaler les doublons d'e-mail exacts
  for (const [email, dupes] of emailMap) {
    if (dupes.length > 1) {
      pairs.push({ type: 'exact_email', contacts: dupes, email })
    }
  }

  // Vérifier également : même nom + même entreprise (approximatif)
  // ... logique de similarité des noms ...

  return pairs
}

// Fusion HubSpot (conserver l'enregistrement avec le plus d'activité)
async function mergeContacts(primaryId: string, secondaryId: string) {
  await hubspot.crm.contacts.mergeApi.merge({
    primaryObjectId: primaryId,
    objectIdToMerge: secondaryId,
  })
}
```

### Remplir les champs manquants via l'enrichissement

```typescript
async function fillMissingFields(contactId: string, email: string) {
  const contact = await hubspot.crm.contacts.basicApi.getById(contactId, ['company', 'jobtitle', 'phone'])

  const missingFields = []
  if (!contact.properties.company) missingFields.push('company')
  if (!contact.properties.jobtitle) missingFields.push('jobtitle')

  if (missingFields.length === 0) return

  // Enrichir depuis une source externe
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

### Réaffectation de la propriété

```typescript
// Réaffecter les contacts des membres d'équipe partis
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
    await new Promise(r => setTimeout(r, 100)) // limite de débit
  }

  console.log(`Reassigned ${orphanedContacts.results.length} contacts`)
}
```

### Exécution planifiée de la maintenance (modèle cron)

```typescript
// Exécuter chaque semaine — dimanche soir
// 1. Trouver et signaler les contacts obsolètes
// 2. Trouver les doublons d'e-mail exacts
// 3. Remplir les 3 champs manquants les plus courants
// 4. Publier un résumé sur Slack

async function weeklyHygieneRun() {
  const report = {
    staleContacts: 0,
    duplicatesFound: 0,
    fieldsFilled: 0,
    errors: [] as string[],
  }

  // Étape 1 : Contacts obsolètes
  const stale = await findStaleContacts(90)
  report.staleContacts = stale.length
  await tagContactsForReview(stale, 'needs-review-stale')

  // Étape 2 : Doublons
  const allContacts = await getAllContacts()
  const dupes = await findDuplicates(allContacts)
  report.duplicatesFound = dupes.length
  await tagDuplicatesForReview(dupes)

  // Étape 3 : Enrichir les champs manquants les plus courants
  const incomplete = await getContactsMissingFields(['company', 'jobtitle'])
  for (const c of incomplete.slice(0, 50)) { // plafond à 50/exécution
    await fillMissingFields(c.id, c.properties.email)
    report.fieldsFilled++
  }

  // Publier sur Slack
  await postSlackSummary(report)
}
```

### Score de santé CRM

```typescript
// Évaluez la qualité de vos données CRM de 0 à 100
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

## Exemple

**Utilisateur :** Effectuez un passage mensuel de maintenance sur notre CRM HubSpot — trouvez les leads obsolètes, signalez les doublons, et publiez un rapport sur Slack chaque premier lundi.

**Résultat attendu :**
- `scripts/crm-hygiene.ts` — trouve les contacts obsolètes (90 jours), les doublons d'e-mail exacts, enrichit les 50 premiers champs d'entreprise manquants
- `scheduleHygieneRun()` — cron : `0 9 1 * 1` (premier lundi à 9h)
- Rapport Slack : "🧹 Hygiène CRM : 47 leads obsolètes signalés, 12 doublons détectés, 38 champs d'entreprise renseignés"

---

> **Travaillez avec nous :** Claudient est soutenu par [Uitbreiden](https://uitbreiden.com/) — nous construisons des produits IA et des solutions B2B avec des communautés de développeurs.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
