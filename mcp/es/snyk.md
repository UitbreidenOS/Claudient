# MCP: Escaneo de seguridad Snyk

Análisis de vulnerabilidades en tiempo real desde Claude Code. Pide a Claude que compruebe tus dependencias de CVE, obtén sugerencias de reparación y comprende la gravedad — sin salir de tu sesión.

## Por qué lo necesitas

En lugar de ejecutar `npm audit` y pegar resultados en Claude, el servidor MCP Snyk permite que Claude consulte directamente las vulnerabilidades:
- "¿Hay CVE críticos en este proyecto?"
- "¿Cuál es la solución para la vulnerabilidad lodash?"
- "¿Qué dependencias debo actualizar antes de desplegar?"

## Requisitos previos

```bash
# Instala Snyk CLI
npm install -g snyk

# Autentica (cuenta gratuita disponible)
snyk auth
```

## Configuración

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

Obtén tu token: [app.snyk.io/account](https://app.snyk.io/account)

## Qué puede hacer Claude con Snyk

```
# Buscar vulnerabilidades
"Scan this project for security vulnerabilities"

# Solucionar problemas específicos
"The lodash vulnerability — how do I fix it without breaking anything?"

# Comprobación previa al envío
"Are there any Critical or High CVEs that would block a production deploy?"

# Comprobación de licencia
"Are any of our dependencies using GPL licences that might cause issues?"
```

## Herramientas disponibles

| Herramienta | Qué hace |
|---|---|
| `snyk_test` | Escanear proyecto de vulnerabilidades |
| `snyk_fix` | Generar recomendaciones de reparación |
| `snyk_monitor` | Registrar proyecto para monitoreo continuo |
| `snyk_iac` | Escanear Terraform/K8s/Docker para configuraciones erróneas |
| `snyk_container` | Escanear imágenes de Docker |

## Límites del nivel gratuito

Nivel gratuito de Snyk: 200 pruebas/mes para proyectos de código abierto. Suficiente para la mayoría de flujos de trabajo de desarrollo.

## Combina con la habilidad dependency-auditor

Usa la habilidad `/dependency-auditor` para entender qué hay que solucionar y por qué, y Snyk MCP para detección automatizada en tiempo real.
