---
name: deal-desk
description: "Deal desk: structure enterprise deals, review contract terms, set discount approval thresholds, analyse deal economics, and create commercial policy — for B2B sales operations"
---

# Compétence Deal Desk

## Quand l'utiliser
- Structurer un accord d'entreprise complexe (multi-année, conditions personnalisées, packages)
- Examiner un contrat proposé par un client pour les signaux d'alerte commerciaux
- Définir les seuils d'approbation des réductions et les politiques d'escalade
- Analyser les économies des accords (marge, amortissement, LTV) avant approbation
- Créer ou mettre à jour la politique commerciale (garde-fous de tarification, règles de regroupement)

## Quand ne pas l'utiliser
- Examen juridique du contrat pour le risque de conformité — utiliser la compétence vendor-contract-review ou diligence-review
- Stratégie de tarification et conception des tiers — utiliser la compétence pricing-strategy
- Prévision des revenus — utiliser la compétence revenue-operations
- Succès client et stratégies de renouvellement — utiliser la compétence customer-success

## Instructions

### Structuration des accords

```
Structurer un accord pour [client].

Client : [nom, taille de l'entreprise, secteur]
Type d'accord : [nouveau logo / expansion / renouvellement / multi-année]
ARR demandé : $[X]
Produits / tiers demandés : [lister]
Durée du contrat : [12 / 24 / 36 mois]
Date de début demandée : [date]
Exigences spéciales : [SLA personnalisé / support dédié / intégration personnalisée / résidence des données]

Examen de la structure de l'accord :

1. INTÉGRITÉ DES PRIX :
   Quel est le prix catalogue pour cette configuration ?
   Le client demande : $[X] ([X]% de réduction du catalogue)
   Est-ce dans les limites d'autorité de réduction standard ? [rep / manager / VP / niveau CRO]
   Quel est le justificatif ? [volume / stratégique / compétitif / rétention de renouvellement]

2. ÉCONOMIES DE L'ACCORD :
   ACV : $[X]
   CAC estimé pour cet accord : $[X] (salaire des ventes + commission + temps SE + temps juridique)
   Marge brute à ce prix : [X]%
   Remboursement CAC à ce prix : [X] mois
   Cet accord est-il économiquement viable ? [oui / limite / non — escalader]

3. STRUCTURE DES CONDITIONS :
   Conditions de paiement : [net 30 / annuel d'avance / trimestriel]
   Blocage multi-année : [année 2 et 3 tarification engagée au catalogue / CPI + X%]
   Renouvellement automatique du renouvellement : [oui / avis de 90 jours]
   Clause de résiliation anticipée : [oui — risque / non — standard]

4. TERMES NON STANDARD À SIGNALER :
   Responsabilité illimitée — rejeter ou escalader à la juridiction
   Indemnisation sans limite de portée — escalader
   Les pénalités SLA comme seul recours — accepter si les pénalités sont plafonnées
   Clause de tarification la plus favorisée — signaler ; peut limiter la tarification future
   Exigences de portabilité des données à la résiliation — signaler ; confirmer que l'ingénierie peut respecter
   Restrictions des sous-traitants — signaler ; confirmer que la liste actuelle des sous-traitants est acceptable

5. APPROBATION DE L'ACCORD :
   Approbateur à ce niveau de réduction : [nom/rôle]
   Documents requis avant approbation : [SOW / questionnaire de sécurité / examen juridique]
   Date de clôture attendue : [date]

Résultat : recommandation d'approbation d'accord avec conditions spécifiques.
APPROBATION HUMAINE REQUISE pour toutes les réductions > autorité standard rep.
```

### Politique d'approbation des réductions

```
Concevoir une politique d'approbation des réductions pour [entreprise].

Taille de l'équipe de vente : [X reps]
Tailles des accords : [$X ACV typique, $X ACV max]
Problème de réduction actuel : [trop / incohérent / pas de politique / compression des marges]

Matrice d'autorité de réduction standard :

| Niveau de réduction | Approuvé par | ACV Max | Conditions |
|---|---|---|---|
| 0-10% de réduction du catalogue | AE (aucune approbation requise) | N'importe lequel | Termes standards uniquement |
| 11-20% de réduction du catalogue | Responsable des ventes | N'importe lequel | Justification écrite requise |
| 21-30% de réduction du catalogue | VP Ventes | N'importe lequel | Réunion d'examen d'accord requise |
| 31-40% de réduction du catalogue | CRO | > $100K ACV seulement | Sensibilisation du PDG + examen des économies d'accord |
| > 40% de réduction du catalogue | PDG + Conseil | Accords stratégiques uniquement | Examen complet du deal desk |

Catégories de justification de la réduction :
- Volume : > X sièges / > volume d'utilisation X
- Stratégique : client de référence / étude de cas / valeur de partenariat
- Compétitif : déplacement compétitif documenté
- Rétention : renouvellement à risque, évaluation concurrent en cours
- Vitesse : signer avant [date] pour la clôture du trimestre actuel

Garde-fous de réduction (non négociables) :
- Pas de réduction en dessous du seuil de marge brute minimum ([X]% — défini par la finance)
- Accords multi-années : tarification année 2+ doit être au catalogue ou ajustée par CPI — jamais verrouillée au taux réduit
- Pas de réductions rétroactives sur les accords déjà clôturés
- La réduction s'applique à l'ARR uniquement — les services professionnels au catalogue toujours

Générer la politique d'approbation pour ma structure d'entreprise et d'équipe de vente.
APPROBATION HUMAINE REQUISE pour chaque accord au-dessus du niveau d'autorité rep.
```

### Examen des conditions du contrat

