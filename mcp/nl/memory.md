# MCP: Persistent geheugen

Geef Claude Code geheugen dat over sessies heen aanhoudt. Standaard vergeet Claude alles wanneer een sessie eindigt. Deze MCP-server slaat feiten, besluiten en context op in een lokale kennisgraaf die Claude in elke toekomstige sessie kan opvragen.

## Waarom je dit nodig hebt

Zonder geheugen start elke Claude Code-sessie van nul. Met persistent geheugen:
- Claude herinnert zich uw voorkeuren, codestijl en vorige besluiten
- Geen behoefte om projectcontext in elke sessie opnieuw uit te leggen
- Claude kan zich specifieke functies, bugs die zijn opgelost, of architectuurbesluiten van weken geleden herinneren
- Kennis bouwt zich op in plaats van na elke `/compact` te verdampen

## Installatie

```bash
# De meest populaire geheugenserver
npm install -g @modelcontextprotocol/server-memory

# Of gebruik de npx-versie (geen installatie)
# Refereer er gewoon aan in uw config hieronder
```

## Configuratie

Voeg toe aan `~/.claude.json` of project `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "/Users/your-name/.claude/memory/knowledge.json"
      }
    }
  }
}
```

## Wat het opslaat

De geheugenserver gebruikt een **kennisgraaf** — entiteiten en relaties:

```
Entity: "authentication system"
  → Relations: "uses JWT", "built in May 2026", "has refresh token issue"
  
Entity: "database schema"
  → Relations: "uses PostgreSQL", "has 3 tables", "users table has soft delete"
```

## Geheugen in sessies gebruiken

```
# Vertel Claude iets te onthouden
"Remember that we decided to use Zod for all API validation"

# Claude slaat op: entity("validation-decision") → uses("Zod")

# Volgende sessie — Claude haalt dit automatisch op wanneer relevant
# Of vraag direct:
"What validation library did we decide on for this project?"
```

## Automatische geheugen-triggers

Claude zal automatisch opslaan:
- Nieuwe architectuurbesluiten wanneer u deze neemt
- Bugs en hun fixes
- Uw codeprefeences naarmate ze verschijnen
- Externe services en hun configuraties

## Opslaglocatie

Standaard: `~/.claude/memory/knowledge.json`
- Mensleesbare JSON — u kunt deze inspecteren en bewerken
- Draagbaar — maak er een back-up van, synchroniseer over machines
- Lichtgewicht — meestal < 1 MB zelfs na maanden gebruik

## Privacy

Al het geheugen wordt lokaal opgeslagen. Niets verlaat uw machine. De MCP-server leest/schrijft alleen een lokaal JSON-bestand.

## Combineer met CLAUDE.md

Memory MCP vulgt aan (vervangt niet) CLAUDE.md:
- **CLAUDE.md** — stabiele projectcontext, altijd geladen, versiecontroleerd
- **Memory MCP** — dynamische, per-sessie kennis die in de loop van de tijd groeit
