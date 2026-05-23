# Ingeniería de Plataformas

## Cuándo activar
Construcción de plataformas internas para desarrolladores (IDP), automatización de deployment pipelines, provisión de self-service de infraestructura, configuración de observabilidad centralizada, construcción de catálogos de servicios, o abstración de complejidad de infraestructura.

## Cuándo NO usar
DevOps general sin enfoque en developer experience. Administración pura de infraestructura sin automatización centralizada.

## Instrucciones

### Plataforma de Despliegue Centralizada

Usar Helm charts + GitOps:

```bash
# Crear chart reutilizable para aplicaciones
helm create my-app-chart

# Desplegar vía ArgoCD
argocd app create my-app \
  --repo https://github.com/example/charts \
  --path my-app-chart \
  --dest-server https://kubernetes.default.svc
```

### Catálogo de Servicios

```yaml
# servicecatalog.yaml
apiVersion: catalog.example.com/v1
kind: Service
metadata:
  name: web-api
spec:
  template: nodejs-service-template
  description: "Microservicio Node.js con monitoring"
  owners:
    - team-platform
  documentation_url: "https://docs.example.com/web-api"
```

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
