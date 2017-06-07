module.exports = function(grunt) {
    grunt.initConfig({
        pgk: grunt.file.readJSON("package.json"),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/static/styles/css/styles.css': 'src/static/styles/sass/styles.scss'
                }
            }
        
        },
        watch: {
            css: {
                files: ["src/static/styles/sass/*.scss"],
                tasks: ["sass"]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    "src/static/js/index.min.js" : ["src/static/js/index.js"]
                }
            }
        }
    });
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["watch"]);
}