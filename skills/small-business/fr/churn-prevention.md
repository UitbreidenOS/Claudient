# Prévention du Churn

## Quand l'activer
- Vous gérez une entreprise par abonnement (SaaS, adhésion, service récurrent, abonnement au contenu) et voulez réduire le churn client
- Votre taux de churn augmente et vous ne savez pas quel segment le cause
- Vous voyez les mêmes clients annuler passer à vos concurrents trois mois plus tard — la relation était récupérable
- Vous lancez une nouvelle fonctionnalité, un tier tarifaire ou un programme et voulez concevoir le lancement pour minimiser le risque de churn
- Vous voulez systématiser l'identification et l'outreach des clients à risque plutôt que de réagir aux annulations après coup

## Quand NE PAS l'utiliser
- Vous dirigez une entreprise transactionnelle (achats ponctuels, services ad-hoc) — le churn n'est pas le bon framework
- Votre churn est déjà excellent (moins de 1% mensuel pour B2B SaaS, moins de 3% pour les abonnements B2C) — les rendements décroissants arrivent vite
- Les annulations que vous voyez sont structurelles (le produit est mauvais, la tarification est mauvaise) — l'outreach ne les résoudra pas; les changements de produit ou de tarification le feront

## Instructions

### Étape 1 : Configurez votre contexte d'abonnement

Dites :

« Je gère une entreprise [type d'abonnement — SaaS, adhésion, contenu, service récurrent]. La LTV client moyenne est [$X]. Le taux de churn mensuel est [Y%]. Le parcours client typique de l'inscription à l'annulation est [décrire le modèle]. Le principal moteur de churn selon moi est [raison]. Ma voix de marque est [liste d'adjectifs]. »

### Étape 2 : Identification des clients à risque

La plupart des churns se produisent après une période d'engagement décroissant visible dans vos données. Extrayez les signaux d'engagement.

Dites :

« Voici les signaux de ma base client au cours des 30 derniers jours : [coller les données — fréquence de connexion, utilisation des fonctionnalités, tickets de support, dégradations de plan, etc.]. Identifiez les clients les plus à risque de churner dans les 30 prochains jours. Pour chacun, expliquez le modèle de signal spécifique qui a déclenché le drapeau et suggérez une approche d'outreach personnalisée. »

Claude est doué pour détecter les motifs dans les données d'engagement structurées. Fournissez les nombres bruts, pas votre interprétation, et laissez-le découvrir les motifs que vous auriez pu manquer.

### Étape 3 : Outreach des clients à risque

Pour chaque client à risque :

Dites :

« Le client [nom] chez [entreprise] affiche des signaux de churn : [modèle spécifique]. Ils sont client depuis [X mois]. Leur cas d'usage est [cas d'usage]. Rédigez un outreach de réengagement personnalisé : (1) un check-in chaleureux qui référence leur cas d'usage spécifique, (2) une offre structurée pour les aider à obtenir de la valeur (formation personnalisée, examen de compte, présentation de fonctionnalité), (3) une invite d'écoute douce qui leur donne l'espace de partager si quelque chose ne fonctionne pas. »

La personnalisation est ce qui fait la différence. L'outreach générique « nous avons remarqué que vous vous n'êtes pas connecté dernièrement » est ignoré. Le personnalisé « j'ai remarqué que vous avez arrêté d'exécuter le rapport hebdomadaire après notre version 3 — ce modèle a surfacé pour quelques clients et nous avons expédié un correctif il y a deux semaines, voulez-vous une présentation de 10 minutes ? » obtient des réponses.

### Étape 4 : Flux de sauvegarde d'annulation

Quand un client initie une annulation :

Dites :

« Le client [nom] a juste soumis une demande d'annulation. Ils sont avec nous depuis [X mois], payant [$Y/mois]. Leur raison déclarée est [raison]. Leur modèle d'utilisation au cours des 90 derniers jours était [modèle]. Rédigez une séquence de sauvegarde d'annulation : (1) une réponse immédiate accusant réception de l'annulation et offrant un appel de 15 minutes avant de le traiter, (2) des points de discussion pour l'appel couvrant la raison déclarée et les modèles observés, (3) trois offres de sauvegarde classées par probabilité — pause, dégradation, mois gratuit + formation personnalisée. »

