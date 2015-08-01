describe('Wand State', function() {

  var _elem, wand;
  var expect = chai.expect;
  var elemId = 'testDiv';
  var opts = {
    elem: elemId,
    nodes: [{
      "id": 0, "title": "First Node", "type": "pickOne",
      "triggers": [{ "target": 1, "content": "test" }],
    }, {
      "id": 1, "title": "Second Node", "type": "pickOne", 'triggers': [],
    }],
    callbackFns: []
  };

  beforeEach(function() {
    var _elem = document.createElement('div');
    _elem.id = elemId;
    document.body.appendChild(_elem);
  });

  afterEach(function() {
    window.history.pushState(null, null, '/');
  });

  it('should check for wandState queryString and set history appropriately', function() {
    window.history.pushState(
      [0,1], "", addUrlParam(document.location.search, "wandState", [0,1])
    );
    wand = Wand;
    wand.init(opts);
    expect(Wand.state.getState()).to.deep.equal([0, 1]);
  });

  describe('From starting node', function() {

    beforeEach(function() {
      wand = Wand;
      wand.init(opts);
    });

    it('should know the first node', function() {
      expect(Wand.state.getState()).to.deep.equal([0]);
    });

    it('should know the second node', function() {
      document.getElementById(elemId).getElementsByTagName("button")[0].click();
      console.log(Wand.state.getState());
      expect(Wand.state.getState()).to.deep.equal([0, 1]);
    });

    it('should encode the state into the url', function() {
      expect(getParameterByName("wandState")).to.equal("0");
    });

    it('should encode the state past the first node into the url', function() {
      document.getElementById(elemId).getElementsByTagName("button")[0].click();
      expect(getParameterByName("wandState")).to.equal("0,1");
    });

    it('should navigate back properly', function(done) {
      document.getElementById(elemId).getElementsByTagName("button")[0].click();
      // setTimeout from http://cgrune.com/2013/10/25/testing-window-history/
      setTimeout(function() {
        window.history.back();
      }, 10);
      done();
      expect(getParameterByName("wandState")).to.equal("0");
      expect(Wand.state.getState()).to.deep.equal([0]);
    });

  });
  var addUrlParam = function(search, key, val) {
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
  };

  var getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
});
