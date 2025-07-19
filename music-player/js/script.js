const audio        = document.getElementById('audio');
const playBtn      = document.getElementById('play-pause');
const prevBtn      = document.getElementById('prev');
const nextBtn      = document.getElementById('next');
const progress     = document.getElementById('progress');
const currentTime  = document.getElementById('current-time');
const durationEl   = document.getElementById('duration');
const titleEl      = document.getElementById('title');
const artistEl     = document.getElementById('artist');
const volumeSlider = document.getElementById('volume');
const playlistEl   = document.getElementById('playlist');

const songs = [
  { title: 'Adiye', artist: 'Gv prakash', file: 'assests/audio/Adiye.mp3' },
  { title: 'Petta Parrak', artist: 'Anirudh', file: 'assests/audio/Petta-Paraak-MassTamilan.org.mp3' },
  { title: 'Vazhithunai', artist: 'Leon james', file: 'assests/audio/Vazhithunaiye.mp3' }
];

let songIndex = 0;
let isPlaying = false;

/* ------------ Load & Display Song ------------ */
function loadSong(index) {
  const song = songs[index];
  titleEl.textContent  = song.title;
  artistEl.textContent = song.artist;
  audio.src            = song.file;
  updatePlaylistUI();
}
function updatePlaylistUI() {
  [...playlistEl.children].forEach((li, i) =>
    li.classList.toggle('active', i === songIndex)
  );
}

/* ------------ Play / Pause ------------ */
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️';
}
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶️';
}
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

/* ------------ Prev / Next ------------ */
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

/* ------------ Progress Bar ------------ */
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent;
  currentTime.textContent = formatTime(audio.currentTime);
  durationEl.textContent  = formatTime(audio.duration);
});
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

/* ------------ Volume ------------ */
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
});

/* ------------ Autoplay Next ------------ */
audio.addEventListener('ended', nextSong);

/* ------------ Build Playlist UI ------------ */
songs.forEach((song, i) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} – ${song.artist}`;
  li.addEventListener('click', () => {
    songIndex = i;
    loadSong(songIndex);
    playSong();
  });
  playlistEl.appendChild(li);
});

/* ------------ Initial Setup ------------ */
loadSong(songIndex);
volumeSlider.value = 100;
