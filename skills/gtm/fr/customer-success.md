---
name: customer-success
description: "Customer success management: health scoring, churn prediction signals, expansion playbooks, QBR structure, onboarding plans, and customer lifecycle management for SaaS"
---

# Compétence Succès Client

## Quand l'utiliser
- Construire un modèle de score de santé des clients
- Identifier les clients à risque avant qu'ils ne s'en aillent
- Concevoir des stratégies d'expansion et de vente supplémentaire
- Conduire un examen trimestriel des affaires (QBR) avec un client
- Créer un plan d'intégration des clients
- Segmenter la base de clients pour les modèles de couverture CS

## Quand ne pas l'utiliser
- Prospection des ventes — utiliser les compétences sdr-agent ou lead-enrichment
- Analyse produit pour les décisions internes — utiliser la compétence product-analytics
- Campagnes marketing vers les clients existants — utiliser la compétence email-sequence
- Support technique ou tri des bogues — fonction différente

## Instructions

### Score de santé client

```
Construire un modèle de score de santé pour [produit].

Produit : [décrire — SaaS / plateforme / service géré]
Type de client : [PME / intermédiaire / entreprise]
Métrique de succès clé : [ce qui indique qu'un client obtient de la valeur]
Données disponibles : [utilisation du produit / tickets de support / NPS / historique de paiement / engagement]

Cadre de score de santé (composite pondéré) :

SIGNAUX D'UTILISATION (poids 40%) :
- Fréquence de connexion : [quotidienne/hebdomadaire/mensuelle] par rapport à attendu pour le plan
- Adoption de fonctionnalités principales : % des fonctionnalités achetées réellement utilisées
- Utilisateurs puissants : nombre d'utilisateurs avec > X sessions/semaine
- Étendue : % de sièges agréés activement utilisés
- Tendance : l'utilisation augmente, est plate ou diminue MoM ?

SIGNAUX DE RELATION (poids 25%) :
- Score NPS : dernière réponse d'enquête et tendance
- Volume de tickets de support : les tickets croissants = friction ; zéro tickets = risque de désengagement
- Engagement du sponsor exécutif : dernier contact avec le décideur
- Champions : identifiés des défenseurs internes pour votre produit ?

SIGNAUX COMMERCIAUX (poids 20%) :
- Jours de retard sur les factures : >30 jours est un signal d'attrition
- Date de renouvellement : <90 jours au renouvellement = priorité élevée
- Croissance du contrat : en expansion (sain) vs. en contraction (risque d'attrition)
- Niveau de réduction : comptes fortement réduits = coût de changement inférieur

SIGNAUX DE RÉSULTATS (poids 15%) :
- Critères de succès déclarés du client : sont-ils satisfaits ?
- Résultats métier réalisés : ROI documenté ?
- Étude de cas / référence disposée : signal fort de succès

Notation :
Chaque signal noté 1-10 → moyenne pondérée → niveau de santé :

Sain (note 7-10) : surveiller trimestriellement, rechercher des opportunités d'expansion
À risque (score 4-6) : check-ins mensuels, identifier et résoudre les blocages
Critique (score 1-3) : engagement hebdomadaire, escalade exécutive si nécessaire

Construire le modèle de score de santé pour mon produit avec des définitions de métriques spécifiques.
```

### Signaux de prédiction d'attrition

