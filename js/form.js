'use strict';

// Variables
var uploadDiv = document.getElementsByClassName('upload')[0];
var editOverlay = uploadDiv.getElementsByClassName('upload-overlay')[0];
var uploadOverlay = uploadDiv.getElementsByClassName('upload-image')[0];
var uploadSelectInput = uploadOverlay.getElementsByClassName('upload-input')[0];
var uploadFormCancelButton = editOverlay.getElementsByClassName('upload-form-cancel')[0];
var uploadFormSubmitButton = editOverlay.getElementsByClassName('upload-form-submit')[0];
var descriptionTextField = editOverlay.querySelector('.upload-form-description');
var uploadFiltersContainer = editOverlay.querySelector('.upload-filter-controls');
var filterOptionButtons = document.getElementsByName('upload-filter');
var currentFilterOption = 0;
var image = editOverlay.getElementsByClassName('filter-image-preview')[0];
var imageBaseClass = image.className;
var resizeDecreaseButton = editOverlay.getElementsByClassName('upload-resize-controls-button-dec')[0];
var resizeIncreaseButton = editOverlay.getElementsByClassName('upload-resize-controls-button-inc')[0];
var resizeValueField = editOverlay.getElementsByClassName('upload-resize-controls-value')[0];
var currentSize = resizeValueField.value;
var resizeStep = 25;

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;
var LEFT_KEY_CODE = 37;
var RIGHT_KEY_CODE = 39;
var PLUS_NUMPAD_KEY_CODE = 107;
var MINUS_NUMPAD_KEY_CODE = 109;
var PLUS_KEY_CODE = 187;
var MINUS_KEY_CODE = 189;

// Preparation
var showUploadAndHideEdit = function () {
  editOverlay.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  document.removeEventListener('keydown', editKeydownHandler);
};

var showEditAndHideUpload = function () {
  uploadOverlay.classList.add('invisible');
  editOverlay.classList.remove('invisible');
  document.addEventListener('keydown', editKeydownHandler);
};

showUploadAndHideEdit();

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

var editKeydownHandler = function (event) {
  if ((event.target === uploadFormCancelButton || event.target === uploadFormSubmitButton)
    && isActivateEvent(event)) {
    showUploadAndHideEdit();
  } else if (event.target !== descriptionTextField) {
    if (isEscapeEvent(event)) {
      showUploadAndHideEdit();
    } else if (isLeftEvent(event)) {
      event.preventDefault();
      previousFilter().click();
    } else if (isRightEvent(event)) {
      event.preventDefault();
      nextFilter().click();
    } else if (isPlusEvent(event)) {
      resizeImageUp();
    } else if (isMinusEvent(event)) {
      resizeImageDown();
    }
  }
};

// Show / hide edit form event listeners
uploadSelectInput.addEventListener('click', showEditAndHideUpload);
uploadFormCancelButton.addEventListener('click', showUploadAndHideEdit);

// Filters application
var addFilterToImage = function (event) {
  image.className = imageBaseClass + ' filter-' + event.target.value;
  updateCurrentFilterOption(event.target);
};

var updateCurrentFilterOption = function (option) {
  var i = 0;
  while (filterOptionButtons[i] !== option && i < filterOptionButtons.length) {
    i++;
  }
  currentFilterOption = i;
};

var nextFilter = function () {
  currentFilterOption++;
  if (currentFilterOption >= filterOptionButtons.length) {
    currentFilterOption = filterOptionButtons.length - 1;
  }
  return filterOptionButtons[currentFilterOption];
};

var previousFilter = function () {
  currentFilterOption--;
  if (currentFilterOption < 0) {
    currentFilterOption = 0;
  }
  return filterOptionButtons[currentFilterOption];
};

uploadFiltersContainer.addEventListener('click', addFilterToImage);

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
filterOptionButtons[currentFilterOption].click();
