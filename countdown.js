(function () {
  const WEDDING_ISO = "2026-07-17T10:00:00";
  const weddingDate = new Date(WEDDING_ISO);

  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds"),
    message: document.getElementById("countdown-message"),
    caption: document.getElementById("countdown-caption"),
    intro: document.querySelector(".countdown__intro"),
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rollEls = [els.days, els.hours, els.minutes, els.seconds].filter(Boolean);
  let timerId = null;
  let celebrated = false;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatCaption(d) {
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function introForDiff(diffMs) {
    if (diffMs <= 0) return "C’est le grand jour !";
    var days = Math.ceil(diffMs / 86400000);
    if (days <= 1) return "Demain, on dit oui.";
    if (days <= 7) return "Plus que quelques jours…";
    if (days <= 30) return "Le compte est bon.";
    if (days <= 90) return "La date approche doucement.";
    return "Encore un peu de patience…";
  }

  function initRoll(el) {
    if (!el || el.dataset.rollReady === "1") return;
    var val = el.textContent.trim();
    el.dataset.rollReady = "1";
    el.dataset.value = val;
    el.classList.add("countdown__value--roll");
    el.innerHTML =
      '<span class="countdown__roll-track">' +
      '<span class="countdown__roll-digit">' +
      val +
      "</span></span>";
  }

  function finishRoll(track, el, next) {
    track.style.transition = "none";
    track.innerHTML = '<span class="countdown__roll-digit">' + next + "</span>";
    track.style.transform = "translateY(0)";
    void track.offsetWidth;
    track.style.transition = "";
    delete el.dataset.rolling;
    el.dataset.value = next;
  }

  function setRoll(el, next) {
    if (!el) return;
    initRoll(el);

    var current = el.dataset.value || "";
    if (current === next) return;

    var track = el.querySelector(".countdown__roll-track");

    if (reducedMotion) {
      finishRoll(track, el, next);
      return;
    }

    if (el._rollTimer) {
      clearTimeout(el._rollTimer);
      el._rollTimer = null;
    }

    if (el.dataset.rolling === "1") {
      finishRoll(track, el, next);
    }

    el.dataset.rolling = "1";
    track.innerHTML =
      '<span class="countdown__roll-digit">' +
      current +
      "</span>" +
      '<span class="countdown__roll-digit">' +
      next +
      "</span>";

    var step = track.firstElementChild ? track.firstElementChild.offsetHeight : 0;
    if (!step) {
      finishRoll(track, el, next);
      return;
    }

    track.style.transition = "none";
    track.style.transform = "translateY(0)";
    void track.offsetWidth;

    track.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateY(-" + step + "px)";

    el._rollTimer = window.setTimeout(function () {
      finishRoll(track, el, next);
      el._rollTimer = null;
    }, 310);
  }

  function updateIntro(diff) {
    if (!els.intro) return;
    els.intro.textContent = introForDiff(diff);
  }

  function onWeddingDay() {
    setRoll(els.days, "00");
    setRoll(els.hours, "00");
    setRoll(els.minutes, "00");
    setRoll(els.seconds, "00");

    if (els.message) {
      els.message.hidden = false;
      els.message.textContent = "C’est aujourd’hui — on est prêts à vous accueillir.";
    }

    updateIntro(0);

    if (!celebrated) {
      celebrated = true;
      if (window.WeddingEffects && window.WeddingEffects.launchCelebration) {
        window.WeddingEffects.launchCelebration();
      }
    }

    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  if (Number.isNaN(weddingDate.getTime())) {
    if (els.caption) els.caption.textContent = "Date à définir";
    if (els.message) {
      els.message.hidden = false;
      els.message.textContent = "Date invalide dans countdown.js.";
    }
    return;
  }

  if (els.caption) {
    els.caption.textContent = formatCaption(weddingDate);
  }

  rollEls.forEach(initRoll);

  var skipRoll = true;

  function tick() {
    var diff = weddingDate.getTime() - Date.now();

    updateIntro(diff);

    if (diff <= 0) {
      onWeddingDay();
      return;
    }

    var s = Math.floor(diff / 1000);
    var days = Math.floor(s / 86400);
    var hours = Math.floor((s % 86400) / 3600);
    var minutes = Math.floor((s % 3600) / 60);
    var seconds = s % 60;

    var values = {
      days: pad(Math.min(days, 999)),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };

    if (skipRoll) {
      skipRoll = false;
      rollEls.forEach(function (el) {
        var key = el.id.replace("cd-", "");
        finishRoll(el.querySelector(".countdown__roll-track"), el, values[key]);
      });
      return;
    }

    setRoll(els.days, values.days);
    setRoll(els.hours, values.hours);
    setRoll(els.minutes, values.minutes);
    setRoll(els.seconds, values.seconds);
  }

  tick();
  timerId = setInterval(tick, reducedMotion ? 60000 : 1000);
})();
