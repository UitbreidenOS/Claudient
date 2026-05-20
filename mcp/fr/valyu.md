# MCP : Valyu — Accès aux données premium

Accédez à des sources de données payantes et premium depuis Claude Code : dépôts SEC, littérature PubMed, données des essais cliniques, articles académiques et bases de données financières — sans téléchargement manuel.

## Pourquoi vous en avez besoin

De nombreuses sources de données précieuses se trouvent derrière des murs payants ou nécessitent des intégrations API complexes. Valyu fournit une interface MCP unifiée pour :
- Dépôts SEC EDGAR (10-K, 10-Q, 8-K, déclarations de procuration)
- Littérature biomédicale PubMed
- Données ClinicalTrials.gov
- Articles et préimprimes académiques
- Données financières et transcriptions de résultats

## Configuration

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

Obtenez une clé API : [valyu.network](https://valyu.network)

## Cas d'usage par domaine

**Recherche finance / investissement :**
```
"Pull Apple's latest 10-K and extract the risk factors section"
"Get the last 4 quarters of earnings call transcripts for [company]"
"Find all 8-K filings for [company] in the last 6 months"
```

**Sciences de la vie / Recherche :**
```
"Search PubMed for recent meta-analyses on [treatment]"
"Find all clinical trials currently recruiting for [condition] in Phase 3"
"Get the full text of this paper: [DOI]"
```

**Recherche académique :**
```
"Find the 10 most-cited papers on [topic] from the last 2 years"
"Get the abstract and methodology of papers related to [research question]"
```

**Intelligence concurrentielle :**
```
"Pull [competitor]'s latest annual report and extract their revenue by segment"
"Find any patent filings by [company] in the last 12 months"
```

## Combinez avec la compétence research-dossier

La compétence `/research-dossier` structure le cadre de recherche. Valyu MCP fournit les données brutes pour la remplir. Ensemble : recherche complète et basée sur les données en minutes au lieu d'heures.

## vs. recherche Web

- **Recherche Web** — trouve les pages Web publiques, souvent résumées ou obsolètes
- **Valyu** — récupère les documents sources principaux (les vrais dépôts, articles, essais) en texte complet

Valyu est pour la recherche qui nécessite des sources primaires, pas les résultats Google.
