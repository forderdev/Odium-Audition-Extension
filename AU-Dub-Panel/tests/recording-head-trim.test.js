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
  vm.runInContext(fs.readFileSync(sourcePath, "utf8"), context, { filename: sourcePath });
  return window.ProjectStore;
}

function liveTake(id, start, end, sourceKind = "live_recording") {
  return {
    takeId: id,
    duration: end - start,
    mixStart: start,
    mixEnd: end,
    sourceKind,
    isSelected: true
  };
}

test("mix split skips keyboard noise at live recording starts without double trimming", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-head-trim-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");
  fs.writeFileSync(mixPath, "mixed-audio");

  const project = {
    projectId: "head_trim_test",
    projectName: "Head_Trim_Test",
    projectRootPath: fixtureRoot,
    gapSeconds: 6,
    recordingHeadTrimEnabled: true,
    recordingHeadTrimMode: "fixed",
    recordingHeadTrimMs: 250,
    lines: [
      {
        lineId: "line_0001",
        originalName: "normal.wav",
        exportName: "normal.wav",
        originalDuration: 2,
        selectedTakeId: "take_normal",
        takes: [liveTake("take_normal", 10, 12)]
      },
      {
        lineId: "line_0002",
        originalName: "short.wav",
        exportName: "short.wav",
        originalDuration: 0.4,
        selectedTakeId: "take_short",
        takes: [liveTake("take_short", 20, 20.4)]
      },
      {
        lineId: "line_0003",
        originalName: "already_split.wav",
        exportName: "already_split.wav",
        originalDuration: 1,
        selectedTakeId: "take_split",
        takes: [liveTake("take_split", 30.25, 31.25, "mix_split")]
      }
    ]
  };

  const result = loadProjectStore().createMixSplitPlan(project, {
    name: "mix.wav",
    path: mixPath
  });
  const plan = JSON.parse(fs.readFileSync(result.jsonPath, "utf8"));

  assert.equal(plan.recordingHeadTrimMs, 250);
  assert.equal(plan.recordingHeadTrimEnabled, true);
  assert.equal(plan.recordingHeadTrimMode, "fixed");
  assert.equal(plan.headTrimAutoCandidateCount, 0);
  assert.equal(plan.headTrimmedItemCount, 2);
  assert.equal(plan.headTrimTotalMs, 350);
  assert.equal(result.headTrimmedItemCount, 2);
  assert.equal(result.headTrimTotalMs, 350);
  assert.equal(plan.items[0].mixStart, 10.25);
  assert.equal(plan.items[0].mixEnd, 12);
  assert.equal(plan.items[0].duration, 1.75);
  assert.equal(plan.items[0].headTrimMsApplied, 250);

  assert.equal(plan.items[1].mixStart, 20.1);
  assert.equal(plan.items[1].duration, 0.3);
  assert.equal(plan.items[1].headTrimMsApplied, 100);

  assert.equal(plan.items[2].mixStart, 30.25);
  assert.equal(plan.items[2].duration, 1);
  assert.equal(plan.items[2].headTrimMsApplied, 0);
});

