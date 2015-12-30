var manager = {

    run: function (container) {
        /* Create persistent objects.  */
        this.container = container;
        this.board = Board(
            document.getElementById("board"));
        this.player = Player(
            document.getElementById("player"),
            document.getElementById("counter"));

        this.reset();

        /* Initialize input event handlers.  */
        this.input = Input(container);
        this.input.on("add", this.add.bind(this));
        this.input.on("move", this.move.bind(this));
        this.input.on("undo", this.undo.bind(this));
        this.input.on("reset", this.reset.bind(this));
        this.input.on("resize", this.resize.bind(this));

        this.resize();
    },

    add: function () {
        this.player.animate("add");
    },

    move: function (direction) {
        this.player.animate(direction);
    },

    undo: function () {
        this.player.animate("undo");
    },

    /* Reset the board and player.  */
    reset: function () {
        var cols = parseInt(document.getElementById("cols").value, 10);
        var rows = parseInt(document.getElementById("rows").value, 10);

        this.board.reset(cols, rows);
        this.player.reset(cols, rows);
    },

    resize: function () {
        var content = [
            this.container.offsetWidth,
            this.container.offsetHeight
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

        this.board.resize(size);
        this.player.resize(size);

        /* Apply CSS transform.  */
        this.container.style.transform = rule;
        this.container.style.webkitTransform = rule;
    }
};
