module( "Square", {
    setup: function() {
        var canvas = document.createElement("canvas");

        this.context = canvas.getContext("2d");
    }
});

test("size", function () {
    var square = Square();
    var testWidth;
    var testHeight;

    this.context.rect = function(x, y, width, height) {
        testWidth = width;
        testHeight = height;
    };

    square.draw(this.context, 0, 0, 1);
    equal(testWidth, 1);
    equal(testHeight, 1);
});

test("fillStyle", function () {
    var square = Square({fillStyle: "#111111"});

    square.draw(this.context, 0, 0);
    equal(this.context.fillStyle, "#111111");
});

test("globalAlpha", function () {
    var square = Square({globalAlpha: 0.5});

    square.draw(this.context, 0, 0);
    equal(this.context.globalAlpha, 0.5);
});

test("lineWidth", function () {
    var square = Square({lineWidth: 1});

    square.draw(this.context, 0, 0);
    equal(this.context.lineWidth, 1);
});

test("margin", function () {
    var square = Square({margin: 1});
    var testX;
    var testY;

    this.context.rect = function(x, y, width, height) {
        testX = x;
        testY = y;
    };

    square.draw(this.context, 0, 0, 1);
    equal(testX, 1);
    equal(testY, 1);
});

test("strokeStyle", function () {
    var square = Square({strokeStyle: "#111111"});

    square.draw(this.context, 0, 0);
    equal(this.context.strokeStyle, "#111111");
});
