# Claude Design — Capacidades Frontier

## Cuándo activar

- Construir experiencias interactivas que van más allá de la UI estándar — 3D, audio, efectos de partículas o animación inmersiva
- La presentación de la cubierta de lanzamiento o la demostración del producto requiere elementos interactivos en vivo en lugar de capturas de pantalla estáticas
- Prototipado de interfaces de voz o visualizaciones basadas en WebGL antes de comprometerse con una implementación completa
- Crear páginas de destino de marketing donde la distinción visual sea más importante que la compatibilidad del framework
- La demostración de partes interesadas requiere una URL compartible con movimiento e interactividad, no solo una imagen de maqueta

## Cuándo NO usar

- Interfaz de usuario de aplicación comercial estándar — use la habilidad base claude-design y exporte a Claude Code
- Experiencias 3D de grado de producción donde la calidad debe coincidir con los estándares comerciales — use Three.js o Unity directamente
- Cuando la compatibilidad del navegador del cliente es un requisito — las capacidades frontier requieren navegadores modernos (Chrome 110+, Safari 16.4+, Firefox 115+) ; los entornos empresariales más antiguos tendrán problemas
- Cuando el deliverable es un archivo de video descargable — la exportación de video animado como URL compartible solo ; la descarga de MP4 no es compatible
- Cuando el proyecto ya está en Claude Code y la dirección del diseño está bloqueada — itere en código, no en Claude Design

## Instrucciones

### Elementos interactivos 3D

Claude Design genera elementos interactivos 3D usando WebGL. Estos se insertan en el HTML exportado y funcionan sin dependencias adicionales.

Patrones soportados:
- Visualizaciones de globo con rotación de arrastre, zoom de desplazamiento y tooltips de desplazamiento para superposiciones de datos
- Vitrinas de productos con controles orbitales y cambio de material o color
- Formas 3D abstractas para secciones de héroe (esferas, tori, blobs morphing)
- Esculturas de datos — gráficos de barras 3D, gráficos de dispersión, gráficos de red en tres dimensiones

Patrón de solicitud:

```
"Generate an interactive 3D globe showing [data]. Include: rotation on drag,
zoom on scroll, tooltip on hover showing [data fields], [color scheme].
Export as interactive HTML."
```

Limitación: formas personalizadas complejas con geometría irregular tienen bordes ásperos. La capacidad funciona mejor para primitivas 3D comunes y tipos de visualización bien conocidos (globos, cilindros de productos, esferas abstractas). No intente mallas altamente detalladas — entréguelas a una implementación Three.js en Claude Code.

### Interfaces de voz

Claude Design genera prototipos y wireframes de interfaz de voz. El procesamiento de voz se simula en el prototipo — animación de forma de onda, transiciones de estado y representación de respuesta son reales ; el procesamiento y captura de audio real debe estar conectado en Claude Code usando la API Web Audio o un SDK de proveedor.

Patrones soportados:
- Botón de micrófono presionado con forma de onda animada durante el estado de grabación
- Flujos de voz a acción: un comando hablado desencadena una transición de UI o renderización de resultado
- Interfaces de podcast y entrevista con controles de reproducción y pantalla de transcripción sincronizada
- Interfaces de búsqueda por voz con estado de carga animado y representación de lista de resultados

Patrón de solicitud:

```
"Design a voice interface for [use case]. Include: mic button with hold-to-talk
interaction, animated waveform during recording, processing/thinking state,
response display area for [result type]. Color: [palette]."
```

Limitación: todos los estados de voz en el prototipo son simulaciones activadas por clic. Para conectar voz real: exporte el paquete Claude Code, implemente `getUserMedia()` o su SDK de voz en Claude Code, y asigne eventos de SDK a las clases de estado ya en el HTML generado.

### Shaders WebGL y efectos de partículas

Para secciones de héroe visualmente distintivas y tratamientos de fondo. Estos se exportan como HTML independiente con WebGL integrado; no se requiere paso de compilación.

Patrones soportados:
- Sistemas de partículas: nodos flotantes, gráfico de red conectado, movimiento similar al fluido
- Animaciones de gradiente: gradientes de malla, efectos de aurora, campos de ruido animados
- Campos de partículas interactivos que responden a la posición y movimiento del mouse
- Fondos de shader geométrico — bajo poli, voronoi, distorsión de onda

Patrón de solicitud:

```
"Create a hero background with a particle network effect. Approximately 150
particles, connected by lines when within 120px of each other, respond to
mouse movement with a gentle pull force. Color palette: [primary] on [background].
Subtle animation, not distracting."
```

Exportar: HTML interactivo. Entregue a Claude Code para limpieza de producción — reemplace `<script>` en línea con un módulo, mueva la inicialización del lienzo a un hook del ciclo de vida del componente y agregue una verificación de consulta multimedia `prefers-reduced-motion`.

### Escenas de video animado

Secuencias animadas de múltiples escenas para demostraciones de productos, animaciones explicativas e historias de datos.

