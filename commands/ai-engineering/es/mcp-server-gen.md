---
description: Generar un servidor MCP completamente funcional que exponga herramientas, recursos o indicaciones para un dominio determinado
argument-hint: "[dominio o servicio a exponer, p. ej. 'problemas de GitHub' o 'consulta Postgres']"
---
Generar un servidor MCP (Protocolo de Contexto de Modelo) listo para producción para: $ARGUMENTS

**Paso 1 — Diseño de capacidades**

Del dominio en $ARGUMENTS, enumere lo que el servidor debe exponer en cada primitiva MCP:

- **Herramientas** — acciones que el modelo puede invocar (crear, actualizar, eliminar, consultar). Incluya nombre, descripción, esquema de entrada (esquema JSON) y forma de retorno.
- **Recursos** — datos que el modelo puede leer (patrones de lista y lectura de URI). Incluya plantilla de URI y tipo de contenido.
- **Indicaciones** — plantillas de indicaciones reutilizables que el host puede exponer. Incluya nombre, argumentos y texto de indicación.

Indique solo lo que es apropiado para el dominio — no siempre se necesitan los tres primitivos.

**Paso 2 — Generar el servidor**

Escriba un servidor MCP de Python completo utilizando el paquete `mcp` (`pip install mcp`). Requisitos:

- Utilice `mcp.server.Server` y el transporte `stdio_server()`
- Registre cada herramienta, recurso e indicación identificados en el Paso 1
- Cada controlador de herramienta debe:
  - Validar la entrada con modelos Pydantic
  - Retornar `[TextContent(...)]` o `[ImageContent(...)]` según corresponda
  - Lanzar `McpError` con un `ErrorCode` apropiado en caso de fallo (no devolver cadenas de error en contenido)
- Incluir un bloque `__main__`: `asyncio.run(main())`
- Utilizar `httpx.AsyncClient` o el SDK relevante para llamadas API salientes — no `requests`
- Secretos únicamente mediante variables de entorno — nunca codificados

**Paso 3 — fragmento de registro settings.json**

Muestre el bloque JSON exacto a pegar en `.claude/settings.json` (o `~/.claude/settings.json`) para registrar el servidor:

```json
{
  "mcpServers": {
    "<server-name>": {
      "command": "python",
      "args": ["path/to/server.py"],
      "env": {
        "API_KEY": "${API_KEY}"
      }
    }
  }
}
```

**Paso 4 — Prueba de humo**

Escriba un `test_server.py` utilizando `mcp.client.session.ClientSession` y `stdio_client` que:
- Se conecte al servidor a través de subproceso
- Enumere herramientas, recursos e indicaciones
- Llame a cada herramienta con una entrada mínima válida y afirme una respuesta sin errores
- Se ejecute con `pytest -xvs test_server.py`

**Salida:** `server.py`, fragmento de `settings.json`, `test_server.py`. Sin fragmentos `# TODO`. Sin lógica de marcador de posición.
