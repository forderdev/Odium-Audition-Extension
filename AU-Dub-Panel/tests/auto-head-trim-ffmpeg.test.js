const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadProjectStore() {
  const sourcePath = process.env.PROJECT_STORE_PATH ||
    path.join(__dirname, "..", "client", "js", "projectStore.js");
  const window = { require };
  const context = vm.createContext({
    window,
    console,
    Promise,
    Date,
    JSON,
    setTimeout,
    clearTimeout
  });
  vm.runInContext(fs.readFileSync(sourcePath, "utf8"), context, { filename: sourcePath });
  return window.ProjectStore;
}

function findFfmpeg() {
  const candidates = [
    process.env.FFMPEG_PATH,
    process.env.APPDATA && path.join(process.env.APPDATA, "Adobe", "CEP", "extensions", "AU-Dub-Panel", "tools", "ffmpeg.exe")
  ].filter(Boolean);
  for (const candidate of candidates) if (fs.existsSync(candidate)) return candidate;
  const where = childProcess.spawnSync("where.exe", ["ffmpeg"], { encoding: "utf8" });
  if (where.status === 0) return where.stdout.split(/\r?\n/).find(Boolean) || null;
  return null;
}

function detectMeanVolume(ffmpeg, filePath) {
  const result = childProcess.spawnSync(ffmpeg, [
    "-hide_banner", "-nostats", "-i", filePath,
    "-af", "volumedetect", "-f", "null", "NUL"
  ], { encoding: "utf8" });
  const match = /mean_volume:\s*(-?[\d.]+)\s*dB/.exec(String(result.stderr || "") + String(result.stdout || ""));
  assert.ok(match, result.stderr || result.stdout);
  return Number(match[1]);
}

function detectMaxVolume(ffmpeg, filePath, duration) {
  const filter = duration ? `atrim=end=${duration},volumedetect` : "volumedetect";
  const args = ["-hide_banner", "-nostats", "-i", filePath, "-af", filter, "-f", "null", "NUL"];
  const result = childProcess.spawnSync(ffmpeg, args, { encoding: "utf8" });
  const match = /max_volume:\s*(-?[\d.]+|-inf)\s*dB/.exec(String(result.stderr || "") + String(result.stdout || ""));
  assert.ok(match, result.stderr || result.stdout);
  return match[1] === "-inf" ? -Infinity : Number(match[1]);
}

function detectDuration(ffmpeg, filePath) {
  const result = childProcess.spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-nostats", "-i", filePath,
    "-map", "0:a:0", "-f", "null", "NUL", "-progress", "pipe:1"
  ], { encoding: "utf8" });
  const matches = Array.from(String(result.stdout || "").matchAll(/out_time_us=(\d+)/g));
  assert.ok(matches.length, result.stderr || result.stdout);
  return Number(matches[matches.length - 1][1]) / 1000000;
}

