/*!
 * Animated Popup  plugin 1.0
 *
 * Written by: Oscar Almaraz
 * Released under the MIT license
 *
 * Uses the the animate.min.css as a dependency
 * animate.css -http://daneden.me/animate
 * Using version 3.5.1 in this plugin
 */

//
(function ($) {

    $.fn.oaPopup = function (action, callback) {
            var $popupHotSpot;
            var $popupTarget = this;

            var closeAction=function(callback){
                $popupTarget.removeClass("animated").removeClass($popupTarget.data('animation')).addClass("hidden");
                $popupHotSpot.addClass("oa-popup-hidden");
                $popupTarget.unwrap(".animated-popup-hotspot");
                removeCloseBtn();
                if (typeof(callback) == "function")
                    callback();
            }

            var removeCloseBtn=function() {
                $(".animated-popup-close-btn").remove();
            }
            var drawCloseBtn=function() {
                if ($popupTarget.find(".animated-popup-close-btn").length===0) {
                    $popupTarget.prepend('<div class="animated-popup-close-btn">X</div>');
                    $popupTarget.find(".animated-popup-close-btn").on('click', function() { closeAction(callback) });
                }
            }
            var openAction=function(calback){
                try {
                    var $target = $popupTarget;
                    $popupHotSpot.removeClass("oa-popup-hidden");
                    $target.addClass("animated").addClass($target.data('animation')).removeClass("oa-popup-hidden").removeClass("hidden");
                    $target.off('click');
                    $popupHotSpot.off('click');
                    $popupHotSpot.on('click',
                        function () {
                            closeAction();
                        }).find($target).on('click', function (e) { e.stopPropagation(); });

                    if (typeof (callback) == "function") {
                        callback($target);
                    }
                }
                catch (error) {
                    console.info("oa-animatedpopup: popup not found");
                }
            }

            //init 
            drawCloseBtn();

            if($popupTarget.parent(".animated-popup-hotspot").length===0)
            $popupTarget.wrap('<div class="animated-popup-hotspot oa-popup-hidden"></div>');

            $popupHotSpot = $(".animated-popup-hotspot");
           
        if (typeof (action) == 'undefined')
            action = null;

        switch (action) {
            case null:
                return true;
            case "open":
                openAction(callback);
                break;
            case "close":
                closeAction(callback);
                break;
            default:
                return false;
        }


    };

}(jQuery));
