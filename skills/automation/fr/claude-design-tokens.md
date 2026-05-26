# Gestion des tokens de conception Claude

## Quand activer

- Vous êtes sur le point de démarrer une session Claude Design sur Claude Pro ou Max et vous souhaitez planifier l'utilisation des tokens avant d'ouvrir l'outil
- Vous avez atteint les limites de tokens en cours de session et avez besoin de stratégies de récupération pour continuer le travail
- Vous construisez pour une équipe et devez optimiser l'utilisation collective sur plusieurs membres partageant un plan
- Vous planifiez une série de projets de conception connexes (tableau de bord + page de destination + présentaton) et avez besoin de les séquencer efficacement

## Quand NE PAS utiliser

- Vous avez Claude Max 20× — la pression des tokens est minimale à ce niveau ; concentrez-vous plutôt sur la qualité de la sortie
- Vous faites une exploration ponctuelle que vous n'avez pas besoin de conserver ou de transmettre à quelqu'un d'autre
- Vous avez déjà construit et stabilisé votre système de conception — la plupart des stratégies ci-dessous s'appliquent pendant la configuration et la production active, pas la maintenance

## Instructions

### Stratégie 1 : ROI du système de conception — Construire avant de construire

L'investissement en tokens avec le plus grand effet de levier est la Session 0 : construire le système de conception complet avant de toucher à tout travail de projet réel.

Coût : investissement initial significatif en tokens, généralement une session complète.

Rendement : chaque session ultérieure hérite automatiquement de la marque. Aucun cycle de correction. Aucune refonte à mi-session. Aucun token gaspillé pour familiariser Claude avec les couleurs, la typographie ou l'espacement que vous avez déjà définis.

Protocole de configuration de la Session 0 :

1. Téléchargez la base de code (ou un snapshot représentatif de composants) aux côtés de captures d'écran de produits finis et de fichiers de marque (logo, guide de marque PDF si disponible).
2. Demandez à Claude d'extraire les tokens de couleur, l'échelle typographique, le système d'espacement, les conventions de rayon de bordure et les motifs de composants à partir de ce qu'il voit.
3. Demandez à Claude de nommer chaque token de manière sémantique, pas de manière descriptive — `color-primary` et non `color-blue`, `spacing-section` et non `spacing-48px`.
4. Exportez le résultat sous forme de document de tokens que vous collez au début de chaque future session. C'est votre amorce de session — deux paragraphes qui donnent à Claude un contexte visuel complet sans re-télécharger les fichiers.

Sans la Session 0, chaque session de projet commence par une taxe : Claude devinant l'intention de la marque, vous la corrigeant, les tokens dépensés en récupération plutôt qu'en sortie.

### Stratégie 2 : Le panneau des ajustements — Votre couche gratuite

La fonctionnalité la moins utilisée de Claude Design. Les ajustements de typographie, couleur, espacement et disposition effectués dans le panneau Tweaks consomment zéro token de chat. Zéro.

Flux de travail :

1. Générez une conception de base avec une invite.
2. Avant d'envoyer une autre invite, passez 15-20 minutes dans le panneau Tweaks — ajustez les tailles de police, resserrez l'espacement, décalez les couleurs vers la marque.
3. Retournez au chat uniquement lorsque Tweaks ne peut pas réaliser ce que vous avez besoin (changements de disposition structurelle, nouveaux composants, réécritures de contenu).

Impact estimé : 30-40 % d'invites en moins par session, ce qui se traduit directement par moins de tours consommant beaucoup de tokens.

Le piège à éviter : inviter pour de petits ajustements visuels (« rendre le titre légèrement plus grand », « réduire le rembourrage sur la carte ») que le panneau Tweaks gère instantanément. Chaque invite d'ajustement vague que vous évitez est un cycle de correction dans lequel vous n'entrez jamais.

### Stratégie 3 : Invites denses par lot

Les invites vagues génèrent des chaînes de correction. Une seule demande vague devient cinq tours : sortie initiale, votre correction, tentative de Claude, une autre correction, sortie finale. Cinq tours coûtent cinq à dix fois les tokens d'un seul tour dense.

Structure pour une invite dense par lot :

