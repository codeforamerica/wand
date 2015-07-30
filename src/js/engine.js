var Wand = (function(wand, Handlebars) {

  'use strict';

  wand = wand || {};
  wand.engine = {};

  function getNode(nodeId) {
    for (var i = wand.opts.nodes.length - 1; i >= 0; i--) {
      if (wand.opts.nodes[i].id === nodeId) {
        return wand.opts.nodes[i];
      }
    }
    console.error('Node does not exist:', nodeId);
    return;
  }

  wand.engine.renderNode = function(nodeId) {
    var node = getNode(nodeId);
    if (!node) {
      throw new Error('redundant unfound node error');
    }
    // push node into State array
    wand.state.addToState(nodeId);

    wand.elem.innerHTML = Handlebars.compile(wand.template.node)(node);
    if (node.triggers) {
      for (var i = node.triggers.length - 1; i >= 0; i--) {
        renderTrigger(node.triggers[i], node.type);
      }
    }
  };

  function renderTrigger(trigger, type) {
    var button = document.createElement('button');
    button.innerHTML = Handlebars.compile(wand.template.triggers[type])(trigger);
    button.onclick = function(event) {
      wand.engine.renderNode(trigger.target);
    };

    wand.elem.appendChild(button);
  }

  return wand;

}(Wand || {}, Handlebars));
