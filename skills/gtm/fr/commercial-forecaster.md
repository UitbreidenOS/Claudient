---
name: commercial-forecaster
description: "Prévision commerciale : construire les prévisions de réservations trimestrielles avec les niveaux commit/meilleur cas/pipeline seul, les projections d'ARR de cohorte, l'évaluation de la confiance du pipeline par étape et l'analyse NRR/GRR pour les rapports du conseil"
---

# Commercial Forecaster Skill

## Quand activer
- Construire la prévision de réservations trimestrielles pour une réunion du conseil ou QBR
- Le CFO demande les chiffres « commit, meilleur cas et pipeline seul »
- Projeter l'ARR pour les 4-8 trimestres suivants en utilisant les données de rétention de cohorte
- Soupçonner qu'un NRR consolidé cache une cohorte récente qui fuit
- La couverture du pipeline diminue et vous devez savoir quels étages du pipeline sont toujours fiables

## Quand ne PAS utiliser
- Rapports financiers historiques — utiliser les compétences financial-plan ou earnings-analysis
- Planification stratégique multi-années — utiliser les compétences cfo-advisor ou pitch-deck
- Fixation des prix — utiliser la compétence pricing-strategy
- Approbations de remise par transaction — utiliser la compétence deal-desk

## Instructions

### Prévision de réservations à 3 niveaux

```
Construire une prévision de réservations trimestrielles.

Period: [Q3 2026]
Pipeline data:
  - Opportunity list with: stage, amount, close-date, days-in-stage, last-activity-date
  - Historical stage-to-stage conversion rates (last 4 quarters + last 12 quarters)
Team velocity: [nombre moyen de jours par étape dans le pipeline actuel]

PRÉVISION À 3 NIVEAUX:

TIER 1 — COMMIT ($X):
Definition: deals the rep will stake their credibility on
Method: appliquer un poids de probabilité de 90% aux transactions au stade Commit
Include: transactions où l'activité < 7 jours, date de fermeture < 30 jours
Exclude: transactions figées > 2x temps moyen au stade

TIER 2 — BEST CASE ($X):
Definition: Commit + realistic upside si les 3 meilleures transactions se ferment
Method: Commit + poids de probabilité de 60% sur les transactions « Best Case »
Include: transactions avec activité récente, comité acheteur qualifié, étapes suivantes claires

TIER 3 — PIPE ONLY ($X):
Definition: tout dans le pipeline à sa valeur nominale
Method: somme de toutes les opportunités ouvertes × taux de victoire historique pour leur étape
Note: Ceci est presque toujours faux — l'utiliser comme plafond, pas comme cible

BLOC D'ASSUMPTIONS (non négociable — le présenter au conseil):
| Assumption | Value | Source |
|---|---|---|
| Win rate applied to Commit | 90% | Ops judgment |
| Win rate applied to Best Case | 60% | Last 4Q average |
| Average days to close from Proposal | X days | Last 12Q average |
| Stale deal threshold | 14 days no activity | Policy |
| Excluded: deals open > 2x avg cycle | $X | Risk filter |

SIGNAUX DE RISQUE:
- Ratio de couverture Commit/Pipe : [X]% (sain: > 35%)
- Transactions figées en % du pipeline : [X]% (au-dessus de 25% = prévision peu fiable)
- Nombre moyen de jours au-dessus de la fermeture attendue : [X] (au-dessus de 30 jours = glissement)

Générer la prévision à 3 niveaux à partir de mes données de pipeline.
DÉCISION HUMAINE REQUISE: Le CRO présente le chiffre avec ces hypothèses visibles.
```

### Projection d'ARR par cohorte

```
Projeter l'ARR par cohorte sur [X trimestres].

Cohort data: [lister les cohortes avec ARR initial et rétention par trimestre]
Projection horizon: [Q4 2026 à Q4 2027]
New ARR assumption: [à partir de la prévision à 3 niveaux ci-dessus]

Approche d'analyse de cohorte:

Pour chaque cohorte (par trimestre du premier achat):
  Starting ARR: $[X]
  Q1 retention: [X]% GRR
  Q2 retention: [X]% GRR
  ...
  Expansion: [NRR moyen - GRR = taux d'expansion]

ARR projeté à chaque trimestre:
  ARR(t) = Σ[cohort(i) × GRR(i,t) × expansion(i,t)] + new_ARR(t)

DÉTECTION DE COHORTE QUI FUIT:
Une cohorte « fuit » quand son GRR est inférieur au GRR moyen de l'entreprise de > 5pp.
Les cohortes qui fuient se cachent dans un NRR consolid« sain » parce que l'expansion des
autres cohortes masque le problème de rétention.

Flag: toute cohorte avec GRR < [moyenne de l'entreprise - 5pp]
Implication: si les cohortes récentes qui fuient, le problème s'aggrave, ne s'améliore pas.

Output: tableau de projection d'ARR par cohorte + cohortes signalées qui fuient + impact sur NRR consolid.
```

