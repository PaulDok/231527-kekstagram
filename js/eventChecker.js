'use strict';

window.eventChecker = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var LEFT_KEY_CODE = 37;
  var RIGHT_KEY_CODE = 39;
  var PLUS_NUMPAD_KEY_CODE = 107;
  var MINUS_NUMPAD_KEY_CODE = 109;
  var PLUS_KEY_CODE = 187;
  var MINUS_KEY_CODE = 189;

  // Key events service functions
  var isActivateEvent = function (event) {
    return event && event.keyCode === ENTER_KEY_CODE;
  };

  var isEscapeEvent = function (event) {
    return event && event.keyCode === ESCAPE_KEY_CODE;
  };

  var isLeftEvent = function (event) {
    return event && event.keyCode === LEFT_KEY_CODE;
  };

  var isRightEvent = function (event) {
    return event && event.keyCode === RIGHT_KEY_CODE;
  };

  var isPlusEvent = function (event) {
    return (event && event.keyCode === PLUS_NUMPAD_KEY_CODE ||
      event && event.keyCode === PLUS_KEY_CODE && event.shiftKey);
  };

  var isMinusEvent = function (event) {
    return (event.keyCode && event.keyCode === MINUS_NUMPAD_KEY_CODE ||
      event && event.keyCode === MINUS_KEY_CODE && event.shiftKey);
  };

  return {
    isActivateEvent: isActivateEvent,
    isEscapeEvent: isEscapeEvent,
    isLeftEvent: isLeftEvent,
    isRightEvent: isRightEvent,
    isPlusEvent: isPlusEvent,
    isMinusEvent: isMinusEvent
  };
})();
