'use strict';

window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryCloseButton = galleryOverlay.querySelector('.gallery-overlay-close');
  var image = galleryOverlay.querySelector('img');
  var likesCountSpan = galleryOverlay.querySelector('.likes-count');
  var commentsCountSpan = galleryOverlay.querySelector('.comments-count');

  var hideGallery = function () {
    galleryOverlay.classList.add('invisible');
    galleryCloseButton.removeEventListener('click', hideGallery);
    document.removeEventListener('keydown', hideGalleryKeydownHandler);
  };

  var hideGalleryOnClickHandler = function (event) {
    if (event.target === galleryCloseButton || event.target === galleryOverlay) {
      hideGallery();
    }
  };

  var hideGalleryKeydownHandler = function (event) {
    if (((event.target === galleryCloseButton) && (window.eventChecker.isActivateEvent(event))) ||
      window.eventChecker.isEscapeEvent(event)) {
      hideGallery();
    }
  };

  var fillBlock = function (data) {
    image.setAttribute('src', data.url);
    image.setAttribute('alt', data.url);
    likesCountSpan.innerHTML = data.likes;
    commentsCountSpan.innerHTML = data.comments.length;
  };

  return function (data) {
    galleryOverlay.classList.remove('invisible');
    fillBlock(data);
    galleryOverlay.addEventListener('click', hideGalleryOnClickHandler);
    document.addEventListener('keydown', hideGalleryKeydownHandler);
    galleryCloseButton.focus();
  };
})();
