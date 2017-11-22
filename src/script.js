class Index {
  constructor() {
    this.container = document.querySelector('.categories');
  }

  load() {
    const request = new Request('videos.json', { method: 'GET' });
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Something went wrong on api server!');
      })
      .then((data) => {
        this.parseData(data);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }

  parseData(data) {
    this.videos = data.videos;
    this.categories = data.categories;
    this.getCategories();
  }

  getCategories() {
    this.categories.forEach((data) => {
      const section = document.createElement('section');
      section.classList.add('row');

      const catTitle = document.createElement('h2');
      catTitle.appendChild(document.createTextNode(data.title));

      const videosContainer = document.createElement('div');
      videosContainer.classList.add('categories-videos');

      section.appendChild(catTitle);
      section.appendChild(videosContainer);

      data.videos.forEach((videoId) => {
        this.videos.forEach((video) => {
          if (videoId === video.id) {
            videosContainer.appendChild(this.getVideo(video));
          }
        });
      });
      this.container.appendChild(section);
    });
  }

  getVideo(data) {
    const poster = document.createElement('a');
    poster.href = `video.html?id=${data.id}`;
    const title = document.createElement('a');
    title.href = `video.html?id=${data.id}`;

    const video = document.createElement('video-container');
    video.appendChild(poster);
    video.appendChild(title);

    title.innerHTML = data.title;
    return video;
  }

  formatDuration(duration) {

  }

  formatCreated(created) {

  }
}

document.addEventListener('DOMContentLoaded', () => {
  const index = new Index();
  index.load();
});
