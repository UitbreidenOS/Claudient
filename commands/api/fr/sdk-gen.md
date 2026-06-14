---
description: Générer un SDK client typé à partir d'une spécification OpenAPI ou de routes API existantes
argument-hint: "[langage] [fichier-spec-ou-url-base]"
---
Générer un SDK client pour : $ARGUMENTS

Analyser comme : le langage cible (TypeScript, Python, Go, etc.) et soit un chemin d'accès à un fichier de spécification OpenAPI, soit une URL de base. Si aucun fichier de spec n'existe, générez d'abord une à partir de la base de code avant de générer le SDK.

Exigences du SDK par langage :

TypeScript :
- Double sortie ESM + CommonJS via le champ `exports` du `package.json`
- Types génériques complets — pas de `any`, pas d'assertions de type sans justification
- Utiliser `fetch` nativement ; accepter une implémentation fetch personnalisée optionnelle pour les mocks de test
- Schémas Zod pour la validation des réponses à l'exécution (optionnel mais inclure si le projet utilise Zod)
- Tree-shakeable : chaque ressource comme export nommé, pas une classe avec tout dessus

Python :
- `httpx` pour async, `requests` pour sync — fournir les deux ou demander lequel
- Modèles Pydantic pour tous les types de requête/réponse
- Indices de type partout, marqueur `py.typed` pour la conformité PEP 561
- Client async comme interface primaire, sync comme wrapper fin

Go :
- Go idiomatique : méthodes sur une struct `Client`, contexte comme premier paramètre, pattern de retour `(T, error)`
- Package types séparé pour les modèles générés
- Pas de dépendances externes au-delà de `net/http` sauf si le projet en utilise déjà une

Tous les langages :
- Une classe/struct client par groupe de ressources (reflète les `tags` OpenAPI)
- Le constructeur accepte : URL de base, jeton d'auth/clé API, client HTTP optionnel
- Toutes les méthodes correspondent 1:1 avec les valeurs `operationId` OpenAPI
- Retourner des objets de réponse typés — jamais des chaînes brutes ou des maps sans type
- Propager toutes les erreurs HTTP comme des objets d'erreur typés avec `status`, `code` et `message`
- README avec installation, initialisation et un exemple par ressource

Sortir le SDK comme liste de structure de répertoire, puis le contenu complet de chaque fichier. Si la spec a plus de 20 opérations, générez l'infrastructure client principale et le premier groupe de ressources, puis listez les groupes restants à générer à la demande.
