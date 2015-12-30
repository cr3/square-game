var Player = function (playerContainer, counterContainer, options) {
    /* Private constants.  */
    var defaults = {
        steps: 5,
    };
    var square = Square({
        fillStyle: "#bbada0",
        margin: 25
    });

    /* Private variables.  */
    var context = playerContainer.getContext("2d");
    var counter = Counter(counterContainer);
    var matrix = Matrix(emptySquare);
    var board = Board(playerContainer, matrix);
    var queue = [];
    var stack = [];
    var step = 0;

    /* Private functions.  */
    var loop = function () {
        action = queue[0];
        switch (action) {
        case "undo":
            undo(action);
            break;
        case "add":
        case "remove":
        case "-add":
        case "-remove":
            edit(action);
            break;
        case "left":
        case "right":
        case "anticlockwise":
        case "clockwise":
        case "-left":
        case "-right":
        case "-anticlockwise":
        case "-clockwise":
            move(action);
            break;
        case undefined:
            /* Do nothing.  */
            break;
        }

        count(action);
        board.draw();

        if (queue.length) {
            window.requestAnimationFrame(loop);
        }
    };

    var count = function (action) {
        if (step >= options.steps) {
            if (action[0] === "-") {
                counter.decrement();
            } else {
                counter.increment();
                stack.push(action);
            }
            queue.shift();
            step = 0;
        }
    };

    var undo = function (action) {
        queue.shift();
        if (stack.length) {
            queue.push("-" + stack.pop());
        }
    };

    var edit = function (action) {
        var col = Math.floor(matrix.cols() / 2);
        var row = Math.floor(matrix.rows() / 2);
        var oldElement = matrix.get(col, row);
        var newElement;

        switch (action) {
        case "add":
        case "-remove":
            newElement = square;
            break;
        case "remove":
        case "-add":
            newElement = emptySquare;
            break;
        default:
            throw {
                name: "TypeError",
                message: "Unknown edit: " + action
            };
        }

        if (newElement !== oldElement) {
            matrix.set(col, row, newElement);
            step += options.steps;
        } else {
            queue.shift();
        }
    };

    var move = function (direction) {
        var sign = 1;

        if (stack.length) {

            /* Save context before applying transformations.  */
            if (!step) {
                context.save();
            }

            switch (direction) {
            case "left":
            case "-right":
                sign = -1;
            case "right":
            case "-left":
                translate(sign);
                break;
            case "anticlockwise":
            case "-clockwise":
                sign = -1;
            case "clockwise":
            case "-anticlockwise":
                rotate(sign);
                break;
            default:
                throw {
                    name: "TypeError",
                    message: "Unknown move: " + direction
                };
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
    board.reset = function (cols, rows) {
        queue = [];
        stack = [];
        step = 0;
        counter.reset();
        matrix.reset(cols, rows);
        board.draw();
    };

    board.animate = function (action) {
        queue.push(action);
        window.requestAnimationFrame(loop);
    };

    return board;
};
