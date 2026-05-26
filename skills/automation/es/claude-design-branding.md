# Configuración del sistema de marca Claude Design

## Cuándo activar

- Configuración de Claude Design por primera vez para un proyecto o empresa — no existe un sistema de diseño previo en la herramienta
- Iniciar un nuevo proyecto de cliente en Claude Design donde el cliente tiene una marca existente
- La salida de diseño de Claude Design no coincide con la marca de la empresa (los colores están apagados, la tipografía es incorrecta, el espaciado se siente inconsistente)
- Los miembros del equipo obtienen resultados inconsistentes entre sesiones porque no hay un punto de partida compartido

## Cuándo NO usar

- Prototipo único que no será reutilizado o entregado — el costo de configuración supera el valor
- Exploración de una identidad visual completamente nueva donde no existe marca existente — está definiendo la marca, no la traducción
- Maqueta rápida desechable para validación única — omita la configuración e invite directamente

## Instrucciones

### Paso 1: Fundación de marca

Antes de tocar colores o tipografía, dé a Claude el contexto que rige todas las decisiones visuales.

Proporcionar:

- Nombre de la empresa e industria
- Audiencia objetivo (sea específica — « administradores de compras empresariales de 35-55 años » es más útil que « B2B »)
- Tres adjetivos de personalidad de marca (por ejemplo, « preciso, accesible, moderno » o « audaz, lúdico, enérgico »)
- Descriptor de tono: profesional / casual / lúdico / autoritario
- Cualquier declaración de marca existente o línea de posicionamiento

Claude usa esto para generar principios visuales fundamentales — la capa de razonamiento que se encuentra detrás de cada opción de color y espaciado. Cuando más adelante pregunta « ¿se ve bien », Claude evalúa contra estos principios, no adivina.

Documente la salida. Pegarlo en la parte superior de cada nueva sesión como parte de su apéndice de sesión.

### Paso 2: Sistema de color

Defina todos los roles de color explícitamente. No permita que Claude deduzca la paleta de un único color principal — nombre todos los roles.

**Paleta primaria:**
- Primario: el color de acción dominante (botones, enlaces, destacados clave)
- Primario hover: oscurecido 10-15% para estados de interacción
- Primario sutil: aclarado 85-90% para fondos y matices

**Paleta secundaria:**
- Secundario: color de acento de apoyo
- Secundario hover
- Secundario sutil

**Paleta neutra:**
- Neutro 50 a Neutro 950 (o escala equivalente) — usado para superficies, bordes, texto

