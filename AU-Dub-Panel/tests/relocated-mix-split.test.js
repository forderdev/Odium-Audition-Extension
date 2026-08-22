const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadProjectStore() {
  const sourcePath = path.join(__dirname, "..", "client", "js", "projectStore.js");
  const window = { require };
  const context = vm.createContext({
    window, console, Promise, Date, JSON, setTimeout, clearTimeout
  });
  vm.runInContext(fs.readFileSync(sourcePath, "utf8"), context, { filename: sourcePath });
  return window.ProjectStore;
}

function norm(v) { return String(v || "").replace(/\\/g, "/"); }

// Gönderen makinedeki (erişilemez) kök. Paket taşınınca bu yol yazılamaz olur.
const STALE_ROOT = "C:\\Users\\EFE\\Documents\\Adobe\\Audition\\26.0\\Spider Man\\Game_Dub_Project_AU_Dub_Package_20260822_202617";

function buildRelocatedPackage(t) {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-relocated-split-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const packageRoot = path.join(fixtureRoot, "Downloads", "Game_Dub_Project_AU_Dub_Package_20260822_202617");
  const metadataDir = path.join(packageRoot, ".audub");
  fs.mkdirSync(metadataDir, { recursive: true });
  fs.mkdirSync(path.join(packageRoot, "Audio", "Original"), { recursive: true });

  const origName = "replik_001.wav";
  fs.writeFileSync(path.join(packageRoot, "Audio", "Original", origName), "RIFFfake", "utf8");

  const mixPath = path.join(fixtureRoot, "Spider Man_mixdown.wav");
  fs.writeFileSync(mixPath, "RIFFfakemix", "utf8");

  // Gönderenin project.json'u: TÜM mutlak yollar stale kökü gösterir.
  const projectPath = path.join(metadataDir, "project.json");
  fs.writeFileSync(projectPath, JSON.stringify({
    projectName: "Game_Dub_Project",
    projectRootPath: STALE_ROOT,
    packageRootPath: STALE_ROOT,
    gapSeconds: 6,
    levelMatchOriginal: false,
    // Gönderende kalmış eski split çıktıları (stale):
    lastMixSplitPlan: {
      mixFileName: "final_mix__eski.wav",
      mixFileRelativePath: "Audio/Mix/final_mix__eski.wav",
      mixFileAbsolutePath: STALE_ROOT + "\\Audio\\Mix\\final_mix__eski.wav",
      items: []
    },
    lastMixSplitScript: {
      ps1Path: STALE_ROOT + "\\.audub\\run-split-mix-ffmpeg.ps1",
      outputDir: STALE_ROOT + "\\Audio\\Takes"
    },
    exportOutputDir: STALE_ROOT + "\\Audio\\Exports",
    lines: [{
      lineId: "line_0001",
      originalName: origName,
      originalRelativePath: "Audio/Original/" + origName,
      originalAbsolutePath: STALE_ROOT + "\\Audio\\Original\\" + origName,
      originalDuration: 2,
      timelineStart: 1, timelineEnd: 3,
      exportName: "replik_001", exportExtension: "wav",
      selectedTakeId: "t1",
      takes: [{
        takeId: "t1", lineId: "line_0001", isSelected: true,
        sourceKind: "live_recording", matchMode: "position",
        duration: 2, mixStart: 1, mixEnd: 3, preserveRecordedTail: true
      }]
    }]
  }), "utf8");

  return { fixtureRoot, packageRoot, projectPath, mixPath };
}

test("relocated package: mix split writes under selected package root, never the stale sender root", (t) => {
  const PS = loadProjectStore();
  const { packageRoot, projectPath, mixPath } = buildRelocatedPackage(t);

  const project = PS.loadProjectFromPath(projectPath);
  assert.equal(norm(project.projectRootPath), norm(packageRoot), "projectRootPath rebase edilmeli");

  const script = PS.createFfmpegMixSplitScript(project, { name: path.basename(mixPath), path: mixPath });

  const staleLower = norm(STALE_ROOT).toLowerCase();
  for (const [label, value] of Object.entries({
    ps1Path: script.ps1Path, batPath: script.batPath,
    logPath: script.logPath, outputDir: script.outputDir, planPath: script.planPath
  })) {
    assert.ok(norm(value).toLowerCase().startsWith(norm(packageRoot).toLowerCase()),
      `${label} yeni kökün altında olmalı, oysa: ${value}`);
    assert.ok(!norm(value).toLowerCase().includes(staleLower), `${label} stale kök içeriyor: ${value}`);
  }

  const ps1 = fs.readFileSync(script.ps1Path, "utf8");
  assert.ok(!ps1.toLowerCase().includes(staleLower), "üretilen PS1 stale kök içeriyor");

  const plan = JSON.parse(fs.readFileSync(script.planPath, "utf8"));
  assert.ok(!norm(plan.mixFileAbsolutePath).toLowerCase().includes(staleLower),
    "plan stale mix yolu kullanmış: " + plan.mixFileAbsolutePath);
  assert.ok(fs.existsSync(plan.mixFileAbsolutePath), "mix dosyası yeni köke kopyalanmalı");
});

test("relocated package: runFfmpegMixSplit must not reuse the stale script path from project.json", async (t) => {
  const PS = loadProjectStore();
  const { packageRoot, projectPath } = buildRelocatedPackage(t);

  const project = PS.loadProjectFromPath(projectPath);
  // mixFile YOK (app.js runFfmpegMixSplit'e null geçiyor) ve project.json'da stale ps1Path var.
  const result = await PS.runFfmpegMixSplit(project, null, function () {}).catch((e) => ({ error: e }));

  const used = result && result.script ? norm(result.script.ps1Path) : "";
  assert.ok(!used.toLowerCase().includes(norm(STALE_ROOT).toLowerCase()),
    "stale ps1 yolu kullanıldı: " + used);
  if (used) {
    assert.ok(used.toLowerCase().startsWith(norm(packageRoot).toLowerCase()),
      "script yeni kökün altında olmalı: " + used);
  }
});
