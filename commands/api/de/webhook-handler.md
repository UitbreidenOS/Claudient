---
description: Implementieren Sie einen sicheren, idempotenten Webhook-Receiver mit Signaturprüfung und Wiederholungstoleranz
argument-hint: "[provider] [event-types]"
---
Webhook-Handler implementieren für: $ARGUMENTS

Analysieren als: Webhook-Provider-Name (z. B. Stripe, GitHub, Twilio) und eine komma-getrennte Liste von zu verarbeitenden Ereignistypen. Falls der Provider unbekannt ist, erstellen Sie ein generisches signiertes Webhook-Muster.

Sicherheit — nicht verhandelbar:
- Überprüfen Sie die Signatur des Providers vor der Verarbeitung einer Nutzlast. Lesen Sie das Pattern in der Provider-Dokumentation für den genauen Header und HMAC-Algorithmus (meist `HMAC-SHA256`)
- Vergleichen Sie Signaturen mit einer konstanten Vergleichsfunktion – verwenden Sie nie String-Gleichheit
- Lehnen Sie Anfragen mit fehlenden oder ungültigen Signaturen sofort mit `401` ab – protokollieren Sie den Fehler
- Validieren Sie das Feld `timestamp`, falls der Provider eins enthält; lehnen Sie Ereignisse ab, die älter als 5 Minuten sind, um Replay-Attacken zu verhindern
- Das Secret muss aus einer Umgebungsvariable stammen – niemals hart codiert

Idempotenz:
- Jede Webhook-Zustellung hat eine eindeutige Ereignis-ID im Header oder in der Nutzlast – extrahieren Sie diese
- Überprüfen Sie einen Deduplicationsspeicher (DB-Tabelle oder Redis-Set mit TTL) vor der Verarbeitung
- Falls die Ereignis-ID bereits verarbeitet wurde, geben Sie sofort `200` zurück – verarbeiten Sie nicht erneut
- Speichern Sie die Ereignis-ID mit einer TTL von mindestens dem Wiederholungsfenster des Providers (typischerweise 72 Stunden)

Verarbeitungsmuster:
- Bestätigen Sie sofort mit `200` – lassen Sie den Provider nicht auf Geschäftslogik warten
- Stellen Sie die validierte, deserialisierte Nutzlast in eine Job-Queue für asynchrone Verarbeitung ein
- Falls keine Job-Queue existiert, verarbeiten Sie synchron, aber antworten Sie trotzdem innerhalb von 5 Sekunden
- Protokollieren Sie für jedes Ereignis den Ereignistyp, die Ereignis-ID und das Verarbeitungsergebnis

Handler-Struktur:
1. Signaturprüfungs-Middleware (wiederverwendbar, nicht inline)
2. Deduplicationsprüfung
3. Nutzlastanalyse und Typdiapatch nach Ereignistyp
4. Pro-Ereignis-Handler-Funktionen (eine pro Ereignistyp aufgelistet in $ARGUMENTS)
5. Fehlerbehandlung, die 200 auch bei Verarbeitungsfehlern zurückgibt (um Wiederholungen für Bugs zu vermeiden)

Schreiben Sie Tests für: gültige Signatur, ungültige Signatur, dupliziertes Ereignis, jeder Ereignistyp wird korrekt dispatched.
