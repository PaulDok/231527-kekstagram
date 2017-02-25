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
  var filterOptionButtons = [].slice.call(document.getElementsByName('upload-filter'));
  var image = editOverlay.getElementsByClassName('filter-image-preview')[0];
  var resizeControls = editOverlay.getElementsByClassName('upload-resize-controls')[0];
  var resizeValueField = resizeControls.getElementsByClassName('upload-resize-controls-value')[0];
  var RESIZE_STEP = 25;
  var INVISIBILITY_CLASS_NAME = 'invisible';

  // Preparation
  var showUploadAndHideEdit = function () {
    editOverlay.classList.add(INVISIBILITY_CLASS_NAME);
    uploadOverlay.classList.remove(INVISIBILITY_CLASS_NAME);
    document.removeEventListener('keydown', editKeydownHandler);
  };

  var showEditAndHideUpload = function () {
    uploadOverlay.classList.add(INVISIBILITY_CLASS_NAME);
    editOverlay.classList.remove(INVISIBILITY_CLASS_NAME);
    document.addEventListener('keydown', editKeydownHandler);
  };

  showUploadAndHideEdit();

  var isEnterOnCloseButton = function (event) {
    // Enter event
    if (window.eventChecker.isActivateEvent(event)) {
      // Return true if Enter event occured only on close or submit buttons
      switch (event.target) {
        case uploadFormCancelButton:
          return true;
        case uploadFormSubmitButton:
          return true;
      }
    }
    return false;
  };

  var isEscapeNotOnText = function (event) {
    if (window.eventChecker.isEscapeEvent(event)) {
      if (event.target !== descriptionTextField) {
        return true;
      }
    }
    return false;
  };

  // Form open/close keydown handler
  var editKeydownHandler = function (event) {
    if (isEnterOnCloseButton(event)) {
      showUploadAndHideEdit();
    } else if (isEscapeNotOnText(event)) {
      showUploadAndHideEdit();
    }
  };

  // Show / hide edit form event listeners
  uploadSelectInput.addEventListener('change', showEditAndHideUpload);
  uploadFormCancelButton.addEventListener('click', showUploadAndHideEdit);

  // Image scaling
  var adjustScale = function (scale) {
    image.style.transform = 'scale(' + scale / 100 + ')';
    resizeValueField.defaultValue = scale + '%';
  };

  // Last argument is a list of exception page elements - we don't want the callback
  // if keyboard events happen with target on them
  window.initializeScale(resizeControls, RESIZE_STEP, 100, adjustScale, [descriptionTextField]);

  // Filters application
  var applyFilter = function (newFilter, oldFilter) {
    if (oldFilter !== null) {
      image.classList.remove('filter-' + oldFilter);
    }
    image.classList.add('filter-' + newFilter);
  };

  window.initializeFilters(image, filterOptionButtons, applyFilter, [descriptionTextField]);
})();
