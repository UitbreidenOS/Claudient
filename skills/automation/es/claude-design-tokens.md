# Gestión de tokens de diseño Claude

## Cuándo activar

- Está a punto de iniciar una sesión de Claude Design en Claude Pro o Max y desea planificar el uso de tokens antes de abrir la herramienta
- Ha alcanzado límites de tokens a mitad de sesión y necesita estrategias de recuperación para continuar el trabajo
- Está construyendo para un equipo y necesita optimizar el uso colectivo entre múltiples miembros que comparten un plan
- Está planificando una serie de proyectos de diseño relacionados (panel + página de destino + presentación) y necesita secuenciarlos eficientemente

## Cuándo NO usar

- Tiene Claude Max 20× — la presión de tokens es mínima en ese nivel; enfóquese en cambio en la calidad de la salida
- Está haciendo una exploración única que no necesita preservar o entregar a otro
- Ya ha construido y estabilizado su sistema de diseño — la mayoría de las estrategias siguientes se aplican durante la configuración y la producción activa, no el mantenimiento

## Instrucciones

### Estrategia 1: ROI del sistema de diseño — Construir antes de construir

La inversión de token con mayor apalancamiento es la Sesión 0: construya el sistema de diseño completo antes de tocar cualquier trabajo de proyecto real.

Costo: gasto de token inicial significativo, típicamente una sesión completa.

Retorno: cada sesión posterior hereda automáticamente la marca. Sin ciclos de corrección. Sin rediseño a mitad de sesión. Sin tokens desperdiciados familiarizando a Claude con colores, tipografía o espaciado que ya ha definido.

Protocolo de configuración de la Sesión 0:

1. Cargue la base de código (o una instantánea de componentes representativa) junto con capturas de pantalla de productos terminados y archivos de marca (logo, guía de marca PDF si está disponible).
2. Pida a Claude que extraiga tokens de color, escala tipográfica, sistema de espaciado, convenciones de radio de borde y patrones de componentes de lo que ve.
3. Pida a Claude que nombre cada token semánticamente, no descriptivamente — `color-primary` no `color-blue`, `spacing-section` no `spacing-48px`.
4. Exporte el resultado como documento de tokens que pegue al inicio de cada sesión futura. Este es su apéndice de sesión — dos párrafos que dan a Claude contexto visual completo sin reecargar archivos.

Sin la Sesión 0, cada sesión de proyecto comienza con un impuesto: Claude adivina la intención de marca, usted la corrige, los tokens se gastan en recuperación en lugar de salida.

### Estrategia 2: El panel Tweaks — Su capa gratis

La característica menos utilizada en Claude Design. Los ajustes de tipografía, color, espaciado y diseño realizados en el panel Tweaks consumen cero tokens de chat. Cero.

Flujo de trabajo:

1. Genere un diseño base con una solicitud.
2. Antes de enviar otra solicitud, pase 15-20 minutos en el panel Tweaks — ajuste tamaños de fuente, apriete espaciado, desplace colores hacia la marca.
3. Vuelva al chat solo cuando Tweaks no pueda lograr lo que necesita (cambios de diseño estructural, nuevos componentes, reescrituras de contenido).

Impacto estimado: 30-40% menos solicitudes por sesión, que se traduce directamente en turnos que consume menos tokens.

La trampa a evitar: solicitar ajustes visuales pequeños (« hace el encabezado un poco más grande », « reduce el relleno en la tarjeta ») que el panel Tweaks maneja al instante. Cada solicitud de ajuste vago que evita es un ciclo de corrección en el que nunca entra.

### Estrategia 3: Solicitudes densas por lotes

Las solicitudes vagas generan cadenas de corrección. Una sola solicitud vaga se convierte en cinco turnos: salida inicial, su corrección, intento de Claude, otra corrección, salida final. Cinco turnos cuestan cinco a diez veces los tokens de un turno denso.

Estructura para una solicitud densa por lotes:

- Qué cambia: enumere 3-5 modificaciones específicas en un párrafo
- Qué permanece fijo: ancle explícitamente todo lo que no debe moverse (« mantenga la navegación de la barra lateral, mantenga la altura del héroe, mantenga toda la tipografía sin cambios »)
- Criterios de éxito: describa cómo se verá el resultado cuando sea correcto
- Evitaciones explícitas: nombre los antipatrones hacia los que Claude podría derivar (« no pesado en tarjetas, sin encabezados serif, sin fondos degradados »)

Los primeros borradores densos tienen éxito aproximadamente 66% del tiempo en el primer intento. Las solicitudes vagas se dividen en 5 o más turnos de corrección con alta frecuencia.

Escriba su solicitud en un editor de texto antes de pegarla. Si le lleva menos de 30 segundos escribir, probablemente es demasiado vago.

### Estrategia 4: Desencadenantes de reinicio de sesión

