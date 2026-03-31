param(
  [string]$Url = "https://mahiryuzer049-sudo.github.io/yandex-pet-day-prototypes/variant-a/"
)

$ErrorActionPreference = "Stop"

$sdkRoot = Join-Path $env:LOCALAPPDATA "Android\Sdk"
$emulator = Join-Path $sdkRoot "emulator\emulator.exe"
$adb = Join-Path $sdkRoot "platform-tools\adb.exe"

if (-not (Test-Path $emulator)) {
  throw "Android emulator не найден: $emulator"
}

if (-not (Test-Path $adb)) {
  throw "adb не найден: $adb"
}

$devices = @(
  @{
    Name = "codex_pixel5_api35"
    Serial = "emulator-5560"
    Port = 5560
  },
  @{
    Name = "codex_pixel_tablet_api35"
    Serial = "emulator-5570"
    Port = 5570
  }
)

function Ensure-AdbServer {
  & $adb start-server | Out-Null
}

function Start-EmulatorIfNeeded($device) {
  $running = & $adb devices | Select-String $device.Serial
  if ($running) {
    return
  }

  $args = @(
    "-avd", $device.Name,
    "-port", "$($device.Port)",
    "-no-snapshot-load",
    "-dns-server", "8.8.8.8"
  )

  Start-Process -FilePath $emulator -ArgumentList $args -WorkingDirectory (Split-Path $emulator)
}

function Wait-ForBoot($serial) {
  & $adb -s $serial wait-for-device | Out-Null

  for ($i = 0; $i -lt 120; $i++) {
    $boot = ((& $adb -s $serial shell getprop sys.boot_completed 2>$null) -join "").Trim()
    if ($boot -eq "1") {
      return
    }
    Start-Sleep -Seconds 2
  }

  throw "Эмулятор $serial не завершил загрузку вовремя."
}

function Open-In-Chrome($serial, $targetUrl) {
  & $adb -s $serial shell svc wifi enable | Out-Null
  & $adb -s $serial shell settings put global window_animation_scale 0 | Out-Null
  & $adb -s $serial shell settings put global transition_animation_scale 0 | Out-Null
  & $adb -s $serial shell settings put global animator_duration_scale 0 | Out-Null
  & $adb -s $serial shell input keyevent 82 | Out-Null
  & $adb -s $serial shell am start `
    -n "com.android.chrome/com.google.android.apps.chrome.Main" `
    -a "android.intent.action.VIEW" `
    -d $targetUrl | Out-Null
}

Ensure-AdbServer

foreach ($device in $devices) {
  Start-EmulatorIfNeeded $device
}

foreach ($device in $devices) {
  Wait-ForBoot $device.Serial
  Open-In-Chrome $device.Serial $Url
}

Write-Host "Android phone and tablet previews are ready:"
Write-Host "  Phone:  $($devices[0].Name) [$($devices[0].Serial)]"
Write-Host "  Tablet: $($devices[1].Name) [$($devices[1].Serial)]"
Write-Host "  URL:    $Url"
