// Import setting from a external file
var opt = require('./grunt.config')();

// configurable paths
var dir = {
    dev: 'ui_src',
    dist: 'ui_dist'
};

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: dir,
        pkg: grunt.file.readJSON('package.json'),

        // RequireJs optimizer
        requirejs: {
            dev: {
                options: opt.requireJsOptions('dev')
            },
            dist: {
                options: opt.requireJsOptions('dist')
            }
        },

        compass: { // Task
            dev: { // target
                options: opt.compassOptions('dev')
            },
            dist: { // Another Target
                options: opt.compassOptions('dist')
            }
        },
        
        // Minify js files
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= config.dist %>/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        // Copy any files
        copy: {
            src: ['<%= config.dev %>/js/require.js'],
            dest: '<%= config.dist %>/js'
        },
    
        // Clean folder or files
        clean: {
            build: {
                src: ['<%= config.dist %>/*']
            }
        },

        // Check errors
        jshint: {
            files: ['Gruntfile.js', 'grunt.config.js', '<%= config.dev %>/js/*.js', '<%= config.dev %>/js/**/*.js', '!<%= config.dev %>/js/vendor/**'],
            options: {
                // options here to override JSHint defaults
                unused: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                reporter: require('jshint-stylish')
            }
        },

        // Detect changes
        watch: {
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'requirejs:dev']
            },
            css: {
                files: ['<%= config.dev %>/sass/*.scss', '<%= config.dev %>/sass/**/**.scss'],
                tasks: ['compass:dev']
            }
        }
    });

    grunt.registerTask('default', ['dev']);
    grunt.registerTask('dev', ['clean', 'jshint', 'compass:dev', 'requirejs:dev', 'watch']);
    grunt.registerTask('dist', ['clean', 'jshint', 'compass:dist', 'requirejs:dist']);

    /*
    grunt.registerTask('dev', 'build process for development', function () {
        process.env.DEST = 'dev';
        grunt.task.run([
           'jshint',
           'requirejs',
           'watch'
        ]);
    });

    grunt.registerTask('dist', 'build process for production', function () {
        process.env.DEST = 'dist';
        grunt.task.run([
           'jshint',
           'requirejs'
        ]);
    });
    */

};
