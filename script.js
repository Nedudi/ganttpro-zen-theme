"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  } // social share popups


  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  }); // In some cases we should preserve focus after page reload

  function saveFocus() {
    var activeElementId = document.activeElement.getAttribute('id');
    sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
  }

  var returnFocusTo = sessionStorage.getItem('returnFocusTo');

  if (returnFocusTo) {
    sessionStorage.removeItem('returnFocusTo');
    var returnFocusToEl = document.querySelector(returnFocusTo);
    returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
  } // show form controls when the textarea receives focus or backbutton is used and value exists


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
  } // Expand Request comment form when Add to conversation is clicked


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
  } // Mark as solved button


  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
      requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
      requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true); // Element.closest is not supported in IE11

      closest(this, 'form').submit();
    });
  } // Change Mark as solved text according to whether comment is filled


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
  } // Disable submit button if textarea is empty


  if (requestCommentTextarea && isEmpty(requestCommentTextarea.value)) {
    requestCommentSubmitButton.disabled = true;
  } // Submit requests filter form on status or organization change in the request list page


  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function (el) {
    el.addEventListener('change', function (e) {
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    });
  }); // Submit requests filter form on search in the request list page

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

  var burgerMenu = document.querySelector('.header .menu-button');
  var userMenu = document.querySelector('#user-nav');
  burgerMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleNavigation(this, userMenu);
  });
  userMenu.addEventListener('keyup', function (e) {
    if (e.keyCode === ESCAPE) {
      e.stopPropagation();
      closeNavigation(burgerMenu, this);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  } // Toggles expanded aria to collapsible elements


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
  }); // Submit organization form in the request page

  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function () {
      closest(this, 'form').submit();
    });
  } // If multibrand search has more than 5 help centers or categories collapse the list


  var multibrandFilterLists = document.querySelectorAll('.multibrand-filter-list');
  Array.prototype.forEach.call(multibrandFilterLists, function (filter) {
    if (filter.children.length > 6) {
      // Display the show more button
      var trigger = filter.querySelector('.see-all-filters');
      trigger.setAttribute('aria-hidden', false); // Add event handler for click

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove('multibrand-filter-list--collapsed');
      });
    }
  }); // If there are any error notifications below an input field, focus that field

  var notificationElm = document.querySelector('.notification-error');

  if (notificationElm && notificationElm.previousElementSibling && typeof notificationElm.previousElementSibling.focus === 'function') {
    notificationElm.previousElementSibling.focus();
  } // Dropdowns


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
    360003692677: ''
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
          (function () {
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
          })();
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
    var fragment = new DocumentFragment(); // Caregories

    categories.forEach(function (category) {
      var categoryElement = createCategoryElement(category);
      var sectionList = document.createElement('ul');
      sectionList.className = 'navigation__section-list'; // Sections

      sections.forEach(function (section) {
        if (section.category_id === category.id) {
          var sectionElement = createSectionElement(section);
          var articleList = document.createElement('ul');
          articleList.className = 'navigation__article-list'; // Articles

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoZW1lLmpzIiwibWFpbi5qcyIsIm5hdmlnYXRpb24uanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiRU5URVIiLCJFU0NBUEUiLCJTUEFDRSIsIlVQIiwiRE9XTiIsIlRBQiIsImNsb3Nlc3QiLCJlbGVtZW50Iiwic2VsZWN0b3IiLCJFbGVtZW50IiwicHJvdG90eXBlIiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsIkFycmF5IiwiZm9yRWFjaCIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYW5jaG9yIiwiZSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93Iiwib3BlbiIsImhyZWYiLCJzYXZlRm9jdXMiLCJhY3RpdmVFbGVtZW50SWQiLCJhY3RpdmVFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwicmV0dXJuRm9jdXNUbyIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwicmV0dXJuRm9jdXNUb0VsIiwicXVlcnlTZWxlY3RvciIsImZvY3VzIiwiY29tbWVudENvbnRhaW5lclRleHRhcmVhIiwiY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scyIsImZvY3VzQ29tbWVudENvbnRhaW5lclRleHRhcmVhIiwic3R5bGUiLCJkaXNwbGF5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwic2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlciIsInJlcXVlc3RDb21tZW50RmllbGRzIiwicmVxdWVzdENvbW1lbnRTdWJtaXQiLCJyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uIiwicmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94IiwicmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24iLCJzZXRBdHRyaWJ1dGUiLCJkaXNhYmxlZCIsInN1Ym1pdCIsInJlcXVlc3RDb21tZW50VGV4dGFyZWEiLCJ1c2VzV3lzaXd5ZyIsImRhdGFzZXQiLCJoZWxwZXIiLCJpc0VtcHR5UGxhaW50ZXh0IiwicyIsInRyaW0iLCJpc0VtcHR5SHRtbCIsInhtbCIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImltZyIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJpc0VtcHR5IiwiaW5uZXJUZXh0IiwiZWwiLCJzdG9wUHJvcGFnYXRpb24iLCJxdWlja1NlYXJjaCIsImtleUNvZGUiLCJ0b2dnbGVOYXZpZ2F0aW9uIiwidG9nZ2xlIiwibWVudSIsImlzRXhwYW5kZWQiLCJjbG9zZU5hdmlnYXRpb24iLCJidXJnZXJNZW51IiwidXNlck1lbnUiLCJsZW5ndGgiLCJjb2xsYXBzaWJsZSIsInJlcXVlc3RPcmdhbmlzYXRpb25TZWxlY3QiLCJtdWx0aWJyYW5kRmlsdGVyTGlzdHMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwicmVtb3ZlQ2hpbGQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJub3RpZmljYXRpb25FbG0iLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiRHJvcGRvd24iLCJtZW51UGxhY2VtZW50IiwidG9wIiwiY29udGFpbnMiLCJlbmQiLCJjbGlja0hhbmRsZXIiLCJiaW5kIiwidG9nZ2xlS2V5SGFuZGxlciIsIm1lbnVLZXlIYW5kbGVyIiwibWVudUl0ZW1zIiwic2xpY2UiLCJkaXNtaXNzIiwiaGFuZGxlT3ZlcmZsb3ciLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwib3ZlcmZsb3ciLCJyaWdodCIsImxlZnQiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJib3R0b20iLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImFkZCIsImZvY3VzTmV4dE1lbnVJdGVtIiwiY3VycmVudEl0ZW0iLCJjdXJyZW50SW5kZXgiLCJpbmRleE9mIiwibmV4dEluZGV4IiwiZm9jdXNQcmV2aW91c01lbnVJdGVtIiwicHJldmlvdXNJbmRleCIsImZpcnN0SXRlbSIsImxhc3RJdGVtIiwiY3VycmVudEVsZW1lbnQiLCJ0YXJnZXQiLCJzaGlmdEtleSIsImNsaWNrIiwiZHJvcGRvd25zIiwiZHJvcGRvd25Ub2dnbGVzIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwicHVzaCIsImV2dCIsImRyb3Bkb3duIiwiZm9vdGVyTmF2TGlzdCIsIlZJU0JMRV9JVEVNUyIsInN1Ym1lbnVzIiwicGFnZUxhbmciLCJkb2N1bWVudEVsZW1lbnQiLCJjcmVhdGVCdXR0b24iLCJidG4iLCJjcmVhdGVFbGVtZW50IiwibGFiZWwiLCJzaG93SXRlbXNPZk1lbnUiLCJjdXJyZW50VGFyZ2V0Iiwic3VibWVudSIsIml0ZW1zIiwiaSIsImhpZGVJdGVtc09mTWVudSIsImFwcGVuZCIsIm5hdmlnYXRpb24iLCJnZXRFbGVtZW50QnlJZCIsIm5hdkxpc3QiLCJidXJnZXIiLCJsb2NhbGUiLCJjdXJyZW50QXJ0aWNsZUlEIiwiYXJ0aWNsZUlkIiwiY2F0ZWdvcnlJY29ucyIsImdldERhdGEiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZ2V0UG9zdCIsInR5cGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsImRhdGEiLCJuZXh0X3BhZ2UiLCJwYWdlQ291bnQiLCJwYWdlX2NvdW50Iiwic3VjY2Vzc2Z1bFJlcXVlc3RzIiwicGFnZU51bWJlciIsIm90aGVyRGF0YSIsImdldE5hdmlnYXRpb24iLCJjaGVja0RhdGEiLCJjYXRlZ29yaWVzIiwic2VjdGlvbnMiLCJhcnRpY2xlcyIsIm9uQ2xpY2tFbGVtZW50QnV0dG9uIiwiY3JlYXRlQXJ0aWNsZUVsZW1lbnQiLCJhY3RpdmUiLCJpZCIsIm5hbWUiLCJodG1sX3VybCIsImxpIiwiY2xhc3NOYW1lcyIsImlubmVySFRNTCIsImNsYXNzTmFtZSIsImNyZWF0ZVNlY3Rpb25FbGVtZW50IiwiY3JlYXRlQ2F0ZWdvcnlFbGVtZW50IiwiZHJhd05hdmlnYXRpb24iLCJmcmFnbWVudCIsIkRvY3VtZW50RnJhZ21lbnQiLCJjYXRlZ29yeSIsImNhdGVnb3J5RWxlbWVudCIsInNlY3Rpb25MaXN0Iiwic2VjdGlvbiIsImNhdGVnb3J5X2lkIiwic2VjdGlvbkVsZW1lbnQiLCJhcnRpY2xlTGlzdCIsImFydGljbGUiLCJzZWN0aW9uX2lkIiwiTnVtYmVyIiwiYXJ0aWNsZUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFDQTtBQUNBLE1BQUFDLEtBQUEsR0FBQSxFQUFBO0FBQ0EsTUFBQUMsTUFBQSxHQUFBLEVBQUE7QUFDQSxNQUFBQyxLQUFBLEdBQUEsRUFBQTtBQUNBLE1BQUFDLEVBQUEsR0FBQSxFQUFBO0FBQ0EsTUFBQUMsSUFBQSxHQUFBLEVBQUE7QUFDQSxNQUFBQyxHQUFBLEdBQUEsQ0FBQTs7QUFFQSxXQUFBQyxPQUFBLENBQUFDLE9BQUEsRUFBQUMsUUFBQSxFQUFBO0FBQ0EsUUFBQUMsT0FBQSxDQUFBQyxTQUFBLENBQUFKLE9BQUEsRUFBQTtBQUNBLGFBQUFDLE9BQUEsQ0FBQUQsT0FBQSxDQUFBRSxRQUFBLENBQUE7QUFDQTs7QUFDQSxPQUFBO0FBQ0EsVUFDQUMsT0FBQSxDQUFBQyxTQUFBLENBQUFDLE9BQUEsSUFBQUosT0FBQSxDQUFBSSxPQUFBLENBQUFILFFBQUEsQ0FBQSxJQUNBQyxPQUFBLENBQUFDLFNBQUEsQ0FBQUUsaUJBQUEsSUFBQUwsT0FBQSxDQUFBSyxpQkFBQSxDQUFBSixRQUFBLENBREEsSUFFQUMsT0FBQSxDQUFBQyxTQUFBLENBQUFHLHFCQUFBLElBQUFOLE9BQUEsQ0FBQU0scUJBQUEsQ0FBQUwsUUFBQSxDQUhBLEVBSUE7QUFDQSxlQUFBRCxPQUFBO0FBQ0E7O0FBQ0FBLE1BQUFBLE9BQUEsR0FBQUEsT0FBQSxDQUFBTyxhQUFBLElBQUFQLE9BQUEsQ0FBQVEsVUFBQTtBQUNBLEtBVEEsUUFTQVIsT0FBQSxLQUFBLElBQUEsSUFBQUEsT0FBQSxDQUFBUyxRQUFBLEtBQUEsQ0FUQTs7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QUF0RCxNQUFBLENBQUEwRCxjQUFBOztBQUVBLGtCQUFBdkIsTUFBQSxFQUFBO0FBQ0FrQixnQkFBQUEsY0FBQSxDQUFBWCxTQUFBLEdBQUFXLGNBQUEsQ0FBQVgsU0FBQSxHQUFBLGlCQUFBO0FBQ0FPLGdCQUFBQSxlQUFBLENBQUFQLFNBQUEsR0FBQU8sZUFBQSxDQUFBUCxTQUFBLEdBQUEsaUJBQUE7QUFDQTtBQUNBO0FBQ0EsV0FYQTtBQWFBVyxVQUFBQSxjQUFBLENBQUFyRCxNQUFBLENBQUFzRCxXQUFBO0FBQ0FKLFVBQUFBLFdBQUEsQ0FBQWxELE1BQUEsQ0FBQXFELGNBQUE7QUFDQTtBQUNBLE9BdEJBO0FBd0JBSixNQUFBQSxlQUFBLENBQUFqRCxNQUFBLENBQUFrRCxXQUFBO0FBQ0FKLE1BQUFBLFFBQUEsQ0FBQTlDLE1BQUEsQ0FBQWlELGVBQUE7QUFDQSxLQS9CQTtBQWlDQTlDLElBQUFBLE9BQUEsQ0FBQUgsTUFBQSxDQUFBOEMsUUFBQTtBQUNBOztBQUVBbEIsRUFBQUEsYUFBQSxHQUFBaEIsSUFBQSxDQUFBLFVBQUFTLElBQUEsRUFBQTtBQUNBd0IsSUFBQUEsY0FBQSxDQUFBeEIsSUFBQSxDQUFBO0FBQ0EsR0FGQTtBQUdBLENBcE1BIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIC8vIEtleSBtYXBcbiAgdmFyIEVOVEVSID0gMTM7XG4gIHZhciBFU0NBUEUgPSAyNztcbiAgdmFyIFNQQUNFID0gMzI7XG4gIHZhciBVUCA9IDM4O1xuICB2YXIgRE9XTiA9IDQwO1xuICB2YXIgVEFCID0gOTtcblxuICBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBkbyB7XG4gICAgICBpZiAoXG4gICAgICAgIChFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzICYmIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHx8XG4gICAgICAgIChFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciAmJiBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSkgfHxcbiAgICAgICAgKEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciAmJiBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50IHx8IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gc29jaWFsIHNoYXJlIHBvcHVwc1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFyZSBhJyksIGZ1bmN0aW9uIChhbmNob3IpIHtcbiAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCAnJywgJ2hlaWdodCA9IDUwMCwgd2lkdGggPSA1MDAnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gSW4gc29tZSBjYXNlcyB3ZSBzaG91bGQgcHJlc2VydmUgZm9jdXMgYWZ0ZXIgcGFnZSByZWxvYWRcbiAgZnVuY3Rpb24gc2F2ZUZvY3VzKCkge1xuICAgIHZhciBhY3RpdmVFbGVtZW50SWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5Gb2N1c1RvJywgJyMnICsgYWN0aXZlRWxlbWVudElkKTtcbiAgfVxuICB2YXIgcmV0dXJuRm9jdXNUbyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JldHVybkZvY3VzVG8nKTtcbiAgaWYgKHJldHVybkZvY3VzVG8pIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdyZXR1cm5Gb2N1c1RvJyk7XG4gICAgdmFyIHJldHVybkZvY3VzVG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocmV0dXJuRm9jdXNUbyk7XG4gICAgcmV0dXJuRm9jdXNUb0VsICYmIHJldHVybkZvY3VzVG9FbC5mb2N1cyAmJiByZXR1cm5Gb2N1c1RvRWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8vIHNob3cgZm9ybSBjb250cm9scyB3aGVuIHRoZSB0ZXh0YXJlYSByZWNlaXZlcyBmb2N1cyBvciBiYWNrYnV0dG9uIGlzIHVzZWQgYW5kIHZhbHVlIGV4aXN0c1xuICB2YXIgY29tbWVudENvbnRhaW5lclRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY29udGFpbmVyIHRleHRhcmVhJyksXG4gICAgY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWZvcm0tY29udHJvbHMsIC5jb21tZW50LWNjcycpO1xuXG4gIGlmIChjb21tZW50Q29udGFpbmVyVGV4dGFyZWEpIHtcbiAgICBjb21tZW50Q29udGFpbmVyVGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbiBmb2N1c0NvbW1lbnRDb250YWluZXJUZXh0YXJlYSgpIHtcbiAgICAgIGNvbW1lbnRDb250YWluZXJGb3JtQ29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBjb21tZW50Q29udGFpbmVyVGV4dGFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmb2N1c0NvbW1lbnRDb250YWluZXJUZXh0YXJlYSk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29tbWVudENvbnRhaW5lclRleHRhcmVhLnZhbHVlICE9PSAnJykge1xuICAgICAgY29tbWVudENvbnRhaW5lckZvcm1Db250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gIH1cblxuICAvLyBFeHBhbmQgUmVxdWVzdCBjb21tZW50IGZvcm0gd2hlbiBBZGQgdG8gY29udmVyc2F0aW9uIGlzIGNsaWNrZWRcbiAgdmFyIHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLmNvbW1lbnQtc2hvdy1jb250YWluZXInXG4gICAgKSxcbiAgICByZXF1ZXN0Q29tbWVudEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgLmNvbW1lbnQtZmllbGRzJyksXG4gICAgcmVxdWVzdENvbW1lbnRTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVxdWVzdC1jb250YWluZXIgLmNvbW1lbnQtY29udGFpbmVyIC5yZXF1ZXN0LXN1Ym1pdC1jb21tZW50Jyk7XG5cbiAgaWYgKHNob3dSZXF1ZXN0Q29tbWVudENvbnRhaW5lclRyaWdnZXIpIHtcbiAgICBzaG93UmVxdWVzdENvbW1lbnRDb250YWluZXJUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2hvd1JlcXVlc3RDb21tZW50Q29udGFpbmVyVHJpZ2dlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChyZXF1ZXN0Q29tbWVudEZpZWxkcywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdENvbW1lbnRTdWJtaXQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXG4gICAgICBpZiAoY29tbWVudENvbnRhaW5lclRleHRhcmVhKSB7XG4gICAgICAgIGNvbW1lbnRDb250YWluZXJUZXh0YXJlYS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gTWFyayBhcyBzb2x2ZWQgYnV0dG9uXG4gIHZhciByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlcXVlc3QtY29udGFpbmVyIC5tYXJrLWFzLXNvbHZlZDpub3QoW2RhdGEtZGlzYWJsZWRdKScpLFxuICAgIHJlcXVlc3RNYXJrQXNTb2x2ZWRDaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1jaGVja2JveF0nKSxcbiAgICByZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXF1ZXN0LWNvbnRhaW5lciAuY29tbWVudC1jb250YWluZXIgaW5wdXRbdHlwZT1zdWJtaXRdJyk7XG5cbiAgaWYgKHJlcXVlc3RNYXJrQXNTb2x2ZWRCdXR0b24pIHtcbiAgICByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmVxdWVzdE1hcmtBc1NvbHZlZENoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgcmVxdWVzdENvbW1lbnRTdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgIC8vIEVsZW1lbnQuY2xvc2VzdCBpcyBub3Qgc3VwcG9ydGVkIGluIElFMTFcbiAgICAgIGNsb3Nlc3QodGhpcywgJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENoYW5nZSBNYXJrIGFzIHNvbHZlZCB0ZXh0IGFjY29yZGluZyB0byB3aGV0aGVyIGNvbW1lbnQgaXMgZmlsbGVkXG4gIHZhciByZXF1ZXN0Q29tbWVudFRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlcXVlc3QtY29udGFpbmVyIC5jb21tZW50LWNvbnRhaW5lciB0ZXh0YXJlYScpO1xuXG4gIHZhciB1c2VzV3lzaXd5ZyA9IHJlcXVlc3RDb21tZW50VGV4dGFyZWEgJiYgcmVxdWVzdENvbW1lbnRUZXh0YXJlYS5kYXRhc2V0LmhlbHBlciA9PT0gJ3d5c2l3eWcnO1xuXG4gIGZ1bmN0aW9uIGlzRW1wdHlQbGFpbnRleHQocykge1xuICAgIHJldHVybiBzLnRyaW0oKSA9PT0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5SHRtbCh4bWwpIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhgPF8+JHt4bWx9PC9fPmAsICd0ZXh0L3htbCcpO1xuICAgIHZhciBpbWcgPSBkb2MucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgcmV0dXJuIGltZyA9PT0gbnVsbCAmJiBpc0VtcHR5UGxhaW50ZXh0KGRvYy5jaGlsZHJlblswXS50ZXh0Q29udGVudCk7XG4gIH1cblxuICB2YXIgaXNFbXB0eSA9IHVzZXNXeXNpd3lnID8gaXNFbXB0eUh0bWwgOiBpc0VtcHR5UGxhaW50ZXh0O1xuXG4gIGlmIChyZXF1ZXN0Q29tbWVudFRleHRhcmVhKSB7XG4gICAgcmVxdWVzdENvbW1lbnRUZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0VtcHR5KHJlcXVlc3RDb21tZW50VGV4dGFyZWEudmFsdWUpKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uKSB7XG4gICAgICAgICAgcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5pbm5lclRleHQgPSByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zb2x2ZS10cmFuc2xhdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RDb21tZW50U3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uKSB7XG4gICAgICAgICAgcmVxdWVzdE1hcmtBc1NvbHZlZEJ1dHRvbi5pbm5lclRleHQgPSByZXF1ZXN0TWFya0FzU29sdmVkQnV0dG9uLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdkYXRhLXNvbHZlLWFuZC1zdWJtaXQtdHJhbnNsYXRpb24nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gRGlzYWJsZSBzdWJtaXQgYnV0dG9uIGlmIHRleHRhcmVhIGlzIGVtcHR5XG4gIGlmIChyZXF1ZXN0Q29tbWVudFRleHRhcmVhICYmIGlzRW1wdHkocmVxdWVzdENvbW1lbnRUZXh0YXJlYS52YWx1ZSkpIHtcbiAgICByZXF1ZXN0Q29tbWVudFN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICAvLyBTdWJtaXQgcmVxdWVzdHMgZmlsdGVyIGZvcm0gb24gc3RhdHVzIG9yIG9yZ2FuaXphdGlvbiBjaGFuZ2UgaW4gdGhlIHJlcXVlc3QgbGlzdCBwYWdlXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3JlcXVlc3Qtc3RhdHVzLXNlbGVjdCwgI3JlcXVlc3Qtb3JnYW5pemF0aW9uLXNlbGVjdCcpLFxuICAgIGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2F2ZUZvY3VzKCk7XG4gICAgICAgIGNsb3Nlc3QodGhpcywgJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcblxuICAvLyBTdWJtaXQgcmVxdWVzdHMgZmlsdGVyIGZvcm0gb24gc2VhcmNoIGluIHRoZSByZXF1ZXN0IGxpc3QgcGFnZVxuICB2YXIgcXVpY2tTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcXVpY2stc2VhcmNoJyk7XG4gIHF1aWNrU2VhcmNoICYmXG4gICAgcXVpY2tTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2F2ZUZvY3VzKCk7XG4gICAgICAgIGNsb3Nlc3QodGhpcywgJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICBmdW5jdGlvbiB0b2dnbGVOYXZpZ2F0aW9uKHRvZ2dsZSwgbWVudSkge1xuICAgIHZhciBpc0V4cGFuZGVkID0gbWVudS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgIWlzRXhwYW5kZWQpO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU5hdmlnYXRpb24odG9nZ2xlLCBtZW51KSB7XG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB0b2dnbGUuZm9jdXMoKTtcbiAgfVxuXG4gIHZhciBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlciAubWVudS1idXR0b24nKTtcbiAgdmFyIHVzZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXItbmF2Jyk7XG5cbiAgYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0b2dnbGVOYXZpZ2F0aW9uKHRoaXMsIHVzZXJNZW51KTtcbiAgfSk7XG5cbiAgdXNlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNsb3NlTmF2aWdhdGlvbihidXJnZXJNZW51LCB0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh1c2VyTWVudS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICBidXJnZXJNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICAvLyBUb2dnbGVzIGV4cGFuZGVkIGFyaWEgdG8gY29sbGFwc2libGUgZWxlbWVudHNcbiAgdmFyIGNvbGxhcHNpYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNpYmxlLW5hdiwgLmNvbGxhcHNpYmxlLXNpZGViYXInKTtcblxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNvbGxhcHNpYmxlLCBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgdG9nZ2xlID0gZWwucXVlcnlTZWxlY3RvcignLmNvbGxhcHNpYmxlLW5hdi10b2dnbGUsIC5jb2xsYXBzaWJsZS1zaWRlYmFyLXRvZ2dsZScpO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdG9nZ2xlTmF2aWdhdGlvbih0b2dnbGUsIHRoaXMpO1xuICAgIH0pO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgIGNsb3NlTmF2aWdhdGlvbih0b2dnbGUsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBTdWJtaXQgb3JnYW5pemF0aW9uIGZvcm0gaW4gdGhlIHJlcXVlc3QgcGFnZVxuICB2YXIgcmVxdWVzdE9yZ2FuaXNhdGlvblNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXF1ZXN0LW9yZ2FuaXphdGlvbiBzZWxlY3QnKTtcblxuICBpZiAocmVxdWVzdE9yZ2FuaXNhdGlvblNlbGVjdCkge1xuICAgIHJlcXVlc3RPcmdhbmlzYXRpb25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xvc2VzdCh0aGlzLCAnZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSWYgbXVsdGlicmFuZCBzZWFyY2ggaGFzIG1vcmUgdGhhbiA1IGhlbHAgY2VudGVycyBvciBjYXRlZ29yaWVzIGNvbGxhcHNlIHRoZSBsaXN0XG4gIHZhciBtdWx0aWJyYW5kRmlsdGVyTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubXVsdGlicmFuZC1maWx0ZXItbGlzdCcpO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG11bHRpYnJhbmRGaWx0ZXJMaXN0cywgZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIGlmIChmaWx0ZXIuY2hpbGRyZW4ubGVuZ3RoID4gNikge1xuICAgICAgLy8gRGlzcGxheSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgICAgdmFyIHRyaWdnZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignLnNlZS1hbGwtZmlsdGVycycpO1xuICAgICAgdHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuXG4gICAgICAvLyBBZGQgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tcbiAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0cmlnZ2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodHJpZ2dlcik7XG4gICAgICAgIGZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aWJyYW5kLWZpbHRlci1saXN0LS1jb2xsYXBzZWQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gSWYgdGhlcmUgYXJlIGFueSBlcnJvciBub3RpZmljYXRpb25zIGJlbG93IGFuIGlucHV0IGZpZWxkLCBmb2N1cyB0aGF0IGZpZWxkXG4gIHZhciBub3RpZmljYXRpb25FbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWZpY2F0aW9uLWVycm9yJyk7XG4gIGlmIChcbiAgICBub3RpZmljYXRpb25FbG0gJiZcbiAgICBub3RpZmljYXRpb25FbG0ucHJldmlvdXNFbGVtZW50U2libGluZyAmJlxuICAgIHR5cGVvZiBub3RpZmljYXRpb25FbG0ucHJldmlvdXNFbGVtZW50U2libGluZy5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICBub3RpZmljYXRpb25FbG0ucHJldmlvdXNFbGVtZW50U2libGluZy5mb2N1cygpO1xuICB9XG5cbiAgLy8gRHJvcGRvd25zXG5cbiAgZnVuY3Rpb24gRHJvcGRvd24odG9nZ2xlLCBtZW51KSB7XG4gICAgdGhpcy50b2dnbGUgPSB0b2dnbGU7XG4gICAgdGhpcy5tZW51ID0gbWVudTtcblxuICAgIHRoaXMubWVudVBsYWNlbWVudCA9IHtcbiAgICAgIHRvcDogbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUtdG9wJyksXG4gICAgICBlbmQ6IG1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LWVuZCcpLFxuICAgIH07XG5cbiAgICB0aGlzLnRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLnRvZ2dsZUtleUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5tZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm1lbnVLZXlIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlID0ge1xuICAgIGdldCBpc0V4cGFuZGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWVudS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICAgIH0sXG5cbiAgICBnZXQgbWVudUl0ZW1zKCkge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMubWVudS5xdWVyeVNlbGVjdG9yQWxsKFwiW3JvbGU9J21lbnVpdGVtJ11cIikpO1xuICAgIH0sXG5cbiAgICBkaXNtaXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNFeHBhbmRlZCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLm1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgdGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3Bkb3duLW1lbnUtZW5kJywgJ2Ryb3Bkb3duLW1lbnUtdG9wJyk7XG4gICAgfSxcblxuICAgIG9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHJldHVybjtcblxuICAgICAgdGhpcy5tZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgdGhpcy5oYW5kbGVPdmVyZmxvdygpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVPdmVyZmxvdzogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlY3QgPSB0aGlzLm1lbnUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIHZhciBvdmVyZmxvdyA9IHtcbiAgICAgICAgcmlnaHQ6IHJlY3QubGVmdCA8IDAgfHwgcmVjdC5sZWZ0ICsgcmVjdC53aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBib3R0b206IHJlY3QudG9wIDwgMCB8fCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgfTtcblxuICAgICAgaWYgKG92ZXJmbG93LnJpZ2h0IHx8IHRoaXMubWVudVBsYWNlbWVudC5lbmQpIHtcbiAgICAgICAgdGhpcy5tZW51LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duLW1lbnUtZW5kJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvdmVyZmxvdy5ib3R0b20gfHwgdGhpcy5tZW51UGxhY2VtZW50LnRvcCkge1xuICAgICAgICB0aGlzLm1lbnUuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24tbWVudS10b3AnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWVudS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XG4gICAgICAgIHRoaXMubWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wZG93bi1tZW51LXRvcCcpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmb2N1c05leHRNZW51SXRlbTogZnVuY3Rpb24gKGN1cnJlbnRJdGVtKSB7XG4gICAgICBpZiAoIXRoaXMubWVudUl0ZW1zLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5tZW51SXRlbXMuaW5kZXhPZihjdXJyZW50SXRlbSk7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ID09PSB0aGlzLm1lbnVJdGVtcy5sZW5ndGggLSAxIHx8IGN1cnJlbnRJbmRleCA8IDAgPyAwIDogY3VycmVudEluZGV4ICsgMTtcblxuICAgICAgdGhpcy5tZW51SXRlbXNbbmV4dEluZGV4XS5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBmb2N1c1ByZXZpb3VzTWVudUl0ZW06IGZ1bmN0aW9uIChjdXJyZW50SXRlbSkge1xuICAgICAgaWYgKCF0aGlzLm1lbnVJdGVtcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMubWVudUl0ZW1zLmluZGV4T2YoY3VycmVudEl0ZW0pO1xuICAgICAgdmFyIHByZXZpb3VzSW5kZXggPSBjdXJyZW50SW5kZXggPD0gMCA/IHRoaXMubWVudUl0ZW1zLmxlbmd0aCAtIDEgOiBjdXJyZW50SW5kZXggLSAxO1xuXG4gICAgICB0aGlzLm1lbnVJdGVtc1twcmV2aW91c0luZGV4XS5mb2N1cygpO1xuICAgIH0sXG5cbiAgICBjbGlja0hhbmRsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgICAgdGhpcy5kaXNtaXNzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlS2V5SGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGNhc2UgRE9XTjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c05leHRNZW51SXRlbSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVQOlxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICB0aGlzLmZvY3VzUHJldmlvdXNNZW51SXRlbSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICB0aGlzLmRpc21pc3MoKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5mb2N1cygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtZW51S2V5SGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBmaXJzdEl0ZW0gPSB0aGlzLm1lbnVJdGVtc1swXTtcbiAgICAgIHZhciBsYXN0SXRlbSA9IHRoaXMubWVudUl0ZW1zW3RoaXMubWVudUl0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgICAgIHRoaXMudG9nZ2xlLmZvY3VzKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRE9XTjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5mb2N1c05leHRNZW51SXRlbShjdXJyZW50RWxlbWVudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVVA6XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuZm9jdXNQcmV2aW91c01lbnVJdGVtKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUQUI6XG4gICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZmlyc3RJdGVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB0aGlzLmZvY3VzUHJldmlvdXNNZW51SXRlbShjdXJyZW50RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudCA9PT0gbGFzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuZGlzbWlzcygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzTmV4dE1lbnVJdGVtKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICB2YXIgZHJvcGRvd25zID0gW107XG4gIHZhciBkcm9wZG93blRvZ2dsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tdG9nZ2xlJykpO1xuXG4gIGRyb3Bkb3duVG9nZ2xlcy5mb3JFYWNoKGZ1bmN0aW9uICh0b2dnbGUpIHtcbiAgICB2YXIgbWVudSA9IHRvZ2dsZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKG1lbnUgJiYgbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUnKSkge1xuICAgICAgZHJvcGRvd25zLnB1c2gobmV3IERyb3Bkb3duKHRvZ2dsZSwgbWVudSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGRyb3Bkb3duKSB7XG4gICAgICBpZiAoIWRyb3Bkb3duLnRvZ2dsZS5jb250YWlucyhldnQudGFyZ2V0KSkge1xuICAgICAgICBkcm9wZG93bi5kaXNtaXNzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAvLyBoaWRlIG1lbnUgdG8gZm9vdGVyXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZm9vdGVyTmF2TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLWZvb3Rlcl9fbmF2LWxpc3QnKTtcblxuICAgIGlmICghZm9vdGVyTmF2TGlzdCkgcmV0dXJuO1xuXG4gICAgY29uc3QgVklTQkxFX0lURU1TID0gOTtcbiAgICBjb25zdCBzdWJtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaXRlLWZvb3Rlcl9fbmF2LWxpc3QgPiBsaScpO1xuICAgIGNvbnN0IHBhZ2VMYW5nID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFuZycpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKCkge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBsZXQgbGFiZWw7XG5cbiAgICAgIHN3aXRjaCAocGFnZUxhbmcpIHtcbiAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgIGxhYmVsID0gJ9C4INC00YDRg9Cz0L7QtSEnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlcyc6XG4gICAgICAgICAgbGFiZWwgPSAnwqF5IG3DoXMhJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsYWJlbCA9ICdhbmQgbW9yZSc7XG4gICAgICB9XG5cbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgYnRuLmNsYXNzTGlzdCA9ICdzaXRlLWZvb3Rlcl9fbmF2LW1vcmUnO1xuXG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHNob3dJdGVtc09mTWVudShldnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQucmVtb3ZlKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGJ0bjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93SXRlbXNPZk1lbnUoc3VibWVudSkge1xuICAgICAgY29uc3QgaXRlbXMgPSBzdWJtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9ICdsaXN0LWl0ZW0nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGVJdGVtc09mTWVudShzdWJtZW51KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IHN1Ym1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA+PSBWSVNCTEVfSVRFTVMpIHtcbiAgICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPiBWSVNCTEVfSVRFTVMpIHtcbiAgICAgICAgc3VibWVudS5hcHBlbmQoY3JlYXRlQnV0dG9uKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Ym1lbnVzLmZvckVhY2goKHN1Ym1lbnUpID0+IHtcbiAgICAgIGhpZGVJdGVtc09mTWVudShzdWJtZW51KTtcbiAgICB9KTtcbiAgfSkoKTtcbn0pO1xuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgbmF2aWdhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZpZ2F0aW9uJyk7XG5cbiAgaWYgKCFuYXZpZ2F0aW9uKSByZXR1cm47XG5cbiAgY29uc3QgbmF2TGlzdCA9IG5hdmlnYXRpb24ucXVlcnlTZWxlY3RvcignLm5hdmlnYXRpb25fX2xpc3QnKTtcbiAgY29uc3QgYnVyZ2VyID0gbmF2aWdhdGlvbi5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvbl9fYnVyZ2VyJyk7XG4gIGNvbnN0IGxvY2FsZSA9IG5hdmlnYXRpb24uZGF0YXNldC5sb2NhbGU7XG4gIGNvbnN0IGN1cnJlbnRBcnRpY2xlSUQgPSBuYXZpZ2F0aW9uLmRhdGFzZXQuYXJ0aWNsZUlkO1xuXG4gIGNvbnN0IGNhdGVnb3J5SWNvbnMgPSB7XG4gICAgMzYwMDAzNjE5NDk3OlxuICAgICAgJzxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0uODMyIDE1LjA3OGEuNzUuNzUgMCAwIDAgMS4wNjEgMS4wNjFsLTEuMDYtMS4wNlpNMjEuMTcgNi40MjRsLjczOC4xMzJhLjc1Ljc1IDAgMCAwLS44NjgtLjg3bC4xMy43MzhabS02LjE0OC4zMTRhLjc1Ljc1IDAgMSAwIC4yNTggMS40NzhsLS4yNTgtMS40NzhabTQuMzQgNS41NTdhLjc1Ljc1IDAgMCAwIDEuNDc3LjI2M2wtMS40NzYtLjI2M1pNMTEuOTcgMTUuNjFsLjUzLjUzMS0uNTMtLjUzWm0tMTAuMDc2LjUzIDQuNTk2LTQuNTk2LTEuMDYtMS4wNi00LjU5NyA0LjU5NSAxLjA2MSAxLjA2MVptNC4yNDMtNC41OTYgNC41OTYgNC41OTYgMS4wNi0xLjA2LTQuNTk2LTQuNTk3LTEuMDYgMS4wNlptNi4zNjMgNC41OTcgOS4yLTkuMTg1LTEuMDYtMS4wNjItOS4yIDkuMTg2IDEuMDYgMS4wNjFaTTIxLjA0IDUuNjg1bC02LjAxOCAxLjA1My4yNTggMS40NzhMMjEuMyA3LjE2M2wtLjI1OS0xLjQ3OFptLS42MDkuNjA4LTEuMDY4IDYuMDAyIDEuNDc2LjI2MyAxLjA2OS02LjAwMi0xLjQ3Ny0uMjYzWm0tOS42OTkgOS44NDZhMS4yNSAxLjI1IDAgMCAwIDEuNzY3LjAwMWwtMS4wNi0xLjA2MmEuMjUuMjUgMCAwIDEgLjM1NCAwbC0xLjA2IDEuMDYxWk02LjQ5IDExLjU0M2EuMjUuMjUgMCAwIDEtLjM1MyAwbDEuMDYtMS4wNmExLjI1IDEuMjUgMCAwIDAtMS43NjcgMGwxLjA2IDEuMDZaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICAzNjAwMDM2OTI2NTc6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOS45NiAzLjVhMi44MjkgMi44MjkgMCAwIDAtMi44MjUgMi44MzN2My4zNDloLTIuMzFBMi44MjkgMi44MjkgMCAwIDAgMiAxMi41MTV2NS4xNTJBMi44MjkgMi44MjkgMCAwIDAgNC44MjQgMjAuNWgxMy4zNTJBMi44MjkgMi44MjkgMCAwIDAgMjEgMTcuNjY3VjYuMzMzQTIuODI5IDIuODI5IDAgMCAwIDE4LjE3NiAzLjVIOS45NTlabTEuNDg5IDE1LjQ1NGg2LjcyN2MuNzA5IDAgMS4yODQtLjU3NiAxLjI4NC0xLjI4N1Y2LjMzM2MwLS43MS0uNTc1LTEuMjg4LTEuMjg0LTEuMjg4SDkuOTU5Yy0uNzA5IDAtMS4yODMuNTc3LTEuMjgzIDEuMjg4djMuMzQ5aC4yNTZhMi44MjkgMi44MjkgMCAwIDEgMi44MjUgMi44MzN2NS4xNTJjMCAuNDYzLS4xMTEuOTAxLS4zMDggMS4yODdabS02LjYyNS03LjcyN2MtLjcwOSAwLTEuMjgzLjU3Ny0xLjI4MyAxLjI4OHY1LjE1MmMwIC43MS41NzQgMS4yODcgMS4yODMgMS4yODdoNC4xMDhjLjcxIDAgMS4yODQtLjU3NiAxLjI4NC0xLjI4N3YtNS4xNTJjMC0uNzExLS41NzUtMS4yODgtMS4yODQtMS4yODhINC44MjRaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICAzNjAwMDM3MzUyOTc6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMTMuMDI5YTMuMDg2IDMuMDg2IDAgMSAwIDAtNi4xNzIgMy4wODYgMy4wODYgMCAwIDAgMCA2LjE3MlptMC0xLjU0M0ExLjU0MyAxLjU0MyAwIDEgMCAxMiA4LjRhMS41NDMgMS41NDMgMCAwIDAgMCAzLjA4NlpcIiBmaWxsPVwiI0E4QThBOFwiLz48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgM2E5IDkgMCAxIDAgMCAxOCA5IDkgMCAwIDAgMC0xOFptLTcuNDU3IDlhNy40NTcgNy40NTcgMCAxIDEgMTIuNDggNS41MTJsLS4yNDEtMS4wMmEyLjgyOSAyLjgyOSAwIDAgMC0yLjc1My0yLjE3OEg5Ljk3MWEyLjgyOSAyLjgyOSAwIDAgMC0yLjc1MyAyLjE3OWwtLjI0IDEuMDE5QTcuNDM4IDcuNDM4IDAgMCAxIDQuNTQyIDEyWm0zLjc4OCA2LjQ5NGE3LjQyMiA3LjQyMiAwIDAgMCAzLjY2OS45NjNjMS4zMzQgMCAyLjU4Ni0uMzUgMy42Ny0uOTYzbC0uMzktMS42NDdhMS4yODYgMS4yODYgMCAwIDAtMS4yNS0uOTlIOS45N2MtLjU5NSAwLTEuMTEzLjQxLTEuMjUuOTlsLS4zOSAxLjY0NlpcIiBmaWxsPVwiI0E4QThBOFwiLz48L3N2Zz4nLFxuICAgIDQ0MDYyNzk2NDAzMzc6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTQgNi40NDRBMi40NDQgMi40NDQgMCAwIDEgNi40NDQgNGg4Ljg1N2EyLjg4OSAyLjg4OSAwIDAgMSAyLjA0NC44NDZsMS44MDkgMS44MUEyLjg5IDIuODkgMCAwIDEgMjAgOC42OTh2OC44NTdBMi40NDQgMi40NDQgMCAwIDEgMTcuNTU2IDIwSDYuNDQ0QTIuNDQ0IDIuNDQ0IDAgMCAxIDQgMTcuNTU2VjYuNDQ0Wm0yLjQ0NC0xLjExYy0uNjEzIDAtMS4xMS40OTctMS4xMSAxLjExdjExLjExMmMwIC42MTMuNDk3IDEuMTEgMS4xMSAxLjExaC4yMjNWMTRhMiAyIDAgMCAxIDItMmg2LjY2NmEyIDIgMCAwIDEgMiAydjQuNjY3aC4yMjNjLjYxMyAwIDEuMTEtLjQ5OCAxLjExLTEuMTExVjguNjk5YzAtLjQxNC0uMTYzLS44MS0uNDU1LTEuMWwtMS44MS0xLjgxYTEuNTU2IDEuNTU2IDAgMCAwLS44NDUtLjQzNXYyLjQyNGEyIDIgMCAwIDEtMiAyaC00YTIgMiAwIDAgMS0yLTJWNS4zMzNINi40NDRaTTE2IDE4LjY2NlYxNGEuNjY2LjY2NiAwIDAgMC0uNjY3LS42NjdIOC42NjdBLjY2Ny42NjcgMCAwIDAgOCAxNHY0LjY2N2g4Wk04Ljg4OSA1LjMzM3YyLjQ0NWMwIC4zNjguMjk5LjY2Ni42NjcuNjY2aDRhLjY2Ny42NjcgMCAwIDAgLjY2Ni0uNjY2VjUuMzMzSDguODlaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICAzNjAwMDM2OTI3MTc6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTcgN2g0djEuNUg3YTMuNSAzLjUgMCAxIDAgMCA3aDRWMTdIN0E1IDUgMCAwIDEgNyA3Wk0xNyAxNS41aC00VjE3aDRhNSA1IDAgMCAwIDAtMTBoLTR2MS41aDRhMy41IDMuNSAwIDEgMSAwIDdaXCIgZmlsbD1cIiNBOEE4QThcIi8+PHBhdGggZD1cIk0xNiAxMi43NXYtMS41SDh2MS41aDhaXCIgZmlsbD1cIiNBOEE4QThcIi8+PC9zdmc+JyxcbiAgICAzNjAwMDM2MjU0Nzg6XG4gICAgICAnPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE3Ljg3NSA4LjY2N2gtMS44MTN2LTEuNjJBNC4wNTcgNC4wNTcgMCAwIDAgMTIgM2E0LjA1NyA0LjA1NyAwIDAgMC00LjA2MyA0LjA0OHYxLjYxOUg2LjEyNWMtLjg5NCAwLTEuNjI1LjcyOC0xLjYyNSAxLjYxOXY4LjA5NWMwIC44OS43MzEgMS42MTkgMS42MjUgMS42MTloMTEuNzVjLjg5NCAwIDEuNjI1LS43MjkgMS42MjUtMS42MTl2LTguMDk1YzAtLjg5LS43MzEtMS42Mi0xLjYyNS0xLjYyWm0tOC4zOTQtMS42MmMwLTEuMzg0IDEuMTMtMi41MDkgMi41MTktMi41MDlhMi41MTYgMi41MTYgMCAwIDEgMi41MTkgMi41MXYxLjYxOUg5LjQ4di0xLjYyWm04LjM5NCAxMS4zMzRINi4xMjV2LTguMDk1aDExLjc1djguMDk1WlwiIGZpbGw9XCIjQThBOEE4XCIvPjwvc3ZnPicsXG4gICAgMzYwMDAzNjkyNjc3OiAnJyxcbiAgfTtcblxuICBmdW5jdGlvbiBnZXREYXRhKHVybCkge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQb3N0KHR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgdXJsID0gYC9hcGkvdjIvaGVscF9jZW50ZXIvJHtsb2NhbGV9LyR7dHlwZX1gO1xuICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICBnZXREYXRhKHVybCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LCAuLi5kYXRhW3R5cGVdXTtcblxuICAgICAgICBpZiAoZGF0YS5uZXh0X3BhZ2UpIHtcbiAgICAgICAgICBjb25zdCBwYWdlQ291bnQgPSBkYXRhLnBhZ2VfY291bnQ7XG4gICAgICAgICAgbGV0IHN1Y2Nlc3NmdWxSZXF1ZXN0cyA9IDE7XG5cbiAgICAgICAgICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMjsgcGFnZU51bWJlciA8PSBwYWdlQ291bnQ7IHBhZ2VOdW1iZXIrKykge1xuICAgICAgICAgICAgZ2V0RGF0YShgJHt1cmx9P3BhZ2U9JHtwYWdlTnVtYmVyfWApLnRoZW4oKG90aGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LCAuLi5vdGhlckRhdGFbdHlwZV1dO1xuICAgICAgICAgICAgICBzdWNjZXNzZnVsUmVxdWVzdHMgKz0gMTtcblxuICAgICAgICAgICAgICBpZiAoc3VjY2Vzc2Z1bFJlcXVlc3RzID09PSBwYWdlQ291bnQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0ge307XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrRGF0YSgpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5jYXRlZ29yaWVzICYmIHJlc3VsdC5zZWN0aW9ucyAmJiByZXN1bHQuYXJ0aWNsZXMpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZ2V0UG9zdCgnY2F0ZWdvcmllcycpLnRoZW4oKGNhdGVnb3JpZXMpID0+IHtcbiAgICAgICAgcmVzdWx0LmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xuICAgICAgICBjaGVja0RhdGEoKTtcbiAgICAgIH0pO1xuXG4gICAgICBnZXRQb3N0KCdzZWN0aW9ucycpLnRoZW4oKHNlY3Rpb25zKSA9PiB7XG4gICAgICAgIHJlc3VsdC5zZWN0aW9ucyA9IHNlY3Rpb25zO1xuICAgICAgICBjaGVja0RhdGEoKTtcbiAgICAgIH0pO1xuXG4gICAgICBnZXRQb3N0KCdhcnRpY2xlcycpLnRoZW4oKGFydGljbGVzKSA9PiB7XG4gICAgICAgIHJlc3VsdC5hcnRpY2xlcyA9IGFydGljbGVzO1xuICAgICAgICBjaGVja0RhdGEoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGlja0VsZW1lbnRCdXR0b24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICB9XG5cbiAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbmF2TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCduYXZpZ2F0aW9uX19saXN0LS1zaG93Jyk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2aWdhdGlvbl9fYnVyZ2VyLS1zaG93Jyk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFydGljbGVFbGVtZW50KHsgaWQsIG5hbWUsIGh0bWxfdXJsIH0sIGFjdGl2ZSkge1xuICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGV0IGNsYXNzTmFtZXMgPSAnbmF2aWdhdGlvbl9fYXJ0aWNsZS1pdGVtJztcblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzICsgJyBjdXJyZW50JztcbiAgICAgIGxpLmlubmVySFRNTCA9IGA8YT4ke25hbWV9PC9hPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpLmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHtodG1sX3VybH1cIj4ke25hbWV9PC9hPmA7XG4gICAgfVxuXG4gICAgbGkuY2xhc3NOYW1lID0gY2xhc3NOYW1lcztcblxuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25FbGVtZW50KHsgbmFtZSB9KSB7XG4gICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICBsaS5jbGFzc05hbWUgPSAnbmF2aWdhdGlvbl9fc2VjdGlvbi1pdGVtJztcbiAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjZcIiBoZWlnaHQ9XCI4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNNS4wMzIgMy42MTRhLjUuNSAwIDAgMSAwIC43NzJsLTMuOTY0IDMuMjdBLjUuNSAwIDAgMSAuMjUgNy4yN1YuNzNhLjUuNSAwIDAgMSAuODE4LS4zODVsMy45NjQgMy4yN1pcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxuICAgIGA7XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRWxlbWVudEJ1dHRvbik7XG5cbiAgICBsaS5hcHBlbmQoYnRuKTtcblxuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNhdGVnb3J5RWxlbWVudCh7IGlkLCBuYW1lIH0pIHtcbiAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgIGxpLmNsYXNzTmFtZSA9ICduYXZpZ2F0aW9uX19pdGVtJztcblxuICAgIGlmIChjYXRlZ29yeUljb25zW2lkXSkge1xuICAgICAgYnRuLmlubmVySFRNTCA9IGAke2NhdGVnb3J5SWNvbnNbaWRdfTxzcGFuIGlkPVwiJHtpZH1cIj4ke25hbWV9PC9zcGFuPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ0bi5pbm5lckhUTUwgPSBgPHNwYW4gaWQ9XCIke2lkfVwiPiR7bmFtZX08L3NwYW4+YDtcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRWxlbWVudEJ1dHRvbik7XG5cbiAgICBsaS5hcHBlbmQoYnRuKTtcblxuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdOYXZpZ2F0aW9uKHsgY2F0ZWdvcmllcywgc2VjdGlvbnMsIGFydGljbGVzIH0pIHtcbiAgICBsZXQgZnJhZ21lbnQgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgLy8gQ2FyZWdvcmllc1xuICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgIGxldCBjYXRlZ29yeUVsZW1lbnQgPSBjcmVhdGVDYXRlZ29yeUVsZW1lbnQoY2F0ZWdvcnkpO1xuICAgICAgbGV0IHNlY3Rpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgIHNlY3Rpb25MaXN0LmNsYXNzTmFtZSA9ICduYXZpZ2F0aW9uX19zZWN0aW9uLWxpc3QnO1xuICAgICAgLy8gU2VjdGlvbnNcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKHNlY3Rpb24uY2F0ZWdvcnlfaWQgPT09IGNhdGVnb3J5LmlkKSB7XG4gICAgICAgICAgbGV0IHNlY3Rpb25FbGVtZW50ID0gY3JlYXRlU2VjdGlvbkVsZW1lbnQoc2VjdGlvbik7XG4gICAgICAgICAgbGV0IGFydGljbGVMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgICBhcnRpY2xlTGlzdC5jbGFzc05hbWUgPSAnbmF2aWdhdGlvbl9fYXJ0aWNsZS1saXN0JztcbiAgICAgICAgICAvLyBBcnRpY2xlc1xuICAgICAgICAgIGFydGljbGVzLmZvckVhY2goKGFydGljbGUpID0+IHtcbiAgICAgICAgICAgIGlmIChhcnRpY2xlLnNlY3Rpb25faWQgPT09IHNlY3Rpb24uaWQpIHtcbiAgICAgICAgICAgICAgbGV0IGFjdGl2ZSA9IE51bWJlcihhcnRpY2xlLmlkKSA9PT0gTnVtYmVyKGN1cnJlbnRBcnRpY2xlSUQpIHx8IGZhbHNlO1xuICAgICAgICAgICAgICBsZXQgYXJ0aWNsZUVsZW1lbnQgPSBjcmVhdGVBcnRpY2xlRWxlbWVudChhcnRpY2xlLCBhY3RpdmUpO1xuICAgICAgICAgICAgICBhcnRpY2xlTGlzdC5hcHBlbmQoYXJ0aWNsZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uRWxlbWVudC5jbGFzc05hbWUgPSBzZWN0aW9uRWxlbWVudC5jbGFzc05hbWUgKyAnIGN1cnJlbnQgYWN0aXZlJztcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUVsZW1lbnQuY2xhc3NOYW1lID0gY2F0ZWdvcnlFbGVtZW50LmNsYXNzTmFtZSArICcgY3VycmVudCBhY3RpdmUnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZWN0aW9uRWxlbWVudC5hcHBlbmQoYXJ0aWNsZUxpc3QpO1xuICAgICAgICAgIHNlY3Rpb25MaXN0LmFwcGVuZChzZWN0aW9uRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjYXRlZ29yeUVsZW1lbnQuYXBwZW5kKHNlY3Rpb25MaXN0KTtcbiAgICAgIGZyYWdtZW50LmFwcGVuZChjYXRlZ29yeUVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgbmF2TGlzdC5hcHBlbmQoZnJhZ21lbnQpO1xuICB9XG5cbiAgZ2V0TmF2aWdhdGlvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBkcmF3TmF2aWdhdGlvbihkYXRhKTtcbiAgfSk7XG59KTtcbiJdfQ==
