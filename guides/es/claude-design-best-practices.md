# Claude Design — Mejores prácticas en producción

Esta guía cubre lo que la documentación oficial no hace: los patrones probados en producción real. Claude Design se ejecuta en Opus 4.7, el modelo más capaz y más caro en tokens de la familia Claude. Esto cambia cómo deberías abordar cada sesión.

---

## Economía de tokens

### El problema

Claude Design implementa Opus 4.7 para cada generación. Opus 4.7 no es un modelo ligero — es la misma clase de modelo utilizada para el razonamiento complejo y el trabajo con documentos largos. En la práctica:

- 50-58% de la cuota semanal de un plan Pro desaparece después de dos sesiones moderadamente complejas
- Un revisor construyendo tres variaciones de página de inicio alcanzó 80% de su asignación semanal en 25 minutos
- Una sesión explorando cinco direcciones visuales puede costar tanto como una tarde completa de trabajo con Claude Code

Esto no es una queja — Opus 4.7 produce borradores iniciales materialmente mejores que modelos más pequeños, y los ahorros de tiempo son reales. Pero tratar Claude Design como una pizarra de croquis gratuita destruirá tu cuota antes de fin de semana.

### Las cinco estrategias que realmente funcionan

**Estrategia 1: Construye un sistema de diseño una vez, úsalo en cada proyecto.**

Esta es la acción con el mayor apalancamiento que puedes tomar en Claude Design. Una sesión de configuración del sistema de diseño es cara por adelantado — pagas para que Opus 4.7 lea tu codebase, extraiga tus tokens y entienda tus convenciones de componentes. Pero cada sesión de proyecto posterior elude completamente este trabajo de inferencia. El modelo ya conoce tu paleta de colores, tu escala tipográfica, tu ritmo de espaciado y tu vocabulario de componentes. Sin esto, cada sesión comienza desde cero, y Claude Design vuelve a sus valores predeterminados — que son inmediatamente reconocibles como salida genérica de Claude.

El costo único ahorra tokens en cada proyecto futuro. Si construyes más de dos proyectos en Claude Design, esta inversión se amortiza en la tercera sesión.

**Estrategia 2: Usa el panel Tweaks antes de escribir prompts.**

El panel Tweaks — controles deslizantes tipográficos, controles de color, alternancias de espaciado y diseño — no consume tokens de chat. Esta es la capacidad más subutilizada en Claude Design. Un error común es escribir "haz el encabezado más grande" o "aumenta el espaciado entre secciones" cuando estos ajustes exactos están disponibles como controles de panel gratuitos.

Antes de escribir cualquier prompt de refinamiento, agota el panel Tweaks. Si el ajuste está ahí, úsalo. Reserva prompts de chat para cambios estructurales, cambios de contenido y cosas que el panel no puede hacer — componentes nuevos, reorganización de diseño, exploración de variantes.

**Estrategia 3: Escribe prompts densos y agrupados.**

Tres solicitudes relacionadas en un párrafo cuestan aproximadamente lo mismo que una. Tres mensajes separados cuestan tres veces más y cada uno agrega sobrecarga de contexto a los mensajes posteriores.

En lugar de:
```
Haz la sección héroe más grande.
```
```
También cambia el CTA a nuestro azul primario.
```
```
Y añade un subtítulo bajo el encabezado principal.
```

Escribe:
```
Sección héroe: aumenta el espaciado vertical para dar más espacio al titular,
cambia el botón CTA a azul de marca primaria (#0057FF), y añade una línea de
subtítulo de 16px bajo el H1 principal describiendo el producto en una frase.
```

Este enfoque también reduce la probabilidad de que Claude Design interprete incorrectamente una instrucción que contradice una anterior — cuando la intención completa es visible en un solo paso, el modelo resuelve los conflictos por sí mismo.

**Estrategia 4: Reinicia sesiones proactivamente.**

Una sesión de Claude Design acumula contexto mientras se ejecuta. Los mensajes iniciales, las variaciones rechazadas y los ciclos de corrección permanecen en la ventana de contexto. En el mensaje 15 de la sesión, pagas por reprocesar todo ese contexto en cada generación — incluso si las iteraciones iniciales no son relevantes para tu objetivo actual.

Cuando hayas validado una dirección y quieras seguir refinando un componente o sección específica, inicia una sesión nueva. Trae un resumen ajustado de lo que estableciste (tu archivo de sistema de diseño, una captura de pantalla de la dirección aprobada y un brief de un párrafo). La sesión nueva cuesta menos por generación y produce una salida más limpia porque el modelo no trabaja alrededor de un historial desordenado.

