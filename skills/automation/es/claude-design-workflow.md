# Claude Design — Flujos de trabajo de extremo a extremo

## Cuándo activar

- Inicio de un nuevo proyecto y necesidad de un proceso repetible de diseño a producción en lugar de indicaciones ad hoc
- Un miembro del equipo es nuevo en Claude Design y necesita un enfoque estructurado para evitar sesiones desperdiciadas
- Cambio entre contextos de diseño — velocidad de inicio, consistencia del equipo de productos, exploración dirigida por diseño o lanzamiento de marketing
- Las sesiones existentes de Claude Design consumen excesivos tokens sin converger hacia una dirección

## Cuándo NO usar

- Prototipos únicos desechables sin implementación posterior — omita el flujo de trabajo, invite directamente
- Proyectos donde Figma es la fuente de verdad y el equipo debe aprobar archivos de Figma antes de que comience el desarrollo — use las herramientas de IA de Figma e importe manualmente a Claude Code
- Cuando se requieren maquetas de aprobación del cliente de precisión de píxeles antes de cualquier desarrollo — Claude Design no es un reemplazo de Figma para esa puerta
- Cuando una dirección de diseño ya está bloqueada en Claude Code — no vuelva a Claude Design; itere en código

## Instrucciones

Cuatro flujos de trabajo que cubren los cuatro contextos de uso más comunes. Cada uno está diseñado para minimizar el desperdicio de tokens y el tiempo hasta la producción.

---

### Flujo de trabajo 1: Validación rápida (Startup / MVP)

Objetivo: dirección de interfaz de usuario validada de especificación a código de trabajo en menos de seis horas, mismo día.

**Fase 1 — Concepto (30 minutos, una sesión)**

Abra una sesión fresca de Claude Design. Proporcionar:
- Audiencia objetivo (una oración)
- Características principales a mostrar (3–5 máximo)
- Restricciones de marca: dos colores hexadecimales y una referencia de fuente (nombre de Google Font o descriptor de estilo como « sans geométrico »)

Solicitud:

```
"Show 3 layout directions for [product type] targeting [audience]. Core features:
[feature 1], [feature 2], [feature 3]. Brand: primary [hex], accent [hex],
[font name or descriptor]. Show all 3 side by side."
```

Salida: tres direcciones de diseño distintas. Decisión: elige la dirección ganadora y anota uno o dos elementos específicos de los otros que vale la pena llevar (color de A, tratamiento de tarjeta de B).

**Fase 2 — Refinamiento (30 minutos, sesión igual o nueva)**

Aplique decisiones transversales con una instrucción específica:

```
"Apply [element from version A] to [layout of version B]. Keep [specific element].
Change [specific element] to [target state]."
```

Use el panel Tweaks para ajustes de espaciado, peso de tipografía e intensidad de color. Esto no cuesta tokens. Solicite solo cambios estructurales que Tweaks no pueda manejar.

Salida: dirección única refinada. No continúe iterando más allá de un paso de refinamiento — el perfeccionismo en esta fase retrasa la producción sin mejorar el producto final.

**Fase 3 — Entrega a Claude Code (inmediatamente después del bloqueo de dirección)**

Exporte el paquete de Claude Code. Entréguelo a Claude Code con el objetivo de implementación:

```
"Implement this Claude Design bundle as [React with Tailwind / plain HTML+CSS /
Vue with shadcn]. Match the token values exactly. Use the layout as a reference,
not a pixel-perfect spec. Flag any deviations from the design."
```

No vuelva a Claude Design después de este punto. Toda iteración de interfaz de usuario ocurre en Claude Code contra el árbol de componentes real.

Resultado: dirección validada a código de producción, mismo día, menos de seis horas.

---

### Flujo de trabajo 2: Fundación del sistema de diseño (Equipos de productos)

Objetivo: un contexto de sistema de diseño reutilizable que hace que cada sesión futura de Claude Design sea consistente y eficiente en tokens.

**Sesión 0 — Configuración del sistema (2–3 horas, se ejecuta una vez)**

Esta sesión es alto uso de tokens y se ejecuta una vez. Trátala como una inversión — reduce el costo por sesión de función un 60–70% después.

Proporcionar:
- Base de código (o resumen de la biblioteca de componentes en uso — shadcn/ui, MUI, Radix, etc.)
- 5–10 capturas de pantalla de pantallas de productos terminados mostrando el lenguaje visual existente
- Documento de directrices de marca o resumen escrito (colores, tipografía, principios de espaciado, no hagas)

Solicitud:

```
"Extract the design system from these product screenshots and brand guidelines.
Identify: color tokens (primary, secondary, surface, border, text hierarchy),
typography scale (size, weight, line-height per level), spacing scale,
border radius values, and shadow tokens. Output as a JSON token file and a
summary of the component conventions (card style, button variants, input style).
Then generate a test component — a feature card — using the extracted system."
```

