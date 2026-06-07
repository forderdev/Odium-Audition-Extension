(function () {
  (window.__odiumAuthShards = window.__odiumAuthShards || []).push({ order: 30, shift: 7, u: [124, 116], p: [112, 121, 112, 122, 56, 57, 58, 59] });

  var state = { project: null, files: [], takeFiles: [], mixedFile: null, lastPackageRoot: null, packageInProgress: false };

  var els = {
    updateBtn: document.getElementById("updateBtn"),
    loginUpdateBtn: document.getElementById("loginUpdateBtn"),
    statusPill: document.getElementById("statusPill"),
    projectName: document.getElementById("projectName"),
    gapSeconds: document.getElementById("gapSeconds"),
    exportPreset: document.getElementById("exportPreset"),
    presetDetails: document.getElementById("presetDetails"),
    presetDetailsExpanded: document.getElementById("presetDetailsExpanded"),
    originalFolder: document.getElementById("originalFolder"),
    buildProjectBtn: document.getElementById("buildProjectBtn"),
    saveProjectBtn: document.getElementById("saveProjectBtn"),
    packageProjectBtn: document.getElementById("packageProjectBtn"),
    verifyPackageBtn: document.getElementById("verifyPackageBtn"),
    healthCheckBtn: document.getElementById("healthCheckBtn"),
    autoAttachExistingTakesBtn: document.getElementById("autoAttachExistingTakesBtn"),
    projectJsonFile: document.getElementById("projectJsonFile"),
    loadProjectBtn: document.getElementById("loadProjectBtn"),
    probeApiBtn: document.getElementById("probeApiBtn"),
    testInsertOneBtn: document.getElementById("testInsertOneBtn"),
    placeClipsBtn: document.getElementById("placeClipsBtn"),
    markTakeBtn: document.getElementById("markTakeBtn"),
    createMixMapBtn: document.getElementById("createMixMapBtn"),
    batchExportBtn: document.getElementById("batchExportBtn"),
    takeMatchMode: document.getElementById("takeMatchMode"),
    takeFolder: document.getElementById("takeFolder"),
    attachTakesBtn: document.getElementById("attachTakesBtn"),
    makeMixMapPlanBtn: document.getElementById("makeMixMapPlanBtn"),
    makeExportPlanBtn: document.getElementById("makeExportPlanBtn"),
    saveProjectAfterTakesBtn: document.getElementById("saveProjectAfterTakesBtn"),
    createFfmpegScriptBtn: document.getElementById("createFfmpegScriptBtn"),
    runFfmpegExportBtn: document.getElementById("runFfmpegExportBtn"),
    verifyTakesBtn: document.getElementById("verifyTakesBtn"),
    verifyExportsBtn: document.getElementById("verifyExportsBtn"),
    mixedFile: document.getElementById("mixedFile"),
    createMixSplitScriptBtn: document.getElementById("createMixSplitScriptBtn"),
    runMixSplitBtn: document.getElementById("runMixSplitBtn"),
    verifyMixSplitBtn: document.getElementById("verifyMixSplitBtn"),
    timelineSourceMode: document.getElementById("timelineSourceMode"),
    createTimelinePlanBtn: document.getElementById("createTimelinePlanBtn"),
    verifyTimelinePlanBtn: document.getElementById("verifyTimelinePlanBtn"),
    summary: document.getElementById("summary"),
    lineList: document.getElementById("lineList"),
    log: document.getElementById("log"),

    // --- Rol bazlı sade UI ---
    roleChooser: document.getElementById("roleChooser"),
    roleVoiceBtn: document.getElementById("roleVoiceBtn"),
    roleMixerBtn: document.getElementById("roleMixerBtn"),
    voicePanel: document.getElementById("voicePanel"),
    mixerPanel: document.getElementById("mixerPanel"),
    lineListCard: document.getElementById("lineListCard"),
    voBackBtn: document.getElementById("voBackBtn"),
    mxBackBtn: document.getElementById("mxBackBtn"),
    // Seslendirmen adımları
    voPickOriginalsBtn: document.getElementById("voPickOriginalsBtn"),
    voOriginalPathInput: document.getElementById("voOriginalPathInput"),
    voPlaceOriginalsBtn: document.getElementById("voPlaceOriginalsBtn"),
    voAlignMode: document.getElementById("voAlignMode"),
    voAlignTakesBtn: document.getElementById("voAlignTakesBtn"),
    voReplaceTakeBtn: document.getElementById("voReplaceTakeBtn"),
    voSendToMixerBtn: document.getElementById("voSendToMixerBtn"),
    voAttachFromFolderBtn: document.getElementById("voAttachFromFolderBtn"),
    voAutoAttachBtn: document.getElementById("voAutoAttachBtn"),
    voHealthBtn: document.getElementById("voHealthBtn"),
    // Mixçi adımları
    mxPickProjectBtn: document.getElementById("mxPickProjectBtn"),
    mxProjectPathInput: document.getElementById("mxProjectPathInput"),
    mxLoadBtn: document.getElementById("mxLoadBtn"),
    mxOrigTrack: document.getElementById("mxOrigTrack"),
    mxRecTrack: document.getElementById("mxRecTrack"),
    mxPosRootBtn: document.getElementById("mxPosRootBtn"),
    mxPosRootInput: document.getElementById("mxPosRootInput"),
    mxBuildFromPosBtn: document.getElementById("mxBuildFromPosBtn"),
    mxPickMixBtn: document.getElementById("mxPickMixBtn"),
    mxMixPathInput: document.getElementById("mxMixPathInput"),
    mxSplitBtn: document.getElementById("mxSplitBtn"),
    mxExportPreset: document.getElementById("mxExportPreset"),
    mxPresetDetails: document.getElementById("mxPresetDetails"),
    mxChooseOutBtn: document.getElementById("mxChooseOutBtn"),
    mxOutDirInput: document.getElementById("mxOutDirInput"),
    mxExportBtn: document.getElementById("mxExportBtn"),
    mxExportPlanBtn: document.getElementById("mxExportPlanBtn"),
    mxFfmpegScriptBtn: document.getElementById("mxFfmpegScriptBtn"),
    mxVerifyExportsBtn: document.getElementById("mxVerifyExportsBtn"),
    mxVerifySplitBtn: document.getElementById("mxVerifySplitBtn"),
    mxHealthBtn: document.getElementById("mxHealthBtn")
  };

  function log(message, type) {
    var prefix = new Date().toLocaleTimeString() + "  ";
    els.log.textContent += prefix + message + "\n";
    els.log.scrollTop = els.log.scrollHeight;
    if (type) els.statusPill.textContent = message;
  }

  function setBusy(text) {
    els.statusPill.textContent = text || "Çalışıyor";
  }

  // ---- Buton progress bar + durum yönetimi ----
  function ensureBar(btn) {
    if (!btn || !btn.parentNode) return null;
    var nx = btn.nextElementSibling;
    if (nx && nx.className && nx.className.indexOf("btnProgress") === 0) return nx;
    var bar = document.createElement("div");
    bar.className = "btnProgress hidden";
    var fill = document.createElement("div");
    fill.className = "btnProgressFill";
    bar.appendChild(fill);
    btn.parentNode.insertBefore(bar, btn.nextSibling);
    return bar;
  }
  function btnStart(btn, runningText) {
    if (!btn) return;
    if (typeof btn._origText === "undefined") btn._origText = btn.textContent;
    btn.classList.remove("btnDone", "btnFail");
    btn.classList.add("btnRunning");
    btn.disabled = true;
    btn.textContent = runningText || (btn._origText + " - çalışıyor…");
    var bar = ensureBar(btn);
    if (bar) {
      bar.classList.remove("hidden", "fail");
      var f = bar.firstChild; if (f) { f.style.width = "0%"; f.classList.add("indet"); }
    }
  }
  function btnProgress(btn, pct) {
    if (!btn) return;
    var bar = ensureBar(btn); if (!bar) return;
    var f = bar.firstChild; if (!f) return;
    f.classList.remove("indet");
    var p = Math.max(2, Math.min(100, pct));
    f.style.width = p + "%";
  }
  function btnDone(btn, doneText) {
    if (!btn) return;
    btn.classList.remove("btnRunning", "btnFail");
    btn.classList.add("btnDone");
    btn.disabled = false;
    btn.textContent = doneText || "✓ Tamamlandı";
    var bar = ensureBar(btn);
    if (bar) { bar.classList.remove("fail"); var f = bar.firstChild; if (f) { f.classList.remove("indet"); f.style.width = "100%"; } }
  }
  function btnFail(btn) {
    if (!btn) return;
    btn.classList.remove("btnRunning", "btnDone");
    btn.classList.add("btnFail");
    btn.disabled = false;
    if (typeof btn._origText !== "undefined") btn.textContent = btn._origText + " - hata";
    var bar = ensureBar(btn);
    if (bar) { bar.classList.add("fail"); var f = bar.firstChild; if (f) { f.classList.remove("indet"); f.style.width = "100%"; } }
  }
  // FFmpeg/Split chunk satırlarından "[i/N]" yakalayıp % hesaplar.
  function parseProgressPct(line) {
    var m = /\[(\d+)\s*\/\s*(\d+)\]/.exec(line);
    if (!m) return null;
    var i = Number(m[1]), n = Number(m[2]);
    if (!(n > 0)) return null;
    return Math.round((i / n) * 100);
  }

  // CEP klasör seçtirme (native folder picker).
  function pickFolder(title, initial) {
    try {
      if (window.cep && window.cep.fs && window.cep.fs.showOpenDialog) {
        var r = window.cep.fs.showOpenDialog(false, true, title || "Klasör seç", initial || "", null);
        if (r) {
          if (r.data && r.data.length) return String(r.data[0]);
          if (typeof r === "string" && r) return r;
        }
      }
    } catch (e) {}
    return null;
  }

  // CEP dosya seçtirme (native file picker). fileTypes: uzantı dizisi (örn ["wav","mp3"]).
  function pickFile(title, fileTypes, initial) {
    try {
      if (window.cep && window.cep.fs && window.cep.fs.showOpenDialog) {
        var r = window.cep.fs.showOpenDialog(false, false, title || "Dosya seç", initial || "", fileTypes || null);
        if (r) {
          if (r.data && r.data.length) return String(r.data[0]);
          if (typeof r === "string" && r) return r;
        }
      }
    } catch (e) {}
    return null;
  }
  // CEP çoklu dosya seçtirme (modern native file picker; klasör dialog'unun eski olmasından kaçınır).
  function pickFiles(title, fileTypes, initial) {
    try {
      if (window.cep && window.cep.fs && window.cep.fs.showOpenDialog) {
        var r = window.cep.fs.showOpenDialog(true, false, title || "Dosyaları seç", initial || "", fileTypes || null);
        if (r && r.data && r.data.length) return Array.prototype.map.call(r.data, String);
      }
    } catch (e) {}
    return null;
  }
  function baseNameOf(p) {
    return String(p || "").replace(/[\\/]+$/, "").split(/[\\/]/).pop();
  }
  function getVal(el) { return el && el.value ? String(el.value).trim() : ""; }

  // Uzantı klasörünü ve içine kurulan ffmpeg.exe'yi bul (INSTALL.bat tools/ffmpeg.exe koyar).
  function getExtensionDir() {
    try {
      if (window.CSInterface) {
        var cs = new window.CSInterface();
        var sp = (window.SystemPath && window.SystemPath.EXTENSION) ? window.SystemPath.EXTENSION : "extension";
        var p = cs.getSystemPath(sp);
        return p ? String(p).replace(/\\/g, "/") : "";
      }
    } catch (e) {}
    return "";
  }
  function nodeExists(p) {
    try {
      var req = (window.cep_node && window.cep_node.require) ? window.cep_node.require : window.require;
      return !!p && req("fs").existsSync(p);
    } catch (e) { return false; }
  }
  function bundledFfmpeg() {
    var ext = getExtensionDir();
    if (!ext) return "";
    var p = ext.replace(/\/+$/, "") + "/tools/ffmpeg.exe";
    return nodeExists(p) ? p : "";
  }

  function renderPresetDetails() {
    if (!ProjectStore || !ProjectStore.createExportPreset) return;
    var preset = ProjectStore.createExportPreset(els.exportPreset.value);
    var summary = ProjectStore.describePreset ? ProjectStore.describePreset(preset) : preset.name;
    els.presetDetails.textContent = summary;

    var rows = [
      ["Ad", preset.name],
      ["Kategori", preset.category],
      ["Format", (preset.format || "").toUpperCase() + " / ." + preset.extension],
      ["Codec", preset.codec],
      ["Sample Rate", preset.sampleRate ? preset.sampleRate + " Hz" : "-"],
      ["Bit Depth", preset.bitDepth ? preset.bitDepth + "-bit " + (preset.bitDepthMode || "") : "-"],
      ["Bitrate", preset.bitRateKbps ? preset.bitRateKbps + " kbps " + (preset.bitRateMode || "") : "-"],
      ["Quality", typeof preset.quality !== "undefined" ? "Q" + preset.quality : "-"],
      ["Kanal", preset.channels],
      ["Export aralığı", preset.exportRange],
      ["Uzun kayıt", preset.preserveRecordedTail ? "korunur" : "kırpılabilir"],
      ["İsimlendirme", preset.naming],
      ["Üzerine yazma", preset.overwrite ? "açık" : "kapalı"],
      ["Metadata", preset.includeMetadata ? "açık" : "kapalı"],
      ["Normalize", preset.normalize ? "açık" : "kapalı"],
      ["Head/Tail padding", (preset.headPaddingMs || 0) + " ms / " + (preset.tailPaddingMs || 0) + " ms"],
      ["Açıklama", preset.description || "-"]
    ];

    els.presetDetailsExpanded.innerHTML = rows.map(function (row) {
      return "<div class='presetRow'><strong>" + escapeHtml(row[0]) + "</strong><span>" + escapeHtml(row[1]) + "</span></div>";
    }).join("");
  }

  function renderProject(project) {
    if (!project) {
      els.summary.textContent = "Henüz proje oluşturulmadı.";
      els.lineList.innerHTML = "";
      return;
    }

    var selectedTakeCount = project.lines.filter(function (line) { return !!line.selectedTakeId; }).length;
    els.summary.textContent = project.lines.length + " replik bulundu. Bağlı seçili take: " + selectedTakeCount + ". Boşluk: " + project.gapSeconds + " sn. Preset: " + ProjectStore.describePreset(project.exportPreset);
    els.lineList.innerHTML = project.lines.slice(0, 200).map(function (line) {
      var duration = line.originalDuration !== null ? line.originalDuration + " sn" : "süre okunamadı";
      var range = line.timelineEnd !== null ? line.timelineStart + " → " + line.timelineEnd : line.timelineStart + " → ?";
      var selectedTake = ProjectStore.getSelectedTake ? ProjectStore.getSelectedTake(line) : null;
      var takeText = selectedTake ? " · TAKE: " + selectedTake.fileName + " / " + (selectedTake.duration !== null ? selectedTake.duration + " sn" : "süre okunamadı") : " · take yok";
      return "<li><strong>" + escapeHtml(line.originalName) + "</strong><div class='lineMeta'>" + line.lineId + " · ORJ " + duration + " · " + range + escapeHtml(takeText) + "</div></li>";
    }).join("");

    if (project.lines.length > 200) {
      els.lineList.innerHTML += "<li><em>İlk 200 kayıt gösteriliyor.</em></li>";
    }
  }

  function syncUiFromProject(project) {
    if (!project) return;
    if (project.projectName) els.projectName.value = project.projectName;
    if (typeof project.gapSeconds !== "undefined") els.gapSeconds.value = project.gapSeconds;
    if (project.exportPreset && project.exportPreset.id) {
      var exists = Array.prototype.some.call(els.exportPreset.options, function (opt) { return opt.value === project.exportPreset.id; });
      if (exists) els.exportPreset.value = project.exportPreset.id;
      renderPresetDetails();
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[c];
    });
  }

  els.exportPreset.addEventListener("change", function () {
    renderPresetDetails();
    if (state.project) {
      state.project.exportPreset = ProjectStore.createExportPreset(els.exportPreset.value);
      state.project.updatedAt = new Date().toISOString();
      renderProject(state.project);
      log("Export preset değişti: " + state.project.exportPreset.name);
    }
  });

  els.originalFolder.addEventListener("change", function (event) {
    state.files = Array.prototype.slice.call(event.target.files || []);
    log(state.files.length + " dosya seçildi.");
  });

  if (els.takeFolder) {
    els.takeFolder.addEventListener("change", function (event) {
      state.takeFiles = Array.prototype.slice.call(event.target.files || []);
      log(state.takeFiles.length + " take/miks dosyası seçildi.");
    });
  }

  if (els.mixedFile) {
    els.mixedFile.addEventListener("change", function (event) {
      state.mixedFile = event.target.files && event.target.files[0] ? event.target.files[0] : null;
      log(state.mixedFile ? ("Mix dosyası seçildi: " + state.mixedFile.name) : "Mix dosyası seçilmedi.");
    });
  }

  els.buildProjectBtn.addEventListener("click", async function () {
    if (!state.files.length) {
      log("Önce orijinal ses klasörü seçin.", "Uyarı");
      return;
    }

    setBusy("Project JSON oluşturuluyor");
    try {
      state.project = await ProjectStore.buildProjectFromFiles(state.files, {
        projectName: els.projectName.value,
        gapSeconds: els.gapSeconds.value,
        exportPresetId: els.exportPreset.value
      }, function (progress) { log(progress); });

      syncUiFromProject(state.project);
      renderProject(state.project);
      log("Project JSON hazır. Kök yol: " + (state.project.projectRootPath || "bulunamadı"), "Hazır");
    } catch (e) {
      log("Hata: " + e.message, "Hata");
    }
  });

  els.saveProjectBtn.addEventListener("click", function () {
    if (!state.project) {
      log("Kaydedilecek proje yok.", "Uyarı");
      return;
    }

    try {
      var savedPath = ProjectStore.saveProject(state.project);
      log("Kaydedildi: " + savedPath, "Kaydedildi");
      log("Ayrıca klasörler hazırlandı: .audub, Audio/Original, Audio/Takes, Audio/Mix, Audio/Exports");
    } catch (e) {
      log("Dosyaya yazılamadı: " + e.message, "Uyarı");
      ProjectStore.createDownload(state.project);
      log("Alternatif olarak project.json indirildi. Bunu proje klasöründe .audub/project.json olarak saklayın.");
    }
  });


  if (els.healthCheckBtn) {
    els.healthCheckBtn.addEventListener("click", function () {
      if (!state.project) {
        log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı");
        return;
      }
      try {
        setBusy("Proje sağlık kontrolü yapılıyor");
        var result = ProjectStore.healthCheckProject(state.project);
        renderProject(state.project);
        log("Proje sağlık kontrolü: replik " + result.lineCount + " / orijinal eksik " + result.missingOriginal + " / take yok " + result.noSelectedTake + " / take dosyası yok " + result.missingSelectedTakeFile + " / uzun kayıt " + result.longTakeCount, result.ok ? "Hazır" : "Uyarı");
        log("Teslime hazır mı: " + (result.readyForDelivery ? "EVET" : "HAYIR"));
        log("Sağlık raporu CSV: " + result.csvPath);
        log("Sağlık raporu JSON: " + result.jsonPath);
        if (result.warnings && result.warnings.length) log("Uyarılar: " + result.warnings.slice(0, 8).join(" | ") + (result.warnings.length > 8 ? " ..." : ""), "Uyarı");
      } catch (e) {
        log("Proje sağlık kontrolü hata verdi: " + e.message, "Hata");
      }
    });
  }


  if (els.autoAttachExistingTakesBtn) {
    els.autoAttachExistingTakesBtn.addEventListener("click", function () {
      if (!state.project) {
        log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı");
        return;
      }
      try {
        setBusy("Diskteki take dosyaları aranıyor");
        var result = ProjectStore.autoAttachExistingTakes(state.project, { preferMixSplit: true });
        renderProject(state.project);
        log("Take toparlama: bulunan " + result.found + " / bağlanan " + result.attached + " / eksik " + result.missing, result.missing ? "Uyarı" : "Hazır");
        log("Take toparlama raporu CSV: " + result.csvPath);
        log("Take toparlama raporu JSON: " + result.jsonPath);
        if (result.missingNames && result.missingNames.length) log("Eksik take örnekleri: " + result.missingNames.slice(0, 8).join(" | ") + (result.missingNames.length > 8 ? " ..." : ""), "Uyarı");
      } catch (e) {
        log("Take toparlama hata verdi: " + e.message, "Hata");
      }
    });
  }

  els.packageProjectBtn.addEventListener("click", function () {
    if (!state.project) {
      log("Paketlenecek proje yok.", "Uyarı");
      return;
    }
    try {
      setBusy("Paket oluşturuluyor");
      var result = ProjectStore.packageProject(state.project);
      state.lastPackageRoot = result.packageRoot;
      log("Paylaşım paketi hazır: " + result.packageRoot, "Hazır");
      log("Kopyalanan orijinal ses: " + result.copied + " / kopyalanan take: " + (result.copiedTakes || 0));
      if (result.packageVerify) {
        log("Paket final kontrolü: replik " + result.packageVerify.lineCount + " / orijinal " + result.packageVerify.audioOriginalCount + " / take " + result.packageVerify.audioTakeCount + " / teslime hazır: " + (result.packageVerify.ready ? "EVET" : "HAYIR"), result.packageVerify.ready ? "Hazır" : "Uyarı");
        log("Paket final raporu: " + result.packageVerify.jsonPath);
      }
      if (result.packageVerifyError) log("Paket final kontrolü uyarısı: " + result.packageVerifyError, "Uyarı");
      if (result.missing && result.missing.length) log("Kopyalanamayan orijinal dosya sayısı: " + result.missing.length + " - README_AU_DUB.txt içine yazıldı.");
      if (result.missingTakes && result.missingTakes.length) log("Kopyalanamayan take dosyası sayısı: " + result.missingTakes.length + " - README_AU_DUB.txt içine yazıldı.");
    } catch (e) {
      log("Paket oluşturulamadı: " + e.message, "Hata");
    }
  });



  if (els.verifyPackageBtn) {
    els.verifyPackageBtn.addEventListener("click", function () {
      if (!state.lastPackageRoot) {
        log("Önce Paylaşım Paketi Oluştur butonuna basın. Son paket yolu henüz bilinmiyor.", "Uyarı");
        return;
      }
      try {
        setBusy("Paket final kontrolü yapılıyor");
        var result = ProjectStore.verifyPackageProject(state.lastPackageRoot);
        log("Paket final kontrolü: replik " + result.lineCount + " / orijinal " + result.audioOriginalCount + " / take " + result.audioTakeCount + " / eksik " + result.missingTotal + " / teslime hazır: " + (result.ready ? "EVET" : "HAYIR"), result.ready ? "Hazır" : "Uyarı");
        log("Paket final raporu CSV: " + result.csvPath);
        log("Paket final raporu JSON: " + result.jsonPath);
        if (result.warnings && result.warnings.length) log("Paket uyarıları: " + result.warnings.slice(0, 8).join(" | ") + (result.warnings.length > 8 ? " ..." : ""), "Uyarı");
      } catch (e) {
        log("Paket final kontrolü hata verdi: " + e.message, "Hata");
      }
    });
  }

  els.loadProjectBtn.addEventListener("click", function () {
    var file = els.projectJsonFile && els.projectJsonFile.files && els.projectJsonFile.files[0];
    if (!file) {
      log("Önce .audub/project.json dosyasını seçin.", "Uyarı");
      return;
    }
    setBusy("Project JSON yükleniyor");
    ProjectStore.loadProjectFromFile(file).then(function (project) {
      state.project = project;
      syncUiFromProject(project);
      renderProject(project);
      log("Project JSON yüklendi: " + project.projectName + " / " + project.lines.length + " replik", "Hazır");
      log("Yüklenen proje kökü: " + (project.projectRootPath || "bilinmiyor"));
    }).catch(function (e) {
      log("Project JSON yüklenemedi: " + e.message, "Hata");
    });
  });


  if (els.attachTakesBtn) {
    els.attachTakesBtn.addEventListener("click", async function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      if (!state.takeFiles.length) { log("Önce take/miks sonrası ses klasörü seçin.", "Uyarı"); return; }
      try {
        setBusy("Take bağlanıyor");
        var result = await ProjectStore.attachTakeFiles(state.project, state.takeFiles, { matchMode: els.takeMatchMode.value }, function (progress) { log(progress); });
        renderProject(state.project);
        log("Take bağlama tamam: " + result.attached + " eşleşti, " + result.unmatched.length + " eşleşmedi. Uzun kayıt: " + (result.longerThanOriginal || 0) + ".", "Hazır");
        if (result.reportPath) log("Take bağlama raporu: " + result.reportPath);
        if (result.unmatched.length) log("Eşleşmeyen dosyalar: " + result.unmatched.slice(0, 20).join(", ") + (result.unmatched.length > 20 ? " ..." : ""));
      } catch (e) {
        log("Take bağlama hatası: " + e.message, "Hata");
      }
    });
  }

  if (els.verifyTakesBtn) {
    els.verifyTakesBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Take bağlantısı doğrulanıyor");
        var result = ProjectStore.verifyTakeLinks(state.project);
        renderProject(state.project);
        log("Take doğrulama: toplam " + result.total + " / bağlı " + result.withTake + " / eksik take " + result.missingTake + " / dosya yok " + result.missingFile + " / uzun kayıt " + result.longerThanOriginal, result.ok ? "Hazır" : "Uyarı");
        log("Take rapor CSV: " + result.csvPath);
        log("Take rapor JSON: " + result.jsonPath);
        if (!result.ok && result.problemFiles && result.problemFiles.length) {
          log("Sorunlu take satırları: " + result.problemFiles.slice(0, 20).join(", ") + (result.problemFiles.length > 20 ? " ..." : ""));
        }
      } catch (e) {
        log("Take doğrulama hatası: " + e.message, "Hata");
      }
    });
  }

  if (els.makeMixMapPlanBtn) {
    els.makeMixMapPlanBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Mix map kaydediliyor");
        var result = ProjectStore.createMixMapPlan(state.project);
        renderProject(state.project);
        log("Mix map kaydedildi: " + result.path + " / segment: " + result.segmentCount, "Hazır");
      } catch (e) {
        log("Mix map kaydedilemedi: " + e.message, "Hata");
      }
    });
  }

  if (els.makeExportPlanBtn) {
    els.makeExportPlanBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Export plan kaydediliyor");
        state.project.exportPreset = ProjectStore.createExportPreset(els.exportPreset.value);
        var result = ProjectStore.createExportPlan(state.project);
        renderProject(state.project);
        log("Export plan kaydedildi: " + result.jsonPath, "Hazır");
        log("CSV: " + result.csvPath + " / toplam: " + result.itemCount + " / take kullanılan: " + result.takeCount + " / orijinal fallback: " + result.originalFallbackCount);
        if (result.takeCount === 0) log("Uyarı: Hiç take bağlı değil. Export planı şu an orijinal seslere fallback yapıyor. Dublaj exportu için önce take/miks klasörü seçip Take Dosyalarını Bağla deyin.", "Uyarı");
      } catch (e) {
        log("Export plan kaydedilemedi: " + e.message, "Hata");
      }
    });
  }

  if (els.saveProjectAfterTakesBtn) {
    els.saveProjectAfterTakesBtn.addEventListener("click", function () {
      if (!state.project) { log("Kaydedilecek proje yok.", "Uyarı"); return; }
      try {
        var savedPath = ProjectStore.saveProject(state.project);
        renderProject(state.project);
        log("Project JSON güncellendi: " + savedPath, "Kaydedildi");
      } catch (e) {
        log("Project JSON güncellenemedi: " + e.message, "Hata");
      }
    });
  }


  if (els.createFfmpegScriptBtn) {
    els.createFfmpegScriptBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("FFmpeg script hazırlanıyor");
        state.project.exportPreset = ProjectStore.createExportPreset(els.exportPreset.value);
        var result = ProjectStore.createFfmpegExportScript(state.project);
        renderProject(state.project);
        log("FFmpeg export script hazır: " + result.ps1Path, "Hazır");
        log("BAT: " + result.batPath);
        log("Log dosyası: " + result.logPath);
        log("Çıkış klasörü: " + result.exportDir + " / toplam: " + result.itemCount + " / take: " + result.takeCount + " / fallback: " + result.originalFallbackCount);
        if (result.originalFallbackCount > 0) log("Uyarı: " + result.originalFallbackCount + " satırda take yok; kaynak olarak orijinal ses kullanılacak.", "Uyarı");
      } catch (e) {
        log("FFmpeg script oluşturulamadı: " + e.message, "Hata");
      }
    });
  }

  if (els.runFfmpegExportBtn) {
    els.runFfmpegExportBtn.addEventListener("click", async function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("FFmpeg export çalışıyor");
        state.project.exportPreset = ProjectStore.createExportPreset(els.exportPreset.value);
        var result = await ProjectStore.runFfmpegExport(state.project, function (chunk) {
          chunk.split(/\r?\n/).forEach(function (line) { if (line.trim()) log("FFmpeg: " + line.trim()); });
        });
        renderProject(state.project);
        if (result.ok) log("FFmpeg export tamamlandı. Çıkış: " + result.script.exportDir, "Hazır");
        else if (result.code === 10) log("FFmpeg bulunamadı. ffmpeg.exe PATH içinde değil. Log: " + result.script.logPath, "Hata");
        else if (result.code === 1) log("FFmpeg çalıştı ama bazı kaynak dosyaları/script uyarısı var. Log: " + result.script.logPath, "Uyarı");
        else log("FFmpeg export tamamlandı ama uyarı/hata kodu verdi: " + result.code + ". Log: " + result.script.logPath, "Uyarı");
      } catch (e) {
        log("FFmpeg export çalıştırılamadı: " + e.message + " - Bilgisayarda ffmpeg kurulu ve PATH içinde olmalı.", "Hata");
      }
    });
  }


  if (els.verifyExportsBtn) {
    els.verifyExportsBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Export sonucu doğrulanıyor");
        state.project.exportPreset = ProjectStore.createExportPreset(els.exportPreset.value);
        var result = ProjectStore.verifyExportOutputs(state.project);
        renderProject(state.project);
        log("Export doğrulama: beklenen " + result.expected + " / bulunan " + result.present + " / eksik " + result.missing + " / boş " + result.empty, result.ok ? "Hazır" : "Uyarı");
        log("Rapor CSV: " + result.csvPath);
        log("Rapor JSON: " + result.jsonPath);
        if (!result.ok && result.problemFiles && result.problemFiles.length) {
          log("Sorunlu dosyalar: " + result.problemFiles.slice(0, 20).join(", ") + (result.problemFiles.length > 20 ? " ..." : ""));
        }
      } catch (e) {
        log("Export doğrulama hatası: " + e.message, "Hata");
      }
    });
  }


  if (els.createMixSplitScriptBtn) {
    els.createMixSplitScriptBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      if (!state.mixedFile && !(state.project.lastMixSplitPlan && state.project.lastMixSplitPlan.mixFileAbsolutePath)) { log("Önce birleştirilmiş/mikslenmiş tek dosyayı seçin.", "Uyarı"); return; }
      try {
        setBusy("Mix ayırma script hazırlanıyor");
        var result = ProjectStore.createFfmpegMixSplitScript(state.project, state.mixedFile);
        state.mixedFile = null;
        renderProject(state.project);
        log("Mix ayırma script hazır: " + result.ps1Path, "Hazır");
        log("BAT: " + result.batPath);
        log("Split plan: " + result.planPath + " / segment: " + result.itemCount);
        log("Çıkış klasörü: " + result.outputDir);
      } catch (e) {
        log("Mix ayırma script oluşturulamadı: " + e.message, "Hata");
      }
    });
  }

  if (els.runMixSplitBtn) {
    els.runMixSplitBtn.addEventListener("click", async function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      if (!state.mixedFile && !(state.project.lastMixSplitScript && state.project.lastMixSplitScript.ps1Path)) { log("Önce mix dosyası seçip Mix Ayırma Script Oluştur deyin.", "Uyarı"); return; }
      try {
        setBusy("Mix dosyası ayrılıyor");
        var result = await ProjectStore.runFfmpegMixSplit(state.project, state.mixedFile, function (chunk) {
          chunk.split(/\r?\n/).forEach(function (line) { if (line.trim()) log("Split: " + line.trim()); });
        });
        state.mixedFile = null;
        renderProject(state.project);
        if (result.ok) log("Mix ayırma tamamlandı. Çıkış: " + result.script.outputDir, "Hazır");
        else if (result.code === 10) log("FFmpeg bulunamadı. ffmpeg.exe PATH içinde değil. Log: " + result.script.logPath, "Hata");
        else log("Mix ayırma bitti ama uyarı/hata kodu verdi: " + result.code + ". Log: " + result.script.logPath, "Uyarı");
      } catch (e) {
        log("Mix ayırma çalıştırılamadı: " + e.message, "Hata");
      }
    });
  }

  if (els.verifyMixSplitBtn) {
    els.verifyMixSplitBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Mix split doğrulanıyor");
        var result = ProjectStore.verifyMixSplitOutputs(state.project, true);
        renderProject(state.project);
        log("Mix split doğrulama: beklenen " + result.expected + " / bulunan " + result.present + " / eksik " + result.missing + " / boş " + result.empty + " / take yapılan " + result.attachedTakes, result.ok ? "Hazır" : "Uyarı");
        log("Rapor CSV: " + result.csvPath);
        log("Rapor JSON: " + result.jsonPath);
        if (!result.ok && result.problemFiles && result.problemFiles.length) log("Sorunlu split dosyaları: " + result.problemFiles.slice(0, 20).join(", ") + (result.problemFiles.length > 20 ? " ..." : ""));
      } catch (e) {
        log("Mix split doğrulama hatası: " + e.message, "Hata");
      }
    });
  }


  if (els.createTimelinePlanBtn) {
    els.createTimelinePlanBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Timeline planı hazırlanıyor");
        var result = ProjectStore.createTimelinePlan(state.project, { sourceMode: els.timelineSourceMode ? els.timelineSourceMode.value : "original_and_take" });
        renderProject(state.project);
        log("Timeline plan kaydedildi: " + result.jsonPath, "Hazır");
        log("CSV: " + result.csvPath + " / clip: " + result.clipCount + " / track: " + result.trackCount + " / toplam süre: " + result.totalDuration + " sn");
        if (result.previewPath) log("Somut timeline önizleme HTML: " + result.previewPath);
        if (result.warnings && result.warnings.length) log("Timeline uyarıları: " + result.warnings.slice(0, 12).join(" | ") + (result.warnings.length > 12 ? " ..." : ""), "Uyarı");
      } catch (e) {
        log("Timeline planı oluşturulamadı: " + e.message, "Hata");
      }
    });
  }

  if (els.verifyTimelinePlanBtn) {
    els.verifyTimelinePlanBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
      try {
        setBusy("Timeline planı doğrulanıyor");
        var result = ProjectStore.verifyTimelinePlan(state.project);
        renderProject(state.project);
        log("Timeline plan doğrulama: beklenen " + result.expectedClips + " / geçerli " + result.validClips + " / eksik kaynak " + result.missingSources + " / çakışma " + result.overlapCount, result.ok ? "Hazır" : "Uyarı");
        log("Rapor CSV: " + result.csvPath);
        log("Rapor JSON: " + result.jsonPath);
        if (!result.ok && result.warnings && result.warnings.length) log("Timeline sorunları: " + result.warnings.slice(0, 12).join(" | ") + (result.warnings.length > 12 ? " ..." : ""), "Uyarı");
      } catch (e) {
        log("Timeline plan doğrulama hatası: " + e.message, "Hata");
      }
    });
  }

  function hostAction(name, fn) {
    if (!state.project) {
      log("Önce Project JSON oluşturun.", "Uyarı");
      return;
    }
    setBusy(name);
    fn(state.project, function (result) {
      log(name + " sonucu: " + result, "Hazır");
    });
  }

  if (els.probeApiBtn) {
    els.probeApiBtn.addEventListener("click", function () {
      setBusy("Audition API taranıyor");
      AuditionBridge.probeApi(function (raw) {
        var parsed = null;
        try { parsed = JSON.parse(raw); } catch (e) {}
        if (!parsed) { log("API tarama ham sonuç: " + raw, "Uyarı"); return; }
        if (!parsed.ok) { log("API tarama başarısız: " + parsed.message, "Hata"); return; }
        log("--- Audition API Probe ---", "Hazır");
        String(parsed.message).split("\n").forEach(function (ln) { log(ln); });
        log("--- Probe bitti. Bu çıktının tamamını bana iletin; gerçek 'Timeline'a Hazırla' kodunu buna göre yazacağım. ---", "Hazır");
      });
    });
  }

  if (els.testInsertOneBtn) {
    els.testInsertOneBtn.addEventListener("click", function () {
      if (!state.project || !state.project.lines || !state.project.lines.length) {
        log("Önce Project JSON oluşturun veya yükleyin. Test için en az 1 replik gerekli.", "Hata");
        return;
      }
      var line = state.project.lines[0];
      var filePath = line.originalAbsolutePath || "";
      if (!filePath && state.project.projectRootPath && line.originalRelativePath) {
        filePath = (state.project.projectRootPath + "/" + line.originalRelativePath).replace(/\\/g, "/");
      }
      if (!filePath) {
        log("İlk repliğin orijinal dosya yolu bulunamadı (originalAbsolutePath/relativePath boş).", "Hata");
        return;
      }
      var logPath = "";
      if (state.project.projectRootPath) {
        logPath = (state.project.projectRootPath + "/.audub/test-insert-log.txt").replace(/\\/g, "/");
      }
      setBusy("Tek clip test yerleştiriliyor");
      log("Test: ilk replik '" + (line.originalName || line.lineId) + "' -> " + filePath, "Hazır");
      log("ÖNEMLİ: Audition'da bir Multitrack session AÇIK olmalı (Wave değil).", "Uyarı");
      if (logPath) log("Çökse bile adım adım log buraya yazılır: " + logPath, "Hazır");
      AuditionBridge.testInsertOne({ filePath: filePath, trackIndex: 0, testStartSeconds: 5, logPath: logPath }, function (raw) {
        var parsed = null;
        try { parsed = JSON.parse(raw); } catch (e) {}
        if (!parsed) { log("Test ham sonuç: " + raw, "Uyarı"); return; }
        log("--- Tek Clip Test ---", parsed.ok ? "Hazır" : "Hata");
        String(parsed.message).split("\n").forEach(function (ln) { log(ln); });
        log("--- Test bitti. Bu çıktının tamamını bana iletin; pozisyon property'sini buna göre kullanacağım. ---", "Hazır");
      });
    });
  }

  els.placeClipsBtn.addEventListener("click", function () {
    if (!state.project) { log("Önce Project JSON oluşturun veya yükleyin.", "Uyarı"); return; }
    var payload;
    try {
      payload = ProjectStore.buildPlacementPayload(state.project, { sourceMode: els.timelineSourceMode ? els.timelineSourceMode.value : "original_and_take" });
    } catch (e) {
      log("Yerleştirme hazırlanamadı: " + e.message, "Hata");
      return;
    }
    if (!payload.placeableClips) {
      log("Yerleştirilecek clip yok: " + payload.totalClips + " clip'in hepsinde kaynak dosya bulunamadı. Önce take'leri bağlayın.", "Hata");
      return;
    }
    log("Timeline'a yerleştiriliyor: " + payload.placeableClips + " clip (kaynağı diskte bulunamayıp atlanan: " + payload.skippedClips + ") / track: " + payload.trackOrder.join(", "), "Hazır");
    if (payload.skippedClips) {
      log("DİKKAT: " + payload.skippedClips + " clip atlandı çünkü kaynak dosyası diskte bulunamadı. Take'ler atlandıysa DUB_TAKE track'i oluşmaz.", "Uyarı");
      if (payload.warnings && payload.warnings.length) log("Atlama nedenleri: " + payload.warnings.slice(0, 12).join(" | ") + (payload.warnings.length > 12 ? " ..." : ""), "Uyarı");
    }
    log("ÖNEMLİ: Audition'da hedef Multitrack session AÇIK olmalı.", "Uyarı");
    setBusy("Timeline'a yerleştiriliyor");
    AuditionBridge.placeClips(payload, function (raw) {
      var parsed = null;
      try { parsed = JSON.parse(raw); } catch (e) {}
      if (!parsed) { log("Yerleştirme ham sonuç: " + raw, "Uyarı"); return; }
      log("--- Timeline Yerleştirme ---", parsed.ok ? "Hazır" : "Hata");
      String(parsed.message).split("\n").forEach(function (ln) { log(ln); });
    });
  });
  els.markTakeBtn.addEventListener("click", function () { hostAction("Seçili Kaydı Take Yap", AuditionBridge.markSelectedRecordingAsTake); });
  els.createMixMapBtn.addEventListener("click", function () { hostAction("Mix Map Oluştur", AuditionBridge.createMixMap); });
  els.batchExportBtn.addEventListener("click", function () { hostAction("Toplu Export", AuditionBridge.batchExport); });

  // =====================================================================
  //  ROL BAZLI SADE UI
  // =====================================================================

  function showLineListIfProject() {
    if (els.lineListCard) {
      if (state.project) els.lineListCard.classList.remove("hidden");
      else els.lineListCard.classList.add("hidden");
    }
  }

  function setRole(role) {
    state.role = role;
    if (els.roleChooser) els.roleChooser.classList.toggle("hidden", role !== null);
    if (els.voicePanel) els.voicePanel.classList.toggle("hidden", role !== "voice");
    if (els.mixerPanel) els.mixerPanel.classList.toggle("hidden", role !== "mixer");
    showLineListIfProject();
    if (role === "mixer") renderMxPresetDetails();
  }

  if (els.roleVoiceBtn) els.roleVoiceBtn.addEventListener("click", function () { setRole("voice"); });
  if (els.roleMixerBtn) els.roleMixerBtn.addEventListener("click", function () { setRole("mixer"); });
  if (els.voBackBtn) els.voBackBtn.addEventListener("click", function () { setRole(null); });
  if (els.mxBackBtn) els.mxBackBtn.addEventListener("click", function () { setRole(null); });

  // Orijinal ses klasörünü seç (modern klasör seçici; alt klasörler de taranır).
  if (els.voPickOriginalsBtn) {
    els.voPickOriginalsBtn.addEventListener("click", function () {
      ProjectStore.pickFolderDialog("Orijinal ses klasörünü seç", getVal(els.voOriginalPathInput)).then(function (p) {
        if (!p) { log("Klasör seçilmedi.", "Uyarı"); return; }
        if (els.voOriginalPathInput) els.voOriginalPathInput.value = p;
        log("Orijinal klasör: " + p, "Hazır");
      });
    });
  }

  // --- SESLENDİRMEN ADIM 1: Orijinalleri Track 1'e diz ---
  if (els.voPlaceOriginalsBtn) {
    els.voPlaceOriginalsBtn.addEventListener("click", async function () {
      var voDir = getVal(els.voOriginalPathInput);
      if (!voDir) { log("Önce orijinal ses klasörünü seç ya da yolu elle gir (adım 1).", "Uyarı"); return; }
      btnStart(els.voPlaceOriginalsBtn);
      setBusy("Orijinaller hazırlanıyor");
      try {
        state.project = await ProjectStore.buildProjectFromFolder(voDir, {
          projectName: els.projectName.value,
          gapSeconds: els.gapSeconds.value,
          exportPresetId: els.exportPreset.value
        }, function (progress) { log(progress); });
        syncUiFromProject(state.project);
        renderProject(state.project);
        showLineListIfProject();
        try { ProjectStore.saveProject(state.project); } catch (eSave) { log("Not: project.json otomatik kaydedilemedi: " + eSave.message); }
        log("Proje hazır: " + state.project.lines.length + " replik.", "Hazır");
        btnProgress(els.voPlaceOriginalsBtn, 40);
      } catch (e) {
        log("Proje oluşturulamadı: " + e.message, "Hata");
        btnFail(els.voPlaceOriginalsBtn);
        return;
      }

      var payload;
      try {
        payload = ProjectStore.buildPlacementPayload(state.project, { sourceMode: "original_only" });
      } catch (e) { log("Yerleştirme hazırlanamadı: " + e.message, "Hata"); btnFail(els.voPlaceOriginalsBtn); return; }
      if (!payload.placeableClips) { log("Diske erişilemeyen orijinaller; yerleştirilecek clip yok.", "Hata"); btnFail(els.voPlaceOriginalsBtn); return; }
      log("Audition'a diziliyor: " + payload.placeableClips + " orijinal (track: " + payload.trackOrder.join(", ") + ")", "Hazır");
      log("ÖNEMLİ: Audition'da boş bir Multitrack session AÇIK olmalı.", "Uyarı");
      setBusy("Track 1'e diziliyor");
      btnProgress(els.voPlaceOriginalsBtn, 70);
      AuditionBridge.placeClips(payload, function (raw) {
        var parsed = null; try { parsed = JSON.parse(raw); } catch (e) {}
        if (!parsed) { log("Yerleştirme ham sonuç: " + raw, "Uyarı"); btnFail(els.voPlaceOriginalsBtn); return; }
        log("--- Orijinalleri Diz ---", parsed.ok ? "Hazır" : "Hata");
        String(parsed.message).split("\n").forEach(function (ln) { log(ln); });
        if (parsed.ok) { log("Adım 1 tamam. Şimdi Audition'da track 2'ye kaydını yap, sonra Adım 2 'Kayıtları Eşle'.", "Hazır"); btnDone(els.voPlaceOriginalsBtn); }
        else btnFail(els.voPlaceOriginalsBtn);
      });
    });
  }

  // --- SESLENDİRMEN ADIM 2: Kayıtları eşle ---
  if (els.voAlignTakesBtn) {
    els.voAlignTakesBtn.addEventListener("click", function () {
      if (!state.project) { log("Önce orijinalleri diz (adım 1).", "Uyarı"); return; }
      btnStart(els.voAlignTakesBtn);
      setBusy("Kayıtlar okunuyor");
      log("Audition track 2'deki kayıtlar okunuyor...", "Hazır");
      AuditionBridge.readTakeClips({ trackIndex: 1 }, function (raw) {
        var parsed = null; try { parsed = JSON.parse(raw); } catch (e) {}
        if (!parsed) { log("Okuma ham sonuç: " + raw, "Uyarı"); btnFail(els.voAlignTakesBtn); return; }
        if (!parsed.ok) { log("Kayıt okunamadı: " + parsed.message, "Hata"); btnFail(els.voAlignTakesBtn); return; }
        var extra = parsed.extra || {};
        var clips = extra.clips || [];
        log("Track 2'de " + clips.length + " kayıt bulundu.", "Hazır");
        if (!clips.length) { log("Track 2'de hiç clip yok. Kayıtlarını 2. track'e aldığından emin ol.", "Uyarı"); btnFail(els.voAlignTakesBtn); return; }
        try {
          var result = ProjectStore.alignTakesFromLiveClips(state.project, clips, { mode: els.voAlignMode ? els.voAlignMode.value : "position" });
          renderProject(state.project);
          log("Eşleme tamam: " + result.attached + "/" + result.totalLines + " replik bağlandı (" + result.mode + "). Eşleşmeyen replik: " + result.unmatched + ", fazla kayıt: " + result.extraClips + ".", result.unmatched ? "Uyarı" : "Hazır");
          if (result.warnings && result.warnings.length) log("Uyarılar: " + result.warnings.slice(0, 10).join(" | ") + (result.warnings.length > 10 ? " ..." : ""), "Uyarı");
          if (result.unmatched) log("Eşleşmeyenler için 'Seçili repliğin take'ini elle düzelt' kullanabilirsin.", "Uyarı");
          btnDone(els.voAlignTakesBtn);
        } catch (e) {
          log("Eşleme hatası: " + e.message, "Hata");
          btnFail(els.voAlignTakesBtn);
        }
      });
    });
  }

  // --- SESLENDİRMEN ADIM 2b: Manuel eşleme düzeltme ---
  if (els.voReplaceTakeBtn) {
    els.voReplaceTakeBtn.addEventListener("click", function () {
      if (!state.project || !state.project.lines.length) { log("Önce proje gerekli.", "Uyarı"); return; }
      setBusy("Kayıtlar okunuyor");
      AuditionBridge.readTakeClips({ trackIndex: 1 }, function (raw) {
        var parsed = null; try { parsed = JSON.parse(raw); } catch (e) {}
        if (!parsed || !parsed.ok) { log("Kayıt okunamadı: " + (parsed ? parsed.message : raw), "Hata"); return; }
        var clips = (parsed.extra && parsed.extra.clips) || [];
        if (!clips.length) { log("Track 2'de clip yok.", "Uyarı"); return; }
        var clipList = clips.map(function (c, i) { return (i + 1) + ") " + (c.name || "kayıt") + " @" + c.startSeconds + "s (" + c.durationSeconds + "s)"; }).join("\n");
        var lineList = state.project.lines.map(function (l, i) { return (i + 1) + ") " + (l.originalName || l.lineId); }).join("\n");
        var lineNo = window.prompt("Hangi repliğin take'ini değiştireceksin? Sıra no:\n\n" + lineList);
        if (lineNo === null) return;
        var li = parseInt(lineNo, 10) - 1;
        if (!(li >= 0 && li < state.project.lines.length)) { log("Geçersiz replik no.", "Uyarı"); return; }
        var clipNo = window.prompt("Bu repliğe track 2'deki hangi kaydı bağlayayım? Sıra no:\n\n" + clipList);
        if (clipNo === null) return;
        var ci = parseInt(clipNo, 10) - 1;
        if (!(ci >= 0 && ci < clips.length)) { log("Geçersiz kayıt no.", "Uyarı"); return; }
        try {
          var r = ProjectStore.setLiveTakeForLine(state.project, state.project.lines[li].lineId, clips[ci]);
          renderProject(state.project);
          log("Elle eşlendi: " + r.originalName + " ← kayıt #" + (ci + 1), "Hazır");
        } catch (e) { log("Elle eşleme hatası: " + e.message, "Hata"); }
      });
    });
  }

  // --- SESLENDİRMEN ADIM 3: Projeyi mixçiye gönder ---
  function parseBridgeResult(raw) {
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function failPackageFlow(btn, message, type) {
    log(message, type || "Hata");
    if (btn) btnFail(btn);
    state.packageInProgress = false;
  }

  function saveAndPackageForMixer(btn, trigger) {
    if (!state.project) { log("Önce proje gerekli.", "Uyarı"); return; }
    if (state.packageInProgress) { log("Paketleme zaten devam ediyor.", "Uyarı"); return; }

    state.packageInProgress = true;
    if (btn) btnStart(btn);

    setBusy("Session kaydediliyor");
    log((trigger === "shortcut" ? "Ctrl+S alındı. " : "") + "Audition session kaydediliyor (Ctrl+S)...", "Hazır");

    AuditionBridge.saveSession(function (saveRaw) {
      var sp = parseBridgeResult(saveRaw);
      if (!sp || !sp.ok) {
        failPackageFlow(btn, "Session kaydedilemedi; paketleme durduruldu: " + (sp ? sp.message : saveRaw), "Hata");
        return;
      }

      setBusy("Session yolu okunuyor");
      AuditionBridge.getSessionPath(function (raw) {
        var parsed = parseBridgeResult(raw);
        var sesxPath = (parsed && parsed.ok && parsed.extra && parsed.extra.path) ? parsed.extra.path : "";
        if (!sesxPath) {
          failPackageFlow(btn, "Session .sesx yolu bulunamadı. Audition Save As penceresinde dosyayı kaydedip tekrar dene.", "Hata");
          return;
        }

        log("Session (.sesx): " + sesxPath, "Hazır");
        btnProgress(btn, 15);
        setBusy(".sesx yazımı bekleniyor");
        log(".sesx dosyasının diske tamamen yazılması bekleniyor...", "Hazır");

        ProjectStore.waitForFileStable(sesxPath, { stableMs: 3000, timeoutMs: 90000, intervalMs: 250 }).then(function (stableInfo) {
          log(".sesx yazımı tamamlandı: " + stableInfo.path + " (" + Math.max(1, Math.round(stableInfo.sizeBytes / 1024)) + " KB)", "Hazır");

          try {
            btnProgress(btn, 25);
            ProjectStore.saveProject(state.project);
            var result = ProjectStore.packageProject(state.project, { sesxPath: sesxPath });
            state.lastPackageRoot = result.packageRoot;
            log("Paket hazır: " + result.packageRoot + " (orijinal " + result.copied + ", take " + result.copiedTakes + ")", "Hazır");
            if (result.sesxCopied) log(".sesx pakete kopyalandı: " + result.sesxCopied, "Hazır");
            else if (result.sesxMissing) log("UYARI: .sesx kopyalanamadı (yol bulunamadı).", "Uyarı");
            if (result.sessionMediaCount) log("Session medyası (kayıt/merged/imported) .sesx'in yanına aynı göreli yolla kopyalandı: " + result.sessionMediaCount + " ses dosyası.", "Hazır");

            btnProgress(btn, 60);
            setBusy("Zip oluşturuluyor");
            log("Zip oluşturuluyor...", "Hazır");
            ProjectStore.zipFolder(result.packageRoot).then(function (zipRes) {
              log("Zip hazır: " + zipRes.zipPath + " (" + Math.max(1, Math.round(zipRes.sizeBytes / 1048576)) + " MB)", "Hazır");
              var opened = ProjectStore.revealFolder(zipRes.dir);
              log(opened ? ("Klasör açıldı: " + zipRes.dir + " - zip'i mixçiye gönder.") : ("Klasör otomatik açılamadı, elle git: " + zipRes.dir), "Hazır");
              state.packageInProgress = false;
              if (btn) btnDone(btn);
            }).catch(function (ze) {
              ProjectStore.revealFolder(result.baseDir || result.packageRoot);
              failPackageFlow(btn, "Zip oluşturulamadı: " + ze.message + " - paket klasörü hazır, elle zip'leyebilirsin: " + result.packageRoot, "Uyarı");
            });
          } catch (e) {
            failPackageFlow(btn, "Paket oluşturulamadı: " + e.message, "Hata");
          }
        }).catch(function (waitErr) {
          failPackageFlow(btn, ".sesx yazımı tamamlanmadı; zip başlatılmadı: " + waitErr.message, "Hata");
        });
      });
    });
  }

  if (els.voSendToMixerBtn) {
    els.voSendToMixerBtn.addEventListener("click", function () {
      saveAndPackageForMixer(els.voSendToMixerBtn, "button");
    });
  }

  document.addEventListener("keydown", function (e) {
    var key = String(e.key || "").toLowerCase();
    var isSaveShortcut = (e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (key === "s" || e.keyCode === 83 || e.which === 83);
    if (!isSaveShortcut) return;
    if (els.voicePanel && els.voicePanel.classList && els.voicePanel.classList.contains("hidden")) return;
    e.preventDefault();
    e.stopPropagation();
    saveAndPackageForMixer(els.voSendToMixerBtn, "shortcut");
  }, true);

  // --- SESLENDİRMEN Gelişmiş ---
  if (els.voAutoAttachBtn) {
    els.voAutoAttachBtn.addEventListener("click", function () {
      if (els.autoAttachExistingTakesBtn) els.autoAttachExistingTakesBtn.click();
    });
  }
  if (els.voHealthBtn) {
    els.voHealthBtn.addEventListener("click", function () { if (els.healthCheckBtn) els.healthCheckBtn.click(); });
  }
  if (els.voAttachFromFolderBtn) {
    els.voAttachFromFolderBtn.addEventListener("click", function () {
      var legacy = document.getElementById("legacyPanel");
      if (legacy) legacy.open = true;
      if (els.takeFolder) els.takeFolder.scrollIntoView({ behavior: "smooth", block: "center" });
      log("Hazır take dosyaların varsa aşağıdaki 'Take / Export Plan' bölümünden klasörü seçip 'Take Dosyalarını Bağla' de.", "Hazır");
    });
  }

  // =====================================================================
  //  MİXÇİ
  // =====================================================================

  function renderMxPresetDetails() {
    if (!els.mxExportPreset) return;
    if (!els.mxExportPreset.options.length && els.exportPreset) {
      els.mxExportPreset.innerHTML = els.exportPreset.innerHTML;
      els.mxExportPreset.value = els.exportPreset.value;
    }
    if (els.mxPresetDetails && ProjectStore.createExportPreset) {
      var preset = ProjectStore.createExportPreset(els.mxExportPreset.value);
      els.mxPresetDetails.textContent = ProjectStore.describePreset ? ProjectStore.describePreset(preset) : preset.name;
    }
  }
  if (els.mxExportPreset) {
    els.mxExportPreset.addEventListener("change", function () {
      if (els.exportPreset) els.exportPreset.value = els.mxExportPreset.value;
      renderMxPresetDetails();
    });
  }

  function renderMxOutDir() {
    if (!els.mxOutDirInput) return;
    if (!getVal(els.mxOutDirInput) && state.project && state.project.exportOutputDir) {
      els.mxOutDirInput.value = state.project.exportOutputDir;
    }
  }
  if (els.mxChooseOutBtn) {
    els.mxChooseOutBtn.addEventListener("click", function () {
      var initial = getVal(els.mxOutDirInput) || (state.project && state.project.projectRootPath) || "";
      ProjectStore.pickFolderDialog("Export çıkış klasörünü seç", initial).then(function (p) {
        if (!p) { log("Klasör seçilmedi.", "Uyarı"); return; }
        if (els.mxOutDirInput) els.mxOutDirInput.value = p;
        log("Export çıkış klasörü: " + p, "Hazır");
      });
    });
  }

  // --- MİXÇİ ADIM 1: project.json seç (native dialog) + yükle ---
  if (els.mxPickProjectBtn) {
    els.mxPickProjectBtn.addEventListener("click", function () {
      ProjectStore.pickFileDialog("project.json seç", "AU Dub proje|project.json|JSON|*.json|Tüm dosyalar|*.*", getVal(els.mxProjectPathInput)).then(function (p) {
        if (!p) { log("Dosya seçilmedi.", "Uyarı"); return; }
        if (els.mxProjectPathInput) els.mxProjectPathInput.value = p;
        log("project.json: " + p, "Hazır");
      });
    });
  }
  if (els.mxLoadBtn) {
    els.mxLoadBtn.addEventListener("click", function () {
      var projPath = getVal(els.mxProjectPathInput);
      if (!projPath) { log("Önce project.json'u seç ya da yolu elle gir (adım 1).", "Uyarı"); return; }
      btnStart(els.mxLoadBtn);
      setBusy("Proje yükleniyor");
      try {
        var project = ProjectStore.loadProjectFromPath(projPath);
        state.project = project;
        state.exportDir = null;
        syncUiFromProject(project);
        renderProject(project);
        showLineListIfProject();
        renderMxOutDir();
        log("Proje yüklendi: " + project.projectName + " / " + project.lines.length + " replik", "Hazır");
        btnDone(els.mxLoadBtn);
      } catch (e) { log("Proje yüklenemedi: " + e.message, "Hata"); btnFail(els.mxLoadBtn); }
    });
  }

  // --- MİXÇİ ADIM 1-alt: project.json yoksa track1(orijinal)+track2(kayıt) eşleştir ---
  function readClipsP(payload) {
    return new Promise(function (resolve) {
      AuditionBridge.readTakeClips(payload, function (raw) {
        var parsed = null; try { parsed = JSON.parse(raw); } catch (e) {}
        resolve(parsed);
      });
    });
  }
  if (els.mxPosRootBtn) {
    els.mxPosRootBtn.addEventListener("click", function () {
      ProjectStore.pickFolderDialog("Çıktı klasörünü seç", getVal(els.mxPosRootInput)).then(function (p) {
        if (!p) { log("Klasör seçilmedi.", "Uyarı"); return; }
        if (els.mxPosRootInput) els.mxPosRootInput.value = p;
        log("Çıktı klasörü: " + p, "Hazır");
      });
    });
  }
  if (els.mxBuildFromPosBtn) {
    els.mxBuildFromPosBtn.addEventListener("click", async function () {
      var rootDir = getVal(els.mxPosRootInput);
      if (!rootDir) { log("Önce çıktı klasörünü seç ya da yolu elle gir.", "Uyarı"); return; }
      btnStart(els.mxBuildFromPosBtn);
      setBusy("Pozisyonlar okunuyor");
        var origIdx = (parseInt(els.mxOrigTrack && els.mxOrigTrack.value, 10) || 1) - 1; if (origIdx < 0) origIdx = 0;
        var recIdx = (parseInt(els.mxRecTrack && els.mxRecTrack.value, 10) || 2) - 1; if (recIdx < 0) recIdx = 1;
        log("Track " + (origIdx + 1) + " (orijinaller) ve Track " + (recIdx + 1) + " (kayıtlar) okunuyor...", "Hazır");
        try {
          var t1res = await readClipsP({ trackIndex: origIdx });
          var t2res = await readClipsP({ trackIndex: recIdx });
          if (!t1res || !t1res.ok) { log("Track " + (origIdx + 1) + " okunamadı: " + (t1res ? t1res.message : "?"), "Hata"); btnFail(els.mxBuildFromPosBtn); return; }
          if (!t2res || !t2res.ok) { log("Track " + (recIdx + 1) + " okunamadı: " + (t2res ? t2res.message : "?"), "Hata"); btnFail(els.mxBuildFromPosBtn); return; }
          var t1 = (t1res.extra && t1res.extra.clips) || [];
          var t2 = (t2res.extra && t2res.extra.clips) || [];
          log("Track " + (origIdx + 1) + ": " + t1.length + " orijinal, Track " + (recIdx + 1) + ": " + t2.length + " kayıt.", "Hazır");
          state.project = ProjectStore.buildProjectFromMatchedTracks(t1, t2, {
            rootDir: rootDir,
            gapSeconds: els.gapSeconds ? els.gapSeconds.value : 6,
            exportPresetId: (els.mxExportPreset && els.mxExportPreset.value) || (els.exportPreset && els.exportPreset.value),
            projectName: "Mixer_Matched"
          });
          state.exportDir = null;
          var mi = state.project.matchInfo || {};
          try { ProjectStore.saveProject(state.project); } catch (eSave) { log("Not: project.json yazılamadı: " + eSave.message, "Uyarı"); }
          syncUiFromProject(state.project);
          renderProject(state.project);
          showLineListIfProject();
          renderMxOutDir();
          log("Eşleşme: " + mi.matchedLines + " replik (çok-parça birleştirilen: " + (mi.multiClipLines || 0) + "), kullanılan kayıt: " + mi.matchedRecordings + "/" + mi.recordings + ". Kök: " + rootDir, mi.warnings && mi.warnings.length ? "Uyarı" : "Hazır");
          if (state.project.lines.length) {
            var ln0 = state.project.lines[0], lnN = state.project.lines[state.project.lines.length - 1];
            log("İlk kesim " + ln0.timelineStart + "s'de başlıyor (baştaki boşluk korunur), son kesim " + lnN.timelineEnd + "s'de bitiyor. Mixdown 0:00'dan başlamalı.", "Hazır");
          }
          if (mi.warnings && mi.warnings.length) log("Kaydı olmayan orijinaller: " + mi.warnings.slice(0, 12).join(" | ") + (mi.warnings.length > 12 ? " ..." : ""), "Uyarı");
          log("Şimdi Audition'da mixle, tek dosyaya bounce et ve Adım 2'de seçip böl.", "Hazır");
          btnDone(els.mxBuildFromPosBtn);
        } catch (e) { log("Eşleştirme/Proje hatası: " + e.message, "Hata"); btnFail(els.mxBuildFromPosBtn); }
    });
  }

  // --- MİXÇİ ADIM 2: mix dosyasını seç (native dialog) ---
  if (els.mxPickMixBtn) {
    els.mxPickMixBtn.addEventListener("click", function () {
      ProjectStore.pickFileDialog("Mixlenmiş tek dosyayı seç", "Ses dosyaları|*.wav;*.mp3;*.ogg;*.flac;*.aif;*.aiff;*.m4a;*.aac|Tüm dosyalar|*.*", getVal(els.mxMixPathInput)).then(function (p) {
        if (!p) { log("Dosya seçilmedi.", "Uyarı"); return; }
        if (els.mxMixPathInput) els.mxMixPathInput.value = p;
        log("Mix dosyası: " + p, "Hazır");
      });
    });
  }
  // Split/export öncesi FFmpeg yolunu SESSİZCE projeye uygula: uzantıyla birlikte
  // kurulan tools/ffmpeg.exe varsa onu, yoksa PATH'teki "ffmpeg"i kullan.
  // (Kullanıcıya gösterilmez/söylenmez.)
  function applyFfmpegPath() {
    if (!state.project) return;
    state.project.ffmpegPath = bundledFfmpeg() || "";
  }

  function runSplitPipeline(btn) {
    applyFfmpegPath();
    setBusy("Mix bölünüyor");
    var script = ProjectStore.createFfmpegMixSplitScript(state.project, state.mixedFile);
    log("Mix ayırma script hazır: " + script.ps1Path + " / segment: " + script.itemCount, "Hazır");
    btnProgress(btn, 5);
    return ProjectStore.runFfmpegMixSplit(state.project, null, function (chunk) {
      chunk.split(/\r?\n/).forEach(function (line) {
        if (!line.trim()) return;
        log("Split: " + line.trim());
        var pct = parseProgressPct(line);
        if (pct !== null) btnProgress(btn, Math.round(pct * 0.9)); // bölme toplamın %90'ı
      });
    }).then(function (runResult) {
      if (!runResult.ok) {
        if (runResult.code === 10) { log("FFmpeg bulunamadı. ffmpeg.exe PATH içinde olmalı. Log: " + runResult.script.logPath, "Hata"); btnFail(btn); return; }
        log("Mix ayırma uyarı/hata kodu: " + runResult.code + ". Log: " + runResult.script.logPath, "Uyarı");
      }
      var verify = ProjectStore.verifyMixSplitOutputs(state.project, true);
      renderProject(state.project);
      log("Bölme doğrulama: beklenen " + verify.expected + " / bulunan " + verify.present + " / eksik " + verify.missing + " / boş " + verify.empty + " / take yapılan " + verify.attachedTakes, verify.ok ? "Hazır" : "Uyarı");
      if (verify.ok) { log("Adım 2 tamam. Parçalar repliklere take olarak bağlandı. Şimdi Adım 3 export.", "Hazır"); btnDone(btn); }
      else { if (verify.problemFiles && verify.problemFiles.length) log("Sorunlu: " + verify.problemFiles.slice(0, 12).join(", "), "Uyarı"); btnFail(btn); }
      state.mixedFile = null;
    });
  }

  if (els.mxSplitBtn) {
    els.mxSplitBtn.addEventListener("click", async function () {
      if (!state.project) { log("Önce projeyi yükle (adım 1).", "Uyarı"); return; }
      var mixPath = getVal(els.mxMixPathInput);
      if (!mixPath) { log("Önce mixlenmiş tek dosyayı seç ya da yolu elle gir (adım 2).", "Uyarı"); return; }
      state.mixedFile = { name: baseNameOf(mixPath), path: mixPath };
      try {
        // Kesim sınırları, seslendirmenin "Kayıtları Eşle" adımında (mixdown'DAN ÖNCE) yakalanıp
        // project.json'a yazılan GERÇEK pozisyonlardır. Mixdown track 2'yi tek clip'e indirip
        // bozabildiği için mixçi tarafında session YENİDEN OKUNMAZ - kayıtlı sınırlara güveniriz.
        var total = state.project.lines.length;
        var withBounds = 0;
        for (var i = 0; i < state.project.lines.length; i++) {
          var tk = ProjectStore.getSelectedTake(state.project.lines[i]);
          if (tk && typeof tk.mixStart === "number" && typeof tk.mixEnd === "number" && tk.mixEnd > tk.mixStart) withBounds++;
        }
        if (withBounds === 0) {
          log("Bu projede canlı kayıt sınırı (mixStart/mixEnd) yok. Büyük ihtimalle YANLIŞ/eski project.json yükledin. Seslendirmenin gönderdiği PAKET içindeki .audub/project.json'u yükle ve tekrar dene.", "Hata");
          return;
        }
        btnStart(els.mxSplitBtn);
        if (withBounds < total) {
          log("DİKKAT: " + (total - withBounds) + "/" + total + " replikte canlı kayıt sınırı yok; bunlar yaklaşık (cursor) sınırla bölünecek. O repliklerin kaydı eşlenmemiş olabilir - seslendirmen tarafında 'Kayıtları Eşle'yi tekrar çalıştırıp paketi yenilemek en temizi.", "Uyarı");
        } else {
          log("Tüm " + total + " replik gerçek kayıt pozisyonuyla bölünecek.", "Hazır");
        }
        await runSplitPipeline(els.mxSplitBtn);
      } catch (e) {
        log("Mix bölme hatası: " + e.message, "Hata");
        btnFail(els.mxSplitBtn);
      }
    });
  }

  // --- MİXÇİ ADIM 3: Orijinal isimlerle export ---
  if (els.mxExportBtn) {
    els.mxExportBtn.addEventListener("click", async function () {
      if (!state.project) { log("Önce projeyi yükle (adım 1).", "Uyarı"); return; }
      btnStart(els.mxExportBtn);
      try {
        setBusy("Export çalışıyor");
        applyFfmpegPath();
        // Kullanıcı çıkış klasörü girdiyse uygula; boşsa varsayılan (proje/Audio/Exports).
        var outDir = getVal(els.mxOutDirInput);
        state.project.exportOutputDir = outDir || "";
        state.project.exportPreset = ProjectStore.createExportPreset(els.mxExportPreset ? els.mxExportPreset.value : els.exportPreset.value);
        ProjectStore.createExportPlan(state.project);
        btnProgress(els.mxExportBtn, 5);
        var result = await ProjectStore.runFfmpegExport(state.project, function (chunk) {
          chunk.split(/\r?\n/).forEach(function (line) {
            if (!line.trim()) return;
            log("FFmpeg: " + line.trim());
            var pct = parseProgressPct(line);
            if (pct !== null) btnProgress(els.mxExportBtn, pct);
          });
        });
        renderProject(state.project);
        if (result.ok) { log("Export tamam. Dosyalar orijinal isimleriyle: " + result.script.exportDir, "Hazır"); btnDone(els.mxExportBtn); }
        else if (result.code === 10) { log("FFmpeg bulunamadı. ffmpeg.exe PATH içinde olmalı. Log: " + result.script.logPath, "Hata"); btnFail(els.mxExportBtn); }
        else { log("Export uyarı/hata kodu: " + result.code + ". Log: " + result.script.logPath, "Uyarı"); btnFail(els.mxExportBtn); }
      } catch (e) {
        log("Export hatası: " + e.message + " - ffmpeg kurulu ve PATH'te olmalı.", "Hata");
        btnFail(els.mxExportBtn);
      }
    });
  }

  // --- MİXÇİ Gelişmiş ---
  if (els.mxExportPlanBtn) els.mxExportPlanBtn.addEventListener("click", function () { if (els.makeExportPlanBtn) els.makeExportPlanBtn.click(); });
  if (els.mxFfmpegScriptBtn) els.mxFfmpegScriptBtn.addEventListener("click", function () { if (els.createFfmpegScriptBtn) els.createFfmpegScriptBtn.click(); });
  if (els.mxVerifyExportsBtn) els.mxVerifyExportsBtn.addEventListener("click", function () { if (els.verifyExportsBtn) els.verifyExportsBtn.click(); });
  if (els.mxVerifySplitBtn) els.mxVerifySplitBtn.addEventListener("click", function () { if (els.verifyMixSplitBtn) els.verifyMixSplitBtn.click(); });
  if (els.mxHealthBtn) els.mxHealthBtn.addEventListener("click", function () { if (els.healthCheckBtn) els.healthCheckBtn.click(); });

  // ---- Konami kodu: ↑↑↓↓←→←→ B A → gizli paneller + log ----
  (function setupKonami() {
    var seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    var pos = 0;
    document.addEventListener("keydown", function (e) {
      var k = String(e.key || "").toLowerCase();
      if (k === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          pos = 0;
          var on = document.body.classList.toggle("konami");
          log(on ? "Gizli mod ACIK: Gelismis paneller ve log gorunur." : "Gizli mod kapali.", on ? "Gizli mod açık" : "Gizli mod kapalı");
        }
      } else {
        pos = (k === seq[0]) ? 1 : 0;
      }
    });
  })();

  // =====================================================================
  //  UZAKTAN GÜNCELLEME
  //  version.json'u barındır (GitHub Releases / web sunucu) ve URL'i aşağıya yaz.
  //  version.json örneği: { "version":"1.6.0", "setupUrl":"https://.../OdiumStudioSetup.exe", "notes":"..." }
  // =====================================================================
  var CURRENT_VERSION = "1.4";
  var UPDATE_MANIFEST_URL = "https://api.github.com/repos/forderdev/Odium-Audition-Extension/contents/AU-Dub-Panel/version.json?ref=main";

  function cmpVer(a, b) {
    a = String(a || "0").split("."); b = String(b || "0").split(".");
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      var x = parseInt(a[i] || "0", 10), y = parseInt(b[i] || "0", 10);
      if (x > y) return 1; if (x < y) return -1;
    }
    return 0;
  }
  function nodeReq() { return (window.cep_node && window.cep_node.require) ? window.cep_node.require : window.require; }
  function openUrl(u) {
    try { if (window.cep && window.cep.util && window.cep.util.openURLInDefaultBrowser) { window.cep.util.openURLInDefaultBrowser(u); return; } } catch (e) {}
    try { nodeReq()("child_process").spawn("cmd", ["/c", "start", "", u], { detached: true }); } catch (e) {}
  }
  function downloadFile(url, dest, cb, depth) {
    try {
      var req = nodeReq(); var fs = req("fs");
      var mod = url.indexOf("https") === 0 ? req("https") : req("http");
      var file = fs.createWriteStream(dest);
      mod.get(url, { headers: { "User-Agent": "OdiumStudio-Audition" } }, function (res) {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close(); try { fs.unlinkSync(dest); } catch (e) {}
          if ((depth || 0) > 5) { cb(new Error("Çok fazla yönlendirme")); return; }
          downloadFile(res.headers.location, dest, cb, (depth || 0) + 1); return;
        }
        if (res.statusCode !== 200) { file.close(); cb(new Error("HTTP " + res.statusCode)); return; }
        res.pipe(file);
        file.on("finish", function () { file.close(function () { cb(null); }); });
      }).on("error", function (e) { try { fs.unlinkSync(dest); } catch (ig) {} cb(e); });
    } catch (e) { cb(e); }
  }
  function onUpdateManifest(m) {
    if (m && m.content && m.encoding === "base64") {
      try {
        var b64 = String(m.content).replace(/\s/g, "");
        var bin = atob(b64);
        var txt; try { txt = decodeURIComponent(escape(bin)); } catch (eU) { txt = bin; }
        m = JSON.parse(txt);
      } catch (eB) { return; }
    }
    if (!m || !m.version) return;
    if (cmpVer(m.version, CURRENT_VERSION) > 0) {
      state.update = m;
      revealUpdateButtons(m);
      log("Yeni sürüm var: v" + m.version + " (mevcut v" + CURRENT_VERSION + "). 'Güncelle'ye bas.", "Güncelleme var");
      if (m.notes) log("Sürüm notu: " + m.notes, "Güncelleme var");
    } else {
      log("Güncelleme kontrolü: en güncel surumdesin (v" + CURRENT_VERSION + ").", "Hazır");
    }
  }
  function checkForUpdate() {
    if (!UPDATE_MANIFEST_URL) { log("Güncelleme kontrolü kapalı (UPDATE_MANIFEST_URL boş).", "Hazır"); return; }
    log("Güncelleme kontrol ediliyor...", "Hazır");
    var url = UPDATE_MANIFEST_URL + (UPDATE_MANIFEST_URL.indexOf("?") >= 0 ? "&" : "?") + "_=" + Date.now();
    if (typeof fetch === "function") {
      fetch(url, { cache: "no-store" }).then(function (r) { return r.json(); }).then(onUpdateManifest).catch(function () { checkForUpdateNode(url); });
    } else { checkForUpdateNode(url); }
  }
  function checkForUpdateNode(url) {
    try {
      var req = nodeReq(); var mod = url.indexOf("https") === 0 ? req("https") : req("http");
      mod.get(url, { headers: { "User-Agent": "OdiumStudio-Audition" } }, function (res) {
        var d = ""; res.on("data", function (c) { d += c; });
        res.on("end", function () { try { onUpdateManifest(JSON.parse(d)); } catch (e) {} });
      }).on("error", function () {});
    } catch (e) {}
  }
  // Yeni sürüm bulununca: hem üst bar hem GİRİŞ ekranındaki Güncelle butonunu göster.
  // Böylece kullanıcı login ekranındayken bile güncelleyebilir.
  function revealUpdateButtons(m) {
    // Üst bar dar olduğu için kısa etiket; giriş ekranında yer bol, sürümü göster.
    if (els.updateBtn) {
      els.updateBtn.textContent = "⟳ Güncelle";
      els.updateBtn.title = "Yeni sürüm v" + m.version;
      els.updateBtn.classList.remove("hidden");
    }
    if (els.loginUpdateBtn) {
      els.loginUpdateBtn.textContent = "⟳ Güncelle (v" + m.version + ")";
      els.loginUpdateBtn.classList.remove("hidden");
    }
  }

  function runUpdate(btn) {
    var m = state.update; if (!m) { checkForUpdate(); return; }
    var su = m.setupUrl || m.url || "";
    if (!su) { log("Güncelleme adresi (setupUrl) yok.", "Uyarı"); return; }
    if (/\.exe(\?|$)/i.test(su)) {
      log("Güncelleme indiriliyor...", "Güncelleniyor");
      btnStart(btn);
      try {
        var req = nodeReq(); var os = req("os"), path = req("path");
        var dest = path.join(os.tmpdir(), "OdiumStudioSetup_" + Date.now() + ".exe");
        downloadFile(su, dest, function (err) {
          if (err) { log("İndirilemedi: " + err.message + " - tarayıcıda açılıyor.", "Uyarı"); openUrl(su); btnFail(btn); return; }
          log("İndirildi. Kurulum başlatılıyor - Audition'ı KAPAT, kurulumu bitir, tekrar aç.", "Hazır");
          try { req("child_process").spawn(dest, [], { detached: true, stdio: "ignore" }).unref(); btnDone(btn); }
          catch (e) { openUrl(dest); }
        });
      } catch (e) { log("Güncelleme hatası: " + e.message + " - tarayıcıda açılıyor.", "Uyarı"); openUrl(su); btnFail(btn); }
    } else {
      openUrl(su);
      log("Güncelleme sayfası tarayıcıda açıldı.", "Hazır");
    }
  }

  if (els.updateBtn) els.updateBtn.addEventListener("click", function () { runUpdate(els.updateBtn); });
  if (els.loginUpdateBtn) els.loginUpdateBtn.addEventListener("click", function () { runUpdate(els.loginUpdateBtn); });

  renderPresetDetails();
  setRole(null);
  try { checkForUpdate(); } catch (e) {}
  log("Panel yüklendi. v1.4 - Odium Studio Audition Plugini.", "Hazır");
})();
