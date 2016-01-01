module( "Matrix", {
    setup: function() {
        this.matrix = Matrix(0);
        this.matrix.reset(2, 2);
    }
});

test("init", function () {
    equal(this.matrix.get(0, 0), 0);
    equal(this.matrix.get(0, 1), 0);
    equal(this.matrix.get(1, 0), 0);
    equal(this.matrix.get(1, 1), 0);
});

test("set", function () {
    equal(this.matrix.get(1, 0), 0);

    this.matrix.set(1, 0, 1);
    equal(this.matrix.get(1, 0), 1);
});

test("compare true", function () {
    var other = Matrix(0);
    other.reset(2, 2);

    equal(this.matrix.compare(other), true);
});

test("compare false", function () {
    var other = Matrix(0);
    other.reset(2, 2);
    other.set(0, 0, 1);

    equal(this.matrix.compare(other), false);
});

test("iterate", function () {
    expect(4);
    this.matrix.iterate(function(matrix, i, j) {
        equal(matrix.get(i, j), 0);
    });
});

test("right", function () {
    this.matrix.set(0, 0, 1);
    this.matrix.move("right");
    equal(this.matrix.get(1, 0), 1);
});

test("double right", function () {
    this.matrix.set(0, 0, 1);
    this.matrix.move("right");
    this.matrix.move("right");
    equal(this.matrix.get(0, 0), 1);
});

test("left", function () {
    this.matrix.set(1, 0, 1);
    this.matrix.move("left");
    equal(this.matrix.get(0, 0), 1);
});

test("double left", function () {
    this.matrix.set(1, 0, 1);
    this.matrix.move("left");
    this.matrix.move("left");
    equal(this.matrix.get(1, 0), 1);
});

test("clockwise", function () {
    this.matrix.set(0, 0, 1);
    this.matrix.move("clockwise");
    equal(this.matrix.get(1, 0), 1);
});
