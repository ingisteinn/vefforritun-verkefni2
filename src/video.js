class Video {
  constructor() {
    this.container = document.querySelector('.player');
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
        this.createButtons();
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }


  getVideo(data) {
    const id = window.location.search.split('=')[1];
    console.log(id);
    data.videos.forEach((video) => {

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

        this.video = document.createElement('video');
        this.video.classList.add('player-container-video');
        this.video.src = data.video;
        this.video.appendChild(video);
      }
    });
  }

  //Controls búin til og event listener settur á þá


  createButtons() {

    const backButton = document.querySelector('.back');
    backButton.addEventListener('click', this.back());

    const playButton = document.querySelector('.play');
    playButton.addEventListener('click', this.playpause());

    const muteButton = document.querySelector('.mute');
    muteButton.addEventListener('click', this.mute());

    const fullscreenButton = document.querySelector('.fullscreen');
    fullscreenButton.addEventListener('click', this.fullscreen());

    const nextButton = document.querySelector('.next');
    nextButton.addEventListener('click', this.next());
  }

  //Atburðir settir á eventlistener

  playpause() {
    if (this.video.paused == true) {
      this.video.play();
      const button = document.querySelector('.pause');
      button.src = 'img/pause.svg'
      //þarf líka að taka af overlay hérna
    } else {
      this.video.pause();
      const button = document.querySelector('.play');
      button.src = 'img/play.svg'
      //setja overlay
    }
  }

  mute() {
    if (this.video.muted == false) {
      this.video.muted = true;
      const button = document.querySelector('.mute');
      button.src = 'img/unmute.svg'
    } else {
      this.video.muted = false;
      const button = document.querySelector('.unmute');
      button.src = 'img/mute.svg'
    }
  }


  //gæti mögulegt þurft að kveikja og slökkva á default controls herna qrueirgniuergnoano
  //þarf greinilega fullt af mismunandi gerðum eftir browser
  fullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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
  const video = new Video();
  video.load();
});
