var Input = function (container) {
    /* Private constants.  */
    var canvasEvents = [
        "mousedown",
        "mousemove",
        "mouseup",
        "touchstart",
        "touchmove",
        "touchend"
    ];
    var windowEvents = [
        "keydown",
        "keyup",
        "resize",
        "orientationchange"
    ];
    var keyCodeAction = {
        "8": "undo",    // backspace
        "27": "undo",   // escape
        "13": "edit",   // enter
        "32": "edit",   // space
        "37": "left",   // left arrow
        "39": "right",  // right arrow
        "38": "up",     // up arrow
        "40": "down",   // down arrow
        "72": "left",   // Vim left
        "76": "right",  // Vim right
        "75": "up",     // Vim up
        "74": "down",   // Vim down
        "65": "left",   // A
        "68": "right",  // D
        "87": "up",     // W
        "83": "down"    // S
    };

    /* Private variables.  */
    var events = {};
    var pointer = Pointer();

    /* Private functions.  */
    var emit = function (evt, data) {
        var callbacks = events[evt];

        if (callbacks) {
            callbacks.forEach(function (callback) {
                callback(data);
            });
        }
    };

    var listen = function () {
        var canvas;
        var elements;
        var index;

        /* Listen for click events on all buttons.  */
        elements = container.getElementsByTagName("input");
        for (index = 0; index < elements.length; ++index) {
            if (elements[index].type === "button") {
                elements[index].addEventListener("click", handleEvent, false);
            }
        }

        /* Listen for canvas events.  */
        elements = container.getElementsByTagName("canvas");
        canvas = elements[elements.length - 1];
        canvasEvents.forEach(function (evt) {
            canvas.addEventListener(evt, handleEvent, false);
        });

        /* Listen for window events.  */
        windowEvents.forEach(function (evt) {
            window.addEventListener(evt, handleEvent, false);
        });
    };

    var handleEvent = function (evt) {
        var element;
        var action = "noop";
        var modifiers = evt.altKey ||
            evt.ctrlKey ||
            evt.metaKey ||
            evt.shiftKey;

        evt = evt || window.event;

        switch (evt.type) {
        case "resize":
        case "orientationchange":
            action = "resize";
            break;
        case "keydown":
            if (!modifiers && keyCodeAction[evt.keyCode]) {
                evt.preventDefault();
            }
            break;
        case "keyup":
            if (!modifiers) {
                action = keyCodeAction[evt.keyCode];
            }
            break;
        case "click":
            action = evt.target.id;
            break;
        case "MSPointerDown":
        case "mousedown":
        case "touchstart":
            element = evt.changedTouches ? evt.changedTouches[0] : evt;
            pointer.start(element.pageX, element.pageY);
            evt.preventDefault();
            break;
        case "MSPointerMove":
        case "mousemove":
        case "touchmove":
            evt.preventDefault();
            break;
        case "MSPointerUp":
        case "mouseup":
        case "touchend":
            element = evt.changedTouches ? evt.changedTouches[0] : evt;
            action = pointer.end(element.pageX, element.pageY);
            if (action === "noop") {
                action = "edit";
            }
            evt.preventDefault();
            break;
        default:
            throw {
                name: "TypeError",
                message: "Unknown event type: " + evt.type
            };
        }

        handleAction(action);
    };

    var handleAction = function (action) {
        /* Handle actions triggered by some events  */
        switch (action) {
        case "left":
        case "right":
        case "up":
        case "down":
            emit("move", action);
            break;
        case "noop":
            /* No operation.  */
            break;
        default:
            emit(action);
            break;
        }
    };

    /* Initialize listeners. */
    listen();

    /* Public methods.  */
    return {
        on: function (evt, callback) {
            if (!events[evt]) {
                events[evt] = [];
            }
            events[evt].push(callback);
        },
        reset: function () {
            events = {};
        }
    };
};
