# AU Dub Panel v1.3.0

Adobe Audition için oyun dublaj workflow paneli. İki rol için tasarlandı: **Seslendirme Sanatçısı** ve **Mixçi**. Panel açılınca tek bir rol seçimi sunar; her rol sadece kendi 3 adımını görür. Tüm eski/ileri araçlar "Gelişmiş / Tam Panel" katlanır bölümünde durur.

## İki rol akışı

**🎙 Seslendirme Sanatçısı**
1. Orijinal ses klasörünü seç → panel orijinalleri Audition'da açık multitrack session'ın 1. track'ine dizer.
2. Audition'da 2. track'e kaydını yap (orijinalin altına) → "Kayıtları Eşle": panel track 2 clip'lerini okuyup üstlerindeki orijinallerle eşler (pozisyon veya sıra; manuel düzeltme de var).
3. "Projeyi Kaydet ve Paket Oluştur" → paket klasörünü Audition session (.sesx) ile mixçiye gönder.

**🎚 Mixçi**
1. Projeyi (.audub/project.json) yükle.
2. Audition'da mixle, TEK dosyaya mixdown/bounce et → "Mix Dosyasını Yükle ve Böl": panel kesim haritasına (her repliğin canlı take başlangıç/bitişi) göre tek dosyayı tekrar repliklere böler ve take olarak bağlar.
3. "Orijinal İsimlerle Toplu Export" → her parça import edilen orijinalin aynı adıyla Audio/Exports'a çıkar.

> Not: Mixdown sadece dub'ı (track 2) içermeli. Orijinal referans track'i (track 1) mixdown'a dahil edilirse kesilen parçalar orijinal+take karışımı olur.

## Bu sürümde çalışan gerçek özellikler

- Orijinal ses klasörü seçme
- Dosyaları isme göre doğal sıralama
- Her replik için timeline başlangıç/bitiş taslağı üretme
- Geniş export preset listesi
- `.audub/project.json` kaydetme ve geri yükleme
- Paylaşım paketi oluşturma
- Take / miks sonrası ayrılmış ses dosyalarını repliklere bağlama
- Uzun kayıtları orijinal süreye kırpmadan `selectedTakeId` ile işaretleme
- `.audub/mix-map.json` taslağı oluşturma
- `.audub/export-plan.json` ve `.audub/export-plan.csv` oluşturma
- FFmpeg ile gerçek toplu export alma
- Export sonrası çıktı dosyalarını doğrulama
- Tek parça miks dosyasını mix-map sınırlarına göre tekrar parçalara ayırma
- Ayrılan mix parçalarını ilgili lineId'lere seçili take olarak bağlama

## Audition canlı scripting durumu

- **Çalışıyor:** Timeline'a Hazırla (orijinalleri track'e dizme), track 2 kayıtlarını okuma (Kayıtları Eşle).
- **Hâlâ stub (Gelişmiş > 4. bölümde):** "Seçili Kaydı Take Yap", "Mix Map Oluştur", "Toplu Export" host butonları sadece bağlantı testidir. Bu işlevlerin gerçek karşılıkları panel tarafında (canlı eşleme, mix-split, FFmpeg export) çalışır.

## Kurulum

Klasörü şu yola koyun:

```text
%APPDATA%/Adobe/CEP/extensions/AU-Dub-Panel
```

Son konum şöyle olmalı:

```text
%APPDATA%/Adobe/CEP/extensions/AU-Dub-Panel/CSXS/manifest.xml
```

Audition içinde:

```text
Window > Extensions > AU Dub Panel
```

## Kurulum (başka makinede) — en kolay yol

Klasörü (CSXS, client, jsx yanında) karşı tarafa gönder, **`INSTALL.bat`'a çift tıklasın**. Bu kurucu:
- Uzantıyı `%APPDATA%\Adobe\CEP\extensions\AU-Dub-Panel` altına kopyalar,
- CEP debug modunu (imzasız uzantı izni) açar.
Sonra Audition'ı tamamen kapatıp aç → `Window > Extensions > AU Dub Panel`. Kaldırmak için `UNINSTALL.bat`.

## "Invalid Signature" hatası (manuel kopyaladıysan)

Uzantı imzasız olduğu için CEP, varsayılan ayarlarla onu yüklemez ve **"Unable to load … Invalid Signature"** der. `INSTALL.bat` bunu zaten halleder; elle çözmek istersen:

1. `tools/Enable-CEP-Debug.bat` dosyasına çift tıkla (veya `tools/Enable-CEP-Debug.reg` → Evet). Yönetici gerekmez; sadece `HKCU\Software\Adobe\CSXS.*` altına `PlayerDebugMode="1"` yazar.
2. Audition'ı **tamamen kapat** ve yeniden aç.
3. `Window > Extensions > AU Dub Panel`.

## İmzalı .zxp üretmek (debug modu gerektirmeyen dağıtım)

Debug modu olmadan, herhangi bir makinede kurulabilen imzalı paket için:

