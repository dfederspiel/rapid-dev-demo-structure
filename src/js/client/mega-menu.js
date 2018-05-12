//USED WITH BOOTSTRAP 3 NAVIGATION
$(document).ready(function () {
    var $navigation = $(".js-mega-menu");
    var $dropdowns = $navigation.find(".dropdown-toggle").parent(".dropdown");
    var $megaMenuItems = $(".js-mega-menu-items").children();

    $dropdowns.each(function (key, value) {
        var $dropdown = $(this);
        var $dropdownMenu = $dropdown.find(".dropdown-menu");

        //cloning to keep copy for CMS editor
        var $megaItem = $megaMenuItems.eq(key).addClass("mega-menu-item").clone();

        $dropdownMenu
            .removeClass("dropdown-menu")
            .addClass("sub-nav")
            .wrap("<div class='mega-menu dropdown-menu'></div>")
            .after($megaItem);
    })
})