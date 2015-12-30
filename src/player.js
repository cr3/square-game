var Player = function (playerContainer, counterContainer, options) {
    /* Private constants.  */
    var defaults = {
        steps: 5,
    };
    var square = Square({
        fillStyle: "#bbada0",
        margin: 12
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
        case "done":
        case "undo":
            undo(action);
            break;
        case "add":
        case "remove":
            edit(action);
            break;
        case "left":
        case "right":
        case "anticlockwise":
        case "clockwise":
            move(action);
            break;
        case undefined:
            /* Do nothing.  */
            break;
        }

        if (step >= options.steps) {
            stack.push(action);
            queue.shift();
            step = 0;
        }

        board.draw();

        if (queue.length) {
            window.requestAnimationFrame(loop);
        }
    };

    // TODO: remove this
    var undoing = function () {
        return queue.length && queue[queue.length - 1] === "done";
    };

    var undo = function (action) {
        var previous;
        var opposites = {
            "add":           "remove",
            "remove":        "add",
            "left":          "right",
            "right":         "left",
            "clockwise":     "anticlockwise",
            "anticlockwise": "clockwise",
        };

        queue.shift();
        switch (action) {
        case "undo":
            previous = stack.pop();
            if (typeof previous !== "undefined") {
                queue.push(opposites[previous]);
                queue.push("done");
            }
            break;
        case "done":
            counter.decrement();
            stack.pop();
            break;
        }
    };

    var edit = function (action) {
        var col = Math.floor(matrix.cols() / 2);
        var row = Math.floor(matrix.rows() / 2);
        var oldElement = matrix.get(col, row);
        var newElement;

        switch (action) {
        case "add":
            newElement = square;
            break;
        case "remove":
            newElement = emptySquare;
            break;
        default:
            throw {
                name: "TypeError",
                message: "Unknown edit: " + action
            };
        }

        if (newElement !== oldElement) {
            if (!undoing()) {
                counter.increment();
            }
            matrix.set(col, row, newElement);
            step += options.steps;
        } else {
            queue.shift();
        }
    };

    var move = function (direction) {
        var sign = 1;

        // TODO: clean this
        if (!stack.length) {
            queue.shift();
            return;
        }

        /* Save context before applying transformations.  */
        if (!step) {
            context.save();
        }

        switch (direction) {
        case "left":
            sign = -1;
        case "right":
            translate(sign);
            break;
        case "anticlockwise":
            sign = -1;
        case "clockwise":
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
            if (!undoing()) {
                counter.increment();
            }
            context.restore();
            matrix.move(direction);
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
