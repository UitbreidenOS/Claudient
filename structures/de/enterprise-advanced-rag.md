# 📂 Enterprise Advanced RAG
> Der kanonische Arbeitsbereich für eine produktive Retrieval-Augmented Generation (RAG)-Pipeline mit hybrider Suche, Parent-Child-Chunking und Cross-Encoder-Neuranking.

📄 `rag-architecture-brief.md`  # Kanonisches Brief: Suchgewichtungen (Keyword vs. Semantic) und Chunking-Limits
🧠 `memory.md`                  # Sitzungsspeicher: Dynamische Kontextverfolgung für die aktive Abrufsitzung
🤖 `CLAUDE.md`                  # Betriebsregeln: Strenge Anweisungen für das LLM, um nur abgerufene Kontexte zu zitieren

## 📁 ingestion-pipeline/ (4 Skills - Datenvorbereitung)
📄 `document-parser.md`         # Multi-Format-Erfassung • verarbeitet PDFs, Markdown und Rohtext
📄 `metadata-extractor.md`      # Auto-Tags-Chunks mit Autor, Datum und Quelldomäne zur Vorfilterung
📄 `pii-scrubber.md`            # Redaktiert sensible Informationen vor dem Senden an das Einbettungsmodell
📄 `vector-sync.md`             # Schiebt verarbeitete Dokumente in Pinecone/Milvus-Datenbanken

## 📁 chunking-strategies/ (3 Skills - Kontext-Slicing)
📄 `semantic-splitter.md`       # Bricht Dokumente natürlicherweise an Absatz- oder Kopfzeilengrenzen auf
📄 `parent-child-linker.md`     # Erstellt kleine Child-Chunks für präzise Suche, verlinkt mit größeren Parent-Chunks für vollständigen LLM-Kontext
📄 `table-preserver.md`         # Stellt sicher, dass Markdown-Tabellen nicht horizontal über verschiedene Chunks verteilt werden

## 📁 retrieval-engine/ (4 Skills - Der Suchkern)
📄 `query-expander.md`          # LLM-Vorverarbeitungsschritt • generiert 3 Variationen der Benutzerabfrage zur Verbesserung der Trefferquote
📄 `hybrid-search.md`           # Kombiniert Dense Vector Search (Embeddings) mit Sparse Search (BM25 Keyword)
📄 `cross-encoder-reranker.md`  # Übergibt die Top 20 Ergebnisse an Cohere ReRank, um die relevantesten Top 5 hervorzuheben
📄 `metadata-filter.md`         # Wendet harte Einschränkungen an (z. B. „nur Dokumente von 2026 durchsuchen") vor der Vektorabstimmung

## 📁 generation-layer/ (3 Skills - Synthese)
📄 `context-injector.md`        # Formatiert die Top-abgerufenen Chunks sauber in die LLM-Eingabeaufforderung
📄 `hallucination-guard.md`     # Self-Reflection-Eingabeaufforderung • zwingt das Modell, seine Antwort gegen die bereitgestellten Chunks zu überprüfen
📄 `citation-builder.md`        # Fügt präzise Quellenlinks und Seitennummern zur endgültigen Ausgabe an

## 📁 deployment-evals/ (3 Skills - Pipeline-Wartung)
📄 `ragas-evaluator.md`         # Automatisierte Metriken zur Messung der Kontextgenauigkeit und Antwortrelevanz
📄 `cache-invalidation.md`      # Löscht alte Vektoreinbettungen, wenn Quelldokumente aktualisiert werden
📄 `github-final-sync.md`       # Automatisierter Commit von Pipeline-Konfigurationen und Test-Skripten zu Github-Final-Repos

---
**Konfigurationsdateien**
⚙️ `docker-compose.yml`         # Lokale Bereitstellung zum Testen der Vector DB und Embedding-Microservices
📦 `requirements.txt`           # LangChain, LlamaIndex und Embedding-Modell-Abhängigkeiten

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