**Estrategia 5: Usa herramientas externas para esbozar antes de cargar.**

Las cargas de imágenes son costosas en contexto. Un esbozo de diseño bruto de Google Stitch, un wireframe en cualquier herramienta, o incluso una descripción de diseño ASCII de texto plano le da a Claude Design intención espacial sin el costo de procesar una imagen de alta resolución en el primer mensaje.

Describe la estructura en texto: "Cuadrícula de tres columnas en desktop, una sola columna en móvil. Columna izquierda: logo + nav. Centro: titular héroe + CTA. Derecha: captura de pantalla del producto." Esto a menudo produce un mejor borrador inicial que una carga de imagen poco clara y cuesta una fracción del contexto.

---

## Evitar la "estética Claude"

### Cómo se ve

Sin restricciones de diseño, Opus 4.7 entrenado en un gran corpus de valores predeterminados de diseño web se inclina por una huella visual reconocible: encabezados serif emparejados con texto corporal sin-serif, diseños pesados ​​en tarjetas con sombras sutiles, barras de acento coloreadas en el lado izquierdo de las secciones, y una paleta de colores pastel apagada. Es competente. También es inmediatamente identificable como salida generada por IA para cualquiera que haya utilizado estas herramientas durante más de una semana.

Esta estética predeterminada no es incorrecta — simplemente es genérica. Si lo genérico funciona para tu proyecto, omite esta sección. Si necesitas una salida distintiva, el predeterminado requiere supresión activa.

### Técnicas que funcionan

**Carga capturas de pantalla de productos terminados, no especificaciones de marca.**

Las guías de marca describen reglas. Las capturas de pantalla terminadas muestran resultados visuales. Claude Design aprende más viendo cómo tu marca se ve realmente en producción que leyendo reglas de jerarquía tipográfica. Carga una captura de pantalla de tu página de inicio activa, tu correo de marketing más pulido, o tu diapositiva de pitch deck más reciente. Esto le da al modelo evidencia visual concreta de cómo se resuelve tu marca en la práctica.

**Referencia estéticas culturales con especificidad.**

Las referencias estéticas genéricas ("moderno", "limpio", "profesional") producen la interpretación de Claude de esos términos, que vuelven a la estética predeterminada. Las estéticas culturales específicas le dan al modelo un vocabulario visual concreto con el que trabajar:

- "Diseño editorial suizo — Neue Haas Grotesk, interlineado apretado, cuadrícula fuerte, alto contraste, sin elementos decorativos"
- "Impresión brutalista de los 80 — bordes negros gruesos, tipografías industriales, jerarquía de información densa"
- "Solarpunk — tonos de tierra cálidos, curvas orgánicas, lenguaje visual centrado en la comunidad"
- "Minimalismo escandinavo — paleta natural apagada, espacio en blanco generoso, funcional sobre decorativo"

Estas referencias coaccionan el modelo a una tradición visual específica. La salida puede necesitar refinamiento, pero comienza en algún lugar distintivo.

**Niega explícitamente los valores predeterminados en tu brief.**

Declara lo que no quieres tan claramente como lo que quieres. Añade un bloque de restricción a cada prompt inicial:

```
No uses: diseños de tarjetas, barras de acento coloreadas, fondos pastel, emparejamientos
de encabezados serif/sans-serif, o secciones héroe centradas con un único CTA. Haz elecciones
que se sientan específicas para el contexto de este producto, no valores predeterminados SaaS startup genéricos.
```

Las restricciones de negación no son defensivas — tienen peso. Sin ellas, el modelo rellena decisiones sin restricciones con valores predeterminados.

**Pide explícitamente elecciones distintivas y contextoespecíficas.**

Instruye al modelo a razonar sobre el contexto del producto al tomar decisiones visuales. "Elige tipografía que refleje qué hace este producto — una herramienta para desarrolladores, un panel de control financiero, una aplicación de fitness para consumidores — no lo que recomiendan los sitios de diseño genéricos." Este patrón de prompt produce salida que intenta ser contextualmente apropiada en lugar de estéticamente segura.

---

## Técnicas de escritura de prompts

### Lo que realmente funciona

