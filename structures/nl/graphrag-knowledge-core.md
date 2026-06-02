# 📂 GraphRAG Knowledge Core

> De canonieke werkruimte voor een GraphRAG-pipeline, die entiteiten en relaties extraheert om een Neo4j-kennisgraaf voor complexe, multi-hop reasoning te bouwen.

📄 `graph-architecture-brief.md` # Canonieke brief: Definiëert ontologie-regels, knooppuntlabels en relatietypen
🧠 `memory.md`                   # Sessiegeheugen: Dynamische contextbijhouding voor de actieve entiteitsextractiesessie
🤖 `CLAUDE.md`                   # Bedrijfsregels: Strikte instructies voor het genereren van geldige Cypher-query's

## 📁 ingestion-pipeline/ (4 vaardigheden - Ongestructureerd naar Graaf)
📄 `document-chunker.md`         # Tekststukking geoptimaliseerd voor entiteitsextractie in plaats van vectorzoeken
📄 `entity-extractor.md`         # LLM-pipeline • identificeert kernwoorden, organisaties en personen
📄 `relationship-mapper.md`      # Definieert semantische randen tussen geëxtraheerde entiteiten (bijv. "WORKS_FOR", "OWNS")
📄 `ontology-enforcer.md`        # Voorkomt dubbele knooppunten • maakt "Anthropic" en "Anthropic PBC" aan dezelfde entiteits-ID toe

## 📁 graph-database/ (3 vaardigheden - Neo4j Sync)
📄 `neo4j-connector.md`          # Veilige authenticatie en verbindingspooling voor de grafiekdatabase
📄 `batch-committer.md`          # Groepeert grafiekmutaties in bulktransacties om databasevergrendelingen te voorkomen
📄 `index-manager.md`            # Genereert automatisch volledige tekst- en vectorindexen op knoopuiteigenschappen voor snel ophalen

## 📁 retrieval-engine/ (4 vaardigheden - Query Generatie)
📄 `intent-classifier.md`        # Bepaalt of de vraag van de gebruiker een vectorzoeken of een multi-hop grafiektraversal vereist
📄 `cypher-generator.md`         # Vertaalt natuurlijke taalvragen in zeer geoptimaliseerde Neo4j Cypher-query's
📄 `schema-injector.md`          # Geeft het schema van de graaf door aan de LLM, zodat deze precies weet welke relaties beschikbaar zijn
📄 `fallback-vector-search.md`   # Activeert standaard RAG als de Cypher-query leeg retourneert

## 📁 synthesis-layer/ (3 vaardigheden - Antwoordformattering)
📄 `graph-context-formatter.md`  # Vertaalt ruwe JSON-graafpaden terug naar leesbare context voor de LLM
📄 `multi-hop-reasoner.md`       # Synthetiseert antwoorden die zich uitstrekken over 3+ graden van scheiding in de graaf
📄 `github-final-sync.md`        # Geautomatiseerde commits van bijgewerkte ontologiedefinities naar uiteindelijke Github-repositories

## 📁 telemetry-evals/ (3 vaardigheden - Graafgezondheid)
📄 `orphan-node-detector.md`     # Zoekt en verwijdert entiteiten zonder verbonden relaties
📄 `extraction-cost-tracker.md`  # Bewaakt het tokenverbruik van het draaien van zware entiteitsextractie-pipelines
📄 `cypher-error-logger.md`      # Volgt syntaxfouten in door LLM gegenereerde graafquery's voor fijnafstelling

---
**Configuratiebestanden**
⚙️ `docker-compose.yml`          # Lokale Neo4j APOC-instantie en worker node-implementaties
📦 `requirements.txt`            # Neo4j-stuurprogramma, LangChain Graph en Anthropic SDK-afhankelijkheden

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
