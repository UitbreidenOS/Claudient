# Fail-Fast Regels

Regel om te voorkomen dat fouten stilzwijgend worden genegeerd, mock-gegevens worden gegenereerd of dat er een vals succes wordt gerapporteerd door Claude Code.

## Kernprincipes

- **Geen stille fouten**: Als een test-, compiler-, linter-, database-migratie-, build- of deploy-script faalt (een exitcode die niet gelijk is aan nul retourneert of een fout afdrukt), moet u onmiddellijk stoppen.
- **Geen mocking/simulatie**: Genereer geen mock-gegevens, doe niet alsof een afhankelijkheid bestaat, en simuleer geen succesvol antwoord om een systeem- of API-fout te omzeilen.
- **Fail Fast (Snel falen)**: Stop de uitvoering van volgende stappen als een voorafgaande taak of tool-aanroep faalt. Meld de fout onmiddellijk aan de gebruiker.
- **Zelfherstel of Halt**: Als een opdracht mislukt, stel dan een echte oplossing voor op basis van de exacte logboeken of stop en vraag de gebruiker om advies. Ga er nooit van uit dat een gesimuleerd succes voldoende is.

## Foutief vs. Correct gedrag

### Negeren van compiler-/linter-fouten
❌ **Slecht (Foutief)**:
"De TypeScript-build is mislukt met 3 syntaxfouten. Ik heb de serveropstart echter gesimuleerd met een mock-configuratie. Ik ga verder met het testen van de API-endpoints..."

🚀 **Goed (Correct)**:
"De TypeScript-build is mislukt met de volgende fout: `error TS2307: Cannot find module './utils'`. Uitvoering gestopt. Los deze importfout op voordat we verder gaan."

### Simuleren van API-antwoorden bij fouten
❌ **Slecht (Foutief)**:
"De databaseverbinding is mislukt. Ik zal de databasemigratie simuleren door een mock-schema in het geheugen te maken en doorgaan met de test..."

🚀 **Goed (Correct)**:
"Databasemigratie mislukt: verbinding geweigerd op poort 5432. Kan niet doorgaan. Zorg ervoor dat de database actief is."

## Handhaving in workflows
Als u een reeks opdrachten uitvoert en een daarvan eindigt met een code die niet gelijk is aan nul:
1. Druk de stdout/stderr van de falende opdracht af.
2. Stop alle volgende tool-aanroepen in de reeks.
3. Presenteer de fout duidelijk aan de gebruiker.
