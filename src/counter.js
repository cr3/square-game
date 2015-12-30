/* Create a counter to keep score.  */
var Counter = function (element) {
    /* Public methods.  */
    return {
        count: function () {
            return parseInt(element.innerHTML, 10);
        },
        decrement: function () {
            element.innerHTML = this.count() - 1;
            return this;
        },
        increment: function () {
            element.innerHTML = this.count() + 1;
            return this;
        },
        reset: function (value) {
            value = (typeof value === "undefined") ? 0 : value;
            element.innerHTML = value;
            return this;
        }
    };
};
