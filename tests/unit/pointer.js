module( "Pointer", {
    setup: function() {
    }
});

test("restraint", function () {
    var pointer = Pointer({restraint: 10});

    pointer.start(0, 0);
    pointer.end(200, 0);
    equal(pointer.end(200, 0), "right");

    equal(typeof pointer.end(200, 10), "undefined");
});

test("threshold", function () {
    var pointer = Pointer({threshold: 10});

    pointer.start(0, 0);
    equal(typeof pointer.end(9, 0), "undefined");

    equal(pointer.end(10, 0), "right");
});

test("allowedTime", function () {
    var pointer = Pointer({allowedTime: 0});

    pointer.start(0, 0);
    equal(typeof pointer.end(200, 0), "undefined");
});
