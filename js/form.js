'use strict';

(function () {
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
  var resizeValueField = resizeControls.getElementsByClassName('upload-resize-controls-value')[0];
  var resizeStep = 25;

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

  // Form open/close keydown handler
  var editKeydownHandler = function (event) {
    if ((event.target === uploadFormCancelButton || event.target === uploadFormSubmitButton)
      && window.eventChecker.isActivateEvent(event)) {
      showUploadAndHideEdit();
    } else if (event.target !== descriptionTextField) {
      if (window.eventChecker.isEscapeEvent(event)) {
        showUploadAndHideEdit();
      }
    }
  };

  // Show / hide edit form event listeners
  uploadSelectInput.addEventListener('click', showEditAndHideUpload);
  uploadFormCancelButton.addEventListener('click', showUploadAndHideEdit);

  // Image scaling
  var adjustScale = function (scale) {
    image.style.transform = 'scale(' + scale / 100 + ')';
    resizeValueField.value = scale + '%';
  };

  // Last argument is a list of exception page elements - we don't want the callback
  // if keyboard events happen with target on them
  window.initializeScale(resizeControls, resizeStep, 100, adjustScale, [descriptionTextField]);

  // Filters application
  var applyFilter = function (newFilter, oldFilter) {
    if (oldFilter) {
      image.classList.remove('filter-' + oldFilter);
    }
    image.classList.add('filter-' + newFilter);
  };

  window.initializeFilters(image, filterOptionButtons, applyFilter, [descriptionTextField]);
})();
