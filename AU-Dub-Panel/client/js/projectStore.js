(function (global) {
  var AUDIO_EXTENSIONS = ["wav", "wave", "bwf", "mp3", "ogg", "oga", "flac", "aif", "aiff", "aifc", "m4a", "aac", "w64"];

  var EXPORT_PRESETS = {
    game_wav_48k_24_mono: {
      id: "game_wav_48k_24_mono",
      category: "Oyun / Lokalizasyon Teslim",
      name: "Game VO - WAV 48kHz 24-bit Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "En güvenli oyun dublaj teslim preset'i. Orijinal dosya adı korunur, kayıt gerçek süresiyle çıkar."
    },
    game_wav_48k_24_stereo: {
      id: "game_wav_48k_24_stereo",
      category: "Oyun / Lokalizasyon Teslim",
      name: "Game VO - WAV 48kHz 24-bit Stereo",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "stereo",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Stereo teslim isteyen oyun/ara sahne replikleri için."
    },
    game_wav_48k_16_mono: {
      id: "game_wav_48k_16_mono",
      category: "Oyun / Lokalizasyon Teslim",
      name: "Game VO - WAV 48kHz 16-bit Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 16,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Daha küçük dosya isteyen oyun projeleri için mono WAV."
    },
    game_wav_44k_16_mono: {
      id: "game_wav_44k_16_mono",
      category: "Oyun / Lokalizasyon Teslim",
      name: "Game VO - WAV 44.1kHz 16-bit Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 44100,
      bitDepth: 16,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "44.1kHz teslim isteyen eski/özel pipeline'lar için."
    },
    wwise_wav_48k_24_mono: {
      id: "wwise_wav_48k_24_mono",
      category: "Oyun Middleware",
      name: "Wwise Ready - WAV 48kHz 24-bit Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 50,
      description: "Wwise tarafına temiz mono kaynak göndermek için."
    },
    fmod_wav_48k_24_mono: {
      id: "fmod_wav_48k_24_mono",
      category: "Oyun Middleware",
      name: "FMOD Ready - WAV 48kHz 24-bit Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 50,
      description: "FMOD tarafına temiz mono kaynak göndermek için."
    },
    unity_wav_48k_16_mono: {
      id: "unity_wav_48k_16_mono",
      category: "Oyun Middleware",
      name: "Unity Mobile - WAV 48kHz 16-bit Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 16,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: false,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Mobil/Unity projelerinde daha küçük kaynak WAV için."
    },
    wav_48k_32float_mono: {
      id: "wav_48k_32float_mono",
      category: "Master / Arşiv",
      name: "Master - WAV 48kHz 32-bit Float Mono",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM Float",
      sampleRate: 48000,
      bitDepth: 32,
      bitDepthMode: "float",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "İşlenmemiş master/backup için yüksek dinamik aralık."
    },
    wav_48k_32float_stereo: {
      id: "wav_48k_32float_stereo",
      category: "Master / Arşiv",
      name: "Master - WAV 48kHz 32-bit Float Stereo",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM Float",
      sampleRate: 48000,
      bitDepth: 32,
      bitDepthMode: "float",
      channels: "stereo",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Stereo master/backup için yüksek kalite."
    },
    wav_96k_24_stereo: {
      id: "wav_96k_24_stereo",
      category: "Master / Arşiv",
      name: "Master - WAV 96kHz 24-bit Stereo",
      format: "wav",
      extension: "wav",
      container: "Waveform Audio",
      codec: "PCM",
      sampleRate: 96000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "stereo",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Yüksek sample-rate arşiv veya post-prod teslimi için."
    },
    bwf_48k_24_mono: {
      id: "bwf_48k_24_mono",
      category: "Master / Arşiv",
      name: "Broadcast WAV - 48kHz 24-bit Mono",
      format: "bwf",
      extension: "wav",
      container: "Broadcast Wave",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      includeTimecodeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Broadcast Wave metadata/timecode taşımak isteyen pipeline'lar için."
    },
    aiff_48k_24_mono: {
      id: "aiff_48k_24_mono",
      category: "Master / Arşiv",
      name: "AIFF - 48kHz 24-bit Mono",
      format: "aiff",
      extension: "aif",
      container: "AIFF",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "AIFF teslim isteyen post-prod ortamları için."
    },
    aiff_48k_24_stereo: {
      id: "aiff_48k_24_stereo",
      category: "Master / Arşiv",
      name: "AIFF - 48kHz 24-bit Stereo",
      format: "aiff",
      extension: "aif",
      container: "AIFF",
      codec: "PCM",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "stereo",
      interleaved: true,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Stereo AIFF teslimleri için."
    },
    flac_48k_24_mono: {
      id: "flac_48k_24_mono",
      category: "Master / Arşiv",
      name: "FLAC - 48kHz 24-bit Mono",
      format: "flac",
      extension: "flac",
      container: "FLAC",
      codec: "FLAC Lossless",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "mono",
      interleaved: true,
      compressionLevel: 5,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Kayıpsız ama daha küçük arşiv dosyası için."
    },
    flac_48k_24_stereo: {
      id: "flac_48k_24_stereo",
      category: "Master / Arşiv",
      name: "FLAC - 48kHz 24-bit Stereo",
      format: "flac",
      extension: "flac",
      container: "FLAC",
      codec: "FLAC Lossless",
      sampleRate: 48000,
      bitDepth: 24,
      bitDepthMode: "integer",
      channels: "stereo",
      interleaved: true,
      compressionLevel: 5,
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Stereo kayıpsız arşiv/paylaşım için."
    },
    mp3_48k_320_stereo: {
      id: "mp3_48k_320_stereo",
      category: "Review / Paylaşım",
      name: "MP3 - 48kHz 320kbps Stereo",
      format: "mp3",
      extension: "mp3",
      container: "MPEG Layer-3",
      codec: "MP3",
      sampleRate: 48000,
      bitRateKbps: 320,
      bitRateMode: "CBR",
      channels: "stereo",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Müşteri/direktör review için yüksek bitrate MP3."
    },
    mp3_48k_192_mono: {
      id: "mp3_48k_192_mono",
      category: "Review / Paylaşım",
      name: "MP3 - 48kHz 192kbps Mono",
      format: "mp3",
      extension: "mp3",
      container: "MPEG Layer-3",
      codec: "MP3",
      sampleRate: 48000,
      bitRateKbps: 192,
      bitRateMode: "CBR",
      channels: "mono",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "VO review ve hızlı paylaşım için dengeli mono MP3."
    },
    mp3_44k_128_mono: {
      id: "mp3_44k_128_mono",
      category: "Review / Paylaşım",
      name: "MP3 - 44.1kHz 128kbps Mono",
      format: "mp3",
      extension: "mp3",
      container: "MPEG Layer-3",
      codec: "MP3",
      sampleRate: 44100,
      bitRateKbps: 128,
      bitRateMode: "CBR",
      channels: "mono",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Küçük review dosyaları için."
    },
    ogg_48k_q5_mono: {
      id: "ogg_48k_q5_mono",
      category: "Review / Paylaşım",
      name: "OGG Vorbis - 48kHz Q5 Mono",
      format: "ogg",
      extension: "ogg",
      container: "Ogg Vorbis",
      codec: "Vorbis",
      sampleRate: 48000,
      quality: 5,
      channels: "mono",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "OGG isteyen oyun/build testleri için mono kalite 5."
    },
    ogg_48k_q7_stereo: {
      id: "ogg_48k_q7_stereo",
      category: "Review / Paylaşım",
      name: "OGG Vorbis - 48kHz Q7 Stereo",
      format: "ogg",
      extension: "ogg",
      container: "Ogg Vorbis",
      codec: "Vorbis",
      sampleRate: 48000,
      quality: 7,
      channels: "stereo",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Stereo OGG review/build testleri için."
    },
    aac_m4a_48k_256_stereo: {
      id: "aac_m4a_48k_256_stereo",
      category: "Review / Paylaşım",
      name: "AAC/M4A - 48kHz 256kbps Stereo",
      format: "m4a",
      extension: "m4a",
      container: "MPEG-4 Audio",
      codec: "AAC",
      sampleRate: 48000,
      bitRateKbps: 256,
      bitRateMode: "CBR",
      channels: "stereo",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Kompakt stereo review ve mobil paylaşım için."
    },
    aac_m4a_44k_128_mono: {
      id: "aac_m4a_44k_128_mono",
      category: "Review / Paylaşım",
      name: "AAC/M4A - 44.1kHz 128kbps Mono",
      format: "m4a",
      extension: "m4a",
      container: "MPEG-4 Audio",
      codec: "AAC",
      sampleRate: 44100,
      bitRateKbps: 128,
      bitRateMode: "CBR",
      channels: "mono",
      naming: "original_filename",
      overwrite: true,
      exportRange: "selected_take_full_duration",
      includeMetadata: true,
      normalize: false,
      loudnessTargetLUFS: null,
      truePeakLimitDbTP: null,
      trimSilence: false,
      preserveRecordedTail: true,
      headPaddingMs: 0,
      tailPaddingMs: 0,
      description: "Küçük AAC/M4A review dosyaları için."
    }
  };

  function uid(prefix) {
    return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function naturalCompare(a, b) {
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
  }

  function fileExtension(name) {
    var parts = String(name || "").split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
  }

  function isAudioFile(file) {
    return AUDIO_EXTENSIONS.indexOf(fileExtension(file.name)) >= 0;
  }

  function getRelativePath(file) {
    return file.webkitRelativePath || file.name;
  }

  function normalizeSlashes(value) {
    return String(value || "").replace(/\\/g, "/");
  }

  function getProjectRootPath(files) {
    if (!files || !files.length) return null;
    var first = files[0];
    if (!first.path || !first.webkitRelativePath) return null;

    var absolute = normalizeSlashes(first.path);
    var relative = normalizeSlashes(first.webkitRelativePath);
    var idx = absolute.lastIndexOf(relative);
    if (idx <= 0) return null;
    return absolute.slice(0, idx).replace(/\/$/, "");
  }

  function getNodeModules() {
    var req = null;
    if (global.cep_node && global.cep_node.require) req = global.cep_node.require;
    else if (typeof global.require === "function") req = global.require;
    if (!req) return null;

    try {
      return { fs: req("fs"), path: req("path") };
    } catch (e) {
      return null;
    }
  }

  function readDuration(file) {
    var AudioContextCtor = global.AudioContext || global.webkitAudioContext;
    if (!AudioContextCtor) return Promise.resolve(null);

    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onerror = function () { resolve(null); };
      reader.onload = function () {
        try {
          var ctx = new AudioContextCtor();
          ctx.decodeAudioData(reader.result, function (buffer) {
            var duration = buffer && buffer.duration ? Number(buffer.duration.toFixed(3)) : null;
            if (ctx.close) ctx.close();
            resolve(duration);
          }, function () {
            if (ctx.close) ctx.close();
            resolve(null);
          });
        } catch (e) {
          resolve(null);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function createExportPreset(presetId) {
    return clone(EXPORT_PRESETS[presetId] || EXPORT_PRESETS.game_wav_48k_24_mono);
  }

  function getAllExportPresets() {
    var out = [];
    for (var key in EXPORT_PRESETS) {
      if (Object.prototype.hasOwnProperty.call(EXPORT_PRESETS, key)) out.push(clone(EXPORT_PRESETS[key]));
    }
    return out;
  }

  function describePreset(preset) {
    if (!preset) return "Preset yok.";
    var parts = [];
    parts.push(preset.name);
    parts.push((preset.format || "?").toUpperCase());
    if (preset.sampleRate) parts.push((preset.sampleRate / 1000) + "kHz");
    if (preset.bitDepth) parts.push(preset.bitDepth + "-bit" + (preset.bitDepthMode === "float" ? " float" : ""));
    if (preset.bitRateKbps) parts.push(preset.bitRateKbps + "kbps");
    if (typeof preset.quality !== "undefined") parts.push("Q" + preset.quality);
    if (preset.channels) parts.push(preset.channels);
    if (preset.normalize) parts.push("normalize açık");
    return parts.join(" · ");
  }

  async function buildProjectFromFiles(filesInput, options, onProgress) {
    var files = Array.prototype.slice.call(filesInput || []).filter(isAudioFile);
    files.sort(function (a, b) { return naturalCompare(getRelativePath(a), getRelativePath(b)); });

    var gapSeconds = Number(options.gapSeconds || 6);
    var cursor = 0;
    var lines = [];

    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      if (onProgress) onProgress("Süre okunuyor: " + f.name + " (" + (i + 1) + "/" + files.length + ")");
      var duration = await readDuration(f);
      var start = Number(cursor.toFixed(3));
      var end = duration !== null ? Number((start + duration).toFixed(3)) : null;

      lines.push({
        lineId: "line_" + String(i + 1).padStart(4, "0"),
        originalName: f.name,
        originalRelativePath: getRelativePath(f),
        originalAbsolutePath: f.path || null,
        originalDuration: duration,
        timelineStart: start,
        timelineEnd: end,
        exportName: f.name,
        exportExtension: fileExtension(f.name),
        exportStrategy: "original_name_with_preset_extension",
        takes: [],
        selectedTakeId: null,
        notes: ""
      });

      cursor = end !== null ? end + gapSeconds : cursor + gapSeconds;
    }

    return {
      schemaVersion: 2,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: uid("project"),
      projectName: options.projectName || "Game_Dub_Project",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gapSeconds: gapSeconds,
      projectRootPath: getProjectRootPath(files),
      folders: {
        original: "Audio/Original",
        takes: "Audio/Takes",
        mix: "Audio/Mix",
        exports: "Audio/Exports",
        metadata: ".audub"
      },
      exportPreset: createExportPreset(options.exportPresetId),
      availableExportPresets: getAllExportPresets(),
      exportPolicy: {
        userChoosesOnlyPreset: true,
        preserveOriginalBaseName: true,
        usePresetExtension: true,
        rangeSource: "selected_take_full_duration",
        keepLongRecordings: true,
        neverTrimToOriginalDuration: true,
        batchMode: "one_file_per_line"
      },
      lines: lines,
      mixMaps: []
    };
  }


  function ensureProjectFolders(rootPath, modules) {
    var dirs = [".audub", "Audio", "Audio/Original", "Audio/Takes", "Audio/Mix", "Audio/Exports"];
    for (var i = 0; i < dirs.length; i++) {
      var dirPath = modules.path.join(rootPath, dirs[i]);
      if (!modules.fs.existsSync(dirPath)) modules.fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  function loadProjectFromFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error("project.json okunamadı.")); };
      reader.onload = function () {
        try {
          var project = JSON.parse(String(reader.result || ""));
          if (!project || !project.lines || typeof project.lines.length === "undefined") {
            reject(new Error("Bu dosya geçerli bir AU Dub project.json değil."));
            return;
          }
          project.updatedAt = project.updatedAt || new Date().toISOString();
          project.exportPreset = project.exportPreset || createExportPreset("game_wav_48k_24_mono");
          project.availableExportPresets = project.availableExportPresets || getAllExportPresets();
          project.exportPolicy = project.exportPolicy || {
            userChoosesOnlyPreset: true,
            preserveOriginalBaseName: true,
            usePresetExtension: true,
            rangeSource: "selected_take_full_duration",
            keepLongRecordings: true,
            neverTrimToOriginalDuration: true,
            batchMode: "one_file_per_line"
          };
          resolve(project);
        } catch (e) {
          reject(new Error("JSON parse hatası: " + e.message));
        }
      };
      reader.readAsText(file, "utf-8");
    });
  }

  // --- Path tabanlı okuma (CEP native dialog ile seçilen dosyalar için) ---

  // Diskteki bir ses dosyasının süresini Node ile okuyup Web Audio ile çözer.
  function readDurationFromPath(filePath, modules) {
    return new Promise(function (resolve) {
      try {
        var AudioCtor = global.AudioContext || global.webkitAudioContext;
        if (!AudioCtor) { resolve(null); return; }
        var buf = modules.fs.readFileSync(filePath);
        var ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        var ctx = new AudioCtor();
        ctx.decodeAudioData(ab, function (b) {
          var d = b && b.duration ? Number(b.duration.toFixed(3)) : null;
          if (ctx.close) ctx.close();
          resolve(d);
        }, function () { if (ctx.close) ctx.close(); resolve(null); });
      } catch (e) { resolve(null); }
    });
  }

  function projectEnvelope(lines, options, projectRootPath, gapSeconds) {
    return {
      schemaVersion: 2,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: uid("project"),
      projectName: options.projectName || "Game_Dub_Project",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gapSeconds: gapSeconds,
      projectRootPath: projectRootPath,
      folders: { original: "Audio/Original", takes: "Audio/Takes", mix: "Audio/Mix", exports: "Audio/Exports", metadata: ".audub" },
      exportPreset: createExportPreset(options.exportPresetId),
      availableExportPresets: getAllExportPresets(),
      exportPolicy: {
        userChoosesOnlyPreset: true, preserveOriginalBaseName: true, usePresetExtension: true,
        rangeSource: "selected_take_full_duration", keepLongRecordings: true,
        neverTrimToOriginalDuration: true, batchMode: "one_file_per_line"
      },
      lines: lines,
      mixMaps: []
    };
  }

  // CEP native dialog ile seçilen KLASÖRDEN proje üretir (HTML file input yerine).
  // Eski davranışla uyumlu: projectRootPath = seçilen klasörün ÜST klasörü; relative = klasörAdı/dosya.
  async function buildProjectFromFolder(folderPath, options, onProgress) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js erişimi yok (CEP --enable-nodejs).");
    if (!folderPath) throw new Error("Klasör seçilmedi.");
    var rootDir = String(folderPath).replace(/[\\/]+$/, "");
    var folderName = modules.path.basename(rootDir);
    var projectRoot = modules.path.dirname(rootDir);

    var found = walkAudioFiles(rootDir, modules, []);
    found.sort(function (a, b) { return naturalCompare(a.path, b.path); });
    if (!found.length) throw new Error("Seçilen klasörde ses dosyası bulunamadı: " + rootDir);

    var gapSeconds = Number(options.gapSeconds || 6);
    var cursor = 0;
    var lines = [];
    for (var i = 0; i < found.length; i++) {
      var f = found[i];
      if (onProgress) onProgress("Süre okunuyor: " + f.name + " (" + (i + 1) + "/" + found.length + ")");
      var duration = await readDurationFromPath(f.path, modules);
      var start = Number(cursor.toFixed(3));
      var end = duration !== null ? Number((start + duration).toFixed(3)) : null;
      var rel = folderName + "/" + normalizeSlashes(modules.path.relative(rootDir, f.path));
      lines.push({
        lineId: "line_" + String(i + 1).padStart(4, "0"),
        originalName: f.name,
        originalRelativePath: rel,
        originalAbsolutePath: normalizeSlashes(f.path),
        originalDuration: duration,
        timelineStart: start,
        timelineEnd: end,
        exportName: f.name,
        exportExtension: fileExtension(f.name),
        exportStrategy: "original_name_with_preset_extension",
        takes: [],
        selectedTakeId: null,
        notes: ""
      });
      cursor = end !== null ? end + gapSeconds : cursor + gapSeconds;
    }
    return projectEnvelope(lines, options, normalizeSlashes(projectRoot), gapSeconds);
  }

  // CEP native dosya dialog'u ile seçilen DOSYA YOLLARINDAN proje üretir.
  // (Klasör dialog'u Windows'ta eski "Klasöre Gözat"ı açtığı için çoklu dosya seçimi kullanılır.)
  // projectRootPath = seçilen ilk dosyanın klasörü; .audub/Audio orada oluşur.
  async function buildProjectFromPaths(paths, options, onProgress) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js erişimi yok (CEP --enable-nodejs).");
    var list = (paths || []).filter(function (p) { return AUDIO_EXTENSIONS.indexOf(fileExtension(p)) >= 0; });
    if (!list.length) throw new Error("Ses dosyası seçilmedi.");
    list = list.slice().sort(function (a, b) { return naturalCompare(a, b); });

    var projectRoot = normalizeSlashes(modules.path.dirname(list[0]));
    var gapSeconds = Number(options.gapSeconds || 6);
    var cursor = 0;
    var lines = [];
    for (var i = 0; i < list.length; i++) {
      var full = list[i];
      var name = modules.path.basename(full);
      if (onProgress) onProgress("Süre okunuyor: " + name + " (" + (i + 1) + "/" + list.length + ")");
      var duration = await readDurationFromPath(full, modules);
      var start = Number(cursor.toFixed(3));
      var end = duration !== null ? Number((start + duration).toFixed(3)) : null;
      var rel = normalizeSlashes(modules.path.relative(projectRoot, full)) || name;
      lines.push({
        lineId: "line_" + String(i + 1).padStart(4, "0"),
        originalName: name,
        originalRelativePath: rel,
        originalAbsolutePath: normalizeSlashes(full),
        originalDuration: duration,
        timelineStart: start,
        timelineEnd: end,
        exportName: name,
        exportExtension: fileExtension(name),
        exportStrategy: "original_name_with_preset_extension",
        takes: [],
        selectedTakeId: null,
        notes: ""
      });
      cursor = end !== null ? end + gapSeconds : cursor + gapSeconds;
    }
    return projectEnvelope(lines, options, projectRoot, gapSeconds);
  }

  // project.json YOKKEN: mixçi Audition'da sesleri dizer, panel bir track'in clip
  // pozisyonlarını okuyup buradan proje kurar. Her clip bir replik olur:
  // clip adı = çıktı adı, clip start/bitiş = kesim sınırı (mixStart/mixEnd).
  // options.rootDir: çıktıların/proje dosyasının yazılacağı klasör (zorunlu).
  function buildProjectFromLiveClips(clips, options) {
    options = options || {};
    var rootDir = options.rootDir ? normalizeSlashes(options.rootDir) : "";
    if (!rootDir) throw new Error("Çıktı klasörü (rootDir) gerekli.");
    var src = (clips || []).filter(function (c) { return c && (typeof c.durationSeconds === "number"); });
    if (!src.length) throw new Error("Audition'da okunacak clip bulunamadı.");
    var sorted = src.slice().sort(function (a, b) { return (a.startSeconds || 0) - (b.startSeconds || 0); });

    var gapSeconds = Number(options.gapSeconds || 6);
    var usedNames = {};
    var lines = [];
    for (var i = 0; i < sorted.length; i++) {
      var c = sorted[i];
      var startS = typeof c.startSeconds === "number" ? c.startSeconds : 0;
      var durS = typeof c.durationSeconds === "number" ? c.durationSeconds : 0;
      var endS = Number((startS + durS).toFixed(3));
      var lineId = "line_" + String(i + 1).padStart(4, "0");
      var nm = (c.name && String(c.name).trim()) ? String(c.name).trim() : lineId;
      var key = nm.toLowerCase();
      if (usedNames[key]) { var k = 2; while (usedNames[key + "_" + k]) k++; nm = nm + "_" + k; key = nm.toLowerCase(); }
      usedNames[key] = true;
      var take = {
        takeId: uid("livetake"),
        lineId: lineId,
        originalLineName: nm,
        fileName: null,
        originalTakeName: nm,
        fileRelativePath: null,
        fileAbsolutePath: null,
        duration: Number(durS.toFixed(3)),
        recordStart: Number(startS.toFixed(3)),
        recordEnd: endS,
        mixStart: Number(startS.toFixed(3)),
        mixEnd: endS,
        linkedAt: new Date().toISOString(),
        matchMode: "mixer_positions",
        sourceKind: "live_recording",
        isSelected: true,
        preserveRecordedTail: true,
        notes: "Mixçi Audition'dan pozisyon okudu (project.json yok)."
      };
      lines.push({
        lineId: lineId,
        originalName: nm,
        originalRelativePath: null,
        originalAbsolutePath: null,
        originalDuration: Number(durS.toFixed(3)),
        timelineStart: Number(startS.toFixed(3)),
        timelineEnd: endS,
        exportName: nm,
        exportExtension: "wav",
        exportStrategy: "clip_name",
        takes: [take],
        selectedTakeId: take.takeId,
        notes: ""
      });
    }
    return projectEnvelope(lines, options, rootDir, gapSeconds);
  }

  // project.json YOKKEN, mixçi tarafı: track 1 = orijinaller (isimli), track 2 = kayıtlar.
  // Her orijinalin altındaki (pozisyon olarak) track 2 kayıtları o repliğe ait kabul edilir.
  // Delete-silence ile bir replik 3 parçaya bölünmüşse, o parçalar segment olarak saklanır ve
  // bölme aşamasında boşluksuz birleştirilip orijinalin adıyla export edilir.
  function buildProjectFromMatchedTracks(track1Clips, track2Clips, options) {
    options = options || {};
    var rootDir = options.rootDir ? normalizeSlashes(options.rootDir) : "";
    if (!rootDir) throw new Error("Çıktı klasörü (rootDir) gerekli.");
    function num(c) { return c && typeof c.startSeconds === "number"; }
    var origs = (track1Clips || []).filter(num).slice().sort(function (a, b) { return a.startSeconds - b.startSeconds; });
    var recs = (track2Clips || []).filter(num).slice().sort(function (a, b) { return a.startSeconds - b.startSeconds; });
    if (!origs.length) throw new Error("Track 1'de (orijinaller) clip yok.");
    if (!recs.length) throw new Error("Track 2'de (kayıtlar) clip yok.");

    var gapSeconds = Number(options.gapSeconds || 6);
    var usedNames = {};
    var lines = [];
    var warnings = [];
    var matchedRecordings = 0;
    var multiCount = 0;
    var lineIdx = 0;
    for (var i = 0; i < origs.length; i++) {
      var o = origs[i];
      var regionStart = o.startSeconds - 0.0005;
      var regionEnd = (i + 1 < origs.length) ? (origs[i + 1].startSeconds - 0.0005) : Infinity;
      // Bu orijinalin altındaki (başlangıcı bu bölgede olan) kayıt parçaları.
      var group = [];
      for (var j = 0; j < recs.length; j++) {
        var rs = recs[j].startSeconds;
        if (rs >= regionStart && rs < regionEnd) group.push(recs[j]);
      }
      if (!group.length) { warnings.push("Kaydı yok: " + (o.name || ("orijinal " + (i + 1)))); continue; }

      group.sort(function (a, b) { return a.startSeconds - b.startSeconds; });
      var segments = [];
      var mergedStart = group[0].startSeconds;
      var mergedEnd = group[0].startSeconds + (group[0].durationSeconds || 0);
      for (var g = 0; g < group.length; g++) {
        var gs = Number(group[g].startSeconds.toFixed(3));
        var gd = Number((group[g].durationSeconds || 0).toFixed(3));
        if (gd > 0) segments.push({ start: gs, dur: gd });
        var ge = group[g].startSeconds + (group[g].durationSeconds || 0);
        if (group[g].startSeconds < mergedStart) mergedStart = group[g].startSeconds;
        if (ge > mergedEnd) mergedEnd = ge;
      }
      matchedRecordings += group.length;
      if (group.length > 1) multiCount++;
      mergedStart = Number(mergedStart.toFixed(3));
      mergedEnd = Number(mergedEnd.toFixed(3));

      lineIdx++;
      var lineId = "line_" + String(lineIdx).padStart(4, "0");
      var nm = (o.name && String(o.name).trim()) ? String(o.name).trim() : lineId;
      var key = nm.toLowerCase();
      if (usedNames[key]) { var k = 2; while (usedNames[key + "_" + k]) k++; nm = nm + "_" + k; key = nm.toLowerCase(); }
      usedNames[key] = true;

      // Süre = tüm bölge (parçalar arası boşluklar DAHİL, korunur).
      var spanDur = Number((mergedEnd - mergedStart).toFixed(3));

      var take = {
        takeId: uid("livetake"),
        lineId: lineId,
        originalLineName: nm,
        fileName: null,
        originalTakeName: nm,
        fileRelativePath: null,
        fileAbsolutePath: null,
        duration: spanDur,
        recordStart: mergedStart,
        recordEnd: mergedEnd,
        mixStart: mergedStart,
        mixEnd: mergedEnd,
        segments: segments,
        clipCount: group.length,
        linkedAt: new Date().toISOString(),
        matchMode: "mixer_two_track",
        sourceKind: "live_recording",
        isSelected: true,
        preserveRecordedTail: true,
        notes: group.length > 1 ? (group.length + " parça tek bölge olarak kesilir; aralarındaki boşluklar korunur.") : "Tek parça."
      };
      lines.push({
        lineId: lineId,
        originalName: nm,
        originalRelativePath: null,
        originalAbsolutePath: null,
        originalDuration: spanDur,
        timelineStart: mergedStart,
        timelineEnd: mergedEnd,
        exportName: nm,
        exportExtension: "wav",
        exportStrategy: "original_name",
        takes: [take],
        selectedTakeId: take.takeId,
        notes: ""
      });
    }
    if (!lines.length) throw new Error("Hiçbir orijinalin altında kayıt bulunamadı. Track 1/2 numaralarını kontrol et.");

    var env = projectEnvelope(lines, options, rootDir, gapSeconds);
    env.matchInfo = { originals: origs.length, recordings: recs.length, matchedLines: lines.length, matchedRecordings: matchedRecordings, multiClipLines: multiCount, warnings: warnings };
    return env;
  }

  // CEP native dialog ile seçilen project.json yolundan proje yükler.
  function loadProjectFromPath(filePath) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js erişimi yok (CEP --enable-nodejs).");
    if (!filePath) throw new Error("Dosya seçilmedi.");
    var txt = modules.fs.readFileSync(filePath, "utf8");
    var project = JSON.parse(String(txt || ""));
    if (!project || !project.lines || typeof project.lines.length === "undefined") {
      throw new Error("Bu dosya geçerli bir AU Dub project.json değil.");
    }
    project.updatedAt = project.updatedAt || new Date().toISOString();
    project.exportPreset = project.exportPreset || createExportPreset("game_wav_48k_24_mono");
    project.availableExportPresets = project.availableExportPresets || getAllExportPresets();
    project.exportPolicy = project.exportPolicy || {
      userChoosesOnlyPreset: true, preserveOriginalBaseName: true, usePresetExtension: true,
      rangeSource: "selected_take_full_duration", keepLongRecordings: true,
      neverTrimToOriginalDuration: true, batchMode: "one_file_per_line"
    };
    return project;
  }

  function safeFileName(name) {
    return String(name || "audio.wav").replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
  }

  function baseNameNoExt(name) {
    var clean = safeFileName(name);
    var idx = clean.lastIndexOf(".");
    return idx > 0 ? clean.slice(0, idx) : clean;
  }

  function extWithDot(name) {
    var e = fileExtension(name);
    return e ? "." + e : "";
  }

  function uniqueName(name, used) {
    var clean = safeFileName(name);
    var candidate = clean;
    var base = baseNameNoExt(clean);
    var ext = extWithDot(clean);
    var i = 2;
    while (used[candidate.toLowerCase()]) {
      candidate = base + "_" + i + ext;
      i++;
    }
    used[candidate.toLowerCase()] = true;
    return candidate;
  }

  function timestampForFolder() {
    var d = new Date();
    function pad(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "_" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
  }

  function packageProject(project, options) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. Paketleme için CEP içinde --enable-nodejs çalışmalı.");
    if (!project || !project.lines) throw new Error("Paketlenecek proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı. Önce klasör seçerek proje oluşturun veya project.json içinde projectRootPath olduğundan emin olun.");

    options = options || {};
    // .sesx verildiyse paketi onun KLASÖRÜNDE oluştur (kullanıcı isteği).
    var sesxPath = options.sesxPath && String(options.sesxPath).trim() ? String(options.sesxPath) : null;
    var baseDir = project.projectRootPath;
    if (sesxPath) {
      try { var d = modules.path.dirname(sesxPath); if (d) baseDir = d; } catch (eDir) {}
    } else if (options.baseDir) {
      baseDir = options.baseDir;
    }

    var packageRoot = modules.path.join(baseDir, (project.projectName || "AU_Dub_Project") + "_AU_Dub_Package_" + timestampForFolder());
    if (!modules.fs.existsSync(packageRoot)) modules.fs.mkdirSync(packageRoot, { recursive: true });
    ensureProjectFolders(packageRoot, modules);

    var packaged = clone(project);
    packaged.appVersion = "1.0.0";
    packaged.packageCreatedAt = new Date().toISOString();
    packaged.packageRootPath = packageRoot;
    packaged.projectRootPath = packageRoot;
    packaged.folders = packaged.folders || {};
    packaged.folders.original = "Audio/Original";
    packaged.folders.takes = "Audio/Takes";
    packaged.folders.mix = "Audio/Mix";
    packaged.folders.exports = "Audio/Exports";
    packaged.folders.metadata = ".audub";

    var usedNames = {};
    var usedTakeNames = {};
    var copied = 0;
    var copiedTakes = 0;
    var missing = [];
    var missingTakes = [];

    for (var i = 0; i < packaged.lines.length; i++) {
      var line = packaged.lines[i];
      var src = line.originalAbsolutePath;
      if (!src && project.projectRootPath && line.originalRelativePath) {
        src = modules.path.join(project.projectRootPath, line.originalRelativePath);
      }
      var outName = uniqueName(line.originalName || (line.lineId + ".wav"), usedNames);
      var dest = modules.path.join(packageRoot, "Audio", "Original", outName);
      try {
        if (src && modules.fs.existsSync(src)) {
          modules.fs.copyFileSync(src, dest);
          copied++;
          line.originalName = outName;
          line.originalRelativePath = "Audio/Original/" + outName;
          line.originalAbsolutePath = dest;
          line.exportName = line.exportName || outName;
        } else {
          missing.push(line.originalName || line.lineId);
        }
      } catch (e) {
        missing.push((line.originalName || line.lineId) + " (" + e.message + ")");
      }
    }

    for (var ti = 0; ti < packaged.lines.length; ti++) {
      var takeLine = packaged.lines[ti];
      if (!takeLine.takes || !takeLine.takes.length) continue;
      for (var tj = 0; tj < takeLine.takes.length; tj++) {
        var take = takeLine.takes[tj];
        var takeSrc = take.fileAbsolutePath;
        if (!takeSrc && project.projectRootPath && take.fileRelativePath) {
          takeSrc = modules.path.join(project.projectRootPath, take.fileRelativePath);
        }
        var takeOutName = uniqueName(take.fileName || (takeLine.lineId + "_take.wav"), usedTakeNames);
        var takeDest = modules.path.join(packageRoot, "Audio", "Takes", takeOutName);
        try {
          if (takeSrc && modules.fs.existsSync(takeSrc)) {
            modules.fs.copyFileSync(takeSrc, takeDest);
            copiedTakes++;
            take.fileName = takeOutName;
            take.fileRelativePath = "Audio/Takes/" + takeOutName;
            take.fileAbsolutePath = takeDest;
          } else {
            missingTakes.push((takeLine.originalName || takeLine.lineId) + " → " + (take.fileName || take.takeId));
          }
        } catch (e) {
          missingTakes.push((takeLine.originalName || takeLine.lineId) + " → " + (take.fileName || take.takeId) + " (" + e.message + ")");
        }
      }
    }


    packaged.updatedAt = new Date().toISOString();
    var jsonPath = modules.path.join(packageRoot, ".audub", "project.json");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(packaged, null, 2), "utf8");

    var presetPath = modules.path.join(packageRoot, ".audub", "export-presets.json");
    modules.fs.writeFileSync(presetPath, JSON.stringify({ activePreset: packaged.exportPreset, presets: getAllExportPresets() }, null, 2), "utf8");

    var readme = [];
    readme.push("AU Dub Panel Paylaşım Paketi");
    readme.push("================================");
    readme.push("");
    readme.push("Bu klasörü ekip arkadaşına komple gönderin.");
    readme.push("Audition projesi hazır olduğunda .sesx dosyasını da bu klasörün içine koyun.");
    readme.push("Panelde project.json yüklemek için: .audub/project.json dosyasını seçin.");
    readme.push("");
    readme.push("Kopyalanan orijinal ses sayısı: " + copied);
    readme.push("Kopyalanan take/miks dosyası sayısı: " + copiedTakes);
    if (missing.length) {
      readme.push("Eksik/kopyalanamayan orijinal dosyalar:");
      for (var m = 0; m < missing.length; m++) readme.push("- " + missing[m]);
    }
    if (missingTakes.length) {
      readme.push("Eksik/kopyalanamayan take dosyaları:");
      for (var mt = 0; mt < missingTakes.length; mt++) readme.push("- " + missingTakes[mt]);
    }
    modules.fs.writeFileSync(modules.path.join(packageRoot, "README_AU_DUB.txt"), readme.join("\r\n"), "utf8");

    // .sesx dosyasını paketin içine kopyala (mixçi aynı session'ı açabilsin).
    var sesxCopied = null;
    var sesxMissing = false;
    var sessionMediaCount = 0;
    if (sesxPath) {
      try {
        if (modules.fs.existsSync(sesxPath)) {
          var sesxName = modules.path.basename(sesxPath);
          var sesxDest = modules.path.join(packageRoot, sesxName);
          modules.fs.copyFileSync(sesxPath, sesxDest);
          sesxCopied = normalizeSlashes(sesxDest);
        } else {
          sesxMissing = true;
        }
      } catch (eSesx) { sesxMissing = true; }

      // Session medyasını .sesx'in YANINA, ORİJİNAL göreli yapısıyla kopyala.
      // Audition .sesx'i açarken kayıt/import dosyalarını kendisine göre aynı göreli
      // yolda arar (ör. <session>_Recorded/...). Bu yüzden packageRoot kökü, sesxDir'i
      // birebir aynalar; böylece kopyalanan .sesx medyayı bulur.
      if (options.includeSessionMedia !== false) {
        try {
          var sesxDir = modules.path.dirname(sesxPath);
          var pkgPrefix = normalizeSlashes(packageRoot).toLowerCase();
          var mediaFiles = walkAudioFiles(sesxDir, modules, []);
          for (var mf = 0; mf < mediaFiles.length; mf++) {
            var mp = mediaFiles[mf].path;
            var mpNorm = normalizeSlashes(mp).toLowerCase();
            if (mpNorm.indexOf(pkgPrefix) === 0) continue;          // paketin kendi içi
            if (mpNorm.indexOf("_au_dub_package_") >= 0) continue;  // eski paketler
            var relMedia = normalizeSlashes(modules.path.relative(sesxDir, mp));
            var relLower = relMedia.toLowerCase();
            // Paketin kendi rezerve klasörleriyle çakışmayı önle.
            if (relLower.indexOf("audio/") === 0 || relLower.indexOf(".audub/") === 0) continue;
            var mDest = modules.path.join(packageRoot, relMedia);
            try {
              var mDestDir = modules.path.dirname(mDest);
              if (!modules.fs.existsSync(mDestDir)) modules.fs.mkdirSync(mDestDir, { recursive: true });
              if (!modules.fs.existsSync(mDest)) modules.fs.copyFileSync(mp, mDest);
              sessionMediaCount++;
            } catch (eCopyM) {}
          }
        } catch (eMedia) {}
      }
    }

    var packageVerify = null;
    var packageVerifyError = null;
    try {
      packageVerify = verifyPackageProject(packageRoot);
    } catch (verifyErr) {
      packageVerifyError = verifyErr && verifyErr.message ? verifyErr.message : String(verifyErr);
    }

    return {
      packageRoot: normalizeSlashes(packageRoot),
      packageRootName: modules.path.basename(packageRoot),
      baseDir: normalizeSlashes(baseDir),
      jsonPath: normalizeSlashes(jsonPath),
      copied: copied,
      copiedTakes: copiedTakes,
      missing: missing,
      missingTakes: missingTakes,
      sesxCopied: sesxCopied,
      sesxMissing: sesxMissing,
      sessionMediaCount: sessionMediaCount,
      packageVerify: packageVerify,
      packageVerifyError: packageVerifyError
    };
  }

  // Bir klasörü PowerShell Compress-Archive ile zip'ler. zip, klasörün yanına (kardeş) yazılır.
  function zipFolder(folderPath, onOutput) {
    return new Promise(function (resolve, reject) {
      var modules = getNodeModules();
      if (!modules) { reject(new Error("Node.js erişimi yok.")); return; }
      var cp;
      try { cp = (global.cep_node && global.cep_node.require ? global.cep_node.require : global.require)("child_process"); }
      catch (e) { reject(new Error("child_process yüklenemedi: " + e.message)); return; }

      var zipPath = folderPath.replace(/[\\/]+$/, "") + ".zip";
      try { if (modules.fs.existsSync(zipPath)) modules.fs.unlinkSync(zipPath); } catch (eDel) {}

      var psCmd = "Compress-Archive -LiteralPath " + psQuote(folderPath) + " -DestinationPath " + psQuote(zipPath) + " -Force";
      var child;
      try {
        child = cp.spawn("powershell.exe", ["-ExecutionPolicy", "Bypass", "-NoProfile", "-Command", psCmd], { windowsHide: true });
      } catch (spawnErr) { reject(new Error("PowerShell başlatılamadı: " + spawnErr.message)); return; }
      var errbuf = "";
      if (child.stdout && onOutput) child.stdout.on("data", function (d) { onOutput(String(d)); });
      if (child.stderr) child.stderr.on("data", function (d) { errbuf += String(d); if (onOutput) onOutput(String(d)); });
      child.on("error", function (err) { reject(err); });
      child.on("close", function (code) {
        if (code === 0 && modules.fs.existsSync(zipPath)) {
          var size = 0; try { size = modules.fs.statSync(zipPath).size; } catch (eS) {}
          resolve({ zipPath: normalizeSlashes(zipPath), dir: normalizeSlashes(modules.path.dirname(zipPath)), sizeBytes: size });
        } else {
          reject(new Error("Zip oluşturulamadı (kod " + code + "). " + errbuf));
        }
      });
    });
  }

  // Yeni kaydedilen session dosyası değişmeyi bırakmadan kopyalama/zip adımına geçme.
  function waitForFileStable(filePath, options) {
    options = options || {};
    return new Promise(function (resolve, reject) {
      var modules = getNodeModules();
      if (!modules) { reject(new Error("Node.js erişimi yok.")); return; }

      var target = filePath && String(filePath).trim();
      if (!target) { reject(new Error("Beklenecek dosya yolu boş.")); return; }

      var intervalMs = Math.max(100, Number(options.intervalMs || 250));
      var stableMs = Math.max(intervalMs, Number(options.stableMs || 2500));
      var timeoutMs = Math.max(stableMs + intervalMs, Number(options.timeoutMs || 60000));
      var startedAt = Date.now();
      var lastSignature = null;
      var lastChangedAt = 0;
      var polls = 0;

      function statSignature(st) {
        var mtime = typeof st.mtimeMs === "number" ? st.mtimeMs : (st.mtime ? st.mtime.getTime() : 0);
        return String(st.size) + ":" + String(mtime);
      }

      function poll() {
        polls++;
        var now = Date.now();
        var st = null;
        try {
          st = modules.fs.statSync(target);
          if (st && typeof st.isFile === "function" && !st.isFile()) throw new Error("Yol dosya değil.");
        } catch (eStat) {
          if (now - startedAt >= timeoutMs) {
            reject(new Error("Dosya hazır olmadı: " + eStat.message));
          } else {
            setTimeout(poll, intervalMs);
          }
          return;
        }

        var sig = statSignature(st);
        if (sig !== lastSignature) {
          lastSignature = sig;
          lastChangedAt = now;
        }

        if (st.size > 0 && now - lastChangedAt >= stableMs) {
          resolve({
            path: normalizeSlashes(target),
            sizeBytes: st.size,
            mtimeMs: typeof st.mtimeMs === "number" ? st.mtimeMs : (st.mtime ? st.mtime.getTime() : 0),
            stableMs: now - lastChangedAt,
            polls: polls
          });
          return;
        }

        if (now - startedAt >= timeoutMs) {
          reject(new Error("Dosya yazımı stabil hale gelmedi: " + normalizeSlashes(target)));
          return;
        }
        setTimeout(poll, intervalMs);
      }

      poll();
    });
  }

  // Modern (Explorer tarzı) klasör seçici. Windows'un eski "Klasöre Gözat" yerine,
  // WinForms OpenFileDialog'u klasör seçer moda alıp PowerShell ile gösterir; seçilen
  // dosyanın klasörünü döndürür. (cep.fs klasör dialog'u eski stilde olduğu için.)
  function pickFolderDialog(title, initial) {
    return new Promise(function (resolve) {
      var req = (global.cep_node && global.cep_node.require) ? global.cep_node.require : global.require;
      var cp, os, modules = getNodeModules();
      try { cp = req("child_process"); } catch (e) { resolve(null); return; }
      try { os = req("os"); } catch (e) { os = null; }
      if (!modules) { resolve(null); return; }
      // Sonucu UTF-8 ile geçici dosyaya yaz, Node UTF-8 okusun (Türkçe karakter korunur).
      var tmpDir = (os && os.tmpdir) ? os.tmpdir() : modules.path.dirname(String(initial || "."));
      var tmpFile = modules.path.join(tmpDir, "audub_pick_" + Date.now() + "_" + Math.floor(Math.random() * 1e6) + ".txt");
      function q(s) { return "'" + String(s || "").replace(/'/g, "''") + "'"; }
      var script =
        "Add-Type -AssemblyName System.Windows.Forms | Out-Null; " +
        "$d = New-Object System.Windows.Forms.OpenFileDialog; " +
        "$d.Title = " + q(title || "Klasör seç") + "; " +
        "$d.CheckFileExists = $false; $d.CheckPathExists = $true; $d.ValidateNames = $false; " +
        "$d.FileName = 'Bu klasoru sec'; $d.Filter = 'Klasor|*.audub_pick'; " +
        (initial ? ("try { $d.InitialDirectory = " + q(initial) + " } catch {}; ") : "") +
        "if ($d.ShowDialog() -eq 'OK') { [System.IO.File]::WriteAllText(" + q(tmpFile) + ", [System.IO.Path]::GetDirectoryName($d.FileName), (New-Object System.Text.UTF8Encoding($false))) }";
      var child;
      try {
        child = cp.spawn("powershell.exe", ["-STA", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script], { windowsHide: false });
      } catch (e2) { resolve(null); return; }
      child.on("error", function () { resolve(null); });
      child.on("close", function () {
        var p = "";
        try {
          if (modules.fs.existsSync(tmpFile)) { p = modules.fs.readFileSync(tmpFile, "utf8"); modules.fs.unlinkSync(tmpFile); }
        } catch (e3) {}
        p = String(p || "").trim();
        resolve(p ? normalizeSlashes(p) : null);
      });
    });
  }

  // Modern TEK DOSYA seçici (klasör seçicinin dosya kardeşi). Sonucu UTF-8 geçici
  // dosyaya yazıp Node UTF-8 okur (Türkçe karakter korunur). filter: PowerShell
  // OpenFileDialog filtresi, örn "JSON|*.json|Tümü|*.*".
  function pickFileDialog(title, filter, initial) {
    return new Promise(function (resolve) {
      var req = (global.cep_node && global.cep_node.require) ? global.cep_node.require : global.require;
      var cp, os, modules = getNodeModules();
      try { cp = req("child_process"); } catch (e) { resolve(null); return; }
      try { os = req("os"); } catch (e) { os = null; }
      if (!modules) { resolve(null); return; }
      var tmpDir = (os && os.tmpdir) ? os.tmpdir() : modules.path.dirname(String(initial || "."));
      var tmpFile = modules.path.join(tmpDir, "audub_pickfile_" + Date.now() + "_" + Math.floor(Math.random() * 1e6) + ".txt");
      function q(s) { return "'" + String(s || "").replace(/'/g, "''") + "'"; }
      var script =
        "Add-Type -AssemblyName System.Windows.Forms | Out-Null; " +
        "$d = New-Object System.Windows.Forms.OpenFileDialog; " +
        "$d.Title = " + q(title || "Dosya seç") + "; " +
        "$d.Multiselect = $false; $d.CheckFileExists = $true; $d.CheckPathExists = $true; " +
        "$d.Filter = " + q(filter || "Tüm dosyalar|*.*") + "; " +
        (initial ? ("try { $d.InitialDirectory = " + q(initial) + " } catch {}; ") : "") +
        "if ($d.ShowDialog() -eq 'OK') { [System.IO.File]::WriteAllText(" + q(tmpFile) + ", $d.FileName, (New-Object System.Text.UTF8Encoding($false))) }";
      var child;
      try {
        child = cp.spawn("powershell.exe", ["-STA", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script], { windowsHide: false });
      } catch (e2) { resolve(null); return; }
      child.on("error", function () { resolve(null); });
      child.on("close", function () {
        var p = "";
        try {
          if (modules.fs.existsSync(tmpFile)) { p = modules.fs.readFileSync(tmpFile, "utf8"); modules.fs.unlinkSync(tmpFile); }
        } catch (e3) {}
        p = String(p || "").trim();
        resolve(p ? normalizeSlashes(p) : null);
      });
    });
  }

  // Verilen klasörü Windows Gezgini'nde açar.
  function revealFolder(folderPath) {
    try {
      var cp = (global.cep_node && global.cep_node.require ? global.cep_node.require : global.require)("child_process");
      var winPath = String(folderPath).replace(/\//g, "\\");
      cp.spawn("explorer.exe", [winPath], { windowsHide: false, detached: true });
      return true;
    } catch (e) { return false; }
  }

  function saveProject(project) {
    var modules = getNodeModules();
    if (!modules) {
      throw new Error("Node.js dosya yazma erişimi yok. CEP içinde --enable-nodejs açık olmalı. Geçici çözüm: JSON'u kopyalayıp elle kaydedin.");
    }
    if (!project.projectRootPath) {
      throw new Error("Proje kök yolu bulunamadı. Klasör seçiminin CEP içinde gerçek path verdiğinden emin olun.");
    }

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");

    project.updatedAt = new Date().toISOString();
    var jsonPath = modules.path.join(metadataDir, "project.json");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(project, null, 2), "utf8");

    var presetPath = modules.path.join(metadataDir, "export-presets.json");
    modules.fs.writeFileSync(presetPath, JSON.stringify({ activePreset: project.exportPreset, presets: getAllExportPresets() }, null, 2), "utf8");

    return normalizeSlashes(jsonPath);
  }


  function getSelectedTake(line) {
    if (!line || !line.takes || !line.takes.length || !line.selectedTakeId) return null;
    for (var i = 0; i < line.takes.length; i++) {
      if (line.takes[i].takeId === line.selectedTakeId) return line.takes[i];
    }
    return null;
  }

  function normalizeMatchName(name) {
    var b = baseNameNoExt(name).toLowerCase();
    b = b.replace(/\s+/g, "_");
    b = b.replace(/(__+|-+)/g, "_");
    b = b.replace(/(^|_)(take|tk|mix|mixed|final|rec|record|recording)(_|$)/g, "_");
    b = b.replace(/_v\d+$/g, "");
    b = b.replace(/_take\d+$/g, "");
    b = b.replace(/_tk\d+$/g, "");
    b = b.replace(/^_+|_+$/g, "");
    return b;
  }

  function chooseLineForTake(project, takeFile, mode, index, usedLineIds) {
    if (!project || !project.lines || !project.lines.length) return null;
    if (mode === "order") {
      return index < project.lines.length ? project.lines[index] : null;
    }

    var takeBase = normalizeMatchName(takeFile.name);
    var best = null;
    var bestScore = -1;
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      if (usedLineIds && usedLineIds[line.lineId]) continue;
      var lineBase = normalizeMatchName(line.originalName || line.exportName || line.lineId);
      var score = -1;
      if (takeBase === lineBase) score = 1000;
      else if (takeBase.indexOf(lineBase) >= 0 && lineBase.length >= 3) score = 500 + lineBase.length;
      else if (lineBase.indexOf(takeBase) >= 0 && takeBase.length >= 3) score = 400 + takeBase.length;
      if (score > bestScore) {
        bestScore = score;
        best = line;
      }
    }
    return bestScore >= 0 ? best : null;
  }

  function copyTakeFileIntoProject(project, file, line, modules) {
    var sourcePath = file.path || null;
    var relativePath = getRelativePath(file);
    var absolutePath = sourcePath;
    var fileName = safeFileName(file.name || (line.lineId + "_take.wav"));

    if (modules && project.projectRootPath && sourcePath && modules.fs.existsSync(sourcePath)) {
      ensureProjectFolders(project.projectRootPath, modules);
      var takeDir = modules.path.join(project.projectRootPath, "Audio", "Takes");
      var destBase = baseNameNoExt(line.originalName || line.lineId) + "__" + baseNameNoExt(fileName) + extWithDot(fileName);
      var used = {};
      try {
        var existing = modules.fs.readdirSync(takeDir);
        for (var e = 0; e < existing.length; e++) used[String(existing[e]).toLowerCase()] = true;
      } catch (ignore) {}
      var destName = uniqueName(destBase, used);
      var destPath = modules.path.join(takeDir, destName);
      try {
        if (normalizeSlashes(sourcePath) !== normalizeSlashes(destPath)) modules.fs.copyFileSync(sourcePath, destPath);
        fileName = destName;
        relativePath = "Audio/Takes/" + destName;
        absolutePath = destPath;
      } catch (e) {
        // Kopyalama başarısızsa yine de orijinal yolu referans olarak tutuyoruz.
      }
    }

    return { fileName: fileName, relativePath: normalizeSlashes(relativePath), absolutePath: absolutePath ? normalizeSlashes(absolutePath) : null };
  }


  function resolveExistingPath(project, relativePath, absolutePath, modules) {
    if (!modules) return { path: null, exists: false };
    var candidates = [];
    if (absolutePath) candidates.push(absolutePath);
    if (project && project.projectRootPath && relativePath) candidates.push(modules.path.join(project.projectRootPath, relativePath));
    for (var i = 0; i < candidates.length; i++) {
      var p = candidates[i];
      try {
        if (p && modules.fs.existsSync(p)) return { path: normalizeSlashes(p), exists: true };
      } catch (ignore) {}
    }
    return { path: candidates.length ? normalizeSlashes(candidates[0]) : null, exists: false };
  }

  function buildTakeReportRows(project) {
    var modules = getNodeModules();
    var rows = [];
    var stats = { total: 0, withTake: 0, missingTake: 0, missingFile: 0, zeroDuration: 0, longerThanOriginal: 0, problemFiles: [] };
    if (!project || !project.lines) return { rows: rows, stats: stats };
    stats.total = project.lines.length;
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var take = getSelectedTake(line);
      var status = "OK";
      var issue = "";
      var existsInfo = { path: "", exists: false };
      if (!take) {
        stats.missingTake++;
        status = "MISSING_TAKE";
        issue = "Bu replik için seçili take yok.";
        stats.problemFiles.push(line.lineId + ":" + (line.originalName || ""));
      } else {
        stats.withTake++;
        existsInfo = resolveExistingPath(project, take.fileRelativePath, take.fileAbsolutePath, modules);
        if (!existsInfo.exists) {
          stats.missingFile++;
          status = "MISSING_FILE";
          issue = "Take dosyası yolda bulunamadı.";
          stats.problemFiles.push(line.lineId + ":" + (take.fileName || ""));
        }
        if (take.duration === 0) {
          stats.zeroDuration++;
          if (status === "OK") status = "ZERO_DURATION";
          issue = issue ? issue + " Süre 0 görünüyor." : "Süre 0 görünüyor.";
          stats.problemFiles.push(line.lineId + ":" + (take.fileName || ""));
        }
        if (typeof take.duration === "number" && typeof line.originalDuration === "number" && take.duration > line.originalDuration + 0.02) {
          stats.longerThanOriginal++;
        }
      }
      rows.push({
        index: i + 1,
        lineId: line.lineId,
        originalName: line.originalName || "",
        originalDuration: line.originalDuration,
        selectedTakeId: take ? take.takeId : "",
        takeFileName: take ? take.fileName : "",
        takeOriginalName: take ? take.originalTakeName : "",
        takeDuration: take ? take.duration : "",
        takeLongerThanOriginal: take && typeof take.duration === "number" && typeof line.originalDuration === "number" ? (take.duration > line.originalDuration + 0.02) : false,
        takeRelativePath: take ? take.fileRelativePath : "",
        takeResolvedPath: existsInfo.path || "",
        takeFileExists: existsInfo.exists,
        exportName: line.exportName || line.originalName || "",
        status: status,
        issue: issue
      });
    }
    stats.ok = stats.missingTake === 0 && stats.missingFile === 0 && stats.zeroDuration === 0;
    return { rows: rows, stats: stats };
  }

  function writeTakeReport(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. Take raporu için CEP içinde Node açık olmalı.");
    if (!project || !project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");
    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var report = buildTakeReportRows(project);
    var headers = ["index","lineId","originalName","originalDuration","selectedTakeId","takeFileName","takeOriginalName","takeDuration","takeLongerThanOriginal","takeRelativePath","takeResolvedPath","takeFileExists","exportName","status","issue"];
    var csv = [headers.join(",")];
    for (var i = 0; i < report.rows.length; i++) {
      var row = report.rows[i];
      csv.push(headers.map(function (h) { return csvEscape(row[h]); }).join(","));
    }
    var csvPath = modules.path.join(metadataDir, "take-verify-report.csv");
    var jsonPath = modules.path.join(metadataDir, "take-verify-report.json");
    modules.fs.writeFileSync(csvPath, csv.join("\r\n"), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify({
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      createdAt: new Date().toISOString(),
      total: report.stats.total,
      withTake: report.stats.withTake,
      missingTake: report.stats.missingTake,
      missingFile: report.stats.missingFile,
      zeroDuration: report.stats.zeroDuration,
      longerThanOriginal: report.stats.longerThanOriginal,
      ok: report.stats.ok,
      rows: report.rows
    }, null, 2), "utf8");
    project.lastTakeVerification = {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      total: report.stats.total,
      withTake: report.stats.withTake,
      missingTake: report.stats.missingTake,
      missingFile: report.stats.missingFile,
      zeroDuration: report.stats.zeroDuration,
      longerThanOriginal: report.stats.longerThanOriginal,
      ok: report.stats.ok,
      createdAt: new Date().toISOString()
    };
    return {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      total: report.stats.total,
      withTake: report.stats.withTake,
      missingTake: report.stats.missingTake,
      missingFile: report.stats.missingFile,
      zeroDuration: report.stats.zeroDuration,
      longerThanOriginal: report.stats.longerThanOriginal,
      ok: report.stats.ok,
      problemFiles: report.stats.problemFiles
    };
  }

  function verifyTakeLinks(project) {
    return writeTakeReport(project);
  }

  async function attachTakeFiles(project, filesInput, options, onProgress) {
    if (!project || !project.lines) throw new Error("Önce geçerli bir project.json gerekli.");
    var files = Array.prototype.slice.call(filesInput || []).filter(isAudioFile);
    files.sort(function (a, b) { return naturalCompare(getRelativePath(a), getRelativePath(b)); });
    var mode = (options && options.matchMode) || "order";
    var modules = getNodeModules();
    var usedLineIds = {};
    var unmatched = [];
    var attached = 0;

    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var line = chooseLineForTake(project, f, mode, i, usedLineIds);
      if (!line) {
        unmatched.push(f.name);
        continue;
      }
      usedLineIds[line.lineId] = true;
      if (onProgress) onProgress("Take bağlanıyor: " + f.name + " → " + line.originalName + " (" + (i + 1) + "/" + files.length + ")");
      var duration = await readDuration(f);
      var copied = copyTakeFileIntoProject(project, f, line, modules);
      if (!line.takes) line.takes = [];
      for (var t = 0; t < line.takes.length; t++) line.takes[t].isSelected = false;
      var recordStart = typeof line.timelineStart === "number" ? line.timelineStart : 0;
      var take = {
        takeId: uid("take"),
        lineId: line.lineId,
        originalLineName: line.originalName,
        fileName: copied.fileName,
        originalTakeName: f.name,
        fileRelativePath: copied.relativePath,
        fileAbsolutePath: copied.absolutePath,
        duration: duration,
        recordStart: recordStart,
        recordEnd: duration !== null ? Number((recordStart + duration).toFixed(3)) : null,
        linkedAt: new Date().toISOString(),
        matchMode: mode,
        sourceKind: "take",
        isSelected: true,
        preserveRecordedTail: true,
        notes: "Seslendirmen/miks kaydı bu lineId'ye bağlandı; orijinal süreye kırpılmayacak."
      };
      line.takes.push(take);
      line.selectedTakeId = take.takeId;
      attached++;
    }

    project.updatedAt = new Date().toISOString();
    project.appVersion = "0.7.0";
    var verification = writeTakeReport(project);
    return { attached: attached, unmatched: unmatched, longerThanOriginal: verification.longerThanOriginal, reportPath: verification.csvPath };
  }

  function getLineSourceForExport(line) {
    var take = getSelectedTake(line);
    if (take) {
      return {
        sourceType: "selected_take",
        fileName: take.fileName,
        relativePath: take.fileRelativePath,
        absolutePath: take.fileAbsolutePath,
        duration: take.duration,
        sourceId: take.takeId,
        preserveRecordedTail: true
      };
    }
    return {
      sourceType: "original_fallback",
      fileName: line.originalName,
      relativePath: line.originalRelativePath,
      absolutePath: line.originalAbsolutePath,
      duration: line.originalDuration,
      sourceId: line.lineId,
      preserveRecordedTail: true
    };
  }

  function exportFileNameForLine(line, preset, used) {
    var base = baseNameNoExt(line.exportName || line.originalName || line.lineId);
    var ext = preset && preset.extension ? preset.extension : (line.exportExtension || "wav");
    return uniqueName(base + "." + ext, used || {});
  }

  function csvEscape(value) {
    var s = String(value === null || typeof value === "undefined" ? "" : value);
    if (/[",\r\n;]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  function htmlEscape(value) {
    return String(value === null || typeof value === "undefined" ? "" : value).replace(/[&<>'"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[c];
    });
  }

  function createExportItems(project) {
    var preset = project.exportPreset || createExportPreset("game_wav_48k_24_mono");
    var used = {};
    var items = [];
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var src = getLineSourceForExport(line);
      var outputName = exportFileNameForLine(line, preset, used);
      items.push({
        index: i + 1,
        lineId: line.lineId,
        originalName: line.originalName,
        sourceType: src.sourceType,
        sourceId: src.sourceId,
        sourceFileName: src.fileName,
        sourceRelativePath: src.relativePath,
        sourceAbsolutePath: src.absolutePath,
        sourceDuration: src.duration,
        outputFileName: outputName,
        outputRelativePath: "Audio/Exports/" + outputName,
        presetId: preset.id,
        presetName: preset.name,
        format: preset.format,
        extension: preset.extension,
        codec: preset.codec,
        sampleRate: preset.sampleRate || null,
        bitDepth: preset.bitDepth || null,
        bitDepthMode: preset.bitDepthMode || null,
        bitRateKbps: preset.bitRateKbps || null,
        quality: typeof preset.quality !== "undefined" ? preset.quality : null,
        channels: preset.channels,
        exportRange: "selected_take_full_duration",
        preserveRecordedTail: true,
        neverTrimToOriginalDuration: true,
        headPaddingMs: preset.headPaddingMs || 0,
        tailPaddingMs: preset.tailPaddingMs || 0
      });
    }
    return items;
  }

  function createExportPlan(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. Export plan için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Export plan için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var preset = project.exportPreset || createExportPreset("game_wav_48k_24_mono");
    var items = createExportItems(project);
    var takeCount = 0;
    var originalFallbackCount = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].sourceType === "selected_take") takeCount++;
      else originalFallbackCount++;
    }
    var plan = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      createdAt: new Date().toISOString(),
      exportPreset: preset,
      policy: project.exportPolicy,
      itemCount: items.length,
      takeCount: takeCount,
      originalFallbackCount: originalFallbackCount,
      items: items
    };

    var jsonPath = modules.path.join(metadataDir, "export-plan.json");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(plan, null, 2), "utf8");

    var headers = ["index","lineId","originalName","sourceType","sourceRelativePath","sourceDuration","outputFileName","presetName","format","sampleRate","bitDepth","channels"];
    var rows = [headers.join(",")];
    for (var r = 0; r < items.length; r++) {
      var it = items[r];
      rows.push([
        it.index, it.lineId, it.originalName, it.sourceType, it.sourceRelativePath, it.sourceDuration, it.outputFileName,
        it.presetName, it.format, it.sampleRate, it.bitDepth, it.channels
      ].map(csvEscape).join(","));
    }
    var csvPath = modules.path.join(metadataDir, "export-plan.csv");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");

    project.lastExportPlan = { jsonPath: normalizeSlashes(jsonPath), csvPath: normalizeSlashes(csvPath), createdAt: plan.createdAt, itemCount: items.length, takeCount: takeCount, originalFallbackCount: originalFallbackCount };
    project.updatedAt = new Date().toISOString();
    return { jsonPath: normalizeSlashes(jsonPath), csvPath: normalizeSlashes(csvPath), itemCount: items.length, takeCount: takeCount, originalFallbackCount: originalFallbackCount };
  }

  function createMixMapPlan(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. Mix map için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Mix map için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var segments = [];
    var gap = Number(project.gapSeconds || 0);
    var cursor = 0;
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var src = getLineSourceForExport(line);
      var dur = typeof src.duration === "number" ? src.duration : (typeof line.originalDuration === "number" ? line.originalDuration : 0);
      var start = Number(cursor.toFixed(3));
      var end = Number((start + dur).toFixed(3));
      segments.push({
        index: i + 1,
        lineId: line.lineId,
        originalName: line.originalName,
        exportName: line.exportName,
        sourceType: src.sourceType,
        sourceId: src.sourceId,
        sourceRelativePath: src.relativePath,
        sourceDuration: src.duration,
        referenceStart: line.timelineStart,
        referenceEnd: line.timelineEnd,
        mixStart: start,
        mixEnd: end,
        gapAfterSeconds: i === project.lines.length - 1 ? 0 : gap,
        preserveRecordedTail: true,
        notes: "Mix sonrası ayırma bu segment sınırlarına göre yapılmalıdır."
      });
      cursor = end + gap;
    }
    var mixMap = {
      mixMapId: uid("mixmap"),
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      createdAt: new Date().toISOString(),
      strategy: "selected_take_full_duration_with_gap",
      gapSeconds: gap,
      segmentCount: segments.length,
      totalDuration: segments.length ? segments[segments.length - 1].mixEnd : 0,
      segments: segments
    };

    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var mapPath = modules.path.join(metadataDir, "mix-map.json");
    modules.fs.writeFileSync(mapPath, JSON.stringify(mixMap, null, 2), "utf8");
    if (!project.mixMaps) project.mixMaps = [];
    project.mixMaps.push({ mixMapId: mixMap.mixMapId, path: normalizeSlashes(mapPath), createdAt: mixMap.createdAt, segmentCount: segments.length, totalDuration: mixMap.totalDuration });
    project.updatedAt = new Date().toISOString();
    return { path: normalizeSlashes(mapPath), segmentCount: segments.length, totalDuration: mixMap.totalDuration };
  }


  function isAbsoluteLikePath(value) {
    var p = String(value || "");
    return /^[a-zA-Z]:[\\/]/.test(p) || p.indexOf("//") === 0 || p.indexOf("\\\\") === 0 || p.charAt(0) === "/";
  }

  function resolveProjectPath(project, relativeOrAbsolute, modules) {
    var p = String(relativeOrAbsolute || "");
    if (!p) return "";
    if (isAbsoluteLikePath(p)) return p;
    return modules.path.join(project.projectRootPath, p);
  }

  function chooseExportSourcePath(project, item, modules) {
    var abs = item && item.sourceAbsolutePath ? String(item.sourceAbsolutePath) : "";
    var rel = item && item.sourceRelativePath ? String(item.sourceRelativePath) : "";
    if (abs && modules && modules.fs && modules.fs.existsSync(abs)) return abs;
    if (rel) {
      var resolved = resolveProjectPath(project, rel, modules);
      if (resolved && modules && modules.fs && modules.fs.existsSync(resolved)) return resolved;
      if (!abs) return resolved;
    }
    return abs || resolveProjectPath(project, rel, modules);
  }

  function presetChannelCount(preset) {
    return String((preset && preset.channels) || "mono").toLowerCase() === "stereo" ? 2 : 1;
  }

  function ffmpegArgsForPreset(preset) {
    preset = preset || createExportPreset("game_wav_48k_24_mono");
    var args = [];
    if (preset.sampleRate) args.push("-ar", String(preset.sampleRate));
    args.push("-ac", String(presetChannelCount(preset)));

    var fmt = String(preset.format || preset.extension || "wav").toLowerCase();
    var bit = Number(preset.bitDepth || 16);
    var isFloat = preset.bitDepthMode === "float";

    if (fmt === "wav" || fmt === "bwf") {
      if (isFloat) args.push("-c:a", "pcm_f32le");
      else if (bit >= 32) args.push("-c:a", "pcm_s32le");
      else if (bit >= 24) args.push("-c:a", "pcm_s24le");
      else args.push("-c:a", "pcm_s16le");
    } else if (fmt === "aiff" || fmt === "aif") {
      if (isFloat) args.push("-c:a", "pcm_f32be");
      else if (bit >= 32) args.push("-c:a", "pcm_s32be");
      else if (bit >= 24) args.push("-c:a", "pcm_s24be");
      else args.push("-c:a", "pcm_s16be");
    } else if (fmt === "flac") {
      args.push("-c:a", "flac");
      if (bit >= 24) args.push("-sample_fmt", "s32");
      else args.push("-sample_fmt", "s16");
    } else if (fmt === "mp3") {
      args.push("-c:a", "libmp3lame");
      args.push("-b:a", String(preset.bitRateKbps || 192) + "k");
    } else if (fmt === "ogg" || fmt === "oga") {
      args.push("-c:a", "libvorbis");
      args.push("-q:a", String(typeof preset.quality !== "undefined" ? preset.quality : 5));
    } else if (fmt === "aac" || fmt === "m4a") {
      args.push("-c:a", "aac");
      args.push("-b:a", String(preset.bitRateKbps || 192) + "k");
    } else {
      args.push("-c:a", "pcm_s16le");
    }
    return args;
  }

  function psQuote(value) {
    return "'" + String(value === null || typeof value === "undefined" ? "" : value).replace(/'/g, "''") + "'";
  }

  function createFfmpegExportScript(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. FFmpeg export script'i için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Script oluşturmak için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var planResult = createExportPlan(project);
    var preset = project.exportPreset || createExportPreset("game_wav_48k_24_mono");
    var items = createExportItems(project);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    // Kullanıcı özel çıkış klasörü seçtiyse onu kullan, yoksa proje/Audio/Exports.
    var exportDir = (project.exportOutputDir && String(project.exportOutputDir).trim())
      ? String(project.exportOutputDir)
      : modules.path.join(project.projectRootPath, "Audio", "Exports");
    var ps1Path = modules.path.join(metadataDir, "run-export-ffmpeg.ps1");
    var batPath = modules.path.join(metadataDir, "run-export-ffmpeg.bat");
    var logPath = modules.path.join(metadataDir, "ffmpeg-export-log.txt");
    var args = ffmpegArgsForPreset(preset);

    var lines = [];
    lines.push("# AU Dub Panel FFmpeg Export Script");
    lines.push("# Generated: " + new Date().toISOString());
    lines.push("# Preset: " + (preset.name || preset.id));
    lines.push("$ErrorActionPreference = 'Continue'");
    lines.push("[Console]::OutputEncoding = [System.Text.Encoding]::UTF8");
    lines.push("$OutputEncoding = [System.Text.Encoding]::UTF8");
    var ffmpegExe = (project.ffmpegPath && String(project.ffmpegPath).trim()) ? String(project.ffmpegPath).trim() : "ffmpeg";
    lines.push("$ffmpeg = " + psQuote(ffmpegExe));
    lines.push("$exportDir = " + psQuote(exportDir));
    lines.push("$logPath = " + psQuote(logPath));
    lines.push("New-Item -ItemType Directory -Force -Path $exportDir | Out-Null");
    lines.push("Set-Content -LiteralPath $logPath -Encoding UTF8 -Value ('AU Dub Panel FFmpeg Export Log - ' + (Get-Date -Format o))");
    lines.push("function AUWrite($msg) { Write-Host $msg; Add-Content -LiteralPath $logPath -Encoding UTF8 -Value $msg }");
    lines.push("function AUWarn($msg) { Write-Warning $msg; Add-Content -LiteralPath $logPath -Encoding UTF8 -Value ('WARNING: ' + $msg) }");
    lines.push("if (!(Get-Command $ffmpeg -ErrorAction SilentlyContinue)) { AUWarn " + psQuote("FFmpeg bulunamadi. ffmpeg.exe PATH icinde degil. ffmpeg.org paketini kurup PATH'e ekleyin veya .bat dosyasini FFmpeg olan makinede calistirin.") + "; exit 10 }");
    lines.push("$items = @(");
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var src = chooseExportSourcePath(project, it, modules);
      var out = modules.path.join(exportDir, it.outputFileName);
      lines.push("  @{ index = " + it.index + "; lineId = " + psQuote(it.lineId) + "; sourceType = " + psQuote(it.sourceType) + "; source = " + psQuote(src) + "; output = " + psQuote(out) + " }");
    }
    lines.push(")");
    lines.push("$codecArgs = @(" + args.map(psQuote).join(", ") + ")");
    lines.push("$ok = 0; $missing = 0; $failed = 0");
    lines.push("foreach ($item in $items) {");
    lines.push("  if (!(Test-Path -LiteralPath $item.source)) { AUWarn (\"Kaynak yok: {0} -> {1}\" -f $item.lineId, $item.source); $missing++; continue }");
    lines.push("  AUWrite (\"Export [{0}/{1}] {2} -> {3}\" -f $item.index, $items.Count, $item.lineId, $item.output)");
    lines.push("  & $ffmpeg -hide_banner -y -i $item.source @codecArgs $item.output");
    lines.push("  if ($LASTEXITCODE -eq 0) { $ok++ } else { AUWarn (\"FFmpeg hata kodu {0}: {1}\" -f $LASTEXITCODE, $item.lineId); $failed++ }");
    lines.push("}");
    lines.push("AUWrite \"----------------------------------------\"");
    lines.push("AUWrite (\"Bitti. Basarili: {0} / Eksik: {1} / Hatali: {2}\" -f $ok, $missing, $failed)");
    lines.push("AUWrite (\"Log: {0}\" -f $logPath)");
    lines.push("if ($failed -gt 0) { exit 2 }");
    lines.push("if ($missing -gt 0) { exit 1 }");
    lines.push("exit 0");

    modules.fs.writeFileSync(ps1Path, "\ufeff" + lines.join("\r\n"), "utf8");
    var bat = [];
    bat.push("@echo off");
    bat.push("setlocal");
    bat.push("powershell -ExecutionPolicy Bypass -NoProfile -File \"%~dp0run-export-ffmpeg.ps1\"");
    bat.push("echo.");
    bat.push("pause");
    modules.fs.writeFileSync(batPath, bat.join("\r\n"), "utf8");

    project.lastFfmpegExportScript = {
      ps1Path: normalizeSlashes(ps1Path),
      batPath: normalizeSlashes(batPath),
      logPath: normalizeSlashes(logPath),
      exportDir: normalizeSlashes(exportDir),
      createdAt: new Date().toISOString(),
      presetName: preset.name,
      itemCount: items.length,
      exportPlan: planResult
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);

    return {
      ps1Path: normalizeSlashes(ps1Path),
      batPath: normalizeSlashes(batPath),
      logPath: normalizeSlashes(logPath),
      exportDir: normalizeSlashes(exportDir),
      itemCount: items.length,
      takeCount: planResult.takeCount,
      originalFallbackCount: planResult.originalFallbackCount
    };
  }

  function runFfmpegExport(project, onOutput) {
    return new Promise(function (resolve, reject) {
      var modules = getNodeModules();
      if (!modules) { reject(new Error("Node.js erişimi yok.")); return; }
      var childProcess;
      try { childProcess = (global.cep_node && global.cep_node.require ? global.cep_node.require : global.require)("child_process"); }
      catch (e) { reject(new Error("child_process yüklenemedi: " + e.message)); return; }

      var scriptInfo;
      try { scriptInfo = createFfmpegExportScript(project); }
      catch (e2) { reject(e2); return; }

      var psExe = "powershell.exe";
      var args = ["-ExecutionPolicy", "Bypass", "-NoProfile", "-File", scriptInfo.ps1Path];
      var child;
      try {
        child = childProcess.spawn(psExe, args, { cwd: project.projectRootPath, windowsHide: false });
      } catch (spawnErr) {
        reject(new Error("PowerShell başlatılamadı: " + spawnErr.message));
        return;
      }
      if (child.stdout) child.stdout.on("data", function (d) { if (onOutput) onOutput(String(d)); });
      if (child.stderr) child.stderr.on("data", function (d) { if (onOutput) onOutput(String(d)); });
      child.on("error", function (err) { reject(err); });
      child.on("close", function (code) {
        resolve({ code: code, script: scriptInfo, ok: code === 0 });
      });
    });
  }


  function verifyExportOutputs(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya okuma erişimi yok. Export doğrulama için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Doğrulama için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var exportDir = modules.path.join(project.projectRootPath, "Audio", "Exports");
    var items = createExportItems(project);
    var rows = [];
    var expected = items.length;
    var present = 0;
    var missing = 0;
    var empty = 0;
    var problemFiles = [];
    var details = [];

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var outPath = modules.path.join(exportDir, it.outputFileName);
      var exists = false;
      var size = 0;
      try {
        exists = modules.fs.existsSync(outPath);
        if (exists) size = modules.fs.statSync(outPath).size;
      } catch (e) {
        exists = false;
      }
      var status = "ok";
      if (!exists) {
        status = "missing";
        missing++;
        problemFiles.push(it.outputFileName);
      } else if (size <= 0) {
        status = "empty";
        empty++;
        problemFiles.push(it.outputFileName);
      } else {
        present++;
      }
      details.push({
        index: it.index,
        lineId: it.lineId,
        originalName: it.originalName,
        sourceType: it.sourceType,
        outputFileName: it.outputFileName,
        outputPath: normalizeSlashes(outPath),
        exists: exists,
        sizeBytes: size,
        status: status
      });
    }

    var csvHeaders = ["index","lineId","originalName","sourceType","outputFileName","exists","sizeBytes","status","outputPath"];
    rows.push(csvHeaders.join(","));
    for (var r = 0; r < details.length; r++) {
      var d = details[r];
      rows.push([
        d.index, d.lineId, d.originalName, d.sourceType, d.outputFileName, d.exists, d.sizeBytes, d.status, d.outputPath
      ].map(csvEscape).join(","));
    }

    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      checkedAt: new Date().toISOString(),
      exportDir: normalizeSlashes(exportDir),
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      ok: missing === 0 && empty === 0,
      details: details
    };

    var csvPath = modules.path.join(metadataDir, "export-verify-report.csv");
    var jsonPath = modules.path.join(metadataDir, "export-verify-report.json");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    project.lastExportVerification = {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      checkedAt: report.checkedAt,
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      ok: report.ok
    };
    project.updatedAt = new Date().toISOString();
    try { saveProject(project); } catch (ignore) {}
    return {
      ok: report.ok,
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      problemFiles: problemFiles
    };
  }


  function copyMixFileIntoProject(project, file, modules) {
    if (!file && project.lastMixSplitPlan && project.lastMixSplitPlan.mixFileAbsolutePath) {
      return {
        fileName: project.lastMixSplitPlan.mixFileName,
        relativePath: project.lastMixSplitPlan.mixFileRelativePath,
        absolutePath: project.lastMixSplitPlan.mixFileAbsolutePath
      };
    }
    if (!file) throw new Error("Mix dosyası seçilmedi.");
    var sourcePath = file.path || null;
    if (!sourcePath || !modules.fs.existsSync(sourcePath)) throw new Error("Seçilen mix dosyasının gerçek yolu bulunamadı. CEP içinde dosya path erişimi yok olabilir.");
    ensureProjectFolders(project.projectRootPath, modules);
    var mixDir = modules.path.join(project.projectRootPath, "Audio", "Mix");
    var cleanName = safeFileName(file.name || "final_mix.wav");
    var used = {};
    try {
      var existing = modules.fs.readdirSync(mixDir);
      for (var e = 0; e < existing.length; e++) used[String(existing[e]).toLowerCase()] = true;
    } catch (ignore) {}
    var destName = uniqueName("final_mix__" + cleanName, used);
    var destPath = modules.path.join(mixDir, destName);
    if (normalizeSlashes(sourcePath) !== normalizeSlashes(destPath)) modules.fs.copyFileSync(sourcePath, destPath);
    return {
      fileName: destName,
      relativePath: "Audio/Mix/" + destName,
      absolutePath: normalizeSlashes(destPath)
    };
  }

  function createMixSplitItems(project, mixInfo) {
    var gap = Number(project.gapSeconds || 0);
    var cursor = 0;
    var used = {};
    var items = [];
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var take = getSelectedTake(line);
      var src = getLineSourceForExport(line);
      var dur, start, end;
      // Canlı kayıt eşlemesinde take, Audition timeline'daki GERÇEK pozisyonu (mixStart/mixEnd)
      // taşır. Mixdown bu sınırlarla kesilmeli; cursor düzeni sadece eski dosya-bazlı akış için fallback.
      // Tek kesim: repliğin tüm bölgesi [mixStart, mixEnd]. Çok parçalı (delete silence)
      // repliklerde bu bölge parçalar arası boşlukları DA içerir; boşluklar korunur.
      if (take && typeof take.mixStart === "number" && typeof take.mixEnd === "number" && take.mixEnd > take.mixStart) {
        start = Number(take.mixStart.toFixed(3));
        end = Number(take.mixEnd.toFixed(3));
        dur = Number((end - start).toFixed(3));
      } else {
        dur = typeof src.duration === "number" ? src.duration : (typeof line.originalDuration === "number" ? line.originalDuration : 0);
        start = Number(cursor.toFixed(3));
        end = Number((start + dur).toFixed(3));
      }
      var outName = uniqueName(baseNameNoExt(line.exportName || line.originalName || line.lineId) + "__mixsplit.wav", used);
      items.push({
        index: i + 1,
        lineId: line.lineId,
        originalName: line.originalName,
        exportName: line.exportName,
        mixStart: start,
        mixEnd: end,
        duration: Number((end - start).toFixed(3)),
        gapAfterSeconds: i === project.lines.length - 1 ? 0 : gap,
        outputFileName: outName,
        outputRelativePath: "Audio/Takes/" + outName,
        mixFileName: mixInfo.fileName,
        mixFileRelativePath: mixInfo.relativePath,
        mixFileAbsolutePath: mixInfo.absolutePath,
        preserveRecordedTail: true,
        sourceKind: "mix_split"
      });
      cursor = end + gap;
    }
    return items;
  }

  function createMixSplitPlan(project, mixFile) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. Mix split plan için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Mix split plan için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var mixInfo = copyMixFileIntoProject(project, mixFile, modules);
    var items = createMixSplitItems(project, mixInfo);
    var plan = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      createdAt: new Date().toISOString(),
      strategy: "split_single_mixed_file_by_mix_map_segments",
      gapSeconds: Number(project.gapSeconds || 0),
      mixFileName: mixInfo.fileName,
      mixFileRelativePath: mixInfo.relativePath,
      mixFileAbsolutePath: mixInfo.absolutePath,
      itemCount: items.length,
      items: items
    };

    var jsonPath = modules.path.join(metadataDir, "mix-split-plan.json");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(plan, null, 2), "utf8");
    var headers = ["index","lineId","originalName","mixStart","mixEnd","duration","outputFileName","outputRelativePath"];
    var rows = [headers.join(",")];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      rows.push([it.index, it.lineId, it.originalName, it.mixStart, it.mixEnd, it.duration, it.outputFileName, it.outputRelativePath].map(csvEscape).join(","));
    }
    var csvPath = modules.path.join(metadataDir, "mix-split-plan.csv");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");

    project.lastMixSplitPlan = {
      jsonPath: normalizeSlashes(jsonPath),
      csvPath: normalizeSlashes(csvPath),
      createdAt: plan.createdAt,
      itemCount: items.length,
      mixFileName: mixInfo.fileName,
      mixFileRelativePath: mixInfo.relativePath,
      mixFileAbsolutePath: mixInfo.absolutePath,
      items: items
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);
    return { jsonPath: normalizeSlashes(jsonPath), csvPath: normalizeSlashes(csvPath), itemCount: items.length, items: items, mixInfo: mixInfo };
  }

  function createFfmpegMixSplitScript(project, mixFile) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya yazma erişimi yok. Mix split script için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Script oluşturmak için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var planResult = createMixSplitPlan(project, mixFile);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var outputDir = modules.path.join(project.projectRootPath, "Audio", "Takes");
    var ps1Path = modules.path.join(metadataDir, "run-split-mix-ffmpeg.ps1");
    var batPath = modules.path.join(metadataDir, "run-split-mix-ffmpeg.bat");
    var logPath = modules.path.join(metadataDir, "ffmpeg-split-log.txt");
    var mixSource = planResult.mixInfo.absolutePath;
    var items = planResult.items;

    var lines = [];
    lines.push("# AU Dub Panel FFmpeg Mix Split Script");
    lines.push("# Generated: " + new Date().toISOString());
    lines.push("$ErrorActionPreference = 'Continue'");
    lines.push("[Console]::OutputEncoding = [System.Text.Encoding]::UTF8");
    lines.push("$OutputEncoding = [System.Text.Encoding]::UTF8");
    var ffmpegExe = (project.ffmpegPath && String(project.ffmpegPath).trim()) ? String(project.ffmpegPath).trim() : "ffmpeg";
    lines.push("$ffmpeg = " + psQuote(ffmpegExe));
    lines.push("$mixSource = " + psQuote(mixSource));
    lines.push("$outputDir = " + psQuote(outputDir));
    lines.push("$logPath = " + psQuote(logPath));
    lines.push("New-Item -ItemType Directory -Force -Path $outputDir | Out-Null");
    lines.push("Set-Content -LiteralPath $logPath -Encoding UTF8 -Value ('AU Dub Panel FFmpeg Mix Split Log - ' + (Get-Date -Format o))");
    lines.push("function AUWrite($msg) { Write-Host $msg; Add-Content -LiteralPath $logPath -Encoding UTF8 -Value $msg }");
    lines.push("function AUWarn($msg) { Write-Warning $msg; Add-Content -LiteralPath $logPath -Encoding UTF8 -Value ('WARNING: ' + $msg) }");
    lines.push("if (!(Get-Command $ffmpeg -ErrorAction SilentlyContinue)) { AUWarn " + psQuote("FFmpeg bulunamadi. ffmpeg.exe PATH icinde degil.") + "; exit 10 }");
    lines.push("if (!(Test-Path -LiteralPath $mixSource)) { AUWarn (\"Mix kaynak dosyasi yok: {0}\" -f $mixSource); exit 11 }");
    lines.push("$items = @(");
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var out = modules.path.join(outputDir, it.outputFileName);
      lines.push("  @{ index = " + it.index + "; lineId = " + psQuote(it.lineId) + "; start = " + it.mixStart + "; duration = " + it.duration + "; output = " + psQuote(out) + " }");
    }
    lines.push(")");
    lines.push("$ok = 0; $failed = 0");
    lines.push("foreach ($item in $items) {");
    lines.push("  AUWrite (\"Split [{0}/{1}] {2}: start={3}s dur={4}s -> {5}\" -f $item.index, $items.Count, $item.lineId, $item.start, $item.duration, $item.output)");
    lines.push("  & $ffmpeg -hide_banner -y -ss $item.start -t $item.duration -i $mixSource -c:a pcm_f32le $item.output");
    lines.push("  if ($LASTEXITCODE -eq 0) { $ok++ } else { AUWarn (\"FFmpeg split hata kodu {0}: {1}\" -f $LASTEXITCODE, $item.lineId); $failed++ }");
    lines.push("}");
    lines.push("AUWrite \"----------------------------------------\"");
    lines.push("AUWrite (\"Split bitti. Basarili: {0} / Hatali: {1}\" -f $ok, $failed)");
    lines.push("AUWrite (\"Log: {0}\" -f $logPath)");
    lines.push("if ($failed -gt 0) { exit 2 }");
    lines.push("exit 0");

    modules.fs.writeFileSync(ps1Path, "\ufeff" + lines.join("\r\n"), "utf8");
    var bat = [];
    bat.push("@echo off");
    bat.push("setlocal");
    bat.push("powershell -ExecutionPolicy Bypass -NoProfile -File \"%~dp0run-split-mix-ffmpeg.ps1\"");
    bat.push("echo.");
    bat.push("pause");
    modules.fs.writeFileSync(batPath, bat.join("\r\n"), "utf8");

    project.lastMixSplitScript = {
      ps1Path: normalizeSlashes(ps1Path),
      batPath: normalizeSlashes(batPath),
      logPath: normalizeSlashes(logPath),
      outputDir: normalizeSlashes(outputDir),
      planPath: planResult.jsonPath,
      createdAt: new Date().toISOString(),
      itemCount: items.length
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);
    return {
      ps1Path: normalizeSlashes(ps1Path),
      batPath: normalizeSlashes(batPath),
      logPath: normalizeSlashes(logPath),
      outputDir: normalizeSlashes(outputDir),
      planPath: planResult.jsonPath,
      itemCount: items.length
    };
  }

  function runFfmpegMixSplit(project, mixFile, onOutput) {
    return new Promise(function (resolve, reject) {
      var modules = getNodeModules();
      if (!modules) { reject(new Error("Node.js erişimi yok.")); return; }
      var childProcess;
      try { childProcess = (global.cep_node && global.cep_node.require ? global.cep_node.require : global.require)("child_process"); }
      catch (e) { reject(new Error("child_process yüklenemedi: " + e.message)); return; }

      var scriptInfo;
      try {
        if (mixFile || !(project.lastMixSplitScript && project.lastMixSplitScript.ps1Path)) scriptInfo = createFfmpegMixSplitScript(project, mixFile);
        else scriptInfo = project.lastMixSplitScript;
      } catch (e2) { reject(e2); return; }

      var psExe = "powershell.exe";
      var args = ["-ExecutionPolicy", "Bypass", "-NoProfile", "-File", scriptInfo.ps1Path];
      var child;
      try { child = childProcess.spawn(psExe, args, { cwd: project.projectRootPath, windowsHide: false }); }
      catch (spawnErr) { reject(new Error("PowerShell başlatılamadı: " + spawnErr.message)); return; }
      if (child.stdout) child.stdout.on("data", function (d) { if (onOutput) onOutput(String(d)); });
      if (child.stderr) child.stderr.on("data", function (d) { if (onOutput) onOutput(String(d)); });
      child.on("error", function (err) { reject(err); });
      child.on("close", function (code) { resolve({ code: code, script: scriptInfo, ok: code === 0 }); });
    });
  }

  function findLineById(project, lineId) {
    if (!project || !project.lines) return null;
    for (var i = 0; i < project.lines.length; i++) if (project.lines[i].lineId === lineId) return project.lines[i];
    return null;
  }

  function verifyMixSplitOutputs(project, attachAsTakes) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya okuma erişimi yok. Mix split doğrulama için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Doğrulama için geçerli proje yok.");
    if (!project.lastMixSplitPlan || !project.lastMixSplitPlan.items) throw new Error("Mix split plan yok. Önce Mix Ayırma Script Oluştur deyin.");

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var details = [];
    var expected = project.lastMixSplitPlan.items.length;
    var present = 0, missing = 0, empty = 0, attachedTakes = 0;
    var problemFiles = [];
    var splitId = project.lastMixSplitPlan.createdAt || project.lastMixSplitPlan.jsonPath || uid("split");

    for (var i = 0; i < project.lastMixSplitPlan.items.length; i++) {
      var it = project.lastMixSplitPlan.items[i];
      var outPath = modules.path.join(project.projectRootPath, it.outputRelativePath);
      var exists = false, size = 0;
      try { exists = modules.fs.existsSync(outPath); if (exists) size = modules.fs.statSync(outPath).size; } catch (e) { exists = false; }
      var status = "ok";
      if (!exists) { status = "missing"; missing++; problemFiles.push(it.outputFileName); }
      else if (size <= 0) { status = "empty"; empty++; problemFiles.push(it.outputFileName); }
      else { present++; }

      if (attachAsTakes && status === "ok") {
        var line = findLineById(project, it.lineId);
        if (line) {
          if (!line.takes) line.takes = [];
          var filtered = [];
          for (var t = 0; t < line.takes.length; t++) {
            if (!(line.takes[t].sourceKind === "mix_split" && line.takes[t].mixSplitId === splitId)) filtered.push(line.takes[t]);
          }
          line.takes = filtered;
          for (var u = 0; u < line.takes.length; u++) line.takes[u].isSelected = false;
          var take = {
            takeId: uid("mixsplit_take"),
            lineId: line.lineId,
            originalLineName: line.originalName,
            fileName: it.outputFileName,
            originalTakeName: it.outputFileName,
            fileRelativePath: it.outputRelativePath,
            fileAbsolutePath: normalizeSlashes(outPath),
            duration: it.duration,
            recordStart: typeof line.timelineStart === "number" ? line.timelineStart : 0,
            recordEnd: typeof line.timelineStart === "number" ? Number((line.timelineStart + it.duration).toFixed(3)) : it.duration,
            linkedAt: new Date().toISOString(),
            matchMode: "mix_split_map",
            sourceKind: "mix_split",
            mixSplitId: splitId,
            sourceMixFile: project.lastMixSplitPlan.mixFileRelativePath,
            isSelected: true,
            preserveRecordedTail: true,
            notes: "Miks sonrası tek dosyadan mix-map sınırlarına göre ayrıldı; export sırasında orijinal süreye kırpılmayacak."
          };
          line.takes.push(take);
          line.selectedTakeId = take.takeId;
          attachedTakes++;
        }
      }

      details.push({
        index: it.index,
        lineId: it.lineId,
        originalName: it.originalName,
        mixStart: it.mixStart,
        mixEnd: it.mixEnd,
        duration: it.duration,
        outputFileName: it.outputFileName,
        outputPath: normalizeSlashes(outPath),
        exists: exists,
        sizeBytes: size,
        status: status
      });
    }

    var csvHeaders = ["index","lineId","originalName","mixStart","mixEnd","duration","outputFileName","exists","sizeBytes","status","outputPath"];
    var rows = [csvHeaders.join(",")];
    for (var r = 0; r < details.length; r++) {
      var d = details[r];
      rows.push([d.index, d.lineId, d.originalName, d.mixStart, d.mixEnd, d.duration, d.outputFileName, d.exists, d.sizeBytes, d.status, d.outputPath].map(csvEscape).join(","));
    }
    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      checkedAt: new Date().toISOString(),
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      attachedTakes: attachedTakes,
      ok: missing === 0 && empty === 0,
      details: details
    };
    var csvPath = modules.path.join(metadataDir, "mix-split-verify-report.csv");
    var jsonPath = modules.path.join(metadataDir, "mix-split-verify-report.json");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    project.lastMixSplitVerification = {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      checkedAt: report.checkedAt,
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      attachedTakes: attachedTakes,
      ok: report.ok
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);
    return {
      ok: report.ok,
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      attachedTakes: attachedTakes,
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      problemFiles: problemFiles
    };
  }



  function walkAudioFiles(dirPath, modules, out) {
    out = out || [];
    try {
      if (!modules.fs.existsSync(dirPath)) return out;
      var entries = modules.fs.readdirSync(dirPath);
      for (var i = 0; i < entries.length; i++) {
        var full = modules.path.join(dirPath, entries[i]);
        var st = null;
        try { st = modules.fs.statSync(full); } catch (ignore) { st = null; }
        if (!st) continue;
        if (st.isDirectory()) walkAudioFiles(full, modules, out);
        else if (AUDIO_EXTENSIONS.indexOf(fileExtension(entries[i])) >= 0) out.push({ path: full, name: entries[i], size: st.size, mtimeMs: st.mtimeMs || 0 });
      }
    } catch (ignore2) {}
    return out;
  }

  function findSplitPlanDuration(project, relPath, fileName) {
    var plans = [];
    if (project && project.lastMixSplitPlan && project.lastMixSplitPlan.items) plans.push(project.lastMixSplitPlan);
    if (project && project.lastMixMap && project.lastMixMap.segments) plans.push({ items: project.lastMixMap.segments });
    var normRel = normalizeSlashes(relPath || "").toLowerCase();
    var lowerName = String(fileName || "").toLowerCase();
    for (var p = 0; p < plans.length; p++) {
      var items = plans[p].items || plans[p].segments || [];
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var outRel = normalizeSlashes(it.outputRelativePath || "").toLowerCase();
        var outName = String(it.outputFileName || "").toLowerCase();
        if ((outRel && outRel === normRel) || (outName && outName === lowerName)) {
          if (typeof it.duration === "number") return it.duration;
          if (typeof it.mixEnd === "number" && typeof it.mixStart === "number") return Number((it.mixEnd - it.mixStart).toFixed(3));
        }
      }
    }
    return null;
  }

  function chooseExistingTakeCandidate(project, line, files, modules) {
    var base = baseNameNoExt(line.originalName || line.exportName || line.lineId).toLowerCase();
    var best = null;
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var nameLower = String(f.name || "").toLowerCase();
      var nameBase = baseNameNoExt(f.name || "").toLowerCase();
      var score = 0;
      if (nameLower === base + ".wav") score = 70;
      if (nameBase === base) score = Math.max(score, 70);
      if (nameBase.indexOf(base + "__") === 0) score = Math.max(score, 80);
      if (nameBase.indexOf(base + "_take") === 0 || nameBase.indexOf(base + "-take") === 0) score = Math.max(score, 78);
      if (nameBase.indexOf(base + "__mixsplit") === 0 || nameBase.indexOf(base + "_mixsplit") === 0) score = Math.max(score, 100);
      if (score <= 0) continue;
      if (!best || score > best.score || (score === best.score && f.mtimeMs > best.file.mtimeMs)) best = { file: f, score: score };
    }
    return best ? best.file : null;
  }

  function autoAttachExistingTakes(project, options) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya okuma/yazma erişimi yok. Take toparlama için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Take toparlama için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var takeDir = modules.path.join(project.projectRootPath, "Audio", "Takes");
    var files = walkAudioFiles(takeDir, modules, []);
    var attached = 0, found = 0, missing = 0;
    var missingNames = [];
    var details = [];
    var force = !!(options && options.force);

    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var current = getSelectedTake(line);
      if (current && !force) {
        details.push({ index: i + 1, lineId: line.lineId, originalName: line.originalName, action: "kept_existing", fileName: current.fileName || "", relativePath: current.fileRelativePath || "", exists: true });
        continue;
      }
      var candidate = chooseExistingTakeCandidate(project, line, files, modules);
      if (!candidate) {
        missing++;
        missingNames.push(line.originalName || line.lineId);
        details.push({ index: i + 1, lineId: line.lineId, originalName: line.originalName, action: "missing", fileName: "", relativePath: "", exists: false });
        continue;
      }
      found++;
      var rel = normalizeSlashes(modules.path.relative(project.projectRootPath, candidate.path));
      var duration = findSplitPlanDuration(project, rel, candidate.name);
      if (!line.takes) line.takes = [];
      for (var t = 0; t < line.takes.length; t++) line.takes[t].isSelected = false;
      var sourceKind = String(candidate.name).toLowerCase().indexOf("mixsplit") >= 0 ? "mix_split_recovered" : "disk_recovered_take";
      var take = {
        takeId: uid(sourceKind === "mix_split_recovered" ? "mixsplit_recovered" : "take_recovered"),
        lineId: line.lineId,
        originalLineName: line.originalName,
        fileName: candidate.name,
        originalTakeName: candidate.name,
        fileRelativePath: rel,
        fileAbsolutePath: normalizeSlashes(candidate.path),
        duration: duration,
        recordStart: typeof line.timelineStart === "number" ? line.timelineStart : 0,
        recordEnd: typeof duration === "number" && typeof line.timelineStart === "number" ? Number((line.timelineStart + duration).toFixed(3)) : null,
        linkedAt: new Date().toISOString(),
        matchMode: "disk_scan",
        sourceKind: sourceKind,
        isSelected: true,
        preserveRecordedTail: true,
        notes: "Diskteki Audio/Takes klasöründen otomatik toparlandı; export sırasında orijinal süreye kırpılmayacak."
      };
      line.takes.push(take);
      line.selectedTakeId = take.takeId;
      attached++;
      details.push({ index: i + 1, lineId: line.lineId, originalName: line.originalName, action: "attached", fileName: candidate.name, relativePath: rel, exists: true, sourceKind: sourceKind, duration: duration });
    }

    var headers = ["index","lineId","originalName","action","fileName","relativePath","exists","sourceKind","duration"];
    var rows = [headers.join(",")];
    for (var r = 0; r < details.length; r++) {
      var d = details[r];
      rows.push([d.index, d.lineId, d.originalName, d.action, d.fileName, d.relativePath, d.exists, d.sourceKind || "", d.duration || ""].map(csvEscape).join(","));
    }
    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      checkedAt: new Date().toISOString(),
      takeDir: normalizeSlashes(takeDir),
      scannedFiles: files.length,
      found: found,
      attached: attached,
      missing: missing,
      missingNames: missingNames,
      details: details
    };
    var csvPath = modules.path.join(metadataDir, "take-auto-attach-report.csv");
    var jsonPath = modules.path.join(metadataDir, "take-auto-attach-report.json");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    project.lastAutoAttachTakes = { csvPath: normalizeSlashes(csvPath), jsonPath: normalizeSlashes(jsonPath), attached: attached, found: found, missing: missing, checkedAt: report.checkedAt };
    project.updatedAt = new Date().toISOString();
    project.appVersion = "1.0.0";
    saveProject(project);
    return { found: found, attached: attached, missing: missing, missingNames: missingNames, csvPath: normalizeSlashes(csvPath), jsonPath: normalizeSlashes(jsonPath) };
  }


  function healthCheckProject(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya okuma/yazma erişimi yok. Sağlık kontrolü için CEP içinde Node açık olmalı.");
    if (!project || !project.lines) throw new Error("Sağlık kontrolü için geçerli proje yok.");
    if (!project.projectRootPath) throw new Error("Proje kök yolu bulunamadı.");

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var details = [];
    var warnings = [];
    var lineCount = project.lines.length;
    var originalFound = 0;
    var missingOriginal = 0;
    var selectedTakeCount = 0;
    var noSelectedTake = 0;
    var selectedTakeFileFound = 0;
    var missingSelectedTakeFile = 0;
    var longTakeCount = 0;

    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var original = resolveExistingPath(project, line.originalRelativePath, line.originalAbsolutePath, modules);
      if (original.exists) originalFound++; else { missingOriginal++; warnings.push("Orijinal eksik: " + (line.originalName || line.lineId)); }

      var selectedTake = getSelectedTake(line);
      var takeStatus = "no_take";
      var takeExists = false;
      var takePath = "";
      var takeDuration = "";
      var isLong = false;
      if (selectedTake) {
        selectedTakeCount++;
        takeDuration = selectedTake.duration;
        var takeResolved = resolveExistingPath(project, selectedTake.fileRelativePath, selectedTake.fileAbsolutePath, modules);
        takeExists = takeResolved.exists;
        takePath = takeResolved.path || selectedTake.fileRelativePath || selectedTake.fileAbsolutePath || "";
        if (takeExists) { selectedTakeFileFound++; takeStatus = "ok"; }
        else { missingSelectedTakeFile++; takeStatus = "missing_file"; warnings.push("Take dosyası yok: " + (line.originalName || line.lineId) + " → " + (selectedTake.fileName || selectedTake.takeId)); }
        if (typeof selectedTake.duration === "number" && typeof line.originalDuration === "number" && selectedTake.duration > line.originalDuration + 0.05) {
          longTakeCount++;
          isLong = true;
        }
      } else {
        noSelectedTake++;
        warnings.push("Seçili take yok: " + (line.originalName || line.lineId));
      }

      details.push({
        index: i + 1,
        lineId: line.lineId,
        originalName: line.originalName,
        originalPath: original.path || line.originalRelativePath || line.originalAbsolutePath || "",
        originalExists: original.exists,
        originalDuration: line.originalDuration,
        selectedTakeId: line.selectedTakeId || "",
        selectedTakeName: selectedTake ? selectedTake.fileName : "",
        selectedTakePath: takePath,
        selectedTakeExists: takeExists,
        selectedTakeDuration: takeDuration,
        selectedTakeLongerThanOriginal: isLong,
        exportName: line.exportName || line.originalName,
        status: (!original.exists ? "missing_original" : takeStatus)
      });
    }

    function fileExists(pathValue) {
      try { return !!pathValue && modules.fs.existsSync(pathValue); } catch (e) { return false; }
    }

    var mixMapPath = modules.path.join(metadataDir, "mix-map.json");
    var exportPlanPath = modules.path.join(metadataDir, "export-plan.json");
    var splitPlanPath = modules.path.join(metadataDir, "mix-split-plan.json");
    var exportVerifyJson = modules.path.join(metadataDir, "export-verify-report.json");
    var takeVerifyJson = modules.path.join(metadataDir, "take-verify-report.json");
    var mixSplitVerifyJson = modules.path.join(metadataDir, "mix-split-verify-report.json");

    var readyForDelivery = lineCount > 0 && missingOriginal === 0 && noSelectedTake === 0 && missingSelectedTakeFile === 0;
    if (!readyForDelivery) warnings.push("Teslim öncesi tüm repliklerde seçili ve mevcut take olmalı.");

    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      projectId: project.projectId,
      projectName: project.projectName,
      checkedAt: new Date().toISOString(),
      projectRootPath: normalizeSlashes(project.projectRootPath),
      lineCount: lineCount,
      originalFound: originalFound,
      missingOriginal: missingOriginal,
      selectedTakeCount: selectedTakeCount,
      noSelectedTake: noSelectedTake,
      selectedTakeFileFound: selectedTakeFileFound,
      missingSelectedTakeFile: missingSelectedTakeFile,
      longTakeCount: longTakeCount,
      mixMapExists: fileExists(mixMapPath),
      exportPlanExists: fileExists(exportPlanPath),
      mixSplitPlanExists: fileExists(splitPlanPath),
      takeVerifyReportExists: fileExists(takeVerifyJson),
      mixSplitVerifyReportExists: fileExists(mixSplitVerifyJson),
      exportVerifyReportExists: fileExists(exportVerifyJson),
      readyForDelivery: readyForDelivery,
      ok: missingOriginal === 0 && missingSelectedTakeFile === 0,
      warnings: warnings,
      details: details
    };

    var csvHeaders = ["index","lineId","originalName","originalExists","originalDuration","selectedTakeName","selectedTakeExists","selectedTakeDuration","selectedTakeLongerThanOriginal","exportName","status","originalPath","selectedTakePath"];
    var rows = [csvHeaders.join(",")];
    for (var r = 0; r < details.length; r++) {
      var d = details[r];
      rows.push([d.index, d.lineId, d.originalName, d.originalExists, d.originalDuration, d.selectedTakeName, d.selectedTakeExists, d.selectedTakeDuration, d.selectedTakeLongerThanOriginal, d.exportName, d.status, d.originalPath, d.selectedTakePath].map(csvEscape).join(","));
    }
    var csvPath = modules.path.join(metadataDir, "project-health-report.csv");
    var jsonPath = modules.path.join(metadataDir, "project-health-report.json");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");

    project.lastHealthCheck = {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      checkedAt: report.checkedAt,
      ok: report.ok,
      readyForDelivery: readyForDelivery,
      lineCount: lineCount,
      missingOriginal: missingOriginal,
      noSelectedTake: noSelectedTake,
      missingSelectedTakeFile: missingSelectedTakeFile,
      longTakeCount: longTakeCount
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);

    return {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      ok: report.ok,
      readyForDelivery: readyForDelivery,
      lineCount: lineCount,
      originalFound: originalFound,
      missingOriginal: missingOriginal,
      selectedTakeCount: selectedTakeCount,
      noSelectedTake: noSelectedTake,
      selectedTakeFileFound: selectedTakeFileFound,
      missingSelectedTakeFile: missingSelectedTakeFile,
      longTakeCount: longTakeCount,
      warnings: warnings
    };
  }


  function countAudioFilesInFolder(dirPath, modules) {
    var list = [];
    try {
      if (!modules.fs.existsSync(dirPath)) return 0;
      walkAudioFiles(dirPath, modules, list);
      return list.length;
    } catch (e) {
      return 0;
    }
  }

  function verifyPackageProject(packageRoot) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js dosya okuma/yazma erişimi yok. Paket kontrolü için CEP içinde Node açık olmalı.");
    if (!packageRoot) throw new Error("Kontrol edilecek paket klasörü bilinmiyor.");

    var metadataDir = modules.path.join(packageRoot, ".audub");
    var projectPath = modules.path.join(metadataDir, "project.json");
    var readmePath = modules.path.join(packageRoot, "README_AU_DUB.txt");
    var warnings = [];

    if (!modules.fs.existsSync(projectPath)) throw new Error("Paket içinde .audub/project.json bulunamadı: " + projectPath);
    var packaged = JSON.parse(modules.fs.readFileSync(projectPath, "utf8"));
    packaged.projectRootPath = packageRoot;

    var health = healthCheckProject(packaged);
    var originalDir = modules.path.join(packageRoot, "Audio", "Original");
    var takeDir = modules.path.join(packageRoot, "Audio", "Takes");
    var mixDir = modules.path.join(packageRoot, "Audio", "Mix");
    var exportDir = modules.path.join(packageRoot, "Audio", "Exports");

    var audioOriginalCount = countAudioFilesInFolder(originalDir, modules);
    var audioTakeCount = countAudioFilesInFolder(takeDir, modules);
    var audioMixCount = countAudioFilesInFolder(mixDir, modules);
    var audioExportCount = countAudioFilesInFolder(exportDir, modules);

    if (!modules.fs.existsSync(readmePath)) warnings.push("README_AU_DUB.txt eksik.");
    if (audioOriginalCount < health.lineCount) warnings.push("Paket içindeki orijinal ses sayısı replik sayısından az.");
    if (audioTakeCount < health.selectedTakeCount) warnings.push("Paket içindeki take ses sayısı seçili take sayısından az.");
    if (!health.readyForDelivery) warnings.push("Paket içindeki project.json sağlık kontrolünden geçmedi.");
    if (health.warnings && health.warnings.length) warnings = warnings.concat(health.warnings);

    var ready = modules.fs.existsSync(readmePath) && health.readyForDelivery && audioOriginalCount >= health.lineCount && audioTakeCount >= health.selectedTakeCount;
    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      checkedAt: new Date().toISOString(),
      packageRoot: normalizeSlashes(packageRoot),
      projectJsonExists: true,
      readmeExists: modules.fs.existsSync(readmePath),
      lineCount: health.lineCount,
      selectedTakeCount: health.selectedTakeCount,
      audioOriginalCount: audioOriginalCount,
      audioTakeCount: audioTakeCount,
      audioMixCount: audioMixCount,
      audioExportCount: audioExportCount,
      missingOriginal: health.missingOriginal,
      noSelectedTake: health.noSelectedTake,
      missingSelectedTakeFile: health.missingSelectedTakeFile,
      longTakeCount: health.longTakeCount,
      healthReadyForDelivery: health.readyForDelivery,
      ready: ready,
      warnings: warnings
    };

    var csvPath = modules.path.join(metadataDir, "package-final-report.csv");
    var jsonPath = modules.path.join(metadataDir, "package-final-report.json");
    var headers = ["packageRoot","projectJsonExists","readmeExists","lineCount","selectedTakeCount","audioOriginalCount","audioTakeCount","audioMixCount","audioExportCount","missingOriginal","noSelectedTake","missingSelectedTakeFile","longTakeCount","healthReadyForDelivery","ready","warningCount"];
    var values = [normalizeSlashes(packageRoot), true, report.readmeExists, report.lineCount, report.selectedTakeCount, report.audioOriginalCount, report.audioTakeCount, report.audioMixCount, report.audioExportCount, report.missingOriginal, report.noSelectedTake, report.missingSelectedTakeFile, report.longTakeCount, report.healthReadyForDelivery, report.ready, warnings.length];
    modules.fs.writeFileSync(csvPath, headers.join(",") + "\r\n" + values.map(csvEscape).join(","), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");

    return {
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath),
      packageRoot: normalizeSlashes(packageRoot),
      ready: ready,
      lineCount: health.lineCount,
      selectedTakeCount: health.selectedTakeCount,
      audioOriginalCount: audioOriginalCount,
      audioTakeCount: audioTakeCount,
      audioMixCount: audioMixCount,
      audioExportCount: audioExportCount,
      missingTotal: health.missingOriginal + health.noSelectedTake + health.missingSelectedTakeFile,
      warnings: warnings
    };
  }


  function createTimelinePreviewHtml(plan, previewPath, modules) {
    var maxEnd = Number(plan.totalDurationSeconds || 0);
    var pxPerSecond = maxEnd > 0 ? Math.max(6, Math.min(22, 1100 / maxEnd)) : 10;
    var tracks = {};
    (plan.clips || []).forEach(function (clip) {
      if (!tracks[clip.trackName]) tracks[clip.trackName] = [];
      tracks[clip.trackName].push(clip);
    });
    var trackNames = Object.keys(tracks).sort();
    var css = "body{font-family:Arial,Helvetica,sans-serif;margin:24px;background:#0f1115;color:#eef2ff;}" +
      ".top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px;}" +
      ".card{background:#171a22;border:1px solid #2c3140;border-radius:14px;padding:16px;margin-bottom:14px;}" +
      ".muted{color:#aab2c8}.ok{color:#8ff0a4}.bad{color:#ff9b9b}.warn{color:#ffd479}" +
      ".track{position:relative;margin-top:12px;padding-left:130px;min-height:58px;border-top:1px solid #2c3140;}" +
      ".trackName{position:absolute;left:0;top:16px;width:115px;color:#aab2c8;font-weight:bold;}" +
      ".lane{position:relative;height:52px;overflow:visible;}" +
      ".clip{position:absolute;top:8px;height:34px;border-radius:9px;padding:4px 7px;box-sizing:border-box;overflow:hidden;white-space:nowrap;font-size:12px;line-height:12px;border:1px solid rgba(255,255,255,.25);}" +
      ".clip.original{background:#2b63c6}.clip.take{background:#7f4cc9}.clip.missing{background:#903940;border-color:#ff9b9b}" +
      ".clip.overlap{outline:2px solid #ffd479;outline-offset:1px}" +
      ".gap{position:absolute;top:18px;height:14px;border-radius:3px;background:repeating-linear-gradient(45deg,#202531,#202531 5px,#2c3140 5px,#2c3140 10px);font-size:10px;color:#aab2c8;text-align:center;line-height:14px;overflow:hidden;}" +
      ".legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;margin-top:8px}.legend span{display:inline-flex;align-items:center;gap:6px}.sw{width:14px;height:14px;border-radius:3px;display:inline-block;border:1px solid rgba(255,255,255,.25)}" +
      ".timebar{height:22px;margin-left:130px;border-bottom:1px solid #3a4154;position:relative;}" +
      ".tick{position:absolute;bottom:0;height:8px;border-left:1px solid #596173;font-size:11px;color:#aab2c8;padding-left:3px;}" +
      "table{border-collapse:collapse;width:100%;font-size:12px;}th,td{border-bottom:1px solid #2c3140;padding:6px;text-align:left;}th{color:#cbd5f5;}" +
      "a{color:#9ecbff}";
    var html = [];
    html.push("<!doctype html><html><head><meta charset='utf-8'><title>AU Dub Timeline Preview</title><style>" + css + "</style></head><body>");
    var missingCount = (plan.clips || []).filter(function (c) { return !c.sourceExists; }).length;
    html.push("<div class='top'><div><h1>AU Dub Timeline Önizleme</h1><div class='muted'>" + htmlEscape(plan.projectName) + " · " + htmlEscape(plan.sourceMode) + " · " + htmlEscape(plan.createdAt) + "</div></div><div class='card'><strong>Özet</strong><br>Replik: " + plan.lineCount + "<br>Clip: " + plan.clipCount + "<br>Track: " + plan.trackCount + "<br>Toplam süre: " + plan.totalDurationSeconds + " sn<br>Replik arası boşluk: " + plan.gapSeconds + " sn<br>Eksik kaynak: <span class='" + (missingCount ? "bad" : "ok") + "'>" + missingCount + "</span><br>Uyarı: <span class='" + ((plan.warnings||[]).length ? "warn" : "ok") + "'>" + (plan.warnings||[]).length + "</span></div></div>");
    html.push("<div class='card'><div class='legend'><span><i class='sw' style='background:#2b63c6'></i>ORIGINAL_REF (referans)</span><span><i class='sw' style='background:#7f4cc9'></i>DUB_TAKE (kayıt, tam süre)</span><span><i class='sw' style='background:#903940'></i>Eksik kaynak</span><span><i class='sw' style='background:#2c3140'></i>Boşluk</span><span><i class='sw' style='outline:2px solid #ffd479;background:transparent'></i>Çakışma</span></div></div>");
    html.push("<div class='card'><div class='timebar'>");
    var tickStep = maxEnd > 240 ? 30 : (maxEnd > 120 ? 15 : 10);
    for (var t = 0; t <= maxEnd + 0.001; t += tickStep) {
      html.push("<div class='tick' style='left:" + (t * pxPerSecond).toFixed(1) + "px'>" + t + "s</div>");
    }
    html.push("</div>");
    trackNames.forEach(function (trackName) {
      html.push("<div class='track'><div class='trackName'>" + htmlEscape(trackName) + "</div><div class='lane' style='width:" + Math.ceil(maxEnd * pxPerSecond + 200) + "px'>");
      var ordered = tracks[trackName].slice().sort(function (a, b) { return Number(a.start) - Number(b.start); });
      var prevEnd = null;
      ordered.forEach(function (clip) {
        var start = Number(clip.start || 0);
        var end = Number(clip.end || 0);
        var left = start * pxPerSecond;
        var width = Math.max(24, Number(clip.duration || 0) * pxPerSecond);
        var overlap = prevEnd !== null && start < prevEnd - 0.001;
        if (prevEnd !== null && start > prevEnd + 0.001) {
          var gapDur = Number((start - prevEnd).toFixed(3));
          var gapLeft = prevEnd * pxPerSecond;
          var gapWidth = (start - prevEnd) * pxPerSecond;
          html.push("<div class='gap' title='Boşluk " + gapDur + "s' style='left:" + gapLeft.toFixed(1) + "px;width:" + gapWidth.toFixed(1) + "px'>" + (gapWidth > 26 ? gapDur + "s" : "") + "</div>");
        }
        var klass = "clip " + (clip.type === "take" ? "take" : "original") + (!clip.sourceExists ? " missing" : "") + (overlap ? " overlap" : "");
        var label = (clip.type === "take" ? "TAKE " : "ORG ") + clip.lineId + " · " + clip.sourceFileName + " · " + clip.duration + "s";
        html.push("<div class='" + klass + "' title='" + htmlEscape(label + " | start " + clip.start + " | end " + clip.end + (clip.sourceExists ? "" : " | KAYNAK YOK") + (overlap ? " | ÇAKIŞMA" : "")) + "' style='left:" + left.toFixed(1) + "px;width:" + width.toFixed(1) + "px'>" + htmlEscape(label) + "</div>");
        if (prevEnd === null || end > prevEnd) prevEnd = end;
      });
      html.push("</div></div>");
    });
    html.push("</div>");
    if ((plan.warnings || []).length) {
      html.push("<div class='card'><h2>Uyarılar</h2><ul>");
      plan.warnings.slice(0, 200).forEach(function (w) { html.push("<li class='warn'>" + htmlEscape(w) + "</li>"); });
      html.push("</ul></div>");
    }
    html.push("<div class='card'><h2>Clip Tablosu</h2><table><thead><tr><th>#</th><th>Line</th><th>Tip</th><th>Track</th><th>Start</th><th>Dur</th><th>End</th><th>Kaynak</th><th>Var mı?</th></tr></thead><tbody>");
    (plan.clips || []).forEach(function (clip) {
      html.push("<tr><td>" + clip.index + "</td><td>" + htmlEscape(clip.lineId) + "</td><td>" + htmlEscape(clip.type) + "</td><td>" + htmlEscape(clip.trackName) + "</td><td>" + clip.start + "</td><td>" + clip.duration + "</td><td>" + clip.end + "</td><td>" + htmlEscape(clip.sourceFileName || "") + "</td><td class='" + (clip.sourceExists ? "ok" : "bad") + "'>" + (clip.sourceExists ? "EVET" : "HAYIR") + "</td></tr>");
    });
    html.push("</tbody></table></div>");
    html.push("</body></html>");
    modules.fs.writeFileSync(previewPath, html.join(""), "utf8");
  }

  function timelineSourceForLine(project, line, mode, modules) {
    var sources = [];
    var originalResolved = resolveExistingPath(project, line.originalRelativePath, line.originalAbsolutePath, modules);
    var originalDuration = typeof line.originalDuration === "number" ? line.originalDuration : 0;
    if (mode === "original_only" || mode === "original_and_take") {
      sources.push({
        type: "original",
        trackName: "ORIGINAL_REF",
        trackIndex: 1,
        fileName: line.originalName,
        sourceRelativePath: line.originalRelativePath || null,
        sourceAbsolutePath: originalResolved.path || line.originalAbsolutePath || null,
        sourceExists: originalResolved.exists,
        duration: originalDuration,
        role: "reference"
      });
    }

    if (mode === "take_only" || mode === "original_and_take") {
      var take = getSelectedTake(line);
      var takeRelativePath = take ? (take.fileRelativePath || take.relativePath || null) : null;
      var takeAbsolutePath = take ? (take.fileAbsolutePath || take.absolutePath || null) : null;
      var takeResolved = take ? resolveExistingPath(project, takeRelativePath, takeAbsolutePath, modules) : { path: null, exists: false };
      sources.push({
        type: "take",
        trackName: "DUB_TAKE",
        trackIndex: mode === "take_only" ? 1 : 2,
        fileName: take ? take.fileName : null,
        takeId: take ? take.takeId : null,
        sourceRelativePath: takeRelativePath,
        sourceAbsolutePath: takeResolved.path || takeAbsolutePath,
        sourceExists: take ? takeResolved.exists : false,
        duration: take && typeof take.duration === "number" ? take.duration : originalDuration,
        role: "recorded_take",
        missingTake: !take
      });
    }

    return sources;
  }

  // Slot tabanlı yerleşim mantığı. Hem timeline planı (dosya) hem canlı Audition
  // yerleştirmesi (host) bu tek kaynaktan beslenir; clip start/dur değerleri aynı kalır.
  function buildPlanClips(project, mode, gap, modules) {
    var clips = [];
    var warnings = [];
    var trackNames = {};
    var sessionEnd = 0;
    var cursor = 0;
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var originalDur = typeof line.originalDuration === "number" ? line.originalDuration : 0;
      var sources = timelineSourceForLine(project, line, mode, modules);
      var start = Number(cursor.toFixed(3));
      var slotDur = 0;
      for (var sIdx = 0; sIdx < sources.length; sIdx++) {
        var src = sources[sIdx];
        trackNames[src.trackName] = true;
        var dur = typeof src.duration === "number" && src.duration > 0 ? Number(src.duration.toFixed(3)) : Number(originalDur.toFixed(3));
        if (dur > slotDur) slotDur = dur;
        var end = Number((start + dur).toFixed(3));
        if (!src.sourceExists) warnings.push("Kaynak bulunamadı: " + line.originalName + " / " + src.type);
        if (src.missingTake) warnings.push("Seçili take yok: " + line.originalName);
        clips.push({
          index: clips.length + 1,
          lineId: line.lineId,
          originalName: line.originalName,
          exportName: line.exportName || line.originalName,
          type: src.type,
          role: src.role,
          trackName: src.trackName,
          trackIndex: src.trackIndex,
          start: start,
          duration: dur,
          end: end,
          gapAfterSeconds: gap,
          sourceFileName: src.fileName,
          sourceRelativePath: src.sourceRelativePath,
          sourceAbsolutePath: src.sourceAbsolutePath ? normalizeSlashes(src.sourceAbsolutePath) : null,
          sourceExists: !!src.sourceExists,
          takeId: src.takeId || null,
          shouldPreserveFullDuration: src.type === "take",
          notes: src.type === "take" ? "Take tam süresiyle yerleşir; orijinal süreye kırpılmaz." : "Referans/orijinal ses."
        });
        if (end > sessionEnd) sessionEnd = end;
      }
      cursor = Number((start + slotDur + gap).toFixed(3));
    }
    return { clips: clips, trackNames: Object.keys(trackNames), sessionEnd: Number(sessionEnd.toFixed(3)), warnings: warnings };
  }

  // Canlı Audition yerleştirmesi için host'a gönderilecek hafif payload.
  // Mantık: clip start/dur/track değerlerini timeline planıyla birebir aynı üretir,
  // ama yalnızca kaynağı diskte VAR OLAN clip'leri gönderir (host körlemesine açmaz).
  function buildPlacementPayload(project, options) {
    var modules = getNodeModules();
    if (!modules) throw new Error("CEP Node erişimi yok.");
    if (!project || !project.projectRootPath) throw new Error("Proje kök yolu yok. Önce proje kaydedin veya doğru project.json yükleyin.");
    var mode = options && options.sourceMode ? options.sourceMode : "original_and_take";
    var gap = Number(project.gapSeconds || 0);
    var built = buildPlanClips(project, mode, gap, modules);
    var placeClips = [];
    var skipped = 0;
    for (var i = 0; i < built.clips.length; i++) {
      var c = built.clips[i];
      if (!c.sourceExists || !c.sourceAbsolutePath) { skipped++; continue; }
      // Track 1 clip'ine orijinal dosya adını veriyoruz: mixçi bölme aşamasında
      // kimliği (hangi clip hangi replik) doğrudan canlı session'dan bu adla okuyabilsin.
      var idBase = baseNameNoExt(c.originalName || c.exportName || c.lineId);
      placeClips.push({
        lineId: c.lineId,
        type: c.type,
        trackName: c.trackName,
        startSeconds: c.start,
        durationSeconds: c.duration,
        sourcePath: c.sourceAbsolutePath,
        clipName: (c.type === "take" ? "TAKE " : "") + idBase
      });
    }
    // Track sırası: clip'lerdeki ilk görülme sırasına göre (ORIGINAL_REF, sonra DUB_TAKE).
    var trackOrder = [];
    for (var t = 0; t < placeClips.length; t++) {
      if (trackOrder.indexOf(placeClips[t].trackName) === -1) trackOrder.push(placeClips[t].trackName);
    }
    return {
      projectName: project.projectName,
      sourceMode: mode,
      gapSeconds: gap,
      trackOrder: trackOrder,
      clips: placeClips,
      totalClips: built.clips.length,
      placeableClips: placeClips.length,
      skippedClips: skipped,
      warnings: built.warnings
    };
  }

  // Audition track 2'den okunan canlı kayıt clip'lerini repliklere eşler.
  // liveClips: [{ name, startSeconds, durationSeconds }] (host AU_readTakeClips çıktısı).
  // mode: "position" (orijinalin pozisyonuna en yakın kayıt) | "order" (n. kayıt -> n. replik).
  // Her line için sourceKind="live_recording" take üretir; dosya henüz yok, gerçek timeline
  // pozisyonu mixStart/mixEnd olarak saklanır. Mixçi mixdown'u bu sınırlarla kesilir.
  function alignTakesFromLiveClips(project, liveClips, options) {
    if (!project || !project.lines || !project.lines.length) throw new Error("Önce proje oluştur veya yükle.");
    var modules = getNodeModules();
    var mode = (options && options.mode) || "position";
    var clips = [];
    for (var k = 0; k < (liveClips || []).length; k++) {
      var lc = liveClips[k];
      if (!lc) continue;
      clips.push({
        name: lc.name || null,
        startSeconds: typeof lc.startSeconds === "number" ? lc.startSeconds : 0,
        durationSeconds: typeof lc.durationSeconds === "number" ? lc.durationSeconds : 0
      });
    }
    clips.sort(function (a, b) { return a.startSeconds - b.startSeconds; });

    // Panelin track 1'e dizdiği orijinallerin slot başlangıçlarını (pozisyon eşlemesi için) hesapla.
    var gap = Number(project.gapSeconds || 0);
    var origStartByLine = {};
    try {
      var planned = buildPlanClips(project, "original_only", gap, modules);
      for (var p = 0; p < planned.clips.length; p++) {
        var pc = planned.clips[p];
        if (pc.type === "original") origStartByLine[pc.lineId] = pc.start;
      }
    } catch (ePlan) {}

    var attached = 0;
    var warnings = [];
    var usedClip = {};
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var clip = null;
      if (mode === "order") {
        if (!usedClip[i] && clips[i]) { clip = clips[i]; usedClip[i] = true; }
      } else {
        var target = typeof origStartByLine[line.lineId] === "number"
          ? origStartByLine[line.lineId]
          : (typeof line.timelineStart === "number" ? line.timelineStart : 0);
        var best = -1, bestDiff = Infinity;
        for (var c = 0; c < clips.length; c++) {
          if (usedClip[c]) continue;
          var diff = Math.abs(clips[c].startSeconds - target);
          if (diff < bestDiff) { bestDiff = diff; best = c; }
        }
        if (best >= 0) { clip = clips[best]; usedClip[best] = true; }
      }
      if (!clip) { warnings.push("Eşleşecek kayıt bulunamadı: " + (line.originalName || line.lineId)); continue; }

      var startS = clip.startSeconds;
      var durS = clip.durationSeconds;
      if (!line.takes) line.takes = [];
      for (var t = 0; t < line.takes.length; t++) line.takes[t].isSelected = false;
      var take = {
        takeId: uid("livetake"),
        lineId: line.lineId,
        originalLineName: line.originalName,
        fileName: null,
        originalTakeName: clip.name || null,
        fileRelativePath: null,
        fileAbsolutePath: null,
        duration: durS !== null ? Number(durS.toFixed(3)) : null,
        recordStart: Number(startS.toFixed(3)),
        recordEnd: Number((startS + durS).toFixed(3)),
        mixStart: Number(startS.toFixed(3)),
        mixEnd: Number((startS + durS).toFixed(3)),
        linkedAt: new Date().toISOString(),
        matchMode: mode,
        sourceKind: "live_recording",
        isSelected: true,
        preserveRecordedTail: true,
        notes: "Audition track 2'den canlı kayıt eşlendi. Gerçek timeline pozisyonu mixStart/mixEnd; mixdown bu sınırlarla kesilecek. Take orijinalden uzun olabilir, kırpılmaz."
      };
      line.takes.push(take);
      line.selectedTakeId = take.takeId;
      attached++;
    }

    project.updatedAt = new Date().toISOString();
    try { saveProject(project); } catch (e) {}
    return {
      attached: attached,
      totalLines: project.lines.length,
      clipCount: clips.length,
      unmatched: project.lines.length - attached,
      extraClips: Math.max(0, clips.length - attached),
      mode: mode,
      warnings: warnings
    };
  }

  // Tek bir repliğe canlı kayıt clip'ini elle bağlar (manuel eşleme düzeltmesi).
  function setLiveTakeForLine(project, lineId, clip) {
    if (!project) throw new Error("Proje yok.");
    var line = findLineById(project, lineId);
    if (!line) throw new Error("Replik bulunamadı: " + lineId);
    if (!clip) throw new Error("Kayıt clip'i verilmedi.");
    var startS = typeof clip.startSeconds === "number" ? clip.startSeconds : 0;
    var durS = typeof clip.durationSeconds === "number" ? clip.durationSeconds : 0;
    if (!line.takes) line.takes = [];
    for (var t = 0; t < line.takes.length; t++) line.takes[t].isSelected = false;
    var take = {
      takeId: uid("livetake"),
      lineId: line.lineId,
      originalLineName: line.originalName,
      fileName: null,
      originalTakeName: clip.name || null,
      fileRelativePath: null,
      fileAbsolutePath: null,
      duration: durS !== null ? Number(durS.toFixed(3)) : null,
      recordStart: Number(startS.toFixed(3)),
      recordEnd: Number((startS + durS).toFixed(3)),
      mixStart: Number(startS.toFixed(3)),
      mixEnd: Number((startS + durS).toFixed(3)),
      linkedAt: new Date().toISOString(),
      matchMode: "manual",
      sourceKind: "live_recording",
      isSelected: true,
      preserveRecordedTail: true,
      notes: "Elle eşlendi (manuel). Gerçek timeline pozisyonu mixStart/mixEnd."
    };
    line.takes.push(take);
    line.selectedTakeId = take.takeId;
    project.updatedAt = new Date().toISOString();
    try { saveProject(project); } catch (e) {}
    return { lineId: line.lineId, originalName: line.originalName, take: take };
  }

  // MİXÇİ TARAFI: canlı Audition session'dan gerçek kesim sınırlarını + kimliği okur.
  // track1Clips: ORIGINAL_REF clip'leri (clip.name = orijinal dosya adı) → KİMLİK.
  // track2Clips: kayıt clip'leri (gerçek timeline start/dur) → KESİM SINIRI.
  // Her track2 clip'i, altında olduğu track1 clip'iyle (pozisyon yakınlığı) eşleştirilir;
  // track1 clip adından replik bulunur ve o repliğin take'ine GERÇEK mixStart/mixEnd yazılır.
  // Böylece bölme; project.json'un line SIRASINA değil, session'daki gerçek konuma dayanır
  // ve yanlış proje yüklendiyse (isimler eşleşmez) bunu fark eder.
  function applyLiveBoundariesFromSession(project, track1Clips, track2Clips) {
    if (!project || !project.lines || !project.lines.length) throw new Error("Önce projeyi yükle.");
    function norm(s) { return baseNameNoExt(String(s || "")).toLowerCase().replace(/\s+/g, "_"); }
    var warnings = [];

    // Replik arama tablosu: orijinal ada ve lineId'ye göre.
    var lineByKey = {};
    for (var i = 0; i < project.lines.length; i++) {
      var ln = project.lines[i];
      lineByKey[norm(ln.originalName || ln.exportName || ln.lineId)] = ln;
      lineByKey[String(ln.lineId).toLowerCase()] = ln;
    }

    var t1 = (track1Clips || []).slice();
    var t2 = (track2Clips || []).slice().sort(function (a, b) { return (a.startSeconds || 0) - (b.startSeconds || 0); });
    var usedT2 = {};
    var matched = 0, unmatchedLine = 0, unmatchedName = 0;

    for (var c = 0; c < t1.length; c++) {
      var clip1 = t1[c];
      var rawName = String(clip1.name || "");
      var key = rawName.toLowerCase();
      if (key.indexOf("org ") === 0) key = key.substring(4); // eski "ORG line_0001" biçimi
      key = norm(key);
      var line = lineByKey[key] || lineByKey[rawName.toLowerCase()];
      if (!line) { warnings.push("Track 1 clip '" + rawName + "' projede eşleşmedi (yanlış project.json olabilir)."); unmatchedName++; continue; }

      // Bu orijinalin altındaki kaydı bul: start'ı en yakın, kullanılmamış track2 clip.
      var t1start = typeof clip1.startSeconds === "number" ? clip1.startSeconds : 0;
      var best = -1, bestDiff = Infinity;
      for (var k = 0; k < t2.length; k++) {
        if (usedT2[k]) continue;
        var d = Math.abs((t2[k].startSeconds || 0) - t1start);
        if (d < bestDiff) { bestDiff = d; best = k; }
      }
      if (best < 0) { warnings.push("'" + (line.originalName || line.lineId) + "' için track 2'de kayıt yok."); unmatchedLine++; continue; }
      usedT2[best] = true;
      var clip2 = t2[best];
      var startS = typeof clip2.startSeconds === "number" ? clip2.startSeconds : 0;
      var durS = typeof clip2.durationSeconds === "number" ? clip2.durationSeconds : 0;
      var endS = Number((startS + durS).toFixed(3));

      if (!line.takes) line.takes = [];
      var sel = getSelectedTake(line);
      if (sel) {
        sel.mixStart = Number(startS.toFixed(3));
        sel.mixEnd = endS;
        sel.duration = Number(durS.toFixed(3));
        if (!sel.sourceKind || sel.sourceKind === "take") sel.sourceKind = "live_recording";
        sel.notes = "Mixçi tarafında canlı session'dan gerçek konumla güncellendi.";
      } else {
        for (var u = 0; u < line.takes.length; u++) line.takes[u].isSelected = false;
        var take = {
          takeId: uid("livetake"),
          lineId: line.lineId,
          originalLineName: line.originalName,
          fileName: null,
          originalTakeName: clip2.name || null,
          fileRelativePath: null,
          fileAbsolutePath: null,
          duration: Number(durS.toFixed(3)),
          recordStart: Number(startS.toFixed(3)),
          recordEnd: endS,
          mixStart: Number(startS.toFixed(3)),
          mixEnd: endS,
          linkedAt: new Date().toISOString(),
          matchMode: "session",
          sourceKind: "live_recording",
          isSelected: true,
          preserveRecordedTail: true,
          notes: "Mixçi tarafında canlı session'dan okundu (track1 kimlik + track2 sınır)."
        };
        line.takes.push(take);
        line.selectedTakeId = take.takeId;
      }
      matched++;
    }

    project.updatedAt = new Date().toISOString();
    try { saveProject(project); } catch (e) {}
    return {
      matched: matched,
      unmatchedName: unmatchedName,
      unmatchedLine: unmatchedLine,
      totalLines: project.lines.length,
      track1Count: t1.length,
      track2Count: t2.length,
      warnings: warnings
    };
  }

  function createTimelinePlan(project, options) {
    var modules = getNodeModules();
    if (!modules) throw new Error("CEP Node erişimi yok. Timeline planı dosyaya yazılamıyor.");
    if (!project || !project.projectRootPath) throw new Error("Proje kök yolu yok. Önce proje kaydedin veya doğru project.json yükleyin.");
    ensureProjectFolders(project.projectRootPath, modules);

    var mode = options && options.sourceMode ? options.sourceMode : "original_and_take";
    var gap = Number(project.gapSeconds || 0);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var csvPath = modules.path.join(metadataDir, "timeline-plan.csv");
    var jsonPath = modules.path.join(metadataDir, "timeline-plan.json");
    var notesPath = modules.path.join(metadataDir, "timeline-plan-readme.txt");
    var previewPath = modules.path.join(metadataDir, "timeline-preview.html");
    var built = buildPlanClips(project, mode, gap, modules);
    var clips = built.clips;
    var warnings = built.warnings;
    var trackNames = {};
    built.trackNames.forEach(function (n) { trackNames[n] = true; });
    var sessionEnd = built.sessionEnd;

    var plan = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      createdAt: new Date().toISOString(),
      projectId: project.projectId,
      projectName: project.projectName,
      projectRootPath: normalizeSlashes(project.projectRootPath),
      sourceMode: mode,
      gapSeconds: gap,
      trackCount: Object.keys(trackNames).length,
      clipCount: clips.length,
      lineCount: project.lines.length,
      totalDurationSeconds: Number(sessionEnd.toFixed(3)),
      clips: clips,
      warnings: warnings,
      nextStep: "Bu plan Audition timeline otomasyonu veya .sesx üretimi için güvenli yerleşim haritasıdır."
    };

    var headers = ["index","lineId","originalName","exportName","type","trackName","trackIndex","start","duration","end","gapAfterSeconds","sourceFileName","sourceRelativePath","sourceAbsolutePath","sourceExists","takeId","shouldPreserveFullDuration","notes"];
    var csv = [headers.join(",")];
    for (var c = 0; c < clips.length; c++) {
      var row = clips[c];
      csv.push(headers.map(function (h) { return csvEscape(row[h]); }).join(","));
    }
    modules.fs.writeFileSync(jsonPath, JSON.stringify(plan, null, 2), "utf8");
    modules.fs.writeFileSync(csvPath, csv.join("\r\n"), "utf8");
    modules.fs.writeFileSync(notesPath, [
      "AU Dub Panel Timeline Plan",
      "Bu dosya Audition timeline otomasyonu için ara haritadır.",
      "Şu aşamada Audition timeline'ına doğrudan dokunmaz.",
      "CSV/JSON içindeki start, duration ve trackName bilgileri bir sonraki .sesx/host otomasyonunda kullanılacak.",
      "Take kayıtları orijinal süreye kırpılmaz; selected take'in gerçek duration değeri kullanılır."
    ].join("\r\n"), "utf8");
    createTimelinePreviewHtml(plan, previewPath, modules);

    project.lastTimelinePlan = {
      jsonPath: normalizeSlashes(jsonPath),
      csvPath: normalizeSlashes(csvPath),
      notesPath: normalizeSlashes(notesPath),
      previewPath: normalizeSlashes(previewPath),
      sourceMode: mode,
      clipCount: clips.length,
      trackCount: plan.trackCount,
      totalDurationSeconds: plan.totalDurationSeconds,
      createdAt: plan.createdAt
    };
    project.updatedAt = new Date().toISOString();

    return {
      jsonPath: normalizeSlashes(jsonPath),
      csvPath: normalizeSlashes(csvPath),
      notesPath: normalizeSlashes(notesPath),
      previewPath: normalizeSlashes(previewPath),
      clipCount: clips.length,
      trackCount: plan.trackCount,
      totalDuration: plan.totalDurationSeconds,
      warnings: warnings
    };
  }

  function verifyTimelinePlan(project) {
    var modules = getNodeModules();
    if (!modules) throw new Error("CEP Node erişimi yok. Timeline planı okunamıyor.");
    if (!project || !project.projectRootPath) throw new Error("Proje kök yolu yok.");
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var planPath = project.lastTimelinePlan && project.lastTimelinePlan.jsonPath ? project.lastTimelinePlan.jsonPath : modules.path.join(metadataDir, "timeline-plan.json");
    if (!modules.fs.existsSync(planPath)) throw new Error("Timeline planı bulunamadı. Önce Timeline Plan Kaydet deyin.");
    var plan = JSON.parse(modules.fs.readFileSync(planPath, "utf8"));
    var clips = plan.clips || [];
    var warnings = [];
    var missingSources = 0;
    var validClips = 0;
    var overlapCount = 0;
    var byTrack = {};
    var rows = [];

    for (var i = 0; i < clips.length; i++) {
      var clip = clips[i];
      var resolved = resolveExistingPath(project, clip.sourceRelativePath, clip.sourceAbsolutePath, modules);
      var exists = resolved.exists;
      if (!exists) {
        missingSources++;
        warnings.push("Kaynak yok: " + clip.lineId + " / " + clip.type + " / " + (clip.sourceFileName || "-"));
      } else {
        validClips++;
      }
      if (!byTrack[clip.trackName]) byTrack[clip.trackName] = [];
      byTrack[clip.trackName].push(clip);
      rows.push({
        index: clip.index,
        lineId: clip.lineId,
        type: clip.type,
        trackName: clip.trackName,
        start: clip.start,
        duration: clip.duration,
        end: clip.end,
        sourceFileName: clip.sourceFileName,
        resolvedPath: resolved.path || "",
        exists: exists,
        issue: exists ? "" : "missing_source"
      });
    }

    Object.keys(byTrack).forEach(function (trackName) {
      var list = byTrack[trackName].slice().sort(function (a, b) { return a.start - b.start; });
      for (var i = 1; i < list.length; i++) {
        if (Number(list[i].start) < Number(list[i - 1].end) - 0.001) {
          overlapCount++;
          warnings.push("Çakışma: " + trackName + " / " + list[i - 1].lineId + " -> " + list[i].lineId);
        }
      }
    });

    var ok = missingSources === 0 && overlapCount === 0;
    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: "1.0.5",
      checkedAt: new Date().toISOString(),
      projectRootPath: normalizeSlashes(project.projectRootPath),
      planPath: normalizeSlashes(planPath),
      expectedClips: clips.length,
      validClips: validClips,
      missingSources: missingSources,
      overlapCount: overlapCount,
      ok: ok,
      warnings: warnings,
      rows: rows
    };
    var csvPath = modules.path.join(metadataDir, "timeline-plan-verify-report.csv");
    var jsonPath = modules.path.join(metadataDir, "timeline-plan-verify-report.json");
    var headers = ["index","lineId","type","trackName","start","duration","end","sourceFileName","resolvedPath","exists","issue"];
    var csv = [headers.join(",")];
    rows.forEach(function (row) { csv.push(headers.map(function (h) { return csvEscape(row[h]); }).join(",")); });
    modules.fs.writeFileSync(csvPath, csv.join("\r\n"), "utf8");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    return {
      expectedClips: clips.length,
      validClips: validClips,
      missingSources: missingSources,
      overlapCount: overlapCount,
      ok: ok,
      warnings: warnings,
      csvPath: normalizeSlashes(csvPath),
      jsonPath: normalizeSlashes(jsonPath)
    };
  }

  function createDownload(project) {
    var blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "project.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  global.ProjectStore = {
    buildProjectFromFiles: buildProjectFromFiles,
    buildProjectFromFolder: buildProjectFromFolder,
    buildProjectFromPaths: buildProjectFromPaths,
    buildProjectFromLiveClips: buildProjectFromLiveClips,
    buildProjectFromMatchedTracks: buildProjectFromMatchedTracks,
    saveProject: saveProject,
    loadProjectFromFile: loadProjectFromFile,
    loadProjectFromPath: loadProjectFromPath,
    packageProject: packageProject,
    zipFolder: zipFolder,
    waitForFileStable: waitForFileStable,
    revealFolder: revealFolder,
    pickFolderDialog: pickFolderDialog,
    pickFileDialog: pickFileDialog,
    attachTakeFiles: attachTakeFiles,
    verifyTakeLinks: verifyTakeLinks,
    createMixMapPlan: createMixMapPlan,
    createExportPlan: createExportPlan,
    createFfmpegExportScript: createFfmpegExportScript,
    verifyExportOutputs: verifyExportOutputs,
    runFfmpegExport: runFfmpegExport,
    createMixSplitPlan: createMixSplitPlan,
    createFfmpegMixSplitScript: createFfmpegMixSplitScript,
    runFfmpegMixSplit: runFfmpegMixSplit,
    verifyMixSplitOutputs: verifyMixSplitOutputs,
    healthCheckProject: healthCheckProject,
    autoAttachExistingTakes: autoAttachExistingTakes,
    verifyPackageProject: verifyPackageProject,
    createTimelinePlan: createTimelinePlan,
    verifyTimelinePlan: verifyTimelinePlan,
    buildPlacementPayload: buildPlacementPayload,
    alignTakesFromLiveClips: alignTakesFromLiveClips,
    setLiveTakeForLine: setLiveTakeForLine,
    applyLiveBoundariesFromSession: applyLiveBoundariesFromSession,
    getSelectedTake: getSelectedTake,
    createDownload: createDownload,
    createExportPreset: createExportPreset,
    getAllExportPresets: getAllExportPresets,
    describePreset: describePreset,
    naturalCompare: naturalCompare
  };
})(window);
