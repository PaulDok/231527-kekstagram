'use strict';

window.initializeFilters = (function () {
  var descriptionTextField = document.querySelector('.upload-form-description');
  var currentFilter = null;
  var currentFilterIndex = 0;
  var image = null;
  var filters = null;

  var LEFT_KEY_CODE = 37;
  var RIGHT_KEY_CODE = 39;

  // Key events service functions
  var isLeftEvent = function (event) {
    return event && event.keyCode === LEFT_KEY_CODE;
  };

  var isRightEvent = function (event) {
    return event && event.keyCode === RIGHT_KEY_CODE;
  };

  // Filter application
  var addFilterToImage = function (event) {
    if (currentFilter) {
      image.classList.remove(currentFilter);
    }

    currentFilter = 'filter-' + event.target.value;
    image.classList.add(currentFilter);

    updateCurrentFilterOption(event.target);
  };

  var updateCurrentFilterOption = function (option) {
    var i = 0;
    while (filters[i] !== option && i < filters.length) {
      i++;
    }
    currentFilterIndex = i;
  };

  var nextFilter = function () {
    currentFilterIndex++;
    if (currentFilterIndex >= filters.length) {
      currentFilterIndex = filters.length - 1;
    }
    return filters[currentFilterIndex];
  };

  var previousFilter = function () {
    currentFilterIndex--;
    if (currentFilterIndex < 0) {
      currentFilterIndex = 0;
    }
    return filters[currentFilterIndex];
  };

  // Left / Right Keydown handler
  var filtersKeydownHandler = function (event) {
    if (event.target !== descriptionTextField) {
      if (isLeftEvent(event)) {
        event.preventDefault();
        previousFilter().click();
      } else if (isRightEvent(event)) {
        event.preventDefault();
        nextFilter().click();
      }
    }
  };

  var initalizeVariables = function (imageIn, filtersIn) {
    image = imageIn;
    filters = filtersIn;
  };

  var addListeners = function () {
    // EventListeners registration
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', addFilterToImage);
    }
    document.addEventListener('keydown', filtersKeydownHandler);

    filters[0].click();
  };

  return function (image, filters) {
    initalizeVariables(image, filters);
    addListeners();
  };
})();
