'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Index = function () {
  function Index(catContainer) {
    _classCallCheck(this, Index);

    this.container = catContainer;
  }

  _createClass(Index, [{
    key: 'load',
    value: function load() {
      var _this = this;

      var request = new Request('videos.json', { method: 'GET' });
      fetch(request).then(function (response) {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Something went wrong on api server!');
      }).then(function (data) {
        _this.parseData(data);
      }).catch(function (error) {
        console.error(error); // eslint-disable-line
      });
    }
  }, {
    key: 'parseData',
    value: function parseData(data) {
      this.videos = data.videos;
      this.categories = data.categories;
      this.getCategories();
    }
  }, {
    key: 'getCategories',
    value: function getCategories() {
      var _this2 = this;

      this.categories.forEach(function (data) {
        var section = document.createElement('section');
        section.classList.add('categories-section');

        var catTitle = document.createElement('h2');
        catTitle.classList.add('heading-two');
        catTitle.appendChild(document.createTextNode(data.title));

        var videosContainer = document.createElement('ul');
        videosContainer.classList.add('categories-list');

        section.appendChild(catTitle);
        section.appendChild(videosContainer);

        data.videos.forEach(function (videoId) {
          _this2.videos.forEach(function (video) {
            if (videoId === video.id) {
              videosContainer.appendChild(_this2.getVideo(video));
            }
          });
        });
        section.appendChild(document.createElement('hr'));
        _this2.container.appendChild(section);
      });
    }
  }, {
    key: 'getVideo',
    value: function getVideo(data) {
      var div = document.createElement('div');
      div.classList.add('categories-img');
      var h3 = document.createElement('h3');
      var poster = document.createElement('a');
      poster.href = 'video.html?id=' + data.id;
      var title = document.createElement('a');
      title.href = 'video.html?id=' + data.id;
      title.appendChild(document.createTextNode(data.title));
      h3.classList.add('heading-three');
      h3.appendChild(title);

      var img = document.createElement('img');
      img.src = data.poster;
      img.classList.add('image');

      poster.appendChild(img);

      var video = document.createElement('li');
      video.classList.add('categories-list-item');
      div.appendChild(poster);
      div.appendChild(this.getDuration(data.duration));

      video.appendChild(div);
      video.appendChild(h3);
      video.appendChild(this.getCreated(data.created));

      return video;
    }
  }, {
    key: 'getDuration',
    value: function getDuration(duration) {
      var min = Math.floor(duration / 60);
      var sec = duration - min * 60;
      var dur = min + ':' + ('0' + sec).slice(-2);
      var div = document.createElement('div');
      div.classList.add('time');
      div.appendChild(document.createTextNode(dur));
      return div;
    }
  }, {
    key: 'getCreated',
    value: function getCreated(created) {
      var secSince = new Date() - created;
      var sec = secSince / 1000;
      var hours = Math.floor(sec / 3600);
      var days = Math.floor(hours / 24);
      var weeks = Math.floor(days / 7);
      var months = Math.floor(days / 30);
      var years = Math.floor(days / 365);

      var time = '';

      if (days > 365) {
        time = 'Fyrir ' + years + ' \xE1ri/\xE1rum s\xED\xF0an';
      } else if (days > 30) {
        time = 'Fyrir ' + months + ' m\xE1nu\xF0i/m\xE1nu\xF0um s\xED\xF0an';
      } else if (days > 7) {
        time = 'Fyrir ' + weeks + ' viku/vikum s\xED\xF0an';
      } else if (hours > 24) {
        time = 'Fyrir ' + days + ' degi/d\xF6gum s\xED\xF0an';
      } else {
        time = 'Fyrir ' + hours + ' klukkustund/klukkustundum s\xED\xF0an';
      }

      var h3 = document.createElement('h3');
      h3.classList.add('heading-date');
      h3.appendChild(document.createTextNode(time));

      return h3;
    }
  }]);

  return Index;
}();

