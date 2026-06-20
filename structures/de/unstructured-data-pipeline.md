# 📂 Unstructured Data Pipeline

> Der kanonische Workspace für eine automatisierte Multi-Modal-Erfassungs-Engine, die Rohdaten aus Audio, Video und komplexen PDFs in sauberen, vektorgebrauchsfertigen Text und Metadaten normalisiert.

📄 `pipeline-architecture-brief.md` # Kanonische Kurzfassung: Definiert Dateigrößenlimits, unterstützte MIME-Typen und Chunking-Strategien
🧠 `memory.md`                      # Sitzungsspeicher: Dynamische Kontextverfolgung für aktive, langwierige Batch-Erfassungsjobs
🤖 `CLAUDE.md`                      # Betriebsregeln: Strikte Anweisungen zur Verarbeitung stoppen, wenn Dateikorruption erkannt wird

## 📁 audio-processing/ (4 Skills - Sprache-zu-Text)
📄 `format-converter.md`            # FFmpeg-Wrapper • normalisiert .m4a, .ogg und .wav auf 16kHz Mono .mp3
📄 `vad-silence-stripper.md`        # Voice Activity Detection • schneidet Stille weg, um Transkriptions-API-Kosten zu sparen
📄 `whisperx-transcriber.md`        # Hochgeschwindigkeits-Transkription • verarbeitet Word-Level-Zeitstempel und Ausrichtung
📄 `speaker-diarization.md`         # Pyannote-Integration • ordnet "Sprecher A" und "Sprecher B" korrekt über das Transkript zu

## 📁 video-processing/ (3 Skills - Frame- und Audio-Extraktion)
📄 `audio-extractor.md`             # Separiert die Audiospur und leitet sie an die `audio-processing`-Pipeline
📄 `keyframe-sampler.md`            # Extrahiert 1 Frame pro Szenenwechsel (mit OpenCV) zur visuellen Layout-Analyse
📄 `on-screen-ocr.md`               # Parst Text aus Folien oder Bildschirmfreigaben im Video

## 📁 pdf-processing/ (4 Skills - Komplexe Dokumentenverarbeitung)
📄 `layout-analyzer.md`             # Erkennt Spalten und Lesereihenfolge, damit Text nicht horizontal zusammengequetscht wird
📄 `table-extractor.md`             # Bewahrt Gitterstrukturen aus Finanzberichten in Rohform als Markdown/JSON
📄 `ocr-fallback.md`                # Leitet gescannte (nicht auswählbare) PDFs automatisch zu Tesseract/AWS Textract weiter
📄 `image-asset-saver.md`           # Isoliert eingebettete Diagramme und Bilder, speichert sie auf S3 mit Referenzlinks

## 📁 unified-export/ (3 Skills - Downstream-Normalisierung)
📄 `schema-enforcer.md`             # Umhüllt alle Ausgaben (von Video, Audio oder PDF) in eine einzige, einheitliche JSON-Struktur
📄 `metadata-tagger.md`             # Fügt Quell-URL, Dauer/Seitenzahl und Verarbeitungs-Zeitstempel hinzu
📄 `vector-db-router.md`            # Pushed normalisierte Chunks zu Pinecone/Qdrant für RAG-Erfassung

## 📁 infrastructure-ops/ (3 Skills - Skalierung & Synchronisierung)
📄 `s3-event-listener.md`           # AWS Lambda-Trigger • startet automatisch die Verarbeitung, wenn eine Datei im Bucket ankommt
📄 `gpu-queue-manager.md`           # RabbitMQ/Celery Worker-Pool-Routing von schweren Tasks zu Nvidia GPU-Instanzen
📄 `github-final-sync.md`           # Automatisierte Commits von Verarbeitungsprotokollen und Pipeline-Updates zu Github-Repos

---
**Konfigurationsdateien**
⚙️ `docker-compose.gpu.yml`         # Setup für lokale CUDA-fähige Verarbeitungs-Worker
📦 `requirements.txt`               # FFmpeg-python, PyMuPDF, WhisperX und OpenCV-Abhängigkeiten
