# PowerShell Scripting

## Wanneer activeren
- Schrijven of reviewen van PowerShell scripts voor Windows administration
- Gebruiken van cmdlets, pipelines, en object manipulation
- Implementeren van robust error handling met try/catch/finally
- Running commands op remote machines met Invoke-Command
- Structureren van reusable modules (`.psm1` + `.psd1`)
- Querying van system informatie met CIM/WMI
- Handelen van credentials en secrets securely

## Wanneer NIET gebruiken
- Bash/zsh scripting op Linux/macOS
- Azure PowerShell of AWS PowerShell modules

## Instructies

### Pipeline and Filtering

PowerShell pipelines pass .NET objects, niet text strings.

```powershell
# Where-Object — filter by property
Get-Process | Where-Object { $_.CPU -gt 100 }

# Select-Object — project properties
Get-Process | Select-Object Name, Id, CPU, WorkingSet

# ForEach-Object — transform each object
Get-ChildItem -Filter *.log | ForEach-Object {
    [PSCustomObject]@{
        Name     = $_.Name
        SizeMB   = [math]::Round($_.Length / 1MB, 2)
    }
}

# Sort-Object
Get-Service | Sort-Object Status, DisplayName

# Chained pipeline
Get-Process |
    Where-Object { $_.WorkingSet -gt 100MB } |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 10 -Property Name, Id
```

### Error Handling

```powershell
$ErrorActionPreference = 'Stop'

try {
    Backup-Database -Path $backupPath
}
catch [System.Data.SqlClient.SqlException] {
    Write-Error "SQL error: $($_.Exception.Message)"
    throw
}
catch {
    Write-Error "Unexpected error: $($_.Exception.GetType().Name)"
    throw
}
finally {
    if (Test-Path $tempPath) {
        Remove-Item $tempPath -Force -ErrorAction SilentlyContinue
    }
}
```

### Remote Execution

```powershell
# One-off command
Invoke-Command -ComputerName server01 -ScriptBlock {
    Get-Service -Name BITS
}

# Multiple computers
$servers = 'web01', 'web02', 'db01'
Invoke-Command -ComputerName $servers -ScriptBlock {
    [PSCustomObject]@{
        Host   = $env:COMPUTERNAME
        Uptime = (Get-Date) - (gcim Win32_OperatingSystem).LastBootUpTime
    }
}

# With local variables
$threshold = 90
Invoke-Command -ComputerName $servers -ScriptBlock {
    $disks = Get-PSDrive -PSProvider FileSystem
    $disks | Where-Object { ($_.Used / ($_.Used + $_.Free)) * 100 -gt $using:threshold }
}
```

### Module Structure

```
MyModule/
├── MyModule.psd1
├── MyModule.psm1
├── Public/
│   ├── Get-Widget.ps1
│   └── New-Widget.ps1
└── Private/
    └── Invoke-WidgetApi.ps1
```

```powershell
# MyModule.psm1
$Public  = Get-ChildItem "$PSScriptRoot/Public" -Filter *.ps1
$Private = Get-ChildItem "$PSScriptRoot/Private" -Filter *.ps1

foreach ($file in $Private) { . $file.FullName }
foreach ($file in $Public)  { . $file.FullName }

Export-ModuleMember -Function $Public.BaseName
```

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
