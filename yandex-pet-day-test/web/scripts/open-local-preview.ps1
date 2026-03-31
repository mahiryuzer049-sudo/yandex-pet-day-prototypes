$paramUrl = $null
if ($args.Count -gt 0) {
  $paramUrl = $args[0]
}

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$nodeExe = (Get-Command node).Source
$nextBin = Join-Path $projectRoot "node_modules\next\dist\bin\next"
$bindHost = "0.0.0.0"

function Test-PreviewHost {
  param(
    [string]$HostName
  )

  if (-not $HostName) {
    return $false
  }

  try {
    $response = Invoke-WebRequest -Uri "http://$HostName`:3000/variant-a" -UseBasicParsing -TimeoutSec 3
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

function Get-PreferredPreviewHost {
  $candidate = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object {
      $_.AddressState -eq 'Preferred' -and
      $_.IPAddress -notmatch '^127\.' -and
      $_.IPAddress -notmatch '^169\.254\.' -and
      $_.IPAddress -notmatch '^172\.27\.' -and
      $_.InterfaceAlias -notmatch 'WSL|Hyper-V|vEthernet|singbox|Docker|VMware|VirtualBox|Tailscale|ZeroTier' -and
      $_.PrefixOrigin -ne 'WellKnown'
    } |
    Sort-Object InterfaceMetric, SkipAsSource |
    Select-Object -First 1 -ExpandProperty IPAddress

  # Prefer the real LAN IP even before the preview is up.
  # The user's browser repeatedly fails on localhost/hostname loopback,
  # while the same preview is stable via the machine IP.
  if ($candidate) {
    return $candidate
  }

  if (Test-PreviewHost -HostName $env:COMPUTERNAME) {
    return $env:COMPUTERNAME
  }

  if (Test-PreviewHost -HostName "localhost") {
    return "localhost"
  }

  return $env:COMPUTERNAME
}

$previewHost = Get-PreferredPreviewHost

function Resolve-PreviewUrl {
  param(
    [string]$InputUrl,
    [string]$HostName
  )

  if (-not $InputUrl) {
    return "http://$HostName`:3000/variant-a"
  }

  if ($InputUrl -match '^(https?://)(localhost|127\.0\.0\.1)(:\d+)?(/.*)?$') {
    $scheme = $matches[1]
    $port = if ($matches[3]) { $matches[3] } else { ":3000" }
    $path = if ($matches[4]) { $matches[4] } else { "/variant-a" }
    return "$scheme$HostName$port$path"
  }

  if ($InputUrl -match '^/') {
    return "http://$HostName`:3000$InputUrl"
  }

  return $InputUrl
}

$baseUrl = Resolve-PreviewUrl -InputUrl $paramUrl -HostName $previewHost
$openUrl = $baseUrl

function Stop-PreviewProcesses {
  $previewProcesses = Get-CimInstance Win32_Process |
    Where-Object {
      $_.ProcessId -ne $PID -and (
      ($_.Name -eq "node.exe" -and $_.CommandLine -like "*next*start*3000*") -or
      ($_.Name -eq "node.exe" -and $_.CommandLine -like "*npm*run start:local*") -or
      ($_.Name -eq "powershell.exe" -and $_.CommandLine -like "*open-local-preview.ps1*")
      )
    }

  foreach ($process in $previewProcesses) {
    try {
      Stop-Process -Id $process.ProcessId -Force -ErrorAction Stop
    } catch {
      Write-Host "Failed to stop process $($process.ProcessId): $($_.Exception.Message)" -ForegroundColor Yellow
    }
  }
}

function Wait-ForPreview {
  param(
    [string]$TargetUrl,
    [int]$TimeoutSeconds = 45
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)

  while ((Get-Date) -lt $deadline) {
    try {
      $response = Invoke-WebRequest -Uri $TargetUrl -UseBasicParsing -TimeoutSec 5
      if ($response.StatusCode -eq 200) {
        return $true
      }
    } catch {
      Start-Sleep -Milliseconds 800
    }
  }

  return $false
}

function Remove-PreviewDuplicates {
  $listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1

  if (-not $listener) {
    return
  }

  $activePid = $listener.OwningProcess
  $duplicates = Get-CimInstance Win32_Process |
    Where-Object {
      $_.ProcessId -ne $activePid -and (
        ($_.Name -eq "node.exe" -and $_.CommandLine -like "*next*start*3000*") -or
        ($_.Name -eq "node.exe" -and $_.CommandLine -like "*npm*run start:local*")
      )
    }

  foreach ($process in $duplicates) {
    try {
      Stop-Process -Id $process.ProcessId -Force -ErrorAction Stop
    } catch {
      Write-Host "Failed to stop duplicate preview process $($process.ProcessId): $($_.Exception.Message)" -ForegroundColor Yellow
    }
  }
}

Set-Location $projectRoot

Stop-PreviewProcesses

Write-Host "Building fresh local preview..." -ForegroundColor Yellow
npm run build

Start-Process -FilePath $nodeExe -ArgumentList @(
  $nextBin,
  "start",
  "--hostname",
  $bindHost,
  "--port",
  "3000"
) -WorkingDirectory $projectRoot -WindowStyle Hidden | Out-Null

if (-not (Wait-ForPreview -TargetUrl $baseUrl)) {
  throw "Local preview did not answer with HTTP 200 in time."
}

Remove-PreviewDuplicates

Start-Process $openUrl | Out-Null
Write-Host "Preview rebuilt on $bindHost and opened: $openUrl" -ForegroundColor Green
