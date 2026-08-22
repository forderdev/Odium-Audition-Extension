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

function normalize(value) {
  return String(value || "").replace(/\\/g, "/");
}

test("loadProjectFromPath rebases a relocated package to the selected project.json", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-relocated-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const packageRoot = path.join(fixtureRoot, "Received_AU_Dub_Package");
  const metadataDir = path.join(packageRoot, ".audub");
  const projectPath = path.join(metadataDir, "project.json");
  const staleRoot = "C:\\Users\\sender\\Documents\\Original_AU_Dub_Package";

  fs.mkdirSync(metadataDir, { recursive: true });
  fs.writeFileSync(projectPath, JSON.stringify({
    lines: [],
    projectRootPath: staleRoot,
    packageRootPath: staleRoot
  }), "utf8");

  const loaded = loadProjectStore().loadProjectFromPath(projectPath);

  assert.equal(normalize(loaded.projectRootPath), normalize(packageRoot));
  assert.equal(normalize(loaded.packageRootPath), normalize(packageRoot));
  assert.equal(normalize(loaded.loadedFromPath), normalize(projectPath));
  assert.equal(loaded.recordingHeadTrimEnabled, true);
  assert.equal(loaded.recordingHeadTrimMode, "auto");
  assert.equal(loaded.recordingHeadTrimMs, 250);
});
