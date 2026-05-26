# Configuration du système de marque Claude Design

## Quand activer

- Configuration de Claude Design pour la première fois pour un projet ou une entreprise — aucun système de conception précédent n'existe dans l'outil
- Démarrage d'un nouveau projet client dans Claude Design où le client dispose d'une marque existante
- Les sorties de conception de Claude Design ne correspondent pas à la marque de l'entreprise (les couleurs sont décalées, la typographie est fausse, l'espacement se sent incohérent)
- Les membres de l'équipe obtiennent des résultats incohérents entre les sessions car il n'y a pas de point de départ partagé

## Quand NE PAS utiliser

- Prototype unique qui ne sera pas réutilisé ou transmis — le coût de configuration dépasse la valeur
- Exploration d'une identité visuelle entièrement nouvelle où aucune marque existante n'existe — vous définissez la marque, ne la traduisez pas
- Maquette jetable rapide pour une validation unique — ignorez la configuration et invitez directement

## Instructions

### Étape 1 : Fondation de marque

Avant de toucher aux couleurs ou à la typographie, donnez à Claude le contexte qui régit toutes les décisions visuelles.

Fournir :

- Nom de l'entreprise et secteur d'activité
- Public cible (soyez précis — « responsables des approvisionnements d'entreprise âgés de 35-55 ans » est plus utile que « B2B »)
- Trois adjectifs de personnalité de marque (p. ex., « précis, accessible, moderne » ou « audacieux, ludique, énergique »)
- Descripteur de ton : professionnel / décontracté / ludique / autoritaire
- Toute déclaration de marque existante ou ligne de positionnement

Claude utilise ceci pour générer des principes visuels fondamentaux — la couche de raisonnement qui se trouve derrière chaque choix de couleur et d'espacement. Lorsque vous demandez plus tard « cela semble-t-il correct », Claude évalue par rapport à ces principes, ne devinant pas.

Documentez la sortie. Collez-le en haut de chaque nouvelle session dans votre apéndice de session.

### Étape 2 : Système de couleur

Définissez tous les rôles de couleur explicitement. Ne laissez pas Claude déduire la palette d'une seule couleur principale — nommez tous les rôles.

**Palette primaire :**
- Primaire : la couleur d'action dominante (boutons, liens, surbrillances clés)
- Primaire survol : assombri de 10-15 % pour les états d'interaction
- Primaire subtil : éclaircir 85-90 % pour les arrière-plans et les teintes

**Palette secondaire :**
- Secondaire : couleur d'accentuation de support
- Survol secondaire
- Secondaire subtil

**Palette neutre :**
- Neutre 50 à Neutre 950 (ou échelle équivalente) — utilisé pour les surfaces, les bordures, le texte

**Couleurs sémantiques** — spécifiez toujours les valeurs hexadécimales, ne comptez pas sur les valeurs par défaut :
- Succès : généralement un vert (#16A34A comme point de référence)
- Avertissement : généralement ambre (#D97706)
- Erreur : généralement rouge (#DC2626)
- Info : généralement bleu (#2563EB)

Chaque couleur sémantique a besoin d'une paire de premier plan — la couleur du texte qui se trouve dessus et passe le contraste WCAG AA (4.5:1 pour le texte du corps, 3:1 pour le texte volumineux).

**Couleurs de surface :**
- Arrière-plan : arrière-plan au niveau de la page
- Surface : fond de carte et de panneau
- Surface surélevée : composants surélevés (modaux, listes déroulantes)
- Incrustation : masque derrière les modaux

**Couleurs de texte :**
- Texte primaire : texte du corps sur surfaces claires
- Texte secondaire : texte de support, étiquettes
- Texte désactivé : texte muted, non interactif
- Texte inverse : texte sur arrière-plans sombres ou colorés

Incluez une validation WCAG AA explicite pour chaque combinaison texte/arrière-plan que vous définissez. Claude signalera les défaillances si vous le demandez, mais il est plus rapide de valider au moment de la définition que de découvrir les problèmes de contraste lors de la génération de composants.

### Étape 3 : Échelle typographique

Spécifiez les paiages de polices qui correspondent à la personnalité de la marque — le choix d'appairage signale plus sur le caractère de la marque que toute autre décision unique.

Modèles d'appairage courants :

- Autoritaire/entreprise : sans serif géométrique pour les en-têtes (Inter, DM Sans) + sans serif humaniste pour le corps (Source Sans Pro)
- Éditorial/premium : serif pour l'affichage (Playfair Display, Libre Baskerville) + sans serif pour le corps (Inter)
- Technique/développeur : mono pour accentuation de code (JetBrains Mono) + sans serif neutre pour tout le reste (Inter)
- Ludique/consommateur : sans serif arrondi pour les en-têtes (Nunito, Poppins) + sans serif neutre pour le corps

Définissez l'échelle complète avec des noms sémantiques, pas des numéros de taille :

**En-têtes :**

| Token | Taille | Poids | Hauteur de ligne | Utilisation |
|---|---|---|---|---|
| display | 3rem | 700 | 1.1 | En-têtes héros, écrans de démarrage |
| h1 | 2.25rem | 700 | 1.2 | Titres de page |
| h2 | 1.875rem | 600 | 1.25 | En-têtes de section |
| h3 | 1.5rem | 600 | 1.3 | En-têtes de sous-section |
| h4 | 1.25rem | 600 | 1.35 | En-têtes de carte, titres de barre latérale |

**Contexte :**

| Token | Taille | Poids | Hauteur de ligne | Utilisation |
|---|---|---|---|---|
| body-large | 1.125rem | 400 | 1.6 | Paragraphes principaux, introductions |
| body | 1rem | 400 | 1.6 | Texte de paragraphe par défaut |
| body-small | 0.875rem | 400 | 1.5 | Texte de support, métadonnées |
| caption | 0.75rem | 400 | 1.4 | Légendes d'image, petits caractères |

**Utilitaire :**

| Token | Taille | Poids | Hauteur de ligne | Utilisation |
|---|---|---|---|---|
| label | 0.875rem | 500 | 1.2 | Étiquettes de formulaire, en-têtes de tableau |
| overline | 0.75rem | 600 | 1.2 | Étiquettes de catégorie, marqueurs de section — toujours en majuscules |
| code | 0.875rem | 400 | 1.6 | Code en ligne, blocs de code |

Claude Design applique automatiquement ces tokens à chaque élément généré une fois le système établi. Vous n'avez pas besoin de re-spécifier les tailles par invitation.

### Étape 4 : Directives du logo

Fournissez à Claude les contraintes qu'il doit respecter dans chaque sortie. Cela empêche Claude d'improviser avec votre logo de manière à violer les normes de marque.

Spécifiez :

- **Variantes disponibles :** logo principal (logo complet), logo inversé (version blanc/clair pour les fonds sombres), icône uniquement (marque sans libellé)
- **Combinaisons de couleurs approuvées :** logo principal sur blanc, logo inversé sur arrière-plan couleur principale, etc.
- **Règle d'espace blanc :** espace blanc minimum de tous les côtés, exprimé comme un multiple d'une unité de logo (généralement la hauteur de la hauteur x ou de la hauteur de majuscule de la marque)
- **Tailles minimales :** largeur minimale en pixels pour usage numérique, largeur minimale en millimètres pour impression
- **Modifications interdites :** pas de modification de couleur, pas de rotation, pas d'étirement, pas d'ombres portées, pas de traits de contour

Si vous avez un PDF de guide de marque avec des spécifications de logo, téléchargez-le pendant la Session 0. Claude lit et respecte ces contraintes dans les sorties ultérieures sans que vous ayez besoin de les re-spécifier par session.

### Étape 5 : Bibliothèque de composants — Commencez par les composants à haute fréquence

Créez d'abord les composants que Claude utilisera le plus souvent. Les composants à haute fréquence apparaissent dans presque tous les écrans ; les rendre correctement élimine la plus grande source de dérive de marque.

Ordre de priorité :

**Boutons** — définissez quatre variantes de base :
- Primaire : rempli, utilise `color-primary`, texte blanc
- Secondaire : contour, texte et bordure `color-primary`, arrière-plan transparent
- Fantôme : pas de bordure, texte `color-primary`, arrière-plan transparent
- Destructeur : rempli, utilise `color-error`, texte blanc

Pour chaque variante, spécifiez : hauteur, rembourrage horizontal, rayon de bordure, token de police, et tous les états d'interaction (par défaut, survol, actif, focus-visible, désactivé). L'état désactivé doit utiliser l'opacité réduite ou une couleur muted spécifique — ne supprimez jamais l'élément de la mise en page.

**Entrées de formulaire** — définissez : entrée de texte, textarea, select, case à cocher, bouton radio. Pour chaque : hauteur (entrées), couleur de bordure (par défaut, focus, erreur, désactivé), position d'étiquette, position de texte d'aide, style de message d'erreur.

**Cartes** — définissez les variantes par type de contenu :
- Carte de contenu : image + titre + corps + CTA optionnel
- Carte de liste : icône ou avatar + titre + texte secondaire + action optionnel
- Carte de statistiques : valeur de métrique + étiquette + indicateur de tendance optionnel

Inclure un état de survol (changement d'élévation ou surbrillance de bordure) pour les cartes interactives.

**Navigation** — définissez : en-tête principal (logo + liens nav + CTA + déclencheur de menu mobile), nav de barre latérale (liens groupés + état actif + liens imbriqués), fil d'Ariane.

Pour chaque composant : spécifiez l'espacement exact (utilisez vos tokens d'échelle d'espacement, pas les valeurs en pixels), les couleurs (utilisez vos tokens de couleur), le rayon de bordure (cohérent avec votre token de rayon mondial), les tokens typographiques, et tous les états d'interaction.

### Étape 6 : Couche de documentation

Pour chaque composant de votre bibliothèque, écrivez un contrat d'utilisation compact. C'est la couche qui prévient l'abus et rend le système auto-enseignant pour les membres de l'équipe.

Pour chaque documentation de composant :

**Quand utiliser** — scénarios spécifiques où ce composant est le bon choix. « Utilisez un bouton primaire pour l'action de priorité la plus élevée sur une page ou un modal. »

**Quand NE PAS utiliser** — anti-modèles. « N'utilisez pas de bouton primaire pour plus d'une action par écran. Ne l'utilisez pas pour la navigation — utilisez un lien à la place. »

**Composants connexes** — guide de navigation. « Si vous avez besoin d'une action secondaire, utilisez un bouton secondaire ou un bouton fantôme. Si vous avez besoin de navigation en ligne, utilisez un lien texte. »

**Notes d'accessibilité** — exigences minimales :
- État de focus : bague de focus visible (décalage de 2px, bague `color-primary` ou équivalent haute contrast)
- Rôle ARIA : spécifiez les éléments non natifs
- Indépendance des couleurs : ne jamais transmettre l'état par couleur seule (ajouter une icône ou une étiquette de texte aux côtés de la couleur)
- Cible de toucher minimum : 44x44px pour les éléments interactifs

### Étape 7 : Exporter et gérer

Sortez votre système de conception complet dans trois formats simultanément afin qu'il puisse être consommé par n'importe quelle chaîne d'outils en aval.

```css
/* Propriétés CSS personnalisées — collez dans :root dans la feuille de style mondiale */
:root {
  /* Color — primary */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-subtle: #EFF6FF;

  /* Color — semantic */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #2563EB;

  /* Color — surface */
  --color-background: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-surface-raised: #FFFFFF;

  /* Color — text */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #D1D5DB;
  --color-text-inverse: #FFFFFF;

  /* Typography */
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}
```

```json
{
  "color": {
    "primary": { "value": "#2563EB" },
    "primary-hover": { "value": "#1D4ED8" },
    "primary-subtle": { "value": "#EFF6FF" },
    "success": { "value": "#16A34A" },
    "warning": { "value": "#D97706" },
    "error": { "value": "#DC2626" },
    "info": { "value": "#2563EB" },
    "background": { "value": "#FFFFFF" },
    "surface": { "value": "#F9FAFB" },
    "text-primary": { "value": "#111827" },
    "text-secondary": { "value": "#6B7280" },
    "text-disabled": { "value": "#D1D5DB" },
    "text-inverse": { "value": "#FFFFFF" }
  },
  "spacing": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" }
  },
  "radius": {
    "sm": { "value": "0.25rem" },
    "md": { "value": "0.5rem" },
    "lg": { "value": "0.75rem" },
    "full": { "value": "9999px" }
  }
}
```

```js
// tailwind.config.js — extend theme with brand tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: '#EFF6FF',
        },
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#2563EB',
        surface: '#F9FAFB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-disabled': '#D1D5DB',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
}
```

Contrôle de version du fichier tokens JSON. Traitez-le comme source de vérité — les configurations CSS et Tailwind en découlent. Lorsque la marque évolue, mettez à jour le fichier JSON des tokens en premier, puis régénérez les autres formats.

### Étape de validation

Avant d'utiliser le système sur tout projet réel, exécutez une vérification de validation. Générez un composant de test — un groupe de boutons contenant les variantes primaire, secondaire, fantôme et destructrice — et vérifiez :

- Les couleurs correspondent exactement à vos valeurs hexadécimales définies
- Les tokens de typographie sont appliqués (pas les valeurs par défaut de Claude)
- L'espacement et le rayon de bordure sont cohérents avec votre échelle
- Les états de survol sont présents et corrects

Si la sortie semble décalée dans une dimension, re-téléchargez vos captures d'écran de produit terminées et l'apéndice de session, puis régénérez. L'erreur d'alignement au moment de la validation est presque toujours causée par un contexte incomplet en Session 0, pas une dérive de Claude Design.

Corrigez-la avant de construire des écrans réels. Corriger la dérive de marque sur 12 écrans générés est cher. Corriger au stade du groupe de boutons coûte une invitation.

## Exemple

Une agence qui configure une marque client de commerce électronique — compagnie de vêtements de sport, direct-to-consumer, public cible 25-40 professionnels urbains actifs.

**Prompt du système de couleur de la Session 0 :**

```
Define the complete color system for Velo, a sportswear brand.
Personality: bold, energetic, precise.
Primary: #E11D48 (rose-600). Compute primary-hover at 15% darker, primary-subtle at 90% lighter.
Secondary: #0EA5E9 (sky-500). Same derivation.
Neutral scale: use slate (slate-50 through slate-950).
Semantic: success #16A34A, warning #D97706, error #DC2626, info #0EA5E9.
Surface: background white, surface slate-50, surface-raised white.
Text: primary slate-900, secondary slate-500, disabled slate-300, inverse white.
Output as CSS custom properties, design tokens JSON, and Tailwind config extension.
Validate WCAG AA contrast for all text/background pairs and flag failures.
```

**Résultat attendu :** ensemble de tokens complet dans tous les trois formats, avec un tableau de validation de contraste notant tout défaut (le texte blanc sur le primaire-subtil échouera — Claude devrait le signaler et suggérer slate-900 ou primary comme premier plan correct).

**Utilisation de la session ultérieure :** collez l'apéndice de session de 150 mots (personnalité de marque, couleur principale, paire typographique) au début de chaque nouvelle session. Claude applique l'ensemble de tokens complet sans re-télécharger les fichiers. Page de produit, tiroir de panier, flux de paiement — tous générés avec application de marque cohérente entre les sessions.
