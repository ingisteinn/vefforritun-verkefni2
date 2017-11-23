class Index {
  constructor(catContainer) {
    this.container = catContainer;
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
    div.appendChild(this.getDuration(data.duration));
    
    video.appendChild(div);
    video.appendChild(h3);
    video.appendChild(this.getCreated(data.created));

    return video;
  }

  getDuration(duration) {
    const min = Math.floor(duration / 60);
    const sec = duration - (min * 60);
    const dur = min + ':' + ('0' + sec).slice(-2);
    const div = document.createElement(div);
    div.classList.add('time');
    div.appendChild(document.createTextNode(dur));
    return div;
  }

  getCreated(created) {
    const secSince = new Date() - created;
    const sec = secSince / 1000;
    const hours = Math.floor(sec / 3600);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    let time = '';
    
    if(days > 365) {
      time = 'Fyrir ' + years + ' ári/árum síðan';
    } else if(days > 30) {
      time = 'Fyrir ' + months + ' mánuði/mánuðum síðan';
    } else if(days > 7) {
      time = 'Fyrir ' + weeks + ' viku/vikum síðan';
    } else if(hours > 24) {
      time = 'Fyrir ' + days + ' degi/dögum síðan';
    } else {
      time = 'Fyrir ' + hours + ' klukkustund/klukkustundum síðan';
    }
    
    const h3 = document.createElement('h3');
    h3.classList.add('heading-date');
    h3.appendChild(document.createTextNode(time));
    
    return h3;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const catContainer = document.querySelector('.categories');
  if(catContainer) {
    const index = new Index(catContainer);
    index.load();
  }
});
