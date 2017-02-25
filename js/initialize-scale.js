'use strict';

window.initializeScale = (function () {
  return function (element, step, value, callback, exceptions) {
    var resizeIncreaseButton = element.getElementsByClassName('upload-resize-controls-button-inc')[0];
    var resizeDecreaseButton = element.getElementsByClassName('upload-resize-controls-button-dec')[0];

    // Resizing functions
    var resizeImageUp = function () {
      value += step;
      value = Math.min(100, value);
      callback(value);
    };

    var resizeImageDown = function () {
      value -= step;
      value = Math.max(25, value);
      callback(value);
    };

    var isEnterOnButton = function (event, button) {
      if (event.target === button) {
        if (window.eventChecker.isActivateEvent(event)) {
          return true;
        }
      }
      return false;
    };

    var isPlusKeyNotOnException = function (event) {
      if (window.eventChecker.isPlusEvent(event)) {
        // Check if the event's target is in the list of exceptions (elements we don't want to react on)
        if (exceptions.indexOf(event.target) === -1) {
          return true;
        }
      }
      return false;
    };

    var isMinusKeyNotOnException = function (event) {
      if (window.eventChecker.isMinusEvent(event)) {
        // Check if the event's target is in the list of exceptions (elements we don't want to react on)
        if (exceptions.indexOf(event.target) === -1) {
          return true;
        }
      }
      return false;
    };

    // + / - Keydown handler
    var zoomKeydownHandler = function (event) {
      if (isEnterOnButton(event, resizeIncreaseButton) || isPlusKeyNotOnException(event)) {
        resizeIncreaseButton.click();
      } else if (isEnterOnButton(event, resizeDecreaseButton) || isMinusKeyNotOnException(event)) {
        resizeDecreaseButton.click();
      }
    };

    resizeIncreaseButton.addEventListener('click', resizeImageUp);
    resizeDecreaseButton.addEventListener('click', resizeImageDown);
    document.addEventListener('keydown', zoomKeydownHandler);

    callback(value);
  };
})();
