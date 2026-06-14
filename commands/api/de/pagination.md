---
description: Cursor-basierte oder Offset-Paginierung zu einem List-Endpunkt mit konsistenter Antwortform hinzufügen
argument-hint: "[endpoint-oder-modell]"
---
Paginierung zum Endpunkt oder zur Ressource hinzufügen: $ARGUMENTS

Falls $ARGUMENTS leer ist, alle List-Endpunkte (die Arrays zurückgeben) finden und Paginierung auf jeden anwenden.

Paginierungsstrategie basierend auf dem Anwendungsfall wählen:
- Cursor-basiert (Standard für die meisten Feeds und große Datenmengen): stabil bei gleichzeitigen Schreibvorgängen, unterstützt unbegrenztes Scrollen, kann nicht zu beliebiger Seite springen
- Offset/Seiten-basiert (nur wenn die Benutzeroberfläche "zur Seite N gehen" erfordert): einfacher, aber inkonsistent bei Schreibvorgängen

Cursor-basierte Implementierung:
- Cursor codiert den Spaltenwert sortieren + Primärschlüssel der letzten gesehenen Zeile — base64-kodieren, niemals rohe Datenbankwerte offenlegen
- Standard-Sortierung: absteigend nach `created_at`, sekundäre Sortierung nach `id` zum Auflösen von Bindungen
- Akzeptieren `cursor` (undurchschaubare Zeichenkette) und `limit` (Integer, 1–100, Standard 20) als Abfrageparameter
- `limit` validieren — mit 400 ablehnen wenn < 1 oder > 100
- Antwortform:
  ```json
  {
    "data": [...],
    "pagination": {
      "next_cursor": "<undurchschaubar>",
      "has_more": true,
      "limit": 20
    }
  }
  ```
- `next_cursor` ist null, wenn es keine weiteren Seiten gibt
- Niemals Gesamtanzahl offenlegen, es sei denn, es ist explizit erforderlich — es ist bei großen Datenmengen teuer

Offset-basierte Implementierung (nur falls angefordert):
- Akzeptieren `page` (1-indiziert) und `per_page` (1–100, Standard 20)
- `total`, `page`, `per_page`, `total_pages` in die Antworthülle aufnehmen

Beide Strategien:
- Index auf der Sortierspalte in der Datenbank hinzufügen, falls noch nicht vorhanden
- Die Abfrage muss ein einzelner Datenbankaufruf sein — kein N+1 durch separates Abrufen der Anzahl, es sei denn, Offset-Paginierung erfordert es
- OpenAPI-Spezifikation für den Endpunkt aktualisieren, falls vorhanden

Tests schreiben: erste Seite, zweite Seite über Cursor, leeres Ergebnis, Grenzwertvalidierung.