L'appel de sauvegarde d'annulation récupère 20-40% des demandes d'annulation dans les entreprises par abonnement bien gérées. La plupart des petites entreprises ne font pas l'appel du tout; elles traitent juste l'annulation.

### Étape 5 : Récupération post-annulation

Pour les clients qui annulent :

Dites :

« Le client [nom] a annulé il y a [X jours]. Leur raison déclarée était [raison]. Leur LTV avec nous était [$Y]. Rédigez une séquence de récupération : (1) un email post-annulation de 30 jours « vérification » qui ne pousse rien, (2) un email de 90 jours « nous avons expédié ce truc que vous avez mentionné » s'il y a quelque chose de spécifique qu'ils ont soulevé qui est maintenant résolu, (3) un email de 6 mois « envisagez-nous à nouveau » avec une offre douce. »

L'email de 90 jours « nous l'avons réparé » est le touch de récupération le plus efficace. La plupart des entreprises par abonnement annulent les clients et les oublient pour toujours.

### Étape 6 : Analyse du churn au niveau de la cohorte

Une fois par trimestre :

Dites :

« Voici mes données de churn sur les 12 derniers mois par cohorte d'inscription : [coller]. Identifiez les modèles au niveau de la cohorte : quels mois avaient une rétention inhabituellement élevée ou basse, quels canaux d'acquisition produisent une LTV plus élevée, quel tier tarifaire a le plus de churn, quelle utilisation de fonctionnalité corrèle avec la rétention. Suggérez 3-5 hypothèses testables pour améliorer la rétention. »

La vue de cohorte découvre les modèles que le taux de churn mensuel masque. La plupart des opérateurs par abonnement regardent le churn comme un seul nombre et manquent que les nouvelles cohortes clients churent au taux 2x supérieur au taux hérité.

## Exemple

Vous dirigez un petit SaaS — un outil d'automatisation marketing pour les consultants indépendants et petites agences. 280 clients payants, moyenne $89/mois. Le taux de churn mensuel a augmenté de 4% à 6,5% au cours des 4 derniers mois. À votre compte client, c'est perdre 7-12 clients par mois par rapport aux 11 que vous ajoutez — la croissance nette a stagné.

Vous configurez le workflow d'identification des clients à risque. Vous extrayez les données d'engagement des 30 derniers jours : fréquence de connexion, utilisation des fonctionnalités, tickets de support, dégradations de plan. Vous déposez les données brutes dans Claude avec la liste client.

Claude identifie 18 clients à risque. Le plus grand cluster — 9 des 18 — partage un modèle spécifique : ils ont arrêté d'utiliser la fonctionnalité d'automatisation email au cours des 30 derniers jours, même s'ils l'utilisaient beaucoup auparavant. Le modèle pointe vers un changement d'interface que vous avez expédié il y a 6 semaines.

Vous n'aviez pas remarqué parce que les tickets de support sont arrivés lentement, un ou deux à la fois, formulés comme des problèmes différents. Le modèle en ensemble est clair.

Vous annulez le changement d'interface pour ces 9 clients, leur envoyez un email personnalisé référençant la fonctionnalité spécifique et expliquant ce que vous avez corrigé, et offrez une présentation de 30 minutes. 6 des 9 répondent et se réengagent. 2 annulent quand même (le problème sous-jacent était différent). 1 ne répond pas.

Vous expédiez ensuite une version affinée du changement d'interface avec l'aide explicite à la migration. Le churn mensuel tombe à 4,2% en deux mois. La croissance nette reprend.

Le workflow Claude unique a découvert un problème de produit structurel qui se cachait à l'intérieur des métriques agrégées. L'outreach client-par-client a sauvegardé approximativement $35-45K de revenu récurrent annualisé. La correction du produit a sauvegardé environ $100K+ au cours des 12 mois suivants.

Vous faites de l'identification des clients à risque un rythme mensuel. Au mois 6, votre taux de churn se stabilise à 3,7% — inférieur à où il a commencé. L'effet composé sur la croissance est significatif.
