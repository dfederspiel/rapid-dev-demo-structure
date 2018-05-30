// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
var iframe, player;
var _ = document.querySelector.bind(document);

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '_2oMIuUKjwA',
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
    player = event.target;
    iframe = _('#player');
    setupListener(); 
}

function setupListener (){
    _('.video-link').addEventListener('click', playFullscreen);
}

function playFullscreen (){
    $('#player').addClass('playing');
    player.playVideo();
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  }

  document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) {
        player.stopVideo();
        $('#player').removeClass('playing');
    }
  }, false);
  
  document.addEventListener("msfullscreenchange", function() {
    if (!document.msFullscreenElement) {
        player.stopVideo();
        $('#player').removeClass('playing');
    }
  }, false);
  
  document.addEventListener("mozfullscreenchange", function() {
    if (!document.mozFullScreen) {
        player.stopVideo();
        $('#player').removeClass('playing');
    }
  }, false);
  
  document.addEventListener("webkitfullscreenchange", function() {
    if (!document.webkitIsFullScreen) {
        player.stopVideo();
        $('#player').removeClass('playing');
    }
  }, false);