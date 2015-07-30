var Wand = (function(wand) {

  'use strict';

  wand = wand || {};

  var options, nodes;

  var badHtmlError = new Error('You did not pass a valid HTML Element');

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

    var _firstNode = wand.state.init();
    wand.engine.renderNode(_firstNode);

    window.onpopstate = function(event) {
      wand.engine.renderNode(wand.state.previousNode());
    };

  };

  return wand;

}(Wand || {}));