Las sesiones largas acumulan gastos generales contextuales. En cada turno, Claude vuelve a leer todo el historial de conversación. En el turno 15, está pagando un gravamen contextual creciente en cada solicitud, y la calidad de la salida a menudo se degrada a medida que la sesión pierde coherencia.

Reiniciar cuando alguna de estas condiciones sea verdadera:

- Está cambiando de una tarea no relacionada a otra (panel completado, iniciando la página de destino)
- La sesión ha pasado más de 10-12 solicitudes
- La calidad de la salida se degrada visiblemente — los componentes se desvían de la marca, Claude ignora las restricciones que estableció anteriormente

Procedimiento de reinicio:

1. Escriba una sesión apéndice de 2 oraciones: cuál es el sistema de diseño (colores, tipografía, restricciones clave) y qué está construyendo ahora.
2. Abra una sesión fresca. Pegue el apéndice como su primer mensaje.
3. Continúe desde donde lo dejó.

Misma calidad de salida. Significativamente menor costo de token por turno. Sin gastos generales contextuales.

### Estrategia 5: Economía de carga de imágenes

Las cargas de imágenes son el tipo de entrada más costoso en sesiones de Claude Design. Úsalas intencionalmente.

Cuándo cargar imágenes:

- Capturas de pantalla de productos terminados durante la configuración de la Sesión 0 — no negociable. Claude aprende más viendo un producto real que leyendo documentos de especificación. Este es el único lugar donde el costo de carga tiene ROI claro.
- Capturas de pantalla de referencia cuando necesita que Claude coincida con un tratamiento visual específico que no puede deducir a partir de la descripción.

Cuándo usar texto en su lugar:

- Bocetos brutos y wireframes — describa el diseño en texto. « Cuadrícula de tres columnas, icono a la izquierda, encabezado y cuerpo a la derecha, sin imágenes » es tan efectivo como una carga de boceto y cuesta una fracción de los tokens.
- Conceptos de diseño — las relaciones espaciales se pueden describir. Reserve cargas para tratamientos visuales (color, textura, estilo de ilustración) que el texto no puede capturar.

Si está cargando un boceto para explicar un diseño, escriba la descripción del diseño en su lugar.

### Estrategia de nivel de suscripción

**Usuarios Pro** — trate Claude Design como ejecuciones de producción planificada, no como una arenero. Cada sesión debe tener un objetivo de salida definido antes de abrir la herramienta. La configuración del sistema de diseño en la Sesión 0 es obligatoria antes de iniciar cualquier proyecto real. Use el panel Tweaks agresivamente. Presupueste solicitudes por sesión antes de comenzar.

**Max 5×** — se sigue justificando la precaución moderada. Use el panel Tweaks primero antes de solicitar. Agrupar cambios relacionados. Reiniciar sesiones cuando se cambia de tarea principal. Tiene más espacio que Pro pero no ilimitado.

**Max 20×** — la presión de tokens es mínima. Enfóquese completamente en la calidad de la salida: solicitudes más largas con más detalle, más iteraciones para obtener el tratamiento visual correcto. Las estrategias anteriores siguen produciendo mejores salidas, pero no se le penaliza por saltarlas.

## Ejemplo

Un usuario Pro que planifica tres proyectos relacionados: un panel de producto, una página de destino de marketing y una presentación. Los tres necesitan compartir consistencia de marca.

**Secuencia incorrecta** — inicie el panel directamente, obtenga una desviación de marca, gaste el 30% de la sesión corrigiendo colores y tipografía, exporte, inicie la página de destino, repita las mismas correcciones.

**Secuencia correcta:**

Sesión 0 — Configuración del sistema de diseño. Cargue capturas de pantalla de productos + archivos de marca. Extraiga el conjunto completo de tokens. Exporte un apéndice de sesión de 200 palabras (colores, tipografía, espaciado, convenciones de componentes). Costo estimado de token: una sesión completa.

Sesión 1 — Panel. Pegue el apéndice de sesión como primer mensaje. Escriba una solicitud densa cubriendo el diseño completo: navegación de barra lateral, tabla de datos, tarjetas de estadísticas, encabezado. Pase 20 minutos en Tweaks ajustando espaciado y tipografía antes de solicitar nuevamente. Use 2-3 solicitudes de chat en total. Reiniciar la sesión al pasar a la siguiente sección.

Sesión 2 — Página de destino. Mismo apéndice. Una solicitud densa para héroe, sección de características y CTA. Tweaks para ajuste fino. Máximo 3-4 solicitudes de chat.

Sesión 3 — Presentación. Mismo apéndice. Una solicitud densa por grupo de diapositivas (diapositivas de introducción, diapositivas de producto, finanzas, cierre). Sin cargas de imagen — describa diseños de diapositivas en texto.

Costo total de token con esta secuencia: sustancialmente menor que tres sesiones no secuenciadas, con salida de marca consistente en los tres proyectos.
