@echo off
setlocal EnableExtensions
title Odium Studio - Audition Plugini Kurulum
echo ===================================================
echo    Odium Studio / AU Dub Panel - Kurulum
echo ===================================================
echo.

set "SRC=%~dp0"
set "DEST=%APPDATA%\Adobe\CEP\extensions\AU-Dub-Panel"

if not exist "%SRC%CSXS\manifest.xml" (
  echo HATA: INSTALL.bat uzanti klasorunun KOKUNDE calismali.
  echo Yaninda CSXS, client, jsx klasorleri olmali.
  echo.
  pause
  exit /b 1
)

echo Kaynak : %SRC%
echo Hedef  : %DEST%
echo.
echo Dosyalar kopyalaniyor...
robocopy "%SRC%CSXS"   "%DEST%\CSXS"   /E /PURGE /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SRC%client" "%DEST%\client" /E /PURGE /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SRC%jsx"    "%DEST%\jsx"    /E /PURGE /NFL /NDL /NJH /NJS /NP >nul

echo CEP debug modu aciliyor (imzasiz uzanti izni)...
for %%V in (8 9 10 11 12 13) do (
  reg add "HKCU\Software\Adobe\CSXS.%%V" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
)

echo.
echo FFmpeg kontrol ediliyor / kuruluyor...
if exist "%DEST%\tools\ffmpeg.exe" (
  echo FFmpeg zaten kurulu: %DEST%\tools\ffmpeg.exe
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%SRC%tools\Install-FFmpeg.ps1" -Dest "%DEST%\tools"
)
if exist "%DEST%\tools\ffmpeg.exe" (
  echo FFmpeg hazir: %DEST%\tools\ffmpeg.exe
) else (
  echo UYARI: FFmpeg kurulamadi. Internet yoksa ffmpeg.exe'yi elle "%DEST%\tools" icine koyabilirsin
  echo        ya da panelde Mixci Adim 2'deki "FFmpeg.exe yolu" alanina yolunu girersin.
)

echo.
echo ---------------------------------------------------
echo  KURULUM TAMAM.
echo  1) Audition'i TAMAMEN kapat ve yeniden ac.
echo  2) Window ^> Extensions ^> AU Dub Panel
echo ---------------------------------------------------
echo.
pause
