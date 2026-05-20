---
name: deal-desk
description: "Deal desk: structure enterprise deals, review contract terms, set discount approval thresholds, analyse deal economics, and create commercial policy — for B2B sales operations"
---

# Deal Desk Fähigkeit

## Wann zu aktivieren
- Strukturierung eines komplexen Unternehmensabschlusses (mehrjährig, benutzerdefinierte Bedingungen, Pakete)
- Überprüfung eines vom Kunden vorgeschlagenen Vertrags auf kommerzielle Warnsignale
- Festlegung von Rabattgenehmigungsschwellwerten und Eskalationsrichtlinien
- Analyse der Abschlussökonomie (Marge, Rückzahlung, LTV) vor Genehmigung
- Erstellung oder Aktualisierung der Geschäftspolitik (Preisgarantien, Bündelungsregeln)

## Wann nicht zu verwenden
- Rechtliche Vertragsüberprüfung auf Compliance-Risiken — verwenden Sie die Fähigkeit vendor-contract-review oder diligence-review
- Preisgestaltungsstrategie und Tier-Design — verwenden Sie die Fähigkeit pricing-strategy
- Umsatzprognose — verwenden Sie die Fähigkeit revenue-operations
- Kundenerfolgreich und Erneuerungsspielplätze — verwenden Sie die Fähigkeit customer-success

## Anleitung

### Abschlussstrukturierung

```
Strukturieren Sie einen Abschluss für [Kunde].

Kunde: [Name, Unternehmensgröße, Branche]
Abschlusstyp: [neues Logo / Erweiterung / Erneuerung / mehrjährig]
Angefordert ARR: $[X]
Angeforderte Produkte / Stufen: [Liste]
Vertragslaufzeit: [12 / 24 / 36 Monate]
Angeforderte Startdatum: [Datum]
Spezielle Anforderungen: [benutzerdefinierter SLA / dedizierte Unterstützung / benutzerdefinierte Integration / Datenspeicherung]

Überprüfung der Abschlussstruktur:

1. PREISINTEGRITÄT:
   Was ist der Listenpreis für diese Konfiguration?
   Kunde fragt nach: $[X] ([X]% Rabatt auf Liste)
   Liegt dies innerhalb der standardmäßigen Rabattautorität? [rep / manager / VP / CRO-Stufe]
   Was ist die Begründung? [Volumen / strategisch / wettbewerbsfähig / Erneuerungsbindung]

2. ABSCHLUSSÖKONOMIE:
   ACV: $[X]
   Geschätzter CAC für diesen Abschluss: $[X] (Vertriebsgehalt + Provision + SE-Zeit + Rechtszeit)
   Bruttogewinn zu diesem Preis: [X]%
   CAC-Rückzahlung zu diesem Preis: [X] Monate
   Ist dieser Abschluss wirtschaftlich rentabel? [ja / grenzwertig / nein — eskalieren]

3. LAUFZEITSTRUKTUR:
   Zahlungsbedingungen: [netto 30 / jährlich im Voraus / vierteljährlich]
   Mehrjähriger Lock-in: [Jahr 2 und 3 Preise gebunden an Liste / CPI + X%]
   Erneuerungsautoverlängerung: [ja / 90-Tage-Mitteilung]
   Klausel zur frühzeitigen Kündigung: [ja — Risiko / nein — Standard]

4. NICHT-STANDARDBEDINGUNGEN ZUM KENNZEICHNEN:
   Unbeschränkte Haftung — ablehnen oder zur Justiz eskalieren
   Unbeschränkter Schadensersatzanspruch — eskalieren
   SLA-Strafen als einziges Rechtsmittel — akzeptieren, wenn Strafen begrenzt sind
   Meistbegünstigte Nationen-Preisklausel — kennzeichnen ; kann zukünftige Preisgestaltung einschränken
   Datenportabilitätsanforderungen bei Kündigung — kennzeichnen ; bestätigen Sie, dass die Ingenieurdienste erfüllt werden können
   Unterauftragnehmer-Beschränkungen — kennzeichnen ; bestätigen Sie, dass die aktuelle Untermitnehmerliste akzeptabel ist

5. GENEHMIGUNG DES ABSCHLUSSES:
   Genehmiger auf dieser Rabattstufe: [Name/Rolle]
   Erforderliche Dokumente vor Genehmigung: [SOW / Sicherheitsfragebogen / Rechtsüberprüfung]
   Erwartete Schlussdatum: [Datum]

Ausgabe: Abschlussapprobationsempfehlung mit spezifischen Bedingungen.
MENSCHLICHE GENEHMIGUNG ERFORDERLICH für alle Rabatte > Standard-Rep-Autorität.
```

### Rabattgenehmigungspolitik

