---
description: Definieren und durchsetzen eines konsistenten Error-Response-Schemas über alle API-Endpunkte hinweg
argument-hint: "[scope: file, router, or 'all']"
---
Audit und Durchsetzung eines konsistenten Error-Response-Schemas für: $ARGUMENTS

Der Bereich wird standardmäßig auf die gesamte API gesetzt, wenn $ARGUMENTS leer oder „all" ist.

Ziel-Error-Schema (RFC 9457 / Problem Details for HTTP APIs):
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

Verwenden Sie dieses Schema, es sei denn, das Projekt hat bereits ein etabliertes Error-Format — falls ja, standardisieren Sie auf dieses statt.

Schritte:
1. Scannen Sie alle Error-zurückgebenden Code-Pfade: geworfene Exceptions, Error-Middleware, Catch-Blöcke, Validation-Handler
2. Identifizieren Sie Inkonsistenzen: reine Strings, inkonsistente Schlüssel (`message` vs `error` vs `detail`), fehlende Status-Codes, gemischte Formen
3. Definieren Sie einen einzigen Error-Typ/Interface/Klasse in der Projektwurzel (`ApiError` oder äquivalent)
4. Ersetzen Sie jeden Ad-hoc-Error-Response durch strukturierte Konstruktion dieses Typs
5. Zentralisieren Sie alle Error-Serialisierung an einer Stelle (Error-Middleware / Exception-Handler) — nicht verstreut über Controller
6. Stellen Sie sicher, dass Validierungsfehler Fehler pro Feld aufzählen:
   ```json
   "errors": [{ "field": "email", "message": "Invalid format" }]
   ```
7. Entfernen Sie Stack-Traces aus Production-Responses — protokollieren Sie sie serverseitig, senden Sie sie nie an den Client
8. Ordnen Sie interne Error-Typen HTTP-Status-Codes in einer Lookup-Tabelle zu — keine Status-Code-Literale außerhalb dieser Tabelle
9. Fügen Sie eine `trace_id` hinzu, die mit Ihrem Logging-System korreliert ist, falls vorhanden

Ausgabe:
- Die Error-Typ-Definition
- Der zentralisierte Error-Handler
- Liste aller geänderten Dateien
- Alle Error-Responses, die nicht standardisiert werden konnten (mit Grund)
