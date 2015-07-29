var Wand = (function() {

  var wand = {};

  var options, nodes, elem;
  wand.state = WandState;

  var badHtmlError = new Error('You did not pass a valid HTML Element');


  wand.init = function(opts) {
    // @params options - object that contains nodes and html container id
    options = opts || {}; // {} if no options, empty object
    if (!opts.elem || !document.getElementById(opts.elem)) {
      throw badHtmlError;
    }

    wand.opts = opts;

    nodes = opts.nodes;
    elem = document.getElementById(opts.elem);
    elem.className += ' wand';

    wand.state = WandState;

    _firstNode = wand.state.init();
    renderNode(_firstNode);

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

  function renderNode(nodeId) {
    var node = getNode(nodeId);
    if (!node) {
      throw new Error('redundant unfound node error');
    }
    // push node into State array
    wand.state.addToState(nodeId);
    // puts stuff into a template
    elem.innerHTML = '<h1>' + node.title + '</h1>';
    elem.innerHTML += '<div class="node-contents">' + node.content + '</div>';
    if (node.triggers) {
      for (var i = node.triggers.length - 1; i >= 0; i--) {
        renderTrigger(node.triggers[i]);
      }
    }
  }

  function renderTrigger(trigger) {
    var button = document.createElement('button');
    button.innerHTML = trigger.content;
    button.onclick = function(event) {
      renderNode(trigger.target);
    };

    elem.appendChild(button);
  }

  return wand;

}(Wand || {}));
