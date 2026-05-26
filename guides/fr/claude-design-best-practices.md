# Claude Design — Bonnes pratiques en production

Ce guide couvre ce que la documentation officielle ne couvre pas : les patterns issus de l'expérience en production. Claude Design s'exécute sur Opus 4.7, le modèle le plus capable et le plus coûteux en tokens de la gamme Claude. Cela change la façon dont vous devriez aborder chaque session.

---

## Économie des tokens

### Le problème

Claude Design déploie Opus 4.7 pour chaque génération. Opus 4.7 n'est pas un modèle léger — c'est la même classe de modèle utilisée pour le raisonnement complexe et le travail sur documents longs. En pratique :

- 50-58% du quota hebdomadaire d'un plan Pro disparaît après deux sessions modérément complexes
- Un relecteur créant trois variations de page d'accueil a atteint 80% de son allocation hebdomadaire en 25 minutes
- Une session explorant cinq directions visuelles peut coûter autant qu'une après-midi complète de travail avec Claude Code

Ce n'est pas une plainte — Opus 4.7 produit des brouillons initiaux matériellement meilleurs que les modèles plus petits, et les économies de temps sont réelles. Mais traiter Claude Design comme un carnet de croquis sans limites détruira votre quota avant la fin de la semaine.

### Les cinq stratégies qui fonctionnent réellement

**Stratégie 1 : Construisez un système de design une fois, héritez-le sur chaque projet.**

C'est l'action avec le meilleur retour sur investissement que vous pouvez entreprendre dans Claude Design. Une session de configuration du système de design est coûteuse au départ — vous payez pour faire lire votre codebase par Opus 4.7, extraire vos tokens et comprendre vos conventions de composants. Mais chaque session de projet suivante contourne entièrement ce travail d'inférence. Le modèle connaît déjà votre palette de couleurs, votre échelle typographique, votre rythme d'espacement et votre vocabulaire de composants. Sans cela, chaque session démarre à zéro, et Claude Design revient à ses défauts — qui sont immédiatement reconnaissables comme une sortie générique Claude.

Le coût unique économise des tokens sur chaque projet futur. Si vous construisez plus de deux projets dans Claude Design, cet investissement se rentabilise d'ici la troisième session.

**Stratégie 2 : Utilisez le panneau Tweaks avant de rédiger une requête.**

Le panneau Tweaks — curseurs typographiques, contrôles de couleur, bascules d'espacement et de disposition — ne consomme aucun token de chat. C'est la capacité la plus sous-utilisée dans Claude Design. Une erreur courante est de rédiger « agrandissez le titre » ou « augmentez l'espacement entre les sections » alors que ces ajustements exacts sont disponibles comme des contrôles de panneau gratuits.

Avant d'écrire une quelconque requête d'affinement, épuisez le panneau Tweaks. Si l'ajustement y est, utilisez-le. Réservez les requêtes de chat pour les changements structuraux, les changements de contenu et les choses que le panneau ne peut pas gérer — nouveaux composants, réorganisation de disposition, exploration de variantes.

**Stratégie 3 : Écrivez des requêtes denses et groupées.**

Trois requêtes connexes dans un paragraphe coûtent à peu près autant qu'une seule requête. Trois messages distincts coûtent trois fois plus cher et chacun ajoute une surcharge de contexte aux messages suivants.

Au lieu de :
```
Agrandissez la section héros.
```
```
Changez aussi le CTA pour utiliser notre bleu primaire.
```
```
Et ajoutez un sous-titre sous le titre principal.
```

Écrivez :
```
Section héros : augmentez l'espacement vertical pour donner au titre plus d'espace,
changez le bouton CTA pour utiliser le bleu de marque primaire (#0057FF), et ajoutez une ligne
de sous-titre de 16px sous le H1 principal décrivant le produit en une phrase.
```