```
Examiner ces conditions de contrat pour les risques commerciaux.

Type de contrat : [MSA / Bon de commande / Accord d'abonnement SaaS]
Notre rôle : [vendeur / client]
Valeur du contrat : $[X] / [terme]

Signaux d'alerte commerciaux à vérifier (signaler comme ROUGE/JAUNE/VERT) :

RESPONSABILITÉ :
Responsabilité illimitée — doit négocier un plafond (standard : 12 mois de frais)
Plafond de responsabilité < 3 mois de frais — trop bas ; négocier à un minimum de 12 mois
Pas d'exclusion pour la négligence grave ou la faute intentionnelle — vérifier que le plafond s'applique

TARIFICATION ET PAIEMENT :
Droit d'audit avec portée illimitée — limiter aux dossiers pertinents, avis raisonnable
Plafond d'augmentation de prix non spécifié — ajouter plafond CPI ou [X]% annuel
Conditions de paiement Net 30 — standard

PROPRIÉTÉ INTELLECTUELLE :
Clause de travail fait sur mesure revendiquant toute la PI — limiter aux livrables spécifiques
PI créée lors du support ou de la mise en œuvre revendiquée par le client — exclure
Portée de la licence « mondiale, perpétuelle, irrévocable » — standard pour SaaS

RÉSILIATION :
Pas de résiliation pour convenance — doit avoir droit de préavis de 30-90 jours
Les déclencheurs de résiliation sont trop larges (« toute violation ») — devrait nécessiter un délai de cure
Effet de la résiliation : délai de suppression des données client non spécifié — ajouter délai de grâce de 30 jours

DONNÉES :
Pas de DPA attaché (si traitement de données personnelles) — exiger DPA
La propriété des données est ambiguë — nous posséder les données des clients ; le client possède son contenu
Droits d'audit de la sécurité des données — limiter aux rapports d'audit tiers (SOC 2) ; pas d'accès direct

Produire : recommandations de redline pour chaque élément ROUGE/JAUNE.
EXAMEN JURIDIQUE REQUIS avant de signer un accord.
```

### Analyse des économies de l'accord

```
Analyser les économies de [accord].

ACV : $[X]
Terme : [X mois]
TCV (valeur de contrat totale) : $[X]
Marge brute à ce prix : [X]%
CAC investi : $[X] (salaire des ventes + commission + temps SE + temps juridique)
Coût de mise en œuvre (le cas échéant) : $[X]

Économies de l'accord :

Période de remboursement du CAC :
= CAC / (ACV × marge brute %)
= $[X] / ($[X] × [X]%)
= [X] mois

À marge brute [X]%, cet accord rembourse son coût d'acquisition en [X] mois.
Référence : < 12 mois = excellent ; 12-18 mois = acceptable ; > 24 mois = marginal

Calcul LTV (en supposant [X]% de churn annuel) :
Durée de vie moyenne du client = 1 / taux de churn = [X] ans
LTV = ACV × marge brute % × durée de vie
= $[X] × [X]% × [X] ans = $[X]

Ratio LTV:CAC = $[X] / $[X] = [X]x
Référence : > 3x = sain ; > 5x = excellent ; < 2x = préoccupation

Reconnaissance des revenus :
- Annuel d'avance : TCV complet reconnu sur le terme (ASC 606 ratable)
- Mensuel : reconnu mensuellement à la livraison

Implications multi-années :
- Verrouiller le client à taux [réduit] pendant 3 ans : prévisibilité des revenus
- Risque : pouvoir de tarification perdu ; si le prix catalogue augmente de 20%, ce client reste à l'ancien taux

Décision : [approuver / approuver avec conditions / escalader]
Conditions : [le cas échéant — par ex. « approuver à ce prix si le terme est 24 mois d'avance »]
APPROBATION HUMAINE REQUISE avant la clôture de l'accord.
```

## Exemple

**Utilisateur :** Un client Fortune 500 souhaite notre plan d'entreprise de 85 K$/an pour 55 K$/an (35% de réduction du catalogue), accord de 3 ans, avec un droit d'export de données à la résiliation, conditions net 90, et une clause NPF. Accord ou pas accord ?

**Analyse de Claude :**

**Réduction (35% de réduction du catalogue) :** Nécessite une approbation de niveau CRO selon la politique standard. Justification requise : logo stratégique, pression compétitive ou engagement de volume. À $55K × 3 = $165K TCV — vaut l'escalade si le client est une véritable référence.

**Terme par terme :**

- Conditions net 90 → Réaction. Net 30 est standard. Net 60 maximum pour l'entreprise. Net 90 = impact sur le fonds de roulement de 3 mois à cette taille d'accord. Contre : offrir 2% de réduction pour paiement anticipé à net 10, ou maintenir à net 30 sans réduction.

- Droit d'export de données à la résiliation → Standard et raisonnable. Confirmer que votre équipe d'ingénierie peut fournir une exportation lisible par machine dans les 30 jours — c'est courant et mérite un engagement.

- Clause NPF → Rejeter ou limiter strictement la portée. Une NPF illimitée (« nous obtenons votre meilleur prix pour tout client ») signifie que si vous vendez jamais un accord similaire à un prix inférieur, ce client obtient automatiquement ce prix inférieur. Contre : « NPF s'applique uniquement aux accords avec ACV égal ou supérieur, même terme, signés dans les 12 mois. »

**Recommandation globale :**
Approuver avec deux conditions : (1) les conditions de paiement négociées à net 30 ou 60 (pas 90), et (2) NPF limité aux accords comparables uniquement. Signature CRO requise avant d'envoyer les conditions finales.

APPROBATION HUMAINE REQUISE. N'envoyez pas les conditions révisées sans signature du CRO sur le résumé de l'accord.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
