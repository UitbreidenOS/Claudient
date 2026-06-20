# 📂 Unstructured Data Pipeline

> De canonieke werkplek voor een geautomatiseerde, multi-modale opnameengine die ruwe audio, video en complexe PDF's normaliseert naar schone, vector-klare tekst en metagegevens.

📄 `pipeline-architecture-brief.md` # Canonieke brief: Definieert bestandsgroottelimieten, ondersteunde mime-types en chunking-strategieën
🧠 `memory.md`                      # Sessigeheugen: Dynamisch contextbewaking voor actieve langlopende opname-batchjobs
🤖 `CLAUDE.md`                      # Bedrijfsregels: Strikte instructies om de verwerking te stoppen als bestandscorruptie wordt gedetecteerd

## 📁 audio-processing/ (4 skills - Spraak naar Tekst)
📄 `format-converter.md`            # FFmpeg-wrapper • standaardiseert .m4a, .ogg en .wav naar 16kHz mono .mp3
📄 `vad-silence-stripper.md`        # Voice Activity Detection • verwijdert dode lucht om transcriptie-API-kosten besparen
📄 `whisperx-transcriber.md`        # Snelle transcriptie • verwerkt Word-Level timestamps en alignment
📄 `speaker-diarization.md`         # Pyannote-integratie • wijst "Speaker A" en "Speaker B" nauwkeurig toe over het transcript

## 📁 video-processing/ (3 skills - Frame & Audio-extractie)
📄 `audio-extractor.md`             # Decoupleert het audiotrack en routeert het naar de `audio-processing` pipeline
📄 `keyframe-sampler.md`            # Extraheert 1 frame per scènewissel (met OpenCV) voor visuele lay-outanalyse
📄 `on-screen-ocr.md`               # Parseert tekst van slides of schermdelingen ingebed in de video

## 📁 pdf-processing/ (4 skills - Complexe documentparsering)
📄 `layout-analyzer.md`             # Detecteert kolommen en leesvolgordes zodat tekst niet horizontaal wordt samengeperst
📄 `table-extractor.md`             # Behoudt rasterstructuren uit financiële rapporten in ruwe Markdown/JSON
📄 `ocr-fallback.md`                # Routeert gescande (niet-selecteerbare) PDF's automatisch naar Tesseract/AWS Textract
📄 `image-asset-saver.md`           # Isoleert ingebedde grafieken en diagrammen, slaat ze op S3 op met referentielinks

## 📁 unified-export/ (3 skills - Downstream normalisering)
📄 `schema-enforcer.md`             # Verpakt alle outputs (van video, audio of PDF) in een enkele, uniforme JSON-structuur
📄 `metadata-tagger.md`             # Voegt bron-URL, duur/paginaantal en verwerkingstijdstempel toe
📄 `vector-db-router.md`            # Duwt de genormaliseerde chunks naar Pinecone/Qdrant voor RAG-opname

## 📁 infrastructure-ops/ (3 skills - Schaal & Sync)
📄 `s3-event-listener.md`           # AWS Lambda trigger • start verwerking automatisch wanneer een bestand de bucket raakt
📄 `gpu-queue-manager.md`           # RabbitMQ/Celery worker pool routing zware taken naar Nvidia GPU-instanties
📄 `github-final-sync.md`           # Geautomatiseerde commits van verwerkingslogboeken en pipeline-updates naar GitHub final repos

---
**Configuratiebestanden**
⚙️ `docker-compose.gpu.yml`         # Setup voor lokale CUDA-enabled verwerkingsworkers
📦 `requirements.txt`               # FFmpeg-python, PyMuPDF, WhisperX, en OpenCV-afhankelijkheden
