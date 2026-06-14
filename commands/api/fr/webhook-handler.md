---
description: Implémenter un récepteur de webhook sécurisé, idempotent avec vérification de signature et tolérance aux tentatives
argument-hint: "[provider] [event-types]"
---
Implémenter un gestionnaire de webhook pour : $ARGUMENTS

Analyser comme : nom du fournisseur de webhook (par ex. Stripe, GitHub, Twilio) et une liste d'événements à traiter séparée par des virgules. Si le fournisseur est inconnu, construire un motif de webhook signé générique.

Sécurité — non négociable :
- Vérifier la signature du fournisseur avant de traiter tout contenu. Lire le motif de documentation du fournisseur pour le header exact et l'algorithme HMAC (généralement `HMAC-SHA256`)
- Comparer les signatures avec une fonction de comparaison en temps constant — jamais l'égalité de chaîne
- Rejeter les requêtes avec des signatures manquantes ou invalides avec `401` immédiatement — enregistrer l'échec
- Valider le champ `timestamp` si le fournisseur en inclut un ; rejeter les événements antérieurs à 5 minutes pour prévenir les attaques par rejeu
- Le secret doit provenir d'une variable d'environnement — jamais codé en dur

Idempotence :
- Chaque livraison de webhook a un ID d'événement unique dans le header ou le contenu — l'extraire
- Vérifier un magasin de déduplication (table de base de données ou ensemble Redis avec TTL) avant de traiter
- Si l'ID d'événement a déjà été traité, retourner `200` immédiatement — ne pas retraiter
- Stocker l'ID d'événement avec un TTL d'au moins la fenêtre de nouvelles tentatives du fournisseur (généralement 72 heures)

Motif de traitement :
- Accuser réception immédiatement avec `200` — ne pas faire attendre le fournisseur pour la logique métier
- Mettre en file d'attente le contenu validé et désérialisé dans une file d'attente de tâches pour un traitement asynchrone
- Si aucune file d'attente de tâches n'existe, traiter de manière synchrone mais répondre toujours en moins de 5 secondes
- Enregistrer le type d'événement, l'ID d'événement et le résultat du traitement pour chaque événement

Structure du gestionnaire :
1. Middleware de vérification de signature (réutilisable, pas en ligne)
2. Vérification de déduplication
3. Analyse du contenu et dispatch par type d'événement
4. Fonctions de gestionnaire par événement (une par type d'événement listé dans $ARGUMENTS)
5. Gestion des erreurs qui retourne 200 même en cas d'échec du traitement (pour éviter les nouvelles tentatives en cas de bogues)

Écrire des tests pour : signature valide, signature invalide, événement en double, chaque type d'événement dispatché correctement.
