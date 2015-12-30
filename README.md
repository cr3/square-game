README
======

The Square^2 game is about providing a limited set of commands to move
squares in a matrix.


Getting started
---------------

To prepare the development environment, install the required dependencies:

```
npm install
```

To build the game, process the source files:

```
grunt build
```

To play, open the game in a browser:

```
x-www-browser build/game.html
```

Developing
----------

The Gruntfile has all sorts of goodies. The most important targets are:

    build

        Minify, uglify and copy the source.

    lint

        Check the syntax of the source files.

    test

        Run the unit tests.

Navigating
----------

This directory structure tries to be as shallow as possible:

    build/

        Scratch directory used by grunt when processing the source.

    lib/

        Where the source lives, containing the JS, CSS and HTML.

    node_modules/

        Package dependencies installed by npm.
