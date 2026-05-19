---
name: email-automation
description: "Multi-step outreach email sequences: personalised touchpoints, reply detection routing, follow-up cadence, meeting booking integration, deliverability patterns"
---

> 🇳🇱 Nederlandse versie. [Engelse versie](../email-automation.md).

# Skill: E-mailautomatisering

## Wanneer activeren
- Het ontwerpen van een cold outreach-sequentie (3-5 contactmomenten)
- Het schrijven van opvolgmails die persoonlijk aanvoelen, niet geautomatiseerd
- Het instellen van antwoorddetectielogica (geïnteresseerd / niet nu / uitschrijven)
- Het integreren van e-mailsequenties met agendaboeking (Calendly, Cal.com)
- Het beoordelen van afleverpatronen (spam vermijden, domeinopwarming)

## Wanneer NIET gebruiken
- Massale nieuwsbriefverzendingen — gebruik Mailchimp/Klaviyo rechtstreeks
- Transactionele e-mails (bonnen, bevestigingen) — verwerkt door uw platform
- Bestaande klanten die niet hebben ingestemd met outreach — AVG/CAN-SPAM-risico

## Instructies

### Een outreach-sequentie van 4 stappen ontwerpen

```typescript
// Sequentieontwerp:
// Dag 0: Eerste contact (persoonlijk, specifiek)
// Dag 3: Opvolging 1 (waarde toevoegen — resource, inzicht, data)
// Dag 7: Opvolging 2 (andere invalshoek of kanaal)
// Dag 14: Afscheidsmail (respectvolle afsluiting, deur open laten)

const sequence: EmailStep[] = [
  { day: 0,  subject: '{{personalised_hook}}',    type: 'initial' },
  { day: 3,  subject: 'Re: {{original_subject}}', type: 'followup_value' },
  { day: 7,  subject: 'Re: {{original_subject}}', type: 'followup_angle' },
  { day: 14, subject: 'Closing the loop',          type: 'breakup' },
]
```

### Elk e-mailtype schrijven

**Eerste contact (Dag 0) — specifiek, kort, menselijk:**
```
Schrijf de Dag 0-mail voor een cold outreach-sequentie.
Afzender: [naam, bedrijf, wat we doen]
Prospect: [naam, titel, bedrijf, één specifiek gegeven over hen]
Doel: een gesprek van 15 minuten boeken
Maximale lengte: 5-6 zinnen
Regels: verwijs naar iets specifieks (recent nieuws, post, rolwijziging),
        formuleer de waarde in één zin, zachte CTA ("open voor een kort gesprek?")
```

**Opvolging 1 (Dag 3) — echte waarde toevoegen:**
```
Schrijf de opvolging voor Dag 3.
Voeg waarde toe met: [een relevante casestudy / stat / resource / inzicht]
Verwijzing: de oorspronkelijke mail (houd het beknopt)
CTA: zelfde als Dag 0, anders geformuleerd
Lengte: 4-5 zinnen
```

**Afscheidsmail (Dag 14) — elegant afsluiten:**
```
Schrijf de afscheidsmail voor Dag 14.
Toon: begripvol, niet passief-agressief
Laat de deur open: "als de timing verandert / later relevant is"
Geen schuldgevoel, geen "Ik heb X keer geprobeerd u te bereiken"
Lengte: maximaal 3 zinnen
```

### Antwoordverwerkingslogica

```typescript
async function handleReply(reply: EmailReply) {
  const intent = await classifyIntent(reply.body)
  // intent: 'interested' | 'not_now' | 'not_interested' | 'question' | 'referral'
  
  switch (intent) {
    case 'interested':
      return bookMeeting(reply.from, reply.threadId)
    case 'not_now':
      return scheduleFutureTouch(reply.from, daysFromNow: 90)
    case 'not_interested':
      return markOptedOut(reply.from)
    case 'referral':
      const referred = extractReferredContact(reply.body)
      return addToSequence(referred)
  }
}
```

### Integratie van vergaderingsboeking

```typescript
// Toevoegen aan elke CTA-mail — gebruik altijd een directe boekingslink
const BOOKING_FOOTER = `
If a call sounds useful, here's my calendar: {{calendly_link}}
Or just reply and I'll send over a time that works.
`

// Cal.com API — beschikbaarheid controleren voor verzending
const slots = await cal.availability.get({
  username: 'your-username',
  dateFrom: addDays(new Date(), 1),
  dateTo: addDays(new Date(), 7),
})
```

### Afleverregels

```typescript
const SENDING_RULES = {
  maxPerDay: 50,              // per verzenddomein
  minDelayBetweenEmails: 90,  // seconden — massapatronen vermijden
  warmUpNewDomain: true,      // beginnen bij 10/dag, dagelijks 10% verhogen
  spfDkimRequired: true,      // controleren voor eerste verzending
  unsubscribeLink: true,      // vereist voor CAN-SPAM/AVG
  plainTextVersion: true,     // verbetert afleveringskwaliteit
  avoidSpamTriggers: [        // nooit gebruiken in onderwerpregels
    'free', 'guarantee', 'no risk', 'click here',
    'make money', 'earn cash', '!!!',
  ],
}
```

### Personalisatiepatronen die antwoordpercentages verdrievoudigen

```
// Onderzoek voor het schrijven — vind ÉÉN specifiek gegeven:
// - Recent bedrijfsnieuws (financiering, productlancering, vacatures)
// - Recente LinkedIn-post of reactie
// - Gemeenschappelijke connectie of gedeelde achtergrond
// - Rolwijziging in de afgelopen 6 maanden
// - Concurrent die ze net hebben vervangen of een tool die ze noemden

// Slecht (sjabloonvervanging): "Ik merkte dat u de [Titel] bent bij [Bedrijf]"
// Goed (authentiek): "Zag uw post over de overstap van Postgres naar Neon —
//                    de branchingfunctie die u noemde is precies waarom
//                    we [X] hebben gebouwd"
```

## Voorbeeld

**Context:** B2B-SaaS verkoopt een projectmanagementtool. De prospect is een VP Engineering die recent postte over problemen met zichtbaarheid over teams heen.

**Dag 0:**
> Onderwerp: Zichtbaarheid over teams bij grote projecten
>
> Zag uw LinkedIn-post over het zichtbaarheidsprobleem tussen de squads — we horen dit veel van VPs op uw schaal.
>
> We hebben [Product] specifiek hiervoor gebouwd: één overzicht van de voortgang van elk team zonder de overhead van statusmeetings. [Bedrijf X] heeft zijn wekelijkse syncs teruggebracht van 4 naar 1 na de overstap.
>
> Waard om 15 minuten te besteden om u te laten zien hoe het werkt?

**Dag 3:**
> Onderwerp: Re: Zichtbaarheid over teams bij grote projecten
>
> Ik voeg een overzicht van 2 minuten toe over hoe [Bedrijf X] (vergelijkbare schaal als u) hun zichtbaarheidslaag heeft geherstructureerd — mogelijk relevant gezien wat u beschreef.
>
> Laat het u graag live zien indien nuttig — zelfde link: [agenda]

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
