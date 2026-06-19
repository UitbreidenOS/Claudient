# Règle de Planification Préalable (Measure Twice)

Règle imposant qu'un plan concret soit rédigé, examiné et approuvé avant d'effectuer des modifications ou d'exécuter des commandes.

## Principes clés

- **Planification avant action** : Vous devez présenter un plan clair et étape par étape avant d'utiliser tout outil modifiant des fichiers ou exécutant des instructions en ligne de commande.
- **Fichier de plan** : Les plans doivent être écrits dans `.claude/plan.md` avec `Status: Pending` avant de tenter de modifier le code ou d'exécuter des scripts.
- **Approbation de l'utilisateur** : Un crochet `PreToolUse` bloque les modifications jusqu'à ce que `.claude/plan.md` contienne `Status: Approved`. Vous devez attendre que l'utilisateur approuve le plan.
- **Alignement de la portée** : Gardez vos plans petits, progressifs et ciblés. Ne proposez pas de changements globaux ou radicaux sans confirmation explicite.

## Comportement incorrect vs correct

❌ **Mauvais (Incorrect)** :
Commencer à écrire des fichiers ou à compiler du code immédiatement après avoir reçu une demande générale, sans vérifier les contraintes ni présenter une feuille de route détaillée.

🚀 **Bon (Correct)** :
1. "Voici ma proposition de conception et ma feuille de route..."
2. Rédiger le plan dans `.claude/plan.md` avec `Status: Pending`.
3. "J'ai rédigé le plan dans `.claude/plan.md`. Veuillez l'examiner et le marquer comme `Status: Approved` afin que je puisse commencer."
4. Une fois que l'utilisateur a modifié le statut du plan, procéder à l'exécution des commandes et des écritures.

## Format de Plan Standard
Rédigez les plans en utilisant ce format dans `.claude/plan.md` :

```markdown
# Plan de mise en œuvre

## Modifications proposées
1. [Détails des modifications]
2. [Détails des modifications]

## Plan de vérification
1. [Comment les modifications seront testées]

## Statut
Status: Pending (Remplacez par 'Status: Approved' pour déverrouiller les outils)
```
