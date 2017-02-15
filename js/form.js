'use strict';

// Variables
var uploadDiv = document.getElementsByClassName('upload')[0];
var editOverlay = uploadDiv.getElementsByClassName('upload-overlay')[0];
var uploadOverlay = uploadDiv.getElementsByClassName('upload-image')[0];
var uploadFormCancelButton = editOverlay.getElementsByClassName('upload-form-cancel')[0];
var uploadFormSubmitButton = editOverlay.getElementsByClassName('upload-form-submit')[0];
var uploadSelectInput = uploadOverlay.getElementsByClassName('upload-input')[0];
var descriptionTextField = editOverlay.querySelector('.upload-form-description');
var filterOptionButtons = document.getElementsByName('upload-filter');
var image = editOverlay.getElementsByClassName('filter-image-preview')[0];
var resizeControls = editOverlay.getElementsByClassName('upload-resize-controls')[0];

var resizeStep = 25;

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

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

// Form open/close keydown handler
var editKeydownHandler = function (event) {
  if ((event.target === uploadFormCancelButton || event.target === uploadFormSubmitButton)
    && isActivateEvent(event)) {
    showUploadAndHideEdit();
  } else if (event.target !== descriptionTextField) {
    if (isEscapeEvent(event)) {
      showUploadAndHideEdit();
    }
  }
};

// Show / hide edit form event listeners
uploadSelectInput.addEventListener('click', showEditAndHideUpload);
uploadFormCancelButton.addEventListener('click', showUploadAndHideEdit);

// Filters application
window.initializeFilters(image, filterOptionButtons);

// Image scaling: buttons
window.createScale(resizeControls, resizeStep, 100);
