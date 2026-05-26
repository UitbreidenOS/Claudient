# Pratique Dentaire

## Quand activer
- Vous exploitez une pratique dentaire solo ou en petit groupe et la réception administrative est submergée par le suivi opérationnel
- Le rappel de planification a pris du retard — les patients qui devraient être sur un cycle de 6 mois sont à 9+ mois sans réservation
- L'acceptation du plan de traitement est inférieure à 50% et vous voulez une séquence de suivi structurée pour les plans non acceptés
- La vérification d'assurance mange 4-8 heures par semaine du temps de la réception
- Vous lancez un nouveau service (gouttières transparentes, dentisterie du sommeil, cosmétique) et avez besoin d'exemplaires d'éducation patient et de sensibilisation

## Quand ne pas utiliser
- Vous avez un office manager ou administrateur de pratique dédié qui possède déjà ces workflows efficacement
- Votre PMS (Dentrix, Eaglesoft, Open Dental) exécute déjà un système de rappel et de suivi automatisé robuste auquel vous faites confiance
- Le travail touche aux décisions cliniques — Claude est pour l'enveloppe administrative autour du traitement, pas pour le traitement lui-même

## Instructions

### Étape 1 : Établir le contexte de votre pratique

Dites :

« Je dirige une pratique dentaire [solo / groupe] à [ville]. Nous avons [N] cabinets et [N] hygiénistes. Notre mix de patients est [assuré-lourd / fee-for-service / mixte]. Notre voix de marque est [chaleureux-et-clinique / familial / premium / sans-détour]. Notre mix de services le plus courant est [rappel de routine, restauratif, cosmétique, ortho, etc. — avec pourcentages approximatifs]. Notre plus grand service que nous essayons de développer est [nom]. »

### Étape 2 : Lancer un rappel sur l'arriéré

Le workflow de compétence dentaire unique à plus haut ROI est la récupération de rappel. La plupart des pratiques ont 80-200 patients qui sont en retard sur leur rappel de 6 mois mais n'ont pas été activement poursuivis.

Dites :

« Voici 50 patients en retard sur le rappel. Pour chacun, brouillon un message de sensibilisation personnalisé qui référence la date de leur dernière visite, le service qu'ils ont eu, la visite suivante recommandée et offre deux créneaux de rendez-vous spécifiques. »

Claude produit 50 messages personnalisés. Votre réception les envoie par lots, exécute une séquence de 3 touches (sensibilisation initiale, suivi d'une semaine, finale de 3 semaines), et suit les réservations. Récupération typique : 25-40% des patients en retard planifient dans les 30 jours.

### Étape 3 : Suivi du plan de traitement

Les plans de traitement non acceptés en chaise sont généralement perdus pour toujours s'il ne y a pas de suivi. La plupart des pratiques n'ont pas de flux de suivi structuré.

Dites :

« Ce patient s'est vu présenter un plan de traitement de $2 400 pour [couronne / implant / restauration de quadrant] le [date] mais n'a pas planifié. Ils ont exprimé une préoccupation concernant [coûts / temps / anxiété dentaire]. Brouillon un message de suivi qui aborde la préoccupation, offre des options de financement si pertinent, et propose une prochaine étape. »

La compétence fonctionne mieux lorsqu'elle est associée à un plan de traitement écrit qui inclut les notes du docteur sur l'objection du patient. Le suivi personnalisé convertit au taux 2-4x de rappels génériques « planifions ce traitement ».

### Étape 4 : Tri de vérification d'assurance

La vérification d'assurance est mécanique mais consomme les heures de réception. Claude structure le travail :

Dites :

« Pour les 8 nouveaux patients de demain, voici les détails d'assurance. Générez une liste de contrôle de vérification structurée pour chacun — quoi confirmer avec le transporteur, catégories de prestations attendues, statut des franchises et les pièges courants pour ce transporteur. »

Les appels de vérification se produisent toujours avec le transporteur (les APIs d'assurance sont faibles en dentisterie). Mais votre réception arrive à chaque appel avec une liste de contrôle structurée et écrit la réponse dans Claude pour l'utilisation en aval dans les conversations de planification du traitement.

### Étape 5 : Lancement d'un nouveau service

Quand la pratique lance un nouveau service (gouttières transparentes, apnée du sommeil, plan d'adhésion en interne) :

Dites :

« Je lance [service] en [mois]. Le service est pour les patients qui [persona / use case]. La tarification est [$X]. Brouillon : (1) la feuille d'éducation patient, (2) l'email d'annonce en interne aux patients existants, (3) la copie de la page de service du site, (4) le script de consultation pour le docteur et le coordinateur de consultation. »

Vous obtenez un package coordonné. Examinez, exécutez votre examen de conformité (toute réclamation concernant les résultats nécessite une lecture du docteur), et déployez.

### Étape 6 : Récupération des absences et des annulations

Le même motif que la séquence de récupération du salon, calibré à un contexte dentaire. L'économie est différente — une absence le jour même en dentisterie peut être $200-500 en revenus perdus, et le temps de chaise de la pratique ne peut pas être revendu comme une coupe de cheveux. La séquence de récupération est plus directe :

Touch 1 (même jour) : vérification chaude.
Touch 2 (48 heures) : une offre de réservation spécifique avec deux créneaux ouverts.
Touch 3 (7 jours) : demande directe plus la justification pour rester sur le cycle de rappel.

## Exemple

Vous exploitez une pratique familiale de 3 cabinets. Vous avez 1 400 patients actifs. Environ 220 sont en retard sur leur rappel de 6 mois — ce qui signifie qu'ils sont à 9+ mois depuis la dernière visite d'hygiène, et votre réception ne les a pas activement contactés depuis 60+ jours.

Vous demandez à Claude de rédiger des sensibilisations personnalisées pour les premiers 50 (triés par récence de dernière visite — plus récents en premier). Chaque message référence la date de la dernière visite du patient et offre deux créneaux.

Vous envoyez le premier lot mardi matin. D'ici vendredi, 18 patients ont répondu. 12 planifient. C'est $1 800-2 400 en revenus de hygiène récupérés (et le traitement en aval qui provient du temps de chaise que vous n'auriez pas eu).

Vous exécutez un deuxième lot le mardi suivant. Le même motif. Au cours de quatre semaines, vous récupérez environ 35% de l'arriéré en retard — 78 patients planifiés qui auraient autrement dérivé davantage.

Les revenus récupérés en mois un : $11-15K. L'investissement en temps : environ 2 heures d'examen et de sensibilisation de la réception étalées sur le mois. La compétence Claude s'est payée de nombreuses fois au cours des 30 premiers jours.

Vous configurez ensuite cela comme un rythme permanent mensuel. L'arriéré ne grandit jamais au-delà de 40-50 patients à nouveau.
