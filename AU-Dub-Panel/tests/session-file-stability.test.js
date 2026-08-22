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

test("resolveSessionFilePath combines an Audition session directory with displayName", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-session-path-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const store = loadProjectStore();
  const expected = path.join(fixtureRoot, "Game_Dub.sesx");

  assert.equal(
    normalize(store.resolveSessionFilePath(fixtureRoot, "Game_Dub.sesx")),
    normalize(expected)
  );
  assert.equal(
    normalize(store.resolveSessionFilePath(expected, "Game_Dub.sesx")),
    normalize(expected)
  );
});

test("waitForFileStable rejects a directory path without waiting for timeout", async (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-session-dir-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const startedAt = Date.now();
  await assert.rejects(
    loadProjectStore().waitForFileStable(fixtureRoot, {
      intervalMs: 100,
      stableMs: 100,
      timeoutMs: 700
    }),
    /Session yolu bir dosya değil/
  );

  assert.ok(Date.now() - startedAt < 350, "directory path should fail immediately");
});

test("waitForFileStable resolves after a non-empty file remains unchanged", async (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audub-session-file-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const sessionPath = path.join(fixtureRoot, "project.sesx");
  fs.writeFileSync(sessionPath, "session-data", "utf8");

  const result = await loadProjectStore().waitForFileStable(sessionPath, {
    intervalMs: 100,
    stableMs: 200,
    timeoutMs: 1000
  });

  assert.equal(result.sizeBytes, 12);
  assert.ok(result.stableMs >= 200);
});

test("waitForFileStable times out without blocking when a stat callback never returns", async () => {
  const store = loadProjectStore();
  let statCalls = 0;
  let timerTicks = 0;
  const heartbeat = setInterval(() => { timerTicks++; }, 10);
  const startedAt = Date.now();

  try {
    await assert.rejects(
      store.waitForFileStable("C:/virtual/stuck-session.sesx", {
        intervalMs: 100,
        stableMs: 100,
        timeoutMs: 250,
        statTimeoutMs: 60,
        statFile(_target, _callback) {
          statCalls++;
        }
      }),
      /zaman aşımı|hazır olmadı/i
    );
  } finally {
    clearInterval(heartbeat);
  }

  assert.ok(statCalls > 0, "the asynchronous stat seam should be used");
  assert.ok(timerTicks >= 3, "the event loop should remain responsive");
  assert.ok(Date.now() - startedAt < 700, "the watchdog should settle the wait");
});
