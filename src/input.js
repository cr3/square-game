var Input = function (container) {
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
        var index;
        var elements;
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

        /* Listen for click events on all buttons  */
        elements = container.getElementsByTagName("input");
        for (index = 0; index < elements.length; ++index) {
            if (elements[index].type === "button") {
                elements[index].addEventListener("click", handleEvent, false);
            }
        }

        /* Listen for canvas events  */
        elements = container.getElementsByTagName("canvas");
        for (index = 0; index < elements.length; ++index) {
            canvasEvents.forEach(function (evt) {
                elements[index].addEventListener(evt, handleEvent, false);
            });
        }

        /* Listen for window events  */
        windowEvents.forEach(function (evt) {
            window.addEventListener(evt, handleEvent, false);
        });
    };

    var handleEvent = function (evt) {
        var action;
        var element;
        var keyCodeAction = {
            "8": "undo",           // backspace
            "13": "add",           // enter
            "32": "add",           // space
            "37": "left",          // left arrow
            "39": "right",         // right arrow
            "38": "anticlockwise", // up arrow
            "40": "clockwise",     // down arrow
            "72": "left",          // Vim left
            "76": "right",         // Vim right
            "75": "anticlockwise", // Vim up
            "74": "clockwise",     // Vim down
            "65": "left",          // A
            "68": "right",         // D
            "87": "anticlockwise", // W
            "83": "clockwise"      // S
        };

        evt = evt || window.event;

        switch (evt.type) {
        case "resize":
        case "orientationchange":
            action = "resize";
            break;
        case "keydown":
            if (keyCodeAction[evt.keyCode]) {
                evt.preventDefault();
            }
            break;
        case "keyup":
            action = keyCodeAction[evt.keyCode];
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
            if (typeof action === "undefined") {
                action = "add";
            } else if (action === "up") {
                action = "anticlockwise";
            } else if (action === "down") {
                action = "clockwise";
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
        case "clockwise":
        case "anticlockwise":
            emit("move", action);
            break;
        case "add":
        case "undo":
        case "reset":
        case "resize":
            emit(action);
            break;
        case undefined:
            /* Do nothing  */
            break;
        default:
            throw {
                name: "TypeError",
                message: "Unknown action: " + action
            };
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
    };
};
