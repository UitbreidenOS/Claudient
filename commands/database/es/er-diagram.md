---
description: Generar un diagrama ER en Mermaid o PlantUML a partir del esquema de la base de datos del proyecto
argument-hint: "[archivo de esquema, nombres de tabla o directorio]"
---
Generar un diagrama entidad-relación para: $ARGUMENTS

Si $ARGUMENTS es una ruta de archivo, léelo. Si es un nombre de tabla o una lista separada por comas, ubica sus definiciones en migraciones, modelos ORM o archivos de esquema. Si es un directorio, escanea todas las definiciones de esquema dentro de él.

Pasos:

1. Extraer información de esquema:
   - Nombres de tabla y sus columnas (nombre, tipo, nulabilidad, valor por defecto).
   - Claves primarias (simples y compuestas).
   - Claves foráneas y las relaciones que representan (uno a uno, uno a muchos, muchos a muchos a través de tablas de unión).
   - Restricciones únicas que implican cardinalidad.

2. Detectar preferencia de formato de diagrama:
   - Si el proyecto ya contiene archivos `.mmd`, `mermaid` o PlantUML, coincide con ese formato.
   - Por defecto, usa la sintaxis `erDiagram` de Mermaid (se renderiza en GitHub, Notion, la mayoría de herramientas de documentación).
   - Si el usuario especificó PlantUML, usa `@startuml` / `@enduml` con bloques de entidad.

3. Producir el diagrama:
   - Incluye todas las columnas con sus tipos en los bloques de entidad.
   - Muestra líneas de relación con la notación correcta de cardinalidad de Mermaid:
     - `||--o{` uno a muchos
     - `||--||` uno a uno
     - `}o--o{` muchos a muchos
   - Etiqueta cada línea de relación con el nombre de la clave foránea o una etiqueta semántica corta.
   - Agrupa tablas de unión/asociación visualmente distintas si es posible mediante comentarios.

4. Si el esquema es grande (>15 tablas), produce dos diagramas:
   - Una descripción general de alto nivel mostrando solo tablas y relaciones (sin detalles de columnas).
   - Un diagrama detallado para el subconjunto de tablas en $ARGUMENTS o las tablas de dominio principales.

5. Después del diagrama, produce:
   - Una breve leyenda explicando cualquier abreviatura no obvia utilizada en tipos de columnas.
   - Una lista de cualquier relación implícita encontrada en el código pero no declarada como restricción FK.
   - Cualquier tabla de unión que represente conceptos de dominio que valga la pena renombrar para mayor claridad.

Produce el diagrama en un bloque de código delimitado con la etiqueta de lenguaje correcta (`mermaid` o `plantuml`).
