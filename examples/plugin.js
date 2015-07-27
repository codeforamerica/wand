/*
**
** This is an example of a Wand plugin.
**
*/
var Wand = (function (wand) {

  // adds a new public function called `reset` to
  // the Wand library and uses the public function
  // `renderNode`
  wand.reset = function() {
    this.renderNode(0);
  };
  
  // changes the `renderNode` function by saving
  // the original value, adding new functionality,
  // and then running the original function
  var old_renderNode = wand.renderNode;
  wand.renderNode = function(id) {
    // do this
    console.log('a new renderNode function');

    // and then run the original function
    old_renderNode(id);
  };

  return wand;
}(Wand));