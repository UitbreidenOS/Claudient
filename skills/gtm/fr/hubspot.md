---
name: hubspot
description: "HubSpot CRM automation: MCP server setup, contacts/deals/tickets via API, data enrichment pipelines, CRM workflows — the official Anthropic-HubSpot integration"
---

> 🇫🇷 Version française. [English version](../hubspot.md).

# Compétence HubSpot

## Quand activer
- Configurer le serveur HubSpot MCP officiel pour Claude Code
- Lire ou écrire des données HubSpot CRM (contacts, entreprises, offres, tickets, notes)
- Construire un pipeline d'enrichissement de leads qui alimente les enregistrements HubSpot
- Automatiser les mises à jour des étapes de traitement des offres selon des déclencheurs externes
- Créer des contacts et des notes à partir de recherches ou de comptes rendus de réunions
- Effectuer l'hygiène CRM : déduplication, champs manquants, enregistrements obsolètes

## Quand NE PAS utiliser
- CRM Salesforce — API et modèle d'objet différents
- Données Stripe/paiement simples — utiliser la compétence Stripe
- Quand vous avez besoin de webhooks d'événements en temps réel depuis HubSpot — utiliser un endpoint récepteur de webhooks

## Instructions

### Configuration — Serveur HubSpot MCP (officiel)

HubSpot dispose d'un serveur MCP officiel. Il existe trois façons de se connecter :

**Option 1 : Connecteur OAuth (le plus simple — Claude.ai desktop)**
1. Claude.ai → Paramètres → Intégrations → HubSpot → Connecter
2. S'authentifier avec votre compte HubSpot
3. Claude peut désormais lire/écrire dans votre CRM nativement

**Option 2 : Serveur MCP (Claude Code — programmatique)**
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

Obtenez votre token d'accès : HubSpot → Paramètres → Intégrations → Applications privées → Créer une application privée. Portées requises : `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.companies.read`, `crm.objects.deals.read`, `crm.objects.deals.write`.

**Option 3 : API HubSpot directe (scripts/automatisations)**
```typescript
import { Client } from '@hubspot/api-client'

const hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })
```

### Outils MCP disponibles (via le serveur MCP)

| Outil | Ce qu'il fait |
|------|-------------|
| `search_contacts` | Rechercher des contacts par e-mail, nom, entreprise ou propriétés |
| `get_contact` | Obtenir l'enregistrement complet d'un contact par ID |
| `create_contact` | Créer un nouveau contact avec des propriétés |
| `update_contact` | Mettre à jour les propriétés d'un contact |
| `search_companies` | Rechercher des entreprises par nom, domaine, secteur |
| `create_company` | Créer une nouvelle entreprise |
| `get_deals` | Lister les offres, filtrer par étape ou propriétaire |
| `create_deal` | Créer une nouvelle offre avec des associations |
| `create_note` | Ajouter une note à un contact, une entreprise ou une offre |
| `create_ticket` | Créer un ticket de support |

### Modèles courants

**Créer ou mettre à jour un contact (upsert) :**
```typescript
// Rechercher d'abord, créer si introuvable
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

**Enregistrer une note de réunion sur un contact :**
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

**Enrichissement en masse de contacts à partir de recherches :**
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
    await new Promise(r => setTimeout(r, 100)) // limite de débit : 10 req/s
  }
}
```

**Mettre à jour l'étape d'une offre :**
```typescript
async function advanceDealStage(dealId: string, stage: string) {
  return hubspot.crm.deals.basicApi.update(dealId, {
    properties: { dealstage: stage },
  })
}

// IDs d'étapes (récupérez les vôtres depuis HubSpot → Ventes → Offres → Modifier le pipeline)
// Courants : 'appointmentscheduled', 'qualifiedtobuy', 'presentationscheduled',
//         'decisionmakerboughtin', 'contractsent', 'closedwon', 'closedlost'
```

**Rechercher des contacts inactifs (hygiène CRM) :**
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

### Limites de débit

| Niveau API | Limite |
|---|---|
| Gratuit/Starter | 100 requêtes/10 secondes |
| Professional/Enterprise | 150 requêtes/10 secondes |
| Burst | Jusqu'à 200 requêtes/seconde brièvement |

Toujours ajouter `await new Promise(r => setTimeout(r, 100))` entre les opérations en masse.

### Via Claude Code (langage naturel avec MCP)

Une fois le serveur MCP connecté, vous pouvez demander à Claude :
```
Trouver tous les contacts chez Acme Corp et ajouter une note indiquant que nous avons discuté de leurs plans d'expansion Q3.
```
```
Créer une nouvelle offre pour alice@company.com à l'étape Proposition, 25 000 $, clôture le mois prochain.
```
```
Me montrer toutes les offres en phase de négociation qui n'ont pas été mises à jour depuis 2 semaines.
```

## Exemple

**Utilisateur :** Créer un script qui prend une liste de leads CSV (nom, e-mail, entreprise, URL LinkedIn) et crée/met à jour des contacts HubSpot, en enregistrant une note avec la source de chaque lead.

**Résultat attendu :**
- `scripts/import-leads.ts` — lit le CSV, appelle `upsertContact()` pour chaque ligne
- `upsertContact(email, props)` — modèle recherche + création/mise à jour
- `logNote(contactId, 'Importé depuis la campagne LinkedIn — 2026-05-20')` après chaque upsert
- Limitation de débit : délai de 100 ms entre les contacts
- Gestion des erreurs : enregistrer les lignes échouées dans `failed-imports.csv` pour nouvelle tentative

---

> **Travaillez avec nous :** Claudient est soutenu par [Uitbreiden](https://uitbreiden.com/) — nous créons des produits IA et des solutions B2B avec des communautés de développeurs.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
