function Background($elements, $window) {
    $elements.each(function (i) {
        var $element = $(this);
        var $background = $('> .layout-image-background', $element);
        var $content = $('> .layout-text-content', $element);
        var $parent = $element.parent();

        init();

        function init() {
            if (isInEditMode())
                return unhide();

            setBackgroundImage();
            setBannerPosition();
            $window.on('resize', setBannerPosition);
            unhide();
        }

        function unhide() {
            $element.css('visibility', 'visible');
        }

        function setBackgroundImage() {
            var img = $('img', $background);
            if (img.length > 0) {
                var src = img.attr('src');
                $background.css('background-image', 'url(' + src + ')');
                img.remove();
            }
        }

        function setBannerPosition() {
            if (isInEditMode())
                return;

            var height = $content.outerHeight();
            var position = $background.position();

            $element.height(height);
            $background.height(height);
            $content.offset(position);
            $content.css("left", 0);
        }

        function isInEditMode() {
            return $element.parents('.sfPageEditor').length > 0;
        }
    });
}