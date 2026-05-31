(function (global) {
  var SESSION_KEY = "odium.auth.v1";

  function byOrder(a, b) {
    return Number(a.order || 0) - Number(b.order || 0);
  }

  function decodeShard(shard, field) {
    var shift = Number(shard.shift || 0);
    var raw = shard[field] || [];
    var out = "";
    for (var i = 0; i < raw.length; i++) {
      out += String.fromCharCode(Number(raw[i]) - shift);
    }
    return out;
  }

  function expected(field) {
    var shards = (global.__odiumAuthShards || []).slice().sort(byOrder);
    var value = "";
    for (var i = 0; i < shards.length; i++) value += decodeShard(shards[i], field);
    return value;
  }

  function constantTimeEqual(a, b) {
    a = String(a || "");
    b = String(b || "");
    var max = Math.max(a.length, b.length);
    var diff = a.length ^ b.length;
    for (var i = 0; i < max; i++) {
      diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    }
    return diff === 0;
  }

  function setUnlocked(unlocked) {
    document.body.classList.toggle("auth-ok", !!unlocked);
    var gate = document.getElementById("loginGate");
    if (gate) gate.setAttribute("aria-hidden", unlocked ? "true" : "false");
    if (unlocked) {
      try { sessionStorage.setItem(SESSION_KEY, "ok"); } catch (e) {}
    }
  }

  function isUnlocked() {
    try { return sessionStorage.getItem(SESSION_KEY) === "ok"; } catch (e) { return false; }
  }

  function initAuthGate() {
    var form = document.getElementById("loginForm");
    var userInput = document.getElementById("loginUser");
    var passInput = document.getElementById("loginPass");
    var errorBox = document.getElementById("loginError");
    var button = document.getElementById("loginSubmit");
    var failed = 0;

    if (isUnlocked()) {
      setUnlocked(true);
      return;
    }

    setUnlocked(false);
    if (userInput && userInput.focus) userInput.focus();
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (button) button.disabled = true;

      var ok = constantTimeEqual(String(userInput.value || "").trim(), expected("u")) &&
               constantTimeEqual(String(passInput.value || ""), expected("p"));

      if (ok) {
        if (errorBox) errorBox.textContent = "";
        if (passInput) passInput.value = "";
        setUnlocked(true);
        return;
      }

      failed++;
      if (errorBox) errorBox.textContent = failed >= 3 ? "Giriş bilgileri hatalı. Tekrar kontrol et." : "Giriş bilgileri hatalı.";
      if (passInput) {
        passInput.value = "";
        passInput.focus();
      }
      setTimeout(function () { if (button) button.disabled = false; }, Math.min(1400, 350 + failed * 150));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAuthGate);
  else initAuthGate();
})(window);
