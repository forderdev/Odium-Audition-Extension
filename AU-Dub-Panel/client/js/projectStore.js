(function (global) {
  (global.__odiumAuthShards = global.__odiumAuthShards || []).push({ order: 10, shift: 9, u: [120, 109], p: [120, 131] });

  var APP_VERSION = "1.3";
  var AUDIO_EXTENSIONS = ["wav", "wave", "bwf", "mp3", "ogg", "oga", "flac", "aif", "aiff", "aifc", "m4a", "aac", "w64"];
  var DEFAULT_RECORDING_HEAD_TRIM_ENABLED = true;
  var DEFAULT_RECORDING_HEAD_TRIM_MODE = "auto";
  var DEFAULT_RECORDING_HEAD_TRIM_MS = 250;
  var MAX_RECORDING_HEAD_TRIM_MS = 1000;
  var AUTO_HEAD_TRIM_MIN_USEFUL_SECONDS = 0.18;
  var AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS = 0.25;
  var AUTO_HEAD_TRIM_MAX_SECONDS = 1.2;
  var AUTO_HEAD_TRIM_FADE_SECONDS = 0.01;
  var AUTO_HEAD_TRIM_FILTER = "silenceremove=start_periods=1:start_duration=0.12:start_threshold=-40dB:start_silence=0.08:detection=rms:window=0.02";

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

  function fileNameForSort(value) {
    if (!value) return "";
    if (typeof value === "string") {
      var normalized = normalizeSlashes(value);
      var slash = normalized.lastIndexOf("/");
      return slash >= 0 ? normalized.slice(slash + 1) : normalized;
    }
    if (value.name) return String(value.name);
    if (value.path) return fileNameForSort(value.path);
    return String(value);
  }

  function compareByFileName(a, b) {
    var byName = naturalCompare(fileNameForSort(a), fileNameForSort(b));
    if (byName) return byName;
    return naturalCompare(
      typeof a === "string" ? a : (a && a.path ? a.path : fileNameForSort(a)),
      typeof b === "string" ? b : (b && b.path ? b.path : fileNameForSort(b))
    );
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
    files.sort(compareByFileName);

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
      appVersion: APP_VERSION,
      projectId: uid("project"),
      projectName: options.projectName || "Game_Dub_Project",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gapSeconds: gapSeconds,
      recordingHeadTrimEnabled: normalizeRecordingHeadTrimEnabled(options.recordingHeadTrimEnabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED),
      recordingHeadTrimMode: normalizeRecordingHeadTrimMode(options.recordingHeadTrimMode, DEFAULT_RECORDING_HEAD_TRIM_MODE),
      recordingHeadTrimMs: normalizeRecordingHeadTrimMs(options.recordingHeadTrimMs, DEFAULT_RECORDING_HEAD_TRIM_MS),
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
      try {
        if (!modules.fs.existsSync(dirPath)) modules.fs.mkdirSync(dirPath, { recursive: true });
      } catch (e) {
        var code = e && e.code ? " [" + e.code + "]" : "";
        throw new Error("Proje klasörüne yazılamıyor" + code + ": " + dirPath + ". Paketi ZIP içinden çalıştırmayın; tamamen çıkarıp yazılabilir bir klasöre taşıyın.");
      }
    }
  }

  // Bir yol, verilen kökün altında mı? (Paket taşındığında gönderenin yolları dışarıda kalır.)
  function isPathInsideRoot(value, rootPath) {
    if (!value || !rootPath) return false;
    var v = normalizeSlashes(value).toLowerCase().replace(/\/+$/, "");
    var r = normalizeSlashes(rootPath).toLowerCase().replace(/\/+$/, "");
    return v === r || v.indexOf(r + "/") === 0;
  }

  // Paket taşındığında project.json içindeki eski makineye ait üretilmiş çıktı yollarını
  // (split script/plan, export klasörü) düşürür. Böylece yeniden üretilirler.
  function dropStalePathsOutsideRoot(project, rootPath) {
    var dropped = [];
    if (project.lastMixSplitScript && !isPathInsideRoot(project.lastMixSplitScript.ps1Path, rootPath)) {
      delete project.lastMixSplitScript;
      dropped.push("lastMixSplitScript");
    }
    if (project.lastMixSplitPlan && !isPathInsideRoot(project.lastMixSplitPlan.mixFileAbsolutePath, rootPath)) {
      // Plan'ın kendisi (kesim sınırları) değerli; sadece geçersiz mix dosya yolunu düşür.
      delete project.lastMixSplitPlan.mixFileAbsolutePath;
      dropped.push("lastMixSplitPlan.mixFileAbsolutePath");
    }
    if (project.exportOutputDir && !isPathInsideRoot(project.exportOutputDir, rootPath)) {
      project.exportOutputDir = "";
      dropped.push("exportOutputDir");
    }
    if (project.lastExportScript && !isPathInsideRoot(project.lastExportScript.ps1Path, rootPath)) {
      delete project.lastExportScript;
      dropped.push("lastExportScript");
    }
    project.stalePathsDropped = dropped;
    return dropped;
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
          normalizeRecordingHeadTrimSettings(project);
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
      appVersion: APP_VERSION,
      projectId: uid("project"),
      projectName: options.projectName || "Game_Dub_Project",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gapSeconds: gapSeconds,
      recordingHeadTrimEnabled: normalizeRecordingHeadTrimEnabled(options.recordingHeadTrimEnabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED),
      recordingHeadTrimMode: normalizeRecordingHeadTrimMode(options.recordingHeadTrimMode, DEFAULT_RECORDING_HEAD_TRIM_MODE),
      recordingHeadTrimMs: normalizeRecordingHeadTrimMs(options.recordingHeadTrimMs, DEFAULT_RECORDING_HEAD_TRIM_MS),
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
    found.sort(compareByFileName);
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
    list = list.slice().sort(compareByFileName);

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
      // Audition clip'in kaynak dosyası okunabildiyse düzey eşitleme referansı olarak kullanılır.
      var oFilePath = (o.filePath && String(o.filePath).trim()) ? normalizeSlashes(String(o.filePath).trim()) : null;
      lines.push({
        lineId: lineId,
        originalName: nm,
        originalRelativePath: null,
        originalAbsolutePath: oFilePath,
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
    var resolvedFilePath = modules.path.resolve(filePath);
    var txt = modules.fs.readFileSync(resolvedFilePath, "utf8");
    var project = JSON.parse(String(txt || ""));
    if (!project || !project.lines || typeof project.lines.length === "undefined") {
      throw new Error("Bu dosya geçerli bir AU Dub project.json değil.");
    }
    // Paket taşındığında JSON içindeki mutlak kök eski bilgisayarı gösterir. Seçilen
    // .audub/project.json konumunu tek kaynak kabul edip tüm yeni çıktıları buraya yaz.
    var metadataDir = modules.path.dirname(resolvedFilePath);
    var loadedRoot = modules.path.basename(metadataDir).toLowerCase() === ".audub"
      ? modules.path.dirname(metadataDir)
      : metadataDir;
    project.loadedFromPath = normalizeSlashes(resolvedFilePath);
    project.projectRootPath = normalizeSlashes(loadedRoot);
    project.packageRootPath = normalizeSlashes(loadedRoot);
    // Gönderenin makinesinde üretilmiş split/export çıktı yolları burada geçersiz.
    // Temizlenmezse yeniden kullanılıp erişilemeyen köke yazmaya çalışırlar (EPERM).
    dropStalePathsOutsideRoot(project, project.projectRootPath);
    project.updatedAt = project.updatedAt || new Date().toISOString();
    normalizeRecordingHeadTrimSettings(project);
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

  function normalizeRecordingHeadTrimMs(value, fallback) {
    var number = Number(value);
    if (!isFinite(number)) number = Number(fallback || 0);
    if (!isFinite(number)) number = 0;
    return Math.max(0, Math.min(MAX_RECORDING_HEAD_TRIM_MS, Math.round(number)));
  }

  function normalizeRecordingHeadTrimSanitizedMs(value) {
    var number = Number(value);
    if (!isFinite(number)) number = 0;
    return Math.max(0, Math.min(Math.round(AUTO_HEAD_TRIM_MAX_SECONDS * 1000), Math.round(number)));
  }

  function normalizeRecordingHeadTrimEnabled(value, fallback) {
    if (typeof value === "undefined" || value === null || value === "") return fallback !== false;
    if (typeof value === "string") {
      var text = value.toLowerCase();
      return text !== "false" && text !== "0" && text !== "off";
    }
    return value !== false && value !== 0;
  }

  function normalizeRecordingHeadTrimMode(value, fallback) {
    var mode = String(value || fallback || DEFAULT_RECORDING_HEAD_TRIM_MODE).toLowerCase();
    return mode === "fixed" ? "fixed" : "auto";
  }

  function normalizeRecordingHeadTrimSettings(project, source) {
    source = source || project || {};
    project.recordingHeadTrimEnabled = normalizeRecordingHeadTrimEnabled(source.recordingHeadTrimEnabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED);
    project.recordingHeadTrimMode = normalizeRecordingHeadTrimMode(source.recordingHeadTrimMode, DEFAULT_RECORDING_HEAD_TRIM_MODE);
    project.recordingHeadTrimMs = normalizeRecordingHeadTrimMs(source.recordingHeadTrimMs, DEFAULT_RECORDING_HEAD_TRIM_MS);
    return project;
  }

  function recordingHeadTrimEligible(take) {
    var sourceKind = String(take && take.sourceKind || "").toLowerCase();
    var matchMode = String(take && take.matchMode || "").toLowerCase();
    var isAlreadySplit = sourceKind.indexOf("mix_split") === 0;
    var isLive = sourceKind === "live_recording" ||
      ["position", "order", "manual", "session", "mixer_positions", "mixer_two_track"].indexOf(matchMode) >= 0;
    return isLive && !isAlreadySplit;
  }

  function recordingMixBounds(take, requestedTrimMs, enabled, mode) {
    var rawStart = take && typeof take.mixStart === "number" ? take.mixStart : 0;
    var rawEnd = take && typeof take.mixEnd === "number" ? take.mixEnd : rawStart;
    var duration = Number(Math.max(0, rawEnd - rawStart).toFixed(3));
    var requested = normalizeRecordingHeadTrimMs(requestedTrimMs, 0);
    var trimEnabled = normalizeRecordingHeadTrimEnabled(enabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED);
    var trimMode = normalizeRecordingHeadTrimMode(mode, DEFAULT_RECORDING_HEAD_TRIM_MODE);
    var eligible = recordingHeadTrimEligible(take);
    var applied = 0;
    var sanitized = normalizeRecordingHeadTrimSanitizedMs(take && take.headTrimSanitizedMs);

    if (trimEnabled && eligible && sanitized > 0 && duration > AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS) {
      var sanitizedMax = Math.max(0, Math.round((duration - AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS) * 1000));
      applied = Math.max(0, Math.min(sanitized, sanitizedMax));
    } else if (trimEnabled && trimMode === "fixed" && eligible && duration > 0.05 && requested > 0) {
      var maxByFraction = Math.round(duration * 250); // clip süresinin en fazla %25'i
      var maxByRemainingAudio = Math.max(0, Math.round((duration - 0.05) * 1000));
      applied = Math.max(0, Math.min(requested, maxByFraction, maxByRemainingAudio));
    }

    var start = Number((rawStart + applied / 1000).toFixed(3));
    var end = Number(rawEnd.toFixed(3));
    return {
      start: start,
      end: end,
      duration: Number(Math.max(0, end - start).toFixed(3)),
      requestedMs: requested,
      appliedMs: applied,
      eligible: eligible,
      autoEligible: trimEnabled && trimMode === "auto" && eligible && duration > 0.05 && applied === 0
    };
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

  function getChildProcessModule() {
    try { return (global.cep_node && global.cep_node.require ? global.cep_node.require : global.require)("child_process"); }
    catch (e) { return null; }
  }

  // ffmpeg volumedetect ile bir dosyanın ortalama (mean) ve tepe (max) dB'sini ölçer. Senkron; hata halinde null.
  function measureVolumeStats(ffmpegExe, filePath, cp) {
    try {
      var r = cp.spawnSync(ffmpegExe, ["-hide_banner", "-nostats", "-i", filePath, "-af", "volumedetect", "-f", "null", "NUL"], { encoding: "utf8", windowsHide: true });
      var txt = String(r.stderr || "") + String(r.stdout || "");
      var mm = /mean_volume:\s*(-?[\d.]+)\s*dB/.exec(txt);
      var mx = /max_volume:\s*(-?[\d.]+)\s*dB/.exec(txt);
      if (!mm) return null;
      return { mean: Number(mm[1]), max: mx ? Number(mx[1]) : null };
    } catch (e) { return null; }
  }

  // SESLENDİRMEN tarafı düzey eşitleme: her repliğin kayıt dosyasına, orijinalinin
  // ortalama dB'sine gelecek gain hesaplar. Aynı dosyayı paylaşan replikler (tek uzun
  // kayıt + delete-silence) tek dosyada birleştiği için hedeflerin ortalaması alınır.
  // Tepe -1 dBFS'i aşacaksa gain kısılır (clipping koruması).
  // Kayıt dosyası iki yoldan bulunur: (1) Audition API clip dosya yolunu verdiyse
  // take.liveFilePath; (2) veremiyorsa clip ADI session klasöründeki dosya adlarıyla
  // eşleştirilir (Audition kayıt clip'ini dosya adıyla adlandırır).
  function buildRecordingGainMap(project, ffmpegExe, modules, sesxDir, skipPrefixLower) {
    var out = { gains: {}, warnings: [], ffmpegOk: false, lineCount: 0, fileCount: 0, resolvedByName: 0 };
    var cp = getChildProcessModule();
    if (!cp) { out.warnings.push("child_process erişimi yok; düzey eşitleme atlandı."); return out; }
    try {
      var probe = cp.spawnSync(ffmpegExe, ["-version"], { encoding: "utf8", windowsHide: true });
      out.ffmpegOk = probe && probe.status === 0;
    } catch (eP) {}
    if (!out.ffmpegOk) { out.warnings.push("FFmpeg çalıştırılamadı (" + ffmpegExe + "); düzey eşitleme atlandı."); return out; }

    // Session klasöründeki ses dosyalarını taban adlarına göre indexle (isimden eşleştirme için).
    var mediaByBase = {};
    if (sesxDir) {
      try {
        var media = walkAudioFiles(sesxDir, modules, []);
        for (var m = 0; m < media.length; m++) {
          var mPath = media[m].path;
          var mLower = normalizeSlashes(mPath).toLowerCase();
          if (skipPrefixLower && mLower.indexOf(skipPrefixLower) === 0) continue; // paketin kendi içi
          if (mLower.indexOf("_au_dub_package_") >= 0) continue;                  // eski paketler
          var base = baseNameNoExt(modules.path.basename(mPath)).toLowerCase();
          if (!mediaByBase[base]) mediaByBase[base] = [];
          mediaByBase[base].push(mPath);
        }
      } catch (eWalk) { out.warnings.push("Session klasörü taranamadı: " + eWalk.message); }
    }

    function resolveRecordingPath(take, line) {
      if (take.liveFilePath) {
        try { if (modules.fs.existsSync(take.liveFilePath)) return take.liveFilePath; } catch (e1) {}
      }
      // Fallback: clip adı -> session medya dosya adı
      var nm = take.originalTakeName || take.fileName || "";
      if (nm) {
        var key = baseNameNoExt(String(nm)).toLowerCase();
        var arr = mediaByBase[key];
        if (arr && arr.length) {
          if (arr.length > 1) out.warnings.push("Aynı adda birden çok kayıt dosyası, ilki kullanıldı: " + nm);
          out.resolvedByName++;
          return arr[0];
        }
      }
      out.warnings.push("Kayıt dosyası bulunamadı (clip adı: " + (nm || "?") + "): " + (line.originalName || line.lineId));
      return "";
    }

    var statCache = {};
    function stats(p) {
      var k = normalizeSlashes(p).toLowerCase();
      if (!(k in statCache)) statCache[k] = measureVolumeStats(ffmpegExe, p, cp);
      return statCache[k];
    }

    var deltasByFile = {};
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var take = getSelectedTake(line);
      if (!take) continue;
      var rec = resolveRecordingPath(take, line);
      if (!rec) continue;
      var orig = resolveLevelRefPath(project, line, modules);
      if (!orig) { out.warnings.push("Orijinal dosya bulunamadı: " + (line.originalName || line.lineId)); continue; }
      var so = stats(orig);
      var sr = stats(rec);
      if (!so || !sr || sr.max === null) { out.warnings.push("Düzey ölçülemedi: " + (line.originalName || line.lineId)); continue; }
      var key = normalizeSlashes(rec).toLowerCase();
      if (!deltasByFile[key]) deltasByFile[key] = { path: rec, deltas: [], recMax: sr.max };
      deltasByFile[key].deltas.push(so.mean - sr.mean);
      out.lineCount++;
    }
    for (var k in deltasByFile) {
      if (!deltasByFile.hasOwnProperty(k)) continue;
      var d = deltasByFile[k];
      var sum = 0;
      for (var j = 0; j < d.deltas.length; j++) sum += d.deltas[j];
      var target = sum / d.deltas.length;
      var maxBoost = -1.0 - d.recMax; // tepe -1 dBFS sınırı
      var applied = Math.min(target, maxBoost);
      out.gains[k] = {
        path: d.path,
        target: Number(target.toFixed(2)),
        applied: Number(applied.toFixed(2)),
        clamped: applied < target - 0.01,
        lines: d.deltas.length
      };
      out.fileCount++;
    }
    return out;
  }

  function resolveTakeFilePath(project, take, modules) {
    if (!take) return "";
    var candidates = [];
    if (take.liveFilePath) candidates.push(take.liveFilePath);
    if (take.fileAbsolutePath) candidates.push(take.fileAbsolutePath);
    if (project && project.projectRootPath && take.fileRelativePath) {
      candidates.push(modules.path.join(project.projectRootPath, take.fileRelativePath));
    }
    for (var i = 0; i < candidates.length; i++) {
      try { if (modules.fs.existsSync(candidates[i])) return candidates[i]; } catch (ignoreExists) {}
    }
    return candidates.length ? candidates[0] : "";
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
    packaged.appVersion = APP_VERSION;
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
        var takeSrc = resolveTakeFilePath(project, take, modules);
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
    var leveledSessionFiles = 0;

    // Düzey eşitleme (seslendirmen tarafı): paket kopyalarındaki kayıt dosyaları
    // orijinallerinin ortalama dB'sine çekilir. Aktörün KENDİ session dosyalarına
    // dokunulmaz; sadece pakete yazılan kopyalar değişir. Gain haritası ORİJİNAL
    // proje üzerinden hesaplanır (packaged kopyada yollar yeniden yazıldı).
    var levelGains = null;
    var levelFfmpeg = (options.ffmpegPath && String(options.ffmpegPath).trim()) ? String(options.ffmpegPath).trim()
      : ((project.ffmpegPath && String(project.ffmpegPath).trim()) ? String(project.ffmpegPath).trim() : "ffmpeg");
    if (options.levelMatchOriginal && sesxPath) {
      var sesxDirForLevel = "";
      try { sesxDirForLevel = modules.path.dirname(sesxPath); } catch (eD) {}
      try { levelGains = buildRecordingGainMap(project, levelFfmpeg, modules, sesxDirForLevel, normalizeSlashes(packageRoot).toLowerCase()); }
      catch (eGain) { levelGains = { gains: {}, warnings: ["Düzey haritası hesaplanamadı: " + eGain.message], lineCount: 0, fileCount: 0, resolvedByName: 0 }; }
    }

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
            var relMedia = normalizeSlashes(modules.path.relative(sesxDir, mp));
            var relLower = relMedia.toLowerCase();
            var relParts = relLower.split("/");
            var insideNestedPackage = false;
            for (var rp = 0; rp < relParts.length - 1; rp++) {
              if (relParts[rp].indexOf("_au_dub_package_") >= 0) { insideNestedPackage = true; break; }
            }
            if (insideNestedPackage) continue;                      // yalnizca ic ice eski paketler
            // Paketin kendi rezerve klasörleriyle çakışmayı önle.
            if (relLower.indexOf("audio/") === 0 || relLower.indexOf(".audub/") === 0) continue;
            var mDest = modules.path.join(packageRoot, relMedia);
            try {
              var mDestDir = modules.path.dirname(mDest);
              if (!modules.fs.existsSync(mDestDir)) modules.fs.mkdirSync(mDestDir, { recursive: true });
              if (!modules.fs.existsSync(mDest)) {
                // Bu dosya bir kayıt dosyasıysa ve gain hesaplandıysa: kopyalarken düzeyi eşitle.
                var gainEntry = (levelGains && levelGains.gains) ? levelGains.gains[mpNorm] : null;
                var leveledHere = false;
                if (gainEntry && Math.abs(gainEntry.applied) >= 0.3) {
                  var cpLvl = getChildProcessModule();
                  if (cpLvl) {
                    var rL = cpLvl.spawnSync(levelFfmpeg,
                      ["-hide_banner", "-loglevel", "error", "-y", "-i", mp, "-af", "volume=" + gainEntry.applied + "dB", "-c:a", "pcm_f32le", mDest],
                      { encoding: "utf8", windowsHide: true });
                    if (rL && rL.status === 0 && modules.fs.existsSync(mDest)) {
                      leveledHere = true;
                      leveledSessionFiles++;
                    } else {
                      try { if (modules.fs.existsSync(mDest)) modules.fs.unlinkSync(mDest); } catch (eU) {}
                      if (levelGains) levelGains.warnings.push("Gain uygulanamadı, düz kopyalandı: " + relMedia);
                    }
                  }
                }
                if (!leveledHere) modules.fs.copyFileSync(mp, mDest);
              }
              sessionMediaCount++;
            } catch (eCopyM) {}
          }
        } catch (eMedia) {}
      }
    }

    var packageVerify = null;
    var packageVerifyError = null;
    if (!options.skipVerify) {
      try {
        packageVerify = verifyPackageProject(packageRoot);
      } catch (verifyErr) {
        packageVerifyError = verifyErr && verifyErr.message ? verifyErr.message : String(verifyErr);
      }
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
      leveledSessionFiles: leveledSessionFiles,
      levelMatch: levelGains ? {
        requested: true,
        lineCount: levelGains.lineCount,
        fileCount: levelGains.fileCount,
        leveled: leveledSessionFiles,
        resolvedByName: levelGains.resolvedByName || 0,
        warnings: levelGains.warnings
      } : null,
      packageVerify: packageVerify,
      packageVerifyError: packageVerifyError
    };
  }

  function emitPackageProgress(options, info) {
    if (!options || typeof options.onProgress !== "function") return;
    try { options.onProgress(info); } catch (ignoreProgress) {}
  }

  function mapWithConcurrency(items, concurrency, worker) {
    return new Promise(function (resolve, reject) {
      var list = items || [];
      if (!list.length) { resolve([]); return; }
      var limit = Math.max(1, Math.floor(Number(concurrency || 1)));
      var results = new Array(list.length);
      var nextIndex = 0;
      var active = 0;
      var completed = 0;
      var failed = false;

      function launch() {
        if (failed) return;
        if (completed >= list.length) { resolve(results); return; }
        while (active < limit && nextIndex < list.length) {
          (function (index) {
            active++;
            Promise.resolve().then(function () {
              return worker(list[index], index);
            }).then(function (value) {
              active--;
              completed++;
              results[index] = value;
              launch();
            }).catch(function (error) {
              if (failed) return;
              failed = true;
              reject(error);
            });
          })(nextIndex++);
        }
      }

      launch();
    });
  }

  function runProcessCaptured(executable, args, options) {
    options = options || {};
    if (typeof options.runProcess === "function") {
      return new Promise(function (resolve, reject) {
        var completed = false;
        function done(error, result) {
          if (completed) return;
          completed = true;
          if (error) reject(error); else resolve(result || { status: 0, stdout: "", stderr: "" });
        }
        try {
          var returned = options.runProcess(executable, args, done);
          if (returned && typeof returned.then === "function") returned.then(function (value) { done(null, value); }, done);
        } catch (error) { done(error); }
      });
    }

    return new Promise(function (resolve, reject) {
      var cp = getChildProcessModule();
      if (!cp) { reject(new Error("child_process erişimi yok.")); return; }
      var child;
      try {
        child = cp.spawn(executable, args, { windowsHide: true });
      } catch (spawnError) { reject(spawnError); return; }

      var stdout = "";
      var stderr = "";
      var settled = false;
      var timeoutMs = Math.max(1000, Number(options.processTimeoutMs || 120000));
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        try { child.kill(); } catch (ignoreKill) {}
        reject(new Error("İşlem zaman aşımına uğradı: " + executable));
      }, timeoutMs);

      if (child.stdout) child.stdout.on("data", function (data) { stdout += String(data); });
      if (child.stderr) child.stderr.on("data", function (data) { stderr += String(data); });
      child.on("error", function (error) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(error);
      });
      child.on("close", function (code) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve({ status: code, stdout: stdout, stderr: stderr });
      });
    });
  }

  function copyFileAsync(modules, source, destination, options) {
    return new Promise(function (resolve, reject) {
      var copyFile = options && typeof options.copyFile === "function" ? options.copyFile : modules.fs.copyFile.bind(modules.fs);
      try {
        copyFile(source, destination, function (error) {
          if (error) reject(error); else resolve();
        });
      } catch (error) { reject(error); }
    });
  }

  function ensureDirectoryAsync(modules, directory) {
    return new Promise(function (resolve, reject) {
      modules.fs.mkdir(directory, { recursive: true }, function (error) {
        if (error && error.code !== "EEXIST") reject(error); else resolve();
      });
    });
  }

  function walkSessionAudioFiles(rootPath, modules) {
    var files = [];
    var rootNormalized = normalizeSlashes(rootPath).toLowerCase();

    function visit(directory) {
      var entries;
      try { entries = modules.fs.readdirSync(directory); } catch (readError) { return; }
      for (var i = 0; i < entries.length; i++) {
        var fullPath = modules.path.join(directory, entries[i]);
        var stat;
        try { stat = modules.fs.statSync(fullPath); } catch (statError) { continue; }
        if (stat.isDirectory()) {
          var nameLower = String(entries[i]).toLowerCase();
          var fullLower = normalizeSlashes(fullPath).toLowerCase();
          var relative = normalizeSlashes(modules.path.relative(rootPath, fullPath)).toLowerCase();
          if (nameLower.indexOf("_au_dub_package_") >= 0) continue;
          if (relative === ".audub" || relative.indexOf(".audub/") === 0) continue;
          if (relative === "audio" || relative.indexOf("audio/") === 0) continue;
          if (fullLower === rootNormalized) continue;
          visit(fullPath);
        } else if (AUDIO_EXTENSIONS.indexOf(fileExtension(entries[i])) >= 0) {
          files.push({ path: fullPath, name: entries[i], size: stat.size, mtimeMs: stat.mtimeMs || 0 });
        }
      }
    }

    visit(rootPath);
    return files;
  }

  function parseVolumeStatsResult(result) {
    var text = String(result && result.stderr || "") + String(result && result.stdout || "");
    var meanMatch = /mean_volume:\s*(-?[\d.]+)\s*dB/.exec(text);
    var maxMatch = /max_volume:\s*(-?[\d.]+)\s*dB/.exec(text);
    if (!meanMatch) return null;
    return { mean: Number(meanMatch[1]), max: maxMatch ? Number(maxMatch[1]) : null };
  }

  function parseProgressDurationSeconds(result) {
    var text = String(result && result.stdout || "") + "\n" + String(result && result.stderr || "");
    var matches = text.match(/out_time_us=(\d+)/g);
    if (!matches || !matches.length) return null;
    var value = Number(matches[matches.length - 1].split("=")[1]);
    return isFinite(value) && value >= 0 ? value / 1000000 : null;
  }

  function acceptedAutoHeadTrimSeconds(duration, trimmedDuration) {
    if (!(duration > 0) || !(trimmedDuration >= 0)) return 0;
    var candidate = Number((duration - trimmedDuration).toFixed(3));
    var maxTrim = Math.min(AUTO_HEAD_TRIM_MAX_SECONDS, Math.max(0, duration - AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS));
    if (candidate < AUTO_HEAD_TRIM_MIN_USEFUL_SECONDS || candidate > maxTrim || trimmedDuration < AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS) return 0;
    return candidate;
  }

  function fixedHeadTrimSeconds(duration, requestedMs) {
    var requested = normalizeRecordingHeadTrimMs(requestedMs, 0) / 1000;
    var maxByFraction = duration * 0.25;
    var maxByRemaining = Math.max(0, duration - AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS);
    return Number(Math.max(0, Math.min(requested, maxByFraction, maxByRemaining)).toFixed(3));
  }

  // Mixci paketinde klavye sesini kaynak dosyayi kisaltmadan sessize alir. Dosya suresi
  // degismedigi icin .sesx clip konumlari aynen kalir; final split metadata'daki ms'yi keser.
  function sanitizePackagedTakesAsync(project, result, ffmpegExe, modules, options) {
    var output = { sanitizedTakes: 0, sanitizedSourceFiles: 0, unchanged: 0, sanitizedSources: {}, warnings: [] };
    var enabled = normalizeRecordingHeadTrimEnabled(project.recordingHeadTrimEnabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED);
    var mode = normalizeRecordingHeadTrimMode(project.recordingHeadTrimMode, DEFAULT_RECORDING_HEAD_TRIM_MODE);
    var requestedMs = normalizeRecordingHeadTrimMs(project.recordingHeadTrimMs, DEFAULT_RECORDING_HEAD_TRIM_MS);
    if (!enabled) return Promise.resolve(output);

    var packagedProject;
    try { packagedProject = JSON.parse(modules.fs.readFileSync(result.jsonPath, "utf8")); }
    catch (readError) {
      output.warnings.push("Paket take listesi okunamadi; tus sesi temizligi uygulanamadi: " + readError.message);
      return Promise.resolve(output);
    }

    var packagedLinesById = {};
    for (var pi = 0; pi < packagedProject.lines.length; pi++) packagedLinesById[packagedProject.lines[pi].lineId] = packagedProject.lines[pi];
    var groups = {};
    for (var i = 0; i < project.lines.length; i++) {
      var sourceLine = project.lines[i];
      var sourceTake = getSelectedTake(sourceLine);
      if (!sourceTake || !recordingHeadTrimEligible(sourceTake)) continue;
      var sourcePath = resolveTakeFilePath(project, sourceTake, modules);
      var duration = Number(sourceTake.duration);
      if (!sourcePath || !modules.fs.existsSync(sourcePath) || !(duration > AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS)) continue;

      var packagedLine = packagedLinesById[sourceLine.lineId];
      if (!packagedLine || !packagedLine.takes) continue;
      var packagedTake = null;
      for (var pt = 0; pt < packagedLine.takes.length; pt++) {
        if (packagedLine.takes[pt].takeId === sourceTake.takeId) { packagedTake = packagedLine.takes[pt]; break; }
      }
      if (!packagedTake) continue;
      var destination = packagedTake.fileAbsolutePath;
      if (!destination && packagedTake.fileRelativePath) destination = modules.path.join(result.packageRoot, packagedTake.fileRelativePath);
      if (!destination || !modules.fs.existsSync(destination)) continue;

      var sourceKey = normalizeSlashes(sourcePath).toLowerCase();
      if (!groups[sourceKey]) groups[sourceKey] = { key: sourceKey, source: sourcePath, duration: duration, destinations: [], packagedTakes: [], ambiguous: false };
      if (Math.abs(groups[sourceKey].duration - duration) > 0.02) groups[sourceKey].ambiguous = true;
      if (groups[sourceKey].destinations.indexOf(destination) < 0) groups[sourceKey].destinations.push(destination);
      groups[sourceKey].packagedTakes.push(packagedTake);
    }

    var tasks = Object.keys(groups).map(function (key) { return groups[key]; });
    if (!tasks.length) return Promise.resolve(output);
    var completed = 0;
    emitPackageProgress(options, { phase: "sanitize_takes", completed: 0, total: tasks.length });

    return runProcessCaptured(ffmpegExe, ["-version"], options).then(function (probe) {
      if (!probe || probe.status !== 0) throw new Error("FFmpeg calistirilamadi.");
      return mapWithConcurrency(tasks, Number(options.mediaConcurrency || 4), function (task, taskIndex) {
        var analysisTemp = modules.path.join(result.packageRoot, ".audub", "head-trim-analysis-" + taskIndex + "-" + Date.now() + ".wav");
        var sanitizedTemp = modules.path.join(result.packageRoot, ".audub", "sanitize-take-" + taskIndex + "-" + Date.now() + ".wav");

        function cleanup() {
          try { if (modules.fs.existsSync(analysisTemp)) modules.fs.unlinkSync(analysisTemp); } catch (ignoreAnalysis) {}
          try { if (modules.fs.existsSync(sanitizedTemp)) modules.fs.unlinkSync(sanitizedTemp); } catch (ignoreSanitized) {}
        }

        if (task.ambiguous) {
          output.warnings.push("Ayni kaynak dosya farkli clip sureleriyle kullaniliyor; guvenlik icin temizlenmedi: " + task.source);
          output.unchanged++;
          completed++;
          emitPackageProgress(options, { phase: "sanitize_takes", completed: completed, total: tasks.length, sanitized: output.sanitizedTakes, path: normalizeSlashes(task.source) });
          return Promise.resolve();
        }

        var knownMs = 0;
        for (var kt = 0; kt < task.packagedTakes.length; kt++) knownMs = Math.max(knownMs, normalizeRecordingHeadTrimSanitizedMs(task.packagedTakes[kt].headTrimSanitizedMs));
        var candidatePromise;
        if (knownMs > 0) {
          candidatePromise = Promise.resolve(Number(Math.min(knownMs / 1000, AUTO_HEAD_TRIM_MAX_SECONDS, Math.max(0, task.duration - AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS)).toFixed(3)));
        } else if (mode === "fixed") {
          candidatePromise = Promise.resolve(fixedHeadTrimSeconds(task.duration, requestedMs));
        } else {
          candidatePromise = runProcessCaptured(ffmpegExe,
            ["-hide_banner", "-loglevel", "error", "-nostats", "-y", "-i", task.source, "-t", String(task.duration), "-af", AUTO_HEAD_TRIM_FILTER, "-c:a", "pcm_f32le", "-progress", "pipe:1", analysisTemp],
            options).then(function (analysisResult) {
              if (!analysisResult || analysisResult.status !== 0 || !modules.fs.existsSync(analysisTemp)) return 0;
              var trimmedDuration = parseProgressDurationSeconds(analysisResult);
              return acceptedAutoHeadTrimSeconds(task.duration, trimmedDuration);
            });
        }

        return candidatePromise.then(function (candidate) {
          try { if (modules.fs.existsSync(analysisTemp)) modules.fs.unlinkSync(analysisTemp); } catch (ignoreAnalysisDone) {}
          if (!(candidate > 0) || (mode === "auto" && candidate < AUTO_HEAD_TRIM_MIN_USEFUL_SECONDS)) { output.unchanged++; return; }
          var trimSeconds = String(Number(candidate.toFixed(3)));
          var trimMilliseconds = Math.round(candidate * 1000);
          var fadeFilter = "atrim=start=" + trimSeconds + ",asetpts=PTS-STARTPTS,adelay=" + trimMilliseconds + ":all=1,afade=t=in:st=" + trimSeconds + ":d=" + String(AUTO_HEAD_TRIM_FADE_SECONDS);
          return runProcessCaptured(ffmpegExe,
            ["-hide_banner", "-loglevel", "error", "-y", "-i", task.destinations[0], "-af", fadeFilter, "-c:a", "pcm_f32le", sanitizedTemp],
            options).then(function (sanitizeResult) {
              if (!sanitizeResult || sanitizeResult.status !== 0 || !modules.fs.existsSync(sanitizedTemp)) throw new Error("FFmpeg kodu: " + (sanitizeResult ? sanitizeResult.status : "?"));
              return mapWithConcurrency(task.destinations, Number(options.mediaConcurrency || 4), function (destination) {
                return copyFileAsync(modules, sanitizedTemp, destination, options);
              }).then(function () {
                var trimMs = trimMilliseconds;
                var sanitizedAt = new Date().toISOString();
                for (var takeIndex = 0; takeIndex < task.packagedTakes.length; takeIndex++) {
                  var packagedTake = task.packagedTakes[takeIndex];
                  packagedTake.headTrimSanitizedMs = trimMs;
                  packagedTake.headTrimSanitizedMode = mode;
                  packagedTake.headTrimSanitizedAt = sanitizedAt;
                }
                output.sanitizedTakes += task.packagedTakes.length;
                output.sanitizedSourceFiles++;
                var sanitizedEntry = { path: task.destinations[0], trimMs: trimMs, mode: mode };
                output.sanitizedSources[task.key] = sanitizedEntry;
                function addNameAlias(value) {
                  if (!value) return;
                  var alias = "name:" + baseNameNoExt(modules.path.basename(String(value))).toLowerCase();
                  var existing = output.sanitizedSources[alias];
                  if (!existing) output.sanitizedSources[alias] = sanitizedEntry;
                  else if (existing.path !== sanitizedEntry.path) output.sanitizedSources[alias] = { ambiguous: true };
                }
                addNameAlias(task.source);
                for (var aliasIndex = 0; aliasIndex < task.packagedTakes.length; aliasIndex++) {
                  addNameAlias(task.packagedTakes[aliasIndex].originalTakeName);
                }
              });
            });
        }).catch(function (sanitizeError) {
          output.warnings.push("Paket take tus sesi temizlenemedi, ham kopya korundu: " + task.source + " (" + sanitizeError.message + ")");
        }).then(function () {
          cleanup();
          completed++;
          emitPackageProgress(options, { phase: "sanitize_takes", completed: completed, total: tasks.length, sanitized: output.sanitizedTakes, path: normalizeSlashes(task.source) });
        });
      });
    }).catch(function (probeError) {
      output.warnings.push("Tus sesi temizligi icin FFmpeg kullanilamadi: " + probeError.message);
    }).then(function () {
      packagedProject.updatedAt = new Date().toISOString();
      modules.fs.writeFileSync(result.jsonPath, JSON.stringify(packagedProject, null, 2), "utf8");
      return output;
    });
  }

  function buildRecordingGainMapAsync(project, ffmpegExe, modules, sesxDir, mediaFiles, options) {
    var output = { gains: {}, warnings: [], ffmpegOk: false, lineCount: 0, fileCount: 0, resolvedByName: 0 };

    return runProcessCaptured(ffmpegExe, ["-version"], options).then(function (probe) {
      output.ffmpegOk = probe && probe.status === 0;
      if (!output.ffmpegOk) {
        output.warnings.push("FFmpeg çalıştırılamadı (" + ffmpegExe + "); düzey eşitleme atlandı.");
        return output;
      }

      var mediaByBase = {};
      for (var mediaIndex = 0; mediaIndex < mediaFiles.length; mediaIndex++) {
        var mediaPath = mediaFiles[mediaIndex].path;
        var base = baseNameNoExt(modules.path.basename(mediaPath)).toLowerCase();
        if (!mediaByBase[base]) mediaByBase[base] = [];
        mediaByBase[base].push(mediaPath);
      }

      function resolveRecordingPath(take, line) {
        if (take.liveFilePath) {
          try { if (modules.fs.existsSync(take.liveFilePath)) return take.liveFilePath; } catch (ignoreLivePath) {}
        }
        var name = take.originalTakeName || take.fileName || "";
        if (name) {
          var matches = mediaByBase[baseNameNoExt(String(name)).toLowerCase()];
          if (matches && matches.length) {
            if (matches.length > 1) output.warnings.push("Aynı adda birden çok kayıt dosyası, ilki kullanıldı: " + name);
            output.resolvedByName++;
            return matches[0];
          }
        }
        output.warnings.push("Kayıt dosyası bulunamadı (clip adı: " + (name || "?") + "): " + (line.originalName || line.lineId));
        return "";
      }

      var pairs = [];
      var uniquePaths = [];
      var seenPaths = {};
      for (var i = 0; i < project.lines.length; i++) {
        var line = project.lines[i];
        var take = getSelectedTake(line);
        if (!take) continue;
        var recordingPath = resolveRecordingPath(take, line);
        if (!recordingPath) continue;
        var originalPath = resolveLevelRefPath(project, line, modules);
        if (!originalPath) {
          output.warnings.push("Orijinal dosya bulunamadı: " + (line.originalName || line.lineId));
          continue;
        }
        pairs.push({ line: line, recordingPath: recordingPath, originalPath: originalPath });
        [recordingPath, originalPath].forEach(function (pathValue) {
          var key = normalizeSlashes(pathValue).toLowerCase();
          if (!seenPaths[key]) { seenPaths[key] = true; uniquePaths.push(pathValue); }
        });
      }

      var statsByPath = {};
      var measureCompleted = 0;
      emitPackageProgress(options, { phase: "measure", completed: 0, total: uniquePaths.length });
      return mapWithConcurrency(uniquePaths, Number(options.measureConcurrency || 4), function (pathValue) {
        return runProcessCaptured(ffmpegExe,
          ["-hide_banner", "-nostats", "-i", pathValue, "-af", "volumedetect", "-f", "null", "NUL"],
          options).then(function (result) {
            statsByPath[normalizeSlashes(pathValue).toLowerCase()] = parseVolumeStatsResult(result);
          }).catch(function () {
            statsByPath[normalizeSlashes(pathValue).toLowerCase()] = null;
          }).then(function () {
            measureCompleted++;
            emitPackageProgress(options, { phase: "measure", completed: measureCompleted, total: uniquePaths.length, path: normalizeSlashes(pathValue) });
          });
      }).then(function () {
        var deltasByFile = {};
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
          var pair = pairs[pairIndex];
          var originalStats = statsByPath[normalizeSlashes(pair.originalPath).toLowerCase()];
          var recordingStats = statsByPath[normalizeSlashes(pair.recordingPath).toLowerCase()];
          if (!originalStats || !recordingStats || recordingStats.max === null) {
            output.warnings.push("Düzey ölçülemedi: " + (pair.line.originalName || pair.line.lineId));
            continue;
          }
          var recordingKey = normalizeSlashes(pair.recordingPath).toLowerCase();
          if (!deltasByFile[recordingKey]) deltasByFile[recordingKey] = { path: pair.recordingPath, deltas: [], recMax: recordingStats.max };
          deltasByFile[recordingKey].deltas.push(originalStats.mean - recordingStats.mean);
          output.lineCount++;
        }

        Object.keys(deltasByFile).forEach(function (recordingKey) {
          var entry = deltasByFile[recordingKey];
          var sum = entry.deltas.reduce(function (total, value) { return total + value; }, 0);
          var target = sum / entry.deltas.length;
          var maxBoost = -1.0 - entry.recMax;
          var applied = Math.min(target, maxBoost);
          output.gains[recordingKey] = {
            path: entry.path,
            target: Number(target.toFixed(2)),
            applied: Number(applied.toFixed(2)),
            clamped: applied < target - 0.01,
            lines: entry.deltas.length
          };
          output.fileCount++;
        });
        return output;
      });
    }).catch(function (error) {
      output.warnings.push("FFmpeg çalıştırılamadı (" + ffmpegExe + "): " + error.message);
      return output;
    });
  }

  function levelPackagedTakesAsync(project, result, levelGains, ffmpegExe, modules, options) {
    var output = { leveled: 0, leveledSources: {}, warnings: [] };
    if (!levelGains || !levelGains.gains || !Object.keys(levelGains.gains).length) return Promise.resolve(output);

    var packagedProject;
    try { packagedProject = JSON.parse(modules.fs.readFileSync(result.jsonPath, "utf8")); }
    catch (readError) {
      output.warnings.push("Paket take listesi okunamadı; düzey uygulanamadı: " + readError.message);
      return Promise.resolve(output);
    }

    var packagedLinesById = {};
    for (var pi = 0; pi < packagedProject.lines.length; pi++) packagedLinesById[packagedProject.lines[pi].lineId] = packagedProject.lines[pi];
    var groups = {};
    for (var i = 0; i < project.lines.length; i++) {
      var sourceLine = project.lines[i];
      var sourceTake = getSelectedTake(sourceLine);
      if (!sourceTake) continue;
      var sourcePath = resolveTakeFilePath(project, sourceTake, modules);
      if (!sourcePath) continue;
      var sourceKey = normalizeSlashes(sourcePath).toLowerCase();
      var gainEntry = levelGains.gains[sourceKey];
      if (!gainEntry || Math.abs(gainEntry.applied) < 0.3) continue;

      var packagedLine = packagedLinesById[sourceLine.lineId];
      if (!packagedLine || !packagedLine.takes) continue;
      var packagedTake = null;
      for (var pt = 0; pt < packagedLine.takes.length; pt++) {
        if (packagedLine.takes[pt].takeId === sourceTake.takeId) { packagedTake = packagedLine.takes[pt]; break; }
      }
      if (!packagedTake) continue;
      var destination = packagedTake.fileAbsolutePath;
      if (!destination && packagedTake.fileRelativePath) destination = modules.path.join(result.packageRoot, packagedTake.fileRelativePath);
      if (!destination || !modules.fs.existsSync(destination)) continue;

      if (!groups[sourceKey]) groups[sourceKey] = { source: sourcePath, gain: gainEntry.applied, destinations: [] };
      if (groups[sourceKey].destinations.indexOf(destination) < 0) groups[sourceKey].destinations.push(destination);
    }

    var tasks = Object.keys(groups).map(function (key) {
      groups[key].key = key;
      return groups[key];
    });
    var completed = 0;
    emitPackageProgress(options, { phase: "level_takes", completed: 0, total: tasks.length });

    return mapWithConcurrency(tasks, Number(options.mediaConcurrency || 4), function (task, taskIndex) {
      var tempPath = modules.path.join(result.packageRoot, ".audub", "level-take-" + taskIndex + "-" + Date.now() + ".wav");
      return runProcessCaptured(ffmpegExe,
        ["-hide_banner", "-loglevel", "error", "-y", "-i", task.source, "-af", "volume=" + task.gain + "dB", "-c:a", "pcm_f32le", tempPath],
        options).then(function (processResult) {
        if (!processResult || processResult.status !== 0 || !modules.fs.existsSync(tempPath)) {
          throw new Error("FFmpeg kodu: " + (processResult ? processResult.status : "?"));
        }
        return mapWithConcurrency(task.destinations, Number(options.mediaConcurrency || 4), function (destination) {
          return copyFileAsync(modules, tempPath, destination, options);
        }).then(function () {
          output.leveled++;
          output.leveledSources[task.key] = task.destinations[0];
        });
      }).catch(function (levelError) {
        output.warnings.push("Paket take düzeyi uygulanamadı, düz kopya korundu: " + task.source + " (" + levelError.message + ")");
      }).then(function () {
        try { if (modules.fs.existsSync(tempPath)) modules.fs.unlinkSync(tempPath); } catch (ignoreTemp) {}
        completed++;
        emitPackageProgress(options, { phase: "level_takes", completed: completed, total: tasks.length, leveled: output.leveled, path: normalizeSlashes(task.source) });
      });
    }).then(function () { return output; });
  }

  function copySessionMediaAsync(result, sesxPath, mediaFiles, levelGains, preleveledSources, sanitizedSources, ffmpegExe, modules, options) {
    var sesxDir = modules.path.dirname(sesxPath);
    var tasks = [];
    for (var i = 0; i < mediaFiles.length; i++) {
      var relativePath = normalizeSlashes(modules.path.relative(sesxDir, mediaFiles[i].path));
      var relativeLower = relativePath.toLowerCase();
      if (!relativePath || relativePath.indexOf("../") === 0 || relativePath === "..") continue;
      if (relativeLower.indexOf("audio/") === 0 || relativeLower.indexOf(".audub/") === 0) continue;
      tasks.push({ source: mediaFiles[i].path, relativePath: relativePath });
    }

    var copied = 0;
    var leveled = 0;
    var sanitized = 0;
    var leveledSources = {};
    var completed = 0;
    var warnings = [];
    emitPackageProgress(options, { phase: "media", completed: 0, total: tasks.length });

    return mapWithConcurrency(tasks, Number(options.mediaConcurrency || 4), function (task) {
      var destination = modules.path.join(result.packageRoot, task.relativePath);
      var destinationDir = modules.path.dirname(destination);
      var sourceKey = normalizeSlashes(task.source).toLowerCase();
      var gainEntry = levelGains && levelGains.gains ? levelGains.gains[sourceKey] : null;
      var sourceNameKey = "name:" + baseNameNoExt(modules.path.basename(task.source)).toLowerCase();
      var sanitizedEntry = sanitizedSources ? (sanitizedSources[sourceKey] || sanitizedSources[sourceNameKey]) : null;

      return ensureDirectoryAsync(modules, destinationDir).then(function () {
        if (modules.fs.existsSync(destination)) return;
        if (sanitizedEntry && sanitizedEntry.path && modules.fs.existsSync(sanitizedEntry.path)) {
          return copyFileAsync(modules, sanitizedEntry.path, destination, options).then(function () {
            sanitized++;
            if (gainEntry && Math.abs(gainEntry.applied) >= 0.3) {
              leveled++;
              leveledSources[sourceKey] = true;
            }
          });
        }
        if (gainEntry && Math.abs(gainEntry.applied) >= 0.3) {
          if (preleveledSources && preleveledSources[sourceKey] && modules.fs.existsSync(preleveledSources[sourceKey])) {
            return copyFileAsync(modules, preleveledSources[sourceKey], destination, options).then(function () {
              leveled++;
              leveledSources[sourceKey] = true;
            });
          }
          return runProcessCaptured(ffmpegExe,
            ["-hide_banner", "-loglevel", "error", "-y", "-i", task.source, "-af", "volume=" + gainEntry.applied + "dB", "-c:a", "pcm_f32le", destination],
            options).then(function (processResult) {
              if (processResult && processResult.status === 0 && modules.fs.existsSync(destination)) {
                leveled++;
                leveledSources[sourceKey] = true;
                return;
              }
              throw new Error("FFmpeg kodu: " + (processResult ? processResult.status : "?"));
            }).catch(function (levelError) {
              try { if (modules.fs.existsSync(destination)) modules.fs.unlinkSync(destination); } catch (ignoreUnlink) {}
              warnings.push("Gain uygulanamadı, düz kopyalandı: " + task.relativePath + " (" + levelError.message + ")");
              return copyFileAsync(modules, task.source, destination, options);
            });
        }
        return copyFileAsync(modules, task.source, destination, options);
      }).then(function () {
        copied++;
      }).catch(function (copyError) {
        warnings.push("Session medyası kopyalanamadı: " + task.relativePath + " (" + copyError.message + ")");
      }).then(function () {
        completed++;
        emitPackageProgress(options, { phase: "media", completed: completed, total: tasks.length, leveled: leveled, path: normalizeSlashes(task.source) });
      });
    }).then(function () {
      return { copied: copied, leveled: leveled, sanitized: sanitized, leveledSources: leveledSources, warnings: warnings };
    });
  }

  function decodeXmlAttribute(value) {
    return String(value || "")
      .replace(/&#x([0-9a-f]+);/gi, function (_, hex) { return String.fromCharCode(parseInt(hex, 16)); })
      .replace(/&#(\d+);/g, function (_, decimal) { return String.fromCharCode(parseInt(decimal, 10)); })
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  function encodeXmlAttribute(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildPackagedOriginalMediaMap(sourceProject, packagedProject, packageRoot, modules) {
    var mappings = {};
    var sourceLines = sourceProject && sourceProject.lines ? sourceProject.lines : [];
    var packagedLines = packagedProject && packagedProject.lines ? packagedProject.lines : [];

    function addNameAlias(value, entry) {
      if (!value) return;
      var alias = "name:" + modules.path.basename(String(value)).toLowerCase();
      var existing = mappings[alias];
      if (!existing) mappings[alias] = entry;
      else if (existing.relativePath !== entry.relativePath) mappings[alias] = { ambiguous: true };
    }

    for (var i = 0; i < sourceLines.length && i < packagedLines.length; i++) {
      var sourceLine = sourceLines[i] || {};
      var packagedLine = packagedLines[i] || {};
      var relativePath = normalizeSlashes(packagedLine.originalRelativePath || "");
      if (!relativePath || relativePath === ".." || relativePath.indexOf("../") === 0) continue;
      var absolutePath = modules.path.join(packageRoot, relativePath);
      if (!modules.fs.existsSync(absolutePath)) continue;
      var entry = { relativePath: relativePath, absolutePath: absolutePath };
      var sourceAbsolutePath = sourceLine.originalAbsolutePath;
      if (!sourceAbsolutePath && sourceProject.projectRootPath && sourceLine.originalRelativePath) {
        sourceAbsolutePath = modules.path.join(sourceProject.projectRootPath, sourceLine.originalRelativePath);
      }
      if (sourceAbsolutePath) {
        var sourceKey = normalizeSlashes(sourceAbsolutePath).toLowerCase();
        if (!mappings[sourceKey]) mappings[sourceKey] = entry;
      }
      addNameAlias(sourceAbsolutePath, entry);
      addNameAlias(sourceLine.originalName, entry);
    }
    return mappings;
  }

  // Audition once mutlak yolu dener. Gonderenin bilgisayarinda eski ham medya hala
  // varsa paket kopyasini atlamamasi icin mutlak ve goreli yollar pakete sabitlenir.
  function rewritePackagedSessionMediaPaths(sesxPath, packageRoot, sourceProject, packagedProjectPath, modules) {
    if (!sesxPath || !modules.fs.existsSync(sesxPath)) return 0;
    var source = modules.fs.readFileSync(sesxPath, "utf8");
    var packagedProject = null;
    try { packagedProject = JSON.parse(modules.fs.readFileSync(packagedProjectPath, "utf8")); } catch (ignoreProjectRead) {}
    var originalMappings = buildPackagedOriginalMediaMap(sourceProject, packagedProject, packageRoot, modules);
    var rewritten = 0;
    var updated = source.replace(/<file\b[^>]*>/g, function (tag) {
      var relativeMatch = /\brelativePath="([^"]*)"/.exec(tag);
      var absoluteMatch = /\babsolutePath="([^"]*)"/.exec(tag);
      if (!absoluteMatch) return tag;
      var relativePath = relativeMatch ? decodeXmlAttribute(relativeMatch[1]).replace(/\\/g, "/") : "";
      var mapping = null;
      if (relativePath && relativePath !== ".." && relativePath.indexOf("../") !== 0 && !/^[a-z]:\//i.test(relativePath) && relativePath.charAt(0) !== "/") {
        var relativeAbsolutePath = modules.path.join(packageRoot, relativePath);
        if (modules.fs.existsSync(relativeAbsolutePath)) mapping = { relativePath: relativePath, absolutePath: relativeAbsolutePath };
      }
      if (!mapping) {
        var sourceAbsolutePath = decodeXmlAttribute(absoluteMatch[1]);
        var sourceKey = normalizeSlashes(sourceAbsolutePath).toLowerCase();
        var sourceNameKey = "name:" + modules.path.basename(sourceAbsolutePath).toLowerCase();
        mapping = originalMappings[sourceKey] || originalMappings[sourceNameKey] || null;
        if (mapping && mapping.ambiguous) mapping = null;
      }
      if (!mapping) return tag;
      var rewrittenTag = tag.replace(absoluteMatch[0], 'absolutePath="' + encodeXmlAttribute(mapping.absolutePath) + '"');
      if (relativeMatch) {
        rewrittenTag = rewrittenTag.replace(relativeMatch[0], 'relativePath="' + encodeXmlAttribute(mapping.relativePath) + '"');
      } else {
        rewrittenTag = rewrittenTag.replace(/(\s*\/?>)$/, ' relativePath="' + encodeXmlAttribute(mapping.relativePath) + '"$1');
      }
      rewritten++;
      return rewrittenTag;
    });
    if (rewritten > 0) modules.fs.writeFileSync(sesxPath, updated, "utf8");
    return rewritten;
  }

  function packageProjectAsync(project, options) {
    options = options || {};
    var modules = getNodeModules();
    if (!modules) return Promise.reject(new Error("Node.js dosya yazma erişimi yok. Paketleme için CEP içinde --enable-nodejs çalışmalı."));
    if (!project || !project.lines) return Promise.reject(new Error("Paketlenecek proje yok."));
    if (!project.projectRootPath) return Promise.reject(new Error("Proje kök yolu bulunamadı."));

    var sesxPath = options.sesxPath && String(options.sesxPath).trim() ? String(options.sesxPath) : null;
    var sesxDir = sesxPath ? modules.path.dirname(sesxPath) : "";
    var ffmpegExe = (options.ffmpegPath && String(options.ffmpegPath).trim()) ? String(options.ffmpegPath).trim()
      : ((project.ffmpegPath && String(project.ffmpegPath).trim()) ? String(project.ffmpegPath).trim() : "ffmpeg");
    var mediaFiles = sesxPath && options.includeSessionMedia !== false ? walkSessionAudioFiles(sesxDir, modules) : [];
    var levelGains = null;
    var result = null;

    emitPackageProgress(options, { phase: "prepare", completed: 0, total: 1 });
    var begin = new Promise(function (resolve) { setTimeout(resolve, 0); });
    if (options.levelMatchOriginal && sesxPath) {
      begin = begin.then(function () {
        return buildRecordingGainMapAsync(project, ffmpegExe, modules, sesxDir, mediaFiles, options);
      }).then(function (gains) { levelGains = gains; });
    }

    return begin.then(function () {
      emitPackageProgress(options, { phase: "package", completed: 0, total: 1 });
      return new Promise(function (resolve) { setTimeout(resolve, 0); });
    }).then(function () {
      var baseOptions = {};
      Object.keys(options).forEach(function (key) { baseOptions[key] = options[key]; });
      baseOptions.levelMatchOriginal = false;
      baseOptions.includeSessionMedia = false;
      baseOptions.skipVerify = true;
      result = packageProject(project, baseOptions);
      emitPackageProgress(options, { phase: "package", completed: 1, total: 1 });
      return levelPackagedTakesAsync(project, result, levelGains, ffmpegExe, modules, options);
    }).then(function (takeLevelResult) {
      return sanitizePackagedTakesAsync(project, result, ffmpegExe, modules, options).then(function (sanitizeResult) {
        if (!sesxPath || options.includeSessionMedia === false) {
          return { takeLevelResult: takeLevelResult, sanitizeResult: sanitizeResult, mediaResult: { copied: 0, leveled: 0, sanitized: 0, leveledSources: {}, warnings: [] } };
        }
        return copySessionMediaAsync(result, sesxPath, mediaFiles, levelGains, takeLevelResult.leveledSources, sanitizeResult.sanitizedSources, ffmpegExe, modules, options)
          .then(function (mediaResult) { return { takeLevelResult: takeLevelResult, sanitizeResult: sanitizeResult, mediaResult: mediaResult }; });
      });
    }).then(function (levelResults) {
      var takeLevelResult = levelResults.takeLevelResult;
      var sanitizeResult = levelResults.sanitizeResult;
      var mediaResult = levelResults.mediaResult;
      result.sessionMediaCount = mediaResult.copied;
      result.leveledSessionFiles = mediaResult.leveled;
      result.leveledPackagedTakes = takeLevelResult.leveled;
      result.sessionPathsRewritten = 0;
      if (result.sesxCopied) {
        try { result.sessionPathsRewritten = rewritePackagedSessionMediaPaths(result.sesxCopied, result.packageRoot, project, result.jsonPath, modules); }
        catch (rewriteError) { sanitizeResult.warnings.push("Paket .sesx medya yollari guncellenemedi: " + rewriteError.message); }
      }
      result.headTrim = {
        requested: normalizeRecordingHeadTrimEnabled(project.recordingHeadTrimEnabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED),
        mode: normalizeRecordingHeadTrimMode(project.recordingHeadTrimMode, DEFAULT_RECORDING_HEAD_TRIM_MODE),
        sanitizedTakes: sanitizeResult.sanitizedTakes,
        sanitizedSourceFiles: sanitizeResult.sanitizedSourceFiles,
        sanitizedSessionFiles: mediaResult.sanitized,
        unchanged: sanitizeResult.unchanged,
        warnings: sanitizeResult.warnings
      };
      if (levelGains) {
        if (takeLevelResult.warnings.length) levelGains.warnings = levelGains.warnings.concat(takeLevelResult.warnings);
        if (mediaResult.warnings.length) levelGains.warnings = levelGains.warnings.concat(mediaResult.warnings);
        var leveledSources = {};
        Object.keys(takeLevelResult.leveledSources || {}).forEach(function (key) { leveledSources[key] = true; });
        Object.keys(mediaResult.leveledSources || {}).forEach(function (key) { leveledSources[key] = true; });
        var unchanged = 0;
        Object.keys(levelGains.gains || {}).forEach(function (key) {
          if (Math.abs(levelGains.gains[key].applied) < 0.3) unchanged++;
        });
        result.levelMatch = {
          requested: true,
          lineCount: levelGains.lineCount,
          fileCount: levelGains.fileCount,
          leveled: Object.keys(leveledSources).length,
          unchanged: unchanged,
          packagedTakesLeveled: takeLevelResult.leveled,
          sessionFilesLeveled: mediaResult.leveled,
          resolvedByName: levelGains.resolvedByName || 0,
          warnings: levelGains.warnings
        };
      }
      emitPackageProgress(options, { phase: "verify", completed: 0, total: 1 });
      return new Promise(function (resolve) { setTimeout(resolve, 0); });
    }).then(function () {
      try {
        result.packageVerify = verifyPackageProject(result.packageRoot);
        result.packageVerifyError = null;
      } catch (verifyError) {
        result.packageVerify = null;
        result.packageVerifyError = verifyError && verifyError.message ? verifyError.message : String(verifyError);
      }
      emitPackageProgress(options, { phase: "verify", completed: 1, total: 1 });
      return result;
    });
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

  // Audition sürümüne göre doc.path tam dosya yerine session klasörü olabilir.
  function resolveSessionFilePath(pathValue, displayName) {
    var modules = getNodeModules();
    if (!modules) throw new Error("Node.js erişimi yok.");

    var target = pathValue && String(pathValue).trim();
    if (!target) return "";
    if (modules.path.extname(target).toLowerCase() === ".sesx") return normalizeSlashes(target);

    var name = displayName && modules.path.basename(String(displayName).trim());
    if (!name) return normalizeSlashes(target);
    if (!modules.path.extname(name)) name += ".sesx";
    return normalizeSlashes(modules.path.join(target, name));
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
      var statTimeoutMs = Math.max(25, Number(options.statTimeoutMs || Math.min(5000, timeoutMs)));
      var statFile = typeof options.statFile === "function" ? options.statFile : modules.fs.stat.bind(modules.fs);
      var startedAt = Date.now();
      var lastSignature = null;
      var lastChangedAt = 0;
      var lastProgressAt = 0;
      var polls = 0;
      var onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
      var settled = false;
      var pollTimer = null;
      var statTimer = null;
      var totalTimer = null;

      function cleanup() {
        if (pollTimer) clearTimeout(pollTimer);
        if (statTimer) clearTimeout(statTimer);
        if (totalTimer) clearTimeout(totalTimer);
      }

      function finishResolve(value) {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(value);
      }

      function finishReject(error) {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      }

      function schedulePoll() {
        if (settled) return;
        pollTimer = setTimeout(poll, intervalMs);
      }

      function report(status, now, st, error) {
        if (!onProgress || (now - lastProgressAt < 1000 && status !== "changed")) return;
        lastProgressAt = now;
        try {
          onProgress({
            status: status,
            path: normalizeSlashes(target),
            elapsedMs: now - startedAt,
            remainingMs: Math.max(0, timeoutMs - (now - startedAt)),
            stableForMs: lastChangedAt ? now - lastChangedAt : 0,
            sizeBytes: st && typeof st.size === "number" ? st.size : 0,
            polls: polls,
            errorCode: error && error.code ? error.code : null
          });
        } catch (ignoreProgress) {}
      }

      function statSignature(st) {
        var mtime = typeof st.mtimeMs === "number" ? st.mtimeMs : (st.mtime ? st.mtime.getTime() : 0);
        return String(st.size) + ":" + String(mtime);
      }

      function poll() {
        if (settled) return;
        polls++;
        var statFinished = false;

        function onStat(eStat, st) {
          if (settled || statFinished) return;
          statFinished = true;
          if (statTimer) { clearTimeout(statTimer); statTimer = null; }
          var now = Date.now();

          if (eStat) {
            if (eStat.code === "EPERM" || eStat.code === "EACCES") {
              finishReject(new Error("Session dosyasına erişilemiyor [" + eStat.code + "]: " + normalizeSlashes(target)));
              return;
            }
            if (now - startedAt >= timeoutMs) {
              finishReject(new Error("Dosya hazır olmadı: " + eStat.message));
            } else {
              report("waiting_for_file", now, null, eStat);
              schedulePoll();
            }
            return;
          }

          if (st && typeof st.isFile === "function" && !st.isFile()) {
            finishReject(new Error("Session yolu bir dosya değil: " + normalizeSlashes(target)));
            return;
          }

          var sig = statSignature(st);
          if (sig !== lastSignature) {
            lastSignature = sig;
            lastChangedAt = now;
            report("changed", now, st, null);
          } else {
            report("stabilizing", now, st, null);
          }

          if (st.size > 0 && now - lastChangedAt >= stableMs) {
            finishResolve({
              path: normalizeSlashes(target),
              sizeBytes: st.size,
              mtimeMs: typeof st.mtimeMs === "number" ? st.mtimeMs : (st.mtime ? st.mtime.getTime() : 0),
              stableMs: now - lastChangedAt,
              polls: polls
            });
            return;
          }

          if (now - startedAt >= timeoutMs) {
            finishReject(new Error("Dosya yazımı stabil hale gelmedi: " + normalizeSlashes(target)));
            return;
          }
          schedulePoll();
        }

        statTimer = setTimeout(function () {
          var timeoutError = new Error("Dosya bilgisi okunurken zaman aşımı: " + normalizeSlashes(target));
          timeoutError.code = "ESTATTIMEOUT";
          onStat(timeoutError);
        }, statTimeoutMs);

        try {
          statFile(target, onStat);
        } catch (eStatCall) {
          onStat(eStatCall);
        }
      }

      totalTimer = setTimeout(function () {
        finishReject(new Error("Dosya hazır olmadı: zaman aşımı (" + normalizeSlashes(target) + ")"));
      }, timeoutMs);
      pollTimer = setTimeout(poll, 0);
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

    normalizeRecordingHeadTrimSettings(project);
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
      appVersion: APP_VERSION,
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
    project.appVersion = APP_VERSION;
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
      appVersion: APP_VERSION,
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
      appVersion: APP_VERSION,
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
      appVersion: APP_VERSION,
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
    // Önceki mix'i yalnızca AKTİF proje kökünün altındaysa ve diskte duruyorsa yeniden kullan.
    // Paket taşındıysa buradaki yol gönderenin diskini gösterir.
    if (!file && project.lastMixSplitPlan && project.lastMixSplitPlan.mixFileAbsolutePath) {
      var cachedMix = project.lastMixSplitPlan.mixFileAbsolutePath;
      var cachedOk = isPathInsideRoot(cachedMix, project.projectRootPath) && modules.fs.existsSync(cachedMix);
      if (cachedOk) {
        return {
          fileName: project.lastMixSplitPlan.mixFileName,
          relativePath: project.lastMixSplitPlan.mixFileRelativePath,
          absolutePath: cachedMix
        };
      }
      // Göreli yol paketin içinde hâlâ duruyor olabilir (paket taşınmış olsa da).
      if (project.lastMixSplitPlan.mixFileRelativePath) {
        var rebased = modules.path.join(project.projectRootPath, project.lastMixSplitPlan.mixFileRelativePath);
        if (modules.fs.existsSync(rebased)) {
          return {
            fileName: project.lastMixSplitPlan.mixFileName,
            relativePath: project.lastMixSplitPlan.mixFileRelativePath,
            absolutePath: normalizeSlashes(rebased)
          };
        }
      }
      throw new Error("Önceki mix dosyası bu bilgisayarda bulunamadı (" + cachedMix + "). Adım 2'de mixlenmiş dosyayı yeniden seç.");
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

  // Düzey eşitleme referansı: repliğin orijinal ses dosyasını diskte bul.
  // Paket başka makinede açıldıysa mutlak yol geçersiz olabilir; sırayla
  // mutlak yol -> projectRoot+göreli -> yüklenen json'un kökü+göreli denenir.
  function resolveLevelRefPath(project, line, modules) {
    var cands = [];
    if (line.originalAbsolutePath) cands.push(line.originalAbsolutePath);
    if (line.originalRelativePath) {
      if (project.projectRootPath) cands.push(modules.path.join(project.projectRootPath, line.originalRelativePath));
      if (project.loadedFromPath) {
        // .audub/project.json -> paket kökü iki klasör üstte
        var pkgRoot = modules.path.dirname(modules.path.dirname(project.loadedFromPath));
        cands.push(modules.path.join(pkgRoot, line.originalRelativePath));
      }
    }
    for (var i = 0; i < cands.length; i++) {
      try { if (cands[i] && modules.fs.existsSync(cands[i])) return normalizeSlashes(cands[i]); } catch (e) {}
    }
    return "";
  }

  function createMixSplitItems(project, mixInfo) {
    var gap = Number(project.gapSeconds || 0);
    var recordingHeadTrimEnabled = normalizeRecordingHeadTrimEnabled(project.recordingHeadTrimEnabled, DEFAULT_RECORDING_HEAD_TRIM_ENABLED);
    var recordingHeadTrimMode = normalizeRecordingHeadTrimMode(project.recordingHeadTrimMode, DEFAULT_RECORDING_HEAD_TRIM_MODE);
    var recordingHeadTrimMs = normalizeRecordingHeadTrimMs(project.recordingHeadTrimMs, DEFAULT_RECORDING_HEAD_TRIM_MS);
    var cursor = 0;
    var used = {};
    var items = [];
    var modules = getNodeModules();
    // Düzey eşitleme final mix bölündükten sonra uygulanır. Eski project.json dosyalarında
    // alan bulunmadığı için yalnızca açıkça kapatılmışsa devre dışı kabul edilir.
    var levelMatchOn = project.levelMatchOriginal !== false;
    for (var i = 0; i < project.lines.length; i++) {
      var line = project.lines[i];
      var take = getSelectedTake(line);
      var src = getLineSourceForExport(line);
      var dur, start, end;
      var headTrimMsApplied = 0;
      var headTrimAutoEligible = false;
      // Canlı kayıt eşlemesinde take, Audition timeline'daki GERÇEK pozisyonu (mixStart/mixEnd)
      // taşır. Mixdown bu sınırlarla kesilmeli; cursor düzeni sadece eski dosya-bazlı akış için fallback.
      // Tek kesim: repliğin tüm bölgesi [mixStart, mixEnd]. Çok parçalı (delete silence)
      // repliklerde bu bölge parçalar arası boşlukları DA içerir; boşluklar korunur.
      if (take && typeof take.mixStart === "number" && typeof take.mixEnd === "number" && take.mixEnd > take.mixStart) {
        var trimmedBounds = recordingMixBounds(take, recordingHeadTrimMs, recordingHeadTrimEnabled, recordingHeadTrimMode);
        start = trimmedBounds.start;
        end = trimmedBounds.end;
        dur = trimmedBounds.duration;
        headTrimMsApplied = trimmedBounds.appliedMs;
        headTrimAutoEligible = trimmedBounds.autoEligible;
      } else {
        dur = typeof src.duration === "number" ? src.duration : (typeof line.originalDuration === "number" ? line.originalDuration : 0);
        start = Number(cursor.toFixed(3));
        end = Number((start + dur).toFixed(3));
      }
      var outName = uniqueName(baseNameNoExt(line.exportName || line.originalName || line.lineId) + "__mixsplit.wav", used);
      var levelRef = (levelMatchOn && modules) ? resolveLevelRefPath(project, line, modules) : "";
      items.push({
        index: i + 1,
        lineId: line.lineId,
        originalName: line.originalName,
        exportName: line.exportName,
        mixStart: start,
        mixEnd: end,
        duration: Number((end - start).toFixed(3)),
        headTrimEnabled: recordingHeadTrimEnabled,
        headTrimMode: recordingHeadTrimMode,
        headTrimMsRequested: recordingHeadTrimMs,
        headTrimMsApplied: headTrimMsApplied,
        headTrimAutoEligible: headTrimAutoEligible,
        gapAfterSeconds: i === project.lines.length - 1 ? 0 : gap,
        outputFileName: outName,
        outputRelativePath: "Audio/Takes/" + outName,
        mixFileName: mixInfo.fileName,
        mixFileRelativePath: mixInfo.relativePath,
        mixFileAbsolutePath: mixInfo.absolutePath,
        levelRefPath: levelRef,
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
    normalizeRecordingHeadTrimSettings(project);

    ensureProjectFolders(project.projectRootPath, modules);
    var metadataDir = modules.path.join(project.projectRootPath, ".audub");
    var mixInfo = copyMixFileIntoProject(project, mixFile, modules);
    var items = createMixSplitItems(project, mixInfo);
    var headTrimmedItemCount = 0;
    var headTrimTotalMs = 0;
    var headTrimAutoCandidateCount = 0;
    for (var trimIndex = 0; trimIndex < items.length; trimIndex++) {
      if (items[trimIndex].headTrimMsApplied > 0) headTrimmedItemCount++;
      headTrimTotalMs += Number(items[trimIndex].headTrimMsApplied || 0);
      if (items[trimIndex].headTrimAutoEligible) headTrimAutoCandidateCount++;
    }
    var plan = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: APP_VERSION,
      projectId: project.projectId,
      projectName: project.projectName,
      createdAt: new Date().toISOString(),
      strategy: "split_single_mixed_file_by_mix_map_segments",
      gapSeconds: Number(project.gapSeconds || 0),
      recordingHeadTrimEnabled: project.recordingHeadTrimEnabled,
      recordingHeadTrimMode: project.recordingHeadTrimMode,
      recordingHeadTrimMs: normalizeRecordingHeadTrimMs(project.recordingHeadTrimMs, DEFAULT_RECORDING_HEAD_TRIM_MS),
      headTrimmedItemCount: headTrimmedItemCount,
      headTrimTotalMs: headTrimTotalMs,
      headTrimAutoCandidateCount: headTrimAutoCandidateCount,
      mixFileName: mixInfo.fileName,
      mixFileRelativePath: mixInfo.relativePath,
      mixFileAbsolutePath: mixInfo.absolutePath,
      itemCount: items.length,
      items: items
    };

    var jsonPath = modules.path.join(metadataDir, "mix-split-plan.json");
    modules.fs.writeFileSync(jsonPath, JSON.stringify(plan, null, 2), "utf8");
    var headers = ["index","lineId","originalName","mixStart","mixEnd","duration","headTrimEnabled","headTrimMode","headTrimMsRequested","headTrimMsApplied","headTrimAutoEligible","outputFileName","outputRelativePath"];
    var rows = [headers.join(",")];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      rows.push([it.index, it.lineId, it.originalName, it.mixStart, it.mixEnd, it.duration, it.headTrimEnabled, it.headTrimMode, it.headTrimMsRequested, it.headTrimMsApplied, it.headTrimAutoEligible, it.outputFileName, it.outputRelativePath].map(csvEscape).join(","));
    }
    var csvPath = modules.path.join(metadataDir, "mix-split-plan.csv");
    modules.fs.writeFileSync(csvPath, rows.join("\r\n"), "utf8");

    project.lastMixSplitPlan = {
      jsonPath: normalizeSlashes(jsonPath),
      csvPath: normalizeSlashes(csvPath),
      createdAt: plan.createdAt,
      itemCount: items.length,
      recordingHeadTrimEnabled: plan.recordingHeadTrimEnabled,
      recordingHeadTrimMode: plan.recordingHeadTrimMode,
      recordingHeadTrimMs: plan.recordingHeadTrimMs,
      headTrimmedItemCount: headTrimmedItemCount,
      headTrimTotalMs: headTrimTotalMs,
      headTrimAutoCandidateCount: headTrimAutoCandidateCount,
      mixFileName: mixInfo.fileName,
      mixFileRelativePath: mixInfo.relativePath,
      mixFileAbsolutePath: mixInfo.absolutePath,
      items: items
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);
    return {
      jsonPath: normalizeSlashes(jsonPath),
      csvPath: normalizeSlashes(csvPath),
      itemCount: items.length,
      recordingHeadTrimEnabled: plan.recordingHeadTrimEnabled,
      recordingHeadTrimMode: plan.recordingHeadTrimMode,
      recordingHeadTrimMs: plan.recordingHeadTrimMs,
      headTrimmedItemCount: headTrimmedItemCount,
      headTrimTotalMs: headTrimTotalMs,
      headTrimAutoCandidateCount: headTrimAutoCandidateCount,
      items: items,
      mixInfo: mixInfo
    };
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
    var headTrimResultsPath = modules.path.join(metadataDir, "head-trim-results.json");
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
    lines.push("$headTrimResultsPath = " + psQuote(headTrimResultsPath));
    lines.push("New-Item -ItemType Directory -Force -Path $outputDir | Out-Null");
    lines.push("Set-Content -LiteralPath $logPath -Encoding UTF8 -Value ('AU Dub Panel FFmpeg Mix Split Log - ' + (Get-Date -Format o))");
    lines.push("function AUWrite($msg) { Write-Host $msg; Add-Content -LiteralPath $logPath -Encoding UTF8 -Value $msg }");
    lines.push("function AUWarn($msg) { Write-Warning $msg; Add-Content -LiteralPath $logPath -Encoding UTF8 -Value ('WARNING: ' + $msg) }");
    // Sayilari her zaman nokta ondalikla yaz (TR yerelde virgul ffmpeg'i bozar).
    lines.push("function AUNum($n) { return ([double]$n).ToString('0.0#', [System.Globalization.CultureInfo]::InvariantCulture) }");
    // Kisa tus darbelerini atlayip en az 120 ms suren sesi konusma baslangici sayar.
    // Belirsiz veya asiri kirpma kararlarinda gecici cikti silinir ve kaynak aynen korunur.
    lines.push("function AUAutoHeadTrim($file, $start, $duration, $output) {");
    lines.push("  $result = @{ seconds = 0.0; outputDuration = [double]$duration; temp = ''; reason = 'speech_or_no_boundary' }");
    lines.push("  $minUsefulTrim = " + AUTO_HEAD_TRIM_MIN_USEFUL_SECONDS);
    lines.push("  $minRemainingAudio = " + AUTO_HEAD_TRIM_MIN_REMAINING_SECONDS);
    lines.push("  $maxTrim = [math]::Min(" + AUTO_HEAD_TRIM_MAX_SECONDS + ", [math]::Max(0.0, [math]::Round(([double]$duration - $minRemainingAudio), 3)))");
    lines.push("  if ($maxTrim -lt $minUsefulTrim) { $result.reason = 'clip_too_short'; return $result }");
    lines.push("  $tmp = $output + '.autotrim.wav'");
    lines.push("  if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue }");
    lines.push("  $filter = " + psQuote(AUTO_HEAD_TRIM_FILTER));
    lines.push("  $txt = (& $ffmpeg -hide_banner -loglevel error -nostats -y -ss (AUNum $start) -t (AUNum $duration) -i $file -af $filter -c:a pcm_f32le -progress pipe:1 $tmp 2>&1) | Out-String");
    lines.push("  $filterExit = $LASTEXITCODE");
    lines.push("  if (($filterExit -ne 0) -or !(Test-Path -LiteralPath $tmp)) { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue; $result.reason = 'analysis_failed'; return $result }");
    lines.push("  $times = [regex]::Matches($txt, 'out_time_us=(\\d+)')");
    lines.push("  if ($times.Count -eq 0) { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue; $result.reason = 'duration_probe_failed'; return $result }");
    lines.push("  $trimmedDuration = [double]$times[$times.Count - 1].Groups[1].Value / 1000000.0");
    lines.push("  $candidate = [math]::Round(([double]$duration - $trimmedDuration), 3)");
    lines.push("  if (($candidate -lt $minUsefulTrim) -or ($candidate -gt $maxTrim) -or ($trimmedDuration -lt $minRemainingAudio)) {");
    lines.push("    Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue");
    lines.push("    if ($candidate -gt $maxTrim) { $result.reason = 'trim_limit_exceeded' }");
    lines.push("    return $result");
    lines.push("  }");
    lines.push("  $result.seconds = $candidate");
    lines.push("  $result.outputDuration = [math]::Round($trimmedDuration, 3)");
    lines.push("  $result.temp = $tmp");
    lines.push("  $result.reason = 'sustained_speech_boundary'");
    lines.push("  return $result");
    lines.push("}");
    // volumedetect ciktisindan ortalama (mean) ve tepe (max) dB okur; stderr yakalanir, konsola dokulmez.
    lines.push("function AUVolStats($file) {");
    lines.push("  $txt = (& $ffmpeg -hide_banner -nostats -i $file -af volumedetect -f null NUL 2>&1) | Out-String");
    lines.push("  $r = @{ mean = $null; max = $null }");
    lines.push("  if ($txt -match 'mean_volume:\\s*(-?[0-9\\.]+)\\s*dB') { $r.mean = [double]$Matches[1] }");
    lines.push("  if ($txt -match 'max_volume:\\s*(-?[0-9\\.]+)\\s*dB') { $r.max = [double]$Matches[1] }");
    lines.push("  return $r");
    lines.push("}");
    lines.push("if (!(Get-Command $ffmpeg -ErrorAction SilentlyContinue)) { AUWarn " + psQuote("FFmpeg bulunamadi. ffmpeg.exe PATH icinde degil.") + "; exit 10 }");
    lines.push("if (!(Test-Path -LiteralPath $mixSource)) { AUWarn (\"Mix kaynak dosyasi yok: {0}\" -f $mixSource); exit 11 }");
    lines.push("$items = @(");
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var out = modules.path.join(outputDir, it.outputFileName);
      lines.push("  @{ index = " + it.index + "; lineId = " + psQuote(it.lineId) + "; start = " + it.mixStart + "; duration = " + it.duration + "; autoTrim = " + (it.headTrimAutoEligible ? "$true" : "$false") + "; plannedTrimMs = " + Number(it.headTrimMsApplied || 0) + "; output = " + psQuote(out) + "; levelRef = " + psQuote(it.levelRefPath || "") + " }");
    }
    lines.push(")");
    lines.push("$ok = 0; $failed = 0; $leveled = 0; $autoTrimmed = 0; $autoTrimTotalMs = 0");
    lines.push("$trimResults = @()");
    lines.push("foreach ($item in $items) {");
    lines.push("  $actualStart = [double]$item.start");
    lines.push("  $actualDuration = [double]$item.duration");
    lines.push("  $appliedTrimMs = [int]$item.plannedTrimMs");
    lines.push("  $autoOutput = ''");
    lines.push("  $trimReason = $(if ($item.autoTrim) { 'speech_or_no_boundary' } elseif ($appliedTrimMs -gt 0) { 'fixed' } else { 'disabled_or_ineligible' })");
    lines.push("  if ($item.autoTrim) {");
    lines.push("    $auto = AUAutoHeadTrim $mixSource $actualStart $actualDuration $item.output");
    lines.push("    $trimReason = $auto.reason");
    lines.push("    if ([double]$auto.seconds -gt 0) {");
    lines.push("      $actualStart = [math]::Round($actualStart + [double]$auto.seconds, 3)");
    lines.push("      $actualDuration = [double]$auto.outputDuration");
    lines.push("      $autoOutput = [string]$auto.temp");
    lines.push("      $appliedTrimMs = [int][math]::Round([double]$auto.seconds * 1000)");
    lines.push("      $autoTrimmed++; $autoTrimTotalMs += $appliedTrimMs");
    lines.push("      AUWrite (\"  otomatik tus sesi siniri: {0} ms kirpildi ({1})\" -f $appliedTrimMs, $item.lineId)");
    lines.push("    } else {");
    lines.push("      AUWrite (\"  otomatik kirpma yok: guvenli sessizlik siniri bulunamadi, konusma korundu ({0})\" -f $item.lineId)");
    lines.push("    }");
    lines.push("  }");
    lines.push("  AUWrite (\"Split [{0}/{1}] {2}: start={3}s dur={4}s -> {5}\" -f $item.index, $items.Count, $item.lineId, (AUNum $actualStart), (AUNum $actualDuration), $item.output)");
    lines.push("  if ($autoOutput -and (Test-Path -LiteralPath $autoOutput)) {");
    lines.push("    try { Move-Item -LiteralPath $autoOutput -Destination $item.output -Force -ErrorAction Stop; $splitExit = 0 }");
    lines.push("    catch { AUWarn (\"Otomatik kirpilmis cikti tasinamadi: {0}\" -f $_.Exception.Message); $splitExit = 12 }");
    lines.push("  } else {");
    lines.push("    & $ffmpeg -hide_banner -loglevel error -nostats -y -ss (AUNum $actualStart) -t (AUNum $actualDuration) -i $mixSource -c:a pcm_f32le $item.output");
    lines.push("    $splitExit = $LASTEXITCODE");
    lines.push("  }");
    lines.push("  $trimResults += [pscustomobject]@{ lineId = $item.lineId; appliedMs = $appliedTrimMs; outputDuration = $actualDuration; outputStart = $actualStart; reason = $trimReason }");
    lines.push("  if ($splitExit -eq 0) {");
    lines.push("    $ok++");
    // Duzey esitleme: parcanin ortalama dB'sini orijinalinkine cek (tepe -1 dBFS'i gecmesin).
    lines.push("    if ($item.levelRef -and (Test-Path -LiteralPath $item.levelRef)) {");
    lines.push("      $o = AUVolStats $item.levelRef");
    lines.push("      $s = AUVolStats $item.output");
    lines.push("      if (($null -ne $o.mean) -and ($null -ne $s.mean) -and ($null -ne $s.max)) {");
    lines.push("        $delta = $o.mean - $s.mean");
    lines.push("        $maxBoost = -1.0 - $s.max");
    lines.push("        $applied = $delta");
    lines.push("        if ($applied -gt $maxBoost) { $applied = $maxBoost; AUWrite (\"  duzey: hedef {0} dB ama tepe korumasi nedeniyle {1} dB uygulanacak\" -f (AUNum $delta), (AUNum $applied)) }");
    lines.push("        if ([math]::Abs($applied) -ge 0.3) {");
    lines.push("          $tmp = $item.output + '.lvl.wav'");
    lines.push("          & $ffmpeg -hide_banner -loglevel error -y -i $item.output -af ('volume=' + (AUNum $applied) + 'dB') -c:a pcm_f32le $tmp");
    lines.push("          if ($LASTEXITCODE -eq 0) { Move-Item -LiteralPath $tmp -Destination $item.output -Force; $leveled++; AUWrite (\"  duzey esitlendi: orijinal {0} dB / kayit {1} dB / uygulanan {2} dB\" -f (AUNum $o.mean), (AUNum $s.mean), (AUNum $applied)) }");
    lines.push("          else { AUWarn (\"  duzey uygulanamadi (ffmpeg kodu {0}): {1}\" -f $LASTEXITCODE, $item.lineId); if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp -Force } }");
    lines.push("        } else { AUWrite (\"  duzey zaten esit (fark \" + (AUNum $delta) + \" dB), dokunulmadi\") }");
    lines.push("      } else { AUWarn (\"  duzey olculemedi: \" + $item.lineId) }");
    lines.push("    }");
    lines.push("  } else { AUWarn (\"FFmpeg split hata kodu {0}: {1}\" -f $splitExit, $item.lineId); $failed++ }");
    lines.push("}");
    lines.push("ConvertTo-Json -InputObject @($trimResults) -Depth 4 | Set-Content -LiteralPath $headTrimResultsPath -Encoding UTF8");
    lines.push("AUWrite \"----------------------------------------\"");
    lines.push("AUWrite (\"Split bitti. Basarili: {0} / Hatali: {1} / Duzeyi esitlenen: {2} / Otomatik kirpilan: {3} ({4} ms)\" -f $ok, $failed, $leveled, $autoTrimmed, $autoTrimTotalMs)");
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

    var levelMatchCount = 0;
    for (var lm = 0; lm < items.length; lm++) if (items[lm].levelRefPath) levelMatchCount++;

    project.lastMixSplitScript = {
      ps1Path: normalizeSlashes(ps1Path),
      batPath: normalizeSlashes(batPath),
      logPath: normalizeSlashes(logPath),
      headTrimResultsPath: normalizeSlashes(headTrimResultsPath),
      outputDir: normalizeSlashes(outputDir),
      planPath: planResult.jsonPath,
      createdAt: new Date().toISOString(),
      itemCount: items.length,
      recordingHeadTrimEnabled: planResult.recordingHeadTrimEnabled,
      recordingHeadTrimMode: planResult.recordingHeadTrimMode,
      recordingHeadTrimMs: planResult.recordingHeadTrimMs,
      headTrimmedItemCount: planResult.headTrimmedItemCount,
      headTrimTotalMs: planResult.headTrimTotalMs,
      headTrimAutoCandidateCount: planResult.headTrimAutoCandidateCount,
      levelMatchCount: levelMatchCount
    };
    project.updatedAt = new Date().toISOString();
    saveProject(project);
    return {
      ps1Path: normalizeSlashes(ps1Path),
      batPath: normalizeSlashes(batPath),
      logPath: normalizeSlashes(logPath),
      headTrimResultsPath: normalizeSlashes(headTrimResultsPath),
      outputDir: normalizeSlashes(outputDir),
      planPath: planResult.jsonPath,
      itemCount: items.length,
      recordingHeadTrimEnabled: planResult.recordingHeadTrimEnabled,
      recordingHeadTrimMode: planResult.recordingHeadTrimMode,
      recordingHeadTrimMs: planResult.recordingHeadTrimMs,
      headTrimmedItemCount: planResult.headTrimmedItemCount,
      headTrimTotalMs: planResult.headTrimTotalMs,
      headTrimAutoCandidateCount: planResult.headTrimAutoCandidateCount,
      levelMatchCount: levelMatchCount
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
        // Kayıtlı script yalnızca AKTİF proje kökünün altındaysa ve dosya gerçekten
        // duruyorsa yeniden kullanılabilir. Paket başka makineden geldiyse buradaki
        // yol gönderenin diskini gösterir; körlemesine kullanmak EPERM/dosya yok hatası verir.
        var cached = project.lastMixSplitScript;
        var cachedUsable = !mixFile && cached && cached.ps1Path &&
          isPathInsideRoot(cached.ps1Path, project.projectRootPath) &&
          modules.fs.existsSync(cached.ps1Path);
        scriptInfo = cachedUsable ? cached : createFfmpegMixSplitScript(project, mixFile);
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

  function readHeadTrimResults(project, modules) {
    var resultPath = project && project.lastMixSplitScript && project.lastMixSplitScript.headTrimResultsPath;
    if (!resultPath || !modules.fs.existsSync(resultPath)) return {};
    try {
      var parsed = JSON.parse(modules.fs.readFileSync(resultPath, "utf8").replace(/^\uFEFF/, ""));
      var rows = Array.isArray(parsed) ? parsed : [parsed];
      var byLineId = {};
      for (var i = 0; i < rows.length; i++) if (rows[i] && rows[i].lineId) byLineId[rows[i].lineId] = rows[i];
      return byLineId;
    } catch (e) {
      return {};
    }
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
    var headTrimResults = readHeadTrimResults(project, modules);
    var actualHeadTrimmedItemCount = 0;
    var actualHeadTrimTotalMs = 0;

    for (var i = 0; i < project.lastMixSplitPlan.items.length; i++) {
      var it = project.lastMixSplitPlan.items[i];
      var trimResult = headTrimResults[it.lineId] || null;
      var actualDuration = trimResult && typeof trimResult.outputDuration === "number" ? trimResult.outputDuration : it.duration;
      var actualHeadTrimMs = trimResult && typeof trimResult.appliedMs === "number" ? trimResult.appliedMs : Number(it.headTrimMsApplied || 0);
      if (actualHeadTrimMs > 0) actualHeadTrimmedItemCount++;
      actualHeadTrimTotalMs += actualHeadTrimMs;
      it.actualOutputDuration = actualDuration;
      it.actualHeadTrimMsApplied = actualHeadTrimMs;
      if (trimResult && trimResult.reason) it.actualHeadTrimReason = trimResult.reason;
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
            duration: actualDuration,
            recordStart: typeof line.timelineStart === "number" ? line.timelineStart : 0,
            recordEnd: typeof line.timelineStart === "number" ? Number((line.timelineStart + actualDuration).toFixed(3)) : actualDuration,
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
        duration: actualDuration,
        headTrimMsApplied: actualHeadTrimMs,
        headTrimReason: trimResult && trimResult.reason ? trimResult.reason : "",
        outputFileName: it.outputFileName,
        outputPath: normalizeSlashes(outPath),
        exists: exists,
        sizeBytes: size,
        status: status
      });
    }

    var csvHeaders = ["index","lineId","originalName","mixStart","mixEnd","duration","headTrimMsApplied","headTrimReason","outputFileName","exists","sizeBytes","status","outputPath"];
    var rows = [csvHeaders.join(",")];
    for (var r = 0; r < details.length; r++) {
      var d = details[r];
      rows.push([d.index, d.lineId, d.originalName, d.mixStart, d.mixEnd, d.duration, d.headTrimMsApplied, d.headTrimReason, d.outputFileName, d.exists, d.sizeBytes, d.status, d.outputPath].map(csvEscape).join(","));
    }
    var report = {
      schemaVersion: 1,
      app: "AU Dub Panel",
      appVersion: APP_VERSION,
      projectId: project.projectId,
      projectName: project.projectName,
      checkedAt: new Date().toISOString(),
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      attachedTakes: attachedTakes,
      headTrimmedItemCount: actualHeadTrimmedItemCount,
      headTrimTotalMs: actualHeadTrimTotalMs,
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
      headTrimmedItemCount: actualHeadTrimmedItemCount,
      headTrimTotalMs: actualHeadTrimTotalMs,
      ok: report.ok
    };
    project.lastMixSplitPlan.headTrimmedItemCount = actualHeadTrimmedItemCount;
    project.lastMixSplitPlan.headTrimTotalMs = actualHeadTrimTotalMs;
    project.updatedAt = new Date().toISOString();
    saveProject(project);
    return {
      ok: report.ok,
      expected: expected,
      present: present,
      missing: missing,
      empty: empty,
      attachedTakes: attachedTakes,
      headTrimmedItemCount: actualHeadTrimmedItemCount,
      headTrimTotalMs: actualHeadTrimTotalMs,
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
          if (typeof it.actualOutputDuration === "number") return it.actualOutputDuration;
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
      appVersion: APP_VERSION,
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
    project.appVersion = APP_VERSION;
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
      appVersion: APP_VERSION,
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
      appVersion: APP_VERSION,
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
    var requestedHeadTrimMs = options && Object.prototype.hasOwnProperty.call(options, "headTrimMs")
      ? options.headTrimMs
      : project.recordingHeadTrimMs;
    var requestedHeadTrimEnabled = options && Object.prototype.hasOwnProperty.call(options, "headTrimEnabled")
      ? options.headTrimEnabled
      : project.recordingHeadTrimEnabled;
    var requestedHeadTrimMode = options && Object.prototype.hasOwnProperty.call(options, "headTrimMode")
      ? options.headTrimMode
      : project.recordingHeadTrimMode;
    normalizeRecordingHeadTrimSettings(project, {
      recordingHeadTrimEnabled: requestedHeadTrimEnabled,
      recordingHeadTrimMode: requestedHeadTrimMode,
      recordingHeadTrimMs: requestedHeadTrimMs
    });
    var clips = [];
    for (var k = 0; k < (liveClips || []).length; k++) {
      var lc = liveClips[k];
      if (!lc) continue;
      clips.push({
        name: lc.name || null,
        startSeconds: typeof lc.startSeconds === "number" ? lc.startSeconds : 0,
        durationSeconds: typeof lc.durationSeconds === "number" ? lc.durationSeconds : 0,
        filePath: (lc.filePath && String(lc.filePath).trim()) ? normalizeSlashes(String(lc.filePath).trim()) : null
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
        liveFilePath: clip.filePath || null,
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
      headTrimEnabled: project.recordingHeadTrimEnabled,
      headTrimMode: project.recordingHeadTrimMode,
      headTrimMs: project.recordingHeadTrimMs,
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
      liveFilePath: (clip.filePath && String(clip.filePath).trim()) ? normalizeSlashes(String(clip.filePath).trim()) : null,
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
      appVersion: APP_VERSION,
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
      appVersion: APP_VERSION,
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
    packageProjectAsync: packageProjectAsync,
    zipFolder: zipFolder,
    resolveSessionFilePath: resolveSessionFilePath,
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
