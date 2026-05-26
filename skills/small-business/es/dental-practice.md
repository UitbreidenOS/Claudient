# Consultorio Dental

## Cuándo activar
- Dirige una consultorio dental solo o en pequeño grupo y la recepción se ve abrumada por el seguimiento operativo
- La programación de recordatorios se ha atrasado — pacientes que deberían estar en ciclo de 6 meses están en 9+ meses sin reserva
- La aceptación del plan de tratamiento está por debajo del 50% y quiere una secuencia de seguimiento estructurada para planes no aceptados
- La verificación de seguros consume 4-8 horas por semana del tiempo de recepción
- Está lanzando un nuevo servicio (alineadores transparentes, odontología del sueño, cosmético) y necesita copias de educación del paciente y alcance

## Cuándo NO usar
- Tiene un administrador de oficina o práctica dedicado que ya posee estos flujos eficientemente
- Su PMS (Dentrix, Eaglesoft, Open Dental) ya ejecuta un sistema robusto de recordatorios y seguimiento automatizado en el que confía
- El trabajo toca decisiones clínicas — Claude es para el envoltorio administrativo alrededor del tratamiento, no para el tratamiento mismo

## Instrucciones

### Paso 1: Establecer el contexto de su práctica

Diga:

„Dirijo una consultorio dental [solo / pequeño grupo] en [ciudad]. Tenemos [N] operatorios y [N] higienistas. Mi mezcla de pacientes es [asegurado-pesado / fee-for-service / mixto]. Mi voz de marca es [cálido-y-clínico / amable / premium / sin rodeos]. Mi mezcla de servicios más común es [revisión de rutina, restaurativo, cosmético, ortho, etc. — con porcentajes aproximados]. Mi servicio más grande que intento crecer es [nombre]. »

### Paso 2: Ejecutar alcance de recordatorio en el atraso

El flujo de trabajo de habilidad dental único con mayor ROI es la recuperación de recordatorio. La mayoría de las prácticas tienen 80-200 pacientes que están vencidos en su recordatorio de 6 meses pero no han sido perseguidos activamente.

Diga:

„Aquí hay 50 pacientes vencidos en el recordatorio. Para cada uno, redacte un mensaje de alcance personalizado que referencia la fecha de su última visita, el servicio que tuvieron, la siguiente visita recomendada y ofrece dos espacios de cita específicos. »

Claude produce 50 mensajes personalizados. Su recepción los envía en lotes, ejecuta una secuencia de 3 toques (alcance inicial, seguimiento de 1 semana, cierre final de 3 semanas), y rastrea reservas. Recuperación típica: 25-40% de pacientes vencidos se programan dentro de 30 días.

### Paso 3: Seguimiento del plan de tratamiento

Los planes de tratamiento no aceptados en el sillón generalmente se pierden por siempre sin seguimiento. La mayoría de las prácticas no tienen un flujo de seguimiento estructurado.

Diga:

„A este paciente se le presentó un plan de tratamiento de $2.400 para [corona / implante / restauración de cuadrante] en [fecha] pero no se programó. Expresaron preocupación sobre [costo / tiempo / ansiedad dental]. Redacte un mensaje de seguimiento que aborde la preocupación, ofrezca opciones de financiamiento si es relevante y proponga un siguiente paso. »

La habilidad funciona mejor cuando se combina con un plan de tratamiento escrito que incluye las notas del dentista sobre la objeción del paciente. El seguimiento personalizado se convierte a 2-4 veces la tasa de recordatorios genéricos „programemos ese tratamiento".

### Paso 4: Triaje de verificación de seguros

La verificación de seguros es mecánica pero consume horas de recepción. Claude estructura el trabajo:

Diga:

„Para 8 nuevos pacientes mañana, aquí están los detalles del seguro. Genere una lista de verificación estructurada para cada uno — qué confirmar con la aseguradora, categorías de beneficios esperadas, estado del deducible y problemas comunes para esta aseguradora. »

Las llamadas de verificación aún ocurren con la aseguradora (las APIs de seguros son débiles en odontología). Pero su recepción llega a cada llamada con una lista de verificación estructurada y escribe la respuesta en Claude para uso posterior en conversaciones de planificación de tratamiento.

### Paso 5: Lanzamiento de nuevo servicio

Cuando la práctica lanza un nuevo servicio (alineadores transparentes, apnea del sueño, plan de membresía interno):

Diga:

„Estoy lanzando [servicio] en [mes]. El servicio es para pacientes que [persona / caso de uso]. Los precios son [$X]. Borrador: (1) la hoja de educación del paciente, (2) el correo de anuncio interno a pacientes existentes, (3) la copia de la página de servicio del sitio web, (4) el script de consulta para el dentista y el coordinador de consulta. »

Obtiene un paquete coordinado. Revise, ejecute su revisión de cumplimiento (cualquier afirmación sobre resultados necesita una lectura de dentista), y despliegue.

### Paso 6: Recuperación de ausencias y cancelaciones

Mismo patrón que la secuencia de recuperación del salón, calibrado para un contexto dental. La economía es diferente — una ausencia el mismo día en odontología puede ser $200-500 en ingresos perdidos, y el tiempo de silla de la práctica no se puede revender como un corte de cabello. La secuencia de recuperación es más directa:

Toque 1 (mismo día): check-in cálido.
Toque 2 (48 horas): una oferta de reprogramación específica con dos espacios abiertos.
Toque 3 (7 días): solicitud directa más la justificación para mantenerse en el ciclo de recordatorio.

## Ejemplo

Dirige una práctica familiar de 3 operatorios. Tiene 1.400 pacientes activos. Aproximadamente 220 están vencidos en su recordatorio de 6 meses — lo que significa que están 9+ meses desde su última visita de higiene, y su recepción no los ha contactado activamente en 60+ días.

Le pide a Claude que redacte alcance personalizado para los primeros 50 (clasificados por recencia de última visita — más reciente primero). Cada mensaje referencia la fecha de última visita del paciente y ofrece dos espacios.

Envía el primer lote el martes por la mañana. Para el viernes, 18 pacientes han respondido. 12 se programan. Eso es $1.800-2.400 en ingresos de higiene recuperados (y el tratamiento descendente que proviene del tiempo de silla que de otra manera no habría tenido).

Ejecuta un segundo lote el martes siguiente. Mismo patrón. Durante cuatro semanas, recupera aproximadamente 35% de la acumulación vencida — 78 pacientes programados que de otra manera habrían derivado más.

Ingresos recuperados en mes uno: $11-15K. Inversión de tiempo: aproximadamente 2 horas de revisión de recepción y tiempo de alcance distribuido en el mes. La habilidad Claude se pagó muchas veces en los primeros 30 días.

Luego lo configura como un ritmo mensual permanente. El atraso nunca vuelve a crecer por encima de 40-50 pacientes.
