---
description: Einen vollständig typisierten REST-Endpoint mit Validierung, Fehlerbehandlung und Tests erstellen
argument-hint: "[method] [path] [description]"
---
Generiere einen produktionsreifen REST-API-Endpoint aus der Spezifikation: $ARGUMENTS

Parse die Eingabe als: HTTP-Methode, Pfad und eine kurze Beschreibung der Ressourcenoperation.

Regeln:
- Leiten Sie das Framework aus der bestehenden Codebasis ab (Express, FastAPI, Gin, Rails, etc.)
- Beachten Sie die bestehende Dateistruktur, Namenskonventionen und Importstil des Projekts
- Definieren Sie Request/Response-Typen mit dem Typ-System des Projekts (TypeScript-Interfaces, Pydantic-Modelle, Go-Structs, etc.)
- Validieren Sie alle Eingaben an der Grenze — lehnen Sie malformed Requests ab, bevor Business-Logik ausgeführt wird
- Geben Sie Standard-HTTP-Statuscodes zurück: 200/201 Erfolg, 400 Ungültige Anfrage, 401 Nicht authentifiziert, 403 Verboten, 404 Nicht gefunden, 409 Konflikt, 422 Nicht verarbeitbar, 500 Interner Fehler
- Geben Sie niemals Stack Traces oder interne Fehlerdetails in Response-Bodies preis
- Extrahieren Sie Business-Logik in eine Service-Schicht, halten Sie den Controller dünn
- Fügen Sie Authentication/Authorization-Checks hinzu, wenn das Projekt Middleware-Guards verwendet
- Schreiben Sie mindestens drei Tests: Happy Path, Validierungsfehler, Not-Found-Fall
- Befolgen Sie RESTful-Ressourcenkonventionen — verwenden Sie Substantive in Pfaden, keine Verben

Output:
1. Route/Controller-Datei (oder Hinzufügung zu einem bestehenden Router)
2. Request/Response-Typdefinitionen
3. Service-Funktions-Stub (oder Implementierung, wenn die Logik einfach ist)
4. Test-Datei mit den drei erforderlichen Fällen
5. Jede Migration oder Schemaänderung, wenn der Endpoint die DB berührt

Wenn $ARGUMENTS leer ist, fragen Sie: Methode, Pfad und was der Endpoint macht.
