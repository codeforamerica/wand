(function() {
  Wand = function(options) {
    // @params options - object that contains nodes and html container id
    
    this.options = options || {} ;// {} if no options, empty object

    if (!options.elem || !document.getElementById(options.elem)) {
      throw badHtmlError;
    }

    this.nodes = options.nodes;
    this.elem = document.getElementById(options.elem);
    this.elem.className += ' wand';

	this.header = document.createElement('header');
	this.body = document.createElement('section');
	this.body.className = 'wizard-body';
	
	this.elem.appendChild(this.header);
	this.elem.appendChild(this.body);
    //this.renderNode(0);	
    
    
  };

  var badHtmlError = new Error('You did not pass a valid HTML Element');

  Wand.prototype.getNode = function(nodeId) {
    for (var i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].id === nodeId) {
        return this.nodes[i];
      }
    }
    console.error('Node does not exist:', nodeId);
    return;
  }

  Wand.prototype.renderNode = function(nodeId) {
	console.log(this)
    var node = this.getNode(nodeId);
    if (!node) { throw new Error('redundant unfound node error'); }
    // puts stuff into a template
    
    this.elem.innerHTML = '<h1>' + node.title + '</h1>';
    this.elem.innerHTML += '<div class="node-contents">' + node.content + '</div>';
    if (node.triggers) {
      for (var i = node.triggers.length - 1; i >= 0; i--) {
        this.renderTrigger(node.triggers[i]);
      }
    }
  }

  Wand.prototype.renderTrigger = function(trigger) {
    var button = document.createElement('button');
    button.innerHTML = trigger.content;
    var self = this;
    button.onclick = function (event) {
      self.renderNode(trigger.target);
    };

    this.elem.appendChild(button);
  }

}());
