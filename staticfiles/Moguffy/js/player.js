/* ===============================
   MOGUFFY MUSIC PLAYER SCRIPT
================================ */

let currentIndex = 0
let currentSongId = null
let loopMode = 0

const audio = document.getElementById("mainAudio")
const seekbar = document.getElementById("seekbar")
const bgVideo = document.getElementById("bg-video")
const loopBtn = document.getElementById("loopBtn")

const title = document.getElementById("player-title")
const artist = document.getElementById("player-artist")
const image = document.getElementById("player-img")
const playBtn = document.getElementById("playBtn")

/* ===============================
   PLAY SONG
================================ */

function playSong(url,titleText,artistText,img,video,id,index){

currentIndex = index
currentSongId = id

audio.src = url
audio.load()

audio.play().catch(function(e){
console.log("Autoplay blocked",e)
})

title.innerText = titleText
artist.innerText = artistText
image.src = img

playBtn.innerText = "⏸"

/* reset seekbar */

seekbar.value = 0

/* background video */

if(video && video !== ""){
bgVideo.src = video
bgVideo.play()
}else{
bgVideo.pause()
bgVideo.src = ""
}

}

/* ===============================
   PLAY / PAUSE
================================ */

function playPause(){

if(!audio.src) return

if(audio.paused){

audio.play()
playBtn.innerText="⏸"

}else{

audio.pause()
playBtn.innerText="▶"

}

}

/* ===============================
   LOOP BUTTON
================================ */

function toggleLoop(){

loopMode++

if(loopMode > 1){
loopMode = 0
}

if(loopMode === 0){

loopBtn.innerText = "🔁"
loopBtn.style.color = "white"

}

if(loopMode === 1){

loopBtn.innerText = "🔂"
loopBtn.style.color = "#1DB954"

}

}

/* ===============================
   SEEK BAR UPDATE
================================ */

audio.addEventListener("timeupdate",function(){

if(audio.duration){

seekbar.max = Math.floor(audio.duration)
seekbar.value = Math.floor(audio.currentTime)

}

})

/* SEEK BAR CHANGE */

seekbar.addEventListener("input",function(){

if(audio.duration){

audio.currentTime = seekbar.value

}

})

/* ===============================
   SONG FINISHED
================================ */

audio.addEventListener("ended",function(){

if(loopMode === 1){

audio.currentTime = 0
audio.play()

}else{

nextSong()

}

})

/* ===============================
   NEXT SONG
================================ */

function nextSong(){

let buttons = document.querySelectorAll(".play-btn")

if(buttons.length === 0) return

currentIndex++

if(currentIndex >= buttons.length){

currentIndex = 0

}

buttons[currentIndex].click()

}

/* ===============================
   PREVIOUS SONG
================================ */

function prevSong(){

let buttons = document.querySelectorAll(".play-btn")

if(buttons.length === 0) return

currentIndex--

if(currentIndex < 0){

currentIndex = buttons.length - 1

}

buttons[currentIndex].click()

}

/* ===============================
   LIKE BUTTON
================================ */

const likeBtn = document.getElementById("likeBtn")

if(likeBtn){

likeBtn.onclick = function(){

if(currentSongId){

alert("❤️ Added to liked songs")

window.location = "/like/" + currentSongId + "/"

}

}

}

/* ===============================
   PLAYLIST BUTTON
================================ */

const playlistBtn = document.getElementById("playlistBtn")

if(playlistBtn){

playlistBtn.onclick = function(){

if(currentSongId){

alert("➕ Added to playlist")

window.location = "/addplaylist/" + currentSongId + "/"

}

}

}

/* ===============================
   KEYBOARD SHORTCUTS
================================ */

document.addEventListener("keydown",function(e){

/* SPACE = PLAY PAUSE */

if(e.code === "Space"){

e.preventDefault()
playPause()

}

/* RIGHT ARROW = NEXT */

if(e.code === "ArrowRight"){

nextSong()

}

/* LEFT ARROW = PREVIOUS */

if(e.code === "ArrowLeft"){

prevSong()

}

})

/* ===============================
   PAGE LOAD FIX
================================ */

window.addEventListener("load",function(){

seekbar.value = 0

})