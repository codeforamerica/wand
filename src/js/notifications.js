var Wand = (function(wand) {

/* Inspiration taken from
   https://github.com/cugos/dropchop/blob/master/src/js/notifications/Notifications.js
 */

  'use strict';

  wand = wand || {};
  wand.notifications = {};
  var params;

  wand.notifications.init = function() {
    // create DOM element
    this.domElement = buildDomElement();

    // create notification center & locations
    wand.notifications.hub = document.getElementById('wand-notifications-container');
  };

  wand.notifications.add = function(options) {
    params = {};
    params.text = options.text || 'THIS NOTIFICATION REQUIRES TEXT';
    params.time = options.time || -1;
    params.type = options.type || 'default';

    // add a new notification to the stream
    var note = document.createElement('div');
    note.className = 'wand-notification ' + options.type;
    note.innerHTML = options.text;

    var hub = wand.notifications.hub || buildNotificationShell();
    hub.appendChild(note);

    // TODO: add/remove notifications to an array to interact with them
    // instead of relying on setTimeout() dictating their existence.
    if (params.time > -1) {
      setTimeout(function () {
          hub.removeChild( wand.notifications.hub.firstChild );
      }, params.time);
    }

  };

  function buildDomElement() {
    var el = document.createElement('div');
    el.id = 'wand-notifications-container';

    var wandElem = wand.elem || document.body;
    wandElem.appendChild(el);
    return el;

  }

  function buildNotificationShell() {
    var el = document.createElement('div');
    el.className = 'wand-container';

    var notificationContainer = buildDomElement();
    el.appendChild(notificationContainer);
    document.body.appendChild(el);

    return notificationContainer;
  }

  return wand;
}(Wand || {}));
