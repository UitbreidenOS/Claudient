# MCP: Snyk-beveiligingsscanning

Realtime vulnerability scanning vanuit Claude Code. Vraag Claude om je afhankelijkheden op CVE's te controleren, fixaanvorderingen te krijgen en de ernst te begrijpen — zonder je sessie te verlaten.

## Waarom je dit nodig hebt

In plaats van `npm audit` uit te voeren en resultaten in Claude in te plakken, kan de Snyk MCP-server Claude rechtstreeks vulnerabilities laten opvragen:
- "Zijn er kritieke CVE's in dit project?"
- "Wat is de fix voor de lodash-kwetsbaarheid?"
- "Welke afhankelijkheden moet ik updaten voordat ik uitrol?"

## Vereisten

```bash
# Snyk CLI installeren
npm install -g snyk

# Verifiëren (gratis account beschikbaar)
snyk auth
```

## Configuratie

```json
{
  "mcpServers": {
    "snyk": {
      "command": "npx",
      "args": ["-y", "snyk-mcp"],
      "env": {
        "SNYK_TOKEN": "your-snyk-token-here"
      }
    }
  }
}
```

Haal je token op: [app.snyk.io/account](https://app.snyk.io/account)

## Wat Claude met Snyk kan doen

```
# Op vulnerabilities controleren
"Scan this project for security vulnerabilities"

# Specifieke problemen oplossen
"The lodash vulnerability — how do I fix it without breaking anything?"

# Preshipment-controle
"Are there any Critical or High CVEs that would block a production deploy?"

# Licentiecontrole
"Are any of our dependencies using GPL licences that might cause issues?"
```

## Beschikbare tools

| Tool | Wat het doet |
|---|---|
| `snyk_test` | Project scannen op vulnerabilities |
| `snyk_fix` | Fixaanbevelingen genereren |
| `snyk_monitor` | Project registreren voor voortdurende bewaking |
| `snyk_iac` | Terraform/K8s/Docker scannen op misconfigs |
| `snyk_container` | Docker-images scannen |

## Beperkingen gratis tier

Snyk gratis tier: 200 tests/maand voor open source projecten. Voldoende voor de meeste development workflows.

## Combineer met de dependency-auditor skill

Gebruik de `/dependency-auditor` skill om te begrijpen wat je moet fixen en waarom, en Snyk MCP voor geautomatiseerde realtime-detectie.
