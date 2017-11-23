class Video {
  constructor(playerContainer) {
    this.container = playerContainer;
  }

  load() {
    const request = new Request('videos.json', {
      method: 'GET'
    });
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
    const id = parseInt(window.location.search.split('=')[1]);
    data.videos.forEach((video) => {

      if (id === video.id) {

        const title = document.createElement('h1');
        title.classList.add('heading-big');
        title.appendChild(document.createTextNode(video.title));

        const containerElement = document.createElement('div');
        containerElement.classList.add('player-container');

        const overlayElement = document.createElement('div');
        containerElement.classList.add('player-container-overlay');
        //appendaaaaa

        this.video = document.createElement('video');
        this.video.classList.add('player-container-video');
        this.video.src = video.video;
        
        overlayElement.appendChild(this.video);
        containerElement.appendChild(overlayElement);
        this.container.insertBefore(containerElement, this.container.childNodes[0]);
        this.container.insertBefore(title, this.container.childNodes[0]);
        
        this.createButtons();
      }
    });
  }

  //Controls búin til og event listener settur á þá


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
  }

  //Atburðir settir á eventlistener

  playpause() {
      console.log(this.video);
    if (this.video.paused == true) {
      this.video.play();
      this.playButton.src = 'img/pause.svg'
      //þarf líka að taka af overlay hérna
    } else {
      this.video.pause();
      this.playButton.src = 'img/play.svg'
      //setja overlay
    }
  }

  mute() {
    if (this.video.muted == false) {
      this.video.muted = true;
      this.muteButton.src = 'img/unmute.svg'
    } else {
      this.video.muted = false;
      this.muteButton.src = 'img/mute.svg'
    }
  }


  //gæti mögulegt þurft að kveikja og slökkva á default controls herna qrueirgniuergnoano

  fullscreen() {
    if (this.video.requestFullscreen) {
        this.video.requestFullscreen();
      }
      else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
      }
      else if (this.video.webkitRequestFullscreen) {
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
