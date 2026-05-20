# MCP : Analyse de sécurité Snyk

Analyse de vulnérabilités en temps réel depuis Claude Code. Demandez à Claude de vérifier vos dépendances pour les CVE, obtener des suggestions de correction et comprendre la gravité — sans quitter votre session.

## Pourquoi vous en avez besoin

Au lieu d'exécuter `npm audit` et de coller les résultats dans Claude, le serveur MCP Snyk permet à Claude d'interroger les vulnérabilités directement :
- "Y a-t-il des CVE critiques dans ce projet ?"
- "Quelle est la correction pour la vulnérabilité lodash ?"
- "Quelles dépendances dois-je mettre à jour avant de déployer ?"

## Prérequis

```bash
# Installer Snyk CLI
npm install -g snyk

# S'authentifier (compte gratuit disponible)
snyk auth
```

## Configuration

```json
{
  "mcpServers": {
    "snyk": {
      "command": "npx",
      "args": ["-y", "snyk-mcp"],
      "env": {
        "SNYK_TOKEN": "your-snyk-token-here"
      }
    }
  }
}
```

Récupérez votre token : [app.snyk.io/account](https://app.snyk.io/account)

## Ce que Claude peut faire avec Snyk

```
# Vérifier les vulnérabilités
"Scan this project for security vulnerabilities"

# Corriger les problèmes spécifiques
"The lodash vulnerability — how do I fix it without breaking anything?"

# Vérification avant déploiement
"Are there any Critical or High CVEs that would block a production deploy?"

# Vérification des licences
"Are any of our dependencies using GPL licences that might cause issues?"
```

## Outils disponibles

| Outil | Ce qu'il fait |
|---|---|
| `snyk_test` | Analyser le projet pour les vulnérabilités |
| `snyk_fix` | Générer des recommandations de correction |
| `snyk_monitor` | Enregistrer le projet pour une surveillance continue |
| `snyk_iac` | Analyser Terraform/K8s/Docker pour les erreurs de configuration |
| `snyk_container` | Analyser les images Docker |

## Limites du niveau gratuit

Snyk level gratuit : 200 tests/mois pour les projets open source. Suffisant pour la plupart des flux de travail de développement.

## Combinez avec la compétence dependency-auditor

Utilisez la compétence `/dependency-auditor` pour comprendre ce qu'il faut corriger et pourquoi, et Snyk MCP pour la détection automatisée et en temps réel.
