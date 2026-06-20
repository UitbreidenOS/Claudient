# 📂 Multi-Tenant Vector Store
> De canonieke werkplek voor een uiterst veilige, multi-tenant RAG-vectordatabase waar enterprise-dataisolatie op queryniveau wiskundig gegarandeerd is.

📄 `tenant-architecture-brief.md` # Canonieke samenvatting: Definieert naamruimte-routing, metagegevensschema's en beveiliging op rijniveau (RLS) voor vectoren
🧠 `memory.md`                    # Sessiegeheugen: Contexttracking voor actieve tenant-ingestieprocessen
🤖 `CLAUDE.md`                    # Bedrijfsregels: Strikte instructies om NOOIT queries uit te voeren zonder een hardgecodeerd `tenant_id`-filter

## 📁 identity-gateway/ (4 skills - Authenticatie & Routering)
📄 `jwt-decoder.md`               # Parseert inkomende verzoeken om de onveranderbare `tenant_id` en `user_role` uit te pakken
📄 `namespace-allocator.md`       # Wijst grote enterpriseclients toe aan speciale fysieke indexnaamruimten (bijv. Pinecone-naamruimten)
📄 `rate-limiter.md`              # Voorkomt lawaaierige buurnummers • beperkt API-doorvoer per tenant
📄 `zero-trust-middleware.md`     # Verwijdert alle vectornuttige lasten zonder expliciete eigendomsmetagegevens van de tenant

## 📁 ingestion-api/ (3 skills - Veilige gegevensuploads)
📄 `tenant-aware-chunker.md`      # Snijdt documenten terwijl de `tenant_id` wordt geforceerd toegevoegd aan de metagegevens van elk chunk
📄 `embedding-proxy.md`           # Batcheert teksten naar OpenAI/Cohere terwijl tokenkosten terug worden gevolgd naar de specifieke tenant
📄 `data-retention-manager.md`    # Geautomatiseerde cronjob om vectorchunks hard te verwijderen wanneer een tenant hun abonnement opzegt (GDPR-naleving)

## 📁 search-gateway/ (4 skills - Geïsoleerde opvraging)
📄 `query-rewriter.md`            # Neemt de natuurlijke taalgvraag van de gebruiker en formateert deze voor vectorzoeking
📄 `filter-enforcer.md`           # KRITIEK: Injecteert automatisch `{ "tenant_id": { "$eq": current_tenant } }` in elk zoekfilter vóór uitvoering
📄 `hybrid-search-router.md`      # Mengt dense vectorzoeking met BM25-sleutelwoordzoeking, strikt beperkt tot de gegevens van de tenant
📄 `cross-encoder-reranker.md`    # Herschaalt de top 20 geïsoleerde resultaten om de hoogste precisie voor de LLM te garanderen

## 📁 compliance-auditing/ (3 skills - Beveiligingslogging)
📄 `access-ledger.md`             # Onveranderbare registratie van precies welke gebruiker welke vectoren opvroeg
📄 `breach-detector.md`           # Nachtelijke heuristische scan om ervoor te zorgen dat geen chunk in Tenant A's naamruimte Tenant B's metagegevens bevat
📄 `soc2-report-generator.md`     # Compileert geautomatiseerd bewijs van gegevenssegmentatie voor reviews van bedrijfsbeveiliging

## 📁 infrastructure/ (3 skills - Implementatie)
📄 `vector-db-connector.md`       # Verbindingspooling voor Qdrant/Pinecone/Milvus
📄 `disaster-recovery.md`         # Moment-in-tijd-snapshots van de vectordatabase
📄 `github-final-sync.md`         # Geautomatiseerde commits van bijgewerkte schemadefinities naar Github-finalrepository's

---
**Configuratiebestanden**
⚙️ `qdrant-schema.json`           # Definieert de exacte laadstructuur, zodat `tenant_id` een vereiste index is
📦 `package.json`                 # Node/TypeScript-afhankelijkheden (LangChain, vector DB SDK's, JWT-hulpprogramma's)
