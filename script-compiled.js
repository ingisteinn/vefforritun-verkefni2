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
        section.classList.add('row');

        var catTitle = document.createElement('h2');
        catTitle.appendChild(document.createTextNode(data.title));

        var videosContainer = document.createElement('div');
        videosContainer.classList.add('categories-videos');

        section.appendChild(catTitle);
        section.appendChild(videosContainer);

        data.videos.forEach(function (videoId) {
          _this2.videos.forEach(function (video) {
            if (videoId === video.id) {
              videosContainer.appendChild(_this2.getVideo(video));
            }
          });
        });
        _this2.container.appendChild(section);
      });
    }
  }, {
    key: 'getVideo',
    value: function getVideo(data) {
      var poster = document.createElement('a');
      poster.href = 'video.html?id=' + data.id;
      var title = document.createElement('a');
      title.href = 'video.html?id=' + data.id;

      var video = document.createElement('video-container');
      video.appendChild(poster);
      video.appendChild(title);

      title.innerHTML = data.title;
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
  var index = new Index();
  index.load();
});
"use strict";

//# sourceMappingURL=script-compiled.js.map