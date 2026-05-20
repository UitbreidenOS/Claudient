---
name: rfp-responder
description: "RFP and security questionnaire response: analyse, score, and respond to enterprise RFPs, security questionnaires (SIG, CAIQ), and vendor assessments — efficiently and accurately"
---

# RFP Responder Fähigkeit

## Wann zu aktivieren
- Reaktion auf ein Angebot (RFP) oder eine Aufforderung zur Abgabe eines Angebots (ITT) eines Unternehmens
- Beantwortung eines Sicherheitsfragebogens (SIG Lite, SIG Core, CAIQ, benutzerdefiniert)
- Reaktion auf eine Lieferantenbewertung oder einen Due-Diligence-Fragebogen
- Aufbau einer wiederverwendbaren Bibliothek für häufig gestellte RFP-Fragen
- Bewertung eines eingehenden RFP zur Entscheidung, ob geboten werden soll

## Wann nicht zu verwenden
- Vertragsverhandlung nach dem Gewinnen eines RFP — verwenden Sie die Deal-Desk-Fähigkeit
- Rechtliche Compliance-Überprüfung der RFP-Bedingungen — verwenden Sie die Vendor-Contract-Review-Fähigkeit
- Marketing-Positionierung — verwenden Sie die Copywriting-Fähigkeit
- Erstes Verkaufsgespräch oder Demo — verwenden Sie die SDR-Agent-Fähigkeit

## Anleitung

### RFP Gebotsbewertung

```
Score this RFP to decide whether to bid.

RFP details:
- Issuer: [company name, size, industry]
- Estimated contract value: $[X]
- Submission deadline: [date] (time available: [X weeks])
- Contract length: [X months/years]
- Geographic restrictions: [jurisdiction or location requirements]
- Incumbent: [known / unknown / we are the incumbent]

Score on 5 criteria (1-5 each):

1. STRATEGIC FIT:
   - Is this customer in our ICP?
   - Would winning this deal advance our market position?
   - Is there a strong reference-customer opportunity?
   Score: [1-5]

2. WIN PROBABILITY:
   - Do we have an existing relationship or champion?
   - Is this a competitive replacement or greenfield?
   - Did we help shape the requirements (wired RFP)?
   Score: [1-5]

3. COMMERCIAL ATTRACTIVENESS:
   - Is the contract value worth the bid effort?
   - Are the payment terms acceptable?
   - Is the budget confirmed or exploratory?
   Score: [1-5]

4. DELIVERY FIT:
   - Can we fulfil the technical requirements as stated?
   - Are there onerous custom requirements?
   - Is the timeline achievable?
   Score: [1-5]

5. BID FEASIBILITY:
   - Do we have the capacity to respond by the deadline?
   - Who would own this response internally?
   - Do we have the collateral ready (case studies, security questionnaire, certifications)?
   Score: [1-5]

Total score = sum of 5 criteria (max 25)
- 20-25: BID — strong fit, invest fully
- 15-19: BID SELECTIVELY — bid only if champion exists or you have spare capacity
- 10-14: EVALUATE — consider a light bid or no-bid with relationship-building alternative
- < 10: NO BID — not worth the investment

Output: score + rationale + bid/no-bid recommendation.
HUMAN DECISION required — this is a recommendation, not an auto-decision.
```

### RFP-Antwortstruktur

