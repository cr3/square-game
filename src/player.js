var Player = function (playerContainer, options) {
    /* Private constants.  */
    var defaults = {
        steps: 5
    };
    var square = Square({
        fillStyle: "#bbada0",
        margin: 25
    });

    /* Private variables.  */
    var context = playerContainer.getContext("2d");
    var matrix = Matrix(emptySquare);
    var player = Board(playerContainer, matrix);
    var queue = [];
    var stack = [];
    var step = 0;

    /* Private functions.  */
    var loop = function () {
        var action = queue[0];

        switch (action.name) {
        case "undo":
            undo(action);
            break;
        case "add":
        case "remove":
            edit(action);
            break;
        case "left":
        case "right":
        case "up":
        case "down":
            move(action);
            break;
        case undefined:
            /* Do nothing.  */
            return;
        default:
            throw {
                name: "TypeError",
                message: "Unknown action: " + action.name
            };
        }

        player.draw();

        if (step >= options.steps) {
            if (!action.inversed) {
                stack.push(action);
            }
            queue.shift();
            action.call();
            step = 0;
        }

        if (queue.length) {
            window.requestAnimationFrame(loop);
        }
    };

    var undo = function (action) {
        queue.shift();

        if (stack.length) {
            queue.push(stack.pop().inverse());
        }
    };

    var edit = function (action) {
        var col = Math.floor(matrix.cols() / 2);
        var row = Math.floor(matrix.rows() / 2);
        var oldElement = matrix.get(col, row);
        var newElement;

        switch (action.name) {
        case "add":
            newElement = square;
            break;
        case "remove":
            newElement = emptySquare;
            break;
        }

        if (newElement !== oldElement) {
            matrix.set(col, row, newElement);
            step += options.steps;
        } else {
            queue.shift();
        }
    };

    var move = function (action) {
        var direction = action.name;

        if (stack.length) {

            /* Save context before applying transformations.  */
            if (!step) {
                context.save();
            }

            switch (action.name) {
            case "left":
                translate(-1);
                break;
            case "right":
                translate(1);
                break;
            case "up":
                direction = "anticlockwise";
                rotate(-1);
                break;
            case "down":
                direction = "clockwise";
                rotate(1);
                break;
            }

            /* Restore context after applying transformations.  */
            if (++step >= options.steps) {
                context.restore();
                matrix.move(direction);
            }
        } else {
            queue.shift();
        }
    };

    var translate = function (sign) {
        var innerCol = (sign > 0) ? matrix.cols() - 1 : 0;
        var outerCol = (sign > 0) ? -1 : matrix.cols();
        var width = context.canvas.width / matrix.cols();
        var x = sign * width / options.steps;
        var y = 0;
        var row;

        context.clearRect(outerCol * width, 0, width, context.canvas.height);
        for (row = 0; row < matrix.rows(); ++row) {
            matrix.get(innerCol, row).draw(context, outerCol, row, width);
        }

        context.translate(x, y);
    };

    var rotate = function (sign) {
        var max = Math.max(matrix.cols(), matrix.rows());
        var angle = sign * Math.PI / 2 / options.steps;
        var width = context.canvas.width * matrix.cols() / max;
        var height = context.canvas.height * matrix.rows() / max;
        var x = (
            (1 - Math.cos(angle)) * width +
            Math.sin(angle) * height) / 2;
        var y = -(
            Math.sin(angle) * width +
            Math.cos(angle) * height -
            height) / 2;

        context.translate(x, y);
        context.rotate(angle);
    };

    /* Initialize options.  */
    options = extend(options, defaults);

    /* Public methods.  */
    player.reset = function (cols, rows) {
        queue = [];
        stack = [];
        step = 0;
        matrix.reset(cols, rows);
        player.draw();
    };

    player.animate = function (action) {
        queue.push(action);
        window.requestAnimationFrame(loop);
    };

    return player;
};
