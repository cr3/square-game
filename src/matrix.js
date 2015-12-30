/* Two-dimension matrix with an initial value object.  */
var Matrix = function (initial) {
    /* Private variables.  */
    var matrix = [];

    /* Private functions.  */
    var transpose = function () {
        matrix = matrix[0].map(function (_, r) {
            return matrix.map(function (m) {
                return m[r];
            });
        });
    };

    /* Public methods.  */
    return {
        cols: function () {
            return matrix.length;
        },
        rows: function () {
            return matrix[0].length;
        },
        get: function (col, row) {
            return matrix[col][row];
        },
        set: function (col, row, element) {
            matrix[col][row] = element;
        },
        reset: function (cols, rows) {
            var col;  // Column index.
            var row;  // Row index.
            var dim;  // Matrix dimension.

            matrix = [];
            for (col = 0; col < cols; ++col) {
                dim = [];
                for (row = 0; row < rows; ++row) {
                    dim[row] = initial;
                }
                matrix[col] = dim;
            }
        },
        iterate: function (func) {
            var col;  // Column index.
            var row;  // Row index.
            var cols = this.cols();  // Number of columns.
            var rows = this.rows();  // Number of rows.

            for (col = 0; col < cols; ++col) {
                for (row = 0; row < rows; ++row) {
                    func(this, col, row);
                }
            }
        },
        move: function (direction) {
            switch (direction) {
            case "left":
                matrix.push(matrix.shift());
                break;
            case "right":
                matrix.unshift(matrix.pop());
                break;
            case "clockwise":
                transpose();
                matrix.reverse();
                break;
            case "anticlockwise":
                matrix.reverse();
                transpose();
                break;
            default:
                throw {
                    name: "TypeError",
                    message: "Unknown direction: " + direction
                };
            }
        }
    };
};