```
Erstellen Sie eine Antwort für [RFP].

RFP-Anforderungen: [einfügen oder Schlüsselabschnitte beschreiben]
Bewertungskriterien: [falls offengelegt — Gewichtungen oder Prioritäten]
Einreichungsformat: [Dokument / Portal / E-Mail / persönliche Präsentation]
Fristablauf: [Datum]
Unterscheidungsmerkmale, die wir hervorheben möchten: [3-5 aufzählen]

RFP-Antwortstruktur (an das spezifische erforderliche Format anpassen):

ZUSAMMENFASSUNG DER GESCHÄFTSLEITUNG (1-2 Seiten):
- Problembeschreibung: zeigen, dass Sie verstehen, was sie zu lösen versuchen (nicht nur das, was sie gefragt haben)
- Vorgeschlagene Lösung: wie Sie es auf hoher Ebene lösen
- Warum uns wählen: 3 Schlüsseldifferenziatoren, die speziell auf die angegebenen Prioritäten dieses Kunden ausgerichtet sind
- Nachweis: eine relevante Fallstudie mit quantifiziertem Ergebnis

UNTERNEHMENSÜBERSICHT (1 Seite):
- Gründung, Hauptsitz, Teamgröße
- Umsatz oder Finanzierung (falls freigegeben)
- Kundenanzahl und bemerkenswerte Logos in ihrer Branche
- Zertifizierungen (SOC 2, ISO 27001, DSGVO, etc.)

LÖSUNGSBESCHREIBUNG (Kernumfang der Antwort):
- Jede ihrer Anforderungen einer spezifischen Funktion zuordnen
- Format: [Ihre Anforderung] → [Unsere Funktion] → [Nachweis]
- Eine Anforderung nie überspringen: « nicht zutreffend » ist besser als Stille
- Ihr Vokabular verwenden, nicht Ihres

IMPLEMENTIERUNG / ONBOARDING (falls zutreffend):
- Zeitplan: schrittweise Einführung mit Meilenstein-Datumsangaben
- Team: wer wird zugewiesen, ihre Erfahrung
- Schulung: was Sie Endbenutzern und Administratoren bereitstellen
- Support: SLA, Kanäle, Reaktionszeiten

PREISGESTALTUNG (ihrem Format folgen):
- Positionale Preisgestaltung für jede Komponente, um die sie gebeten haben
- Falls benutzerdefiniert: einen Bereich bereitstellen oder angeben, dass die Preisgestaltung nach einem Discovery-Gespräch erfolgt
- Gesamtkostenansicht, falls hilfreich (Preisschock vermeiden)

REFERENZEN UND FALLSTUDIEN:
- 2-3 Referenzen in einer ähnlichen Branche oder einem Anwendungsfall
- Einbeziehen: Unternehmensname (falls zulässig), Herausforderung, Lösung, quantifiziertes Ergebnis
- « Referenzen auf Anfrage verfügbar » ist schwach — geben Sie Einzelheiten an

ANHÄNGE (wie erforderlich):
- Sicherheitsfragebögen Antworten
- Zertifizierungs- und Akkreditierungsdokumente
- Standardvertrag / MSA

Schreiben Sie das Antwortframework für mein spezifisches RFP.
```

### Sicherheitsfragebögen Antwort

