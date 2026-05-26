# Prevención de Churn

## Cuándo activar
- Usted opera un negocio por suscripción (SaaS, membresía, servicio recurrente, suscripción de contenido) y desea reducir la deserción de clientes
- Su tasa de churn está aumentando y no puede determinar qué segmento la está impulsando
- Ve que los mismos clientes cancelados van a sus competidores tres meses después — la relación era recuperable
- Está lanzando una nueva función, nivel de precios o programa y desea diseñar el lanzamiento para minimizar el riesgo de churn
- Desea sistematizar la identificación y el alcance de clientes en riesgo en lugar de reaccionar a las cancelaciones después de que ocurran

## Cuándo NO usar
- Usted opera un negocio transaccional (compras únicas, servicios ad-hoc) — el churn no es el marco correcto
- Su churn es ya excelente (menos del 1% mensual para B2B SaaS, menos del 3% para suscripciones B2C) — los rendimientos decrecientes llegan rápido
- Las cancelaciones que está viendo son estructurales (el producto es incorrecto, el precio es incorrecto) — el alcance no lo arreglará; los cambios de producto o precio lo harán

## Instrucciones

### Paso 1: Configure su contexto de suscripción

Diga:

„Opero un negocio [tipo de suscripción — SaaS, membresía, contenido, servicio recurrente]. El LTV promedio del cliente es [$X]. La tasa de churn mensual es [Y%]. El recorrido típico del cliente desde el registro hasta la cancelación es [describir patrón]. El principal impulsor de churn según mi lectura es [razón]. Mi voz de marca es [lista de adjetivos]."

### Paso 2: Identificación de clientes en riesgo

La mayoría de los churn ocurren después de un período de disminución del compromiso que es visible en sus datos. Extraiga las señales de compromiso.

Diga:

„Estas son las señales de mi base de clientes en los últimos 30 días: [pegar datos — frecuencia de inicio de sesión, uso de funciones, tickets de soporte, degradaciones de plan, etc.]. Identifique los clientes con mayor riesgo de churn en los próximos 30 días. Para cada uno, explique el patrón de señal específico que activó la bandera y sugiera un enfoque de alcance personalizado."

Claude es bueno en la detección de patrones en datos de compromiso estructurados. Proporcione los números sin procesar, no su interpretación, y déjelo encontrar patrones que podría haber pasado por alto.

### Paso 3: Alcance de clientes en riesgo

Para cada cliente en riesgo:

Diga:

„El cliente [nombre] en [empresa] muestra señales de churn: [patrón específico]. Han sido clientes durante [X meses]. Su caso de uso es [caso de uso]. Redacte un alcance de reactivación personalizado: (1) un check-in cálido que haga referencia a su caso de uso específico, (2) una oferta estructurada para ayudarles a obtener valor (capacitación personalizada, revisión de cuenta, presentación de funciones), (3) una solicitud de escucha suave que les dé espacio para compartir si algo no funciona."

La personalización es lo que marca la diferencia. El alcance genérico „notamos que no ha iniciado sesión recientemente" es ignorado. El personalizado „noté que dejó de ejecutar el informe semanal después de nuestro lanzamiento v3 — ese patrón surgió para algunos clientes y enviamos una solución hace dos semanas, ¿desea una presentación de 10 minutos?" obtiene respuestas.

### Paso 4: Flujo de salvación de cancelación

Cuando un cliente inicia una cancelación:

Diga:

„El cliente [nombre] acaba de enviar una solicitud de cancelación. Han estado con nosotros durante [X meses], pagando [$Y/mes]. Su razón indicada es [razón]. Su patrón de uso durante los últimos 90 días fue [patrón]. Redacte una secuencia de salvación de cancelación: (1) una respuesta inmediata reconociendo la cancelación y ofreciendo una llamada de 15 minutos antes de procesarla, (2) puntos de conversación para la llamada cubriendo la razón indicada y los patrones observados, (3) tres ofertas de salvación clasificadas por probabilidad — pausa, degradación, mes gratuito + capacitación personalizada."

