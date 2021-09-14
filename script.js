"use strict";document.addEventListener("DOMContentLoaded",function(){function t(e,t){if(Element.prototype.closest)return e.closest(t);do{if(Element.prototype.matches&&e.matches(t)||Element.prototype.msMatchesSelector&&e.msMatchesSelector(t)||Element.prototype.webkitMatchesSelector&&e.webkitMatchesSelector(t))return e}while(null!==(e=e.parentElement||e.parentNode)&&1===e.nodeType);return null}function n(){var e=document.activeElement.getAttribute("id");sessionStorage.setItem("returnFocusTo","#"+e)}Array.prototype.forEach.call(document.querySelectorAll(".share a"),function(e){e.addEventListener("click",function(e){e.preventDefault(),window.open(this.href,"","height = 500, width = 500")})});var e=sessionStorage.getItem("returnFocusTo");e&&(sessionStorage.removeItem("returnFocusTo"),(p=document.querySelector(e))&&p.focus&&p.focus());var o=document.querySelector(".comment-container textarea"),i=document.querySelector(".comment-form-controls, .comment-ccs");o&&(o.addEventListener("focus",function e(){i.style.display="block",o.removeEventListener("focus",e)}),""!==o.value&&(i.style.display="block"));var r=document.querySelector(".request-container .comment-container .comment-show-container"),s=document.querySelectorAll(".request-container .comment-container .comment-fields"),c=document.querySelector(".request-container .comment-container .request-submit-comment");r&&r.addEventListener("click",function(){r.style.display="none",Array.prototype.forEach.call(s,function(e){e.style.display="block"}),c.style.display="inline-block",o&&o.focus()});var a=document.querySelector(".request-container .mark-as-solved:not([data-disabled])"),u=document.querySelector(".request-container .comment-container input[type=checkbox]"),l=document.querySelector(".request-container .comment-container input[type=submit]");a&&a.addEventListener("click",function(){u.setAttribute("checked",!0),l.disabled=!0,this.setAttribute("data-disabled",!0),t(this,"form").submit()});var d=document.querySelector(".request-container .comment-container textarea");function m(e){return""===e.trim()}var h=d&&"wysiwyg"===d.dataset.helper?function(e){return null===(e=(new DOMParser).parseFromString("<_>".concat(e,"</_>"),"text/xml")).querySelector("img")&&m(e.children[0].textContent)}:m;d&&d.addEventListener("input",function(){h(d.value)?(a&&(a.innerText=a.getAttribute("data-solve-translation")),l.disabled=!0):(a&&(a.innerText=a.getAttribute("data-solve-and-submit-translation")),l.disabled=!1)}),d&&h(d.value)&&(l.disabled=!0),Array.prototype.forEach.call(document.querySelectorAll("#request-status-select, #request-organization-select"),function(e){e.addEventListener("change",function(e){e.stopPropagation(),n(),t(this,"form").submit()})});var p=document.querySelector("#quick-search");function f(e,t){var n="true"===t.getAttribute("aria-expanded");t.setAttribute("aria-expanded",!n),e.setAttribute("aria-expanded",!n)}function y(e,t){t.setAttribute("aria-expanded",!1),e.setAttribute("aria-expanded",!1),e.focus()}p&&p.addEventListener("keyup",function(e){13===e.keyCode&&(e.stopPropagation(),n(),t(this,"form").submit())});var v=document.querySelector(".header .menu-button"),g=document.querySelector("#user-nav");v.addEventListener("click",function(e){e.stopPropagation(),f(this,g)}),g.addEventListener("keyup",function(e){27===e.keyCode&&(e.stopPropagation(),y(v,this))}),0===g.children.length&&(v.style.display="none");p=document.querySelectorAll(".collapsible-nav, .collapsible-sidebar");Array.prototype.forEach.call(p,function(e){var t=e.querySelector(".collapsible-nav-toggle, .collapsible-sidebar-toggle");e.addEventListener("click",function(e){f(t,this)}),e.addEventListener("keyup",function(e){27===e.keyCode&&y(t,this)})});p=document.querySelector("#request-organization select");p&&p.addEventListener("change",function(){t(this,"form").submit()});p=document.querySelectorAll(".multibrand-filter-list");Array.prototype.forEach.call(p,function(t){var n;6<t.children.length&&((n=t.querySelector(".see-all-filters")).setAttribute("aria-hidden",!1),n.addEventListener("click",function(e){e.stopPropagation(),n.parentNode.removeChild(n),t.classList.remove("multibrand-filter-list--collapsed")}))});p=document.querySelector(".notification-error");function b(e,t){this.toggle=e,this.menu=t,this.menuPlacement={top:t.classList.contains("dropdown-menu-top"),end:t.classList.contains("dropdown-menu-end")},this.toggle.addEventListener("click",this.clickHandler.bind(this)),this.toggle.addEventListener("keydown",this.toggleKeyHandler.bind(this)),this.menu.addEventListener("keydown",this.menuKeyHandler.bind(this))}p&&p.previousElementSibling&&"function"==typeof p.previousElementSibling.focus&&p.previousElementSibling.focus(),b.prototype={get isExpanded(){return"true"===this.menu.getAttribute("aria-expanded")},get menuItems(){return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"))},dismiss:function(){this.isExpanded&&(this.menu.setAttribute("aria-expanded",!1),this.menu.classList.remove("dropdown-menu-end","dropdown-menu-top"))},open:function(){this.isExpanded||(this.menu.setAttribute("aria-expanded",!0),this.handleOverflow())},handleOverflow:function(){var e=this.menu.getBoundingClientRect(),t=e.left<0||e.left+e.width>window.innerWidth,e=e.top<0||e.top+e.height>window.innerHeight;(t||this.menuPlacement.end)&&this.menu.classList.add("dropdown-menu-end"),(e||this.menuPlacement.top)&&this.menu.classList.add("dropdown-menu-top"),this.menu.getBoundingClientRect().top<0&&this.menu.classList.remove("dropdown-menu-top")},focusNextMenuItem:function(e){this.menuItems.length&&(e=(e=this.menuItems.indexOf(e))===this.menuItems.length-1||e<0?0:e+1,this.menuItems[e].focus())},focusPreviousMenuItem:function(e){this.menuItems.length&&(e=(e=this.menuItems.indexOf(e))<=0?this.menuItems.length-1:e-1,this.menuItems[e].focus())},clickHandler:function(){this.isExpanded?this.dismiss():this.open()},toggleKeyHandler:function(e){switch(e.keyCode){case 13:case 32:case 40:e.preventDefault(),this.open(),this.focusNextMenuItem();break;case 38:e.preventDefault(),this.open(),this.focusPreviousMenuItem();break;case 27:this.dismiss(),this.toggle.focus()}},menuKeyHandler:function(e){var t=this.menuItems[0],n=this.menuItems[this.menuItems.length-1],o=e.target;switch(e.keyCode){case 27:this.dismiss(),this.toggle.focus();break;case 40:e.preventDefault(),this.focusNextMenuItem(o);break;case 38:e.preventDefault(),this.focusPreviousMenuItem(o);break;case 9:e.shiftKey?o===t?this.dismiss():(e.preventDefault(),this.focusPreviousMenuItem(o)):o===n?this.dismiss():(e.preventDefault(),this.focusNextMenuItem(o));break;case 13:case 32:e.preventDefault(),o.click()}}};var E=[];Array.prototype.slice.call(document.querySelectorAll(".dropdown-toggle")).forEach(function(e){var t=e.nextElementSibling;t&&t.classList.contains("dropdown-menu")&&E.push(new b(e,t))}),document.addEventListener("click",function(t){E.forEach(function(e){e.toggle.contains(t.target)||e.dismiss()})})}),document.addEventListener("DOMContentLoaded",function(){function o(){var e=document.createElement("button");return e.textContent="and more",e.classList="site-footer__nav-more",e.addEventListener("click",function(e){e.preventDefault(),function(e){for(var t=e.querySelectorAll("li"),n=0;n<t.length;n++)t[n].style.display="list-item"}(e.currentTarget.parentElement),e.currentTarget.remove()}),e}document.querySelector(".site-footer__nav-list")&&document.querySelectorAll(".site-footer__nav-list > li").forEach(function(e){!function(e){for(var t=e.querySelectorAll("li"),n=0;n<t.length;n++)9<=n&&(t[n].style.display="none");9<t.length&&e.append(o())}(e)})});