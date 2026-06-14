---
description: Implementeer een veilige, idempotente webhook-ontvanger met handtekeningverificatie en tolerantie voor nieuwe pogingen
argument-hint: "[provider] [event-types]"
---
Implementeer een webhook-handler voor: $ARGUMENTS

Parse als: naam van de webhook-provider (bijv. Stripe, GitHub, Twilio) en een kommagescheiden lijst met eventtypen die moeten worden verwerkt. Als de provider onbekend is, bouw een generieke ondertekende-webhook-patroon.

Beveiliging — onderhandelbaar:
- Controleer de handtekening van de provider voordat u enige payload verwerkt. Lees het patroon van de documentatie van de provider voor de exacte header en HMAC-algoritme (meestal `HMAC-SHA256`)
- Vergelijk handtekeningen met een constante-tijd-vergelijking functie — nooit string-gelijkheid
- Wijs verzoeken met ontbrekende of ongeldige handtekeningen onmiddellijk af met `401` — log de fout
- Valideer het `timestamp`-veld als de provider er een bevat; wijs evenementen ouder dan 5 minuten af om replay-aanvallen te voorkomen
- Secret moet uit een omgevingsvariabele komen — nooit hardcoded

Idempotentie:
- Elke webhook-levering heeft een unieke event-ID in de header of payload — extraheer deze
- Controleer een deduplicatie-archief (databasetabel of Redis-set met TTL) voordat u verwerkt
- Als de event-ID al is verwerkt, retourneer onmiddellijk `200` — verwerk niet opnieuw
- Sla de event-ID op met een TTL van minstens het retry-venster van de provider (meestal 72 uur)

Verwerkingspatroon:
- Bevestig onmiddellijk met `200` — laat de provider niet wachten op bedrijfslogica
- Plaats de gevalideerde, gedeserialiseerde payload in een taakwachtrij voor asynchrone verwerking
- Als er geen taakwachtrij bestaat, verwerk synchroon maar reageer nog steeds binnen 5 seconden
- Log het eventtype, de event-ID en het verwerkingsresultaat voor elk evenement

Handler-structuur:
1. Handtekeningverificatie-middleware (herbruikbaar, niet inline)
2. Deduplicatie-controle
3. Payload-parsing en type-verzending per eventtype
4. Per-event handler-functies (één per eventtype vermeld in $ARGUMENTS)
5. Foutafhandeling die 200 retourneert, zelfs bij verwerkingsfout (om retries voor bugs te voorkomen)

Schrijf tests voor: geldige handtekening, ongeldige handtekening, dubbel evenement, elk eventtype correct verzonden.
