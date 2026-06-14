---
description: Generieren Sie ein typisiertes Client-SDK aus einer OpenAPI-Spezifikation oder vorhandenen API-Routen
argument-hint: "[Sprache] [Spec-Datei-oder-Basis-URL]"
---
Client-SDK generieren für: $ARGUMENTS

Analysieren Sie als: Zielsprache (TypeScript, Python, Go usw.) und entweder einen Pfad zu einer OpenAPI-Spezifikationsdatei oder eine Basis-URL. Falls keine Spezifikationsdatei vorhanden ist, generieren Sie zuerst eine aus dem Codebase, bevor Sie das SDK generieren.

SDK-Anforderungen nach Sprache:

TypeScript:
- ESM + CommonJS Doppelausgabe über das Feld `exports` in `package.json`
- Vollständige generische Typen — kein `any`, keine Typ-Assertions ohne Begründung
- Verwenden Sie `fetch` nativ; akzeptieren Sie eine optionale benutzerdefinierte Fetch-Implementierung zum Testen von Mock-Objekten
- Zod-Schemata für die Validierung von Laufzeitantworten (optional, aber einschließen, falls das Projekt Zod verwendet)
- Tree-shakeabel: jede Ressource als benannte Exporte, nicht als Klasse mit allem darin

Python:
- `httpx` für asynchrone Operationen, `requests` für synchrone — bieten Sie beide an oder fragen Sie, welche gewünscht ist
- Pydantic-Modelle für alle Request/Response-Typen
- Typ-Hinweise durchgehend, `py.typed`-Marker für PEP-561-Konformität
- Asynchroner Client als primäre Schnittstelle, synchron als dünner Wrapper

Go:
- Idiomatisches Go: Methoden auf einem `Client`-Struct, Kontext als erster Parameter, `(T, error)` Rückgabemuster
- Separates Types-Paket für generierte Modelle
- Keine externen Abhängigkeiten außer `net/http`, sofern das Projekt keine bereits verwendet

Alle Sprachen:
- Eine Client-Klasse/Struct pro Ressourcengruppe (entspricht OpenAPI-`tags`)
- Konstruktor akzeptiert: Basis-URL, Auth-Token/API-Schlüssel, optionalen HTTP-Client
- Alle Methoden entsprechen 1:1 OpenAPI-`operationId`-Werten
- Rückgabe von typisierten Response-Objekten — niemals rohe Strings oder untypisierte Maps
- Propagieren Sie alle HTTP-Fehler als typisierte Fehler-Objekte mit `status`, `code` und `message`
- README mit Installation, Initialisierung und je einem Beispiel pro Ressource

Geben Sie das SDK als Verzeichnisstruktur-Auflistung aus, gefolgt von den vollständigen Dateiinhalten für jede Datei. Falls die Spezifikation mehr als 20 Operationen hat, generieren Sie die Kern-Client-Infrastruktur und die erste Ressourcengruppe, listen Sie dann die verbleibenden Gruppen zur bedarfsgerechten Generierung auf.