Cette approche réduit également la probabilité que Claude Design mal interprète une instruction qui contredit une précédente — quand l'intention complète est visible en une seule passe, le modèle résout les conflits lui-même.

**Stratégie 4 : Réinitialisez les sessions de manière proactive.**

Une session Claude Design accumule du contexte au fur et à mesure qu'elle s'exécute. Les premiers messages, les variantes rejetées et les cycles de correction restent tous dans la fenêtre de contexte. À partir du message 15 de la session, vous payez pour retraiter tout ce contexte à chaque génération — même si les premières itérations ne sont pas pertinentes pour votre objectif actuel.

Quand vous avez validé une direction et souhaitez continuer à affiner un composant ou une section spécifique, démarrez une session fraîche. Apportez un résumé serré de ce que vous avez établi (votre fichier système de design, une capture d'écran de la direction approuvée, et un brief d'un paragraphe). La session fraîche coûte moins par génération et produit une sortie plus propre parce que le modèle ne travaille pas autour d'un historique encombré.

**Stratégie 5 : Utilisez des outils externes pour esquisser avant de charger.**

Les chargements d'images sont coûteux en contexte. Un esquisse de mise en page brute de Google Stitch, une maquette filaire dans n'importe quel outil, ou même une description de disposition en ASCII en texte brut donne à Claude Design l'intention spatiale sans le coût du traitement d'une image haute résolution dans le premier message.

Décrivez la structure en texte : « Grille à trois colonnes sur desktop, une seule colonne sur mobile. Colonne de gauche : logo + navigation. Centre : titre héros + CTA. Droite : capture d'écran du produit. » Cela produit souvent un meilleur brouillon initial qu'un chargement d'image peu clair et coûte une fraction du contexte.

---

## Éviter l'« esthétique Claude »

### À quoi ça ressemble

Sans contraintes de design, Opus 4.7 entraîné sur un large corpus de défauts de conception web revient par défaut à une empreinte visuelle reconnaissable : les titres sérif appairés avec le texte du corps sans-sérif, les mises en page lourdes en cartes avec des ombres subtiles, les barres d'accent colorées sur le côté gauche des sections, et une palette de couleurs pastel étouffée. C'est compétent. C'est aussi immédiatement identifiable comme une sortie générée par l'IA pour quiconque a utilisé ces outils pendant plus d'une semaine.

Cette esthétique par défaut n'est pas mauvaise — elle est juste générique. Si la généricité fonctionne pour votre projet, ignorez cette section. Si vous avez besoin d'une sortie distinctive, le défaut nécessite une suppression active.

### Les techniques qui fonctionnent

**Chargez les captures d'écran des produits finis, pas les spécifications de marque.**

Les directives de marque décrivent les règles. Les captures d'écran finis montrent les résultats visuels. Claude Design apprend plus en voyant comment votre marque se présente réellement en production qu'en lisant les règles de hiérarchie typographique. Chargez une capture d'écran de votre page d'accueil en direct, votre email marketing le plus poli, ou votre diapositive de pitch deck la plus récente. Cela donne au modèle une preuve visuelle concrète de ce que votre marque se résout à en pratique.

**Référencez les esthétiques culturelles avec spécificité.**

Les références esthétiques génériques (« moderne », « épuré », « professionnel ») produisent l'interprétation de Claude de ces termes, ce qui revient à l'esthétique par défaut. Les esthétiques culturelles spécifiques donnent au modèle un vocabulaire visuel concret sur lequel travailler :

- « Design éditorial suisse — Neue Haas Grotesk, interligne serré, grille forte, haut contraste, pas d'éléments décoratifs »
- « Brutalisme d'impression des années 1980 — bordures noires épaisses, polices de caractères industrielles, hiérarchie d'information dense »
- « Solarpunk — tons terreux chauds, courbes organiques, langage visuel centré sur la communauté »
- « Minimalisme scandinave — palette naturelle étouffée, espace blanc généreux, fonctionnel plutôt que décoratif »

