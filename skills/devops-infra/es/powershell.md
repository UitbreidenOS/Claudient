# PowerShell y Automatización de Windows

## Cuándo activar
Automatización de infraestructura Windows, secuencias de comandos para gestión de Active Directory, automatización de Azure, gestión de registros del sistema, provisión de aplicaciones Windows, o construcción de pipelines CI/CD en entornos Windows.

## Cuándo NO usar
Scripting general de Linux/Unix (usar bash/shell). Tareas simples de configuración mejor manejadas con herramientas GUI.

## Instrucciones

### Fundamentos de PowerShell

```powershell
# Variables y tipos
$message = "Hello, World!"
[int]$count = 5

# Bucles
for ($i = 0; $i -lt 5; $i++) {
    Write-Host "Iteration $i"
}

foreach ($item in $items) {
    Write-Host $item
}
```

### Gestión de Azure con PowerShell

```powershell
# Conectar a Azure
Connect-AzAccount

# Crear resource group
New-AzResourceGroup -Name "myResourceGroup" -Location "eastus"

# Desplegar template
New-AzResourceGroupDeployment `
  -ResourceGroupName "myResourceGroup" `
  -TemplateFile "template.json"
```

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
