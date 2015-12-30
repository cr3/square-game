var Manager = function (container) {
    /* Private variables.  */
    var colsContainer = document.getElementById("cols");
    var rowsContainer = document.getElementById("rows");

    var board = Board(
        document.getElementById("board"));
    var player = Player(
        document.getElementById("player"),
        document.getElementById("counter"));

    /* Private functions.  */
    var add = function () {
        player.animate("add");
    };

    var move = function (direction) {
        player.animate(direction);
    };

    var undo = function () {
        player.animate("undo");
    };

    var reset = function () {
        var cols = parseInt(colsContainer.value, 10);
        var rows = parseInt(rowsContainer.value, 10);

        board.reset(cols, rows);
        player.reset(cols, rows);
    };

    var resize = function () {
        var content = [
            container.offsetWidth,
            container.offsetHeight
        ];
        var browser = [
            window.innerWidth,
            window.innerHeight
        ];
        var scale = Math.floor(Math.min(
            browser[0] / content[0],
            browser[1] / content[1]) * 10) / 10;
        var size = content[0] * scale;
        var offset = (browser[0] - size) / 2;
        var rule = "translate(" + offset + "px, 0px)" +
            " scale(" + scale + ")";

        board.resize(size);
        player.resize(size);

        /* Apply CSS transform.  */
        container.style.transform = rule;
        container.style.webkitTransform = rule;
    };

    /* Public methods.  */
    return {
        run: function () {
            var input = Input(container);
            input.on("add", add);
            input.on("move", move);
            input.on("undo", undo);
            input.on("reset", reset);
            input.on("resize", resize);

            reset();
            resize();
        }
    };
};
