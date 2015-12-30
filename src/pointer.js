/* Pointer to keep position.  */
var Pointer = function (options) {
    /* Private variables.  */
    var defaults = {
        allowedTime: 300,  // maximum time allowed to point
        restraint: 50,     // maximum perpendicular distance to travel
        threshold: 75      // minimum distance to travel
    };
    var startTime;
    var startX;
    var startY;

    /* Initialize options.  */
    options = extend(options, defaults);

    /* Public methods.  */
    return {
        start: function (x, y) {
            startTime = new Date().getTime();
            startX = x;
            startY = y;
        },
        end: function (x, y) {
            var direction;
            var distX = x - startX;
            var distY = y - startY;
            var elapsedTime = new Date().getTime() - startTime;

            if (elapsedTime < options.allowedTime) {
                if (Math.abs(distX) >= options.threshold &&
                    Math.abs(distY) < options.restraint) {
                    direction = (distX < 0) ? "left" : "right";
                } else if (Math.abs(distY) >= options.threshold &&
                    Math.abs(distX) < options.restraint) {
                    direction = (distY < 0) ? "up" : "down";
                }
            }
            return direction;
        }
    };
};
