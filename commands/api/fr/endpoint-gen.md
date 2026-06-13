---
description: Générer un endpoint REST entièrement typé avec validation, gestion des erreurs et tests
argument-hint: "[method] [path] [description]"
---
Générer un endpoint API REST prêt pour la production à partir de la spécification : $ARGUMENTS

Analyser l'entrée comme : méthode HTTP, chemin et une courte description de l'opération sur la ressource.

Règles :
- Déduire le framework à partir de la base de code existante (Express, FastAPI, Gin, Rails, etc.)
- Correspondre à la structure de fichiers existante du projet, aux conventions de nommage et au style d'importation
- Définir les types de requête/réponse en utilisant le système de type du projet (interfaces TypeScript, modèles Pydantic, structs Go, etc.)
- Valider toutes les entrées à la limite — rejeter les requêtes malformées avant que la logique métier ne s'exécute
- Retourner les codes de statut HTTP standard : 200/201 succès, 400 mauvaise requête, 401 non authentifié, 403 interdit, 404 non trouvé, 409 conflit, 422 non traitable, 500 interne
- Ne jamais exposer les traces de pile ou les détails d'erreur internes dans les corps de réponse
- Extraire la logique métier dans une couche de service, garder le contrôleur léger
- Ajouter les vérifications d'authentification/autorisation si le projet utilise des gardes middleware
- Écrire au moins trois tests : cas heureux, échec de validation, cas non trouvé
- Suivre les conventions de ressources RESTful — utiliser des noms dans les chemins, pas des verbes

Résultat :
1. Fichier de route/contrôleur (ou ajout au routeur existant)
2. Définitions des types de requête/réponse
3. Stub de fonction de service (ou implémentation si la logique est simple)
4. Fichier de test avec les trois cas requis
5. Toute migration ou changement de schéma si l'endpoint touche la BD

Si $ARGUMENTS est vide, demander : méthode, chemin et ce que l'endpoint fait.
