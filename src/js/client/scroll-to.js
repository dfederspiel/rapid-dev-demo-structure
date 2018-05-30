var Scroll = {
    To: function(id, duration = 1000) {
        $("html, body").animate({ scrollTop: $(id).offset().top }, duration);
    }
}