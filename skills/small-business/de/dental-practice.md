# Zahnarztpraxis

## Wann aktivieren
- Sie betreiben eine Solo- oder Kleingruppen-Zahnarztpraxis und das Empfangsbüro ist von der operativen Verfolgung überfordert
- Die Erinnerungsplanung ist in den Rückstand geraten — Patienten, die auf einem 6-Monats-Rhythmus sein sollten, sind bei 9+ Monaten ohne Buchung
- Die Behandlungsplanakzeptanz liegt unter 50% und Sie möchten eine strukturierte Verfolgungs-Sequenz für nicht akzeptierte Pläne
- Die Versicherungsüberprüfung frisst 4-8 Stunden pro Woche der Empfänger-Zeit auf
- Sie starten einen neuen Service (klare Spangen, Schlafzahnheilkunde, kosmetisch) und benötigen Patientenbildungs- und Outreach-Kopie

## Wann nicht verwenden
- Sie haben einen Büroleiter oder Praxis-Administrator, der diese Workflows bereits effizient besitzt
- Ihr PMS (Dentrix, Eaglesoft, Open Dental) führt bereits ein robustes automatisiertes Erinnerungs- und Verfolgungs-System durch, dem Sie vertrauen
- Die Arbeit berührt klinische Entscheidungen — Claude ist für die administrative Hülle um die Behandlung, nicht für die Behandlung selbst

## Anweisungen

### Schritt 1: Richten Sie Ihren Praxiskontext ein

Sagen Sie:

„Ich betreibe eine [Solo / Gruppen]-Zahnarztpraxis in [Stadt]. Wir haben [N] Behandlungszimmer und [N] Hygieniker. Unser Patientenmix ist [versicherungsintensiv / Privatgebühren / gemischt]. Unsere Markensprache ist [warm-und-klinisch / familienfreundlich / premium / unverblümt]. Unser häufigster Service-Mix ist [Routine-Erinnerung, restaurativ, kosmetisch, Ortho, etc. — mit ungefähren Prozentsätzen]. Unser größter Service, den wir zu wachsen versuchen, ist [Name]. »

### Schritt 2: Führen Sie Erinnerungs-Ausfall auf dem Rückstand aus

Die einzelne Zahnzahn-Skill-Workflow mit dem höchsten ROI ist Erinnerungs-Wiederherstellung. Die meisten Praxen haben 80-200 Patienten, die ihre 6-Monats-Erinnerung überfällig sind, aber nicht aktiv verfolgt wurden.

Sagen Sie:

„Hier sind 50 Patienten, die überfällig auf Erinnerung sind. Für jeden entwerfen Sie eine personalisierte Outreach-Nachricht, die das letzte Besuchsdatum, den erhaltenen Service, die empfohlene nächste Visite und zwei spezifische Termin-Slots referenziert. »

Claude produziert 50 personalisierte Nachrichten. Ihre Empfänger versenden sie in Chargen, führen eine 3-Stufen-Sequenz durch (anfängliche Ausweitung, 1-Woche-Weiterverfolgung, 3-Woche-Endstufe), und verfolgen Buchungen. Typische Wiederherstellung: 25-40% der überfälligen Patienten planen innerhalb von 30 Tagen.

### Schritt 3: Behandlungsplan-Verfolgung

Behandlungspläne, die nicht im Stuhl akzeptiert werden, sind normalerweise auf Dauer verloren, es sei denn, es gibt Verfolgung. Die meisten Praxen haben keinen strukturierten Verfolgungs-Workflow.

Sagen Sie:

„Ein Patient wurde am [Datum] ein Behandlungsplan von $2.400 für [Krone / Implantat / Quadrant-Wiederherstellung] vorgestellt, hat aber nicht geplant. Sie drückten Bedenken aus zu [Kosten / Zeit / Zahnangst]. Entwerfen Sie eine Folge-Nachricht, die die Bedenken anspricht, Finanzierungsoptionen anbietet, falls relevant, und einen nächsten Schritt vorschlägt. »

Die Fähigkeit funktioniert am besten in Kombination mit einem geschriebenen Behandlungsplan, der die Notizen des Zahnarztes zur Patienteneiwand enthält. Personalisierte Verfolgung konvertiert bei 2-4x der Rate von generischen „Lassen Sie uns diesen Behandlung planen"-Erinnerungen.

