'use strict';

window.initializeFilters = (function () {
  var getNewIndex = function (array, element) {
    var i = 0;
    while (array[i] !== element && i < array.length) {
      i++;
    }
    return i;
  };

  return function (image, filters, callback, exceptions) {
    var currentFilter = null;
    var currentFilterIndex = 0;

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

    var modifyFilter = function (event) {
      callback(event.target.value, currentFilter);
      currentFilter = event.target.value;
      currentFilterIndex = getNewIndex(filters, event.target);
    };

    // Left / Right Keydown handler
    var filtersKeydownHandler = function (event) {
      if (!exceptions.includes(event.target)) {
        if (window.eventChecker.isLeftEvent(event)) {
          event.preventDefault();
          previousFilter().click();
        } else if (window.eventChecker.isRightEvent(event)) {
          event.preventDefault();
          nextFilter().click();
        }
      }
    };

    // EventListeners registration
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('click', modifyFilter);
    }
    document.addEventListener('keydown', filtersKeydownHandler);

    filters[0].click();
  };
})();
