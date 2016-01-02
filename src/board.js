/* Game board consisting of a matrix of squares.  */
var Board = function (boardContainer, matrix) {
    /* Private constants.  */
    var square = Square({
        margin: 4
    });

    /* Private variables.  */
    var context = boardContainer.getContext("2d");
    if (!matrix) {
        matrix = Matrix(null);
    }

    /* Private functions.  */
    var seq = function (length) {
        var array = [];
        var integer;

        for (integer = 0; integer < length; ++integer) {
            array.push(integer);
        }

        return array;
    };

    var shuffle = function (array) {
        var shuffled = array.slice(0),
            arrayIndex = array.length,
            randomItem,
            randomIndex;

        while (arrayIndex--) {
            randomIndex = Math.floor((arrayIndex + 1) * Math.random());
            randomItem = shuffled[randomIndex];
            shuffled[randomIndex] = shuffled[arrayIndex];
            shuffled[arrayIndex] = randomItem;
        }

        return shuffled;
    };

    var sample = function (array, size) {
        return shuffle(array).slice(0, size);
    };

    /* Public methods.  */
    return {
        matrix: matrix,
        cols: function () {
            return matrix.cols();
        },
        rows: function () {
            return matrix.rows();
        },
        draw: function () {
            var boardSize = Math.min(
                context.canvas.width, context.canvas.height);
            var squareSize = Math.floor(
                boardSize / Math.max(matrix.cols(), matrix.rows()));

            context.clearRect(
                0,
                0,
                context.canvas.width,
                context.canvas.height);

            matrix.iterate(function (m, col, row) {
                var square = m.get(col, row);

                if (square) {
                    square.draw(context, col, row, squareSize);
                }
            });
        },
        reset: function (cols, rows, count) {
            var size = cols * rows;
            var indices;

            /* Sample should not be too easy.  */
            while (true) {
                indices = sample(seq(size), count);
                if (count != 1 || indices[0] != 4) {
                    break;
                }
            }

            matrix.reset(cols, rows);
            indices.forEach(function (index) {
                var col = Math.floor(index / cols);
                var row = index % rows;

                matrix.set(col, row, square);
            });

            this.draw();
        },
        resize: function (size) {
            context.canvas.width = size;
            context.canvas.height = size;
            this.draw();
        }
    };
};
