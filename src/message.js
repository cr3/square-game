/* Create a level.  */
var Message = function (messageContainer) {
    /* Private variables.  */
    var context = messageContainer.getContext("2d");
    var message;

    return {
        draw: function () {
            var size = Math.floor(context.canvas.width / 10);

            if (message) {
                context.globalAlpha = 0.5;
                context.fillStyle = "#bbada0";
                context.fillRect(
                    0,
                    0,
                    context.canvas.width,
                    context.canvas.height);

                context.globalAlpha = 1.0;
                context.font = size + "px Arial";
                context.fillStyle = "black";
                context.textAlign = "center";
                context.fillText(
                    message,
                    context.canvas.width / 2,
                    context.canvas.height / 2);
            } else {
                context.clearRect(
                    0,
                    0,
                    context.canvas.width,
                    context.canvas.height);
            }
        },
        reset: function (text) {
            message = text;
            this.draw();
        },
        resize: function (size) {
            context.canvas.width = size;
            context.canvas.height = size;
            this.draw();
        }
    };
};
