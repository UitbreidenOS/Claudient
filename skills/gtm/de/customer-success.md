---
name: customer-success
description: "Customer success management: health scoring, churn prediction signals, expansion playbooks, QBR structure, onboarding plans, and customer lifecycle management for SaaS"
---

# Kundenerfolg Fähigkeit

## Wann zu aktivieren
- Aufbau eines Kundengesundheitsscore-Modells
- Identifizierung gefährdeter Kunden vor dem Churn
- Gestaltung von Expansions- und Upsell-Spiele
- Durchführung einer vierteljährlichen Geschäftsüberprüfung (QBR) mit einem Kunden
- Erstellung eines Kundenonboarding-Plans
- Segmentierung der Kundenbasis für CS-Abdeckungsmodelle

## Wann nicht zu verwenden
- Vertriebsprospektierung — verwenden Sie die Fähigkeiten sdr-agent oder lead-enrichment
- Produktanalytik für interne Entscheidungen — verwenden Sie die Fähigkeit product-analytics
- Marketingkampagnen für bestehende Kunden — verwenden Sie die Fähigkeit email-sequence
- Technischer Support oder Bug-Triage — unterschiedliche Funktion

## Anleitung

### Kundengesundheitsscore

```
Erstellen Sie ein Kundengesundheitsscore-Modell für [Produkt].

Produkt: [beschreiben — SaaS / Plattform / verwalteter Service]
Kundentyp: [KMU / Mittelstand / Unternehmen]
Schlüsselerfolgsmetrik: [was anzeigt, dass ein Kunde Wert erhält]
Verfügbare Daten: [Produktnutzung / Support-Tickets / NPS / Zahlungsverlauf / Engagement]

Rahmen für Gesundheitsscore (gewichtetes Composite):

NUTZUNGSSIGNALE (40% Gewicht):
- Anmeldehäufigkeit: [täglich/wöchentlich/monatlich] vs. erwartet für Plan
- Kernfunktionen-Adoption: % der erworbenen Funktionen, die tatsächlich verwendet werden
- Machtbenutzer: Anzahl der Benutzer mit > X Sessions/Woche
- Breite: % der lizenzierten Plätze aktiv verwendet
- Trend: wächst die Nutzung, ist flach oder sinkt MoM?

BEZIEHUNGSSIGNALE (25% Gewicht):
- NPS-Score: letzte Umfrageantwort und Trend
- Support-Ticketvolumen: steigende Tickets = Reibung ; null Tickets = Disengagement-Risiko
- Engagement von Führungskräften: letzte Kontakt mit Entscheidungsträger
- Champions: identifiziert interne Befürworter für Ihr Produkt?

KOMMERZIELLE SIGNALE (20% Gewicht):
- Tage überfällig auf Rechnungen: >30 Tage ist ein Churn-Signal
- Erneuerungsdatum: <90 Tage zur Erneuerung = hohe Priorität
- Vertragswachstum: Erweiterung (gesund) vs. Kontrahierung (Churn-Risiko)
- Rabattstufe: stark rabattierte Konten = niedrigere Wechselkosten

ERGEBNIS-SIGNALE (15% Gewicht):
- Erklärte Erfolgskriterien des Kunden: werden sie erfüllt?
- Erreichte Geschäftsergebnisse: ROI dokumentiert?
- Fallstudie / Referenz bereit: starkes Erfolgssignal

Scoring:
Jedes Signal 1-10 bewertet → gewichteter Durchschnitt → Gesundheitsstufe:

Gesund (Score 7-10): vierteljährlich überwachen, Expansionsmöglichkeiten suchen
Gefährdet (Score 4-6): monatliche Check-ins, Blocker identifizieren und beheben
Kritisch (Score 1-3): wöchentliche Einbindung, ggf. Eskalation auf Führungsebene

Erstellen Sie das Gesundheitsscore-Modell für mein Produkt mit spezifischen Metrikdefinitionen.
```

### Churn-Vorhersagesignale

