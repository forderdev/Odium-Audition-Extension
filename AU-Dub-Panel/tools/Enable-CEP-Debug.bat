@echo off
REM ============================================================
REM  AU Dub Panel / Odium Studio - CEP debug modunu acar.
REM  Imzasiz uzantilarin yuklenmesine izin verir.
REM  Cift tikla, sonra Audition'i TAMAMEN kapatip yeniden ac.
REM  (Yonetici gerekmez; sadece HKCU yazar.)
REM ============================================================
echo CEP PlayerDebugMode aciliyor (CSXS 9-13)...

for %%V in (9 10 11 12 13) do (
  reg add "HKCU\Software\Adobe\CSXS.%%V" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
  reg add "HKCU\Software\Adobe\CSXS.%%V" /v LogLevel /t REG_SZ /d 1 /f >nul 2>&1
)

echo.
echo Bitti. Simdi Audition'i tamamen kapatip yeniden acin.
echo Sonra: Window ^> Extensions ^> AU Dub Panel
echo.
pause
