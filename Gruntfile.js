module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build: {
                src: ["build"]
            },
        },
        csslint: {
            base_theme: {
                src: "src/**/*.css",
                options: {
                    csslintrc: ".csslintrc"
                }
            }
        },
        cssmin: {
            build: {
                src: "src/<%= pkg.name %>.css",
                dest: "build/<%= pkg.name %>.css"
            }
        },
        embed: {
            options: {
                threshold: "10KB"
            },
            build: {
                files: {
                    "build/index.html": "build/<%= pkg.name %>.html"
                }
            }
        },
        htmllint: {
            all: [
                "src/**/*.html",
                "tests/**/*.html"
            ]
        },
        htmlmin: {
            options: {
                collapseWhitespace: true,
                removeComments: true
            },
            build: {
                files: {
                    "build/<%= pkg.name %>.html": "src/<%= pkg.name %>.html"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                "Gruntfile.js",
                "src/*.js",
                "tests/unit/**/*.js"
            ]
        },
        qunit: {
            options: {
                page: {
                    viewportSize: { width: 700, height: 500 }
                }
            },
            all: [
                "tests/**/*.html"
            ]
        },
        uglify: {
            build: {
                files: {
                    "build/animation-polyfill.js": "src/animation-polyfill.js",
                    "build/bind-polyfill.js": "src/bind-polyfill.js",
                    "build/extend.js": "src/extend.js",
                    "build/matrix.js": "src/matrix.js",
                    "build/counter.js": "src/counter.js",
                    "build/pointer.js": "src/pointer.js",
                    "build/square.js": "src/square.js",
                    "build/input.js": "src/input.js",
                    "build/board.js": "src/board.js",
                    "build/player.js": "src/player.js",
                    "build/manager.js": "src/manager.js",
                    "build/<%= pkg.name %>.js": "src/<%= pkg.name %>.js"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-embed");
    grunt.loadNpmTasks("grunt-html");

    grunt.registerTask("default", ["lint", "test"]);
    grunt.registerTask("lint", ["jshint", "csslint", "htmllint"]);
    grunt.registerTask("test", ["qunit"]);
    grunt.registerTask("build", ["clean", "cssmin", "htmlmin", "uglify", "embed"]);
};