**Los prompts densos de un solo párrafo producen un borrador útil aproximadamente el 66% de las veces.** El otro 34% requiere una pasada de refinamiento enfocada. La iteración vagua multi-paso — "hazlo mejor", "prueba algo diferente", "no me gusta esto" — produce una salida mediocre y contexto costoso.

**El patrón de tres versiones.** Solicita variaciones por adelantado en lugar de iteración secuencial:

```
Genera tres versiones de esta sección héroe de página de inicio. Cada versión debería tomar
una dirección visual significativamente diferente — estructura de diseño diferente, no solo
colores diferentes. Etiquétalas A, B y C.
```

Claude Design renderiza las tres en un solo paso. Luego identificas los mejores elementos de cada una y compones una síntesis:

```
Aplica la tipografía y jerarquía de encabezado de la versión A a la estructura de diseño de la versión B.
Mantén el tratamiento del botón CTA de la versión C.
```

Esto es más rápido y barato que la iteración secuencial, y produce mejores resultados porque trabajas desde un rango de opciones en lugar de empujar gradualmente una dirección.

**Comentarios en línea para precisión enfocada.** Haz clic en un elemento, añade un comentario, describe exactamente qué cambios solo para ese elemento. Esto limita el alcance de generación — el modelo sabe que no estás pidiendo un rediseño completo. Usa esto para ajustes tipográficos, correcciones de color, correcciones de espaciado y cambios de copia.

Comportamiento conocido: los comentarios en línea ocasionalmente desaparecen de la interfaz después de la generación. Si esto sucede, pega el contenido del comentario en el chat como un prompt de seguimiento enfocado en lugar de empezar de nuevo.

**Modo dibujo para reestructuración de diseño.** Cuando necesites reposicionar secciones principales — mueve la barra lateral de izquierda a derecha, mueve la nav de arriba a abajo, crea un diseño de pantalla dividida — usa el modo Dibujo para indicar la intención espacial directamente. Dibujar es más rápido que describir relaciones espaciales en texto y produce cambios de diseño más precisos que prompts de chat para movimientos estructurales.

**Alternancia de vista previa de dispositivo.** Cambia entre vistas de teléfono, tableta y escritorio en cualquier momento. Esto no cuesta tokens. Antes de escribir fixes responsivos, verifica si el problema es realmente visible en el punto de quiebre actual — muchos problemas responsivos que se ven graves en escritorio ya se manejan en móvil, o viceversa.

### Qué especificar en tu brief inicial

Cada prompt inicial fuerte incluye:

- **Criterios de éxito**: ¿cómo se ve "hecho"? ("La sección héroe debería comunicar la propuesta de valor del producto sin requerir que el usuario desplace")
- **Restricciones de salida**: formato, dimensiones, cantidad de componentes, longitud de contenido
- **Qué se mantiene fijo**: "Mantén la estructura de navegación exactamente como se describe — no añadas ni elimines elementos de navegación"
- **Qué puede cambiar**: "Paleta de colores, tipografía, espaciado y orden de secciones están todos abiertos"
- **Uno o dos puntos innegociables**: "El CTA principal debe ser visible por encima del pliegue en escritorio"

### Qué evitar

- Adjetivos subjetivos sin referentes: "más premium", "se siente confiable", "se ve moderno" — todos interpretados por los priors del modelo
- Restricciones contradictorias sin resolución: "minimalista pero rico en información" — especifica cuál gana cuando entran en conflicto
- Prompts de estructura abiertos tarde en una sesión: pedir una reestructuración de diseño completa después de 10 mensajes de refinamiento produce salida cara y a menudo inconsistente
- Bucles de corrección sin dirección clara: "No me gusta" sin especificar qué está mal desperdicia un paso de generación

---

## Gestión de sesiones

Trata cada sesión de Claude Design como trabajo de producción planificado, no exploración abierta. El costo de tokens hace que las sesiones no estructuradas sean caras. Las sesiones con alcance claro y preparación producen mejor salida a menor costo.

### Antes de la sesión

Enumera cada componente o sección que necesitas producir en esta sesión. Escríbelos. Agrupa componentes relacionados en un solo prompt cuando sea posible — un componente de tarjeta y su estado vacío son un prompt, no dos.

Decide qué activos cargará. Archivo de sistema de diseño, capturas de pantalla de referencia, archivo de token de codebase — ensambla estos antes de comenzar. Cargar a mitad de sesión agrega sobrecarga de contexto.

Define la salida que necesitas validar la dirección. No necesitas salida perfecta en píxeles para confirmar que vas en la dirección correcta. Conoce el mínimo que te dice que el enfoque funciona, y deja de refinar cuando lo alcances.

