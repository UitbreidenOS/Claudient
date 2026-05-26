# Claude Design — Capacités Frontier

## Quand activer

- Construire des expériences interactives qui vont au-delà de l'interface utilisateur standard — 3D, audio, effets de particules ou animation immersive
- La présentation des ressources ou la démo de produit a besoin d'éléments interactifs en direct plutôt que de captures d'écran statiques
- Prototyper des interfaces vocales ou des visualisations basées sur WebGL avant de s'engager dans une implémentation complète
- Créer des pages de destination marketing où la distinction visuelle est plus importante que la compatibilité du framework
- La démo des parties prenantes nécessite une URL partageable avec mouvement et interactivité, pas seulement une image maquette

## Quand NE PAS utiliser

- Interface utilisateur d'application commerciale standard — utiliser la compétence claude-design de base et exporter vers Claude Code
- Expériences 3D de qualité production où la qualité doit correspondre aux normes commerciales — utiliser Three.js ou Unity directement
- Lorsque la compatibilité du navigateur client est une exigence — les capacités frontier nécessitent des navigateurs modernes (Chrome 110+, Safari 16.4+, Firefox 115+) ; les environnements d'entreprise plus anciens auront des problèmes
- Lorsque le livrable est un fichier vidéo téléchargeable — la vidéo animée s'exporte en tant qu'URL partageable uniquement ; le téléchargement MP4 n'est pas supporté
- Lorsque le projet est déjà dans Claude Code et la direction du design est verrouillée — itérer dans le code, pas dans Claude Design

## Instructions

### Éléments interactifs 3D

Claude Design génère des éléments 3D interactifs à l'aide de WebGL. Ceux-ci sont intégrés dans le HTML exporté et fonctionnent sans dépendances supplémentaires.

Motifs supportés :
- Visualisations de globe avec rotation par glissement, zoom par scroll et info-bulles au survol pour les superpositions de données
- Vitrines de produits avec contrôles orbitaux et changements de matériaux ou de couleurs
- Formes abstraites 3D pour les sections héros (sphères, tori, blobs morphes)
- Sculptures de données — graphiques 3D, nuages de points, graphiques de réseau en trois dimensions

Modèle d'invite :

```
"Generate an interactive 3D globe showing [data]. Include: rotation on drag,
zoom on scroll, tooltip on hover showing [data fields], [color scheme].
Export as interactive HTML."
```

Limitation : les formes personnalisées complexes avec une géométrie irrégulière ont des bords rugueux. La capacité fonctionne mieux pour les primitives 3D courantes et les types de visualisation bien connus (globes, cylindres de produits, sphères abstraites). N'essayez pas les mailles hautement détaillées — confiez-les à une implémentation Three.js dans Claude Code.

### Interfaces vocales

Claude Design génère des maquettes et des prototypes d'interface vocale. Le traitement vocal est simulé dans le prototype — l'animation des formes d'onde, les transitions d'état et le rendu des réponses sont réels ; le traitement audio réel doit être câblé dans Claude Code à l'aide de l'API Web Audio ou d'un SDK de fournisseur.

Motifs supportés :
- Bouton microphone à maintenir enfoncé avec forme d'onde animée pendant l'état d'enregistrement
- Flux vocaux-à-action : une commande parlée déclenche une transition d'interface utilisateur ou un rendu de résultat
- Interfaces de podcast et d'entrevue avec contrôles de lecture et affichage de transcription synchronisée
- Interfaces de recherche vocale avec état de chargement animé et rendu de liste de résultats

Modèle d'invite :

```
"Design a voice interface for [use case]. Include: mic button with hold-to-talk
interaction, animated waveform during recording, processing/thinking state,
response display area for [result type]. Color: [palette]."
```

Limitation : tous les états vocaux du prototype sont des simulations déclenchées par clic. Pour câbler la voix réelle : exportez le bundle Claude Code, implémentez `getUserMedia()` ou votre SDK vocal dans Claude Code, et mappez les événements du SDK aux classes d'état déjà dans le HTML généré.

### Shaders WebGL et effets de particules

Pour les sections héros visuellement distinctives et les traitements d'arrière-plan. Ceux-ci s'exportent en HTML autonome avec WebGL intégré ; aucune étape de construction requise.

Motifs supportés :
- Systèmes de particules : nœuds flottants, graphique de réseau connecté, mouvement fluide
- Animations de dégradés : dégradés de maille, effets aurore, champs de bruit animés
- Champs de particules interactifs qui répondent à la position et au mouvement de la souris
- Arrière-plans géométriques ombrés — poly bas, voronoi, distorsion d'onde

Modèle d'invite :

```
"Create a hero background with a particle network effect. Approximately 150
particles, connected by lines when within 120px of each other, respond to
mouse movement with a gentle pull force. Color palette: [primary] on [background].
Subtle animation, not distracting."
```

Exporter : HTML interactif. Remettez à Claude Code pour le nettoyage de production — remplacez `<script>` en ligne par un module, déplacez l'initialisation du canevas dans un hook du cycle de vie des composants, et ajoutez une vérification de la requête multimédia `prefers-reduced-motion`.

### Scènes vidéo animées

