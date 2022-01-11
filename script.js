"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.addEventListener("DOMContentLoaded",function(){function t(e,t){if(Element.prototype.closest)return e.closest(t);do{if(Element.prototype.matches&&e.matches(t)||Element.prototype.msMatchesSelector&&e.msMatchesSelector(t)||Element.prototype.webkitMatchesSelector&&e.webkitMatchesSelector(t))return e}while(null!==(e=e.parentElement||e.parentNode)&&1===e.nodeType);return null}function n(){var e=document.activeElement.getAttribute("id");sessionStorage.setItem("returnFocusTo","#"+e)}Array.prototype.forEach.call(document.querySelectorAll(".share a"),function(e){e.addEventListener("click",function(e){e.preventDefault(),window.open(this.href,"","height = 500, width = 500")})});var e=sessionStorage.getItem("returnFocusTo");e&&(sessionStorage.removeItem("returnFocusTo"),(p=document.querySelector(e))&&p.focus&&p.focus());var r=document.querySelector(".comment-container textarea"),o=document.querySelector(".comment-form-controls, .comment-ccs");r&&(r.addEventListener("focus",function e(){o.style.display="block",r.removeEventListener("focus",e)}),""!==r.value&&(o.style.display="block"));var i=document.querySelector(".request-container .comment-container .comment-show-container"),a=document.querySelectorAll(".request-container .comment-container .comment-fields"),s=document.querySelector(".request-container .comment-container .request-submit-comment");i&&i.addEventListener("click",function(){i.style.display="none",Array.prototype.forEach.call(a,function(e){e.style.display="block"}),s.style.display="inline-block",r&&r.focus()});var c=document.querySelector(".request-container .mark-as-solved:not([data-disabled])"),u=document.querySelector(".request-container .comment-container input[type=checkbox]"),l=document.querySelector(".request-container .comment-container input[type=submit]");c&&c.addEventListener("click",function(){u.setAttribute("checked",!0),l.disabled=!0,this.setAttribute("data-disabled",!0),t(this,"form").submit()});var d=document.querySelector(".request-container .comment-container textarea");function m(e){return""===e.trim()}var f=d&&"wysiwyg"===d.dataset.helper?function(e){return null===(e=(new DOMParser).parseFromString("<_>".concat(e,"</_>"),"text/xml")).querySelector("img")&&m(e.children[0].textContent)}:m;d&&d.addEventListener("input",function(){f(d.value)?(c&&(c.innerText=c.getAttribute("data-solve-translation")),l.disabled=!0):(c&&(c.innerText=c.getAttribute("data-solve-and-submit-translation")),l.disabled=!1)}),d&&f(d.value)&&(l.disabled=!0),Array.prototype.forEach.call(document.querySelectorAll("#request-status-select, #request-organization-select"),function(e){e.addEventListener("change",function(e){e.stopPropagation(),n(),t(this,"form").submit()})});var p=document.querySelector("#quick-search");function h(e,t){var n="true"===t.getAttribute("aria-expanded");t.setAttribute("aria-expanded",!n),e.setAttribute("aria-expanded",!n)}function y(e,t){t.setAttribute("aria-expanded",!1),e.setAttribute("aria-expanded",!1),e.focus()}p&&p.addEventListener("keyup",function(e){13===e.keyCode&&(e.stopPropagation(),n(),t(this,"form").submit())});var v=document.querySelector(".header .menu-button"),g=document.querySelector("#user-nav");v.addEventListener("click",function(e){e.stopPropagation(),h(this,g)}),g.addEventListener("keyup",function(e){27===e.keyCode&&(e.stopPropagation(),y(v,this))}),0===g.children.length&&(v.style.display="none");p=document.querySelectorAll(".collapsible-nav, .collapsible-sidebar");Array.prototype.forEach.call(p,function(e){var t=e.querySelector(".collapsible-nav-toggle, .collapsible-sidebar-toggle");e.addEventListener("click",function(e){h(t,this)}),e.addEventListener("keyup",function(e){27===e.keyCode&&y(t,this)})});p=document.querySelector("#request-organization select");p&&p.addEventListener("change",function(){t(this,"form").submit()});p=document.querySelectorAll(".multibrand-filter-list");Array.prototype.forEach.call(p,function(t){var n;6<t.children.length&&((n=t.querySelector(".see-all-filters")).setAttribute("aria-hidden",!1),n.addEventListener("click",function(e){e.stopPropagation(),n.parentNode.removeChild(n),t.classList.remove("multibrand-filter-list--collapsed")}))});p=document.querySelector(".notification-error");function b(e,t){this.toggle=e,this.menu=t,this.menuPlacement={top:t.classList.contains("dropdown-menu-top"),end:t.classList.contains("dropdown-menu-end")},this.toggle.addEventListener("click",this.clickHandler.bind(this)),this.toggle.addEventListener("keydown",this.toggleKeyHandler.bind(this)),this.menu.addEventListener("keydown",this.menuKeyHandler.bind(this))}p&&p.previousElementSibling&&"function"==typeof p.previousElementSibling.focus&&p.previousElementSibling.focus(),b.prototype={get isExpanded(){return"true"===this.menu.getAttribute("aria-expanded")},get menuItems(){return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"))},dismiss:function(){this.isExpanded&&(this.menu.setAttribute("aria-expanded",!1),this.menu.classList.remove("dropdown-menu-end","dropdown-menu-top"))},open:function(){this.isExpanded||(this.menu.setAttribute("aria-expanded",!0),this.handleOverflow())},handleOverflow:function(){var e=this.menu.getBoundingClientRect(),t=e.left<0||e.left+e.width>window.innerWidth,e=e.top<0||e.top+e.height>window.innerHeight;(t||this.menuPlacement.end)&&this.menu.classList.add("dropdown-menu-end"),(e||this.menuPlacement.top)&&this.menu.classList.add("dropdown-menu-top"),this.menu.getBoundingClientRect().top<0&&this.menu.classList.remove("dropdown-menu-top")},focusNextMenuItem:function(e){this.menuItems.length&&(e=(e=this.menuItems.indexOf(e))===this.menuItems.length-1||e<0?0:e+1,this.menuItems[e].focus())},focusPreviousMenuItem:function(e){this.menuItems.length&&(e=(e=this.menuItems.indexOf(e))<=0?this.menuItems.length-1:e-1,this.menuItems[e].focus())},clickHandler:function(){this.isExpanded?this.dismiss():this.open()},toggleKeyHandler:function(e){switch(e.keyCode){case 13:case 32:case 40:e.preventDefault(),this.open(),this.focusNextMenuItem();break;case 38:e.preventDefault(),this.open(),this.focusPreviousMenuItem();break;case 27:this.dismiss(),this.toggle.focus()}},menuKeyHandler:function(e){var t=this.menuItems[0],n=this.menuItems[this.menuItems.length-1],r=e.target;switch(e.keyCode){case 27:this.dismiss(),this.toggle.focus();break;case 40:e.preventDefault(),this.focusNextMenuItem(r);break;case 38:e.preventDefault(),this.focusPreviousMenuItem(r);break;case 9:e.shiftKey?r===t?this.dismiss():(e.preventDefault(),this.focusPreviousMenuItem(r)):r===n?this.dismiss():(e.preventDefault(),this.focusNextMenuItem(r));break;case 13:case 32:e.preventDefault(),r.click()}}};var E=[];Array.prototype.slice.call(document.querySelectorAll(".dropdown-toggle")).forEach(function(e){var t=e.nextElementSibling;t&&t.classList.contains("dropdown-menu")&&E.push(new b(e,t))}),document.addEventListener("click",function(t){E.forEach(function(e){e.toggle.contains(t.target)||e.dismiss()})})}),document.addEventListener("DOMContentLoaded",function(){function r(){var e,t=document.createElement("button");switch(n){case"ru":e="и другое!";break;case"es":e="¡y más!";break;default:e="and more"}return t.textContent=e,t.classList="site-footer__nav-more",t.addEventListener("click",function(e){e.preventDefault(),function(e){for(var t=e.querySelectorAll("li"),n=0;n<t.length;n++)t[n].style.display="list-item"}(e.currentTarget.parentElement),e.currentTarget.remove()}),t}var e,n;document.querySelector(".site-footer__nav-list")&&(e=document.querySelectorAll(".site-footer__nav-list > li"),n=document.documentElement.getAttribute("lang"),e.forEach(function(e){!function(e){for(var t=e.querySelectorAll("li"),n=0;n<t.length;n++)9<=n&&(t[n].style.display="none");9<t.length&&e.append(r())}(e)}))}),document.addEventListener("DOMContentLoaded",function(){var n,e,t,l,r=document.getElementById("navigation");function c(e){return fetch(e).then(function(e){return e.json()})}function o(s){return new Promise(function(o,e){var i="/api/v2/help_center/".concat(t,"/").concat(s),a=[];c(i).then(function(r){a=[].concat(_toConsumableArray(a),_toConsumableArray(r[s])),r.next_page?function(){for(var t=r.page_count,n=1,e=2;e<=t;e++)c("".concat(i,"?page=").concat(e)).then(function(e){a=[].concat(_toConsumableArray(a),_toConsumableArray(e[s])),(n+=1)===t&&o(a)})}():o(a)})})}function d(e){e.preventDefault(),e.currentTarget.parentElement.classList.toggle("active")}function i(e){var t=e.categories,r=e.sections,u=e.articles,o=new DocumentFragment;t.forEach(function(a){var e,t,n,s=(t=(e=a).name,n=document.createElement("li"),e=document.createElement("button"),n.className="navigation__item",e.innerText=t,e.addEventListener("click",d),n.append(e),n),c=document.createElement("ul");c.className="navigation__section-list",r.forEach(function(n){var r,o,e,t,i;n.category_id===a.id&&(t=(e=n).name,i=document.createElement("li"),e=document.createElement("button"),i.className="navigation__section-item",e.innerText=t,e.addEventListener("click",d),i.append(e),r=i,(o=document.createElement("ul")).className="navigation__article-list",u.forEach(function(e){var t;e.section_id===n.id&&(e=function(e,t){e.id;var n=e.name,r=e.html_url,o=document.createElement("li"),e="navigation__article-item";return t?(e+=" current",o.innerHTML="<a>".concat(n,"</a>")):o.innerHTML='<a href="'.concat(r,'">').concat(n,"</a>"),o.className=e,o}(e,t=Number(e.id)===Number(l)||!1),o.append(e),t&&(r.className=r.className+" current active",s.className=s.className+" current active"))}),r.append(o),c.append(r))}),s.append(c),o.append(s)}),n.append(o)}r&&(n=r.querySelector(".navigation__list"),e=r.querySelector(".navigation__burger"),t=r.dataset.locale,l=r.dataset.articleId,e.addEventListener("click",function(e){e.preventDefault(),n.classList.toggle("navigation__list--show"),e.currentTarget.classList.toggle("navigation__burger--show")}),new Promise(function(e,t){var n={};function r(){n.categories&&n.sections&&n.articles&&e(n)}o("categories").then(function(e){n.categories=e,r()}),o("sections").then(function(e){n.sections=e,r()}),o("articles").then(function(e){n.articles=e,r()})}).then(function(e){i(e)}))});