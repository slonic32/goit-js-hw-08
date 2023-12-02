import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframeVimeo = document.querySelector('iframe#vimeo-player');
const playerVimeo = new Player(iframeVimeo);

playerVimeo.on('timeupdate', throttle(saveVideoPosition, 1000));
window.addEventListener('load', loadLoadVideoPosition);

function saveVideoPosition(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}

function loadLoadVideoPosition(event) {
  const videoPosotion = localStorage.getItem('videoplayer-current-time');
  if (videoPosotion !== null) {
    playerVimeo.setCurrentTime(videoPosotion);
  }
}