### Durante la sesión

Usa el panel Tweaks primero. Siempre. Verifica si el ajuste que quieres está disponible como un control deslizante gratuito antes de escribir un prompt.

Agrupa cambios relacionados. Si tienes tres refinamientos en la cola, escríbelos todos en un mensaje.

Vigila la duración de tu sesión. Después de 10-12 intercambios de mensajes, considera si una sesión nueva sería más rápida. Si estás generando un componente o dirección fundamentalmente nueva, casi seguramente lo será.

### Cuándo exportar

Exporta cuando:
- La dirección visual está validada (revisión de partes interesadas o autorrevisión ha confirmado el enfoque)
- El diseño base y la jerarquía de información están establecidos
- La estructura de componentes es suficientemente clara para que Claude Code razone sobre ella

No exportes cuando:
- Aún estés explorando direcciones fundamentalmente diferentes
- Quedan cambios estructurales importantes
- Estés haciendo refinamientos iterativos que podrían hacerse más barato en Claude Code directamente

El paquete de entrega no es una especificación perfecta en píxeles. Claude Code la adaptará para comportamiento responsivo, convenciones de biblioteca de componentes y restricciones de producción. Se espera algo de desviación del diseño visual y es correcto. Trata el paquete como un brief fuerte, no una especificación perfecta en píxeles.

### Después de la exportación

No re-exportes después de que comienza la implementación. Las modificaciones después de la entrega ocurren en Claude Code directamente — re-exportar crea una segunda fuente de verdad y rompe la relación diseño-a-código. Si se necesita un cambio de diseño importante después de la entrega, trátalo como una nueva sesión de diseño para ese componente específico, no una re-exportación completa.

---

## Configuración del sistema de diseño

Esta sección merece su propio tratamiento porque es la acción única más probable de mejorar tanto la calidad de la salida como la eficiencia de tokens para equipos que usan Claude Design en múltiples proyectos.

### Por qué es importante

Sin un sistema de diseño en Claude Design, cada sesión produce salida calibrada a convenciones de diseño web genéricas. El modelo no conoce tu paleta de colores, tu escala tipográfica, tu vocabulario de componentes o tu ritmo de espaciado. Se inclina hacia su estética entrenada. Gastas tokens corrigiéndolo hacia tu marca en cada sesión.

Con un sistema de diseño, cada sesión comienza en marca. El modelo conoce tus tokens y puede aplicarlos sin corrección. Las pasadas de refinamiento se enfocan en diseño y contenido en lugar de alineación de marca.

### Qué cargar

Carga en este orden de prioridad:

1. Tu archivo `tokens.json` o CSS custom properties — las definiciones de token legibles por máquina directo son la entrada de más alta fidelidad
2. Tu `tailwind.config.js` o configuración de tema equivalente — le da a Claude Design tus asignaciones de clase de utilidad y puntos de quiebre
3. Capturas de pantalla terminadas de tu producto activo o lanzamiento más reciente — evidencia visual de qué se resuelve tu marca en la práctica
4. Tu URL de Storybook o capturas de pantalla de componentes — establece qué componentes ya existen y cómo se ven
5. Tu PDF de marca o guía de estilo — para tono, uso de logo y reglas de jerarquía tipográfica

### Lo que Claude Design extrae

De estas entradas, Claude Design extrae:
- Tokens de color con nomenclatura semántica (primario, secundario, destructivo, silenciado, etc.)
- Escala tipográfica (rampa de tamaño, convenciones de peso, reglas de altura de línea)
- Sistema de espaciado (tu unidad base, valores de espaciado comunes)
- Convenciones de componentes (nombres de componentes existentes, variantes, estados)
- Patrones de cuadrícula y diseño (recuentos de columnas, anchos de canal, restricciones de ancho máximo)

### Validar la configuración

Antes de usar el sistema de diseño en sesiones de producción, genera un componente de prueba — algo simple y bien definido, como un botón en todos los estados o un componente de tarjeta. Revisa si la salida refleja con precisión tus tokens de marca y convenciones de componentes. Si no, identifica qué falta de tus cargas y refina la configuración antes de continuar.

La validación cuesta tokens. Presupuesta para una sesión de prueba por configuración de sistema de diseño.

### Mantenimiento

