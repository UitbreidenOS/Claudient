# Churn-Prävention

## Wann aktivieren
- Sie führen ein Abonnementgeschäft (SaaS, Mitgliedschaft, wiederkehrender Service, Inhaltsabonnement) und möchten die Kundenabwanderung reduzieren
- Ihre Churn-Rate steigt und Sie können nicht sagen, welches Segment sie antreibt
- Sie sehen, dass die gleichen gekündigten Kunden drei Monate später zu Ihren Konkurrenten zurückkehren — die Beziehung war rettbar
- Sie starten eine neue Funktion, einen Preistier oder ein Programm und möchten den Rollout so gestalten, dass das Churn-Risiko minimiert wird
- Sie möchten die Identifizierung und Ansprache gefährdeter Kunden systematisieren, anstatt auf Kündigungen zu reagieren

## Wann NICHT verwenden
- Sie führen ein Transaktionsgeschäft (einmalige Käufe, Ad-hoc-Services) — Churn ist nicht das richtige Framework
- Ihr Churn ist bereits ausgezeichnet (unter 1% monatlich für B2B SaaS, unter 3% für B2C-Abonnements) — abnehmende Ergebnisse kommen schnell
- Die Kündigungen, die Sie sehen, sind strukturell (Produkt ist falsch, Preisgestaltung ist falsch) — Ansprache wird es nicht beheben; Produkt- oder Preisänderungen werden es beheben

## Anleitung

### Schritt 1: Richten Sie Ihren Abonnementkontext ein

Sagen Sie:

„Ich betreibe ein [Abonnementtyp — SaaS, Mitgliedschaft, Inhalt, wiederkehrender Service]-Geschäft. Der durchschnittliche Kunden-LTV beträgt [$X]. Die monatliche Churn-Rate beträgt [Y%]. Die typische Kundenreise von der Anmeldung bis zur Kündigung ist [Muster beschreiben]. Der größte Churn-Antrieb nach meinem Verständnis ist [Grund]. Meine Markensprache ist [Adjektivliste]."

### Schritt 2: Identifizierung gefährdeter Kunden

Die meisten Churn treten nach einer Phase rückläufigen Engagements auf, die in Ihren Daten sichtbar ist. Extrahieren Sie die Engagement-Signale.

Sagen Sie:

„Hier sind Signale aus meiner Kundenbasis der letzten 30 Tage: [Daten einfügen — Anmeldehäufigkeit, Funktionsnutzung, Support-Tickets, Plan-Downgrades, etc.]. Identifizieren Sie die Kunden, die in den nächsten 30 Tagen am meisten von Churn bedroht sind. Erklären Sie für jeden das spezifische Signalmuster, das die Flagge ausgelöst hat, und schlagen Sie einen personalisierten Ansprache-Ansatz vor."

Claude ist gut darin, Muster in strukturierten Engagement-Daten zu erkennen. Stellen Sie die Rohdaten bereit, nicht Ihre Interpretation, und lassen Sie es Muster entdecken, die Sie möglicherweise übersehen haben.

### Schritt 3: Ansprache gefährdeter Kunden

Für jeden gefährdeten Kunden:

Sagen Sie:

„Kunde [Name] bei [Unternehmen] zeigt Churn-Signale: [spezifisches Muster]. Sie sind seit [X Monaten] Kunde. Ihr Anwendungsfall ist [Anwendungsfall]. Verfassen Sie eine personalisierte Reengagement-Ansprache: (1) eine warme Nachricht, die ihre spezifische Situation referenziert, (2) ein strukturiertes Angebot, ihnen Wert zu helfen (benutzerdefiniertes Training, Kontobewertung, Funktionspräsentation), (3) eine weiche Höraufforderung, die ihnen Raum gibt zu teilen, wenn etwas nicht funktioniert."

Die Personalisierung macht den Unterschied aus. Allgemeine Ansprache wie „Wir haben bemerkt, dass Sie sich nicht angemeldet haben" wird ignoriert. Personalisiert „Ich habe bemerkt, dass Sie den wöchentlichen Bericht nach unserem v3-Release nicht mehr ausführen — dieses Muster hat bei einigen Kunden aufgetaucht und wir haben vor zwei Wochen einen Fix ausgeliefert, möchten Sie eine 10-Min-Präsentation?" bekommt Antworten.

### Schritt 4: Kündigungsrettungs-Fluss

Wenn ein Kunde eine Kündigung einreicht:

Sagen Sie:

„Kunde [Name] hat gerade einen Kündigungsantrag eingereicht. Sie sind seit [X Monaten] bei uns, zahlen [$Y/Monat]. Ihr angegebener Grund ist [Grund]. Ihr Nutzungsmuster in den letzten 90 Tagen war [Muster]. Verfassen Sie eine Kündigungsrettungs-Sequenz: (1) eine sofortige Antwort, die die Kündigung bestätigt und einen 15-Minuten-Anruf vor der Verarbeitung anbietet, (2) Gesprächspunkte für den Anruf, die den angegebenen Grund und die beobachteten Muster abdecken, (3) drei Rettungsangebote, nach Erfolgswahrscheinlichkeit geordnet — Pause, Downgrade, kostenloser Monat + benutzerdefiniertes Training."

