var Wand = (function(wand) {

  'use strict';

  wand = wand || {};
  wand.template = {};

  // puts stuff into a template
  wand.template.node = '<h1 class="wand-node-title">{{title}}</h1>' +
    '<div class="wand-node-content">{{content}}</div>';

  wand.template.triggers = {

    'pickOne': '{{content}}',

    'api': '<input type="text" />' +
      '<button id="Wand-js-{{_id}}">{{content}}</button>'

  };

  // wand.template.history = {
  //   'node': ''
  // }

  return wand;
}(Wand || {}));
