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
                options: {
                    config: 'config.rb',
                    outputStyle: 'expanded'
                }
            },
            dist: { // Another Target
                options: {
                    config: 'config.rb',
                    outputStyle: 'compressed'
                },
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
            build: {
                files: [
                    {expand: true, flatten: true, src: ['<%= config.dev %>/fonts/*'], dest: '<%= config.dist %>/fonts/', filter: 'isFile' }
                ]
            }
        },

        // Clean folders or files
        clean: {
            build: {
                src: ['<%= config.dist %>/*']
            }
        },

        // Check js errors
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

        //Needs to be in quote
        'string-replace': {
            dev: {
                files: {
                    'Views/Shared/': 'Views/Shared/_Layout.cshtml',
                },
                options: {
                    replacements: [
                      // place files inline example
                      {
                          pattern: "<link href='~/ui_dist/css/app.min.css' rel='stylesheet' />",
                          replacement: "<link href='~/ui_dist/css/app.css' rel='stylesheet' />"
                      },
                      {
                          pattern: "<script data-main='../ui_dist/js/app.min.js' src='~/ui_dist/js/vendor/require.js'></script>",
                          replacement: "  <script data-main='../ui_dist/js/app.js' src='~/ui_dist/js/vendor/require.js'></script>"
                      }
                    ]
                }
            },
            dist: {
                files: {
                    'Views/Shared/': 'Views/Shared/_Layout.cshtml',
                },
                options: {
                    replacements: [
                      // place files inline example
                      {
                          pattern: "<link href='~/ui_dist/css/app.css' rel='stylesheet' />",
                          replacement: "<link href='~/ui_dist/css/app.min.css' rel='stylesheet' />"
                      },
                      {
                          pattern: "<script data-main='../ui_dist/js/app.js' src='~/ui_dist/js/vendor/require.js'></script>",
                          replacement: "  <script data-main='../ui_dist/js/app.min.js' src='~/ui_dist/js/vendor/require.js'></script>"
                      }
                    ]
                }
            }
        },

        // Rename whatever files
        rename: {
            dist: {
                files: [
                    {src: ['<%= config.dist %>/css/app.css'], dest: '<%= config.dist %>/css/app.min.css'},
                    {src: ['<%= config.dist %>/js/app.js'], dest: '<%= config.dist %>/js/app.min.js'},
                ]
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
    grunt.registerTask('dev', ['clean', 'copy', 'jshint', 'compass:dev', 'requirejs:dev', 'string-replace:dev', 'watch']);
    grunt.registerTask('dist', ['clean', 'copy', 'jshint', 'compass:dist', 'requirejs:dist', 'rename:dist', 'string-replace:dist']);

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
