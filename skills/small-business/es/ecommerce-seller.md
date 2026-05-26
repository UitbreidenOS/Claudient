# Vendedor de Comercio Electrónico

## Cuándo activar
- Vende en múltiples plataformas de comercio electrónico (Shopify, Amazon, Etsy, eBay, Walmart) y necesita texto de listado consistente en todas ellas
- Está lanzando un nuevo producto y necesita escribir el listado, la descripción del producto, el título SEO, los puntos de venta y la promoción de lanzamiento en una sesión
- Sus listados de productos existentes no se han actualizado en 6+ meses y desea una pasada de reescritura estructurada
- Un competidor redujo su precio o lanzó un producto similar, y desea reposicionar su listado en respuesta
- Está escalando de una plataforma a múltiples plataformas y necesita cada listado ajustado a cada algoritmo de plataforma

## Cuándo NO usar
- Tiene un equipo de voz de marca o copywriter dedicado — deberían ser dueños de esto, no una IA
- Está vendiendo un producto regulado (suplementos, alcohol, CBD) donde los reclamos del listado tienen exposición legal que requiere revisión humana de cumplimiento en cada palabra
- Vende productos personalizados o hechos por encargo donde cada listado es único y la brevedad importa más que la completitud
- Su recuento de SKU es inferior a 5 — a ese volumen, escribir a mano es más rápido que ajustar salidas de IA

## Instrucciones

### Paso 1: Configure el contexto del producto una sola vez

Antes de redactar cualquier listado, proporcione a Claude el contexto del producto. Esta es una configuración única por producto o por familia de productos.

Diga:

„Vendo [tipo de producto] bajo la marca [su marca]. Mi cliente ideal es [persona — edad, etapa de vida, dolor o caso de uso]. Mi voz de marca es [premium / lúdico / técnico / casual / cálido]. Mis tres competidores más grandes en este producto son [nómbrelos, con enlaces si los tiene]. Los beneficios clave del producto son [lista 3-5, en orden de importancia]. Las objeciones más comunes del producto son [lista 2-3]."

Claude confirmará el contexto nuevamente y señalará cualquier cosa que falte.

### Paso 2: Elija las plataformas

Dígale a Claude dónde necesita vivir este listado. Cada plataforma tiene su propio algoritmo y mejores prácticas:

- **Shopify**: descripciones más largas, estilo narrativo, SEO importante
- **Amazon**: impulsado por puntos, títulos densos en palabras clave, contenido A+ para vendedores de marca
- **Etsy**: Las etiquetas SEO son críticas, descripciones impulsadas por narrativa, señales de autenticidad hecha a mano/vintage
- **eBay**: carga de palabras clave de títulos, especificidades de condición, especificidades de elementos completadas
- **Walmart Marketplace**: atributos estructurados, lenguaje de reclamación conservador

Diga: „Redacte este listado para Shopify (forma larga), Amazon (puntos + título de 200 caracteres) y Etsy (etiquetas SEO + descripción)."

### Paso 3: Redacción y revisión

Claude produce un listado por plataforma. Cada uno:

- Coincidirá con su voz de marca del documento de contexto
- Hará referencia a los beneficios clave en el orden en que los clasificó
- Abordará las objeciones que señaló
- Seguirá las convenciones estructurales de la plataforma

Lea cuidadosamente cada uno. Áreas de edición comunes: lenguaje de reclamación (Claude puede ser demasiado agresivo en reclamaciones de beneficios, o demasiado suave), detalles específicos del producto (dimensiones, materiales, componentes que Claude no podía saber), y frases específicas de marca que siempre usa que Claude no incluyó la primera vez.

### Paso 4: Ajustar para SEO

Para Shopify y Etsy, pregúntele a Claude:

„Déme 15 frases de palabras clave que un comprador podría escribir para encontrar este producto. Clasifíquelas por probable intención de compra, no solo volumen de búsqueda."

Obtendrá una lista clasificada. Inserte los 5-7 principales en el texto del listado donde se lean naturalmente. No haga relleno de palabras clave. El objetivo es una mención natural de la frase con mayor intención, más menciones orgánicas de 2-3 frases relacionadas.

### Paso 5: Verificación de consistencia entre plataformas

Si está listando en tres plataformas, pregúntele a Claude:

„Compare los tres borradores. Señale cualquier inconsistencia en especificaciones del producto, implicaciones de precios o reclamaciones que podrían hacer que un comprador que lo encuentre en múltiples plataformas sienta que está viendo productos diferentes."

Esto atrapa los errores tontos — diferentes descripciones de tamaño, diferentes recuentos de características, diferentes reclamaciones „visto en" que solo se agregaron en una plataforma.

### Paso 6: Actualizar en una cadencia

Re-ejecute el flujo de trabajo cada 6 meses en sus 20 SKU principales. Los algoritmos cambian, el posicionamiento de competidores se desplaza, y los listados que eran ajustados hace 9 meses se sienten anticuados hoy. Establezca esto como una revisión trimestral.

## Ejemplo

Vende una sartén de hierro fundido de $42 bajo su marca „Hearth & Anvil," dirigida a cocineros caseros de 30-55 años que se preocupan por el cookware de calidad de reliquia. Está listando en Shopify y Amazon. La sartén se vierte a mano en Pensilvania, se envía con un kit de acondicionamiento de cera de abeja e compite contra un producto Lodge similar a $32.

Proporciona a Claude el contexto. Voz de marca: cálida, ligeramente literaria, hace referencias a la artesanía y la procedencia. Beneficios clave: durabilidad de reliquia, kit de acondicionamiento incluido, pre-sazonado, hecho en Pensilvania. Objeciones: „¿por qué pagar más que Lodge?" y „¿es realmente diferente de una sartén normal?"

Claude produce:

**Listado de Shopify (340 palabras):**
Se abre con una historia sobre la fundición, se introduce en las especificaciones del producto, aborda la comparación de Lodge directamente („Construido para la próxima generación, no la próxima estación"), cierra con el kit de acondicionamiento como la razón para comprar esta sartén específica en lugar de una de $32.

**Título de Amazon (197 caracteres):**
„Sartén de Hierro Fundido Hearth & Anvil de 10 Pulgadas — Vertida a Mano en Pensilvania, Pre-Sazonada, Cookware de Grado de Reliquia con Kit de Acondicionamiento de Cera de Abeja Incluido — Sartén de Hierro Fundido de Uso de Vida"

**Puntos de Amazon (5 de ellos, cada uno 180-200 caracteres):**
1. CALIDAD DE RELIQUIA...
2. KIT DE ACONDICIONAMIENTO INCLUIDO...
3. PRE-SAZONADO...
4. HECHO EN PENSILVANIA...
5. USO DE VIDA...

**Frases SEO (5 principales):**
„sartén de hierro fundido de reliquia", „sartén de hierro fundido hecha en Estados Unidos", „hierro fundido pre-sazonado de 10 pulgadas", „sartén de hierro fundido con kit de acondicionamiento", „cookware de hierro fundido premium"

Dedica 12 minutos a revisar. Nota que Claude escribió „Made in America" — quería „Made in Pennsylvania" en todas partes porque es más específico. Pide un intercambio rápido, obtiene los borradores corregidos en 30 segundos, y pega ambos listados en Shopify y Amazon Seller Central. Tiempo total de inicio a listados en vivo: 45 minutos para un par de listados que habría tomado 3 horas escribir desde cero.

Programa un recordatorio de calendario de 6 meses para re-ejecutar.