document.addEventListener('DOMContentLoaded', function () {
  var catContainer = document.querySelector('.categories');
  if (catContainer) {
    var index = new Index(catContainer);
    index.load();
  }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video(playerContainer) {
    _classCallCheck(this, Video);

    this.container = playerContainer;
  }

  _createClass(Video, [{
    key: 'load',
    value: function load() {
      var _this = this;

      var request = new Request('videos.json', { method: 'GET' });
      fetch(request).then(function (response) {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Something went wrong on api server!');
      }).then(function (data) {
        _this.getVideo(data);
      }).catch(function (error) {
        console.error(error); // eslint-disable-line
      });
    }
  }, {
    key: 'getVideo',
    value: function getVideo(data) {
      var _this2 = this;

      var id = parseInt(window.location.search.split('=')[1], 10);
      var found = false;
      data.videos.forEach(function (video) {
        if (id === video.id) {
          found = true;
          var title = document.createElement('h1');
          title.classList.add('heading-big');
          title.appendChild(document.createTextNode(video.title));

          var containerElement = document.createElement('div');
          containerElement.classList.add('player-container');
          _this2.playerContainer = containerElement;

          _this2.overlayElement = document.createElement('div');
          _this2.overlayElement.classList.add('player-container-overlay');

          _this2.video = document.createElement('video');
          _this2.video.classList.add('player-container-video');
          _this2.video.src = video.video;

          _this2.overlayElement.appendChild(_this2.video);
          containerElement.appendChild(_this2.overlayElement);
          _this2.container.insertBefore(containerElement, _this2.container.childNodes[0]);
          _this2.container.insertBefore(title, _this2.container.childNodes[0]);

          _this2.createButtons();
        }
      });

      if (!found) {
        this.container.insertBefore(document.createTextNode('Videó er ekki til'), this.container.childNodes[0]);
      }
    }

    // Controls búin til og event listener settur á þá


  }, {
    key: 'createButtons',
    value: function createButtons() {
      this.backButton = document.querySelector('.back');
      this.backButton.addEventListener('click', this.back.bind(this));

      this.playButton = document.querySelector('.play');
      this.playButton.addEventListener('click', this.playpause.bind(this));

      this.muteButton = document.querySelector('.mute');
      this.muteButton.addEventListener('click', this.mute.bind(this));

      this.fullscreenButton = document.querySelector('.fullscreen');
      this.fullscreenButton.addEventListener('click', this.fullscreen.bind(this));

      this.nextButton = document.querySelector('.next');
      this.nextButton.addEventListener('click', this.next.bind(this));

      this.playerContainer.addEventListener('click', this.playpause.bind(this));
    }

    // Atburðir settir á eventlistener

  }, {
    key: 'playpause',
    value: function playpause() {
      if (this.video.paused === true) {
        this.video.play();
        this.playButton.src = 'img/pause.svg';
        this.overlayElement.classList.remove('player-container-overlay');
      } else {
        this.video.pause();
        this.playButton.src = 'img/play.svg';
        this.overlayElement.classList.add('player-container-overlay');
      }
    }
  }, {
    key: 'mute',
    value: function mute() {
      if (this.video.muted === false) {
        this.video.muted = true;
        this.muteButton.src = 'img/unmute.svg';
      } else {
        this.video.muted = false;
        this.muteButton.src = 'img/mute.svg';
      }
    }
  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      if (this.video.requestFullscreen) {
        this.video.requestFullscreen();
      } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
      } else if (this.video.webkitRequestFullscreen) {
        this.video.webkitRequestFullscreen();
      }
    }
  }, {
    key: 'back',
    value: function back() {
      if (this.video.currentTime <= 3) {
        this.video.currentTime = 0;
      } else {
        this.video.currentTime -= 3;
      }
    }
  }, {
    key: 'next',
    value: function next() {
      if (this.video.duration - this.video.currentTime <= 3) {
        this.video.currentTime = this.video.duration;
      } else {
        this.video.currentTime += 3;
      }
    }
  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var playerContainer = document.querySelector('.player');
  if (playerContainer) {
    var video = new Video(playerContainer);
    video.load();
  }
});

//# sourceMappingURL=script-compiled.js.map