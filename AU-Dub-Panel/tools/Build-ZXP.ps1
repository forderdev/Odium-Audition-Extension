# ============================================================
#  Build-ZXP.ps1  -  Odium Studio / AU Dub Panel imzali .zxp uretir.
#
#  KULLANIM (gelistirici tarafinda, BIR KEZ):
#    1. ZXPSignCmd.exe'yi indir (Adobe-CEP/CEP-Resources, "ZXPSignCMD" klasoru)
#       ve bu tools/ klasorunun icine koy. (veya -ZXPSignCmd ile yolunu ver)
#    2. PowerShell'de:  powershell -ExecutionPolicy Bypass -File tools\Build-ZXP.ps1
#    3. Cikti: dist\OdiumStudio_AU_Dub_Panel.zxp
#
#  Bu .zxp KENDI imzali (self-signed). Karsi tarafta DEBUG MODU GEREKMEZ;
#  bir ZXP yukleyiciyle (Anastasiy's Extension Manager / ZXPInstaller / Exman) kurulur.
# ============================================================
param(
  [string]$ZXPSignCmd = "",
  [string]$CertPassword = "odium2026"
)
$ErrorActionPreference = "Stop"

$root  = Split-Path -Parent $PSScriptRoot          # repo koku (tools'un ust klasoru)
$dist  = Join-Path $root "dist"
$stage = Join-Path $dist "stage"
$zxp   = Join-Path $dist "OdiumStudio_AU_Dub_Panel.zxp"
$cert  = Join-Path $dist "odium-cert.p12"

# ZXPSignCmd bul
if (-not $ZXPSignCmd) {
  $cand = Join-Path $PSScriptRoot "ZXPSignCmd.exe"
  if (Test-Path $cand) { $ZXPSignCmd = $cand }
  elseif (Get-Command ZXPSignCmd.exe -ErrorAction SilentlyContinue) { $ZXPSignCmd = "ZXPSignCmd.exe" }
}
if (-not $ZXPSignCmd) {
  Write-Host "HATA: ZXPSignCmd.exe bulunamadi." -ForegroundColor Red
  Write-Host "Indir: https://github.com/Adobe-CEP/CEP-Resources  (ZXPSignCMD klasoru)"
  Write-Host "tools\ icine koy ya da: -ZXPSignCmd 'C:\yol\ZXPSignCmd.exe'"
  exit 1
}

# stage hazirla (sadece uzanti dosyalari)
New-Item -ItemType Directory -Force -Path $dist | Out-Null
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stage | Out-Null
Copy-Item (Join-Path $root "CSXS")   (Join-Path $stage "CSXS")   -Recurse
Copy-Item (Join-Path $root "client") (Join-Path $stage "client") -Recurse
Copy-Item (Join-Path $root "jsx")    (Join-Path $stage "jsx")    -Recurse

# self-signed sertifika (yoksa olustur)
if (-not (Test-Path $cert)) {
  Write-Host "Self-signed sertifika olusturuluyor: $cert"
  & $ZXPSignCmd -selfSignedCert TR Istanbul "Odium Studio" "Odium Studio" $CertPassword "$cert"
  if ($LASTEXITCODE -ne 0) { Write-Host "Sertifika olusturulamadi." -ForegroundColor Red; exit 1 }
}

# imzala
if (Test-Path $zxp) { Remove-Item $zxp -Force }
Write-Host "Imzalaniyor -> $zxp"
& $ZXPSignCmd -sign "$stage" "$zxp" "$cert" $CertPassword
if ($LASTEXITCODE -ne 0) { Write-Host "Imzalama basarisiz." -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "TAMAM. Imzali paket: $zxp" -ForegroundColor Green
Write-Host "Dagit: karsi taraf bir ZXP yukleyiciyle kursun (debug modu gerekmez)."
