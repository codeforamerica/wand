var Wand = (function(wand) {

  'use strict';

  wand = wand || {};

  wand.state = {};
  var _state = [];

  wand.state.getState = function() { return _state; };
  wand.state.getCurrentNode = function() { return _state[_state.length - 1]; };

  wand.state.init = function() {
    resetState();
    return getStateFromUrl();
  };

  wand.state.reset = function() {
    resetState();
    wand.engine.renderNode(0);
  }

  wand.state.previousNode = function() {
    return getStateFromUrl();
  };

  wand.state.addToState = function(nodeId) {
    if (nodeId !== wand.state.getCurrentNode()) {
      _state.push(nodeId);
      history.pushState(
        wand.state.getState(), '',
        addUrlParam(document.location.search, "wandState", encodeState(wand.state.getState()))
      );
    }
  };

  function getStateFromUrl() {
    var nodeId;
    var _loadState = decodeState(getParameterByName('wandState'));
    _state = _loadState;

    if (_loadState === '') {
      resetState();
      nodeId = Wand.opts.nodes[0].id;
    } else if (!wand.util.getNodeObject(wand.state.getCurrentNode())) {
      wand.notifications.add({
        text: 'Invalid wand state. Directing you to the beginning instead.',
        time: 3500,
        type: 'warning'
      });
      resetState();
      nodeId = Wand.opts.nodes[0].id;
    } else {
      nodeId = wand.state.getCurrentNode();
    }
    return nodeId;
  }

  function resetState() {
    _state = [];
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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

  function encodeState(state) {
    return state;
  }

  function decodeState(state) {
    if (state === '') {
      return state;
    }

    var decodedArray = [];
    state.split(',').forEach(function(id) {
      if (isNaN(+id)) {
        decodedArray.push(id);
      } else {
        decodedArray.push(+id);
      }
    });
    return decodedArray;

  }

  return wand;

}(Wand || {}));