Patrones soportados:
- Demostración de producto: interfaz anotada con animaciones de proyector y revelaciones paso a paso
- Secuencias explicativas: animaciones de iconos, revelaciones de texto, transiciones de diapositivas
- Animaciones de historias de datos: gráficos y gráficos que se construyen con el tiempo con texto de narración sincronizado

Ruta de exportación: solo URL compartible. Para capturar como video, use un grabador de pantalla (QuickTime, OBS o Loom) apuntando a la URL compartida. Para insertar en un sitio web, use un iframe de la URL compartida. La descarga de MP4 no está disponible: no lo prometa a los clientes.

Patrón de solicitud:

```
"Create a 4-scene animated walkthrough of [product]. Scene 1: [description].
Scene 2: [description]. Scene 3: [description]. Scene 4: [description].
Transitions: slide in from right. Duration: approximately 8 seconds per scene.
Brand colors: [hex values]."
```

### Experiencias interactivas completas

Combinaciones de múltiples elementos frontier en un único prototipo. Estos son experimentales — espere más ciclos de iteración que salidas de capacidad única.

Combinaciones viables:
- Entrada de voz + respuesta de visualización 3D (hable una consulta, el gráfico 3D se actualiza)
- Fondo WebGL + enlace de datos en vivo (densidad de partículas impulsada por entrada numérica)
- Secciones de video animado + controles interactivos en línea

Estrategia de solicitud para experiencias combinadas: construya cada capacidad por separado, valídela, luego solicite la combinación. Intentar una experiencia completamente combinada en una solicitud aumenta la posibilidad de errores estructurales en la salida.

### Estrategia de exportación para diseños Frontier

| Entregable | Ruta de exportación | Cuándo usar |
|---|---|---|
| HTML interactivo | Descargar desde Claude Design | Demostraciones de navegador, implementación directa, inserción de iframe |
| Entrega de Claude Code | Paquete de exportación | Implementación de producción con API reales |
| Grabación de pantalla | Grabar URL compartida | Captura de video animado, presentación del cliente |
| URL compartida | Copiar desde Claude Design | Revisión de partes interesadas, retroalimentación asíncrona |

Al exportar HTML interactivo para producción, pase el archivo a Claude Code con esta solicitud:

```
"Clean up this Claude Design HTML export for production. Extract inline styles
to a CSS file, move inline scripts to a module, add prefers-reduced-motion
support, and ensure it passes WCAG 2.1 AA contrast checks."
```

### Madurez actual

Estable y confiable:
- Globos 3D interactivos y órbitas de vitrina de productos estándar
- Efectos de red de partículas y puntos flotantes
- Wireframes de interfaz de voz con transiciones de estado simuladas
- Transiciones y revelaciones animadas basadas en CSS y JS

Bordes ásperos — espere iteración:
- Simulaciones de física complejas (paño, fluido, apilamiento de cuerpos rígidos)
- Código de shader GLSL personalizado más allá de patrones de ruido comunes
- Enlace de datos externo en tiempo real en el HTML exportado

No soportado:
- Descargar secuencias animadas como MP4 o GIF
- Interacciones colaborativas en tiempo real complejas o multijugador
- Experiencias WebXR o AR/VR

## Ejemplo

Fundador solitario que construye una demostración de producto SaaS para una reunión de inversores. Necesidades: héroe animado, carrusel de captura de pantalla de producto con profundidad y prototipo de búsqueda por voz — todo compartible como URL.

Paso 1 — Construir cada elemento por separado:

```
Prompt 1 (hero):
"Create a hero section with a particle network background. ~120 particles,
connected within 100px, mouse-responsive. Headline: 'Search your codebase
with voice.' CTA button: 'Try the demo'. Primary: #5B21B6, background: #0F0A1E."

Prompt 2 (carousel):
"Build a product screenshot carousel with 3 slides. Each slide tilts in 3D
on hover (15deg X rotation, subtle shadow depth). Transition: fade + scale.
Use placeholder screenshots. Same brand colors as the hero."

Prompt 3 (voice prototype):
"Design a voice search interface. Hold-to-talk mic button centered on screen.
Animated waveform rings during recording state. 'Processing...' spinner.
Results list fades in below. Simulate: 3-second recording, 1-second processing,
then show 4 mock results."
```

Paso 2 — Combinar en una única página:

```
"Combine the hero, carousel, and voice interface into a single-page layout.
Order: hero (full viewport), carousel section (centered, 80vw), voice interface
(full viewport, dark background). Add smooth scroll between sections."
```

Paso 3 — Decisión de exportación:

La demostración permanece en Claude Design como URL compartible para la reunión de inversores. Después de la reunión, exporte el paquete Claude Code y conecte el prototipo de voz a la API de búsqueda real usando la API Web Speech en Claude Code. El héroe de partículas y el carrusel 3D se portan directamente — sin dependencia de API real.