```
Entwerfen Sie eine Rabattgenehmigungspolitik für [Unternehmen].

Vertriebsteamgröße: [X reps]
Abschlussgrößen: [$X typisches ACV, $X max ACV]
Aktuelles Rabatt-Problem: [zu viel / inkonsistent / keine Richtlinie / Margenkompressionierung]

Standard-Rabattautoritätsmatrix:

| Rabattstufe | Genehmigt von | Max ACV | Bedingungen |
|---|---|---|---|
| 0-10% Rabatt auf Liste | AE (keine Genehmigung erforderlich) | Jede | Nur Standardbedingungen |
| 11-20% Rabatt auf Liste | Vertriebsleiter | Jede | Schriftliche Begründung erforderlich |
| 21-30% Rabatt auf Liste | VP Vertrieb | Jede | Abschlussüberprüfungssitzung erforderlich |
| 31-40% Rabatt auf Liste | CRO | > $100K ACV nur | CEO-Bewusstsein + Abschlussökonomie-Überprüfung |
| > 40% Rabatt auf Liste | CEO + Vorstand | Nur strategische Abschlüsse | Vollständige Deal-Desk-Überprüfung |

Rabattbegründungskategorien:
- Volumen: > X Plätze / > X Nutzungsvolumen
- Strategisch: Referenzkunde / Fallstudie / Partnerschaftswert
- Wettbewerbsfähig: dokumentierte Wettbewerbsverdrängerung
- Bindung: gefährdete Erneuerung, Wettbewerbs-Evaluierung in Arbeit
- Geschwindigkeit: signieren bis [Datum] für aktuelle Quartalsabschluss

Rabattgarantien (nicht verhandelbar):
- Kein Rabatt unterhalb des Mindestbruttogewinnfloors ([X]% — von Finanzen festgelegt)
- Mehrjährige Abschlüsse: Preisgestaltung für Jahr 2+ muss an Liste oder CPI-angepasst sein — niemals zu Rabattsatz verriegelt
- Keine rückwirkenden Rabatte auf bereits abgeschlossene Abschlüsse
- Rabatt gilt nur für ARR — Dienstleistungen immer zu Liste

Generieren Sie die Genehmigungsrichtlinie für meine Unternehmens- und Vertriebs-Teamstruktur.
MENSCHLICHE GENEHMIGUNG ERFORDERLICH für jeden Abschluss über Rep-Autorität-Level.
```

### Überprüfung der Vertragsbedingungen

```
Überprüfen Sie diese Vertragsbedingungen auf kommerzielle Risiken.

Vertragstyp: [MSA / Order Form / SaaS-Abonnementvereinbarung]
Unsere Rolle: [Anbieter / Kunde]
Vertragswertz: $[X] / [Laufzeit]

Kommerzielle Warnsignale zu überprüfen (kennzeichnen als ROT/GELB/GRÜN):

HAFTUNG:
Unbeschränkte Haftung — muss auf einen Höchstbetrag verhandelt werden (Standard: 12 Monate Gebühren)
Haftungsobergrenze < 3 Monate Gebühren — zu niedrig ; auf mindestens 12 Monate verhandeln
Keine Ausnahme für grobe Fahrlässigkeit oder vorsätzliches Fehlverhalten — überprüfen Sie, dass die Obergrenze gilt

PREISGESTALTUNG UND ZAHLUNG:
Audits mit unbegrenztem Umfang — auf relevante Unterlagen, angemessene Mitteilung beschränken
Preiserhöhungsobergrenze nicht spezifiziert — Obergrenze für CPI oder [X]% jährlich hinzufügen
Zahlungsbedingungen Netto 30 — Standard

GEISTIGE EIGENSCHAFT:
Breite Klausel für Arbeit unter Vertrag, die alle IP beansprucht — auf spezifische Lieferbarkeiten beschränken
Während Support oder Implementierung erstellte IP von Kunde beansprucht — ausschließen
Lizenzumfang ist « weltweit, perpetuell, unwiderruflich » — Standard für SaaS

KÜNDIGUNG:
Keine Kündigung aus Bequemlichkeitsgründen — muss 30-90 Tage Kündigungsfrist haben
Kündigungsauslöser sind zu breit (« jede Verletzung ») — sollte Nachbesserungsfrist erfordern
Auswirkung der Kündigung: Kundendaten-Löschzeitplan nicht spezifiziert — 30-Tage-Kulanzfrist hinzufügen

DATEN:
Kein DPA angefügt (wenn personenbezogene Daten verarbeitet werden) — DPA erforderlich
Dateneigentum mehrdeutig — wir eignen uns Kundendaten an ; Kunde eignet sich seinen Inhalt an
Audits für Datensicherheit — auf Audits von Drittanbietern beschränken (SOC 2) ; kein direkter Zugriff

Produzieren Sie: Redline-Empfehlungen für jedes Element ROT/GELB.
RECHTSÜBERPRÜFUNG ERFORDERLICH vor Unterzeichnung einer Vereinbarung.
```

