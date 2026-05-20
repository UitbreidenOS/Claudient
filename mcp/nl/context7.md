# MCP: Context7 — Live-documentatie

Geef Claude Code toegang tot up-to-date documentatie voor elke bibliotheek of framework. Geen meer gehallucineerde API's of verouderde codevoorbeelden.

## Waarom je dit nodig hebt

Claudes kennisbeperkingsdatum heeft een limiet. Voor snelslaande bibliotheken (Next.js 16, LangGraph 1.2, shadcn/ui) kan de documentatie die Claude kent maanden of jaren oud zijn. Context7 lost dit op door actuele documentatie op aanvraag op te halen.

## Wat het doet

- Haalt actuele, versiespecifieke documentatie op voor elke bibliotheek
- Injecteert de relevante documentatiesectie in Claudes context
- Claude genereert code tegen de werkelijke huidige API, niet een onthouden versie
- Behandelt: React, Next.js, Tailwind, shadcn/ui, Prisma, Drizzle, LangChain, LangGraph en duizenden meer

## Configuratie

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

Geen API-sleutel vereist voor basisgebruik.

## Hoe te gebruiken in sessies

```
# Vraag expliciet actuele documentatie op
"Using context7, get the latest Next.js 16 App Router docs for data fetching"

# Claude zal ze ophalen en gebruiken
"Build a server action using the current Next.js syntax"

# Voor versiespecifieke vragen
"What's the correct way to use useFormState in React 19?"
```

## Triggers

U kunt ook normaal werken — Context7 wordt geactiveerd wanneer Claude detecteert dat het documentatie moet opzoeken. Of voeg dit toe aan uw CLAUDE.md:

```markdown
## Libraries
When writing code with Next.js, React, Tailwind, or shadcn/ui:
- Use context7 MCP to fetch current documentation before generating code
- Always specify the version we're using (see package.json)
```

## Ondersteunde bibliotheken

Behandelt de meeste grote npm-pakketten en Python-bibliotheken. Als een bibliotheek niet is geindexeerd, valt Context7 terug op het rechtstreeks ophalen van de officiële documentatiepagina.

## vs. documentatie opnemen in CLAUDE.md

CLAUDE.md-documentatie veroudert en verbruikt context bij elke sessie. Context7 haalt alleen op wat nodig is, wanneer het nodig is — nul overhead wanneer u een specifieke bibliotheek niet gebruikt.
