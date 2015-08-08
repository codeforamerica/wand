
describe('Wand', function () {

  var _elem, wand, opts, notificationsSpy;
  var expect = chai.expect;
  var elemId = 'wandSpecDiv';
  var nodes = [{"id": 0, 'type': 'pickOne', 'title': "node 0 title", "content": "foo", "triggers": []}];
  var badApiTrigger = [{"callbackFn": "DOESNOTEXIST", "content": "test"}];
  var goodApiTrigger = [{"callbackFn": "aFunction", "content": "test"}];
  var nestedApiTrigger = [{"callbackFn": "nested.aFunction", "content": "test"}];

  var goodPreTrigger = [{ "callbackFn": "aFunction",
                          "preprocessor": "bFunction",
                          "content": "test"}];

  var badPreTrigger = [{ "callbackFn": "aFunction",
                          "preprocessor": "DOESNOTEXIST",
                          "content": "test"}];

  window.aFunction = function(){};
  window.bFunction = function(){};
  window.nested = {};
  window.nested.aFunction = function(){};

  beforeEach(function () {
    opts = {elem: elemId, nodes: nodes};
    var _elem = document.createElement('div');
    _elem.id = elemId;
    document.body.appendChild(_elem);
    wand = Wand;
    notificationsSpy = sinon.spy(wand.notifications.add);
  });

  afterEach(function() {
    opts = {};
    var node = document.getElementById(elemId);
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
    // notificationsSpy.restore();
  });

  it('should fail without any options', function () {
    expect(function(){ wand.init(); } ).to.throw(Error);
  });

  it('should fail without an html element', function () {
    expect(function(){ wand.init({elem: null}); } ).to.throw(Error);
    expect(notificationsSpy.callCount).to.eq(1);
  });

  it('should fail with a bad html element', function () {
    expect(function(){ wand.init({elem: 'NOELEMENTHERE'}); } ).to.throw(Error);
    expect(notificationsSpy.callCount).to.eq(1);
  });

  it('should fail with duplicate nodes', function() {
    opts.nodes = [{'id': 0}, {'id': 0}];
    expect(function() { wand.init(opts); }).to.throw(Error);
    // WORK IN PROGRESS
    expect(notificationsSpy.callCount).to.eq(1);
  });

  it('should successfully initialize with a valid options', function () {
    wand.init(opts);
  });

  it('should create a wand notification hub when initialized', function() {
    wand.init(opts);
    should.exist(document.getElementById('wand-notifications-container'));
  })

  it('should have a container class of wand-container', function () {
    wand.init(opts);
    expect(document.getElementsByClassName('wand-container').length).to.eq(1);
  });

  describe('Wand API Node', function() {

    beforeEach(function() {
      opts.nodes[0].type = 'api';
    });

    it('should fail to initialize if it cannot find a function in the callbackFns', function() {
      opts.nodes[0].triggers = badApiTrigger;
      expect(function() { wand.init(nodes); }).to.throw(Error);
      expect(notificationsSpy.callCount).to.eq(1);
    });

    it('should initialize properly if the callbackFns are registered', function() {
      opts.nodes[0].triggers = goodApiTrigger;
      wand.init(opts);
    });

    it('should initialize properly even with nested callbacks', function() {
      opts.nodes[0].triggers = nestedApiTrigger;
      wand.init(opts);
    });

    it('should initialize with a preprocessor', function() {
      opts.nodes[0].triggers = goodPreTrigger;
      wand.init(opts);
    });

    it('should fail to initialize with a bad preprocessor', function() {
      opts.nodes[0].triggers = badPreTrigger;
      wand.init(opts);
    });

  });

});