Ces références contraignent le modèle à une tradition visuelle spécifique. La sortie peut nécessiter un affinement, mais elle commence quelque part distinctif.

**Niez explicitement les défauts dans votre brief.**

Déclarez ce que vous ne voulez pas aussi clairement que ce que vous voulez. Ajoutez un bloc de contrainte à chaque requête initiale :

```
Ne pas utiliser : mises en page de cartes, barres d'accent colorées, arrière-plans pastel, appairages
de titres sérif/sans-sérif, ou sections héros centrées avec un seul CTA. Faites des choix qui
se sentent spécifiques au contexte de ce produit, pas aux défauts SaaS startup génériques.
```

Les contraintes de négation ne sont pas défensives — elles portent du poids. Sans elles, le modèle remplit les décisions sans contrainte avec des défauts.

**Demandez explicitement des choix distinctifs et contextuels.**

Instruisez le modèle à raisonner sur le contexte du produit lors de la prise de décisions visuelles. « Choisissez une typographie qui reflète ce que fait ce produit — un outil développeur, un tableau de bord financier, une application de remise en forme grand public — pas ce que les sites de design génériques recommandent. » Ce pattern de requête produit une sortie qui essaie d'être contextuelle appropriée plutôt que esthétiquement sûre.

---

## Techniques de rédaction de requêtes

### Ce qui fonctionne réellement

**Les requêtes denses d'un seul paragraphe produisent un brouillon utilisable à peu près 66% du temps.** Les 34% restants nécessitent une passe d'affinement ciblée. L'itération vague multi-passe — « rends-le meilleur », « essaie quelque chose de différent », « je n'aime pas ça » — produit une sortie médiocre et coûteuse en contexte.

**Le pattern des trois versions.** Demandez des variantes à l'avance plutôt que d'itérer séquentiellement :

```
Générez trois versions de cette section héros de page d'accueil. Chaque version devrait prendre
une direction visuelle significativement différente — structure de disposition différente, pas juste
couleurs différentes. Nommez-les A, B et C.
```

Claude Design rend les trois en une seule passe. Vous identifiez ensuite les meilleurs éléments de chacune et composez une synthèse :

```
Appliquez la typographie et la hiérarchie de titre de la version A à la structure de disposition de la version B.
Conservez le traitement du bouton CTA de la version C.
```

C'est plus rapide et moins cher que l'itération séquentielle, et cela produit de meilleurs résultats parce que vous travaillez à partir d'une gamme d'options plutôt que de pousser graduellement une direction.

**Commentaires en ligne pour une précision ciblée.** Cliquez sur un élément, ajoutez un commentaire, décrivez exactement quels changements pour cet élément seulement. Cela limite la portée de génération — le modèle sait que vous ne demandez pas une redéfinition complète. Utilisez ceci pour les ajustements typographiques, les corrections de couleur, les corrections d'espacement et les changements de copie.

Comportement connu : les commentaires en ligne disparaissent occasionnellement de l'interface après génération. Si cela se produit, collez le contenu du commentaire dans le chat en tant que requête de suivi ciblée plutôt que de recommencer.

**Mode dessin pour la restructuration de disposition.** Quand vous devez repositionner les sections principales — déplacez la barre latérale de gauche à droite, déplacez la nav de haut en bas, créez une disposition en écran partagé — utilisez le mode Dessin pour indiquer l'intention spatiale directement. Le dessin est plus rapide que de décrire les relations spatiales en texte et produit des changements de disposition plus précis que les requêtes de chat pour les mouvements structuraux.

**Bascule d'aperçu d'appareil.** Basculez entre les vues téléphone, tablette et desktop à tout moment. Cela ne coûte aucun token. Avant de requêter des corrections responsives, vérifiez si le problème est réellement visible dans le point d'arrêt actuel — de nombreux problèmes responsives qui semblent graves au desktop sont déjà traités au mobile, ou vice-versa.