- Ce qui change : énumérez 3-5 modifications spécifiques en un paragraphe
- Ce qui reste fixe : ancrez explicitement tout ce qui ne doit pas bouger (« gardez la nav de la barre latérale, gardez la hauteur du héros, gardez toute la typographie inchangée »)
- Critères de succès : décrivez à quoi le résultat devrait ressembler lorsqu'il est correct
- Évitements explicites : nommez les anti-modèles vers lesquels Claude pourrait dériver (« pas lourd en cartes, pas d'en-têtes serif, pas de fonds dégradés »)

Les premiers brouillons denses réussissent environ 66 % du temps à la première tentative. Les invites vagues se divisent en 5 tours de correction ou plus avec une fréquence élevée.

Écrivez votre invite dans un éditeur de texte avant de la coller. Si cela prend moins de 30 secondes à écrire, c'est probablement trop vague.

### Stratégie 4 : Déclencheurs de réinitialisation de session

Les longues sessions accumulent des frais généraux contextuels. À chaque tour, Claude relit tout l'historique de conversation. À la tournée 15, vous payez une taxe contextuelle croissante à chaque invite, et la qualité de la sortie se dégrade souvent à mesure que la session perd sa cohérence.

Réinitialisez lorsque l'une de ces conditions est vraie :

- Vous passez d'une tâche non liée à une autre (tableau de bord terminé, démarrage de la page de destination)
- La session a passé 10-12 invites
- La qualité de la sortie se dégrade visiblement — les composants s'écartent de la marque, Claude ignore les contraintes que vous avez fixées plus tôt

Procédure de réinitialisation :

1. Écrivez une amorce de session de 2 phrases : quel est le système de conception (couleurs, typographie, contraintes clés) et ce que vous construisez maintenant.
2. Ouvrez une session fraîche. Collez l'amorce comme votre premier message.
3. Continuez d'où vous aviez laissé.

Même qualité de sortie. Coût en tokens significativement inférieur par tour. Pas de surcharge contextuelle.

### Stratégie 5 : Économie des téléchargements d'images

Les téléchargements d'images sont le type d'entrée le plus coûteux dans les sessions Claude Design. Utilisez-les intentionnellement.

Quand télécharger des images :

- Captures d'écran de produits finis pendant la configuration de la Session 0 — non négociable. Claude apprend plus en voyant un produit réel qu'en lisant des documents de spécification. C'est le seul endroit où le coût de téléchargement a un ROI clair.
- Captures d'écran de référence lorsque vous avez besoin que Claude corresponde à un traitement visuel spécifique qu'il ne peut pas déduire à partir de la description.

Quand utiliser le texte à la place :

- Croquis bruts et wireframes — décrivez la disposition en texte. « Grille à trois colonnes, icône à gauche, titre et corps à droite, pas d'images » est aussi efficace qu'un upload de croquis et coûte une fraction des tokens.
- Concepts de disposition — les relations spatiales sont descriptibles. Réservez les uploads pour les traitements visuels (couleur, texture, style d'illustration) que le texte ne peut pas capturer.

Si vous téléchargez un croquis pour expliquer une disposition, écrivez plutôt la description de la disposition.

### Stratégie de niveau d'abonnement

**Utilisateurs Pro** — traitez Claude Design comme des exécutions de production planifiée, pas un bac à sable. Chaque session devrait avoir un objectif de sortie défini avant d'ouvrir l'outil. La configuration du système de conception en Session 0 est obligatoire avant de démarrer n'importe quel projet réel. Utilisez le panneau Tweaks de manière agressive. Budgétisez les invites par session avant de commencer.

**Max 5×** — une attention modérée est toujours justifiée. Utilisez le panneau Tweaks en premier avant d'inviter. Regroupez les changements connexes. Réinitialisez les sessions lors du changement de tâches principales. Vous avez plus de marge de manœuvre que Pro mais pas illimité.

**Max 20×** — la pression des tokens est minimale. Concentrez-vous entièrement sur la qualité de la sortie : des invites plus longues avec plus de détails, plus d'itérations pour obtenir le bon traitement visuel. Les stratégies ci-dessus produisent toujours de meilleures sorties, mais vous n'êtes pas pénalisé de les ignorer.

## Exemple

Un utilisateur Pro planifiant trois projets connexes : un tableau de bord de produit, une page de destination marketing et une présentation d'investisseurs. Les trois ont besoin de partager la cohérence de la marque.

**Mauvaise séquence** — démarrez le tableau de bord directement, obtenez une dérive de marque, passez 30 % de la session à corriger les couleurs et la typographie, exportez, démarrez la page de destination, répétez les mêmes corrections.

**Bonne séquence :**

Session 0 — Configuration du système de conception. Téléchargez les captures d'écran du produit + fichiers de marque. Extrayez l'ensemble complet des tokens. Exportez une amorce de session de 200 mots (couleurs, typographie, espacement, conventions de composants). Coût estimé en tokens : une session complète.

Session 1 — Tableau de bord. Collez l'amorce de session comme premier message. Écrivez une invite dense couvrant la disposition complète : nav de la barre latérale, tableau de données, cartes de statistiques, en-tête. Passez 20 minutes dans Tweaks en ajustant l'espacement et la typographie avant de demander à nouveau. Utilisez 2-3 invites de chat au total. Réinitialisez la session lors du passage à la section suivante.

Session 2 — Page de destination. Même amorce. Une invite dense pour le héros, la section des fonctionnalités et l'appel à l'action. Tweaks pour l'affinage. Maximum 3-4 invites de chat.

Session 3 — Présentation d'investisseurs. Même amorce. Une invite dense par groupe de diapositives (diapositives d'introduction, diapositives de produit, finances, conclusion). Aucun upload d'image — décrivez les dispositions de diapositives en texte.

Coût total des tokens avec cette séquence : nettement inférieur à trois sessions non séquencées, avec une sortie de marque cohérente sur les trois projets.
