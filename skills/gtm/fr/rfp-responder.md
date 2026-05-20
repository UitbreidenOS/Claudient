---
name: rfp-responder
description: "RFP and security questionnaire response: analyse, score, and respond to enterprise RFPs, security questionnaires (SIG, CAIQ), and vendor assessments — efficiently and accurately"
---

# Compétence RFP Responder

## Quand l'utiliser
- Répondre à un appel d'offres (RFP) d'entreprise ou à un appel d'offres (ITT)
- Compléter un questionnaire de sécurité (SIG Lite, SIG Core, CAIQ, personnalisé)
- Répondre à une évaluation de fournisseur ou un questionnaire de diligence raisonnable
- Créer une bibliothèque de réponses pour les questions RFP fréquemment posées
- Évaluer un appel d'offres entrant pour décider si vous devez faire une offre

## Quand ne pas l'utiliser
- Négociation de contrat après avoir remporté un appel d'offres — utilisez la compétence deal-desk
- Examen juridique de la conformité des conditions de l'appel d'offres — utilisez la compétence vendor-contract-review
- Positionnement marketing — utilisez la compétence copywriting
- Premier appel commercial ou démonstration — utilisez la compétence sdr-agent

## Instructions

### Évaluation des offres RFP

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

### Structure de réponse RFP

```
Construire une réponse pour [RFP].

Exigences de l'appel d'offres : [coller ou décrire les sections clés]
Critères d'évaluation : [si divulgués — pondérations ou priorités]
Format de soumission : [document / portail / e-mail / présentation en personne]
Date limite : [date]
Points de différenciation à mettre en évidence : [lister 3-5]

Structure de réponse RFP (adapter au format spécifique requis) :

RÉSUMÉ EXÉCUTIF (1-2 pages) :
- Énoncé du problème : montrer que vous comprenez ce qu'ils essaient de résoudre (pas seulement ce qu'ils ont demandé)
- Solution proposée : comment vous la résolvez à haut niveau
- Pourquoi nous choisir : 3 différenciateurs clés spécifiques aux priorités énoncées de ce client
- Preuve : une étude de cas pertinente avec résultat quantifié

APERÇU DE L'ENTREPRISE (1 page) :
- Fondation, siège social, taille de l'équipe
- Chiffre d'affaires ou financement (si partageable)
- Nombre de clients et logos notables dans leur secteur
- Certifications (SOC 2, ISO 27001, RGPD, etc.)

DESCRIPTION DE LA SOLUTION (gros de la réponse) :
- Mapper chacune de leurs exigences à une capacité spécifique
- Format : [Leur exigence] → [Notre capacité] → [Preuve]
- Ne jamais ignorer une exigence : « non applicable » est mieux que le silence
- Utiliser leur vocabulaire, pas le vôtre

IMPLÉMENTATION / INTÉGRATION (si applicable) :
- Calendrier : déploiement par phases avec dates de jalons
- Équipe : qui sera assigné, leur expérience
- Formation : ce que vous fournissez aux utilisateurs finaux et administrateurs
- Support : SLA, canaux, temps de réponse

TARIFICATION (suivre leur format) :
- Tarification par ligne pour chaque composant qu'ils ont demandé
- Si personnalisé : fournir une plage ou indiquer que la tarification suit un appel de découverte
- Vue du coût total de possession si cela aide (éviter le choc des prix)

RÉFÉRENCES ET ÉTUDES DE CAS :
- 2-3 références dans un secteur similaire ou un cas d'utilisation
- Inclure : nom de l'entreprise (si autorisé), défi, solution, résultat quantifié
- « Les références sont disponibles sur demande » est faible — fournir des détails spécifiques

ANNEXES (selon les besoins) :
- Réponses au questionnaire de sécurité
- Certificats et documents d'accréditation
- Contrat standard / MSA

Écrire le cadre de réponse pour mon appel d'offres spécifique.
```

### Réponse au questionnaire de sécurité