Valide el componente de prueba contra una captura de pantalla de producto real. Corrija cualquier error de extracción antes de continuar. Una vez que el sistema sea correcto, exporte el archivo de tokens (formato JSON) y guárdelo en:

```
project-root/
└── design-system/
    └── tokens.json       ← from Claude Design extraction
    └── system-notes.md   ← component conventions in plain text
```

Guarde esta sesión como Claude Project para que el contexto del sistema de diseño persista en todas las futuras sesiones de diseño sin recarga.

**Sesiones por función (después de la configuración del sistema)**

Abra una sesión en el Claude Project que contiene el sistema de diseño. Marca y tokens ya están en contexto — no recargue.

Solicitud para una nueva función:

```
"Design the [feature name] screen. Users need to [primary task]. Key elements:
[list]. Follow the established design system. Use existing component patterns
where they apply."
```

El uso de tokens es 60–70% menor que una sesión ingenua del sistema porque se eliminan ciclos de corrección. La salida coincidirá con el producto existente sin aplicación de marca explícita en cada solicitud.

**Integración con desarrollo**

Exporte el paquete Claude Code por función. Los valores de token en el paquete coinciden con el archivo de tokens en `design-system/tokens.json`. Si la base de código ya importa estos tokens (vía variables CSS o extensión Tailwind), los componentes generados heredarán valores correctos sin mapeo manual.

---

### Flujo de trabajo 3: Exploración primero (Equipos dirigidos por diseño)

Objetivo: alineación de equipo en dirección de diseño antes de que se realice tiempo de ingeniería.

**Fase 1 — Exploración amplia (1–2 horas)**

Genere un rango de direcciones en lugar de una sola respuesta:

```
"Show 5 directions for the [page or feature] homepage hero. Each should have a
distinct visual personality — vary layout, typography weight, and color treatment.
Label them 1–5."
```

Utilice el panel Tweaks para mezclar entre direcciones: « Aplique la tipografía de la dirección 3 al diseño de la dirección 1. » Documentar hallazgos según avanza — captura de pantalla y nota breve describiendo qué funciona en cada una (no « me gusta » sino « el tipo grande en fondo oscuro se lee como autoritario, que encaja con el comprador empresarial »).

No solicite repetidamente en esta fase intentando llegar a una respuesta final. La exploración es la salida.

**Fase 2 — Validación de dirección (30 minutos)**

Seleccione las 2–3 direcciones principales. Comparta cada una como URL de Claude Design. Recopile comentarios de partes interesadas en una sola ronda — no una serie de hilos asincrónica. Los comentarios deben ser específicos:

Comentarios aceptables: « El espaciado de la tarjeta se siente apretado en móvil » / « El color secundario es demasiado similar al primario — no se están diferenciando. »

Comentarios a declinar (volver con pregunta aclaratoria): « Hazlo más premium » / « Debería destacarse más. »

Aplicar comentarios estructurales mediante solicitudes. Aplicar comentarios de ajuste visual mediante el panel Tweaks. Complete esta fase en una sesión.

**Fase 3 — Ruta de producción**

Después de la validación de dirección, elija una ruta y no las mezcle:

| Herramientas de equipo | Ruta |
|---|---|
| Figma como fuente de verdad | Dirección validada de captura de pantalla, recree manualmente en Figma (o use Canva como puente para equipos sin Figma) |
| Claude Code como capa de implementación | Paquete Claude Code de exportación, implementar |
| Publicación directa (páginas de marketing) | HTML independiente de exportación, implementar |

No dedique tiempo adicional en Claude Design después de la validación de dirección. El valor de este flujo de trabajo es la alineación que produce — no la calidad pixel de la salida de Claude Design.

---

### Flujo de trabajo 4: Generación de página de destino (Equipos de marketing / Constructores solitarios)

Objetivo: página de destino lista para producción en menos de una hora sin formación en diseño.

**Paso 1 — Preparar un paquete de entrada (5 minutos)**

Reunir antes de abrir Claude Design:
- Encabezado y subencabezado (copia final, no marcadores de posición)
- Tres propuestas de valor (una oración cada una)
- Una etiqueta de CTA
- Dos códigos de color hexadecimal (si ninguno, use descriptor de estilo: « azul marino profundo y cian eléctrico » o « crema cálida y verde bosque »)
- Preferencia de fuente o descriptor de estilo (« geometría moderna » / « serif humanista » / « SaaS neutro »)
- Descripción de audiencia (una oración: quiénes son, qué les importa)

**Paso 2 — Solicitud densa única**

Entregue todas las entradas en una solicitud. No se divida en múltiples intercambios — una solicitud densa única produce una salida inicial más coherente que aclaraciones iterativas.

