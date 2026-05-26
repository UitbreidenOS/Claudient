# Monatsabschluss

## Wann aktiviert man diese Fähigkeit
- Es sind die letzten Tage des Monats und Sie müssen die Bücher schließen
- Sie haben ein Treffen mit Ihrem Buchhalter und möchten mit bereits organisierten Zahlen hingehen
- Sie benötigen eine G&V für einen Bankkredit, Investorenupdate oder Mietantrag
- Etwas passt nicht zwischen Ihrem QuickBooks-Gesamtwert und Ihrem Kontoauszug und Sie müssen die Lücke finden

## Wann NICHT verwenden
- Mitte des Monats — warten Sie, bis der Monat abgeschlossen ist, damit die Zahlen endgültig sind
- Ihr Buchhalter verwaltet den Abschluss vollständig und Sie sind nicht am Prozess beteiligt
- Sie suchen Steuerberatung — diese Fähigkeit organisiert Ihre Zahlen, ersetzt aber keine CPA

## Anweisungen

### Was vor dem Start exportiert wird

Sie benötigen drei Dinge aus Ihren Buchhaltungssystemen. Alle drei können in weniger als 5 Minuten exportiert werden:

1. QuickBooks: Bericht Gewinn & Verlust für den Monat (Berichte > Gewinn & Verlust > Datumsbereich festlegen > In Excel oder PDF exportieren)
2. QuickBooks: Transaktionsdetailbericht für den Monat — vollständige Liste jeder Transaktion
3. PayPal oder Stripe: Abwicklungsbericht für den Monat — von Ihrem Dashboard unter Aktivität oder Berichte herunterladbar

Wenn Sie sowohl PayPal als auch Stripe verwenden, ziehen Sie beide. Wenn Sie nur eines verwenden, ziehen Sie dieses.

### Schritt 1: Validieren Sie Zahlungsabwickler gegen QuickBooks

Fügen Sie Ihre Gesamtwerte in Claude ein:

„QuickBooks zeigt 34.200 USD Einnahmen. PayPal-Bruttoverkäufe waren 31.800 USD vor Gebühren, netto 29.400 USD. Stripe-Brutto war 4.800 USD, netto 4.600 USD. Helfen Sie mir, diese abzustimmen."

Claude identifiziert, wo die Zahlen sich ausrichten und wo nicht. Häufige Lücken, die es erfasst:

- PayPal- oder Stripe-Gebühren, die nicht als Ausgaben in QuickBooks erfasst wurden
- Rückerstattungen, die in einem System verarbeitet, aber in einem anderen nicht widergespiegelt wurden
- Transaktionen, die in einem Monat erfolgten, aber in einem anderen abgewickelt wurden (Zeitunterschied)
- Geteilte Transaktionen, die als einzelner Block in QuickBooks erfasst wurden

Für jede Diskrepanz erklärt Claude, was es wahrscheinlich ist und was zu tun ist — ob Sie es selbst korrigieren oder Ihrem Buchhalter melden sollen.

### Schritt 2: Generieren Sie die G&V-Zusammenfassung

Nachdem die Zahlen abgestimmt wurden, fordern Sie Claude auf:

„Fassen Sie meine G&V für den Monat zusammen. Einnahmen nach Kategorie, wenn ich Kategorien habe, Top 5 Ausgabenkategorien, Nettogewinn oder -verlust, und vergleichen Sie mit dem Vormonat, wenn ich mir die Zahlen des Vormonats gebe."

Fügen Sie Ihren QuickBooks G&V-Export (als Text oder Zahlen) ein und Claude erstellt eine saubere Zusammenfassung:

- Gesamteinnahmen: 38.600 USD (um 3.200 USD vom Vormonat gestiegen, +9%)
- Top-Ausgabenkategorien: Auftragnehmergebühren 11.200 USD / Software 2.400 USD / Werbung 1.800 USD / Büro 640 USD / Bankgebühren 280 USD
- Nettogewinn: 22.280 USD (58% Marge)
- Bemerkenswerte Veränderung vom Vormonat: Werbeausgaben um 600 USD gestiegen — überprüfen Sie, ob dies die Einnahmen erhöht hat

### Schritt 3: Erfassen Sie fehlende Belege

Sagen Sie Claude Ihren Schwellwert:

„Führen Sie alle Transaktionen über 75 USD in meinem Ausgabenbericht auf, die keinen Notiz oder Beleg angehängt haben."

