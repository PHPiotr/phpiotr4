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
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/dist/js/',
                        src: ['bootstrap.js'],
                        dest: 'public/javascripts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist/',
                        src: ['jquery.js'],
                        dest: 'public/javascripts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/jquery-ui/ui/widgets/',
                        src: ['datepicker.js'],
                        dest: 'public/javascripts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: 'app/javascripts/flights/',
                        src: ['*.js'],
                        dest: 'public/javascripts/flights/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        cwd: 'app/javascripts/hostels/',
                        src: ['*.js'],
                        dest: 'public/javascripts/hostels/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['less']);
    grunt.registerTask('production', ['less:production']);
    grunt.registerTask('dev', ['less:dev']);
};