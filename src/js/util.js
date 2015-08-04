var Wand = (function(wand) {

  /*jshint validthis: true */
  'use strict';

  wand = wand || {};
  wand.util = {};

  wand.util.encodeParams = function(objParams) {
    var str = [];
    for(var p in objParams)
      if (objParams.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(objParams[p]));
      }
    return str.join("&");
  };

  wand.util.loadXhr = function(trigger, params, callback) {
    console.debug('Retrieving url ' + trigger.url);
    return getRequest(trigger.url, params, callback);
  };

  wand.util.loadJsonp = function(url, params, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + params + '&callback=' + callbackName;
    document.body.appendChild(script);
  };

  function getRequest(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(url));

    xhr.onload = callback.bind(this, xhr);
    xhr.onerror = function(xhr) {
      console.error(xhr);
    };

    xhr.send(params);

    return xhr;
  }

  return wand;

}(Wand || {}));
