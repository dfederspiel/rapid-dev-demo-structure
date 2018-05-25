window.sr = ScrollReveal({ reset: true });

var defaultOptions = {
    duration: 700, 
    delay: 50, 
    origin: "top"
}

function setReveal(animationClass, options){
    $('.reveal-wrapper' + animationClass).each(function(idx, item){
        sr.reveal($('> *', item), options);
    })
}

setReveal('.from-top', { ...defaultOptions, origin: 'top' });
setReveal('.from-right', { ...defaultOptions, origin: 'right' });
setReveal('.from-bottom', { ...defaultOptions, origin: 'bottom' });
setReveal('.from-left', { ...defaultOptions, origin: 'left' });