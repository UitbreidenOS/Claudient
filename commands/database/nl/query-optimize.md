---
description: Analyseer een trage of problematische SQL-query en produceer een geoptimaliseerde versie met uitleg
argument-hint: "[SQL-query of bestandspad]"
---
Je bent een expert in optimalisatie van databasequeries. Analyseer en optimaliseer de volgende query: $ARGUMENTS

Als $ARGUMENTS een bestandspad is, lees het bestand. Gebruik het bestand direct als het onbewerkte SQL is.

Voer de volgende analyse uit:

1. Parse de querystructuur:
   - Identificeer alle tabellen, joins, subqueries, CTEs en window functions.
   - Wijs WHERE, GROUP BY, ORDER BY, HAVING-clausules toe.
   - Noteer eventuele impliciete typeconversies of functieaanroepen op geïndexeerde kolommen die indexgebruik zouden voorkomen.

2. Identificeer prestatieproblemen:
   - Volledige tabelscans (ontbrekende index of index niet gebruikt vanwege functieverpakking).
   - Cartesiaanse producten of onbedoelde cross joins.
   - N+1-patronen uitgedrukt als gecorreleerde subqueries.
   - Redundante subqueries die kunnen worden verheven naar CTEs of JOINs.
   - Aggregaties over grote ongefilterde sets.
   - SELECT * wanneer specifieke kolommen volstaan.
   - Niet-sargable predicaten (bijv. `WHERE YEAR(created_at) = 2024` in plaats van een bereik).

3. Produceer een geoptimaliseerde query:
   - Herschrijf zodat predicaten sargable zijn waar dit momenteel niet het geval is.
   - Vervang gecorreleerde subqueries door JOINs of window functions waar passend.
   - Push filters zo vroeg mogelijk (predicate pushdown).
   - Gebruik hints voor verwachtingsindexen in opmerkingen waar een index een tabelzoeking zou elimineren.
   - Behoud exacte semantiek — de resultatenset moet identiek zijn.

4. Toon een diff tussen originele en geoptimaliseerde versies.

5. Leg elke wijziging uit in een bulletlijst, inclusief de verwachte impact (bijv. "elimineert seq scan op orders, geschat 10-100x reductie in onderzochte rijen").

6. Vermeld alle indexen die moeten worden gemaakt ter ondersteuning van de geoptimaliseerde query, met de exacte CREATE INDEX-instructie.

Stel de aangenomen database-engine in (PostgreSQL, MySQL, SQLite, MSSQL, enz.) op basis van gedetecteerde syntaxis. Pas aanbevelingen dienovereenkomstig aan.
