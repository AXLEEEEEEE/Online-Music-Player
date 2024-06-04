const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSongElement = document.getElementById('currentSong');
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
const playlist = document.getElementById('playlist');

let currentSongIndex = 0;
const songs = [];

function loadSong(index) {
    audioPlayer.src = songs[index].url;
    audioPlayer.load();
    updateCurrentSongDisplay();
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '⏯️';
    }
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

function updateCurrentSongDisplay() {
    const currentSongName = songs[currentSongIndex].title;
    currentSongElement.textContent = `Now Playing: ${currentSongName}`;
    const playlistItems = document.querySelectorAll('.playlist li');
    playlistItems.forEach(item => item.classList.remove('playing'));
    playlistItems[currentSongIndex].classList.add('playing');
}

function addToPlaylist(song) {
    songs.push(song);
    const li = document.createElement('li');
    li.textContent = song.title;
    li.classList.add('list-group-item', 'bg-dark', 'text-white');
    li.dataset.index = songs.length - 1;
    li.dataset.url = song.url;
    li.addEventListener('click', () => {
        currentSongIndex = parseInt(li.dataset.index);
        loadSong(currentSongIndex);
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    });
    playlist.appendChild(li);
    if (songs.length === 1) {
        loadSong(0);
    }
}

// Simulate search results from an API
const mockSearchResults = [
    { title: 'Cool Down', url: 'Kolohe Kai - Cool Down (320).mp3' },
    { title: 'Soundtrack by: Greenleech', url: 'SOUNDTRACK - GREENLEECH (reimagined) (320).mp3' },
    { title: 'Rebound', url: 'Silent Sanctuary - Rebound (Lyrics) (320).mp3' },
    { title: 'Heaven Knows', url: 'Orange & Lemons - Heaven Knows (This Angel Has Flown) (Official Music Video) (320).mp3' },
    { title: 'You\'ll Be Safe Here', url: 'You\'ll Be Safe Here - Rivermaya (You\'ll Be Safe Here Rivermaya Lyrics) (320).mp3' },
    // Add more mock songs as needed
];

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    searchResults.innerHTML = '';
    if (query) {
        const filteredResults = mockSearchResults.filter(song => song.title.toLowerCase().includes(query));
        filteredResults.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.classList.add('list-group-item', 'bg-dark', 'text-white');
            li.addEventListener('click', () => {
                addToPlaylist(song);
                searchBar.value = '';
                searchResults.innerHTML = '';
            });
            searchResults.appendChild(li);
        });
    }
});

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

// Load the first song initially if there are any songs in the playlist
if (songs.length > 0) {
    loadSong(currentSongIndex);
}