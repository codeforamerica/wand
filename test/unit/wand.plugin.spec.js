describe('Wand plugin', function () {

  var _elem, wand;
  var expect = chai.expect;
  var elemId = 'testDiv';
  var nodes = [{"id": 0}];
  var opts = {elem: elemId, nodes: nodes};

  beforeEach(function () {
    var _elem = document.createElement('div');
    _elem.setAttribute('id', elemId);
    document.body.appendChild(_elem);
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
  }
  afterEach(function(){
    document.location.search = addUrlParam(document.location.search, "wandState", "");
  });

  it('should allow for new public methods on wand object', function(){
    var called = false;

    var wandWithPlugin = (function (wand) {
      wand.newPluginFunction = function() {
        called = true
      };
      return wand;
    }(Wand));

    wandWithPlugin.newPluginFunction();

    called.should.equal.true;
  });

  it('should allow for overriding public methods on wand object', function(){
    var called = false;

    var wandWithPlugin = (function (wand) {
      var oldInit = wand.init;
      wand.init = function(id) {
        called = true;
        oldInit(id);
      };
      return wand;
    }(Wand));

    wandWithPlugin.init(opts);

    called.should.equal.true;
  });
});
