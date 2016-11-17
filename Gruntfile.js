module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                options: {
                    relativeUrls: true
                },
                files: {
                    'public/stylesheets/bootstrap.debug.css': 'node_modules/bootstrap/less/bootstrap.less'
                }
            },
            production: {
                options: {
                    cleancss: true,
                    compress: true,
                    relativeUrls: true
                },
                files: {
                    'public/stylesheets/bootstrap.css': 'node_modules/bootstrap/less/bootstrap.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less']);
    grunt.registerTask('production', ['less:production']);
    grunt.registerTask('dev', ['less:dev']);
};