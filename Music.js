const Music = { 
  turi_ip: new Audio("Resource/Turi.mp3"),
}

const MUSIC_LIST = [Music.turi_ip];

function RandomMusic() {
  return MUSIC_LIST[Math.floor(Math.random * MUSIC_LIST.length)];
}