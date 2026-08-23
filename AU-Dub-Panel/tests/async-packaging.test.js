const assert = require("node:assert/strict");
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

  vm.runInContext(fs.readFileSync(sourcePath, "utf8"), context, {
    filename: sourcePath
  });

  return window.ProjectStore;
}

test("packageProjectAsync copies session media without blocking the event loop", async (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-async-package-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const projectRoot = path.join(fixtureRoot, "project");
  const sessionRoot = path.join(fixtureRoot, "session");
  const importedRoot = path.join(sessionRoot, "Imported Files");
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(importedRoot, { recursive: true });

  const originalPath = path.join(projectRoot, "original.wav");
  const sessionPath = path.join(sessionRoot, "session.sesx");
  const mediaPath = path.join(importedRoot, "recording.wav");
  fs.writeFileSync(originalPath, "original-audio");
  fs.writeFileSync(
    sessionPath,
    `<session><files><file absolutePath="${originalPath}"/><file absolutePath="${mediaPath}" relativePath="Imported Files/recording.wav"/></files></session>`
  );
  fs.writeFileSync(mediaPath, "recorded-audio");

  const project = {
    projectId: "project_test",
    projectName: "Async_Test",
    projectRootPath: projectRoot,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      originalRelativePath: "original.wav",
      originalDuration: 1,
      exportName: "original.wav",
      takes: []
    }]
  };

  let copyCalls = 0;
  let timerTicks = 0;
  const progress = [];
  const heartbeat = setInterval(() => { timerTicks++; }, 10);

  let result;
  try {
    result = await loadProjectStore().packageProjectAsync(project, {
      sesxPath: sessionPath,
      includeSessionMedia: true,
      levelMatchOriginal: false,
      copyFile(source, destination, callback) {
        copyCalls++;
        setTimeout(() => fs.copyFile(source, destination, callback), 80);
      },
      onProgress(info) {
        progress.push(info);
      }
    });
  } finally {
    clearInterval(heartbeat);
  }

  assert.equal(result.sessionMediaCount, 1);
  assert.ok(copyCalls >= 1, "session media should use asynchronous copying");
  assert.ok(timerTicks >= 3, "the renderer event loop should keep running");
  assert.ok(progress.some((item) => item.phase === "media" && item.completed === 1));
  assert.equal(
    fs.readFileSync(path.join(result.packageRoot, "Imported Files", "recording.wav"), "utf8"),
    "recorded-audio"
  );
  const packagedSession = fs.readFileSync(result.sesxCopied, "utf8");
  const packagedOriginalPath = path.join(result.packageRoot, "Audio", "Original", "original.wav");
  assert.ok(packagedSession.includes(`absolutePath="${packagedOriginalPath}"`));
  assert.ok(packagedSession.includes('relativePath="Audio/Original/original.wav"'));
});

test("packageProjectAsync keeps session media when the source session is inside an older package", async (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-nested-package-media-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const projectRoot = path.join(fixtureRoot, "project");
  const sessionRoot = path.join(fixtureRoot, "Existing_AU_Dub_Package_20260801_230556");
  const importedRoot = path.join(sessionRoot, "Imported Files");
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(importedRoot, { recursive: true });

  const originalPath = path.join(projectRoot, "original.wav");
  const sessionPath = path.join(sessionRoot, "session.sesx");
  const mediaPath = path.join(importedRoot, "recording.wav");
  fs.writeFileSync(originalPath, "original-audio");
  fs.writeFileSync(sessionPath, "session-data");
  fs.writeFileSync(mediaPath, "recorded-audio");

  const project = {
    projectId: "nested_package_media_test",
    projectName: "Nested_Package_Media_Test",
    projectRootPath: projectRoot,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      originalDuration: 1,
      exportName: "original.wav",
      takes: []
    }]
  };

  const result = await loadProjectStore().packageProjectAsync(project, {
    sesxPath: sessionPath,
    includeSessionMedia: true,
    levelMatchOriginal: false
  });

  assert.equal(result.sessionMediaCount, 1);
  assert.equal(
    fs.readFileSync(path.join(result.packageRoot, "Imported Files", "recording.wav"), "utf8"),
    "recorded-audio"
  );
});

