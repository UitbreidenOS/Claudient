# MCP: Snyk-Sicherheitsanalyse

Echtzeitvulnerabilität-Scans aus Claude Code. Bitten Sie Claude, Ihre Abhängigkeiten auf CVEs zu überprüfen, Fehlerbehebungsvorschläge zu erhalten und den Schweregrad zu verstehen — ohne Ihre Session zu verlassen.

## Warum Sie das brauchen

Statt `npm audit` auszuführen und Ergebnisse in Claude einzufügen, kann der Snyk MCP-Server Claude Vulnerabilities direkt abfragen:
- "Gibt es kritische CVEs in diesem Projekt?"
- "Was ist die Lösung für die lodash-Anfälligkeit?"
- "Welche Abhängigkeiten sollte ich vor dem Deployment aktualisieren?"

## Voraussetzungen

```bash
# Snyk CLI installieren
npm install -g snyk

# Authentifizieren (kostenlose Konten verfügbar)
snyk auth
```

## Konfiguration

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

Holen Sie sich Ihren Token: [app.snyk.io/account](https://app.snyk.io/account)

## Was Claude mit Snyk tun kann

```
# Auf Anfälligkeit überprüfen
"Scan this project for security vulnerabilities"

# Spezifische Probleme beheben
"The lodash vulnerability — how do I fix it without breaking anything?"

# Vorkontrolle vor dem Einsatz
"Are there any Critical or High CVEs that would block a production deploy?"

# Lizenzprüfung
"Are any of our dependencies using GPL licences that might cause issues?"
```

## Verfügbare Tools

| Tool | Was es macht |
|---|---|
| `snyk_test` | Projekt auf Anfälligkeit prüfen |
| `snyk_fix` | Fehlerbehebungsempfehlungen generieren |
| `snyk_monitor` | Projekt für laufendes Monitoring registrieren |
| `snyk_iac` | Terraform/K8s/Docker auf Fehlkonfigurationen scannen |
| `snyk_container` | Docker-Images scannen |

## Kostenlose Tier-Limits

Snyk-Kostenloser Tarif: 200 Tests/Monat für Open-Source-Projekte. Ausreichend für die meisten Entwicklungs-Workflows.

## Kombinieren Sie mit dem dependency-auditor-Skill

Verwenden Sie den `/dependency-auditor`-Skill, um zu verstehen, was repariert werden muss und warum, und Snyk MCP für automatisierte, Echtzeit-Erkennung.
