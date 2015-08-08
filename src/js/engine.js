var Wand = (function(wand, Handlebars) {

  'use strict';

  wand = wand || {};
  wand.engine = {};

/**
 * Renders the node given the id.
 * @param {string} nodeId - The id of the trigger node.
 * @returns {object} The node of the wizard
 */
  function getNode(nodeId) {
    for (var i = wand.opts.nodes.length - 1; i >= 0; i--) {
      if (wand.opts.nodes[i].id === nodeId) {
        return wand.opts.nodes[i];
      }
    }
    console.error('Node does not exist:', nodeId);
    wand.notification.add({
      text: 'Node does not exist: ' + nodeId,
      type: 'alert',
      time: 3500
    });
    return;
  }

/**
 * Renders the node and the triggers for that node.
 * @param {string} nodeId - The id of the trigger node.
 */
  wand.engine.renderNode = function(nodeId) {
    var node = getNode(nodeId);
    if (!node) {
      throw new Error('redundant unfound node error');
      wand.notification.add({
        text: 'redundant unfound node error',
        type: 'alert',
        time: 3500
      });
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

/**
 * Renders the triggers, event handlers and performs necessary business logic.
 * @param {object} trigger - The trigger object.
 * @param {string} id - The id of the trigger node.
 * @param {string} type - Renders a specific trigger type (pickOne, custom, etc.)
 */
  function renderTrigger(trigger, id, type) {
    trigger._id = id;
    var triggerHtml = Handlebars.compile(wand.template.triggers[type])(trigger);

    switch (type) {

      case 'pickOne':
        var button = wand.util.createElem('button', 'wand_trigger', triggerHtml);
        button.onclick = function(event) {
          wand.engine.renderNode(trigger.target);
        };

        wand.nodeContainer.appendChild(button);

        break;

      case 'custom':
        var params = '';
        var elem = document.createElement('div');
        elem.id = 'wand-trigger-' + trigger._id;
        elem.innerHTML = triggerHtml;
        var submitButton = elem.querySelector('#Wand-submit-' + trigger._id);

        submitButton.onclick = function(event) {
          var inputElem = elem.querySelector('#Wand-input-' + trigger._id);
          trigger.callbackFn(inputElem.value);
        };

        wand.nodeContainer.appendChild(elem);

        break;
    }

  }

  // redraws every time a node renders using the state array
  function renderHistory(stateArray) {
    wand.historyElem.innerHTML = ""; // clear history
    var historyList = wand.util.createElem('ol', 'wand_history');
    for (var s = 0; s < stateArray.length - 1; s++) {
      var node = wand.util.getNodeObject(stateArray[s]); // get node that matches state
      var nextNodeId = stateArray[s + 1]; // get the next nodeId in the state array for finding user response
      var historyNodeElem = wand.util.createElem('li', 'wand_history_node');

      // append the history title/question
      historyNodeElem.innerHTML = '<span class="wand_history_title">'+node.title+'</span>';

      // find the user's given answer by checking the trigger targets
      for (var t = 0; t < node.triggers.length; t++) {
        if (nextNodeId == node.triggers[t].target) {
          historyNodeElem.innerHTML += '<span class="wand_history_answer">'+node.triggers[t].content+'</strong>';
        }
      }

      // append the wand history element
      historyList.appendChild(historyNodeElem);
    }
    wand.historyElem.appendChild(historyList);
  }

  return wand;

}(Wand || {}, Handlebars));
