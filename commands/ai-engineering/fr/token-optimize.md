---
description: Audit une invite ou un pipeline LLM pour détecter les gaspillages de tokens et appliquer des réductions ciblées
argument-hint: "[fichier d'invite, fichier de chaîne, ou chemin de code]"
---
Auditez l'invite ou le pipeline à $ARGUMENTS pour les inefficacités de tokens et produisez une version optimisée.

Lisez les chemins de fichier fournis. Si l'argument est un répertoire, scannez les fichiers `.py`, `.ts`, `.md` contenant des chaînes d'invite ou des sites d'appel LLM.

**Dimensions d'audit — vérifiez chacune:**

**1. Verbosité des invites**
- Phrases de remplissage qui ajoutent des tokens sans ajouter de contrainte ("En tant que modèle de langage IA", "Bien sûr!", "Certainement")
- Instructions répétées qui apparaissent à la fois dans le message système et le message utilisateur
- Exemples redondants qui couvrent des cas identiques
- Instructions en prose qui pourraient être une liste à puces avec moitié moins de tokens

**2. Mauvaise utilisation de la fenêtre de contexte**
- Document complet passé quand seule une section est nécessaire — signaler avec économies estimées
- Historique de conversation inclus textuellement quand un résumé suffirait
- Contenu dupliqué : même texte inclus deux fois sous des clés différentes

**3. Opportunités de mise en cache**
- Identifier les segments d'invite statiques (invite système, contexte statique, exemples few-shot) qui doivent utiliser `cache_control: {"type": "ephemeral"}` sur l'API Anthropic
- Signaler si le segment éligible au cache est < 1024 tokens (en dessous du seuil de cache minimum — aucun bénéfice)
- Afficher le tableau de messages restructuré avec les blocs de cache placés correctement

**4. Longueur de sortie**
- `max_tokens` est-il défini ? Si non, signaler comme risque de coût illimité
- L'invite demande-t-elle une explication quand seules les données structurées sont nécessaires ?
- Un format de sortie plus court (JSON vs prose, code seul vs code+explication) réduirait-il le coût de génération ?

**5. Adéquation du niveau de modèle**
- La tâche utilise-t-elle `claude-sonnet-4-6` ou `claude-opus-4-7` pour un travail que `claude-haiku-4-5-20251001` peut gérer à 10 fois moins cher ?
- Classer la complexité de la tâche : extraction/classification simple → Haiku ; raisonnement/génération → Sonnet ; multi-étapes complexe → Opus

**Format de sortie:**

```
## Résumé de l'audit de tokens
| Problème | Localisation | Impact estimé de tokens | Priorité |
|----------|--------------|------------------------|----------|
| ...      | ...          | ...                    | H/M/L    |

## Invite / chaîne optimisée
<version complètement réécrite avec les modifications appliquées>

## Configuration de la mise en cache
<extrait du tableau de messages montrant le placement de cache_control, si applicable>

## Économies estimées
Avant : ~N tokens/appel  →  Après : ~M tokens/appel  (~X% de réduction)
À 1000 appels/jour sur [modèle] : $Y/mois d'économies
```

Appliquez tous les correctifs de priorité élevée directement dans la sortie. Expliquez les éléments de priorité moyenne/basse mais ne les appliquez pas sans demander.
