'use strict';

(function () {
  var URL_PICTURES = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];
  var picturesBlock = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var pictureTemplate = templateElement.content.querySelector('.picture');
  var filters = document.querySelector('.filters');

  var sortByCommentsNumber = function (a, b) {
    return b.comments.length - a.comments.length;;
  };

  var showGalleryOnEnter = function (event) {
    if (window.eventChecker.isActivateEvent(event) && event.target.classList.contains('picture')) {
      event.target.click();
    }
  };

  var onLoad = function (result) {
    pictures = result;
    fillPicturesOnPage(pictures);

    document.addEventListener('keydown', showGalleryOnEnter);
    filters.classList.remove('hidden');
    filters.addEventListener('change', changeFilter);
  };

  var changeFilter = function (event) {
    switch (event.target.value) {
      case 'popular':
        fillPicturesOnPage(pictures);
        break;
      case 'new':
        fillPicturesOnPage(getRandomElements(pictures, 10));
        break;
      case 'discussed':
        fillPicturesOnPage(getSortedPictures(pictures));
        break;
    }
  };

  var fillPicturesOnPage = function (array) {
    picturesBlock.innerHTML = '';
    var fragment = document.createDocumentFragment();
    array.forEach(function (picture) {
      fragment.appendChild(render(picture));
    });
    picturesBlock.appendChild(fragment);
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

  var getRandomElements = function (array, quantity) {
    var tempArray = array.slice();
    var result = [];
    for (var i = 0; i < quantity; i++) {
      var index = Math.floor(Math.random() * tempArray.length);
      result.push(tempArray[index]);
      tempArray.splice(index, 1);
    }
    return result;
  };

  var getSortedPictures = function (array) {
    return array.slice().sort(sortByCommentsNumber);
  };

  window.load(URL_PICTURES, onLoad);
})();
