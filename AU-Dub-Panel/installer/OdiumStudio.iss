; ============================================================
;  Odium Studio - Audition Plugini  /  Inno Setup kurulum scripti
;
;  DERLEME:
;   1) Inno Setup'i kur (ucretsiz): https://jrsoftware.org/isdl.php
;   2) Bu dosyaya cift tikla -> Inno Setup acilir -> Build (F9)
;      veya komut satiri:  ISCC.exe installer\OdiumStudio.iss
;   3) Cikti: dist\OdiumStudioSetup.exe  (insanlara SADECE bu exe'yi gonder)
;
;  Ne yapar: uzantiyi %APPDATA%\Adobe\CEP\extensions\AU-Dub-Panel altina kurar,
;  CEP debug modunu acar (imzasiz uzanti izni) ve FFmpeg'i indirip kurar.
;  Admin gerekmez (per-user). Surum cikarirken AppVersion'i guncelle.
; ============================================================

#define AppName "Odium Studio - Audition Plugini"
#define AppVersion "1.6.0"
#define Publisher "Odium Studio"

[Setup]
AppId={{B7E2B6A1-0D2C-4E8A-9F3A-AUDUBPANEL01}}
AppName={#AppName}
AppVersion={#AppVersion}
AppPublisher={#Publisher}
DefaultDirName={userappdata}\Adobe\CEP\extensions\AU-Dub-Panel
DisableDirPage=yes
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputDir=..\dist
OutputBaseFilename=OdiumStudioSetup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayName={#AppName}
SetupLogging=yes

[Languages]
Name: "tr"; MessagesFile: "compiler:Languages\Turkish.isl"

[Files]
Source: "..\CSXS\*";   DestDir: "{app}\CSXS";   Flags: recursesubdirs createallsubdirs ignoreversion
Source: "..\client\*"; DestDir: "{app}\client"; Flags: recursesubdirs createallsubdirs ignoreversion
Source: "..\jsx\*";    DestDir: "{app}\jsx";    Flags: recursesubdirs createallsubdirs ignoreversion
Source: "..\tools\Install-FFmpeg.ps1"; DestDir: "{app}\tools"; Flags: ignoreversion

[Registry]
; CEP debug modu (imzasiz uzanti yukleme izni) - tum olasi CSXS surumleri
Root: HKCU; Subkey: "Software\Adobe\CSXS.9";  ValueType: string; ValueName: "PlayerDebugMode"; ValueData: "1"; Flags: createvalueifdoesntexist uninsdeletevalue
Root: HKCU; Subkey: "Software\Adobe\CSXS.10"; ValueType: string; ValueName: "PlayerDebugMode"; ValueData: "1"; Flags: createvalueifdoesntexist uninsdeletevalue
Root: HKCU; Subkey: "Software\Adobe\CSXS.11"; ValueType: string; ValueName: "PlayerDebugMode"; ValueData: "1"; Flags: createvalueifdoesntexist uninsdeletevalue
Root: HKCU; Subkey: "Software\Adobe\CSXS.12"; ValueType: string; ValueName: "PlayerDebugMode"; ValueData: "1"; Flags: createvalueifdoesntexist uninsdeletevalue
Root: HKCU; Subkey: "Software\Adobe\CSXS.13"; ValueType: string; ValueName: "PlayerDebugMode"; ValueData: "1"; Flags: createvalueifdoesntexist uninsdeletevalue

[Run]
; FFmpeg indir/kur + kullanici PATH'ine ekle
Filename: "powershell.exe"; \
  Parameters: "-NoProfile -ExecutionPolicy Bypass -File ""{app}\tools\Install-FFmpeg.ps1"" -Dest ""{app}\tools"""; \
  StatusMsg: "FFmpeg indiriliyor/kuruluyor (birkac dk surebilir)..."; \
  Flags: runhidden waituntilterminated

[Messages]
tr.WelcomeLabel2=Bu sihirbaz [name] eklentisini Adobe Audition icin kuracak.%n%nKurulumdan sonra Audition'i tamamen kapatip yeniden ac, sonra: Window > Extensions > AU Dub Panel
