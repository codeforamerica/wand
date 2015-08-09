
describe('Wand notifications', function () {

  var _elem, wand, opts, notificationAddSpy;
  var expect = chai.expect;
  var elemId = 'wandSpecDiv';
  var nodes = [{"id": 0, 'type': 'pickOne', 'title': "node 0 title", "content": "foo", "triggers": []}];

  beforeEach(function () {
    opts = {elem: elemId, nodes: nodes};
    var _elem = document.createElement('div');
    _elem.id = elemId;
    document.body.appendChild(_elem);
    wand = Wand;
    notificationAddSpy = sinon.spy(wand.notifications, 'add');
  });

  afterEach(function() {
    opts = {};
    document.body.innerHTML = '';
    notificationAddSpy.restore();
  });

  it('should add a notification with bad html element', function () {
    expect(function(){ wand.init({elem: 'NOELEMENTHERE'}); } ).to.throw(Error);
    expect(notificationAddSpy.callCount).to.eq(1);
  });

  it('should create the whole notification container class with bad html element', function() {
    notificationAddSpy.restore();
    expect(function(){ wand.init({elem: 'GARRRBAGE'}); } ).to.throw(Error);
    should.exist(document.getElementById('wand-notifications-container'));
    expect(document.getElementsByClassName('alert').length).to.eq(1);
  });

  it('should add a notification with no html element', function () {
    expect(function(){ wand.init({elem: null}); } ).to.throw(Error);
    expect(notificationAddSpy.callCount).to.eq(1);
  });

  it('should create the whole notification container class with no html element', function() {
    notificationAddSpy.restore();
    expect(function(){ wand.init({elem: null}); } ).to.throw(Error);
    should.exist(document.getElementById('wand-notifications-container'));
    expect(document.getElementsByClassName('alert').length).to.eq(1);
  });

  it('should create a notification when we have dupliate nodes', function() {
    opts.nodes = [{'id': 0}, {'id': 0}];
    expect(function() { wand.init(opts); }).to.throw(Error);
    expect(notificationAddSpy.callCount).to.eq(1);
  });

  it('should create a notification hub when wand is initialized', function() {
    wand.init(opts);
    should.exist(document.getElementById('wand-notifications-container'));
  });

});
