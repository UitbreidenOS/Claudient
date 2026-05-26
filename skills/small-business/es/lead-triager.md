# Clasificador de Prospectos

## Cuándo activar
- Nuevos contactos provienen de un envío de formulario, evento o campaña y necesitas saber a quién llamar primero
- Revisión semanal de prospectos — quieres una lista de llamadas priorizada antes de que comience la semana
- Preparando una campaña de llamadas de ventas y tu CRM está lleno de contactos no calificados
- Quieres dejar de adivinar qué prospectos valen tu tiempo y comenzar a trabajar con una lista clasificada

## Cuándo NO usar
- Ya tienes un equipo de ventas dedicado con un sistema formal de puntuación de prospectos — eso es su trabajo
- Tu pipeline tiene menos de 5 prospectos — a ese volumen, simplemente llama a todos
- Los prospectos requieren una calificación técnica profunda que solo un experto del dominio puede hacer

## Instrucciones

### Paso 1: Define tu Perfil de Cliente Ideal una vez

Antes de puntuar nada, dile a Claude exactamente a quién estás buscando. Hazlo una vez y guarda el resultado — lo reutilizarás cada semana.

Di:

„Mi cliente ideal es una empresa con 25-150 empleados en la industria de logística o distribución. El tomador de decisiones es generalmente un VP of Operations o COO. Las señales de dolor son reportes manuales, alta rotación de personal o financiamiento reciente. Las empresas demasiado pequeñas (menos de 10 empleados) o dirigidas al consumidor no son un ajuste."

Claude confirmará los criterios contigo y señalará cualquier brecha. Ahora tienes tu plantilla ICP.

### Paso 2: Alimenta a Claude con tus contactos sin puntuar

Pega desde HubSpot, copia desde un CSV o simplemente descríbelos. El mínimo que necesitas para cada prospecto:

- Nombre de la empresa y sitio web
- Nombre del contacto y puesto
- Cómo te encontraron (webinar, referencia, anuncio pagado, prospección en frío)
- Cualquier respuesta de formulario o notas que hayan dejado

No necesitas un formato limpio. Lo desordenado está bien.

### Paso 3: Obtén puntuaciones y explicaciones

Claude puntúa cada prospecto de 1-10 contra tus criterios ICP, explica la puntuación en una oración y marca los 3 principales como „priorizar ahora".

Ejemplo de salida de Claude:

- Acme Corp — 9/10. VP of Operations en una empresa SaaS de 50 personas. Mencionó „reportes manuales" en el formulario. Concordancia fuerte con ICP. Priorizar ahora.
- Blue River Retail — 4/10. Orientado al comercio minorista, 8 empleados. Fuera de tu ICP en tamaño e industria. Solo cultivar.
- Meridian Logistics — 7/10. Industria y tamaño correctos. El puesto es poco claro — el contacto es „Office Manager", no un tomador de decisiones. Enriquecer antes de llamar.

### Paso 4: Obtén resúmenes de enriquecimiento para prospectos calientes

Para cualquier prospecto puntuado 7 o superior, pregunta a Claude:

„Redacta un resumen de enriquecimiento de 2 párrafos para Acme Corp — qué hacen, su probable punto de dolor según su respuesta de formulario y sitio web, y una línea de apertura sugerida para la primera llamada."

Pega este resumen directamente en HubSpot Notes. Llegas a la llamada ya preparado.

### Paso 5: Maneja prospectos fríos sin perder tiempo

Para prospectos puntuados 4 o menos, pídele a Claude que redacte un correo de nutrición educado que los coloque en una secuencia de goteo. No los estás cerrando — los estás poniendo en un lugar útil.

### Ritmo semanal

Pega tu lista completa de nuevos prospectos cada lunes. Claude genera tu lista de llamadas priorizada y notas en menos de 2 minutos. Combina con la habilidad Monday Brief para un comienzo de semana completo.

### Integraciones

- HubSpot: copia puntuaciones y resúmenes en campos de Notas y Puntuación de Prospectos manualmente
- LinkedIn: proporciona a Claude la URL de LinkedIn del prospecto o describe su actividad reciente para un enriquecimiento más rico
- Gmail: pega los correos de prospección redactados directamente en una nueva ventana de redacción

## Ejemplo

Pegas 8 nuevos prospectos de un webinar que dirigiste la semana pasada sobre eficiencia de la cadena de suministro.

Dices: „Aquí están mis 8 nuevos prospectos de webinar. Mi ICP son empresas de logística y distribución de 25-150 empleados, el tomador de decisiones es VP Operations o COO, las señales de dolor son reportes manuales y alta rotación. Califícalos e identifica los 3 principales."

Claude clasifica los 8, explica cada puntuación e identifica los 3 principales:

1. Acme Corp — 9/10. Empresa SaaS de 50 personas, VP of Operations, respondió „aún hacemos todos los reportes en hojas de cálculo" en el formulario. Concordancia exacta con ICP. Claude redacta un correo personalizado de 3 oraciones: „Tu respuesta en el webinar sobre reportes en hojas de cálculo me llamó la atención — ese es exactamente el problema que resolvemos para equipos de operaciones de tu tamaño. Ayudamos a una empresa similar a reducir su tiempo de reportes en 6 horas por semana. ¿Valdría la pena una llamada de 20 minutos para ver si podemos hacer lo mismo por ti?"

2. Harbor Freight Distribution — 8/10. Industria correcta, 90 empleados, COO registrado. Sin respuesta de formulario — Claude sugiere enriquecer a través de sus publicaciones de LinkedIn antes de llamar.

3. Clearview Logistics — 7/10. Buen ajuste en tamaño e industria. El contacto es Senior Manager, no VP — Claude lo señala y sugiere confirmar al tomador de decisiones antes de perder tiempo en la llamada.

Tiempo total de pegado a lista priorizada: menos de 3 minutos.
