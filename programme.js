(function () {
  var items = document.querySelectorAll(".programme__item");
  if (!items.length) return;

  var STEP_BASE_MS = 280;
  var STEP_START_MS = 320;
  var STEP_DURATION_MS = 900;

  function playUnfold(item) {
    var steps = item.querySelectorAll(".programme__step");
    var i;

    item.classList.remove("is-unfolding");

    for (i = 0; i < steps.length; i++) {
      steps[i].style.setProperty("--step-i", String(i));
    }

    void item.offsetWidth;
    item.classList.add("is-unfolding");

    window.setTimeout(function () {
      if (item.open) {
        item.classList.remove("is-unfolding");
      }
    }, STEP_START_MS + Math.max(steps.length - 1, 0) * STEP_BASE_MS + STEP_DURATION_MS);
  }

  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        items.forEach(function (other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
        playUnfold(item);
        return;
      }

      item.classList.remove("is-unfolding");
    });
  });
})();
