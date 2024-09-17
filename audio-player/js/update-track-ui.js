import { audioTracks } from "./audio.js" 

function updateTrackUI() {
    const coverImg = document.querySelector('.cover__img');
    const backgroundImg = document.querySelector('.background');
    const artist = document.querySelector('.artist');
    const trackTitle = document.querySelector('.track__title');
    const prevBtn = document.querySelector('.prev__btn');
    const nextBtn = document.querySelector('.next__btn');
    const playBtn = document.querySelector('.play__btn');
    const pauseBtn = document.querySelector('.pause__btn');

    let currentTrack = 0;
    let isPlay = false;
    const tracks = audioTracks.tracks;

    function updateTrackBackground(imageUrl) {
        if (backgroundImg) {
            backgroundImg.style.backgroundImage = `url(${imageUrl})`
        };
    }

    function updateTrackInfo() {
        if (!tracks.length) return;
        const track = tracks[currentTrack];
        updateTrackBackground(track.background);

        coverImg.src = track.cover;
        artist.textContent = track.artist;
        trackTitle.textContent = track.title;
    }

    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
        updateTrackInfo();
    }

    function togglePlayPauseBtn() {
            playBtn.classList.toggle('hidden', isPlay);
            pauseBtn.classList.toggle('hidden', !isPlay);
    }

    playBtn.addEventListener('click', () => {
        isPlay = true;
        togglePlayPauseBtn();
    });

    pauseBtn.addEventListener('click', () => {
        isPlay = false;
        togglePlayPauseBtn();
    });

    nextBtn.addEventListener('click', () => changeTrack(1));
    prevBtn.addEventListener('click', () => changeTrack(-1));

    updateTrackInfo();
}

export { updateTrackUI };