Fügen Sie Ihre Transaktionsliste ein. Claude kennzeichnet die ohne Beschreibung und ordnet sie nach Kategorie, damit Sie Belege effizient verfolgen können. Es notiert auch, welche wahrscheinlich abzugsfähig sind (Geschäftsmahlzeiten, Software, Reisen) gegenüber Routine (Gehaltsabrechnung, Miete) — Sie wissen also, welche fehlenden Belege tatsächlich für Steuern wichtig sind.

### Schritt 4: Entwürfe die Buchhalter-E-Mail

Fordern Sie Claude auf:

„Schreiben Sie eine 3-Absatz-E-Mail an meinen Buchhalter, die diesen Monat zusammenfasst. Binden Sie die Schlüsselzahlen ein und kennzeichnen Sie die 2-3 Fragen, die ich ihm stellen sollte."

Claude entwirft:

- Absatz 1: Monatszusammenfassung — Einnahmen, Ausgaben, Nettogewinn und eine bemerkenswerte Tendenz
- Absatz 2: Abstimmungsnotizen — was Sie gefunden haben, was Sie korrigiert haben, was Sie unsicher sind
- Absatz 3: Ihre spezifischen Fragen — formuliert als „Ich habe X bemerkt, sollte ich Y tun?" nicht vage Anfragen

Dies spart Ihrem Buchhalter Zeit und verschafft Ihnen schnellere, nützlichere Antworten.

### Häufige Dinge, die Claude erfasst

- PayPal-Abrechnungsgebühren, die als Einnahmen statt Ausgaben verbucht wurden
- Eigentümerauszüge, die das Bankguthaben reduzierten, aber nicht als Ausgaben angezeigt werden
- Doppelte Transaktionen aus Bankfeed-Import
- Abonnements, die erneuert wurden, aber nicht budgetiert waren
- Zahlungen, die im Vormonat eingingen, die QuickBooks in diesem Monat erfasste (Abgrenzungs- vs. Kassenzeitpunkt)

### Monatlicher Rhythmus

Führen Sie diese Fähigkeit in den ersten 3 Arbeitstagen nach Monatsabschluss aus. Reservieren Sie 60-90 Minuten beim ersten Mal, 30-45 Minuten, sobald Sie eine Routine haben. Verwenden Sie die Ausgabe direkt für Ihr Buchhalter-Treffen — keine zusätzliche Vorbereitung erforderlich.

## Beispiel

Sie sagen: „QuickBooks zeigt 34.200 USD Einnahmen diesen Monat. PayPal zeigt 31.800 USD netto nach Gebühren. Ich habe auch 2.100 USD in Stripe. Meine QuickBooks-Ausgaben zeigen 18.400 USD. Ich bin nicht sicher, warum die Zahlen nicht passen und ich habe morgen früh einen Buchhalter-Anruf."

Claude stimmt alle drei Quellen ab:

- QuickBooks-Einnahmen 34.200 USD + Stripe 2.100 USD sollten 36.300 USD insgesamt entsprechen — aber PayPal netto 31.800 USD passt nicht sauber zu diesem Bild.
- Lückenanalyse: Claude stellt fest, dass die 2.400 USD in PayPal-Gebühren nicht als Ausgabe in QuickBooks erfasst wurden. Das Hinzufügen schließt dies auf 300 USD.
- Die verbleibenden 300 USD werden als wahrscheinliche unkategorisierte Rückerstattung gekennzeichnet — Claude fragt: „Haben Sie in den letzten 30 Tagen Rückerstattungen ausgegeben? Überprüfen Sie Ihre PayPal-Aktivität auf Rückerstattungen zwischen dem 18. und 25."

Claude erstellt dann:
- Saubere G&V-Zusammenfassung mit korrekten Zahlen für Ihren Buchhalter-Anruf
- Ein-Absatz-Abstimmungsnotiz, die die fehlende PayPal-Gebühreneintragung erklärt
- Drei Fragen zur Aufzählung mit Ihrem Buchhalter: wie man die Rückerstattung kategorisiert, ob die Eigentümerentnahme vom 22. einen Eintrag benötigt, und ob der 640 USD Ausrüstungskauf für Section 179 qualifiziert ist

Sie gehen zu Ihrem Buchhalter-Treffen mit allem organisiert. Der Anruf dauert 20 Minuten statt eine Stunde.
