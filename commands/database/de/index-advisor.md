---
description: Empfehlungen für Indizes einer Tabelle oder Query-Workload basierend auf Schema und Zugriffsmuster
argument-hint: "[Tabellenname, Query oder Schema-Datei]"
---
Analysieren Sie das Datenbankschema und die Zugriffsmuster für: $ARGUMENTS

Wenn $ARGUMENTS ein Tabellenname ist, suchen Sie sein Schema in Migrationen, ORM-Modellen oder Schema-Dateien. Wenn es eine Query ist, analysieren Sie die Zugriffsmuster dieser Query. Wenn es ein Dateipfad ist, lesen Sie diesen.

Führen Sie diese Analyse durch:

1. Mappen Sie die aktuellen Indizes:
   - Listen Sie alle existierenden Indizes auf (Primary Key, Unique, Composite, Partial, Expression-basiert).
   - Identifizieren Sie redundante Indizes (Präfix-abgedeckt durch einen anderen Index).
   - Identifizieren Sie ungenutzte oder niedrig-selektive Indizes (z.B. Boolean-Spalten, Enums mit niedriger Kardinalität).

2. Analysieren Sie die Query-Workload:
   - Wenn Queries bereitgestellt oder im Codebase auffindbar sind (ORM-Query-Aufrufe, Raw SQL), extrahieren Sie ihre WHERE-, JOIN-, ORDER BY- und GROUP BY-Muster.
   - Identifizieren Sie Spalten, die wiederholt in Filterbedingungen vorkommen.
   - Vermerken Sie Range Queries, die von B-tree-Indizes profitieren, im Vergleich zu Equality-Only-Queries.

3. Empfehlen Sie neue Indizes:
   - Für jede Empfehlung geben Sie an:
     a. Die genaue CREATE INDEX-Anweisung (verwenden Sie CONCURRENTLY für PostgreSQL falls angemessen).
     b. Welche Queries oder Zugriffsmuster sie abdeckt.
     c. Geschätzte Selectivity-Auswirkung (hohe/mittlere/niedrige Kardinalität).
     d. Schreibaufwand-Kosten — Indizes, die INSERT/UPDATE-Durchsatz beeinträchtigen, müssen gekennzeichnet werden.
   - Bevorzugen Sie Composite-Indizes gegenüber mehreren Single-Column-Indizes, wenn das Query-Muster dies rechtfertigt.
   - Erwägen Sie Partial-Indizes (WHERE-Klausel) für spärliche Bedingungen (z.B. Soft-Delete-Muster, Status-Filter mit dominanten Null/Inactive-Werten).
   - Erwägen Sie Covering-Indizes (INCLUDE-Spalten), um Heap-Zugriffe für Hot-Read-Pfade zu eliminieren.

4. Kennzeichnen Sie zu löschende Indizes:
   - Doppelte Indizes.
   - Indizes auf Spalten, die nie in Filtern oder Joins verwendet werden.
   - Indizes, die durch einen Composite-Index ersetzt werden.

5. Geben Sie einen priorisierten Aktionsplan aus: HIGH (sofortiger Gewinn, niedriges Risiko) / MEDIUM (nützlich, geringer Schreibaufwand) / LOW (marginal, unter Last bewerten).

Geben Sie die angenommene Datenbankengine basierend auf Syntax- oder Konfigurationskontext an.
