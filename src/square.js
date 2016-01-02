/* Create a square rectangle with sensible defaults.  */
var Square = function (options) {
    /* Private constants.  */
    var defaults = {
        fillStyle: "black",
        globalAlpha: 1.0,
        lineWidth: 0,
        margin: 0,
        strokeStyle: "white"
    };

    /* Initialize options.  */
    options = extend(options, defaults);

    /* Public methods.  */
    return {
        draw: function (context, col, row, size) {
            var realSize = size - (2 * options.margin);

            context.beginPath();
            context.globalAlpha = options.globalAlpha;
            context.fillStyle = options.fillStyle;
            context.rect(
                col * size + options.margin,
                row * size + options.margin,
                realSize,
                realSize);
            context.fill();
            context.lineWidth = options.lineWidth;
            context.strokeStyle = options.strokeStyle;
            context.stroke();
        }
    };
};
