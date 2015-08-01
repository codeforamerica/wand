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
    renderHistory(wand.state.getState());

    wand.nodeContainer.innerHTML = Handlebars.compile(wand.template.node)(node);
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

        wand.nodeContainer.appendChild(button);

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

        wand.nodeContainer.appendChild(elem);

        break;
    }

  }

  // redraws every time a node renders using the state array
  function renderHistory(stateArray) {
    wand.historyElem.innerHTML = ""; // clear history
    for (var s = 0; s < stateArray.length - 1; s++) {
      var node = wand.util.getNodeObject(stateArray[s]); // get node that matches state
      var nextNodeId = stateArray[s + 1]; // get the next nodeId in the state array for finding user response
      var historyNodeElem = wand.util.createElem('li', 'wand-history-node');
      
      // append the history title/question
      historyNodeElem.innerHTML = '<span class="wand-history-title">'+node.title+'</span>';

      // find the user's given answer by checking the trigger targets
      for (var t = 0; t < node.triggers.length; t++) {
        if (nextNodeId == node.triggers[t].target) {
          historyNodeElem.innerHTML += '<span class="wand-history-answer">'+node.triggers[t].content+'</strong>';
        }
      }


      wand.historyElem.appendChild(historyNodeElem);
    }
  }

  return wand;

}(Wand || {}, Handlebars));
