document.addEventListener('DOMContentLoaded', function () {
  window.__lc = window.__lc || {};
  window.__lc.license = 8254491;
  window.__lc.group = 2;

  (function () {
    var lc = document.createElement('script');
    lc.async = true;
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(lc, s);
  })();

  var LC_API = LC_API || {};

  window.LC_API = LC_API;
  LC_API.on_after_load = function () {
    LC_API.disable_sounds();
  };

  document.querySelectorAll('#openLiveChat').forEach(function (item) {
    if (item) {
      item.addEventListener('click', function () {
        LC_API.open_chat_window();
      });
    }
  });
});
