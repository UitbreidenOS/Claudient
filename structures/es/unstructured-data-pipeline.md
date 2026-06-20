# 📂 Pipeline de Datos No Estructurados

> El espacio de trabajo canónico para un motor de ingesta automatizado y multimodal que normaliza audio, video y PDF complejos sin procesar en texto y metadatos limpios y listos para vectores.

📄 `pipeline-architecture-brief.md` # Resumen canónico: Define límites de tamaño de archivo, tipos MIME admitidos y estrategias de fragmentación
🧠 `memory.md`                      # Memoria de sesión: Seguimiento dinámico del contexto para trabajos de ingesta por lotes activos de larga duración
🤖 `CLAUDE.md`                      # Reglas operativas: Instrucciones estrictas para detener el procesamiento si se detecta corrupción de archivos

## 📁 audio-processing/ (4 habilidades - Conversión de Voz a Texto)
📄 `format-converter.md`            # Envoltorio FFmpeg • estandariza .m4a, .ogg y .wav a .mp3 mono de 16kHz
📄 `vad-silence-stripper.md`        # Detección de Actividad de Voz • corta silencios para ahorrar costos de API de transcripción
📄 `whisperx-transcriber.md`        # Transcripción de alta velocidad • maneja marcas de tiempo a nivel de palabra y alineación
📄 `speaker-diarization.md`         # Integración de Pyannote • mapea "Hablante A" y "Hablante B" con precisión en la transcripción

## 📁 video-processing/ (3 habilidades - Extracción de Fotogramas y Audio)
📄 `audio-extractor.md`             # Desacopla la pista de audio y la enruta al pipeline `audio-processing`
📄 `keyframe-sampler.md`            # Extrae 1 fotograma por cambio de escena (usando OpenCV) para análisis de diseño visual
📄 `on-screen-ocr.md`               # Analiza texto de diapositivas o pantallas compartidas integradas en el video

## 📁 pdf-processing/ (4 habilidades - Análisis Avanzado de Documentos)
📄 `layout-analyzer.md`             # Detecta columnas y orden de lectura para que el texto no se comprima horizontalmente
📄 `table-extractor.md`             # Conserva estructuras de cuadrícula de informes financieros en Markdown/JSON sin procesar
📄 `ocr-fallback.md`                # Enruta automáticamente PDF escaneados (no seleccionables) a Tesseract/AWS Textract
📄 `image-asset-saver.md`           # Aísla gráficos y diagramas integrados, guardándolos en S3 con enlaces de referencia

## 📁 unified-export/ (3 habilidades - Normalización Descendente)
📄 `schema-enforcer.md`             # Envuelve todas las salidas (de video, audio o PDF) en una única estructura JSON unificada
📄 `metadata-tagger.md`             # Añade URL de origen, duración/recuento de páginas y marca de tiempo de procesamiento
📄 `vector-db-router.md`            # Empuja los fragmentos normalizados a Pinecone/Qdrant para ingesta RAG

## 📁 infrastructure-ops/ (3 habilidades - Escala y Sincronización)
📄 `s3-event-listener.md`           # Disparador de AWS Lambda • inicia automáticamente el procesamiento cuando un archivo llega al depósito
📄 `gpu-queue-manager.md`           # Enrutamiento del grupo de trabajadores RabbitMQ/Celery para tareas pesadas a instancias GPU de Nvidia
📄 `github-final-sync.md`           # Confirmaciones automatizadas de registros de procesamiento y actualizaciones de pipeline a repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `docker-compose.gpu.yml`         # Configuración para trabajadores de procesamiento habilitados para CUDA locales
📦 `requirements.txt`               # FFmpeg-python, PyMuPDF, WhisperX y dependencias de OpenCV
