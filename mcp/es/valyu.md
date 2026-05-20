# MCP: Valyu — Acceso a datos premium

Accede a fuentes de datos pagadas y premium desde Claude Code: presentaciones de la SEC, investigación de PubMed, datos de ensayos clínicos, artículos académicos y bases de datos financieras — sin descargas manuales.

## Por qué lo necesitas

Muchas fuentes de datos valiosas están detrás de muros de pago o requieren integraciones API complejas. Valyu proporciona una interfaz MCP unificada para:
- Presentaciones SEC EDGAR (10-K, 10-Q, 8-K, declaraciones de apoderado)
- Literatura biomédica PubMed
- Datos de ClinicalTrials.gov
- Artículos académicos y preprints
- Datos financieros y transcripciones de llamadas de ganancias

## Configuración

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

Obtén tu clave API: [valyu.network](https://valyu.network)

## Casos de uso por dominio

**Investigación de finanzas / inversión:**
```
"Pull Apple's latest 10-K and extract the risk factors section"
"Get the last 4 quarters of earnings call transcripts for [company]"
"Find all 8-K filings for [company] in the last 6 months"
```

**Ciencias de la vida / Investigación:**
```
"Search PubMed for recent meta-analyses on [treatment]"
"Find all clinical trials currently recruiting for [condition] in Phase 3"
"Get the full text of this paper: [DOI]"
```

**Investigación académica:**
```
"Find the 10 most-cited papers on [topic] from the last 2 years"
"Get the abstract and methodology of papers related to [research question]"
```

**Inteligencia competitiva:**
```
"Pull [competitor]'s latest annual report and extract their revenue by segment"
"Find any patent filings by [company] in the last 12 months"
```

## Combina con la habilidad research-dossier

La habilidad `/research-dossier` estructura el marco de investigación. Valyu MCP proporciona los datos sin procesar para rellenarlo. Juntos: investigación integral y basada en datos en minutos en lugar de horas.

## vs. búsqueda web

- **Búsqueda web** — encuentra páginas web públicas, a menudo resumidas u obsoletas
- **Valyu** — recupera documentos de fuentes primarias (los archivos reales, artículos, ensayos) en texto completo

Valyu es para investigación que requiere fuentes primarias, no resultados de Google.
