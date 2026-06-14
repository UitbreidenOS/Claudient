---
description: Controleer de API en produceer een versieringsstrategie met migratietrajecten voor brekende wijzigingen
argument-hint: "[huidige-versie] [doelversie]"
---
Produceer een API-versieringsplan voor: $ARGUMENTS

Interpreteren als: huidige versie (bijv. v1) en doelversie (bijv. v2). Indien weggelaten, analyseer de bestaande API en beveel aan of versiering überhaupt nodig is.

Analysefase — lees de codebase en identificeer:
1. Alle openbare eindpunten (pad, methode, verzoekshape, antwoordshape)
2. Welke wijzigingen breken af versus niet-breken:
   - Breken: een veld verwijderen, een veldtype wijzigen, een veld hernoemen, statuscode-semantiek wijzigen, een eindpunt verwijderen, authenticatievereisten wijzigen
   - Niet-breken: een optioneel veld toevoegen, een nieuw eindpunt toevoegen, een nieuwe enum-waarde toevoegen (met voorzichtigheid), validatie ontspannen
3. Eventuele bestaande clients of SDK-consumenten die erdoor zouden worden beïnvloed

Versioneringsstrategie selectie:
- URL-padversioning (`/v2/`) — aanbevolen standaard; expliciet, cacheable, gemakkelijk te routeren
- Headerversioning (`API-Version: 2`) — schonere URLs maar moeilijker in browsers te testen; alleen gebruiken als het project dit al doet
- Query-parameterversioning — vermijden; niet RESTful en breekt caching

Implementatieplan:
- Definieer het versievoorsvoegsel op één plaats (routerconfiguratie, basis-URL-constante) — niet verspreid in elke route
- Oude versierouteringenen moeten functioneel blijven voor een afschaffingsperiode (aanbeveling: minimaal 6 maanden voor externe API's, 1 grote release voor interne)
- Voeg `Deprecation` en `Sunset`-headers toe aan v1-antwoorden wanneer v2 wordt geüpload
- Versie alleen de routes met brekende wijzigingen — identieke routes kunnen handlers delen over versies heen
- Definieer een migratiegidsdocument met alle brekende wijzigingen met voor/na-voorbeelden

Uitvoer:
1. Lijst met gevonden brekende wijzigingen (of "geen gevonden" indien schoon)
2. Aanbevolen versieringsstrategie met rechtvaardiging
3. Routerstructuur die toont hoe v1 en v2 naast elkaar bestaan
4. Codewijzigingen nodig om de versiesplitsing uit te voeren
5. Aanbeveling voor afschaffingstijdlijn
6. Migratieguidsgeraamte voor API-consumenten
