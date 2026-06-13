/*
  AU Dub Panel - Adobe Audition ExtendScript bridge v1.1.4

  Bu dosya eski ExtendScript motorlarıyla uyumlu olacak şekilde yazıldı.
  Özellikle JSON.parse / JSON.stringify her Audition kurulumunda güvenilir olmayabilir.
  v1.1.4: AU_probeApi() eklendi - canlı multitrack/clip scripting API'sinin bu Audition
  sürümünde gerçekten var olup olmadığını keşfetmek için.
  v1.1.5: Probe derinleştirildi - doc.audioTracks, track[0], clip koleksiyonu ve metod
  argümanları (addAudioClip imzası) dökülüyor. Audition 25.6.4 MultitrackDocument/audioTracks
  API'si doğrulandı; clip ekleme metodunun imzası bu probe ile netleşecek.
*/

function AU_hasNativeJSON() {
  return (typeof JSON !== "undefined" && JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
}

function AU_parseJson(jsonText) {
  try {
    if (AU_hasNativeJSON()) {
      return JSON.parse(jsonText);
    }
    // CEP panelinden gelen payload bizim ürettiğimiz JSON olduğu için fallback olarak eval kullanıyoruz.
    return eval("(" + jsonText + ")");
  } catch (e) {
    return null;
  }
}

function AU_escapeJsonString(value) {
  var s = String(value);
  s = s.replace(/\\/g, "\\\\");
  s = s.replace(/\"/g, "\\\"");
  s = s.replace(/\r/g, "\\r");
  s = s.replace(/\n/g, "\\n");
  s = s.replace(/\t/g, "\\t");
  return s;
}

function AU_result(ok, message, extraJson) {
  var out = "{\"ok\":" + (ok ? "true" : "false") + ",\"message\":\"" + AU_escapeJsonString(message) + "\"";
  if (extraJson) {
    out += ",\"extra\":" + extraJson;
  }
  out += "}";
  return out;
}

function AU_projectLineCount(project) {
  try {
    if (project && project.lines && typeof project.lines.length !== "undefined") return project.lines.length;
  } catch (e) {}
  return 0;
}

function AU_projectPresetName(project) {
  try {
    if (project && project.exportPreset && project.exportPreset.name) return project.exportPreset.name;
  } catch (e) {}
  return "preset yok";
}

function AU_projectPresetSummary(project) {
  try {
    var p = project.exportPreset || {};
    var out = AU_projectPresetName(project);
    if (p.format) out += " | " + String(p.format).toUpperCase();
    if (p.sampleRate) out += " | " + p.sampleRate + "Hz";
    if (p.bitDepth) out += " | " + p.bitDepth + "-bit" + (p.bitDepthMode === "float" ? " float" : "");
    if (p.bitRateKbps) out += " | " + p.bitRateKbps + "kbps";
    if (typeof p.quality !== "undefined") out += " | Q" + p.quality;
    if (p.channels) out += " | " + p.channels;
    return out;
  } catch (e) {
    return AU_projectPresetName(project);
  }
}

function AU_hostPing() {
  return AU_result(true, "host.jsx yüklendi ve çalışıyor.");
}

/* --- Canlı scripting keşfi (API probe) --- */

function AU_typeName(v) {
  try {
    if (v === null) return "null";
    var t = typeof v;
    if (t !== "object") return t;
    try { if (v.reflect && v.reflect.name) return "object:" + v.reflect.name; } catch (e1) {}
    try { if (v.constructor && v.constructor.name) return "object:" + v.constructor.name; } catch (e2) {}
    return "object";
  } catch (e) { return "?"; }
}

function AU_reflectList(obj, which) {
  var out = [];
  try {
    var list = which === "methods" ? obj.reflect.methods : obj.reflect.properties;
    if (list && typeof list.length !== "undefined") {
      for (var i = 0; i < list.length; i++) {
        var nm = String(list[i].name);
        if (nm.charAt(0) === "_") continue;
        out.push(nm);
      }
    }
  } catch (e) {}
  if (!out.length) {
    try {
      for (var k in obj) { out.push(String(k)); }
    } catch (e2) {}
  }
  return out.length ? out.join(", ") : "(yok / reflect desteklenmiyor)";
}

function AU_reflectMethodsDetailed(obj) {
  var out = [];
  try {
    var m = obj.reflect.methods;
    for (var i = 0; i < m.length; i++) {
      var info = m[i];
      var nm = String(info.name);
      if (nm.charAt(0) === "_") continue;
      var argStr = "";
      try {
        var args = info.arguments;
        if (args && typeof args.length !== "undefined") {
          var an = [];
          for (var j = 0; j < args.length; j++) {
            var aname = "";
            try { aname = String(args[j].name); } catch (ea1) {}
            var atype = "";
            try { atype = String(args[j].dataType || args[j].type || ""); } catch (ea2) {}
            an.push(aname + (atype ? ":" + atype : ""));
          }
          argStr = an.join(", ");
        }
      } catch (ea) {}
      out.push(nm + "(" + argStr + ")");
    }
  } catch (e) { return AU_reflectList(obj, "methods"); }
  return out.length ? out.join("  |  ") : AU_reflectList(obj, "methods");
}

function AU_dumpInto(lines, label, obj) {
  lines.push("-- " + label + " (" + AU_typeName(obj) + ") --");
  lines.push("  METHODS: " + AU_reflectMethodsDetailed(obj));
  lines.push("  PROPS: " + AU_reflectList(obj, "props"));
}

function AU_probeApi() {
  var lines = [];
  function add(s) { lines.push(s); }

  add("=== AU AUDITION API PROBE ===");
  try { add("engine: " + ($.version || "?") + " / build: " + ($.build || "?")); } catch (e) {}

  // Application
  try { add("typeof app: " + (typeof app)); } catch (e) { add("typeof app: ERR"); }
  try { add("app.appName: " + app.appName); } catch (e) {}
  try { add("app.version: " + app.version); } catch (e) {}
  try { add("app.buildNumber: " + app.buildNumber); } catch (e) {}
  try { add("app METHODS: " + AU_reflectList(app, "methods")); } catch (e) { add("app METHODS: ERR"); }
  try { add("app PROPS: " + AU_reflectList(app, "props")); } catch (e) {}

  // Belgeler
  try { add("app.documents.length: " + app.documents.length); } catch (e) { add("app.documents: ERR"); }

  // Aktif belge (clip/track API'si buradan çıkar)
  try {
    var doc = app.activeDocument;
    AU_dumpInto(lines, "activeDocument", doc);

    // audioTracks koleksiyonu - track ekleme metodu burada
    try {
      var ats = doc.audioTracks;
      add("doc.audioTracks len: " + (ats ? ats.length : "?"));
      AU_dumpInto(lines, "doc.audioTracks", ats);
      if (ats && ats.length) {
        var tr = ats[0];
        AU_dumpInto(lines, "audioTracks[0]", tr);
        // Clip koleksiyonu aday isimleri
        var clipNames = ["audioClips", "clips", "audioClipCollection"];
        var found = false;
        for (var ci = 0; ci < clipNames.length; ci++) {
          try {
            var coll = tr[clipNames[ci]];
            if (coll) {
              add("audioTracks[0]." + clipNames[ci] + " bulundu (len: " + (typeof coll.length !== "undefined" ? coll.length : "?") + ")");
              AU_dumpInto(lines, "audioTracks[0]." + clipNames[ci], coll);
              found = true;
              break;
            }
          } catch (ecc) {}
        }
        if (!found) add("Clip koleksiyonu bilinen isimde yok - audioTracks[0] PROPS'a bakın.");
      } else {
        add("audioTracks boş - yukarıdaki doc.audioTracks METHODS içinde track ekleme metodunu arayın (addAudioTrack/add gibi).");
      }
    } catch (eat) { add("doc.audioTracks: okunamadı (" + eat + ")"); }

    // Seçili clip API'si
    try { AU_dumpInto(lines, "doc.audioClipSelection", doc.audioClipSelection); } catch (es) { add("doc.audioClipSelection: okunamadı"); }
  } catch (e) { add("activeDocument: yok / açık değil (" + e + ")"); }

  // Global yapıcı prototipleri (0 track olsa bile API yüzeyini gösterir)
  try { if (typeof $.global.MultitrackDocument === "function") AU_dumpInto(lines, "MultitrackDocument.prototype", $.global.MultitrackDocument.prototype); } catch (ep1) {}
  try { if (typeof $.global.AudioTrack === "function") AU_dumpInto(lines, "AudioTrack.prototype", $.global.AudioTrack.prototype); } catch (ep2) {}

  // İlgili global yapıcılar / DOM
  var names = ["Audition","Application","Document","WaveDocument","MultitrackDocument","Multitrack",
    "Session","Track","AudioTrack","TrackCollection","AudioClip","Clip","ClipCollection",
    "Marker","MarkerCollection","Mixer","Transport","Time","qe","CEPEngine","ScriptUI"];
  for (var i = 0; i < names.length; i++) {
    var n = names[i];
    var present = "no";
    try { if (typeof $.global[n] !== "undefined") present = (typeof $.global[n]); } catch (e) {}
    add("global " + n + ": " + present);
  }

  return AU_result(true, lines.join("\n"));
}

/* --- Tek clip yerleştirme testi (pozisyon property keşfi) --- */

function AU_findClipPositionProp(clip) {
  // Eklenen clip'in pozisyonunu temsil eden property adını bul.
  var candidates = ["startTime", "start", "position", "startPosition", "timelineStartTime", "absoluteStartTime"];
  var report = [];
  for (var i = 0; i < candidates.length; i++) {
    var name = candidates[i];
    var present = false;
    var value = "";
    try {
      var v = clip[name];
      if (typeof v !== "undefined") {
        present = true;
        // Time nesnesi mi yoksa düz sayı mı?
        try {
          if (v !== null && typeof v === "object") {
            var parts = [];
            try { if (typeof v.seconds !== "undefined") parts.push("seconds=" + v.seconds); } catch (e1) {}
            try { if (typeof v.samples !== "undefined") parts.push("samples=" + v.samples); } catch (e2) {}
            try { if (typeof v.ticks !== "undefined") parts.push("ticks=" + v.ticks); } catch (e3) {}
            value = "object{" + parts.join(",") + "}";
          } else {
            value = String(v);
          }
        } catch (ev) { value = "?"; }
      }
    } catch (e) {}
    if (present) report.push(name + "=" + value);
  }
  return report.length ? report.join("  |  ") : "(bilinen pozisyon property'si yok)";
}

function AU_writeFileFlush(logPath, fullText) {
  // Her çağrıda dosyayı baştan yazıp kapatır (close = flush). Audition çökse bile
  // diskteki son içerik o ana kadarki tüm adımları gösterir.
  if (!logPath) return;
  try {
    var f = new File(logPath);
    var parent = f.parent;
    if (parent && !parent.exists) { try { parent.create(); } catch (ep) {} }
    f.encoding = "UTF-8";
    if (f.open("w")) {
      f.write(fullText);
      f.close();
    }
  } catch (e) {}
}

function AU_testInsertOne(payloadJson) {
  var lines = [];
  var logPath = "";
  function flush() { AU_writeFileFlush(logPath, lines.join("\r\n")); }
  function add(s) { lines.push(s); flush(); }
  try {
    var payload = AU_parseJson(payloadJson) || {};
    var filePath = payload.filePath || "";
    var trackIndex = (typeof payload.trackIndex === "number") ? payload.trackIndex : 0;
    var testStartSeconds = (typeof payload.testStartSeconds === "number") ? payload.testStartSeconds : 5;
    logPath = payload.logPath || "";

    if (!filePath) return AU_result(false, "filePath verilmedi. payload.filePath bekleniyor.");

    add("=== AU TEST INSERT ONE ===");
    add("logPath: " + (logPath || "(yok)"));
    add("filePath: " + filePath);
    add("trackIndex: " + trackIndex + " / testStartSeconds: " + testStartSeconds);

    // 1. Multitrack belgesini AÇMADAN ÖNCE yakala (openDocument aktif belgeyi değiştirebilir).
    add("ADIM 1: app.activeDocument okunuyor...");
    var mtDoc = app.activeDocument;
    if (!mtDoc) return AU_result(false, "Aktif belge yok. Önce bir Multitrack session açın.");
    add("ADIM 1 OK: activeDocument tipi (öncesi): " + AU_typeName(mtDoc));

    add("ADIM 2: doc.audioTracks okunuyor...");
    var ats = null;
    try { ats = mtDoc.audioTracks; } catch (eat) {}
    if (!ats) return AU_result(false, "Aktif belge multitrack değil (audioTracks yok). Bir Multitrack session açın.");
    add("ADIM 2 OK: audioTracks.length (öncesi): " + ats.length);

    // 2. Hedef track yoksa ekle.
    while (ats.length <= trackIndex) {
      add("ADIM 3: audioTracks.add() deneniyor (mevcut len: " + ats.length + ")...");
      try {
        ats.add();
        add("ADIM 3 OK: yeni audioTrack eklendi. yeni len: " + ats.length);
      } catch (eadd) {
        return AU_result(false, "Track eklenemedi: " + eadd + " (audioTracks.add imzasını kontrol edin)");
      }
    }
    add("ADIM 4: track[" + trackIndex + "] alınıyor...");
    var track = ats[trackIndex];
    add("ADIM 4 OK: hedef track tipi: " + AU_typeName(track));
    add("ADIM 5: track.name set ediliyor...");
    try { track.name = "AUDUB_TEST"; add("ADIM 5 OK: track.name = " + track.name); } catch (enm) { add("ADIM 5 ATLA: track.name set edilemedi: " + enm); }

    // 3. Kaynak ses dosyasını aç. Hem String hem File "Illegal Parameter type"
    //    atıyor - openDocument'ın gerçek imzasını/import alternatiflerini dökelim.
    // openDocument(openParameter:DocumentOpenParameter) - string/File değil,
    // bir DocumentOpenParameter nesnesi ister. Önce onu keşfedip kuruyoruz.
    add("ADIM 6: DocumentOpenParameter keşfi...");
    var mtBefore = mtDoc; // önceki aktif multitrack
    var srcDoc = null;
    var srcFile = new File(filePath);
    add("  File.exists: " + srcFile.exists + " / fsName: " + srcFile.fsName);

    var DOP = null;
    try { DOP = $.global.DocumentOpenParameter; } catch (eg) {}
    add("  typeof DocumentOpenParameter: " + (typeof DOP));
    if (typeof DOP === "function") {
      try { add("  DOP.prototype METHODS: " + AU_reflectMethodsDetailed(DOP.prototype)); } catch (ep1) {}
      try { add("  DOP.prototype PROPS: " + AU_reflectList(DOP.prototype, "props")); } catch (ep2) {}
    }

    add("ADIM 6b: DocumentOpenParameter kurma denemeleri...");
    var openParam = null;
    // (a) ctor(fsName)
    try { openParam = new DOP(srcFile.fsName); add("  (a) new DocumentOpenParameter(fsName) OK: " + AU_typeName(openParam)); }
    catch (ea) { add("  (a) ctor(fsName) HATA: " + ea); }
    // (b) ctor(File)
    if (!openParam) { try { openParam = new DOP(srcFile); add("  (b) ctor(File) OK"); } catch (eb) { add("  (b) ctor(File) HATA: " + eb); } }
    // (c) boş ctor + property set
    if (!openParam) { try { openParam = new DOP(); add("  (c) ctor() OK"); } catch (ec) { add("  (c) ctor() HATA: " + ec); } }

    if (openParam) {
      add("  openParam PROPS: " + AU_reflectList(openParam, "props"));
      // İçindeki path benzeri property'lerin mevcut değerlerini dök.
      var probeProps = ["path", "fileName", "fullName", "filePath", "file", "url", "name"];
      for (var qp = 0; qp < probeProps.length; qp++) {
        try { var pv = openParam[probeProps[qp]]; if (typeof pv !== "undefined") add("    openParam." + probeProps[qp] + " = " + pv); } catch (eqp) {}
      }
      // Boş ctor ihtimaline karşı path benzeri property'leri set etmeyi dene.
      var setProps = ["path", "fileName", "fullName", "filePath"];
      for (var sp = 0; sp < setProps.length; sp++) {
        try {
          var cur = openParam[setProps[sp]];
          if (typeof cur !== "undefined") {
            openParam[setProps[sp]] = srcFile.fsName;
            add("    set openParam." + setProps[sp] + " -> " + openParam[setProps[sp]]);
          }
        } catch (esp) {}
      }
    }

    add("ADIM 6c: app.openDocument(openParam) çağrılıyor...");
    if (openParam) {
      try { srcDoc = app.openDocument(openParam); add("  openDocument(openParam) döndü: " + AU_typeName(srcDoc)); }
      catch (eo) { add("  openDocument(openParam) HATA: " + eo); }
    } else {
      add("  openParam kurulamadı - yukarıdaki ctor hatalarına bakın.");
    }

    // Bazı sürümlerde openDocument null döner ama belgeyi açar; aktif belge
    // GERÇEKTEN yeni açılan wave ise onu al - multitrack'i yanlışlıkla alma.
    if (!srcDoc) {
      try {
        var act = app.activeDocument;
        if (act && act !== mtBefore) {
          srcDoc = act;
          add("  fallback: aktif belge değişmiş, yeni belge alındı: " + AU_typeName(srcDoc));
        } else {
          add("  fallback: aktif belge hâlâ multitrack, WAV açılamadı.");
        }
      } catch (e) {}
    }

    if (!srcDoc) {
      return AU_result(false, lines.join("\n") + "\nSONUÇ: kaynak WAV açılamadı (openDocument başarısız).");
    }
    add("ADIM 6 OK: kaynak belge tipi: " + AU_typeName(srcDoc));
    try { add("  kaynak belge displayName: " + srcDoc.displayName); } catch (e) {}

    add("ADIM 7: track.audioClips reflect ediliyor...");
    try {
      var clips = track.audioClips;
      add("ADIM 7 OK: audioClips.add imzası: " + AU_reflectMethodsDetailed(clips));
    } catch (erc) { add("ADIM 7 HATA: audioClips reflect edilemedi: " + erc); }

    // 4. Clip ekle.
    add("ADIM 8: track.audioClips.add(srcDoc) çağrılıyor... (çökme buradaysa son satır budur)");
    var clip = null;
    var addErr = "";
    try {
      clip = track.audioClips.add(srcDoc);
    } catch (e1) {
      addErr = String(e1);
    }
    add("ADIM 8 BİTTİ: add çağrısı döndü. clip var mı: " + (clip ? "evet" : "hayır") + (addErr ? " / hata: " + addErr : ""));

    if (!clip) {
      add("audioClips.add(srcDoc) clip döndürmedi. Koleksiyonun son elemanı deneniyor...");
      try {
        var cl = track.audioClips;
        if (cl && cl.length) { clip = cl[cl.length - 1]; add("Koleksiyonun son clip'i alındı (len: " + cl.length + ")."); }
      } catch (e2) {}
    }

    if (!clip) {
      return AU_result(false, lines.join("\n") + "\nSONUÇ: clip eklenemedi.");
    }

    add("ADIM 9: eklenen clip reflect ediliyor...");
    add("  tip: " + AU_typeName(clip));
    add("  METHODS: " + AU_reflectMethodsDetailed(clip));
    add("  PROPS: " + AU_reflectList(clip, "props"));
    add("  pozisyon property taraması (varsayılan eklendikten sonra): " + AU_findClipPositionProp(clip));

    // 5. Pozisyon property'lerini test değerine set etmeyi dene, hangisi tutuyor öğren.
    add("ADIM 10: pozisyon set denemeleri (hedef: " + testStartSeconds + " sn)...");
    var posCandidates = ["startTime", "start", "position", "startPosition", "timelineStartTime"];
    for (var pi = 0; pi < posCandidates.length; pi++) {
      var pname = posCandidates[pi];
      var before = "";
      var after = "";
      var setOk = false;
      try {
        before = String(clip[pname]);
      } catch (eb) { before = "(okunamadı)"; continue; }
      try {
        clip[pname] = testStartSeconds;
        setOk = true;
      } catch (es) {}
      try { after = String(clip[pname]); } catch (ea) { after = "(okunamadı)"; }
      add("  " + pname + ": önce=" + before + " set=" + (setOk ? "ok" : "HATA") + " sonra=" + after);
    }

    add("SONUÇ: clip eklendi. Yukarıdaki pozisyon set denemelerinden 'sonra' değeri değişeni gerçek property'dir.");
    return AU_result(true, lines.join("\n"));
  } catch (e) {
    add("YAKALANAN HATA: " + e.toString());
    return AU_result(false, "AU_testInsertOne hata: " + e.toString() + "\n" + lines.join("\n"));
  }
}

/* --- Gerçek timeline yerleştirme (canlı Audition multitrack) --- */

// Bir WAV'ı WaveDocument olarak açar. openDocument(DocumentOpenParameter) imzasını kullanır.
function AU_openSource(filePath) {
  var p = null;
  try { p = new DocumentOpenParameter(filePath); } catch (e1) { return null; }
  var doc = null;
  try { doc = app.openDocument(p); } catch (e2) { return null; }
  return doc;
}

function AU_trackHasClips(tr) {
  try { return tr.audioClips && tr.audioClips.length > 0; } catch (e) { return false; }
}

// Hedef track'i seçer. audioTracks.add(layout, trackType) imzası argüman istediği
// ve boş çağrı çöktüğü için önce MEVCUT track'leri yeniden kullanır:
//   1) zaten bu isimde track varsa onu,
//   2) yoksa kullanılmamış BOŞ bir track'i alıp adlandırır,
//   3) o da yoksa kullanılmamış herhangi bir track'i,
//   4) hiç kalmadıysa son çare add() dener.
// usedIdx: bu çağrıda atanmış track indekslerini tutan nesne.
function AU_pickTrack(ats, name, usedIdx, logFn) {
  var i;
  // 1) isimle
  for (i = 0; i < ats.length; i++) {
    try { if (String(ats[i].name) === name) { usedIdx[i] = true; return ats[i]; } } catch (e) {}
  }
  // 2) kullanılmamış boş track
  for (i = 0; i < ats.length; i++) {
    if (usedIdx[i]) continue;
    if (!AU_trackHasClips(ats[i])) {
      usedIdx[i] = true;
      try { ats[i].name = name; } catch (e) {}
      logFn && logFn("  '" + name + "' için boş track[" + i + "] yeniden adlandırıldı.");
      return ats[i];
    }
  }
  // 3) kullanılmamış herhangi bir track
  for (i = 0; i < ats.length; i++) {
    if (usedIdx[i]) continue;
    usedIdx[i] = true;
    try { ats[i].name = name; } catch (e) {}
    logFn && logFn("  '" + name + "' için (dolu) track[" + i + "] kullanıldı.");
    return ats[i];
  }
  // 4) son çare: yeni track ekle
  var before = ats.length;
  try { ats.add(); } catch (eAdd) { logFn && logFn("  add() hata: " + eAdd); return null; }
  if (ats.length <= before) return null;
  var tr = ats[ats.length - 1];
  usedIdx[ats.length - 1] = true;
  try { tr.name = name; } catch (eNm) {}
  return tr;
}

function AU_placeClips(payloadJson) {
  var lines = [];
  function add(s) { lines.push(s); }
  try {
    var payload = AU_parseJson(payloadJson);
    if (!payload) return AU_result(false, "Yerleştirme payload'ı okunamadı.");
    var clips = payload.clips || [];
    if (!clips.length) return AU_result(false, "Yerleştirilecek clip yok (kaynağı diskte bulunan clip 0). Önce take'leri bağlayıp Timeline Plan üretin.");

    add("=== TIMELINE YERLEŞTİRME ===");
    add("Proje: " + (payload.projectName || "?") + " / mod: " + (payload.sourceMode || "?"));
    add("Yerleştirilecek: " + clips.length + " clip / atlanan (kaynak yok): " + (payload.skippedClips || 0));

    // 1. Aktif multitrack belgesi.
    var mtDoc = app.activeDocument;
    if (!mtDoc) return AU_result(false, "Aktif belge yok. Önce bir Multitrack session açın.");
    var ats = null;
    try { ats = mtDoc.audioTracks; } catch (e) {}
    if (!ats) return AU_result(false, "Aktif belge multitrack değil. Bir Multitrack session açın (Wave değil).");
    add("Multitrack bulundu. Mevcut track sayısı: " + ats.length);

    // clip.startTime SANİYE değil SAMPLE cinsindendir. Saniye->sample için sampleRate gerekir.
    var sampleRate = 48000;
    try { if (mtDoc.sampleRate) sampleRate = Number(mtDoc.sampleRate); } catch (esr) {}
    if (!(sampleRate > 0)) sampleRate = 48000;
    add("Session sampleRate: " + sampleRate + " (startTime = saniye × sampleRate)");

    // 2. Hedef track'leri hazırla (ORIGINAL_REF, DUB_TAKE).
    var trackOrder = payload.trackOrder || [];
    var trackMap = {};
    var usedIdx = {};
    for (var ti = 0; ti < trackOrder.length; ti++) {
      var tname = trackOrder[ti];
      var tr = AU_pickTrack(ats, tname, usedIdx, add);
      if (!tr) return AU_result(false, "Track hazırlanamadı: " + tname + " (boş track yok ve audioTracks.add başarısız).");
      trackMap[tname] = tr;
      add("Track hazır: " + tname);
    }

    // 3. Clip'leri yerleştir.
    var placed = 0;
    var failed = 0;
    var stuckFail = 0;
    for (var ci = 0; ci < clips.length; ci++) {
      var c = clips[ci];
      var track = trackMap[c.trackName];
      if (!track) { add("ATLA: track yok -> " + c.trackName + " (" + c.lineId + ")"); failed++; continue; }

      var srcDoc = AU_openSource(c.sourcePath);
      if (!srcDoc) { add("HATA: kaynak açılamadı -> " + c.lineId + " : " + c.sourcePath); failed++; continue; }

      var clip = null;
      try { clip = track.audioClips.add(srcDoc); } catch (eAdd) { add("HATA: clip eklenemedi -> " + c.lineId + " : " + eAdd); failed++; continue; }
      if (!clip) {
        try { var coll = track.audioClips; if (coll && coll.length) clip = coll[coll.length - 1]; } catch (e2) {}
      }
      if (!clip) { add("HATA: clip referansı alınamadı -> " + c.lineId); failed++; continue; }

      // Pozisyon: clip.startTime SANİYE değil SAMPLE cinsindendir. saniye × sampleRate ile çevrilir.
      // Take tam süresiyle yerleşir; kırpma yok.
      if (ci === 0) add("  clip.startTime tipi: " + AU_typeName(clip.startTime));
      var wantSamples = Math.round(Number(c.startSeconds) * sampleRate);
      var beforePos = null, afterPos = null;
      try { beforePos = clip.startTime; } catch (e) {}
      try { clip.startTime = wantSamples; } catch (ePos) { add("UYARI: startTime set edilemedi -> " + c.lineId + " : " + ePos); }
      try { afterPos = clip.startTime; } catch (e) {}
      // sample toleransı: ~1 ms
      var tolSamples = Math.max(1, Math.round(sampleRate * 0.001));
      if (Math.abs(Number(afterPos) - wantSamples) > tolSamples) stuckFail++;
      if (ci < 4) add("  poz kontrol [" + c.lineId + "] istenen=" + c.startSeconds + "s (" + wantSamples + " sample) önce=" + beforePos + " sonra=" + afterPos);
      try { if (c.clipName) clip.name = c.clipName; } catch (eName) {}
      placed++;
    }
    add("Pozisyon set başarısız (istenen≠okunan) clip sayısı: " + stuckFail + " / " + placed);

    // 4. Kullanıcıyı tekrar multitrack görünümüne döndür (openDocument Wave editörüne attı).
    var refocused = false;
    try { app.activeDocument = mtDoc; refocused = true; } catch (eAct) {}
    add("Multitrack'e geri odak: " + (refocused ? "ok" : "denenemedi"));

    add("SONUÇ: yerleştirilen " + placed + " / başarısız " + failed + " / track " + trackOrder.length);
    return AU_result(placed > 0, lines.join("\n"));
  } catch (e) {
    add("YAKALANAN HATA: " + e.toString());
    return AU_result(false, "AU_placeClips hata: " + e.toString() + "\n" + lines.join("\n"));
  }
}

/* --- Canlı kayıt okuma (eşleme için) ---
   Belirtilen track'in (genelde track 2 = index 1) tüm clip'lerini okur.
   clip.startTime SAMPLE cinsindendir; saniyeye çevirip döndürür. Panel bu clip'leri
   track 1'deki orijinallerin pozisyonlarına göre repliklere eşler. */
function AU_readTakeClips(payloadJson) {
  var lines = [];
  function add(s) { lines.push(s); }
  try {
    var payload = AU_parseJson(payloadJson) || {};
    var trackIndex = (typeof payload.trackIndex === "number") ? payload.trackIndex : 1;
    var wantName = (typeof payload.trackName === "string" && payload.trackName) ? payload.trackName : null;

    var mtDoc = app.activeDocument;
    if (!mtDoc) return AU_result(false, "Aktif belge yok. Önce kayıt yaptığın Multitrack session'ı aç.");
    var ats = null;
    try { ats = mtDoc.audioTracks; } catch (e) {}
    if (!ats) return AU_result(false, "Aktif belge multitrack değil. Bir Multitrack session aç (Wave değil).");

    var sampleRate = 48000;
    try { if (mtDoc.sampleRate) sampleRate = Number(mtDoc.sampleRate); } catch (esr) {}
    if (!(sampleRate > 0)) sampleRate = 48000;

    // Track'i önce isimle (varsa) sonra indexle bul.
    var track = null;
    var resolvedIndex = trackIndex;
    if (wantName) {
      for (var ti = 0; ti < ats.length; ti++) {
        try { if (String(ats[ti].name) === wantName) { track = ats[ti]; resolvedIndex = ti; break; } } catch (e) {}
      }
    }
    if (!track) {
      if (ats.length <= trackIndex) return AU_result(false, "Track " + (trackIndex + 1) + " yok" + (wantName ? " ve '" + wantName + "' isimli track bulunamadı" : "") + " (mevcut track: " + ats.length + ").");
      track = ats[trackIndex];
      resolvedIndex = trackIndex;
    }
    var trackName = "";
    try { trackName = String(track.name); } catch (e) {}

    var coll = null;
    try { coll = track.audioClips; } catch (e) {}
    if (!coll) return AU_result(false, "Track " + (resolvedIndex + 1) + " clip koleksiyonu okunamadı.");

    var n = coll.length;
    add("Track " + (resolvedIndex + 1) + " ('" + trackName + "') clip sayısı: " + n + " / sampleRate: " + sampleRate);

    // Clip'in diskteki kaynak dosyasını bulmayı dene (API sürüme göre değişir; hepsi try/catch).
    function AU_clipFilePath(clip) {
      function looksPath(v) {
        var s = String(v || "");
        return s && s !== "undefined" && s !== "null" && (s.indexOf("\\") >= 0 || s.indexOf("/") >= 0);
      }
      var p = "";
      try { if (!p && clip.file) { var f = clip.file; var v = (f && f.fsName) ? f.fsName : f; if (looksPath(v)) p = String(v); } } catch (ep1) {}
      try { if (!p && clip.link && clip.link.path && looksPath(clip.link.path)) p = String(clip.link.path); } catch (ep2) {}
      try { if (!p && clip.sourceFile) { var sf = clip.sourceFile; var sv = (sf && sf.fsName) ? sf.fsName : sf; if (looksPath(sv)) p = String(sv); } } catch (ep3) {}
      try { if (!p && clip.path && looksPath(clip.path)) p = String(clip.path); } catch (ep4) {}
      try { if (!p && clip.audioDocument && clip.audioDocument.path && looksPath(clip.audioDocument.path)) p = String(clip.audioDocument.path); } catch (ep5) {}
      try { if (!p && clip.waveDocument && clip.waveDocument.path && looksPath(clip.waveDocument.path)) p = String(clip.waveDocument.path); } catch (ep6) {}
      try { if (!p && clip.document && clip.document.path && looksPath(clip.document.path)) p = String(clip.document.path); } catch (ep7) {}
      return p;
    }

    var items = [];
    for (var i = 0; i < n; i++) {
      var clip = coll[i];
      var startSamples = 0, durSamples = 0, name = "", filePath = "";
      try { startSamples = Number(clip.startTime); } catch (e1) {}
      try { durSamples = Number(clip.duration); } catch (e2) {}
      try { name = String(clip.name); } catch (e3) {}
      try { filePath = AU_clipFilePath(clip); } catch (e4) {}
      if (!(startSamples >= 0)) startSamples = 0;
      if (!(durSamples >= 0)) durSamples = 0;
      var startSeconds = startSamples / sampleRate;
      var durSeconds = durSamples / sampleRate;
      // saniyeyi 3 hane yuvarla (ES3: toFixed var)
      var ss = Number(startSeconds.toFixed(3));
      var ds = Number(durSeconds.toFixed(3));
      items.push("{\"name\":\"" + AU_escapeJsonString(name) + "\",\"startSeconds\":" + ss + ",\"durationSeconds\":" + ds + ",\"startSamples\":" + startSamples + ",\"durationSamples\":" + durSamples + ",\"filePath\":\"" + AU_escapeJsonString(filePath) + "\"}");
      if (i < 6) add("  clip[" + i + "] '" + name + "' start=" + ss + "s dur=" + ds + "s" + (filePath ? " dosya=OK" : ""));
    }

    var extra = "{\"trackIndex\":" + resolvedIndex + ",\"trackName\":\"" + AU_escapeJsonString(trackName) + "\",\"sampleRate\":" + sampleRate + ",\"clipCount\":" + n + ",\"clips\":[" + items.join(",") + "]}";
    return AU_result(true, lines.join("\n"), extra);
  } catch (e) {
    return AU_result(false, "AU_readTakeClips hata: " + e.toString());
  }
}

/* Aktif session'ı kaydeder (Ctrl+S). dirty bayrağıyla başarı doğrulanır.
   Daha önce hiç kaydedilmemişse Audition Save As diyalogu açar (kullanıcı yer seçer). */
function AU_saveSession() {
  try {
    var doc = app.activeDocument;
    if (!doc) return AU_result(false, "Aktif belge yok. Önce session'ı aç.");

    function dirtyNow() { try { return !!doc.dirty; } catch (e) { return false; } }
    var wasDirty = dirtyNow();
    var attempts = [];
    var waitMs = 0;

    function waitForClean(maxMs) {
      var started = (new Date()).getTime();
      while (dirtyNow() && ((new Date()).getTime() - started) < maxMs) {
        try { $.sleep(250); } catch (eSleep) {}
      }
      return (new Date()).getTime() - started;
    }

    // 1) Komut: Save (Ctrl+S karşılığı) — sürüme göre ad değişebilir, birkaç aday dene.
    var saveCmds = ["Save", "File.Save", "SaveSession", "Save Session", "$Save"];
    for (var sc = 0; sc < saveCmds.length && dirtyNow(); sc++) {
      try {
        var en = true;
        try { if (typeof app.isCommandEnabled === "function") en = app.isCommandEnabled(saveCmds[sc]); } catch (eEn) {}
        if (en) {
          app.invokeCommand(saveCmds[sc]);
          attempts.push("invokeCommand(" + saveCmds[sc] + ")");
          waitMs += waitForClean(2000);
        }
      } catch (e1) {}
    }

    // 2) Hâlâ dirty ise: saveDocument(MultitrackSaveParameter)
    if (dirtyNow()) {
      try {
        var P = $.global.MultitrackSaveParameter;
        if (typeof P === "function") {
          doc.saveDocument(new P());
          attempts.push("saveDocument(param)");
          waitMs += waitForClean(2000);
        }
      } catch (e2) {}
    }
    // 3) Hâlâ dirty ise: saveDocument() argümansız
    if (dirtyNow()) {
      try {
        doc.saveDocument();
        attempts.push("saveDocument()");
        waitMs += waitForClean(2000);
      } catch (e3) {}
    }

    waitMs += waitForClean(30000);
    if (!dirtyNow()) {
      try { $.sleep(750); waitMs += 750; } catch (eAfter) {}
    }

    var stillDirty = dirtyNow();
    var saved = !stillDirty;
    var p = "";
    try { p = String(doc.path); } catch (e) {}
    if (p === "undefined" || p === "null") p = "";

    var extra = "{\"path\":\"" + AU_escapeJsonString(p) + "\",\"saved\":" + (saved ? "true" : "false") +
                ",\"wasDirty\":" + (wasDirty ? "true" : "false") + ",\"waitMs\":" + waitMs + ",\"attempts\":\"" + AU_escapeJsonString(attempts.join(", ")) + "\"}";
    var msg = saved ? ("Session kaydedildi (" + (attempts.join(", ") || "zaten kayıtlı") + ").")
                    : "Session kaydedilemedi; hâlâ kaydedilmemiş görünüyor. Audition'da elle Ctrl+S yapıp tekrar dene.";
    return AU_result(saved, msg, extra);
  } catch (e) {
    return AU_result(false, "AU_saveSession hata: " + e.toString());
  }
}

/* Aktif multitrack session'ın (.sesx) disk yolunu döndürür. Kaydedilmemişse boş. */
function AU_getSessionPath() {
  try {
    var doc = app.activeDocument;
    if (!doc) return AU_result(false, "Aktif belge yok. Önce session'ı aç.");
    var p = "";
    try { p = String(doc.path); } catch (e) {}
    if (p === "undefined" || p === "null") p = "";
    var disp = "";
    try { disp = String(doc.displayName); } catch (e2) {}
    return AU_result(true, p, "{\"path\":\"" + AU_escapeJsonString(p) + "\",\"displayName\":\"" + AU_escapeJsonString(disp) + "\"}");
  } catch (e) {
    return AU_result(false, "AU_getSessionPath hata: " + e.toString());
  }
}

function AU_markSelectedRecordingAsTake(projectJson) {
  try {
    var project = AU_parseJson(projectJson);
    if (!project) return AU_result(false, "Project JSON okunamadı.");

    // TODO v0.3:
    // 1. Audition'da seçili clip'i oku.
    // 2. Aktif lineId ile ilişkilendir.
    // 3. takeId, file path, start/end ve selectedTakeId güncelle.
    return AU_result(true, "Stub OK: seçili kayıt aktif line için take olarak işaretlenecek.");
  } catch (e) {
    return AU_result(false, "AU_markSelectedRecordingAsTake hata: " + e.toString());
  }
}

function AU_createMixMap(projectJson) {
  try {
    var project = AU_parseJson(projectJson);
    if (!project) return AU_result(false, "Project JSON okunamadı.");

    // TODO v0.4:
    // 1. Seçilmiş take'lerin gerçek sürelerini ve timeline aralıklarını oku.
    // 2. mix-map segmentlerini üret.
    // 3. .audub/mix-map.json olarak yazdır.
    return AU_result(true, "Stub OK: mix-map segmentleri üretilecek.");
  } catch (e) {
    return AU_result(false, "AU_createMixMap hata: " + e.toString());
  }
}

function AU_batchExport(projectJson) {
  try {
    var project = AU_parseJson(projectJson);
    if (!project) return AU_result(false, "Project JSON okunamadı.");

    // TODO v0.5:
    // 1. Her line için selectedTakeId bul.
    // 2. Gerçek take süresini export aralığı olarak kullan.
    // 3. project.exportPreset ayarlarını uygula.
    // 4. originalName/exportName + preset extension ile export et.
    return AU_result(true, "Stub OK: " + AU_projectLineCount(project) + " dosya detaylı preset ile export edilecek: " + AU_projectPresetSummary(project));
  } catch (e) {
    return AU_result(false, "AU_batchExport hata: " + e.toString());
  }
}
