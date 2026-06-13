---
description: Stiel een productie-klaar RAG-pipeline op voor een gegeven gegevensbron en stapel
argument-hint: "[beschrijving gegevensbron en voorkeur stapel]"
---
U ontwerpt een retrieval-augmented generation pipeline op basis van: $ARGUMENTS

Zonder stapelvoorkeur standaard naar: Python, LangChain, pgvector (PostgreSQL), `claude-sonnet-4-6` voor generatie, `text-embedding-3-small` via OpenAI voor inbeddingen (wissel naar Voyage AI als gebruiker Anthropic-only aangeeft).

**Stap 1 — Begrip van de gegevens**

Identificeer uit $ARGUMENTS:
- Brontype: PDF's, webpagina's, databaserijen, codebestanden, Notion/Confluence, e-mails, of gemengd
- Updatefrequentie: statisch corpus, alleen toevoegen, of regelmatig aangepast
- Groottegeschatting: <1 k documenten, 1 k–100 k, of 100 k+
- Gevoeligheid: PII aanwezig? Air-gapped vereist?

Staat uw aannames expliciet uit als deze niet zijn gegeven.

**Stap 2 — Selecteer chunking strategie**

Selecteer en rechtvaardigt één van:
- Vaste grootte met overlap (snel, basislijn)
- Semantisch / zin-venster (betere coherentie voor proza)
- Recursief karaktersplitsen per documentstructuur (code, markdown)
- Parent-document retriever (haalt klein stuk op, retourneert parentcontext)

Toon de exacte chunker-configuratie: `chunk_size`, `chunk_overlap`, scheidingslijnlijst.

**Stap 3 — Genereer de ingestie-pipeline**

Schrijf een Python-script (`ingest.py`) dat:
- Documenten laadt van het hierboven geïdentificeerde brontype
- Tekst reinigt en normaliseert (verwijdert boilerplate, normaliseert witruimte, handelt codering af)
- Documenten chunken met de gekozen strategie
- Chunks in batches inbedt (max 512 per API-aanroep)
- Upserts in de vectoropslag met metagegevens: `source`, `chunk_index`, `ingested_at`
- Is idempotent — opnieuw uitvoeren op ongewijzigde documenten herimbedt niet

**Stap 4 — Genereer de retrieval + generatie-chain**

Schrijf een Python-module (`rag_chain.py`) die:
- Een queryreeks van gebruikers accepteert
- De query inbedt en top-K chunks ophaalt (standaard K=5) met MMR reranking
- Een systeemprompt construeert die het model instrueert alleen uit opgehaalde context te antwoorden en bronnen te citeren via het `source` metagegevensveld
- `claude-sonnet-4-6` aanroept met prompt caching op het contextblok (gebruik `cache_control: {"type": "ephemeral"}` op de contextberichten)
- Retourneert: `{"answer": str, "sources": list[str], "tokens_used": int}`

**Stap 5 — Operationeel controlelijst**

Lijst als selectievakjes:
- [ ] Strategie voor indexfrisheid (geplande re-ingest vs. webhook trigger)
- [ ] Inbeddingsmodelversie fixeren
- [ ] Metrieke voor ophaalkwaliteit om bij te houden (MRR, recall@K)
- [ ] Terugval wanneer ophaaltvertrouwen laag is
- [ ] PII-scrubbing indien van toepassing

Output: `ingest.py`, `rag_chain.py`, operationeel controlelijst. Geen stubs.
