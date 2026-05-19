---
name: hubspot
description: "HubSpot CRM automation: MCP server setup, contacts/deals/tickets via API, data enrichment pipelines, CRM workflows — the official Anthropic-HubSpot integration"
---

> 🇳🇱 Nederlandse versie. [Engelse versie](../hubspot.md).

# HubSpot-vaardigheid

## Wanneer activeren
- Het officiële HubSpot MCP-server instellen voor Claude Code
- HubSpot CRM-gegevens lezen of schrijven (contacten, bedrijven, deals, tickets, notities)
- Een lead-verrijkingspipeline bouwen die HubSpot-records vult
- Deal-stage-updates automatiseren op basis van externe triggers
- Contacten en notities aanmaken vanuit onderzoek of vergaderresultaten
- CRM-hygiëne uitvoeren: deduplicatie, ontbrekende velden, verouderde records

## Wanneer NIET gebruiken
- Salesforce CRM — andere API en objectmodel
- Eenvoudige Stripe/betalingsgegevens — gebruik de Stripe-vaardigheid
- Wanneer u realtime event-webhooks van HubSpot nodig heeft — gebruik een webhook-ontvanger endpoint

## Instructies

### Instelling — HubSpot MCP-server (officieel)

HubSpot heeft een officiële MCP-server. Er zijn drie manieren om verbinding te maken:

**Optie 1: OAuth-connector (eenvoudigste — Claude.ai desktop)**
1. Claude.ai → Instellingen → Integraties → HubSpot → Verbinden
2. Authenticeren met uw HubSpot-account
3. Claude kan nu uw CRM native lezen/schrijven

**Optie 2: MCP-server (Claude Code — programmatisch)**
```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
      }
    }
  }
}
```

Uw toegangstoken ophalen: HubSpot → Instellingen → Integraties → Privé-apps → Privé-app aanmaken. Vereiste bereiken: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.companies.read`, `crm.objects.deals.read`, `crm.objects.deals.write`.

**Optie 3: Directe HubSpot API (scripts/automatiseringen)**
```typescript
import { Client } from '@hubspot/api-client'

const hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })
```

### Beschikbare MCP-tools (via de MCP-server)

| Tool | Wat het doet |
|------|-------------|
| `search_contacts` | Contacten zoeken op e-mail, naam, bedrijf of eigenschappen |
| `get_contact` | Volledig contactrecord ophalen op ID |
| `create_contact` | Nieuw contact aanmaken met eigenschappen |
| `update_contact` | Contacteigenschappen bijwerken |
| `search_companies` | Bedrijven zoeken op naam, domein, branche |
| `create_company` | Nieuw bedrijf aanmaken |
| `get_deals` | Deals weergeven, filteren op stage of eigenaar |
| `create_deal` | Nieuwe deal aanmaken met koppelingen |
| `create_note` | Notitie toevoegen aan een contact, bedrijf of deal |
| `create_ticket` | Supportticket aanmaken |

### Veelvoorkomende patronen

**Contact aanmaken of bijwerken (upsert):**
```typescript
// Eerst zoeken, aanmaken als niet gevonden
async function upsertContact(email: string, props: Partial<Contact>) {
  const existing = await hubspot.crm.contacts.searchApi.doSearch({
    filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
    properties: ['email', 'firstname', 'lastname', 'company'],
    limit: 1,
  })

  if (existing.results.length > 0) {
    return hubspot.crm.contacts.basicApi.update(existing.results[0].id, { properties: props })
  }

  return hubspot.crm.contacts.basicApi.create({ properties: { email, ...props } })
}
```

**Vergadernotitie vastleggen bij een contact:**
```typescript
async function logMeetingNote(contactId: string, summary: string) {
  return hubspot.crm.objects.notes.basicApi.create({
    properties: {
      hs_note_body: summary,
      hs_timestamp: Date.now().toString(),
    },
    associations: [{
      to: { id: contactId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
    }],
  })
}
```

**Contacten in bulk verrijken vanuit onderzoek:**
```typescript
async function enrichContactsFromResearch(leads: LeadData[]) {
  for (const lead of leads) {
    await upsertContact(lead.email, {
      firstname:     lead.firstName,
      lastname:      lead.lastName,
      company:       lead.company,
      jobtitle:      lead.title,
      phone:         lead.phone,
      hs_lead_status: 'NEW',
      lifecyclestage: 'lead',
    })
    await new Promise(r => setTimeout(r, 100)) // snelheidslimiet: 10 verz/s
  }
}
```

**Deal-stage bijwerken:**
```typescript
async function advanceDealStage(dealId: string, stage: string) {
  return hubspot.crm.deals.basicApi.update(dealId, {
    properties: { dealstage: stage },
  })
}

// Stage-ID's (haal de uwe op via HubSpot → Verkoop → Deals → Pipeline bewerken)
// Veelvoorkomend: 'appointmentscheduled', 'qualifiedtobuy', 'presentationscheduled',
//         'decisionmakerboughtin', 'contractsent', 'closedwon', 'closedlost'
```

**Inactieve contacten zoeken (CRM-hygiëne):**
```typescript
async function findStaleContacts(daysInactive = 90) {
  const cutoff = Date.now() - daysInactive * 24 * 60 * 60 * 1000

  const results = await hubspot.crm.contacts.searchApi.doSearch({
    filterGroups: [{
      filters: [
        { propertyName: 'hs_last_sales_activity_date', operator: 'LT', value: cutoff.toString() },
        { propertyName: 'lifecyclestage', operator: 'EQ', value: 'lead' },
      ],
    }],
    properties: ['email', 'firstname', 'lastname', 'hs_last_sales_activity_date'],
    limit: 100,
  })

  return results.results
}
```

### Snelheidslimieten

| API-niveau | Limiet |
|---|---|
| Free/Starter | 100 verzoeken/10 seconden |
| Professional/Enterprise | 150 verzoeken/10 seconden |
| Burst | Tot 200 verzoeken/seconde kortdurend |

Voeg altijd `await new Promise(r => setTimeout(r, 100))` toe tussen bulkbewerkingen.

### Via Claude Code (natuurlijke taal met MCP)

Zodra de MCP-server verbonden is, kunt u Claude vertellen:
```
Alle contacten bij Acme Corp zoeken en een notitie toevoegen dat we hun Q3-uitbreidingsplannen hebben besproken.
```
```
Een nieuwe deal aanmaken voor alice@company.com in de Voorstel-fase, $25.000, sluiting volgende maand.
```
```
Alle deals in de onderhandelingsfase tonen die 2 weken niet zijn bijgewerkt.
```

## Voorbeeld

**Gebruiker:** Bouw een script dat een lijst van CSV-leads (naam, e-mail, bedrijf, LinkedIn-URL) neemt en HubSpot-contacten aanmaakt/bijwerkt, waarbij een notitie wordt vastgelegd met de bron van elke lead.

**Verwachte uitvoer:**
- `scripts/import-leads.ts` — leest CSV, roept `upsertContact()` aan voor elke rij
- `upsertContact(email, props)` — zoeken + aanmaken/bijwerken-patroon
- `logNote(contactId, 'Geïmporteerd uit LinkedIn-campagne — 2026-05-20')` na elke upsert
- Snelheidslimitering: 100 ms vertraging tussen contacten
- Foutafhandeling: mislukte rijen vastleggen in `failed-imports.csv` voor opnieuw proberen

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
