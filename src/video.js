class Video {
  constructor(playerContainer) {
    this.container = playerContainer;
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
        this.getVideo(data);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }


  getVideo(data) {
    const id = parseInt(window.location.search.split('=')[1], 10);
    let found = false;
    data.videos.forEach((video) => {
      if (id === video.id) {
        found = true;
        const title = document.createElement('h1');
        title.classList.add('heading-big');
        title.appendChild(document.createTextNode(video.title));

        const containerElement = document.createElement('div');
        containerElement.classList.add('player-container');
        this.playerContainer = containerElement;

        this.overlayElement = document.createElement('div');
        this.overlayElement.classList.add('player-container-overlay');

        this.video = document.createElement('video');
        this.video.classList.add('player-container-video');
        this.video.src = video.video;

        this.overlayElement.appendChild(this.video);
        containerElement.appendChild(this.overlayElement);
        this.container.insertBefore(containerElement, this.container.childNodes[0]);
        this.container.insertBefore(title, this.container.childNodes[0]);

        this.createButtons();
      }
    });

    if (!found) {
      this.container.insertBefore(document.createTextNode('Videó er ekki til'), this.container.childNodes[0]);
    }
  }

  // Controls búin til og event listener settur á þá


  createButtons() {
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

    this.video.addEventListener('ended', this.end.bind(this));
  }

  end() {
    this.video.currentTime = 0;
    this.playButton.src = 'img/play.svg';
    this.overlayElement.classList.add('player-container-overlay');
  }


  // Atburðir settir á eventlistener
  playpause() {
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

  mute() {
    if (this.video.muted === false) {
      this.video.muted = true;
      this.muteButton.src = 'img/unmute.svg';
    } else {
      this.video.muted = false;
      this.muteButton.src = 'img/mute.svg';
    }
  }

  fullscreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  back() {
    if (this.video.currentTime <= 3) {
      this.video.currentTime = 0;
    } else {
      this.video.currentTime -= 3;
    }
  }

  next() {
    if ((this.video.duration - this.video.currentTime) <= 3) {
      this.video.currentTime = this.video.duration;
    } else {
      this.video.currentTime += 3;
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const playerContainer = document.querySelector('.player');
  if (playerContainer) {
    const video = new Video(playerContainer);
    video.load();
  }
});
