---
description: Een ER-diagram in Mermaid of PlantUML genereren op basis van het databaseschema van het project
argument-hint: "[schemabestand, tabelnamen of directory]"
---
Genereer een entity-relationship diagram voor: $ARGUMENTS

Als $ARGUMENTS een bestandspad is, lees dit. Als het een tabelnaam of kommagescheiden lijst is, zoek hun definities in migraties, ORM-modellen of schemabestanden. Als het een directory is, scan ernaar voor alle schemadefinities daarin.

Stappen:

1. Extraheer schemagegevens:
   - Tabelnamen en hun kolommen (naam, type, nullability, standaard).
   - Primaire sleutels (enkele en samengestelde).
   - Buitenlandse sleutels en de relaties die zij vertegenwoordigen (één-naar-één, één-naar-veel, veel-naar-veel via junction-tabellen).
   - Unieke constraints die cardinaliteit impliceren.

2. Detecteer voorkeuren voor diagramformaat:
   - Als het project al `.mmd`, `mermaid` of PlantUML-bestanden bevat, match dat formaat.
   - Standaard naar Mermaid `erDiagram` syntaxis (rendert op GitHub, Notion, meeste documentatietools).
   - Als de gebruiker PlantUML heeft opgegeven, gebruik `@startuml` / `@enduml` met entity-blokken.

3. Produceer het diagram:
   - Neem alle kolommen met hun typen op in de entity-blokken.
   - Toon relatielijnen met correcte Mermaid cardinaliteitsnotatie:
     - `||--o{` één-naar-veel
     - `||--||` één-naar-één
     - `}o--o{` veel-naar-veel
   - Label elke relatielijnn met de buitenlandse sleutel naam of een korte semantische label.
   - Groepeer junction/associatie-tabellen visueel onderscheidend indien mogelijk via opmerkingen.

4. Als het schema groot is (>15 tabellen), produceer twee diagrammen:
   - Een overzicht op hoog niveau dat alleen tabellen en relaties toont (geen kolomdetails).
   - Een gedetailleerd diagram voor de subset van tabellen in $ARGUMENTS of de centrale domeinentabellen.

5. Voer na het diagram uit:
   - Een korte legenda die eventuele niet-voor-de-handliggende afkortingen in kolomtypen verklaart.
   - Een lijst met eventuele geïmpliceerde relaties die in de code zijn gevonden maar niet als FK-constraints zijn gedeclareerd.
   - Alle junction-tabellen die domeinconcepren vertegenwoordigen die het waard zijn om voor duidelijkheid te hernoemen.

Voer het diagram uit in een fenced code-blok met de juiste taaltag (`mermaid` of `plantuml`).