### Schritt 4: Versicherungsüberprüfungs-Sortierung

Die Versicherungsüberprüfung ist mechanisch, aber verbraucht Empfänger-Stunden. Claude strukturiert die Arbeit:

Sagen Sie:

„Für morgens 8 Neupatient, hier sind die Versicherungsdetails. Generieren Sie eine strukturierte Überprüfungs-Checkliste für jeden — was mit dem Flugzeug bestätigt wird, erwartete Leistungskategorien, Selbstbeteiligungsstatus und häufige Tücken für diesen Flugzeug. »

Die Überprüfungsanrufe finden noch mit dem Flugzeug statt (Versicherungs-APIs sind zahnärztlich flach). Aber Ihre Empfänger kommt zu jedem Anruf mit einer strukturierten Checkliste und schreibt die Antwort in Claude für Downstream-Verwendung in Behandlungs-Planungs-Gesprächen.

### Schritt 5: Neuer Service-Start

Wenn die Praxis einen neuen Service startet (klare Spangen, Schlafapnoe, In-House-Mitgliedschaftsplan):

Sagen Sie:

„Ich starte [Service] in [Monat]. Der Service ist für Patienten, die [Persona / Nutzungsfall]. Preisgestaltung ist [$X]. Entwurf: (1) das Patienten-Bildungsblatt, (2) die In-Office-Ankündigungs-E-Mail an bestehende Patienten, (3) die Website-Service-Seiten-Kopie, (4) das Beratungs-Skript für den Zahnarzt und den Beratungs-Koordinator. »

Sie erhalten ein koordiniertes Paket. Überprüfen, führen Sie Ihren Compliance-Review aus (jede Behauptung über Ergebnisse benötigt eine Zahnarzt-Lesart), und einsetzen.

### Schritt 6: Keine-Anzeige- und Stornierung-Wiederherstellung

Das gleiche Muster wie die Salon-Recovery-Sequenz, kalibriert für einen zahnärztlichen Kontext. Die Wirtschaft ist unterschiedlich — eine gleiche Tag-Keine-Anzeige in zahnärztlich kann $200-500 in verlorenen Einnahmen sein, und die Stuhlzeit der Praxis kann nicht wie ein Haarschnitt wieder verkauft werden. Die Recovery-Sequenz ist direkter:

Touch 1 (gleicher Tag): warme Check-in.
Touch 2 (48 Stunden): ein spezifisches Rebook-Angebot mit zwei offenen Slots.
Touch 3 (7 Tage): direkte Frage plus die Begründung, auf dem Erinnerungs-Zyklus zu bleiben.

## Beispiel

Sie betreiben eine 3-Behandlungszimmer-Familienpraxis. Sie haben 1.400 aktive Patienten. Etwa 220 sind überfällig auf ihrer 6-Monats-Erinnerung — das heißt, sie sind 9+ Monate seit der letzten Hygiene-Visite, und Ihre Empfänger hat sie nicht aktiv in 60+ Tagen kontaktiert.

Sie bitten Claude, personalisierte Outreach für die ersten 50 zu entwerfen (sortiert nach letzter Besuchs-Aktualität — neueste zuerst). Jede Nachricht referenziert das letzte Besuchsdatum des Patienten und bietet zwei Slots.

Sie versenden die erste Chargen Dienstagmorgen. Bis Freitag haben 18 Patienten antwortet. 12 Plan. Das ist $1.800-2.400 in wiederhergestellten Hygiene-Einnahmen (und die Downstream-Behandlung, die aus der Stuhlzeit kommt, die Sie sonst nicht gehabt hätten).

Sie führen eine zweite Chargen den nächsten Dienstag aus. Das gleiche Muster. Über vier Wochen, Sie setzen ungefähr 35% des überfälligen Rückstands ein — 78 Patienten, die geplant werden, die sonst weiter abgeglitten hätten.

Die wiederhergestellten Einnahmen in Monat eins: $11-15K. Der Zeitinvestment: etwa 2 Stunden Empfänger-Review und Outreach-Zeit über den Monat verteilt. Die Claude-Fähigkeit bezahlte sich in den ersten 30 Tagen viele Male über.

Sie richten dies dann als permanenter monatlicher Rhythmus ein. Der Rückstand wächst nie wieder über 40-50 Patienten.
