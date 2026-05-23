# Terragrunt y Provisión de Infraestructura

## Cuándo activar
Gestión de múltiples entornos Terraform, reutilización de módulos Terraform, gestión de estado remoto centralizado, implementación de configuración DRY para infraestructura, versionado de módulos de infraestructura, o orquestación de múltiples stacks de Terraform.

## Cuándo NO usar
Despliegues simples de Terraform con estado único. Infraestructura que no requiere gestión de configuración centralizada.

## Instrucciones

### Estructura de Terragrunt

```
infrastructure/
├── terragrunt.hcl              # configuración raíz
├── account.hcl
├── prod/
│   ├── terragrunt.hcl
│   ├── us-east-1/
│   │   ├── vpc/
│   │   │   └── terragrunt.hcl
│   │   └── eks/
│   │       └── terragrunt.hcl
│   └── us-west-2/
└── staging/
```

### terragrunt.hcl

```hcl
terraform {
  source = "git::https://github.com/example/terraform-modules//vpc?ref=v1.0"
}

remote_state {
  backend = "s3"
  config = {
    bucket         = "my-terraform-state"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

inputs = merge(
  local.common_vars,
  local.environment_vars,
  {
    vpc_cidr = "10.0.0.0/16"
  }
)
```

### Ejecución

```bash
terragrunt run-all plan
terragrunt run-all apply
```

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