Cuando tu sistema de diseño evolucione — nuevos tokens de color, nuevos patrones de componentes, tipografía actualizada — actualiza tus archivos de configuración de Claude Design para coincidir. Una configuración de sistema de diseño antigua produce salida que diverge de tu diseño de producción actual con el tiempo.

---

## Exploración de variantes

### Solicita variantes por adelantado

Solicitar tres variantes en el prompt inicial cuesta aproximadamente lo mismo que solicitar una — Claude Design renderiza las tres en un paso de generación. La exploración de variantes secuencial (genera una, rechazala, genera otra) cuesta tres veces más y acumula sobrecarga de contexto.

### Mezcla de variantes

Después de revisar tres variantes, usa el panel Tweaks y prompts de chat enfocados para mezclar características de diferentes versiones. Esto es gratuito para propiedades ajustables en el panel y barato para cambios impulsados ​​por chat porque el alcance es estrecho y la intención es clara.

Documenta lo que tomas de cada versión antes de hacer cambios: "Tratamiento de color de la versión A, estructura de diseño de la versión B, jerarquía de CTA de la versión C." Este brief también es útil para la anotación del paquete de entrega.

### Documenta antes de cerrar

Antes de terminar una sesión, anota:
- Qué dirección fue seleccionada y por qué
- Qué fue rechazado y por qué
- Qué refinamientos quedan para la próxima sesión
- Todas las decisiones de diseño que necesitan revisión de partes interesadas

Esta documentación vive fuera de Claude Design (una nota, un archivo de proyecto, un brief). El historial de sesión de Claude Design no es un registro de diseño confiable.

---

## Datos de productividad real

La investigación comunitaria entre autónomos, agencias y equipos de producto que usan Claude Design en 2025-2026 produjo estos puntos de referencia. Estos números varían según la complejidad del proyecto y la experiencia del diseñador, pero los patrones direccionales son consistentes.

| Tarea | Sin Claude Design | Con Claude Design | Ahorros |
|------|----------------------|-------------------|---------|
| Prototipo de producto (3-5 pantallas) | 14 horas | 3,5 horas | 75% |
| Entrega de proyecto autónomo | Línea base | 3,8x más rápido | — |
| Preparación de entrega de cliente de agencia | Línea base | 62% más rápido | — |
| Página de inicio (idea a HTML implementable) | Múltiples días | 45 minutos | — |
| Pitch deck (presentación completa) | 4-6 horas | Menos de 30 minutos | — |
| Flujo de aplicación móvil (3-5 pantallas) | 1-2 días | 1-2 horas | — |

Estos números representan ahorros de tiempo, no equivalencia de calidad. La salida de Claude Design generalmente requiere trabajo de implementación en Claude Code para la preparación de producción. Los ahorros están en exploración, alineación y dirección validada — no activos de producción terminados.

---

## Cuando Claude Design falla

Entender los modos de fallo antes de que los experimentes ahorra tiempo y cuota.

**Ausencia de un sistema de diseño.** Este es el modo de fallo más común. Sin un sistema de diseño, Claude Design no puede producir salida en marca. Cada sesión requiere correcciones completas de restyling. Los equipos que omiten la configuración del sistema de diseño gastan sus tokens de sesión en corrección de marca en lugar de exploración de diseño. Si necesitas salida en marca y no puedes configurar un sistema de diseño, Claude Design no es la herramienta correcta para ese proyecto.

**Briefs excesivamente complejos con restricciones contradictorias.** Un brief con 10+ requisitos específicos que se contradicen entre sí produce salida que no satisface ninguno. El modelo resuelve contradicciones según sus priors de entrenamiento, no tu intención. Si tu brief tiene más de 6-7 restricciones duras, priorízalas explícitamente y elimina las de menor prioridad del prompt inicial.

**Visualización de datos.** Claude Design prioriza la calidad estética sobre la usabilidad de datos en la salida de gráficos y diagramas. Un gráfico de barras se verá hermoso. Las etiquetas de eje pueden ser ilegibles a escala, las opciones de color pueden ser inaccesibles y la proporción datos-a-tinta puede ser pobre. Si generaste visualización de datos, añade prompts de corrección explícitos: "Prioriza legibilidad y accesibilidad sobre estética. Asegúrate de que todas las etiquetas sean legibles en esta resolución."

**Ilustraciones personalizadas.** Claude Design no es una herramienta de ilustración. Puede colocar elementos de estilo ilustración y sugerir conceptos de ilustración, pero el trabajo de ilustración personalizada preciso — iconos personalizados, mascotas de marca, infografías complejas — requiere una herramienta de diseño real. Usa Claude Design para especificar el brief de ilustración, luego ejecuta en Figma, Illustrator o una herramienta de ilustración IA especializada.

