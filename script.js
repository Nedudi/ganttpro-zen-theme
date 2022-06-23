"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}document.addEventListener("DOMContentLoaded",function(){function t(e,t){if(Element.prototype.closest)return e.closest(t);do{if(Element.prototype.matches&&e.matches(t)||Element.prototype.msMatchesSelector&&e.msMatchesSelector(t)||Element.prototype.webkitMatchesSelector&&e.webkitMatchesSelector(t))return e}while(null!==(e=e.parentElement||e.parentNode)&&1===e.nodeType);return null}function n(){var e=document.activeElement.getAttribute("id");sessionStorage.setItem("returnFocusTo","#"+e)}Array.prototype.forEach.call(document.querySelectorAll(".share a"),function(e){e.addEventListener("click",function(e){e.preventDefault(),window.open(this.href,"","height = 500, width = 500")})});var e=sessionStorage.getItem("returnFocusTo");e&&(sessionStorage.removeItem("returnFocusTo"),(v=document.querySelector(e))&&v.focus&&v.focus());var o=document.querySelector(".comment-container textarea"),i=document.querySelector(".comment-form-controls, .comment-ccs");o&&(o.addEventListener("focus",function e(){i.style.display="block",o.removeEventListener("focus",e)}),""!==o.value&&(i.style.display="block"));var r=document.querySelector(".request-container .comment-container .comment-show-container"),a=document.querySelectorAll(".request-container .comment-container .comment-fields"),c=document.querySelector(".request-container .comment-container .request-submit-comment");r&&r.addEventListener("click",function(){r.style.display="none",Array.prototype.forEach.call(a,function(e){e.style.display="block"}),c.style.display="inline-block",o&&o.focus()});var s=document.querySelector(".request-container .mark-as-solved:not([data-disabled])"),l=document.querySelector(".request-container .comment-container input[type=checkbox]"),u=document.querySelector(".request-container .comment-container input[type=submit]");s&&s.addEventListener("click",function(){l.setAttribute("checked",!0),u.disabled=!0,this.setAttribute("data-disabled",!0),t(this,"form").submit()});var d=document.querySelector(".request-container .comment-container textarea");function m(e){return""===e.trim()}var h=d&&"wysiwyg"===d.dataset.helper?function(e){return null===(e=(new DOMParser).parseFromString("<_>".concat(e,"</_>"),"text/xml")).querySelector("img")&&m(e.children[0].textContent)}:m;d&&d.addEventListener("input",function(){h(d.value)?(s&&(s.innerText=s.getAttribute("data-solve-translation")),u.disabled=!0):(s&&(s.innerText=s.getAttribute("data-solve-and-submit-translation")),u.disabled=!1)}),d&&h(d.value)&&(u.disabled=!0),Array.prototype.forEach.call(document.querySelectorAll("#request-status-select, #request-organization-select"),function(e){e.addEventListener("change",function(e){e.stopPropagation(),n(),t(this,"form").submit()})});var v=document.querySelector("#quick-search");v&&v.addEventListener("keyup",function(e){13===e.keyCode&&(e.stopPropagation(),n(),t(this,"form").submit())});v=document.querySelectorAll(".collapsible-nav, .collapsible-sidebar");Array.prototype.forEach.call(v,function(e){var i=e.querySelector(".collapsible-nav-toggle, .collapsible-sidebar-toggle");e.addEventListener("click",function(e){var t,n,o;t=i,o="true"===(n=this).getAttribute("aria-expanded"),n.setAttribute("aria-expanded",!o),t.setAttribute("aria-expanded",!o)}),e.addEventListener("keyup",function(e){27===e.keyCode&&(e=i,this.setAttribute("aria-expanded",!1),e.setAttribute("aria-expanded",!1),e.focus())})});v=document.querySelector("#request-organization select");v&&v.addEventListener("change",function(){t(this,"form").submit()});v=document.querySelectorAll(".multibrand-filter-list");Array.prototype.forEach.call(v,function(t){var n;6<t.children.length&&((n=t.querySelector(".see-all-filters")).setAttribute("aria-hidden",!1),n.addEventListener("click",function(e){e.stopPropagation(),n.parentNode.removeChild(n),t.classList.remove("multibrand-filter-list--collapsed")}))});v=document.querySelector(".notification-error");function p(e,t){this.toggle=e,this.menu=t,this.menuPlacement={top:t.classList.contains("dropdown-menu-top"),end:t.classList.contains("dropdown-menu-end")},this.toggle.addEventListener("click",this.clickHandler.bind(this)),this.toggle.addEventListener("keydown",this.toggleKeyHandler.bind(this)),this.menu.addEventListener("keydown",this.menuKeyHandler.bind(this))}v&&v.previousElementSibling&&"function"==typeof v.previousElementSibling.focus&&v.previousElementSibling.focus(),p.prototype={get isExpanded(){return"true"===this.menu.getAttribute("aria-expanded")},get menuItems(){return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"))},dismiss:function(){this.isExpanded&&(this.menu.setAttribute("aria-expanded",!1),this.menu.classList.remove("dropdown-menu-end","dropdown-menu-top"))},open:function(){this.isExpanded||(this.menu.setAttribute("aria-expanded",!0),this.handleOverflow())},handleOverflow:function(){var e=this.menu.getBoundingClientRect(),t=e.left<0||e.left+e.width>window.innerWidth,e=e.top<0||e.top+e.height>window.innerHeight;(t||this.menuPlacement.end)&&this.menu.classList.add("dropdown-menu-end"),(e||this.menuPlacement.top)&&this.menu.classList.add("dropdown-menu-top"),this.menu.getBoundingClientRect().top<0&&this.menu.classList.remove("dropdown-menu-top")},focusNextMenuItem:function(e){this.menuItems.length&&(e=(e=this.menuItems.indexOf(e))===this.menuItems.length-1||e<0?0:e+1,this.menuItems[e].focus())},focusPreviousMenuItem:function(e){this.menuItems.length&&(e=(e=this.menuItems.indexOf(e))<=0?this.menuItems.length-1:e-1,this.menuItems[e].focus())},clickHandler:function(){this.isExpanded?this.dismiss():this.open()},toggleKeyHandler:function(e){switch(e.keyCode){case 13:case 32:case 40:e.preventDefault(),this.open(),this.focusNextMenuItem();break;case 38:e.preventDefault(),this.open(),this.focusPreviousMenuItem();break;case 27:this.dismiss(),this.toggle.focus()}},menuKeyHandler:function(e){var t=this.menuItems[0],n=this.menuItems[this.menuItems.length-1],o=e.target;switch(e.keyCode){case 27:this.dismiss(),this.toggle.focus();break;case 40:e.preventDefault(),this.focusNextMenuItem(o);break;case 38:e.preventDefault(),this.focusPreviousMenuItem(o);break;case 9:e.shiftKey?o===t?this.dismiss():(e.preventDefault(),this.focusPreviousMenuItem(o)):o===n?this.dismiss():(e.preventDefault(),this.focusNextMenuItem(o));break;case 13:case 32:e.preventDefault(),o.click()}}};var f=[];Array.prototype.slice.call(document.querySelectorAll(".dropdown-toggle")).forEach(function(e){var t=e.nextElementSibling;t&&t.classList.contains("dropdown-menu")&&f.push(new p(e,t))}),document.addEventListener("click",function(t){f.forEach(function(e){e.toggle.contains(t.target)||e.dismiss()})})}),document.addEventListener("DOMContentLoaded",function(){function o(){var e,t=document.createElement("button");switch(n){case"ru":e="и другое!";break;case"es":e="¡y más!";break;default:e="and more"}return t.textContent=e,t.classList="site-footer__nav-more",t.addEventListener("click",function(e){e.preventDefault(),function(e){for(var t=e.querySelectorAll("li"),n=0;n<t.length;n++)t[n].style.display="list-item"}(e.currentTarget.parentElement),e.currentTarget.remove()}),t}var e,n;document.querySelector(".site-footer__nav-list")&&(e=document.querySelectorAll(".site-footer__nav-list > li"),n=document.documentElement.getAttribute("lang"),e.forEach(function(e){!function(e){for(var t=e.querySelectorAll("li"),n=0;n<t.length;n++)9<=n&&(t[n].style.display="none");9<t.length&&e.append(o())}(e)}))}),document.addEventListener("DOMContentLoaded",function(){var n,e,t,u,d,o=document.getElementById("navigation");function s(e){return fetch(e).then(function(e){return e.json()})}function i(c){return new Promise(function(i,e){var r="/api/v2/help_center/".concat(t,"/").concat(c),a=[];s(r).then(function(o){a=[].concat(_toConsumableArray(a),_toConsumableArray(o[c])),o.next_page?function(){for(var t=o.page_count,n=1,e=2;e<=t;e++)s("".concat(r,"?page=").concat(e)).then(function(e){a=[].concat(_toConsumableArray(a),_toConsumableArray(e[c])),(n+=1)===t&&i(a)})}():i(a)})})}function m(e){e.preventDefault(),e.currentTarget.parentElement.classList.toggle("active")}function r(e){var t=e.categories,i=e.sections,l=e.articles,r=new DocumentFragment;t.sort(function(e,t){return e.position-t.position}),i.sort(function(e,t){return e.position-t.position}),l.sort(function(e,t){return e.position-t.position}),t.forEach(function(a){var e,t,n,o,c=(t=(e=a).id,n=e.name,o=document.createElement("li"),e=document.createElement("button"),o.className="navigation__item",d[t]?e.innerHTML="".concat(d[t],'<span id="').concat(t,'">').concat(n,"</span>"):e.innerHTML='<span id="'.concat(t,'">').concat(n,"</span>"),e.addEventListener("click",m),o.append(e),o),s=document.createElement("ul");s.className="navigation__section-list",i.forEach(function(n){var o,i,e,t,r;n.category_id===a.id&&(t=(e=n).name,r=document.createElement("li"),e=document.createElement("button"),r.className="navigation__section-item",e.innerHTML='\n      <svg width="6" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M5.032 3.614a.5.5 0 0 1 0 .772l-3.964 3.27A.5.5 0 0 1 .25 7.27V.73a.5.5 0 0 1 .818-.385l3.964 3.27Z" />\n      </svg>\n      <span>'.concat(t,"</span>\n    "),e.addEventListener("click",m),r.append(e),o=r,(i=document.createElement("ul")).className="navigation__article-list",l.forEach(function(e){var t;e.section_id===n.id&&(e=function(e,t){e.id;var n=e.name,o=e.html_url,i=document.createElement("li"),e="navigation__article-item";return t?(e+=" current",i.innerHTML="<a>".concat(n,"</a>")):i.innerHTML='<a href="'.concat(o,'">').concat(n,"</a>"),i.className=e,i}(e,t=Number(e.id)===Number(u)||!1),i.append(e),t&&(o.className=o.className+" current active",c.className=c.className+" current active"))}),o.append(i),s.append(o))}),c.append(s),r.append(c)}),n.append(r)}o&&(n=o.querySelector(".navigation__list"),e=o.querySelector(".navigation__burger"),t=o.dataset.locale,u=o.dataset.articleId,d={360003619497:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.832 15.078a.75.75 0 0 0 1.061 1.061l-1.06-1.06ZM21.17 6.424l.738.132a.75.75 0 0 0-.868-.87l.13.738Zm-6.148.314a.75.75 0 1 0 .258 1.478l-.258-1.478Zm4.34 5.557a.75.75 0 0 0 1.477.263l-1.476-.263ZM11.97 15.61l.53.531-.53-.53Zm-10.076.53 4.596-4.596-1.06-1.06-4.597 4.595 1.061 1.061Zm4.243-4.596 4.596 4.596 1.06-1.06-4.596-4.597-1.06 1.06Zm6.363 4.597 9.2-9.185-1.06-1.062-9.2 9.186 1.06 1.061ZM21.04 5.685l-6.018 1.053.258 1.478L21.3 7.163l-.259-1.478Zm-.609.608-1.068 6.002 1.476.263 1.069-6.002-1.477-.263Zm-9.699 9.846a1.25 1.25 0 0 0 1.767.001l-1.06-1.062a.25.25 0 0 1 .354 0l-1.06 1.061ZM6.49 11.543a.25.25 0 0 1-.353 0l1.06-1.06a1.25 1.25 0 0 0-1.767 0l1.06 1.06Z" fill="#A8A8A8"/></svg>',360003692657:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.96 3.5a2.829 2.829 0 0 0-2.825 2.833v3.349h-2.31A2.829 2.829 0 0 0 2 12.515v5.152A2.829 2.829 0 0 0 4.824 20.5h13.352A2.829 2.829 0 0 0 21 17.667V6.333A2.829 2.829 0 0 0 18.176 3.5H9.959Zm1.489 15.454h6.727c.709 0 1.284-.576 1.284-1.287V6.333c0-.71-.575-1.288-1.284-1.288H9.959c-.709 0-1.283.577-1.283 1.288v3.349h.256a2.829 2.829 0 0 1 2.825 2.833v5.152c0 .463-.111.901-.308 1.287Zm-6.625-7.727c-.709 0-1.283.577-1.283 1.288v5.152c0 .71.574 1.287 1.283 1.287h4.108c.71 0 1.284-.576 1.284-1.287v-5.152c0-.711-.575-1.288-1.284-1.288H4.824Z" fill="#A8A8A8"/></svg>',360003735297:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.029a3.086 3.086 0 1 0 0-6.172 3.086 3.086 0 0 0 0 6.172Zm0-1.543A1.543 1.543 0 1 0 12 8.4a1.543 1.543 0 0 0 0 3.086Z" fill="#A8A8A8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7.457 9a7.457 7.457 0 1 1 12.48 5.512l-.241-1.02a2.829 2.829 0 0 0-2.753-2.178H9.971a2.829 2.829 0 0 0-2.753 2.179l-.24 1.019A7.438 7.438 0 0 1 4.542 12Zm3.788 6.494a7.422 7.422 0 0 0 3.669.963c1.334 0 2.586-.35 3.67-.963l-.39-1.647a1.286 1.286 0 0 0-1.25-.99H9.97c-.595 0-1.113.41-1.25.99l-.39 1.646Z" fill="#A8A8A8"/></svg>',4406279640337:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6.444A2.444 2.444 0 0 1 6.444 4h8.857a2.889 2.889 0 0 1 2.044.846l1.809 1.81A2.89 2.89 0 0 1 20 8.698v8.857A2.444 2.444 0 0 1 17.556 20H6.444A2.444 2.444 0 0 1 4 17.556V6.444Zm2.444-1.11c-.613 0-1.11.497-1.11 1.11v11.112c0 .613.497 1.11 1.11 1.11h.223V14a2 2 0 0 1 2-2h6.666a2 2 0 0 1 2 2v4.667h.223c.613 0 1.11-.498 1.11-1.111V8.699c0-.414-.163-.81-.455-1.1l-1.81-1.81a1.556 1.556 0 0 0-.845-.435v2.424a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5.333H6.444ZM16 18.666V14a.666.666 0 0 0-.667-.667H8.667A.667.667 0 0 0 8 14v4.667h8ZM8.889 5.333v2.445c0 .368.299.666.667.666h4a.667.667 0 0 0 .666-.666V5.333H8.89Z" fill="#A8A8A8"/></svg>',360003692717:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h4v1.5H7a3.5 3.5 0 1 0 0 7h4V17H7A5 5 0 0 1 7 7ZM17 15.5h-4V17h4a5 5 0 0 0 0-10h-4v1.5h4a3.5 3.5 0 1 1 0 7Z" fill="#A8A8A8"/><path d="M16 12.75v-1.5H8v1.5h8Z" fill="#A8A8A8"/></svg>',360003625478:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.875 8.667h-1.813v-1.62A4.057 4.057 0 0 0 12 3a4.057 4.057 0 0 0-4.063 4.048v1.619H6.125c-.894 0-1.625.728-1.625 1.619v8.095c0 .89.731 1.619 1.625 1.619h11.75c.894 0 1.625-.729 1.625-1.619v-8.095c0-.89-.731-1.62-1.625-1.62Zm-8.394-1.62c0-1.384 1.13-2.509 2.519-2.509a2.516 2.516 0 0 1 2.519 2.51v1.619H9.48v-1.62Zm8.394 11.334H6.125v-8.095h11.75v8.095Z" fill="#A8A8A8"/></svg>',5250879378961:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3.5 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7.507 11h12.986c.556 0 1.007.42 1.007.94v.12c0 .52-.45.94-1.007.94H7.507c-.556 0-1.007-.42-1.007-.94v-.12c0-.52.45-.94 1.007-.94ZM20.493 16H7.507c-.556 0-1.007.42-1.007.94v.12c0 .52.45.94 1.007.94h12.986c.556 0 1.007-.42 1.007-.94v-.12c0-.52-.45-.94-1.007-.94ZM7.507 6h12.986c.556 0 1.007.42 1.007.94v.12c0 .52-.45.94-1.007.94H7.507C6.951 8 6.5 7.58 6.5 7.06v-.12c0-.52.45-.94 1.007-.94Z" fill="#A8A8A8"/></svg>',5250907485969:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9.5a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1ZM10 3.5a1 1 0 0 1 1 1v15a1 1 0 1 1-2 0v-15a1 1 0 0 1 1-1ZM6 13.5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6ZM21 15.5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4Z" fill="#A8A8A8"/></svg>',5250956662033:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1.75h10c.69 0 1.25.56 1.25 1.25v18c0 .69-.56 1.25-1.25 1.25H7c-.69 0-1.25-.56-1.25-1.25V3c0-.69.56-1.25 1.25-1.25Z" stroke="#A8A8A8" stroke-width="1.5" stroke-linecap="round"/><rect x="10" y="19" width="4" height="1" rx=".5" fill="#A8A8A8"/></svg>',360003692677:'<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.87 2.5a.903.903 0 0 0-1.806 0h1.805Zm-1.806 19a.902.902 0 1 0 1.805 0h-1.805Zm3.467-8.544-.349.833.35-.833Zm-4.911-1.08 4.563 1.913.697-1.665-4.563-1.913-.697 1.665Zm3.318-7.903h-.971v1.804h.97V3.973Zm-.971 0h-.758v1.804h.758V3.973Zm.902.902V2.5h-1.805v2.375h1.805Zm.422 13.348h-1.324v1.805h1.324v-1.805Zm-1.324 0h-1.592v1.805h1.592v-1.805Zm-.903.902V21.5h1.805v-2.375h-1.805ZM7.098 16.75a3.278 3.278 0 0 0 3.277 3.277v-1.805c-.813 0-1.473-.659-1.473-1.472H7.098Zm8.5-.834a2.307 2.307 0 0 1-2.307 2.306v1.805c2.27 0 4.111-1.84 4.111-4.111h-1.805Zm-1.416-2.127a2.307 2.307 0 0 1 1.415 2.127h1.806a4.112 4.112 0 0 0-2.523-3.792l-.698 1.665ZM7.097 8.084c0 1.657.995 3.152 2.523 3.792l.698-1.665a2.307 2.307 0 0 1-1.415-2.127H7.096Zm1.805 0a2.307 2.307 0 0 1 2.307-2.306V3.973a4.112 4.112 0 0 0-4.111 4.111h1.804Zm8.5.354a4.465 4.465 0 0 0-4.465-4.466v1.805a2.66 2.66 0 0 1 2.66 2.66h1.806Z" fill="#A8A8A8"/></svg>'},e.addEventListener("click",function(e){e.preventDefault(),n.classList.toggle("navigation__list--show"),e.currentTarget.classList.toggle("navigation__burger--show")}),new Promise(function(e,t){var n={};function o(){n.categories&&n.sections&&n.articles&&e(n)}i("categories").then(function(e){n.categories=e,o()}),i("sections").then(function(e){n.sections=e,o()}),i("articles").then(function(e){n.articles=e,o()})}).then(function(e){r(e)}))}),document.addEventListener("DOMContentLoaded",function(){window.__lc=window.__lc||{},window.__lc.license=8254491,window.__lc.group=2,function(){var e=document.createElement("script");e.async=!0,e.src=("https:"==document.location.protocol?"https://":"http://")+"cdn.livechatinc.com/tracking.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();var t=t||{};(window.LC_API=t).on_after_load=function(){t.disable_sounds()},document.querySelectorAll("#openLiveChat").forEach(function(e){e&&e.addEventListener("click",function(){t.open_chat_window()})})});