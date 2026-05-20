# MCP: Generador de diagramas Excalidraw

Genera diagramas de arquitectura, diagramas de flujo y mapas del sistema directamente desde Claude Code. Describe tu sistema en inglés simple — Claude dibuja el diagrama.

## Por qué lo necesitas

Los diagramas de arquitectura son valiosos pero lentos de crear manualmente. Con el servidor MCP Excalidraw, Claude puede:
- Convertir una descripción de base de código en un diagrama de arquitectura del sistema
- Dibujar diagramas de flujo de datos a partir de descripciones de puntos finales de API
- Crear diagramas de secuencia para flujos de trabajo complejos
- Actualizar diagramas existentes cuando cambia la arquitectura

## Configuración

```json
{
  "mcpServers": {
    "excalidraw": {
      "command": "npx",
      "args": ["-y", "excalidraw-mcp-server"]
    }
  }
}
```

## Cómo usar

```
# Diagrama de arquitectura
"Draw a system architecture diagram for our app:
 - React frontend on Vercel
 - Express API on Railway
 - PostgreSQL on Neon
 - Redis cache on Upstash
 - Stripe for payments"

# Flujo de datos
"Create a sequence diagram for the user authentication flow:
 login form → Express API → check database → generate JWT → return to client"

# Mapa de servicios
"Draw a microservices map showing how these services communicate: [describe services]"
```

## Formatos de salida

- **Excalidraw JSON** — abierto en excalidraw.com o extensión VS Code
- **SVG** — incrustar en README o docs
- **PNG** — para presentaciones y Notion

## Guardar diagramas

```
"Save the architecture diagram as docs/architecture.excalidraw"
```

Claude lo guarda directamente en tu proyecto. Compromételo — Los archivos de Excalidraw son JSON versionado, por lo que los diffs son significativos.

## Combina con la habilidad codebase-onboarding

Genera diagramas como parte de la documentación de incorporación:
```
"Read the codebase structure and generate:
1. A system architecture diagram
2. A data model diagram from the Prisma schema
3. A deployment diagram based on the infrastructure config"
```
