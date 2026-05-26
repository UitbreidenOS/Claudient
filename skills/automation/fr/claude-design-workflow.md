# Claude Design — Workflows de bout en bout

## Quand activer

- Démarrage d'un nouveau projet et besoin d'un processus conception-production répétable plutôt que d'invites ad hoc
- Un membre de l'équipe est nouveau à Claude Design et a besoin d'une approche structurée pour éviter les sessions gaspillées
- Passage entre les contextes de conception — vitesse de démarrage, cohérence d'équipe produit, exploration dirigée par conception ou lancement marketing
- Les sessions Claude Design existantes consomment excessivement de tokens sans converger vers une direction

## Quand NE PAS utiliser

- Prototypes jetables uniques sans implémentation en aval — ignorez le workflow, invitez directement
- Projets où Figma est la source de vérité et l'équipe doit approuver les fichiers Figma avant le début du développement — utilisez les outils IA de Figma et importez dans Claude Code manuellement
- Lorsque des maquettes d'approbation client au pixel près sont requises avant tout développement — Claude Design n'est pas un remplacement Figma pour cette porte
- Lorsqu'une direction de conception est déjà verrouillée dans Claude Code — ne retournez pas à Claude Design ; itérez dans le code

## Instructions

Quatre workflows couvrant les quatre contextes d'utilisation les plus courants. Chacun est conçu pour minimiser le gaspillage de tokens et le temps de production.

---

### Workflow 1 : Validation rapide (Startup / MVP)

Objectif : direction d'interface utilisateur validée de la spécification au code de travail en moins de six heures, même jour.

**Phase 1 — Concept (30 minutes, une session)**

Ouvrez une session Claude Design fraîche. Fournir :
- Public cible (une phrase)
- Fonctionnalités principales à montrer (3–5 maximum)
- Contraintes de marque : deux couleurs hex et une référence de police (un nom de Google Font ou un descripteur de style comme « sans serif géométrique »)

Invite :

```
"Show 3 layout directions for [product type] targeting [audience]. Core features:
[feature 1], [feature 2], [feature 3]. Brand: primary [hex], accent [hex],
[font name or descriptor]. Show all 3 side by side."
```

Sortie : trois directions de disposition distinctes. Décision : choisissez la direction gagnante et notez un ou deux éléments spécifiques des autres qui valent la peine d'être conservés (couleur de A, traitement de carte de B).

**Phase 2 — Affinage (30 minutes, même ou nouvelle session)**

Appliquez les décisions entre les directions avec une instruction spécifique :

```
"Apply [element from version A] to [layout of version B]. Keep [specific element].
Change [specific element] to [target state]."
```

Utilisez le panneau Tweaks pour les ajustements de l'espacement, du poids de la typographie et de l'intensité des couleurs. Cela ne coûte aucun token. Invitez uniquement pour les changements structuraux que Tweaks ne peut pas gérer.

Sortie : direction unique raffinée. Ne continuez pas l'itération au-delà d'une seule passe de raffinement — le perfectionnisme à ce stade retarde la production sans améliorer le produit final.

**Phase 3 — Remise à Claude Code (immédiatement après le verrouillage de la direction)**

Exportez le bundle Claude Code. Remettez-le à Claude Code avec l'objectif d'implémentation :

```
"Implement this Claude Design bundle as [React with Tailwind / plain HTML+CSS /
Vue with shadcn]. Match the token values exactly. Use the layout as a reference,
not a pixel-perfect spec. Flag any deviations from the design."
```

Ne retournez pas à Claude Design après ce moment. Toute itération d'interface utilisateur se produit dans Claude Code par rapport à l'arbre de composants réel.

Résultat : direction validée au code de production, même jour, en moins de six heures.

---

### Workflow 2 : Fondation du système de conception (Équipes de produits)

Objectif : un contexte du système de conception réutilisable qui rend chaque future session Claude Design cohérente et efficace en tokens.