```
Identifier les clients à risque avant qu'ils ne s'en aillent.

Type de produit : [SaaS]
Type de contrat : [mensuel / annuel / multi-année]
Taux d'attrition historique : [X%]
Données disponibles : [décrire ce que vous suivez]

Signaux d'alerte précoce par délai :

90+ JOURS AVANT L'ATTRITION (signaux stratégiques) :
- Le sponsor exécutif a quitté l'entreprise (traiter immédiatement avec le successeur)
- L'entreprise a connu une acquisition ou une restructuration
- Gels budgétaires ou réductions d'effectifs annoncés (LinkedIn/actualités)
- Le champion promouvant votre produit est devenu silencieux ou parti

60-90 JOURS AVANT L'ATTRITION (signaux d'engagement) :
- La fréquence de connexion a baissé > 30% par rapport à la moyenne de 3 mois
- L'utilisation de la fonctionnalité principal decline pendant 2+ mois consécutifs
- Tickets de support ouverts sur l'exportation de données ou l'accès API (préparation de migration)
- Score NPS baissé ≥ 2 catégories (Promoteur → Passif / Passif → Détracteur)
- Ticket de support demandant les conditions du contrat, la date de renouvellement ou le processus d'annulation

30-60 JOURS AVANT L'ATTRITION (signaux commerciaux) :
- Facture impayée > 15 jours sans communication antérieure
- Le client a demandé une comparaison de tarification ou un appel d'offres
- L'équipe CS n'a pas de point de contact avec le principal contact depuis > 45 jours
- Des demandes de fonctionnalités ont été soumises mais aucune réponse donnée

<30 JOURS AVANT L'ATTRITION (signaux de dernière chance) :
- Le nombre d'utilisateurs a baissé considérablement (désactivation d'utilisateurs)
- Intégration supprimée ou clés API désactivées
- Le client n'assiste pas au QBR ou saute les appels programmés
- Communication directe sur le mécontentement ou l'évaluation compétitive

Stratégie de jeu de réponse par niveau de risque :
Signal 90+ jours : contact immédiat CSM, présentation du sponsor exécutif
Signal 60-90 jours : appel d'examen santé, identifier les blocages de succès, escalader au leader CS
Signal 30-60 jours : appel d'alignement exécutif, offre de sauvegarde si commercial, réponse rapide aux plaintes
Signal <30 jours : appel de sauvegarde avec le décideur, comprendre la cause profonde, offre de dernière chance

Construire le stratégie de jeu de détection de signal d'attrition pour mon produit et conditions de contrat.
```

### Structure QBR

```
Concevoir un examen trimestriel des affaires pour [client].

Client : [nom de l'entreprise, niveau, valeur du contrat]
Durée : [30 min / 60 min / 90 min]
Participants : [sponsor exécutif client + utilisateurs / CS + AE / alignement exécutif]
Objectif : [rétention / expansion / étude de cas / renforcement des relations]

Agenda du QBR :

[10 min] OUVERTURE : Relation et agenda
- Les remercier pour le temps
- Confirmer l'ordre du jour et les résultats souhaités pour cette session
- « Qu'est-ce qui ferait de ces 60 minutes les plus précieuses pour votre équipe ? »

[15 min] VOTRE ENTREPRISE : Qu'est-ce qui a changé depuis le dernier trimestre ?
- Demander avant de parler : « Quels sont vos 3 principales priorités pour le prochain trimestre ? »
- Quels défis rencontrez-vous ?
- Y a-t-il eu des changements d'équipe, de budget ou de direction stratégique ?
[Cette section révèle souvent des opportunités d'expansion ou des risques d'attrition]

[20 min] VALEUR LIVRÉE : Ce qu'ils ont obtenu de votre produit
- Métriques d'utilisation par rapport au dernier trimestre (afficher la croissance ou la stabilité)
- Succès par rapport à leurs objectifs déclarés du dernier QBR
- Résultats spécifiques : [X heures économisées / $Y revenus influencés / Z% gain d'efficacité]
- Mapper l'impact de votre produit aux priorités métier

[10 min] APERÇU FEUILLE DE ROUTE : Ce qui vient de pertinent pour eux
- 1-3 fonctionnalités à venir qui abordent directement leurs cas d'utilisation
- Obtenez un retour d'information : « Cela résoudrait-il le problème dont vous avez parlé ? »
- Éviter : « Voici tout ce que nous construisons » — curée à leur contexte

[15 min] QUESTIONS OUVERTES ET PROCHAINES ÉTAPES :
- Les tickets de support ouverts ou les points de douleur non résolus
- Discussion d'expansion si appropriée (ne pas forcer si la confiance n'est pas là)
- Confirmer les critères de succès pour le prochain trimestre
- Éléments d'action avec propriétaires et dates

[10 min] FERMETURE :
- « Quelle est une chose que nous devrions faire différemment le prochain trimestre ? »
- Calendrier de renouvellement et prochains points de contact
- Demander une référence / étude de cas / référence si la relation est forte

Règles QBR :
- Envoyer l'ordre du jour 5 jours à l'avance
- Passer > 50% du temps à écouter, < 50% à présenter
- Ne jamais commencer par une démonstration produit — commencer par leur métier
- Toujours terminer avec des prochaines étapes documentées

Générer le plan du deck QBR et les points de discussion pour mon client spécifique.
```

### Plan d'intégration client

