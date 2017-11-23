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
      section.classList.add('categories-section');

      const catTitle = document.createElement('h2');
      catTitle.classList.add('heading-two');
      catTitle.appendChild(document.createTextNode(data.title));

      const videosContainer = document.createElement('ul');
      videosContainer.classList.add('categories-list');

      section.appendChild(catTitle);
      section.appendChild(videosContainer);

      data.videos.forEach((videoId) => {
        this.videos.forEach((video) => {
          if (videoId === video.id) {
            videosContainer.appendChild(this.getVideo(video));
          }
        });
      });
      section.appendChild(document.createElement('hr'));
      this.container.appendChild(section);
    });
  }

  getVideo(data) {
    const div = document.createElement('div');
    div.classList.add('categories-img');
    const h3 = document.createElement('h3');
    const poster = document.createElement('a');
    poster.href = `video.html?id=${data.id}`;
    const title = document.createElement('a');
    title.href = `video.html?id=${data.id}`;
    title.appendChild(document.createTextNode(data.title));
    h3.classList.add('heading-three');
    h3.appendChild(title);
    
    
    const img = document.createElement('img');
    img.src = data.poster;
    img.classList.add('image');
    
    poster.appendChild(img);
    
    const video = document.createElement('li');
    video.classList.add('categories-list-item');
    div.appendChild(poster);
    video.appendChild(div);
    //vantar time
    video.appendChild(h3);

    return video;
  }

  formatDuration(duration) {

  }

  formatCreated(created) {

  }
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector('.categories')) {
    const index = new Index();
    index.load();
  }
});
