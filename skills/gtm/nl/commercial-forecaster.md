---
name: commercial-forecaster
description: "Commercial forecasting: build quarterly bookings forecasts with commit/best-case/pipe-only tiers, cohort ARR projections, per-stage funnel confidence scoring, and NRR/GRR analysis for board reporting"
---

# Commercial Forecaster Skill

## Wanneer activeren
- De driemaandelijks bookings-forecast bouwen voor een board-vergadering of QBR
- CFO vraagt naar "commit, best-case en pipe-only"-nummers
- ARR voor de volgende 4-8 kwartalen projecteren met behulp van cohort-retentiegegevens
- Vermoeden dat een geconsolideerde NRR een lekkende recente cohort verbergt
- Pipelinedekking krimpt en u moet weten welke trappenfuncsie-stadia nog betrouwbaar zijn

## Wanneer NIET gebruiken
- Historische financiële rapportage — gebruik de financial-plan of earnings-analysis skills
- Strategische meerjarenplanning — gebruik de cfo-advisor of pitch-deck skill
- Prijzen instellen — gebruik de pricing-strategy skill
- Goedkeuring per deal-korting — gebruik de deal-desk skill

## Instructies

### 3-laagse bookings-forecast

```
Build a quarterly bookings forecast.

Period: [Q3 2026]
Pipeline data:
  - Opportunity list with: stage, amount, close-date, days-in-stage, last-activity-date
  - Historical stage-to-stage conversion rates (last 4 quarters + last 12 quarters)
Team velocity: [average days per stage in current pipeline]

3-TIER FORECAST:

TIER 1 — COMMIT ($X):
Definition: deals the rep will stake their credibility on
Method: apply 90% probability weight to Commit-stage deals
Include: deals where activity < 7 days ago, close date < 30 days
Exclude: deals stalled > 2x average time in stage

TIER 2 — BEST CASE ($X):
Definition: Commit + realistic upside if the top 3 deals close
Method: Commit + 60% probability weight on "Best Case" stage deals
Include: deals with recent activity, qualified buying committee, clear next steps

TIER 3 — PIPE ONLY ($X):
Definition: everything in the pipeline at face value
Method: sum all open opportunities × historical win rate for their stage
Note: This is almost always wrong — use it as a ceiling, not a target

ASSUMPTION BLOCK (non-negotiable — present this to the board):
| Assumption | Value | Source |
|---|---|---|
| Win rate applied to Commit | 90% | Ops judgment |
| Win rate applied to Best Case | 60% | Last 4Q average |
| Average days to close from Proposal | X days | Last 12Q average |
| Stale deal threshold | 14 days no activity | Policy |
| Excluded: deals open > 2x avg cycle | $X | Risk filter |

RISK SIGNALS:
- Commit/Pipe coverage ratio: [X]% (healthy: > 35%)
- Stale deals as % of pipeline: [X]% (above 25% = forecast unreliable)
- Average days over expected close: [X] (above 30 days = slippage)

Generate the 3-tier forecast from my pipeline data.
HUMAN DECISION REQUIRED: The CRO presents the number with these assumptions visible.
```

### Cohort ARR-projectie

```
Project ARR by cohort over [X quarters].

Cohort data: [list cohorts with starting ARR and per-quarter retention]
Projection horizon: [Q4 2026 through Q4 2027]
New ARR assumption: [from 3-tier forecast above]

Cohort analysis approach:

For each cohort (by quarter of first purchase):
  Starting ARR: $[X]
  Q1 retention: [X]% GRR
  Q2 retention: [X]% GRR
  ...
  Expansion: [average NRR - GRR = expansion rate]

Projected ARR at each quarter:
  ARR(t) = Σ[cohort(i) × GRR(i,t) × expansion(i,t)] + new_ARR(t)

LEAKY COHORT DETECTION:
A cohort is "leaking" when its GRR is below the company average GRR by > 5pp.
Leaky cohorts hide inside a "healthy" consolidated NRR because expansion from
other cohorts masks the retention problem.

Flag: any cohort with GRR < [company average - 5pp]
Implication: if leaky cohorts are recent, the problem is getting worse, not better.

Output: per-cohort ARR projection table + flagged leaky cohorts + impact on consolidated NRR.
```

