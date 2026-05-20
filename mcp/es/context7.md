# MCP: Context7 — Documentación en vivo

Dale a Claude Code acceso a documentación actualizada para cualquier biblioteca o framework. Sin más API alucinadas o ejemplos de código obsoletos.

## Por qué lo necesitas

La fecha límite de conocimiento de Claude tiene un límite. Para bibliotecas de rápido movimiento (Next.js 16, LangGraph 1.2, shadcn/ui), la documentación que Claude conoce puede estar meses o años desactualizada. Context7 lo soluciona al recuperar documentación actual bajo demanda.

## Qué hace

- Recupera documentación actualizada y específica de versión para cualquier biblioteca
- Inyecta la sección de documentación relevante en el contexto de Claude
- Claude genera código contra la API actual real, no una versión recordada
- Cubre: React, Next.js, Tailwind, shadcn/ui, Prisma, Drizzle, LangChain, LangGraph y miles más

## Configuración

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

No se requiere clave API para uso básico.

## Cómo usar en sesiones

```
# Solicita explícitamente documentación actual
"Using context7, get the latest Next.js 16 App Router docs for data fetching"

# Claude la recuperará y usará
"Build a server action using the current Next.js syntax"

# Para preguntas específicas de versión
"What's the correct way to use useFormState in React 19?"
```

## Disparadores

También puedes trabajar normalmente — Context7 se activa cuando Claude detecta que necesita consultar documentación. O añade esto a tu CLAUDE.md:

```markdown
## Libraries
When writing code with Next.js, React, Tailwind, or shadcn/ui:
- Use context7 MCP to fetch current documentation before generating code
- Always specify the version we're using (see package.json)
```

## Bibliotecas soportadas

Cubre la mayoría de los principales paquetes npm y bibliotecas Python. Si una biblioteca no está indexada, Context7 vuelve a recuperar la página de documentación oficial directamente.

## vs. incluir documentación en CLAUDE.md

La documentación de CLAUDE.md se vuelve obsoleta y consume contexto en cada sesión. Context7 recupera solo lo que es necesario, cuando es necesario — cero gastos generales cuando no usas una biblioteca específica.