```
Construire un plan d'intégration pour [nouveau client].

Client : [taille, sophistication technique, cas d'utilisation]
Contrat : [$X ARR, [X] sièges, [Y] cas d'utilisation clés achetés]
Propriétaire du succès : [nom CSM]
Chronologie : [intégration 30/60/90 jours]
Moment "aha" : [le résultat spécifique qui montre rapidement la valeur]

Plan d'intégration 30-60-90 jours :

JOURS 1-7 — Configuration et orientation :
□ Appel de lancement : introductions, confirmer les critères de succès, établir la cadence de communication
□ Configuration technique : provisionnement du compte, intégrations, invitations utilisateur
□ Formation administrative : l'utilisateur acheteur / administrateur peut configurer l'outil indépendamment
□ Victoire rapide : identifier le cas d'utilisation impactant unique — le faire fonctionner cette semaine

JOURS 8-30 — Première valeur livrée :
□ Formation champion : 1-2 utilisateurs internes puissants formés et actifs
□ Premier workflow principal fonctionnant de bout en bout
□ Appel de vérification (semaine 2) : des blocages ? Qu'est-ce qui fonctionne ?
□ Jalon d'activation confirmé : [moment "aha" spécifique réalisé]
□ Présentation aux membres de l'équipe supplémentaires qui devraient utiliser le produit

JOURS 31-60 — Approfondissement de l'adoption :
□ Expansion vers cas d'utilisation ou départements supplémentaires
□ Formare les utilisateurs restants sur les workflows principaux
□ Documenter les premières victoires et les signaux ROI (préparer la preuve pour les stakeholders internes)
□ Examen d'intégration à mi-parcours : vérification du score de santé, signaux d'attrition identifiés

JOURS 61-90 — Focus sur les résultats métier :
□ Examen des résultats : par rapport aux critères de succès établis au lancement
□ Documentation du ROI : le client peut-il articuler la valeur à son leadership ?
□ Champion interne identifié et cultivé
□ Chemin vers l'expansion discuté (si l'utilisation le soutient)
□ Demande d'étude de cas / référence si la relation est forte

Déclencheurs d'escalade lors de l'intégration (signaler immédiatement) :
- Configuration technique non complétée au jour 7
- Aucune connexion à partir d'utilisateurs non-administrateurs au jour 14
- CSM ne peut pas joindre le contact principal pendant > 5 jours
- Le client exprime le mécontentement ou l'attente non satisfaite au cours des 30 premiers jours

Générer le plan d'intégration pour mon client et produit spécifique.
```

## Exemple

**Utilisateur :** Nous avons 50 clients payant 2K-10K$/mois. Pas de processus CS formel. 3 se sont en allés le dernier trimestre sans avertissement. Comment construire un score de santé basique avec ce que j'ai ?

**Modèle de démarrage rapide de Claude :**

Sans données CS formelles, construire à partir de ce que vous avez — logs produit + CRM + tickets de support. Cela prend 1 semaine à configurer.

**Score de santé 3 signaux (commencer ici, construire plus tard) :**

| Signal | Source de données | Vert | Jaune | Rouge | Poids |
|---|---|---|---|---|---|
| Utilisateurs actifs mensuels | BD produit | >60% sièges actifs | 30-60% | <30% | 40% |
| Tickets de support | Helpdesk | 0-2/mois | 3-5/mois | >5 ou 0 pendant 60+ jours | 30% |
| Jours depuis le dernier contact CS | CRM | <30 jours | 31-60 jours | >60 jours | 30% |

**Score = moyenne pondérée des scores de signal (1-10 par signal)**

**Dans votre CRM maintenant :** créer un champ de santé sur chaque compte (Vert/Jaune/Rouge). Examiner manuellement et définir chaque compte cette semaine. Examiner mensuellement.

**Les 3 attentions n'ont pas eu d'avertissement car :** vous n'aviez pas de score et pas de cadence de contact. Corriger d'abord la cadence de contact — un appel mensuel de 30 minutes avec chaque client vaut plus qu'un modèle de score de santé parfait que vous construisez en 3 mois.

**Actions immédiates :**
1. Appeler tous les clients avec lesquels vous n'avez pas parlé depuis >60 jours cette semaine (probablement 15-20 sur 50)
2. Leur demander : « Qu'est-ce qui vous ferait renouveler sans hésitation ? » — vous apprendrez plus de 10 appels que de 3 mois d'analyse
3. Définir une règle : aucun compte ne va > 45 jours sans point de contact

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
