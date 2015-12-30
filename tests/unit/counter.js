module( "Counter", {
    setup: function() {
        var element = document.createElement("div");

        this.counter = Counter(element);
    }
});

test("count", function () {
    this.counter.reset();
    equal(this.counter.count(), 0);

    this.counter.increment();
    equal(this.counter.count(), 1);
});

test("decrement", function () {
    this.counter.reset(2);
    this.counter.decrement();
    equal(this.counter.count(), 1);

    this.counter.decrement();
    equal(this.counter.count(), 0);
});

test("increment", function () {
    this.counter.reset();
    this.counter.increment();
    equal(this.counter.count(), 1);

    this.counter.increment();
    equal(this.counter.count(), 2);
});

test("reset", function () {
    this.counter.reset(2);
    equal(this.counter.count(), 2);

    this.counter.reset(0);
    equal(this.counter.count(), 0);
});