```
Identifizieren Sie gefährdete Kunden, bevor sie churnen.

Produkttyp: [SaaS]
Vertragstyp: [monatlich / jährlich / mehrjährig]
Historische Churn-Rate: [X%]
Verfügbare Daten: [beschreiben Sie, was Sie verfolgen]

Frühe Warnsignale nach Zeitrahmen:

90+ TAGE VOR CHURN (strategische Signale):
- Führungskraft verließ das Unternehmen (sofort mit Nachfolger arbeiten)
- Unternehmen durchlief Akquisition oder Umstrukturierung
- Budgetgefrierung oder Personalabbau angekündigt (LinkedIn/Nachrichten)
- Champion, der Ihr Produkt bewirbt, ist stille geworden oder gegangen

60-90 TAGE VOR CHURN (Engagement-Signale):
- Anmeldehäufigkeit um > 30% gegenüber dem Durchschnitt der letzten 3 Monate gesunken
- Nutzung von Kernfunktionen sinkt 2+ Monate lang
- Support-Tickets über Datenexport oder API-Zugriff eröffnet (Migrationsvorbereitung)
- NPS-Wert um ≥ 2 Kategorien gesunken (Befürworter → Passiv / Passiv → Detrakteur)
- Support-Ticket, das Vertragsbedingungen, Erneuerungsdatum oder Kündigungsprozess fragt

30-60 TAGE VOR CHURN (kommerzielle Signale):
- Rechnung > 15 Tage überfällig ohne vorherige Kommunikation
- Kunde bat um Preisvergleich oder RFP
- CS-Team hat seit > 45 Tagen keinen Kontaktpunkt mit Primärkontakt
- Feature-Anfragen eingereicht, aber keine Antwort erhalten

<30 TAGE VOR CHURN (letzte Chance Signale):
- Benutzerzahl deutlich gesunken (Benutzer werden offboardet)
- Integration entfernt oder API-Schlüssel deaktiviert
- Kunde nimmt nicht am QBR teil oder überspringt geplante Anrufe
- Direkte Kommunikation über Unzufriedenheit oder Wettbewerbsbewertung

Response-Playbook nach Risikostufe:
90+ Tag Signal: sofortige CSM-Kontaktaufnahme, Führungsebenen-Vorstellung
60-90 Tage Signal: Gesundheitsreview-Anruf, Erfolgsblockierungen identifizieren, zu CS-Leiter eskalieren
30-60 Tage Signal: Führungsabstimmungsanruf, Speicher-Angebot falls kommerziell, schnelle Reaktion auf Beschwerden
<30 Tage Signal: Speicher-Anruf mit Entscheidungsträger, Grundursache verstehen, letzte Chance Angebot

Erstellen Sie das Churn-Signal-Erkennungs-Playbook für mein Produkt und Vertragsbedingungen.
```

### QBR-Struktur

```
Entwerfen Sie eine vierteljährliche Geschäftsüberprüfung für [Kunde].

Kunde: [Unternehmensname, Stufe, Vertragswert]
Dauer: [30 Min / 60 Min / 90 Min]
Teilnehmer: [kundenseitige Führungskraft + Benutzer / CS + AE / Führungsabstimmung]
Ziel: [Bindung / Expansion / Fallstudie / Beziehungsaufbau]

QBR-Agenda:

[10 Min] ERÖFFNUNG: Beziehung und Agenda
- Ihnen für die Zeit danken
- Agenda und gewünschte Ergebnisse für diese Sitzung bestätigen
- « Was würde diese 60 Minuten für Ihr Team am wertvollsten machen? »

[15 Min] IHR GESCHÄFT: Was hat sich seit dem letzten Quartal geändert?
- Fragen vor dem Reden: « Was sind Ihre Top 3 Prioritäten für das nächste Quartal? »
- Welche Herausforderungen treten Sie auf?
- Gibt es Änderungen in Team, Budget oder strategischer Ausrichtung?
[Dieser Abschnitt zeigt oft Expansionsmöglichkeiten oder Churn-Risiken]

[20 Min] WERTBEREITSCHAFT: Was sie von Ihrem Produkt bekommen
- Nutzungsmetriken vs. letztes Quartal (Wachstum oder Stabilität anzeigen)
- Erfolg gegen ihre angegebenen Ziele aus dem letzten QBR
- Spezifische Ergebnisse: [X Stunden eingespart / $Y Umsatz beeinflusst / Z% Effizienzgewinn]
- Die Auswirkung Ihres Produkts auf die geschäftlichen Prioritäten abbilden

[10 Min] ROADMAP-VORSCHAU: Was kommt, das relevant für sie ist
- 1-3 kommende Features, die ihre Anwendungsfälle direkt adressieren
- Feedback erhalten: « Würde dies das Problem lösen, das Sie erwähnt haben? »
- Vermeiden Sie: « Hier ist alles, was wir bauen » — kuratieren Sie ihren Kontext

[15 Min] OFFENE PROBLEME UND NÄCHSTE SCHRITTE:
- Alle offenen Support-Tickets oder ungelöste Probleme
- Expansionsdiskussion, falls angebracht (nicht erzwingen, wenn Vertrauen nicht vorhanden ist)
- Erfolgskriterien für nächstes Quartal bestätigen
- Aktionselemente mit Eigentümern und Daten

[10 Min] SCHLIESSING:
- « Welche eine Sache sollten wir nächstes Quartal anders machen? »
- Erneuerungszeitplan und nächste Kontaktpunkte
- Referenzen / Fallstudie / Referenz anfragen, falls Beziehung stark ist

QBR-Regeln:
- 5 Tage im Voraus Agenda senden
- Verbring > 50% der Zeit hörend, < 50% präsentierend
- Beginnen Sie niemals mit einer Produktdemo — beginnen Sie mit ihrem Geschäft
- Enden Sie immer mit dokumentierten nächsten Schritten

Generieren Sie den QBR-Deck-Gliederung und Talking Points für meinen spezifischen Kunden.
```

### Kundenonboarding-Plan

