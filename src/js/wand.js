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

    renderNode(0);
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
    if (!node) { throw new Error('redundant unfound node error'); }
    // puts stuff into a template
    elem.innerHTML = '<h1>' + node.title + '</h1>';
    elem.innerHTML += '<div class="node-contents">' + node.content + '</div>';

    // Check the node type and if it's custom do something that's black magic?
    switch(node.type) {
      case 'custom':
          if (node.triggers) {
            renderCustomTrigger(node.triggers);
          }
        break;
      default:
        if (node.triggers) {
          for (var i = node.triggers.length - 1; i >= 0; i--) {
            renderTrigger(node.triggers[i]);
          }
        }
    }
  }

  function renderCustomTrigger(trigger) {
    console.log('CUSTOM TRIGGER THAT IS STILL WITCH CRAFT. NEED TO ADD TEST CASES FOR SAID WITCHCRAFT.');
    var textbox = document.createElement('input');
    elem.appendChild(textbox);
  }

  function renderTrigger(trigger) {
    var button = document.createElement('button');
    button.innerHTML = trigger.content;
    button.onclick = function (event) {
      renderNode(trigger.target);
    };

    elem.appendChild(button);
  }

  return wand;

}());
