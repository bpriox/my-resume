/* GSAP + ScrollTrigger animations (skipped if GSAP failed to load) */
(function () {
  var B = window.BPRIOX,
    $ = B.$,
    $$ = B.$$,
    fine = B.fine;

  /* ---- GSAP ---- */
  if (!(window.gsap && window.ScrollTrigger)) return;
  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    // Hero intro: headline rises from a mask, then the copy and the scene settle in.
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero .li", { yPercent: 110, duration: 1.05, stagger: 0.14 })
      .from(".hero .eyebrow", { y: 12, opacity: 0.15, duration: 0.7 }, 0)
      .from(".hero .sub", { y: 22, opacity: 0.15, duration: 0.8 }, 0.5)
      .from(".hero .script", { y: 18, opacity: 0.15, duration: 0.8 }, 0.7)
      .from(
        ".hero .cta .btn",
        { y: 20, opacity: 0.15, duration: 0.7, stagger: 0.1 },
        0.85,
      )
      .from(
        ".scene .layer",
        { y: 34, opacity: 0.1, duration: 1.4, stagger: 0.14 },
        0.1,
      )
      .from(".cue", { opacity: 0, y: 10, duration: 0.8 }, 1.3);

    // Mouse depth: each scene layer follows the pointer by its own amount.
    if (fine) {
      var hero = $(".hero");
      var qs = $$(".scene .layer").map(function (l) {
        var d = +l.getAttribute("data-depth") || 8;
        return {
          x: gsap.quickTo(l, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(l, "y", { duration: 0.9, ease: "power3" }),
          d: d,
        };
      });
      hero.addEventListener("pointermove", function (e) {
        var nx = e.clientX / innerWidth - 0.5,
          ny = e.clientY / innerHeight - 0.5;
        qs.forEach(function (q) {
          q.x(-nx * q.d * 2);
          q.y(-ny * q.d * 1.4);
        });
      });
    }

    // Scroll parallax on the scene, the star canvas and the ambient glow.
    gsap.to(".scene .l-moon", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".scene .l-rock", {
      yPercent: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".sky", {
      yPercent: 14,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".ambient i:nth-child(1)", {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    gsap.to(".ambient i:nth-child(2)", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Section dividers draw outward.
    $$(".rule").forEach(function (r) {
      gsap.fromTo(
        r,
        { scaleX: 0.05, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.5,
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: { trigger: r, start: "top 92%", once: true },
        },
      );
    });

    // Generic block reveals.
    $$("[data-reveal]").forEach(function (el) {
      gsap.set(el, { y: 40, opacity: 0.2 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: function () {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
          });
        },
      });
    });

    // Headings: words slide up one by one.
    $$("[data-split]").forEach(function (h) {
      var ws = $$(".w", h);
      gsap.set(ws, { y: "0.7em", opacity: 0.1 });
      ScrollTrigger.create({
        trigger: h,
        start: "top 88%",
        once: true,
        onEnter: function () {
          gsap.to(ws, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
          });
        },
      });
    });

    // Cards: staggered entrance as a row enters.
    gsap.set(".card", { y: 54, opacity: 0.2 });
    ScrollTrigger.batch(".card", {
      start: "top 92%",
      once: true,
      onEnter: function (b) {
        gsap.to(b, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });

    // Philosophy: each word fills with light as it crosses the viewport.
    $$(".big").forEach(function (b) {
      gsap.fromTo(
        b,
        { "--p": "0%" },
        {
          "--p": "100%",
          ease: "none",
          scrollTrigger: {
            trigger: b,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.6,
          },
        },
      );
    });
    return function () {};
  });
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(function () {
      ScrollTrigger.refresh();
    });
})();
