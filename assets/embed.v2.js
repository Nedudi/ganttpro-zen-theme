var XbEmbedAuth = function (config, url) {
  if(!window.amplitudeLog){
    window.amplitudeLog = function(){}
  }
  var that = this;
  // We want to be sure that jquery is defined
  if (!$) throw ('XbEmbedAuth: jQuery is not defined!');
  // Routes declared inside embed frame
  var _routes = ['unsubscribe', 'login', 'signup', 'sso', 'error', 'message'];
  // Labels for alerts of notifier
  var _labels = {
    'success-title': 'You are awesome!',
    'error-title': 'Ohh no!',
    'success-msg': 'We will notify you when Kuku.io is launched!',
    'error-msg': 'Maybe your email not valid or something went wrong!'
  };
  // API url for notifier
  var _apiUrl = '/api/email/notifyme';
  // Redirect url template for external auth
  var _redirectUrl = '{{domain}}enter/external/{{provider}}';
  var _origin = document.location.origin;
  var _messageQueue = [];
  var _queue = [];
  var _frameVisible = false;
  var _frameReady = false;
  var _permanentOverlay = false;
  var _pinged = false;
  var _postMessageThread = null;
  var _overlay = null;
  var _frame = null;
  var _lastRoute = null;
  var _frameUrl = '/';
  var _redirectAttempts = 0;
  // Default config
  var _config = {
    el: 'body',
    frameId: 'xb_auth_frame',
    domains: {
      login: _origin,
      app: _origin,
    },
    frameUrl: _origin,
    overlayColor: 'rgba(0, 86, 76, 0.8)',
    activeButtons: [],
    onFrameLoaded: function () {
    },
    onFrameOpened: function () {
    },
    onFrameClosed: function () {
    }
  };
  // Default frame CSS
  var _frameCSS = {
    'background': 'transparent',
    'overflow': 'hidden',
    'position': 'fixed',
    'left': '0',
    'top': '0',
    'width': '100vw',
    'height': '100vh',
    'transition': '300ms',
    'z-index': '100132',
    'opacity': '0',
  };


  // background-image: url(https://cdn.ganttpro.com/statics/media/images/welcome/welcomebg.jpg);
  // background-size: cover;
  var _redirectionFrameCSS = {
    'background': 'url(https://cdn.ganttpro.com/statics/media/images/welcome/welcomebg.jpg) cover',
    'overflow': 'hidden',
    'position': 'fixed',
    'left': '0',
    'top': '0',
    'width': '100vw',
    'height': '100vh',
    'transition': '300ms',
    'z-index': '100133',
    'opacity': '0',
    'pointerEvents': 'none',
    'transition': 'opacity 1s ease-in-out'
  };
  // Functions that prepare message of specific type
  var _messagePreparators = {
    'route': function (msg) {
      _lastRoute = msg.route || '/';
      return msg;
    }
  };

  var createCookie = function (name, value, days, domain) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; domain=" + domain + "; path=/";
  };

  var getCookie = function (name) {
    if (!window.document.cookie) { return; }
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
  };

  var deleteCookie = function (name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  // Не понятно почему с некоторых источников не трекаются параметры в тагменеджере, поэтому добавляем запасочку тут
  // по #gp_setviascript будем смотреть поможнт ли и если поможет, то надо все переносить из тагменеджера в другой внешний скрипт
  // возможно дело в adblock, но это не точно :)

  // --- start ----

  if (!getCookie('gp_landing')) {
    createCookie("gp_landing", (window.location.href ? (window.location.href + '#gp_setviascript') : '-'), false, window.document.domain);
  }

  if (!getCookie('gp_referrer')) {
    createCookie("gp_referrer", (window.document.referrer ? (window.document.referrer + '#gp_setviascript') : '-'), false, window.document.domain);
  }

  if (window.location.href && window.location.href.toLowerCase().indexOf('utm') !== -1) {
    createCookie("gp_utm", window.location.href + '#gp_setviascript', false, window.document.domain);
  }

  // --- end ----

  $(document).on('click','[href$="login"],[href$="signup"]', function (e) {
    if(amplitudeLog && this.getAttribute && this.getAttribute('href')){
      amplitudeLog('langing_sign', {
        href: this.getAttribute('href'),
        isHeader: !!this.dataset['isHeader']
      });
    }
    createCookie("gp_regsource", (window.location.href ? (window.location.href + '#gp_setviascript') : '-'), false, window.document.domain);
  });

  // gp_referrer and gp_landing are defined with google tag manager

  // Message handlers for messages recieved from frame
  // in format 'msgType': function(data) {}
  var _messageHandlers = {
    'ready': function (data) {
      if (_frameReady) return;
      _frameReady = true;
      // We ready to send messages to frame
      if (!_postMessageThread) _postMessage();
      // Add message with config to queue
      _sendMessage({
        msgType: 'config',
        config: that._config
      });
      // Send all messages that appears before completing frame init
      while (_queue.length > 0) _sendMessage(_queue.shift(1));
      // Execute readyCallback
      _readyCallback();
      // Execute onFrameLoaded
      that._config.onFrameLoaded();
    },
    'saveLocation': function () {
      localStorage['xbembedauth.location'] = document.location.href;
    },
    'clearLocation': function () {
      delete localStorage['xbembedauth.location'];
    },
    'closeFrame': function () {
      _hideFrame();
      _hideOverlay();
      that._config.onFrameClosed();
    },
    'showRedirection': function () {
      _showRedirection();
    },
    'hideOverlay': function () {
      _hideFrame();
      _hideOverlay();
    },
    'showOverlay': function () {
      _showOverlay();
    },
    'showPermanentOverlay': function () {
      _showOverlay();
      _permanentOverlay = true;
    },
    'showFrame': function () {
      _showOverlay();
      _showFrame();
      that._config.onFrameOpened();
    },
    'navigated': function (msg) {
      _frameUrl = msg.route || _frameUrl;
      _redirectAttempts = 0;
      _showFrame();
    },
    'route': function (msg) {
      window.location.hash = '/'+msg.route;
    },
    'pong': function () {
      _pinged = true;
    }
  };
  // Recieve configs based on data passed to constructor
  // executes callback(config) at the end
  var _getConfigs = function (callback) {
    if (typeof config === 'object') {
      $.extend(true, _config, config);
      if (typeof url === 'string') {
        $.ajax({
          url: url,
          success: function (result) {
            $.extend(true, _config, result);
            callback(_config);
          },
          dataType: 'json'
        });
      } else callback(_config);
    } else if (typeof config === 'string') {
      $.ajax({
        url: config,
        success: function (result) {
          $.extend(true, _config, result);
          callback(_config);
        },
        dataType: 'json'
      });
    } else callback(_config);
  };
  // Attaches listeners to subsription text area and button
  var _attachNotifyListeners = function () {
    $(window.document).on('click', '[data-notify-me-send]', function (evt) {
      var emailInput = $('[data-notify-me-email]');
      if (emailInput.size()) {
        var email = emailInput.val();
        $.ajax({
          type: 'POST',
          url: _apiUrl,
          data: {
            email: email
          },
          success: function (res) {
            if (typeof swal !== 'function') console.warn('There are no global swal() function!');
            if (res && res.status == 'OK') {
              if (typeof swal == 'function') swal({ title: _labels['success-title'], text: _labels['success-msg'], type: "success" });
              else alert(_labels['success-msg']);
            } else {
              if (typeof swal == 'function') swal({ title: _labels['error-title'], text: _labels['error-msg'], type: "error" });
              else alert(_labels['error-msg']);
            }
          }
        });
      }
    });
  };
  // Checks wherether route is route declared inside frame
  var _isInnerRoute = function (route) {
    var _isInner = false;
    for (var i = _routes.length - 1; i >= 0; i--) _isInner = _isInner || (route.indexOf(_routes[i]) >= 0);
    return _isInner;
  };
  var _handleEvents = function (event) {
    switch (event.type) {
      case 'message':
      case 'onmessage':
        _recieveMessage(event);
        break;
    }
  };
  // Recieve messages from frame
  var _recieveMessage = function (e) {
    try {
      var data = JSON.parse(e.data);
      if (_config.debug) console.log('Top Window:', data);
      var msgType = data.msgType || '';
      var keys = Object.keys(_messageHandlers);
      for (var i = keys.length - 1; i >= 0; i--)
        if (keys[i] === msgType) _messageHandlers[keys[i]](data);
    } catch (e) {
      if (_config.debug)
        console.warn('Unable to parse message received from frame');
    }
  };
  // Creates new pseudo-thread based on setInterval and send's messages from message queue
  var _postMessage = function () {
    _postMessageThread = setInterval(function () {
      if (_frame && _frameReady && _messageQueue.length > 0 && _pinged) {
        var _nextMessage = _messageQueue.shift(1);
        // Send direct message, if it possible
        // if (_frame.app && _frame.app.messenger && _frame.app.messenger.recieveMessage) {
        //   if (_config.debug) console.log('Top Window: send direct message');
        //   _frame.app.messenger.recieveMessage({
        //     data: JSON.stringify(_nextMessage)
        //   });
        // } else
        _frame.postMessage(JSON.stringify(_nextMessage), '*');
      } else if (!_frame) _createFrame();
      if (!_pinged) {
        _frame.postMessage(JSON.stringify({
          msgType: 'ping'
        }), '*');
        _redirectAttempts++;
      }
      var path = document.location.hash.substr(1);
      if (_frame && _isInnerRoute(path) && path !== _frameUrl && _pinged) {
        _sendMessage({
          msgType: 'route',
          route: path
        });
        _redirectAttempts++;
      }
      // If we make 75 attempts to show login dialog box without success,
      // Recreate frame and start process again
      // Becouse sometimes frame won't answering to messages that we sending through Window.postMessage();
      if (_redirectAttempts > 75 && _frameReady && _frame) {
        if (_config.debug) console.warn('Top Window:', 'Too many attempts to connect with frame, recreate it!');
        delete window.top.embedFrame;
        _messageQueue = [];
        _queue = [];
        _frameReady = false;
        _pinged = false;
        _redirectAttempts = 0;
        _removeFrame();
        _createFrame();
      }
    }, 100);
  };
  // Prepares message before adding to queue
  var _prepareMessage = function (msg) {
    var msgType = msg.msgType;
    var keys = Object.keys(_messagePreparators);
    for (var i = keys.length - 1; i >= 0; i--)
      if (keys[i] === msgType) msg = _messagePreparators[keys[i]](msg);
    return msg;
  };
  // Add new message to queue
  var _sendMessage = function (msg) {
    msg = _prepareMessage(msg);
    // If frame already ready, add message to primary queue
    if (_frameReady) _messageQueue.push(msg);
    // Else add message to queue, that will be sended after frame initialization
    else _queue.push(msg);
  };
  // Create new frame
  var _createFrame = function () {
    $(function () {
      $('<iframe>', {
        src: that._url,
        id: that._frameId,
        frameborder: 0,
        scrolling: 'no'
      }).css(_frameCSS).appendTo(that._el);
      _frame = document.getElementById(that._frameId).contentWindow;
      if (window.addEventListener) {
        window.addEventListener("message", that, false);
      } else {
        window.attachEvent("onmessage", that);
      }
    });
  };
  // Removes frame for top DOM
  var _removeFrame = function () {
    $('#' + that._frameId).remove();
    _frame = null;
  };
  // Show overlay
  var _showOverlay = function () {
    $('body').addClass('overlay-visible');
    // if ($('.global-spinner').length >= 1) {
    //   $('.global-spinner').css({
    //     'opacity': '1',
    //     'pointer-events': 'all',
    //     'background': 'rgba(0, 86, 76, 0.8)'
    //   });
    // } else {
      $('#frame').css('background-image', 'url(https://cdn.ganttpro.com/statics/media/images/welcome/welcomebg.jpg)');
      $('#frame').css('background-size', 'cover');
   // }
  };
  // Hide overlay from user
  var _hideOverlay = function () {
    $('body').removeClass('overlay-visible');
    if (!_permanentOverlay) $('#frame').css('background-color', 'transparent');
      // if ($('.global-spinner').length >= 1) {
      //   $('.global-spinner').css({
      //     'opacity': '0',
      //     'pointer-events': 'none',
      //     'background': 'rgba(0, 86, 76, 0.8)'
      //   });
      // } else {

      // }
  };
  // Open up frame and send request to restart animation to frame
  var _showFrame = function () {
    $('#' + that._frameId).css({
      'opacity': '1',
      'pointer-events': 'all',
    });
    _sendMessage({
      msgType: 'restartAnimation'
    });
    that._frameVisible = true;
  };

  var _createRedirectionFrame = function () {
    $(function () {
      $('<iframe>', {
        src: 'https://cdn.ganttpro.com/statics/media/html/ganttpreloaderAzureSignup.html',
        id: 'redirectionFrame',
        frameborder: 0,
        scrolling: 'no'
      }).css(_redirectionFrameCSS).appendTo(that._el);
    });
  };

  var _showRedirection = function () {
    $('#redirectionFrame').css({
      'opacity': '1',
      'pointerEvents': 'all'
    });
  };

  // Hide frame from user and clears document location's hash
  var _hideFrame = function () {
    $('#' + that._frameId).css({
      'opacity': '0',
      'pointer-events': 'none',
    });
    that._frameVisible = false;
    var path = document.location.hash.substr(1);
    if (_frameUrl === path) {
      _frameUrl = '/';
      document.location.hash = '';
    }
  };
  // var _redirectToStoredLocation = function () {
  //   if (localStorage['xbembedauth.location']) {
  //     document.location.href = localStorage['xbembedauth.location'];
  //     delete localStorage['xbembedauth.location'];
  //   }
  // };
  var _readyCallback = function () {
    var path = document.location.hash.substr(1);
    if (_isInnerRoute(document.location.hash)) {
      if (!_frame) _createFrame();
      _showOverlay();
      _sendMessage({
        msgType: 'route',
        route: path
      });
    }
  };
  var _attachListeners = function () {
    $(window.document).ready(_readyCallback);
    $(window.document).on("click", "[data-auth-external]", function (evt) {
      var href = {
        attr: $(this).attr("data-auth-external")
      };
      evt.preventDefault();
      _showOverlay();
      if (href.attr == 'email') {
        if (!_frame) _createFrame();
        _showFrame();
        _sendMessage({
          msgType: 'route',
          route: 'email-login'
        });
      } else {
        var url = _redirectUrl.replace('{{domain}}', that._domains.login).replace('{{provider}}', href.attr);
        window.location.href = url;
      }
    });
    $(window.document).on("click", "a[href][data-auth]", function (evt) {
      var href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      evt.preventDefault();
      if (!_frame) _createFrame();
      _showOverlay();
      _showFrame();
      _sendMessage({
        msgType: 'route',
        route: href.attr
      });
      document.location.hash = href.attr;
    });
  };
  /// Start initialization
  that.handleEvent = _handleEvents;
  _getConfigs(function (config) {
    delete window.top.embedFrame;
    // Aliases
    that._el = config.el;
    that._url = config.frameUrl;
    that._domains = config.domains;
    that._frameId = config.frameId;
    that._color = config.overlayColor;
    that._config = config;
    if (config.isLogged && window.location.href.indexOf('translator') === -1) {
      $('[href="#/login"],[href="#/signup"]').attr('href', config.appUrl).each(function (i, v) {
        console.log(i,v)
        var loggedText = $(v).attr('data-logged-text');
        if (loggedText) {
          $(v).text(loggedText)
        }
      });
    }

    if (!config.isLogged) {
      document.querySelector('.global-layout') && document.querySelector('.global-layout').classList.add('tooltip_shown');
    }

    // Redirect to location, stored in localStorage
    //_redirectToStoredLocation();
    // Attach functions to object
    that.version = function () {
      //console.log('XbEmbedAuth v2');
    };
    // Create overlay & frame and load it
    // _createOverlay();

    _createFrame();
    _createRedirectionFrame();
    // Attach listeners to nofity inputs
    _attachNotifyListeners();
    _attachListeners();
    /// hack
    window.embed = {
      recieve: _recieveMessage
    };
  });
};