test("automatic head trim ignores noisy lead-ins and preserves overlapping speech", (t) => {
  const ffmpeg = findFfmpeg();
  if (!ffmpeg || process.platform !== "win32") {
    t.skip("Windows FFmpeg runtime is required for the generated split script.");
    return;
  }

  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-auto-ffmpeg-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");

  const generatedAudio = childProcess.spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "lavfi", "-i", "sine=frequency=5000:duration=0.04:sample_rate=48000",
    "-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono:d=0.46",
    "-f", "lavfi", "-i", "sine=frequency=220:duration=1.5:sample_rate=48000",
    "-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono:d=1",
    "-f", "lavfi", "-i", "sine=frequency=220:duration=2:sample_rate=48000",
    "-f", "lavfi", "-i", "sine=frequency=5000:duration=0.04:sample_rate=48000",
    "-f", "lavfi", "-i", "sine=frequency=300:duration=0.22:sample_rate=48000",
    "-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono:d=0.58",
    "-f", "lavfi", "-i", "sine=frequency=220:duration=1.2:sample_rate=48000",
    "-filter_complex", "[0:a][1:a][2:a]concat=n=3:v=0:a=1[safe];[4:a][5:a]amix=inputs=2:duration=first:normalize=0[overlap];[6:a]volume=-23dB[noise_floor];[noise_floor][7:a][8:a]concat=n=3:v=0:a=1[late_speech];[safe][3:a][overlap][3:a][late_speech]concat=n=5:v=0:a=1[out]",
    "-map", "[out]", "-c:a", "pcm_s16le", mixPath
  ], { encoding: "utf8" });
  assert.equal(generatedAudio.status, 0, generatedAudio.stderr);

  const project = {
    projectId: "auto_ffmpeg_test",
    projectName: "Auto_FFmpeg_Test",
    projectRootPath: fixtureRoot,
    gapSeconds: 1,
    recordingHeadTrimEnabled: true,
    recordingHeadTrimMode: "auto",
    recordingHeadTrimMs: 250,
    ffmpegPath: ffmpeg,
    lines: [
      {
        lineId: "line_safe_boundary",
        originalName: "safe.wav",
        exportName: "safe.wav",
        originalDuration: 2,
        selectedTakeId: "take_safe",
        takes: [{ takeId: "take_safe", duration: 2, mixStart: 0, mixEnd: 2, sourceKind: "live_recording", isSelected: true }]
      },
      {
        lineId: "line_overlap",
        originalName: "overlap.wav",
        exportName: "overlap.wav",
        originalDuration: 2,
        selectedTakeId: "take_overlap",
        takes: [{ takeId: "take_overlap", duration: 2, mixStart: 3, mixEnd: 5, sourceKind: "live_recording", isSelected: true }]
      },
      {
        lineId: "line_noisy_lead_in",
        originalName: "late_speech.wav",
        exportName: "late_speech.wav",
        originalDuration: 2,
        selectedTakeId: "take_noisy_lead_in",
        takes: [{ takeId: "take_noisy_lead_in", duration: 2, mixStart: 6, mixEnd: 8, sourceKind: "live_recording", isSelected: true }]
      }
    ]
  };

  const store = loadProjectStore();
  const script = store.createFfmpegMixSplitScript(project, { name: "mix.wav", path: mixPath });
  const run = childProcess.spawnSync("powershell.exe", [
    "-ExecutionPolicy", "Bypass", "-NoProfile", "-File", script.ps1Path
  ], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.doesNotMatch(run.stderr, /Input #0|Stream mapping:|Output #0/);

  const results = JSON.parse(fs.readFileSync(script.headTrimResultsPath, "utf8").replace(/^\uFEFF/, ""));
  assert.equal(results.length, 3);
  assert.ok(results[0].appliedMs >= 460 && results[0].appliedMs <= 500, JSON.stringify(results[0]));
  assert.equal(results[0].reason, "sustained_speech_boundary");
  assert.equal(results[1].appliedMs, 0);
  assert.equal(results[1].reason, "speech_or_no_boundary");
  assert.ok(results[2].appliedMs >= 700 && results[2].appliedMs <= 900, JSON.stringify(results[2]));
  assert.equal(results[2].reason, "sustained_speech_boundary");
});

test("packaging silences keyboard lead-ins without shifting session media", async (t) => {
  const ffmpeg = findFfmpeg();
  if (!ffmpeg || process.platform !== "win32") {
    t.skip("Windows FFmpeg runtime is required for package sanitizing.");
    return;
  }

  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-sanitize-ffmpeg-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const projectRoot = path.join(fixtureRoot, "project");
  const sessionRoot = path.join(fixtureRoot, "session");
  const importedRoot = path.join(sessionRoot, "Imported Files");
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(importedRoot, { recursive: true });

  const originalPath = path.join(projectRoot, "original.wav");
  const recordingPath = path.join(importedRoot, "recording.wav");
  const sessionPath = path.join(sessionRoot, "session.sesx");
  fs.writeFileSync(sessionPath, "session-data");

  const createRecording = childProcess.spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "lavfi", "-i", "sine=frequency=5000:duration=0.04:sample_rate=48000",
    "-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono:d=0.46",
    "-f", "lavfi", "-i", "sine=frequency=220:duration=1.5:sample_rate=48000",
    "-filter_complex", "[0:a][1:a][2:a]concat=n=3:v=0:a=1[out]",
    "-map", "[out]", "-c:a", "pcm_f32le", recordingPath
  ], { encoding: "utf8" });
  assert.equal(createRecording.status, 0, createRecording.stderr);
  fs.copyFileSync(recordingPath, originalPath);

  const project = {
    projectId: "sanitize_ffmpeg_test",
    projectName: "Sanitize_FFmpeg_Test",
    projectRootPath: projectRoot,
    recordingHeadTrimEnabled: true,
    recordingHeadTrimMode: "auto",
    recordingHeadTrimMs: 250,
    ffmpegPath: ffmpeg,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      originalDuration: 2,
      exportName: "original.wav",
      selectedTakeId: "take_1",
      takes: [{
        takeId: "take_1",
        fileName: "recording.wav",
        originalTakeName: "recording.wav",
        liveFilePath: recordingPath,
        sourceKind: "live_recording",
        duration: 2,
        mixStart: 10,
        mixEnd: 12,
        isSelected: true
      }]
    }]
  };

  const result = await loadProjectStore().packageProjectAsync(project, {
    sesxPath: sessionPath,
    includeSessionMedia: true,
    levelMatchOriginal: false,
    ffmpegPath: ffmpeg
  });
  const packagedProject = JSON.parse(fs.readFileSync(result.jsonPath, "utf8"));
  const packagedTake = packagedProject.lines[0].takes[0];
  const takePath = path.join(result.packageRoot, ...packagedTake.fileRelativePath.split("/"));
  const sessionMediaPath = path.join(result.packageRoot, "Imported Files", "recording.wav");
  const trimSeconds = packagedTake.headTrimSanitizedMs / 1000;

  assert.ok(packagedTake.headTrimSanitizedMs >= 460 && packagedTake.headTrimSanitizedMs <= 500, JSON.stringify(packagedTake));
  assert.equal(result.headTrim.sanitizedTakes, 1);
  assert.equal(result.headTrim.sanitizedSessionFiles, 1);
  assert.ok(Math.abs(detectDuration(ffmpeg, recordingPath) - detectDuration(ffmpeg, takePath)) <= 0.002);
  assert.ok(Math.abs(detectDuration(ffmpeg, recordingPath) - detectDuration(ffmpeg, sessionMediaPath)) <= 0.002);
  assert.ok(Number.isFinite(detectMaxVolume(ffmpeg, recordingPath, Math.max(0.1, trimSeconds - 0.02))));
  assert.ok(detectMaxVolume(ffmpeg, takePath, Math.max(0.1, trimSeconds - 0.02)) <= -85);
  assert.deepEqual(fs.readFileSync(takePath), fs.readFileSync(sessionMediaPath));
});

