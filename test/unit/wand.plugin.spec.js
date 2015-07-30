describe('Wand plugin', function () {

  var _elem, wand;
  var expect = chai.expect;
  var elemId = 'testDiv';
  var nodes = [{"id": 0, 'triggers': []}];
  var opts = {elem: elemId, nodes: nodes};

  beforeEach(function () {
    var _elem = document.createElement('div');
    _elem.setAttribute('id', elemId);
    document.body.appendChild(_elem);
  });

  it('should allow for new public methods on wand object', function(){
    var called = false;

    var wandWithPlugin = (function (wand) {
      wand.newPluginFunction = function() {
        called = true;
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
