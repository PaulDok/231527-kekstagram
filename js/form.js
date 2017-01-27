'use strict';

// Preparation
var editOverlay = document.getElementsByClassName('upload-overlay')[0];
var uploadOverlay = document.getElementById('upload-select-image');

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
var uploadSelectInput = document.getElementById('upload-file');
uploadSelectInput.onchange = showEditAndHideUpload();

var uploadFormCancelButton = document.getElementsByClassName('upload-form-cancel')[0];
uploadFormCancelButton.addEventListener('click', showUploadAndHideEdit);

// Filters application
var filterOptionButtons = document.getElementsByName('upload-filter');
var image = document.getElementsByClassName('filter-image-preview')[0];
var imageBaseClass = image.className;

var addFilterToImage = function (filterOption) {
  image.className = imageBaseClass + ' filter-' + filterOption;
};

for (var i = 0; i < filterOptionButtons.length; i++) {
  var filterOptionButton = filterOptionButtons[i];
  filterOptionButton.addEventListener('click', addFilterToImage.bind(null, filterOptionButton.value));
}

// Image scaling: buttons
var resizeDecreaseButton = document.getElementsByClassName('upload-resize-controls-button-dec')[0];
var resizeIncreaseButton = document.getElementsByClassName('upload-resize-controls-button-inc')[0];
var resizeValueField = document.getElementsByClassName('upload-resize-controls-value')[0];

var resizeStep = 25;

var resizeImage = function (delta) {
  var oldSizeValue = resizeValueField.value;
  oldSizeValue = parseInt(oldSizeValue.slice(0, -1), 10);
  var newSizeValue = Math.min(100, oldSizeValue + delta);
  newSizeValue = Math.max(25, newSizeValue);
  changeScaling(newSizeValue);
  newSizeValue += '%';
  resizeValueField.value = newSizeValue;
};

var resizeImageDown = function () {
  resizeImage(-resizeStep);
};

var resizeImageUp = function () {
  resizeImage(resizeStep);
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
changeScaling(100);
