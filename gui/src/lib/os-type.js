const getOsType = () => {
  let userAgent = navigator.userAgent.toLowerCase();
  let name = 'Unknown';
  let version = "Unknown";

  if (userAgent.indexOf("win") > -1) {
    name = "Windows";
    if (userAgent.indexOf("windows nt 5.0") > -1) {
      version = "WIN2000";
    } else if (userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("windows nt 5.2") > -1) {
      version = "WINXP";
    } else if (userAgent.indexOf("windows nt 6.0") > -1) {
      version = "WINVista";
    } else if (userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1) {
      version = "WIN7";
    } else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1) {
      version = "WIN8";
    } else if (userAgent.indexOf("windows nt 6.3") > -1) {
      version = "WIN8";
    } else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 10.0") > -1) {
      version = "WIN10";
    } else {
      version = "Unknown";
    }
  } else if (userAgent.indexOf("iphone") > -1) {
    name = "Iphone";
  } else if (userAgent.indexOf("mac") > -1) {
    name = "Mac";
    version = "MAC";
  } else if (userAgent.indexOf("linux") > -1) {
    if (userAgent.indexOf("android") > -1) {
      name = "Android"
    } else {
      name = "Linux";
      version = "LINUX";
    }
  } else if (userAgent.indexOf("unix") > -1 || userAgent.indexOf("sunname") > -1 || userAgent.indexOf("bsd") > -1) {
    name = "Unix";
  }  else {
    name = "Unknown";
  }

  if ('Windows' === name
    && userAgent.indexOf("win32") === -1
    && userAgent.indexOf("wow32") === -1
    && userAgent.indexOf("win64") === -1
    && userAgent.indexOf("wow64") === -1
  ) {
    version += '_32';
  } else if (userAgent.indexOf("win32") >= 0 || userAgent.indexOf("wow32") >= 0) {
    version += '_32';
  } else if (userAgent.indexOf("win64") >= 0 || userAgent.indexOf("wow64") >= 0) {
    version += '_64';
  }
  return { name, version };
}

const getBrowser = () => {
  var browser = {
    msie: false,
    firefox: false,
    opera: false,
    safari: false,
    chrome: false,
    netscape: false,
    appname: 'unknown',
    version: 0
  },
    ua = window.navigator.userAgent.toLowerCase();
  if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
    browser[RegExp.$1] = true;
    browser.appname = RegExp.$1;
    browser.version = RegExp.$2;
  } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) {
    // safari
    browser.safari = true;
    browser.appname = 'safari';
    browser.version = RegExp.$2;
  }

  return { browserName: browser.appname, browserVersion: browser.version };

}

const getBrowserLanguage = () => {
  var type = navigator.appName;
  var lang = 'zh-CN';
  if (type == "Netscape") {
    var lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
  } else {
    var lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
  };
  return lang;
}



export {
  getOsType,
  getBrowser,
  getBrowserLanguage
}