test("packageProjectAsync measures and levels recordings through asynchronous processes", async (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-async-level-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const projectRoot = path.join(fixtureRoot, "project");
  const sessionRoot = path.join(fixtureRoot, "session");
  const recordedRoot = path.join(sessionRoot, "Session_Recorded");
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(recordedRoot, { recursive: true });

  const originalPath = path.join(projectRoot, "original.wav");
  const sessionPath = path.join(sessionRoot, "session.sesx");
  const recordingPath = path.join(recordedRoot, "recording.wav");
  fs.writeFileSync(originalPath, "original-audio");
  fs.writeFileSync(sessionPath, "session-data");
  fs.writeFileSync(recordingPath, "recorded-audio");

  const project = {
    projectId: "project_level_test",
    projectName: "Async_Level_Test",
    projectRootPath: projectRoot,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      originalRelativePath: "original.wav",
      originalDuration: 1,
      exportName: "original.wav",
      selectedTakeId: "take_1",
      takes: [{
        takeId: "take_1",
        fileName: "recording.wav",
        originalTakeName: "recording.wav",
        fileAbsolutePath: recordingPath,
        liveFilePath: recordingPath,
        duration: 1,
        isSelected: true
      }]
    }]
  };

  let activeProcesses = 0;
  let maxActiveProcesses = 0;
  let timerTicks = 0;
  const processArgs = [];
  const heartbeat = setInterval(() => { timerTicks++; }, 10);

  function runProcess(_executable, args, callback) {
    processArgs.push(Array.from(args));
    activeProcesses++;
    maxActiveProcesses = Math.max(maxActiveProcesses, activeProcesses);
    setTimeout(() => {
      activeProcesses--;
      if (args[0] === "-version") {
        callback(null, { status: 0, stdout: "ffmpeg test", stderr: "" });
        return;
      }
      if (args.includes("volumedetect")) {
        const inputPath = args[args.indexOf("-i") + 1];
        const normalizedInput = String(inputPath).replace(/\\/g, "/").toLowerCase();
        const normalizedOriginal = String(originalPath).replace(/\\/g, "/").toLowerCase();
        const mean = normalizedInput === normalizedOriginal ? -20 : -30;
        callback(null, {
          status: 0,
          stdout: "",
          stderr: `mean_volume: ${mean} dB\nmax_volume: -4 dB\n`
        });
        return;
      }
      const source = args[args.indexOf("-i") + 1];
      const destination = args[args.length - 1];
      fs.copyFileSync(source, destination);
      callback(null, { status: 0, stdout: "", stderr: "" });
    }, 50);
  }

  let result;
  try {
    result = await loadProjectStore().packageProjectAsync(project, {
      sesxPath: sessionPath,
      includeSessionMedia: true,
      levelMatchOriginal: true,
      ffmpegPath: "fake-ffmpeg",
      measureConcurrency: 2,
      runProcess
    });
  } finally {
    clearInterval(heartbeat);
  }

  assert.equal(result.levelMatch.lineCount, 1);
  assert.equal(result.levelMatch.leveled, 1, JSON.stringify(result.levelMatch));
  assert.ok(processArgs.some((args) => args.some((arg) => String(arg).startsWith("volume="))));
  assert.ok(maxActiveProcesses >= 2, "volume measurements should run concurrently");
  assert.ok(timerTicks >= 8, "the event loop should remain responsive during FFmpeg work");
  assert.equal(
    fs.readFileSync(path.join(result.packageRoot, "Session_Recorded", "recording.wav"), "utf8"),
    "recorded-audio"
  );
});

