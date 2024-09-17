import { audioTracks } from "./audio.js" 

function updateTrackUI() {
    const coverImg = document.querySelector('.cover__img');
    const backgroundImg = document.querySelector('.background');
    const artist = document.querySelector('.artist');
    const trackTitle = document.querySelector('.track__title');
    const prevBtn = document.querySelector('.prev__btn');
    const nextBtn = document.querySelector('.next__btn');

    let currentTrack = 0;

    function updateTrackBackground(imageUrl) {
        if (backgroundImg) {
            backgroundImg.style.backgroundImage = `url(${imageUrl})`
        };
    }

    function updateTrackInfo() {
        if (!audioTracks.tracks.length) return;
        const track = audioTracks.tracks[currentTrack];
        updateTrackBackground(track.background);

        coverImg.src = track.cover;
        artist.textContent = track.artist;
        trackTitle.textContent = track.title;
    }

    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + audioTracks.tracks.length) % audioTracks.tracks.length;
        updateTrackInfo();
    }

    nextBtn.addEventListener('click', () => changeTrack(1));
    prevBtn.addEventListener('click', () => changeTrack(-1));

    updateTrackInfo();
}

export { updateTrackUI };