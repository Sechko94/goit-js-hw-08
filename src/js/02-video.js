import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
console.log(iframe);
const player = new Player(iframe);
console.log(player);
const currentKey = 'videoplayer-current-time';

const onPlay = function (event) {
    localStorage.setItem(currentKey, event.seconds);
    
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = Number(localStorage.getItem('videoplayer-current-time'));
player.setCurrentTime(currentTime).then(function (seconds) {
   
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

