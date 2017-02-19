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

    // + / - Keydown handler
    var zoomKeydownHandler = function (event) {
      if ((event.target === resizeIncreaseButton && window.eventChecker.isActivateEvent(event)) ||
        (window.eventChecker.isPlusEvent(event) && !exceptions.includes(event.target))) {
        resizeIncreaseButton.click();
      } else if ((event.target === resizeDecreaseButton && window.eventChecker.isActivateEvent(event)) ||
        (window.eventChecker.isMinusEvent(event) && !exceptions.includes(event.target))) {
        resizeDecreaseButton.click();
      }
    };

    resizeIncreaseButton.addEventListener('click', resizeImageUp);
    resizeDecreaseButton.addEventListener('click', resizeImageDown);
    document.addEventListener('keydown', zoomKeydownHandler);

    callback(value);
  };
})();
