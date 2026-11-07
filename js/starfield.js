/* Hero starfield and floating particles (canvas) */
(function () {
  var B = window.BPRIOX,
    $ = B.$,
    reduce = B.reduce;

  /* ---- Starfield + particles ---- */
  (function () {
    var c = $(".sky"),
      host = $(".hero"),
      ctx = c.getContext("2d"),
      w = 0,
      h = 0,
      dpr = 1,
      stars = [],
      parts = [],
      raf = 0,
      visible = true;
    var cols = ["#EC4899", "#38BDF8", "#8B5CF6", "#F5F3FF"];
    function init() {
      var n = Math.round((w * h) / 9000);
      stars = [];
      for (var i = 0; i < n; i++)
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.2,
          a: Math.random() * 6.28,
          s: Math.random() * 0.02 + 0.005,
        });
      parts = [];
      var pn = w < 700 ? 16 : 34;
      for (i = 0; i < pn; i++)
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.6 + 1,
          v: Math.random() * 0.3 + 0.08,
          d: Math.random() * 6.28,
          c: cols[i % 4],
        });
    }
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      draw(0);
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.a += s.s;
        ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(s.a));
        ctx.fillStyle = "#F5F3FF";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.283);
        ctx.fill();
      }
      for (i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (!reduce) {
          p.y -= p.v;
          p.x += Math.sin(t / 1800 + p.d) * 0.25;
          if (p.y < -8) {
            p.y = h + 8;
            p.x = Math.random() * w;
          }
        }
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, p.c);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function loop(t) {
      draw(t);
      raf = visible ? requestAnimationFrame(loop) : 0;
    }
    size();
    var rt;
    addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(size, 150);
    });
    if (!reduce) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }).observe(host);
      raf = requestAnimationFrame(loop);
    }
  })();
})();
