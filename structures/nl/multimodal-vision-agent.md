# 📂 Multimodale Vision Agent
> De canonieke productie werkruimte voor een autonome vision agent die dichte PDF's kan analyseren, complexe tabellen kan extraheren, en logisch kan redeneren over ongestructureerde layouts.

📄 `vision-pipeline-brief.md` # Canonieke brief: Layout parsing regels, fallback OCR logica, en chunking strategieën
🧠 `memory.md`                # Sessiegeheugen: Dynamische context voor multi-pagina documenttracking
🤖 `CLAUDE.md`                # Bedrijfsregels: Strikte instructies voor het behouden van ruimtelijke relaties in geëxtraheerde tekst

## 📁 ingestion-engine/ (5 skills - Document Voorverwerking)
📄 `format-normalizer.md`     # Converteert diverse invoer (PDF, TIFF, HEIC) naar standaard resolutie PNG's
📄 `layout-analyzer.md`       # Bounding box detectie • scheidt tekstblokken, tabellen en afbeeldingen
📄 `image-enhancer.md`        # Contrast aanpassing • behoudt originele kleuren van kritische assets (grafieken/schilderijen)
📄 `pii-redactor.md`          # Visueel blacklisten • vervaagt gevoelige velden vóór LLM API-transmissie
📄 `chunking-router.md`       # Splitst 100-pagina PDF's in parallelle verwerkingsbatches

## 📁 vision-workers/ (4 agent personas - De Extractors)
📄 `ocr-specialist.md`        # Nauwkeurige tekstextractie voor dichte, lage kwaliteit scans
📄 `table-parser.md`          # Roosterreconstructie • voert ruwe structurele Markdown of JSON uit
📄 `chart-reasoner.md`        # Visuele QA • extraheert trends en datapunten uit grafieken
📄 `signature-verifier.md`    # Detecteert aanwezigheid en ruimtelijke uitlijning van handtekeningen

## 📁 data-normalization/ (3 skills - Output Structurering)
📄 `json-schema-enforcer.md`  # Valideert geëxtraheerde data tegen strikte Pydantic modellen
📄 `confidence-scorer.md`     # Markeert lage-betrouwbaarheidextracties voor human-in-the-loop review
📄 `spatial-reconstructor.md` # Voegt onafhankelijke chunks weer samen in een samenhangend leesvolgorde

## 📁 export-pipeline/ (3 skills - Downstream Sync)
📄 `database-commit.md`       # Voegt gestructureerde JSON in in Postgres/MongoDB
📄 `vector-embedding.md`      # Stuurt verwerkte tekst naar de RAG pipeline vectorstore
📄 `github-final-sync.md`     # Geautomatiseerde commits van geverifieerde datasets naar GitHub finale repositories

## 📁 evals/ (3 skills - Pipeline Benchmarking)
📄 `extraction-accuracy.md`   # Ground-truth vergelijking met bekende testdocumenten
📄 `cost-optimizer.md`        # Token en afbeelding-tile spend tracking per document
📄 `hallucination-check.md`   # Zorgt ervoor dat de agent geen gegevens "uitvond" die niet in de afbeelding aanwezig zijn

---
**Configuratiebestanden**
⚙️ `docker-compose.yml`       # Worker nodes en Redis queue configuraties
📦 `requirements.txt`         # Dependencies (PyMuPDF, OpenCV, Anthropic SDK)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