### Évaluation de la confiance par étage du pipeline

```
Évaluer chaque étape du pipeline pour la fiabilité de la prévision.

Historical data: conversion étape-à-fermeture par étape, 4 derniers trimestres et 12 derniers trimestres
Current pipeline by stage: [montants et dénombrements de transactions]

ÉVALUATION DE LA CONFIANCE par étape:

High confidence (poids à la valeur nominale):
- Coefficient de variation (CV) < 20% sur 8+ trimestres
- La conversion de l'étape est prévisible → dénombrement de transactions × conversion moyenne = estimation fiable

Medium confidence (appliquer une remise de 20%):
- CV 20-40% ou < 6 trimestres de données
- La conversion de l'étape varie avec la performance du rep ou la taille de la transaction

Low confidence (appliquer une remise de 40% ou exclure):
- CV > 40%
- L'étape dépend fortement d'une seule grande transaction
- L'étape a été récemment redéfinie ou a < 4 trimestres d'histoire

MATHÉMATIQUES DU PIPELINE (version transparente pour le conseil):
| Stage | Open Deals | Total $ | Conversion Rate | Confidence | Weighted $ |
|---|---|---|---|---|---|
| Proposal Sent | 12 | $1.2M | 45% | High | $540K |
| Demo Completed | 28 | $2.8M | 22% | Medium | $493K |
| Qualified | 67 | $6.7M | 8% | Low | $322K |
| **Total** | | $10.7M | | | **$1.35M** |

Note: Le pipeline « Total » pondéré est votre prévision pipeline seul avec honnêteté appliquée.

Générer le modèle de confiance du pipeline à partir de mes données historiques de conversion.
```

### Décomposition NRR

```
Décomposer le NRR pour identifier ce qui pilote réellement le chiffre.

NRR data: [NRR consolidé + GRR par trimestre, idéalement par cohorte]

NRR = GRR + Expansion Rate
Where: GRR = 1 - (churn rate + downgrade rate)
       Expansion = upsell + cross-sell rate from existing customers

DIAGNOSTIC:

NRR > 110%: l'expansion masque l'attrition modérée. Ask: is churn trending up?
NRR 100-110%: sain mais surveiller la durabilité de l'expansion
NRR < 100%: l'attrition + les réductions dépassent l'expansion. Base générant une perte de revenus.

NRR par cohorte vs. NRR consolidé:
Si les cohortes récentes (< 12 mois) ont un NRR inférieur aux cohortes âgées de 12-24 mois,
le produit ou l'ICP s'est dégradé. Le NRR consolidé se détériorera au fil du temps à mesure que
les cohortes récentes vieilliront et que leur attrition complète se manifestera.

Question clé: « Notre NRR s'améliore-t-il ou s'aggrave-t-il quand vous regardez les cohortes du même âge? »

NRR normalisé par l'âge de la cohorte: quel est le NRR à 6 mois, 12 mois, 24 mois?
Si cela diminue dans les millésimes de cohorte → la rétention s'aggrave.

Output: décomposition NRR + comparaison normalisée par l'âge de la cohorte + verdict.
```

## Exemple

**User:** Le CRO se présente au conseil. L'ARR est de $12M. Le NRR semble être 108%. Le pipeline est de $4.2M pour Q3. Quels chiffres ai-je besoin et comment les présenter?

**Claude's forecast prep:**

N'énoncez pas un seul chiffre. Présentez trois avec les hypothèses visibles — les conseils font plus confiance à cela qu'à un seul chiffre soutenu par rien.

**Les trois chiffres dont vous avez besoin:**

Commit: $800K — transactions à votre étape de commit avec < 7 jours depuis la dernière activité
Best case: $1.1M — commit + vos 5 meilleures transactions d'avantage à 60% de probabilité
Pipe only: $1.6M — pipeline complet × taux de victoire historiques par étape

**La question NRR à préparer:**

108% de NRR consolidé semble sain. Mais : tirez vos 3 derniers millésimes de cohorte (clients qui ont rejoint il y a 0-6 mois, 7-12 mois, 13-18 mois). Si la NRR à 6 mois de la cohorte la plus récente est inférieure à celle de la cohorte de 7-12 mois — votre NRR est sur le point de baisser même si le chiffre consolidé semble bien aujourd'hui.

**Structure de la diapositive du pont:**
1. Commit: $800K (90% de confiance) — voici sur quoi nous parions
2. Best case: $1.1M (si les 5 principales transactions se ferment) — voici ce qui se passe bien
3. Pipe only: $1.6M (pipeline complet) — voici le plafond
4. Assumptions: [un tableau montrant les taux de conversion utilisés, les seuils d'activité, les exclusions]
5. NRR: 108% consolidé; [noter si l'analyse de cohorte montre une détérioration]

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
