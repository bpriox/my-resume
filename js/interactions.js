/* Small UI interactions: tilt cards, orb toggle, carousel, copy buttons */
(function () {
  var B = window.BPRIOX,
    $ = B.$,
    $$ = B.$$,
    fine = B.fine,
    reduce = B.reduce;

  /* ---- Tilt cards (pointer, desktop only) ---- */
  if (fine && !reduce) {
    $$(".tilt,.proj").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width,
          y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", x * 100 + "%");
        el.style.setProperty("--my", y * 100 + "%");
        el.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
        el.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(2) + "deg");
      });
      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
    var desk = $("#desk"),
      dw = $(".desk-wrap");
    dw.addEventListener("pointermove", function (e) {
      var r = dw.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      desk.style.setProperty("--rx", (0.5 - y) * 6 + "deg");
      desk.style.setProperty("--ry", (x - 0.5) * 8 + "deg");
    });
    dw.addEventListener("pointerleave", function () {
      desk.style.setProperty("--rx", "0deg");
      desk.style.setProperty("--ry", "0deg");
    });
  }

  /* ---- Orb toggle ---- */
  var orb = $("#orb"),
    deskEl = $("#desk");
  function flip() {
    deskEl.classList.toggle("warm");
  }
  orb.addEventListener("click", flip);
  orb.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  });

  /* ---- Carousel ---- */
  var rail = $("#rail");
  function step(dir) {
    rail.scrollBy({
      left: dir * Math.min(rail.clientWidth * 0.8, 420),
      behavior: reduce ? "auto" : "smooth",
    });
  }
  $("#prev").addEventListener("click", function () {
    step(-1);
  });
  $("#next").addEventListener("click", function () {
    step(1);
  });

  /* ---- Copy ---- */
  var toast = $("#toast"),
    tt;
  $$(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-copy"),
        dd = b.parentNode.querySelector("dd");
      function ok() {
        toast.textContent =
          document.documentElement.lang === "fa"
            ? "کپی شد."
            : "Copied to clipboard.";
        clearTimeout(tt);
        tt = setTimeout(function () {
          toast.textContent = "";
        }, 2200);
      }
      function fallback() {
        var r = document.createRange();
        r.selectNodeContents(dd);
        var s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        toast.textContent =
          document.documentElement.lang === "fa"
            ? "متن انتخاب شد؛ کپی کنید."
            : "Text selected. Copy it manually.";
      }
      try {
        navigator.clipboard.writeText(v).then(ok, fallback);
      } catch (e) {
        fallback();
      }
    });
  });
})();
