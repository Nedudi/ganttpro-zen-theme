"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
document.addEventListener('DOMContentLoaded', function () {
  // Key map
  var ENTER = 13;
  var ESCAPE = 27;
  var SPACE = 32;
  var UP = 38;
  var DOWN = 40;
  var TAB = 9;
  function closest(element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (Element.prototype.matches && element.matches(selector) || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector) || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
        return element;
      }
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }

  // social share popups
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  // In some cases we should preserve focus after page reload
  function saveFocus() {
    var activeElementId = document.activeElement.getAttribute('id');
    sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
  }
  var returnFocusTo = sessionStorage.getItem('returnFocusTo');
  if (returnFocusTo) {
    sessionStorage.removeItem('returnFocusTo');
    var returnFocusToEl = document.querySelector(returnFocusTo);
    returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
  }

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var commentContainerTextarea = document.querySelector('.comment-container textarea'),
    commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');
  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });
    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
    requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
    requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');
  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function () {
      showRequestCommentContainerTrigger.style.display = 'none';
      Array.prototype.forEach.call(requestCommentFields, function (e) {
        e.style.display = 'block';
      });
      requestCommentSubmit.style.display = 'inline-block';
      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
    requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
    requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');
  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      // Element.closest is not supported in IE11
      closest(this, 'form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');
  var usesWysiwyg = requestCommentTextarea && requestCommentTextarea.dataset.helper === 'wysiwyg';
  function isEmptyPlaintext(s) {
    return s.trim() === '';
  }
  function isEmptyHtml(xml) {
    var doc = new DOMParser().parseFromString("<_>".concat(xml, "</_>"), 'text/xml');
    var img = doc.querySelector('img');
    return img === null && isEmptyPlaintext(doc.children[0].textContent);
  }
  var isEmpty = usesWysiwyg ? isEmptyHtml : isEmptyPlaintext;
  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function () {
      if (isEmpty(requestCommentTextarea.value)) {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && isEmpty(requestCommentTextarea.value)) {
    requestCommentSubmitButton.disabled = true;
  }

  // Submit requests filter form on status or organization change in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function (el) {
    el.addEventListener('change', function (e) {
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    });
  });

  // Submit requests filter form on search in the request list page
  var quickSearch = document.querySelector('#quick-search');
  quickSearch && quickSearch.addEventListener('keyup', function (e) {
    if (e.keyCode === ENTER) {
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    }
  });
  function toggleNavigation(toggle, menu) {
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggle.setAttribute('aria-expanded', !isExpanded);
  }
  function closeNavigation(toggle, menu) {
    menu.setAttribute('aria-expanded', false);
    toggle.setAttribute('aria-expanded', false);
    toggle.focus();
  }

  // var burgerMenu = document.querySelector('.header .menu-button');
  // var userMenu = document.querySelector('#user-nav');

  // burgerMenu.addEventListener('click', function (e) {
  //   e.stopPropagation();
  //   toggleNavigation(this, userMenu);
  // });

  // userMenu.addEventListener('keyup', function (e) {
  //   if (e.keyCode === ESCAPE) {
  //     e.stopPropagation();
  //     closeNavigation(burgerMenu, this);
  //   }
  // });

  // if (userMenu.children.length === 0) {
  //   burgerMenu.style.display = 'none';
  // }

  // Toggles expanded aria to collapsible elements
  var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');
  Array.prototype.forEach.call(collapsible, function (el) {
    var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');
    el.addEventListener('click', function (e) {
      toggleNavigation(toggle, this);
    });
    el.addEventListener('keyup', function (e) {
      if (e.keyCode === ESCAPE) {
        closeNavigation(toggle, this);
      }
    });
  });

  // Submit organization form in the request page
  var requestOrganisationSelect = document.querySelector('#request-organization select');
  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function () {
      closest(this, 'form').submit();
    });
  }

  // If multibrand search has more than 5 help centers or categories collapse the list
  var multibrandFilterLists = document.querySelectorAll('.multibrand-filter-list');
  Array.prototype.forEach.call(multibrandFilterLists, function (filter) {
    if (filter.children.length > 6) {
      // Display the show more button
      var trigger = filter.querySelector('.see-all-filters');
      trigger.setAttribute('aria-hidden', false);

      // Add event handler for click
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove('multibrand-filter-list--collapsed');
      });
    }
  });

  // If there are any error notifications below an input field, focus that field
  var notificationElm = document.querySelector('.notification-error');
  if (notificationElm && notificationElm.previousElementSibling && typeof notificationElm.previousElementSibling.focus === 'function') {
    notificationElm.previousElementSibling.focus();
  }

  // Dropdowns

  function Dropdown(toggle, menu) {
    this.toggle = toggle;
    this.menu = menu;
    this.menuPlacement = {
      top: menu.classList.contains('dropdown-menu-top'),
      end: menu.classList.contains('dropdown-menu-end')
    };
    this.toggle.addEventListener('click', this.clickHandler.bind(this));
    this.toggle.addEventListener('keydown', this.toggleKeyHandler.bind(this));
    this.menu.addEventListener('keydown', this.menuKeyHandler.bind(this));
  }
  Dropdown.prototype = {
    get isExpanded() {
      return this.menu.getAttribute('aria-expanded') === 'true';
    },
    get menuItems() {
      return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"));
    },
    dismiss: function dismiss() {
      if (!this.isExpanded) return;
      this.menu.setAttribute('aria-expanded', false);
      this.menu.classList.remove('dropdown-menu-end', 'dropdown-menu-top');
    },
    open: function open() {
      if (this.isExpanded) return;
      this.menu.setAttribute('aria-expanded', true);
      this.handleOverflow();
    },
    handleOverflow: function handleOverflow() {
      var rect = this.menu.getBoundingClientRect();
      var overflow = {
        right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
        bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight
      };
      if (overflow.right || this.menuPlacement.end) {
        this.menu.classList.add('dropdown-menu-end');
      }
      if (overflow.bottom || this.menuPlacement.top) {
        this.menu.classList.add('dropdown-menu-top');
      }
      if (this.menu.getBoundingClientRect().top < 0) {
        this.menu.classList.remove('dropdown-menu-top');
      }
    },
    focusNextMenuItem: function focusNextMenuItem(currentItem) {
      if (!this.menuItems.length) return;
      var currentIndex = this.menuItems.indexOf(currentItem);
      var nextIndex = currentIndex === this.menuItems.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;
      this.menuItems[nextIndex].focus();
    },
    focusPreviousMenuItem: function focusPreviousMenuItem(currentItem) {
      if (!this.menuItems.length) return;
      var currentIndex = this.menuItems.indexOf(currentItem);
      var previousIndex = currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;
      this.menuItems[previousIndex].focus();
    },
    clickHandler: function clickHandler() {
      if (this.isExpanded) {
        this.dismiss();
      } else {
        this.open();
      }
    },
    toggleKeyHandler: function toggleKeyHandler(e) {
      switch (e.keyCode) {
        case ENTER:
        case SPACE:
        case DOWN:
          e.preventDefault();
          this.open();
          this.focusNextMenuItem();
          break;
        case UP:
          e.preventDefault();
          this.open();
          this.focusPreviousMenuItem();
          break;
        case ESCAPE:
          this.dismiss();
          this.toggle.focus();
          break;
      }
    },
    menuKeyHandler: function menuKeyHandler(e) {
      var firstItem = this.menuItems[0];
      var lastItem = this.menuItems[this.menuItems.length - 1];
      var currentElement = e.target;
      switch (e.keyCode) {
        case ESCAPE:
          this.dismiss();
          this.toggle.focus();
          break;
        case DOWN:
          e.preventDefault();
          this.focusNextMenuItem(currentElement);
          break;
        case UP:
          e.preventDefault();
          this.focusPreviousMenuItem(currentElement);
          break;
        case TAB:
          if (e.shiftKey) {
            if (currentElement === firstItem) {
              this.dismiss();
            } else {
              e.preventDefault();
              this.focusPreviousMenuItem(currentElement);
            }
          } else if (currentElement === lastItem) {
            this.dismiss();
          } else {
            e.preventDefault();
            this.focusNextMenuItem(currentElement);
          }
          break;
        case ENTER:
        case SPACE:
          e.preventDefault();
          currentElement.click();
          break;
      }
    }
  };
  var dropdowns = [];
  var dropdownToggles = Array.prototype.slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdownToggles.forEach(function (toggle) {
    var menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains('dropdown-menu')) {
      dropdowns.push(new Dropdown(toggle, menu));
    }
  });
  document.addEventListener('click', function (evt) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.toggle.contains(evt.target)) {
        dropdown.dismiss();
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var copyrightYearNode = document.getElementById('copyright-year');
  if (copyrightYearNode) {
    copyrightYearNode.textContent = new Date().getFullYear();
  }

  // hide menu to footer
  (function () {
    var footerNavList = document.querySelector('.site-footer__nav-list');
    if (!footerNavList) return;
    var VISBLE_ITEMS = 9;
    var submenus = document.querySelectorAll('.site-footer__nav-list > li');
    var pageLang = document.documentElement.getAttribute('lang');
    function createButton() {
      var btn = document.createElement('button');
      var label;
      switch (pageLang) {
        case 'ru':
          label = 'и другое!';
          break;
        case 'es':
          label = '¡y más!';
          break;
        default:
          label = 'and more';
      }
      btn.textContent = label;
      btn.classList = 'site-footer__nav-more';
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        showItemsOfMenu(evt.currentTarget.parentElement);
        evt.currentTarget.remove();
      });
      return btn;
    }
    function showItemsOfMenu(submenu) {
      var items = submenu.querySelectorAll('li');
      for (var i = 0; i < items.length; i++) {
        items[i].style.display = 'list-item';
      }
    }
    function hideItemsOfMenu(submenu) {
      var items = submenu.querySelectorAll('li');
      for (var i = 0; i < items.length; i++) {
        if (i >= VISBLE_ITEMS) {
          items[i].style.display = 'none';
        }
      }
      if (items.length > VISBLE_ITEMS) {
        submenu.append(createButton());
      }
    }
    submenus.forEach(function (submenu) {
      hideItemsOfMenu(submenu);
    });
  })();
});
document.addEventListener('DOMContentLoaded', function () {
  var navigation = document.getElementById('navigation');
  if (!navigation) return;
  var navList = navigation.querySelector('.navigation__list');
  var burger = navigation.querySelector('.navigation__burger');
  var locale = navigation.dataset.locale;
  var currentArticleID = navigation.dataset.articleId;
  var categoryIcons = {
    360003619497: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.832 15.078a.75.75 0 0 0 1.061 1.061l-1.06-1.06ZM21.17 6.424l.738.132a.75.75 0 0 0-.868-.87l.13.738Zm-6.148.314a.75.75 0 1 0 .258 1.478l-.258-1.478Zm4.34 5.557a.75.75 0 0 0 1.477.263l-1.476-.263ZM11.97 15.61l.53.531-.53-.53Zm-10.076.53 4.596-4.596-1.06-1.06-4.597 4.595 1.061 1.061Zm4.243-4.596 4.596 4.596 1.06-1.06-4.596-4.597-1.06 1.06Zm6.363 4.597 9.2-9.185-1.06-1.062-9.2 9.186 1.06 1.061ZM21.04 5.685l-6.018 1.053.258 1.478L21.3 7.163l-.259-1.478Zm-.609.608-1.068 6.002 1.476.263 1.069-6.002-1.477-.263Zm-9.699 9.846a1.25 1.25 0 0 0 1.767.001l-1.06-1.062a.25.25 0 0 1 .354 0l-1.06 1.061ZM6.49 11.543a.25.25 0 0 1-.353 0l1.06-1.06a1.25 1.25 0 0 0-1.767 0l1.06 1.06Z" fill="#A8A8A8"/></svg>',
    360003692657: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.96 3.5a2.829 2.829 0 0 0-2.825 2.833v3.349h-2.31A2.829 2.829 0 0 0 2 12.515v5.152A2.829 2.829 0 0 0 4.824 20.5h13.352A2.829 2.829 0 0 0 21 17.667V6.333A2.829 2.829 0 0 0 18.176 3.5H9.959Zm1.489 15.454h6.727c.709 0 1.284-.576 1.284-1.287V6.333c0-.71-.575-1.288-1.284-1.288H9.959c-.709 0-1.283.577-1.283 1.288v3.349h.256a2.829 2.829 0 0 1 2.825 2.833v5.152c0 .463-.111.901-.308 1.287Zm-6.625-7.727c-.709 0-1.283.577-1.283 1.288v5.152c0 .71.574 1.287 1.283 1.287h4.108c.71 0 1.284-.576 1.284-1.287v-5.152c0-.711-.575-1.288-1.284-1.288H4.824Z" fill="#A8A8A8"/></svg>',
    360003735297: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.029a3.086 3.086 0 1 0 0-6.172 3.086 3.086 0 0 0 0 6.172Zm0-1.543A1.543 1.543 0 1 0 12 8.4a1.543 1.543 0 0 0 0 3.086Z" fill="#A8A8A8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7.457 9a7.457 7.457 0 1 1 12.48 5.512l-.241-1.02a2.829 2.829 0 0 0-2.753-2.178H9.971a2.829 2.829 0 0 0-2.753 2.179l-.24 1.019A7.438 7.438 0 0 1 4.542 12Zm3.788 6.494a7.422 7.422 0 0 0 3.669.963c1.334 0 2.586-.35 3.67-.963l-.39-1.647a1.286 1.286 0 0 0-1.25-.99H9.97c-.595 0-1.113.41-1.25.99l-.39 1.646Z" fill="#A8A8A8"/></svg>',
    4406279640337: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6.444A2.444 2.444 0 0 1 6.444 4h8.857a2.889 2.889 0 0 1 2.044.846l1.809 1.81A2.89 2.89 0 0 1 20 8.698v8.857A2.444 2.444 0 0 1 17.556 20H6.444A2.444 2.444 0 0 1 4 17.556V6.444Zm2.444-1.11c-.613 0-1.11.497-1.11 1.11v11.112c0 .613.497 1.11 1.11 1.11h.223V14a2 2 0 0 1 2-2h6.666a2 2 0 0 1 2 2v4.667h.223c.613 0 1.11-.498 1.11-1.111V8.699c0-.414-.163-.81-.455-1.1l-1.81-1.81a1.556 1.556 0 0 0-.845-.435v2.424a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5.333H6.444ZM16 18.666V14a.666.666 0 0 0-.667-.667H8.667A.667.667 0 0 0 8 14v4.667h8ZM8.889 5.333v2.445c0 .368.299.666.667.666h4a.667.667 0 0 0 .666-.666V5.333H8.89Z" fill="#A8A8A8"/></svg>',
    360003692717: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h4v1.5H7a3.5 3.5 0 1 0 0 7h4V17H7A5 5 0 0 1 7 7ZM17 15.5h-4V17h4a5 5 0 0 0 0-10h-4v1.5h4a3.5 3.5 0 1 1 0 7Z" fill="#A8A8A8"/><path d="M16 12.75v-1.5H8v1.5h8Z" fill="#A8A8A8"/></svg>',
    360003625478: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.875 8.667h-1.813v-1.62A4.057 4.057 0 0 0 12 3a4.057 4.057 0 0 0-4.063 4.048v1.619H6.125c-.894 0-1.625.728-1.625 1.619v8.095c0 .89.731 1.619 1.625 1.619h11.75c.894 0 1.625-.729 1.625-1.619v-8.095c0-.89-.731-1.62-1.625-1.62Zm-8.394-1.62c0-1.384 1.13-2.509 2.519-2.509a2.516 2.516 0 0 1 2.519 2.51v1.619H9.48v-1.62Zm8.394 11.334H6.125v-8.095h11.75v8.095Z" fill="#A8A8A8"/></svg>',
    5250879378961: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3.5 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7.507 11h12.986c.556 0 1.007.42 1.007.94v.12c0 .52-.45.94-1.007.94H7.507c-.556 0-1.007-.42-1.007-.94v-.12c0-.52.45-.94 1.007-.94ZM20.493 16H7.507c-.556 0-1.007.42-1.007.94v.12c0 .52.45.94 1.007.94h12.986c.556 0 1.007-.42 1.007-.94v-.12c0-.52-.45-.94-1.007-.94ZM7.507 6h12.986c.556 0 1.007.42 1.007.94v.12c0 .52-.45.94-1.007.94H7.507C6.951 8 6.5 7.58 6.5 7.06v-.12c0-.52.45-.94 1.007-.94Z" fill="#A8A8A8"/></svg>',
    18249373274130: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 18H7C5.89543 18 5 17.1046 5 16V7C5 5.89543 5.89543 5 7 5H10.4376C10.9796 5 11.4985 5.22002 11.8753 5.60968L13.5714 7.36364H19C20.1046 7.36364 21 8.25907 21 9.36364V16C21 17.1046 20.1046 18 19 18ZM13.1474 8.36364H19C19.5523 8.36364 20 8.81135 20 9.36364V16C20 16.5523 19.5523 17 19 17H7C6.44772 17 6 16.5523 6 16V7C6 6.44771 6.44771 6 7 6H10.4376C10.7086 6 10.968 6.11001 11.1564 6.30484L13.1474 8.36364Z" fill="#A8A8A8"/><path d="M4 10.5C4 10.2239 3.77614 10 3.5 10C3.22386 10 3 10.2239 3 10.5V17.5C3 18.8807 4.11929 20 5.5 20H13.5C13.7761 20 14 19.7761 14 19.5C14 19.2239 13.7761 19 13.5 19H5.5C4.67157 19 4 18.3284 4 17.5V10.5Z" fill="#A8A8A8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 18H7C5.89543 18 5 17.1046 5 16V7C5 5.89543 5.89543 5 7 5H10.4376C10.9796 5 11.4985 5.22002 11.8753 5.60968L13.5714 7.36364H19C20.1046 7.36364 21 8.25907 21 9.36364V16C21 17.1046 20.1046 18 19 18ZM13.1474 8.36364H19C19.5523 8.36364 20 8.81135 20 9.36364V16C20 16.5523 19.5523 17 19 17H7C6.44772 17 6 16.5523 6 16V7C6 6.44771 6.44771 6 7 6H10.4376C10.7086 6 10.968 6.11001 11.1564 6.30484L13.1474 8.36364Z" stroke="#A8A8A8" stroke-width="0.3" stroke-linecap="round"/><path d="M4 10.5C4 10.2239 3.77614 10 3.5 10C3.22386 10 3 10.2239 3 10.5V17.5C3 18.8807 4.11929 20 5.5 20H13.5C13.7761 20 14 19.7761 14 19.5C14 19.2239 13.7761 19 13.5 19H5.5C4.67157 19 4 18.3284 4 17.5V10.5Z" stroke="#A8A8A8" stroke-width="0.3" stroke-linecap="round"/></svg>',
    5250907485969: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9.5a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1ZM10 3.5a1 1 0 0 1 1 1v15a1 1 0 1 1-2 0v-15a1 1 0 0 1 1-1ZM6 13.5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6ZM21 15.5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4Z" fill="#A8A8A8"/></svg>',
    5250956662033: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1.75h10c.69 0 1.25.56 1.25 1.25v18c0 .69-.56 1.25-1.25 1.25H7c-.69 0-1.25-.56-1.25-1.25V3c0-.69.56-1.25 1.25-1.25Z" stroke="#A8A8A8" stroke-width="1.5" stroke-linecap="round"/><rect x="10" y="19" width="4" height="1" rx=".5" fill="#A8A8A8"/></svg>',
    360003692677: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.87 2.5a.903.903 0 0 0-1.806 0h1.805Zm-1.806 19a.902.902 0 1 0 1.805 0h-1.805Zm3.467-8.544-.349.833.35-.833Zm-4.911-1.08 4.563 1.913.697-1.665-4.563-1.913-.697 1.665Zm3.318-7.903h-.971v1.804h.97V3.973Zm-.971 0h-.758v1.804h.758V3.973Zm.902.902V2.5h-1.805v2.375h1.805Zm.422 13.348h-1.324v1.805h1.324v-1.805Zm-1.324 0h-1.592v1.805h1.592v-1.805Zm-.903.902V21.5h1.805v-2.375h-1.805ZM7.098 16.75a3.278 3.278 0 0 0 3.277 3.277v-1.805c-.813 0-1.473-.659-1.473-1.472H7.098Zm8.5-.834a2.307 2.307 0 0 1-2.307 2.306v1.805c2.27 0 4.111-1.84 4.111-4.111h-1.805Zm-1.416-2.127a2.307 2.307 0 0 1 1.415 2.127h1.806a4.112 4.112 0 0 0-2.523-3.792l-.698 1.665ZM7.097 8.084c0 1.657.995 3.152 2.523 3.792l.698-1.665a2.307 2.307 0 0 1-1.415-2.127H7.096Zm1.805 0a2.307 2.307 0 0 1 2.307-2.306V3.973a4.112 4.112 0 0 0-4.111 4.111h1.804Zm8.5.354a4.465 4.465 0 0 0-4.465-4.466v1.805a2.66 2.66 0 0 1 2.66 2.66h1.806Z" fill="#A8A8A8"/></svg>',
    25136410765202: '<svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M30 30.6858C34.1835 28.0263 37 23.3319 37 18C37 9.71573 30.2843 3 22 3C13.7157 3 7 9.71573 7 18C7 23.4055 9.69564 28.0747 14 30.7096V31.5C14 34.5376 16.4624 37 19.5 37H25C27.7614 37 30 34.7614 30 32V30.6858ZM22 5C14.8203 5 9 10.8203 9 18C9 22.9214 11.5479 27.0896 15.5468 29.2961C15.9874 29.5392 16.1724 30.0658 16 30.5232V31.5C16 33.433 17.567 35 19.5 35H25C26.6569 35 28 33.6569 28 32V30.5C28 30.4757 28.0009 30.4516 28.0026 30.4278C27.8753 29.9954 28.0541 29.5161 28.4616 29.2804C32.3531 27.0293 35 22.807 35 18C35 10.8203 29.1797 5 22 5Z" fill="#A8A8A8"/><path d="M17.3124 40.4958C17.3124 39.9436 17.7602 39.4958 18.3124 39.4958H25.6876C26.2398 39.4958 26.6876 39.9436 26.6876 40.4958C26.6876 41.0481 26.2398 41.4958 25.6876 41.4958H18.3124C17.7602 41.4958 17.3124 41.0481 17.3124 40.4958Z" fill="#A8A8A8"/></svg>'
  };
  function getData(url) {
    return fetch(url).then(function (res) {
      return res.json();
    });
  }
  function getPost(type) {
    return new Promise(function (resolve, reject) {
      var url = "/api/v2/help_center/".concat(locale, "/").concat(type);
      var result = [];
      getData(url).then(function (data) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(data[type]));
        if (data.next_page) {
          var pageCount = data.page_count;
          var successfulRequests = 1;
          for (var pageNumber = 2; pageNumber <= pageCount; pageNumber++) {
            getData("".concat(url, "?page=").concat(pageNumber)).then(function (otherData) {
              result = [].concat(_toConsumableArray(result), _toConsumableArray(otherData[type]));
              successfulRequests += 1;
              if (successfulRequests === pageCount) {
                resolve(result);
              }
            });
          }
        } else {
          resolve(result);
        }
      });
    });
  }
  function getNavigation() {
    return new Promise(function (resolve, reject) {
      var result = {};
      function checkData() {
        if (result.categories && result.sections && result.articles) {
          resolve(result);
        }
      }
      getPost('categories').then(function (categories) {
        result.categories = categories;
        checkData();
      });
      getPost('sections').then(function (sections) {
        result.sections = sections;
        checkData();
      });
      getPost('articles').then(function (articles) {
        result.articles = articles;
        checkData();
      });
    });
  }
  function onClickElementButton(evt) {
    evt.preventDefault();
    evt.currentTarget.parentElement.classList.toggle('active');
  }
  burger.addEventListener('click', function (evt) {
    evt.preventDefault();
    navList.classList.toggle('navigation__list--show');
    evt.currentTarget.classList.toggle('navigation__burger--show');
  });
  function createArticleElement(_ref, active) {
    var id = _ref.id,
      name = _ref.name,
      html_url = _ref.html_url;
    var li = document.createElement('li');
    var classNames = 'navigation__article-item';
    if (active) {
      classNames = classNames + ' current';
      li.innerHTML = "<a>".concat(name, "</a>");
    } else {
      li.innerHTML = "<a href=\"".concat(html_url, "\">").concat(name, "</a>");
    }
    li.className = classNames;
    return li;
  }
  function createSectionElement(_ref2) {
    var name = _ref2.name;
    var li = document.createElement('li');
    var btn = document.createElement('button');
    li.className = 'navigation__section-item';
    btn.innerHTML = "\n      <svg width=\"6\" height=\"8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M5.032 3.614a.5.5 0 0 1 0 .772l-3.964 3.27A.5.5 0 0 1 .25 7.27V.73a.5.5 0 0 1 .818-.385l3.964 3.27Z\" />\n      </svg>\n      <span>".concat(name, "</span>\n    ");
    btn.addEventListener('click', onClickElementButton);
    li.append(btn);
    return li;
  }
  function createCategoryElement(_ref3) {
    var id = _ref3.id,
      name = _ref3.name;
    var li = document.createElement('li');
    var btn = document.createElement('button');
    li.className = 'navigation__item';
    if (categoryIcons[id]) {
      btn.innerHTML = "".concat(categoryIcons[id], "<span id=\"").concat(id, "\">").concat(name, "</span>");
    } else {
      btn.innerHTML = "<span id=\"".concat(id, "\">").concat(name, "</span>");
    }
    btn.addEventListener('click', onClickElementButton);
    li.append(btn);
    return li;
  }
  function drawNavigation(_ref4) {
    var categories = _ref4.categories,
      sections = _ref4.sections,
      articles = _ref4.articles;
    var fragment = new DocumentFragment();
    categories.sort(function (a, b) {
      return a.position - b.position;
    });
    sections.sort(function (a, b) {
      return a.position - b.position;
    });
    articles.sort(function (a, b) {
      return a.position - b.position;
    });

    // Caregories
    categories.forEach(function (category) {
      var categoryElement = createCategoryElement(category);
      var sectionList = document.createElement('ul');
      sectionList.className = 'navigation__section-list';
      // Sections
      sections.forEach(function (section) {
        if (section.category_id === category.id) {
          var sectionElement = createSectionElement(section);
          var articleList = document.createElement('ul');
          articleList.className = 'navigation__article-list';
          // Articles
          articles.forEach(function (article) {
            if (article.section_id === section.id) {
              var active = Number(article.id) === Number(currentArticleID) || false;
              var articleElement = createArticleElement(article, active);
              articleList.append(articleElement);
              if (active) {
                sectionElement.className = sectionElement.className + ' current active';
                categoryElement.className = categoryElement.className + ' current active';
              }
            }
          });
          sectionElement.append(articleList);
          sectionList.append(sectionElement);
        }
      });
      categoryElement.append(sectionList);
      fragment.append(categoryElement);
    });
    navList.append(fragment);
  }
  getNavigation().then(function (data) {
    drawNavigation(data);
  });
});
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoZW1lLmpzIiwibWFpbi5qcyIsIm5hdmlnYXRpb24uanMiLCJsaXZlLWNoYXQuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiRU5URVIiLCJFU0NBUEUiLCJTUEFDRSIsIlVQIiwiRE9XTiIsIlRBQiIsImNsb3Nlc3QiLCJlbGVtZW50Iiwic2VsZWN0b3IiLCJFbGVtZW50IiwicHJvdG90eXBlIiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsIkFycmF5IiwiZm9yRWFjaCIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYW5jaG9yIiwiZSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93Iiwib3BlbiIsImhyZWYiLCJzYXZlRm9jdXMiLCJhY3RpdmVFbGVtZW50SWQiLCJhY3RpdmVFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwicmV0dXJuRm9jdXNUbyIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwicmV0dXJuRm9jdXNUb0VsIiwicXVlcnlTZWxlY3RvciIsImZvY3VzIiwiY29tbWVudENvbnRhaW5lclRleHRhcmVhIiwiY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scyIsImZvY3VzQ29tbWVudENvbnRhaW5lclRleHRhcmVhIiwic3R5bGUiLCJkaXNwbGF5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwic2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlciIsInJlcXVlc3RDb21tZW50RmllbGRzIiwicmVxdWVzdENvbW1lbnRTdWJtaXQiLCJyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uIiwicmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94IiwicmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24iLCJzZXRBdHRyaWJ1dGUiLCJkaXNhYmxlZCIsInN1Ym1pdCIsInJlcXVlc3RDb21tZW50VGV4dGFyZWEiLCJ1c2VzV3lzaXd5ZyIsImRhdGFzZXQiLCJoZWxwZXIiLCJpc0VtcHR5UGxhaW50ZXh0IiwicyIsInRyaW0iLCJpc0VtcHR5SHRtbCIsInhtbCIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImNvbmNhdCIsImltZyIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJpc0VtcHR5IiwiaW5uZXJUZXh0IiwiZWwiLCJzdG9wUHJvcGFnYXRpb24iLCJxdWlja1NlYXJjaCIsImtleUNvZGUiLCJ0b2dnbGVOYXZpZ2F0aW9uIiwidG9nZ2xlIiwibWVudSIsImlzRXhwYW5kZWQiLCJjbG9zZU5hdmlnYXRpb24iLCJjb2xsYXBzaWJsZSIsInJlcXVlc3RPcmdhbmlzYXRpb25TZWxlY3QiLCJtdWx0aWJyYW5kRmlsdGVyTGlzdHMiLCJmaWx0ZXIiLCJsZW5ndGgiLCJ0cmlnZ2VyIiwicmVtb3ZlQ2hpbGQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJub3RpZmljYXRpb25FbG0iLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiRHJvcGRvd24iLCJtZW51UGxhY2VtZW50IiwidG9wIiwiY29udGFpbnMiLCJlbmQiLCJjbGlja0hhbmRsZXIiLCJiaW5kIiwidG9nZ2xlS2V5SGFuZGxlciIsIm1lbnVLZXlIYW5kbGVyIiwibWVudUl0ZW1zIiwic2xpY2UiLCJkaXNtaXNzIiwiaGFuZGxlT3ZlcmZsb3ciLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwib3ZlcmZsb3ciLCJyaWdodCIsImxlZnQiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJib3R0b20iLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImFkZCIsImZvY3VzTmV4dE1lbnVJdGVtIiwiY3VycmVudEl0ZW0iLCJjdXJyZW50SW5kZXgiLCJpbmRleE9mIiwibmV4dEluZGV4IiwiZm9jdXNQcmV2aW91c01lbnVJdGVtIiwicHJldmlvdXNJbmRleCIsImZpcnN0SXRlbSIsImxhc3RJdGVtIiwiY3VycmVudEVsZW1lbnQiLCJ0YXJnZXQiLCJzaGlmdEtleSIsImNsaWNrIiwiZHJvcGRvd25zIiwiZHJvcGRvd25Ub2dnbGVzIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwicHVzaCIsImV2dCIsImRyb3Bkb3duIiwiY29weXJpZ2h0WWVhck5vZGUiLCJnZXRFbGVtZW50QnlJZCIsIkRhdGUiLCJnZXRGdWxsWWVhciIsImZvb3Rlck5hdkxpc3QiLCJWSVNCTEVfSVRFTVMiLCJzdWJtZW51cyIsInBhZ2VMYW5nIiwiZG9jdW1lbnRFbGVtZW50IiwiY3JlYXRlQnV0dG9uIiwiYnRuIiwiY3JlYXRlRWxlbWVudCIsImxhYmVsIiwic2hvd0l0ZW1zT2ZNZW51IiwiY3VycmVudFRhcmdldCIsInN1Ym1lbnUiLCJpdGVtcyIsImkiLCJoaWRlSXRlbXNPZk1lbnUiLCJhcHBlbmQiLCJuYXZpZ2F0aW9uIiwibmF2TGlzdCIsImJ1cmdlciIsImxvY2FsZSIsImN1cnJlbnRBcnRpY2xlSUQiLCJhcnRpY2xlSWQiLCJjYXRlZ29yeUljb25zIiwiZ2V0RGF0YSIsInVybCIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJnZXRQb3N0IiwidHlwZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwiZGF0YSIsIl90b0NvbnN1bWFibGVBcnJheSIsIm5leHRfcGFnZSIsInBhZ2VDb3VudCIsInBhZ2VfY291bnQiLCJzdWNjZXNzZnVsUmVxdWVzdHMiLCJwYWdlTnVtYmVyIiwib3RoZXJEYXRhIiwiZ2V0TmF2aWdhdGlvbiIsImNoZWNrRGF0YSIsImNhdGVnb3JpZXMiLCJzZWN0aW9ucyIsImFydGljbGVzIiwib25DbGlja0VsZW1lbnRCdXR0b24iLCJjcmVhdGVBcnRpY2xlRWxlbWVudCIsIl9yZWYiLCJhY3RpdmUiLCJpZCIsIm5hbWUiLCJodG1sX3VybCIsImxpIiwiY2xhc3NOYW1lcyIsImlubmVySFRNTCIsImNsYXNzTmFtZSIsImNyZWF0ZVNlY3Rpb25FbGVtZW50IiwiX3JlZjIiLCJjcmVhdGVDYXRlZ29yeUVsZW1lbnQiLCJfcmVmMyIsImRyYXdOYXZpZ2F0aW9uIiwiX3JlZjQiLCJmcmFnbWVudCIsIkRvY3VtZW50RnJhZ21lbnQiLCJzb3J0IiwiYSIsImIiLCJwb3NpdGlvbiIsImNhdGVnb3J5IiwiY2F0ZWdvcnlFbGVtZW50Iiwic2VjdGlvbkxpc3QiLCJzZWN0aW9uIiwiY2F0ZWdvcnlfaWQiLCJzZWN0aW9uRWxlbWVudCIsImFydGljbGVMaXN0IiwiYXJ0aWNsZSIsInNlY3Rpb25faWQiLCJOdW1iZXIiLCJhcnRpY2xlRWxlbWVudCIsIl9fbGMiLCJsaWNlbnNlIiwiZ3JvdXAiLCJsYyIsImFzeW5jIiwic3JjIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5zZXJ0QmVmb3JlIiwiTENfQVBJIiwib25fYWZ0ZXJfbG9hZCIsImRpc2FibGVfc291bmRzIiwiaXRlbSIsIm9wZW5fY2hhdF93aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7RUFDQTtFQUNBLElBQUFDLEtBQUEsR0FBQSxFQUFBO0VBQ0EsSUFBQUMsTUFBQSxHQUFBLEVBQUE7RUFDQSxJQUFBQyxLQUFBLEdBQUEsRUFBQTtFQUNBLElBQUFDLEVBQUEsR0FBQSxFQUFBO0VBQ0EsSUFBQUMsSUFBQSxHQUFBLEVBQUE7RUFDQSxJQUFBQyxHQUFBLEdBQUEsQ0FBQTtFQUVBLFNBQUFDLE9BQUFBLENBQUFDLE9BQUEsRUFBQUMsUUFBQSxFQUFBO0lBQ0EsSUFBQUMsT0FBQSxDQUFBQyxTQUFBLENBQUFKLE9BQUEsRUFBQTtNQUNBLE9BQUFDLE9BQUEsQ0FBQUQsT0FBQSxDQUFBRSxRQUFBLENBQUE7SUFDQTtJQUNBLEdBQUE7TUFDQSxJQUNBQyxPQUFBLENBQUFDLFNBQUEsQ0FBQUMsT0FBQSxJQUFBSixPQUFBLENBQUFJLE9BQUEsQ0FBQUgsUUFBQSxDQUFBLElBQ0FDLE9BQUEsQ0FB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QUFBLENBQUFxSixhQUFBLENBQUEsUUFBQSxDQUFBO0lBQ0E4RSxFQUFBLENBQUFDLEtBQUEsR0FBQSxJQUFBO0lBQ0FELEVBQUEsQ0FBQUUsR0FBQSxHQUFBLENBQUEsUUFBQSxJQUFBck8sUUFBQSxDQUFBc08sUUFBQSxDQUFBQyxRQUFBLEdBQUEsVUFBQSxHQUFBLFNBQUEsSUFBQSxpQ0FBQTtJQUNBLElBQUF6SyxDQUFBLEdBQUE5RCxRQUFBLENBQUF3TyxvQkFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtJQUNBMUssQ0FBQSxDQUFBN0MsVUFBQSxDQUFBd04sWUFBQSxDQUFBTixFQUFBLEVBQUFySyxDQUFBLENBQUE7RUFDQSxDQUFBLEVBQUEsQ0FBQTtFQUVBLElBQUE0SyxNQUFBLEdBQUFBLE1BQUEsSUFBQSxDQUFBLENBQUE7RUFFQWhOLE1BQUEsQ0FBQWdOLE1BQUEsR0FBQUEsTUFBQTtFQUNBQSxNQUFBLENBQUFDLGFBQUEsR0FBQSxZQUFBO0lBQ0FELE1BQUEsQ0FBQUUsY0FBQSxDQUFBLENBQUE7RUFDQSxDQUFBO0VBRUE1TyxRQUFBLENBQUFzQixnQkFBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBRixPQUFBLENBQUEsVUFBQXlOLElBQUEsRUFBQTtJQUNBLElBQUFBLElBQUEsRUFBQTtNQUNBQSxJQUFBLENBQUE1TyxnQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO1FBQ0F5TyxNQUFBLENBQUFJLGdCQUFBLENBQUEsQ0FBQTtNQUNBLENBQUEsQ0FBQTtJQUNBO0VBQ0EsQ0FBQSxDQUFBO0FBQ0EsQ0FBQSxDQUFBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIC8vIEtleSBtYXBcbiAgdmFyIEVOVEVSID0gMTM7XG4gIHZhciBFU0NBUEUgPSAyNztcbiAgdmFyIFNQQUNFID0gMzI7XG4gIHZhciBVUCA9IDM4O1xuICB2YXIgRE9XTiA9IDQwO1xuICB2YXIgVEFCID0gOTtcblxuICBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBkbyB7XG4gICAgICBpZiAoXG4gICAgICAgIChFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzICYmIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHx8XG4gICAgICAgIChFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciAmJiBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSkgfHxcbiAgICAgICAgKEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciAmJiBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50IHx8IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gc29jaWFsIHNoYXJlIHBvcHVwc1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFyZSBhJyksIGZ1bmN0aW9uIChhbmNob3IpIHtcbiAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCAnJywgJ2hlaWdodCA9IDUwMCwgd2lkdGggPSA1MDAnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gSW4gc29tZSBjYXNlcyB3ZSBzaG91bGQgcHJlc2VydmUgZm9jdXMgYWZ0ZXIgcGFnZSByZWxvYWRcbiAgZnVuY3Rpb24gc2F2ZUZvY3VzKCkge1xuICAgIHZhciBhY3RpdmVFbGVtZW50SWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5Gb2N1c1RvJywgJyMnICsgYWN0aXZlRWxlbWVudElkKTtcbiAgfVxuICB2YXIgcmV0dXJuRm9jdXNUbyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JldHVybkZvY3VzVG8nKTtcbiAgaWYgKHJldHVybkZvY3VzVG8pIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdyZXR1cm5Gb2N1c1RvJyk7XG4gICAgdmFyIHJldHVybkZvY3VzVG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmV0dXJuRm9jdXNUbyk7XG4gICAgcmV0dXJuRm9jdXNUb0VsICYmIHJldHVybkZvY3VzVG9FbC5mb2N1cyAmJiByZXR1cm5Gb2N1c1RvRWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8vIHNob3cgZm9ybSBjb250cm9scyB3aGVuIHRoZSB0ZXh0YXJlYSByZWNlaXZlcyBmb2N1cyBvciBiYWNrYnV0dG9uIGlzIHVzZWQgYW5kIHZhbHVlIGV4aXN0c1xuICB2YXIgY29tbWVudENvbnRhaW5lclRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY29udGFpbmVyIHRleHRhcmVhJyksXG4gICAgY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWZvcm0tY29udHJvbHMsIC5jb21tZW50LWNjcycpO1xuXG4gIGlmIChjb21tZW50Q29udGFpbmVyVGV4dGFyZWEpIHtcbiAgICBjb21tZW50Q29udGFpbmVyVGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbiBmb2N1c0NvbW1lbnRDb250YWluZXJUZXh0YXJlYSgpIHtcbiAgICAgIGNvbW1lbnRDb250YWluZXJGb3JtQ29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBjb21tZW50Q29udGFpbmVyVGV4dGFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmb2N1c0NvbW1lbnRDb250YWluZXJUZXh0YXJlYSk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29tbWVudENvbnRhaW5lclRleHRhcmVhLnZhbHVlICE9PSAnJykge1xuICAgICAgY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gIH1cblxuICAvLyBFeHBhbmQgUmVxdWVzdCBjb21tZW50IGZvcm0gd2hlbiBBZGQgdG8gY29udmVyc2F0aW9uIGlzIGNsaWNrZWRcbiAgdmFyIHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLmNvbW1lbnQtc2hvdy1jb250YWluZXInXG4gICAgKSxcbiAgICByZXF1ZXN0Q29tbWVudEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLmNvbW1lbnQtZmllbGRzJyksXG4gICAgcmVxdWVzdENvbW1lbnRTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIC5yZXF1ZXN0LXN1Ym1pdC1jb21tZW50Jyk7XG5cbiAgaWYgKHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIpIHtcbiAgICBzaG93UmVxdWVzdENvbW1lbnRDb250YWluZXJUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChyZXF1ZXN0Q29tbWVudEZpZWxkcywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdENvbW1lbnRTdWJtaXQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXG4gICAgICBpZiAoY29tbWVudENvbnRhaW5lclRleHRhcmVhKSB7XG4gICAgICAgIGNvbW1lbnRDb250YWluZXJUZXh0YXJlYS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gTWFyayBhcyBzb2x2ZWQgYnV0dG9uXG4gIHZhciByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlcXVlc3QtY29udGFpbmVyIC5tYXJrLWFzLXNvbHZlZDpub3QoW2RhdGEtZGlzYWJsZWRdKScpLFxuICAgIHJlcXVlc3RNYXJrQXNTb2x2ZWRDaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1jaGVja2JveF0nKSxcbiAgICByZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1zdWJtaXRdJyk7XG5cbiAgaWYgKHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24pIHtcbiAgICByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgIC8vIEVsZW1lbnQuY2xvc2VzdCBpcyBub3Qgc3VwcG9ydGVkIGluIElFMTFcbiAgICAgIGNsb3Nlc3QodGhpcywgJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENoYW5nZSBNYXJrIGFzIHNvbHZlZCB0ZXh0IGFjY29yZGluZyB0byB3aGV0aGVyIGNvbW1lbnQgaXMgZmlsbGVkXG4gIHZhciByZXF1ZXN0Q29tbWVudFRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlcXVlc3QtY29udGFpbmVyIC5jb21tZW50LWNvbnRhaW5lciB0ZXh0YXJlYScpO1xuXG4gIHZhciB1c2VzV3lzaXd5ZyA9IHJlcXVlc3RDb21tZW50VGV4dGFyZWEgJiYgcmVxdWVzdENvbW1lbnRUZXh0YXJlYS5kYXRhc2V0LmhlbHBlciA9PT0gJ3d5c2l3eWcnO1xuXG4gIGZ1bmN0aW9uIGlzRW1wdHlQbGFpbnRleHQocykge1xuICAgIHJldHVybiBzLnRyaW0oKSA9PT0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5SHRtbCh4bWwpIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhgPF8+JHt4bWx9PC9fPmAsICd0ZXh0L3htbCcpO1xuICAgIHZhciBpbWcgPSBkb2MucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgcmV0dXJuIGltZyA9PT0gbnVsbCAmJiBpc0VtcHR5UGxhaW50ZXh0KGRvYy5jaGlsZHJlblswXS50ZXh0Q29udGVudCk7XG4gIH1cblxuICB2YXIgaXNFbXB0eSA9IHVzZXNXeXNpd3lnID8gaXNFbXB0eUh0bWwgOiBpc0VtcHR5UGxhaW50ZXh0O1xuXG4gIGlmIChyZXF1ZXN0Q29tbWVudFRleHRhcmVhKSB7XG4gICAgcmVxdWVzdENvbW1lbnRUZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0VtcHR5KHJlcXVlc3RDb21tZW50VGV4dGFyZWEudmFsdWUpKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uKSB7XG4gICAgICAgICAgcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5pbm5lclRleHQgPSByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zb2x2ZS10cmFuc2xhdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uKSB7XG4gICAgICAgICAgcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5pbm5lclRleHQgPSByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdkYXRhLXNvbHZlLWFuZC1zdWJtaXQtdHJhbnNsYXRpb24nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gRGlzYWJsZSBzdWJtaXQgYnV0dG9uIGlmIHRleHRhcmVhIGlzIGVtcHR5XG4gIGlmIChyZXF1ZXN0Q29tbWVudFRleHRhcmVhICYmIGlzRW1wdHkocmVxdWVzdENvbW1lbnRUZXh0YXJlYS52YWx1ZSkpIHtcbiAgICByZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICAvLyBTdWJtaXQgcmVxdWVzdHMgZmlsdGVyIGZvcm0gb24gc3RhdHVzIG9yIG9yZ2FuaXphdGlvbiBjaGFuZ2UgaW4gdGhlIHJlcXVlc3QgbGlzdCBwYWdlXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3JlcXVlc3Qtc3RhdHVzLXNlbGVjdCwgI3JlcXVlc3Qtb3JnYW5pemF0aW9uLXNlbGVjdCcpLFxuICAgIGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2F2ZUZvY3VzKCk7XG4gICAgICAgIGNsb3Nlc3QodGhpcywgJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcblxuICAvLyBTdWJtaXQgcmVxdWVzdHMgZmlsdGVyIGZvcm0gb24gc2VhcmNoIGluIHRoZSByZXF1ZXN0IGxpc3QgcGFnZVxuICB2YXIgcXVpY2tTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcXVpY2stc2VhcmNoJyk7XG4gIHF1aWNrU2VhcmNoICYmXG4gICAgcXVpY2tTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2F2ZUZvY3VzKCk7XG4gICAgICAgIGNsb3Nlc3QodGhpcywgJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICBmdW5jdGlvbiB0b2dnbGVOYXZpZ2F0aW9uKHRvZ2dsZSwgbWVudSkge1xuICAgIHZhciBpc0V4cGFuZGVkID0gbWVudS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgIWlzRXhwYW5kZWQpO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU5hdmlnYXRpb24odG9nZ2xlLCBtZW51KSB7XG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB0b2dnbGUuZm9jdXMoKTtcbiAgfVxuXG4gIC8vIHZhciBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlciAubWVudS1idXR0b24nKTtcbiAgLy8gdmFyIHVzZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXItbmF2Jyk7XG5cbiAgLy8gYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gIC8vICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgLy8gICB0b2dnbGVOYXZpZ2F0aW9uKHRoaXMsIHVzZXJNZW51KTtcbiAgLy8gfSk7XG5cbiAgLy8gdXNlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAvLyAgIGlmIChlLmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAvLyAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgLy8gICAgIGNsb3NlTmF2aWdhdGlvbihidXJnZXJNZW51LCB0aGlzKTtcbiAgLy8gICB9XG4gIC8vIH0pO1xuXG4gIC8vIGlmICh1c2VyTWVudS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgLy8gICBidXJnZXJNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIC8vIH1cblxuICAvLyBUb2dnbGVzIGV4cGFuZGVkIGFyaWEgdG8gY29sbGFwc2libGUgZWxlbWVudHNcbiAgdmFyIGNvbGxhcHNpYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNpYmxlLW5hdiwgLmNvbGxhcHNpYmxlLXNpZGViYXInKTtcblxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNvbGxhcHNpYmxlLCBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgdG9nZ2xlID0gZWwucXVlcnlTZWxlY3RvcignLmNvbGxhcHNpYmxlLW5hdi10b2dnbGUsIC5jb2xsYXBzaWJsZS1zaWRlYmFyLXRvZ2dsZScpO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdG9nZ2xlTmF2aWdhdGlvbih0b2dnbGUsIHRoaXMpO1xuICAgIH0pO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgIGNsb3NlTmF2aWdhdGlvbih0b2dnbGUsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBTdWJtaXQgb3JnYW5pemF0aW9uIGZvcm0gaW4gdGhlIHJlcXVlc3QgcGFnZVxuICB2YXIgcmVxdWVzdE9yZ2FuaXNhdGlvblNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXF1ZXN0LW9yZ2FuaXphdGlvbiBzZWxlY3QnKTtcblxuICBpZiAocmVxdWVzdE9yZ2FuaXNhdGlvblNlbGVjdCkge1xuICAgIHJlcXVlc3RPcmdhbmlzYXRpb25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xvc2VzdCh0aGlzLCAnZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSWYgbXVsdGlicmFuZCBzZWFyY2ggaGFzIG1vcmUgdGhhbiA1IGhlbHAgY2VudGVycyBvciBjYXRlZ29yaWVzIGNvbGxhcHNlIHRoZSBsaXN0XG4gIHZhciBtdWx0aWJyYW5kRmlsdGVyTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubXVsdGlicmFuZC1maWx0ZXItbGlzdCcpO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG11bHRpYnJhbmRGaWx0ZXJMaXN0cywgZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIGlmIChmaWx0ZXIuY2hpbGRyZW4ubGVuZ3RoID4gNikge1xuICAgICAgLy8gRGlzcGxheSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgICAgdmFyIHRyaWdnZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignLnNlZS1hbGwtZmlsdGVycycpO1xuICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuXG4gICAgICAvLyBBZGQgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tcbiAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0cmlnZ2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodHJpZ2dlcik7XG4gICAgICAgIGZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aWJyYW5kLWZpbHRlci1saXN0LS1jb2xsYXBzZWQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gSWYgdGhlcmUgYXJlIGFueSBlcnJvciBub3RpZmljYXRpb25zIGJlbG93IGFuIGlucHV0IGZpZWxkLCBmb2N1cyB0aGF0IGZpZWxkXG4gIHZhciBub3RpZmljYXRpb25FbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWZpY2F0aW9uLWVycm9yJyk7XG4gIGlmIChcbiAgICBub3RpZmljYXRpb25FbG0gJiZcbiAgICBub3RpZmljYXRpb25FbG0ucHJldmlvdXNFbGVtZW50U2libGluZyAmJlxuICAgIHR5cGVvZiBub3RpZmljYXRpb25FbG0ucHJldmlvdXNFbGVtZW50U2libGluZy5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICBub3RpZmljYXRpb25FbG0ucHJldmlvdXNFbGVtZW50U2libGluZy5mb2N1cygpO1xuICB9XG5cbiAgLy8gRHJvcGRvd25zXG5cbiAgZnVuY3Rpb24gRHJvcGRvd24odG9nZ2xlLCBtZW51KSB7XG4gICAgdGhpcy50b2dnbGUgPSB0b2dnbGU7XG4gICAgdGhpcy5tZW51ID0gbWVudTtcblxuICAgIHRoaXMubWVudVBsYWNlbWVudCA9IHtcbiAgICAgIHRvcDogbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUtdG9wJyksXG4gICAgICBlbmQ6IG1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LWVuZCcpLFxuICAgIH07XG5cbiAgICB0aGlzLnRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLnRvZ2dsZUtleUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5tZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm1lbnVLZXlIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlID0ge1xuICAgIGdldCBpc0V4cGFuZGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWVudS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICAgIH0sXG5cbiAgICBnZXQgbWVudUl0ZW1zKCkge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMubWVudS5xdWVyeVNlbGVjdG9yQWxsKFwiW3JvbGU9J21lbnVpdGVtJ11cIikpO1xuICAgIH0sXG5cbiAgICBkaXNtaXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNFeHBhbmRlZCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLm1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgdGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3Bkb3duLW1lbnUtZW5kJywgJ2Ryb3Bkb3duLW1lbnUtdG9wJyk7XG4gICAgfSxcblxuICAgIG9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHJldHVybjtcblxuICAgICAgdGhpcy5tZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgdGhpcy5oYW5kbGVPdmVyZmxvdygpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVPdmVyZmxvdzogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlY3QgPSB0aGlzLm1lbnUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIHZhciBvdmVyZmxvdyA9IHtcbiAgICAgICAgcmlnaHQ6IHJlY3QubGVmdCA8IDAgfHwgcmVjdC5sZWZ0ICsgcmVjdC53aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBib3R0b206IHJlY3QudG9wIDwgMCB8fCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgfTtcblxuICAgICAgaWYgKG92ZXJmbG93LnJpZ2h0IHx8IHRoaXMubWVudVBsYWNlbWVudC5lbmQpIHtcbiAgICAgICAgdGhpcy5tZW51LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duLW1lbnUtZW5kJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvdmVyZmxvdy5ib3R0b20gfHwgdGhpcy5tZW51UGxhY2VtZW50LnRvcCkge1xuICAgICAgICB0aGlzLm1lbnUuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24tbWVudS10b3AnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWVudS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XG4gICAgICAgIHRoaXMubWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wZG93bi1tZW51LXRvcCcpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmb2N1c05leHRNZW51SXRlbTogZnVuY3Rpb24gKGN1cnJlbnRJdGVtKSB7XG4gICAgICBpZiAoIXRoaXMubWVudUl0ZW1zLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5tZW51SXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSk7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ID09PSB0aGlzLm1lbnVJdGVtcy5sZW5ndGggLSAxIHx8IGN1cnJlbnRJbmRleCA8IDAgPyAwIDogY3VycmVudEluZGV4ICsgMTtcblxuICAgICAgdGhpcy5tZW51SXRlbXNbbmV4dEluZGV4XS5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBmb2N1c1ByZXZpb3VzTWVudUl0ZW06IGZ1bmN0aW9uIChjdXJyZW50SXRlbSkge1xuICAgICAgaWYgKCF0aGlzLm1lbnVJdGVtcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMubWVudUl0ZW1zLmluZGV4T2YoY3VycmVudEl0ZW0pO1xuICAgICAgdmFyIHByZXZpb3VzSW5kZXggPSBjdXJyZW50SW5kZXggPD0gMCA/IHRoaXMubWVudUl0ZW1zLmxlbmd0aCAtIDEgOiBjdXJyZW50SW5kZXggLSAxO1xuXG4gICAgICB0aGlzLm1lbnVJdGVtc1twcmV2aW91c0luZGV4XS5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBjbGlja0hhbmRsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgICAgdGhpcy5kaXNtaXNzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlS2V5SGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGNhc2UgRE9XTjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c05leHRNZW51SXRlbSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVQOlxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICB0aGlzLmZvY3VzUHJldmlvdXNNZW51SXRlbSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICB0aGlzLmRpc21pc3MoKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5mb2N1cygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtZW51S2V5SGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBmaXJzdEl0ZW0gPSB0aGlzLm1lbnVJdGVtc1swXTtcbiAgICAgIHZhciBsYXN0SXRlbSA9IHRoaXMubWVudUl0ZW1zW3RoaXMubWVudUl0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgICAgIHRoaXMudG9nZ2xlLmZvY3VzKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRE9XTjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5mb2N1c05leHRNZW51SXRlbShjdXJyZW50RWxlbWVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVVA6XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuZm9jdXNQcmV2aW91c01lbnVJdGVtKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUQUI6XG4gICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZmlyc3RJdGVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB0aGlzLmZvY3VzUHJldmlvdXNNZW51SXRlbShjdXJyZW50RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudCA9PT0gbGFzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzTmV4dE1lbnVJdGVtKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICB2YXIgZHJvcGRvd25zID0gW107XG4gIHZhciBkcm9wZG93blRvZ2dsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tdG9nZ2xlJykpO1xuXG4gIGRyb3Bkb3duVG9nZ2xlcy5mb3JFYWNoKGZ1bmN0aW9uICh0b2dnbGUpIHtcbiAgICB2YXIgbWVudSA9IHRvZ2dsZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKG1lbnUgJiYgbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUnKSkge1xuICAgICAgZHJvcGRvd25zLnB1c2gobmV3IERyb3Bkb3duKHRvZ2dsZSwgbWVudSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGRyb3Bkb3duKSB7XG4gICAgICBpZiAoIWRyb3Bkb3duLnRvZ2dsZS5jb250YWlucyhldnQudGFyZ2V0KSkge1xuICAgICAgICBkcm9wZG93bi5kaXNtaXNzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICB2YXIgY29weXJpZ2h0WWVhck5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29weXJpZ2h0LXllYXInKTtcblxuICBpZiAoY29weXJpZ2h0WWVhck5vZGUpIHtcbiAgICBjb3B5cmlnaHRZZWFyTm9kZS50ZXh0Q29udGVudCA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIC8vIGhpZGUgbWVudSB0byBmb290ZXJcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBmb290ZXJOYXZMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtZm9vdGVyX19uYXYtbGlzdCcpO1xuXG4gICAgaWYgKCFmb290ZXJOYXZMaXN0KSByZXR1cm47XG5cbiAgICBjb25zdCBWSVNCTEVfSVRFTVMgPSA5O1xuICAgIGNvbnN0IHN1Ym1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpdGUtZm9vdGVyX19uYXYtbGlzdCA+IGxpJyk7XG4gICAgY29uc3QgcGFnZUxhbmcgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsYW5nJyk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCdXR0b24oKSB7XG4gICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGxldCBsYWJlbDtcblxuICAgICAgc3dpdGNoIChwYWdlTGFuZykge1xuICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgbGFiZWwgPSAn0Lgg0LTRgNGD0LPQvtC1ISc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VzJzpcbiAgICAgICAgICBsYWJlbCA9ICfCoXkgbcOhcyEnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxhYmVsID0gJ2FuZCBtb3JlJztcbiAgICAgIH1cblxuICAgICAgYnRuLnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICBidG4uY2xhc3NMaXN0ID0gJ3NpdGUtZm9vdGVyX19uYXYtbW9yZSc7XG5cbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgc2hvd0l0ZW1zT2ZNZW51KGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICBldnQuY3VycmVudFRhcmdldC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gYnRuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dJdGVtc09mTWVudShzdWJtZW51KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IHN1Ym1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ2xpc3QtaXRlbSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZUl0ZW1zT2ZNZW51KHN1Ym1lbnUpIHtcbiAgICAgIGNvbnN0IGl0ZW1zID0gc3VibWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID49IFZJU0JMRV9JVEVNUykge1xuICAgICAgICAgIGl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IFZJU0JMRV9JVEVNUykge1xuICAgICAgICBzdWJtZW51LmFwcGVuZChjcmVhdGVCdXR0b24oKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VibWVudXMuZm9yRWFjaCgoc3VibWVudSkgPT4ge1xuICAgICAgaGlkZUl0ZW1zT2ZNZW51KHN1Ym1lbnUpO1xuICAgIH0pO1xuICB9KSgpO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBuYXZpZ2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmlnYXRpb24nKTtcblxuICBpZiAoIW5hdmlnYXRpb24pIHJldHVybjtcblxuICBjb25zdCBuYXZMaXN0ID0gbmF2aWdhdGlvbi5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvbl9fbGlzdCcpO1xuICBjb25zdCBidXJnZXIgPSBuYXZpZ2F0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5uYXZpZ2F0aW9uX19idXJnZXInKTtcbiAgY29uc3QgbG9jYWxlID0gbmF2aWdhdGlvbi5kYXRhc2V0LmxvY2FsZTtcbiAgY29uc3QgY3VycmVudEFydGljbGVJRCA9IG5hdmlnYXRpb24uZGF0YXNldC5hcnRpY2xlSWQ7XG5cbiAgY29uc3QgY2F0ZWdvcnlJY29ucyA9IHtcbiAgICAzNjAwMDM2MTk0OTc6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTS44MzIgMTUuMDc4YS43NS43NSAwIDAgMCAxLjA2MSAxLjA2MWwtMS4wNi0xLjA2Wk0yMS4xNyA2LjQyNGwuNzM4LjEzMmEuNzUuNzUgMCAwIDAtLjg2OC0uODdsLjEzLjczOFptLTYuMTQ4LjMxNGEuNzUuNzUgMCAxIDAgLjI1OCAxLjQ3OGwtLjI1OC0xLjQ3OFptNC4zNCA1LjU1N2EuNzUuNzUgMCAwIDAgMS40NzcuMjYzbC0xLjQ3Ni0uMjYzWk0xMS45NyAxNS42MWwuNTMuNTMxLS41My0uNTNabS0xMC4wNzYuNTMgNC41OTYtNC41OTYtMS4wNi0xLjA2LTQuNTk3IDQuNTk1IDEuMDYxIDEuMDYxWm00LjI0My00LjU5NiA0LjU5NiA0LjU5NiAxLjA2LTEuMDYtNC41OTYtNC41OTctMS4wNiAxLjA2Wm02LjM2MyA0LjU5NyA5LjItOS4xODUtMS4wNi0xLjA2Mi05LjIgOS4xODYgMS4wNiAxLjA2MVpNMjEuMDQgNS42ODVsLTYuMDE4IDEuMDUzLjI1OCAxLjQ3OEwyMS4zIDcuMTYzbC0uMjU5LTEuNDc4Wm0tLjYwOS42MDgtMS4wNjggNi4wMDIgMS40NzYuMjYzIDEuMDY5LTYuMDAyLTEuNDc3LS4yNjNabS05LjY5OSA5Ljg0NmExLjI1IDEuMjUgMCAwIDAgMS43NjcuMDAxbC0xLjA2LTEuMDYyYS4yNS4yNSAwIDAgMSAuMzU0IDBsLTEuMDYgMS4wNjFaTTYuNDkgMTEuNTQzYS4yNS4yNSAwIDAgMS0uMzUzIDBsMS4wNi0xLjA2YTEuMjUgMS4yNSAwIDAgMC0xLjc2NyAwbDEuMDYgMS4wNlpcIiBmaWxsPVwiI0E4QThBOFwiLz48L3N2Zz4nLFxuICAgIDM2MDAwMzY5MjY1NzpcbiAgICAgICc8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk05Ljk2IDMuNWEyLjgyOSAyLjgyOSAwIDAgMC0yLjgyNSAyLjgzM3YzLjM0OWgtMi4zMUEyLjgyOSAyLjgyOSAwIDAgMCAyIDEyLjUxNXY1LjE1MkEyLjgyOSAyLjgyOSAwIDAgMCA0LjgyNCAyMC41aDEzLjM1MkEyLjgyOSAyLjgyOSAwIDAgMCAyMSAxNy42NjdWNi4zMzNBMi44MjkgMi44MjkgMCAwIDAgMTguMTc2IDMuNUg5Ljk1OVptMS40ODkgMTUuNDU0aDYuNzI3Yy43MDkgMCAxLjI4NC0uNTc2IDEuMjg0LTEuMjg3VjYuMzMzYzAtLjcxLS41NzUtMS4yODgtMS4yODQtMS4yODhIOS45NTljLS43MDkgMC0xLjI4My41NzctMS4yODMgMS4yODh2My4zNDloLjI1NmEyLjgyOSAyLjgyOSAwIDAgMSAyLjgyNSAyLjgzM3Y1LjE1MmMwIC40NjMtLjExMS45MDEtLjMwOCAxLjI4N1ptLTYuNjI1LTcuNzI3Yy0uNzA5IDAtMS4yODMuNTc3LTEuMjgzIDEuMjg4djUuMTUyYzAgLjcxLjU3NCAxLjI4NyAxLjI4MyAxLjI4N2g0LjEwOGMuNzEgMCAxLjI4NC0uNTc2IDEuMjg0LTEuMjg3di01LjE1MmMwLS43MTEtLjU3NS0xLjI4OC0xLjI4NC0xLjI4OEg0LjgyNFpcIiBmaWxsPVwiI0E4QThBOFwiLz48L3N2Zz4nLFxuICAgIDM2MDAwMzczNTI5NzpcbiAgICAgICc8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAxMy4wMjlhMy4wODYgMy4wODYgMCAxIDAgMC02LjE3MiAzLjA4NiAzLjA4NiAwIDAgMCAwIDYuMTcyWm0wLTEuNTQzQTEuNTQzIDEuNTQzIDAgMSAwIDEyIDguNGExLjU0MyAxLjU0MyAwIDAgMCAwIDMuMDg2WlwiIGZpbGw9XCIjQThBOEE4XCIvPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAzYTkgOSAwIDEgMCAwIDE4IDkgOSAwIDAgMCAwLTE4Wm0tNy40NTcgOWE3LjQ1NyA3LjQ1NyAwIDEgMSAxMi40OCA1LjUxMmwtLjI0MS0xLjAyYTIuODI5IDIuODI5IDAgMCAwLTIuNzUzLTIuMTc4SDkuOTcxYTIuODI5IDIuODI5IDAgMCAwLTIuNzUzIDIuMTc5bC0uMjQgMS4wMTlBNy40MzggNy40MzggMCAwIDEgNC41NDIgMTJabTMuNzg4IDYuNDk0YTcuNDIyIDcuNDIyIDAgMCAwIDMuNjY5Ljk2M2MxLjMzNCAwIDIuNTg2LS4zNSAzLjY3LS45NjNsLS4zOS0xLjY0N2ExLjI4NiAxLjI4NiAwIDAgMC0xLjI1LS45OUg5Ljk3Yy0uNTk1IDAtMS4xMTMuNDEtMS4yNS45OWwtLjM5IDEuNjQ2WlwiIGZpbGw9XCIjQThBOEE4XCIvPjwvc3ZnPicsXG4gICAgNDQwNjI3OTY0MDMzNzpcbiAgICAgICc8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNNCA2LjQ0NEEyLjQ0NCAyLjQ0NCAwIDAgMSA2LjQ0NCA0aDguODU3YTIuODg5IDIuODg5IDAgMCAxIDIuMDQ0Ljg0NmwxLjgwOSAxLjgxQTIuODkgMi44OSAwIDAgMSAyMCA4LjY5OHY4Ljg1N0EyLjQ0NCAyLjQ0NCAwIDAgMSAxNy41NTYgMjBINi40NDRBMi40NDQgMi40NDQgMCAwIDEgNCAxNy41NTZWNi40NDRabTIuNDQ0LTEuMTFjLS42MTMgMC0xLjExLjQ5Ny0xLjExIDEuMTF2MTEuMTEyYzAgLjYxMy40OTcgMS4xMSAxLjExIDEuMTFoLjIyM1YxNGEyIDIgMCAwIDEgMi0yaDYuNjY2YTIgMiAwIDAgMSAyIDJ2NC42NjdoLjIyM2MuNjEzIDAgMS4xMS0uNDk4IDEuMTEtMS4xMTFWOC42OTljMC0uNDE0LS4xNjMtLjgxLS40NTUtMS4xbC0xLjgxLTEuODFhMS41NTYgMS41NTYgMCAwIDAtLjg0NS0uNDM1djIuNDI0YTIgMiAwIDAgMS0yIDJoLTRhMiAyIDAgMCAxLTItMlY1LjMzM0g2LjQ0NFpNMTYgMTguNjY2VjE0YS42NjYuNjY2IDAgMCAwLS42NjctLjY2N0g4LjY2N0EuNjY3LjY2NyAwIDAgMCA4IDE0djQuNjY3aDhaTTguODg5IDUuMzMzdjIuNDQ1YzAgLjM2OC4yOTkuNjY2LjY2Ny42NjZoNGEuNjY3LjY2NyAwIDAgMCAuNjY2LS42NjZWNS4zMzNIOC44OVpcIiBmaWxsPVwiI0E4QThBOFwiLz48L3N2Zz4nLFxuICAgIDM2MDAwMzY5MjcxNzpcbiAgICAgICc8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNNyA3aDR2MS41SDdhMy41IDMuNSAwIDEgMCAwIDdoNFYxN0g3QTUgNSAwIDAgMSA3IDdaTTE3IDE1LjVoLTRWMTdoNGE1IDUgMCAwIDAgMC0xMGgtNHYxLjVoNGEzLjUgMy41IDAgMSAxIDAgN1pcIiBmaWxsPVwiI0E4QThBOFwiLz48cGF0aCBkPVwiTTE2IDEyLjc1di0xLjVIOHYxLjVoOFpcIiBmaWxsPVwiI0E4QThBOFwiLz48L3N2Zz4nLFxuICAgIDM2MDAwMzYyNTQ3ODpcbiAgICAgICc8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuODc1IDguNjY3aC0xLjgxM3YtMS42MkE0LjA1NyA0LjA1NyAwIDAgMCAxMiAzYTQuMDU3IDQuMDU3IDAgMCAwLTQuMDYzIDQuMDQ4djEuNjE5SDYuMTI1Yy0uODk0IDAtMS42MjUuNzI4LTEuNjI1IDEuNjE5djguMDk1YzAgLjg5LjczMSAxLjYxOSAxLjYyNSAxLjYxOWgxMS43NWMuODk0IDAgMS42MjUtLjcyOSAxLjYyNS0xLjYxOXYtOC4wOTVjMC0uODktLjczMS0xLjYyLTEuNjI1LTEuNjJabS04LjM5NC0xLjYyYzAtMS4zODQgMS4xMy0yLjUwOSAyLjUxOS0yLjUwOWEyLjUxNiAyLjUxNiAwIDAgMSAyLjUxOSAyLjUxdjEuNjE5SDkuNDh2LTEuNjJabTguMzk0IDExLjMzNEg2LjEyNXYtOC4wOTVoMTEuNzV2OC4wOTVaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICA1MjUwODc5Mzc4OTYxOlxuICAgICAgJzxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk00LjUgN2ExIDEgMCAxIDEtMiAwIDEgMSAwIDAgMSAyIDBaTTQuNSAxMmExIDEgMCAxIDEtMiAwIDEgMSAwIDAgMSAyIDBaTTMuNSAxOGExIDEgMCAxIDAgMC0yIDEgMSAwIDAgMCAwIDJaTTcuNTA3IDExaDEyLjk4NmMuNTU2IDAgMS4wMDcuNDIgMS4wMDcuOTR2LjEyYzAgLjUyLS40NS45NC0xLjAwNy45NEg3LjUwN2MtLjU1NiAwLTEuMDA3LS40Mi0xLjAwNy0uOTR2LS4xMmMwLS41Mi40NS0uOTQgMS4wMDctLjk0Wk0yMC40OTMgMTZINy41MDdjLS41NTYgMC0xLjAwNy40Mi0xLjAwNy45NHYuMTJjMCAuNTIuNDUuOTQgMS4wMDcuOTRoMTIuOTg2Yy41NTYgMCAxLjAwNy0uNDIgMS4wMDctLjk0di0uMTJjMC0uNTItLjQ1LS45NC0xLjAwNy0uOTRaTTcuNTA3IDZoMTIuOTg2Yy41NTYgMCAxLjAwNy40MiAxLjAwNy45NHYuMTJjMCAuNTItLjQ1Ljk0LTEuMDA3Ljk0SDcuNTA3QzYuOTUxIDggNi41IDcuNTggNi41IDcuMDZ2LS4xMmMwLS41Mi40NS0uOTQgMS4wMDctLjk0WlwiIGZpbGw9XCIjQThBOEE4XCIvPjwvc3ZnPicsXG4gICAgMTgyNDkzNzMyNzQxMzA6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTE5IDE4SDdDNS44OTU0MyAxOCA1IDE3LjEwNDYgNSAxNlY3QzUgNS44OTU0MyA1Ljg5NTQzIDUgNyA1SDEwLjQzNzZDMTAuOTc5NiA1IDExLjQ5ODUgNS4yMjAwMiAxMS44NzUzIDUuNjA5NjhMMTMuNTcxNCA3LjM2MzY0SDE5QzIwLjEwNDYgNy4zNjM2NCAyMSA4LjI1OTA3IDIxIDkuMzYzNjRWMTZDMjEgMTcuMTA0NiAyMC4xMDQ2IDE4IDE5IDE4Wk0xMy4xNDc0IDguMzYzNjRIMTlDMTkuNTUyMyA4LjM2MzY0IDIwIDguODExMzUgMjAgOS4zNjM2NFYxNkMyMCAxNi41NTIzIDE5LjU1MjMgMTcgMTkgMTdIN0M2LjQ0NzcyIDE3IDYgMTYuNTUyMyA2IDE2VjdDNiA2LjQ0NzcxIDYuNDQ3NzEgNiA3IDZIMTAuNDM3NkMxMC43MDg2IDYgMTAuOTY4IDYuMTEwMDEgMTEuMTU2NCA2LjMwNDg0TDEzLjE0NzQgOC4zNjM2NFpcIiBmaWxsPVwiI0E4QThBOFwiLz48cGF0aCBkPVwiTTQgMTAuNUM0IDEwLjIyMzkgMy43NzYxNCAxMCAzLjUgMTBDMy4yMjM4NiAxMCAzIDEwLjIyMzkgMyAxMC41VjE3LjVDMyAxOC44ODA3IDQuMTE5MjkgMjAgNS41IDIwSDEzLjVDMTMuNzc2MSAyMCAxNCAxOS43NzYxIDE0IDE5LjVDMTQgMTkuMjIzOSAxMy43NzYxIDE5IDEzLjUgMTlINS41QzQuNjcxNTcgMTkgNCAxOC4zMjg0IDQgMTcuNVYxMC41WlwiIGZpbGw9XCIjQThBOEE4XCIvPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xOSAxOEg3QzUuODk1NDMgMTggNSAxNy4xMDQ2IDUgMTZWN0M1IDUuODk1NDMgNS44OTU0MyA1IDcgNUgxMC40Mzc2QzEwLjk3OTYgNSAxMS40OTg1IDUuMjIwMDIgMTEuODc1MyA1LjYwOTY4TDEzLjU3MTQgNy4zNjM2NEgxOUMyMC4xMDQ2IDcuMzYzNjQgMjEgOC4yNTkwNyAyMSA5LjM2MzY0VjE2QzIxIDE3LjEwNDYgMjAuMTA0NiAxOCAxOSAxOFpNMTMuMTQ3NCA4LjM2MzY0SDE5QzE5LjU1MjMgOC4zNjM2NCAyMCA4LjgxMTM1IDIwIDkuMzYzNjRWMTZDMjAgMTYuNTUyMyAxOS41NTIzIDE3IDE5IDE3SDdDNi40NDc3MiAxNyA2IDE2LjU1MjMgNiAxNlY3QzYgNi40NDc3MSA2LjQ0NzcxIDYgNyA2SDEwLjQzNzZDMTAuNzA4NiA2IDEwLjk2OCA2LjExMDAxIDExLjE1NjQgNi4zMDQ4NEwxMy4xNDc0IDguMzYzNjRaXCIgc3Ryb2tlPVwiI0E4QThBOFwiIHN0cm9rZS13aWR0aD1cIjAuM1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+PHBhdGggZD1cIk00IDEwLjVDNCAxMC4yMjM5IDMuNzc2MTQgMTAgMy41IDEwQzMuMjIzODYgMTAgMyAxMC4yMjM5IDMgMTAuNVYxNy41QzMgMTguODgwNyA0LjExOTI5IDIwIDUuNSAyMEgxMy41QzEzLjc3NjEgMjAgMTQgMTkuNzc2MSAxNCAxOS41QzE0IDE5LjIyMzkgMTMuNzc2MSAxOSAxMy41IDE5SDUuNUM0LjY3MTU3IDE5IDQgMTguMzI4NCA0IDE3LjVWMTAuNVpcIiBzdHJva2U9XCIjQThBOEE4XCIgc3Ryb2tlLXdpZHRoPVwiMC4zXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz48L3N2Zz4nLFxuICAgIDUyNTA5MDc0ODU5Njk6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE1IDkuNWExIDEgMCAwIDEgMSAxdjlhMSAxIDAgMSAxLTIgMHYtOWExIDEgMCAwIDEgMS0xWk0xMCAzLjVhMSAxIDAgMCAxIDEgMXYxNWExIDEgMCAxIDEtMiAwdi0xNWExIDEgMCAwIDEgMS0xWk02IDEzLjVhMSAxIDAgMSAwLTIgMHY2YTEgMSAwIDEgMCAyIDB2LTZaTTIxIDE1LjVhMSAxIDAgMSAwLTIgMHY0YTEgMSAwIDEgMCAyIDB2LTRaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICA1MjUwOTU2NjYyMDMzOlxuICAgICAgJzxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk03IDEuNzVoMTBjLjY5IDAgMS4yNS41NiAxLjI1IDEuMjV2MThjMCAuNjktLjU2IDEuMjUtMS4yNSAxLjI1SDdjLS42OSAwLTEuMjUtLjU2LTEuMjUtMS4yNVYzYzAtLjY5LjU2LTEuMjUgMS4yNS0xLjI1WlwiIHN0cm9rZT1cIiNBOEE4QThcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPjxyZWN0IHg9XCIxMFwiIHk9XCIxOVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjFcIiByeD1cIi41XCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICAzNjAwMDM2OTI2Nzc6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTEyLjg3IDIuNWEuOTAzLjkwMyAwIDAgMC0xLjgwNiAwaDEuODA1Wm0tMS44MDYgMTlhLjkwMi45MDIgMCAxIDAgMS44MDUgMGgtMS44MDVabTMuNDY3LTguNTQ0LS4zNDkuODMzLjM1LS44MzNabS00LjkxMS0xLjA4IDQuNTYzIDEuOTEzLjY5Ny0xLjY2NS00LjU2My0xLjkxMy0uNjk3IDEuNjY1Wm0zLjMxOC03LjkwM2gtLjk3MXYxLjgwNGguOTdWMy45NzNabS0uOTcxIDBoLS43NTh2MS44MDRoLjc1OFYzLjk3M1ptLjkwMi45MDJWMi41aC0xLjgwNXYyLjM3NWgxLjgwNVptLjQyMiAxMy4zNDhoLTEuMzI0djEuODA1aDEuMzI0di0xLjgwNVptLTEuMzI0IDBoLTEuNTkydjEuODA1aDEuNTkydi0xLjgwNVptLS45MDMuOTAyVjIxLjVoMS44MDV2LTIuMzc1aC0xLjgwNVpNNy4wOTggMTYuNzVhMy4yNzggMy4yNzggMCAwIDAgMy4yNzcgMy4yNzd2LTEuODA1Yy0uODEzIDAtMS40NzMtLjY1OS0xLjQ3My0xLjQ3Mkg3LjA5OFptOC41LS44MzRhMi4zMDcgMi4zMDcgMCAwIDEtMi4zMDcgMi4zMDZ2MS44MDVjMi4yNyAwIDQuMTExLTEuODQgNC4xMTEtNC4xMTFoLTEuODA1Wm0tMS40MTYtMi4xMjdhMi4zMDcgMi4zMDcgMCAwIDEgMS40MTUgMi4xMjdoMS44MDZhNC4xMTIgNC4xMTIgMCAwIDAtMi41MjMtMy43OTJsLS42OTggMS42NjVaTTcuMDk3IDguMDg0YzAgMS42NTcuOTk1IDMuMTUyIDIuNTIzIDMuNzkybC42OTgtMS42NjVhMi4zMDcgMi4zMDcgMCAwIDEtMS40MTUtMi4xMjdINy4wOTZabTEuODA1IDBhMi4zMDcgMi4zMDcgMCAwIDEgMi4zMDctMi4zMDZWMy45NzNhNC4xMTIgNC4xMTIgMCAwIDAtNC4xMTEgNC4xMTFoMS44MDRabTguNS4zNTRhNC40NjUgNC40NjUgMCAwIDAtNC40NjUtNC40NjZ2MS44MDVhMi42NiAyLjY2IDAgMCAxIDIuNjYgMi42NmgxLjgwNlpcIiBmaWxsPVwiI0E4QThBOFwiLz48L3N2Zz4nLFxuICAgIDI1MTM2NDEwNzY1MjAyOlxuICAgICAgJzxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCA0NCA0NFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0zMCAzMC42ODU4QzM0LjE4MzUgMjguMDI2MyAzNyAyMy4zMzE5IDM3IDE4QzM3IDkuNzE1NzMgMzAuMjg0MyAzIDIyIDNDMTMuNzE1NyAzIDcgOS43MTU3MyA3IDE4QzcgMjMuNDA1NSA5LjY5NTY0IDI4LjA3NDcgMTQgMzAuNzA5NlYzMS41QzE0IDM0LjUzNzYgMTYuNDYyNCAzNyAxOS41IDM3SDI1QzI3Ljc2MTQgMzcgMzAgMzQuNzYxNCAzMCAzMlYzMC42ODU4Wk0yMiA1QzE0LjgyMDMgNSA5IDEwLjgyMDMgOSAxOEM5IDIyLjkyMTQgMTEuNTQ3OSAyNy4wODk2IDE1LjU0NjggMjkuMjk2MUMxNS45ODc0IDI5LjUzOTIgMTYuMTcyNCAzMC4wNjU4IDE2IDMwLjUyMzJWMzEuNUMxNiAzMy40MzMgMTcuNTY3IDM1IDE5LjUgMzVIMjVDMjYuNjU2OSAzNSAyOCAzMy42NTY5IDI4IDMyVjMwLjVDMjggMzAuNDc1NyAyOC4wMDA5IDMwLjQ1MTYgMjguMDAyNiAzMC40Mjc4QzI3Ljg3NTMgMjkuOTk1NCAyOC4wNTQxIDI5LjUxNjEgMjguNDYxNiAyOS4yODA0QzMyLjM1MzEgMjcuMDI5MyAzNSAyMi44MDcgMzUgMThDMzUgMTAuODIwMyAyOS4xNzk3IDUgMjIgNVpcIiBmaWxsPVwiI0E4QThBOFwiLz48cGF0aCBkPVwiTTE3LjMxMjQgNDAuNDk1OEMxNy4zMTI0IDM5Ljk0MzYgMTcuNzYwMiAzOS40OTU4IDE4LjMxMjQgMzkuNDk1OEgyNS42ODc2QzI2LjIzOTggMzkuNDk1OCAyNi42ODc2IDM5Ljk0MzYgMjYuNjg3NiA0MC40OTU4QzI2LjY4NzYgNDEuMDQ4MSAyNi4yMzk4IDQxLjQ5NTggMjUuNjg3NiA0MS40OTU4SDE4LjMxMjRDMTcuNzYwMiA0MS40OTU4IDE3LjMxMjQgNDEuMDQ4MSAxNy4zMTI0IDQwLjQ5NThaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgfTtcblxuICBmdW5jdGlvbiBnZXREYXRhKHVybCkge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQb3N0KHR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgdXJsID0gYC9hcGkvdjIvaGVscF9jZW50ZXIvJHtsb2NhbGV9LyR7dHlwZX1gO1xuICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICBnZXREYXRhKHVybCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LCAuLi5kYXRhW3R5cGVdXTtcblxuICAgICAgICBpZiAoZGF0YS5uZXh0X3BhZ2UpIHtcbiAgICAgICAgICBjb25zdCBwYWdlQ291bnQgPSBkYXRhLnBhZ2VfY291bnQ7XG4gICAgICAgICAgbGV0IHN1Y2Nlc3NmdWxSZXF1ZXN0cyA9IDE7XG5cbiAgICAgICAgICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMjsgcGFnZU51bWJlciA8PSBwYWdlQ291bnQ7IHBhZ2VOdW1iZXIrKykge1xuICAgICAgICAgICAgZ2V0RGF0YShgJHt1cmx9P3BhZ2U9JHtwYWdlTnVtYmVyfWApLnRoZW4oKG90aGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LCAuLi5vdGhlckRhdGFbdHlwZV1dO1xuICAgICAgICAgICAgICBzdWNjZXNzZnVsUmVxdWVzdHMgKz0gMTtcblxuICAgICAgICAgICAgICBpZiAoc3VjY2Vzc2Z1bFJlcXVlc3RzID09PSBwYWdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0ge307XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrRGF0YSgpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5jYXRlZ29yaWVzICYmIHJlc3VsdC5zZWN0aW9ucyAmJiByZXN1bHQuYXJ0aWNsZXMpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZ2V0UG9zdCgnY2F0ZWdvcmllcycpLnRoZW4oKGNhdGVnb3JpZXMpID0+IHtcbiAgICAgICAgcmVzdWx0LmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xuICAgICAgICBjaGVja0RhdGEoKTtcbiAgICAgIH0pO1xuXG4gICAgICBnZXRQb3N0KCdzZWN0aW9ucycpLnRoZW4oKHNlY3Rpb25zKSA9PiB7XG4gICAgICAgIHJlc3VsdC5zZWN0aW9ucyA9IHNlY3Rpb25zO1xuICAgICAgICBjaGVja0RhdGEoKTtcbiAgICAgIH0pO1xuXG4gICAgICBnZXRQb3N0KCdhcnRpY2xlcycpLnRoZW4oKGFydGljbGVzKSA9PiB7XG4gICAgICAgIHJlc3VsdC5hcnRpY2xlcyA9IGFydGljbGVzO1xuICAgICAgICBjaGVja0RhdGEoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGlja0VsZW1lbnRCdXR0b24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICB9XG5cbiAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbmF2TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCduYXZpZ2F0aW9uX19saXN0LS1zaG93Jyk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2aWdhdGlvbl9fYnVyZ2VyLS1zaG93Jyk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFydGljbGVFbGVtZW50KHsgaWQsIG5hbWUsIGh0bWxfdXJsIH0sIGFjdGl2ZSkge1xuICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGV0IGNsYXNzTmFtZXMgPSAnbmF2aWdhdGlvbl9fYXJ0aWNsZS1pdGVtJztcblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzICsgJyBjdXJyZW50JztcbiAgICAgIGxpLmlubmVySFRNTCA9IGA8YT4ke25hbWV9PC9hPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpLmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHtodG1sX3VybH1cIj4ke25hbWV9PC9hPmA7XG4gICAgfVxuXG4gICAgbGkuY2xhc3NOYW1lID0gY2xhc3NOYW1lcztcblxuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25FbGVtZW50KHsgbmFtZSB9KSB7XG4gICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICBsaS5jbGFzc05hbWUgPSAnbmF2aWdhdGlvbl9fc2VjdGlvbi1pdGVtJztcbiAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjZcIiBoZWlnaHQ9XCI4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNNS4wMzIgMy42MTRhLjUuNSAwIDAgMSAwIC43NzJsLTMuOTY0IDMuMjdBLjUuNSAwIDAgMSAuMjUgNy4yN1YuNzNhLjUuNSAwIDAgMSAuODE4LS4zODVsMy45NjQgMy4yN1pcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxuICAgIGA7XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRWxlbWVudEJ1dHRvbik7XG5cbiAgICBsaS5hcHBlbmQoYnRuKTtcblxuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNhdGVnb3J5RWxlbWVudCh7IGlkLCBuYW1lIH0pIHtcbiAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgIGxpLmNsYXNzTmFtZSA9ICduYXZpZ2F0aW9uX19pdGVtJztcblxuICAgIGlmIChjYXRlZ29yeUljb25zW2lkXSkge1xuICAgICAgYnRuLmlubmVySFRNTCA9IGAke2NhdGVnb3J5SWNvbnNbaWRdfTxzcGFuIGlkPVwiJHtpZH1cIj4ke25hbWV9PC9zcGFuPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi5pbm5lckhUTUwgPSBgPHNwYW4gaWQ9XCIke2lkfVwiPiR7bmFtZX08L3NwYW4+YDtcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRWxlbWVudEJ1dHRvbik7XG5cbiAgICBsaS5hcHBlbmQoYnRuKTtcblxuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdOYXZpZ2F0aW9uKHsgY2F0ZWdvcmllcywgc2VjdGlvbnMsIGFydGljbGVzIH0pIHtcbiAgICBsZXQgZnJhZ21lbnQgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY2F0ZWdvcmllcy5zb3J0KChhLCBiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbik7XG4gICAgc2VjdGlvbnMuc29ydCgoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb24pO1xuICAgIGFydGljbGVzLnNvcnQoKGEsIGIpID0+IGEucG9zaXRpb24gLSBiLnBvc2l0aW9uKTtcblxuICAgIC8vIENhcmVnb3JpZXNcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XG4gICAgICBsZXQgY2F0ZWdvcnlFbGVtZW50ID0gY3JlYXRlQ2F0ZWdvcnlFbGVtZW50KGNhdGVnb3J5KTtcbiAgICAgIGxldCBzZWN0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICBzZWN0aW9uTGlzdC5jbGFzc05hbWUgPSAnbmF2aWdhdGlvbl9fc2VjdGlvbi1saXN0JztcbiAgICAgIC8vIFNlY3Rpb25zXG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChzZWN0aW9uLmNhdGVnb3J5X2lkID09PSBjYXRlZ29yeS5pZCkge1xuICAgICAgICAgIGxldCBzZWN0aW9uRWxlbWVudCA9IGNyZWF0ZVNlY3Rpb25FbGVtZW50KHNlY3Rpb24pO1xuICAgICAgICAgIGxldCBhcnRpY2xlTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgICAgYXJ0aWNsZUxpc3QuY2xhc3NOYW1lID0gJ25hdmlnYXRpb25fX2FydGljbGUtbGlzdCc7XG4gICAgICAgICAgLy8gQXJ0aWNsZXNcbiAgICAgICAgICBhcnRpY2xlcy5mb3JFYWNoKChhcnRpY2xlKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXJ0aWNsZS5zZWN0aW9uX2lkID09PSBzZWN0aW9uLmlkKSB7XG4gICAgICAgICAgICAgIGxldCBhY3RpdmUgPSBOdW1iZXIoYXJ0aWNsZS5pZCkgPT09IE51bWJlcihjdXJyZW50QXJ0aWNsZUlEKSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgbGV0IGFydGljbGVFbGVtZW50ID0gY3JlYXRlQXJ0aWNsZUVsZW1lbnQoYXJ0aWNsZSwgYWN0aXZlKTtcbiAgICAgICAgICAgICAgYXJ0aWNsZUxpc3QuYXBwZW5kKGFydGljbGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbkVsZW1lbnQuY2xhc3NOYW1lID0gc2VjdGlvbkVsZW1lbnQuY2xhc3NOYW1lICsgJyBjdXJyZW50IGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlFbGVtZW50LmNsYXNzTmFtZSA9IGNhdGVnb3J5RWxlbWVudC5jbGFzc05hbWUgKyAnIGN1cnJlbnQgYWN0aXZlJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2VjdGlvbkVsZW1lbnQuYXBwZW5kKGFydGljbGVMaXN0KTtcbiAgICAgICAgICBzZWN0aW9uTGlzdC5hcHBlbmQoc2VjdGlvbkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2F0ZWdvcnlFbGVtZW50LmFwcGVuZChzZWN0aW9uTGlzdCk7XG4gICAgICBmcmFnbWVudC5hcHBlbmQoY2F0ZWdvcnlFbGVtZW50KTtcbiAgICB9KTtcblxuICAgIG5hdkxpc3QuYXBwZW5kKGZyYWdtZW50KTtcbiAgfVxuXG4gIGdldE5hdmlnYXRpb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgZHJhd05hdmlnYXRpb24oZGF0YSk7XG4gIH0pO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICB3aW5kb3cuX19sYyA9IHdpbmRvdy5fX2xjIHx8IHt9O1xuICB3aW5kb3cuX19sYy5saWNlbnNlID0gODI1NDQ5MTtcbiAgd2luZG93Ll9fbGMuZ3JvdXAgPSAyO1xuXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgbGMuYXN5bmMgPSB0cnVlO1xuICAgIGxjLnNyYyA9ICgnaHR0cHM6JyA9PSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA/ICdodHRwczovLycgOiAnaHR0cDovLycpICsgJ2Nkbi5saXZlY2hhdGluYy5jb20vdHJhY2tpbmcuanMnO1xuICAgIHZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGMsIHMpO1xuICB9KSgpO1xuXG4gIHZhciBMQ19BUEkgPSBMQ19BUEkgfHwge307XG5cbiAgd2luZG93LkxDX0FQSSA9IExDX0FQSTtcbiAgTENfQVBJLm9uX2FmdGVyX2xvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgTENfQVBJLmRpc2FibGVfc291bmRzKCk7XG4gIH07XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI29wZW5MaXZlQ2hhdCcpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTENfQVBJLm9wZW5fY2hhdF93aW5kb3coKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdfQ==
