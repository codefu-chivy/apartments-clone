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
    }
    });
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["sass"]);
}