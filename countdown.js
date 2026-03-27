(function () {
  /** Heure de référence : début de la journée (mairie). Modifiable selon votre préférence. */
  const WEDDING_ISO = "2026-07-17T10:00:00";

  const weddingDate = new Date(WEDDING_ISO);

  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds"),
    message: document.getElementById("countdown-message"),
    caption: document.getElementById("countdown-caption"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatCaption(d) {
    return d.toLocaleString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (Number.isNaN(weddingDate.getTime())) {
    if (els.caption) {
      els.caption.textContent = "Date à définir dans countdown.js";
    }
    els.message.hidden = false;
    els.message.textContent = "Indiquez une date valide (WEDDING_ISO).";
    return;
  }

  if (els.caption) {
    const first = formatCaption(weddingDate);
    els.caption.textContent = first.charAt(0).toUpperCase() + first.slice(1);
  }

  function tick() {
    const diff = weddingDate.getTime() - Date.now();

    if (diff <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.minutes.textContent = "00";
      els.seconds.textContent = "00";
      els.message.hidden = false;
      els.message.textContent = "Ce jour est arrivé — merci d’être là.";
      return;
    }

    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    els.days.textContent = pad(Math.min(days, 9999));
    els.hours.textContent = pad(hours);
    els.minutes.textContent = pad(minutes);
    els.seconds.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();
