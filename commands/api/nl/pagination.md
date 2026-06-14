---
description: Voeg cursor-gebaseerde of offset paginering toe aan een list-eindpunt met consistente responsstructuur
argument-hint: "[endpoint-of-model]"
---
Voeg paginering toe aan het eindpunt of de bron: $ARGUMENTS

Als $ARGUMENTS leeg is, zoek alle list-eindpunten (die arrays retourneren) en pas paginering toe op elk.

Kies de pageringstrategie op basis van het gebruiksscenario:
- Cursor-gebaseerd (standaard voor de meeste feeds en grote datasets): stabiel onder gelijktijdige schrijfbewerkingen, ondersteunt oneindig scrollen, kan niet naar een willekeurige pagina springen
- Offset/pagina-gebaseerd (alleen als de UI "ga naar pagina N" vereist): eenvoudiger maar inconsistent onder schrijfbewerkingen

Cursor-gebaseerde implementatie:
- Cursor codeert de sorteerkolom waarde + primaire sleutel van de laatst geziene rij — base64-coderen, nooit ruwe DB-waarden blootleggen
- Standaard sortering: aflopend op `created_at`, secundaire sortering op `id` voor gelijkspel
- Accepteer `cursor` (ondoorzichtige tekenreeks) en `limit` (geheel getal, 1–100, standaard 20) als queryparameters
- Valideer `limit` — weiger < 1 of > 100 met 400
- Responsstructuur:
  ```json
  {
    "data": [...],
    "pagination": {
      "next_cursor": "<ondoorzichtig>",
      "has_more": true,
      "limit": 20
    }
  }
  ```
- `next_cursor` is null als er geen volgende pagina's zijn
- Lek nooit het totale aantal tenzij expliciet vereist — het is duur op schaal

Offset-gebaseerde implementatie (alleen als aangevraagd):
- Accepteer `page` (1-geïndexeerd) en `per_page` (1–100, standaard 20)
- Voeg `total`, `page`, `per_page`, `total_pages` toe aan de responsenvelope

Beide strategieën:
- Voeg een database-index toe op de sorteerkolom als deze nog niet bestaat
- De query moet een enkele DB-aanroep zijn — geen N+1 door apart het aantal op te halen tenzij offset paginering dit vereist
- Werk de OpenAPI-spec voor het eindpunt bij, indien aanwezig

Schrijf tests: eerste pagina, tweede pagina via cursor, leeg resultaat, limietvalidatie.
