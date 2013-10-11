(function($) {

    var MIN_KEY = 0;

    var MAX_KEY = 120;

    var DEFAULT_HEIGHT = 200;

    var BLACK_KEY_WIDTH_FACTOR = 0.6;

    var BLACK_KEY_HEIGHT_FACTOR = 0.6;

    var CONTAINER_DATA_KEY = "PIANO_CONTAINER_DATA_KEY";

    var KEY_DATA_KEY = "PIANO_KEY_DATA_KEY";

    var selectionMode = {      
        NONE: "none",
        MULTIPLE: "multiple"
    };

    var noop = function() {
    };

    var defaultOptions = {
        startKey: 60,
        endKey: 71,
        zIndex: 999,
        keyClass: "pn-key",
        whiteKeyClass: "pn-white-key",
        blackKeyClass: "pn-black-key",
        pressedKeyClass: "pn-pressed-key",
        selectedKeyClass: "pn-selected-key",
        keyCreatedCallback: noop,
        selectionMode: selectionMode.NONE,
        selectionChangedCallback: noop
    };

    $.fn.piano = function(options) {

        var pno = this.data(CONTAINER_DATA_KEY);
        if (pno) {
            return pno;
        } else {
            this.each(function() {
                createPiano($(this), $.extend(defaultOptions, options));
            });

            return this.data(CONTAINER_DATA_KEY);
        }
    };

    $.fn.piano.selectionMode = selectionMode;

    function createPiano(container, options) {
        validateOptions(options);
        container.css({
            position: "relative"
        });
      
        var availableHeight = container.innerHeight() || DEFAULT_HEIGHT;        
        var availableWidth = container.innerWidth() || 1;

        var whiteKeyCount = getWhiteKeyCount(options.startKey, options.endKey);
        var whiteKeyWidth = Math.floor(availableWidth / whiteKeyCount);
        var whiteKeyHeight = Math.floor(availableHeight);
        var blackKeyWidth = Math.round(whiteKeyWidth * BLACK_KEY_WIDTH_FACTOR);
        var blackKeyHeight = Math.round(whiteKeyHeight * BLACK_KEY_HEIGHT_FACTOR);
        var blackKeyOffset = whiteKeyWidth - Math.round(blackKeyWidth / 2);

        var processedWhiteKeys = 0;
        for (var key = options.startKey; key <= options.endKey; key++) {
            var isBlack = isBlackKey(key);
            var keyDiv = $("<div/>").addClass(options.keyClass).data(KEY_DATA_KEY, key);
            if (!isBlack) {
                keyDiv.addClass(options.whiteKeyClass);
                keyDiv.css({
                    height: whiteKeyHeight + "px",
                    width: whiteKeyWidth + "px",
                    position: "absolute",
                    top: 0,
                    left: (processedWhiteKeys * whiteKeyWidth) + "px",
                    zIndex: options.zIndex
                });
                processedWhiteKeys++;
            } else {
                keyDiv.addClass(options.blackKeyClass);
                keyDiv.css({
                    height: blackKeyHeight + "px",
                    width: blackKeyWidth + "px",
                    position: "absolute",
                    top: 0,
                    left: ((processedWhiteKeys - 1) * whiteKeyWidth) + blackKeyOffset + "px",
                    zIndex: options.zIndex + 1
                });
            }

            options.keyCreatedCallback(keyDiv, key);
            keyDiv.appendTo(container);
        }
        
        if (options.selectionMode !== selectionMode.NONE) {
            $("." + options.keyClass, container).on("click", function () {
                $(this).toggleClass(options.selectedKeyClass);
                options.selectionChangedCallback();
            });
        }

        var pianoObject = {
            getSelectedKeys: function() {
                return getSelectedKeys(container, options);
            }
        };

        container.data(CONTAINER_DATA_KEY, pianoObject);
    }

    function getSelectedKeys(element, options) {
        return $("." + options.selectedKeyClass, element)
            .map(function(index, keyDiv) {
                return $(keyDiv).data(KEY_DATA_KEY);
            })
            .get();
    }

    function validateOptions(options) {
        if (options.endKey <= options.startKey) {
            throw new Error("The end key must be greater than the start key.");
        }

        if (options.startKey < MIN_KEY || options.endKey > MAX_KEY) {
            throw new Error("The key values must be grater than or equal to " + MIN_KEY + " and less than or euqal to " + MAX_KEY + ".");
        }

        if (isBlackKey(options.startKey)) {
            throw new Error("The keyboard has to start with a white key.");
        }

        if (isBlackKey(options.endKey)) {
            throw new Error("The keyboard has to end with a white key.");
        }
    }

    function isBlackKey(key) {
        var mod = key % 12;
        return mod === 1 || mod === 3 || mod === 6 || mod === 8 || mod === 10;
    }

    function getWhiteKeyCount(startKey, endKey) {
        var whiteKeys = 0;
        for (var key = startKey; key <= endKey; key++) {
            if (!isBlackKey(key)) {
                whiteKeys++;
            }
        }

        return whiteKeys;
    }

})(window.jQuery);