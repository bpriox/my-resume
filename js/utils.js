/* Shared helpers and environment flags.
   Loaded first; the other scripts read these from window.BPRIOX. */
window.BPRIOX = (function () {
  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

  return { $: $, $$: $$, reduce: reduce, fine: fine };
})();
