---
description: Erzeuge ein ER-Diagramm in Mermaid oder PlantUML aus dem Datenbankschema des Projekts
argument-hint: "[Schemadatei, Tabellennamen oder Verzeichnis]"
---
Erzeuge ein Entity-Relationship-Diagramm für: $ARGUMENTS

Falls $ARGUMENTS ein Dateipfad ist, lese ihn ein. Falls es sich um einen Tabellennamen oder eine kommagetrennte Liste handelt, suche ihre Definitionen in Migrationen, ORM-Modellen oder Schemadateien. Falls es sich um ein Verzeichnis handelt, scanne nach allen Schemadefinitionen darin.

Schritte:

1. Extrahiere Schemainformationen:
   - Tabellennamen und ihre Spalten (Name, Typ, Nullability, Standard).
   - Primäre Schlüssel (einfache und zusammengesetzte).
   - Fremdschlüssel und die Beziehungen, die sie darstellen (eins-zu-eins, eins-zu-viele, viele-zu-viele über Übergangstabellen).
   - Eindeutigkeitsbeschränkungen, die Kardinalität implizieren.

2. Erkenne die Diagrammformatpräferenz:
   - Falls das Projekt bereits `.mmd`, `mermaid` oder PlantUML-Dateien enthält, wende dieses Format an.
   - Standard ist Mermaid `erDiagram`-Syntax (wird in GitHub, Notion und den meisten Doc-Tools gerendert).
   - Falls der Benutzer PlantUML angegeben hat, nutze `@startuml` / `@enduml` mit Entity-Blöcken.

3. Produziere das Diagramm:
   - Beziehe alle Spalten mit ihren Typen in die Entity-Blöcke ein.
   - Zeige Beziehungslinien mit korrekter Mermaid-Kardinalitätsnotation:
     - `||--o{` eins-zu-viele
     - `||--||` eins-zu-eins
     - `}o--o{` viele-zu-viele
   - Beschrifte jede Beziehungslinie mit dem Fremdschlüsselnamen oder einer kurzen semantischen Bezeichnung.
   - Gruppiere Übergangstabellen/Assoziationstabellen visuell unterscheidbar, wenn möglich, über Kommentare.

4. Falls das Schema groß ist (>15 Tabellen), erzeuge zwei Diagramme:
   - Eine übergeordnete Übersicht, die nur Tabellen und Beziehungen zeigt (ohne Spaltendetails).
   - Ein detailliertes Diagramm für die Teilmenge der Tabellen in $ARGUMENTS oder die Kern-Domain-Tabellen.

5. Nach dem Diagramm, gib aus:
   - Eine kurze Legende, die nicht offensichtliche Abkürzungen der Spaltentypen erklärt.
   - Eine Liste aller im Code gefundenen, aber nicht als FK-Beschränkungen deklarierten Beziehungen.
   - Alle Übergangstabellen, die Domain-Konzepte darstellen, die einer Umbenennung für mehr Klarheit bedürfen.

Gib das Diagramm in einem eingezäunten Code-Block mit dem korrekten Sprach-Tag (`mermaid` oder `plantuml`) aus.
