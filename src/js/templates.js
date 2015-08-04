var Wand = (function(wand) {

  'use strict';

  wand = wand || {};
  wand.template = {};

  // puts stuff into a template
  wand.template.node = '<h1>{{title}}</h1>' +
    '<div class="node-contents">{{content}}</div>';

  wand.template.triggers = {

    'pickOne': '{{content}}',

    'api': '<input type="text" id="Wand-input-{{_id}}" />' +
      '<button type="button" id="Wand-submit-{{_id}}">{{content}}</button>'

  };

  return wand;
}(Wand || {}));