```
Beantworten Sie diesen Sicherheitsfragebogen.

Fragebogentyp: [SIG Lite / SIG Core / CAIQ / benutzerdefiniert]
Aussteller: [Unternehmensname]
Fristablauf: [Datum]
Unsere Zertifizierungen: [SOC 2 Type II / ISO 27001 / HIPAA / PCI-DSS / keine]

Standard-Antwortkenntnisse:

1. Antwort zunächst von Zertifizierungen:
   - Für SOC 2-Kontrollen: « Diese Kontrolle ist in unserem SOC 2 Type II-Bericht enthalten (unter NDA verfügbar). Kontrollreferenz: CC6.1. »
   - Für ISO 27001: « Dies wird in unserem ISMS unter Kontrolle A.9.2 (Benutzer-Zugriffsverwaltung) behandelt. ISO 27001-Zertifikat auf Anfrage verfügbar. »
   - Das, was das Zertifikat bereits beweis, nicht neu beschreiben — es referenzieren

2. Für Fragen, die nicht durch Zertifizierung abgedeckt sind:
   - Gezielt und ehrlich antworten
   - Beweiasart einbeziehen: « In unserer Access Control Policy (v2.1) dokumentiert »
   - Angebot zum Bereitstellen der Dokumentation unter NDA, falls diese die Richtlinie selbst benötigen

3. Bei Lücken (wo Sie keine Kontrolle haben):
   - « In Arbeit: Wir implementieren [X] als Teil unserer Sicherheits-Roadmap Q[N]. Zielabschluss: [Datum]. »
   - ODER eine Kompensationsmaßnahme anbieten: « Obwohl wir [X] nicht haben, mindern wir dieses Risiko durch [Kompensationsmaßnahme]. »
   - Lücke nie leer lassen — das wirkt ausweichend; ehrliche Lücken mit Abschwächungen sind besser

Häufige Fragen und empfohlene Antworten:

F: Haben Sie SOC 2 Type II?
A (falls ja): « Ja. Unser SOC 2 Type II-Bericht (Sicherheit + Verfügbarkeit TSC) ist unter NDA verfügbar. Letzte Audit-Periode: [Datumsangaben]. Prüfer: [Firma]. »

F: Wie behandeln Sie Datenverstöße?
A: « Wir führen einen dokumentierten Incident Response Plan. Gemäß DSGVO benachrichtigen wir Aufsichtsbehörden innerhalb von 72 Stunden und betroffene Kunden innerhalb von [X] Stunden der Bestätigung einer Verletzung. Unser letzter Incident-Response-Test war [Datum]. »

F: Verschlüsseln Sie Daten im Ruhezustand und während der Übertragung?
A: « Alle Daten im Ruhezustand werden mit AES-256 verschlüsselt (AWS KMS). Alle Daten während der Übertragung verwenden TLS 1.2+. Verschlüsselung wird in allen Produktionsumgebungen erzwungen. »

F: Wie oft führen Sie Penetrationstests durch?
A: « Jährliche Penetrationstests werden von [Third-Party-Firma] durchgeführt. Letzter Test: [Datum]. Ergebnisse werden gemäß unserem Vulnerability-Management-SLA behoben (kritisch: 30 Tage, hoch: 60 Tage). »

F: Wo werden Kundendaten gespeichert?
A: « Alle Kundendaten werden in [AWS us-east-1 / EU-West-1 / etc.] gespeichert. Wir übertragen Daten nicht außerhalb von [Gerichtsbarkeit], außer wie von [spezifischer Ausnahme erforderlich — z.B. Support-Tooling mit geltenden Datenverarbeitungsvereinbarungen]. »

Erstellen Sie die vollständige Fragebögen-Antwort für mein Zertifizierungsniveau und die gestellten Fragen.
```

### Antwortbibliothek

```
Erstellen Sie eine wiederverwendbare RFP-Antworrbibliothek für [Unternehmen].

Unternehmen: [Name]
Produkte: [beschreiben]
Zertifizierungen: [auflisten]
Top-Kundensegmente: [Branchen / Unternehmensgrößen]
Häufig geforderte RFP-Abschnitte: [die am häufigsten vorkommenden Kategorien aufzählen]

Bibliotheksstruktur:

UNTERNEHMENSBOILERPLATE (vierteljährlich aktualisieren):
- Unternehmensübersicht: [250 Wörter, aktualisiert mit neuester Mitarbeiterzahl und ARR]
- Biographien des Führungsteams: [CEO, CTO, VP Sales — 3-4 Sätze je]
- Investition und Finanzierung: [Serie X, unterstützt von X — oder « privat gehalten » falls nicht offenlegbar]
- Kundenreferenzen: [5-7 Referenzen vorab genehmigt zum Austausch, mit Branche und Ergebnis]

FUNKTIONSBESCHREIBUNGEN (nach Produktbereich):
[Produkt/Funktion]: [250-Wort-Beschreibung zum Einfügen bereit]

SICHERHEIT (Standardblock):
[Vorbereitete Antwort für jede der 20 häufigsten Sicherheitsfragen]
Aktualisieren, wenn sich der Zertifizierungsstatus ändert.

FALLSTUDIEN (2-3 pro Vertikal):
[Branche]: [Unternehmenstyp] + [Problem] + [Lösung] + [Ergebnis mit einer Zahl]

ZERTIFIZIERUNGEN UND COMPLIANCE:
[SOC 2: Datumsangaben, Prüfer, Abdeckung]
[ISO 27001: Zertifikatnummer, Ablauf, Umfang]
[DSGVO: DPA-Vorlage verfügbar, DPO-Kontakt]
[HIPAA: BAA auf Anfrage verfügbar]

PREISGESTALTUNGSSPRACHE:
[Standardantwort: « Die Preisgestaltung wird basierend auf Volumen und Konfiguration angepasst. Unser Team stellt ein detailliertes Angebot innerhalb von 3 Arbeitstagen nach Erhalt Ihrer Anforderungen bereit. »]
[Oder: Standard-Preistabelle falls Ihre Preisgestaltung veröffentlicht ist]

Wartungsrhythmus:
- Vierteljährlich: Unternehmensstatistiken aktualisieren, Kundenanzahl, Zertifizierungen
- Nach jedem RFP: Neue Fallstudie oder genehmigte Referenz hinzufügen, falls ein neuer Gewinn
- Nach jedem Sicherheitsfragebogen: Sicherheitsblock mit allen neuen Kontrollen aktualisieren

Generieren Sie die Antworrbibliotheksstruktur für mein Unternehmen.
```

