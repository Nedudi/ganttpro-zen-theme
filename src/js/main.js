document.addEventListener('DOMContentLoaded', function () {
  // hide menu to footer
  (function () {
    const footerNavList = document.querySelector('.site-footer__nav-list');

    if (!footerNavList) return;

    const VISBLE_ITEMS = 9;
    const submenus = document.querySelectorAll('.site-footer__nav-list > li');

    function createButton() {
      const btn = document.createElement('button');

      btn.textContent = 'and more';
      btn.classList = 'site-footer__nav-more';

      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        showItemsOfMenu(evt.currentTarget.parentElement);
        evt.currentTarget.remove();
      });

      return btn;
    }

    function showItemsOfMenu(submenu) {
      const items = submenu.querySelectorAll('li');

      for (let i = 0; i < items.length; i++) {
        items[i].style.display = 'list-item';
      }
    }

    function hideItemsOfMenu(submenu) {
      const items = submenu.querySelectorAll('li');

      for (let i = 0; i < items.length; i++) {
        if (i >= VISBLE_ITEMS) {
          items[i].style.display = 'none';
        }
      }

      if (items.length > VISBLE_ITEMS) {
        submenu.append(createButton());
      }
    }

    submenus.forEach((submenu) => {
      hideItemsOfMenu(submenu);
    });
  })();
});
