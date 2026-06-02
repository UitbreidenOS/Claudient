# 📂 LLM Guardrail Proxy
> Der kanonische Arbeitsbereich für einen unternehmensgestützten LLM-Proxy, der alle ausgehenden KI-API-Aufrufe abfängt, zwischenspeichert und prüft, um unkontrollierte Tokenkosten zu verhindern und Sicherheit zu erzwingen.

📄 `proxy-architecture-brief.md` # Kanonisches Briefing: Definiert die globalen Tokenlimits, Schwellenwerte für semantisches Caching und Routing-Regeln
🧠 `memory.md`                   # Sitzungsspeicher: Dynamische Kontextverfolgung für aktuelle Proxy-Latenz und aktive Spitzen
🤖 `CLAUDE.md`                   # Betriebsregeln: Strenge Anweisungen zum Umgang mit API-Timeouts und Fallback-Logik

## 📁 traffic-interceptor/ (4 Fähigkeiten - Das Gateway)
📄 `request-validator.md`        # Weist malformed Payloads ab, bevor sie die LLM-API erreichen
📄 `rate-limiter.md`             # Erzwingt Limits für Tokens pro Minute (TPM) pro Benutzer oder Tenant-ID
📄 `pii-redactor.md`             # Entfernt sensible Daten (Sozialversicherungsnummern, E-Mails) aus Prompts vor dem Versand
📄 `prompt-injection-guard.md`   # Heuristische Prüfungen zur Blockierung von adversarialen Jailbreak-Versuchen

## 📁 cost-optimization/ (3 Fähigkeiten - Token-Verwaltung)
📄 `semantic-cache.md`           # Redis-gestütztes Vektorsuche • Liefert gecachte Antworten für ähnliche Anfragen ohne LLM-Hit
📄 `context-compressor.md`       # Fasst automatisch übermäßig lange Nachrichtenhistorien zusammen oder kürzt sie
📄 `model-downgrader.md`         # Leitet einfache Abfragen dynamisch zu Claude 3.5 Haiku weiter, um Kosten zu sparen, reserviert Sonnet für komplexes Reasoning

## 📁 observability-engine/ (4 Fähigkeiten - Analytik)
📄 `token-ledger.md`             # Hochpräzise Accounting von Prompt vs. Completion-Tokens pro Tenant
📄 `latency-tracker.md`          # Überwacht Time-to-First-Token (TTFT) und Gesamtgenerationsdauer
📄 `error-classifier.md`         # Gruppiert API-Ausfälle (z.B. 429 Too Many Requests vs 500 Internal Server Error)
📄 `github-final-sync.md`        # Automatisierte Commits täglicher Compliance-Logs und Proxy-Konfigurationen zu Github-Final-Repos

## 📁 fallback-orchestrator/ (3 Fähigkeiten - Hohe Verfügbarkeit)
📄 `circuit-breaker.md`          # Stoppt vorübergehend den Datenverkehr zu einem bestimmten LLM-Anbieter, wenn Fehlerquoten sprunghaft ansteigen
📄 `cross-region-router.md`      # Failover zu verschiedenen AWS Bedrock-Regionen, um lokale Ausfälle zu umgehen
📄 `retry-jitter.md`             # Exponential-Backoff-Algorithmen zur sanften Behandlung von Rate Limits

## 📁 evals/ (3 Fähigkeiten - Proxy-Benchmarking)
📄 `cache-hit-ratio.md`          # Bewertet, wie viel Geld der semantische Cache tatsächlich spart
📄 `redaction-accuracy.md`       # Prüft den PII-Redactor anhand von Dummy-Sensible-Payloads
📄 `overhead-latency.md`         # Stellt sicher, dass der Proxy selbst nicht mehr als 50 ms Verzögerung hinzufügt

---
**Konfigurationsdateien**
⚙️ `envoy.yaml`                  # Edge-Proxy-Konfigurationen für Routing von High-Throughput-Datenverkehr
📦 `go.mod`                      # Go-Abhängigkeiten für ultraschnelle gleichzeitige Anfrageverarbeitung

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
