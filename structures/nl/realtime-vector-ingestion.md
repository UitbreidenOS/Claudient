# 📂 Realtime Vector Ingestion
> De canonieke werkruimte voor een realtime RAG-ingestieservleiding, gebruikmakend van Kafka en Pinecone om streaming documentupdates met sub-seconde latentie te verwerken en in te bedden.

📄 `streaming-architecture-brief.md` # Canonieke samenvatting: Kafka-onderwerppartitionering, consumentengroepschaling en vectordimensies
🧠 `memory.md`                       # Sessiegeheugen: Dynamische context voor actieve tracking van consumentencompensatie
🤖 `CLAUDE.md`                       # Bedrijfsregels: Strikte instructies voor het elegant omgaan met misvormde JSON-payload's

## 📁 stream-consumers/ (4 vaardigheden - Kafka-opname)
📄 `topic-subscriber.md`             # Beheert verbindingen met high-throughput Kafka/Redpanda-onderwerpen
📄 `offset-committer.md`             # Zorgt voor eenmalige verwerking • voorkomt opnieuw inbedden van dezelfde document bij herstart
📄 `dead-letter-router.md`           # Vangt beschadigde berichten op en stuurt ze naar een beveiligde bucket voor menselijke beoordeling
📄 `schema-validator.md`             # Forceert strikte Protobuf/Avro-schema's voordat gegevens in de pijpleiding worden toegelaten

## 📁 transformation-layer/ (3 vaardigheden - Realtime-verwerking)
📄 `streaming-chunker.md`            # Splitst inkomende tekststromen ter plekke in vector-gereed segmenten
📄 `metadata-enricher.md`            # Voegt tijdstempel, bron-ID en auteur toe aan elk segment voor downstreamfiltering
📄 `embedding-generator.md`          # Async-batchoproeper voor OpenAI/Cohere-inbeddingsAPI's • maximaliseert doorvoer

## 📁 vector-sync/ (3 vaardigheden - Database-schrijfbewerkingen)
📄 `pinecone-upserter.md`            # Handelt bulk-upserts naar de vectordatabase af • optimaliseert netwerkoproepen
📄 `collision-handler.md`            # Redis-ondersteunde deduplicatie • overschrijft verouderde chunks als een document werd bijgewerkt
📄 `index-optimizer.md`              # Triggert periodieke achtergrondsamenvoeging om vectorzoekladentie laag te houden

## 📁 fallback-mechanisms/ (3 vaardigheden - Fouttolerantie)
📄 `retry-jitter.md`                 # Exponentieel uitstel voor API-frequentielimietfouten (429-fouten)
📄 `circuit-breaker.md`              # Pauzeert Kafka-consumptie als de vectordatabase uitvalt
📄 `spooling-cache.md`               # Schrijft tijdelijk naar lokale schijf als netwerkuitgang volledig uitvalt

## 📁 observability/ (3 vaardigheden - Pijpleidingsgezondheid)
📄 `throughput-monitor.md`           # Volgt berichten per seconde (MPS) en inbeddingslatentie
📄 `lag-detector.md`                 # Waarschuwt Slack als consumentengroepen achterlopen op de Kafka-producent
📄 `github-final-sync.md`            # Geautomatiseerde commits van schema-updates en pijpleidingsconfiguraties naar Github-eindopslagruimten

---
**Configuratiebestanden**
⚙️ `docker-compose.yml`              # Lokale Kafka-, Zookeeper- en Redis-clusterinstelling
📦 `go.mod`                          # Go-afhankelijkheden (gelijktijdigheid is kritiek voor streamingdoorvoer)
