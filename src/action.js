/* Create an action with callback.  */
var Action = function (name, callback, inversed) {
    var inverseNames = {
        "add":    "remove",
        "remove": "add",
        "left":   "right",
        "right":  "left",
        "up":     "down",
        "down":   "up"
    };

    if (typeof inversed === "undefined") {
        inversed = false;
    }

    /* Public methods.  */
    return {
        name: name,
        inversed: inversed,
        call: function () {
            if (typeof callback !== "undefined") {
                callback();
            }
        },
        inverse: function () {
            var inverseName = inverseNames[name];

            return Action(inverseName, callback, !inversed);
        }
    };
};
