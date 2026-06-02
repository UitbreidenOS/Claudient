# 📂 Realtime-Vektor-Ingestion
> Der kanonische Workspace für eine Echtzeitpipeline zur RAG-Datenaufnahme, die Kafka und Pinecone nutzt, um Streaming-Dokumentaktualisierungen mit Latenz unter einer Sekunde zu verarbeiten und einzubetten.

📄 `streaming-architecture-brief.md` # Kanonische Kurzbeschreibung: Kafka-Thema-Partitionierung, Consumer-Group-Skalierung und Vektor-Dimensionen
🧠 `memory.md`                       # Sitzungsgedächtnis: Dynamischer Kontext für aktive Consumer-Offset-Verfolgung
🤖 `CLAUDE.md`                       # Betriebsregeln: Strenge Anweisungen zum eleganten Umgang mit fehlerhaften JSON-Payloads

## 📁 stream-consumers/ (4 Skills - Kafka-Aufnahme)
📄 `topic-subscriber.md`             # Verwaltet Verbindungen zu hochdurchsatzfähigen Kafka-/Redpanda-Themen
📄 `offset-committer.md`             # Gewährleistet exactly-once-Verarbeitung • verhindert Re-Embedding desselben Dokuments bei Neustart
📄 `dead-letter-router.md`           # Fängt beschädigte Nachrichten ab und leitet sie zu einem sicheren Bucket zur manuellen Überprüfung
📄 `schema-validator.md`             # Setzt strikte Protobuf-/Avro-Schemas durch, bevor Daten in die Pipeline gelangen

## 📁 transformation-layer/ (3 Skills - Echtzeit-Verarbeitung)
📄 `streaming-chunker.md`            # Unterteilt eingehende Textströme spontan in vektorbereite Segmente
📄 `metadata-enricher.md`            # Fügt Zeitstempel, Quellen-ID und Autor zu jedem Chunk für nachgelagerte Filterung an
📄 `embedding-generator.md`          # Asynchroner Batch-Aufrufer für OpenAI-/Cohere-Embedding-APIs • maximiert den Durchsatz

## 📁 vector-sync/ (3 Skills - Datenbankschreibvorgänge)
📄 `pinecone-upserter.md`            # Handhabt Bulk-Upserts zur Vektordatenbank • optimiert Netzwerkaufrufe
📄 `collision-handler.md`            # Redis-gestützte Deduplizierung • überschreibt alte Chunks, wenn ein Dokument aktualisiert wurde
📄 `index-optimizer.md`              # Löst periodische Hintergrund-Merges aus, um die Latenz der Vektorsuche niedrig zu halten

## 📁 fallback-mechanisms/ (3 Skills - Fehlertoleranz)
📄 `retry-jitter.md`                 # Exponentielles Backoff für Embedding-API-Ratenlimits (429-Fehler)
📄 `circuit-breaker.md`              # Setzt die Kafka-Konsumption aus, wenn die Vektordatenbank ausfällt
📄 `spooling-cache.md`               # Schreibt vorübergehend auf die lokale Festplatte, wenn der Netzwerk-Egress vollständig fehlschlägt

## 📁 observability/ (3 Skills - Pipeline-Gesundheit)
📄 `throughput-monitor.md`           # Verfolgt Nachrichten pro Sekunde (MPS) und Embedding-Latenz
📄 `lag-detector.md`                 # Benachrichtigt Slack, wenn Consumer-Gruppen hinter dem Kafka-Producer zurückbleiben
📄 `github-final-sync.md`            # Automatisierte Commits von Schema-Updates und Pipeline-Konfigurationen in Github Final Repos

---
**Konfigurationsdateien**
⚙️ `docker-compose.yml`              # Lokales Kafka-, Zookeeper- und Redis-Cluster-Setup
📦 `go.mod`                          # Go-Abhängigkeiten (Nebenläufigkeit ist entscheidend für Streaming-Durchsatz)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
