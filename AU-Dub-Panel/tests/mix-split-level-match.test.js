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

function normalize(value) {
  return String(value || "").replace(/\\/g, "/");
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

  assert.equal(normalize(enabledPlan.items[0].levelRefPath), normalize(originalPath));
  assert.match(enabledScript, /levelRef = '.+original\.wav'/);
  assert.match(enabledScript, /duzey esitlendi/);

  project.levelMatchOriginal = false;
  const disabledResult = store.createMixSplitPlan(project, { name: "mix.wav", path: mixPath });
  const disabledPlan = JSON.parse(fs.readFileSync(disabledResult.jsonPath, "utf8"));
  assert.equal(disabledPlan.items[0].levelRefPath, "");
});

test("mix split cuts exactly at the recorded clip bounds (no head trimming)", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-no-head-trim-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const mixPath = path.join(fixtureRoot, "mix.wav");
  fs.writeFileSync(mixPath, "mixed-audio");

  const project = {
    projectId: "no_head_trim_test",
    projectName: "No_Head_Trim_Test",
    projectRootPath: fixtureRoot,
    levelMatchOriginal: false,
    lines: [{
      lineId: "line_0001",
      originalName: "line1.wav",
      exportName: "line1.wav",
      originalDuration: 3,
      selectedTakeId: "take_live",
      takes: [liveTake("take_live", 1.5, 4.5)]
    }]
  };

  const store = loadProjectStore();
  const result = store.createMixSplitPlan(project, { name: "mix.wav", path: mixPath });
  const plan = JSON.parse(fs.readFileSync(result.jsonPath, "utf8"));
  const item = plan.items[0];

  assert.equal(item.mixStart, 1.5, "kesim kaydin gercek basindan baslamali");
  assert.equal(item.mixEnd, 4.5);
  assert.equal(item.duration, 3);
  assert.equal(item.headTrimMsApplied, undefined, "head trim alanlari kalmamali");
  assert.equal(plan.recordingHeadTrimEnabled, undefined);

  const script = store.createFfmpegMixSplitScript(project, { name: "mix.wav", path: mixPath });
  const ps1 = fs.readFileSync(script.ps1Path, "utf8");
  assert.doesNotMatch(ps1, /AUAutoHeadTrim|autoTrim|plannedTrimMs|headTrimResults/);
});
