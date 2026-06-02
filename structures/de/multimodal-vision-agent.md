# 📂 Multimodaler Vision-Agent
> Der kanonische Produktions-Arbeitsbereich für einen autonomen Vision-Agent, der dichte PDFs analysieren, komplexe Tabellen extrahieren und über unstrukturierte Layouts nachdenken kann.

📄 `vision-pipeline-brief.md` # Kanonisches Briefing: Layout-Parsing-Regeln, Fallback-OCR-Logik und Chunking-Strategien
🧠 `memory.md`                # Sitzungsspeicher: Dynamischer Kontext für Multi-Page-Dokumentverfolgung
🤖 `CLAUDE.md`                # Betriebsregeln: Strikte Anweisungen zur Beibehaltung räumlicher Beziehungen in extrahiertem Text

## 📁 ingestion-engine/ (5 Skills - Dokumentvorverarbeitung)
📄 `format-normalizer.md`     # Konvertiert diverse Eingaben (PDF, TIFF, HEIC) in Standard-Auflösungs-PNGs
📄 `layout-analyzer.md`       # Bounding-Box-Erkennung • trennt Textblöcke, Tabellen und Bilder
📄 `image-enhancer.md`        # Kontrastanpassung • bewahrt Originalfarben kritischer Assets (Diagramme/Gemälde)
📄 `pii-redactor.md`          # Visuelles Blacklisting • verschwimmt sensible Felder vor LLM-API-Übertragung
📄 `chunking-router.md`       # Teilt 100-seitige PDFs in parallele Verarbeitungs-Batches

## 📁 vision-workers/ (4 Agent-Personas - Die Extraktoren)
📄 `ocr-specialist.md`        # Hochpräzise Textextraktion für dichte, minderwertiger Scans
📄 `table-parser.md`          # Gitterrekonstruktion • gibt rohe strukturelle Markdown oder JSON aus
📄 `chart-reasoner.md`        # Visueller QA • extrahiert Trends und Datenpunkte aus Graphen
📄 `signature-verifier.md`    # Erkennt Präsenz und räumliche Ausrichtung menschlicher Signaturen

## 📁 data-normalization/ (3 Skills - Ausgabestrukturierung)
📄 `json-schema-enforcer.md`  # Validiert extrahierte Daten gegen strikte Pydantic-Modelle
📄 `confidence-scorer.md`     # Kennzeichnet Extraktionen mit niedriger Konfidenz für Mensch-in-der-Schleife-Überprüfung
📄 `spatial-reconstructor.md` # Zusammenführung unabhängiger Chunks in eine kohärente Leseordnung

## 📁 export-pipeline/ (3 Skills - Downstream-Synchronisierung)
📄 `database-commit.md`       # Fügt strukturierte JSON in Postgres/MongoDB ein
📄 `vector-embedding.md`      # Sendet verarbeiteten Text an den RAG-Pipeline-Vektorspeicher
📄 `github-final-sync.md`     # Automatisierte Commits validierter Datensätze zu finalen GitHub-Repos

## 📁 evals/ (3 Skills - Pipeline-Benchmarking)
📄 `extraction-accuracy.md`   # Vergleich mit Ground-Truth gegen bekannte Testdokumente
📄 `cost-optimizer.md`        # Token- und Image-Tile-Ausgabenverfolgung pro Dokument
📄 `hallucination-check.md`   # Stellt sicher, dass der Agent Daten nicht "erfunden" hat, die nicht im Bild vorhanden sind

---
**Konfigurationsdateien**
⚙️ `docker-compose.yml`       # Worker-Nodes und Redis-Queue-Konfigurationen
📦 `requirements.txt`         # Abhängigkeiten (PyMuPDF, OpenCV, Anthropic SDK)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
