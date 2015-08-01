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

  // creates a DOM node with specified classNames
  wand.util.createElem = function(type, className, id) {
    var elem = document.createElement(type);
    if (className) {
      elem.className = className;
    }
    if (id) {
      elem.id = id;
    }
    return elem;
  };

  // will get a node object by ID
  wand.util.getNodeObject = function(nodeId) {
    for (var n = 0; n < wand.opts.nodes.length; n++) {
      if (nodeId === wand.opts.nodes[n].id) {
        return wand.opts.nodes[n];
      }
    }
  };


  return wand;

}(Wand || {}));
