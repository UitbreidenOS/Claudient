---
description: Een OpenAPI 3.1 spec genereren of bijwerken op basis van bestaande routes of een beschrijving
argument-hint: "[bronbestand-of-beschrijving]"
---
Genereer of werk een OpenAPI 3.1 specificatie bij op basis van: $ARGUMENTS

Als $ARGUMENTS een bestandspad is, lees de routedefinities uit dat bestand. Als het een beschrijving is, maak een spec van nul af aan. Indien leeg, scan de codebase op alle routedefinities en genereer een complete spec.

Vereisten:
- Gebruik OpenAPI 3.1.0 (niet 3.0.x — gebruik `type: "null"` niet `nullable: true`)
- Elke route moet hebben: samenvatting, operationId (camelCase, uniek), tags, parameters, requestBody (indien van toepassing) en responses
- Definieer alle schema's onder `components/schemas` — inline schema's in routeditems zijn verboden
- Gebruik `$ref` voor elk schema dat meer dan eens wordt verwezen
- Documenteer elke mogelijke response statuscode die de code daadwerkelijk retourneert — verzin niet extra
- Verplichte velden moeten in `required` arrays staan — geen stille optionals
- Enum-waarden moeten overeenkomen met wat de code afdwingt
- Voeg beveiligingsschemadefinities toe als de API authenticatie gebruikt (Bearer JWT, API-sleutel, OAuth2, enz.)
- Voeg `description` velden toe op alle niet-voor-de-hand-liggende eigenschappen
- Markeer verouderde eindpunten met `deprecated: true` indien gevonden

Formatregels:
- YAML-uitvoer, 2-spatie inspringing
- Houd `paths` alfabetisch gesorteerd op route
- Houd `components/schemas` alfabetisch gesorteerd

Voer het complete `openapi.yaml` bestand uit. Bij het bijwerken van een bestaande spec, toon alleen de gewijzigde secties met voldoende context om ze te plaatsen, en schrijf vervolgens het complete bijgewerkte bestand.

Indien de route-bron dubbelzinnig is of framework-specifieke decorators niet worden herkend, vermeld welke routes zijn overgeslagen en waarom.
