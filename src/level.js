/* Create a level.  */
var Level = function (element) {
    var level = Counter(element);

    /* Public methods.  */
    level.cols = function() {
        return Math.max(Math.ceil(Math.sqrt(this.count() + 1)), 3);
    };

    level.rows = function() {
        return Math.max(Math.ceil(Math.sqrt(this.count() + 1)), 3);
    };

    level.size = function() {
        return this.cols() * this.rows();
    };

    return level;
};