## Beispiel

**Benutzer:** Wir erhielten eine 200-Fragen-SIG-Core von einem Finanzdienstleister-Unternehmen. Wir haben SOC 2 Type II, aber keine ISO 27001. Die Frist ist 10 Tage. Wie antworten wir effizient?

**Claude's Strategie:**

200 Fragen in 10 Tagen = nicht jede Frage von vorne beantworten. Erst priorisieren.

**Schritt 1 — Kategorisieren (Tag 1, 2 Stunden):**
Alle 200 Fragen in folgende gruppieren:
- Abgedeckt durch SOC 2: mit « SOC 2 ref: [Kontrolle] » markieren — mit Bericht antworten
- Richtlinienbearbeitet: mit « Policy: [Name] » markieren — schnelle spezifische Antwort
- Nicht zutreffend: als N/A mit Begründung markieren (z.B. physische Kontrollen bei nur Cloud)
- Lücken: ehrliche Antwort + Kompensationsmaßnahme oder laufende Notiz

Erwartete Aufteilung für SOC 2 Type II-Inhaber: ~70 Fragen abgedeckt durch SOC 2, ~60 durch Richtlinie, ~40 N/A, ~30 echte Lücken.

**Schritt 2 — Nach Eigentümer Batch (Tag 1-2):**
Engineering besitzt: Verschlüsselung, Zugriffskontrolle, Vulnerability Management, Logging
Legal besitzt: Datenverarbeitung, Datenschutz, regulatorische Konformität
Finanzen/Betrieb besitzt: Business Continuity, Versicherung, Drittanbieter-Verträge

**Schritt 3 — Einmal SOC 2-Block schreiben, überall referenzieren (Tag 2):**
« Diese Kontrolle wird in unserer SOC 2 Type II-Audit behandelt (unter NDA verfügbar). Kontrollreferenz: [CC#]. Audit-Periode: [Datumsangaben]. Prüfer: [Firma]. »
Diese Vorlage über alle SOC 2-abgedeckten Fragen kopieren — 10 Minuten pro Kontrolle, nicht 10 Fragen × 30 Minuten je.

**Schritt 4 — Lücken (Tag 5-7):**
Für jede echte Lücke: 2-3 Sätze — was wir nicht haben, was wir stattdessen tun, wann wir es angehen planen.

**Schritt 5 — Überprüfung und Einreichung (Tag 8-10):**
Legal überprüft den Daten-/Datenschutz-Abschnitt. CEO überprüft die 10 empfindlichsten Fragen stichprobenartig. Mit einer Begleitnote einreichen, die ein virtuelles Sicherheitsgespräch mit Ihrem CTO anbietet.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
