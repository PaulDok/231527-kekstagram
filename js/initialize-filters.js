'use strict';

window.initializeFilters = function (image, filters) {
  var currentFilter = null;
  var currentFilterIndex = 0;

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

  window.nextFilter = function () {
    currentFilterIndex++;
    if (currentFilterIndex >= filters.length) {
      currentFilterIndex = filters.length - 1;
    }
    return filters[currentFilterIndex];
  };

  window.previousFilter = function () {
    currentFilterIndex--;
    if (currentFilterIndex < 0) {
      currentFilterIndex = 0;
    }
    return filters[currentFilterIndex];
  };

  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', addFilterToImage);
  }

  filters[0].click();
};
