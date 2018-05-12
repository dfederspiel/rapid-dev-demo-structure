var debounceOn = function (action, funcArray, timeout) {
    var runFunctionArray = function () {
        $(funcArray).each(function () {
            funcArray[$(this)];
        })
    }
    var fire = 0;
    runFunctionArray();
    var isReady = true;
    $(window).on(action, function () {
        if (isReady) {
            isReady = false;
            fire++;
            //console.log(fire);

            runFunctionArray();
            setTimeout(function () {
                isReady = true;
            }, timeout);
        }
    });
}
