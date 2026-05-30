# AU Dub Panel Data Model v0.4.0

Ana proje hafızası `.audub/project.json` içinde tutulur.

## Line

Her orijinal ses bir line olarak tutulur.

```json
{
  "lineId": "line_0001",
  "originalName": "44431.wav",
  "originalRelativePath": "Original/44431.wav",
  "originalDuration": 3.2,
  "timelineStart": 0,
  "timelineEnd": 3.2,
  "exportName": "44431.wav",
  "takes": [],
  "selectedTakeId": null
}
```

## Take

Seslendirmen veya miks sonrası ayrılmış ses, ilgili line içinde take olarak saklanır. Take süresi orijinal süreden uzun olabilir ve export sırasında korunur.

```json
{
  "takeId": "take_xxx",
  "lineId": "line_0001",
  "fileName": "44431__44431_take01.wav",
  "fileRelativePath": "Audio/Takes/44431__44431_take01.wav",
  "duration": 24.5,
  "isSelected": true,
  "preserveRecordedTail": true
}
```

## Mix Map

`.audub/mix-map.json`, miks için birleştirme ve daha sonra aynı yerlerden ayırma segmentlerini tutar.

## Export Plan

`.audub/export-plan.json` ve `.audub/export-plan.csv`, her line için export kaynağını ve hedef dosya adını listeler.

Export kuralı:

- Seçili take varsa: take dosyasının gerçek süresi kullanılır.
- Take yoksa: orijinal dosya fallback olarak kullanılır.
- Dosya adı orijinal replik adına göre üretilir.
- Preset uzantısı uygulanır.


## Take doğrulama raporu

`take-verify-report.csv/json` dosyaları her replik için seçili take durumunu saklar. `longerThanOriginal=true` bir hata değildir; seslendirmenin orijinalden uzun kayıt aldığını ve export sırasında bu sürenin korunacağını gösterir.
