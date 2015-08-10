var Wand = (function(wand) {

  'use strict';

  wand = wand || {};
  wand.errors = {};

  wand.errors.badHtmlError = new Error('You did not pass a valid HTML Element');
  wand.errors.noSuchCallbackError = new Error('We could not find a callback function with that name!');
  wand.errors.duplicateNodeIdError = new Error('Your nodes contain duplicate IDs.');
  wand.errors.nodeDoesNotExistError = new Error('Node does not exist');
  wand.errors.badXHRResponseError = new Error('The XHR response returned an error.');

  return wand;
}(Wand || {}));
