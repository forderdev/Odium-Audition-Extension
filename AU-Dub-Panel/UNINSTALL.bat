@echo off
setlocal EnableExtensions
title Odium Studio - Audition Plugini Kaldir
set "DEST=%APPDATA%\Adobe\CEP\extensions\AU-Dub-Panel"
echo Kaldiriliyor: %DEST%
if exist "%DEST%" (
  rmdir /S /Q "%DEST%"
  echo Silindi.
) else (
  echo Zaten yok.
)
echo Audition'i yeniden baslat.
echo.
pause
