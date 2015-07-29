var WandState = (function() {

  var state = {};
  var _state = [];

  state.getState = function() { return _state; };
  state.getCurrentNode = function() { return _state[_state.length - 1]; };

  state.init = function() {
    resetState();
    _loadState = decodeState(getParameterByName('wandState'));
    if (_loadState === '') {
      return Wand.opts.nodes[0].id;
    }
    _state = _loadState;
    return state.getCurrentNode();
  };

  state.addToState = function(nodeId) {
    if (nodeId !== state.getCurrentNode()) {
      _state.push(nodeId);
      history.pushState(
        state.getState(), "", addUrlParam(document.location.search, "wandState", encodeState(state.getState()))
      );
    }
  };

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

  return state;

}(WandState || {}));
