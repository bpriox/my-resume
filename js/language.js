/* Language switch (EN / FA) and word splitting */
(function () {
  var B = window.BPRIOX,
    $ = B.$,
    $$ = B.$$;

  /* ---- Words ---- */
  function splitWords(el) {
    var t = el.textContent.trim().split(/\s+/);
    el.innerHTML = t
      .map(function (w) {
        return '<span class="w">' + w + "</span>";
      })
      .join(" ");
  }

  /* ---- Language ---- */
  $$("[data-fa]").forEach(function (el) {
    el.setAttribute("data-en", el.textContent);
  });
  function setLang(l) {
    var fa = l === "fa";
    document.documentElement.lang = l;
    document.documentElement.dir = fa ? "rtl" : "ltr";
    $$("[data-fa]").forEach(function (el) {
      el.textContent = fa
        ? el.getAttribute("data-fa")
        : el.getAttribute("data-en");
      if (el.hasAttribute("data-text"))
        el.setAttribute("data-text", el.textContent);
      if (el.hasAttribute("data-split")) splitWords(el);
    });
    var b = $("#lang");
    b.textContent = fa ? "EN" : "FA";
    b.setAttribute(
      "aria-label",
      fa ? "Switch language to English" : "Switch language to Persian",
    );
    try {
      localStorage.setItem("bpriox-lang", l);
    } catch (e) {}
    if (window.ScrollTrigger)
      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 60);
  }
  $$("[data-split]").forEach(splitWords);
  $("#lang").addEventListener("click", function () {
    setLang(document.documentElement.lang === "fa" ? "en" : "fa");
  });
  try {
    if (localStorage.getItem("bpriox-lang") === "fa") setLang("fa");
  } catch (e) {}
})();
