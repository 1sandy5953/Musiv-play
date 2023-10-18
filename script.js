const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
const tracklist = document.getElementById('tracklist');
const addTrackButton = document.getElementById('add-track');

let tracks = JSON.parse(localStorage.getItem('tracks')) || [];
let currentTrackIndex = 0;

function addTrack() {
    const trackURL = prompt('Enter the URL of the track:');
    if (trackURL) {
        const trackName = prompt('Enter a name for the track:');
        const trackImageURL = prompt('Enter the URL of the track image:'); // Prompt for the image URL
        tracks.push({ url: trackURL, name: trackName, liked: false, image: trackImageURL });
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${trackName || 'Untitled Track'}</span>
                             <button class="like-button">&#x2764;</button>
                             <button class="delete-button">Delete</button>`;
        tracklist.appendChild(listItem);
        updateTrackImage(trackImageURL); // Update the track image
        updateLocalStorage();
    }
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerText = 'Pause';
    } else {
        audio.pause();
        playPauseButton.innerText = 'Play';
    }
}

function stop() {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.innerText = 'Play';
}

function playTrack(index) {
    if (tracks.length > 0 && index >= 0 && index < tracks.length) {
        currentTrackIndex = index;
        audio.src = tracks[index].url;
        playPause();
    }
}

function updateLocalStorage() {
    localStorage.setItem('tracks', JSON.stringify(tracks));
}

audio.addEventListener('ended', () => {
    playPauseButton.innerText = 'Play';
    currentTrackIndex++;
    if (currentTrackIndex < tracks.length) {
        playTrack(currentTrackIndex);
    }
});

playPauseButton.addEventListener('click', playPause);
stopButton.addEventListener('click', stop);
addTrackButton.addEventListener('click', addTrack);



// Load tracks from local storage on page load
function loadTracksFromLocalStorage() {
    tracks.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${track.name || 'Untitled Track'}</span>
                             <button class="like-button">${track.liked ? 'Unlike' : 'Like'}</button>
                             <button class="delete-button">Delete</button>`;
        tracklist.appendChild(listItem);
    });
}

// Your existing JavaScript code...



// Function to update the track image
function updateTrackImage(imageURL) {
    const trackImage = document.getElementById('track-image');
    trackImage.src = imageURL;
}


// Your existing JavaScript code...

function playTrack(index) {
    if (tracks.length > 0 && index >= 0 && index < tracks.length) {
        currentTrackIndex = index;
        audio.src = tracks[index].url;
        updateTrackImage(tracks[index].image); // Update the track image when a new track is selected
        playPause();
    }
}

// Function to update the track image
function updateTrackImage(imageURL) {
    const trackImage = document.getElementById('track-image');
    trackImage.src = imageURL;
}

tracklist.addEventListener('click', (e) => {
    const index = Array.from(tracklist.children).indexOf(e.target.parentElement);
    if (e.target.classList.contains('like-button')) {
        tracks[index].liked = !tracks[index].liked;
        updateLocalStorage();
        e.target.innerText = tracks[index].liked ? 'Unlike' : 'Like';
    } else if (e.target.classList.contains('delete-button')) {
        tracks.splice(index, 1);
        tracklist.removeChild(e.target.parentElement);
        updateLocalStorage();
    } else {
        playTrack(index);
    }
});

// Your existing JavaScript code ...

const showMoreButton = document.getElementById('show-more');

// Function to show more tracks
function showMoreTracks() {
    const tracklist = document.getElementById('tracklist');
    const tracks = Array.from(tracklist.children);

    // Toggle visibility of hidden tracks
    tracks.slice(3).forEach((track) => {
        if (track.style.display === 'none') {
            track.style.display = 'block';
        } else {
            track.style.display = 'none';
        }
    });
}

showMoreButton.addEventListener('click', showMoreTracks);

// Your existing JavaScript code ...



loadTracksFromLocalStorage();