**Colores semánticos** — siempre especifique valores hexadecimales, no dependa de valores predeterminados:
- Éxito: típicamente verde (#16A34A como punto de referencia)
- Advertencia: típicamente ámbar (#D97706)
- Error: típicamente rojo (#DC2626)
- Info: típicamente azul (#2563EB)

Cada color semántico necesita un par de primer plano — el color de texto que se encuentra encima y pasa el contraste WCAG AA (4.5:1 para texto de cuerpo, 3:1 para texto grande).

**Colores de superficie:**
- Fondo: fondo a nivel de página
- Superficie: fondo de tarjeta y panel
- Superficie elevada: componentes elevados (modales, desplegables)
- Superposición: Scrim detrás de modales

**Colores de texto:**
- Texto primario: texto del cuerpo en superficies claras
- Texto secundario: texto de apoyo, etiquetas
- Texto desactivado: texto apagado, no interactivo
- Texto inverso: texto en fondos oscuros o coloreados

Incluya validación WCAG AA explícita para cada combinación de texto/fondo que defina. Claude marcará fallas si lo solicita, pero es más rápido validar en el momento de la definición que descubrir problemas de contraste durante la generación de componentes.

### Paso 3: Escala de tipografía

Especifique emparejamientos de fuentes que coincidan con la personalidad de la marca — la opción de emparejamiento señala más sobre el carácter de la marca que cualquier otra decisión única.

Patrones de emparejamiento comunes:

- Autoritario/empresa: sans geométrico para encabezados (Inter, DM Sans) + sans humanista para cuerpo (Source Sans Pro)
- Editorial/premium: serif para pantalla (Playfair Display, Libre Baskerville) + sans para cuerpo (Inter)
- Técnico/desarrollador: mono para acento de código (JetBrains Mono) + sans neutro para todo lo demás (Inter)
- Lúdico/consumidor: sans redondeado para encabezados (Nunito, Poppins) + sans neutro para cuerpo

Defina la escala completa con nombres semánticos, no números de tamaño:

**Encabezados:**

| Token | Tamaño | Peso | Altura de línea | Uso |
|---|---|---|---|---|
| display | 3rem | 700 | 1.1 | Encabezados hero, pantallas de presentación |
| h1 | 2.25rem | 700 | 1.2 | Títulos de página |
| h2 | 1.875rem | 600 | 1.25 | Encabezados de sección |
| h3 | 1.5rem | 600 | 1.3 | Encabezados de subsección |
| h4 | 1.25rem | 600 | 1.35 | Encabezados de tarjeta, títulos de barra lateral |

**Cuerpo:**

| Token | Tamaño | Peso | Altura de línea | Uso |
|---|---|---|---|---|
| body-large | 1.125rem | 400 | 1.6 | Párrafos principales, introducciones |
| body | 1rem | 400 | 1.6 | Texto de párrafo predeterminado |
| body-small | 0.875rem | 400 | 1.5 | Texto de apoyo, metadatos |
| caption | 0.75rem | 400 | 1.4 | Leyendas de imagen, letra pequeña |

**Utilidad:**

| Token | Tamaño | Peso | Altura de línea | Uso |
|---|---|---|---|---|
| label | 0.875rem | 500 | 1.2 | Etiquetas de formulario, encabezados de tabla |
| overline | 0.75rem | 600 | 1.2 | Etiquetas de categoría, marcadores de sección — siempre mayúsculas |
| code | 0.875rem | 400 | 1.6 | Código en línea, bloques de código |

Claude Design aplica estos tokens automáticamente a cada elemento generado una vez que se establece el sistema. No necesita volver a especificar tamaños por solicitud.

### Paso 4: Directrices de logotipo

Proporcione a Claude las restricciones que debe respetar en cada salida. Esto previene que Claude improvise con su logotipo de manera que viole los estándares de marca.

Especificar:

- **Variantes disponibles:** primaria (logotipo completo), invertida (versión blanca/clara para fondos oscuros), solo icono (marca sin marca de palabras)
- **Combinaciones de color aprobadas:** logotipo principal en blanco, logotipo invertido en fondo de color principal, etc.
- **Regla de espacio claro:** espacio claro mínimo en todos los lados, expresado como múltiplo de una unidad de logotipo (típicamente la altura de la altura x o altura de mayúscula del símbolo)
- **Tamaños mínimos:** ancho mínimo en píxeles para uso digital, ancho mínimo en milímetros para impresión
- **Modificaciones prohibidas:** sin cambio de color, sin rotación, sin estiramiento, sin sombras de gota, sin trazos de esquema

Si tiene un PDF de guía de marca con especificaciones de logotipo, cárguelo durante la Sesión 0. Claude lee y respeta estas restricciones en salidas posteriores sin necesidad de volver a especificarlas por sesión.

### Paso 5: Biblioteca de componentes — Comience con componentes de alta frecuencia

Construya primero los componentes que Claude usará con más frecuencia. Los componentes de alta frecuencia aparecen en casi todas las pantallas; hacerlos bien elimina la mayor fuente de desviación de marca.

Orden de prioridad:

**Botones** — defina cuatro variantes base:
- Primario: lleno, usa `color-primary`, texto blanco
- Secundario: contorneado, borde y texto `color-primary`, fondo transparente
- Fantasma: sin borde, texto `color-primary`, fondo transparente
- Destructivo: lleno, usa `color-error`, texto blanco

Para cada variante, especifique: altura, relleno horizontal, radio de borde, token de fuente, y todos los estados de interacción (predeterminado, pasar el mouse, activo, enfoque visible, deshabilitado). El estado deshabilitado debe usar opacidad reducida o un color apagado específico — nunca elimine el elemento del diseño.

**Entradas de formulario** — defina: entrada de texto, textarea, seleccionar, casilla de verificación, botón de radio. Para cada uno: altura (entradas), color de borde (predeterminado, enfoque, error, deshabilitado), posición de etiqueta, posición de texto de ayuda, estilo de mensaje de error.

**Tarjetas** — defina variantes por tipo de contenido:
- Tarjeta de contenido: imagen + título + cuerpo + CTA opcional
- Tarjeta de lista: icono o avatar + título + texto secundario + acción opcional
- Tarjeta de estadísticas: valor de métrica + etiqueta + indicador de tendencia opcional

Incluir estado de desplazamiento (cambio de elevación o resaltado de borde) para tarjetas interactivas.

**Navegación** — defina: encabezado principal (logo + enlaces de navegación + CTA + disparador de menú móvil), navegación de barra lateral (enlaces agrupados + estado activo + enlaces anidados), ruta de migas.

Para cada componente: especifique el espaciado exacto (use sus tokens de escala de espaciado, no valores de píxeles), colores (use sus tokens de color), radio de borde (consistente con su token de radio global), tokens de tipografía y todos los estados de interacción.

### Paso 6: Capa de documentación

Para cada componente en su biblioteca, escriba un contrato de uso compacto. Esta es la capa que previene el abuso y hace que el sistema sea auto-enseñanza para los miembros del equipo.

Para cada documentación de componente:

**Cuándo usar** — escenarios específicos donde este componente es la opción correcta. « Use el botón principal para la acción de prioridad más alta en una página o modal. »

**Cuándo NO usar** — antipatrones. « No use botón principal para más de una acción por pantalla. No lo use para navegación — use un enlace en su lugar. »

**Componentes relacionados** — guía de navegación. « Si necesita una acción secundaria, use botón secundario o botón fantasma. Si necesita navegación en línea, use un enlace de texto. »

**Notas de accesibilidad** — requisitos mínimos:
- Estado de enfoque: anillo de enfoque visible (desplazamiento de 2px, anillo `color-primary` o equivalente de alto contraste)
- Rol ARIA: especificar para elementos no nativos
- Independencia de color: nunca transmitir estado únicamente mediante color (agregue icono o etiqueta de texto junto con color)
- Destino de toque mínimo: 44x44px para elementos interactivos

### Paso 7: Exportar y mantener

Envíe su sistema de diseño completo en tres formatos simultáneamente para que pueda ser consumido por cualquier cadena de herramientas descendente.

```css
/* Propiedades CSS personalizadas — pegue en :root en hoja de estilo global */
:root {
  /* Color — primary */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-subtle: #EFF6FF;

  /* Color — semantic */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #2563EB;

  /* Color — surface */
  --color-background: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-surface-raised: #FFFFFF;

  /* Color — text */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #D1D5DB;
  --color-text-inverse: #FFFFFF;

  /* Typography */
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}
```

```json
{
  "color": {
    "primary": { "value": "#2563EB" },
    "primary-hover": { "value": "#1D4ED8" },
    "primary-subtle": { "value": "#EFF6FF" },
    "success": { "value": "#16A34A" },
    "warning": { "value": "#D97706" },
    "error": { "value": "#DC2626" },
    "info": { "value": "#2563EB" },
    "background": { "value": "#FFFFFF" },
    "surface": { "value": "#F9FAFB" },
    "text-primary": { "value": "#111827" },
    "text-secondary": { "value": "#6B7280" },
    "text-disabled": { "value": "#D1D5DB" },
    "text-inverse": { "value": "#FFFFFF" }
  },
  "spacing": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" }
  },
  "radius": {
    "sm": { "value": "0.25rem" },
    "md": { "value": "0.5rem" },
    "lg": { "value": "0.75rem" },
    "full": { "value": "9999px" }
  }
}
```

```js
// tailwind.config.js — extend theme with brand tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: '#EFF6FF',
        },
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#2563EB',
        surface: '#F9FAFB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-disabled': '#D1D5DB',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
}
```

Control de versión del archivo tokens JSON. Trátelo como fuente de verdad — las configuraciones de CSS y Tailwind se derivan de él. Cuando la marca evoluciona, actualice el JSON de tokens primero, luego regenere los otros formatos.

### Paso de validación

Antes de usar el sistema en cualquier proyecto real, ejecute una verificación de validación. Genere un componente de prueba — un grupo de botones que contiene variantes primaria, secundaria, fantasma y destructiva — y verifique:

- Los colores coinciden exactamente con sus valores hexadecimales definidos
- Se aplican tokens de tipografía (no valores predeterminados de Claude)
- El espaciado y radio de borde son consistentes con su escala
- Los estados de desplazamiento están presentes y correctos

Si la salida se ve desactivada en cualquier dimensión, vuelva a cargar las capturas de pantalla de producto terminadas y el apéndice de sesión, luego regenere. La falta de alineación al momento de la validación casi siempre es causada por contexto incompleto en la Sesión 0, no por desviación de Claude Design.

Corrígelo antes de construir pantallas reales. Corregir la desviación de marca en 12 pantallas generadas es costoso. Corregir en la etapa del grupo de botones cuesta una solicitud.

## Ejemplo

Una agencia configurando una marca de cliente de comercio electrónico — compañía de ropa deportiva, venta directa al consumidor, público objetivo 25-40 profesionales urbanos activos.

**Prompt del sistema de color de la Sesión 0:**

```
Define the complete color system for Velo, a sportswear brand.
Personality: bold, energetic, precise.
Primary: #E11D48 (rose-600). Compute primary-hover at 15% darker, primary-subtle at 90% lighter.
Secondary: #0EA5E9 (sky-500). Same derivation.
Neutral scale: use slate (slate-50 through slate-950).
Semantic: success #16A34A, warning #D97706, error #DC2626, info #0EA5E9.
Surface: background white, surface slate-50, surface-raised white.
Text: primary slate-900, secondary slate-500, disabled slate-300, inverse white.
Output as CSS custom properties, design tokens JSON, and Tailwind config extension.
Validate WCAG AA contrast for all text/background pairs and flag failures.
```

**Salida esperada:** conjunto completo de tokens en los tres formatos, con una tabla de validación de contraste que señala cualquier falla (el texto blanco en primario-sutil fallará — Claude debe señalarlo y sugerir slate-900 o primario como el primer plano correcto).

**Uso posterior de la sesión:** pegue el apéndice de sesión de 150 palabras (personalidad de marca, color primario, emparejamiento de tipografía) al inicio de cada nueva sesión. Claude aplica el conjunto de tokens completo sin cargar archivos nuevamente. Página de producto, cajón de carrito, flujo de pago — todos generados con aplicación de marca consistente entre sesiones.