**Flujos de trabajo de revisión de equipo y multiplayer.** Claude Design no tiene colaboración en tiempo real. Una persona dirige la sesión. Si tu equipo necesita edición simultánea, hilos de comentarios, historial de versiones accesible para múltiples partes interesadas o medidas de Modo Dev — usa Figma. Claude Design no compite con Figma en colaboración.

---

## Entrega a Claude Code — El momento correcto

La decisión de entrega es donde se pierde la mayoría del tiempo. Los equipos exportan demasiado pronto (antes de que la dirección esté clara, causando retrabajos) o demasiado tarde (gastando tokens puliendo píxeles en Claude Design cuando Claude Code lo haría en minutos).

### Exporta cuando esto es verdadero

- **Dirección visual validada**: al menos una parte interesada (o tú, para proyectos en solitario) ha confirmado que el enfoque es correcto
- **Diseño base establecido**: la jerarquía de información, la estructura de sección y el flujo de usuario principal son claros
- **Estructura de componentes clara**: Claude Code puede razonar sobre qué componentes existen y cómo se relacionan
- **Contenido lo suficientemente cerca**: el contenido de placeholder está bien; la estructura y el tamaño relativo de las áreas de contenido están establecidos

### No exportes cuando

- Aún estés explorando si un enfoque fundamentalmente diferente es mejor
- El diseño tiene grandes preguntas estructurales sin resolver ("¿Debería ser una barra lateral o una nav superior?" es una pregunta estructural — resuélvela antes de entregar)
- Estés haciendo pequeños refinamientos iterativos que Claude Code maneja más barato directamente

### Lo que sucede en la entrega

El paquete de entrega contiene especificaciones de diseño, tokens de diseño, anotaciones de componentes y notas de punto de quiebre responsivo. Claude Code la usa para implementar el diseño — pero adaptará el diseño para bibliotecas de componentes reales, comportamiento de punto de quiebre real y restricciones de producción. Se espera algo de desviación del diseño visual y es correcto. Trata el paquete como un brief fuerte, no una especificación perfecta en píxeles.

Después de que comienza la entrega, modifica en Claude Code. No re-exportes y re-entregues por cambios incrementales — esto crea dos fuentes de verdad y hace que la implementación sea más difícil de mantener.

---

## Listas de verificación

### Antes de tu primera sesión

- [ ] Archivos de sistema de diseño ensamblados: `tokens.json` o variables CSS, `tailwind.config.js` o config de tema
- [ ] Capturas de pantalla de referencia recopiladas: producto en vivo, diseños más recientes, ejemplos clave de marca
- [ ] Sesión de configuración de sistema de diseño completada y validada con un componente de prueba
- [ ] Alcance de sesión definido: lista de componentes o pantallas que esta sesión producirá
- [ ] Brief escrito: criterios de éxito, restricciones de salida, puntos innegociables, qué puede cambiar
- [ ] Esbozo de diseño externo completo (opcional): estructura bruta descrita en texto o esbozada en Google Stitch

### Lista de verificación por sesión

- [ ] Panel Tweaks verificado antes de escribir prompts de refinamiento
- [ ] Solicitudes agrupadas: cambios relacionados combinados en mensajes únicos
- [ ] Exploración de tres versiones usada para borrador inicial de nuevos componentes
- [ ] Duración de sesión monitoreada: sesión nueva iniciada si el historial se vuelve antiguo
- [ ] Comentarios en línea usados ​​para precisión a nivel de elemento en lugar de prompts de generación completa
- [ ] Direcciones rechazadas documentadas (qué se intentó, por qué fue rechazado)

### Antes de entregar a Claude Code

- [ ] Dirección visual validada (aprobación de partes interesadas o autorrevisión completada)
- [ ] Diseño base e jerarquía de información establecidos
- [ ] Estructura de componentes clara: qué existe, qué está anidado, qué es elemento autónomo
- [ ] Paquete de entrega exportado y revisado: confirmar que `layout.json`, `tokens.json`, `components.md` y `preview.png` están presentes
- [ ] Notas de implementación añadidas al paquete: todo lo que Claude Code debería saber que no es visible en la especificación de diseño
- [ ] Equipo informado: cualquiera que toque la codebase sabe que la entrega está en progreso y dónde vive el paquete
