var Wand = (function(wand) {

  'use strict';

  wand = wand || {};

  var options, nodes;

  var badHtmlError = new Error('You did not pass a valid HTML Element');
  var noSuchCallbackError = new Error('We could not find a callback function with that name!');
  var duplicateNodeIdError = new Error('Your nodes contain duplicate IDs.');

  wand.init = function(opts) {
    // console.log(JSON.parse(opts));
    // @params options - object that contains nodes and html container id
    options = opts || {}; // {} if no options, empty object
    if (!opts.elem || !document.getElementById(opts.elem)) {
      throw badHtmlError;
    }

    wand.opts = opts;


    nodes = opts.nodes;
    wand.elem = document.getElementById(opts.elem);
    wand.elem.className += ' wand-container';

    // create sidebar to show history unless the user specifies false
    if (!opts.history) {
      wand.historyElem = wand.util.createElem('aside', 'wand-history-container');
      wand.elem.appendChild(wand.historyElem);
    }
    wand.nodeContainer = wand.util.createElem('div', 'wand-node-container');
    wand.elem.appendChild(wand.nodeContainer);


    validateWand();

    var _firstNode = wand.state.init();
    wand.engine.renderNode(_firstNode);

    window.onpopstate = function(event) {
      wand.engine.renderNode(wand.state.previousNode());
    };

  };

  wand.initGist = function(gist) {
    var gist = gist.split('/')[gist.split('/').length-1];
    var url = 'https://api.github.com/gists/' + gist;
    var response = wand.util.loadXhr(url, function(xhr) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.response);
        // we probably want to force a filename if using gist
        // instead of using a for loop
        for (var filename in data.files) {
          var file = data.files[filename];
          wand.init(JSON.parse(file.content));
        }
      } else {
        console.error('The XHR response returned an error!');
      }
    });
  }

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
