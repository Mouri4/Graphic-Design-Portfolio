/* ============================================================
   VISITOR ANALYTICS  (GoatCounter: no cookies, no personal data)
   Shows in your GoatCounter dashboard: visitors, most-viewed pages
   (including each project page), device / browser / screen size,
   and the events "cv-download", "cv-view" and "project-card-click".
   Off until you set window.ANALYTICS.goatcounter in projects-data.js.
   Skipped on localhost and when the visitor sends Do Not Track.
   ============================================================ */
(function () {
  var code = (window.ANALYTICS && window.ANALYTICS.goatcounter) || '';
  if (!/^[a-z0-9-]+$/i.test(code)) return;
  if (navigator.doNotTrack === '1' || /^(localhost|127\.|\[::1\])/.test(location.hostname)) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + code + '.goatcounter.com/count');
  document.head.appendChild(s);

  function event(name) {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: name, title: name, event: true });
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/\.pdf(\?|$)/i.test(href)) event(a.hasAttribute('download') ? 'cv-download' : 'cv-view');
    else if (a.closest('.proj-card')) event('project-card-click');
  });
})();