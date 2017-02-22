'use strict';

(function () {
  var URL_PICTURES = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];
  var picturesBlock = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var pictureTemplate = templateElement.content.querySelector('.picture');

  var showGalleryOnEnter = function (event) {
    if (window.eventChecker.isActivateEvent(event) && event.target.classList.contains('picture')) {
      event.target.click();
    }
  };

  var onLoad = function (result) {
    pictures = result;
    picturesBlock.innerHTML = '';
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(render(picture));
    });

    picturesBlock.appendChild(fragment);
    document.addEventListener('keydown', showGalleryOnEnter);
  };

  var render = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    var image = newPicture.querySelector('img');
    var likes = newPicture.querySelector('.picture-likes');
    var comments = newPicture.querySelector('.picture-comments');

    var showGalleryOnClick = function (event) {
      event.preventDefault();
      window.showGallery(picture);
    };

    newPicture.setAttribute('href', picture.url);
    image.setAttribute('src', picture.url);
    likes.innerHTML = picture.likes;
    comments.innerHTML = picture.comments.length;

    newPicture.addEventListener('click', showGalleryOnClick);

    return newPicture;
  };

  window.load(URL_PICTURES, onLoad);
})();
