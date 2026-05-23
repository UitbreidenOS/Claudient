# Terragrunt

## Wanneer activeren
Beheren van Terraform configurations over multiple environments (dev/staging/prod) die modules delen maar different variable values nodig hebben. Reduceren van boilerplate in multi-account AWS of multi-region setups. Orchestreren van ordered deployments van dependent Terraform modules. Running `run-all` operaties over directory tree. Instellen van environment promotion pipelines.

## Wanneer NIET gebruiken
Single-environment Terraform setups. Terraform Cloud/Enterprise workspaces. Terragrunt add layer van indirection — introduce niet tenzij 2+ environments of 3+ modules die config delen.

## Instructies

### Directory Structure

Canonical Terragrunt layout scheidt live configuration van module definitions:

```
infra/
  modules/
  live/
    terragrunt.hcl  # Root config
    dev/
      terragrunt.hcl
      vpc/
      ecs/
      rds/
    staging/
      terragrunt.hcl
      vpc/ ecs/ rds/
    prod/
      terragrunt.hcl
      vpc/ ecs/ rds/
```

### Root `terragrunt.hcl`

Root config provides shared remote state, provider generation, en variables:

```hcl
# infra/live/terragrunt.hcl

locals {
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  env_vars     = read_terragrunt_config(find_in_parent_folders("env.hcl"))

  aws_region   = local.account_vars.locals.aws_region
  account_id   = local.account_vars.locals.account_id
  env          = local.env_vars.locals.env
}

remote_state {
  backend = "s3"
  config = {
    bucket         = "my-tf-state-${local.account_id}"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.aws_region
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}

generate "provider" {
  path      = "provider.tf"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
  default_tags {
    tags = {
      Environment = "${local.env}"
      ManagedBy   = "terragrunt"
    }
  }
}
EOF
}

inputs = {
  aws_region = local.aws_region
  env        = local.env
  account_id = local.account_id
}
```

### Module-Level `terragrunt.hcl`

```hcl
# infra/live/dev/ecs/terragrunt.hcl

include "root" {
  path   = find_in_parent_folders()
}

terraform {
  source = "../../../../modules//ecs"
}

dependency "vpc" {
  config_path = "../vpc"
}

dependency "rds" {
  config_path = "../rds"
}

inputs = {
  vpc_id             = dependency.vpc.outputs.vpc_id
  private_subnet_ids = dependency.vpc.outputs.private_subnet_ids
  db_endpoint        = dependency.rds.outputs.db_endpoint
}
```

### `run-all` for Multi-Module Deployments

Terragrunt resolvesependency order automatisch:

```bash
# Plan all modules in dev
terragrunt run-all plan --terragrunt-working-dir infra/live/dev

# Apply all modules
terragrunt run-all apply --terragrunt-working-dir infra/live/dev

# Destroy in reverse order
terragrunt run-all destroy --terragrunt-working-dir infra/live/dev
```

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
