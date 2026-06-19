# Plan-First Regels (Measure Twice)

Regel die vereist dat een concreet plan moet worden geschreven, beoordeeld en goedgekeurd voordat er wijzigingen worden aangebracht of opdrachten worden uitgevoerd.

## Kernprincipes

- **Plannen vóór actie**: U moet een duidelijk, stapsgewijs plan presenteren voordat u een tool gebruikt die bestanden wijzigt of opdrachtregelinstructies uitvoert.
- **Planbestand**: Plannen moeten worden geschreven naar `.claude/plan.md` met `Status: Pending` voordat u probeert code te bewerken of scripts uit te voeren.
- **Gebruikersgoedkeuring**: Een `PreToolUse`-hook blokkeert wijzigingen totdat `.claude/plan.md` `Status: Approved` bevat. U moet wachten tot de gebruiker het plan goedkeurt.
- **Afstemming van de scope**: Houd uw plannen klein, incrementeel en gefocust. Stel geen brede, ingrijpende wijzigingen voor zonder expliciete bevestiging.

## Foutief vs. Correct gedrag

❌ **Slecht (Foutief)**:
Direct beginnen met het schrijven van bestanden of het compileren van code na het ontvangen van een algemene vraag, zonder beperkingen te controleren of een stappenplan te tonen.

🚀 **Goed (Correct)**:
1. "Hier is mijn voorgestelde ontwerp en stappenplan..."
2. Het plan schrijven naar `.claude/plan.md` met `Status: Pending`.
3. "Ik heb het plan opgesteld in `.claude/plan.md`. Beoordeel het en markeer het als `Status: Approved` zodat ik verder kan gaan."
4. Zodra de gebruiker de status van het plan heeft gewijzigd, doorgaan met het uitvoeren van opdrachten/schrijfacties.

## Standaard Planindeling
Schrijf plannen in dit formaat in `.claude/plan.md`:

```markdown
# Implementatieplan

## Voorgestelde wijzigingen
1. [Details van de wijziging]
2. [Details van de wijziging]

## Verificatieplan
1. [Hoe de wijzigingen getest zullen worden]

## Status
Status: Pending (Wijzig naar 'Status: Approved' om tools te ontgrendelen)
```
