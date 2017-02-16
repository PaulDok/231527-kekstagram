'use strict';

window.createScale = (function () {
  var image = document.getElementsByClassName('filter-image-preview')[0];
  var descriptionTextField = document.querySelector('.upload-form-description');

  var resizeIncreaseButton = null;
  var resizeDecreaseButton = null;
  var resizeValueField = null;
  var currentScale = null;
  var step = null;

  var ENTER_KEY_CODE = 13;
  var PLUS_NUMPAD_KEY_CODE = 107;
  var MINUS_NUMPAD_KEY_CODE = 109;
  var PLUS_KEY_CODE = 187;
  var MINUS_KEY_CODE = 189;

  // Key events service functions
  var isActivateEvent = function (event) {
    return event && event.keyCode === ENTER_KEY_CODE;
  };

  var isPlusEvent = function (event) {
    return (event && event.keyCode === PLUS_NUMPAD_KEY_CODE ||
      event && event.keyCode === PLUS_KEY_CODE && event.shiftKey);
  };

  var isMinusEvent = function (event) {
    return (event.keyCode && event.keyCode === MINUS_NUMPAD_KEY_CODE ||
      event && event.keyCode === MINUS_KEY_CODE && event.shiftKey);
  };

  // Resizing functions
  var changeScaling = function () {
    var scaleStyleValue = currentScale / 100;
    image.style.transform = 'scale(' + scaleStyleValue + ')';
    resizeValueField.value = currentScale + '%';
  };

  var resizeImageUp = function () {
    currentScale += step;
    currentScale = Math.min(100, currentScale);
    changeScaling();
  };

  var resizeImageDown = function () {
    currentScale -= step;
    currentScale = Math.max(25, currentScale);
    changeScaling();
  };

  // + / - Keydown handler
  var zoomKeydownHandler = function (event) {
    if ((event.target === resizeIncreaseButton && isActivateEvent(event)) ||
      (isPlusEvent(event) && event.target !== descriptionTextField)) {
      resizeIncreaseButton.click();
    } else if ((event.target === resizeDecreaseButton && isActivateEvent(event)) ||
      (isMinusEvent(event) && event.target !== descriptionTextField)) {
      resizeDecreaseButton.click();
    }
  };

  var initializeVariables = function (element, stepIn, value) {
    resizeIncreaseButton = element.getElementsByClassName('upload-resize-controls-button-inc')[0];
    resizeDecreaseButton = element.getElementsByClassName('upload-resize-controls-button-dec')[0];
    resizeValueField = element.getElementsByClassName('upload-resize-controls-value')[0];
    currentScale = value;
    step = stepIn;
  };

  var addListeners = function () {
    resizeIncreaseButton.addEventListener('click', resizeImageUp);
    resizeDecreaseButton.addEventListener('click', resizeImageDown);
    document.addEventListener('keydown', zoomKeydownHandler);

    changeScaling();
  };

  return function (element, step, value) {
    initializeVariables(element, step, value);
    addListeners();
  };
})();