```
Remplir ce questionnaire de sécurité.

Type de questionnaire : [SIG Lite / SIG Core / CAIQ / personnalisé]
Émetteur : [nom de l'entreprise]
Date limite : [date]
Nos certifications : [SOC 2 Type II / ISO 27001 / HIPAA / PCI-DSS / aucune]

Principes de réponse standard :

1. Répondre d'abord à partir des certifications :
   - Pour les contrôles SOC 2 : « Ce contrôle est couvert par notre rapport SOC 2 Type II (disponible sous NDA). Référence de contrôle : CC6.1. »
   - Pour ISO 27001 : « Ceci est couvert dans notre SMSI sous le contrôle A.9.2 (gestion de l'accès des utilisateurs). Certificat ISO 27001 disponible sur demande. »
   - Ne pas redécrire ce que la certification prouve déjà — le référencer

2. Pour les questions non couvertes par la certification :
   - Répondre spécifiquement et honnêtement
   - Inclure le type de preuve : « Documenté dans notre politique de contrôle d'accès (v2.1) »
   - Offrir de fournir la documentation sous NDA s'ils ont besoin de la politique elle-même

3. Pour les lacunes (où vous n'avez pas de contrôle) :
   - « En cours : nous implémentons [X] dans le cadre de notre feuille de route de sécurité Q[N]. Date de réalisation prévue : [date]. »
   - OU proposer un contrôle compensatoire : « Bien que nous ne disposions pas de [X], nous atténuons ce risque par [contrôle compensatoire]. »
   - Ne jamais laisser une lacune vide — cela semble évasif ; les lacunes honnêtes avec des atténuations sont meilleures

Questions courantes et réponses recommandées :

Q : Avez-vous SOC 2 Type II ?
R (si oui) : « Oui. Notre rapport SOC 2 Type II (Sécurité + Disponibilité TSC) est disponible sous NDA. Période d'audit dernière : [dates]. Auditeur : [entreprise]. »

Q : Comment gérez-vous les violations de données ?
R : « Nous maintenons un plan de réponse aux incidents documenté. Selon le RGPD, nous notifions les autorités de surveillance dans les 72 heures et les clients concernés dans les [X] heures de la confirmation d'une violation. Notre dernier test de réponse aux incidents était [date]. »

Q : Chiffrez-vous les données au repos et en transit ?
R : « Toutes les données au repos sont chiffrées à l'aide d'AES-256 (AWS KMS). Toutes les données en transit utilisent TLS 1.2+. Le chiffrement est appliqué dans tous les environnements de production. »

Q : À quelle fréquence effectuez-vous des tests de pénétration ?
R : « Les tests de pénétration annuels sont menés par [entreprise tierce]. Dernier test : [date]. Les résultats sont corrigés conformément à notre SLA de gestion des vulnérabilités (critique : 30 jours, élevée : 60 jours). »

Q : Où sont stockées les données des clients ?
R : « Toutes les données des clients sont stockées dans [AWS us-east-1 / EU-West-1 / etc.]. Nous ne transférons pas les données en dehors de [juridiction] sauf si cela est exigé par [exception spécifique — par exemple, outillage de support avec des accords de traitement des données en place]. »

Construire la réponse au questionnaire complet pour mon niveau de certification et les questions spécifiques posées.
```

### Bibliothèque de réponses

