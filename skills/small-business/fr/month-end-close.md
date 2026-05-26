# Clôture de Fin de Mois

## Quand l'activer
- C'est les derniers jours du mois et vous devez fermer les livres
- Vous avez une réunion avec votre comptable et vous voulez y aller avec les chiffres déjà organisés
- Vous avez besoin d'un P&L pour un prêt bancaire, une mise à jour d'investisseur ou une demande de bail
- Quelque chose ne correspond pas entre votre total QuickBooks et votre relevé bancaire et vous avez besoin de trouver l'écart

## Quand NE PAS l'utiliser
- Mi-mois — attendez que le mois soit terminé pour que les chiffres soient finaux
- Votre comptable gère entièrement la clôture et vous n'êtes pas impliqué dans le processus
- Vous cherchez un conseil fiscal — cette compétence organise vos chiffres, elle ne remplace pas un CPA

## Instructions

### Ce qu'il faut exporter avant de commencer

Vous avez besoin de trois choses provenant de vos outils comptables. Les trois peuvent être exportées en moins de 5 minutes :

1. QuickBooks : rapport Profit & Loss pour le mois (Rapports > Profit & Loss > définir la plage de dates > Exporter vers Excel ou PDF)
2. QuickBooks : rapport de détail des transactions du mois — liste complète de chaque transaction
3. PayPal ou Stripe : rapport de règlement du mois — téléchargeable de votre tableau de bord sous Activité ou Rapports

Si vous utilisez à la fois PayPal et Stripe, tirez les deux. Si vous utilisez un seul, tirez celui-là.

### Étape 1 : Validation croisée des processeurs de paiement par rapport à QuickBooks

Collez vos totaux dans Claude :

« QuickBooks affiche 34 200 $ de revenus. Les ventes brutes PayPal étaient 31 800 $ avant frais, net 29 400 $. Stripe brut était 4 800 $, net 4 600 $. Aidez-moi à réconcilier ces chiffres. »

Claude identifie où les chiffres s'alignent et où ils ne s'alignent pas. Écarts courants qu'il détecte :

- Frais PayPal ou Stripe qui n'ont pas été enregistrés comme dépenses dans QuickBooks
- Remboursements traités dans un système mais non reflétés dans l'autre
- Transactions qui ont été frappées dans un mois mais réglées dans un autre (différences de calendrier)
- Transactions fractionnées qui ont été enregistrées comme un seul bloc-notes dans QuickBooks

Pour chaque écart, Claude explique ce que c'est probablement et quoi faire — si vous devez le corriger vous-même ou le signaler à votre comptable.

### Étape 2 : Générez le résumé du P&L

Une fois les chiffres réconciliés, demandez à Claude :

« Résumez mon P&L pour le mois. Revenu par catégorie si j'ai des catégories, les 5 principales catégories de dépenses, bénéfice net ou perte, et comparez au mois dernier si je vous donne les chiffres du mois dernier. »

Collez votre exportation QuickBooks P&L (sous forme de texte ou de chiffres) et Claude produit un résumé propre :

- Revenu total : 38 600 $ (en hausse de 3 200 $ par rapport au mois dernier, +9%)
- Principales catégories de dépenses : Rémunération des contractants 11 200 $ / Logiciel 2 400 $ / Publicité 1 800 $ / Bureau 640 $ / Frais bancaires 280 $
- Bénéfice net : 22 280 $ (marge de 58%)
- Changement notable par rapport au mois dernier : Dépenses publicitaires en hausse de 600 $ — vérifiez si cela a augmenté les revenus

### Étape 3 : Attrapez les reçus manquants

Dites à Claude votre seuil :

« Listez toutes les transactions supérieures à 75 $ dans mon rapport de dépenses qui n'ont pas de mémo ou de reçu attaché. »

Collez votre liste de transactions. Claude signale celles sans description et les regroupe par catégorie pour que vous puissiez chasser les reçus efficacement. Il note également lesquels sont probablement déductibles (repas d'affaires, logiciels, voyage) par rapport à courants (paie, loyer) — vous savez donc lesquels les reçus manquants importent réellement pour les impôts.

### Étape 4 : Rédigez l'email du comptable

Demandez à Claude :

« Rédigez un email de 3 paragraphes à mon comptable résumant ce mois. Incluez les chiffres clés et signalez les 2-3 questions que je devrais leur poser. »

Claude rédige :

- Paragraphe 1 : Résumé du mois — revenu, dépenses, bénéfice net, et une tendance notable
- Paragraphe 2 : Notes de réconciliation — ce que vous avez trouvé, ce que vous avez corrigé, ce dont vous n'êtes pas sûr
- Paragraphe 3 : Vos questions spécifiques — formulées comme « J'ai remarqué X, devrais-je faire Y ? » pas des demandes vagues

Cela économise du temps à votre comptable et vous obtient des réponses plus rapides et plus utiles.

### Les choses courantes que Claude détecte

- Frais de règlement PayPal comptabilisés comme revenu au lieu de dépense
- Les retraits des propriétaires qui ont réduit le solde bancaire mais ne sont pas affiches comme dépenses
- Les transactions dupliquées provenant de l'importation de flux bancaires
- Les abonnements qui ont renouvelé mais n'ont pas été budgétisés
- Les paiements reçus le mois précédent que QuickBooks a enregistrés ce mois-ci (différence accrual vs. cash)

### Cadence mensuelle

Exécutez cette compétence dans les 3 premiers jours ouvrables après la clôture du mois. Réservez 60-90 minutes la première fois, 30-45 minutes une fois que vous avez une routine. Utilisez la sortie directement pour votre réunion comptable — aucune préparation supplémentaire nécessaire.

## Exemple

Vous dites : « QuickBooks affiche 34 200 $ de revenus ce mois. PayPal affiche 31 800 $ net après frais. J'ai aussi 2 100 $ dans Stripe. Mes dépenses QuickBooks affichent 18 400 $. Je ne suis pas sûr pourquoi les chiffres ne s'ajoutent pas et j'ai un appel comptable demain matin. »

Claude réconcilie les trois sources :

- Revenu QuickBooks 34 200 $ + Stripe 2 100 $ devrait égaler 36 300 $ total — mais PayPal net 31 800 $ ne correspond pas à cette image proprement.
- Analyse des écarts : Claude trouve que les 2 400 $ de frais PayPal n'ont pas été enregistrés comme dépense dans QuickBooks. L'ajout le ferme à 300 $.
- Les 300 $ restants sont signalés comme un remboursement non catégorisé probable — Claude demande : « Avez-vous émis des remboursements au cours des 30 derniers jours ? Vérifiez votre activité PayPal pour les remboursements émis entre le 18 et le 25. »

Claude produit ensuite :
- Résumé P&L propre avec des chiffres corrects pour votre appel comptable
- Note de réconciliation d'un paragraphe expliquant la facturation de frais PayPal qui manque
- Trois questions à soulever avec votre comptable : comment catégoriser le remboursement, si le tirage du propriétaire du 22 a besoin d'une entrée, et si l'achat d'équipement de 640 $ se qualifie pour la Section 179

Vous allez à l'appel comptable avec tout organisé. L'appel prend 20 minutes au lieu d'une heure.
