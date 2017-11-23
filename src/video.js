class Video {
  constructor() {
    this.container = document.querySelector('.categories');
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
        this.createButtons();
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
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
    if (video.paused == true) {
      video.play();
      const button = document.querySelector('.pause');
      button.src = 'img/pause.svg'
      //þarf líka að taka af overlay hérna
    } else {
      video.pause();
      const button = document.querySelector('.play');
      button.src = 'img/play.svg'
      //setja overlay
    }
  }

  mute() {
    if (video.muted == false) {
      video.muted = true;
      const button = document.querySelector('.mute');
      button.src = 'img/unmute.svg'
    } else {
      video.muted = false;
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
    if (video.currenttime <= 3) {
      video.currenttime = 0;
    } else {
      video.currenttime -= 3;
    }
  }

  next() {
    if ((video.duration - video.currenttime) <= 3) {
      video.currenttime = video.duration;
    } else {
      video.currenttime += 3;
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.load();
});
