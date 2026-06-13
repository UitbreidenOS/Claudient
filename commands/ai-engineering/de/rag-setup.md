---
description: Scaffold a production-ready RAG pipeline for a given data source and stack
argument-hint: "[data source description and preferred stack]"
---
Sie entwerfen eine Retrieval-Augmented-Generation-Pipeline basierend auf: $ARGUMENTS

Wenn keine Stack-Präferenz angegeben ist, verwenden Sie: Python, LangChain, pgvector (PostgreSQL), `claude-sonnet-4-6` für die Generierung, `text-embedding-3-small` über OpenAI für Embeddings (wechseln Sie zu Voyage AI, wenn der Benutzer nur Anthropic angibt).

**Schritt 1 — Verstehen Sie die Daten**

Identifizieren Sie aus $ARGUMENTS:
- Quellentyp: PDFs, Webseiten, Datenbankzeilen, Code-Dateien, Notion/Confluence, E-Mails oder gemischt
- Aktualisierungshäufigkeit: statischer Bestand, nur Erweiterung oder häufig verändert
- Größenschätzung: <1 k Dokumente, 1 k–100 k oder 100 k+
- Empfindlichkeit: PII vorhanden? Air-gapped erforderlich?

Geben Sie Ihre Annahmen explizit an, falls nicht vorhanden.

**Schritt 2 — Wählen Sie Chunking-Strategie**

Wählen und begründen Sie eine:
- Feste Größe mit Überlappung (schnell, Basis)
- Semantisch/Satz-Fenster (bessere Kohärenz für Prosa)
- Rekursive Zeichenaufteilung nach Dokumentstruktur (Code, Markdown)
- Parent-Document Retriever (kleinen Chunk abrufen, übergeordneten Kontext zurückgeben)

Zeigen Sie die genaue Chunker-Konfiguration: `chunk_size`, `chunk_overlap`, Trennzeichenliste.

**Schritt 3 — Generieren Sie die Aufnahmepipeline**

Schreiben Sie ein Python-Skript (`ingest.py`), das:
- Dokumente aus dem oben identifizierten Quellentyp lädt
- Text bereinigt und normalisiert (Template entfernt, Leerzeichen normalisiert, Kodierung verarbeitet)
- Dokumente mit der gewählten Strategie in Chunks aufteilt
- Chunks in Batches einbettet (max. 512 pro API-Aufruf)
- In den Vektorspeicher mit Metadaten aufnimmt: `source`, `chunk_index`, `ingested_at`
- Idempotent ist — erneute Ausführung auf unveränderten Dokumenten führt nicht zu erneuten Embeddings

**Schritt 4 — Generieren Sie die Abruf- + Generierungskette**

Schreiben Sie ein Python-Modul (`rag_chain.py`), das:
- Eine Benutzerfrage (String) akzeptiert
- Die Abfrage einbettet und Top-K-Chunks abruft (Standard K=5) mit MMR-Neuordnung
- Ein Systemprompt konstruiert, das das Modell anweist, nur aus abgerufenen Kontexten zu antworten und Quellen nach `source`-Metadatenfeld zu zitieren
- Ruft `claude-sonnet-4-6` mit Prompt-Caching im Kontextblock auf (verwenden Sie `cache_control: {"type": "ephemeral"}` in den Kontextnachrichten)
- Gibt zurück: `{"answer": str, "sources": list[str], "tokens_used": int}`

**Schritt 5 — Operationale Checkliste**

List als Kontrollkästchen:
- [ ] Index-Frische-Strategie (geplante Neuaufnahme vs. Webhook-Auslöser)
- [ ] Embedding-Modellversion-Pinning
- [ ] Abrufqualitätsmetriken zum Nachverfolgen (MRR, recall@K)
- [ ] Fallback wenn Abrufvertrauen niedrig ist
- [ ] PII-Bereinigung falls zutreffend

Ausgabe: `ingest.py`, `rag_chain.py`, operationale Checkliste. Keine Stubs.
