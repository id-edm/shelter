import { audioTracks } from "./audio.js";

function updateTrackUI() {
    const coverImg = document.querySelector('.cover__img');
    const backgroundImg = document.querySelector('.background');
    const artist = document.querySelector('.artist');
    const trackTitle = document.querySelector('.track__title');
    const prevBtn = document.querySelector('.prev__btn');
    const nextBtn = document.querySelector('.next__btn');
    const playBtn = document.querySelector('.play__btn');
    const pauseBtn = document.querySelector('.pause__btn');
    const progressBar = document.querySelector('.progress__bar-range');
    const currentTime = document.querySelector('.current__time');
    const durationTime = document.querySelector('.duration__time');

    let currentTrack = 0;
    let isPlay = false;
    const tracks = audioTracks.tracks;
    let audio = new Audio(tracks[currentTrack].track);

    function updateTrackBackground(imageUrl) {
        if (backgroundImg) {
            backgroundImg.style.backgroundImage = `url(${imageUrl})`;
        }
    }

    function updateTrackInfo() {
        if (!tracks.length) return;
        const track = tracks[currentTrack];
        updateTrackBackground(track.background);

        coverImg.src = track.cover;
        artist.textContent = track.artist;
        trackTitle.textContent = track.title;
        audio.src = track.track;

        audio.addEventListener('loadedmetadata', () => {
            progressBar.max = audio.duration;
            durationTime.textContent = audio.duration;
            currentTime.textContent = 0; 
            progressBar.value = 0; 
        });
    }

    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
        updateTrackInfo();
        if (isPlay) {
            audio.play();
        }
    }

    function togglePlayPauseBtn() {
        playBtn.classList.toggle('hidden', isPlay);
        pauseBtn.classList.toggle('hidden', !isPlay);
    }

    function updateProgress() {
        if (audio.duration) {
            progressBar.value = audio.currentTime;
            currentTime.textContent = audio.currentTime;
        }
    }

    playBtn.addEventListener('click', () => {
        if (!isPlay) {
            audio.play();
            isPlay = true;
            togglePlayPauseBtn();
        }
    });

    pauseBtn.addEventListener('click', () => {
        if (isPlay) {
            audio.pause();
            isPlay = false;
            togglePlayPauseBtn();
        }
    });

    nextBtn.addEventListener('click', () => changeTrack(1));
    prevBtn.addEventListener('click', () => changeTrack(-1));

    progressBar.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = progressBar.value;
        }
    });

    audio.addEventListener('timeupdate', updateProgress);

    updateTrackInfo();
}

export { updateTrackUI };