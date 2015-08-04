var Wand = (function(wand) {

  'use strict';

  wand = wand || {};

  var options, nodes;

  var badHtmlError = new Error('You did not pass a valid HTML Element');
  var noSuchCallbackError = new Error('We could not find a callback function with that name!');
  var duplicateNodeIdError = new Error('Your nodes contain duplicate IDs.');

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

    validateWand();

    var _firstNode = wand.state.init();
    wand.engine.renderNode(_firstNode);

    window.onpopstate = function(event) {
      wand.engine.renderNode(wand.state.previousNode());
    };

  };

  function validateWand() {
    var nodeIds = [];

    wand.opts.nodes.forEach(function(node) {

      if (hasValidApiCallbackFns(node) === false) {
        throw noSuchCallbackError;
      }

      nodeIds = hasUniqueNodeIds(node, nodeIds);
      if (nodeIds === false) {
        throw duplicateNodeIdError;
      }

    });

  }

  function hasValidApiCallbackFns(node) {
    var validCallbackFns = true;
    if (node.type !== 'api') {
      return;
    }

    node.triggers.forEach(function(trigger) {

      // Let's call the (optional) preprocessor
      if (trigger.preprocessor) {
        var preprocessorFn = getFuncFromString(trigger.preprocessor);
        if (preprocessorFn !== null) {
          trigger.preprocessor = preprocessorFn;
        }
      }

      var triggerFn = getFuncFromString(trigger.callbackFn);
      if (triggerFn !== null) {
        trigger.callbackFn = triggerFn;
        return;
      }
      validCallbackFns = false;
    });

    return validCallbackFns;

  }

  function hasUniqueNodeIds(node, nodeIds) {
    if (nodeIds.indexOf(node.id) > -1) {
      return false;
    }

    nodeIds.push(node.id);
    return nodeIds;

  }

  /**
   * Converts a string containing a function or object method name to a function pointer.
   * @param  string   func
   * @return function
   */
  function getFuncFromString(func) {
    // if already a function, return
    if (typeof func === 'function') { return func; }

    // if string, try to find function or method of object (of "obj.func" format)
    if (typeof func === 'string') {
      if (!func.length) { return null; }
      var target = window;
      var _func = func.split('.');
      while (_func.length) {
        var ns = _func.shift();
        if (typeof target[ns] === 'undefined') { return null; }
        target = target[ns];
      }
      if (typeof target === 'function') { return target; }
    }

      // return null if could not parse
      return null;
  }

  return wand;

}(Wand || {}));
