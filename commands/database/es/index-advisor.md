---
description: Recomendar índices para una tabla o carga de trabajo de consultas basado en esquema y patrones de acceso
argument-hint: "[nombre de tabla, consulta o archivo de esquema]"
---
Analizar el esquema de la base de datos y los patrones de acceso para: $ARGUMENTS

Si $ARGUMENTS es un nombre de tabla, localizar su esquema en migraciones, modelos ORM o archivos de esquema. Si es una consulta, analizar los patrones de acceso de esa consulta. Si es una ruta de archivo, leerla.

Realizar este análisis:

1. Mapear los índices actuales:
   - Listar todos los índices existentes (clave primaria, único, compuesto, parcial, basado en expresiones).
   - Identificar qué índices son redundantes (cubiertos por prefijo por otro índice).
   - Identificar índices no utilizados o de baja selectividad (p. ej., columnas booleanas, enumeraciones de baja cardinalidad).

2. Analizar la carga de trabajo de consultas:
   - Si se proporcionan consultas o son descubribles en el código base (llamadas de consulta ORM, SQL sin procesar), extraer sus patrones WHERE, JOIN, ORDER BY y GROUP BY.
   - Identificar columnas que aparecen repetidamente en predicados de filtro.
   - Anotar cualquier consulta de rango que se beneficie de índices B-tree versus consultas de igualdad únicamente.

3. Recomendar nuevos índices:
   - Para cada recomendación, indicar:
     a. La instrucción CREATE INDEX exacta (usar CONCURRENTLY para PostgreSQL si es apropiado).
     b. Qué consultas o patrones de acceso cubre.
     c. Impacto de selectividad estimado (cardinalidad alta/media/baja).
     d. Costo de sobrecarga de escritura: los índices que reducen el rendimiento de INSERT/UPDATE deben estar marcados.
   - Preferir índices compuestos sobre múltiples índices de una sola columna cuando el patrón de consulta lo justifique.
   - Considerar índices parciales (cláusula WHERE) para condiciones dispersas (p. ej., patrones de eliminación lógica, filtros de estado con valores dominantes nulos/inactivos).
   - Considerar índices cubiertos (columnas INCLUDE) para eliminar búsquedas de montículo de tabla para rutas de lectura frecuentes.

4. Marcar índices para eliminar:
   - Índices duplicados.
   - Índices en columnas nunca utilizadas en filtros o combinaciones.
   - Índices que son superados por un índice compuesto.

5. Mostrar un plan de acción priorizado: ALTO (ganancia inmediata, bajo riesgo) / MEDIO (útil, sobrecarga de escritura menor) / BAJO (marginal, evaluar bajo carga).

Indicar el motor de base de datos asumido a partir del contexto de sintaxis o configuración.
