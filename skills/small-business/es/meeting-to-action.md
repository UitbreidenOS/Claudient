# Reunión a Acción

## Cuándo activar
- Justo después de cualquier llamada de cliente, llamada de ventas o reunión de equipo — dentro de una hora mientras el contexto está fresco
- Tienes una transcripción de Google Meet, Otter.ai, Zoom o Fireflies y necesitas convertirla en algo útil rápidamente
- Tus notas de reunión son brutas y necesitas un email de seguimiento profesional el mismo día
- Quieres rastrear compromisos en reuniones recurrentes y ver qué está atrasado versus completado

## Cuándo NO usar
- Aún no has tenido la reunión — esta skill procesa lo que pasó, no para qué prepararse
- La reunión fue puramente interna sin compromisos ni decisiones tomadas — no vale la pena
- Necesitas transcripción en tiempo real — usa Google Meet, Otter.ai o transcripción integrada de Zoom, luego trae la salida aquí

## Instrucciones

### Qué pegar

Pega lo que tengas — una transcripción completa, export de Otter.ai, tus notas brutas o incluso un memo de voz que transcribiste rápidamente. Claude maneja entrada desordenada. No necesitas limpiarlo primero.

Tienes transcripción de Otter.ai o Zoom, pega todo. Tomaste notas durante la llamada, pégalas tal cual. Fue una reunión de una hora y la transcripción es larga, pégala — Claude lee todo.

### Paso 1: Obtén el resumen estructurado

Después de pegar la transcripción o notas, di:

„Resume esta reunión y dame elementos de acción, preguntas abiertas y un email de seguimiento listo para enviar."

Claude produce en un pase:

Resumen de 3 oraciones: qué se discutió, qué se decidió, cuál fue el tono o resultado general. Lo suficientemente corto para pegar en una nota de CRM o compartir en Slack.

Tabla de elementos de acción: quién es responsable de cada elemento, qué necesitan hacer y para cuándo. Claude extrae compromisos de ambos lados — los tuyos y los suyos. Si no se especificó fecha límite en la llamada, Claude lo marca como „confirmar fecha límite" en lugar de inventar una.

Preguntas abiertas: cosas que se plantearon en la reunión pero no se resolvieron. Formulado como preguntas que necesitas responder antes de la próxima interacción.

Email de seguimiento: profesional, referencia cosas específicas dichas en la reunión, confirma compromisos de ambos lados. Listo para enviar sin edición — o ligeramente editar si quieres tono diferente.

Nota de CRM: formato corto (3-5 oraciones) para pegar en HubSpot, Salesforce o cualquier campo de notas. Diseñado para ser leído por alguien que no estaba en la llamada.

### Paso 2: Extrae inteligencia de ventas (para llamadas de ventas)

Si fue una llamada de ventas o descubrimiento, añade:

„También extrae: puntos de dolor que mencionaron, señales de compra, objeciones planteadas y su lenguaje para describir su problema."

Claude añade una sección de inteligencia de ventas:

- Puntos de dolor: lo que dijeron que era su problema, en sus palabras (útil para reflejar lenguaje en la propuesta)
- Señales de compra: declaraciones o preguntas que indican interés o urgencia („¿cuándo podríamos comenzar?" / „¿con quién más trabajas?")
- Objeciones planteadas: en qué se opusieron y el lenguaje exacto que usaron — importante para escribir respuesta de propuesta
- Su lenguaje para su propio dolor: las frases que usaron para describir el problema. Usa estas en tu propuesta, no tu propio lenguaje.

### Paso 3: Rastrea reuniones recurrentes

Para reuniones de equipo semanales o llamadas de cliente recurrentes, dile a Claude al principio:

„Esta es una reunión recurrente. Aquí están elementos de acción de la semana pasada [pega]. Aquí están notas de esta semana [pega]. Dime qué se completó, qué está atrasado y qué es nuevo."

Claude compara ambos conjuntos y produce:

- Completado desde la semana pasada (con quién lo completó)
- Atrasado (quién es responsable, cuántos días atrasado)
- Nuevos elementos de acción añadidos esta semana

