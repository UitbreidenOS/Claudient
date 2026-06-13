---
description: Definieer en dwing een consistent foutreactieschema af over alle API-eindpunten
argument-hint: "[scope: file, router, of 'all']"
---
Audit en dwing een consistent foutreactieschema af voor: $ARGUMENTS

Scope standaardwaarde naar de gehele API als $ARGUMENTS leeg is of "all".

Doelschema voor fouten (RFC 9457 / Problem Details for HTTP APIs):
```json
{
  "type": "https://example.com/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The 'email' field must be a valid email address.",
  "instance": "/requests/abc-123",
  "trace_id": "3f2e1d..."
}
```

Gebruik dit schema tenzij het project al een vastgesteld foutformat heeft — als dat het geval is, standaardiseer daar in plaats daarvan naar.

Stappen:
1. Scan alle foutretournerende codepaden: gooide uitzonderingen, foutmiddleware, catch-blokken, validatiehandlers
2. Identificeer inconsistenties: eenvoudige tekenreeksen, inconsistente sleutels (`message` vs `error` vs `detail`), ontbrekende statuscodes, gemengde vormen
3. Definieer één fouttype/interface/klasse bij de projectroot (`ApiError` of equivalent)
4. Vervang elke ad-hocfoutreactie door gestructureerde constructie van dat type
5. Centraliseer alle foutomserialisatie op één plaats (foutmiddleware / exceptionhandler) — niet verspreid over controllers
6. Zorg ervoor dat validatiefouten fouten per veld opsommen:
   ```json
   "errors": [{ "field": "email", "message": "Invalid format" }]
   ```
7. Strip stack traces uit productierespons — log ze aan serverzijde, nooit naar client sturen
8. Toewijzing interne fouttypen aan HTTP-statuscodes in één opzoektabel — geen statuscodeliteralen buiten die kaart
9. Voeg een `trace_id` toe gecorreleerd met uw loggingsysteem als er een in gebruik is

Uitvoer:
- De fouttype-definitie
- De gecentraliseerde fouthandler
- Lijst met alle gewijzigde bestanden
- Eventuele foutreacties die niet konden worden gestandaardiseerd (met reden)
