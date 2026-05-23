---
name: channel-economics
description: "Channel economics: compute fully-loaded cost-to-serve per channel, channel ROI (cash, LTV-adjusted, marginal), optimal direct vs. partner channel mix, and diminishing-returns analysis"
---

# Channel Economics Skill

## Wanneer activeren
- Driemaandelijks kanaalbeoordeling: u hebt een mix van directe en partner-led pipeline, maar weet niet welk kanaal werkelijk winstgevend is na alle kosten
- Evalueren of een kanaalmanager inhuren (rechtvaardigt de kanaaleonomica het personeelsbestand?)
- Board vraagt naar ROI van partnerprogramma ("we gaven $X uit op MDF — wat hebben we gekregen?")
- Een nieuw region plannen en direct-first vs. partner-first bepalen
- M&A due diligence op een doel dat aangeeft dat het partner-kanaal hoog rendement is

## Wanneer NIET gebruiken
- Het ontwerpen van partnertiers, gezamenlijke GTM, revshare-structuur — gebruik de partnerships-skill
- SDR-naar-AE routing en pipelineproces — gebruik de revenue-operations-skill
- Strategische CRO-besluiten (comp-plans, VP Sales inhuren) — gebruik de cro-advisor
- Per-deal kortingsgoedkeuring — gebruik de deal-desk-skill

## Instructies

### Kostenanalyse per kanaal

```
Calculate fully-loaded cost-to-serve for [channel].

Channel: [direct / reseller / referral partner / SI / marketplace]
Data period: [last 12 months]
Deal metrics: [deal count, total ARR, average ACV, sales cycle days]
Retention: [NRR%, GRR%]

Cost categories to load (most teams miss 3-4 of these):

DIRECT COSTS:
- Sales headcount (AE salary + OTE commission / deals closed = cost per deal)
- SDR attribution (cost per qualified opportunity × opportunities needed per close)
- Solutions engineer time (hours per deal × hourly loaded cost)
- Legal / procurement cycle cost (contract review hours × rate)

CHANNEL-SPECIFIC COSTS:
- Partner discount off list price (%) — this is a direct revenue reduction
- Market Development Funds (MDF) paid to partner
- Channel manager headcount (salary / number of partners managed)
- Partner enablement and certification cost (one-time + annual per partner)
- Channel conflict resolution time (estimated hours per quarter)

POST-SALE COSTS:
- Customer success load (is the partner channel higher or lower effort post-sale?)
- Support ticket volume differential (partner-sourced customers often need more support)
- Churn rate differential (partner vs. direct — key driver of LTV difference)

OVERHEAD ALLOCATION:
- Marketing allocation (what % of demand gen budget supports this channel?)
- Operations / RevOps time on channel reporting and management

Output: cost-to-serve per deal AND per dollar of ARR, for each channel.
```

### Kanaal-ROI onder drie óptieken

```
Compute channel ROI using three lenses.

Channel data: [paste cost-to-serve results + retention data]

LENS 1 — CASH ROI (Year 1):
Formula: (Year 1 gross margin from channel) / (Year 1 fully-loaded CAC)
Verdict threshold: < 1.0x = cash-negative in year 1 → question viability
Strong: > 2.5x cash ROI in year 1

LENS 2 — LTV-ADJUSTED ROI:
Formula: (LTV per customer from channel) / (Fully-loaded CAC)
LTV = ACV × Gross Margin % × (1 / Annual Churn Rate)
Note: if partner channel has higher churn, LTV is lower even at same ACV
Verdict threshold: < 3x LTV/CAC = the channel is underperforming
Strong: > 5x LTV/CAC

LENS 3 — MARGINAL ROI:
"What does the next $100K invested in this channel return?"
This accounts for diminishing returns — early partner deals are high-ROI,
later ones require more enablement, higher MDF, lower close rates.

Diminishing returns inflection: the point where marginal ROI drops below 1x
(adding more investment destroys value at the margin)

Per-channel verdict:
DOUBLE-DOWN: LTV/CAC > 5x AND marginal ROI still positive → scale aggressively
MAINTAIN: LTV/CAC 3-5x, marginal ROI positive → sustain current investment
DEFUND: LTV/CAC 1.5-3x, marginal ROI near 1x → hold flat, don't grow
EXIT: LTV/CAC < 1.5x, cash-negative → wind down (partners aren't profitable)

Produce the ROI verdict for each channel in my mix.
```

### Kanaal-mixoptimalisatie

```
Recommend optimal channel mix for [company].

Current mix: [X% direct, Y% partner-led, Z% marketplace]
Constraints:
  - Minimum direct floor: [X% — can't go below for enterprise relationships]
  - Maximum partner concentration: [X% — don't want over-reliance on any channel]
  - Total sales capacity: [X AEs + X channel managers]
  - Revenue target: $[X] ARR next year

Input: channel ROI data from above analysis

Optimisation approach:
1. Start with the highest LTV/CAC channel — allocate capacity here first
2. Respect the minimum direct floor (enterprise customers often require direct touch)
3. Don't exceed partner concentration ceiling (pipeline dependency risk)
4. Apply diminishing returns — don't over-allocate beyond the inflection point
5. Check: does the resulting mix hit the revenue target with the available capacity?

Output:
- Recommended mix: X% direct, Y% partner, Z% marketplace
- Expected ARR at this mix: $[X]
- Sensitivity: if partner close rate drops 10%, ARR impact: ($[X])
- One-year plan: what investments are needed to reach the optimal mix?

HUMAN DECISION REQUIRED: This is a recommendation. The CRO and commercial leadership make the final call on channel strategy.
```

## Voorbeeld

**Gebruiker:** We zijn $8M ARR, 60% direct / 40% partner-led. Direct ACV is $45K, partner ACV is $28K. Direct NRR 118%, partner NRR 97%. Zijn we overgeïndexeerd op partner?

**Claude's analyse:**

Ja — het NRR-verschil is het bewijs. Laat me de nummers laden:

**Direct kanaal:**
- ACV: $45K, NRR 118% → LTV = $45K × 0.75GM × (1/0.08 churn) ≈ $422K
- Als CAC ~$15K is (typisch voor inside sales op deze ACV): LTV/CAC = **28x** — uitstekend

**Partner-kanaal:**
- ACV: $28K, NRR 97% → dat 3% jaarlijks revenue-verlies betekent dat u geld verliest op bestaande klanten voorafgaand aan uitbreiding
- GRR is waarschijnlijk 85-88% (klanten vertrekken). LTV = $28K × 0.72GM × (1/0.14 churn) ≈ $144K
- Na het laden van partnerafkorting (doorgaans 20-25% van ACV), MDF en kanaalmanager: effectieve CAC is ~$12K
- LTV/CAC = **12x** — ziet er OK uit op contant niveau, maar...

**Het probleem:** Partner NRR van 97% betekent dat uw partnerkanaal een netto revenue-afvoer is voor de bestaande basis. Elke $1M partner ARR verliest $30K/jaar van churn/downgrades voordat u nog nieuw zaken toevoegt. Op $3.2M partner ARR, dat is ~$96K/jaar verdwenen.

**Verdict:**
- Direct: DOUBLE-DOWN — 28x LTV/CAC met sterke expansie. Uw beste kanaal.
- Partner: DEFUND huidige beweging, onderzoek waarom NRR anders is dan direct.

Voordat u het partnerkanaal afsluit, diagnose: is het NRR-gat vanwege (a) verkeerd ICP van partners, (b) minder CS-dekking of (c) partnerkanten gebruiken minder van het product? Los de onderliggende oorzaak op voordat u het kanaal verlaat.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
