# 📂 Multi-Tenant-Vektor-Store
> Der kanonische Arbeitsbereich für eine hochsichere, Multi-Mandanten-RAG-Vektordatenbank, bei der die Datenisolation von Unternehmen auf mathematischer Ebene garantiert ist.

📄 `tenant-architecture-brief.md` # Kanonischer Überblick: Definiert Namespace-Routing, Metadaten-Schemata und Row-Level Security (RLS) für Vektoren
🧠 `memory.md`                    # Sitzungsspeicher: Kontext-Tracking für aktive Mandanten-Erfassungs-Pipelines
🤖 `CLAUDE.md`                    # Betriebsregeln: Strikte Anweisungen, NIE Abfragen ohne hardcodiertes `tenant_id`-Filter zu schreiben

## 📁 identity-gateway/ (4 Skills - Authentifizierung & Routing)
📄 `jwt-decoder.md`               # Analysiert eingehende Anfragen, um die unveränderliche `tenant_id` und `user_role` zu extrahieren
📄 `namespace-allocator.md`       # Ordnet große Enterprise-Kunden dedizierten physischen Index-Namespaces zu (z.B. Pinecone-Namespaces)
📄 `rate-limiter.md`              # Verhindert problematische Nachbar-Effekte • begrenzt API-Durchsatz pro Mandant
📄 `zero-trust-middleware.md`     # Lehnt jede Vektor-Nutzlast ohne explizite Mandanten-Eigentumsmetadaten ab

## 📁 ingestion-api/ (3 Skills - Sichere Daten-Uploads)
📄 `tenant-aware-chunker.md`      # Teilt Dokumente auf und fügt die `tenant_id` erzwungenermaßen den Metadaten jedes Chunks hinzu
📄 `embedding-proxy.md`           # Stapelt Texte in OpenAI/Cohere und verfolgt Token-Kosten für den spezifischen Mandanten
📄 `data-retention-manager.md`    # Automatisierter Cron-Job zum endgültigen Löschen von Vektor-Chunks, wenn ein Mandant sein Abonnement kündigt (DSGVO-Konformität)

## 📁 search-gateway/ (4 Skills - Isolierte Abruf-Vorgänge)
📄 `query-rewriter.md`            # Nimmt die natürlichsprachige Frage des Benutzers und formatiert sie für die Vektorsuche
📄 `filter-enforcer.md`           # KRITISCH: Injiziert automatisch `{ "tenant_id": { "$eq": current_tenant } }` in JEDEN Suchfilter vor der Ausführung
📄 `hybrid-search-router.md`      # Mischt dichte Vektorsuche mit BM25-Stichwortsuche, streng im Gültigkeitsbereich der Mandanten-Daten
📄 `cross-encoder-reranker.md`    # Bewertet die top 20 isolierten Ergebnisse neu, um höchste Präzision für das LLM zu gewährleisten

## 📁 compliance-auditing/ (3 Skills - Sicherheits-Protokollierung)
📄 `access-ledger.md`             # Unveränderliche Protokollierung genau welcher Benutzer welche Vektoren abgefragt hat
📄 `breach-detector.md`           # Nächtliche heuristische Prüfung, um sicherzustellen, dass kein Chunk im Namespace von Mandant A die Metadaten von Mandant B hat
📄 `soc2-report-generator.md`     # Kompiliert automatisierte Nachweise der Datentrennung für Enterprise-Sicherheitsüberprüfungen

## 📁 infrastructure/ (3 Skills - Bereitstellung)
📄 `vector-db-connector.md`       # Verbindungs-Pooling für Qdrant/Pinecone/Milvus
📄 `disaster-recovery.md`         # Point-in-Time-Snapshots der Vektordatenbank
📄 `github-final-sync.md`         # Automatisierte Commits aktualisierter Schema-Definitionen in Github-Final-Repos

---
**Konfigurationsdateien**
⚙️ `qdrant-schema.json`           # Definiert die genaue Nutzlast-Struktur und stellt sicher, dass `tenant_id` ein erforderlicher Index ist
📦 `package.json`                 # Node/TypeScript-Abhängigkeiten (LangChain, Vector-DB-SDKs, JWT-Utilities)
