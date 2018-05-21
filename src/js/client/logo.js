var t = 0.15;
var t1, t2, t3, t4, t5, t6, t7, t8;

function doStuff() {
  t1 = new TimelineMax();
  t1.to(".st1", t, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t2 = new TimelineMax();
  t2.to(".st2", t * 1.1, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t3 = new TimelineMax();
  t3.to(".st3", t * 1.2, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t4 = new TimelineMax();
  t4.to(".st4", t * 1.3, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t5 = new TimelineMax();
  t5.to(".st5", t * 1.4, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t6 = new TimelineMax();
  t6.to(".st6", t * 1.5, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t7 = new TimelineMax();
  t7.to(".st7", t * 1.6, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });

  t8 = new TimelineMax();
  t8.to(".st8", t * 1.7, {
    transformOrigin: "center center",
    scale: 0,
    ease: Power2.easeInOut
  });
}

$("#logo svg").click(() => {
  if (t1 === undefined || t1.reversed()) {
    doStuff()
  } else {
    t1.reverse();
    t2.reverse();
    t3.reverse();
    t4.reverse();
    t5.reverse();
    t6.reverse();
    t7.reverse();
    t8.reverse();
  }
});

var isCollapsed = false;

function setLogoState(){
  if($(window).width() < 500 && !isCollapsed){
    doStuff();
    isCollapsed = true;
  }
  else if($(window).width() >= 500 && isCollapsed) {
    t1.reverse();
    t2.reverse();
    t3.reverse();
    t4.reverse();
    t5.reverse();
    t6.reverse();
    t7.reverse();
    t8.reverse();
    isCollapsed = false;
  }
}

$(window).resize(function(){
  setLogoState();
});

$(document).ready(function(){
  setLogoState();
})