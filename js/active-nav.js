/* Highlight the nav / dock link of the section in view */
(function () {
  var B = window.BPRIOX,
    $$ = B.$$;

  /* ---- Active nav ---- */
  var ids = [
    "home",
    "about",
    "universe",
    "projects",
    "philosophy",
    "contact",
  ];
  function setActive(id) {
    $$("[data-nav]").forEach(function (a) {
      a.getAttribute("data-nav") === id
        ? a.setAttribute("aria-current", "true")
        : a.removeAttribute("aria-current");
    });
  }
  setActive("home");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
})();
