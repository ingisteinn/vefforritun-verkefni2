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
        this.parseData(data);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }
}

//Controls búin til og event listener settur á þá

function createButtons() {

  const backButton = document.querySelector('back');
  backButton.addEventListener('click', back());

  const playButton = document.querySelector('play');
  playButton.addEventListener('click', playpause());

  const muteButton = document.querySelector('mute');
  muteButton.addEventListener('click', mute());

  const fullscreenButton = document.querySelector('fullscreen');
  fullscreenButton.addEventListener('click', fullscreen());
  
  const nextButton = document.querySelector('next');
  nextButton.addEventListener('click', next());
}

//Atburðir settir á eventlistener

function playpause() {
  if (video.paused == true) {
    video.play();
    const button = document.querySelector('.pause');
    button.classList.remove('pause');
    button.classList.add('play');
    //þarf líka að taka af overlay hérna
  } else {
    video.pause();
    const button = document.querySelector('.play');
    button.classList.remove('play');
    button.classList.add('pause');
    //setja overlay
  }
}

function mute() {
  if (video.muted == false) {
    video.muted = true;
    const button = document.querySelector('.mute');
    button.classList.remove('mute');
    button.classList.add('unmute');
  } else {
    video.muted = false;
    const button = document.querySelector('.unmute');
    button.classList.remove('unmute');
    button.classList.add('mute');
  }
}


//gæti mögulegt þurft að kveikja og slökkva á default controls herna qrueirgniuergnoano
//þarf greinilega fullt af mismunandi gerðum eftir browser
function fullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function back() {
  if (video.currenttime <= 3) {
    video.currenttime = 0;
  } else {
    video.currenttime -= 3;
  }
}

function next() {
  if ((video.duration - video.currenttime) <= 3) {
    video.currenttime = video.duration;
  } else {
    video.currenttime += 3;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const Video = new Video();
  Video.load();
});
