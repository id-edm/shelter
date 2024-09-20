import { audioTracks } from "./audio.js";

function initAudioPlayer() {
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

    audio.addEventListener('loadedmetadata', () => {
        progressBar.max = audio.duration;
        durationTime.textContent = formatTime(audio.duration);
        currentTime.textContent = formatTime(0);
        progressBar.value = 0; 
    });

    function updateTrackInfo() {
        if (!tracks.length) return;
        const track = tracks[currentTrack];
        updateTrackBackground(track.background);

        coverImg.src = track.cover;
        artist.textContent = track.artist;
        trackTitle.textContent = track.title;
        audio.src = track.track;
    }

    function updateTrackBackground(imageUrl) {
        if (backgroundImg) {
            backgroundImg.style.backgroundImage = `url(${imageUrl})`;
        }
    }

    function togglePlayPause() {
        if (isPlay) {
            audio.pause();
            coverImg.classList.remove('scale');
        } else {
            audio.play();
            coverImg.classList.add('scale');
        }
        isPlay = !isPlay;
        togglePlayPauseBtn();
    }

    function togglePlayPauseBtn() {
        playBtn.classList.toggle('hidden', isPlay);
        pauseBtn.classList.toggle('hidden', !isPlay);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${sec}`;
    }

    function updateProgress() {
        if (audio.duration) {
            progressBar.value = audio.currentTime;
            currentTime.textContent = formatTime(audio.currentTime);
        }
    }

    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
        updateTrackInfo();
        setTimeout(() => {
            audio.src = tracks[currentTrack].track;
            if (isPlay) {
                audio.play();
            }
        }, 500);
    }

    audio.addEventListener('ended', () => changeTrack(1));

    playBtn.addEventListener('click', togglePlayPause);
    pauseBtn.addEventListener('click', togglePlayPause);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); 
            togglePlayPause();
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

export { initAudioPlayer };
