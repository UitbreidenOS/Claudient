# Diseño de Redes

## Cuándo activar
Diseño de arquitecturas de red para aplicaciones en la nube, configuración de VPC, gestión de subnets y routing, implementación de seguridad perimetral con firewalls, configuración de CDN, o diseño de infraestructura de red híbrida.

## Cuándo NO usar
Administración de redes de datacenter físico. Configuración de switches y routers de hardware con bajo nivel.

## Instrucciones

### Diseño de VPC (AWS)

```bash
# VPC con subnets públicas y privadas
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Subnets
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.2.0/24

# NAT Gateway para tráfico privado-a-internet
aws ec2 allocate-address --domain vpc
aws ec2 create-nat-gateway --subnet-id subnet-public --allocation-id eipalloc-xxx
```

### Seguridad con Security Groups

```bash
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 3306 \
  --source-group sg-app-servers
```

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
