---
description: Analysieren Sie eine langsame oder problematische SQL-Abfrage und produzieren Sie eine optimierte Version mit Erklärung
argument-hint: "[SQL-Abfrage oder Dateipfad]"
---
Sie sind ein Experte für die Optimierung von Datenbankabfragen. Analysieren und optimieren Sie die folgende Abfrage: $ARGUMENTS

Wenn $ARGUMENTS ein Dateipfad ist, lesen Sie die Datei. Wenn es rohes SQL ist, verwenden Sie es direkt.

Führen Sie die folgende Analyse durch:

1. Analysieren Sie die Abfragestruktur:
   - Identifizieren Sie alle Tabellen, Joins, Subqueries, CTEs und Window-Funktionen.
   - Ordnen Sie WHERE-, GROUP BY-, ORDER BY-, HAVING-Klauseln zu.
   - Beachten Sie implizite Typumwandlungen oder Funktionsaufrufe auf indizierten Spalten, die eine Indexnutzung verhindern würden.

2. Identifizieren Sie Leistungsprobleme:
   - Vollständige Tabellenscans (fehlender Index oder Index wird nicht verwendet, da die Funktion umhüllt ist).
   - Kartesische Produkte oder unbeabsichtigte Cross Joins.
   - N+1-Muster, ausgedrückt als korrelierte Subqueries.
   - Redundante Subqueries, die zu CTEs oder JOINs hoben werden können.
   - Aggregationen über große ungefilterte Mengen.
   - SELECT *, wenn bestimmte Spalten ausreichen.
   - Nicht durchsuchbare Prädikate (z.B. `WHERE YEAR(created_at) = 2024` anstelle eines Bereichs).

3. Erstellen Sie eine optimierte Abfrage:
   - Schreiben Sie sie neu, um durchsuchbar zu sein, wo Prädikate derzeit nicht durchsuchbar sind.
   - Ersetzen Sie korrelierte Subqueries durch JOINs oder Window-Funktionen, wo angemessen.
   - Verschieben Sie Filter so früh wie möglich (Predicate Pushdown).
   - Verwenden Sie Covering-Index-Hinweise in Kommentaren, wo ein Index das Abrufen einer Tabelle eliminiert.
   - Bewahren Sie genaue Semantik – die Ergebnismenge muss identisch sein.

4. Zeigen Sie einen Diff zwischen Original- und optimierter Version.

5. Erklären Sie jede Änderung in einer Aufzählungsliste, einschließlich der erwarteten Auswirkungen (z.B. "eliminiert Sequential Scan auf Tabelle orders, geschätzte 10- bis 100-fache Reduzierung der untersuchten Zeilen").

6. Listen Sie alle Indizes auf, die erstellt werden sollten, um die optimierte Abfrage zu unterstützen, mit der exakten CREATE INDEX-Anweisung.

Geben Sie die erkannte Datenbankengine (PostgreSQL, MySQL, SQLite, MSSQL, usw.) basierend auf der erkannten Syntax an. Passen Sie Empfehlungen entsprechend an.
