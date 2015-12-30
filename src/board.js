/* Game board consisting of a matrix of squares.  */
var Board = function (boardContainer, matrix) {
    /* Private constants.  */
    var square = Square({
        margin: 4
    });

    /* Private variables.  */
    var context = boardContainer.getContext("2d");
    if (typeof matrix === "undefined") {
        matrix = Matrix(emptySquare);
    }

    /* Public methods.  */
    return {
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
                m.get(col, row).draw(context, col, row, squareSize);
            });
        },
        reset: function (cols, rows) {
            matrix.reset(cols, rows);
            matrix.iterate(function (matrix, col, row) {
                if (Math.floor(Math.random()*2)) {
                    matrix.set(col, row, square);
                }
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
