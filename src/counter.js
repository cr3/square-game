/* Counter to keep score.  */
var Counter = function (element) {
    var initial = parseInt(element.innerHTML, 10);
    var count = initial;

    /* Public methods.  */
    return {
        count: function () {
            return count;
        },
        decrement: function () {
            if (count > initial) {
                --count;
                this.draw();
            }
        },
        increment: function () {
            ++count;
            this.draw();
        },
        draw: function () {
            element.innerHTML = count;
        },
        reset: function (value) {
            count = (typeof value === "undefined") ? initial : value;
            this.draw();
        }
    };
};