test("packageProjectAsync packages and levels live recordings outside the session directory", async (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-live-path-package-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const projectRoot = path.join(fixtureRoot, "project");
  const backupRoot = path.join(fixtureRoot, "Backup");
  const sessionRoot = path.join(backupRoot, "Existing_AU_Dub_Package_20260801_230556");
  const importedRoot = path.join(backupRoot, "Imported Files");
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(sessionRoot, { recursive: true });
  fs.mkdirSync(importedRoot, { recursive: true });

  const originalPath = path.join(projectRoot, "original.wav");
  const sessionPath = path.join(sessionRoot, "session.sesx");
  const recordingPath = path.join(importedRoot, "Track 2_001.wav");
  fs.writeFileSync(originalPath, "original-audio");
  fs.writeFileSync(sessionPath, "session-data");
  fs.writeFileSync(recordingPath, "recorded-audio");

  const project = {
    projectId: "project_live_path_test",
    projectName: "Live_Path_Test",
    projectRootPath: projectRoot,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      originalRelativePath: "original.wav",
      originalDuration: 1,
      exportName: "original.wav",
      selectedTakeId: "live_take_1",
      takes: [{
        takeId: "live_take_1",
        fileName: null,
        originalTakeName: "Track 2_001",
        fileRelativePath: null,
        fileAbsolutePath: null,
        liveFilePath: recordingPath,
        sourceKind: "live_recording",
        duration: 1,
        isSelected: true
      }]
    }]
  };

  const processArgs = [];
  function runProcess(_executable, args, callback) {
    processArgs.push(Array.from(args));
    setTimeout(() => {
      if (args[0] === "-version") {
        callback(null, { status: 0, stdout: "ffmpeg test", stderr: "" });
        return;
      }
      if (args.includes("volumedetect")) {
        const inputPath = args[args.indexOf("-i") + 1];
        const normalizedInput = String(inputPath).replace(/\\/g, "/").toLowerCase();
        const normalizedOriginal = String(originalPath).replace(/\\/g, "/").toLowerCase();
        const mean = normalizedInput === normalizedOriginal ? -20 : -30;
        callback(null, {
          status: 0,
          stdout: "",
          stderr: `mean_volume: ${mean} dB\nmax_volume: -4 dB\n`
        });
        return;
      }
      const source = args[args.indexOf("-i") + 1];
      const destination = args[args.length - 1];
      fs.copyFileSync(source, destination);
      callback(null, { status: 0, stdout: "", stderr: "" });
    }, 10);
  }

  const result = await loadProjectStore().packageProjectAsync(project, {
    sesxPath: sessionPath,
    includeSessionMedia: true,
    levelMatchOriginal: true,
    ffmpegPath: "fake-ffmpeg",
    runProcess
  });

  const packagedProject = JSON.parse(fs.readFileSync(result.jsonPath, "utf8"));
  const packagedTake = packagedProject.lines[0].takes[0];
  assert.ok(packagedTake.fileRelativePath, "the selected live recording should be written to Audio/Takes");
  const packagedTakePath = path.join(result.packageRoot, ...packagedTake.fileRelativePath.split("/"));

  assert.equal(result.sessionMediaCount, 0, "the live recording is outside the session directory");
  assert.equal(result.copiedTakes, 1);
  assert.equal(result.missingTakes.length, 0);
  assert.equal(result.levelMatch.lineCount, 1);
  assert.equal(result.levelMatch.leveled, 1, JSON.stringify(result.levelMatch));
  assert.equal(result.levelMatch.packagedTakesLeveled, 1);
  assert.ok(fs.existsSync(packagedTakePath));
  assert.equal(fs.readFileSync(packagedTakePath, "utf8"), "recorded-audio");
  assert.ok(
    processArgs.some((args) => args.some((arg) => String(arg).startsWith("volume=")) && args[args.indexOf("-i") + 1] === recordingPath),
    "gain should be applied to the packaged Audio/Takes file"
  );
});
