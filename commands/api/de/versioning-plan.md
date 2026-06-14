---
description: API überprüfen und eine Versionierungsstrategie mit Migrationspfaden für Breaking Changes erstellen
argument-hint: "[current-version] [target-version]"
---
Erstellen Sie einen API-Versionierungsplan für: $ARGUMENTS

Parsing als: aktuelle Version (z. B. v1) und Zielversion (z. B. v2). Falls weggelassen, analysieren Sie die vorhandene API und empfehlen Sie, ob eine Versionierung überhaupt erforderlich ist.

Analysephase — lesen Sie die Codebasis und identifizieren Sie:
1. Alle öffentlichen Endpunkte (Pfad, Methode, Anfragekörper, Antwortkörper)
2. Welche Änderungen Breaking oder Non-Breaking sind:
   - Breaking: Feld entfernen, Feldtyp ändern, Feld umbenennen, HTTP-Status-Code-Semantik ändern, Endpunkt entfernen, Authentifizierungsanforderungen ändern
   - Non-Breaking: optionales Feld hinzufügen, neuen Endpunkt hinzufügen, neuen Enum-Wert hinzufügen (mit Vorsicht), Validierung lockern
3. Alle bestehenden Clients oder SDK-Konsumenten, die betroffen wären

Versionierungsstrategie-Auswahl:
- URL-Pfad-Versionierung (`/v2/`) — empfohlen als Standard; explizit, cachebar, einfach zu routen
- Header-Versionierung (`API-Version: 2`) — saubere URLs, aber schwerer zu testen in Browsern; nur verwenden, wenn das Projekt dies bereits tut
- Query-Parameter-Versionierung — vermeiden; nicht RESTful und bricht Caching

Implementierungsplan:
- Definieren Sie das Versionspräfix an einer Stelle (Router-Konfiguration, Base-URL-Konstante) — nicht verstreut in jeder Route
- Alte Versionsrouten müssen während eines Deprecation-Fensters funktional bleiben (empfohlen: mindestens 6 Monate für externe APIs, 1 Major Release für interne)
- Fügen Sie `Deprecation` und `Sunset` Header zu v1-Antworten hinzu, wenn v2 ausgerollt wird
- Versionieren Sie nur die Routes, die Breaking Changes haben — identische Routes können Handler über Versionen hinweg teilen
- Erstellen Sie ein Migrationsleitfaden-Dokument, das alle Breaking Changes mit Before/After-Beispielen auflistet

Ausgabe:
1. Liste der gefundenen Breaking Changes (oder „keine gefunden", wenn sauber)
2. Empfohlene Versionierungsstrategie mit Begründung
3. Routing-Struktur, die zeigt, wie v1 und v2 koexistieren
4. Erforderliche Code-Änderungen zur Implementierung der Versionsteilung
5. Deprecation-Timeline-Empfehlung
6. Migrationsleitfaden-Grundgerüst für API-Konsumenten