La llamada de salvación de cancelación recupera el 20-40% de solicitudes de cancelación en negocios por suscripción bien gestionados. La mayoría de las pequeñas empresas ni siquiera hacen la llamada; simplemente procesan la cancelación.

### Paso 5: Recuperación posterior a la cancelación

Para clientes que sí cancelan:

Diga:

„El cliente [nombre] canceló hace [X días]. Su razón indicada fue [razón]. Su LTV con nosotros fue [$Y]. Redacte una secuencia de recuperación: (1) un email de 30 días post-cancelación „verificando" que no impulse nada, (2) un email de 90 días „enviamos esa cosa que mencionó" si hay algo específico que plantearon que ahora está resuelto, (3) un email de 6 meses „considérenos de nuevo" con una oferta suave."

El email de 90 días „lo arreglamos" es el contacto de recuperación con mejor conversión. La mayoría de los negocios por suscripción cancelan clientes y los olvidan para siempre.

### Paso 6: Análisis de churn a nivel de cohorte

Una vez por trimestre:

Diga:

„Aquí están mis datos de churn de los últimos 12 meses por cohorte de registro: [pegar]. Identifique patrones a nivel de cohorte: qué meses tuvieron retención inusualmente alta o baja, qué canales de adquisición producen LTV más alto, qué nivel de precio tiene más churn, qué uso de características se correlaciona con retención. Sugiera 3-5 hipótesis comprobables para mejorar la retención."

La vista de cohorte descubre patrones que la tasa de churn mensual oculta. La mayoría de los operadores de suscripción ven el churn como un solo número y se pierden que las nuevas cohortes de clientes tienen una tasa de churn 2x mayor que la tasa heredada.

## Ejemplo

Usted opera un pequeño SaaS — una herramienta de automatización de marketing para consultores independientes y pequeñas agencias. 280 clientes pagos, promedio $89/mes. La tasa de churn mensual ha aumentado del 4% al 6,5% en los últimos 4 meses. Con su recuento de clientes, eso es perder 7-12 clientes por mes versus los 11 que está agregando — el crecimiento neto se ha estancado.

Configura el flujo de trabajo de identificación de clientes en riesgo. Extrae datos de compromiso de los últimos 30 días: frecuencia de inicio de sesión, uso de características, tickets de soporte, degradaciones de plan. Carga los datos sin procesar en Claude con la lista de clientes.

Claude marca 18 clientes en riesgo. El grupo más grande — 9 de los 18 — comparten un patrón específico: dejaron de usar la función de automatización de correo electrónico en los últimos 30 días, a pesar de usarla mucho antes. El patrón apunta a un cambio de interfaz que enviaste hace 6 semanas.

No lo había notado porque los tickets de soporte llegaban lentamente, uno o dos a la vez, formulados como problemas diferentes. El patrón en conjunto es claro.

Revierte el cambio de interfaz para estos 9 clientes, les envía un email personalizado haciendo referencia a la función específica y explicando qué arreglaste, y ofrece un recorrido de 30 minutos. 6 de los 9 responden y se reenganchan. 2 cancelan de todos modos (el problema subyacente era diferente). 1 no responde.

Luego envía una versión refinada del cambio de interfaz con ayuda explícita de migración. El churn mensual cae al 4,2% en dos meses. Se reanuda el crecimiento neto.

El único flujo de trabajo de Claude descubrió un problema de producto estructural que se estaba ocultando dentro de métricas agregadas. El alcance cliente por cliente guardó aproximadamente $35-45K de ingresos recurrentes anualizados. La solución del producto guardó aproximadamente $100K+ durante los próximos 12 meses.

Hace de la identificación de clientes en riesgo un ritmo mensual. En el mes 6, su tasa de churn se estabiliza en 3,7% — por debajo de donde comenzó. El efecto compuesto en el crecimiento es significativo.
