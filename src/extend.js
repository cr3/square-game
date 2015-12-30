/* Extend the properties of an object from arguments.  */
function extend(obj) {
    var arg;  // Argument index.
    var key;  // Object key identifier.

    if (typeof obj === "undefined") {
        obj = {};
    }

    for (arg = 1; arg < arguments.length; ++arg) {
        for (key in arguments[arg]) {
            if (arguments[arg].hasOwnProperty(key)) {
                if (typeof obj[key] === "undefined") {
                    obj[key] = arguments[arg][key];
                }
            }
        }
    }

    return obj;
}
