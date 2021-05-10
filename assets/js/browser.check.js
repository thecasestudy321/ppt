(function () {
  var getBrowserInfo = function () {
    var agent = navigator.userAgent.toLowerCase();
    var _browser = {};

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    // IE
    if (agent.indexOf('msie') > 0) {
      _browser = {
        isIE: true,
        version: ((agent.match(regStr_ie)[0] + '').replace(/[^0-9.]/ig, '')).split('.')[0] - 0
      };
    }

    // Firefox
    if (agent.indexOf('firefox') > 0) {
      _browser = {
        isFirefox: true,
        version: ((agent.match(regStr_ff)[0] + '').replace(/[^0-9.]/ig, '')).split('.')[0] - 0
      };
    }

    // Chrome
    if (agent.indexOf('chrome') > 0) {
      _browser = {
        isChrome: true,
        version: ((agent.match(regStr_chrome)[0] + '').replace(/[^0-9.]/ig, '')).split('.')[0] - 0
      };
    }

    // Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      _browser = {
        isSafari: true,
        version: ((agent.match(/version\/[\d.]+/gi)[0] + '').replace(/[^0-9.]/ig, '')).split('.')[0] - 0
      };
    }
    return _browser;
  };
  var warningModal = {},
    body, warningWrapper, warningContent, closeBtn;
  warningModal.initHtml = function () {
    body = document.body;
    warningWrapper = document.createElement('div');
    warningContent = document.createElement('span');
    closeBtn = document.createElement('span');

    warningWrapper.style.position = 'absolute';
    warningWrapper.style.whiteSpace = 'nowrap';
    warningWrapper.style.left = '0';
    warningWrapper.style.top = '0';
    warningWrapper.style.right = '0';
    warningWrapper.style.padding = '0 20px';
    warningWrapper.style.zIndex = '1000000';
    warningWrapper.style.fontFamily = 'FZHei-B01S';
    warningWrapper.style.fontSize = '12px';
    warningWrapper.style.color = '#5b5439';
    warningWrapper.style.height = '28px';
    warningWrapper.style.lineHeight = '27px';
    warningWrapper.style.background = '#FBE69E';
    warningWrapper.style.display = 'none';

    closeBtn.innerHTML = 'x';
    closeBtn.style.float = 'right';
    closeBtn.style.fontSize = '14px';
    closeBtn.style.cursor = 'pointer';

    warningWrapper.appendChild(warningContent);
    warningWrapper.appendChild(closeBtn);
    body.appendChild(warningWrapper);
  };
  warningModal.show = function (browserVersion) {
    warningWrapper.style.display = 'block';
    if (browserVersion) {
      warningContent.innerHTML = '亲爱的用户, 您的浏览器版本太低, 请将浏览器升级到' + browserVersion + '或更高的版本!';
    }
    closeBtn.addEventListener('click', function () {
      warningModal.hide();
    });
  };
  warningModal.hide = function () {
    warningWrapper.style.display = 'none';
    closeBtn.removeEventListener('click');
  };
  warningModal.test = function () {
    warningModal.show('11');
  };
  window.onload = function () {
    warningModal.initHtml();
    var browser = getBrowserInfo();
    // warningModal.test();
    // console.log(JSON.stringify(browser));
    if (browser.isChrome && browser.version < 41) {
      warningModal.show('41');
    } else if (browser.isFirefox && browser.version < 40) {
      warningModal.show('40');
    } else if (browser.isIE && browser.version < 11) {
      warningModal.show('11');
    } else if (browser.isSafari && browser.version < 9) {
      warningModal.show('9');
    }
  };
})();