1. `ZXPSignCmd.exe`'yi indir (Adobe-CEP/CEP-Resources → ZXPSignCMD) ve `tools/` içine koy.
2. `powershell -ExecutionPolicy Bypass -File tools\Build-ZXP.ps1`
3. Çıktı: `dist/OdiumStudio_AU_Dub_Panel.zxp` (self-signed). Karşı taraf bunu bir ZXP yükleyiciyle (Anastasiy's Extension Manager / ZXPInstaller / Exman) kurar.

Elle yapmak istersen (PowerShell):

```powershell
9..13 | ForEach-Object {
  New-Item -Path "HKCU:\Software\Adobe\CSXS.$_" -Force | Out-Null
  Set-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.$_" -Name PlayerDebugMode -Value "1"
}
```

Not: `PlayerDebugMode` değeri **string ("1")** olmalı (DWORD değil). Doğru CSXS numarası Audition sürümüne göre değişir; .bat hepsini (9–13) yazdığı için sorun olmaz.

**Gerçek dağıtım (debug modu gerektirmez):** Uzantıyı `ZXPSignCmd` ile (kendi imzalı sertifika yeter) `.zxp` olarak imzalayıp paketle; kullanıcı bunu bir ZXP yükleyiciyle (ör. Anastasiy's Extension Manager / ZXPInstaller / Exman) kurar. İmzalı .zxp her makinede debug modu olmadan yüklenir.

## Önerilen test akışı

1. Orijinal ses klasörünü seçin.
2. `Project JSON Oluştur` butonuna basın.
3. `.audub/project.json Kaydet` butonuna basın.
4. Take / miks sonrası ayrılmış ses klasörünü seçin.
5. `Take Dosyalarını Bağla` butonuna basın.
6. `Take Bağlantısını Doğrula` butonuna basın.
7. `Export Plan Kaydet` butonuna basın.
8. `FFmpeg Export Script Oluştur` butonuna basın.
9. `FFmpeg Export Çalıştır` butonuna basın.
10. `Export Sonucu Doğrula` butonuna basın.

## Mix sonrası ayırma test akışı

1. Take bağlama tamamlandıktan sonra `Mix Map Taslağı Kaydet` butonuna basın.
2. Mixajcıdan gelen tek parça final mix dosyasını `Birleştirilmiş / mikslenmiş tek dosya` alanında seçin.
3. `Mix Ayırma Script Oluştur` butonuna basın.
4. `Mix Dosyasını Ayır` butonuna basın.
5. `Ayrılanları Doğrula ve Take Yap` butonuna basın.
6. Sonrasında normal `Export Plan Kaydet → FFmpeg Export Çalıştır → Export Sonucu Doğrula` akışını çalıştırın.

## v0.9.0

- `Mix Sonrası Ayırma` bölümü eklendi.
- Tek parça final mix dosyasını `Audio/Mix` içine kopyalayan sistem eklendi.
- `.audub/mix-split-plan.json` ve `.audub/mix-split-plan.csv` üretimi eklendi.
- `.audub/run-split-mix-ffmpeg.ps1` ve `.audub/run-split-mix-ffmpeg.bat` script üretimi eklendi.
- FFmpeg ile mix dosyasını `mixStart/mixEnd` sınırlarına göre `Audio/Takes` içine parçalara ayırma eklendi.
- `Ayrılanları Doğrula ve Take Yap` butonu eklendi.
- Ayrılan parçalar ilgili `lineId` için `sourceKind: mix_split` olarak seçili take yapılır.

## v0.6.0

- Take Bağlantısını Doğrula butonu eklendi.
- `.audub/take-verify-report.csv` ve `.audub/take-verify-report.json` üretir.
- Her line için seçili take var mı, dosya yolu bulunuyor mu, süre 0 mı ve take orijinalden uzun mu kontrol eder.
- Uzun kayıtlar hata sayılmaz; raporda ayrıca işaretlenir ve export sırasında gerçek take süresi korunur.

## v0.5.0

- FFmpeg export sonrasındaki çıktıların varlığını ve dosya boyutlarını doğrulayan `Export Sonucu Doğrula` butonu eklendi.
- `.audub/export-verify-report.csv` ve `.audub/export-verify-report.json` raporları üretilir.
- FFmpeg log akışı daha düzenli hale getirildi.

## v0.4.x

- FFmpeg export script sistemi eklendi.
- Windows path / Türkçe karakter / PowerShell quote sorunları düzeltildi.
- FFmpeg hata detayları `.audub/ffmpeg-export-log.txt` içine yazılır.


## v0.9.0

- Proje Sağlık Kontrolü eklendi. `.audub/project-health-report.csv` ve `.audub/project-health-report.json` üretir.
- Paketleme öncesi orijinal dosya, seçili take, eksik dosya ve uzun kayıt durumunu özetler.
- Paylaşım paketi appVersion değeri 0.8.0 olarak güncellendi.


## v0.9.0

- Project JSON yüklenince proje kök yolunu loglar.
- Sağlık kontrolünde take yoksa eski/yanlış project.json ayrımı daha kolay yapılır.
- `Take’leri Diskten Toparla` butonu eklendi: `Audio/Takes` içindeki `__mixsplit`, `__take` veya aynı adlı take dosyalarını lineId’lere yeniden bağlar.

## v0.9.0

- Paylaşım paketi oluşturulduktan sonra otomatik paket final kontrolü eklendi.
- Yeni “Son Paketi Kontrol Et” butonu eklendi.
- Paket içinde `.audub/project.json`, `README_AU_DUB.txt`, `Audio/Original` ve `Audio/Takes` sayıları kontrol edilir.
- Paket raporları `.audub/package-final-report.csv` ve `.audub/package-final-report.json` olarak yazılır.


## v1.5.9

- **GitHub uzaktan güncelleme bağlandı.** `UPDATE_MANIFEST_URL` = `https://raw.githubusercontent.com/forderdev/Odium-Audition-Extension/main/version.json`. Canlı manifest repo kökündeki `version.json`; `setupUrl` Releases'in son sürümüne sabit link (`releases/latest/download/OdiumStudioSetup.exe`).

### Yeni sürüm yayınlama (her güncellemede)
1. Kodu değiştir. Sürümü **5 yerde** artır: `CSXS/manifest.xml`, `client/index.html` (ver), `client/js/app.js` (`CURRENT_VERSION`), `installer/OdiumStudio.iss` (`AppVersion`).
2. Inno Setup ile derle (F9) → `dist/OdiumStudioSetup.exe`.
3. GitHub'da **yeni Release** oluştur (tag: vX.Y.Z), asset olarak `OdiumStudioSetup.exe` yükle (isim birebir).
4. Kökteki `version.json`'da `version`'ı yeni sürüme çıkar (gerekirse `notes`), commit + push (main).
5. Bitti — açık panellerde "⟳ Güncelle (vX.Y.Z)" çıkar; basınca son setup.exe inip kurulur. (`setupUrl` hep "latest"e baktığı için değiştirmene gerek yok.)

## v1.5.8

- **EXE installer (Inno Setup).** `installer/OdiumStudio.iss` ile tek `OdiumStudioSetup.exe` üretilir (Inno Setup ile derle: F9 ya da `ISCC.exe installer\OdiumStudio.iss`). INSTALL.bat'ın yaptığı her şeyi yapar: uzantıyı `%APPDATA%\Adobe\CEP\extensions\AU-Dub-Panel` altına kurar, CEP debug modunu açar, FFmpeg indirir/kurar/PATH'e ekler. Admin gerekmez (per-user), uninstaller dahil. İnsanlara sadece bu exe gönderilir.
- **Uzaktan güncelleme.** Panel açılışta `UPDATE_MANIFEST_URL`'deki `version.json`'a bakar; sürüm daha yeniyse üstte **"⟳ Güncelle (vX.Y.Z)"** butonu çıkar. Basınca `setupUrl`'deki yeni setup.exe'yi indirip çalıştırır (`.exe` değilse tarayıcıda açar). Yayın akışı: yeni sürüm → `AppVersion`/`CURRENT_VERSION` artır → setup.exe derle → setup.exe'yi ve güncel `version.json`'u (yeni version + setupUrl) sunucuya/GitHub Releases'a koy. `version.json` örneği `installer/version.json`'da.
- Kurulum/güncelleme adımları `INSTALL.bat`'ta da duruyor (alternatif).

## v1.5.7

- **FFmpeg tamamen sessiz/otomatik.** `Install-FFmpeg.ps1` indirdiği klasörü artık **kullanıcı PATH'ine** de ekliyor (admin yok). Panel ise her zaman arkaplanda `tools/ffmpeg.exe`'yi (yoksa PATH'i) kullanıyor; "FFmpeg.exe yolu" alanı UI'dan tamamen kaldırıldı — kullanıcıya seçildiği gösterilmez/söylenmez.
- **"PROJECT.JSON'UM YOK!" açılır menü.** Mixçi Adım 1'deki project.json'suz akış (track1+track2 eşleme) artık tıklayınca açılan bir `<details>` ağacının ("PROJECT.JSON'UM YOK!") altında; normalde kapalı durur.

## v1.5.6

- **INSTALL.bat FFmpeg'i otomatik kurar.** Kurulum sırasında FFmpeg PATH'te yoksa `tools/Install-FFmpeg.ps1` çalışır: PATH'te varsa kopyalar, yoksa statik build indirir (gyan.dev / BtbN) ve `<uzantı>/tools/ffmpeg.exe`'ye koyar. Panel bu konumdaki ffmpeg'i **otomatik kullanır** (PATH gerekmez); `applyFfmpegPath` önce elle gireni, sonra gömülü `tools/ffmpeg.exe`, sonra PATH'i dener. İndirme başarısızsa elle koyma/yol girme uyarısı verilir.

## v1.5.5

- **FFmpeg yolu elle verilebilir (PATH zorunlu değil).** Mixçi Adım 2'ye "FFmpeg.exe yolu" alanı eklendi; doldurulursa bölme/export script'leri `$ffmpeg`'i o yola ayarlar (`project.ffmpegPath`), boşsa PATH'teki `ffmpeg` kullanılır. (Loglardaki "FFmpeg bulunamadi" hatası = makinede FFmpeg kurulu/PATH'te değil; kod hatası değil.)
- **Session kaydetme daha dayanıklı.** `AU_saveSession` birkaç komut adı dener (`Save`, `File.Save`, `SaveSession`...). Not: hiç adlandırılmamış ("Untitled") session'da Audition Save As ister; en temizi session'ı bir kez adıyla kaydetmek.

## v1.5.4

- **Mixçi dosya seçimleri seslendirmenle aynı sisteme geçti.** project.json ve mix dosyası seçimi artık `cep.fs` yerine `ProjectStore.pickFileDialog` (PowerShell + WinForms OpenFileDialog, tek dosya) kullanıyor — klasör seçicisiyle aynı modern + Türkçe-güvenli (UTF-8 geçici dosya) mekanizma. Tek dosya seçilir, filtreyle (json / ses).

## v1.5.3

- **Mixçiye gönderirken önce session otomatik kaydedilir (Ctrl+S).** "Paketle + .sesx ile Zip'le" artık zip'ten önce Audition session'ını kaydeder (`AU_saveSession`: önce `invokeCommand("Save")`, gerekirse `saveDocument`; başarı `dirty` bayrağıyla doğrulanır). Önceden session kaydedilmediği için zip'lenen `.sesx` eski/boş kalıyor ve mixçide boş proje açılıyordu. Hiç kaydedilmemiş session'da Audition Save As diyalogu açılır (kullanıcı yer seçer).

## v1.5.2

- **Türkçe karakter düzeltmesi (klasör seçici).** `pickFolderDialog` PowerShell'in stdout'unu okuyordu; Türkçe Windows konsol kodlaması (cp1254/857) UTF-8 sanılınca yollar bozuluyordu (ör. `İş` → `??`). Artık seçilen yol PowerShell tarafında **UTF-8 (BOM'suz) geçici dosyaya** yazılıp Node tarafında UTF-8 okunuyor; Türkçe karakterler korunuyor. Elle yazılan yollar zaten doğruydu.

## v1.5.1

- **Session medyası .sesx'in yanına, orijinal göreli yapısıyla kopyalanır.** Audition `.sesx`'i açarken kayıt/import dosyalarını kendisine göre aynı göreli yolda aradığı için (ör. `<session>_Recorded/...`), medya artık `Audio/Session_Media` yerine paketin köküne `.sesx`'le aynı göreli konuma kopyalanıyor (packageRoot, .sesx klasörünü aynalıyor). Paketin rezerve klasörleri (`Audio/`, `.audub/`) ve eski paketler atlanır.

## v1.5.0

- **Her konum seçimi artık elle de girilebilir.** Tüm yol seçimleri (orijinal klasörü, project.json, mix dosyası, pozisyon çıktı klasörü, export çıkış klasörü) buton + düzenlenebilir metin kutusu oldu: seçiciyle doldurursun ya da yolu doğrudan yapıştırırsın. Aksiyonlar artık kutudaki değeri okur.
- **Paket zip'ine session medyası eklenir.** Seslendirmen paketi oluştururken, `.sesx`'in bulunduğu klasör ve alt klasörlerindeki tüm ses dosyaları (Audition kayıtları/_Recorded, merged, imported) `Audio/Session_Media/` altına kopyalanır ve zip'e girer; mixçi sesleri oradan çekebilir. (Eski paket klasörleri ve paketin kendi içi atlanır.) `packageProject(..., { includeSessionMedia:false })` ile kapatılabilir.

## v1.4.9

- **Orijinal seçimi tekrar klasör seçmeye döndü (alt klasörler dahil).** Seslendirmen Adım 1'de "📁 Klasör Seç…" modern klasör seçiciyi (`pickFolderDialog`, Explorer tarzı) açar; `buildProjectFromFolder` klasörü ve **tüm alt klasörlerini** (`walkAudioFiles`) tarayıp sesleri sıralar. (v1.4.3'teki çoklu dosya seçimi yerine.)

## v1.4.8

- **Baştaki boşluk (timeline offset) zaten hesaba katılıyor.** Kesim sınırları Audition'dan gerçek/mutlak timeline pozisyonu olarak okunduğu için, sesler 0:00'dan başlamasa da (örn. ilk ses 1. saniyede) her replik kendi gerçek konumundan kesilir. Tek koşul: mixdown session başından (0:00) alınmalı (Audition'ın varsayılan tam mixdown'ı böyle). UI'da not eklendi; eşleştirme sonrası ilk/son kesim konumları log'a yazılıyor.

## v1.4.7

- **Çok-parçalı replikte boşluklar korunuyor (uç uca birleştirme kaldırıldı).** Bir repliğin altında birden çok kayıt parçası varsa (delete silence), kesim tek bölge `[ilk parça başı, son parça sonu]` olarak alınır — parçalar arasındaki boşluklar (örn. 1 sn) olduğu gibi korunur. v1.4.6'daki `aselect` ile boşluksuz birleştirme kaldırıldı; bölme yine basit tek `-ss/-t` kesimi.

## v1.4.6

- **Mixçi: track1(orijinal)+track2(kayıt) eşleştirme + çok-parça birleştirme.** project.json yokken mixçi, Audition'da Track 1'e orijinalleri (isimleriyle) ve altındaki Track 2'ye kayıtları koyar; "Audition'dan Pozisyonları Oku & Eşle" der. Panel her iki track'i okur (`AU_readTakeClips`), `ProjectStore.buildProjectFromMatchedTracks` ile track 2'deki her kaydı üstündeki orijinalin bölgesiyle (bir sonraki orijinale kadar) eşler; isim track 1'den gelir. **Delete-silence** ile bir repliğin kaydı birden çok parçaya bölündüyse, o parçalar `segments` olarak saklanır ve bölme aşamasında ffmpeg `aselect` ile **boşluksuz birleştirilip** tek dosya olarak orijinal adıyla export edilir. (Track no'ları seçilebilir; varsayılan 1 ve 2.)

## v1.4.5

- **Mixçi: project.json olmadan, Audition pozisyonlarından bölme.** Sesler mixçiye WAV olarak geldiyse (project.json yok): Audition'da bir track'e dizip adlandırır, "📍 Audition'dan Pozisyonları Oku" der; panel bir çıktı klasörü sorar, o track'in clip'lerini okur (`AU_readTakeClips`) ve `ProjectStore.buildProjectFromLiveClips` ile proje kurar (her clip = replik; clip adı = çıktı adı; clip start/bitiş = kesim sınırı `mixStart/mixEnd`). Sonra normal Adım 2 (mixdown'ı seç ve böl) + Adım 3 (export) çalışır.

## v1.4.4

- Marka yazısı "Odium Studio / Audition Plugini" olarak değiştirildi.

## v1.4.3

- **Eski "Klasöre Gözat" penceresi kaldırıldı.** `cep.fs`'in klasör modu Windows'ta eski stil pencereyi açtığı için: (1) Seslendirmen orijinal seçimi artık **çoklu dosya** seçimi (modern Explorer dialog, Ctrl+A ile hepsi) — `ProjectStore.buildProjectFromPaths` ile path listesinden proje kurulur (proje kökü = ilk dosyanın klasörü). (2) Mixçi export çıkış klasörü için modern klasör seçici: `ProjectStore.pickFolderDialog` PowerShell + WinForms OpenFileDialog'u klasör modunda gösterir (Explorer tarzı).

## v1.4.2

- **Dosya/klasör seçimi modern native dialog'a geçti.** Rol akışındaki seçimler (seslendirmen orijinal klasörü, mixçi project.json ve mix dosyası) artık HTML `<input type="file">` (eski/çirkin CEF dialog'u) yerine CEP'in native dialog'unu (`window.cep.fs.showOpenDialog`) kullanıyor. Yeni `ProjectStore.buildProjectFromFolder` (klasörü Node ile tarar, süreleri diskten Web Audio ile okur) ve `loadProjectFromPath` (project.json'u Node ile okur) eklendi. Mix dosyası yol-tabanlı seçilir. Gelişmiş/Tam Panel içindeki eski input'lar olduğu gibi kaldı.

## v1.4.1

- **Gelişmiş paneller ve log artık gizli — Konami koduyla açılır.** Her iki rolün "Gelişmiş" bölümü, "Gelişmiş / Tam Panel" ve Log varsayılan olarak gizli (`.secret`). Kullanıcı **↑ ↑ ↓ ↓ ← → ← → B A** dizisini girince `body.konami` sınıfı açılır/kapanır ve bu öğeler görünür olur. Durum, üstteki pill'de ve (açıkken) log'da bildirilir.

## v1.4.0

- **Arayüz sıfırdan yeniden tasarlandı.** Yeni koyu grafit palet (#111211 / #121312 / #131413) + sıcak altın aksan. Rol seçimi büyük kartlarla, her rol akışı numaralı **stepper** (1·2·3) olarak; üstte EQ animasyonlu marka, durum pill'i. Tüm buton ID'leri ve işlevleri korundu - yalnızca görsel katman değişti (HTML + CSS). İlerleme çubuğu, "Tamamlandı" durumu, gelişmiş/tam panel ve log korundu.

## v1.3.1

- **Seslendirmen paketi .sesx ile birlikte zip'lenir.** "Projeyi Kaydet ve Paket Oluştur" artık Audition'dan aktif session'ın `.sesx` yolunu okur (`AU_getSessionPath`), paketi **.sesx'in bulunduğu klasörde** oluşturur, `.sesx` dosyasını paketin içine kopyalar, paketi **PowerShell Compress-Archive ile zip'ler** (`zipFolder`) ve zip'in olduğu **klasörü Gezgin'de açar** (`revealFolder`). Session henüz kaydedilmemişse uyarır ve eski davranışa (proje klasöründe paket, zip yine yapılır) düşer.
- Not: Sadece `.sesx` dosyası kopyalanır; Audition kayıtları session klasöründeki ayrı medya dosyalarına bağlıysa mixçi açarken yeniden bağlama isteyebilir (paketin `Audio/` klasöründe sesler zaten var).

## v1.3.0

- **Buton ilerleme çubuğu + "Tamamlandı" durumu.** Ana adım butonlarına (Orijinalleri Diz, Kayıtları Eşle, Projeyi Kaydet/Paket, Projeyi Yükle, Mix Böl, Export) basınca butonun altında bir ilerleme çubuğu çıkar; FFmpeg adımlarında `[i/N]` satırlarından gerçek yüzde gösterilir. İşlem bitince buton yeşile döner ve "✓ Tamamlandı" yazar; hata olursa kırmızıya döner. Artık log'a inmeden durumu görebilirsin.
- **Export çıkış klasörü seçilebilir.** Mixçi Adım 3'te "Çıkış Klasörü Seç…" ile native klasör seçici (CEP `window.cep.fs.showOpenDialog`) açılır; export edilen dosyalar oraya çıkar (`project.exportOutputDir`). Seçilmezse varsayılan proje `Audio/Exports` kullanılır.

## v1.3.2

- **Mixçi bölme: gerçek sınırlar artık eşleme anından okunur, mixdown sonrası session'dan DEĞİL (kritik düzeltme).** v1.3.1'de mixçi bölme anında track 2'yi yeniden okuyordu; ama Audition mixdown'ı track 2'yi tek bir uzun clip'e indirebildiği için bu okuma yanlış sınır üretip bir repliği (ör. tüm 2 dk'lık mixi tek dosyaya) bozuyordu. Artık kesim sınırları, seslendirmenin "Kayıtları Eşle" adımında (mixdown'DAN ÖNCE) yakalanıp project.json'a yazılan gerçek pozisyonlardan alınır; mixçi tarafında session yeniden okunmaz.
- **Yanlış proje koruması:** Yüklenen projede hiç canlı kayıt sınırı (mixStart/mixEnd) yoksa panel durur ve "paket içindeki doğru project.json'u yükle" uyarısı verir. Bazı repliklerde sınır eksikse uyarıp devam eder.

## v1.3.1

- **Mixçi bölme artık canlı session'dan sürülüyor (kritik düzeltme).** Önceki sürümde, mixçi yanlış/eski bir project.json yüklerse export sırası ve kesim sınırları bozuluyordu (isme göre sıralı export, 1 sn'lik ses 9 sn olup sonraki repliği yutuyordu). Artık "Mix Dosyasını Yükle ve Böl" önce Audition session'ından **track 1'i (ORIGINAL_REF = kimlik, clip adı = orijinal dosya adı)** ve **track 2'yi (gerçek kayıt başlangıç/bitişi = kesim sınırı)** okur; her kaydı altındaki orijinalle eşleştirip o repliğin gerçek `mixStart/mixEnd` değerini yazar (`applyLiveBoundariesFromSession`). Böylece bölme, project.json'un line SIRASINA değil session'daki gerçek konuma dayanır.
- **Yanlış proje tespiti:** Track 1 clip adları yüklenen projeyle hiç eşleşmezse panel durur ve "yanlış project.json yükledin" uyarısı verir; kısmi eşleşmede uyarıp devam eder.
- Yerleştirmede track 1 clip'leri artık orijinal dosya adıyla adlandırılıyor (kimlik session'da taşınsın diye). `AU_readTakeClips` artık track'i isimle de bulabiliyor (`trackName`).

## v1.3.0

- **İki rol akışı + sadeleştirilmiş UI.** Panel açılınca tek bir rol seçimi (Seslendirmen / Mixçi) sunar; her rol yalnızca kendi 3 büyük adımını görür. Eski tüm araçlar bozulmadan "Gelişmiş / Tam Panel" katlanır bölümüne taşındı.
- **Seslendirmen - canlı kayıt eşleme.** Yeni host fonksiyonu `AU_readTakeClips` Audition track 2'deki clip'lerin gerçek pozisyon/süre/adını (startTime sample→saniye) okur. Yeni `ProjectStore.alignTakesFromLiveClips` bunları orijinallerle eşler (pozisyon veya sıra), her replik için `sourceKind: "live_recording"` take üretir ve gerçek timeline pozisyonunu `mixStart/mixEnd` olarak saklar. Manuel düzeltme için `setLiveTakeForLine`.
- **Mixçi - mixdown'ı kesim haritasıyla böl.** `createMixSplitItems` artık canlı take'in gerçek `mixStart/mixEnd` sınırlarını kullanır (eski cursor düzeni yalnızca dosya-bazlı akışa fallback). Tek mixdown dosyası bu sınırlarla repliklere bölünür ve orijinal isimle export edilir.
- README'deki stale "stub" listesi güncellendi (Timeline'a Hazırla artık gerçek).

## v1.3.3

- **Üst üste binme bug'ı çözüldü.** v1.3.2 teşhisi ortaya çıkardı: `clip.startTime` **saniye değil, SAMPLE cinsindendir**. Saniye değeri (örn. 15.482) atanınca host bunu sample sayısı gibi yorumlayıp ~0'a yuvarlıyordu, bu yüzden tüm clip'ler 0 saniyeye yığılıyordu.
- `AU_placeClips` artık `clip.startTime = Math.round(startSeconds × sampleRate)` ile yerleştiriyor. `sampleRate` multitrack belgesinden okunur (yoksa 48000 varsayılır). Doğrulama da sample cinsinden ~1 ms toleransla yapılır ve log hem saniye hem sample değerini gösterir.

## v1.3.2

- v1.3.1/1.3.1 yerleştirmede clip'ler üst üste çıktı: `clip.startTime = X` ataması hata vermeden değeri kabul ediyor (read-back doğru) ama clip taşınmıyor olabilir - `startTime` salt-okunur bir host property'siyse ExtendScript atamayı sessizce gölgeliyor. Audition'da clip muhtemelen **playhead konumuna** ekleniyor.
- `AU_placeClips` teşhis eklendi: multitrack belgesinin tüm property/metod yüzeyini (playhead/pozisyon property'sini bulmak için) ve her clip'te istenen vs. okunan `startTime` değerini loglar; pozisyonu tutmayan clip sayısını raporlar. Bir sonraki sürümde doğru konumlandırma (playhead set veya Time nesnesi) buna göre yazılacak.

## v1.3.1

- `audioTracks.add()` argümansız çağrıldığında başarısız oluyordu (imza `add(layout, trackType)` argüman ister). Körlemesine argüman deneyip çökme riskine girmek yerine `AU_pickTrack`: önce isimle (ORIGINAL_REF/DUB_TAKE) arar, yoksa kullanıcının **boş bir track'ini** yeniden adlandırır, o da yoksa dolu track'i, son çare olarak `add()` dener. Mevcut oturumda anında çalışır, çökmez.
- Atlanan clip'lerin nedeni (kaynak dosya diskte yok) artık panelde uyarı olarak loglanıyor; tüm take'ler atlanırsa DUB_TAKE track'inin neden oluşmadığı netleşir.

## v1.3.1

- **"Timeline'a Hazırla" artık gerçek çalışıyor (stub değil).** Tek clip testi tüm scripting zincirini doğruladı; bu sürüm onu tam yerleştirmeye çevirdi:
  - Açma: `new DocumentOpenParameter(path)` → `app.openDocument(param)` → WaveDocument.
  - Ekleme: `track.audioClips.add(waveDoc)` → AudioClip.
  - Pozisyon: `clip.startTime` (**birim saniye**), `clip.name` ad.
- Yerleşim mantığı tek kaynaktan: `projectStore.buildPlanClips` artık hem timeline planını hem canlı yerleştirme payload'ını besliyor - slot düzeni ve take tam-süre koruması birebir aynı. `buildPlacementPayload` yalnızca kaynağı diskte bulunan clip'leri host'a gönderir.
- Host (`AU_placeClips`) `ORIGINAL_REF` ve `DUB_TAKE` track'lerini isimle bulur/oluşturur (kullanıcının mevcut track'lerini ezmez), clip'leri yerleştirir, take'leri orijinal süreye **kırpmaz** ve sonunda kullanıcıyı multitrack görünümüne geri döndürür (`app.activeDocument = mtDoc`).

## v1.3.10

- İmza döküldü: `openParameter:DocumentOpenParameter` - string/File değil, bir **`DocumentOpenParameter`** nesnesi ister. Ayrıca app yüzeyi çoğunlukla `invokeCommand(command:string)` üzerinden çalışıyor (komut-tabanlı).
- `AU_testInsertOne` artık `$.global.DocumentOpenParameter` constructor'ını/prototip property'lerini döküyor ve 3 kurulum varyantı deniyor: `new DocumentOpenParameter(fsName)`, `(File)`, boş ctor + path/fileName/fullName/filePath property set. Kurulan nesneyle `app.openDocument(openParam)` çağrılıp WaveDocument dönüşü doğrulanıyor.

## v1.3.9

- `app.openDocument` hem String hem File argümanını "Illegal Parameter type" ile reddetti (File.exists=true olmasına rağmen). Doğru argüman tipi bilinmiyordu; v1.3.4/1.3.5 probe'u app metodlarını yalnızca isim olarak dökmüştü, imza olarak değil.
- `AU_testInsertOne` artık `AU_reflectMethodsDetailed(app)` ile **app metod imzalarını** (argüman tipleriyle) döküyor ve açmanın 4 varyantını sırayla deniyor: `openDocument(File)`, `openDocument(fsName)`, `openDocument(fullName)`, `openDocumentFromPath(fsName)`. Hangisi WaveDocument döndürürse doğru yol odur.

## v1.3.8

- Probe sonucu: `app.openDocument(String)` "Illegal Parameter type" atıyor - **File nesnesi** istiyor. v1.3.7'de string verilince WAV açılmıyor, fallback yanlışlıkla multitrack belgesini alıyor, dolayısıyla `audioClips.add(multitrackDoc)` clip döndürmüyordu.
- `AU_testInsertOne` artık `new File(filePath)` ile açıyor; açma başarısızsa yalnızca aktif belge gerçekten değiştiyse (yeni WaveDocument) onu alıyor, multitrack'i kaynak sanmıyor. `audioClips.add` imzası doğrulandı: `add(AudioClip:any, sourceChannelRouting:any)`.

## v1.3.7

- Tek clip testi çökme-dayanıklı hale getirildi. `AU_testInsertOne` artık her adımı (ADIM 1..10) anında `.audub/test-insert-log.txt` dosyasına yazıp kapatır (close = flush). Audition çökerse evalScript callback'i hiç dönmez ve panele log düşmez; bu dosyadaki **son satır** tam olarak hangi adımın (örn. `app.openDocument` veya `audioClips.add`) çökmeye yol açtığını gösterir.
- `host.jsx`: `AU_writeFileFlush(logPath, fullText)` eklendi; `AU_testInsertOne` adımları numaralandırıldı ve `payload.logPath` desteklendi. `app.js`: `logPath = projectRootPath + "/.audub/test-insert-log.txt"` gönderir.

## v1.3.6

- "Tek Clip Test Yerleştir" butonu eklendi (4. bölüm). v1.3.5 probe'u multitrack/clip API'sinin var olduğunu doğruladı; tek bilinmeyen eklenen `AudioClip`'in pozisyon (start) property adı ve birimiydi (saniye mi sample mı). Bu buton, aktif Multitrack session'a ilk repliğin orijinal dosyasını gerçekten ekler, dönen clip'i reflect eder ve `startTime/start/position/startPosition/timelineStartTime` adaylarını 5 sn'ye set edip "sonra" değerini okuyarak gerçek property'yi ve birimini kesinleştirir.
- `host.jsx`: `AU_testInsertOne(payloadJson)` + `AU_findClipPositionProp(clip)` eklendi. `auditionBridge.js`: `testInsertOne` metodu. `app.js`: handler ilk repliğin `originalAbsolutePath` (yoksa `projectRootPath + originalRelativePath`) yolunu gönderir.
- Sonraki adım: bu testten çıkan pozisyon property'siyle gerçek 2-track (ORIGINAL_REF + DUB_TAKE) yerleştirmesi `timeline-plan.json`'a göre kodlanacak; uzun take'ler tam süresiyle korunacak.

## v1.3.4

- Canlı Audition scripting yolu araştırması başladı. `host.jsx`'e `AU_probeApi()` eklendi: `app`, `app.activeDocument`, `tracks`, `track[0]` ve ilgili global yapıcıların (MultitrackDocument, Track, AudioClip vb.) bu Audition sürümünde gerçekten var olup olmadığını reflect ile listeler.
- Panele "Audition API Tara" butonu eklendi (4. bölüm). Çıktı log'a yazılır. Amaç: körlemesine kod yazmadan, multitrack/clip yerleştirme API'sinin 25.6'da olup olmadığını ölçmek. Varsa gerçek "Timeline'a Hazırla" buna göre kodlanacak; yoksa `.sesx` üretimine geçilecek.

## v1.3.3

- Timeline yerleşimi (clip `start` değerleri) artık `line.timelineStart` (orijinal süreye göre hesaplanmış) yerine **sıralı slot** mantığıyla üretiliyor. Her replik için slot genişliği = o repliğin kaynakları arasındaki en uzun süre (orijinal vs seçili take), sonraki replik bu slot + boşluk kadar sonra başlıyor.
- Bu, projenin temel iş kuralını çözüyor: uzun take'ler (örn. orijinal 3 sn iken kayıt 13 sn) tam süresiyle yerleşiyor ve DUB_TAKE track'inde sonraki repliğin üstüne taşıp **çakışmaya** yol açmıyor. ORIGINAL_REF ve DUB_TAKE clip'leri aynı replikte hizalı kalıyor.
- Önceki test çıktısındaki `çakışma 3` (DUB_TAKE / line_0001→line_0002, line_0012→line_0013, line_0013→line_0014) bu sürümde `çakışma 0` oluyor.

## v1.3.2

- Timeline plan doğrulama bug'ı kök nedeninden düzeltildi. Doğrulama artık sağlık kontrolüyle aynı `resolveExistingPath` mantığını kullanıyor (önce absolute, bulamazsa `projectRootPath + relativePath`). Önceki sürümlerde doğrulama yalnızca `sourceAbsolutePath` üzerinde `existsSync` yapıyordu; absolute yol stale/taşınmışsa sağlık kontrolü take'i buluyor ama timeline doğrulama bulamıyordu (örn. `98500340__mixsplit.wav` için "geçerli 15 / eksik kaynak 15").
- Doğrulama raporuna (`timeline-plan-verify-report.csv/json`) `resolvedPath` kolonu eklendi.
- `timeline-preview.html` somutlaştırıldı: renk legend'ı, track içi boşlukların (gap) görsel blokları, çakışma (overlap) işaretleme, eksik kaynak vurgusu ve özet kartında "Eksik kaynak" sayacı.
- Beklenen sonuç: `beklenen 30 / geçerli 30 / eksik kaynak 0 / çakışma 0`.

## v1.3.1

- Timeline Yerleşim Planı bölümü eklendi.
- `.audub/timeline-plan.json` ve `.audub/timeline-plan.csv` üretilir.
- Original + seçili take iki track, sadece original veya sadece take modları eklendi.
- Timeline plan doğrulaması kaynak dosya varlığını ve track içi çakışmaları kontrol eder.
- Bu sürüm Audition timeline'ına doğrudan dokunmaz; güvenli `.sesx`/host otomasyonu için ara yerleşim haritası üretir.
