var Manager = function (container) {
    /* Private variables.  */
    var input = Input(container);

    var board = Board(document.getElementById("board"));
    var counter = Counter(document.getElementById("counter"));
    var level = Level(document.getElementById("level"));
    var message = Message(document.getElementById("message"));
    var player = Player(document.getElementById("player"));

    /* Private functions.  */
    var check = function () {
        if (board.matrix.compare(player.matrix)) {
            message.reset("Level complete");

            input.reset();
            input.on("add", complete);
            input.on("move", complete);
            input.on("undo", complete);
            input.on("reset", complete);
            input.on("resize", resize);
        }
    };

    var complete = function () {
        level.increment();
        reset();
    };

    var add = function () {
        var action = Action("add", check);

        player.animate(action);
        counter.increment();
    };

    var move = function (direction) {
        var action = Action(direction, check);

        player.animate(action);
        if (counter.count()) {
            counter.increment();
        }
    };

    var undo = function () {
        var action = Action("undo");

        player.animate(action);
        counter.decrement();
    };

    var reset = function () {
        board.reset(level.cols(), level.rows(), level.count());
        player.reset(level.cols(), level.rows());
        counter.reset();
        message.reset();

        input.reset();
        input.on("add", add);
        input.on("move", move);
        input.on("undo", undo);
        input.on("reset", reset);
        input.on("resize", resize);
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
        message.resize(size);

        /* Apply CSS transform.  */
        container.style.transform = rule;
        container.style.webkitTransform = rule;
    };

    /* Public methods.  */
    return {
        run: function () {
            reset();
            resize();
        }
    };
};
