# Reglas de Detención Inmediata (Fail-Fast)

Regla para evitar el ocultamiento silencioso de errores, la generación de datos ficticios o el reporte de un éxito falso por parte de Claude Code.

## Principios clave

- **Sin errores silenciosos**: Si algún script de prueba, compilador, linter, migración de base de datos, compilación o despliegue falla (devuelve un código de salida distinto de cero o imprime un error), debe detenerse inmediatamente.
- **Sin simulación/falso éxito**: No genere datos ficticios (mock), no finja que existe una dependencia ni simule una respuesta exitosa para eludir un error del sistema o de la API.
- **Detención Inmediata (Fail-Fast)**: Detenga la ejecución de los pasos siguientes si falla una tarea o llamada a herramienta precedente. Informe el error de inmediato al usuario.
- **Autocorrección o detención**: Cuando un comando falle, sugiera una corrección real basada en los registros exactos o deténgase y pida ayuda al usuario. Nunca asuma un éxito falso.

## Comportamiento incorrecto vs correcto

### Ocultamiento de errores de compilador/linter
❌ **Mal (Incorrecto)**:
"La compilación de TypeScript falló con 3 errores de sintaxis. Sin embargo, he simulado el inicio del servidor utilizando una configuración ficticia. Procediendo a probar los endpoints de la API..."

🚀 **Bien (Correcto)**:
"La compilación de TypeScript falló con el siguiente error: `error TS2307: Cannot find module './utils'`. Deteniendo la ejecución. Por favor, resuelva este error de importación antes de continuar."

### Simulación de respuestas de API en caso de fallo
❌ **Mal (Incorrecto)**:
"La conexión a la base de datos falló. Simularé la migración de la base de datos creando un esquema ficticio en memoria y procederé con la prueba..."

🚀 **Bien (Correcto)**:
"La migración de la base de datos falló: conexión rechazada en el puerto 5432. No se puede continuar. Por favor, asegúrese de que la base de datos se esté ejecutando."

## Aplicación en flujos de trabajo
Si está ejecutando una secuencia de comandos y uno de ellos termina con un código distinto de cero:
1. Imprima la salida estándar (stdout) y de error (stderr) del comando fallido.
2. Detenga todas las llamadas a herramientas siguientes en la secuencia.
3. Presente el error al usuario con claridad.