Der Kündigungsrettungs-Anruf rettet 20-40% der Kündigungsanfragen bei gut geführten Abonnementgeschäften. Die meisten kleinen Unternehmen führen den Anruf überhaupt nicht; sie verarbeiten einfach die Kündigung.

### Schritt 5: Nachrückgewinnung nach Kündigung

Für Kunden, die doch kündigen:

Sagen Sie:

„Kunde [Name] hat vor [X Tagen] gekündigt. Ihr angegebener Grund war [Grund]. Ihr LTV bei uns war [$Y]. Verfassen Sie eine Rückgewinnungs-Sequenz: (1) eine 30-Tage-Post-Kündigung-E-Mail „Nachricht", die nichts antreibt, (2) eine 90-Tage-E-Mail „Wir haben das ausgeliefert, das Sie erwähnt haben", wenn es etwas Spezifisches gibt, das sie angesprochen haben, das jetzt gelöst ist, (3) eine 6-Monats-E-Mail „Denken Sie wieder an uns" mit einem weichen Angebot."

Die 90-Tage-E-Mail „Wir haben es behoben" ist das höchst konvertierende Rückgewinnung-Touchpoint. Die meisten Abonnementgeschäfte kündigen Kunden und vergessen sie für immer.

### Schritt 6: Kohorten-level-Churn-Analyse

Einmal pro Quartal:

Sagen Sie:

„Hier sind meine Churn-Daten der letzten 12 Monate nach Anmeldungskohorte: [einfügen]. Identifizieren Sie Muster auf Kohortenebene: Welche Monate hatten ungewöhnlich hohe oder niedrige Bindung, welche Akquisitionskanäle produzieren höheren LTV, welcher Preistier hat die meisten Churn, welche Funktionsnutzung korreliert mit Bindung. Schlagen Sie 3-5 testbare Hypothesen zur Verbesserung der Bindung vor."

Die Kohortensicht zeigt Muster, die die monatliche Churn-Rate verbirgt. Die meisten Abonnement-Betreiber sehen Churn als eine einzelne Zahl und verpassen, dass die neuen Kundenkohorten mit einer 2x höheren Rate churnen als die Legacy-Rate.

## Beispiel

Sie führen ein kleines SaaS — ein Marketing-Automation-Tool für Einzelberater und kleine Agenturen. 280 zahlende Kunden, durchschnittlich $89/Monat. Die monatliche Churn-Rate ist in den letzten 4 Monaten von 4% auf 6,5% gestiegen. Bei Ihrer Kundenanzahl verlieren Sie 7-12 Kunden pro Monat gegenüber den 11, die Sie hinzufügen — das Nettowachstum ist stagniert.

Sie richten den Workflow zur Identifizierung gefährdeter Kunden ein. Sie extrahieren Engagement-Daten der letzten 30 Tage: Anmeldehäufigkeit, Funktionsnutzung, Support-Tickets, Plan-Downgrades. Sie werfen die Rohdaten mit der Kundenliste in Claude.

Claude identifiziert 18 gefährdete Kunden. Der größte Cluster — 9 der 18 — teilen ein spezifisches Muster: Sie haben die E-Mail-Automation-Funktion in den letzten 30 Tagen nicht mehr verwendet, obwohl sie sie vorher intensiv nutzten. Das Muster deutet auf eine UI-Änderung hin, die Sie vor 6 Wochen ausgeliefert haben.

Sie haben es nicht bemerkt, weil die Support-Tickets langsam kamen, ein oder zwei auf einmal, als verschiedene Probleme formuliert. Das Muster im Zusammenhang ist klar.

Sie setzen die UI-Änderung für diese 9 Kunden zurück, senden ihnen eine personalisierte E-Mail mit Referenz zur spezifischen Funktion und erklären, was Sie behoben haben, und bieten einen 30-Minuten-Durchgang. 6 der 9 antworten und reengagieren. 2 kündigen trotzdem (das zugrunde liegende Problem war anders). 1 antwortet nicht.

Sie liefern dann eine verfeinerte Version der UI-Änderung mit expliziter Migrationshilfe. Die monatliche Churn fällt in zwei Monaten auf 4,2%. Das Nettowachstum wird wieder aufgenommen.

Der einzelne Claude-Workflow hat ein strukturelles Produktproblem entdeckt, das sich in aggregierten Metriken versteckte. Die Kundenaktualisierung pro Kunde hat ungefähr $35-45K wiederkehrende Jahresumsatz gerettet. Die Produktbehebung hat geschätzt $100K+ über die nächsten 12 Monate gerettet.

Sie machen die Identifizierung gefährdeter Kunden zu einem monatlichen Rhythmus. Nach Monat 6 stabilisiert sich Ihre Churn-Rate auf 3,7% — unter wo sie begonnen hat. Der Zinseszins-Effekt auf das Wachstum ist aussagekräftig.
