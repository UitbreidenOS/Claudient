---
description: Genereer een getypeerde client SDK op basis van een OpenAPI-specificatie of bestaande API-routes
argument-hint: "[taal] [spec-bestand-of-basis-url]"
---
Genereer een client SDK voor: $ARGUMENTS

Parse als: doeltaal (TypeScript, Python, Go, enz.) en ofwel een pad naar een OpenAPI-specificatiebestand ofwel een basis-URL. Als er geen spec-bestand bestaat, genereer er eerst een vanuit de codebase voordat u de SDK genereert.

SDK-vereisten per taal:

TypeScript:
- ESM + CommonJS dual output via `package.json` `exports` veld
- Volledige generieke typen — geen `any`, geen type assertions zonder rechtvaardiging
- Gebruik `fetch` natively; accepteer een optionele aangepaste fetch-implementatie voor test mocking
- Zod-schema's voor validatie van runtime-respons (optioneel maar includeert als het project Zod gebruikt)
- Tree-shakeable: elke bron als een benoemde export, niet een klasse met alles erop

Python:
- `httpx` voor async, `requests` voor sync — bied beide of vraag welke
- Pydantic-modellen voor alle aanvraag-/antwoordtypen
- Type hints overal, `py.typed` marker voor PEP 561-compliance
- Async-client als de primaire interface, sync als een dunne wrapper

Go:
- Idiomatische Go: methoden op een `Client` struct, context als eerste parameter, `(T, error)` return-patroon
- Apart types-pakket voor gegenereerde modellen
- Geen externe afhankelijkheden buiten `net/http` tenzij het project er al een gebruikt

Alle talen:
- Één client-klasse/struct per resourcegroep (spiegelt de OpenAPI `tags`)
- Constructor accepteert: basis-URL, auth-token/API-sleutel, optionele HTTP-client
- Alle methoden komen 1:1 overeen met OpenAPI `operationId`-waarden
- Retourneer getypeerde response-objecten — nooit ruwe strings of ongetypeerde kaarten
- Propageer alle HTTP-fouten als getypeerde foutobjekten met `status`, `code` en `message`
- README met installatie, initialisatie en één voorbeeld per bron

Voer de SDK uit als een mapstructuurlijst, vervolgens de volledige bestandsinhoud voor elk bestand. Als de spec meer dan 20 bewerkingen heeft, genereer dan de core client-infrastructuur en de eerste resourcegroep, en geef vervolgens de resterende groepen op aanvraag weer.
