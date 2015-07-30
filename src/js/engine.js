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
        renderTrigger(node.triggers[i], i, node.type);
      }
    }
  };

  function renderTrigger(trigger, id, type) {
    trigger._id = id;
    var triggerHtml = Handlebars.compile(wand.template.triggers[type])(trigger);

    switch (type) {

      case 'pickOne':
        var button = document.createElement('button');
        button.innerHTML = triggerHtml;
        button.onclick = function(event) {
          wand.engine.renderNode(trigger.target);
        };

        wand.elem.appendChild(button);

        break;

      case 'api':
        var elem = document.createElement('div');
        elem.innerHTML = triggerHtml;
        var _trigger = elem.querySelector('#Wand-js-' + trigger._id);
        _trigger.onclick = function(event) {
          var response = wand.util.loadXhr(trigger.api, function(xhr) {
            if (xhr.status === 200) {
              wand.engine.renderNode(trigger.callbackFn(xhr.response));
            } else {
              console.error('The XHR response returned an error!');
            }
          });
        };

        wand.elem.appendChild(elem);

        break;
    }

  }

  return wand;

}(Wand || {}, Handlebars));
