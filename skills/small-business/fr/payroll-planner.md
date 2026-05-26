# Planificateur de Paie

## Quand l'activer
- Vous êtes à 1-2 semaines de la paie et voulez confirmer que l'argent est là avant qu'il ne soit débité
- L'argent se fait tight et vous n'êtes pas sûr de pouvoir couvrir à la fois les factures et les salaires ce cycle
- Un nouvel embauché arrive et vous devez recalculer votre runway avec le montant de paie plus élevé
- Planification de fin de trimestre — vous voulez une image de 90 jours, pas seulement 30 jours

## Quand NE PAS l'utiliser
- Vous avez un CFO ou un comptable à temps plein qui gère les flux de trésorerie — c'est leur travail, pas celui de Claude
- Votre montant de paie change chaque cycle de manière complexe (commissions, salaire variable) et vous n'avez pas encore stabilisé les chiffres — obtenez d'abord les chiffres réels, puis utilisez cette compétence
- Vous avez besoin de prendre des décisions de traitement de la paie (retenue fiscale, déductions d'avantages) — utilisez votre fournisseur de paie (Gusto, ADP, Paychex), pas Claude

## Instructions

### Ce que vous devez donner à Claude

Vous avez besoin de cinq choses. Vous devriez tous les connaître par cœur ou en moins de 5 minutes de votre banque et QuickBooks :

1. Solde bancaire actuel (compte chèques d'où votre paie est prélevée)
2. Date de paie suivante et montant exact de la paie
3. Factures ouvertes : qui vous doit de l'argent, combien, et quand vous vous attendez réaliste à ce que chacun arrive
4. Factures récurrentes dues au cours des 30 prochains jours : loyer, abonnements logiciels, paiements aux fournisseurs — montants et dates d'échéance
5. Toutes les dépenses irrégulières à venir : achat d'équipement, renouvellement d'assurance, paiement d'impôts

### Étape 1 : Construisez la chronologie de trésorerie de 30 jours

Dites à Claude les cinq chiffres. Demandez :

« Construisez-moi une vue de trésorerie de 30 jours à partir d'aujourd'hui. Montrez le solde qui augmente quand les factures arrivent et qui diminue quand les factures et la paie le font. Montrez-moi le point le plus bas. »

Claude produit une image de trésorerie jour par jour et marque le jour le plus serré :

« Le jour 11 est votre point bas — 3 800 $ à la banque avant l'arrivée de la facture Peterson le jour 13. La paie le jour 15 est 18 500 $. Vous avez 2 200 $ de coussin si Peterson paie à temps. S'ils sont en retard de 3 jours, vous avez un écart de 14 300 $. »

### Étape 2 : Classez les factures en retard par urgence

Si vous avez des factures en retard ou à risque de retard, demandez à Claude de les classer. Dites :

« J'ai trois factures en retard. Dites-moi l'ordre dans lequel je dois les chaser et ce que je dois dire. »

Claude les classe par impact en dollars sur l'écart de paie, pas seulement par jours d'retard. Une facture de 9 000 $ en retard de 5 jours importe plus qu'une facture de 400 $ en retard de 45 jours si la paie est dans 2 semaines.

Claude rédige également l'outreach : un script d'appel de recouvrement direct pour votre facture de priorité la plus élevée, et des suivis par email plus courts pour le reste.

### Étape 3 : Générez la liste de contrôle de paie

Demandez à Claude : « Qu'est-ce que je dois faire avant la paie le 15 ? »

Claude génère une liste de contrôle adaptée à votre fournisseur de paie (Gusto, ADP, Paychex, QuickBooks Payroll). Éléments typiques :

- Confirmez que les heures des employés sont soumises et approuvées
- Vérifiez que les informations sur le nouvel embauché sont entrées (si applicable)
- Confirmez que le compte bancaire enregistré a des fonds suffisants avant le délai de traitement
- Soumettre la paie avant la date limite du fournisseur (généralement 2 jours ouvrables avant la date de paie)
- Téléchargez le résumé de la paie pour vos dossiers

### Étape 4 : Gérez un manque

Si la chronologie montre un écart, ne devinez pas les solutions. Dites à Claude exactement quel est le manque et demandez des options. Claude suggérera des actions spécifiques classées par vitesse et coût :

- Quelle facture spécifique appeler en premier et quoi dire pour la faire payer cette semaine
- Quelles factures peuvent être retardées sans pénalité (la plupart des fournisseurs autorisent 5-7 jours avec un appel)
- Si une ligne de crédit commerciale a du sens pour cet écart et ce montant spécifiques
- Quelles dépenses discrétionnaires retenir jusqu'après l'effacement de la paie

Claude ne vous dira pas « explorer les options de financement » de manière abstraite — il dira « retenir le renouvellement logiciel de 1 400 $ jusqu'au 16 et appeler Peterson aujourd'hui. Cela ferme votre écart. »

### Cadence mensuelle

Exécutez cette compétence une fois par mois, le premier lundi après la clôture du mois précédent. Cela prend 10 minutes et élimine les surprises de trésorerie. Combinez avec la compétence Month-End Close pour l'image complète.

## Exemple

Vous dites : « La paie est de 18 500 $ le 15. Le solde bancaire d'aujourd'hui est de 22 000 $. J'ai trois factures : 8 000 $ du groupe Atlas en raison du 10, 4 500 $ de Reyes Construction en raison du 20, 6 000 $ de Johnson qui est 30 jours en retard et ils n'ont pas répondu. Factures ce mois : 2 200 $ de loyer le 1er (déjà payé), 800 $ de logiciel en raison du 8, 1 100 $ d'assurance en raison du 18. »

Claude produit :

Chronologie de trésorerie :
- Aujourd'hui : 22 000 $
- Jour 8 : -800 $ logiciel → 21 200 $
- Jour 10 : +8 000 $ Atlas Group → 29 200 $ (si à temps)
- Jour 15 : -18 500 $ paie → 10 700 $
- Jour 18 : -1 100 $ assurance → 9 600 $
- Jour 20 : +4 500 $ Reyes → 14 100 $

Point le plus tight : Jour 14, la veille de la paie. Si Atlas Group paie à temps, vous avez 21 200 $ à l'entrée de la paie — confortable. Si Atlas retarde de 5+ jours, vous descendez à 13 200 $ avant que la paie ne frappe, ce qui se dégage toujours mais laisse 5 300 $ après la paie avant tout autre revenu. Monitorez Atlas de près.

Johnson (6 000 $ en retard) : appelez aujourd'hui. Claude rédige un script d'appel de 3 phrases : « Bonjour, c'est [nom] de [entreprise]. J'appelle à propos de la facture de 6 000 $ datée du [date] qui est 30 jours en retard. Pouvez-vous confirmer l'état et me donner une date de paiement que je peux mettre dans mes dossiers ? »

La paie est sûre tant qu'Atlas paie d'ici le 13. Aucun risque de manque aujourd'hui — mais Johnson est le coussin. Recueillez Johnson avant le 13 et vous avez 27 200 $ à l'entrée de la paie.
