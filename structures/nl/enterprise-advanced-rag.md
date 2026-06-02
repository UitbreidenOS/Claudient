# 📂 Enterprise Advanced RAG
> De canonieke werkplek voor een productie-grade Retrieval-Augmented Generation (RAG) pijplijn met hybride zoeken, parent-child chunking, en cross-encoder re-ranking.

📄 `rag-architecture-brief.md`  # Canonieke brief: Zoekgewichten (trefwoord vs. semantisch) en chunking-limieten
🧠 `memory.md`                  # Sessiegeheugen: Dynamische contexttracking voor de actieve retrieval-sessie
🤖 `CLAUDE.md`                  # Bedrijfsregels: Strikte instructies voor de LLM om alleen opgehaalde context aan te halen

## 📁 ingestion-pipeline/ (4 skills - Gegevensvoorbereiding)
📄 `document-parser.md`         # Opname in meerdere formaten • behandelt PDF's, Markdown en onbewerkte tekst
📄 `metadata-extractor.md`      # Tags chunks automatisch met auteur, datum en brondomein voor voorfiltering
📄 `pii-scrubber.md`            # Verwijdert gevoelige informatie voordat deze naar het insluitingsmodel wordt verzonden
📄 `vector-sync.md`             # Duwt verwerkte documenten naar Pinecone/Milvus-databases

## 📁 chunking-strategies/ (3 skills - Context Slicing)
📄 `semantic-splitter.md`       # Verdeelt documenten natuurlijk op paragraaf- of kopgrenzen
📄 `parent-child-linker.md`     # Maakt kleine onderliggende chunks voor nauwkeurig zoeken, gekoppeld aan grotere bovenliggende chunks voor volledige LLM-context
📄 `table-preserver.md`         # Zorgt ervoor dat markdown-tabellen niet horizontaal over verschillende chunks worden gesplitst

## 📁 retrieval-engine/ (4 skills - De zoekkern)
📄 `query-expander.md`          # Stap voor LLM-preprocessing • genereert 3 variaties van de vraag van de gebruiker om trefferpercentages te verbeteren
📄 `hybrid-search.md`           # Combineert dense vector search (embeddings) met sparse search (BM25 trefwoord)
📄 `cross-encoder-reranker.md`  # Geeft top 20-resultaten door aan Cohere ReRank om de meest relevante top 5 naar voren te brengen
📄 `metadata-filter.md`         # Past harde beperkingen toe (bijv. "alleen documenten van 2026 doorzoeken") voor vectormatching

## 📁 generation-layer/ (3 skills - Synthese)
📄 `context-injector.md`        # Formatteert de opgehaalde chunks schoon in de LLM-prompt
📄 `hallucination-guard.md`     # Zelf-reflectie prompt • forceert het model om zijn antwoord tegen de verschafte chunks te controleren
📄 `citation-builder.md`        # Voegt precieze bronlinks en paginanummers toe aan de uiteindelijke uitvoer

## 📁 deployment-evals/ (3 skills - Pijplijnonderhoud)
📄 `ragas-evaluator.md`         # Geautomatiseerde metriek die contextprecisie en antwoordrelevantie meet
📄 `cache-invalidation.md`      # Wist verouderde vector-embeddings wanneer brondocumenten worden bijgewerkt
📄 `github-final-sync.md`       # Geautomatiseerde commit van pijplijnconfiguaties en testscripts naar Github-uiteindelijke repo's

---
**Configuratiebestanden**
⚙️ `docker-compose.yml`         # Lokale implementatie voor het testen van de vector DB en insluitingsmicroservices
📦 `requirements.txt`           # LangChain, LlamaIndex en afhankelijkheden van het insluitingsmodel

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
