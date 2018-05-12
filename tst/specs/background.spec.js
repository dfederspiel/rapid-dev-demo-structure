describe("The background layout", function () {
    var $window, _background, _backgroundForContent, $background, $image, $content, $contentBackground, $newContentBackground;

    beforeEach(function () {
        arrangeBanner();
    });

    afterEach(function () {
        $('body').removeClass('sfPageEditor');
        $('.layout-content-background').remove();
        $background.remove();
        $contentBackground.remove();
    });

    describe("when initializing", function () {
        it("sets the background-image on the element", function () {
            expect($image.css("background-image"))
                .toContain('/images/aptera.jpg');
        });

        it("removes the img element", function () {
            expect($('img', $image).length).toEqual(0);
        });

        itResizesAndAlignsTheLayers();

        it("unhides the background layout", function () {
            expect($background.css('visibility')).toEqual('visible');
        });
    });

    describe("given there is more than one banner on the page", function () {
        beforeEach(function () {
            $newBackgroundContent = arrangeContentBackground();
            new Background($newBackgroundContent, $window);
        });

        it("will not set the background of an already initialized banner", function () {
            itShowsImagesInEachLayout();
        });
    });

    describe("given the page is in edit mode", function () {
        beforeEach(function () {
            $('.layout-content-background').remove();
            $background.remove();
            $contentBackground.remove();
            arrangeEditMode();
            arrangeBanner();
        });

        it("does not set the background-image", function () {
            expect($image.css("background-image")).toEqual("none");
        });

        it("does not remove the img element", function () {
            expect($('img', $image).length).toEqual(1);
        });

        it("unhides the background layout", function () {
            expect($background.css('visibility')).toEqual('visible');
            expect($contentBackground.css('visibility')).toEqual('visible');
        });

        isDoesNotResizeOrAlignTheLayers();
    });

    describe("when the page is resized", function () {
        beforeEach(function () {
            $('.layout-content-background').remove();
            $background.remove();
            $contentBackground.remove();
            arrangeBanner();
            $background.height(0);
            $window.trigger('resize');
        });

        it("adjusts for the new window size", function () {
            var expectedHeight = $content.outerHeight();
            expect($background.height()).toEqual(expectedHeight);
        });
    });

    function itResizesAndAlignsTheLayers() {
        it("sets the height of the background to match the content", function () {
            expectToBeClose($background.height(), 500);
            expectToBeClose($image.height(), 500);
        });

        it("aligns the content to the top of the background", function () {
            expectToBeClose($content.position().top, 333);
            expectToBeClose($content.position().left, 10);
        });
    }

    function isDoesNotResizeOrAlignTheLayers() {
        it("does not set the height of the background to match the content", function () {
            expectToBeClose($background.height(), 200);
            expectToBeClose($image.height(), 1304);
        });

        it("does not align the content to the top of the background", function () {
            expectToBeClose($content.position().top, 73);
            expectToBeClose($content.position().left, 8);
        });
    }

    function itShowsImagesInEachLayout() {
        expect($('> .layout-image-background', $newBackgroundContent).css("background-image"))
            .toContain('/images/aptera.jpg');
        expect($('> .layout-image-background', $contentBackground).css("background-image"))
            .toContain('/images/aptera.jpg');
        expect($image.css("background-image"))
            .toContain('/images/aptera.jpg');
    }

    function expectToBeClose(actual, expected) {
        expect(actual - expected).toBeLessThan(5);
    }

    function arrangeBanner() {
        if ($background)
            $background.remove();

        $background = arrangeBackgroundElement();
        $contentBackground = arrangeContentBackground();
        $('body').append($background);
        $('body').append($contentBackground);

        $image = $('> .layout-image-background', $background);
        $content = $('> .layout-text-content', $background);
        $window = $("<div></div>");

        new Background($contentBackground, $window);
        _background = new Background($background, $window);
    }

    function arrangeEditMode() {
        $('body').addClass('sfPageEditor');
    }

    function arrangeBackgroundElement() {
        return $(
            "<div class='layout-banner' style='height: 200px; visibility: hidden;'>" +
            "    <div class='layout-image-background' style='position: absolute; top: 333px; left: 10px;'>" +
            "        <img src='images/aptera.jpg' style='height: 1300px;'>" +
            "    </div>" +
            "    <div class='layout-text-content' style='height: 500px;'></div>" +
            "</div>"
        );
    }

    function arrangeContentBackground() {
        return $(
            "<div class='layout-content-background' style='height: 200px; visibility: hidden;'>" +
            "    <div class='layout-image-background' style='position: absolute; top: 333px; left: 10px;'>" +
            "        <img src='images/aptera.jpg' style='height: 1300px;'>" +
            "    </div>" +
            "    <div class='layout-text-content' style='height: 500px;'></div>" +
            "</div>"
        );
    }
});