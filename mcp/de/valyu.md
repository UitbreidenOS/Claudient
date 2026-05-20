# MCP: Valyu — Premium-Datenzugriff

Greifen Sie auf kostenpflichtige und Premium-Datenquellen aus Claude Code zu: SEC-Einreichungen, PubMed-Forschung, klinische Studiendaten, akademische Papiere und Finanzdatenbanken — ohne manuelles Download.

## Warum Sie das brauchen

Viele wertvolle Datenquellen befinden sich hinter Zahlungsschranken oder erfordern komplexe API-Integrationen. Valyu bietet eine einheitliche MCP-Schnittstelle zu:
- SEC EDGAR-Anmeldungen (10-K, 10-Q, 8-K, Proxy-Statements)
- PubMed-Biomedizin-Literatur
- ClinicalTrials.gov-Daten
- Akademische Papiere und Preprints
- Finanzdaten und Earnings-Transkripte

## Konfiguration

```json
{
  "mcpServers": {
    "valyu": {
      "command": "npx",
      "args": ["-y", "valyu-mcp"],
      "env": {
        "VALYU_API_KEY": "your-valyu-api-key"
      }
    }
  }
}
```

API-Schlüssel abrufen: [valyu.network](https://valyu.network)

## Anwendungsfälle nach Domain

**Finanz-/Investitionsforschung:**
```
"Pull Apple's latest 10-K and extract the risk factors section"
"Get the last 4 quarters of earnings call transcripts for [company]"
"Find all 8-K filings for [company] in the last 6 months"
```

**Biowissenschaften / Forschung:**
```
"Search PubMed for recent meta-analyses on [treatment]"
"Find all clinical trials currently recruiting for [condition] in Phase 3"
"Get the full text of this paper: [DOI]"
```

**Akademische Forschung:**
```
"Find the 10 most-cited papers on [topic] from the last 2 years"
"Get the abstract and methodology of papers related to [research question]"
```

**Competitive Intelligence:**
```
"Pull [competitor]'s latest annual report and extract their revenue by segment"
"Find any patent filings by [company] in the last 12 months"
```

## Kombinieren Sie mit der research-dossier-Skill

Die `/research-dossier`-Skill strukturiert das Forschungs-Framework. Valyu MCP stellt die Rohdaten zur Verfügung, um es auszufüllen. Zusammen: umfassende, datengestützte Forschung in Minuten statt Stunden.

## vs. Web-Suche

- **Web-Suche** — findet öffentliche Webseiten, oft zusammengefasst oder veraltet
- **Valyu** — ruft Primärquellen-Dokumente (die tatsächlichen Anmeldungen, Papiere, Studien) im Volltext ab

Valyu ist für Forschung, die Primärquellen erfordert, nicht Google-Ergebnisse.
