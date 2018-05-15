var t = 0.28;
var t1, t2, t3, t4, t5, t6, t7, t8;

function doStuff() {
  t1 = new TimelineMax();
  t1.to(".st1", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t2 = new TimelineMax();
  t2.to(".st2", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t3 = new TimelineMax();
  t3.to(".st3", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t4 = new TimelineMax();
  t4.to(".st4", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t5 = new TimelineMax();
  t5.to(".st5", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t6 = new TimelineMax();
  t6.to(".st6", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t7 = new TimelineMax();
  t7.to(".st7", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
    ease: Power2.easeInOut
  });

  t8 = new TimelineMax();
  t8.to(".st8", t, {
    morphSVG: ".st0",
    transformOrigin: "center center",
    scale: 1,
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

$(window).resize(function(){
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
});