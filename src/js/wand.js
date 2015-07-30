var Wand = (function(wand) {

  'use strict';

  wand = wand || {};

  var options, nodes;

  var badHtmlError = new Error('You did not pass a valid HTML Element');
  var noSuchCallbackError = new Error('We could not find a callback function with that name!');

  wand.init = function(opts) {
    // @params options - object that contains nodes and html container id
    options = opts || {}; // {} if no options, empty object
    if (!opts.elem || !document.getElementById(opts.elem)) {
      throw badHtmlError;
    }

    wand.opts = opts;

    nodes = opts.nodes;
    wand.elem = document.getElementById(opts.elem);
    wand.elem.className += ' wand';

    if (checkApiCallbackFns() === false) {
      throw noSuchCallbackError;
    }

    var _firstNode = wand.state.init();
    wand.engine.renderNode(_firstNode);

    window.onpopstate = function(event) {
      wand.engine.renderNode(wand.state.previousNode());
    };

  };

  function checkApiCallbackFns() {
    var validCallbackFns = true;
    wand.opts.nodes.forEach(function(node) {
      if (node.type !== 'api') {
        return;
      }
      node.triggers.forEach(function(trigger) {
        if (isFunction((wand.opts.callbackFns[trigger.callbackFn]))) {
          trigger.callbackFn = wand.opts.callbackFns[trigger.callbackFn];
          return;
        }
        validCallbackFns = false;
      });
    });
    return validCallbackFns;
  }

  // stolen from underscore.js
  function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  return wand;

}(Wand || {}));