test("auto head trim defers safe candidates to FFmpeg and disabled mode leaves every boundary intact", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-auto-head-trim-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");
  fs.writeFileSync(mixPath, "mixed-audio");

  const project = {
    projectId: "auto_head_trim_test",
    projectName: "Auto_Head_Trim_Test",
    projectRootPath: fixtureRoot,
    gapSeconds: 6,
    recordingHeadTrimEnabled: true,
    recordingHeadTrimMode: "auto",
    recordingHeadTrimMs: 250,
    lines: [
      {
        lineId: "line_live",
        originalName: "live.wav",
        exportName: "live.wav",
        originalDuration: 2,
        selectedTakeId: "take_live",
        takes: [liveTake("take_live", 10, 12)]
      },
      {
        lineId: "line_split",
        originalName: "split.wav",
        exportName: "split.wav",
        originalDuration: 1,
        selectedTakeId: "take_split",
        takes: [liveTake("take_split", 20, 21, "mix_split")]
      }
    ]
  };

  const store = loadProjectStore();
  const autoResult = store.createFfmpegMixSplitScript(project, { name: "mix.wav", path: mixPath });
  const autoPlan = JSON.parse(fs.readFileSync(autoResult.planPath, "utf8"));
  const script = fs.readFileSync(autoResult.ps1Path, "utf8");

  assert.equal(autoPlan.recordingHeadTrimEnabled, true);
  assert.equal(autoPlan.recordingHeadTrimMode, "auto");
  assert.equal(autoPlan.headTrimAutoCandidateCount, 1);
  assert.equal(autoPlan.headTrimmedItemCount, 0);
  assert.equal(autoPlan.items[0].mixStart, 10);
  assert.equal(autoPlan.items[0].duration, 2);
  assert.equal(autoPlan.items[0].headTrimAutoEligible, true);
  assert.equal(autoPlan.items[1].headTrimAutoEligible, false);
  assert.match(script, /function AUAutoHeadTrim/);
  assert.match(script, /autoTrim = \$true/);
  assert.match(script, /silenceremove=start_periods=1:start_duration=0\.12:start_threshold=-40dB/);
  assert.match(script, /\$minUsefulTrim = 0\.18/);
  assert.match(script, /\$maxTrim = \[math\]::Min\(1\.2/);
  assert.match(script, /-hide_banner -loglevel error -nostats -y -ss/);

  project.recordingHeadTrimEnabled = false;
  project.recordingHeadTrimMode = "fixed";
  const disabledResult = store.createMixSplitPlan(project, null);
  const disabledPlan = JSON.parse(fs.readFileSync(disabledResult.jsonPath, "utf8"));
  assert.equal(disabledPlan.recordingHeadTrimEnabled, false);
  assert.equal(disabledPlan.headTrimAutoCandidateCount, 0);
  assert.equal(disabledPlan.items[0].mixStart, 10);
  assert.equal(disabledPlan.items[0].headTrimMsApplied, 0);
});

test("mix split reuses the keyboard lead-in already sanitized during packaging", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-sanitized-head-trim-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");
  fs.writeFileSync(mixPath, "mixed-audio");

  const take = liveTake("take_live", 10, 12);
  take.headTrimSanitizedMs = 800;
  take.headTrimSanitizedMode = "auto";
  const project = {
    projectId: "sanitized_head_trim_test",
    projectName: "Sanitized_Head_Trim_Test",
    projectRootPath: fixtureRoot,
    recordingHeadTrimEnabled: true,
    recordingHeadTrimMode: "auto",
    lines: [{
      lineId: "line_live",
      originalName: "live.wav",
      exportName: "live.wav",
      originalDuration: 2,
      selectedTakeId: "take_live",
      takes: [take]
    }]
  };

  const result = loadProjectStore().createMixSplitPlan(project, { name: "mix.wav", path: mixPath });
  const plan = JSON.parse(fs.readFileSync(result.jsonPath, "utf8"));

  assert.equal(plan.items[0].mixStart, 10.8);
  assert.equal(plan.items[0].duration, 1.2);
  assert.equal(plan.items[0].headTrimMsApplied, 800);
  assert.equal(plan.items[0].headTrimAutoEligible, false);
});

test("mix split levels against original files by default and can be disabled", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-post-mix-level-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");
  const originalPath = path.join(fixtureRoot, "original.wav");
  fs.writeFileSync(mixPath, "mixed-audio");
  fs.writeFileSync(originalPath, "original-audio");

  const project = {
    projectId: "post_mix_level_test",
    projectName: "Post_Mix_Level_Test",
    projectRootPath: fixtureRoot,
    lines: [{
      lineId: "line_0001",
      originalName: "original.wav",
      originalAbsolutePath: originalPath,
      exportName: "original.wav",
      originalDuration: 1,
      selectedTakeId: "take_live",
      takes: [liveTake("take_live", 0, 1)]
    }]
  };

  const store = loadProjectStore();
  const enabledResult = store.createFfmpegMixSplitScript(project, { name: "mix.wav", path: mixPath });
  const enabledPlan = JSON.parse(fs.readFileSync(enabledResult.planPath, "utf8"));
  const enabledScript = fs.readFileSync(enabledResult.ps1Path, "utf8");

  assert.equal(enabledPlan.items[0].levelRefPath.replace(/\\/g, "/"), originalPath.replace(/\\/g, "/"));
  assert.match(enabledScript, /levelRef = '.+original\.wav'/);
  assert.match(enabledScript, /duzey esitlendi/);

  project.levelMatchOriginal = false;
  const disabledResult = store.createMixSplitPlan(project, { name: "mix.wav", path: mixPath });
  const disabledPlan = JSON.parse(fs.readFileSync(disabledResult.jsonPath, "utf8"));
  assert.equal(disabledPlan.items[0].levelRefPath, "");
});
