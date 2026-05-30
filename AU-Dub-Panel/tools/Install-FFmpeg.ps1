# ============================================================
#  Install-FFmpeg.ps1  -  ffmpeg.exe'yi indirip hedef klasore koyar
#  ve klasoru kullanici PATH'ine ekler (admin gerekmez).
#  INSTALL.bat tarafindan cagrilir: -Dest "<uzanti>\tools"
#  Panel zaten bu konumdaki ffmpeg.exe'yi arkaplanda otomatik kullanir.
# ============================================================
param([string]$Dest = "")
$ErrorActionPreference = "Stop"

function Ensure-UserPath($dir) {
  try {
    $u = [Environment]::GetEnvironmentVariable("Path", "User")
    if (-not $u) { $u = "" }
    $parts = $u -split ';'
    if ($parts -notcontains $dir) {
      $nu = $u.TrimEnd(';')
      if ($nu) { $nu = $nu + ";" + $dir } else { $nu = $dir }
      [Environment]::SetEnvironmentVariable("Path", $nu, "User")
      Write-Host ("PATH'e eklendi (User): {0}" -f $dir)
    } else {
      Write-Host "PATH'te zaten var."
    }
  } catch { Write-Warning ("PATH'e eklenemedi: {0}" -f $_.Exception.Message) }
}

try {
  if (-not $Dest) { $Dest = Join-Path $PSScriptRoot "ffmpeg" }
  New-Item -ItemType Directory -Force -Path $Dest | Out-Null
  $target = Join-Path $Dest "ffmpeg.exe"

  if (Test-Path $target) { Ensure-UserPath $Dest; Write-Host "FFmpeg zaten kurulu: $target"; exit 0 }

  # PATH'te varsa oradan kopyala (indirme gerekmez)
  $inPath = Get-Command ffmpeg.exe -ErrorAction SilentlyContinue
  if ($inPath) { Copy-Item $inPath.Source $target -Force; Ensure-UserPath $Dest; Write-Host "PATH'teki ffmpeg kopyalandi: $target"; exit 0 }

  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $urls = @(
    "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip",
    "https://github.com/BtbN/FFmpeg-Builds/releases/latest/download/ffmpeg-master-latest-win64-gpl.zip"
  )
  $zip = Join-Path $env:TEMP "audub_ffmpeg.zip"
  $got = $false
  foreach ($u in $urls) {
    try { Write-Host "FFmpeg indiriliyor (birkaç dk surebilir): $u"; Invoke-WebRequest -Uri $u -OutFile $zip -UseBasicParsing; $got = $true; break }
    catch { Write-Warning ("Indirilemedi: {0}" -f $u) }
  }
  if (-not $got) {
    Write-Warning "FFmpeg indirilemedi (internet yok/engelli olabilir). ffmpeg.exe'yi elle su klasore koy: $Dest"
    exit 1
  }

  $ex = Join-Path $env:TEMP "audub_ffmpeg_x"
  if (Test-Path $ex) { Remove-Item $ex -Recurse -Force }
  Write-Host "Cikartiliyor..."
  Expand-Archive -LiteralPath $zip -DestinationPath $ex -Force
  $exe = Get-ChildItem -Path $ex -Recurse -Filter ffmpeg.exe | Select-Object -First 1
  if (-not $exe) { Write-Warning "Zip icinde ffmpeg.exe bulunamadi."; exit 1 }
  Copy-Item $exe.FullName $target -Force
  Remove-Item $zip -Force -ErrorAction SilentlyContinue
  Remove-Item $ex -Recurse -Force -ErrorAction SilentlyContinue
  Ensure-UserPath $Dest
  Write-Host "FFmpeg kuruldu: $target"
  exit 0
} catch {
  Write-Warning ("FFmpeg kurulum hatasi: {0}" -f $_.Exception.Message)
  exit 1
}
