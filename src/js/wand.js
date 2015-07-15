var Wand = (function() {

  var wand = {};

  var options = {},
      nodes = [],
      elem = null;

  var badHtmlError = new Error('You did not pass a valid HTML Element');

  wand.init = function(opts) {
    // @params options - object that contains nodes and html container id
    options = opts || {} ;// {} if no options, empty object
    if (!opts.elem || !document.getElementById(opts.elem)) {
      throw badHtmlError;
    }

    nodes = opts.nodes;
    elem = document.getElementById(opts.elem);
    elem.className += ' wand';

    wand.renderNode(0);
  };

  function getNode(nodeId) {
    for (var i = nodes.length - 1; i >= 0; i--) {
      if (nodes[i].id === nodeId) {
        return nodes[i];
      }
    }
    console.error('Node does not exist:', nodeId);
    return;
  }

  wand.renderNode = function(nodeId) {
    var node = getNode(nodeId);
    if (!node) { throw new Error('redundant unfound node error'); }
    // puts stuff into a template
    elem.innerHTML = '<h1>' + node.title + '</h1>';
    elem.innerHTML += '<div class="node-contents">' + node.content + '</div>';
    if (node.triggers) {
      for (var i = node.triggers.length - 1; i >= 0; i--) {
        renderTrigger(node.triggers[i]);
      }
    }
  };

  function renderTrigger(trigger) {
    var button = document.createElement('button');
    button.innerHTML = trigger.content;
    button.onclick = function (event) {
      wand.renderNode(trigger.target);
    };

    elem.appendChild(button);
  }

  return wand;

}());
