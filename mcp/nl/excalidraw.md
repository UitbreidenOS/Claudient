# MCP: Excalidraw-diagramgenerator

Genereer architectuurdiagrammen, flowcharts en systeemkaarten rechtstreeks vanuit Claude Code. Beschrijf uw systeem in gewone Engelse — Claude tekent het diagram.

## Waarom je dit nodig hebt

Architectuurdiagrammen zijn waardevol maar traag om handmatig te maken. Met de Excalidraw MCP-server kan Claude:
- Een codebasisbeschrijving in een systeemarchitectuur-diagram omzetten
- Gegevensstroomdiagrammen uit API-endpoint-beschrijvingen tekenen
- Sequencediagrammen voor complexe workflows maken
- Bestaande diagrammen bijwerken wanneer de architectuur verandert

## Configuratie

```json
{
  "mcpServers": {
    "excalidraw": {
      "command": "npx",
      "args": ["-y", "excalidraw-mcp-server"]
    }
  }
}
```

## Hoe te gebruiken

```
# Architectuurdiagram
"Draw a system architecture diagram for our app:
 - React frontend on Vercel
 - Express API on Railway
 - PostgreSQL on Neon
 - Redis cache on Upstash
 - Stripe for payments"

# Gegevensstroom
"Create a sequence diagram for the user authentication flow:
 login form → Express API → check database → generate JWT → return to client"

# Servicekaart
"Draw a microservices map showing how these services communicate: [describe services]"
```

## Uitvoerindelingen

- **Excalidraw JSON** — openen in excalidraw.com of VS Code-extensie
- **SVG** — insluiten in README of docs
- **PNG** — voor presentaties en Notion

## Diagrammen opslaan

```
"Save the architecture diagram as docs/architecture.excalidraw"
```

Claude slaat het rechtstreeks in uw project op. Commit het — Excalidraw-bestanden zijn versiecontroleerd JSON, dus diffs zijn zinvol.

## Combineer met de codebase-onboarding-skill

Genereer diagrammen als onderdeel van onboarding-documentatie:
```
"Read the codebase structure and generate:
1. A system architecture diagram
2. A data model diagram from the Prisma schema
3. A deployment diagram based on the infrastructure config"
```
