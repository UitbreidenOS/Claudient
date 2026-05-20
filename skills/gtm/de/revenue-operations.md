---
name: revenue-operations
description: "Revenue Operations: Pipeline-Analyse, Prognosegenauigkeit, GTM-Metriken (CAC, LTV, NRR), Vertriebsprozessdesign, Territoriumsplanung und RevOps-Dashboard-Design"
---

# Revenue Operations Skill

## Wann aktivieren
- Aufbau eines RevOps-Metriken-Rahmens (CAC, LTV, NRR, Pipeline-Abdeckung)
- Diagnose, warum die Vertriebsprognose ungenau ist
- Gestaltung des Vertriebsprozesses und der Stufen definitionen
- Analyse der Pipeline-Gesundheit und Identifizierung von Konversionsengpässen
- Einrichtung oder Überprüfung eines CRM-Datenmodells
- Erstellen eines GTM-Metriken-Dashboards für die Geschäftsleitung

## Wann NICHT verwenden
- Individuelle Deal-Strategie — das ist Vertrieb, nicht RevOps
- Ausführung von Marketing-Kampagnen — verwenden Sie email-automation oder paid-ads Skills
- Customer Success Playbooks — verwenden Sie den customer-success Skill
- Produktpreisentscheidungen — verwenden Sie den pricing-strategy Skill

## Anweisungen

### GTM-Metriken-Rahmen

```
Erstellen Sie einen GTM-Metriken-Rahmen für [Unternehmen].

Unternehmenstyp: [B2B SaaS / Marktplatz / Services]
Vertriebsmodus: [PLG / Inside Sales / Feldverkauf / Partner-geführt]
Stadium: [vorab Umsatz / $0-1M ARR / $1-10M ARR / $10M+ ARR]
GTM-Team: [Gründer verkaufen / SDR + AE / vollständiges GTM-Team]

Kern-GTM-Metriken nach Funnel-Stadium:

AKQUISITION:
- Generierte MQLs: [marketing-qualifizierte Leads pro Monat]
- MQL→SQL Umwandlungsrate: [%] (Benchmark: 10-25% je nach ICP-Genauigkeit)
- CAC (Kundenakquisitionskosten): [Gesamt Sales + Marketing Ausgaben / neue Kunden]
- CAC nach Kanal: [bezahlt / organisch / Partner / Outbound] — effizientesten Kanal identifizieren
- Zeit bis zum ersten Kontakt: [Stunden von MQL bis SDR-Outreach]

KONVERSION:
- SQL→Opportunity Umwandlung: [%]
- Opportunity→Close-Won Rate: [%] (Benchmark: 15-25% für Inside Sales, 10-20% Enterprise)
- Durchschnittliche Deal-Größe: [ACV]
- Vertriebszyklus-Länge: [Tage von Opportunity-Erstellung bis Abschluss]
- Gewinnquote nach Segment: [SMB / Mid-Market / Enterprise] — wo gewinnen Sie am meisten?

AUFBEWAHRUNG UND EXPANSION:
- NRR (Netto-Revenue-Aufbewahrung): [%] (Benchmark: >100% ist gesund, >120% ist ausgezeichnet)
- GRR (Brutto-Revenue-Aufbewahrung): [%] — reine Aufbewahrung ohne Expansion
- Expansion ARR: [neue ARR von bestehenden Kunden pro Monat]
- Churn-Rate: [%] monatlich oder jährlich
- Logo Churn vs. Revenue Churn: [verschiedene Geschichten]

EFFIZIENZ:
- LTV:CAC Verhältnis: [Ziel >3x, >5x ist stark]
- CAC Amortisationsdauer: [Monate zur Rückgewinnung der Akquisitionskosten]
- Magic Number: [ARR hinzugefügt / Sales + Marketing Ausgaben] (>0,75 ist gut)
- Vertriebseffizienz: [neue ARR / Quoten-tragende Kopfzahl]

Erstellen Sie den Metriken-Rahmen mit aktuellen Benchmarks für meinen Unternehmenstyp und Stadium.
```

### Prognosegenauigkeit