```
Erstellen Sie einen Onboarding-Plan für [neuen Kunden].

Kunde: [Größe, technische Raffinesse, Anwendungsfall]
Vertrag: [$X ARR, [X] Plätze, [Y] gekaufte Anwendungsfälle]
Erfolgseigentümer: [CSM-Name]
Zeitplan: [30/60/90-Tage-Onboarding]
Aha-Moment: [das spezifische Ergebnis, das schnell Wert zeigt]

30-60-90-Tage Onboarding-Plan:

TAGE 1-7 — Setup und Orientierung:
□ Kick-off-Anruf: Einführungen, Erfolgskriterien bestätigen, Kommunikationshäufigkeit festlegen
□ Technisches Setup: Kontobereitstellung, Integrationen, Benutzereinladungen
□ Administratorenschulung: der Käufer / Admin-Benutzer kann das Werkzeug unabhängig konfigurieren
□ Schneller Gewinn: den einzelnen impactfulsten Anwendungsfall identifizieren — lassen Sie ihn diese Woche funktionieren

TAGE 8-30 — Erste Wertbereitstellung:
□ Champion-Schulung: 1-2 interne Machtbenutzer trainiert und aktiv
□ Erster Kernworkflow läuft Ende-zu-Ende
□ Prüfanruf (Woche 2): irgendwelche Blockierer? Was funktioniert?
□ Aktivierungsmeilenstein bestätigt: [spezifischer Aha-Moment erreicht]
□ Einführung zusätzlicher Teammitglieder, die das Produkt nutzen sollten

TAGE 31-60 — Vertiefung der Adoptierten:
□ Erweitern Sie sich auf zusätzliche Anwendungsfälle oder Abteilungen
□ Schulen Sie verbleibende Benutzer in Kernworkflows
□ Dokumentieren Sie frühe Gewinne und ROI-Signale (Beweis für interne Stakeholders vorbereiten)
□ Halbzeit-Onboarding-Überprüfung: Gesundheitsscore-Check, identifizierte Churn-Signale

TAGE 61-90 — Fokus auf Geschäftsergebnisse:
□ Ergebnisüberprüfung: gegen die beim Kick-off festgelegten Erfolgskriterien
□ ROI-Dokumentation: Kann der Kunde Wert für seine Führungskräfte artikulieren?
□ Interner Champion identifiziert und gepflegt
□ Weg zur Expansion diskutiert (wenn Nutzung unterstützt)
□ Fallstudien / Referenzanfrage, wenn Beziehung stark ist

Eskalationsauslöser während Onboarding (sofort kennzeichnen):
- Technisches Setup nicht bis Tag 7 abgeschlossen
- Keine Anmeldungen von Nicht-Admin-Benutzern bis Tag 14
- CSM kann Primärkontakt nicht > 5 Tage erreichen
- Kunde äußert Unzufriedenheit oder unerfüllte Erwartung in den ersten 30 Tagen

Generieren Sie den Onboarding-Plan für meinen spezifischen Kunden und Produkt.
```

## Beispiel

**Benutzer:** Wir haben 50 Kunden, die $2K-$10K/Monat bezahlen. Kein formaler CS-Prozess. 3 churned letztes Quartal ohne Warnung. Wie baue ich einen grundlegenden Gesundheitsscore mit dem auf, was ich habe?

**Claude's Quick-Start-Modell:**

Ohne formale CS-Daten baue ich aus dem auf, was Sie haben — Produktlogs + CRM + Support-Tickets. Das dauert 1 Woche zum Einrichten.

**3-Signal Gesundheitsscore (hier anfangen, später bauen):**

| Signal | Datenquelle | Grün | Gelb | Rot | Gewicht |
|---|---|---|---|---|---|
| Monatlich aktive Benutzer | Produkt-DB | >60% Plätze aktiv | 30-60% | <30% | 40% |
| Support-Tickets | Helpdesk | 0-2/Monat | 3-5/Monat | >5 oder 0 für 60+ Tage | 30% |
| Tage seit letztem CS-Kontakt | CRM | <30 Tage | 31-60 Tage | >60 Tage | 30% |

**Score = gewichteter Durchschnitt der Signalscores (1-10 pro Signal)**

**In Ihrem CRM jetzt:** ein Gesundheitsfeld auf jedem Konto erstellen (Grün/Gelb/Rot). Manuell überprüfen und diese Woche jedes Konto festlegen. Monatlich überprüfen.

**Die 3 Churns hatten keine Warnung, weil :** Sie keinen Score und keine Kontakthäufigkeit hatten. Kontakthäufigkeit zuerst beheben — ein monatliches 30-Minuten-Anruf mit jedem Kunden ist mehr wert als ein perfektes Gesundheitsscore-Modell, das Sie in 3 Monaten bauen.

**Sofortige Maßnahmen:**
1. Diese Woche jeden Kunden anrufen, mit dem Sie seit >60 Tagen nicht gesprochen haben (wahrscheinlich 15-20 von 50)
2. Sie fragen: « Was würde Sie veranlassen, ohne zu zögern zu erneuern? » — Sie erfahren mehr von 10 Anrufen als 3 Monaten Analyse
3. Regel festlegen: Kein Konto geht > 45 Tage ohne Kontaktpunkt

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
