var lastIndex = 0;

function animateCss(ctx) {
    $('*[data-animation]', ctx).each(function (idx, val) {
        $(this).addClass($(this).data('animation') + ' animated');
    })
}
function deanimateCss(ctx) {
    $('*[data-animation]', ctx).each(function (idx, val) {
        $(this).removeClass($(this).data('animation')).removeClass('animated');
    })
}

if ($('.scroll-panel').length > 0) {
    $.scrollify({
        interstitialSection: "header, footer",
        section: ".scroll-panel",
        before: function (i, panels) {
            var ref = panels[i].attr("data-section-name");
            
            $(".scroll-pager .active").removeClass("active");
            $(".scroll-pager").find("a[href=\"#" + ref + "\"]").addClass("active");
            $('.scroll-panel .content').removeClass('visible');

            var lastContext = $(panels[lastIndex]);
            deanimateCss(lastContext);

            lastIndex = i;
            var context = $(panels[i]);
            animateCss(context)
        },
        after: function (i, panels) {
            $('.content', $('.scroll-panel')[i]).addClass('visible');
        },
        afterRender: function () {
            var pagination = "<ul class=\"scroll-pager\">";
            var activeClass = "";

            $(".scroll-panel").each(function (i) {
                activeClass = "";
                if (i === 0) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"></a></li>";
            });
            pagination += "</ul>";

            $("body").append(pagination);
            $(".scroll-pager a").on("click", $.scrollify.move);
        }
    });
}