---
description: Auditez l'API et produisez une stratégie de versioning avec des chemins de migration pour les changements non rétrocompatibles
argument-hint: "[version-actuelle] [version-cible]"
---
Produire un plan de versioning d'API pour : $ARGUMENTS

Analysez comme : version actuelle (par ex. v1) et version cible (par ex. v2). Si omis, analysez l'API existante et recommandez si le versioning est nécessaire du tout.

Phase d'analyse — lisez la base de code et identifiez :
1. Tous les points de terminaison publics (chemin, méthode, forme de la demande, forme de la réponse)
2. Quels changements sont non rétrocompatibles par rapport aux changements rétrocompatibles :
   - Non rétrocompatibles : suppression d'un champ, changement du type d'un champ, renommage d'un champ, changement de sémantique du code de statut, suppression d'un point de terminaison, changement des exigences d'authentification
   - Rétrocompatibles : ajout d'un champ optionnel, ajout d'un nouveau point de terminaison, ajout d'une nouvelle valeur d'énumération (avec prudence), assouplissement de la validation
3. Tous les clients existants ou consommateurs SDK qui seraient affectés

Sélection de la stratégie de versioning :
- Versioning via le chemin d'URL (`/v2/`) — par défaut recommandé ; explicite, cacheable, facile à acheminer
- Versioning via en-têtes (`API-Version: 2`) — URLs plus propres mais plus difficiles à tester dans les navigateurs ; à utiliser uniquement si le projet fait déjà cela
- Versioning via paramètre de requête — à éviter ; non RESTful et casse le cache

Plan d'implémentation :
- Définissez le préfixe de version en un seul endroit (configuration du routeur, constante d'URL de base) — pas éparpillé dans chaque route
- Les anciennes routes de version doivent rester fonctionnelles pendant une période de dépréciation (recommandé : 6 mois minimum pour les API externes, 1 version majeure pour les API internes)
- Ajoutez les en-têtes `Deprecation` et `Sunset` aux réponses v1 lorsque v2 est lancé
- Versionnez uniquement les routes qui ont des changements non rétrocompatibles — les routes identiques peuvent partager des gestionnaires entre les versions
- Définissez un document de guide de migration listant chaque changement non rétrocompatible avec des exemples avant/après

Résultat :
1. Liste des changements non rétrocompatibles trouvés (ou « aucun trouvé » si propre)
2. Stratégie de versioning recommandée avec justification
3. Structure de routage montrant comment v1 et v2 coexistent
4. Changements de code nécessaires pour implémenter le fractionnement de version
5. Recommandation de calendrier de dépréciation
6. Esquisse du guide de migration pour les consommateurs d'API
