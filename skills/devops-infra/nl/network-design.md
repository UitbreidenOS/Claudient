# Network Design

## Wanneer activeren
Ontwerpen van cloud network architecture van nul, planning van VPC CIDR ranges en subnet layouts, implementeren van zero-trust network principles, selecteren en configureren van load balancers (ALB/NLB/GWLB), ontwerpen van service mesh deployments (Istio of Linkerd), instellen van Route 53 DNS met health checks, of reviewen van existing network architecture.

## Wanneer NIET gebruiken
On-premises network design. Eenvoudige single-tier applicaties. Application-level API gateway configuratie. CDN configuratie niet tied aan routing of DNS architecture.

## Instructies

### 3-Tier VPC Architecture

Standard 3-tier layout scheidt ingress, compute, en data in distinct network zones met geen direct internet-to-data path:

```
VPC: 10.0.0.0/16

Public subnets (ALB, NAT gateways):
  10.0.0.0/24  — AZ-a
  10.0.1.0/24  — AZ-b
  10.0.2.0/24  — AZ-c

Private subnets (ECS tasks, Lambda):
  10.0.10.0/24 — AZ-a
  10.0.11.0/24 — AZ-b
  10.0.12.0/24 — AZ-c

Isolated subnets (databases, Elasticache — no internet):
  10.0.20.0/24 — AZ-a
  10.0.21.0/24 — AZ-b
  10.0.22.0/24 — AZ-c
```

Terraform VPC module:

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.env}-vpc"
  cidr = "10.0.0.0/16"

  azs              = ["us-east-1a", "us-east-1b", "us-east-1c"]
  public_subnets   = ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"]
  private_subnets  = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]
  database_subnets = ["10.0.20.0/24", "10.0.21.0/24", "10.0.22.0/24"]

  enable_nat_gateway     = true
  one_nat_gateway_per_az = var.env == "prod"

  enable_dns_hostnames = true
  enable_dns_support   = true
}
```

Plan CIDR ranges om future VPC peering toe te staan zonder overlap.

### Zero-Trust Principles

Zero trust betekent: geen implicit trust gebaseerd op network location. Elk request geauthenticeerd, geautoriseerd, en encrypted ongeacht source.

Drie implementation pillars:

1. **Verify every request** — alle service-to-service calls vereisen valid identity (mTLS certificate of JWT).
2. **Micro-segmentation** — security groups beperken traffic op resource level.
3. **Least privilege** — IAM roles scoped naar minimum vereiste actions.

### Security Groups

Start met deny-all, open alleen named ports van named sources. Nooit `0.0.0.0/0` in ingress behalve voor public-facing load balancer:

```hcl
# ALB — public ingress only
resource "aws_security_group" "alb" {
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
}

# App — only from ALB
resource "aws_security_group" "app" {
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
}
```

### Load Balancer Selection

| LB | Layer | Use When |
|---|---|---|
| ALB | L7 (HTTP/HTTPS) | Web/API traffic, host/path routing |
| NLB | L4 (TCP/UDP) | Ultra-low latency, static IPs |
| GWLB | L3 (IP) | Virtual appliances (firewalls, IDS/IPS) |

### Service Mesh: Sidecar Pattern

Service mesh injecteert sidecar proxy (Envoy voor Istio) in elke pod. Mesh handles:
1. Traffic management — retries, circuit breaking
2. mTLS automatic — all pod-to-pod traffic encrypted
3. Observability — traces, metrics, topology maps

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
