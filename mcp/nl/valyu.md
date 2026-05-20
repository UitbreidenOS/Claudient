# MCP: Valyu — Premium-gegevenstoegang

Krijg toegang tot betaalde en premium-gegevensbronnen vanuit Claude Code: SEC-indieningen, PubMed-onderzoek, klinische proefgegevens, academische papers en financiële databases — zonder handmatig downloaden.

## Waarom je dit nodig hebt

Veel waardevolle gegevensbronnen bevinden zich achter betaalmuren of vereisen complexe API-integraties. Valyu biedt een uniforme MCP-interface voor:
- SEC EDGAR-indieningen (10-K, 10-Q, 8-K, proxy-verklaringen)
- PubMed biomedische literatuur
- ClinicalTrials.gov gegevens
- Academische papers en preprints
- Financiële gegevens en winstoproeptranskripten

## Configuratie

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

API-sleutel ophalen: [valyu.network](https://valyu.network)

## Gebruiksscenario's per domein

**Financieel / Beleggingsonderzoek:**
```
"Pull Apple's latest 10-K and extract the risk factors section"
"Get the last 4 quarters of earnings call transcripts for [company]"
"Find all 8-K filings for [company] in the last 6 months"
```

**Biowetenschappen / Onderzoek:**
```
"Search PubMed for recent meta-analyses on [treatment]"
"Find all clinical trials currently recruiting for [condition] in Phase 3"
"Get the full text of this paper: [DOI]"
```

**Academisch onderzoek:**
```
"Find the 10 most-cited papers on [topic] from the last 2 years"
"Get the abstract and methodology of papers related to [research question]"
```

**Concurrentie-intelligence:**
```
"Pull [competitor]'s latest annual report and extract their revenue by segment"
"Find any patent filings by [company] in the last 12 months"
```

## Combineer met de research-dossier-skill

De `/research-dossier`-skill structureert het onderzoeksframework. Valyu MCP biedt de ruwe gegevens om het in te vullen. Samen: uitgebreide, gegevensgestuurde onderzoek in minuten in plaats van uren.

## vs. websearch

- **Websearch** — vindt openbare webpagina's, vaak samengevat of verouderd
- **Valyu** — haalt primaire brondocumenten (de werkelijke indieningen, papers, onderzoeken) in volledige tekst op

Valyu is voor onderzoek dat primaire bronnen vereist, niet Google-resultaten.
