'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Index = function () {
  function Index() {
    _classCallCheck(this, Index);

    this.container = document.querySelector('.categories');
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
      video.appendChild(div);
      //vantar time
      video.appendChild(h3);

      return video;
    }
  }, {
    key: 'formatDuration',
    value: function formatDuration(duration) {}
  }, {
    key: 'formatCreated',
    value: function formatCreated(created) {}
  }]);

  return Index;
}();

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.categories')) {
    var index = new Index();
    index.load();
  }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    this.container = document.querySelector('.player');
  }

  _createClass(Video, [{
    key: 'load',
    value: function load() {
      var _this = this;

      var request = new Request('videos.json', {
        method: 'GET'
      });
      fetch(request).then(function (response) {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Something went wrong on api server!');
      }).then(function (data) {
        _this.getVideo(data);
        _this.createButtons();
      }).catch(function (error) {
        console.error(error); // eslint-disable-line
      });
    }
  }, {
    key: 'getVideo',
    value: function getVideo(data) {
      var _this2 = this;

      var id = window.location.search.split('=')[1];
      console.log(id);
      data.videos.forEach(function (video) {

        if (id === video.id) {

          var playerElement = document.createElement('div');
          playerElement.classList.add('player');

          var title = document.createElement('h1');
          title.appendChild(document.createTextNode(data.title));
          title.classList.add('heading-big');

          var containerElement = document.createElement('div');
          containerElement.classList.add('player-container');

          var overlayElement = document.createElement('div');
          containerElement.classList.add('player-container-overlay');
          //appendaaaaa

          _this2.video = document.createElement('video');
          _this2.video.classList.add('player-container-video');
          _this2.video.src = data.video;
          _this2.video.appendChild(video);
        }
      });
    }

    //Controls búin til og event listener settur á þá


  }, {
    key: 'createButtons',
    value: function createButtons() {

      var backButton = document.querySelector('.back');
      backButton.addEventListener('click', this.back());

      var playButton = document.querySelector('.play');
      playButton.addEventListener('click', this.playpause());

      var muteButton = document.querySelector('.mute');
      muteButton.addEventListener('click', this.mute());

      var fullscreenButton = document.querySelector('.fullscreen');
      fullscreenButton.addEventListener('click', this.fullscreen());

      var nextButton = document.querySelector('.next');
      nextButton.addEventListener('click', this.next());
    }

    //Atburðir settir á eventlistener

  }, {
    key: 'playpause',
    value: function playpause() {
      if (this.video.paused == true) {
        this.video.play();
        var button = document.querySelector('.pause');
        button.src = 'img/pause.svg';
        //þarf líka að taka af overlay hérna
      } else {
        this.video.pause();
        var _button = document.querySelector('.play');
        _button.src = 'img/play.svg';
        //setja overlay
      }
    }
  }, {
    key: 'mute',
    value: function mute() {
      if (this.video.muted == false) {
        this.video.muted = true;
        var button = document.querySelector('.mute');
        button.src = 'img/unmute.svg';
      } else {
        this.video.muted = false;
        var _button2 = document.querySelector('.unmute');
        _button2.src = 'img/mute.svg';
      }
    }

    //gæti mögulegt þurft að kveikja og slökkva á default controls herna qrueirgniuergnoano
    //þarf greinilega fullt af mismunandi gerðum eftir browser

  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
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
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script-compiled.js.map