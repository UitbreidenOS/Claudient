# Prompt: Sesieverantwoording

Gebruik aan het einde van een Claude Code-sessie om leerresultaten vast te leggen en om te zetten in duurzame verbeteringen — CLAUDE.md bijwerken, nieuwe regels maken, skill-kansen identificeren en ADR's schrijven.

## Systeemprompt

```
U voert een sesieverantwoording uit. Controleer de gespreksgeschiedenis van deze sessie en categoriseer elk leerresultaat in het juiste uitvoerformaat.

Categorieën om te controleren (alleen categorieën met werkelijke inhoud opnemen):

**1. CLAUDE.md-UPDATES** — persistente projectcontext die deze sessie moet overleven
Format: "Toevoegen aan CLAUDE.md: [exacte tekst om toe te voegen]"
Opnemen: nieuw ontdekte commando's, architectuurinzichten, vastgestelde conventies, dingen die Claude altijd moet weten

**2. NIEUWE REGELS** — codeerstandaarden of patronen die formalisering verdienen
Format: "Toevoegen aan rules/[categorie].md: [regelverklaring]"
Opnemen: vastgestelde conventies, patronen die altijd moeten worden gevolgd, dingen die nooit mogen worden gedaan

**3. SKILL-IDEEËN** — repetitieve workflows die een /skill verdienen
Format: "Skill maken: /[naam] — [wat het in één zin doet]"
Opnemen: elke workflow die u 3+ keer hebt getypt, meerstappenprocessen met een consistent patroon

**4. ADR'S** — architectuurbeslissingen met significante afwegingen
Format: "ADR schrijven: [korte titel] — Beslissing: [wat werd besloten]"
Opnemen: technologiekeuzes, benaderingskeuzes, alles wat toekomstige ingenieurs moeten begrijpen

**5. ONOPGELOSTE BUGS** — aangetroffen problemen die nog niet zijn opgelost
Format: "Bug: [beschrijving] — Locatie: [bestand of gebied] — Impact: [wie/wat het beïnvloedt]"

**6. TODO VOLGENDE SESSIE** — concrete taken om volgende keer mee te starten
Format: "Volgende: [specifieke taak]"

Wees specifiek en uitvoerbaar. Voeg geen vage opmerkingen in. Als een categorie niets waard is om vast te leggen, laat het weg.
```

## Gebruik

Aan het einde van elke belangrijke sessie uitvoeren:

```
"Voer een sesieverantwoording uit over alles waaraan we vandaag hebben gewerkt. 
Categoriseer alle leerresultaten met het verantwoordingsformaat."
```

## Automatisering met de session-retro hook

De `session-retro` hook maakt automatisch een `.claude/retro-pending.md`-bestand aan het einde van de sessie. Aan het begin van de volgende sessie plakt u de retroactiefprompt en verwerkt u het bestand.

## Actie op de uitvoer

Voor elke uitvoer:

| Categorie | Actie |
|---|---|
| CLAUDE.md-update | CLAUDE.md rechtstreeks bewerken |
| Nieuwe regel | Maken of toevoegen aan `rules/common/[onderwerp].md` |
| Skill-idee | Toevoegen aan ontwikkelings-backlog |
| ADR | Delegeren aan `adr-writer`-agent |
| Bug | Toevoegen aan `bugs.md` of GitHub-issue aanmaken |
| Volgende sessie | Start volgende sessie met deze taken |

## Voorbeelduitvoer

```
## Sesieverantwoording — 20 mei 2026

**CLAUDE.md-UPDATES:**
- Toevoegen aan CLAUDE.md: "Gebruik `npx drizzle-kit generate` vóór elke DB-migratie — bekijk altijd de migratie-SQL voor uitvoering"
- Toevoegen aan CLAUDE.md: "De betalingsservice gebruikt idempotentiesleutels op alle Stripe-oproepen — geef `idempotencyKey: requestId` door op elke transactie"

**NIEUWE REGELS:**
- Toevoegen aan rules/common/error-handling.md: "Alle Stripe-webhook-handlers moeten de handtekening verifiëren vóór verwerking — gebruik `stripe.webhooks.constructEvent()`"

**SKILL-IDEEËN:**
- Skill maken: /stripe-webhook — Zet een complete Stripe-webhook-handler op met handtekeningverificatie, event-routing en idempotentie

**ADR'S:**
- ADR schrijven: "Gebruik Stripe Connect in plaats van directe kosten voor marketplace-betalingen" — Beslissing: Stripe Connect gekozen om multi-partij-uitbetalingen af te handelen zonder aangepaste ledger-logica

**ONOPGELOSTE BUGS:**
- Bug: E-mail ter bevestiging van betaling wordt twee keer verzonden bij herpoging — Locatie: `src/webhooks/stripe.ts:87` — Impact: Sommige gebruikers ontvangen dubbele bevestigings-e-mails

**VOLGENDE SESSIE:**
- Volgende: Los de dubbele e-mail-bug in de betalingswebhook-handler op
- Volgende: Schrijf de Stripe-webhook-skill op basis van vandaag vastgestelde patronen
```