### Ce à spécifier dans votre brief initial

Chaque forte requête initiale inclut :

- **Critères de succès** : à quoi ressemble « terminé » ? (« La section héros devrait communiquer la proposition de valeur du produit sans exiger que l'utilisateur scroll »)
- **Contraintes de sortie** : format, dimensions, nombre de composants, longueur du contenu
- **Ce qui reste fixe** : « Conservez la structure de navigation exactement comme décrit — ne pas ajouter ou supprimer d'éléments de navigation »
- **Ce qui peut changer** : « La palette de couleurs, la typographie, l'espacement et l'ordre des sections sont tous ouvert »
- **Un ou deux non-négociables** : « Le CTA principal doit être visible au-dessus de la ligne de flottaison sur desktop »

### Ce à éviter

- Adjectifs subjectifs sans référents : « plus premium », « se sent digne de confiance », « semble moderne » — tous interprétés par les priors du modèle
- Contraintes contradictoires sans résolution : « minimal mais riche en informations » — spécifiez lequel gagne quand ils entrent en conflit
- Requêtes de structure ouvertes en fin de session : demander une restructuration de disposition complète après 10 messages d'affinement produit une sortie coûteuse et souvent incohérente
- Boucles de correction sans direction claire : « Je n'aime pas ça » sans spécifier ce qui ne va pas gaspille une passe de génération

---

## Gestion des sessions

Traitez chaque session Claude Design comme un travail de production planifié, pas comme une exploration sans limites. Le coût en tokens rend les sessions non structurées chères. Les sessions avec une portée claire et une préparation produisent une meilleure sortie à un coût inférieur.

### Avant la session

Listez chaque composant ou section que vous devez produire dans cette session. Écrivez-les. Groupez les composants connexes en une seule requête où possible — un composant carte et son état vide sont une requête, pas deux.

Décidez quels actifs vous chargez. Fichier système de design, captures d'écran de référence, fichier token de codebase — assemblez-les avant de démarrer. Charger en milieu de session ajoute une surcharge de contexte.

Définissez la sortie que vous devez valider la direction. Vous n'avez pas besoin d'une sortie parfaite en pixels pour confirmer que vous allez dans la bonne direction. Connaissez le minimum qui vous dit que l'approche fonctionne, et arrêtez de raffiner quand vous l'atteindrez.

### Pendant la session

Utilisez le panneau Tweaks d'abord. Toujours. Vérifiez si l'ajustement que vous voulez est disponible en tant que curseur gratuit avant de rédiger une requête.

Groupez les modifications connexes. Si vous avez trois affinements en attente, écrivez-les tous dans un message.

Surveillez la longueur de votre session. Après 10-12 échanges de messages, considérez si une session fraîche serait plus rapide. Si vous générez un composant ou une direction fondamentalement nouveau, c'est presque certainement le cas.

### Quand exporter

Exportez quand :
- La direction visuelle est validée (un examen par les parties prenantes ou auto-examen a confirmé l'approche)
- La disposition de base et la hiérarchie d'information sont établies
- La structure des composants est assez claire pour que Claude Code puisse raisonner à ce sujet

Ne pas exporter quand :
- Vous explorez toujours des directions fondamentalement différentes
- D'importants changements structuraux restent
- Vous faites des affinements itératifs qui pourraient être faits moins cher dans Claude Code directement

Le paquet d'échange n'est pas une spécification parfaite en pixels. Claude Code l'adaptera pour le comportement responsive, les conventions de la bibliothèque de composants et les contraintes de production. S'attendre à une sortie parfaite en pixels de Claude Design avant de remettre ajoute du coût sans valeur proportionnelle.

### Après export

Ne réexportez pas après le début de l'implémentation. Les modifications après la remise se font dans Claude Code directement — la réexportation crée une deuxième source de vérité et casse la relation conception-à-code. Si un grand changement de conception est nécessaire après la remise, traitez-le comme une nouvelle session de conception pour ce composant spécifique, pas une réexportation complète.

---

## Configuration du système de design

Cette section mérite un traitement propre parce qu'elle est l'action unique la plus susceptible d'améliorer à la fois la qualité de sortie et l'efficacité des tokens pour les équipes utilisant Claude Design sur plusieurs projets.

### Pourquoi c'est important

Sans un système de design dans Claude Design, chaque session produit une sortie calibrée sur les conventions de conception web génériques. Le modèle ne connaît pas votre palette de couleurs, votre échelle typographique, votre vocabulaire de composants ou votre rythme d'espacement. Il revient à son esthétique entraînée. Vous dépensez des tokens pour le corriger vers votre marque sur chaque session.

Avec un système de design, chaque session commence en marque. Le modèle connaît vos tokens et peut les appliquer sans correction. Les passes d'affinement se concentrent sur la disposition et le contenu plutôt que l'alignement de marque.

### Ce à charger

Chargez dans cet ordre de priorité :

1. Votre fichier `tokens.json` ou fichier CSS custom properties — les définitions de token lisibles par machine direct sont l'entrée la plus fidèle
2. Votre `tailwind.config.js` ou configuration de thème équivalente — donne à Claude Design vos mappages de classe utilitaire et points d'arrêt
3. Captures d'écran terminées de votre produit en direct ou version la plus récente — preuve visuelle de ce que votre marque se résout à en pratique
4. Votre URL Storybook ou captures d'écran de composants — établit quels composants existent déjà et à quoi ils ressemblent
5. Votre PDF de marque ou guide de style — pour le ton, l'utilisation du logo et les règles de hiérarchie typographique

### Ce que Claude Design extrait

À partir de ces entrées, Claude Design extrait :
- Tokens de couleur avec dénomination sémantique (primaire, secondaire, destructif, étouffé, etc.)
- Échelle typographique (rampe de taille, conventions de poids, règles de hauteur de ligne)
- Système d'espacement (votre unité de base, valeurs d'espacement communes)
- Conventions de composants (noms de composants existants, variantes, états)
- Grille et patterns de disposition (nombres de colonnes, largeurs de gouttière, contraintes de max-width)

### Validation de la configuration

Avant d'utiliser le système de design dans les sessions de production, générez un composant de test — quelque chose de simple et bien défini, comme un bouton dans tous les états ou un composant carte. Vérifiez si la sortie reflète avec précision vos tokens de marque et conventions de composants. Si non, identifiez ce qui manque de vos chargements et affinez la configuration avant de continuer.

La validation coûte des tokens. Budget pour une session de test par configuration de système de design.

### Maintenance

Quand votre système de design évolue — de nouveaux tokens de couleur, de nouveaux patterns de composants, typographie mise à jour — mettez à jour vos fichiers de configuration Claude Design pour correspondre. Une configuration de système de design stale produit une sortie qui diverge de votre conception de production actuelle au fil du temps.

---

## Exploration de variantes

### Demandez les variantes à l'avance

Demander trois variantes dans la requête initiale coûte à peu près autant que de demander une — Claude Design rend toutes les trois en une seule passe de génération. L'exploration de variantes séquentielle (générez une, rejetez-la, générez une autre) coûte trois fois plus cher et accumule une surcharge de contexte.

### Mélange de variantes

Après avoir examiné trois variantes, utilisez le panneau Tweaks et les requêtes de chat ciblées pour mélanger les fonctionnalités de différentes versions. C'est gratuit pour les propriétés d'ajustement de panneau et pas cher pour les changements dirigés par le chat parce que la portée est étroite et l'intention est claire.

Documentez ce que vous prenez de chaque version avant de faire des changements : « Traitement de couleur de la version A, structure de disposition de la version B, hiérarchie CTA de la version C. » Ce brief est aussi utile pour l'annotation du paquet d'échange.

### Document avant de fermer

Avant de terminer une session, notez :
- Quelle direction a été sélectionnée et pourquoi
- Ce qui a été rejeté et pourquoi
- Quels affinements restent pour la prochaine session
- Toutes les décisions de conception qui nécessitent un examen des parties prenantes

Cette documentation vit en dehors de Claude Design (une note, un fichier projet, un brief). L'historique de session Claude Design n'est pas un enregistrement de conception fiable.

---

## Données de productivité réelles

La recherche communautaire chez les freelancers, les agences et les équipes produit utilisant Claude Design en 2025-2026 a produit ces points de référence. Ces chiffres varient selon la complexité du projet et l'expérience du designer, mais les patterns directionnels sont cohérents.

| Tâche | Sans Claude Design | Avec Claude Design | Économies |
|------|----------------------|-------------------|---------|
| Prototype produit (3-5 écrans) | 14 heures | 3,5 heures | 75% |
| Livraison de projet freelance | Baseline | 3,8x plus rapide | — |
| Préparation de remise client d'agence | Baseline | 62% plus rapide | — |
| Page d'accueil (idée à HTML déployable) | Plusieurs jours | 45 minutes | — |
| Pitch deck (présentation complète) | 4-6 heures | Moins de 30 minutes | — |
| Flux d'application mobile (3-5 écrans) | 1-2 jours | 1-2 heures | — |

Ces chiffres représentent les économies de temps, pas l'équivalence de qualité. La sortie Claude Design nécessite typiquement du travail d'implémentation dans Claude Code pour la préparation de production. Les économies sont dans l'exploration, l'alignement et la direction validée — pas les actifs de production finis.

---

## Quand Claude Design échoue

Comprendre les modes de défaillance avant de les atteindre économise du temps et du quota.

**Absence d'un système de design.** C'est le mode de défaillance le plus courant. Sans un système de design, Claude Design ne peut pas produire une sortie en marque. Chaque session nécessite des corrections de restyle complètes. Les équipes qui ignorent la configuration du système de design dépensent leurs tokens de session en correction de marque plutôt que l'exploration de conception. Si vous avez besoin d'une sortie en marque et ne pouvez pas configurer un système de design, Claude Design n'est pas l'outil approprié pour ce projet.

**Briefs excessivement complexes avec des contraintes contradictoires.** Un brief avec 10+ exigences spécifiques qui entrent en conflit les unes avec les autres produit une sortie qui ne satisfait aucune d'elles. Le modèle résout les contradictions selon ses priors d'entraînement, pas votre intention. Si votre brief a plus de 6-7 contraintes dures, classez-les par priorité explicitement et déposez les moins prioritaires de la requête initiale.

**Visualisation de données.** Claude Design priorise la qualité esthétique plutôt que l'utilisabilité des données dans la sortie des graphiques et diagrammes. Un diagramme en barres sera beau. Les étiquettes d'axe peuvent être illisibles à l'échelle, les choix de couleur peuvent être inaccessibles, et le ratio données-à-encre peut être mauvais. Si vous générez une visualisation de données, ajoutez des requêtes de correction explicites : « Priorisez la lisibilité et l'accessibilité plutôt que l'esthétique. Assurez-vous que toutes les étiquettes sont lisibles à cette résolution. »

**Illustrations personnalisées.** Claude Design n'est pas un outil d'illustration. Il peut placer des éléments de style illustration et suggérer des concepts d'illustration, mais le travail d'illustration personnalisée précis — icônes personnalisées, mascottes de marque, infographies complexes — nécessite un véritable outil de design. Utilisez Claude Design pour spécifier le brief d'illustration, puis exécutez dans Figma, Illustrator ou un outil d'illustration IA spécialisé.

**Workflows d'examen d'équipe et multiplayer.** Claude Design n'a pas de collaboration en temps réel. Une personne conduit la session. Si votre équipe a besoin d'édition simultanée, fils de commentaires, historique de version accessible à plusieurs parties prenantes ou mesures en Mode Dev — utilisez Figma. Claude Design ne concurrence pas Figma en collaboration.

---

## Remise à Claude Code — Le moment idéal

La décision de remise est où la plupart du temps est perdu. Les équipes exportent soit trop tôt (avant que la direction soit claire, causant des retravaux) soit trop tard (dépensant des tokens à parfaire en pixels dans Claude Design quand Claude Code le gérerait en minutes).

### Exportez quand c'est vrai

- **Direction visuelle validée** : au moins une partie prenante (ou vous, pour les projets solo) a confirmé que l'approche est correcte
- **Disposition de base établie** : la hiérarchie d'information, la structure des sections et le flux utilisateur principal sont clairs
- **Structure des composants claire** : Claude Code peut raisonner sur quels composants existent et comment ils se relatent
- **Contenu assez proche** : le contenu placeholder va bien ; la structure et le dimensionnement relatif des zones de contenu sont établis

### Ne pas exporter quand

- Vous explorez toujours si une approche fondamentalement différente est meilleure
- La conception a de grandes questions structurales non résolues (« devrait-ce être une barre latérale ou une nav en haut ? » est une question structurale — résolvez-la avant de remettre)
- Vous faites de petits affinements itératifs que Claude Code gère moins cher directement

### Ce qui se passe à la remise

Le paquet de remise contient les specs de disposition, les tokens de design, les annotations de composants et les notes de point d'arrêt responsive. Claude Code l'utilise pour implémenter la conception — mais il adaptera la disposition pour les vraies bibliothèques de composants, le vrai comportement des points d'arrêt et les contraintes de production. Une certaine déviation du design visuel est attendue et correcte. Traitez le paquet comme un brief fort, pas une spécification parfaite en pixels.

Après le début de la remise, modifiez dans Claude Code. Ne réexportez pas et ne remettez pas pour les changements incrémentiels — cela crée deux sources de vérité et rend l'implémentation plus difficile à maintenir.

---

## Checklists

### Avant votre première session

- [ ] Fichiers système de design assemblés : `tokens.json` ou variables CSS, `tailwind.config.js` ou config de thème
- [ ] Captures d'écran de référence collectées : produit en direct, conceptions les plus récentes, exemples clés de marque
- [ ] Session de configuration système de design complétée et validée avec un composant de test
- [ ] Portée de session définie : liste de composants ou écrans que cette session produira
- [ ] Brief écrit : critères de succès, contraintes de sortie, non-négociables, ce qui peut changer
- [ ] Esquisse de disposition externe faite (optionnel) : structure brute décrite en texte ou esquissée dans Google Stitch

### Checklist par session

- [ ] Panneau Tweaks vérifié avant de rédiger des requêtes d'affinement
- [ ] Requêtes groupées : changements connexes combinés dans des messages uniques
- [ ] Exploration à trois versions utilisée pour le premier brouillon de nouveaux composants
- [ ] Longueur de session surveillée : session fraîche démarrée si l'historique vieillit
- [ ] Commentaires en ligne utilisés pour une précision au niveau des éléments plutôt que des requêtes de génération complète
- [ ] Directions rejetées documentées (ce qui a été essayé, pourquoi c'a été rejeté)

### Avant de remettre à Claude Code

- [ ] Direction visuelle validée (approbation des parties prenantes ou auto-examen complété)
- [ ] Disposition de base et hiérarchie d'information établies
- [ ] Structure des composants claire : ce qui existe, ce qui est imbriqué, ce qui est un élément autonome
- [ ] Paquet de remise exporté et examiné : confirmer que `layout.json`, `tokens.json`, `components.md` et `preview.png` sont présents
- [ ] Notes d'implémentation ajoutées au paquet : tout ce que Claude Code devrait savoir qui n'est pas visible dans la spec de disposition
- [ ] Équipe informée : quiconque touchant le codebase sait que la remise est en cours et où le paquet réside