Séquences animées multi-scènes pour les procédures pas à pas de produits, les animations d'explication et les histoires de données.

Motifs supportés :
- Procédure pas à pas de produit : interface annoté avec animations de projecteur et révélations étape par étape
- Séquences d'explication : animations d'icônes, révélations de texte, transitions de diapositives
- Animations d'histoires de données : graphiques et graphiques qui se construisent au fil du temps avec texte de narration synchronisé

Chemin d'exportation : URL partageable uniquement. Pour capturer en vidéo, utilisez un enregistreur d'écran (QuickTime, OBS ou Loom) pointé vers l'URL partagée. Pour intégrer dans un site Web, utilisez une iframe à partir de l'URL partagée. Le téléchargement MP4 n'est pas disponible — ne le promettez pas aux clients.

Modèle d'invite :

```
"Create a 4-scene animated walkthrough of [product]. Scene 1: [description].
Scene 2: [description]. Scene 3: [description]. Scene 4: [description].
Transitions: slide in from right. Duration: approximately 8 seconds per scene.
Brand colors: [hex values]."
```

### Expériences interactives complètes

Combinaisons de plusieurs éléments frontier dans un seul prototype. Ceux-ci sont expérimentaux — attendez-vous à plus de cycles d'itération que les sorties à capacité unique.

Combinaisons viables :
- Entrée vocale + réponse de visualisation 3D (parlez une requête, le graphique 3D se met à jour)
- Arrière-plan WebGL + liaison de données en direct (densité de particules pilotée par une entrée de nombre)
- Sections vidéo animées + contrôles interactifs en ligne

Stratégie d'invite pour les expériences combinées : construire chaque capacité séparément, la valider, puis demander la combinaison. Tenter une expérience entièrement combinée dans une seule invite augmente la chance d'erreurs structurelles dans la sortie.

### Stratégie d'exportation pour les conceptions Frontier

| Livrable | Chemin d'exportation | Quand utiliser |
|---|---|---|
| HTML interactif | Télécharger depuis Claude Design | Démos du navigateur, déploiement direct, intégration iframe |
| Remise Claude Code | Bundle d'exportation | Implémentation de production avec API réelles |
| Enregistrement d'écran | Enregistrer l'URL partagée | Capture vidéo animée, présentation client |
| URL partagée | Copier à partir de Claude Design | Examen des parties prenantes, retours asynchrones |

Lors de l'exportation de HTML interactif pour la production, passez le fichier à Claude Code avec cette invite :

```
"Clean up this Claude Design HTML export for production. Extract inline styles
to a CSS file, move inline scripts to a module, add prefers-reduced-motion
support, and ensure it passes WCAG 2.1 AA contrast checks."
```

### Maturité actuelle

Stable et fiable :
- Globes 3D interactifs et orbites de vitrines de produits standard
- Effets de réseau de particules et points flottants
- Maquettes d'interface utilisateur vocale avec transitions d'état simulées
- Transitions et révélations animées basées sur CSS et JS

Bords rugueux — attendez-vous à l'itération :
- Simulations physiques complexes (tissu, fluide, empilement de corps rigides)
- Code de shader GLSL personnalisé au-delà des motifs de bruit courants
- Liaison de données externes en temps réel dans le HTML exporté

Non supporté :
- Téléchargement de séquences animées au format MP4 ou GIF
- Interactions collaboratives en temps réel complexes ou multiplayer
- Expériences WebXR ou AR/VR

## Exemple

Un fondateur unique qui construit une démo de produit SaaS pour une réunion avec un investisseur. Besoins : héros animé, carrousel de capture d'écran de produit avec profondeur et prototype de recherche vocale — tous partageable en URL.

Étape 1 — Construire chaque élément séparément :

```
Prompt 1 (hero):
"Create a hero section with a particle network background. ~120 particles,
connected within 100px, mouse-responsive. Headline: 'Search your codebase
with voice.' CTA button: 'Try the demo'. Primary: #5B21B6, background: #0F0A1E."

Prompt 2 (carousel):
"Build a product screenshot carousel with 3 slides. Each slide tilts in 3D
on hover (15deg X rotation, subtle shadow depth). Transition: fade + scale.
Use placeholder screenshots. Same brand colors as the hero."

Prompt 3 (voice prototype):
"Design a voice search interface. Hold-to-talk mic button centered on screen.
Animated waveform rings during recording state. 'Processing...' spinner.
Results list fades in below. Simulate: 3-second recording, 1-second processing,
then show 4 mock results."
```

Étape 2 — Combiner dans une seule page :

```
"Combine the hero, carousel, and voice interface into a single-page layout.
Order: hero (full viewport), carousel section (centered, 80vw), voice interface
(full viewport, dark background). Add smooth scroll between sections."
```

Étape 3 — Décision d'exportation :

La démo reste dans Claude Design en tant qu'URL partageable pour la réunion d'investisseurs. Après la réunion, exportez le bundle Claude Code et câblez le prototype vocal à l'API de recherche réelle à l'aide de l'API Web Speech dans Claude Code. Le héros de particules et le carrousel 3D portent directement — pas de dépendance API réelle.