```
Construire une bibliothèque de réponses RFP réutilisable pour [entreprise].

Entreprise : [nom]
Produits : [décrire]
Certifications : [lister]
Principaux segments de clients : [secteurs / tailles d'entreprises]
Sections d'appels d'offres fréquemment demandées : [lister les catégories les plus courantes]

Structure de la bibliothèque :

MODÈLES D'ENTREPRISE (mise à jour trimestrielle) :
- Aperçu de l'entreprise : [250 mots, mis à jour avec le dernier nombre d'employés et ARR]
- Biographies de l'équipe de direction : [PDG, CTO, VP Ventes — 3-4 phrases chacun]
- Investissement et financement : [Série X, soutenu par X — ou « privé » si non divulgable]
- Références clients : [5-7 références pré-approuvées à partager, avec secteur et résultat]

DESCRIPTIONS DE CAPACITÉS (par domaine de produit) :
[Produit/fonctionnalité] : [description de 250 mots prête à coller]

SÉCURITÉ (bloc standard) :
[Réponse préparée pour chacune des 20 questions de sécurité les plus courantes]
Mettre à jour chaque fois que le statut de certification change.

ÉTUDES DE CAS (2-3 par secteur vertical) :
[Secteur] : [Type d'entreprise] + [Problème] + [Solution] + [Résultat avec un nombre]

CERTIFICATIONS ET CONFORMITÉ :
[SOC 2 : dates, auditeur, couverture]
[ISO 27001 : numéro de certificat, expiration, portée]
[RGPD : modèle DPA disponible, contact DPO]
[HIPAA : BAA disponible sur demande]

LANGAGE DE TARIFICATION :
[Réponse standard : « La tarification est personnalisée en fonction du volume et de la configuration. Notre équipe fournira un devis détaillé dans les 3 jours ouvrables suivant la réception de vos exigences. »]
[Ou : tableau de tarification standard si votre tarification est publiée]

Cadence de maintenance :
- Trimestriel : mettre à jour les statistiques de l'entreprise, le nombre de clients, les certifications
- Après chaque appel d'offres : ajouter une nouvelle étude de cas ou une référence approuvée si une nouvelle victoire
- Après chaque questionnaire de sécurité : mettre à jour le bloc de sécurité avec les nouveaux contrôles

Générer la structure de la bibliothèque de réponses pour mon entreprise.
```

## Exemple

**Utilisateur :** Nous avons reçu un SIG Core de 200 questions d'une entreprise de services financiers. Nous avons SOC 2 Type II mais pas ISO 27001. La date limite est 10 jours. Comment répondons-nous efficacement ?

**Stratégie de Claude :**

200 questions en 10 jours = ne pas répondre à chaque question à partir de zéro. Trier d'abord.

**Étape 1 — Catégoriser (Jour 1, 2 heures) :**
Grouper les 200 questions dans :
- Couvert par SOC 2 : marquer avec « Référence SOC 2 : [contrôle] » — répondre en citant le rapport
- Documenté par la politique : marquer avec « Politique : [nom] » — réponse rapide spécifique
- Non applicable : marquer comme N/A avec justification (par exemple, contrôles physiques si nuage uniquement)
- Lacunes : réponse honnête + contrôle compensatoire ou note en cours

Répartition attendue pour un détenteur de SOC 2 Type II : ~70 questions couvertes par SOC 2, ~60 par politique, ~40 N/A, ~30 lacunes réelles.

**Étape 2 — Regrouper par propriétaire (Jour 1-2) :**
L'ingénierie possède : chiffrement, contrôles d'accès, gestion des vulnérabilités, journalisation
La légalité possède : traitement des données, confidentialité, conformité réglementaire
La finance/exploitation possède : continuité des activités, assurance, contrats tiers

**Étape 3 — Écrire le bloc SOC 2 une fois, le référencer partout (Jour 2) :**
« Ce contrôle est couvert par notre audit SOC 2 Type II (disponible sous NDA). Référence de contrôle : [CC#]. Période d'audit : [dates]. Auditeur : [entreprise]. »
Copier ce modèle dans toutes les questions couvertes par SOC 2 — 10 minutes par contrôle, pas 10 questions × 30 minutes chacune.

**Étape 4 — Lacunes (Jour 5-7) :**
Pour chaque lacune réelle : 2-3 phrases — ce que nous n'avons pas, ce que nous faisons à la place, quand nous prévoyons de l'adresser.

**Étape 5 — Examen et soumission (Jour 8-10) :**
Faire examiner la section données/confidentialité par la légalité. Vérification spot du PDG sur les 10 questions les plus sensibles. Soumettre avec une note de couverture offrant une réunion de sécurité virtuelle avec votre CTO.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
