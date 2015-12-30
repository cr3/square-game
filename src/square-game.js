/* Wait for the browser to be ready.  */
window.requestAnimationFrame(function () {
    var manager = Manager(document.body.children[0]);
    manager.run();
});
