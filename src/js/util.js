var Wand = (function(wand) {

  /*jshint validthis: true */
  'use strict';

  wand = wand || {};
  wand.util = {};

/**
 * Take an object of parameters and convert it into a GET query string
 * @param {object}
 * @returns {string}
 */
  wand.util.encodeParams = function(objParams) {
    var str = [];
    for(var p in objParams) {
      if (objParams.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(objParams[p]));
      }
    }
    return str.join("&");
  };

/**
 * Make an XHR call for regular APIs that don't have CORS issues.
 * @param {string} url
 * @param {string} params
 * @param {function} callback
 */
  wand.util.loadXhr = function(trigger, params, callback) {
    console.debug('Retrieving url ' + trigger.url);
    return getRequest(trigger.url, params, callback);
  };

/**
 * For APIs that have Cross-origin resource sharing issues, bring in a method for JSONP.
 * @param {string} url
 * @param {string} params
 * @param {function} callback
 */
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

/**
 * Handles XMLHttpRequests, similar to jQuery's .ajax method.
 * @param {string} url
 * @param {string} params
 * @param {function} callback
 */
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

  // creates a DOM node with specified classNames and id
  wand.util.createElem = function(type, className, innerHTML) {
    var elem = document.createElement(type);
    if (className) {
      elem.className = className;
    }
    if (innerHTML) {
      elem.innerHTML = innerHTML;
    }
    return elem;
  };

/**
 * Renders the node given the id.
 * @param {string} nodeId - The id of the trigger node.
 * @returns {object} The node of the wizard
 */
  wand.util.getNodeObject = function(nodeId) {
    for (var n = 0; n < wand.opts.nodes.length; n++) {
      if (nodeId === wand.opts.nodes[n].id) {
        return wand.opts.nodes[n];
      }
    }
  };

  return wand;

}(Wand || {}));
