# 📂 GraphRAG Knowledge Core

> Der kanonische Arbeitsbereich für eine GraphRAG-Pipeline, die Entitäten und Beziehungen extrahiert, um ein Neo4j-Wissensgraph für komplexe Multi-Hop-Reasoning zu erstellen.

📄 `graph-architecture-brief.md` # Kanonische Kurzbeschreibung: Definiert Ontologie-Regeln, Knotenbeschriftungen und Beziehungstypen
🧠 `memory.md`                   # Sitzungsspeicher: Dynamisches Kontext-Tracking für die aktive Entity-Extraction-Sitzung
🤖 `CLAUDE.md`                   # Betriebsregeln: Strikte Anweisungen zum Generieren gültiger Cypher-Abfragen

## 📁 ingestion-pipeline/ (4 Fähigkeiten - Unstrukturiert zu Graph)
📄 `document-chunker.md`         # Textsegmentierung optimiert für Entity-Extraktion statt Vektorsuche
📄 `entity-extractor.md`         # LLM-Pipeline • identifiziert Kern-Substantive, Organisationen und Personen
📄 `relationship-mapper.md`      # Definiert die semantischen Kanten zwischen extrahierten Entitäten (z.B. "WORKS_FOR", "OWNS")
📄 `ontology-enforcer.md`        # Verhindert doppelte Knoten • ordnet "Anthropic" und "Anthropic PBC" der gleichen Entity-ID zu

## 📁 graph-database/ (3 Fähigkeiten - Neo4j-Synchronisierung)
📄 `neo4j-connector.md`          # Sichere Authentifizierung und Connection-Pooling für die Graph-Datenbank
📄 `batch-committer.md`          # Gruppiert Graph-Mutationen in Massen-Transaktionen zur Vermeidung von Datenbank-Sperren
📄 `index-manager.md`            # Generiert automatisch Volltextindizes und Vektor-Indizes auf Knoteneigenschaften für schnelle Abrufvorgänge

## 📁 retrieval-engine/ (4 Fähigkeiten - Query-Generierung)
📄 `intent-classifier.md`        # Bestimmt, ob die Frage des Benutzers eine Vektorsuche oder einen Multi-Hop-Graph-Traversal erfordert
📄 `cypher-generator.md`         # Übersetzt natürlichsprachige Fragen in hochoptimierte Neo4j Cypher-Abfragen
📄 `schema-injector.md`          # Übergibt das Schema des Graphs an das LLM, damit es genau weiß, welche Beziehungen verfügbar sind
📄 `fallback-vector-search.md`   # Triggert Standard-RAG, wenn die Cypher-Abfrage leer zurückkommt

## 📁 synthesis-layer/ (3 Fähigkeiten - Response-Formatierung)
📄 `graph-context-formatter.md`  # Übersetzt rohe JSON-Graph-Pfade zurück in lesbaren Kontext für das LLM
📄 `multi-hop-reasoner.md`       # Synthetisiert Antworten, die sich über 3+ Ebenen der Trennung im Graph erstrecken
📄 `github-final-sync.md`        # Automatisierte Commits von aktualisierten Ontologie-Definitionen zu Github-Endbranches

## 📁 telemetry-evals/ (3 Fähigkeiten - Graph-Gesundheit)
📄 `orphan-node-detector.md`     # Findet und bereinigt Entitäten, die keine verbundenen Beziehungen haben
📄 `extraction-cost-tracker.md`  # Überwacht den Token-Verbrauch beim Ausführen schwerer Entity-Extraction-Pipelines
📄 `cypher-error-logger.md`      # Verfolgt Syntaxfehler in LLM-generierten Graph-Abfragen zum Fine-Tuning

---
**Konfigurationsdateien**
⚙️ `docker-compose.yml`          # Lokale Neo4j APOC-Instanz und Worker-Node-Implementierungen
📦 `requirements.txt`            # Neo4j-Treiber, LangChain Graph und Anthropic SDK-Abhängigkeiten

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