```
"Build a landing page for [company]. Audience: [description — who they are,
what they care about]. Headline: '[headline]'. Subheadline: '[subheadline]'.
Value props: [prop 1] / [prop 2] / [prop 3]. CTA: '[label]'. Brand: primary
[hex or descriptor], secondary [hex or descriptor], [font style].

Section order: hero (headline + subheadline + CTA), features (3-column, value props),
social proof (logo strip or testimonial), final CTA (full-width, high contrast).

Aesthetic: [one concrete reference — e.g., 'Linear.app's dark precision' or
'Stripe's clean density' or 'Notion's approachable minimalism']. Not generic SaaS,
not card-heavy, not stock-photo hero."
```

La referencia estética al final tiene alto apalancamiento. Una referencia concreta produce salida más distintiva que adjetivos abstractos.

**Paso 3 — Revisión de Tweaks (10–15 minutos)**

Antes de solicitar nuevamente, use el panel Tweaks para ajustar:
- Peso de tipografía (encabezados más audaces a menudo mejoran la jerarquía sin re-solicitud completa)
- Espacio en blanco y relleno de sección
- Intensidad de color y contraste
- Orden de sección (arrastrar para reorganizar sin costo de tokens)

Este paso es gratis — no cuesta tokens y a menudo resuelve 40–60% de problemas visuales que de otro modo requerirían una solicitud.

**Paso 4 — Una ronda de solicitud específica (5 minutos)**

Aborde solo problemas estructurales que Tweaks no pueda reparar. Sea específico:

```
"The hero CTA button is too small relative to the headline. Make it full-width
on mobile and 240px wide on desktop. Keep all other elements unchanged."
```

Acepte salida 80–90% perfecta. No persiga la perfección en Claude Design — el último 10% es más rápido de reparar en Claude Code o directamente en HTML exportado.

**Paso 5 — Exportar e implementar**

Elija una ruta de exportación:

| Destino de implementación | Exportación | Notas |
|---|---|---|
| Shopify / WordPress / ClickFunnels | HTML independiente | CSS independiente, sin paso de compilación, soltar directamente en bloque HTML del generador de páginas |
| CMS personalizado o contenido dinámico | Paquete Claude Code | Implementar en Claude Code; conectar campos dinámicos a datos CMS |
| Pulido colaborativo antes de publicar | Exportación Canva | Para equipos que necesitan edición no programador antes del lanzamiento |
| Implementación directa de archivo (S3, Netlify Drop) | HTML independiente | Funciona sin herramientas de compilación |

Resultado: página de destino de producción, 45–60 minutos, sin formación en diseño requerida.

## Ejemplo

Un fundador SaaS en solitario está lanzando una página de lista de espera para una herramienta de revisión de código alimentada por IA. Tienen copia final, sin diseñador y una demostración de conferencia en cuatro horas.

**Paquete de entrada:**

- Encabezado: « Revisión de código que piensa como un ingeniero senior »
- Subencabezado: « Revisión impulsada por IA que detecta errores de lógica, no solo estilo. »
- Propuestas de valor: « Se integra con GitHub en 60 segundos » / « Explica por qué, no solo qué » / « Cero configuración, funciona en cualquier pila »
- CTA: « Únete a la lista de espera »
- Marca: primaria #1C1C2E, acento #6EE7B7, fuente: « sans geométrico limpio »
- Audiencia: « ingenieros de nivel intermedio en startups frustrados por revisión de PR superficial de compañeros »

**Solicitud de paso 2:**

```
"Build a landing page for Revue, an AI code review tool. Audience: mid-level
engineers at startups frustrated by shallow PR review. Headline: 'Code review
that thinks like a senior engineer'. Subheadline: 'AI-powered review that catches
logic errors, not just style.' Value props: 'Integrates with GitHub in 60 seconds'
/ 'Explains why, not just what' / 'Zero configuration, works on any stack'.
CTA: 'Join the waitlist'. Brand: primary #1C1C2E, accent #6EE7B7, geometric sans.

Section order: hero, features (3-column), waitlist form (email input + CTA),
minimal footer.

Aesthetic: Linear.app's dark precision. Not card-heavy, not stock-photo hero,
not generic SaaS purple."
```

**Paso 3 — Decisiones de Tweaks:**

- Peso de fuente de encabezado aumentado de normal a audaz (jerarquía mejorada inmediatamente)
- Relleno de sección reducido — el predeterminado tenía demasiado aire entre héroe y características
- Intensidad de color de acento desplazada hacia abajo 10% — el predeterminado #6EE7B7 era demasiado saturado contra fondo oscuro

**Paso 4 — Una solicitud:**

```
"The waitlist form section needs a subtle divider from the features section above it.
Add a thin horizontal rule in #2E2E42. Keep everything else as-is."
```

**Decisión de exportación:** HTML independiente. El fundador utiliza Netlify Drop — arrastre el archivo, en vivo en 30 segundos. Sin CMS necesario; la acción del formulario de lista de espera apuntará a una URL de inserción de Mailchimp agregada manualmente al HTML después de la exportación.
