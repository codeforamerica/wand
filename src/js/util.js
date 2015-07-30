var Wand = (function(wand) {

  /*jshint validthis: true */
  'use strict';

  wand = wand || {};
  wand.util = {};

  wand.util.loadXhr = function(url, callback) {
    console.debug('Retrieving url ' + url);
    return getRequest(url, callback);
  };

  function getRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(url));

    xhr.onload = callback.bind(this, xhr);
    xhr.onerror = function(xhr) {
      console.error(xhr);
    };

    xhr.send();

    return xhr;
  }

  return wand;

}(Wand || {}));