```
Diagnostizieren und beheben Sie die Vertriebsprognosegenauigkeit für [Team].

Aktuelle Prognosegenauigkeit: [X% genau innerhalb [Y]% Varianz]
Prognosemethode: [Bottom-up von Reps / Top-down vom Manager / KI-gestützt]
CRM: [Salesforce / HubSpot / Pipedrive / andere]
Vertriebszyklus: [X Tage Durchschnitt]

Wurzelursachen der Prognosegenauigkeit:

STUFEN-DEFINITIONEN-PROBLEME (am häufigsten):
- Stufen basieren nicht auf Käuferaktionen, nur auf Verkäuferaktionen
  Behebung: Stufen als Käufer-Meilensteine neu definieren
- Fehlende Ausstiegskriterien — Reps können Deals ohne Beweis vorantreiben
  Behebung: erforderliche Felder pro Stufe hinzufügen

REP-OPTIMISMUS-VERZERRUNG:
- Reps übertreiben Deal-Wahrscheinlichkeit zur Vermeidung von Manager-Überprüfung
  Behebung: Wahrscheinlichkeit mit objektiven Kriterien setzen, nicht Bauchgefühl
  Gutes Signal: Zeit in Stufe vs. Durchschnittliche Zeit in Stufe
  Besseres Signal: Käufer-Engagement-Score

EINFACH-GETHREADVERTE DEALS:
- Nur ein Kontakt im Deal
  Behebung: Einzelne Threads kennzeichnen; Multi-Threading als Stufen-Ausstiegskriterium erforderlich

PIPELINE-INSPEKTIONS-HYGIENE:
□ CRM-Datenvollt. : Schließdatum, Betrag, Stufe, Entscheidungsträger auf jedem Deal > $X erforderlich
□ Wöchentliche Pipeline-Überprüfung: Deals, die sich nicht >14 Tage bewegt haben
□ Deal-Stufen-Audit: Deals in späten Stufen ohne Aktivität in 7 Tagen
□ Älteste Deals: >2x durchschnittlicher Vertriebszyklus sollten vorangetrieben oder verloren sein

PROGNOSE-KATEGORIEN (Salesforce-Modell):
- Bester Fall: Deals, an denen der Rep hart arbeitet, aber nicht vollständig verpflichtet
- Commit: Rep glaubt wird diese Periode schließen
- Geschlossen: bereits geschlossen
- Pipeline: zu früh oder unsicher für diesen Zeitraum

Benchmark: Commit-Kategorie sollte >80% schließen.

Erstellen Sie den Plan zur Verbesserung der Prognosegenauigkeit für mein Team und CRM.
```

### Pipeline-Analyse

```
Analysieren Sie die Pipeline-Gesundheit für [Zeitraum].

Zeitraum: [aktuelles Quartal / nächstes Quartal]
Gesamte Pipeline: $[X]
Quota: $[X]
Pipeline-Abdeckungsverhältnis: [Pipeline / Quota]

Pipeline-Gesundheits-Rahmen:

ABDECKUNGS-VERHÄLTNIS-BENCHMARKS:
- Inside Sales (30-60 Tage Zyklus): 3-4x Quota in Pipeline
- Enterprise (90-180 Tage Zyklus): 4-6x Quota in Pipeline
- PLG (kürzerer Zyklus): 2-3x kann ausreichend sein

Ihre Pipeline-Abdeckung: $[X Pipeline] / $[X Quota] = [Xx]
Interpretation: [angemessen / unterdeckt / überdeckt]

PIPELINE-QUALITÄTS-ANALYSE:

Stufen-Verteilung (gesunde Pipeline hat Deals auf jeder Stufe):
| Stufe | Deal-Anzahl | Gesamtwert | % der Pipeline |
|---|---|---|---|

ROTE FLAGGEN IN DER VERTEILUNG:
- Zu viel Pipeline in frühen Stufen: aktuelle Quartal-Prognose ist gefährdet
- Zu viel Pipeline in späten Stufen: zukünftige Quartale sind dünn
- Einzelner großer Deal >30% der Pipeline: binäres Ergebnis-Risiko

ALTERSANALYSE:
Deals älter als 1,5x durchschn. Vertriebszyklus in ihrer Stufe = stagniert

EMPFOHLENE MASSNAHMEN:
□ Stagniierte Deals: Rep überprüfen und entweder vorantreiben oder auf Closed-Lost setzen
□ Abdeckungslücke: [X] neue Opportunities in nächsten 30 Tagen generieren
□ Einfach-Gethreadverte Deals: Multi-Thread oder Risiko explizit akzeptieren
□ Große Deal-Konzentration: kleinere Deals beschleunigen

Erstellen Sie den Pipeline-Gesundheitsbericht für die Pipeline-Daten meines Teams.
```

---

> **Zusammenarbeit mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir bauen KI-Produkte und B2B-Lösungen mit Entwickler-Communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
