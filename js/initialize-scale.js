'use strict';

window.createScale = function (element, step, value) {
  var image = document.getElementsByClassName('filter-image-preview')[0];
  var resizeIncreaseButton = element.getElementsByClassName('upload-resize-controls-button-inc')[0];
  var resizeDecreaseButton = element.getElementsByClassName('upload-resize-controls-button-dec')[0];
  var resizeValueField = element.getElementsByClassName('upload-resize-controls-value')[0];
  var currentScale = value;

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

  resizeIncreaseButton.addEventListener('click', resizeImageUp);
  resizeDecreaseButton.addEventListener('click', resizeImageDown);

  changeScaling();
};