Esto reemplaza verificar manualmente una hoja de cálculo antes de cada llamada semanal.

### Paso 4: Envía el seguimiento rápidamente

El email de seguimiento debe salir dentro de 2 horas de que termine la llamada. Los prospectos y clientes recuerdan la energía de una llamada menos de un día — seguimiento el mismo día se siente como momentum. Seguimiento 3 días después se siente como que olvidaste.

El borrador de Claude estará listo en menos de 2 minutos. Edita según sea necesario, pero prioriza velocidad sobre perfección.

Si quieres ajustar tono, di: „Hazlo más cálido" o „Ajusta esto" o „Quita los puntos y hazlo conversacional."

### Lo que Claude no inventará

Claude no inventará compromisos que no estaban en las notas, no inventará fechas límite que no fueron mencionadas, y no añadirá contexto sobre la empresa o prospecto que no estaba en la transcripción. Si falta información, marca la brecha en lugar de llenarla con suposición.

### Comparación de tiempo

Escribir manualmente resumen de reunión, elementos de acción, email de seguimiento y nota de CRM: 20-40 minutos.

Pegar notas en Claude y enviar salida: 2-5 minutos.

Sobre 10 llamadas de cliente por semana, eso es 3-6 horas recuperadas por semana.

## Ejemplo

Pegas una transcripción de llamada de cliente de 45 minutos de Otter.ai. La llamada fue una revisión trimestral con cliente clave, Meridian Logistics.

Dices: „Resume esta llamada de cliente, dame elementos de acción, preguntas abiertas y email de seguimiento. También extrae preocupaciones que plantearon."

Claude produce:

Resumen de reunión (3 oraciones): „Revisión trimestral con Meridian Logistics cubriendo resultados Q2 y planificación Q3. Cliente está satisfecho con desempeño del dashboard actual pero planteó preocupaciones sobre tiempo de entrega de reporte — quieren reporte de lunes a las 7 AM, no 9 AM. Acordaron discutir expansión de alcance Q3 para dos fuentes de datos adicionales; enviarás propuesta antes del viernes."

Elementos de acción:
- Tú: Envía propuesta de expansión de alcance Q3 a Dana en Meridian — viernes 6 de junio
- Tú: Confirma con tu equipo si entrega de lunes 7 AM es técnicamente viable — miércoles 4 de junio
- Meridian (Dana): Comparte las dos fuentes de datos adicionales que quieren añadidas — antes de fin de semana
- Meridian (Dana): Involucra su contacto de IT para discusión de fuentes de datos — cronograma TBD, marcaste como necesario

Preguntas abiertas:
- ¿Puede tu sistema entregar reporte de lunes a las 7 AM en lugar de 9 AM? (No te comprometas hasta confirmar internamente)
- ¿Es expansión de alcance Q3 una enmienda de contrato o nuevo SOW?

Email de seguimiento (listo para enviar): „Dana — excelente llamada hoy. Recap rápido: estamos alineados en resultados Q2 y discusión de expansión Q3 está en movimiento. Tendrás propuesta el viernes cubriendo las dos fuentes de datos adicionales que mencionaste. En tiempo de entrega de reporte de lunes — estoy verificando internamente entrega de 7 AM y confirmaré el miércoles. Comparte detalles de fuentes de datos cuando tengas un momento, y si puedes involucrar tu contacto de IT antes de nuestro próximo call, mantendrá la implementación en camino. Hablamos pronto."

Nota de CRM: „QBR Q2 completada. Cliente satisfecho con desempeño. Dos elementos abiertos: tiempo de entrega de reporte de lunes (solicitud de 7 AM — viabilidad TBD) y expansión de alcance Q3 (dos nuevas fuentes de datos). Propuesta vence viernes. Próxima llamada a agendar después de revisión de propuesta."

## Resultado

Llegas a tu reunión de cliente con todo organizado y listo. El seguimiento sale a las 14:30, mismo día. Los prospectos recuerdan — y tu seguimiento llega mientras aún recuerdan.
