---
description: Genereer een volledig uitgewerkte MCP-server die tools, resources of prompts voor een bepaald domein beschikbaar stelt
argument-hint: "[domein of service om bloot te stellen, bijv. 'GitHub issues' of 'Postgres query']"
---
Genereer een productie-klare MCP (Model Context Protocol) server voor: $ARGUMENTS

**Stap 1 — Mogelijkheden ontwerpen**

Van het domein in $ARGUMENTS, opsommen wat de server moet blootstellen via elk MCP-primitief:

- **Tools** — acties die het model kan aanroepen (create, update, delete, query). Vermeld naam, beschrijving, invoerschema (JSON Schema) en retourshape.
- **Resources** — gegevens die het model kan lezen (list + read URI-patronen). Vermeld URI-sjabloon en inhoudstype.
- **Prompts** — herbruikbare promptsjablonen die de host kan oppervlakken. Vermeld naam, argumenten en prompttekst.

Vermeld alleen wat geschikt is voor het domein — niet altijd alle drie primitieven zijn nodig.

**Stap 2 — Genereer de server**

Schrijf een volledige Python MCP-server met behulp van het `mcp` pakket (`pip install mcp`). Vereisten:

- Gebruik `mcp.server.Server` en `stdio_server()` transport
- Registreer elke tool, resource en prompt die in Stap 1 is geïdentificeerd
- Elke tool-handler moet:
  - Invoer valideren met Pydantic-modellen
  - `[TextContent(...)]` of `[ImageContent(...)]` retourneren waar passend
  - `McpError` opheffen met een passende `ErrorCode` bij fout (geef geen foutstrings in inhoud terug)
- Inclueer een `__main__` blok: `asyncio.run(main())`
- Gebruik `httpx.AsyncClient` of de relevante SDK voor uitgaande API-aanroepen — geen `requests`
- Secrets alleen via omgevingsvariabelen — nooit hardcoded

**Stap 3 — settings.json registratiefragment**

Toon het exacte JSON-blok om in `.claude/settings.json` (of `~/.claude/settings.json`) te plakken om de server te registreren:

```json
{
  "mcpServers": {
    "<server-name>": {
      "command": "python",
      "args": ["path/to/server.py"],
      "env": {
        "API_KEY": "${API_KEY}"
      }
    }
  }
}
```

**Stap 4 — Smoke test**

Schrijf een `test_server.py` met behulp van `mcp.client.session.ClientSession` en `stdio_client` die:
- Verbinding maakt met de server via subprocess
- Tools, resources en prompts opsomt
- Elke tool aanroept met minimaal geldige invoer en een antwoord zonder fout bevat
- Uitvoert met `pytest -xvs test_server.py`

**Output:** `server.py`, `settings.json` fragment, `test_server.py`. Geen `# TODO` stubs. Geen plaatsaanduiding-logica.
