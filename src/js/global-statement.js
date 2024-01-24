document.addEventListener('DOMContentLoaded', function () {
  (function () {
    // const popup = document.querySelector('.preview-bar-container');
    // console.log(popup);
    // let createCookie = function (name, value, days, domain) {
    //   let expires;
    //   if (days) {
    //     let date = new Date();
    //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    //     expires = '; expires=' + date.toGMTString();
    //   } else {
    //     expires = '';
    //   }
    //   document.cookie =
    //     encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; domain=' + domain + '; path=/';
    // };
    // let getCookie = function (name) {
    //   if (!window.document.cookie) return;
    //   let matches = document.cookie.match(
    //     new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    //   );
    //   return matches ? decodeURIComponent(matches[1]) : undefined;
    // };
    // let deleteCookie = function (name) {
    //   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // };
    // setTimeout(function () {
    //   if (!getCookie('GanttProCookieAccept')) {
    //     let date = new Date();
    //     let timeZoneDiff = -date.getTimezoneOffset();
    //     document.querySelector('.global-statement').classList.remove('hidden');
    //     document.querySelector('.global-statement .js-cross-hide').addEventListener('click', (e) => {
    //       e.preventDefault();
    //       createCookie('GanttProCookieAccept', timeZoneDiff.toString(), 10000, window.document.domain);
    //       document.getElementByClassName('global-statement').classList.add('hidden');
    //     });
    //   }
    // }, 0);
  })();
});
