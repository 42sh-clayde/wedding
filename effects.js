(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CELEBRATION_KEY = "wedding-celebration-v1";
  const COLORS = ["#b8956a", "#d4b896", "#4a7264", "#6a9485", "#8fb5a6", "#e8d4b0"];

  if (reducedMotion) {
    document.body.classList.add("is-ready", "reduce-motion");
    document.querySelectorAll(".reveal-on-scroll, .programme__entry").forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    document.querySelectorAll("[data-enter]").forEach(function (el, i) {
      el.style.setProperty("--enter-delay", i * 90 + "ms");
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("is-ready");
      });
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
      );
      document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  document.querySelectorAll(".programme__entry").forEach(function (el, i) {
    el.style.setProperty("--reveal-i", String(i));
  });

  function launchCelebration() {
    if (reducedMotion) return;
    if (sessionStorage.getItem(CELEBRATION_KEY) === "1") return;

    var canvas = document.getElementById("celebration");
    if (!canvas) return;

    sessionStorage.setItem(CELEBRATION_KEY, "1");

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var particles = [];
    var count = Math.min(90, Math.floor(w / 6));

    for (var i = 0; i < count; i++) {
      particles.push({
        x: w * 0.5 + (Math.random() - 0.5) * w * 0.35,
        y: h * 0.28 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * -7 - 3,
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 9,
        size: Math.random() * 7 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        decay: Math.random() * 0.012 + 0.008,
        shape: Math.random() > 0.45 ? "rect" : "circle",
      });
    }

    var start = performance.now();
    var duration = 3200;

    function frame(now) {
      ctx.clearRect(0, 0, w, h);
      var alive = false;

      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        if (p.life <= 0) continue;
        alive = true;

        p.vy += 0.14;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.25, p.size, p.size * 0.5);
        }

        ctx.restore();
      }

      if (alive && now - start < duration) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    }

    requestAnimationFrame(frame);
  }

  window.WeddingEffects = {
    launchCelebration: launchCelebration,
  };
})();
