# 📂 LLM Guardrail Proxy
> De canonieke werkruimte voor een enterprise-grade LLM-proxy die alle uitgaande AI API-aanroepen onderschept, cacht en controleert om onbeheerste tokenkosten te voorkomen en beveiliging af te dwingen.

📄 `proxy-architecture-brief.md` # Canoniek brief: Definieert de globale tokenlimits, semantische cache-drempels en routeringsregels
🧠 `memory.md`                   # Sessiegeheugen: Dynamische contexttracking voor huidige proxylatentie en actieve pieken
🤖 `CLAUDE.md`                   # Bedrijfsregels: Strikte instructies over het omgaan met API-timeouts en fallback-logica

## 📁 traffic-interceptor/ (4 vaardigheden - De Gateway)
📄 `request-validator.md`        # Weigert misvormde payloads voordat ze de LLM API bereiken
📄 `rate-limiter.md`             # Dwingt tokens-per-minuut (TPM) limieten per gebruiker of tenant-ID af
📄 `pii-redactor.md`             # Wist gevoelige gegevens (burgerservicenummers, e-mails) uit prompts voordat deze vertrekken
📄 `prompt-injection-guard.md`   # Heuristische controles om adversariale jailbreak-pogingen te blokkeren

## 📁 cost-optimization/ (3 vaardigheden - Tokenbeheer)
📄 `semantic-cache.md`           # Redis-gestuurde vectorzoeken • bedient gecachte antwoorden voor vergelijkbare query's zonder de LLM aan te roepen
📄 `context-compressor.md`       # Vat excessief lange berichtgeschiedenissen automatisch samen of beknot deze
📄 `model-downgrader.md`         # Routeert eenvoudige query's dynamisch naar Claude 3.5 Haiku om kosten te besparen, reserveert Sonnet voor complexe redenering

## 📁 observability-engine/ (4 vaardigheden - Analytiek)
📄 `token-ledger.md`             # Nauwkeurige boekhouding van prompt vs. voltooiingstokens per tenant
📄 `latency-tracker.md`          # Bewaakt Time-to-First-Token (TTFT) en totale generatietijd
📄 `error-classifier.md`         # Groepeert API-fouten (bijv. 429 Too Many Requests vs 500 Internal Server Error)
📄 `github-final-sync.md`        # Geautomatiseerde commits van dagelijkse nalevingslogboeken en proxyconfiguraties naar Github final-repos

## 📁 fallback-orchestrator/ (3 vaardigheden - Hoge Beschikbaarheid)
📄 `circuit-breaker.md`          # Stopt tijdelijk het verkeer naar een specifieke LLM-provider als foutpercentages stijgen
📄 `cross-region-router.md`      # Failover naar verschillende AWS Bedrock-regio's om lokale uitval op te vangen
📄 `retry-jitter.md`             # Exponentiële backoff-algoritmes voor soepele afhandeling van ratelimits

## 📁 evals/ (3 vaardigheden - Proxy Benchmarking)
📄 `cache-hit-ratio.md`          # Evalueert hoeveel geld de semantische cache eigenlijk bespaart
📄 `redaction-accuracy.md`       # Controleert de PII-redactor tegen dummy gevoelige payloads
📄 `overhead-latency.md`         # Zorgt ervoor dat de proxy zelf niet meer dan 50ms vertraging toevoegt

---
**Configuratiebestanden**
⚙️ `envoy.yaml`                  # Edge-proxyconfiguraties voor routering van high-throughput-verkeer
📦 `go.mod`                      # Go-afhankelijkheden voor ultrasnelle gelijktijdige verzoekafhandeling
