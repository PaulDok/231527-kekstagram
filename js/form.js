'use strict';

// Variables
var editOverlay = document.getElementsByClassName('upload-overlay')[0];
var uploadOverlay = document.getElementById('upload-select-image');
var uploadSelectInput = document.getElementById('upload-file');
var uploadFormCancelButton = editOverlay.getElementsByClassName('upload-form-cancel')[0];
var filterOptionButtons = document.getElementsByName('upload-filter');
var image = editOverlay.getElementsByClassName('filter-image-preview')[0];
var imageBaseClass = image.className;
var resizeDecreaseButton = editOverlay.getElementsByClassName('upload-resize-controls-button-dec')[0];
var resizeIncreaseButton = editOverlay.getElementsByClassName('upload-resize-controls-button-inc')[0];
var resizeValueField = editOverlay.getElementsByClassName('upload-resize-controls-value')[0];
var currentSize = resizeValueField.value;
var resizeStep = 25;

// Preparation
var showUploadAndHideEdit = function () {
  editOverlay.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
};

var showEditAndHideUpload = function () {
  uploadOverlay.classList.add('invisible');
  editOverlay.classList.remove('invisible');
};

showUploadAndHideEdit();

// Show / hide edit form
uploadSelectInput.addEventListener('click', showEditAndHideUpload);
uploadFormCancelButton.addEventListener('click', showUploadAndHideEdit);

// Filters application
var addFilterToImage = function () {
  image.className = imageBaseClass + ' filter-' + this.value;
};

for (var i = 0; i < filterOptionButtons.length; i++) {
  var filterOptionButton = filterOptionButtons[i];
  filterOptionButton.addEventListener('click', addFilterToImage);
}

// Image scaling: buttons
var resizeImage = function (value) {
  resizeValueField.value = value + '%';
  changeScaling(value);
};

var resizeImageDown = function () {
  currentSize -= resizeStep;
  currentSize = Math.max(25, currentSize);
  resizeImage(currentSize);
};

var resizeImageUp = function () {
  currentSize += resizeStep;
  currentSize = Math.min(100, currentSize);
  resizeImage(currentSize);
};

resizeDecreaseButton.addEventListener('click', resizeImageDown);
resizeIncreaseButton.addEventListener('click', resizeImageUp);

// Image scaling: actual scaling of image
var changeScaling = function (scalePercent) {
  var scaleStyleValue = scalePercent / 100;
  image.style.transform = 'scale(' + scaleStyleValue + ')';
};

// Initialize: Reset sizing field value to 100%
resizeValueField.value = '100%';
currentSize = 100;
changeScaling(100);