test("mix split matches final pieces to original mean volume", (t) => {
  const ffmpeg = findFfmpeg();
  if (!ffmpeg || process.platform !== "win32") {
    t.skip("Windows FFmpeg runtime is required for the generated split script.");
    return;
  }

  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-post-mix-ffmpeg-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");
  const originalPath = path.join(fixtureRoot, "original.wav");

  const createMix = childProcess.spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "lavfi", "-i", "sine=frequency=440:duration=1:sample_rate=48000",
    "-af", "volume=-12dB", "-c:a", "pcm_f32le", mixPath
  ], { encoding: "utf8" });
  assert.equal(createMix.status, 0, createMix.stderr);

  const createOriginal = childProcess.spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "lavfi", "-i", "sine=frequency=440:duration=1:sample_rate=48000",
    "-af", "volume=-3dB", "-c:a", "pcm_f32le", originalPath
  ], { encoding: "utf8" });
  assert.equal(createOriginal.status, 0, createOriginal.stderr);

  const project = {
    projectId: "post_mix_ffmpeg_test",
    projectName: "Post_Mix_FFmpeg_Test",
    projectRootPath: fixtureRoot,
    recordingHeadTrimEnabled: false,
    levelMatchOriginal: true,
    ffmpegPath: ffmpeg,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      exportName: "original.wav",
      originalDuration: 1,
      selectedTakeId: "take_live",
      takes: [{
        takeId: "take_live",
        duration: 1,
        mixStart: 0,
        mixEnd: 1,
        sourceKind: "live_recording",
        isSelected: true
      }]
    }]
  };

  const store = loadProjectStore();
  const script = store.createFfmpegMixSplitScript(project, { name: "mix.wav", path: mixPath });
  assert.equal(script.levelMatchCount, 1);
  const run = childProcess.spawnSync("powershell.exe", [
    "-ExecutionPolicy", "Bypass", "-NoProfile", "-File", script.ps1Path
  ], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || run.stdout);

  const outputPath = path.join(fixtureRoot, "Audio", "Takes", "original__mixsplit.wav");
  const originalMean = detectMeanVolume(ffmpeg, originalPath);
  const outputMean = detectMeanVolume(ffmpeg, outputPath);
  assert.ok(Math.abs(originalMean - outputMean) <= 0.2, `original=${originalMean}, output=${outputMean}`);
  assert.match(fs.readFileSync(script.logPath, "utf8"), /Duzeyi esitlenen: 1/);

  const verification = store.verifyMixSplitOutputs(project, true);
  assert.equal(verification.attachedTakes, 1);
  project.exportPreset = store.createExportPreset("game_wav_48k_24_mono");
  const exportScript = store.createFfmpegExportScript(project);
  const exportRun = childProcess.spawnSync("powershell.exe", [
    "-ExecutionPolicy", "Bypass", "-NoProfile", "-File", exportScript.ps1Path
  ], { encoding: "utf8" });
  assert.equal(exportRun.status, 0, exportRun.stderr || exportRun.stdout);
  const exportedPath = path.join(exportScript.exportDir, "original.wav");
  const exportedMean = detectMeanVolume(ffmpeg, exportedPath);
  assert.ok(Math.abs(originalMean - exportedMean) <= 0.2, `original=${originalMean}, exported=${exportedMean}`);
});
