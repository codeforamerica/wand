var Wand = (function() {

  var wand = {};

  var options, nodes, elem;
  wand.state = [];

  var badHtmlError = new Error('You did not pass a valid HTML Element');


  wand.init = function(opts) {
    // @params options - object that contains nodes and html container id
    options = opts || {}; // {} if no options, empty object
    if (!opts.elem || !document.getElementById(opts.elem)) {
      throw badHtmlError;
    }

    nodes = opts.nodes;
    elem = document.getElementById(opts.elem);
    elem.className += ' wand';

    var urlState = getParameterByName("wandState");
    if (urlState){
      wand.state = urlState;
      
      var wandHistory = urlState.split(',');
      renderNode(wandHistory[wandHistory.length - 1]);
    } else {
      wand.state = [];
      renderNode(0);
    }
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
    addToState(nodeId);
    // puts stuff into a template
    elem.innerHTML = '<h1>' + node.title + '</h1>';
    elem.innerHTML += '<div class="node-contents">' + node.content + '</div>';
    if (node.triggers) {
      for (var i = node.triggers.length - 1; i >= 0; i--) {
        renderTrigger(node.triggers[i]);
      }
    }
  }

  function addUrlParam(search, key, val) {
    var newParam = key + '=' + val,
      params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (search) {
      // Try to replace an existance instance
      params = search.replace(new RegExp('([\?&])' + key + '[^&]*'), '$1' + newParam);

      // If nothing was replaced, then add the new param to the end
      if (params === search) {
        params += '&' + newParam;
      }
    }

    return params;
  }
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function addToState(nodeId) {
    wand.state.push(nodeId);
    history.pushState(wand.state, "", addUrlParam(document.location.search, "wandState", wand.state));
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

}());
