---
name: hubspot
description: "HubSpot CRM automation: MCP server setup, contacts/deals/tickets via API, data enrichment pipelines, CRM workflows — the official Anthropic-HubSpot integration"
---

> 🇩🇪 Deutsche Version. [Englische Version](../hubspot.md).

# HubSpot-Kompetenz

## Wann aktivieren
- Einrichten des offiziellen HubSpot MCP-Servers für Claude Code
- Lesen oder Schreiben von HubSpot CRM-Daten (Kontakte, Unternehmen, Deals, Tickets, Notizen)
- Aufbau einer Lead-Anreicherungspipeline, die HubSpot-Datensätze befüllt
- Automatisierung von Deal-Stage-Updates basierend auf externen Auslösern
- Erstellen von Kontakten und Notizen aus Recherchen oder Meeting-Ergebnissen
- CRM-Hygiene durchführen: Deduplizierung, fehlende Felder, veraltete Datensätze

## Wann NICHT verwenden
- Salesforce CRM — andere API und Objektmodell
- Einfache Stripe/Zahlungsdaten — Stripe-Kompetenz verwenden
- Wenn Sie Echtzeit-Event-Webhooks von HubSpot benötigen — einen Webhook-Empfänger-Endpunkt verwenden

## Anweisungen

### Einrichtung — HubSpot MCP-Server (offiziell)

HubSpot verfügt über einen offiziellen MCP-Server. Es gibt drei Verbindungsmöglichkeiten:

**Option 1: OAuth-Connector (einfachste — Claude.ai Desktop)**
1. Claude.ai → Einstellungen → Integrationen → HubSpot → Verbinden
2. Mit Ihrem HubSpot-Konto authentifizieren
3. Claude kann nun Ihr CRM nativ lesen/schreiben

**Option 2: MCP-Server (Claude Code — programmatisch)**
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

Zugriffstoken erhalten: HubSpot → Einstellungen → Integrationen → Private Apps → Private App erstellen. Erforderliche Bereiche: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.companies.read`, `crm.objects.deals.read`, `crm.objects.deals.write`.

**Option 3: Direkte HubSpot API (Skripte/Automatisierungen)**
```typescript
import { Client } from '@hubspot/api-client'

const hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })
```

### Verfügbare MCP-Tools (über den MCP-Server)

| Tool | Was es macht |
|------|-------------|
| `search_contacts` | Kontakte nach E-Mail, Name, Unternehmen oder Eigenschaften suchen |
| `get_contact` | Vollständigen Kontaktdatensatz nach ID abrufen |
| `create_contact` | Neuen Kontakt mit Eigenschaften erstellen |
| `update_contact` | Kontakteigenschaften aktualisieren |
| `search_companies` | Unternehmen nach Name, Domain, Branche suchen |
| `create_company` | Neues Unternehmen erstellen |
| `get_deals` | Deals auflisten, nach Stage oder Eigentümer filtern |
| `create_deal` | Neuen Deal mit Verknüpfungen erstellen |
| `create_note` | Notiz zu einem Kontakt, Unternehmen oder Deal hinzufügen |
| `create_ticket` | Support-Ticket erstellen |

### Häufige Muster

**Kontakt erstellen oder aktualisieren (Upsert):**
```typescript
// Zuerst suchen, erstellen falls nicht gefunden
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

**Meeting-Notiz zu einem Kontakt protokollieren:**
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

**Kontakte aus Recherchen massenhaft anreichern:**
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
    await new Promise(r => setTimeout(r, 100)) // Ratenlimit: 10 Req/s
  }
}
```

**Deal-Stage aktualisieren:**
```typescript
async function advanceDealStage(dealId: string, stage: string) {
  return hubspot.crm.deals.basicApi.update(dealId, {
    properties: { dealstage: stage },
  })
}

// Stage-IDs (eigene aus HubSpot → Vertrieb → Deals → Pipeline bearbeiten abrufen)
// Häufig: 'appointmentscheduled', 'qualifiedtobuy', 'presentationscheduled',
//         'decisionmakerboughtin', 'contractsent', 'closedwon', 'closedlost'
```

**Veraltete Kontakte suchen (CRM-Hygiene):**
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

### Ratenlimits

| API-Stufe | Limit |
|---|---|
| Free/Starter | 100 Anfragen/10 Sekunden |
| Professional/Enterprise | 150 Anfragen/10 Sekunden |
| Burst | Kurzzeitig bis zu 200 Anfragen/Sekunde |

Immer `await new Promise(r => setTimeout(r, 100))` zwischen Massenoperationen hinzufügen.

### Über Claude Code (natürliche Sprache mit MCP)

Sobald der MCP-Server verbunden ist, können Sie Claude sagen:
```
Alle Kontakte bei Acme Corp finden und eine Notiz hinzufügen, dass wir ihre Q3-Expansionspläne besprochen haben.
```
```
Neuen Deal für alice@company.com in der Angebotsphase erstellen, 25.000 $, Abschluss nächsten Monat.
```
```
Alle Deals in der Verhandlungsphase anzeigen, die seit 2 Wochen nicht aktualisiert wurden.
```

## Beispiel

**Benutzer:** Skript erstellen, das eine Liste von CSV-Leads (Name, E-Mail, Unternehmen, LinkedIn-URL) nimmt und HubSpot-Kontakte erstellt/aktualisiert, wobei für jeden Lead eine Notiz mit der Quelle protokolliert wird.

**Erwartetes Ergebnis:**
- `scripts/import-leads.ts` — liest CSV, ruft `upsertContact()` für jede Zeile auf
- `upsertContact(email, props)` — Suche + Erstellen/Aktualisieren-Muster
- `logNote(contactId, 'Importiert aus LinkedIn-Kampagne — 2026-05-20')` nach jedem Upsert
- Ratenlimitierung: 100 ms Verzögerung zwischen Kontakten
- Fehlerbehandlung: fehlgeschlagene Zeilen in `failed-imports.csv` für Wiederholung protokollieren

---

> **Arbeiten Sie mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte und B2B-Lösungen mit Entwickler-Communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
