describe('Wand', function () {

  var _elem, wand;
  var expect = chai.expect;
  var elemId = 'testDiv';
  var nodes = [{"id": 0}];
  var opts = {elem: elemId, nodes: nodes};

  beforeEach(function () {
    var _elem = document.createElement('div');
    _elem.setAttribute('id', elemId);
    document.body.appendChild(_elem);
    wand = Wand;
  });

  it('should fail without any options', function () {
    expect(function(){ wand.init(); } ).to.throw(Error);
  });


  it('should fail without an html element', function () {
    expect(function(){ wand.init({elem: null}); } ).to.throw(Error);
  });

  it('should fail with a bad html element', function () {
    // test that we pass successfully
    expect(function(){ wand.init({elem: 'NOELEMENTHERE'}); } ).to.throw(Error);
  });

  it('should successfully initialize with a valid options', function () {
    wand.init(opts);
  });


});
