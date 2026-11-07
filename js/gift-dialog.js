/* Gift dialog and flying hearts */
(function () {
  var B = window.BPRIOX,
    $ = B.$,
    reduce = B.reduce,
    P = B.icons;

  /* ---- Gift dialog ---- */
  var dlg = $("#gift");
  function hearts() {
    if (reduce) return;
    var r = dlg.getBoundingClientRect();
    for (var i = 0; i < 14; i++) {
      var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("viewBox", "0 0 24 24");
      s.setAttribute("class", "fly");
      s.innerHTML =
        '<path d="' + P.heart + '" fill="currentColor" stroke="none"/>';
      s.style.left = r.left + r.width / 2 + "px";
      s.style.top = r.top + r.height * 0.6 + "px";
      document.body.appendChild(s);
      if (window.gsap)
        gsap.to(s, {
          x: (Math.random() - 0.5) * r.width * 1.4,
          y: -120 - Math.random() * 220,
          rotation: (Math.random() - 0.5) * 80,
          opacity: 0,
          scale: 0.6 + Math.random() * 1.2,
          duration: 1.6 + Math.random(),
          ease: "power2.out",
          onComplete: (function (n) {
            return function () {
              n.remove();
            };
          })(s),
        });
      else s.remove();
    }
  }
  $("#giftBtn").addEventListener("click", function () {
    if (dlg.showModal) {
      dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
    if (window.gsap && !reduce)
      gsap.from(".gift", {
        y: 24,
        opacity: 0,
        scale: 0.96,
        duration: 0.6,
        ease: "power3.out",
      });
    setTimeout(hearts, 250);
  });
  $("#giftClose").addEventListener("click", function () {
    dlg.close ? dlg.close() : dlg.removeAttribute("open");
  });
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) dlg.close();
  });
})();
