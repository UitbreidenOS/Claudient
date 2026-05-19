---
name: hubspot
description: "HubSpot CRM automation: MCP server setup, contacts/deals/tickets via API, data enrichment pipelines, CRM workflows — the official Anthropic-HubSpot integration"
---

> 🇪🇸 Versión en español. [Versión en inglés](../hubspot.md).

# Habilidad HubSpot

## Cuándo activar
- Configurar el servidor HubSpot MCP oficial para Claude Code
- Leer o escribir datos de HubSpot CRM (contactos, empresas, tratos, tickets, notas)
- Construir un pipeline de enriquecimiento de leads que rellene registros de HubSpot
- Automatizar actualizaciones de etapas de tratos basadas en disparadores externos
- Crear contactos y notas a partir de investigaciones o resultados de reuniones
- Ejecutar higiene del CRM: deduplicación, campos faltantes, registros obsoletos

## Cuándo NO usar
- CRM Salesforce — API y modelo de objeto diferentes
- Datos simples de Stripe/pagos — usar la habilidad de Stripe
- Cuando necesite webhooks de eventos en tiempo real desde HubSpot — usar un endpoint receptor de webhooks

## Instrucciones

### Configuración — Servidor HubSpot MCP (oficial)

HubSpot tiene un servidor MCP oficial. Hay tres formas de conectarse:

**Opción 1: Conector OAuth (más sencillo — Claude.ai desktop)**
1. Claude.ai → Configuración → Integraciones → HubSpot → Conectar
2. Autenticarse con su cuenta HubSpot
3. Claude ahora puede leer/escribir en su CRM de forma nativa

**Opción 2: Servidor MCP (Claude Code — programático)**
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

Obtenga su token de acceso: HubSpot → Configuración → Integraciones → Aplicaciones privadas → Crear una aplicación privada. Alcances necesarios: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.companies.read`, `crm.objects.deals.read`, `crm.objects.deals.write`.

**Opción 3: API directa de HubSpot (scripts/automatizaciones)**
```typescript
import { Client } from '@hubspot/api-client'

const hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })
```

### Herramientas MCP disponibles (a través del servidor MCP)

| Herramienta | Qué hace |
|------|-------------|
| `search_contacts` | Buscar contactos por correo electrónico, nombre, empresa o propiedades |
| `get_contact` | Obtener el registro completo de un contacto por ID |
| `create_contact` | Crear un nuevo contacto con propiedades |
| `update_contact` | Actualizar propiedades de un contacto |
| `search_companies` | Buscar empresas por nombre, dominio, sector |
| `create_company` | Crear una nueva empresa |
| `get_deals` | Listar tratos, filtrar por etapa o propietario |
| `create_deal` | Crear un nuevo trato con asociaciones |
| `create_note` | Agregar una nota a un contacto, empresa o trato |
| `create_ticket` | Crear un ticket de soporte |

### Patrones comunes

**Crear o actualizar un contacto (upsert):**
```typescript
// Buscar primero, crear si no se encuentra
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

**Registrar una nota de reunión en un contacto:**
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

**Enriquecer contactos en masa a partir de investigaciones:**
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
    await new Promise(r => setTimeout(r, 100)) // límite de velocidad: 10 req/s
  }
}
```

**Actualizar etapa de trato:**
```typescript
async function advanceDealStage(dealId: string, stage: string) {
  return hubspot.crm.deals.basicApi.update(dealId, {
    properties: { dealstage: stage },
  })
}

// IDs de etapas (obtenga los suyos desde HubSpot → Ventas → Tratos → Editar pipeline)
// Comunes: 'appointmentscheduled', 'qualifiedtobuy', 'presentationscheduled',
//         'decisionmakerboughtin', 'contractsent', 'closedwon', 'closedlost'
```

**Buscar contactos obsoletos (higiene del CRM):**
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

### Límites de velocidad

| Nivel de API | Límite |
|---|---|
| Free/Starter | 100 solicitudes/10 segundos |
| Professional/Enterprise | 150 solicitudes/10 segundos |
| Burst | Hasta 200 solicitudes/segundo brevemente |

Siempre agregar `await new Promise(r => setTimeout(r, 100))` entre operaciones masivas.

### A través de Claude Code (lenguaje natural con MCP)

Una vez conectado el servidor MCP, puede indicarle a Claude:
```
Encontrar todos los contactos en Acme Corp y agregar una nota diciendo que discutimos sus planes de expansión del Q3.
```
```
Crear un nuevo trato para alice@company.com en la etapa de Propuesta, $25,000, cerrando el próximo mes.
```
```
Mostrarme todos los tratos en la etapa de negociación que no se han actualizado en 2 semanas.
```

## Ejemplo

**Usuario:** Crear un script que tome una lista de leads CSV (nombre, correo electrónico, empresa, URL de LinkedIn) y cree/actualice contactos de HubSpot, registrando una nota con la fuente de cada lead.

**Resultado esperado:**
- `scripts/import-leads.ts` — lee CSV, llama a `upsertContact()` para cada fila
- `upsertContact(email, props)` — patrón búsqueda + crear/actualizar
- `logNote(contactId, 'Importado desde campaña de LinkedIn — 2026-05-20')` después de cada upsert
- Limitación de velocidad: retraso de 100 ms entre contactos
- Manejo de errores: registrar filas fallidas en `failed-imports.csv` para reintento

---

> **Trabaje con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
