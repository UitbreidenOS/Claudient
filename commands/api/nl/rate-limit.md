---
description: Voeg rate limiting toe aan API-eindpunten met configureerbare strategieën en juiste 429-antwoorden
argument-hint: "[endpoint-of-router] [limiet] [venster]"
---
Implementeer rate limiting voor: $ARGUMENTS

Parseer als: doel-eindpunt of routerpad, aanvraagenlimiet (bijv. 100), tijdvenster (bijv. 1m, 1h). Indien niet opgegeven, pas verstandige standaardwaarden toe: 100 req/min voor openbare eindpunten, 1000 req/min voor geverifieerde eindpunten.

Implementatievereisten:
- Identificeer de bestaande rate-limit-infrastructuur (Redis, in-memory, middleware-bibliotheek) — gebruik deze in plaats van een tweede systeem in te voeren
- Kies op basis van implementatie indien geen rate limiter bestaat: Redis-gesteund voor multi-instance, in-memory met waarschuwing voor single-instance
- Sleutel op: IP voor niet-geverifieerde routes, gebruiker/tenant-ID voor geverifieerde routes, API-sleutel voor sleutel-geverifieerde routes
- Pas limieten toe op middleware/decorator-niveau — verspreid limitcontroles niet in bedrijfslogica
- Retourneer `429 Too Many Requests` met deze headers:
  - `Retry-After: <seconden>`
  - `X-RateLimit-Limit: <limiet>`
  - `X-RateLimit-Remaining: <resterend>`
  - `X-RateLimit-Reset: <unix-timestamp>`
- Response-body: `{ "error": "rate_limit_exceeded", "retry_after": <seconden> }`
- Schuivend venster heeft voorkeur boven vast venster — voorkomt burst aan venstergrenzen
- Ondersteun per-route overschrijving van limieten zonder de globale configuratie aan te raken

Configuratie:
- Limieten moeten configureerbaar zijn via omgevingsvariabelen of configuratiebestand — geen magische getallen in middleware
- Documenteer de omgevingsvariabelennamen in een opmerking op de definitieplek

Schrijf tests voor:
- Aanvraag binnen limiet (slaagt)
- Aanvraag op exacte limiet (slaagt)
- Aanvraag die limiet overschrijdt (429 met correcte headers)
- Limietreset na verstrijken van venster
