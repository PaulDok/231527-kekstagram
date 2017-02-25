'use strict';

window.initializeFilters = (function () {
  return function (image, filters, callback, exceptions) {
    var currentFilter = null;
    var currentFilterIndex = 0;
    var FILTER_PREVIEW_CLASS = 'upload-filter-preview';

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
      currentFilterIndex = filters.indexOf(event.target);
    };

    var isActivateEventOnFilter = function (event) {
      if (window.eventChecker.isActivateEvent(event)) {
        if (event.target.classList.contains(FILTER_PREVIEW_CLASS)) {
          return true;
        }
      }
      return false;
    };

    // Left / Right Keydown handler
    var filtersKeydownHandler = function (event) {
      if (exceptions.indexOf(event.target) === -1) {
        if (window.eventChecker.isLeftEvent(event)) {
          event.preventDefault();
          previousFilter().click();
        } else if (window.eventChecker.isRightEvent(event)) {
          event.preventDefault();
          nextFilter().click();
        } else if (isActivateEventOnFilter(event)) {
          event.target.click();
        }
      }
    };

    // EventListeners registration
    filters.forEach(function (filter) {
      filter.addEventListener('click', modifyFilter);
    });
    document.addEventListener('keydown', filtersKeydownHandler);

    filters[0].click();
  };
})();
