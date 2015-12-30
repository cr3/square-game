module( "extend", {
    setup: function() {
    }
});

test("undefined", function () {
    deepEqual(extend(), {});
});

test("empty", function () {
    deepEqual(extend({}), {});
});

test("in-obj", function () {
    deepEqual(extend({a: 1}, {}), {a: 1});
});

test("in-arg", function () {
    deepEqual(extend({}, {a: 1}), {a: 1});
});

test("in-both", function () {
    deepEqual(extend({a: 1}, {a: 2}), {a: 1});
});

test("in-three", function () {
    deepEqual(extend({a: 1}, {b: 2}, {c: 3}), {a: 1, b: 2, c: 3});
});