### Funnel-stadium betrouwbaarheidsscoring

```
Score each funnel stage for forecast reliability.

Historical data: stage-to-close conversion by stage, last 4Q and last 12Q
Current pipeline by stage: [amounts and deal counts]

CONFIDENCE SCORING by stage:

High confidence (weight at face value):
- Coefficient of variation (CV) < 20% over 8+ quarters
- Stage conversion is predictable → deal count × avg conversion = reliable estimate

Medium confidence (apply 20% discount):
- CV 20-40% or < 6 quarters of data
- Stage conversion varies with rep performance or deal size

Low confidence (apply 40% discount or exclude):
- CV > 40%
- Stage depends heavily on a single large deal
- Stage was recently redefined or has < 4 quarters of history

FUNNEL MATH (transparent version for board):
| Stage | Open Deals | Total $ | Conversion Rate | Confidence | Weighted $ |
|---|---|---|---|---|---|
| Proposal Sent | 12 | $1.2M | 45% | High | $540K |
| Demo Completed | 28 | $2.8M | 22% | Medium | $493K |
| Qualified | 67 | $6.7M | 8% | Low | $322K |
| **Total** | | $10.7M | | | **$1.35M** |

Note: The "Total" weighted pipeline is your pipe-only forecast with honesty applied.

Generate the funnel confidence model from my historical conversion data.
```

### NRR-decompositie

```
Decompose NRR to identify what's actually driving the number.

NRR data: [consolidated NRR + GRR by quarter, ideally by cohort]

NRR = GRR + Expansion Rate
Where: GRR = 1 - (churn rate + downgrade rate)
       Expansion = upsell + cross-sell rate from existing customers

DIAGNOSIS:

NRR > 110%: expansion is masking moderate churn. Ask: is churn trending up?
NRR 100-110%: healthy but watch expansion sustainability
NRR < 100%: churn + downgrades exceed expansion. Revenue-destroying base.

Per-cohort NRR vs. consolidated NRR:
If recent cohorts (< 12 months old) have lower NRR than cohorts aged 12-24 months,
the product or ICP has regressed. The consolidated NRR will worsen over time as
recent cohorts age and their full churn manifests.

Key question: "Is our NRR improving or worsening when you look at same-age cohorts?"

Cohort age-normalised NRR: what's the NRR at 6 months, 12 months, 24 months?
If this is declining across cohort vintages → retention is getting worse.

Output: NRR decomposition + cohort age-normalised comparison + verdict.
```

## Voorbeeld

**Gebruiker:** CRO geeft presentatie aan de board. ARR is $12M. NRR ziet er uit als 108%. Pipeline is $4.2M voor Q3. Welke nummers heb ik nodig en hoe presenteer ik ze?

**Claude's forecast-voorbereiding:**

Presenteer niet één getal. Presenteer drie met zichtbare aannames — boards vertrouwen dit meer dan een enkel getal ondersteund door niets.

**De drie nummers die u nodig hebt:**

Commit: $800K — deals in uw commit-stadium met < 7 dagen sinds laatste activiteit
Best case: $1.1M — commit + uw top 5 upside-deals op 60% waarschijnlijkheid
Pipe only: $1.6M — volledige pipeline × historische win-rates per stadium

**De NRR-vraag waarvoor u voorbereiding moet treffen:**

108% geconsolideerde NRR klinkt gezond. Maar: trek uw laatste 3 cohort-varianten (klanten die 0-6 maanden geleden binnenkwamen, 7-12 maanden geleden, 13-18 maanden geleden). Als de nieuwste cohort's 6-maands NRR lager is dan de 7-12 maands cohort's 6-maands NRR — uw NRR staat op het punt naar beneden te gaan, zelfs als het geconsolideerde getal vandaag goed uitziet.

**Board deck slide structuur:**
1. Commit: $800K (90% vertrouwen) — hier is waar we inzetten
2. Best case: $1.1M (als top 5 deals sluiten) — hier is wat goed gaat
3. Pipe only: $1.6M (volledige pipeline) — hier is het plafond
4. Aannames: [één tabel met conversiepercentages gebruikt, activiteitsdrempels, uitsluitingen]
5. NRR: 108% geconsolideerd; [opmerking als cohortanalyse achteruitgang toont]

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
