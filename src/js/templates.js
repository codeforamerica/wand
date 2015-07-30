var Wand = (function(wand) {

  'use strict';

  wand = wand || {};
  wand.template = {};

  // puts stuff into a template
  wand.template.node = '<h1>{{title}}</h1>' +
    '<div class="node-contents">{{content}}</div>';

  wand.template.triggers = {

    'pickOne': '{{content}}'

  };

  return wand;
}(Wand || {}));
