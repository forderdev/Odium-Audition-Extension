(function (global) {
  var hostLoadState = "unknown"; // unknown | ready | failed

  function getCSInterface() {
    if (typeof global.CSInterface === "undefined") return null;
    try { return new global.CSInterface(); } catch (e) { return null; }
  }

  function makeError(message) {
    return JSON.stringify({ ok: false, message: message });
  }

  function evalScript(script, callback) {
    var cs = getCSInterface();
    if (!cs || !cs.evalScript) {
      callback && callback(makeError("CSInterface yok. Panel tarayıcı modunda çalışıyor olabilir."));
      return;
    }
    cs.evalScript(script, callback || function () {});
  }

  function jsStringForExtendScript(value) {
    return String(value)
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\r/g, "\\r")
      .replace(/\n/g, "\\n");
  }

  function ensureHostLoaded(callback) {
    if (hostLoadState === "ready") {
      callback(true);
      return;
    }

    var cs = getCSInterface();
    if (!cs || !cs.evalScript) {
      callback(false, makeError("CSInterface yok. Panel tarayıcı modunda çalışıyor olabilir."));
      return;
    }

    // Önce manifest ScriptPath yüklemiş mi diye kontrol et.
    cs.evalScript("typeof AU_hostPing === 'function' ? AU_hostPing() : 'AU_HOST_MISSING'", function (result) {
      if (result && result !== "AU_HOST_MISSING" && result !== "EvalScript error.") {
        hostLoadState = "ready";
        callback(true);
        return;
      }

      // Bazı Audition/CEP kurulumlarında ScriptPath otomatik yüklenmeyebilir.
      // Bu yüzden host.jsx dosyasını extension klasöründen manuel yüklüyoruz.
      var extensionPath = "";
      try {
        extensionPath = cs.getSystemPath(global.SystemPath && global.SystemPath.EXTENSION ? global.SystemPath.EXTENSION : "extension");
      } catch (e) {}

      if (!extensionPath) {
        hostLoadState = "failed";
        callback(false, makeError("host.jsx yüklenemedi: extension klasörü yolu alınamadı."));
        return;
      }

      var jsxPath = (extensionPath + "/jsx/host.jsx").replace(/\\/g, "/");
      var loadScript = "$.evalFile('" + jsStringForExtendScript(jsxPath) + "'); typeof AU_hostPing === 'function' ? AU_hostPing() : 'AU_HOST_LOAD_FAILED'";

      cs.evalScript(loadScript, function (loadResult) {
        if (loadResult && loadResult !== "AU_HOST_LOAD_FAILED" && loadResult !== "EvalScript error.") {
          hostLoadState = "ready";
          callback(true);
        } else {
          hostLoadState = "failed";
          callback(false, makeError("host.jsx yüklenemedi. Sonuç: " + loadResult));
        }
      });
    });
  }

  function sendJsonToHost(functionName, payload, callback) {
    ensureHostLoaded(function (ready, errorResult) {
      if (!ready) {
        callback && callback(errorResult || makeError("host.jsx hazır değil."));
        return;
      }

      var escaped = JSON.stringify(payload || {})
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n");

      evalScript(functionName + "('" + escaped + "')", callback);
    });
  }

  global.AuditionBridge = {
    ping: function (callback) { ensureHostLoaded(function (ready, errorResult) { callback && callback(ready ? JSON.stringify({ ok: true, message: "CEP host bağlantısı hazır." }) : errorResult); }); },
    probeApi: function (callback) { ensureHostLoaded(function (ready, errorResult) { if (!ready) { callback && callback(errorResult || makeError("host.jsx hazır değil.")); return; } evalScript("AU_probeApi()", callback); }); },
    testInsertOne: function (payload, callback) { sendJsonToHost("AU_testInsertOne", payload, callback); },
    placeClips: function (project, callback) { sendJsonToHost("AU_placeClips", project, callback); },
    readTakeClips: function (payload, callback) { sendJsonToHost("AU_readTakeClips", payload, callback); },
    getSessionPath: function (callback) { ensureHostLoaded(function (ready, errorResult) { if (!ready) { callback && callback(errorResult || makeError("host.jsx hazır değil.")); return; } evalScript("AU_getSessionPath()", callback); }); },
    saveSession: function (callback) { ensureHostLoaded(function (ready, errorResult) { if (!ready) { callback && callback(errorResult || makeError("host.jsx hazır değil.")); return; } evalScript("AU_saveSession()", callback); }); },
    markSelectedRecordingAsTake: function (project, callback) { sendJsonToHost("AU_markSelectedRecordingAsTake", project, callback); },
    createMixMap: function (project, callback) { sendJsonToHost("AU_createMixMap", project, callback); },
    batchExport: function (project, callback) { sendJsonToHost("AU_batchExport", project, callback); }
  };
})(window);