**Session 0 — Configuration du système (2–3 heures, s'exécute une seule fois)**

Cette session est à utilisation élevée de tokens et s'exécute une seule fois. Traitez-la comme un investissement — cela réduit le coût par session de fonctionnalité de 60–70% après.

Fournir :
- Codebase (ou un résumé de la bibliothèque de composants en utilisation — shadcn/ui, MUI, Radix, etc.)
- 5–10 captures d'écran de l'écran du produit fini montrant le langage visuel existant
- Document de directives de marque ou résumé écrit (couleurs, typographie, principes d'espacement, ne pas faire)

Invite :

```
"Extract the design system from these product screenshots and brand guidelines.
Identify: color tokens (primary, secondary, surface, border, text hierarchy),
typography scale (size, weight, line-height per level), spacing scale,
border radius values, and shadow tokens. Output as a JSON token file and a
summary of the component conventions (card style, button variants, input style).
Then generate a test component — a feature card — using the extracted system."
```

Validez le composant de test par rapport à une capture d'écran réelle du produit. Corrigez toute erreur d'extraction avant de continuer. Une fois le système correct, exportez le fichier de tokens (format JSON) et stockez-le à :

```
project-root/
└── design-system/
    └── tokens.json       ← from Claude Design extraction
    └── system-notes.md   ← component conventions in plain text
```

Enregistrez cette session en tant que Claude Project pour que le contexte du système de conception persiste sur toutes les futures sessions de conception sans re-téléchargement.

**Sessions par fonctionnalité (après la configuration du système)**

Ouvrez une session dans le Claude Project contenant le système de conception. La marque et les tokens sont déjà dans le contexte — ne re-téléchargez pas.

Invitez pour une nouvelle fonctionnalité :

```
"Design the [feature name] screen. Users need to [primary task]. Key elements:
[list]. Follow the established design system. Use existing component patterns
where they apply."
```

L'utilisation de tokens est 60–70% inférieure à une session naïve du système car les cycles de correction sont éliminés. La sortie correspondra au produit existant sans application de marque explicite dans chaque invite.

**Intégration avec le développement**

Exportez le bundle Claude Code par fonctionnalité. Les valeurs de tokens du bundle correspondent au fichier de tokens en `design-system/tokens.json`. Si la base de code importe déjà ces tokens (via des variables CSS ou une extension Tailwind), les composants générés hériteront des valeurs correctes sans mappage manuel.

---

### Workflow 3 : Exploration d'abord (Équipes dirigées par la conception)

Objectif : alignement d'équipe sur la direction de conception avant que tout temps d'ingénierie ne soit engagé.

**Phase 1 — Exploration large (1–2 heures)**

Générez une gamme de directions plutôt qu'une seule réponse :

```
"Show 5 directions for the [page or feature] homepage hero. Each should have a
distinct visual personality — vary layout, typography weight, and color treatment.
Label them 1–5."
```

Utilisez le panneau Tweaks pour vous mélanger entre les directions : « Appliquez la typographie de la direction 3 à la disposition de la direction 1. » Documentez les conclusions au fur et à mesure — capture d'écran et une brève note décrivant ce qui fonctionne dans chaque (pas « j'aime cela » mais « le grand type sur fond sombre se lit comme autoritaire, ce qui convient à l'acheteur d'entreprise »).

Ne vous demandez pas à plusieurs reprises dans cette phase pour atteindre une réponse finale. L'exploration est la sortie.

**Phase 2 — Validation de la direction (30 minutes)**

Sélectionnez les 2–3 directions principales. Partagez chacune en tant qu'URL depuis Claude Design. Collectez les commentaires des parties prenantes en une seule manche — pas une série de fils asynchrones. Les commentaires doivent être spécifiques :

Commentaires acceptables : « L'espacement de la carte se sent serré sur mobile » / « La couleur secondaire est trop similaire à la primaire — elles ne se différencient pas. »

Commentaires à refuser (retour avec une question de clarification) : « Rendre plus premium » / « Devrait émerger davantage. »

Appliquez les commentaires structuraux via les invites. Appliquez les commentaires de réglage visuel via le panneau Tweaks. Complétez cette phase en une seule séance.

**Phase 3 — Chemin de production**

Après la validation de la direction, choisissez un chemin et ne les mélangez pas :

| Outillage d'équipe | Chemin |
|---|---|
| Figma comme source de vérité | Capture d'écran direction validée, recréez manuellement dans Figma (ou utilisez Canva comme pont pour les équipes non-Figma) |
| Claude Code comme couche d'implémentation | Bundle d'exportation Claude Code, implémentez |
| Publication directe (pages marketing) | HTML autonome d'exportation, déployer |

Ne passez pas de temps supplémentaire dans Claude Design après la validation de la direction. La valeur de ce workflow est l'alignement qu'il produit — pas la qualité pixel de la sortie de Claude Design.

---

### Workflow 4 : Génération de page de destination (Équipes marketing / Créateurs solitaires)

Objectif : page de destination prête à la production en moins d'une heure sans formation en design.

**Étape 1 — Préparer un package d'entrée (5 minutes)**

Rassembler avant l'ouverture de Claude Design :
- Titre et sous-titre (copie finale, pas des espaces réservés)
- Trois propositions de valeur (une phrase chacune)
- Une étiquette CTA
- Deux codes de couleur hexadécimale (si aucun, utilisez un descripteur de style : « bleu marine profond et cyan électrique » ou « crème chaude et vert forêt »)
- Préférence de police ou descripteur de style (« moderne géométrique » / « serif humaniste » / « SaaS neutre »)
- Description de l'audience (une phrase : qui ils sont, ce qui les intéresse)

**Étape 2 — Invite dense unique**

Livrez toutes les entrées dans une seule invite. Ne vous divisez pas en plusieurs échanges — une seule invite dense produit une première sortie plus cohérente que les clarifications itératives.

```
"Build a landing page for [company]. Audience: [description — who they are,
what they care about]. Headline: '[headline]'. Subheadline: '[subheadline]'.
Value props: [prop 1] / [prop 2] / [prop 3]. CTA: '[label]'. Brand: primary
[hex or descriptor], secondary [hex or descriptor], [font style].

Section order: hero (headline + subheadline + CTA), features (3-column, value props),
social proof (logo strip or testimonial), final CTA (full-width, high contrast).

Aesthetic: [one concrete reference — e.g., 'Linear.app's dark precision' or
'Stripe's clean density' or 'Notion's approachable minimalism']. Not generic SaaS,
not card-heavy, not stock-photo hero."
```

La référence esthétique à la fin est à fort effet de levier. Une référence concrète produit une sortie plus distincte que les adjectifs abstraits.

**Étape 3 — Examen des Tweaks (10–15 minutes)**

Avant d'inviter à nouveau, utilisez le panneau Tweaks pour ajuster :
- Poids de la typographie (les titres plus gras améliorent souvent la hiérarchie sans un re-invite complète)
- Espace blanc et remplissage de section
- Intensité et contraste des couleurs
- Ordre des sections (déplacer pour réorganiser sans coût des tokens)

Cette étape est gratuite — elle ne coûte aucun token et résout souvent 40–60 % des problèmes visuels qui nécessiteraient sinon une invite.

**Étape 4 — Une manche d'invite ciblée (5 minutes)**

Adressez uniquement les problèmes structuraux que Tweaks ne peut pas corriger. Soyez précis :

```
"The hero CTA button is too small relative to the headline. Make it full-width
on mobile and 240px wide on desktop. Keep all other elements unchanged."
```

Acceptez une sortie 80–90% parfaite. Ne poursuivez pas la perfection dans Claude Design — les 10 derniers % sont plus rapides à corriger dans Claude Code ou directement dans le HTML exporté.

**Étape 5 — Exporter et déployer**

Choisissez un chemin d'exportation :

| Cible de déploiement | Exportation | Remarques |
|---|---|---|
| Shopify / WordPress / ClickFunnels | HTML autonome | CSS autonome, pas d'étape de construction, déposez directement dans le bloc HTML du générateur de pages |
| CMS personnalisé ou contenu dynamique | Bundle Claude Code | Implémentez dans Claude Code ; câblez les champs dynamiques aux données CMS |
| Polissage collaboratif avant publication | Export Canva | Pour les équipes qui ont besoin d'édition non-développeur avant le lancement |
| Déploiement de fichier direct (S3, Netlify Drop) | HTML autonome | Fonctionne sans aucun outillage de construction |

Résultat : page de destination de production, 45–60 minutes, aucune formation en design requise.

## Exemple

Un fondateur SaaS solitaire lance une page de liste d'attente pour un outil d'examen du code piloté par l'IA. Il a une copie finale, pas de concepteur et une démo de conférence en quatre heures.

**Package d'entrée :**

- Titre : « Examen du code qui pense comme un ingénieur senior »
- Sous-titre : « Examen alimenté par l'IA qui capte les erreurs de logique, pas seulement le style. »
- Propositions de valeur : « Intégration avec GitHub en 60 secondes » / « Explique pourquoi, pas seulement quoi » / « Zéro configuration, fonctionne sur n'importe quelle pile »
- CTA : « Rejoindre la liste d'attente »
- Marque : primaire #1C1C2E, accent #6EE7B7, police : « sans serif géométrique propre »
- Audience : « ingénieurs de niveau intermédiaire dans les startups frustrés par l'examen de PR superficiel des coéquipiers »

**Invite de l'étape 2 :**

```
"Build a landing page for Revue, an AI code review tool. Audience: mid-level
engineers at startups frustrated by shallow PR review. Headline: 'Code review
that thinks like a senior engineer'. Subheadline: 'AI-powered review that catches
logic errors, not just style.' Value props: 'Integrates with GitHub in 60 seconds'
/ 'Explains why, not just what' / 'Zero configuration, works on any stack'.
CTA: 'Join the waitlist'. Brand: primary #1C1C2E, accent #6EE7B7, geometric sans.

Section order: hero, features (3-column), waitlist form (email input + CTA),
minimal footer.

Aesthetic: Linear.app's dark precision. Not card-heavy, not stock-photo hero,
not generic SaaS purple."
```

**Décisions d'étape 3 — Tweaks :**

- Poids de police de titre augmenté de normal à gras (hiérarchie améliorée immédiatement)
- Remplissage de section réduit — la valeur par défaut avait trop d'air entre le héros et les fonctionnalités
- Intensité des couleurs d'accent décalée vers le bas de 10 % — la valeur par défaut #6EE7B7 était trop saturée sur le fond sombre

**Étape 4 — Une invite :**

```
"The waitlist form section needs a subtle divider from the features section above it.
Add a thin horizontal rule in #2E2E42. Keep everything else as-is."
```

**Décision d'exportation :** HTML autonome. Le fondateur utilise Netlify Drop — glissez le fichier, en direct en 30 secondes. Aucun CMS nécessaire ; l'action du formulaire de liste d'attente pointera vers une URL d'intégration Mailchimp ajoutée manuellement au HTML après l'exportation.
