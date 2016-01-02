/* An action has a name that can be inversed.  */
var Action = function (name, options) {
    /* Private constants.  */
    var defaults = {
        inversed: false
    };
    var inverseNames = {
        add:    "remove",
        remove: "add",
        left:   "right",
        right:  "left",
        up:     "down",
        down:   "up"
    };

    /* Initialize options.  */
    options = extend(options, defaults);

    /* Public methods.  */
    return {
        name: name,
        options: options,
        inverse: function () {
            var inverseName = inverseNames[name];
            var inverseOptions = Object.create(options);

            inverseOptions.inversed = !options.inversed;
            return Action(inverseName, inverseOptions);
        }
    };
};