### Abschlussökonomie-Analyse

```
Analysieren Sie die Ökonomie von [Abschluss].

ACV: $[X]
Laufzeit: [X Monate]
TCV (Gesamtvertagswert): $[X]
Bruttogewinn zu diesem Preis: [X]%
CAC investiert: $[X] (Vertriebsgehalt + Provision + SE-Zeit + Rechtszeit)
Implementierungskosten (falls vorhanden): $[X]

Abschlussökonomie:

CAC-Rückzahlungszeitraum:
= CAC / (ACV × Bruttogewinn %)
= $[X] / ($[X] × [X]%)
= [X] Monate

Bei Bruttogewinn [X]% zahlt sich dieser Abschluss seine Akquisitionskosten in [X] Monaten zurück.
Maßstab: < 12 Monate = ausgezeichnet ; 12-18 Monate = akzeptabel ; > 24 Monate = marginal

LTV-Berechnung (ausgehend von [X]% jährlichem Churn):
Durchschnittliche Kundenlaufzeit = 1 / Churn-Rate = [X] Jahre
LTV = ACV × Bruttogewinn % × Lebensdauer
= $[X] × [X]% × [X] Jahre = $[X]

LTV:CAC-Verhältnis = $[X] / $[X] = [X]x
Maßstab: > 3x = gesund ; > 5x = ausgezeichnet ; < 2x = Anliegen

Umsatzrealisierung:
- Jährlich im Voraus: vollständige TCV über die Laufzeit (ASC 606 ratable)
- Monatlich: monatlich wie geliefert

Mehrjährige Auswirkungen:
- Kunden bei [rabattiertem] Satz für 3 Jahre sperren: Umsatzvorhersagbarkeit
- Risiko: Preismacht verloren ; wenn die Listpreis um 20% steigt, bleibt dieser Kunde am alten Satz

Entscheidung: [genehmigen / mit Bedingungen genehmigen / eskalieren]
Bedingungen: [falls vorhanden — z.B. « genehmigen zu diesem Preis, wenn die Laufzeit 24 Monate im Voraus ist »]
MENSCHLICHE UNTERZEICHNUNG ERFORDERLICH vor Abschlussabschluss.
```

## Beispiel

**Benutzer:** Ein Fortune 500-Kunde möchte unseren $85K/Jahr Enterprise-Plan für $55K/Jahr (35% Rabatt auf Liste), 3-Jahres-Abschluss, mit Datenexportrecht bei Kündigung, netto 90 Zahlungsbedingungen und MFN-Klausel. Abschluss oder kein Abschluss?

**Claude's Analyse:**

**Rabatt (35% Rabatt auf Liste):** Erfordert CRO-Genehmigung gemäß Standardrichtlinie. Begründung erforderlich: strategisches Logo, Wettbewerbsdruck oder Volumenzusage. Bei $55K × 3 = $165K TCV — lohnt sich die Eskalation, wenn der Kunde eine echte Referenz ist.

**Begriff für Begriff:**

- Netto 90 Zahlungsbedingungen → Zurückfahren. Netto 30 ist Standard. Netto 60 Maximum für Unternehmen. Netto 90 = 3-monatige Auswirkung auf das Betriebskapital bei dieser Abschlusssgröße. Gegenleistung: Angebot von 2% Früdzahlungsrabatt bei netto 10, oder halten Sie bei netto 30 ohne Rabatt.

- Datenexportrecht bei Kündigung → Standard und angemessen. Bestätigen Sie, dass Ihr Ingenieurteam einen maschinenlesbaren Export innerhalb von 30 Tagen bereitstellen kann — dies ist üblich und verpflichtet sich.

- MFN-Klausel → Ablehnen oder streng eingrenzen. Eine unbegrenzte MFN (« wir bekommen Ihren besten Preis für jeden Kunden ») bedeutet, wenn Sie einen ähnlichen Abschluss jemals zu einem niedrigeren Preis verkaufen, erhält dieser Kunde automatisch diesen niedrigeren Preis. Gegenleistung: « MFN gilt nur für Abschlüsse mit gleichem oder höherem ACV, gleiche Laufzeit, innerhalb von 12 Monaten unterzeichnet. »

**Gesamtempfehlung:**
Genehmigen mit zwei Bedingungen: (1) Zahlungsbedingungen zu netto 30 oder 60 verhandelt (nicht 90), und (2) MFN auf vergleichbare Abschlüsse begrenzt. CRO-Unterzeichnung erforderlich, bevor endgültige Bedingungen gesendet werden.

MENSCHLICHE GENEHMIGUNG ERFORDERLICH. Senden Sie überarbeitete Bedingungen nicht ohne CRO-Unterschrift auf der Abschluss-Zusammenfassung.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
