# MCP: Memoria persistente

Dale a Claude Code memoria que persista entre sesiones. Por defecto, Claude olvida todo cuando termina una sesión. Este servidor MCP almacena hechos, decisiones y contexto en un gráfico de conocimiento local que Claude puede consultar en cualquier sesión futura.

## Por qué lo necesitas

Sin memoria, cada sesión de Claude Code comienza desde cero. Con memoria persistente:
- Claude recuerda tus preferencias, estilo de codificación y decisiones pasadas
- No necesitas reexplicar el contexto del proyecto en cada sesión
- Claude puede recordar funciones específicas, bugs corregidos o decisiones arquitectónicas de hace semanas
- El conocimiento se acumula con el tiempo en lugar de desaparecer después de cada `/compact`

## Instalación

```bash
# El servidor de memoria más popular
npm install -g @modelcontextprotocol/server-memory

# O usa la versión npx (sin instalación)
# Solo referencialo en tu config abajo
```

## Configuración

Añade a `~/.claude.json` o project `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "/Users/your-name/.claude/memory/knowledge.json"
      }
    }
  }
}
```

## Qué almacena

El servidor de memoria utiliza un **gráfico de conocimiento** — entidades y relaciones:

```
Entity: "authentication system"
  → Relations: "uses JWT", "built in May 2026", "has refresh token issue"
  
Entity: "database schema"
  → Relations: "uses PostgreSQL", "has 3 tables", "users table has soft delete"
```

## Usar memoria en sesiones

```
# Dile a Claude que recuerde algo
"Remember that we decided to use Zod for all API validation"

# Claude almacena: entity("validation-decision") → uses("Zod")

# Próxima sesión — Claude recupera esto automáticamente cuando es relevante
# O pregunta directamente:
"What validation library did we decide on for this project?"
```

## Disparadores automáticos de memoria

Claude almacenará automáticamente:
- Nuevas decisiones arquitectónicas cuando las tomes
- Bugs y sus correcciones
- Tus preferencias de codificación conforme aparecen
- Servicios externos y sus configuraciones

## Ubicación de almacenamiento

Predeterminado: `~/.claude/memory/knowledge.json`
- JSON legible por humanos — puedes inspeccionarlo y editarlo
- Portátil — haz una copia de seguridad, sincroniza entre máquinas
- Ligero — típicamente < 1 MB incluso después de meses de uso

## Privacidad

Toda la memoria se almacena localmente. Nada sale de tu máquina. El servidor MCP solo lee/escribe un archivo JSON local.

## Combina con CLAUDE.md

Memory MCP complementa (no reemplaza) CLAUDE.md:
- **CLAUDE.md** — contexto estable del proyecto siempre cargado, versionado
- **Memory MCP** — conocimiento dinámico, sesión por sesión que crece con el tiempo
