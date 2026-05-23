---
name: channel-economics
description: "Économies de canaux : calculer le coût entièrement chargé de service par canal, le ROI du canal (cash, LTV-ajusté, marginal), le mélange de canal direct vs. partenaire optimal et l'analyse des rendements décroissants"
---

# Channel Economics Skill

## Quand activer
- Examen trimestriel du canal : vous avez un mélange de pipeline direct et dirigé par des partenaires mais vous ne savez pas quel canal est réellement rentable après chargement de tous les coûts
- Évaluer si vous devez embaucher un gestionnaire de canal (l'économie du canal justifie-t-elle l'effectif?)
- Le conseil vous posant des questions sur le ROI du programme partenaire (« nous avons dépensé $X en MDF — qu'avons-nous obtenu? »)
- Planifier une nouvelle région et décider direct-first vs. partner-first
- Due diligence de fusion-acquisition sur une cible prétendant à un canal partenaire à marge élevée

## Quand ne PAS utiliser
- Conception des niveaux de partenaires, GTM conjoint, structure de partage des revenus — utiliser la compétence partnerships
- Routage SDR-to-AE et processus de pipeline — utiliser la compétence revenue-operations
- Décisions stratégiques du CRO (plans de rémunération, embauche du VP Sales) — utiliser la compétence cro-advisor
- Approbation de remise par transaction — utiliser la compétence deal-desk

## Instructions

### Analyse du coût de service

```
Calculer le coût entièrement chargé de service pour [canal].

Channel: [direct / reseller / referral partner / SI / marketplace]
Data period: [12 derniers mois]
Deal metrics: [nombre de transactions, ARR total, ACV moyen, jours du cycle de vente]
Retention: [NRR%, GRR%]

Catégories de coûts à charger (la plupart des équipes en manquent 3-4):

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

Output: coût-à-servir par transaction ET par dollar d'ARR, pour chaque canal.
```

### ROI du canal selon trois perspectives

```
Calculer le ROI du canal en utilisant trois perspectives.

Channel data: [coller les résultats de coût de service + données de rétention]

LENS 1 — CASH ROI (Année 1):
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
"Qu'est-ce que les 100K$ suivants investis dans ce canal rapportent?"
Ceci tient compte des rendements décroissants — les premiers accords de partenaire sont à ROI élevé,
les suivants exigent plus d'activation, MDF plus élevé, taux de fermeture plus faibles.

Inflexion des rendements décroissants : le point où le ROI marginal tombe en dessous de 1x
(ajouter plus d'investissement détruit de la valeur à la marge)

Verdict par canal:
DOUBLE-DOWN: LTV/CAC > 5x AND marginal ROI still positive → scale aggressively
MAINTAIN: LTV/CAC 3-5x, marginal ROI positive → sustain current investment
DEFUND: LTV/CAC 1.5-3x, marginal ROI near 1x → hold flat, don't grow
EXIT: LTV/CAC < 1.5x, cash-negative → wind down (partners aren't profitable)

Produire le verdict ROI pour chaque canal dans mon mélange.
```

### Optimisation du mélange de canaux

```
Recommander le mélange optimal de canaux pour [company].

Current mix: [X% direct, Y% partner-led, Z% marketplace]
Constraints:
  - Minimum direct floor: [X% — can't go below for enterprise relationships]
  - Maximum partner concentration: [X% — don't want over-reliance on any channel]
  - Total sales capacity: [X AEs + X channel managers]
  - Revenue target: $[X] ARR next year

Input: données de ROI du canal depuis l'analyse ci-dessus

Approche d'optimisation:
1. Commencer par le canal le plus élevé LTV/CAC — allouer la capacité ici en premier
2. Respecter le plancher direct minimum (les clients d'entreprise nécessitent souvent un contact direct)
3. Ne pas dépasser le plafond de concentration des partenaires (risque de dépendance du pipeline)
4. Appliquer les rendements décroissants — ne pas sur-allouer au-delà du point d'inflexion
5. Vérifier : le mélange résultant atteint-il l'objectif de revenus avec la capacité disponible?

Output:
- Mélange recommandé : X% direct, Y% partenaire, Z% marketplace
- ARR attendu à ce mélange : $[X]
- Sensibilité : si le taux de fermeture des partenaires baisse de 10%, impact sur ARR : ($[X])
- Plan d'un an : quels investissements sont nécessaires pour atteindre le mélange optimal?

DÉCISION HUMAINE REQUISE: Ceci est une recommandation. Le CRO et le leadership commercial prennent la décision finale sur la stratégie de canal.
```

## Exemple

**User:** Nous avons $8M ARR, 60% direct / 40% partner-led. Direct ACV est $45K, partner ACV est $28K. Direct NRR 118%, partner NRR 97%. Sommes-nous sur-indexés sur le partenaire?

**Claude's analysis:**

Oui — la différentiel de NRR est révélateur. Laissez-moi charger les chiffres :

**Canal direct:**
- ACV: $45K, NRR 118% → LTV = $45K × 0.75GM × (1/0.08 churn) ≈ $422K
- Si CAC est ~$15K (typique pour inside sales à cet ACV): LTV/CAC = **28x** — excellent

**Canal partenaire:**
- ACV: $28K, NRR 97% → cette érosion de revenus annuelle de 3% signifie que vous perdez de l'argent sur les clients existants avant expansion
- GRR est probablement 85-88% (clients qui s'en vont). LTV = $28K × 0.72GM × (1/0.14 churn) ≈ $144K
- Après chargement de la remise partenaire (généralement 20-25% de l'ACV), MDF et gestionnaire de canal : CAC effectif est ~$12K
- LTV/CAC = **12x** — semble OK en cash, mais...

**Le problème:** Le NRR du partenaire de 97% signifie que votre canal partenaire est une fuite nette de revenus sur la base existante. Chaque $1M d'ARR partenaire perd $30K/an du churn/baisse avant d'ajouter une nouvelle affaire. À $3.2M d'ARR partenaire, c'est ~$96K/an qui s'évapore.

**Verdict:**
- Direct: DOUBLE-DOWN — 28x LTV/CAC avec expansion forte. Votre meilleur canal.
- Partner: DEFUND motion actuelle, enquêter pourquoi NRR est si différent du direct.

Avant de réduire le partenaire, diagnostiquer : la différence de NRR est-elle due à (a) mauvais ICP des partenaires, (b) couverture CS moins importante, ou (c) clients partenaires utilisant moins le produit? Corriger la cause première avant de quitter le canal.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
