(function (global) {
  var SESSION_KEY = "odium.auth.v1";
  var REMEMBER_KEY = "odium.auth.remember.v1";

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

  function accountList() {
    var accounts = (global.__odiumAuthAccounts || []).slice().sort(byOrder);
    if ((global.__odiumAuthShards || []).length) {
      accounts.push({
        order: 9999,
        shift: 0,
        u: expected("u").split("").map(function (ch) { return ch.charCodeAt(0); }),
        p: expected("p").split("").map(function (ch) { return ch.charCodeAt(0); })
      });
    }
    return accounts;
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

  function authSignature(account) {
    var value = decodeShard(account, "u") + "|" + decodeShard(account, "p");
    var hash = 2166136261;
    for (var i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return "v1:" + (hash >>> 0).toString(36);
  }

  function findMatchingAccount(user, pass) {
    var accounts = accountList();
    for (var i = 0; i < accounts.length; i++) {
      if (constantTimeEqual(user, decodeShard(accounts[i], "u")) &&
          constantTimeEqual(pass, decodeShard(accounts[i], "p"))) {
        return accounts[i];
      }
    }
    return null;
  }

  function setUnlocked(unlocked) {
    document.body.classList.toggle("auth-ok", !!unlocked);
    var gate = document.getElementById("loginGate");
    if (gate) gate.setAttribute("aria-hidden", unlocked ? "true" : "false");
    if (unlocked) {
      try { sessionStorage.setItem(SESSION_KEY, "ok"); } catch (e) {}
    }
  }

  function unlockMode() {
    try {
      var remembered = localStorage.getItem(REMEMBER_KEY);
      var accounts = accountList();
      for (var i = 0; i < accounts.length; i++) {
        if (remembered === authSignature(accounts[i])) return "remember";
      }
    } catch (eLocal) {
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "ok") return "session";
    } catch (eSession) {
    }
    return "";
  }

  function initAuthGate() {
    var form = document.getElementById("loginForm");
    var userInput = document.getElementById("loginUser");
    var passInput = document.getElementById("loginPass");
    var rememberInput = document.getElementById("loginRemember");
    var errorBox = document.getElementById("loginError");
    var button = document.getElementById("loginSubmit");
    var failed = 0;

    var mode = unlockMode();
    if (mode) {
      setUnlocked(true);
      return;
    }

    setUnlocked(false);
    if (userInput && userInput.focus) userInput.focus();
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (button) button.disabled = true;

      var account = findMatchingAccount(String(userInput.value || "").trim(), String(passInput.value || ""));

      if (account) {
        if (errorBox) errorBox.textContent = "";
        if (passInput) passInput.value = "";
        if (rememberInput && rememberInput.checked) {
          try { localStorage.setItem(REMEMBER_KEY, authSignature(account)); } catch (eRememberAccount) {}
        } else {
          try { localStorage.removeItem(REMEMBER_KEY); } catch (eForgetAccount) {}
        }
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
