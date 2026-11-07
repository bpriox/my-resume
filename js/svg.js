/* SVG helpers: icon set + decorative screen "code" lines */
(function () {
  var B = window.BPRIOX,
    $$ = B.$$;

  /* ---- Icons (one source, reused everywhere) ---- */
  var P = {
    home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
    user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6",
    orbit:
      "M12 14a2 2 0 100-4 2 2 0 000 4zM3 12c0-3 4-6 9-6s9 3 9 6-4 6-9 6-9-3-9-6z",
    grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
    mail: "M3 6h18v12H3zM3 7l9 7 9-7",
    code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
    palette:
      "M12 3a9 9 0 100 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 004-4c0-5-4-10-9-10zM8 11h.01M12 8h.01M16 11h.01",
    cube: "M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7",
    chip: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4",
    sparkles:
      "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
    globe:
      "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
    github:
      "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3.1-.3 6.4-1.5 6.4-7a5.4 5.4 0 00-1.5-3.8 5 5 0 00-.1-3.8s-1.2-.3-3.9 1.5a13.4 13.4 0 00-7 0C6.3 2.8 5.1 3.1 5.1 3.1a5 5 0 00-.1 3.8A5.4 5.4 0 003.5 10.7c0 5.5 3.3 6.7 6.4 7a3.4 3.4 0 00-1 2.6V22",
    youtube:
      "M22 8.5a3 3 0 00-2-2C18 6 12 6 12 6s-6 0-8 .5a3 3 0 00-2 2C1.5 10 1.5 12 1.5 12s0 2 .5 3.5a3 3 0 002 2C6 18 12 18 12 18s6 0 8-.5a3 3 0 002-2c.5-1.5.5-3.5.5-3.5s0-2-.5-3.5zM10 15V9l5 3z",
    telegram: "M21 4L3 11l6 2 2 6 3-4 5 4zM9 13l12-9",
    arrow: "M5 12h14M13 6l6 6-6 6",
    arrowL: "M19 12H5M11 6l-6 6 6 6",
    copy: "M9 9h11v11H9zM5 15V4h11",
    gift: "M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-3 0-5-1-4-3s4 0 4 3zM12 7c3 0 5-1 4-3s-4 0-4 3z",
    rocket:
      "M5 19c0-2 1-3 2-3l1 1c0 1-1 2-3 2zM9 15l-2-2c1-5 5-9 12-9 0 7-4 11-9 12zM14 9.5h.01",
    heart:
      "M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z",
  };
  $$("i[data-i]").forEach(function (el) {
    var d = P[el.getAttribute("data-i")];
    if (!d) return;
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("class", "ico " + (el.getAttribute("class") || ""));
    if (el.getAttribute("style"))
      s.setAttribute("style", el.getAttribute("style"));
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    s.appendChild(p);
    el.replaceWith(s);
  });

  /* ---- Screen "code" lines ---- */
  $$("[data-lines]").forEach(function (g) {
    var a = g.getAttribute("data-lines").split(",").map(Number),
      x = a[0],
      y = a[1],
      w = a[2],
      h = a[3],
      rows = Math.floor((h - 8) / 7),
      out = "";
    var cols = [
      "var(--blue)",
      "var(--pink)",
      "var(--purple)",
      "var(--white)",
    ];
    for (var i = 0; i < rows; i++) {
      var ind = i % 4 === 1 || i % 4 === 2 ? 8 : 0,
        lw = Math.max(10, (w - ind - 14) * (0.3 + ((i * 37) % 60) / 100));
      out +=
        '<rect x="' +
        (x + 7 + ind) +
        '" y="' +
        (y + 7 + i * 7) +
        '" width="' +
        lw.toFixed(1) +
        '" height="2.6" rx="1.3" style="fill:' +
        cols[(i * 7) % 4] +
        '" opacity=".75"/>';
    }
    g.innerHTML = out;
  });

  /* Shared with other scripts (the gift dialog reuses the heart icon). */
  B.icons = P;
})();
